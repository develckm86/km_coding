var e=`<!-- 원본: python_basic_chapter_12_book.md / 세부 장: 12-2 -->

# 12.2 타입 힌트 기초

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
`;export{e as default};