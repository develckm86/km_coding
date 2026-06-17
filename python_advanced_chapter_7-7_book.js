var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-7 -->

# 7.7 조합

조합은 객체가 다른 객체를 내부에 가지고 사용하는 구조입니다.

상속이 “A는 B의 한 종류다”를 표현한다면, 조합은 “A는 B를 가지고 있다” 또는 “A는 B를 사용한다”를 표현합니다.

\`\`\`text
Order는 Customer를 가지고 있다.
Order는 Product 목록을 가지고 있다.
ReportGenerator는 FileWriter를 사용한다.
DataPipeline은 Reader, Validator, Saver를 사용한다.
\`\`\`

실무에서는 상속보다 조합이 더 자주 적합한 경우가 많습니다.

---

## 7.7.1 조합의 기본 예제

주문 객체를 생각해보겠습니다.

\`\`\`python
class Customer:
    def __init__(self, name: str, email: str) -> None:
        self.name = name
        self.email = email


class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price


class Order:
    def __init__(self, customer: Customer, products: list[Product]) -> None:
        self.customer = customer
        self.products = products

    def total_price(self) -> int:
        return sum(product.price for product in self.products)
\`\`\`

\`Order\`는 \`Customer\`를 상속하지 않습니다. \`Product\`도 상속하지 않습니다. 대신 고객 객체와 상품 객체를 가지고 있습니다.

\`\`\`python
customer = Customer("홍길동", "hong@example.com")
products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
]

order = Order(customer, products)
print(order.total_price())
\`\`\`

이 구조가 자연스러운 이유는 주문이 고객의 한 종류가 아니고, 상품의 한 종류도 아니기 때문입니다. 주문은 고객과 상품을 포함하는 객체입니다.

---

## 7.7.2 상속을 조합으로 바꾸기

상속을 잘못 사용한 예를 다시 보겠습니다.

\`\`\`python
class CsvReader:
    def read_csv(self, path: str) -> list[dict]:
        print(f"{path}에서 CSV를 읽습니다.")
        return []


class SalesReport(CsvReader):
    def create(self, path: str) -> None:
        data = self.read_csv(path)
        print("매출 보고서를 생성합니다.")
\`\`\`

\`SalesReport\`는 \`CsvReader\`의 한 종류가 아닙니다. CSV 읽기 기능을 사용할 뿐입니다. 조합으로 바꿔보겠습니다.

\`\`\`python
class CsvReader:
    def read(self, path: str) -> list[dict]:
        print(f"{path}에서 CSV를 읽습니다.")
        return []


class SalesReport:
    def __init__(self, reader: CsvReader) -> None:
        self.reader = reader

    def create(self, path: str) -> None:
        data = self.reader.read(path)
        print("매출 보고서를 생성합니다.")
\`\`\`

사용할 때는 의존 객체를 전달합니다.

\`\`\`python
reader = CsvReader()
report = SalesReport(reader)
report.create("sales.csv")
\`\`\`

이제 나중에 엑셀 리더가 필요해지면 \`SalesReport\` 전체를 바꾸지 않고 리더만 교체할 수 있습니다.

\`\`\`python
class ExcelReader:
    def read(self, path: str) -> list[dict]:
        print(f"{path}에서 엑셀을 읽습니다.")
        return []
\`\`\`

다만 현재 \`SalesReport\`는 \`CsvReader\` 타입에 직접 의존하고 있습니다. 더 유연하게 만들려면 \`Protocol\`을 사용할 수 있습니다.

\`\`\`python
from typing import Protocol


class DataReader(Protocol):
    def read(self, path: str) -> list[dict]:
        ...


class SalesReport:
    def __init__(self, reader: DataReader) -> None:
        self.reader = reader

    def create(self, path: str) -> None:
        data = self.reader.read(path)
        print(f"{len(data)}개의 데이터로 매출 보고서를 생성합니다.")
\`\`\`

이제 \`CsvReader\`, \`ExcelReader\`, \`ApiReader\`처럼 \`read()\` 메서드를 가진 객체라면 모두 사용할 수 있습니다.

---

## 7.7.3 느슨한 결합

조합을 잘 사용하면 객체 간 결합을 낮출 수 있습니다.

결합이 높다는 것은 한 클래스가 다른 클래스의 구체적인 구현에 강하게 의존한다는 뜻입니다.

\`\`\`python
class OrderService:
    def complete_order(self, order_id: str) -> None:
        print(f"주문 {order_id} 완료")

        sender = EmailSender("admin@example.com")
        sender.send("주문이 완료되었습니다.")
\`\`\`

이 코드는 \`OrderService\` 안에서 직접 \`EmailSender\`를 만들고 있습니다. 그러면 다음 문제가 생깁니다.

- 이메일 외의 알림 방식으로 바꾸기 어렵다.
- 테스트할 때 실제 이메일 전송을 막기 어렵다.
- \`OrderService\`가 주문 처리뿐 아니라 알림 객체 생성까지 알아야 한다.

조합과 의존성 주입을 사용해 바꿔보겠습니다.

\`\`\`python
class OrderService:
    def __init__(self, notifier: Notifier) -> None:
        self.notifier = notifier

    def complete_order(self, order_id: str) -> None:
        print(f"주문 {order_id} 완료")
        self.notifier.send("주문이 완료되었습니다.")
\`\`\`

이제 \`OrderService\`는 알림 방식에 관심이 없습니다. 알림 객체는 외부에서 전달받습니다.

\`\`\`python
service = OrderService(ConsoleNotifier())
service.complete_order("A001")
\`\`\`

이런 구조를 의존성 주입이라고도 합니다. 어려운 용어처럼 보이지만 핵심은 간단합니다.

\`\`\`text
필요한 객체를 클래스 내부에서 직접 만들지 말고, 외부에서 전달받는다.
\`\`\`

---

## 7.7.4 조합의 장점

조합의 장점은 다음과 같습니다.

- 실행 시점에 사용할 객체를 바꿀 수 있다.
- 테스트용 가짜 객체를 쉽게 넣을 수 있다.
- 상속 구조가 깊어지는 것을 막을 수 있다.
- 클래스의 책임을 더 명확히 나눌 수 있다.
- 구체적인 구현보다 인터페이스에 의존하도록 만들 수 있다.

특히 데이터 처리 코드에서는 조합이 매우 유용합니다. 다음과 같이 역할을 나눌 수 있습니다.

\`\`\`text
Reader    → 데이터를 읽는다.
Validator → 데이터를 검증한다.
Cleaner   → 데이터를 정리한다.
Saver     → 결과를 저장한다.
Pipeline  → 전체 흐름을 조합한다.
\`\`\`

코드로 간단히 표현하면 다음과 같습니다.

\`\`\`python
class DataPipeline:
    def __init__(self, reader, validator, cleaner, saver) -> None:
        self.reader = reader
        self.validator = validator
        self.cleaner = cleaner
        self.saver = saver

    def run(self, source: str, output: str) -> None:
        data = self.reader.read(source)
        self.validator.validate(data)
        cleaned_data = self.cleaner.clean(data)
        self.saver.save(cleaned_data, output)
\`\`\`

\`DataPipeline\`은 구체적인 파일 형식이나 저장 방식에 관심이 없습니다. 필요한 객체들을 조합해서 전체 흐름만 실행합니다.

---
`;export{e as default};