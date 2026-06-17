var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-9 -->

# 17.9 종합 예제: CSV 검증 코드 최적화하기

## 문제 상황

다음과 같은 CSV 데이터가 있다고 하자.

\`\`\`csv
order_id,customer_id,amount,status
O001,C001,"30,000",paid
O002,C999,"15,000",paid
O003,C002,"abc",cancelled
\`\`\`

우리는 주문 데이터를 검증해야 한다.

검증 조건은 다음과 같다.

- 고객 ID가 유효한 고객 목록에 있어야 한다.
- 금액은 숫자로 변환 가능해야 한다.
- 상태값은 \`paid\`, \`cancelled\`, \`pending\` 중 하나여야 한다.

## 비효율적인 코드

먼저 단순하지만 비효율적인 코드를 보자.

\`\`\`python
import csv

valid_customer_ids = ["C001", "C002", "C003", "C004"]
valid_statuses = ["paid", "cancelled", "pending"]

invalid_rows = []

with open("orders.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    rows = list(reader)

for row in rows:
    errors = []

    if row["customer_id"] not in valid_customer_ids:
        errors.append("invalid customer_id")

    amount_text = row["amount"].replace(",", "")
    if not amount_text.isdigit():
        errors.append("invalid amount")

    if row["status"].strip().lower() not in valid_statuses:
        errors.append("invalid status")

    if errors:
        row["errors"] = "; ".join(errors)
        invalid_rows.append(row)

print(invalid_rows)
\`\`\`

이 코드는 데이터가 작을 때는 괜찮다. 하지만 데이터가 커지면 다음 문제가 있다.

- CSV 전체를 \`list(reader)\`로 메모리에 올린다.
- 유효 고객 ID를 리스트에서 반복 검색한다.
- 유효 상태값도 리스트에서 반복 검색한다.
- 잘못된 행을 출력만 하고 파일로 남기지 않는다.

## 개선 방향

개선 방향은 다음과 같다.

- 유효 고객 ID와 상태값을 집합으로 바꾼다.
- CSV를 한 줄씩 읽는다.
- 잘못된 행은 바로 파일에 기록한다.
- 금액 변환 함수를 분리한다.
- 처리 건수와 오류 건수를 집계한다.

## 개선된 코드

\`\`\`python
import csv
from pathlib import Path

VALID_CUSTOMER_IDS = {"C001", "C002", "C003", "C004"}
VALID_STATUSES = {"paid", "cancelled", "pending"}


def parse_amount(value: str) -> int | None:
    cleaned = value.replace(",", "").strip()

    if not cleaned.isdigit():
        return None

    return int(cleaned)


def validate_row(row: dict[str, str]) -> list[str]:
    errors = []

    if row["customer_id"] not in VALID_CUSTOMER_IDS:
        errors.append("invalid customer_id")

    if parse_amount(row["amount"]) is None:
        errors.append("invalid amount")

    status = row["status"].strip().lower()
    if status not in VALID_STATUSES:
        errors.append("invalid status")

    return errors


def validate_csv(input_path: str, output_path: str) -> None:
    total_count = 0
    invalid_count = 0

    with open(input_path, "r", encoding="utf-8", newline="") as input_file, open(
        output_path,
        "w",
        encoding="utf-8",
        newline="",
    ) as output_file:
        reader = csv.DictReader(input_file)

        fieldnames = list(reader.fieldnames or []) + ["errors"]
        writer = csv.DictWriter(output_file, fieldnames=fieldnames)
        writer.writeheader()

        for row in reader:
            total_count += 1
            errors = validate_row(row)

            if errors:
                invalid_count += 1
                row["errors"] = "; ".join(errors)
                writer.writerow(row)

    print(f"전체 행 수: {total_count}")
    print(f"오류 행 수: {invalid_count}")


validate_csv("orders.csv", "invalid_orders.csv")
\`\`\`

이 코드는 다음 면에서 개선되었다.

- 고객 ID와 상태값 포함 여부 확인이 빠르다.
- CSV 전체를 메모리에 올리지 않는다.
- 잘못된 행을 별도 파일에 저장한다.
- 검증 로직이 함수로 분리되어 테스트하기 쉽다.
- 전체 건수와 오류 건수를 확인할 수 있다.

## 더 개선할 수 있는 부분

실무에서는 다음 내용을 추가할 수 있다.

- 로그 남기기
- 파일 경로를 명령행 인수로 받기
- 유효 고객 목록을 DB나 파일에서 읽기
- 필수 컬럼 누락 검사
- 큰 파일 처리 시간 측정
- 오류 유형별 개수 집계
- 테스트 코드 작성

이 종합 예제는 고급 파이썬 과정과 데이터분석 과정 사이를 연결한다. pandas로 분석하기 전에, 원천 CSV를 안전하고 효율적으로 검증하고 정리하는 흐름을 보여준다.

---

# 17장 핵심 정리

성능 최적화는 빠른 코드를 감으로 작성하는 일이 아니다. 정확하게 동작하는 코드를 먼저 만들고, 실행 시간을 측정하고, 프로파일링으로 병목을 찾은 뒤, 필요한 부분만 개선하는 과정이다.

이 장에서 배운 핵심은 다음과 같다.

- 성능 최적화는 정확성과 가독성을 해치지 않는 범위에서 해야 한다.
- 최적화 전에는 반드시 측정해야 한다.
- \`time.perf_counter()\`는 간단한 실행 시간 측정에 유용하다.
- \`timeit\`은 작은 코드 조각을 반복 측정할 때 유용하다.
- \`cProfile\`은 함수별 호출 횟수와 실행 시간을 확인하는 데 사용한다.
- 리스트 검색을 반복하는 코드에서는 집합이나 딕셔너리를 고려한다.
- 중첩 반복은 데이터가 커질수록 급격히 느려질 수 있다.
- 캐싱은 반복 계산을 줄일 수 있지만 메모리 사용량과 함수 특성을 고려해야 한다.
- 큰 데이터는 한 번에 메모리에 올리지 말고 한 줄씩 또는 청크 단위로 처리한다.
- 제너레이터는 중간 리스트 생성을 줄여 메모리를 절약할 수 있다.
- \`tracemalloc\`은 메모리 할당 위치를 추적하는 데 사용할 수 있다.
- 실무 최적화는 측정, 자료구조 선택, 반복문 개선, 스트리밍 처리, 중간 결과 저장의 조합이다.

---

# 연습문제

## 문제 1

성능 최적화를 시작하기 전에 가장 먼저 해야 할 일은 무엇인가?

1. 코드를 최대한 짧게 줄인다.
2. 실행 시간을 측정하고 병목을 찾는다.
3. 모든 반복문을 리스트 컴프리헨션으로 바꾼다.
4. 모든 함수에 캐시를 적용한다.

## 문제 2

다음 중 \`timeit\`을 사용하는 주된 목적은 무엇인가?

1. 큰 파일을 압축하기 위해
2. 작은 코드 조각의 실행 시간을 반복 측정하기 위해
3. 메모리 누수를 자동으로 수정하기 위해
4. 데이터베이스 연결을 관리하기 위해

## 문제 3

다음 코드에서 포함 여부 확인이 자주 발생하고, \`valid_ids\`의 크기가 매우 크다면 어떤 자료구조로 바꾸는 것이 적절한가?

\`\`\`python
valid_ids = ["A001", "A002", "A003"]

if user_id in valid_ids:
    print("valid")
\`\`\`

## 문제 4

다음 코드의 성능 문제가 무엇인지 설명하라.

\`\`\`python
for order in orders:
    for customer in customers:
        if order["customer_id"] == customer["customer_id"]:
            order["customer_name"] = customer["name"]
\`\`\`

## 문제 5

다음 중 \`cProfile\`로 확인하기 좋은 정보가 아닌 것은 무엇인가?

1. 함수 호출 횟수
2. 함수별 실행 시간
3. 누적 실행 시간
4. 코드의 문법 오류 자동 수정

## 문제 6

다음 코드에서 중간 리스트를 만들지 않도록 제너레이터 표현식으로 바꾸어라.

\`\`\`python
numbers = [number * 2 for number in range(1000)]
total = sum(numbers)
\`\`\`

## 문제 7

다음 함수에 \`functools.lru_cache\`를 적용하라.

\`\`\`python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

## 문제 8

\`lru_cache\`를 적용하기에 적합하지 않은 함수의 특징을 두 가지 쓰라.

## 문제 9

다음 파일 처리 코드의 문제점을 설명하고, 한 줄씩 읽는 방식으로 바꾸어라.

\`\`\`python
with open("log.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    if "ERROR" in line:
        print(line)
\`\`\`

## 문제 10

다음 코드에서 반복문 안에서 불필요하게 반복되는 작업을 줄여라.

\`\`\`python
for row in rows:
    if row["status"].strip().lower() == "paid":
        paid_count += 1
    if row["status"].strip().lower() == "cancelled":
        cancelled_count += 1
\`\`\`

## 문제 11

다음 코드에서 정렬 위치의 문제점을 설명하라.

\`\`\`python
result = []

for item in items:
    result.append(item)
    result.sort(key=lambda row: row["amount"])
\`\`\`

## 문제 12

\`tracemalloc\`은 어떤 상황에서 유용한가?

## 문제 13

다음 두 코드 중 메모리 사용량이 더 적을 가능성이 큰 코드는 어느 것인가? 이유도 설명하라.

\`\`\`python
# 코드 A
values = [number * 2 for number in range(1_000_000)]
total = sum(values)

# 코드 B
total = sum(number * 2 for number in range(1_000_000))
\`\`\`

## 문제 14

성능 최적화에서 “너무 이른 최적화”가 문제가 되는 이유를 설명하라.

## 문제 15

다음 요구사항을 만족하는 검증 함수를 작성하라.

- 입력은 주문 딕셔너리다.
- \`amount\` 값에서 쉼표를 제거한 뒤 정수로 변환할 수 있어야 한다.
- 변환 가능하면 정수 금액을 반환한다.
- 변환 불가능하면 \`None\`을 반환한다.

예시 입력:

\`\`\`python
{"amount": "30,000"}
{"amount": "abc"}
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답은 2번이다. 성능 최적화는 먼저 측정하고 병목을 찾은 뒤 진행해야 한다. 감으로 코드를 고치면 실제 병목이 아닌 곳을 수정할 수 있다.

## 문제 2 정답

정답은 2번이다. \`timeit\`은 작은 코드 조각의 실행 시간을 반복 측정할 때 유용하다.

## 문제 3 정답

집합을 사용하는 것이 적절하다.

\`\`\`python
valid_ids = {"A001", "A002", "A003"}

if user_id in valid_ids:
    print("valid")
\`\`\`

집합은 포함 여부 확인에 강한 자료구조다. 데이터가 크고 조회가 반복될 때 리스트보다 유리할 수 있다.

## 문제 4 정답

주문마다 고객 목록 전체를 반복 검색하고 있다. 주문 수가 n개, 고객 수가 m개라면 최대 n × m번 비교할 수 있다. 데이터가 커지면 매우 느려질 수 있다.

개선 방법은 고객 ID를 key로 하는 딕셔너리를 먼저 만드는 것이다.

\`\`\`python
customer_map = {
    customer["customer_id"]: customer["name"]
    for customer in customers
}

for order in orders:
    order["customer_name"] = customer_map.get(order["customer_id"])
\`\`\`

## 문제 5 정답

정답은 4번이다. \`cProfile\`은 함수 호출 횟수와 실행 시간을 분석하는 도구이지, 문법 오류를 자동으로 수정하는 도구가 아니다.

## 문제 6 정답

\`\`\`python
total = sum(number * 2 for number in range(1000))
\`\`\`

중간 리스트를 만들지 않고 값을 하나씩 생성해 합산한다.

## 문제 7 정답

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

같은 \`n\`에 대한 결과를 캐시에 저장하므로 반복 계산을 줄일 수 있다.

## 문제 8 정답

예시는 다음과 같다.

- 같은 입력이어도 호출 시점마다 결과가 달라지는 함수
- 파일, API, DB 등 외부 상태에 따라 결과가 달라지는 함수
- 입력값 종류가 너무 많아 캐시가 계속 커지는 함수
- 리스트나 딕셔너리처럼 해시할 수 없는 값을 인자로 받는 함수

## 문제 9 정답

문제점은 \`readlines()\`가 파일 전체를 리스트로 읽는다는 점이다. 파일이 크면 메모리를 많이 사용할 수 있다.

개선 코드는 다음과 같다.

\`\`\`python
with open("log.txt", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line)
\`\`\`

## 문제 10 정답

\`\`\`python
for row in rows:
    status = row["status"].strip().lower()

    if status == "paid":
        paid_count += 1
    if status == "cancelled":
        cancelled_count += 1
\`\`\`

\`strip().lower()\` 변환을 한 번만 수행한다.

## 문제 11 정답

반복문 안에서 값을 하나 추가할 때마다 전체 리스트를 정렬하고 있다. 데이터가 많으면 매우 비효율적이다. 대부분의 경우 모든 값을 추가한 뒤 마지막에 한 번만 정렬하면 된다.

\`\`\`python
result = []

for item in items:
    result.append(item)

result.sort(key=lambda row: row["amount"])
\`\`\`

## 문제 12 정답

\`tracemalloc\`은 파이썬 코드에서 메모리 할당이 어디에서 많이 발생하는지 추적할 때 유용하다. 큰 리스트를 만들거나, 중간 결과를 많이 생성하거나, 메모리 사용량이 계속 증가하는 상황을 분석할 수 있다.

## 문제 13 정답

코드 B가 메모리 사용량이 더 적을 가능성이 크다.

코드 A는 100만 개의 값을 리스트로 만든 뒤 합계를 계산한다. 코드 B는 제너레이터 표현식을 사용해 값을 하나씩 생성하고 바로 합산하므로 중간 리스트를 만들지 않는다.

## 문제 14 정답

너무 이른 최적화는 실제 병목이 아닌 곳을 복잡하게 만들 수 있다. 코드가 어려워지고 테스트와 유지보수가 힘들어질 수 있으며, 실제 성능 개선 효과는 작을 수 있다. 먼저 올바르게 동작하는 코드를 만들고, 측정한 뒤 필요한 부분만 최적화하는 것이 좋다.

## 문제 15 정답

\`\`\`python
def parse_amount(order: dict[str, str]) -> int | None:
    amount_text = order.get("amount", "")
    cleaned = amount_text.replace(",", "").strip()

    if not cleaned.isdigit():
        return None

    return int(cleaned)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
print(parse_amount({"amount": "30,000"}))
print(parse_amount({"amount": "abc"}))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
None
\`\`\`

---

# 참고 문서

- Python 공식 문서: \`timeit\` — Measure execution time of small code snippets  
  https://docs.python.org/3/library/timeit.html
- Python 공식 문서: The Python Profilers  
  https://docs.python.org/3/library/profile.html
- Python 공식 문서: \`functools\` — Higher-order functions and operations on callable objects  
  https://docs.python.org/3/library/functools.html
- Python 공식 문서: \`tracemalloc\` — Trace memory allocations  
  https://docs.python.org/3/library/tracemalloc.html
- Python 공식 문서: \`time\` — Time access and conversions  
  https://docs.python.org/3/library/time.html
- Python 공식 문서: \`collections\` — Container datatypes  
  https://docs.python.org/3/library/collections.html
`;export{e as default};