var e=`<!-- 원본: python_advanced_chapter_19_book.md / 세부 장: 19-1 -->

# 19.1 데이터분석 전에 필요한 파이썬 역량

데이터분석은 단순히 표를 읽고 그래프를 그리는 일이 아니다. 그 전에는 데이터를 가져오고, 저장하고, 검증하고, 정리하는 과정이 필요하다. 이 과정을 안정적으로 처리하려면 파이썬 기초와 고급 과정에서 배운 여러 역량이 함께 필요하다.

## 19.1.1 파일을 읽고 쓸 수 있어야 한다

데이터분석에서 가장 자주 만나는 데이터 형식은 파일이다.

대표적으로 다음과 같은 파일을 다룬다.

\`\`\`text
- CSV
- JSON
- JSON Lines
- Excel
- TXT 로그 파일
- 압축 파일
- SQLite DB 파일
\`\`\`

데이터분석 도구를 사용하기 전에 파일이 어디에 있는지, 어떤 형식인지, 어떤 인코딩인지, 크기는 어느 정도인지 확인할 수 있어야 한다.

예를 들어 CSV 파일을 분석하기 전에 다음을 확인해야 한다.

\`\`\`text
- 파일이 존재하는가?
- 파일 크기가 0이 아닌가?
- 인코딩은 무엇인가?
- 헤더가 있는가?
- 컬럼명은 예상한 것과 같은가?
- 행 수는 어느 정도인가?
\`\`\`

간단한 파일 존재 여부 확인은 다음과 같이 할 수 있다.

\`\`\`python
from pathlib import Path

path = Path("data/raw/orders.csv")

if path.exists():
    print("파일이 존재합니다.")
else:
    print("파일을 찾을 수 없습니다.")
\`\`\`

분석 수업에서는 \`pandas.read_csv()\`를 사용해 CSV 파일을 읽겠지만, 그 전에 파일 경로와 파일 상태를 점검하는 습관이 필요하다.

---

## 19.1.2 API 데이터를 가져올 수 있어야 한다

현대적인 데이터 작업에서는 파일뿐 아니라 API를 통해 데이터를 가져오는 경우도 많다.

API 데이터를 다룰 때는 다음을 고려해야 한다.

\`\`\`text
- 요청 URL
- 요청 파라미터
- 인증 정보
- 응답 상태 코드
- JSON 응답 구조
- 페이지네이션
- 요청 실패와 재시도
- Rate Limit
\`\`\`

API 응답을 분석하려면 먼저 JSON 구조를 이해해야 한다.

예를 들어 API 응답이 다음과 같다고 하자.

\`\`\`json
{
  "page": 1,
  "total_pages": 3,
  "items": [
    {"id": 1, "name": "keyboard", "price": 30000},
    {"id": 2, "name": "mouse", "price": 15000}
  ]
}
\`\`\`

분석에 필요한 데이터는 전체 응답이 아니라 \`items\` 안의 리스트일 수 있다.

\`\`\`python
response_data = {
    "page": 1,
    "total_pages": 3,
    "items": [
        {"id": 1, "name": "keyboard", "price": 30000},
        {"id": 2, "name": "mouse", "price": 15000},
    ],
}

items = response_data["items"]

for item in items:
    print(item["name"], item["price"])
\`\`\`

API 데이터는 항상 성공적으로 오지 않는다. 따라서 데이터분석 전에 API 수집 코드는 반드시 실패 상황을 고려해야 한다.

---

## 19.1.3 JSON과 CSV 구조를 이해해야 한다

데이터분석에서 JSON과 CSV는 매우 자주 등장한다.

CSV는 표 형태 데이터에 가깝다.

\`\`\`csv
order_id,customer_id,amount,order_date
1001,C001,30000,2026-01-01
1002,C002,15000,2026-01-02
\`\`\`

JSON은 계층 구조를 표현하기에 좋다.

\`\`\`json
{
  "order_id": 1001,
  "customer": {
    "id": "C001",
    "grade": "VIP"
  },
  "items": [
    {"name": "keyboard", "price": 30000}
  ]
}
\`\`\`

CSV는 행과 열 중심이고, JSON은 딕셔너리와 리스트가 중첩된 구조다. 데이터분석을 위해서는 JSON을 CSV처럼 평평한 구조로 바꾸거나, CSV의 문자열 데이터를 적절한 타입으로 바꾸는 작업이 필요하다.

---

## 19.1.4 반복 처리와 함수화를 할 수 있어야 한다

데이터 작업은 반복 작업의 연속이다.

\`\`\`text
- 여러 파일을 반복해서 읽는다.
- 여러 행을 반복해서 검사한다.
- 여러 API 페이지를 반복해서 요청한다.
- 여러 컬럼을 반복해서 정리한다.
\`\`\`

반복되는 작업을 그대로 복사해서 붙여넣으면 코드가 길어지고 실수하기 쉽다. 따라서 자주 사용하는 작업은 함수로 분리해야 한다.

예를 들어 금액 문자열을 정수로 바꾸는 작업은 여러 곳에서 반복될 수 있다.

\`\`\`python
def parse_amount(value: str) -> int:
    cleaned = value.replace(",", "").replace("원", "").strip()
    return int(cleaned)

print(parse_amount("10,000원"))
print(parse_amount("25000"))
\`\`\`

데이터분석 수업에서는 이런 함수들이 전처리 함수로 이어진다.

---

## 19.1.5 예외 처리와 로깅을 사용할 수 있어야 한다

데이터는 항상 깨끗하지 않다. 어떤 행은 날짜가 잘못되어 있고, 어떤 행은 금액이 비어 있으며, 어떤 파일은 인코딩이 다를 수 있다.

이때 프로그램이 바로 멈추면 전체 작업을 진행할 수 없다. 반대로 모든 오류를 무시하면 어떤 데이터가 잘못되었는지 알 수 없다.

따라서 다음과 같은 방식이 필요하다.

\`\`\`text
- 실패한 데이터를 기록한다.
- 실패 이유를 로그로 남긴다.
- 처리 가능한 데이터는 계속 처리한다.
- 중요한 오류는 즉시 중단한다.
\`\`\`

예를 들어 금액 변환 실패를 기록하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def safe_parse_amount(value: str) -> int | None:
    try:
        cleaned = value.replace(",", "").replace("원", "").strip()
        return int(cleaned)
    except ValueError:
        return None

values = ["10,000원", "25000", "금액없음"]

for value in values:
    amount = safe_parse_amount(value)
    if amount is None:
        print("변환 실패:", value)
    else:
        print("변환 성공:", amount)
\`\`\`

분석 전 데이터 준비 단계에서는 이런 방어적인 코드가 중요하다.

---

## 19.1.6 테스트할 수 있어야 한다

데이터 정리 함수는 반드시 테스트하기 좋은 형태로 작성하는 것이 좋다.

예를 들어 다음 함수는 테스트하기 쉽다.

\`\`\`python
def normalize_phone_number(value: str) -> str:
    return value.replace("-", "").replace(" ", "").strip()
\`\`\`

입력과 출력이 명확하기 때문이다.

\`\`\`python
def test_normalize_phone_number():
    assert normalize_phone_number("010-1234-5678") == "01012345678"
    assert normalize_phone_number("010 1234 5678") == "01012345678"
\`\`\`

분석 수업으로 넘어가면 많은 전처리 코드가 등장한다. 이때 전처리 함수가 테스트되어 있으면, 분석 결과를 더 신뢰할 수 있다.

---
`;export{e as default};