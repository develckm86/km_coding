var e=`<!-- 원본: python_basic_chapter_12_book.md / 세부 장: 12-1 -->

# 12.1 읽기 좋은 코드 작성법

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
`;export{e as default};