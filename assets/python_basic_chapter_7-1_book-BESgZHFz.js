var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-1 -->

# 7.1 객체지향 프로그래밍이란?

### 7.1.1 객체지향의 개념

프로그래밍을 하다 보면 어떤 데이터와 그 데이터를 다루는 기능이 항상 함께 움직이는 경우가 많습니다.

예를 들어 상품 데이터를 생각해봅시다.

상품에는 보통 다음과 같은 데이터가 있습니다.

- 상품명
- 가격
- 재고 수량

그리고 상품과 관련된 기능도 있습니다.

- 가격 변경하기
- 재고 차감하기
- 재고가 충분한지 확인하기
- 상품 정보를 출력하기

함수만 사용하면 데이터는 딕셔너리나 리스트에 저장하고, 기능은 함수로 따로 작성하게 됩니다.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10,
}


def decrease_stock(product, quantity):
    product["stock"] -= quantity


decrease_stock(product, 2)
print(product["stock"])
\`\`\`

이 방식도 틀린 것은 아닙니다. 하지만 상품과 관련된 함수가 많아지면, 어떤 함수가 상품 데이터를 바꾸는지 관리하기 어려워질 수 있습니다.

객체지향에서는 상품 데이터와 상품 기능을 하나의 단위로 묶습니다.

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def decrease_stock(self, quantity):
        self.stock -= quantity


keyboard = Product("키보드", 30000, 10)
keyboard.decrease_stock(2)

print(keyboard.stock)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
8
\`\`\`

객체지향 프로그래밍은 이렇게 **관련 있는 데이터와 기능을 하나의 객체로 묶어 프로그램을 구성하는 방식**입니다.

---

### 7.1.2 객체란 무엇인가

객체는 프로그램 안에서 하나의 대상으로 다룰 수 있는 값입니다.

실제 업무에서 다루는 대상은 대부분 객체로 표현할 수 있습니다.

| 실무 대상 | 객체로 표현할 수 있는 예 |
|---|---|
| 고객 | 이름, 이메일, 등급, 포인트 |
| 상품 | 상품명, 가격, 재고 |
| 주문 | 주문번호, 고객, 주문 상품, 주문 금액 |
| 파일 | 파일명, 경로, 확장자, 크기 |
| 보고서 | 제목, 기준일, 데이터, 저장 경로 |

객체는 보통 두 가지를 가집니다.

첫째, **속성**입니다. 속성은 객체가 가지고 있는 데이터입니다.

둘째, **메서드**입니다. 메서드는 객체가 할 수 있는 동작입니다.

예를 들어 상품 객체는 다음과 같이 생각할 수 있습니다.

\`\`\`text
상품 객체
- 속성: 상품명, 가격, 재고
- 메서드: 가격 변경, 재고 차감, 재고 확인
\`\`\`

고객 객체는 다음과 같이 생각할 수 있습니다.

\`\`\`text
고객 객체
- 속성: 이름, 이메일, 등급
- 메서드: 등급 변경, 할인율 조회
\`\`\`

---

### 7.1.3 클래스란 무엇인가

클래스는 객체를 만들기 위한 틀입니다.

비유하자면 클래스는 설계도이고, 객체는 설계도로 만들어진 실제 물건입니다. 같은 설계도로 여러 개의 물건을 만들 수 있듯이, 하나의 클래스로 여러 객체를 만들 수 있습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email
\`\`\`

위 코드는 고객을 만들 수 있는 \`Customer\` 클래스를 정의한 것입니다.

이 클래스를 사용하면 여러 고객 객체를 만들 수 있습니다.

\`\`\`python
customer1 = Customer("김민수", "minsu@example.com")
customer2 = Customer("이지영", "jiyoung@example.com")

print(customer1.name)
print(customer2.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
이지영
\`\`\`

\`customer1\`과 \`customer2\`는 같은 \`Customer\` 클래스로 만들었지만 서로 다른 객체입니다. 각 객체는 자신만의 이름과 이메일을 가집니다.

---

### 7.1.4 절차지향 코드와 객체지향 코드

객체지향을 이해하려면 먼저 절차지향 방식과 비교해보는 것이 좋습니다.

절차지향 코드는 보통 프로그램이 실행되는 순서와 함수 중심으로 작성됩니다.

\`\`\`python
customer_name = "김민수"
customer_grade = "VIP"
order_price = 50000


def get_discount_rate(grade):
    if grade == "VIP":
        return 0.1
    return 0


def calculate_payment(price, discount_rate):
    return int(price * (1 - discount_rate))


discount_rate = get_discount_rate(customer_grade)
payment = calculate_payment(order_price, discount_rate)

print(payment)
\`\`\`

이 방식은 간단한 프로그램에서는 충분히 좋습니다. 하지만 고객, 상품, 주문, 결제 같은 대상이 많아지면 데이터와 함수가 흩어질 수 있습니다.

객체지향 방식에서는 고객과 주문 같은 대상을 클래스로 묶어 표현합니다.

\`\`\`python
class Customer:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def get_discount_rate(self):
        if self.grade == "VIP":
            return 0.1
        return 0


class Order:
    def __init__(self, customer, price):
        self.customer = customer
        self.price = price

    def calculate_payment(self):
        discount_rate = self.customer.get_discount_rate()
        return int(self.price * (1 - discount_rate))


customer = Customer("김민수", "VIP")
order = Order(customer, 50000)

print(order.calculate_payment())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
45000
\`\`\`

객체지향 코드에서는 “고객이 할인율을 알고 있다”, “주문이 최종 결제 금액을 계산한다”처럼 역할을 나누어 생각할 수 있습니다.

---

### 7.1.5 실무에서 객체지향을 사용하는 이유

객체지향은 문법을 어렵게 만들기 위한 것이 아닙니다. 프로그램이 커질수록 코드를 더 잘 관리하기 위한 방식입니다.

실무에서 객체지향을 사용하는 이유는 다음과 같습니다.

첫째, 관련 있는 데이터와 기능을 함께 관리할 수 있습니다.

둘째, 코드의 역할을 나누기 쉽습니다.

셋째, 같은 구조의 객체를 여러 개 만들 수 있습니다.

넷째, 코드 재사용성이 좋아집니다.

다섯째, 수정해야 할 위치를 찾기 쉬워집니다.

다만 모든 코드를 반드시 클래스로 만들어야 하는 것은 아닙니다. 작은 계산 함수나 간단한 데이터 처리에는 함수만으로도 충분합니다. 객체지향은 프로그램의 구조가 복잡해질 때 특히 유용합니다.

---
`;export{e as default};