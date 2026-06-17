var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-5 -->

# 20.5 프로젝트 4: SQLite 기반 데이터 저장 도구

네 번째 프로젝트는 SQLite 기반 데이터 저장 도구다. CSV나 JSON Lines 파일만으로도 데이터를 보관할 수 있지만, 데이터가 많아지고 중복을 관리해야 하거나 조건 검색이 많아지면 데이터베이스가 유용하다.

이번 프로젝트에서는 다음 흐름을 만든다.

\`\`\`text
1. JSON Lines 파일을 읽는다.
2. 각 데이터를 SQLite에 저장한다.
3. 중복 ID는 저장하지 않는다.
4. 날짜 기준으로 데이터를 조회한다.
5. 분석용 CSV로 내보낸다.
\`\`\`

## 20.5.1 테이블 설계하기

상품 데이터를 저장한다고 가정하자.

\`\`\`text
products
- id
- name
- price
- collected_at
\`\`\`

SQLite 테이블 생성 SQL은 다음과 같다.

\`\`\`sql
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    collected_at TEXT NOT NULL
);
\`\`\`

\`id\`를 기본키로 지정하면 같은 ID가 중복 저장되는 것을 막을 수 있다.

## 20.5.2 데이터베이스 연결 함수

\`\`\`python
# src/data_tools/database.py

from __future__ import annotations

import sqlite3
from pathlib import Path


def connect(db_path: str | Path) -> sqlite3.Connection:
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    return sqlite3.connect(path)
\`\`\`

## 20.5.3 테이블 생성하기

\`\`\`python
# src/data_tools/database.py


def create_tables(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            collected_at TEXT NOT NULL
        )
        """
    )
    connection.commit()
\`\`\`

테이블 생성 코드는 프로그램 시작 시 한 번 실행하면 된다.

## 20.5.4 JSON Lines 읽기

\`\`\`python
# src/data_tools/database.py

import json
from typing import Iterator, Any


def read_jsonl(path: str | Path) -> Iterator[dict[str, Any]]:
    jsonl_path = Path(path)

    with jsonl_path.open("r", encoding="utf-8") as file:
        for line in file:
            if not line.strip():
                continue
            yield json.loads(line)
\`\`\`

여기서도 제너레이터를 사용한다. JSON Lines 파일이 커져도 한 줄씩 처리할 수 있다.

## 20.5.5 데이터 저장하기

\`\`\`python
# src/data_tools/database.py

from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def insert_product(
    connection: sqlite3.Connection,
    product: dict[str, Any],
) -> bool:
    product_id = str(product["id"])
    name = str(product["name"])
    price = float(product["price"])
    collected_at = datetime.now().isoformat(timespec="seconds")

    cursor = connection.execute(
        """
        INSERT OR IGNORE INTO products (id, name, price, collected_at)
        VALUES (?, ?, ?, ?)
        """,
        (product_id, name, price, collected_at),
    )

    return cursor.rowcount > 0
\`\`\`

\`INSERT OR IGNORE\`를 사용하면 기본키가 중복될 때 오류를 내지 않고 저장을 건너뛴다. 중복 데이터가 자주 들어오는 수집 작업에서 유용하다.

## 20.5.6 JSON Lines 데이터를 DB에 저장하기

\`\`\`python
# src/data_tools/database.py


def import_products_from_jsonl(
    db_path: str | Path,
    jsonl_path: str | Path,
) -> tuple[int, int]:
    inserted = 0
    skipped = 0

    with connect(db_path) as connection:
        create_tables(connection)

        for product in read_jsonl(jsonl_path):
            try:
                was_inserted = insert_product(connection, product)
            except (KeyError, ValueError, TypeError) as error:
                logger.warning("상품 저장 실패: product=%s error=%s", product, error)
                skipped += 1
                continue

            if was_inserted:
                inserted += 1
            else:
                skipped += 1

        connection.commit()

    logger.info("DB 저장 완료: inserted=%s skipped=%s", inserted, skipped)
    return inserted, skipped
\`\`\`

여기서는 일부 데이터가 잘못되어도 전체 저장 작업이 멈추지 않게 했다. 대신 실패한 데이터는 로그로 남긴다. 실무 데이터 처리에서는 “일부 실패 때문에 전체 프로그램이 중단될 것인지”를 신중하게 결정해야 한다.

## 20.5.7 분석용 CSV로 내보내기

\`\`\`python
# src/data_tools/database.py

import csv


def export_products_to_csv(
    db_path: str | Path,
    output_path: str | Path,
) -> int:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    with connect(db_path) as connection:
        cursor = connection.execute(
            """
            SELECT id, name, price, collected_at
            FROM products
            ORDER BY collected_at, id
            """
        )
        rows = cursor.fetchall()

    with path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "price", "collected_at"])
        writer.writerows(rows)

    logger.info("분석용 CSV 내보내기 완료: path=%s count=%s", path, len(rows))
    return len(rows)
\`\`\`

이제 API로 수집한 JSON Lines 데이터를 DB에 저장하고, 분석용 CSV로 내보낼 수 있다.

## 20.5.8 실행 예제

\`\`\`python
from data_tools.database import import_products_from_jsonl, export_products_to_csv


inserted, skipped = import_products_from_jsonl(
    db_path="data/processed/products.db",
    jsonl_path="data/raw/products.jsonl",
)

print(f"DB 저장 완료: 저장 {inserted}건, 건너뜀 {skipped}건")

count = export_products_to_csv(
    db_path="data/processed/products.db",
    output_path="data/processed/products_for_analysis.csv",
)

print(f"분석용 CSV 생성 완료: {count}건")
\`\`\`

---
`;export{e as default};