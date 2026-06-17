var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-3 -->

# 7.3 생성자 \`__init__\`

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
`;export{e as default};