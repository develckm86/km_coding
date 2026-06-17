var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-8 -->

# 14.8 응답 데이터 검증과 저장

## 응답 구조를 믿기 전에 확인하기

API 문서에 응답 구조가 적혀 있더라도 실제 응답이 항상 기대와 같다고 가정하면 안 된다. 다음과 같은 상황이 생길 수 있다.

- 특정 필드가 빠져 있다.
- 숫자여야 할 값이 문자열로 온다.
- 날짜 형식이 섞여 있다.
- 빈 리스트가 온다.
- 에러 응답 구조가 성공 응답 구조와 다르다.
- 중첩 구조가 예상보다 깊다.

따라서 데이터를 저장하거나 분석에 넘기기 전에 최소한의 검증과 정규화가 필요하다.

## 필요한 필드만 추출하기

API 응답 전체를 그대로 분석에 사용하기보다, 필요한 필드만 명확히 추출하는 것이 좋다.

\`\`\`python
raw_order = {
    "id": 1001,
    "amount": "15000",
    "status": "paid",
    "created_at": "2026-06-01T10:30:00",
    "customer": {
        "id": 501,
        "name": "홍길동",
    },
}
\`\`\`

정규화 함수는 다음처럼 만들 수 있다.

\`\`\`python
def normalize_order(item: dict) -> dict:
    customer = item.get("customer") or {}

    return {
        "order_id": item.get("id"),
        "amount": int(item.get("amount", 0)),
        "status": item.get("status"),
        "created_at": item.get("created_at"),
        "customer_id": customer.get("id"),
        "customer_name": customer.get("name"),
    }
\`\`\`

이 함수는 API 응답 구조를 분석에 적합한 평평한 딕셔너리로 바꾼다. 데이터분석 과정에서 \`pandas\`로 읽기 쉬운 형태가 된다.

## 필수 필드 검사하기

반드시 있어야 하는 값이 없다면 해당 행을 저장하지 않거나 실패 목록에 기록해야 한다.

\`\`\`python
def validate_order(row: dict) -> list[str]:
    errors = []

    if row.get("order_id") is None:
        errors.append("order_id가 없습니다.")

    if row.get("amount") is None:
        errors.append("amount가 없습니다.")

    if not row.get("created_at"):
        errors.append("created_at이 없습니다.")

    return errors
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
row = normalize_order(raw_order)
errors = validate_order(row)

if errors:
    print("잘못된 데이터:", errors)
else:
    print("정상 데이터:", row)
\`\`\`

데이터 수집 단계에서 모든 검증을 완벽히 할 필요는 없지만, 분석에 반드시 필요한 필드는 확인하는 것이 좋다.

## JSON Lines로 저장하기

API 응답을 계속 수집할 때는 JSON Lines 형식이 유용하다. JSON Lines는 한 줄에 하나의 JSON 객체를 저장하는 방식이다.

\`\`\`text
{"id": 1, "amount": 10000}
{"id": 2, "amount": 15000}
{"id": 3, "amount": 20000}
\`\`\`

이 방식은 다음 장점이 있다.

- 한 줄씩 추가 저장하기 쉽다.
- 대용량 데이터를 한 줄씩 읽기 쉽다.
- 중간에 프로그램이 중단되어도 일부 데이터가 남아 있다.
- API 응답 원본 저장에 적합하다.

저장 함수는 다음처럼 만들 수 있다.

\`\`\`python
import json
from pathlib import Path


def append_jsonl(path: str, item: dict) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("a", encoding="utf-8") as file:
        line = json.dumps(item, ensure_ascii=False)
        file.write(line + "\\n")
\`\`\`

여러 건을 저장하려면 다음처럼 작성한다.

\`\`\`python
for order in iter_orders(client):
    append_jsonl("data/raw/orders.jsonl", order)
\`\`\`

## CSV로 저장하기

분석에 바로 넘길 정규화 데이터는 CSV로 저장할 수 있다.

\`\`\`python
import csv
from pathlib import Path


def save_rows_to_csv(path: str, rows: list[dict], fieldnames: list[str]) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
rows = [normalize_order(item) for item in raw_orders]

save_rows_to_csv(
    "data/processed/orders.csv",
    rows,
    fieldnames=["order_id", "amount", "status", "created_at", "customer_id", "customer_name"],
)
\`\`\`

CSV는 표 형태 데이터 분석에 편하지만 중첩 구조를 표현하기 어렵다. 원본은 JSON Lines로 저장하고, 분석용 데이터는 CSV로 저장하는 방식이 자주 사용된다.

## 원본과 가공본을 함께 저장하기

실무에서는 원본 데이터와 가공 데이터를 분리해서 저장하는 것이 좋다.

\`\`\`text
data/
  raw/
    orders_2026_06_01.jsonl
  processed/
    orders_2026_06_01.csv
  errors/
    invalid_orders_2026_06_01.jsonl
\`\`\`

이렇게 저장하면 나중에 처리 로직이 잘못되었음을 발견했을 때 원본 데이터를 다시 읽어 가공할 수 있다. 원본을 덮어쓰지 않는 습관은 데이터분석에서 매우 중요하다.

---
`;export{e as default};