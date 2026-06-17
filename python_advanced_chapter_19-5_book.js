var e=`<!-- 원본: python_advanced_chapter_19_book.md / 세부 장: 19-5 -->

# 19.5 pandas로 넘기기 전 단계

데이터분석 기초 과정에서는 \`pandas\`를 본격적으로 사용하게 된다. 하지만 \`pandas\`로 데이터를 읽기 전에 확인해야 할 것들이 있다.

## 19.5.1 파일 크기 확인

작은 CSV는 바로 읽어도 괜찮지만, 큰 파일은 메모리 문제가 생길 수 있다. 먼저 파일 크기를 확인하는 습관이 필요하다.

\`\`\`python
from pathlib import Path

path = Path("data/raw/orders.csv")
size_mb = path.stat().st_size / (1024 * 1024)

print(f"파일 크기: {size_mb:.2f} MB")
\`\`\`

파일이 매우 크다면 다음 전략을 고려해야 한다.

\`\`\`text
- 필요한 컬럼만 읽기
- 청크 단위로 읽기
- 원천 데이터를 먼저 분할하기
- 데이터베이스에 저장한 뒤 필요한 부분만 조회하기
\`\`\`

이 내용은 데이터분석 고급 과정에서 더 깊게 다룬다.

---

## 19.5.2 컬럼명 확인

분석 코드는 컬럼명에 크게 의존한다. 컬럼명이 예상과 다르면 분석 코드가 바로 실패한다.

CSV 헤더만 확인하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
import csv
from pathlib import Path


def read_csv_header(path: Path, encoding: str = "utf-8") -> list[str]:
    with path.open("r", encoding=encoding, newline="") as f:
        reader = csv.reader(f)
        return next(reader)

header = read_csv_header(Path("data/raw/orders.csv"))
print(header)
\`\`\`

컬럼명은 다음처럼 정리할 수 있다.

\`\`\`python
def normalize_column_name(name: str) -> str:
    return name.strip().lower().replace(" ", "_")

columns = [" Order ID ", "Customer ID", "Amount"]
normalized = [normalize_column_name(column) for column in columns]

print(normalized)
\`\`\`

---

## 19.5.3 샘플 데이터 확인

파일 전체를 읽기 전에 앞부분 몇 줄만 확인하면 데이터 구조를 빠르게 파악할 수 있다.

\`\`\`python
import csv
from pathlib import Path


def read_csv_sample(path: Path, limit: int = 5, encoding: str = "utf-8") -> list[dict[str, str]]:
    rows = []

    with path.open("r", encoding=encoding, newline="") as f:
        reader = csv.DictReader(f)

        for index, row in enumerate(reader):
            if index >= limit:
                break
            rows.append(row)

    return rows

sample_rows = read_csv_sample(Path("data/raw/orders.csv"), limit=3)

for row in sample_rows:
    print(row)
\`\`\`

샘플을 확인할 때는 다음을 본다.

\`\`\`text
- 컬럼명이 예상과 같은가?
- 날짜 형식은 어떤가?
- 숫자가 문자열로 들어 있는가?
- 빈 값이 보이는가?
- 불필요한 공백이나 기호가 있는가?
\`\`\`

---

## 19.5.4 스키마 정의

스키마는 데이터가 가져야 할 구조를 의미한다. 간단하게는 필요한 컬럼과 각 컬럼의 타입을 정의하는 것이다.

예를 들어 주문 데이터의 스키마는 다음과 같이 표현할 수 있다.

\`\`\`python
ORDER_SCHEMA = {
    "order_id": "int",
    "customer_id": "str",
    "amount": "int",
    "order_date": "date",
}
\`\`\`

이 스키마를 기준으로 각 행을 검사할 수 있다.

\`\`\`python
def validate_order_row(row: dict[str, str]) -> list[str]:
    errors = []

    if is_blank(row.get("order_id")):
        errors.append("order_id가 비어 있습니다.")

    if is_blank(row.get("customer_id")):
        errors.append("customer_id가 비어 있습니다.")

    if not can_parse_int(row.get("amount", "")):
        errors.append("amount를 정수로 변환할 수 없습니다.")

    if parse_date_flexible(row.get("order_date", "")) is None:
        errors.append("order_date를 날짜로 변환할 수 없습니다.")

    return errors
\`\`\`

스키마를 명확히 하면 분석 코드가 훨씬 안정적이 된다.

---

## 19.5.5 메타데이터 남기기

데이터를 처리할 때 처리 결과에 대한 정보를 함께 남기면 나중에 추적하기 쉽다.

메타데이터에는 다음 정보가 들어갈 수 있다.

\`\`\`text
- 원본 파일명
- 처리 시간
- 전체 행 수
- 성공 행 수
- 실패 행 수
- 사용한 인코딩
- 출력 파일명
\`\`\`

예시는 다음과 같다.

\`\`\`python
import json
from datetime import datetime
from pathlib import Path

metadata = {
    "source_file": "orders.csv",
    "processed_at": datetime.now().isoformat(timespec="seconds"),
    "total_rows": 100,
    "success_rows": 95,
    "failed_rows": 5,
    "encoding": "utf-8",
    "output_file": "orders_cleaned.csv",
}

metadata_path = Path("data/processed/orders_metadata.json")
metadata_path.parent.mkdir(parents=True, exist_ok=True)

with metadata_path.open("w", encoding="utf-8") as f:
    json.dump(metadata, f, ensure_ascii=False, indent=2)
\`\`\`

분석을 다시 해야 할 때 메타데이터는 중요한 단서가 된다.

---
`;export{e as default};