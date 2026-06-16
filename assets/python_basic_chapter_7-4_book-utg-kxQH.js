var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-4 -->

# 7.4 인스턴스 변수와 클래스 변수

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
`;export{e as default};