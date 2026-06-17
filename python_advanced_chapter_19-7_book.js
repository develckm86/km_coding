var e=`<!-- 원본: python_advanced_chapter_19_book.md / 세부 장: 19-7 -->

# 19.7 종합 예제: 분석 준비용 CSV 점검 도구

이제 이 장에서 배운 내용을 하나의 예제로 정리해보자. 목표는 주문 CSV 파일을 읽고, 분석 가능한 행과 실패한 행을 분리해서 저장하는 것이다.

## 19.7.1 입력 CSV 예시

입력 파일은 다음과 같은 구조라고 가정한다.

\`\`\`csv
order_id,customer_id,amount,order_date
1001,C001,"10,000",2026-01-01
1002,C002,25000,2026/01/02
1003,,12000,2026-01-03
1004,C004,금액없음,2026-01-04
1005,C005,30000,잘못된날짜
\`\`\`

이 데이터에는 다음 문제가 있다.

\`\`\`text
- 1003 행은 customer_id가 비어 있다.
- 1004 행은 amount를 숫자로 변환할 수 없다.
- 1005 행은 order_date를 날짜로 변환할 수 없다.
\`\`\`

---

## 19.7.2 점검 함수 만들기

먼저 필요한 검증 함수를 준비한다.

\`\`\`python
from datetime import datetime


def is_blank(value: str | None) -> bool:
    if value is None:
        return True
    return value.strip() == ""


def parse_amount(value: str) -> int | None:
    try:
        cleaned = value.replace(",", "").replace("원", "").strip()
        return int(cleaned)
    except ValueError:
        return None


def parse_date(value: str) -> str | None:
    formats = ["%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d"]

    for date_format in formats:
        try:
            parsed = datetime.strptime(value.strip(), date_format)
            return parsed.strftime("%Y-%m-%d")
        except ValueError:
            pass

    return None
\`\`\`

---

## 19.7.3 행 단위 검증 함수 만들기

각 행을 검사하고, 오류 목록을 반환하는 함수를 만든다.

\`\`\`python
def validate_row(row: dict[str, str]) -> list[str]:
    errors = []

    if is_blank(row.get("order_id")):
        errors.append("order_id가 비어 있습니다.")

    if is_blank(row.get("customer_id")):
        errors.append("customer_id가 비어 있습니다.")

    if parse_amount(row.get("amount", "")) is None:
        errors.append("amount를 정수로 변환할 수 없습니다.")

    if parse_date(row.get("order_date", "")) is None:
        errors.append("order_date를 날짜로 변환할 수 없습니다.")

    return errors
\`\`\`

---

## 19.7.4 행 변환 함수 만들기

검증을 통과한 행은 분석 가능한 형태로 변환한다.

\`\`\`python
def transform_row(row: dict[str, str]) -> dict[str, object]:
    amount = parse_amount(row["amount"])
    order_date = parse_date(row["order_date"])

    if amount is None:
        raise ValueError("amount 변환 실패")

    if order_date is None:
        raise ValueError("order_date 변환 실패")

    return {
        "order_id": int(row["order_id"].strip()),
        "customer_id": row["customer_id"].strip(),
        "amount": amount,
        "order_date": order_date,
    }
\`\`\`

---

## 19.7.5 CSV 읽기와 분리 저장

전체 흐름은 다음과 같이 작성할 수 있다.

\`\`\`python
import csv
from pathlib import Path


def prepare_orders(input_path: Path, output_path: Path, error_path: Path) -> dict[str, int]:
    success_rows = []
    error_rows = []
    total_count = 0

    with input_path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)

        for row_number, row in enumerate(reader, start=2):
            total_count += 1
            errors = validate_row(row)

            if errors:
                error_row = dict(row)
                error_row["row_number"] = row_number
                error_row["errors"] = " | ".join(errors)
                error_rows.append(error_row)
                continue

            success_rows.append(transform_row(row))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    error_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8", newline="") as f:
        fieldnames = ["order_id", "customer_id", "amount", "order_date"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(success_rows)

    if error_rows:
        with error_path.open("w", encoding="utf-8", newline="") as f:
            fieldnames = list(error_rows[0].keys())
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(error_rows)

    return {
        "total_rows": total_count,
        "success_rows": len(success_rows),
        "error_rows": len(error_rows),
    }
\`\`\`

---

## 19.7.6 실행 예시

\`\`\`python
summary = prepare_orders(
    input_path=Path("data/raw/orders.csv"),
    output_path=Path("data/processed/orders_cleaned.csv"),
    error_path=Path("data/interim/orders_errors.csv"),
)

print(summary)
\`\`\`

예상 결과는 다음과 같다.

\`\`\`text
{'total_rows': 5, 'success_rows': 2, 'error_rows': 3}
\`\`\`

이 도구는 아직 \`pandas\`를 사용하지 않는다. 하지만 데이터분석 전에 해야 할 중요한 일을 수행한다.

\`\`\`text
- 원천 데이터를 읽는다.
- 필수 값과 형식을 검사한다.
- 정상 행과 오류 행을 분리한다.
- 정상 행은 분석 가능한 형태로 저장한다.
- 오류 행은 이유와 함께 저장한다.
\`\`\`

이런 준비가 되어 있으면 이후 pandas 분석이 훨씬 안정적이다.

---
`;export{e as default};