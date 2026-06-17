var e=`# 19장. 데이터분석 과정으로 넘어가기 전 준비

## 들어가며

파이썬 고급 과정의 마지막 구간에 들어오면, 우리는 문법을 단순히 “아는 수준”에서 벗어나 실제 작업을 설계하는 단계로 넘어오게 된다. 함수, 클래스, 제너레이터, 예외 처리, 로깅, 테스트, 파일 처리, API, 데이터베이스, 성능 최적화, CLI 프로그램까지 배운 이유는 결국 하나다.

**데이터를 안정적으로 가져오고, 믿을 수 있는 형태로 정리한 뒤, 분석 가능한 상태로 넘기기 위해서다.**

데이터분석 수업에서는 \`NumPy\`, \`pandas\`, 시각화, 통계적 해석 등을 본격적으로 다룬다. 하지만 그 전에 반드시 해결해야 할 문제가 있다. 분석할 데이터가 제대로 준비되어 있지 않으면, 아무리 좋은 분석 도구를 사용해도 결과를 신뢰하기 어렵다.

예를 들어 다음과 같은 상황을 생각해보자.

\`\`\`text
- CSV 파일마다 컬럼명이 조금씩 다르다.
- 날짜 형식이 2026-01-05, 2026/01/05, 2026.01.05처럼 섞여 있다.
- 금액 데이터에 10,000원, 10000, 10,000 같은 값이 함께 들어 있다.
- 일부 행에는 고객 ID가 비어 있다.
- 같은 주문 데이터가 여러 번 중복되어 있다.
- API에서 가져온 데이터 중 일부 페이지가 누락되었다.
- 한글 파일을 읽었더니 글자가 깨졌다.
\`\`\`

이런 문제를 무시하고 바로 분석을 시작하면, 분석 결과는 틀릴 가능성이 높다. 따라서 데이터분석 전에 해야 할 일은 데이터를 “예쁘게” 만드는 것이 아니라, **분석할 수 있을 만큼 신뢰 가능한 상태로 만드는 것**이다.

이 장에서는 데이터분석 과정으로 넘어가기 전에 필요한 파이썬 역량과 데이터 준비 흐름을 정리한다. 특히 \`pandas\`를 깊게 사용하기 전 단계에서, 표준 라이브러리와 고급 파이썬 문법만으로 원천 데이터를 점검하고 준비하는 방법을 살펴본다.

---

## 학습 목표

이 장을 마치면 다음 내용을 설명하고 구현할 수 있어야 한다.

- 데이터분석 전에 필요한 파이썬 역량을 설명할 수 있다.
- 분석용 코드와 재사용 가능한 파이썬 코드의 차이를 이해할 수 있다.
- 데이터 파이프라인의 기본 흐름을 설명할 수 있다.
- 원천 데이터와 가공 데이터를 분리해서 관리할 수 있다.
- 데이터 품질을 점검하는 기본 함수를 작성할 수 있다.
- CSV 데이터를 분석 전에 검증하고 정리할 수 있다.
- \`pandas\`로 넘기기 전 확인해야 할 항목을 체크할 수 있다.
- 데이터분석 기초 과정에서 어떤 내용을 배우게 될지 이해할 수 있다.

---

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

# 19.2 분석용 코드와 일반 코드의 차이

데이터분석을 처음 배우면 노트북 환경에서 코드를 실행하는 경우가 많다. Jupyter Notebook은 데이터를 확인하고 실험하기에 매우 편리하다. 하지만 모든 분석 코드를 노트북에만 작성하면 재사용성과 유지보수성이 떨어질 수 있다.

## 19.2.1 실험용 코드

실험용 코드는 빠르게 확인하기 위한 코드다.

\`\`\`python
import csv

with open("orders.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)
\`\`\`

이 코드는 간단히 파일 내용을 확인하기에는 좋다. 하지만 다음과 같은 문제가 있다.

\`\`\`text
- 파일 경로가 코드 안에 직접 들어 있다.
- 오류 처리가 없다.
- 재사용하기 어렵다.
- 테스트하기 어렵다.
- 결과를 어디에 저장하는지 명확하지 않다.
\`\`\`

실험 단계에서는 괜찮지만, 반복해서 사용할 코드라면 구조를 정리해야 한다.

---

## 19.2.2 재사용 가능한 코드

같은 기능을 재사용 가능하게 만들면 다음과 같다.

\`\`\`python
import csv
from pathlib import Path


def read_csv_rows(path: Path, encoding: str = "utf-8") -> list[dict[str, str]]:
    with path.open("r", encoding=encoding, newline="") as f:
        reader = csv.DictReader(f)
        return list(reader)


rows = read_csv_rows(Path("orders.csv"))

for row in rows:
    print(row)
\`\`\`

이 코드는 파일 경로를 매개변수로 받기 때문에 다른 파일에도 사용할 수 있다. 또한 함수로 분리되어 있으므로 테스트하기 쉽다.

---

## 19.2.3 노트북 코드와 \`.py\` 파일 코드

노트북은 탐색과 실험에 좋다.

\`\`\`text
- 데이터를 눈으로 확인하기 좋다.
- 그래프를 바로 볼 수 있다.
- 중간 결과를 단계적으로 확인하기 좋다.
- 분석 아이디어를 실험하기 좋다.
\`\`\`

반면 \`.py\` 파일은 반복 실행과 자동화에 좋다.

\`\`\`text
- 같은 작업을 다시 실행하기 좋다.
- 함수와 클래스로 구조화하기 좋다.
- 테스트하기 좋다.
- CLI 프로그램으로 만들기 좋다.
- 스케줄러나 자동화 도구와 연결하기 좋다.
\`\`\`

따라서 데이터분석 과정에서는 보통 다음과 같은 흐름이 좋다.

\`\`\`text
1. 노트북에서 데이터를 탐색한다.
2. 반복되는 전처리 코드를 함수로 뽑는다.
3. 검증된 함수는 .py 파일로 옮긴다.
4. 노트북에서는 함수 호출과 분석에 집중한다.
\`\`\`

---

## 19.2.4 분석 코드에서 자주 생기는 문제

분석용 코드에서 자주 생기는 문제는 다음과 같다.

\`\`\`text
- 셀 실행 순서가 꼬여서 결과가 달라진다.
- 이전에 만든 변수가 남아 있어 오류를 찾기 어렵다.
- 파일 경로가 개인 컴퓨터에만 맞게 작성되어 있다.
- 같은 전처리 코드가 여러 셀에 반복된다.
- 중간 데이터가 어디서 만들어졌는지 추적하기 어렵다.
- 원천 데이터를 덮어써서 복구하기 어렵다.
\`\`\`

이 문제를 줄이기 위해서는 데이터 작업의 흐름을 명확히 나누는 것이 좋다.

\`\`\`text
raw data      : 원본 데이터
interim data  : 중간 처리 데이터
processed data: 분석 가능한 데이터
reports       : 결과 리포트
logs          : 실행 기록
\`\`\`

---

## 19.2.5 재현 가능한 분석 코드

재현 가능하다는 것은 같은 입력 데이터와 같은 코드로 같은 결과를 얻을 수 있다는 뜻이다.

재현 가능한 분석 코드를 만들려면 다음을 지켜야 한다.

\`\`\`text
- 원본 데이터를 직접 수정하지 않는다.
- 입력 파일과 출력 파일을 명확히 구분한다.
- 실행 순서가 코드에 드러나게 한다.
- 설정값을 코드 곳곳에 흩뿌리지 않는다.
- 처리 과정에서 발생한 오류를 기록한다.
- 사용한 데이터 버전이나 생성 시간을 남긴다.
\`\`\`

간단한 출력 파일명 규칙도 도움이 된다.

\`\`\`python
from datetime import datetime

now = datetime.now().strftime("%Y%m%d_%H%M%S")
output_name = f"orders_cleaned_{now}.csv"

print(output_name)
\`\`\`

이렇게 하면 같은 작업을 여러 번 실행해도 결과 파일을 구분할 수 있다.

---

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

# 19.4 데이터 품질 확인

데이터 품질은 분석 결과의 신뢰도를 결정한다. 잘못된 데이터로 분석하면 결과도 잘못된다. 따라서 데이터분석 전에는 품질 확인이 반드시 필요하다.

## 19.4.1 누락값 확인

누락값은 데이터가 비어 있는 상태를 말한다.

CSV에서는 누락값이 다음과 같이 나타날 수 있다.

\`\`\`text
- 빈 문자열 ""
- 공백 "   "
- NULL
- None
- N/A
- -
\`\`\`

문자열 기준으로 빈 값을 확인하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def is_blank(value: str | None) -> bool:
    if value is None:
        return True
    return value.strip() == ""

print(is_blank(""))
print(is_blank("   "))
print(is_blank("홍길동"))
\`\`\`

필수 컬럼에 빈 값이 있는지 검사할 수도 있다.

\`\`\`python
def find_blank_required_fields(
    row: dict[str, str],
    required_fields: list[str],
) -> list[str]:
    blank_fields = []

    for field in required_fields:
        if is_blank(row.get(field)):
            blank_fields.append(field)

    return blank_fields
\`\`\`

---

## 19.4.2 중복값 확인

중복 데이터는 분석 결과를 왜곡할 수 있다. 예를 들어 주문 데이터가 중복되면 매출이 실제보다 크게 계산된다.

중복 주문 ID를 찾는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def find_duplicate_values(values: list[str]) -> set[str]:
    seen = set()
    duplicates = set()

    for value in values:
        if value in seen:
            duplicates.add(value)
        else:
            seen.add(value)

    return duplicates

order_ids = ["1001", "1002", "1001", "1003"]
print(find_duplicate_values(order_ids))
\`\`\`

중복을 확인할 때는 기준이 중요하다.

\`\`\`text
- 주문 ID가 같으면 중복인가?
- 고객 ID와 주문일이 같으면 중복인가?
- 모든 컬럼이 같을 때만 중복인가?
\`\`\`

분석 목적에 따라 중복 기준을 정해야 한다.

---

## 19.4.3 잘못된 타입 확인

CSV에서 읽은 값은 기본적으로 문자열이다. 따라서 숫자처럼 보이는 값도 처음에는 문자열이다.

\`\`\`python
row = {"amount": "10000"}

print(type(row["amount"]))
\`\`\`

분석하려면 숫자 데이터는 숫자로 변환해야 한다.

하지만 모든 값이 변환 가능한 것은 아니다.

\`\`\`python
def can_parse_int(value: str) -> bool:
    try:
        int(value.replace(",", "").strip())
        return True
    except ValueError:
        return False

print(can_parse_int("10000"))
print(can_parse_int("10,000"))
print(can_parse_int("금액없음"))
\`\`\`

이런 검증 함수는 데이터분석 전에 매우 유용하다.

---

## 19.4.4 날짜 형식 확인

날짜는 데이터분석에서 매우 중요하다. 월별 매출, 주간 사용자 수, 기간별 변화량 같은 분석은 모두 날짜를 기준으로 한다.

날짜 형식을 검사하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
from datetime import datetime


def is_valid_date(value: str, date_format: str = "%Y-%m-%d") -> bool:
    try:
        datetime.strptime(value.strip(), date_format)
        return True
    except ValueError:
        return False

print(is_valid_date("2026-01-05"))
print(is_valid_date("2026/01/05"))
\`\`\`

여러 날짜 형식을 허용하려면 다음과 같이 작성할 수 있다.

\`\`\`python
def parse_date_flexible(value: str) -> str | None:
    formats = ["%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d"]

    for date_format in formats:
        try:
            parsed = datetime.strptime(value.strip(), date_format)
            return parsed.strftime("%Y-%m-%d")
        except ValueError:
            pass

    return None

print(parse_date_flexible("2026/01/05"))
print(parse_date_flexible("2026.01.05"))
print(parse_date_flexible("잘못된 날짜"))
\`\`\`

---

## 19.4.5 범위 확인

데이터가 타입상으로는 맞아도 값의 범위가 이상할 수 있다.

예를 들어 다음 값들은 숫자지만 이상할 수 있다.

\`\`\`text
- 나이: -3
- 할인율: 1.5
- 주문 금액: -10000
- 평점: 7점, 단 5점 만점일 때
\`\`\`

범위를 검사하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def is_in_range(value: int | float, min_value: int | float, max_value: int | float) -> bool:
    return min_value <= value <= max_value

print(is_in_range(20, 0, 120))
print(is_in_range(-3, 0, 120))
\`\`\`

분석 전에 값의 범위를 확인하면 비정상 데이터를 빠르게 찾을 수 있다.

---

## 19.4.6 인코딩 문제 확인

한글 데이터에서는 인코딩 문제가 자주 발생한다. 특히 CSV 파일을 엑셀에서 저장하거나 외부 시스템에서 내려받으면 인코딩이 다를 수 있다.

대표적인 인코딩은 다음과 같다.

\`\`\`text
- utf-8
- utf-8-sig
- cp949
\`\`\`

파일을 읽을 때 오류가 발생하면 다른 인코딩을 시도해야 할 수 있다.

\`\`\`python
from pathlib import Path


def read_text_with_candidates(path: Path, encodings: list[str]) -> str:
    last_error = None

    for encoding in encodings:
        try:
            return path.read_text(encoding=encoding)
        except UnicodeDecodeError as error:
            last_error = error

    raise UnicodeDecodeError(
        last_error.encoding,
        last_error.object,
        last_error.start,
        last_error.end,
        "지원하는 인코딩으로 읽을 수 없습니다.",
    )
\`\`\`

실무에서는 인코딩을 추측하기보다, 가능하면 데이터 제공처에서 인코딩 정보를 확인하는 것이 좋다.

---

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

# 19.6 데이터분석 기초 과정 예고

이 장까지 마치면 데이터분석 수업으로 넘어갈 준비가 된다. 다음 과정에서는 파이썬 문법 자체보다 데이터를 분석하는 도구와 사고방식을 다룬다.

## 19.6.1 NumPy 기초

NumPy는 수치 계산을 위한 핵심 라이브러리다.

데이터분석 기초 과정에서는 다음을 다룰 수 있다.

\`\`\`text
- 배열의 개념
- 리스트와 배열의 차이
- 벡터 연산
- 배열 인덱싱과 슬라이싱
- 기본 통계 계산
\`\`\`

NumPy는 \`pandas\`와 여러 머신러닝 도구의 기반이 된다.

---

## 19.6.2 pandas 기초

pandas는 표 형태 데이터를 다루는 핵심 도구다.

기초 과정에서는 다음을 다룬다.

\`\`\`text
- Series
- DataFrame
- CSV 읽기
- Excel 읽기
- 컬럼 선택
- 행 필터링
- 정렬
- 결측치 처리
- 중복 제거
- 그룹화와 집계
\`\`\`

이번 장에서 배운 데이터 검증과 정리 개념은 pandas에서 더 편리한 방식으로 확장된다.

---

## 19.6.3 데이터 시각화 기초

분석 결과를 이해하려면 시각화가 필요하다.

기초 과정에서는 다음을 다룰 수 있다.

\`\`\`text
- 선 그래프
- 막대 그래프
- 히스토그램
- 산점도
- 데이터 분포 확인
- 시간에 따른 변화 확인
\`\`\`

시각화는 단순히 예쁜 그래프를 만드는 것이 아니라, 데이터의 패턴을 이해하기 위한 도구다.

---

## 19.6.4 탐색적 데이터 분석

탐색적 데이터 분석은 본격적인 분석 전에 데이터를 이해하는 과정이다.

예를 들어 다음 질문을 던진다.

\`\`\`text
- 데이터는 몇 행, 몇 열인가?
- 어떤 컬럼이 있는가?
- 결측치는 얼마나 있는가?
- 중복 데이터는 있는가?
- 숫자 데이터의 범위는 어떤가?
- 범주형 데이터에는 어떤 값들이 있는가?
- 이상치는 있는가?
\`\`\`

이 장에서 배운 데이터 품질 확인은 탐색적 데이터 분석의 출발점이 된다.

---

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

# 19.8 데이터분석 전 체크리스트

데이터분석을 시작하기 전에는 다음 질문을 확인하는 것이 좋다.

## 19.8.1 데이터 출처 체크

\`\`\`text
- 데이터는 어디에서 왔는가?
- 파일인가, API인가, DB인가?
- 데이터 생성 기준일은 언제인가?
- 데이터가 최신인가?
- 같은 데이터를 다시 받을 수 있는가?
\`\`\`

## 19.8.2 파일 상태 체크

\`\`\`text
- 파일이 존재하는가?
- 파일 크기가 0이 아닌가?
- 인코딩은 무엇인가?
- 압축 파일이라면 정상적으로 풀리는가?
- 여러 파일이라면 파일명 규칙이 일관적인가?
\`\`\`

## 19.8.3 구조 체크

\`\`\`text
- 헤더가 있는가?
- 필요한 컬럼이 모두 있는가?
- 컬럼명이 일관적인가?
- 행 수가 예상 범위인가?
- 중첩 구조가 있다면 어떻게 펼칠 것인가?
\`\`\`

## 19.8.4 값 체크

\`\`\`text
- 필수 값이 비어 있지 않은가?
- 숫자 컬럼이 숫자로 변환 가능한가?
- 날짜 컬럼이 날짜로 변환 가능한가?
- 범주형 값이 예상 목록 안에 있는가?
- 음수나 비정상 범위 값은 없는가?
\`\`\`

## 19.8.5 중복과 무결성 체크

\`\`\`text
- 중복 행이 있는가?
- 고유해야 하는 ID가 중복되지 않는가?
- 서로 연결되는 데이터의 ID가 맞는가?
- 주문 데이터와 고객 데이터가 연결 가능한가?
\`\`\`

## 19.8.6 저장과 추적 체크

\`\`\`text
- 원본 데이터를 보존했는가?
- 정리된 데이터를 별도 저장했는가?
- 실패한 데이터도 따로 저장했는가?
- 처리 로그를 남겼는가?
- 처리 시간과 행 수를 기록했는가?
\`\`\`

---

# 핵심 정리

이 장에서는 데이터분석 과정으로 넘어가기 전에 필요한 준비를 살펴보았다.

데이터분석은 \`pandas\`를 사용하는 순간부터 시작되는 것이 아니다. 그 이전에 데이터를 가져오고, 저장하고, 검증하고, 정리하는 과정이 필요하다.

이번 장에서 기억해야 할 핵심은 다음과 같다.

\`\`\`text
1. 원천 데이터는 함부로 수정하지 않는다.
2. 분석 가능한 데이터는 별도 위치에 저장한다.
3. 데이터 검증은 분석 전에 반드시 수행한다.
4. 누락값, 중복값, 타입 오류, 날짜 오류를 확인한다.
5. 반복되는 정리 작업은 함수로 만든다.
6. 오류 행은 무시하지 말고 이유와 함께 기록한다.
7. 처리 결과는 로그와 메타데이터로 남긴다.
8. pandas로 넘기기 전에 파일, 컬럼, 샘플, 스키마를 확인한다.
\`\`\`

고급 파이썬 과정에서 배운 내용은 데이터분석을 위한 기반이 된다. 함수는 전처리 로직을 분리하는 데 쓰이고, 예외 처리는 깨진 데이터를 다루는 데 쓰이며, 로깅은 처리 과정을 추적하는 데 쓰인다. 타입 힌트와 테스트는 전처리 코드의 신뢰성을 높이고, 파일·API·DB 처리는 데이터를 가져오는 기반이 된다.

즉, 데이터분석 전에 필요한 것은 단순한 문법 지식이 아니라 **신뢰 가능한 데이터 처리 흐름을 설계하는 능력**이다.

---

# 연습문제

## 문제 1. 개념 확인

다음 중 데이터분석 전에 원천 데이터를 보존해야 하는 이유로 가장 적절한 것을 고르시오.

1. 원본 파일 크기를 줄이기 위해서
2. 문제가 생겼을 때 다시 돌아갈 기준이 필요하기 때문에
3. 분석 결과를 더 예쁘게 만들기 위해서
4. 파일명을 자동으로 바꾸기 위해서

---

## 문제 2. 개념 확인

다음 중 데이터 파이프라인의 기본 흐름으로 가장 적절한 것을 고르시오.

1. 분석 → 수집 → 저장 → 검증
2. 수집 → 원천 저장 → 검증 → 정리 → 분석용 저장
3. 정리 → 수집 → 원천 저장 → 분석
4. 시각화 → 분석 → 수집 → 검증

---

## 문제 3. 코드 읽기

다음 코드의 실행 결과를 예상하시오.

\`\`\`python
def is_blank(value: str | None) -> bool:
    if value is None:
        return True
    return value.strip() == ""

print(is_blank(""))
print(is_blank("   "))
print(is_blank("data"))
\`\`\`

---

## 문제 4. 코드 작성

다음 조건을 만족하는 \`normalize_column_name()\` 함수를 작성하시오.

\`\`\`text
- 앞뒤 공백을 제거한다.
- 모두 소문자로 바꾼다.
- 공백은 언더스코어(_)로 바꾼다.
\`\`\`

예시:

\`\`\`python
normalize_column_name(" Order ID ")
\`\`\`

결과:

\`\`\`text
order_id
\`\`\`

---

## 문제 5. 코드 작성

금액 문자열을 정수로 변환하는 \`parse_amount()\` 함수를 작성하시오.

조건은 다음과 같다.

\`\`\`text
- 쉼표를 제거한다.
- '원' 문자를 제거한다.
- 앞뒤 공백을 제거한다.
- 정수로 변환할 수 없으면 None을 반환한다.
\`\`\`

예시:

\`\`\`python
parse_amount("10,000원")  # 10000
parse_amount("금액없음")  # None
\`\`\`

---

## 문제 6. 코드 작성

문자열 날짜를 \`YYYY-MM-DD\` 형식으로 통일하는 \`parse_date_flexible()\` 함수를 작성하시오.

허용할 입력 형식은 다음과 같다.

\`\`\`text
2026-01-05
2026/01/05
2026.01.05
\`\`\`

변환할 수 없으면 \`None\`을 반환한다.

---

## 문제 7. 코드 작성

다음 행 데이터에서 필수 컬럼이 비어 있는지 검사하는 함수를 작성하시오.

\`\`\`python
row = {
    "order_id": "1001",
    "customer_id": "",
    "amount": "10000",
}

required_fields = ["order_id", "customer_id", "amount"]
\`\`\`

함수 이름은 \`find_blank_required_fields()\`로 하고, 비어 있는 필드 이름의 리스트를 반환하게 하시오.

예상 결과:

\`\`\`python
["customer_id"]
\`\`\`

---

## 문제 8. 서술형

노트북 코드와 \`.py\` 파일 코드의 차이를 설명하시오. 또한 데이터분석 작업에서 두 방식을 어떻게 함께 사용하는 것이 좋은지 설명하시오.

---

## 문제 9. 서술형

분석 전에 데이터 품질을 확인할 때 점검해야 할 항목을 5가지 이상 적으시오.

---

## 문제 10. 종합 설계

주문 CSV 파일을 분석 가능한 상태로 만들기 위한 처리 흐름을 설계하시오.

다음 항목을 포함해야 한다.

\`\`\`text
- 원본 파일 위치
- 정리된 파일 저장 위치
- 오류 행 저장 위치
- 검증할 컬럼
- 정리할 값
- 로그 또는 메타데이터에 남길 정보
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답: 2

원천 데이터는 문제가 생겼을 때 다시 돌아갈 수 있는 기준이다. 정리 과정에서 실수로 데이터가 잘못 바뀌어도 원본이 보존되어 있으면 다시 처리할 수 있다.

---

## 문제 2 정답

정답: 2

일반적인 데이터 준비 흐름은 다음과 같다.

\`\`\`text
수집 → 원천 저장 → 검증 → 정리 → 변환 → 분석용 저장 → 분석
\`\`\`

---

## 문제 3 정답

\`\`\`text
True
True
False
\`\`\`

\`""\`는 빈 문자열이고, \`"   "\`는 공백을 제거하면 빈 문자열이 된다. \`"data"\`는 값이 있으므로 \`False\`가 반환된다.

---

## 문제 4 정답 예시

\`\`\`python
def normalize_column_name(name: str) -> str:
    return name.strip().lower().replace(" ", "_")
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
print(normalize_column_name(" Order ID "))
\`\`\`

결과:

\`\`\`text
order_id
\`\`\`

---

## 문제 5 정답 예시

\`\`\`python
def parse_amount(value: str) -> int | None:
    try:
        cleaned = value.replace(",", "").replace("원", "").strip()
        return int(cleaned)
    except ValueError:
        return None
\`\`\`

\`"10,000원"\`은 쉼표와 \`원\`을 제거하면 \`"10000"\`이 되고 정수로 변환된다. \`"금액없음"\`은 정수로 변환할 수 없으므로 \`None\`을 반환한다.

---

## 문제 6 정답 예시

\`\`\`python
from datetime import datetime


def parse_date_flexible(value: str) -> str | None:
    formats = ["%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d"]

    for date_format in formats:
        try:
            parsed = datetime.strptime(value.strip(), date_format)
            return parsed.strftime("%Y-%m-%d")
        except ValueError:
            pass

    return None
\`\`\`

여러 형식을 차례대로 시도하고, 성공하면 \`YYYY-MM-DD\` 형식의 문자열로 반환한다.

---

## 문제 7 정답 예시

\`\`\`python
def is_blank(value: str | None) -> bool:
    if value is None:
        return True
    return value.strip() == ""


def find_blank_required_fields(
    row: dict[str, str],
    required_fields: list[str],
) -> list[str]:
    blank_fields = []

    for field in required_fields:
        if is_blank(row.get(field)):
            blank_fields.append(field)

    return blank_fields
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
row = {
    "order_id": "1001",
    "customer_id": "",
    "amount": "10000",
}

required_fields = ["order_id", "customer_id", "amount"]

print(find_blank_required_fields(row, required_fields))
\`\`\`

결과:

\`\`\`text
['customer_id']
\`\`\`

---

## 문제 8 정답 예시

노트북 코드는 데이터를 탐색하고 중간 결과를 확인하기에 좋다. 그래프를 바로 볼 수 있고, 셀 단위로 코드를 실행하면서 분석 아이디어를 실험하기 쉽다.

반면 \`.py\` 파일 코드는 반복 실행과 자동화에 적합하다. 함수와 클래스로 구조화하기 좋고, 테스트와 로깅을 붙이기 쉽다.

데이터분석 작업에서는 먼저 노트북에서 데이터를 탐색하고, 반복되는 전처리 로직은 함수로 분리한 뒤 \`.py\` 파일로 옮기는 방식이 좋다. 이후 노트북에서는 검증된 함수를 불러와 분석에 집중할 수 있다.

---

## 문제 9 정답 예시

분석 전 데이터 품질 확인 항목은 다음과 같다.

\`\`\`text
- 필수 컬럼 존재 여부
- 누락값 여부
- 중복값 여부
- 숫자 데이터 변환 가능 여부
- 날짜 데이터 변환 가능 여부
- 인코딩 문제 여부
- 비정상 범위 값 여부
- 컬럼명 일관성
- 행 수가 예상 범위인지 여부
- 고유 ID 중복 여부
\`\`\`

---

## 문제 10 정답 예시

주문 CSV 파일을 분석 가능한 상태로 만들기 위한 흐름은 다음과 같이 설계할 수 있다.

\`\`\`text
1. 원본 파일 위치
   - data/raw/orders.csv

2. 정리된 파일 저장 위치
   - data/processed/orders_cleaned.csv

3. 오류 행 저장 위치
   - data/interim/orders_errors.csv

4. 검증할 컬럼
   - order_id
   - customer_id
   - amount
   - order_date

5. 정리할 값
   - order_id: 정수 변환
   - customer_id: 앞뒤 공백 제거
   - amount: 쉼표와 원 문자 제거 후 정수 변환
   - order_date: YYYY-MM-DD 형식으로 통일

6. 로그 또는 메타데이터에 남길 정보
   - 원본 파일명
   - 처리 시간
   - 전체 행 수
   - 성공 행 수
   - 실패 행 수
   - 출력 파일명
   - 오류 파일명
\`\`\`

이 흐름을 사용하면 원본 데이터와 분석용 데이터를 분리할 수 있고, 실패한 데이터도 추적할 수 있다.

---

# 마무리

이 장은 고급 파이썬 과정과 데이터분석 과정 사이의 연결 지점이다. 지금까지 배운 파이썬 문법과 실무 구조는 모두 데이터분석의 기반이 된다.

다음 장에서는 고급 파이썬 과정의 마지막 단계로, 지금까지 배운 내용을 활용한 종합 실습을 진행한다. 종합 실습에서는 CSV 데이터 검증 도구, API 데이터 수집기, 로그 파일 분석 전처리기, SQLite 기반 데이터 저장 도구처럼 데이터분석 전 단계에서 실제로 사용할 수 있는 도구를 만들어본다.
`;export{e as default};