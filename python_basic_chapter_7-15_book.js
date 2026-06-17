var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-15 -->

# 7.15 데코레이터 문법 맛보기

### 7.15.1 데코레이터란 무엇인가

이 장에서 우리는 \`@classmethod\`, \`@staticmethod\`, \`@property\`, \`@dataclass\` 같은 문법을 보았습니다.

이처럼 함수나 클래스 위에 붙는 \`@무언가\` 형태의 문법을 데코레이터라고 합니다.

\`\`\`python
@property
def price(self):
    return self._price
\`\`\`

\`\`\`python
@classmethod
def from_text(cls, text):
    pass
\`\`\`

\`\`\`python
@dataclass
class Customer:
    name: str
    email: str
\`\`\`

데코레이터는 기존 함수나 클래스에 특별한 기능을 덧붙이는 문법입니다.

---

### 7.15.2 지금 단계에서 알아야 할 정도

데코레이터를 직접 만드는 문법은 조금 어렵습니다. 지금 단계에서는 직접 만들기보다, 이미 제공되는 데코레이터를 읽고 사용할 수 있으면 충분합니다.

이 장에서 알아야 할 내용은 다음 정도입니다.

| 데코레이터 | 의미 |
|---|---|
| \`@property\` | 메서드를 속성처럼 사용하게 한다 |
| \`@classmethod\` | 클래스 자체를 받는 메서드를 만든다 |
| \`@staticmethod\` | 객체 상태와 무관한 메서드를 만든다 |
| \`@dataclass\` | 데이터 저장용 클래스 작성을 간단하게 한다 |

---

### 7.15.3 데코레이터를 읽는 방법

다음 코드를 보면 \`@property\`가 붙어 있습니다.

\`\`\`python
class Product:
    def __init__(self, price):
        self._price = price

    @property
    def price(self):
        return self._price
\`\`\`

이 코드는 다음처럼 해석할 수 있습니다.

\`\`\`text
price라는 메서드는 일반 메서드처럼 호출하는 것이 아니라,
속성처럼 product.price 형태로 읽을 수 있게 만든다.
\`\`\`

다음 코드는 \`@classmethod\`가 붙어 있습니다.

\`\`\`python
class Customer:
    @classmethod
    def from_text(cls, text):
        pass
\`\`\`

이 코드는 다음처럼 해석할 수 있습니다.

\`\`\`text
from_text는 객체 하나가 아니라 Customer 클래스 자체와 관련된 메서드다.
Customer.from_text(...) 형태로 호출할 수 있다.
\`\`\`

처음에는 데코레이터가 낯설 수 있지만, 파이썬 코드에서 자주 등장하므로 “어떤 역할을 부여하는 표시”라고 생각하고 익숙해지면 됩니다.


---

# 7장 핵심 정리

이 장에서는 객체지향 프로그래밍을 배웠습니다.

객체지향 프로그래밍은 데이터와 기능을 하나의 객체로 묶어 관리하는 방식입니다. 파이썬에서는 클래스를 정의하고, 클래스를 사용해 객체를 만듭니다.

클래스 안에는 속성과 메서드를 정의할 수 있습니다. 속성은 객체가 가진 데이터이고, 메서드는 객체가 할 수 있는 동작입니다.

\`__init__\`은 객체가 만들어질 때 실행되는 생성자입니다. 객체에 필요한 초기값을 설정할 때 사용합니다.

인스턴스 변수는 객체마다 따로 가지는 값이고, 클래스 변수는 클래스 전체가 공유하는 값입니다.

인스턴스 메서드는 객체의 상태를 읽거나 변경합니다. 클래스 메서드는 클래스 자체와 관련된 작업에 사용하고, 정적 메서드는 객체 상태와 무관하지만 클래스와 관련 있는 기능에 사용합니다.

캡슐화는 객체 내부 데이터를 안전하게 관리하는 방식입니다. 파이썬에서는 \`_변수명\`, \`__변수명\`, getter, setter, \`@property\` 등을 통해 데이터 접근을 조절할 수 있습니다.

상속은 기존 클래스의 기능을 물려받아 새 클래스를 만드는 문법입니다. 하지만 모든 관계를 상속으로 표현하면 안 됩니다. “A는 B이다” 관계일 때 상속이 어울리고, “A는 B를 가진다” 관계일 때는 구성이 더 적합합니다.

특수 메서드는 파이썬의 내장 문법과 객체를 연결해줍니다. \`__str__\`, \`__repr__\`, \`__len__\`, \`__eq__\`, \`__lt__\` 등을 정의하면 객체를 더 자연스럽게 사용할 수 있습니다.

\`dataclass\`는 데이터를 담는 클래스를 간단하게 만들 때 유용합니다.

데코레이터는 함수나 클래스에 특별한 기능을 붙이는 문법입니다. 이 장에서는 \`@property\`, \`@classmethod\`, \`@staticmethod\`, \`@dataclass\`를 중심으로 살펴보았습니다.

---

# 7장 연습문제

## 문제 1. 클래스와 객체

다음 설명 중 맞는 것을 고르세요.

1. 클래스는 객체를 만들기 위한 틀이다.
2. 객체는 반드시 하나만 만들 수 있다.
3. 메서드는 클래스 밖에만 정의할 수 있다.
4. \`self\`는 항상 문자열을 의미한다.

---

## 문제 2. 생성자 작성하기

다음 조건을 만족하는 \`Book\` 클래스를 작성하세요.

- 책 제목을 저장하는 \`title\` 속성을 가진다.
- 저자를 저장하는 \`author\` 속성을 가진다.
- 가격을 저장하는 \`price\` 속성을 가진다.
- 객체를 만들 때 제목, 저자, 가격을 전달받는다.

사용 예시는 다음과 같습니다.

\`\`\`python
book = Book("파이썬 기초", "홍길동", 20000)
print(book.title)
print(book.author)
print(book.price)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
파이썬 기초
홍길동
20000
\`\`\`

---

## 문제 3. 인스턴스 메서드 작성하기

다음 조건을 만족하는 \`Product\` 클래스를 작성하세요.

- 상품명 \`name\`
- 가격 \`price\`
- 재고 \`stock\`
- 재고를 차감하는 \`decrease_stock(quantity)\` 메서드
- 수량이 0 이하이면 \`ValueError\` 발생
- 재고보다 많은 수량을 차감하려고 하면 \`ValueError\` 발생

사용 예시는 다음과 같습니다.

\`\`\`python
product = Product("마우스", 15000, 10)
product.decrease_stock(3)
print(product.stock)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
7
\`\`\`

---

## 문제 4. 클래스 변수

다음 코드를 실행했을 때 결과를 예상해보세요.

\`\`\`python
class User:
    count = 0

    def __init__(self, name):
        self.name = name
        User.count += 1


user1 = User("김민수")
user2 = User("이지영")
user3 = User("박철수")

print(User.count)
\`\`\`

---

## 문제 5. 프로퍼티

다음 조건을 만족하는 \`Account\` 클래스를 작성하세요.

- 잔액을 의미하는 \`_balance\` 속성을 가진다.
- \`balance\` 프로퍼티로 잔액을 읽을 수 있다.
- 잔액에 음수를 대입하면 \`ValueError\`가 발생한다.
- 객체를 만들 때도 음수 잔액을 전달하면 \`ValueError\`가 발생한다.

사용 예시는 다음과 같습니다.

\`\`\`python
account = Account(10000)
print(account.balance)

account.balance = 20000
print(account.balance)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
10000
20000
\`\`\`

---

## 문제 6. 상속과 오버라이딩

다음 조건을 만족하는 클래스를 작성하세요.

- \`Member\` 클래스는 \`get_discount_rate()\` 메서드를 가진다.
- 일반 회원의 할인율은 \`0\`이다.
- \`VipMember\` 클래스는 \`Member\`를 상속한다.
- VIP 회원의 할인율은 \`0.1\`이다.

사용 예시는 다음과 같습니다.

\`\`\`python
member = Member()
vip_member = VipMember()

print(member.get_discount_rate())
print(vip_member.get_discount_rate())
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
0
0.1
\`\`\`

---

## 문제 7. 구성 관계

다음 조건을 만족하는 \`Customer\` 클래스와 \`Order\` 클래스를 작성하세요.

- \`Customer\`는 \`name\` 속성을 가진다.
- \`Order\`는 \`customer\` 속성을 가진다.
- \`Order\` 객체를 만들 때 \`Customer\` 객체를 전달받는다.
- 주문 고객의 이름을 출력할 수 있어야 한다.

사용 예시는 다음과 같습니다.

\`\`\`python
customer = Customer("김민수")
order = Order(customer)

print(order.customer.name)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
김민수
\`\`\`

---

## 문제 8. 특수 메서드

다음 조건을 만족하는 \`Product\` 클래스를 작성하세요.

- 상품명 \`name\`
- 가격 \`price\`
- \`print(product)\`를 실행하면 \`상품명: 가격원\` 형식으로 출력된다.

사용 예시는 다음과 같습니다.

\`\`\`python
product = Product("키보드", 30000)
print(product)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
키보드: 30000원
\`\`\`

---

## 문제 9. 데이터 클래스

\`dataclass\`를 사용해 다음 정보를 담는 \`CustomerData\` 클래스를 작성하세요.

- 이름 \`name\`
- 이메일 \`email\`
- 등급 \`grade\`
- 등급의 기본값은 \`"일반"\`이다.

사용 예시는 다음과 같습니다.

\`\`\`python
customer = CustomerData("김민수", "minsu@example.com")
print(customer)
\`\`\`

출력 결과는 다음과 비슷해야 합니다.

\`\`\`text
CustomerData(name='김민수', email='minsu@example.com', grade='일반')
\`\`\`

---

## 문제 10. 객체지향 설계 생각하기

다음 기능을 가진 프로그램을 만들려고 합니다.

\`\`\`text
1. 주문 데이터를 읽는다.
2. 주문 금액을 계산한다.
3. 보고서 문장을 만든다.
4. 보고서를 파일로 저장한다.
\`\`\`

이 기능을 하나의 클래스에 모두 넣는 대신 역할별 클래스로 나눈다면 어떤 클래스들을 만들 수 있을까요?

정답은 하나만 있는 것이 아닙니다. 역할이 분명하게 나뉘도록 작성해보세요.

---

# 7장 연습문제 정답 및 해설

## 문제 1 정답

정답은 1번입니다.

클래스는 객체를 만들기 위한 틀입니다. 하나의 클래스로 여러 객체를 만들 수 있습니다. 메서드는 클래스 안에 정의하는 함수입니다. \`self\`는 현재 메서드를 호출한 객체 자신을 가리킵니다.

---

## 문제 2 정답

\`\`\`python
class Book:
    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price


book = Book("파이썬 기초", "홍길동", 20000)

print(book.title)
print(book.author)
print(book.price)
\`\`\`

해설:

\`Book("파이썬 기초", "홍길동", 20000)\`을 실행하면 \`__init__\` 메서드가 자동으로 실행됩니다. 전달받은 값은 각각 \`self.title\`, \`self.author\`, \`self.price\`에 저장됩니다.

---

## 문제 3 정답

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def decrease_stock(self, quantity):
        if quantity <= 0:
            raise ValueError("수량은 1 이상이어야 합니다.")
        if quantity > self.stock:
            raise ValueError("재고가 부족합니다.")

        self.stock -= quantity


product = Product("마우스", 15000, 10)
product.decrease_stock(3)

print(product.stock)
\`\`\`

해설:

\`decrease_stock()\` 메서드는 상품의 재고를 변경하므로 인스턴스 메서드입니다. 재고보다 많은 수량을 차감하지 못하도록 먼저 검사합니다. 또한 수량이 0 이하인 경우도 잘못된 값이므로 예외를 발생시킵니다.

---

## 문제 4 정답

실행 결과는 다음과 같습니다.

\`\`\`text
3
\`\`\`

해설:

\`User\` 객체를 만들 때마다 \`__init__\`이 실행되고, 그 안에서 \`User.count += 1\`이 실행됩니다. 객체를 세 개 만들었으므로 \`User.count\`는 3이 됩니다.

---

## 문제 5 정답

\`\`\`python
class Account:
    def __init__(self, balance):
        if balance < 0:
            raise ValueError("잔액은 음수가 될 수 없습니다.")
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, balance):
        if balance < 0:
            raise ValueError("잔액은 음수가 될 수 없습니다.")
        self._balance = balance


account = Account(10000)
print(account.balance)

account.balance = 20000
print(account.balance)
\`\`\`

해설:

\`@property\`를 사용하면 \`balance\`를 메서드가 아니라 속성처럼 읽을 수 있습니다. \`@balance.setter\`를 사용하면 \`account.balance = 20000\`처럼 값을 넣을 때 검증 로직을 실행할 수 있습니다.

---

## 문제 6 정답

\`\`\`python
class Member:
    def get_discount_rate(self):
        return 0


class VipMember(Member):
    def get_discount_rate(self):
        return 0.1


member = Member()
vip_member = VipMember()

print(member.get_discount_rate())
print(vip_member.get_discount_rate())
\`\`\`

해설:

\`VipMember\`는 \`Member\`를 상속하고, \`get_discount_rate()\` 메서드를 다시 정의합니다. 이를 오버라이딩이라고 합니다.

---

## 문제 7 정답

\`\`\`python
class Customer:
    def __init__(self, name):
        self.name = name


class Order:
    def __init__(self, customer):
        self.customer = customer


customer = Customer("김민수")
order = Order(customer)

print(order.customer.name)
\`\`\`

해설:

주문은 고객의 한 종류가 아니므로 상속보다 구성이 자연스럽습니다. \`Order\` 객체가 \`Customer\` 객체를 속성으로 포함합니다.

---

## 문제 8 정답

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name}: {self.price}원"


product = Product("키보드", 30000)
print(product)
\`\`\`

해설:

\`print(product)\`를 실행하면 내부적으로 \`product.__str__()\`이 호출됩니다. \`__str__\`에서 원하는 문자열을 반환하면 객체 출력 형식을 바꿀 수 있습니다.

---

## 문제 9 정답

\`\`\`python
from dataclasses import dataclass


@dataclass
class CustomerData:
    name: str
    email: str
    grade: str = "일반"


customer = CustomerData("김민수", "minsu@example.com")

print(customer)
\`\`\`

해설:

\`@dataclass\`를 사용하면 데이터를 담는 클래스를 간단하게 만들 수 있습니다. \`grade: str = "일반"\`처럼 기본값을 지정하면 객체를 만들 때 등급을 생략할 수 있습니다.

---

## 문제 10 예시 정답

예시로 다음과 같이 나눌 수 있습니다.

\`\`\`text
OrderReader
- 주문 데이터를 읽는다.

OrderCalculator
- 주문 금액을 계산한다.

ReportGenerator
- 보고서 문장을 만든다.

ReportSaver
- 보고서를 파일로 저장한다.
\`\`\`

또는 다음과 같이 나눌 수도 있습니다.

\`\`\`text
OrderDataLoader
- 주문 데이터를 불러온다.

OrderService
- 주문 금액과 할인 금액을 계산한다.

TextReportBuilder
- 보고서 내용을 만든다.

FileWriter
- 파일 저장을 담당한다.
\`\`\`

해설:

정답은 하나만 있는 것이 아닙니다. 중요한 것은 하나의 클래스가 너무 많은 일을 하지 않도록 역할을 분리하는 것입니다. 클래스 이름만 봐도 책임이 어느 정도 드러나면 좋은 설계에 가까워집니다.
`;export{e as default};