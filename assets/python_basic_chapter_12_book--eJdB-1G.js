var e=`# 12장 실무 코드 작성 습관

## 이 장에서 배울 내용

지금까지 우리는 파이썬의 기본 문법, 자료구조, 함수, 예외 처리, 객체지향, 모듈과 패키지, 외부 라이브러리, 파일 처리, 데이터 처리 방법을 배웠습니다. 이제는 코드를 “어떻게 작성하면 더 실무적으로 좋은 코드가 되는가”를 생각해야 합니다.

처음 파이썬을 배울 때는 코드가 실행되는 것만으로도 충분히 어렵습니다. 하지만 실무에서는 코드가 한 번 실행되는 것만으로는 부족합니다. 코드는 시간이 지난 뒤 다시 읽을 수 있어야 하고, 다른 사람이 이해할 수 있어야 하며, 문제가 생겼을 때 원인을 추적할 수 있어야 합니다.

예를 들어 다음 두 코드는 모두 같은 일을 할 수 있습니다.

\`\`\`python
x = 10000
y = 3
z = x * y
print(z)
\`\`\`

\`\`\`python
price = 10000
quantity = 3
total_price = price * quantity
print(total_price)
\`\`\`

두 코드 모두 실행 결과는 같습니다. 하지만 두 번째 코드는 무엇을 계산하는지 훨씬 쉽게 알 수 있습니다. 이것이 실무 코드 작성 습관의 출발점입니다. 좋은 코드는 컴퓨터만 이해하는 코드가 아니라 **사람도 이해할 수 있는 코드**입니다.

이 장에서는 다음 내용을 배웁니다.

\`\`\`text
- 읽기 좋은 코드 작성법
- 변수명, 함수명, 클래스명 짓기
- 타입 힌트 기초
- logging으로 로그 남기기
- 설정값 관리
- 이터레이터와 제너레이터 기초
\`\`\`

이 장의 목표는 새로운 문법을 많이 외우는 것이 아닙니다. 목표는 이미 배운 문법을 사용해 **더 읽기 쉽고, 더 안전하고, 더 유지보수하기 좋은 코드**를 작성하는 습관을 익히는 것입니다.

---

## 12.1 읽기 좋은 코드 작성법

### 12.1.1 좋은 코드는 왜 필요한가

프로그래밍을 처음 배울 때는 다음과 같은 생각을 하기 쉽습니다.

\`\`\`text
“일단 실행만 되면 되는 것 아닌가?”
\`\`\`

혼자 짧은 코드를 작성할 때는 그럴 수 있습니다. 하지만 실무에서는 상황이 다릅니다.

실무 코드는 보통 다음과 같은 특징을 가집니다.

\`\`\`text
- 한 번 만들고 끝나는 것이 아니라 계속 수정된다.
- 작성자 본인뿐 아니라 다른 사람도 읽는다.
- 시간이 지난 뒤 다시 봐야 한다.
- 예상하지 못한 입력값이나 오류 상황을 만나게 된다.
- 운영 중 문제가 생기면 원인을 찾아야 한다.
\`\`\`

따라서 실무 코드에서는 “작동하는 코드”를 넘어서 “관리 가능한 코드”를 작성해야 합니다.

좋은 코드는 다음과 같은 특징을 가집니다.

\`\`\`text
- 이름만 봐도 의미를 알 수 있다.
- 함수가 너무 많은 일을 하지 않는다.
- 중복 코드가 적다.
- 조건문이 복잡하지 않다.
- 주석 없이도 어느 정도 읽힌다.
- 문제가 생겼을 때 추적하기 쉽다.
\`\`\`

좋은 코드를 작성하는 것은 파이썬만의 특별한 기능은 아닙니다. 변수명을 구체적으로 짓고, 함수를 작게 나누고, 역할을 분리하는 것은 대부분의 프로그래밍 언어에서 중요한 습관입니다. 다만 파이썬은 문법이 간결하기 때문에 이런 습관을 잘 적용하면 코드가 특히 읽기 쉬워집니다.

---

### 12.1.2 변수명 잘 짓기

변수명은 데이터를 담는 그릇의 이름입니다. 변수명이 좋으면 코드를 읽는 사람이 그 변수에 어떤 값이 들어 있는지 쉽게 짐작할 수 있습니다.

나쁜 예를 봅시다.

\`\`\`python
a = "홍길동"
b = 12000
c = 3
d = b * c
\`\`\`

이 코드는 실행될 수는 있지만, 각 변수가 무엇을 의미하는지 알기 어렵습니다. 같은 코드를 의미 있는 이름으로 바꾸면 다음과 같습니다.

\`\`\`python
customer_name = "홍길동"
product_price = 12000
quantity = 3
total_price = product_price * quantity
\`\`\`

이제 코드를 읽는 사람은 각 값의 의미를 바로 이해할 수 있습니다.

변수명을 지을 때는 다음 기준을 생각하면 좋습니다.

\`\`\`text
- 값의 의미가 드러나는가?
- 너무 짧아서 의미를 알기 어렵지는 않은가?
- 너무 길어서 읽기 불편하지는 않은가?
- 같은 개념에 같은 단어를 사용하고 있는가?
\`\`\`

예를 들어 고객을 뜻하는 단어로 어떤 곳에서는 \`customer\`, 다른 곳에서는 \`client\`, 또 다른 곳에서는 \`user\`를 섞어 쓰면 헷갈릴 수 있습니다. 같은 개념이라면 같은 단어를 사용하는 것이 좋습니다.

---

### 12.1.3 불리언 변수명 작성법

불리언 변수는 \`True\` 또는 \`False\` 값을 담습니다. 불리언 변수명은 질문처럼 읽히게 작성하면 좋습니다.

\`\`\`python
is_login = True
is_admin = False
has_coupon = True
can_order = False
\`\`\`

위 변수명은 다음처럼 읽을 수 있습니다.

\`\`\`text
is_login    → 로그인 상태인가?
is_admin    → 관리자인가?
has_coupon  → 쿠폰을 가지고 있는가?
can_order   → 주문할 수 있는가?
\`\`\`

반대로 다음과 같은 이름은 의미가 애매할 수 있습니다.

\`\`\`python
login = True
admin = False
coupon = True
order = False
\`\`\`

\`login\`이 로그인 동작을 의미하는지, 로그인 상태를 의미하는지 헷갈릴 수 있습니다. 불리언 변수에는 \`is_\`, \`has_\`, \`can_\`, \`should_\` 같은 접두어를 사용하면 코드가 읽기 쉬워집니다.

---

### 12.1.4 함수명 잘 짓기

함수는 어떤 동작을 수행합니다. 따라서 함수명은 보통 동사로 시작하는 것이 자연스럽습니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity


def validate_email(email):
    return "@" in email


def save_report(data):
    print("보고서를 저장합니다.")
\`\`\`

함수명을 보면 함수가 무엇을 하는지 알 수 있어야 합니다.

나쁜 예를 봅시다.

\`\`\`python
def do(data):
    return data * 0.9
\`\`\`

\`do\`라는 이름만으로는 무엇을 하는 함수인지 알 수 없습니다. 할인 금액을 계산하는 함수라면 다음처럼 바꾸는 것이 좋습니다.

\`\`\`python
def apply_discount(price):
    return price * 0.9
\`\`\`

함수명은 다음 질문에 답할 수 있어야 합니다.

\`\`\`text
- 이 함수는 무엇을 하는가?
- 어떤 값을 계산하는가?
- 어떤 데이터를 검증하는가?
- 어떤 파일을 읽거나 저장하는가?
\`\`\`

함수명에 자주 사용하는 동사는 다음과 같습니다.

| 동사 | 의미 | 예시 |
|---|---|---|
| \`get\` | 값을 가져온다 | \`get_user_name()\` |
| \`set\` | 값을 설정한다 | \`set_user_grade()\` |
| \`calculate\` | 계산한다 | \`calculate_total_price()\` |
| \`validate\` | 검증한다 | \`validate_email()\` |
| \`convert\` | 변환한다 | \`convert_to_int()\` |
| \`load\` | 불러온다 | \`load_config()\` |
| \`save\` | 저장한다 | \`save_report()\` |
| \`create\` | 생성한다 | \`create_user()\` |
| \`update\` | 수정한다 | \`update_stock()\` |
| \`delete\` | 삭제한다 | \`delete_file()\` |

---

### 12.1.5 클래스명 작성 규칙

클래스명은 보통 **PascalCase**를 사용합니다. PascalCase는 각 단어의 첫 글자를 대문자로 쓰는 방식입니다.

\`\`\`python
class Customer:
    pass


class ProductOrder:
    pass


class ReportGenerator:
    pass
\`\`\`

변수와 함수는 보통 \`snake_case\`를 사용합니다.

\`\`\`python
customer_name = "홍길동"

def calculate_total_price():
    pass
\`\`\`

클래스명은 객체의 역할이 드러나야 합니다.

\`\`\`python
class User:
    pass


class Product:
    pass


class Order:
    pass
\`\`\`

기능을 수행하는 클래스라면 역할을 나타내는 단어를 붙이면 좋습니다.

\`\`\`python
class ReportGenerator:
    pass


class FileReader:
    pass


class EmailValidator:
    pass
\`\`\`

\`Manager\`, \`Processor\`, \`Handler\` 같은 단어는 많이 쓰이지만 너무 넓은 의미를 가질 수 있습니다. 예를 들어 \`DataManager\`라는 이름만으로는 데이터를 읽는지, 저장하는지, 검증하는지 알기 어렵습니다. 가능하면 더 구체적인 이름을 사용합니다.

---

### 12.1.6 한 줄에 너무 많은 일 하지 않기

한 줄에 너무 많은 일을 하면 코드를 읽기 어렵습니다.

\`\`\`python
result = [item["price"] * item["quantity"] for item in orders if item["status"] == "paid" and item["price"] > 0]
\`\`\`

위 코드는 한 줄로 작성되어 있지만 조건, 계산, 반복이 모두 섞여 있습니다. 다음처럼 나누면 읽기 쉬워집니다.

\`\`\`python
paid_orders = []

for order in orders:
    if order["status"] == "paid" and order["price"] > 0:
        paid_orders.append(order)

total_prices = []

for order in paid_orders:
    total_price = order["price"] * order["quantity"]
    total_prices.append(total_price)
\`\`\`

코드가 조금 길어졌지만 흐름은 더 명확해졌습니다. 짧은 코드가 항상 좋은 코드는 아닙니다. 좋은 코드는 **읽는 사람이 실수 없이 이해할 수 있는 코드**입니다.

리스트 컴프리헨션은 유용하지만 너무 복잡하면 일반 반복문이 더 낫습니다.

---

### 12.1.7 중복 코드 줄이기

중복 코드는 실무에서 큰 문제가 됩니다. 같은 로직이 여러 곳에 있으면 수정할 때 모든 위치를 찾아 바꿔야 합니다.

예를 들어 배송비 계산 코드가 여러 곳에 반복되어 있다고 해봅시다.

\`\`\`python
price = 30000

if price >= 50000:
    delivery_fee = 0
else:
    delivery_fee = 3000

final_price = price + delivery_fee
\`\`\`

다른 곳에도 같은 코드가 있다면 배송비 기준이 바뀔 때 여러 곳을 수정해야 합니다. 이럴 때는 함수로 분리하는 것이 좋습니다.

\`\`\`python
def calculate_delivery_fee(price):
    if price >= 50000:
        return 0
    return 3000


price = 30000
delivery_fee = calculate_delivery_fee(price)
final_price = price + delivery_fee
\`\`\`

이제 배송비 기준이 바뀌면 함수 한 곳만 수정하면 됩니다.

중복을 줄이는 가장 기본적인 방법은 다음과 같습니다.

\`\`\`text
- 같은 계산이 반복되면 함수로 만든다.
- 같은 값이 반복되면 상수로 만든다.
- 같은 구조가 반복되면 반복문을 사용한다.
- 같은 데이터 묶음이 반복되면 클래스나 딕셔너리로 관리한다.
\`\`\`

---

### 12.1.8 복잡한 조건문 정리하기

조건문이 길어지면 코드를 이해하기 어렵습니다.

\`\`\`python
if user["age"] >= 19 and user["is_active"] == True and user["grade"] in ["VIP", "VVIP"] and user["point"] >= 1000:
    print("이벤트 대상입니다.")
\`\`\`

조건이 너무 길면 의미 있는 변수로 나누는 것이 좋습니다.

\`\`\`python
is_adult = user["age"] >= 19
is_active_user = user["is_active"]
is_high_grade = user["grade"] in ["VIP", "VVIP"]
has_enough_point = user["point"] >= 1000

if is_adult and is_active_user and is_high_grade and has_enough_point:
    print("이벤트 대상입니다.")
\`\`\`

이제 조건이 무엇을 의미하는지 더 명확해졌습니다.

조건문이 복잡할수록 다음 방법을 사용해봅니다.

\`\`\`text
- 조건을 의미 있는 변수로 분리한다.
- 반복되는 조건은 함수로 만든다.
- 중첩 조건문을 줄인다.
- 빠르게 종료하는 방식으로 들여쓰기를 줄인다.
\`\`\`

예를 들어 다음 코드는 중첩이 깊습니다.

\`\`\`python
def process_order(order):
    if order is not None:
        if order["status"] == "paid":
            if order["quantity"] > 0:
                print("주문 처리")
\`\`\`

조건을 만족하지 않는 경우 먼저 반환하면 들여쓰기를 줄일 수 있습니다.

\`\`\`python
def process_order(order):
    if order is None:
        return

    if order["status"] != "paid":
        return

    if order["quantity"] <= 0:
        return

    print("주문 처리")
\`\`\`

이런 방식은 특히 함수 안에서 유용합니다.

---

### 12.1.9 주석 작성법

주석은 코드에 설명을 붙이는 기능입니다. 하지만 좋은 코드는 주석이 많다고 좋은 코드가 아닙니다. 오히려 코드 자체가 읽히도록 작성하는 것이 먼저입니다.

나쁜 주석의 예를 봅시다.

\`\`\`python
# price와 quantity를 곱한다
total_price = price * quantity
\`\`\`

이 주석은 코드가 이미 말하고 있는 내용을 반복합니다. 이런 주석은 큰 도움이 되지 않습니다.

좋은 주석은 코드만 보고 알기 어려운 이유나 배경을 설명합니다.

\`\`\`python
# 무료 배송 기준은 2026년 6월 프로모션 정책에 따라 50,000원으로 설정한다.
FREE_DELIVERY_AMOUNT = 50000
\`\`\`

또는 복잡한 처리의 의도를 설명할 수 있습니다.

\`\`\`python
# 외부 시스템에서 빈 문자열을 0으로 보내는 경우가 있어 None과 빈 문자열을 함께 처리한다.
if value is None or value == "":
    return 0
\`\`\`

주석을 작성할 때는 다음 기준을 생각합니다.

\`\`\`text
- 코드가 무엇을 하는지보다 왜 그렇게 하는지를 설명한다.
- 오래된 주석을 방치하지 않는다.
- 주석이 필요할 정도로 코드가 복잡하다면 먼저 코드를 나눌 수 있는지 생각한다.
- 임시 처리라면 이유와 제거 조건을 함께 적는다.
\`\`\`

---

### 12.1.10 상수 사용하기

코드 안에 직접 숫자나 문자열을 쓰면 나중에 의미를 알기 어렵습니다.

\`\`\`python
if total_price >= 50000:
    delivery_fee = 0
else:
    delivery_fee = 3000
\`\`\`

\`50000\`과 \`3000\`이 무엇을 의미하는지 코드를 처음 보는 사람은 바로 알기 어렵습니다. 이런 값은 상수로 분리하는 것이 좋습니다.

\`\`\`python
FREE_DELIVERY_AMOUNT = 50000
DEFAULT_DELIVERY_FEE = 3000

if total_price >= FREE_DELIVERY_AMOUNT:
    delivery_fee = 0
else:
    delivery_fee = DEFAULT_DELIVERY_FEE
\`\`\`

파이썬에는 값을 절대 바꿀 수 없게 만드는 상수 문법이 따로 있는 것은 아닙니다. 대신 관례적으로 상수 이름은 대문자로 작성합니다.

\`\`\`python
TAX_RATE = 0.1
MAX_RETRY_COUNT = 3
DEFAULT_ENCODING = "utf-8"
\`\`\`

상수는 다음과 같은 값에 사용하면 좋습니다.

\`\`\`text
- 세율
- 배송비
- 할인율
- 최대 재시도 횟수
- 기본 인코딩
- 기본 파일 경로
- 상태값 문자열
\`\`\`

---

## 12.2 타입 힌트 기초

### 12.2.1 타입 힌트란 무엇인가

타입 힌트는 변수, 함수 매개변수, 반환값이 어떤 자료형을 기대하는지 표시하는 문법입니다.

다음 함수를 봅시다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

이 함수는 가격과 수량을 받아 총액을 계산합니다. 하지만 코드만 보면 \`price\`와 \`quantity\`에 어떤 자료형을 넣어야 하는지 명확하지 않습니다. 타입 힌트를 붙이면 다음과 같습니다.

\`\`\`python
def calculate_total_price(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

이제 이 함수는 \`price\`와 \`quantity\`로 정수를 받고, 정수를 반환한다는 뜻을 코드에서 바로 알 수 있습니다.

타입 힌트는 코드를 설명하는 표지판과 비슷합니다. 실행되는 로직 자체를 바꾸지는 않지만, 사람이 코드를 이해하기 쉽게 도와줍니다.

---

### 12.2.2 타입 힌트는 실행을 강제하지 않는다

파이썬은 동적 타입 언어입니다. 변수에 어떤 타입의 값을 넣을지 실행 중에 결정합니다. 타입 힌트를 작성해도 파이썬이 실행 중에 자동으로 타입을 강제하지는 않습니다.

\`\`\`python
def greet(name: str) -> str:
    return "안녕하세요, " + name


print(greet("홍길동"))
\`\`\`

위 함수는 문자열을 기대합니다. 하지만 다음처럼 숫자를 넣으면 타입 힌트가 있다고 해서 실행 전에 자동으로 막아주지는 않습니다.

\`\`\`python
print(greet(100))
\`\`\`

이 코드는 실행 중 문자열과 정수를 더하려고 하면서 에러가 발생합니다.

타입 힌트는 주로 다음 목적으로 사용합니다.

\`\`\`text
- 코드를 읽는 사람이 자료형을 쉽게 이해하도록 돕는다.
- 에디터의 자동완성과 오류 표시를 돕는다.
- 타입 검사 도구가 잠재적인 오류를 찾을 수 있게 한다.
- 협업할 때 함수의 입력과 출력을 명확하게 전달한다.
\`\`\`

즉, 타입 힌트는 파이썬의 실행 규칙이라기보다 **코드를 더 명확하게 작성하기 위한 약속**에 가깝습니다.

---

### 12.2.3 변수 타입 힌트

변수에도 타입 힌트를 붙일 수 있습니다.

\`\`\`python
name: str = "홍길동"
age: int = 30
height: float = 175.5
is_active: bool = True
\`\`\`

일반적인 코드에서는 변수의 값만 봐도 타입을 알 수 있기 때문에 모든 변수에 타입 힌트를 붙일 필요는 없습니다. 하지만 값이 나중에 할당되거나 의미를 명확히 하고 싶을 때 사용할 수 있습니다.

\`\`\`python
total_price: int = 0
customer_name: str = ""
is_valid: bool = False
\`\`\`

\`None\`이 들어갈 수 있는 값은 다음처럼 표현할 수 있습니다.

\`\`\`python
selected_email: str | None = None
\`\`\`

이 표현은 \`selected_email\`이 문자열이거나 \`None\`일 수 있다는 뜻입니다.

---

### 12.2.4 함수 매개변수 타입 힌트

함수의 매개변수에 타입을 표시하면 함수 사용 방법을 쉽게 알 수 있습니다.

\`\`\`python
def calculate_discount_price(price: int, discount_rate: float) -> int:
    discount_amount = price * discount_rate
    return int(price - discount_amount)
\`\`\`

위 함수는 다음 의미를 가집니다.

\`\`\`text
price는 int를 기대한다.
discount_rate는 float를 기대한다.
반환값은 int이다.
\`\`\`

문자열을 처리하는 함수도 타입 힌트로 의도를 명확히 할 수 있습니다.

\`\`\`python
def normalize_email(email: str) -> str:
    return email.strip().lower()
\`\`\`

불리언을 반환하는 함수라면 다음처럼 작성합니다.

\`\`\`python
def is_valid_email(email: str) -> bool:
    return "@" in email
\`\`\`

\`is_\`, \`has_\`, \`can_\`으로 시작하는 함수가 \`bool\`을 반환하면 읽기 좋습니다.

---

### 12.2.5 반환값이 없는 함수

화면에 출력만 하거나 파일에 저장만 하는 함수는 특별한 값을 반환하지 않을 수 있습니다. 이런 함수의 반환 타입은 \`None\`으로 표시합니다.

\`\`\`python
def print_order_summary(order_id: str, total_price: int) -> None:
    print(f"주문번호: {order_id}")
    print(f"총 금액: {total_price}")
\`\`\`

\`-> None\`은 이 함수가 의미 있는 반환값을 돌려주지 않는다는 뜻입니다.

다음 예시도 반환값이 없는 함수입니다.

\`\`\`python
def save_log(message: str) -> None:
    with open("app.log", "a", encoding="utf-8") as file:
        file.write(message + "\\n")
\`\`\`

이 함수는 로그를 파일에 저장하지만, 호출한 곳에 값을 반환하지는 않습니다.

---

### 12.2.6 컬렉션 타입 힌트

리스트, 딕셔너리, 튜플, 집합 같은 컬렉션 자료형에도 타입 힌트를 붙일 수 있습니다.

\`\`\`python
names: list[str] = ["홍길동", "김민수", "이지영"]
prices: list[int] = [10000, 20000, 30000]
\`\`\`

\`list[str]\`는 문자열 리스트를 의미합니다. \`list[int]\`는 정수 리스트를 의미합니다.

딕셔너리는 key와 value의 타입을 함께 표시합니다.

\`\`\`python
customer: dict[str, str] = {
    "name": "홍길동",
    "email": "hong@example.com"
}
\`\`\`

위 코드는 key가 문자열이고 value도 문자열인 딕셔너리를 의미합니다.

만약 value에 여러 타입이 섞일 수 있다면 다음처럼 작성할 수 있습니다.

\`\`\`python
customer: dict[str, str | int] = {
    "name": "홍길동",
    "age": 30
}
\`\`\`

튜플은 위치별 타입을 표시할 수 있습니다.

\`\`\`python
point: tuple[int, int] = (10, 20)
\`\`\`

집합은 다음처럼 작성합니다.

\`\`\`python
email_set: set[str] = {"a@example.com", "b@example.com"}
\`\`\`

---

### 12.2.7 리스트 안의 딕셔너리 타입 힌트

실무에서는 리스트 안에 딕셔너리가 들어 있는 구조를 자주 사용합니다.

\`\`\`python
orders = [
    {"id": "A001", "price": 10000, "quantity": 2},
    {"id": "A002", "price": 20000, "quantity": 1},
]
\`\`\`

이 구조에 타입 힌트를 붙이면 다음과 같습니다.

\`\`\`python
orders: list[dict[str, str | int]] = [
    {"id": "A001", "price": 10000, "quantity": 2},
    {"id": "A002", "price": 20000, "quantity": 1},
]
\`\`\`

다만 구조가 복잡해질수록 타입 힌트도 복잡해집니다. 이런 경우에는 \`dataclass\`를 사용하는 것이 더 읽기 좋을 수 있습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Order:
    id: str
    price: int
    quantity: int


orders: list[Order] = [
    Order(id="A001", price=10000, quantity=2),
    Order(id="A002", price=20000, quantity=1),
]
\`\`\`

이렇게 하면 데이터 구조가 더 명확해집니다.

---

### 12.2.8 타입 힌트와 기본값

함수 매개변수에 기본값이 있는 경우에도 타입 힌트를 사용할 수 있습니다.

\`\`\`python
def calculate_delivery_fee(price: int, free_amount: int = 50000) -> int:
    if price >= free_amount:
        return 0
    return 3000
\`\`\`

\`free_amount\`는 기본값이 \`50000\`이고 타입은 \`int\`입니다.

문자열 기본값도 사용할 수 있습니다.

\`\`\`python
def create_greeting(name: str, message: str = "안녕하세요") -> str:
    return f"{message}, {name}님"
\`\`\`

기본값이 \`None\`인 경우에는 \`타입 | None\` 형태로 작성합니다.

\`\`\`python
def find_customer(email: str, default_name: str | None = None) -> str | None:
    if email == "hong@example.com":
        return "홍길동"
    return default_name
\`\`\`

---

### 12.2.9 객체지향과 타입 힌트

클래스와 메서드에도 타입 힌트를 사용할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int, stock: int) -> None:
        self.name = name
        self.price = price
        self.stock = stock

    def reduce_stock(self, quantity: int) -> None:
        if quantity > self.stock:
            raise ValueError("재고가 부족합니다.")
        self.stock -= quantity

    def calculate_total_price(self, quantity: int) -> int:
        return self.price * quantity
\`\`\`

메서드에서 \`self\`에는 타입 힌트를 붙이지 않는 경우가 일반적입니다. 대신 나머지 매개변수와 반환값에 타입 힌트를 작성합니다.

다른 클래스를 매개변수로 받을 수도 있습니다.

\`\`\`python
class Customer:
    def __init__(self, name: str, email: str) -> None:
        self.name = name
        self.email = email


class Order:
    def __init__(self, customer: Customer, product: Product, quantity: int) -> None:
        self.customer = customer
        self.product = product
        self.quantity = quantity
\`\`\`

이렇게 작성하면 \`Order\` 객체를 만들 때 어떤 객체가 필요한지 명확하게 알 수 있습니다.

---

### 12.2.10 타입 힌트를 실무에서 적용하는 기준

타입 힌트를 모든 곳에 무조건 붙일 필요는 없습니다. 처음에는 다음 기준으로 적용하면 좋습니다.

\`\`\`text
- 함수의 매개변수와 반환값에는 가능한 한 타입 힌트를 붙인다.
- 클래스의 생성자에는 타입 힌트를 붙인다.
- 복잡한 자료구조를 다루는 변수에는 타입 힌트를 붙인다.
- 너무 명확한 지역 변수에는 생략해도 된다.
\`\`\`

예를 들어 다음처럼 함수 단위로 타입 힌트를 붙이는 것부터 시작합니다.

\`\`\`python
def calculate_total_price(price: int, quantity: int) -> int:
    return price * quantity


def normalize_name(name: str) -> str:
    return name.strip()


def has_enough_stock(stock: int, quantity: int) -> bool:
    return stock >= quantity
\`\`\`

타입 힌트는 협업에서 특히 유용합니다. 함수를 만든 사람과 사용하는 사람이 다를 때, 타입 힌트는 함수 사용 설명서 역할을 합니다.

---

## 12.3 로그 남기기

### 12.3.1 로그가 필요한 이유

프로그램을 실행하다 보면 다음과 같은 질문이 생깁니다.

\`\`\`text
- 프로그램이 언제 실행되었는가?
- 어느 파일까지 처리했는가?
- 어떤 데이터에서 오류가 발생했는가?
- API 요청은 성공했는가?
- 실패했다면 어떤 이유로 실패했는가?
\`\`\`

이런 정보를 기록하는 것이 로그입니다.

초보 단계에서는 \`print()\`로 중간값을 확인하는 경우가 많습니다.

\`\`\`python
print("파일을 읽기 시작합니다.")
print("파일 처리 완료")
\`\`\`

하지만 실무에서는 \`print()\`만으로는 부족합니다. \`print()\`는 단순히 화면에 출력할 뿐이며, 로그 레벨을 나누거나 파일에 체계적으로 기록하기 어렵습니다.

파이썬에서는 \`logging\` 모듈을 사용해 로그를 남길 수 있습니다.

---

### 12.3.2 \`print()\`와 logging의 차이

\`print()\`는 사용자에게 보여줄 값을 출력할 때 적합합니다.

\`\`\`python
print("총 금액은 30000원입니다.")
\`\`\`

반면 \`logging\`은 프로그램 실행 기록을 남길 때 적합합니다.

\`\`\`python
import logging

logging.info("주문 금액 계산을 시작합니다.")
\`\`\`

두 방식의 차이를 정리하면 다음과 같습니다.

| 구분 | \`print()\` | \`logging\` |
|---|---|---|
| 목적 | 화면 출력 | 실행 기록 관리 |
| 로그 레벨 | 없음 | DEBUG, INFO, WARNING, ERROR, CRITICAL |
| 파일 저장 | 직접 구현해야 함 | 설정으로 가능 |
| 실무 운영 | 제한적 | 적합 |
| 메시지 관리 | 단순 출력 | 시간, 레벨, 위치 등 포함 가능 |

개발 중 간단한 확인은 \`print()\`로도 충분합니다. 하지만 자동화 프로그램, 데이터 처리 프로그램, API 연동 프로그램처럼 실행 기록이 중요한 경우에는 \`logging\`을 사용하는 것이 좋습니다.

---

### 12.3.3 logging 기본 사용법

가장 간단한 로그 코드는 다음과 같습니다.

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

logging.info("프로그램을 시작합니다.")
logging.warning("주의가 필요한 상황입니다.")
logging.error("오류가 발생했습니다.")
\`\`\`

실행하면 설정한 로그 레벨 이상의 메시지가 출력됩니다.

\`basicConfig()\`는 logging의 기본 설정을 지정합니다. \`level=logging.INFO\`는 INFO 이상의 로그를 출력하겠다는 뜻입니다.

---

### 12.3.4 로그 레벨

로그에는 중요도에 따라 레벨이 있습니다.

| 로그 레벨 | 의미 | 사용 예시 |
|---|---|---|
| \`DEBUG\` | 개발 중 자세한 확인 정보 | 변수값, 반복 흐름 확인 |
| \`INFO\` | 정상적인 실행 정보 | 프로그램 시작, 파일 처리 완료 |
| \`WARNING\` | 주의가 필요한 상황 | 데이터 일부 누락, 기본값 사용 |
| \`ERROR\` | 오류 발생 | 파일 처리 실패, API 요청 실패 |
| \`CRITICAL\` | 심각한 오류 | 프로그램 계속 실행 불가 |

예를 들어 파일 처리 프로그램에서는 다음처럼 사용할 수 있습니다.

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

file_name = "sales.csv"

logging.info("파일 처리를 시작합니다: %s", file_name)
logging.warning("일부 행에 빈 값이 있습니다.")
logging.error("파일을 읽는 중 오류가 발생했습니다.")
\`\`\`

로그 메시지에 값을 넣을 때는 f-string을 사용할 수도 있지만, logging에서는 다음 방식도 자주 사용합니다.

\`\`\`python
logging.info("처리한 파일 개수: %s", 10)
\`\`\`

이 방식은 logging이 메시지를 처리하는 방식과 잘 맞습니다.

---

### 12.3.5 로그 형식 지정하기

로그에는 시간, 레벨, 메시지를 함께 남기는 것이 좋습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logging.info("프로그램을 시작합니다.")
\`\`\`

출력 예시는 다음과 비슷합니다.

\`\`\`text
2026-06-15 10:30:00,123 [INFO] 프로그램을 시작합니다.
\`\`\`

자주 사용하는 형식 요소는 다음과 같습니다.

| 형식 | 의미 |
|---|---|
| \`%(asctime)s\` | 로그 시간 |
| \`%(levelname)s\` | 로그 레벨 |
| \`%(message)s\` | 로그 메시지 |
| \`%(filename)s\` | 파일명 |
| \`%(lineno)d\` | 줄 번호 |
| \`%(name)s\` | 로거 이름 |

개발 중에는 파일명과 줄 번호를 포함하면 문제를 추적하기 쉽습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(filename)s:%(lineno)d - %(message)s"
)

logging.debug("디버그 메시지입니다.")
\`\`\`

---

### 12.3.6 파일로 로그 저장하기

자동화 프로그램은 사용자가 실행 화면을 계속 보고 있지 않을 수 있습니다. 이런 경우 로그를 파일로 저장해야 나중에 실행 기록을 확인할 수 있습니다.

\`\`\`python
import logging

logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    encoding="utf-8"
)

logging.info("프로그램을 시작합니다.")
logging.info("파일 처리를 완료했습니다.")
\`\`\`

이 코드를 실행하면 \`app.log\` 파일에 로그가 저장됩니다.

로그 파일에는 다음과 같은 정보가 남을 수 있습니다.

\`\`\`text
2026-06-15 10:30:00,123 [INFO] 프로그램을 시작합니다.
2026-06-15 10:30:01,456 [INFO] 파일 처리를 완료했습니다.
\`\`\`

한글 로그를 파일로 저장할 때는 \`encoding="utf-8"\`을 지정하는 것이 좋습니다.

---

### 12.3.7 로거 사용하기

간단한 프로그램에서는 \`logging.info()\`처럼 바로 사용해도 됩니다. 하지만 파일이 여러 개로 나뉜 프로젝트에서는 로거를 만들어 사용하는 것이 좋습니다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)

logger.info("현재 모듈에서 로그를 남깁니다.")
\`\`\`

\`__name__\`은 현재 모듈 이름을 의미합니다. 이 값을 로거 이름으로 사용하면 어떤 파일에서 로그가 발생했는지 파악하기 쉽습니다.

실무 프로젝트에서는 다음처럼 각 파일에서 로거를 만들 수 있습니다.

\`\`\`python
# order_service.py
import logging

logger = logging.getLogger(__name__)


def process_order(order_id: str) -> None:
    logger.info("주문 처리를 시작합니다: %s", order_id)
\`\`\`

---

### 12.3.8 예외와 로그 함께 사용하기

예외가 발생했을 때 로그를 남기면 문제를 추적하기 쉽습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

try:
    number = int("abc")
except ValueError as error:
    logging.error("숫자 변환에 실패했습니다: %s", error)
\`\`\`

더 자세한 에러 정보를 남기고 싶다면 \`logging.exception()\`을 사용할 수 있습니다. \`logging.exception()\`은 예외 정보와 함께 호출 위치의 추적 정보를 남깁니다. 보통 \`except\` 블록 안에서 사용합니다.

\`\`\`python
try:
    number = int("abc")
except ValueError:
    logging.exception("숫자 변환 중 예외가 발생했습니다.")
\`\`\`

실무에서 오류 원인을 찾을 때는 단순히 “실패했습니다”보다 “어떤 값에서, 어떤 작업 중, 어떤 오류가 발생했는지”가 중요합니다.

\`\`\`python
value = "abc"

try:
    number = int(value)
except ValueError:
    logging.exception("정수 변환 실패: value=%s", value)
\`\`\`

---

### 12.3.9 실무 로그 작성 기준

로그를 너무 적게 남기면 문제가 생겼을 때 원인을 찾기 어렵습니다. 반대로 너무 많이 남기면 중요한 정보를 찾기 어렵습니다.

처음에는 다음 기준을 사용하면 좋습니다.

\`\`\`text
INFO
- 프로그램 시작과 종료
- 주요 작업 시작과 완료
- 처리한 파일명
- 처리한 데이터 개수

WARNING
- 일부 데이터 누락
- 기본값 사용
- 예상과 다르지만 계속 진행 가능한 상황

ERROR
- 파일 처리 실패
- API 요청 실패
- 데이터 변환 실패
- 작업을 완료하지 못한 상황

DEBUG
- 개발 중 확인이 필요한 변수값
- 반복문 내부의 세부 흐름
\`\`\`

예를 들어 파일 처리 프로그램에서는 다음처럼 로그를 남길 수 있습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

files = ["sales_01.csv", "sales_02.csv", "sales_03.csv"]

logging.info("파일 처리 시작: 총 %s개", len(files))

for file_name in files:
    try:
        logging.info("파일 처리 중: %s", file_name)
        # 파일 처리 코드가 들어간다고 가정한다.
    except Exception:
        logging.exception("파일 처리 실패: %s", file_name)

logging.info("파일 처리 종료")
\`\`\`

---

## 12.4 설정값 관리

### 12.4.1 설정값이란 무엇인가

설정값은 프로그램의 동작을 바꾸는 값입니다. 예를 들어 다음과 같은 값이 설정값입니다.

\`\`\`text
- 입력 파일 경로
- 출력 파일 경로
- API URL
- API 키
- 기본 인코딩
- 로그 파일 경로
- 무료 배송 기준 금액
- 최대 재시도 횟수
\`\`\`

처음에는 이런 값을 코드 안에 직접 작성하기 쉽습니다.

\`\`\`python
input_file = "data/sales.csv"
output_file = "result/report.xlsx"
api_key = "my-secret-api-key"
\`\`\`

하지만 설정값을 코드 안에 직접 쓰면 문제가 생길 수 있습니다.

\`\`\`text
- 값이 바뀔 때마다 코드를 수정해야 한다.
- 개발 환경과 운영 환경의 값이 다를 수 있다.
- API 키나 비밀번호 같은 민감 정보가 코드에 노출될 수 있다.
- 같은 값이 여러 파일에 반복될 수 있다.
\`\`\`

따라서 실무에서는 설정값을 코드와 분리해서 관리하는 습관이 필요합니다.

---

### 12.4.2 상수로 분리하기

가장 간단한 설정값 관리는 상수로 분리하는 것입니다.

\`\`\`python
DEFAULT_ENCODING = "utf-8"
INPUT_FILE = "data/sales.csv"
OUTPUT_FILE = "result/report.xlsx"
FREE_DELIVERY_AMOUNT = 50000
\`\`\`

그리고 코드에서는 직접 값을 쓰지 않고 상수를 사용합니다.

\`\`\`python
with open(INPUT_FILE, "r", encoding=DEFAULT_ENCODING) as file:
    data = file.read()
\`\`\`

상수로 분리하면 값의 의미가 명확해지고, 수정할 위치도 줄어듭니다.

하지만 상수도 결국 코드 안에 들어 있습니다. 환경마다 값이 달라져야 한다면 설정 파일이나 환경 변수를 사용하는 것이 좋습니다.

---

### 12.4.3 설정 파일 사용하기

설정값을 JSON 파일로 분리할 수 있습니다.

\`config.json\` 파일을 만들어봅시다.

\`\`\`json
{
  "input_file": "data/sales.csv",
  "output_file": "result/report.xlsx",
  "encoding": "utf-8",
  "free_delivery_amount": 50000
}
\`\`\`

파이썬에서 이 파일을 읽을 수 있습니다.

\`\`\`python
import json

with open("config.json", "r", encoding="utf-8") as file:
    config = json.load(file)

input_file = config["input_file"]
output_file = config["output_file"]
encoding = config["encoding"]
free_delivery_amount = config["free_delivery_amount"]

print(input_file)
print(output_file)
\`\`\`

이렇게 하면 코드 수정 없이 \`config.json\` 파일만 수정해서 입력 파일이나 출력 파일을 바꿀 수 있습니다.

설정 파일을 사용할 때는 없는 key를 안전하게 처리하는 것도 중요합니다.

\`\`\`python
encoding = config.get("encoding", "utf-8")
retry_count = config.get("retry_count", 3)
\`\`\`

\`get()\`을 사용하면 설정값이 없을 때 기본값을 사용할 수 있습니다.

---

### 12.4.4 파이썬 설정 파일 사용하기

작은 프로젝트에서는 \`config.py\` 파일을 만들어 설정값을 관리하기도 합니다.

\`\`\`python
# config.py
INPUT_FILE = "data/sales.csv"
OUTPUT_FILE = "result/report.xlsx"
DEFAULT_ENCODING = "utf-8"
FREE_DELIVERY_AMOUNT = 50000
\`\`\`

다른 파일에서 import해서 사용할 수 있습니다.

\`\`\`python
# main.py
from config import INPUT_FILE, OUTPUT_FILE, DEFAULT_ENCODING

with open(INPUT_FILE, "r", encoding=DEFAULT_ENCODING) as file:
    data = file.read()

print(OUTPUT_FILE)
\`\`\`

\`config.py\` 방식은 파이썬 코드로 설정값을 관리하기 때문에 사용하기 쉽습니다. 하지만 일반 사용자가 수정해야 하는 설정이라면 JSON, INI 같은 별도 설정 파일이 더 적합할 수 있습니다.

---

### 12.4.5 INI 설정 파일과 configparser 기초

파이썬에는 INI 형식 설정 파일을 읽기 위한 \`configparser\` 모듈이 있습니다.

\`settings.ini\` 파일을 만들어봅시다.

\`\`\`ini
[file]
input_file = data/sales.csv
output_file = result/report.xlsx
encoding = utf-8

[delivery]
free_amount = 50000
default_fee = 3000
\`\`\`

파이썬에서 읽는 코드는 다음과 같습니다.

\`\`\`python
import configparser

config = configparser.ConfigParser()
config.read("settings.ini", encoding="utf-8")

input_file = config["file"]["input_file"]
output_file = config["file"]["output_file"]
encoding = config["file"].get("encoding", "utf-8")

free_amount = config["delivery"].getint("free_amount")
default_fee = config["delivery"].getint("default_fee")

print(input_file)
print(free_amount)
\`\`\`

INI 파일은 섹션을 나누어 설정을 관리할 수 있다는 장점이 있습니다. 예를 들어 \`[file]\`, \`[api]\`, \`[database]\`처럼 설정을 영역별로 나눌 수 있습니다.

---

### 12.4.6 환경 변수 기초

환경 변수는 운영체제나 실행 환경에 저장해두는 값입니다. API 키, 비밀번호, 토큰 같은 민감 정보는 코드나 설정 파일에 직접 쓰지 않는 것이 좋습니다. 이런 값은 환경 변수로 관리하는 방식이 자주 사용됩니다.

파이썬에서는 \`os.environ\`으로 환경 변수를 읽을 수 있습니다.

\`\`\`python
import os

api_key = os.environ.get("API_KEY")

if api_key is None:
    raise ValueError("API_KEY 환경 변수가 설정되어 있지 않습니다.")

print("API 키를 읽었습니다.")
\`\`\`

환경 변수는 실행 환경마다 다르게 설정할 수 있습니다.

\`\`\`text
개발 환경: 테스트 API 키 사용
운영 환경: 실제 API 키 사용
\`\`\`

이렇게 하면 코드에는 민감 정보를 넣지 않고, 실행 환경에서 필요한 값을 주입할 수 있습니다.

---

### 12.4.7 민감 정보 관리

다음과 같은 값은 코드에 직접 쓰지 않는 것이 좋습니다.

\`\`\`text
- API 키
- 비밀번호
- 데이터베이스 접속 정보
- 인증 토큰
- 개인 정보가 포함된 경로
- 사내 시스템 주소
\`\`\`

나쁜 예:

\`\`\`python
API_KEY = "abc123-secret-key"
PASSWORD = "my-password"
\`\`\`

좋은 예:

\`\`\`python
import os

API_KEY = os.environ.get("API_KEY")
PASSWORD = os.environ.get("PASSWORD")
\`\`\`

민감 정보 관리에서 중요한 원칙은 다음과 같습니다.

\`\`\`text
- 코드 저장소에 비밀번호나 API 키를 올리지 않는다.
- 설정 파일에 민감 정보가 들어 있다면 공유 범위를 제한한다.
- 예제 파일에는 가짜 값을 넣는다.
- 로그에 민감 정보가 출력되지 않게 한다.
\`\`\`

로그에 API 키 전체를 남기는 것은 위험합니다.

\`\`\`python
# 나쁜 예
logging.info("API_KEY=%s", api_key)
\`\`\`

필요하다면 일부만 표시합니다.

\`\`\`python
# 예시: 앞 4글자만 표시
masked_key = api_key[:4] + "****"
logging.info("API 키 확인: %s", masked_key)
\`\`\`

---

### 12.4.8 설정값을 읽는 함수 만들기

설정 파일을 읽는 코드는 여러 곳에 흩어지지 않게 함수로 분리하는 것이 좋습니다.

\`\`\`python
import json


def load_config(file_path: str) -> dict:
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)
\`\`\`

이제 필요한 곳에서 함수를 호출합니다.

\`\`\`python
config = load_config("config.json")

input_file = config.get("input_file", "data/input.csv")
output_file = config.get("output_file", "result/output.csv")
\`\`\`

더 안전하게 작성하려면 필수 설정값을 검사할 수 있습니다.

\`\`\`python
def require_config(config: dict, key: str) -> str:
    value = config.get(key)

    if value is None or value == "":
        raise ValueError(f"필수 설정값이 없습니다: {key}")

    return value
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
config = load_config("config.json")
input_file = require_config(config, "input_file")
\`\`\`

설정값을 읽는 코드를 함수로 만들면 테스트하기도 쉽고, 설정 파일 구조가 바뀌었을 때 수정 범위도 줄어듭니다.

---

## 12.5 이터레이터와 제너레이터 기초

### 12.5.1 iterable이란 무엇인가

이터레이터와 제너레이터는 처음 보면 어렵게 느껴질 수 있습니다. 하지만 우리는 이미 이 개념을 사용해왔습니다.

\`\`\`python
names = ["홍길동", "김민수", "이지영"]

for name in names:
    print(name)
\`\`\`

리스트는 \`for\` 문에서 하나씩 꺼내 사용할 수 있습니다. 이렇게 반복할 수 있는 객체를 **iterable**이라고 합니다.

대표적인 iterable은 다음과 같습니다.

\`\`\`text
- 리스트
- 튜플
- 문자열
- 딕셔너리
- 집합
- range 객체
- 파일 객체
\`\`\`

문자열도 iterable입니다.

\`\`\`python
text = "Python"

for char in text:
    print(char)
\`\`\`

실행하면 문자가 하나씩 출력됩니다.

딕셔너리도 iterable입니다.

\`\`\`python
customer = {
    "name": "홍길동",
    "email": "hong@example.com"
}

for key in customer:
    print(key)
\`\`\`

딕셔너리를 그대로 반복하면 key가 하나씩 나옵니다.

---

### 12.5.2 iterator란 무엇인가

iterable은 반복할 수 있는 객체입니다. iterator는 실제로 값을 하나씩 꺼내는 객체입니다.

파이썬에서는 \`iter()\` 함수로 iterator를 만들고, \`next()\` 함수로 값을 하나씩 꺼낼 수 있습니다.

\`\`\`python
numbers = [10, 20, 30]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
20
30
\`\`\`

더 이상 꺼낼 값이 없을 때 \`next()\`를 호출하면 \`StopIteration\` 예외가 발생합니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))  # StopIteration 발생
\`\`\`

\`for\` 문은 내부적으로 이런 과정을 자동으로 처리합니다. 즉, 다음 코드는

\`\`\`python
for number in numbers:
    print(number)
\`\`\`

대략 다음 흐름으로 동작한다고 이해할 수 있습니다.

\`\`\`text
1. numbers에서 iterator를 만든다.
2. next()로 값을 하나씩 꺼낸다.
3. 값이 더 이상 없으면 반복을 종료한다.
\`\`\`

초보 단계에서는 iterator를 직접 만들 일이 많지는 않습니다. 하지만 이 개념을 이해하면 파일 처리, 제너레이터, pandas의 일부 동작을 이해하는 데 도움이 됩니다.

---

### 12.5.3 파일 객체와 iterator

파일을 한 줄씩 읽을 때도 iterator 개념이 사용됩니다.

\`\`\`python
with open("sample.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())
\`\`\`

이 코드는 파일 전체를 한 번에 메모리에 올리지 않고 한 줄씩 읽습니다. 파일이 아주 클 때 특히 유용합니다.

다음처럼 전체를 한 번에 읽는 방식과 비교해봅시다.

\`\`\`python
with open("sample.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    print(line.strip())
\`\`\`

\`readlines()\`는 모든 줄을 리스트로 읽습니다. 파일이 작으면 문제가 없지만, 파일이 매우 크면 메모리를 많이 사용할 수 있습니다.

반면 파일 객체를 직접 반복하면 한 줄씩 처리할 수 있습니다.

\`\`\`python
with open("large_log.txt", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

이 방식은 큰 로그 파일에서 특정 에러 줄만 찾을 때 유용합니다.

---

### 12.5.4 제너레이터란 무엇인가

제너레이터는 값을 한 번에 모두 만들지 않고, 필요할 때 하나씩 만들어내는 객체입니다.

일반 함수는 \`return\`을 만나면 값을 반환하고 종료합니다.

\`\`\`python
def get_numbers():
    return [1, 2, 3]


numbers = get_numbers()
print(numbers)
\`\`\`

제너레이터 함수는 \`return\` 대신 \`yield\`를 사용합니다.

\`\`\`python
def generate_numbers():
    yield 1
    yield 2
    yield 3


numbers = generate_numbers()

for number in numbers:
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

\`yield\`는 값을 하나 돌려준 뒤 함수의 상태를 잠시 멈춰둡니다. 다음 값을 요청하면 멈춘 지점부터 다시 실행합니다.

---

### 12.5.5 \`yield\` 이해하기

다음 코드를 봅시다.

\`\`\`python
def generate_steps():
    print("첫 번째 단계")
    yield 1

    print("두 번째 단계")
    yield 2

    print("세 번째 단계")
    yield 3


steps = generate_steps()

print(next(steps))
print(next(steps))
print(next(steps))
\`\`\`

실행 흐름은 다음과 같습니다.

\`\`\`text
1. generate_steps()를 호출해도 함수 본문이 바로 실행되지는 않는다.
2. next(steps)를 호출하면 첫 번째 yield까지 실행된다.
3. 다시 next(steps)를 호출하면 멈춘 지점부터 다음 yield까지 실행된다.
4. 값이 더 이상 없으면 반복이 끝난다.
\`\`\`

제너레이터는 처음에는 낯설지만 핵심은 간단합니다.

\`\`\`text
return: 값을 반환하고 함수 종료
yield: 값을 하나 반환하고 함수 상태를 잠시 멈춤
\`\`\`

---

### 12.5.6 제너레이터가 필요한 이유

리스트는 모든 값을 한 번에 만들어 저장합니다.

\`\`\`python
numbers = []

for number in range(1, 1000001):
    numbers.append(number)
\`\`\`

이 코드는 1부터 1,000,000까지의 숫자를 리스트에 모두 저장합니다. 데이터가 아주 크면 메모리를 많이 사용합니다.

제너레이터를 사용하면 값을 필요한 순간에 하나씩 만들 수 있습니다.

\`\`\`python
def generate_numbers(limit: int):
    number = 1

    while number <= limit:
        yield number
        number += 1


for number in generate_numbers(1000000):
    if number > 5:
        break
    print(number)
\`\`\`

이 코드는 1,000,000개의 숫자를 모두 리스트로 만들지 않습니다. 필요한 값만 하나씩 생성합니다.

제너레이터는 다음 상황에서 유용합니다.

\`\`\`text
- 큰 파일을 한 줄씩 처리할 때
- 많은 데이터를 한 번에 만들 필요가 없을 때
- 필요한 만큼만 데이터를 생성하고 싶을 때
- 메모리 사용량을 줄이고 싶을 때
\`\`\`

---

### 12.5.7 제너레이터 표현식

리스트 컴프리헨션은 리스트를 만듭니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = [number * number for number in numbers]

print(squares)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

제너레이터 표현식은 대괄호 \`[]\` 대신 소괄호 \`()\`를 사용합니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = (number * number for number in numbers)

print(squares)
\`\`\`

이 코드는 리스트를 바로 만들지 않고 제너레이터 객체를 만듭니다. 값을 사용하려면 반복해야 합니다.

\`\`\`python
for square in squares:
    print(square)
\`\`\`

리스트 컴프리헨션과 제너레이터 표현식을 비교하면 다음과 같습니다.

| 구분 | 리스트 컴프리헨션 | 제너레이터 표현식 |
|---|---|---|
| 괄호 | \`[]\` | \`()\` |
| 결과 | 리스트 | 제너레이터 |
| 값 생성 | 한 번에 생성 | 필요할 때 하나씩 생성 |
| 메모리 | 더 많이 사용할 수 있음 | 더 적게 사용할 수 있음 |
| 반복 | 여러 번 가능 | 보통 한 번 소비됨 |

제너레이터는 한 번 소비하면 다시 처음부터 사용할 수 없습니다.

\`\`\`python
numbers = (number for number in [1, 2, 3])

for number in numbers:
    print(number)

for number in numbers:
    print(number)  # 이미 소비되어 출력되지 않음
\`\`\`

다시 사용해야 한다면 제너레이터를 새로 만들어야 합니다.

---

### 12.5.8 실무 예제: 큰 로그 파일 처리하기

로그 파일에서 에러가 있는 줄만 찾아야 한다고 해봅시다.

\`\`\`python
def read_error_lines(file_path: str):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if "ERROR" in line:
                yield line.strip()
\`\`\`

이 함수는 에러 줄을 한 번에 모두 리스트로 만들지 않습니다. 에러 줄을 발견할 때마다 하나씩 반환합니다.

사용 예시는 다음과 같습니다.

\`\`\`python
for error_line in read_error_lines("app.log"):
    print(error_line)
\`\`\`

에러 줄이 많거나 파일이 커도 한 줄씩 처리할 수 있습니다.

필요하다면 처음 10개만 볼 수도 있습니다.

\`\`\`python
count = 0

for error_line in read_error_lines("app.log"):
    print(error_line)
    count += 1

    if count >= 10:
        break
\`\`\`

이 방식은 큰 파일을 분석할 때 유용합니다.

---

### 12.5.9 이터레이터와 제너레이터를 처음 배울 때의 기준

이터레이터와 제너레이터는 처음부터 깊게 다 이해하려고 하면 어렵습니다. 이 장에서는 다음 정도를 기억하면 충분합니다.

\`\`\`text
- iterable은 for 문으로 반복할 수 있는 객체다.
- iterator는 값을 하나씩 꺼내는 객체다.
- iter()로 iterator를 만들 수 있다.
- next()로 값을 하나씩 꺼낼 수 있다.
- generator는 값을 필요할 때 하나씩 만들어낸다.
- yield는 값을 반환하고 함수 상태를 잠시 멈춘다.
- 큰 데이터 처리에는 제너레이터가 유용할 수 있다.
\`\`\`

실무에서 가장 먼저 활용할 만한 곳은 파일 처리입니다. 큰 파일을 한 줄씩 읽고, 조건에 맞는 줄만 처리하는 방식은 제너레이터 개념과 잘 맞습니다.

---

## 12.6 실무 코드 개선 예제

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