var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-5 -->

# 7.5 인스턴스 메서드

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
`;export{e as default};