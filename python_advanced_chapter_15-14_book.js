var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-14 -->

# 15.14 API 데이터를 SQLite에 저장하기

## API 수집 결과를 파일로만 저장할 때의 문제

14장에서는 API 데이터를 JSON Lines나 CSV로 저장하는 방법을 배웠다. 파일 저장은 단순하고 좋지만, 같은 데이터를 반복해서 수집하다 보면 다음 문제가 생길 수 있다.

- 이미 수집한 데이터를 또 저장할 수 있다.
- 날짜별 파일이 많아져서 관리가 어려워진다.
- 특정 id의 데이터를 찾기 어렵다.
- 수집 성공과 실패 이력을 체계적으로 관리하기 어렵다.
- 분석 전에 여러 파일을 매번 합쳐야 한다.

SQLite를 사용하면 수집한 데이터를 테이블에 누적 저장하고, 필요한 조건으로 조회할 수 있다.

## API 응답 예시

다음과 같은 주문 API 응답이 있다고 가정하자.

\`\`\`python
orders = [
    {"id": 101, "customer_id": 1, "amount": 30000, "status": "paid", "ordered_at": "2026-06-11"},
    {"id": 102, "customer_id": 2, "amount": 18000, "status": "paid", "ordered_at": "2026-06-12"},
    {"id": 103, "customer_id": 1, "amount": 25000, "status": "canceled", "ordered_at": "2026-06-12"},
]
\`\`\`

이 데이터를 SQLite에 저장해보자.

## 저장 함수 만들기

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def save_orders(orders: list[dict]) -> None:
    rows = [
        (
            order["id"],
            order["customer_id"],
            order["amount"],
            order["status"],
            order["ordered_at"],
        )
        for order in orders
    ]

    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.cursor()
        cursor.executemany("""
        INSERT OR IGNORE INTO orders (id, customer_id, amount, status, ordered_at)
        VALUES (?, ?, ?, ?, ?)
        """, rows)
\`\`\`

이 함수는 API 응답 딕셔너리 리스트를 받아서 DB에 저장한다.

\`INSERT OR IGNORE\`를 사용했기 때문에 같은 \`id\`가 이미 있으면 무시된다. 데이터 수집 작업에서 중복 저장을 피할 때 유용하다.

## 저장 전 검증하기

API 응답을 그대로 저장하면 위험할 수 있다. 응답 구조가 바뀌거나, 값이 비어 있거나, 숫자여야 할 값이 문자열일 수도 있다.

간단한 검증 함수를 만들 수 있다.

\`\`\`python
def validate_order(order: dict) -> bool:
    required_keys = {"id", "customer_id", "amount", "status", "ordered_at"}

    if not required_keys.issubset(order):
        return False

    if not isinstance(order["id"], int):
        return False

    if not isinstance(order["customer_id"], int):
        return False

    if not isinstance(order["amount"], int):
        return False

    if order["status"] not in {"paid", "canceled", "pending"}:
        return False

    return True
\`\`\`

검증을 통과한 데이터만 저장한다.

\`\`\`python
valid_orders = [order for order in orders if validate_order(order)]
save_orders(valid_orders)
\`\`\`

이 구조는 데이터분석 전 단계에서 매우 중요하다. 잘못된 데이터를 DB에 넣기 전에 걸러야 분석 결과도 신뢰할 수 있다.

---
`;export{e as default};