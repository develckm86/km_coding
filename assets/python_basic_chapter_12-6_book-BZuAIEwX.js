var e=`<!-- 원본: python_basic_chapter_12_book.md / 세부 장: 12-6 -->

# 12.6 실무 코드 개선 예제

### 12.6.1 개선 전 코드

다음 코드는 주문 목록에서 결제 완료된 주문만 골라 총 매출을 계산합니다.

\`\`\`python
orders = [
    {"id": "A001", "status": "paid", "price": 10000, "quantity": 2},
    {"id": "A002", "status": "cancelled", "price": 20000, "quantity": 1},
    {"id": "A003", "status": "paid", "price": 15000, "quantity": 3},
]

x = 0

for i in orders:
    if i["status"] == "paid":
        x += i["price"] * i["quantity"]

print(x)
\`\`\`

이 코드는 동작합니다. 하지만 변수명 \`x\`, \`i\`가 무엇을 의미하는지 명확하지 않습니다. 또한 계산 로직이 함수로 분리되어 있지 않아 재사용하기 어렵습니다.

---

### 12.6.2 변수명 개선하기

먼저 변수명을 바꿔봅시다.

\`\`\`python
orders = [
    {"id": "A001", "status": "paid", "price": 10000, "quantity": 2},
    {"id": "A002", "status": "cancelled", "price": 20000, "quantity": 1},
    {"id": "A003", "status": "paid", "price": 15000, "quantity": 3},
]

total_sales = 0

for order in orders:
    if order["status"] == "paid":
        total_sales += order["price"] * order["quantity"]

print(total_sales)
\`\`\`

이제 코드의 의미가 더 명확합니다.

---

### 12.6.3 함수로 분리하기

계산 로직을 함수로 분리합니다.

\`\`\`python
def calculate_total_sales(orders):
    total_sales = 0

    for order in orders:
        if order["status"] == "paid":
            total_sales += order["price"] * order["quantity"]

    return total_sales


orders = [
    {"id": "A001", "status": "paid", "price": 10000, "quantity": 2},
    {"id": "A002", "status": "cancelled", "price": 20000, "quantity": 1},
    {"id": "A003", "status": "paid", "price": 15000, "quantity": 3},
]

print(calculate_total_sales(orders))
\`\`\`

이제 같은 계산을 다른 주문 목록에도 재사용할 수 있습니다.

---

### 12.6.4 타입 힌트 추가하기

함수에 타입 힌트를 추가해봅시다.

\`\`\`python
def calculate_total_sales(orders: list[dict[str, str | int]]) -> int:
    total_sales = 0

    for order in orders:
        if order["status"] == "paid":
            total_sales += int(order["price"]) * int(order["quantity"])

    return total_sales
\`\`\`

다만 \`dict[str, str | int]\`는 조금 복잡하고, key마다 어떤 값이 들어가는지 완전히 명확하지 않습니다. 이럴 때는 \`dataclass\`를 사용할 수 있습니다.

---

### 12.6.5 데이터 클래스로 개선하기

주문 데이터를 클래스로 표현합니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Order:
    id: str
    status: str
    price: int
    quantity: int
\`\`\`

이제 함수의 타입 힌트가 더 명확해집니다.

\`\`\`python
def calculate_total_sales(orders: list[Order]) -> int:
    total_sales = 0

    for order in orders:
        if order.status == "paid":
            total_sales += order.price * order.quantity

    return total_sales
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
orders = [
    Order(id="A001", status="paid", price=10000, quantity=2),
    Order(id="A002", status="cancelled", price=20000, quantity=1),
    Order(id="A003", status="paid", price=15000, quantity=3),
]

print(calculate_total_sales(orders))
\`\`\`

딕셔너리보다 코드가 조금 길어졌지만, 데이터 구조는 훨씬 명확해졌습니다.

---

### 12.6.6 상수와 로그 추가하기

상태값 문자열을 직접 쓰는 대신 상수로 분리합니다.

\`\`\`python
PAID_STATUS = "paid"
\`\`\`

그리고 로그를 추가합니다.

\`\`\`python
import logging
from dataclasses import dataclass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

PAID_STATUS = "paid"


@dataclass
class Order:
    id: str
    status: str
    price: int
    quantity: int


def calculate_total_sales(orders: list[Order]) -> int:
    logging.info("총 매출 계산 시작: 주문 %s건", len(orders))

    total_sales = 0

    for order in orders:
        if order.status == PAID_STATUS:
            total_sales += order.price * order.quantity

    logging.info("총 매출 계산 완료: %s원", total_sales)
    return total_sales


orders = [
    Order(id="A001", status="paid", price=10000, quantity=2),
    Order(id="A002", status="cancelled", price=20000, quantity=1),
    Order(id="A003", status="paid", price=15000, quantity=3),
]

print(calculate_total_sales(orders))
\`\`\`

이 코드는 처음 코드보다 길지만, 실무 관점에서는 더 좋은 코드입니다.

\`\`\`text
- 변수명이 명확하다.
- 계산 로직이 함수로 분리되어 있다.
- 타입 힌트가 있다.
- 주문 데이터 구조가 명확하다.
- 상태값을 상수로 관리한다.
- 실행 기록을 로그로 남긴다.
\`\`\`

실무에서는 코드 길이가 조금 늘어나더라도 유지보수성이 좋아지는 방향이 더 중요할 때가 많습니다.

---

## 12장 핵심 정리

이 장에서는 파이썬 코드를 실무적으로 작성하기 위한 습관을 배웠습니다.

첫째, 좋은 코드는 실행만 되는 코드가 아니라 읽기 쉬운 코드입니다. 변수명, 함수명, 클래스명은 코드의 의미를 전달하는 중요한 도구입니다. 구체적인 이름을 사용하는 것은 파이썬만의 특징이 아니라 모든 언어에서 중요한 좋은 코드 작성 습관입니다.

둘째, 함수는 하나의 역할을 하도록 나누는 것이 좋습니다. 중복 코드는 함수나 상수로 분리하고, 복잡한 조건문은 의미 있는 변수나 함수로 나누면 읽기 쉬워집니다.

셋째, 타입 힌트는 함수의 입력과 출력을 명확하게 보여줍니다. 타입 힌트가 실행 중 타입을 강제하는 것은 아니지만, 코드를 읽고 사용하는 사람에게 중요한 정보를 제공합니다.

넷째, 실무 프로그램에서는 \`print()\`보다 \`logging\`이 더 적합할 때가 많습니다. 로그를 사용하면 프로그램의 실행 흐름, 오류, 처리 결과를 체계적으로 기록할 수 있습니다.

다섯째, 설정값은 코드와 분리하는 것이 좋습니다. 파일 경로, API URL, 인코딩, 민감 정보 같은 값은 상수, 설정 파일, 환경 변수로 관리할 수 있습니다.

여섯째, iterable, iterator, generator는 반복 처리의 기반 개념입니다. 특히 제너레이터는 큰 데이터를 한 번에 만들지 않고 필요한 만큼만 처리할 때 유용합니다.

---

## 연습문제

### 문제 1

다음 변수명을 더 의미 있게 바꿔보세요.

\`\`\`python
a = "홍길동"
b = 30000
c = 2
d = b * c
\`\`\`

---

### 문제 2

다음 불리언 변수명을 더 읽기 좋게 바꿔보세요.

\`\`\`python
login = True
admin = False
coupon = True
\`\`\`

---

### 문제 3

다음 함수명을 더 명확하게 바꿔보세요.

\`\`\`python
def do(price):
    return price * 0.9
\`\`\`

---

### 문제 4

다음 코드에서 중복되는 값을 상수로 분리해보세요.

\`\`\`python
if total_price >= 50000:
    delivery_fee = 0
else:
    delivery_fee = 3000
\`\`\`

---

### 문제 5

다음 함수에 타입 힌트를 추가하세요.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

---

### 문제 6

다음 함수는 이메일 주소에 \`@\`가 포함되어 있는지 검사합니다. 매개변수와 반환값에 타입 힌트를 추가하세요.

\`\`\`python
def is_valid_email(email):
    return "@" in email
\`\`\`

---

### 문제 7

다음 함수는 값을 출력만 하고 반환하지 않습니다. 반환 타입 힌트를 추가하세요.

\`\`\`python
def print_message(message: str):
    print(message)
\`\`\`

---

### 문제 8

다음 리스트 변수에 타입 힌트를 추가하세요.

\`\`\`python
names = ["홍길동", "김민수", "이지영"]
\`\`\`

---

### 문제 9

다음 딕셔너리 변수에 타입 힌트를 추가하세요.

\`\`\`python
scores = {
    "국어": 90,
    "영어": 85,
    "수학": 95
}
\`\`\`

---

### 문제 10

\`logging\`을 사용해 “프로그램을 시작합니다.”라는 INFO 로그를 출력하는 코드를 작성하세요.

---

### 문제 11

다음 코드에서 예외가 발생했을 때 \`logging.exception()\`으로 로그를 남기도록 수정하세요.

\`\`\`python
value = "abc"
number = int(value)
\`\`\`

---

### 문제 12

다음 설정값을 \`config.py\` 파일에 넣는다고 가정하고, 상수 형태로 작성해보세요.

\`\`\`text
입력 파일: data/input.csv
출력 파일: result/output.csv
기본 인코딩: utf-8
최대 재시도 횟수: 3
\`\`\`

---

### 문제 13

다음 JSON 설정 파일을 읽어 \`input_file\` 값을 출력하는 코드를 작성하세요.

\`\`\`json
{
  "input_file": "data/sales.csv",
  "output_file": "result/report.xlsx"
}
\`\`\`

파일 이름은 \`config.json\`이라고 가정합니다.

---

### 문제 14

다음 리스트를 iterator로 바꾼 뒤 \`next()\`로 값을 하나씩 출력하는 코드를 작성하세요.

\`\`\`python
numbers = [10, 20, 30]
\`\`\`

---

### 문제 15

1부터 5까지의 숫자를 하나씩 생성하는 제너레이터 함수를 작성하세요.

---

### 문제 16

다음 리스트 컴프리헨션을 제너레이터 표현식으로 바꿔보세요.

\`\`\`python
squares = [number * number for number in range(1, 6)]
\`\`\`

---

### 문제 17

다음 코드의 문제점을 설명하고 개선 방향을 적어보세요.

\`\`\`python
x = 0

for i in orders:
    if i["status"] == "paid":
        x += i["price"] * i["quantity"]
\`\`\`

---

## 정답 및 해설

### 문제 1 정답

예시 답안:

\`\`\`python
customer_name = "홍길동"
product_price = 30000
quantity = 2
total_price = product_price * quantity
\`\`\`

해설:

변수명은 값의 의미가 드러나야 합니다. \`a\`, \`b\`, \`c\`, \`d\`처럼 의미 없는 이름은 코드가 길어질수록 이해하기 어려워집니다.

---

### 문제 2 정답

예시 답안:

\`\`\`python
is_login = True
is_admin = False
has_coupon = True
\`\`\`

해설:

불리언 변수는 \`is_\`, \`has_\`, \`can_\` 같은 접두어를 사용하면 참/거짓 의미를 더 쉽게 이해할 수 있습니다.

---

### 문제 3 정답

예시 답안:

\`\`\`python
def apply_discount(price):
    return price * 0.9
\`\`\`

해설:

함수명은 함수가 하는 일을 설명해야 합니다. \`do\`는 의미가 너무 넓기 때문에 할인 적용 함수라면 \`apply_discount\`처럼 작성하는 것이 좋습니다.

---

### 문제 4 정답

예시 답안:

\`\`\`python
FREE_DELIVERY_AMOUNT = 50000
DEFAULT_DELIVERY_FEE = 3000

if total_price >= FREE_DELIVERY_AMOUNT:
    delivery_fee = 0
else:
    delivery_fee = DEFAULT_DELIVERY_FEE
\`\`\`

해설:

반복되거나 의미가 있는 숫자는 상수로 분리하면 코드의 의미가 명확해집니다.

---

### 문제 5 정답

\`\`\`python
def calculate_total_price(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

해설:

가격과 수량을 정수로 받고 총액도 정수로 반환한다고 표시했습니다.

---

### 문제 6 정답

\`\`\`python
def is_valid_email(email: str) -> bool:
    return "@" in email
\`\`\`

해설:

이 함수는 문자열을 입력받고, 이메일 형식이 유효한지 여부를 \`True\` 또는 \`False\`로 반환합니다.

---

### 문제 7 정답

\`\`\`python
def print_message(message: str) -> None:
    print(message)
\`\`\`

해설:

의미 있는 반환값이 없는 함수는 반환 타입을 \`None\`으로 표시합니다.

---

### 문제 8 정답

\`\`\`python
names: list[str] = ["홍길동", "김민수", "이지영"]
\`\`\`

해설:

\`list[str]\`는 문자열이 들어 있는 리스트를 의미합니다.

---

### 문제 9 정답

\`\`\`python
scores: dict[str, int] = {
    "국어": 90,
    "영어": 85,
    "수학": 95
}
\`\`\`

해설:

key는 과목명 문자열이고 value는 점수 정수입니다.

---

### 문제 10 정답

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)
logging.info("프로그램을 시작합니다.")
\`\`\`

해설:

\`basicConfig()\`로 로그 레벨을 설정한 뒤 \`logging.info()\`로 INFO 로그를 출력합니다.

---

### 문제 11 정답

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

value = "abc"

try:
    number = int(value)
except ValueError:
    logging.exception("정수 변환 중 오류가 발생했습니다: value=%s", value)
\`\`\`

해설:

\`logging.exception()\`은 예외 정보와 추적 정보를 함께 남깁니다. 보통 \`except\` 블록 안에서 사용합니다.

---

### 문제 12 정답

예시 답안:

\`\`\`python
# config.py
INPUT_FILE = "data/input.csv"
OUTPUT_FILE = "result/output.csv"
DEFAULT_ENCODING = "utf-8"
MAX_RETRY_COUNT = 3
\`\`\`

해설:

설정값을 코드 여러 곳에 직접 쓰지 않고 한 파일에서 관리하면 수정하기 쉽습니다.

---

### 문제 13 정답

\`\`\`python
import json

with open("config.json", "r", encoding="utf-8") as file:
    config = json.load(file)

print(config["input_file"])
\`\`\`

해설:

JSON 설정 파일은 \`json.load()\`로 파이썬 딕셔너리로 읽을 수 있습니다.

---

### 문제 14 정답

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
\`\`\`

해설:

\`iter()\`로 iterator를 만들고 \`next()\`로 값을 하나씩 꺼냅니다.

---

### 문제 15 정답

\`\`\`python
def generate_numbers():
    for number in range(1, 6):
        yield number


for number in generate_numbers():
    print(number)
\`\`\`

해설:

\`yield\`를 사용하면 값을 한 번에 모두 반환하지 않고 하나씩 생성할 수 있습니다.

---

### 문제 16 정답

\`\`\`python
squares = (number * number for number in range(1, 6))
\`\`\`

해설:

대괄호 \`[]\`를 사용하면 리스트 컴프리헨션이고, 소괄호 \`()\`를 사용하면 제너레이터 표현식입니다.

---

### 문제 17 정답

예시 답안:

\`\`\`text
문제점:
- x와 i라는 변수명이 의미를 알기 어렵다.
- 주문 총액 계산 로직이 함수로 분리되어 있지 않다.
- "paid" 같은 상태값 문자열이 코드에 직접 들어 있다.

개선 방향:
- x를 total_sales로 바꾼다.
- i를 order로 바꾼다.
- 총 매출 계산 함수를 만든다.
- 상태값은 PAID_STATUS 같은 상수로 분리한다.
\`\`\`

개선 예시:

\`\`\`python
PAID_STATUS = "paid"


def calculate_total_sales(orders):
    total_sales = 0

    for order in orders:
        if order["status"] == PAID_STATUS:
            total_sales += order["price"] * order["quantity"]

    return total_sales
\`\`\`

해설:

코드가 짧다고 해서 항상 좋은 코드는 아닙니다. 의미 있는 이름과 함수 분리를 통해 유지보수하기 쉽게 만드는 것이 중요합니다.

---

## 참고 자료

이 장의 내용은 파이썬 공식 문서의 타입 힌트, logging, configparser, 이터레이터와 제너레이터 관련 문서를 참고해 기초 수업 수준에 맞게 재구성했습니다.

\`\`\`text
- Python 공식 문서: typing
- Python 공식 문서: Logging HOWTO
- Python 공식 문서: configparser
- Python 공식 문서: Generator expressions
- Python 공식 문서: Built-in Types - Generator Types
\`\`\`

---

## 다음 장 예고

다음 장에서는 **테스트와 코드 검증 기초**를 배웁니다.

12장에서는 읽기 좋고 관리하기 쉬운 코드를 작성하는 습관을 배웠습니다. 하지만 코드가 보기 좋다고 해서 항상 올바르게 동작하는 것은 아닙니다. 실무에서는 코드가 의도한 대로 동작하는지 확인하는 과정이 필요합니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
- 테스트가 필요한 이유
- assert로 간단한 테스트 작성하기
- 정상 케이스와 예외 케이스
- pytest 기초
- 예외 테스트
- 테스트 후 코드 개선하기
\`\`\`

테스트를 배우면 코드를 수정할 때 불안감이 줄어듭니다. 13장에서는 내가 작성한 코드가 정말 의도대로 동작하는지 확인하는 방법을 배우게 됩니다.
`;export{e as default};