var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-11 -->

# 7.11 구성 관계와 의존 관계

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
`;export{e as default};