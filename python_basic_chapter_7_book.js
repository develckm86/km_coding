var e=`# 7장 객체지향 프로그래밍

## 이 장에서 배울 내용

지금까지 우리는 변수, 자료형, 조건문, 반복문, 자료구조, 함수, 예외 처리와 디버깅을 배웠습니다. 이 정도만 알아도 작은 프로그램은 충분히 만들 수 있습니다. 하지만 프로그램의 규모가 커질수록 데이터와 함수가 여러 곳에 흩어지고, 같은 규칙을 반복해서 작성하게 되며, 어떤 코드가 어떤 데이터를 바꾸는지 추적하기 어려워집니다.

객체지향 프로그래밍은 이런 문제를 줄이기 위해 **데이터와 그 데이터를 다루는 기능을 하나로 묶어 관리하는 방식**입니다. 파이썬에서는 \`class\`를 사용해 객체를 만들고, 객체 안에 속성과 메서드를 정의합니다.

이 장에서는 객체지향을 단순히 “클래스를 만드는 문법”으로만 배우지 않습니다. 실무 코드에서 클래스를 왜 사용하는지, 어떤 기준으로 클래스를 나누는지, 클래스 안에서 데이터를 어떻게 안전하게 관리하는지까지 함께 살펴봅니다.

---

## 7.1 객체지향 프로그래밍이란?

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

## 7.2 클래스와 객체 기본 문법

### 7.2.1 클래스 정의

클래스를 정의할 때는 \`class\` 키워드를 사용합니다.

\`\`\`python
class Customer:
    pass
\`\`\`

\`pass\`는 “아직 아무 내용도 작성하지 않겠다”라는 뜻입니다. 문법상 코드 블록이 필요하지만 아직 구현할 내용이 없을 때 사용합니다.

클래스 이름은 보통 대문자로 시작하고, 여러 단어를 붙일 때는 각 단어의 첫 글자를 대문자로 씁니다.

\`\`\`python
class Product:
    pass


class OrderItem:
    pass


class ReportGenerator:
    pass
\`\`\`

이런 표기법을 보통 \`PascalCase\`라고 부릅니다.

---

### 7.2.2 객체 생성

클래스를 정의했다면 클래스를 호출해서 객체를 만들 수 있습니다.

\`\`\`python
class Customer:
    pass


customer = Customer()

print(customer)
\`\`\`

실행하면 다음과 비슷한 결과가 나옵니다.

\`\`\`text
<__main__.Customer object at 0x...>
\`\`\`

출력 내용이 조금 낯설 수 있지만, 중요한 것은 \`Customer\` 클래스로 객체가 하나 만들어졌다는 점입니다.

객체를 다른 말로 **인스턴스**라고도 합니다. 엄밀히 말하면 \`customer\`는 \`Customer\` 클래스의 인스턴스입니다.

---

### 7.2.3 속성 만들기

객체에는 속성을 저장할 수 있습니다. 속성은 객체가 가지고 있는 데이터입니다.

\`\`\`python
class Customer:
    pass


customer = Customer()
customer.name = "김민수"
customer.email = "minsu@example.com"

print(customer.name)
print(customer.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

파이썬에서는 위처럼 객체를 만든 뒤 속성을 추가할 수 있습니다. 하지만 실무에서는 객체마다 필요한 속성을 일정하게 만들기 위해 생성자 \`__init__\`을 사용하는 것이 일반적입니다. 생성자는 다음 절에서 자세히 배웁니다.

---

### 7.2.4 메서드 만들기

클래스 안에 정의된 함수를 메서드라고 부릅니다.

\`\`\`python
class Customer:
    def say_hello(self):
        print("안녕하세요.")


customer = Customer()
customer.say_hello()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요.
\`\`\`

여기서 \`say_hello()\`는 함수처럼 보이지만 클래스 안에 있으므로 메서드입니다.

---

### 7.2.5 \`self\`의 의미

클래스 안의 메서드는 첫 번째 매개변수로 보통 \`self\`를 받습니다.

\`\`\`python
class Customer:
    def say_name(self):
        print(self.name)
\`\`\`

\`self\`는 현재 메서드를 호출한 객체 자신을 가리킵니다.

\`\`\`python
class Customer:
    def say_name(self):
        print(self.name)


customer1 = Customer()
customer1.name = "김민수"

customer2 = Customer()
customer2.name = "이지영"

customer1.say_name()
customer2.say_name()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
이지영
\`\`\`

\`customer1.say_name()\`을 호출하면 \`self\`는 \`customer1\`을 가리킵니다. \`customer2.say_name()\`을 호출하면 \`self\`는 \`customer2\`를 가리킵니다.

즉, \`self.name\`은 항상 “현재 객체의 name 속성”을 의미합니다.

---

### 7.2.6 클래스 기본 예제

고객 클래스를 조금 더 구체적으로 만들어봅시다.

\`\`\`python
class Customer:
    def introduce(self):
        print(f"저는 {self.name}입니다. 이메일은 {self.email}입니다.")


customer = Customer()
customer.name = "김민수"
customer.email = "minsu@example.com"

customer.introduce()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
저는 김민수입니다. 이메일은 minsu@example.com입니다.
\`\`\`

이 예제에서 고객 객체는 \`name\`, \`email\`이라는 속성을 가지고 있고, \`introduce()\`라는 메서드를 가지고 있습니다.


---

## 7.3 생성자 \`__init__\`

### 7.3.1 생성자가 필요한 이유

앞에서 객체를 만든 뒤 속성을 직접 추가했습니다.

\`\`\`python
customer = Customer()
customer.name = "김민수"
customer.email = "minsu@example.com"
\`\`\`

이 방식은 간단해 보이지만 문제가 있습니다. 객체를 만들 때마다 필요한 속성을 매번 직접 지정해야 합니다. 속성 이름을 잘못 쓰거나 빠뜨리면 나중에 에러가 발생할 수 있습니다.

\`\`\`python
customer = Customer()
customer.name = "김민수"

print(customer.email)  # email 속성이 없어서 에러 발생
\`\`\`

이런 문제를 줄이기 위해 객체가 만들어질 때 필요한 값을 처음부터 설정하도록 만들 수 있습니다. 이때 사용하는 메서드가 \`__init__\`입니다.

---

### 7.3.2 \`__init__\` 기본 문법

\`__init__\`은 객체가 생성될 때 자동으로 실행되는 특별한 메서드입니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email


customer = Customer("김민수", "minsu@example.com")

print(customer.name)
print(customer.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

\`Customer("김민수", "minsu@example.com")\`을 실행하면 새 객체가 만들어지고, \`__init__\` 메서드가 자동으로 실행됩니다.

실행 흐름은 다음과 같이 이해할 수 있습니다.

\`\`\`text
1. Customer 객체를 하나 만든다.
2. "김민수"를 name 매개변수로 전달한다.
3. "minsu@example.com"을 email 매개변수로 전달한다.
4. self.name에 "김민수"를 저장한다.
5. self.email에 "minsu@example.com"을 저장한다.
\`\`\`

---

### 7.3.3 인스턴스 변수

\`self.name\`, \`self.email\`처럼 객체에 저장되는 변수를 **인스턴스 변수**라고 합니다.

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
\`\`\`

이 클래스는 상품 객체를 만들 때 상품명, 가격, 재고를 저장합니다.

\`\`\`python
keyboard = Product("키보드", 30000, 10)
mouse = Product("마우스", 15000, 20)

print(keyboard.name)
print(mouse.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
마우스
\`\`\`

\`keyboard\`와 \`mouse\`는 같은 \`Product\` 클래스로 만들었지만 각각 다른 값을 가집니다. 인스턴스 변수는 객체마다 따로 저장됩니다.

---

### 7.3.4 기본값이 있는 생성자

생성자 매개변수에도 기본값을 지정할 수 있습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email, grade="일반"):
        self.name = name
        self.email = email
        self.grade = grade


customer1 = Customer("김민수", "minsu@example.com")
customer2 = Customer("이지영", "jiyoung@example.com", "VIP")

print(customer1.grade)
print(customer2.grade)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
일반
VIP
\`\`\`

기본값을 지정하면 객체를 만들 때 해당 값을 생략할 수 있습니다. 예제에서는 등급을 생략하면 \`"일반"\`이 저장됩니다.

---

### 7.3.5 생성자에서 값 검증하기

생성자는 객체가 처음 만들어지는 시점에 실행되므로, 잘못된 값이 들어오지 않도록 검사하기 좋습니다.

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        if price < 0:
            raise ValueError("가격은 0보다 작을 수 없습니다.")
        if stock < 0:
            raise ValueError("재고는 0보다 작을 수 없습니다.")

        self.name = name
        self.price = price
        self.stock = stock
\`\`\`

이제 잘못된 가격이나 재고로 상품을 만들면 에러가 발생합니다.

\`\`\`python
product = Product("키보드", -30000, 10)
\`\`\`

실행하면 다음과 같은 에러가 발생합니다.

\`\`\`text
ValueError: 가격은 0보다 작을 수 없습니다.
\`\`\`

이처럼 객체를 만들 때부터 데이터의 규칙을 지키게 만들면 이후 코드가 더 안전해집니다.

---

## 7.4 인스턴스 변수와 클래스 변수

### 7.4.1 인스턴스 변수

인스턴스 변수는 객체마다 따로 가지는 변수입니다.

\`\`\`python
class Customer:
    def __init__(self, name):
        self.name = name


customer1 = Customer("김민수")
customer2 = Customer("이지영")

print(customer1.name)
print(customer2.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
이지영
\`\`\`

\`customer1.name\`과 \`customer2.name\`은 서로 다른 값입니다. 각 객체가 자신만의 \`name\`을 가지고 있기 때문입니다.

---

### 7.4.2 클래스 변수

클래스 변수는 클래스에 속하는 변수입니다. 모든 객체가 함께 공유하는 값에 사용합니다.

\`\`\`python
class Customer:
    count = 0

    def __init__(self, name):
        self.name = name
        Customer.count += 1


customer1 = Customer("김민수")
customer2 = Customer("이지영")
customer3 = Customer("박철수")

print(Customer.count)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
3
\`\`\`

\`count\`는 특정 고객 한 명의 이름처럼 객체마다 달라지는 값이 아닙니다. 전체 고객 객체가 몇 개 만들어졌는지를 나타내는 값입니다. 이런 경우 클래스 변수로 둘 수 있습니다.

---

### 7.4.3 인스턴스 변수와 클래스 변수 비교

| 구분 | 인스턴스 변수 | 클래스 변수 |
|---|---|---|
| 소속 | 객체 | 클래스 |
| 값의 범위 | 객체마다 다름 | 모든 객체가 공유 |
| 접근 방식 | \`self.name\` | \`ClassName.variable\` |
| 사용 예 | 고객 이름, 상품 가격 | 전체 객체 수, 공통 설정값 |

상품 클래스로 다시 비교해봅시다.

\`\`\`python
class Product:
    tax_rate = 0.1

    def __init__(self, name, price):
        self.name = name
        self.price = price
\`\`\`

\`name\`과 \`price\`는 상품마다 다르므로 인스턴스 변수입니다. \`tax_rate\`는 모든 상품에 공통으로 적용되는 부가세율이라고 가정하면 클래스 변수로 둘 수 있습니다.

\`\`\`python
keyboard = Product("키보드", 30000)
mouse = Product("마우스", 15000)

print(keyboard.price)
print(mouse.price)
print(Product.tax_rate)
\`\`\`

---

### 7.4.4 클래스 변수 사용 시 주의점

클래스 변수는 모든 객체가 공유하므로, 객체별로 달라져야 하는 값을 클래스 변수로 두면 문제가 생깁니다.

\`\`\`python
class Cart:
    items = []

    def add_item(self, item):
        self.items.append(item)


cart1 = Cart()
cart2 = Cart()

cart1.add_item("키보드")
cart2.add_item("마우스")

print(cart1.items)
print(cart2.items)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['키보드', '마우스']
['키보드', '마우스']
\`\`\`

\`cart1\`과 \`cart2\`가 같은 \`items\` 리스트를 공유하기 때문에 이런 문제가 생깁니다.

장바구니의 상품 목록은 객체마다 달라야 하므로 인스턴스 변수로 만들어야 합니다.

\`\`\`python
class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)


cart1 = Cart()
cart2 = Cart()

cart1.add_item("키보드")
cart2.add_item("마우스")

print(cart1.items)
print(cart2.items)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['키보드']
['마우스']
\`\`\`

리스트나 딕셔너리처럼 수정 가능한 데이터를 클래스 변수로 둘 때는 특히 주의해야 합니다.

---

## 7.5 인스턴스 메서드

### 7.5.1 인스턴스 메서드란?

인스턴스 메서드는 객체가 가진 데이터, 즉 인스턴스 변수를 사용하거나 변경하는 메서드입니다.

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def show_info(self):
        print(f"상품명: {self.name}")
        print(f"가격: {self.price}")
        print(f"재고: {self.stock}")
\`\`\`

\`show_info()\`는 현재 객체의 \`name\`, \`price\`, \`stock\`을 사용하므로 인스턴스 메서드입니다.

\`\`\`python
product = Product("키보드", 30000, 10)
product.show_info()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
상품명: 키보드
가격: 30000
재고: 10
\`\`\`

---

### 7.5.2 객체 상태 변경하기

메서드는 객체의 상태를 변경할 수도 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def decrease_stock(self, quantity):
        self.stock -= quantity


product = Product("키보드", 30000, 10)
product.decrease_stock(3)

print(product.stock)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
7
\`\`\`

하지만 위 코드는 문제가 있습니다. 재고보다 많은 수량을 차감해도 막지 못합니다. 실무에서는 이런 일이 발생하지 않도록 메서드 안에서 검증해야 합니다.

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
\`\`\`

이제 잘못된 수량을 전달하면 객체 상태가 잘못 변경되지 않습니다.

---

### 7.5.3 값을 반환하는 메서드

메서드는 계산 결과를 반환할 수도 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def calculate_total_price(self, quantity):
        return self.price * quantity


product = Product("키보드", 30000, 10)
total_price = product.calculate_total_price(3)

print(total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
90000
\`\`\`

메서드 안에서 바로 출력할 수도 있지만, 계산 결과가 필요한 경우에는 \`return\`으로 반환하는 것이 좋습니다.

---

### 7.5.4 고객 등급 변경 메서드

고객 등급을 변경하는 예제를 살펴봅시다.

\`\`\`python
class Customer:
    def __init__(self, name, email, grade="일반"):
        self.name = name
        self.email = email
        self.grade = grade

    def change_grade(self, new_grade):
        allowed_grades = ["일반", "VIP", "VVIP"]

        if new_grade not in allowed_grades:
            raise ValueError("존재하지 않는 등급입니다.")

        self.grade = new_grade


customer = Customer("김민수", "minsu@example.com")
customer.change_grade("VIP")

print(customer.grade)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
VIP
\`\`\`

등급을 직접 수정할 수도 있습니다.

\`\`\`python
customer.grade = "아무등급"
\`\`\`

하지만 이렇게 하면 잘못된 값이 들어갈 수 있습니다. 그래서 실무에서는 메서드를 통해 값을 바꾸도록 만들고, 메서드 안에서 검증하는 방식이 자주 사용됩니다.


---

## 7.6 클래스 메서드와 정적 메서드

### 7.6.1 메서드의 종류

클래스 안에 들어가는 메서드는 크게 세 가지로 나눌 수 있습니다.

- 인스턴스 메서드
- 클래스 메서드
- 정적 메서드

지금까지 배운 대부분의 메서드는 인스턴스 메서드입니다. 인스턴스 메서드는 \`self\`를 통해 객체의 속성에 접근합니다.

클래스 메서드는 \`cls\`를 통해 클래스 자체에 접근합니다.

정적 메서드는 \`self\`나 \`cls\`를 사용하지 않습니다. 클래스 안에 함께 두면 의미가 분명해지는 일반 함수라고 생각할 수 있습니다.

---

### 7.6.2 클래스 메서드

클래스 메서드는 \`@classmethod\`를 붙여 만듭니다. 첫 번째 매개변수로 \`cls\`를 받습니다.

\`\`\`python
class Customer:
    count = 0

    def __init__(self, name, email):
        self.name = name
        self.email = email
        Customer.count += 1

    @classmethod
    def get_count(cls):
        return cls.count


customer1 = Customer("김민수", "minsu@example.com")
customer2 = Customer("이지영", "jiyoung@example.com")

print(Customer.get_count())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2
\`\`\`

\`get_count()\`는 특정 고객 한 명의 데이터가 아니라 \`Customer\` 클래스 전체의 \`count\` 값을 사용합니다. 이런 경우 클래스 메서드가 어울립니다.

---

### 7.6.3 클래스 메서드로 객체 만들기

클래스 메서드는 다른 형식의 데이터로부터 객체를 만들 때도 자주 사용됩니다.

예를 들어 고객 정보를 문자열로 받는다고 가정해봅시다.

\`\`\`python
text = "김민수,minsu@example.com"
\`\`\`

이 문자열을 이용해 \`Customer\` 객체를 만들 수 있습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @classmethod
    def from_text(cls, text):
        name, email = text.split(",")
        return cls(name, email)


customer = Customer.from_text("김민수,minsu@example.com")

print(customer.name)
print(customer.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

\`from_text()\`는 문자열을 분석해서 객체를 생성합니다. 이런 메서드를 “대체 생성자”처럼 사용할 수 있습니다.

---

### 7.6.4 정적 메서드

정적 메서드는 \`@staticmethod\`를 붙여 만듭니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @staticmethod
    def is_valid_email(email):
        return "@" in email


print(Customer.is_valid_email("minsu@example.com"))
print(Customer.is_valid_email("wrong-email"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

\`is_valid_email()\`은 특정 고객 객체의 상태를 사용하지 않습니다. 클래스 전체의 상태도 사용하지 않습니다. 단지 이메일 문자열이 유효한지 검사합니다.

그렇다면 왜 클래스 안에 넣었을까요? 고객과 관련된 기능이기 때문입니다. 이런 경우 정적 메서드로 클래스 안에 함께 둘 수 있습니다.

---

### 7.6.5 메서드 종류 비교

| 메서드 종류 | 첫 번째 매개변수 | 주로 사용하는 상황 |
|---|---|---|
| 인스턴스 메서드 | \`self\` | 객체의 속성을 읽거나 변경할 때 |
| 클래스 메서드 | \`cls\` | 클래스 변수에 접근하거나 객체 생성 방식을 제공할 때 |
| 정적 메서드 | 없음 | 객체나 클래스 상태와 무관하지만 클래스와 관련 있는 기능일 때 |

처음 객체지향을 배울 때는 인스턴스 메서드를 가장 많이 사용합니다. 클래스 메서드와 정적 메서드는 필요할 때 조금씩 익숙해지면 됩니다.

---

## 7.7 캡슐화와 접근 제어

### 7.7.1 캡슐화란 무엇인가

캡슐화는 객체 내부의 데이터를 외부에서 함부로 바꾸지 못하게 하고, 정해진 방법을 통해서만 다루게 하는 방식입니다.

예를 들어 상품 가격은 음수가 되면 안 됩니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price


product = Product("키보드", 30000)
product.price = -10000

print(product.price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
-10000
\`\`\`

상품 가격이 음수가 되었지만 파이썬은 막지 않습니다. 이런 상황을 방지하려면 가격을 직접 수정하는 대신 메서드나 프로퍼티를 통해 검증해야 합니다.

---

### 7.7.2 \`_변수명\` 관례

파이썬에서는 변수명 앞에 밑줄 하나를 붙여 내부용 변수라는 뜻을 표현합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price
\`\`\`

\`_price\`는 “클래스 내부에서 사용하는 값이므로 외부에서 직접 건드리지 않는 것이 좋다”는 의미입니다.

하지만 이것은 강제 규칙이 아니라 관례입니다. 외부에서 접근 자체가 불가능한 것은 아닙니다.

\`\`\`python
product = Product("키보드", 30000)
print(product._price)
\`\`\`

이 코드는 실행됩니다. 그러나 실무 코드에서는 \`_\`로 시작하는 속성은 외부에서 직접 사용하지 않는 것이 좋습니다.

---

### 7.7.3 \`__변수명\`과 이름 맹글링

변수명 앞에 밑줄 두 개를 붙이면 이름 맹글링이 적용됩니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.__price = price


product = Product("키보드", 30000)
print(product.__price)
\`\`\`

위 코드는 에러가 발생합니다.

\`\`\`text
AttributeError
\`\`\`

파이썬은 \`__price\`라는 이름을 내부적으로 다른 이름으로 바꿉니다. 이를 이름 맹글링이라고 합니다. 다만 이것도 완벽한 보안 기능은 아닙니다. 주 목적은 실수로 외부에서 직접 접근하는 것을 줄이는 데 있습니다.

---

### 7.7.4 getter와 setter

객체의 값을 직접 수정하지 않고 메서드를 통해 읽고 변경할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    def get_price(self):
        return self._price

    def set_price(self, price):
        if price < 0:
            raise ValueError("가격은 0보다 작을 수 없습니다.")
        self._price = price


product = Product("키보드", 30000)
product.set_price(35000)

print(product.get_price())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
35000
\`\`\`

이제 \`set_price()\`를 통해 가격을 변경하면 검증을 거칠 수 있습니다.

\`\`\`python
product.set_price(-1000)
\`\`\`

실행하면 다음과 같은 에러가 발생합니다.

\`\`\`text
ValueError: 가격은 0보다 작을 수 없습니다.
\`\`\`

---

## 7.8 프로퍼티 \`@property\`

### 7.8.1 \`@property\`가 필요한 이유

getter와 setter를 직접 만들면 안전하지만, 사용하는 코드가 조금 길어집니다.

\`\`\`python
product.set_price(35000)
print(product.get_price())
\`\`\`

파이썬에서는 \`@property\`를 사용해 메서드를 속성처럼 사용할 수 있습니다.

\`\`\`python
print(product.price)
product.price = 35000
\`\`\`

이렇게 쓰면서도 내부적으로는 검증 로직을 실행할 수 있습니다.

---

### 7.8.2 getter 만들기

\`@property\`를 붙이면 메서드를 속성처럼 읽을 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        return self._price


product = Product("키보드", 30000)

print(product.price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30000
\`\`\`

겉으로는 \`product.price\`처럼 속성을 읽는 것 같지만, 실제로는 \`price()\` 메서드가 실행됩니다.

---

### 7.8.3 setter 만들기

값을 수정할 때 실행되는 setter를 만들려면 \`@속성이름.setter\`를 사용합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, price):
        if price < 0:
            raise ValueError("가격은 0보다 작을 수 없습니다.")
        self._price = price


product = Product("키보드", 30000)
product.price = 35000

print(product.price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
35000
\`\`\`

잘못된 값을 넣으면 에러가 발생합니다.

\`\`\`python
product.price = -1000
\`\`\`

\`\`\`text
ValueError: 가격은 0보다 작을 수 없습니다.
\`\`\`

---

### 7.8.4 읽기 전용 속성

프로퍼티를 사용하면 계산된 값을 읽기 전용 속성처럼 제공할 수 있습니다.

\`\`\`python
class Order:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    @property
    def total_price(self):
        return self.price * self.quantity


order = Order(30000, 3)

print(order.total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
90000
\`\`\`

\`total_price\`는 실제로 저장된 값이 아니라 \`price\`와 \`quantity\`를 이용해 계산한 값입니다. 하지만 사용하는 쪽에서는 속성처럼 읽을 수 있습니다.

\`\`\`python
order.total_price = 100000
\`\`\`

setter를 만들지 않았으므로 위와 같이 값을 직접 대입하면 에러가 발생합니다.


---

## 7.9 상속

### 7.9.1 상속이란 무엇인가

상속은 기존 클래스의 속성과 메서드를 물려받아 새로운 클래스를 만드는 문법입니다.

예를 들어 일반 회원과 VIP 회원을 생각해봅시다.

일반 회원과 VIP 회원은 모두 이름과 이메일을 가집니다. 하지만 할인율은 다를 수 있습니다.

공통되는 부분은 부모 클래스에 두고, 달라지는 부분은 자식 클래스에서 정의할 수 있습니다.

---

### 7.9.2 상속 기본 문법

\`\`\`python
class Member:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def get_discount_rate(self):
        return 0


class VipMember(Member):
    def get_discount_rate(self):
        return 0.1
\`\`\`

\`VipMember(Member)\`는 \`VipMember\`가 \`Member\`를 상속한다는 뜻입니다.

\`\`\`python
member = Member("김민수", "minsu@example.com")
vip_member = VipMember("이지영", "jiyoung@example.com")

print(member.name)
print(vip_member.name)
print(member.get_discount_rate())
print(vip_member.get_discount_rate())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
이지영
0
0.1
\`\`\`

\`VipMember\` 클래스에는 \`__init__\`을 따로 만들지 않았지만 부모 클래스인 \`Member\`의 \`__init__\`을 사용할 수 있습니다.

---

### 7.9.3 \`super()\` 사용하기

자식 클래스에서 생성자를 새로 정의하면서 부모 클래스의 생성자도 사용하고 싶을 때 \`super()\`를 사용합니다.

\`\`\`python
class Member:
    def __init__(self, name, email):
        self.name = name
        self.email = email


class VipMember(Member):
    def __init__(self, name, email, vip_point):
        super().__init__(name, email)
        self.vip_point = vip_point


vip_member = VipMember("이지영", "jiyoung@example.com", 1000)

print(vip_member.name)
print(vip_member.email)
print(vip_member.vip_point)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
이지영
jiyoung@example.com
1000
\`\`\`

\`super().__init__(name, email)\`은 부모 클래스의 생성자를 호출합니다. 그래서 부모가 처리하던 \`name\`, \`email\` 초기화를 다시 작성하지 않아도 됩니다.

---

### 7.9.4 상속을 사용할 때 주의할 점

상속은 공통 기능을 재사용할 수 있게 해주지만, 무조건 좋은 것은 아닙니다.

상속을 사용할 때는 다음 질문을 해보는 것이 좋습니다.

\`\`\`text
자식 클래스는 정말 부모 클래스의 한 종류인가?
\`\`\`

예를 들어 \`VipMember\`는 \`Member\`의 한 종류라고 볼 수 있습니다. 그래서 상속이 자연스럽습니다.

하지만 \`Order\`가 \`Customer\`를 상속하는 것은 어색합니다. 주문은 고객의 한 종류가 아니기 때문입니다. 이 경우 주문 객체가 고객 객체를 포함하는 방식이 더 자연스럽습니다.

\`\`\`python
class Order:
    def __init__(self, customer):
        self.customer = customer
\`\`\`

상속은 “is-a 관계”일 때 어울립니다.

\`\`\`text
VIP 회원은 회원이다.
할인 상품은 상품이다.
CSV 파일 처리기는 파일 처리기이다.
\`\`\`

반면 포함 관계는 “has-a 관계”일 때 어울립니다.

\`\`\`text
주문은 고객을 가진다.
주문은 상품 목록을 가진다.
보고서 생성기는 저장 도구를 가진다.
\`\`\`

---

## 7.10 메서드 오버라이딩

### 7.10.1 오버라이딩이란 무엇인가

오버라이딩은 부모 클래스에 있는 메서드를 자식 클래스에서 다시 정의하는 것입니다.

\`\`\`python
class Member:
    def get_discount_rate(self):
        return 0


class VipMember(Member):
    def get_discount_rate(self):
        return 0.1
\`\`\`

\`Member\`에도 \`get_discount_rate()\`가 있고, \`VipMember\`에도 같은 이름의 메서드가 있습니다. 이때 \`VipMember\` 객체에서 \`get_discount_rate()\`를 호출하면 자식 클래스의 메서드가 실행됩니다.

\`\`\`python
member = Member()
vip_member = VipMember()

print(member.get_discount_rate())
print(vip_member.get_discount_rate())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
0
0.1
\`\`\`

---

### 7.10.2 부모 기능 확장하기

오버라이딩할 때 부모 메서드의 기능을 그대로 사용하면서 일부 기능만 추가할 수도 있습니다.

\`\`\`python
class Report:
    def create(self):
        print("보고서 데이터를 생성합니다.")


class ExcelReport(Report):
    def create(self):
        super().create()
        print("엑셀 파일로 저장합니다.")


report = ExcelReport()
report.create()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
보고서 데이터를 생성합니다.
엑셀 파일로 저장합니다.
\`\`\`

\`super().create()\`를 호출하면 부모 클래스의 \`create()\` 메서드가 먼저 실행됩니다. 그다음 자식 클래스의 추가 코드가 실행됩니다.

---

### 7.10.3 다형성의 기초

다형성은 같은 이름의 메서드를 호출하더라도 객체의 종류에 따라 다르게 동작하는 성질입니다.

\`\`\`python
class CreditCardPayment:
    def pay(self, amount):
        print(f"신용카드로 {amount}원을 결제합니다.")


class BankTransferPayment:
    def pay(self, amount):
        print(f"계좌이체로 {amount}원을 결제합니다.")


payments = [CreditCardPayment(), BankTransferPayment()]

for payment in payments:
    payment.pay(50000)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
신용카드로 50000원을 결제합니다.
계좌이체로 50000원을 결제합니다.
\`\`\`

두 객체는 모두 \`pay()\`라는 메서드를 가지고 있지만 실행 결과는 다릅니다. 사용하는 쪽에서는 결제 방식이 무엇인지 자세히 몰라도 \`pay()\`만 호출하면 됩니다.

---

## 7.11 구성 관계와 의존 관계

### 7.11.1 구성 관계란 무엇인가

구성 관계는 한 객체가 다른 객체를 속성으로 포함하는 구조입니다.

주문 객체를 생각해봅시다. 주문은 고객 정보를 가지고 있어야 합니다. 하지만 주문이 고객의 한 종류는 아닙니다. 따라서 상속보다는 포함이 더 자연스럽습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email


class Order:
    def __init__(self, customer):
        self.customer = customer
        self.items = []


customer = Customer("김민수", "minsu@example.com")
order = Order(customer)

print(order.customer.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
\`\`\`

\`Order\` 객체가 \`Customer\` 객체를 포함하고 있습니다.

---

### 7.11.2 주문과 상품 구성하기

주문에는 여러 상품이 들어갈 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price


class Customer:
    def __init__(self, name):
        self.name = name


class Order:
    def __init__(self, customer):
        self.customer = customer
        self.items = []

    def add_product(self, product, quantity):
        self.items.append({
            "product": product,
            "quantity": quantity,
        })

    def calculate_total_price(self):
        total = 0

        for item in self.items:
            product = item["product"]
            quantity = item["quantity"]
            total += product.price * quantity

        return total


customer = Customer("김민수")
keyboard = Product("키보드", 30000)
mouse = Product("마우스", 15000)

order = Order(customer)
order.add_product(keyboard, 1)
order.add_product(mouse, 2)

print(order.calculate_total_price())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
60000
\`\`\`

이 예제에서 \`Order\`는 \`Customer\`와 \`Product\` 객체를 사용합니다. 이런 방식으로 여러 객체가 서로 협력하도록 만들 수 있습니다.

---

### 7.11.3 의존 관계란 무엇인가

의존 관계는 어떤 객체가 작업을 수행하기 위해 다른 객체의 기능을 사용하는 관계입니다.

예를 들어 보고서 생성기는 데이터를 파일로 저장해야 할 수 있습니다. 이때 보고서 생성기가 파일 저장 객체를 사용할 수 있습니다.

\`\`\`python
class FileSaver:
    def save(self, filename, content):
        with open(filename, "w", encoding="utf-8") as file:
            file.write(content)


class ReportGenerator:
    def __init__(self, file_saver):
        self.file_saver = file_saver

    def create_report(self):
        content = "이번 달 매출 보고서"
        self.file_saver.save("report.txt", content)


file_saver = FileSaver()
report_generator = ReportGenerator(file_saver)
report_generator.create_report()
\`\`\`

\`ReportGenerator\`는 파일을 직접 저장하지 않고 \`FileSaver\`에게 저장을 맡깁니다. 이렇게 역할을 나누면 나중에 저장 방식이 바뀌어도 수정 범위를 줄일 수 있습니다.

---

### 7.11.4 상속보다 구성이 나은 경우

초보자는 코드를 재사용하려고 상속을 먼저 떠올릴 수 있습니다. 하지만 실무에서는 상속보다 구성이 더 적합한 경우가 많습니다.

상속은 “A는 B이다”라는 관계일 때 사용합니다.

\`\`\`text
VIP 회원은 회원이다.
엑셀 보고서는 보고서이다.
\`\`\`

구성은 “A는 B를 가진다”라는 관계일 때 사용합니다.

\`\`\`text
주문은 고객을 가진다.
주문은 상품 목록을 가진다.
보고서 생성기는 파일 저장기를 가진다.
\`\`\`

관계가 애매하다면 상속보다 구성을 먼저 고려하는 것이 좋습니다.


---

## 7.12 특수 메서드

### 7.12.1 특수 메서드란 무엇인가

파이썬에는 앞뒤에 밑줄 두 개가 붙은 메서드가 있습니다.

\`\`\`python
__init__
__str__
__repr__
__len__
__eq__
\`\`\`

이런 메서드를 **특수 메서드**라고 부릅니다. 특수 메서드는 파이썬의 특정 문법이나 내장 함수와 연결됩니다.

예를 들어 \`len(obj)\`를 호출했을 때 내부적으로는 \`obj.__len__()\`이 사용될 수 있습니다. \`print(obj)\`를 호출했을 때는 내부적으로 \`obj.__str__()\`이 사용될 수 있습니다.

특수 메서드를 사용하면 직접 만든 객체도 파이썬의 기본 자료형처럼 자연스럽게 사용할 수 있습니다.

---

### 7.12.2 \`__str__\`

\`__str__\`은 객체를 사람이 읽기 좋은 문자열로 표현할 때 사용합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} ({self.price}원)"


product = Product("키보드", 30000)

print(product)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 (30000원)
\`\`\`

\`print(product)\`를 실행하면 내부적으로 \`product.__str__()\`이 호출됩니다.

---

### 7.12.3 \`__repr__\`

\`__repr__\`은 개발자가 객체를 확인할 때 도움이 되는 문자열 표현을 제공합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product(name={self.name!r}, price={self.price!r})"


product = Product("키보드", 30000)

print(repr(product))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Product(name='키보드', price=30000)
\`\`\`

일반적으로 \`__str__\`은 사용자에게 보여주기 좋은 표현, \`__repr__\`은 개발자가 디버깅할 때 보기 좋은 표현이라고 생각하면 됩니다.

---

### 7.12.4 \`__len__\`

\`__len__\`을 정의하면 객체에 \`len()\`을 사용할 수 있습니다.

\`\`\`python
class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def __len__(self):
        return len(self.items)


cart = Cart()
cart.add_item("키보드")
cart.add_item("마우스")

print(len(cart))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2
\`\`\`

장바구니 객체의 길이를 장바구니에 담긴 상품 수로 정의한 것입니다.

---

### 7.12.5 \`__eq__\`

\`__eq__\`는 객체끼리 \`==\`로 비교할 때 사용됩니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __eq__(self, other):
        return self.name == other.name and self.price == other.price


product1 = Product("키보드", 30000)
product2 = Product("키보드", 30000)

print(product1 == product2)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

\`__eq__\`를 정의하지 않으면 두 객체는 값이 같아 보여도 서로 다른 객체로 판단될 수 있습니다. 객체 비교 기준을 직접 정하고 싶을 때 \`__eq__\`를 사용할 수 있습니다.

---

### 7.12.6 \`__lt__\`

\`__lt__\`는 \`<\` 연산과 연결됩니다. 가격 기준으로 상품을 비교하고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __lt__(self, other):
        return self.price < other.price


keyboard = Product("키보드", 30000)
mouse = Product("마우스", 15000)

print(mouse < keyboard)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

\`mouse.price\`가 \`keyboard.price\`보다 작기 때문에 \`True\`가 출력됩니다.

---

### 7.12.7 특수 메서드 사용 시 주의점

특수 메서드는 객체를 자연스럽게 사용할 수 있게 해주지만, 아무렇게나 정의하면 코드를 읽는 사람이 혼란스러울 수 있습니다.

예를 들어 \`len(cart)\`가 장바구니 상품 개수를 의미하는 것은 자연스럽습니다. 하지만 \`len(customer)\`가 고객의 나이를 의미한다면 다소 어색합니다.

특수 메서드는 파이썬 문법이 기대하는 의미와 잘 맞을 때 사용하는 것이 좋습니다.

---

## 7.13 데이터 클래스 \`dataclass\`

### 7.13.1 \`dataclass\`가 필요한 이유

클래스를 만들다 보면 데이터를 담기 위해 반복적으로 작성하는 코드가 많습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email, grade):
        self.name = name
        self.email = email
        self.grade = grade

    def __repr__(self):
        return f"Customer(name={self.name!r}, email={self.email!r}, grade={self.grade!r})"
\`\`\`

이런 클래스는 데이터 저장이 주 목적입니다. 파이썬에서는 \`dataclass\`를 사용해 이런 코드를 간단하게 만들 수 있습니다.

---

### 7.13.2 \`@dataclass\` 기본 문법

\`dataclass\`는 \`dataclasses\` 모듈에서 가져옵니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Customer:
    name: str
    email: str
    grade: str


customer = Customer("김민수", "minsu@example.com", "VIP")

print(customer)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Customer(name='김민수', email='minsu@example.com', grade='VIP')
\`\`\`

\`@dataclass\`를 사용하면 \`__init__\`, \`__repr__\` 같은 기본 메서드가 자동으로 만들어집니다.

아직 타입 힌트를 자세히 배우지 않았더라도, 여기서는 \`name: str\`이 “name은 문자열로 사용할 예정”이라는 표시라고 이해하면 됩니다. 타입 힌트는 뒤의 장에서 더 자세히 다룹니다.

---

### 7.13.3 기본값 설정

데이터 클래스에서도 기본값을 설정할 수 있습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Customer:
    name: str
    email: str
    grade: str = "일반"


customer = Customer("김민수", "minsu@example.com")

print(customer.grade)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
일반
\`\`\`

객체를 만들 때 \`grade\`를 전달하지 않았기 때문에 기본값 \`"일반"\`이 사용되었습니다.

---

### 7.13.4 데이터 클래스에 메서드 넣기

데이터 클래스에도 일반 클래스처럼 메서드를 넣을 수 있습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: int
    stock: int

    def is_available(self):
        return self.stock > 0


product = Product("키보드", 30000, 10)

print(product.is_available())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

데이터 클래스라고 해서 데이터만 저장해야 하는 것은 아닙니다. 다만 복잡한 상태 변경과 검증이 많아지면 일반 클래스로 작성하는 편이 더 명확할 수 있습니다.

---

### 7.13.5 데이터 클래스와 일반 클래스의 구분

\`dataclass\`는 데이터를 담는 목적의 클래스에 잘 어울립니다.

예를 들어 다음과 같은 클래스는 데이터 클래스에 적합합니다.

\`\`\`text
고객 정보
상품 정보
API 응답 데이터
좌표 데이터
설정 데이터
\`\`\`

반면 복잡한 검증, 상태 변경, 외부 파일 처리, API 요청처럼 기능이 많은 클래스는 일반 클래스로 작성하는 것이 더 나을 수 있습니다.

---

## 7.14 객체지향 설계 기초

### 7.14.1 좋은 클래스란 무엇인가

좋은 클래스는 역할이 분명합니다.

예를 들어 \`Customer\` 클래스는 고객 정보를 관리해야 합니다. 그런데 고객 클래스가 파일을 저장하고, API 요청을 보내고, 엑셀 보고서까지 만든다면 역할이 너무 많습니다.

좋은 클래스는 다음 기준을 만족하는 것이 좋습니다.

- 하나의 클래스는 하나의 주요 책임을 가진다.
- 클래스 이름만 봐도 역할을 어느 정도 알 수 있다.
- 메서드 이름이 동작을 분명히 설명한다.
- 내부 데이터가 함부로 망가지지 않도록 관리한다.
- 다른 클래스와 지나치게 강하게 얽히지 않는다.

---

### 7.14.2 너무 많은 일을 하는 클래스 피하기

다음과 같은 클래스는 좋지 않은 구조일 수 있습니다.

\`\`\`python
class OrderManager:
    def read_excel(self):
        pass

    def clean_data(self):
        pass

    def calculate_total_price(self):
        pass

    def send_email(self):
        pass

    def save_log(self):
        pass
\`\`\`

\`OrderManager\`가 주문 계산, 엑셀 읽기, 이메일 발송, 로그 저장까지 모두 담당하고 있습니다. 이런 클래스는 나중에 수정하기 어려워질 수 있습니다.

역할별로 나누면 구조가 더 명확해집니다.

\`\`\`text
OrderReader      -> 주문 데이터 읽기
OrderCalculator  -> 주문 금액 계산
EmailSender      -> 이메일 발송
LogWriter        -> 로그 기록
\`\`\`

처음부터 완벽하게 나눌 필요는 없습니다. 하지만 클래스가 너무 많은 일을 하고 있다면 분리할 수 있는지 생각해보는 것이 좋습니다.

---

### 7.14.3 데이터 클래스와 기능 클래스 구분하기

객체지향 설계를 할 때는 데이터를 담는 클래스와 기능을 수행하는 클래스를 구분하면 좋습니다.

데이터 클래스는 주로 값을 담습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class ProductData:
    name: str
    price: int
    stock: int
\`\`\`

기능 클래스는 어떤 작업을 수행합니다.

\`\`\`python
class ProductService:
    def calculate_total_stock_value(self, products):
        total = 0

        for product in products:
            total += product.price * product.stock

        return total
\`\`\`

이렇게 나누면 데이터 구조와 처리 로직을 따로 관리할 수 있습니다.

---

### 7.14.4 실무 예제: 보고서 생성 구조

보고서 생성 프로그램을 만든다고 가정해봅시다. 한 클래스가 모든 일을 담당하는 대신 역할을 나눌 수 있습니다.

\`\`\`text
SalesDataReader
- 매출 데이터를 읽는다.

SalesAnalyzer
- 매출 합계, 평균, 상품별 매출을 계산한다.

ReportGenerator
- 분석 결과를 보고서 내용으로 만든다.

ReportSaver
- 보고서를 파일로 저장한다.
\`\`\`

코드로 단순화하면 다음과 같습니다.

\`\`\`python
class SalesAnalyzer:
    def calculate_total_sales(self, sales):
        return sum(sales)


class ReportGenerator:
    def create_summary(self, total_sales):
        return f"총 매출은 {total_sales}원입니다."


class ReportSaver:
    def save(self, filename, content):
        with open(filename, "w", encoding="utf-8") as file:
            file.write(content)


sales = [10000, 20000, 30000]

analyzer = SalesAnalyzer()
generator = ReportGenerator()
saver = ReportSaver()

total_sales = analyzer.calculate_total_sales(sales)
summary = generator.create_summary(total_sales)
saver.save("sales_report.txt", summary)
\`\`\`

이 구조는 처음에는 코드가 길어 보일 수 있습니다. 하지만 기능이 많아질수록 역할이 분명한 구조가 유지보수에 유리합니다.

---

### 7.14.5 객체지향 설계에서 자주 하는 실수

초보자가 객체지향을 배울 때 자주 하는 실수는 다음과 같습니다.

첫째, 모든 것을 클래스로 만들려고 합니다. 간단한 계산이나 짧은 변환 로직은 함수로 충분할 수 있습니다.

둘째, 하나의 클래스에 너무 많은 기능을 넣습니다. 이름은 하나인데 역할이 여러 개라면 나누는 것이 좋습니다.

셋째, 상속을 너무 많이 사용합니다. 관계가 명확한 “is-a”가 아니라면 구성 관계를 먼저 고려하는 편이 안전합니다.

넷째, 객체의 내부 값을 외부에서 직접 바꾸도록 둡니다. 값 검증이 필요한 데이터는 메서드나 프로퍼티를 통해 관리하는 것이 좋습니다.

---

## 7.15 데코레이터 문법 맛보기

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