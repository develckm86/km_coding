var e=`<!-- 원본: python_advanced_chapter_19_book.md / 세부 장: 19-3 -->

# 19.3 데이터 파이프라인 기초

데이터 파이프라인은 데이터를 가져와서 분석 가능한 형태로 만드는 일련의 흐름이다. 복잡한 시스템에서만 사용하는 말처럼 들릴 수 있지만, 작은 CSV 정리 작업에도 파이프라인 개념을 적용할 수 있다.

## 19.3.1 데이터 파이프라인의 기본 흐름

기본 흐름은 다음과 같다.

\`\`\`text
1. 데이터 수집
2. 원천 데이터 저장
3. 데이터 검증
4. 데이터 정리
5. 데이터 변환
6. 분석용 데이터 저장
7. 분석 또는 리포트 생성
\`\`\`

각 단계의 역할은 다르다.

| 단계 | 설명 |
|---|---|
| 수집 | 파일, API, DB 등에서 데이터를 가져온다. |
| 원천 저장 | 받은 데이터를 가능한 한 원본 그대로 보관한다. |
| 검증 | 필요한 컬럼, 타입, 누락값, 중복 등을 확인한다. |
| 정리 | 공백 제거, 날짜 형식 통일, 숫자 변환 등을 수행한다. |
| 변환 | 분석 목적에 맞는 구조로 바꾼다. |
| 저장 | 분석 가능한 형태로 파일이나 DB에 저장한다. |
| 분석 | pandas, 시각화, 통계 분석 등으로 넘어간다. |

---

## 19.3.2 원천 데이터와 가공 데이터 분리

데이터 작업에서 가장 중요한 원칙 중 하나는 원천 데이터를 함부로 수정하지 않는 것이다.

원천 데이터는 문제가 생겼을 때 다시 돌아갈 수 있는 기준점이다. 따라서 원천 데이터는 \`raw\` 폴더에 보관하고, 정리된 데이터는 별도 폴더에 저장하는 것이 좋다.

예시 구조는 다음과 같다.

\`\`\`text
project/
  data/
    raw/
      orders_2026_01.csv
    interim/
      orders_checked.csv
    processed/
      orders_cleaned.csv
  logs/
    pipeline.log
  src/
    prepare_orders.py
\`\`\`

이 구조에서는 각 데이터의 의미가 분명하다.

\`\`\`text
data/raw       : 원본 데이터
data/interim   : 중간 처리 데이터
data/processed : 분석 가능한 데이터
logs           : 실행 기록
src            : 처리 코드
\`\`\`

---

## 19.3.3 데이터 수집 단계

데이터 수집은 외부에서 데이터를 가져오는 단계다.

데이터 출처는 다양하다.

\`\`\`text
- 사내 시스템에서 내려받은 CSV
- 외부 API 응답 JSON
- 고객 설문 엑셀 파일
- 웹에서 수집한 텍스트
- 로그 파일
- SQLite 데이터베이스
\`\`\`

수집 단계에서는 데이터를 바꾸기보다 먼저 저장하는 것이 좋다. 특히 API 데이터는 나중에 같은 응답을 다시 받기 어려울 수 있으므로 원본 응답을 저장해두는 것이 유용하다.

\`\`\`python
import json
from pathlib import Path

raw_response = {
    "page": 1,
    "items": [
        {"id": 1, "name": "keyboard", "price": 30000},
        {"id": 2, "name": "mouse", "price": 15000},
    ],
}

output_path = Path("data/raw/api_response_page_1.json")
output_path.parent.mkdir(parents=True, exist_ok=True)

with output_path.open("w", encoding="utf-8") as f:
    json.dump(raw_response, f, ensure_ascii=False, indent=2)
\`\`\`

---

## 19.3.4 데이터 검증 단계

검증은 데이터가 예상한 구조를 만족하는지 확인하는 단계다.

CSV 주문 데이터에 다음 컬럼이 필요하다고 가정하자.

\`\`\`text
order_id, customer_id, amount, order_date
\`\`\`

그렇다면 파일을 읽은 뒤 컬럼이 모두 있는지 확인해야 한다.

\`\`\`python
REQUIRED_COLUMNS = {"order_id", "customer_id", "amount", "order_date"}


def validate_columns(fieldnames: list[str] | None) -> list[str]:
    if fieldnames is None:
        return ["헤더가 없습니다."]

    current_columns = set(fieldnames)
    missing_columns = REQUIRED_COLUMNS - current_columns

    errors = []
    if missing_columns:
        errors.append(f"필수 컬럼이 없습니다: {sorted(missing_columns)}")

    return errors
\`\`\`

검증 단계에서 중요한 것은 “잘못된 데이터가 있다”는 사실뿐 아니라, 어떤 이유로 잘못되었는지 기록하는 것이다.

---

## 19.3.5 데이터 정리 단계

정리는 데이터 값을 분석하기 좋은 형태로 맞추는 단계다.

대표적인 정리 작업은 다음과 같다.

\`\`\`text
- 앞뒤 공백 제거
- 대소문자 통일
- 전화번호 하이픈 제거
- 금액 문자열에서 쉼표 제거
- 날짜 형식 통일
- 빈 문자열을 None으로 변환
\`\`\`

예를 들어 금액 문자열과 날짜 문자열을 정리하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
from datetime import datetime


def clean_amount(value: str) -> int:
    cleaned = value.replace(",", "").replace("원", "").strip()
    return int(cleaned)


def clean_date(value: str) -> str:
    value = value.strip().replace("/", "-").replace(".", "-")
    parsed = datetime.strptime(value, "%Y-%m-%d")
    return parsed.strftime("%Y-%m-%d")
\`\`\`

정리 함수는 입력과 출력이 명확해야 한다. 그래야 테스트하기 쉽고, 분석 과정에서 재사용하기 좋다.

---

## 19.3.6 데이터 변환 단계

변환은 분석 목적에 맞게 데이터 구조를 바꾸는 단계다.

예를 들어 다음과 같은 원천 데이터가 있다고 하자.

\`\`\`python
raw_order = {
    "order_id": "1001",
    "customer_id": " C001 ",
    "amount": "10,000원",
    "order_date": "2026/01/05",
}
\`\`\`

분석 가능한 형태는 다음과 같을 수 있다.

\`\`\`python
cleaned_order = {
    "order_id": 1001,
    "customer_id": "C001",
    "amount": 10000,
    "order_date": "2026-01-05",
}
\`\`\`

이를 함수로 만들면 다음과 같다.

\`\`\`python
def transform_order(row: dict[str, str]) -> dict[str, object]:
    return {
        "order_id": int(row["order_id"].strip()),
        "customer_id": row["customer_id"].strip(),
        "amount": clean_amount(row["amount"]),
        "order_date": clean_date(row["order_date"]),
    }
\`\`\`

이 단계까지 마치면 데이터분석 도구로 넘기기 쉬워진다.

---

## 19.3.7 분석용 데이터 저장 단계

정리된 데이터는 원천 데이터와 다른 위치에 저장해야 한다.

\`\`\`python
import csv
from pathlib import Path


def write_csv(path: Path, rows: list[dict[str, object]], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
\`\`\`

저장할 때는 다음도 함께 고려하면 좋다.

\`\`\`text
- 파일명에 처리 날짜를 포함할 것인가?
- 기존 파일을 덮어쓸 것인가?
- 실패한 행을 따로 저장할 것인가?
- 처리 요약 정보를 함께 저장할 것인가?
\`\`\`

---
`;export{e as default};