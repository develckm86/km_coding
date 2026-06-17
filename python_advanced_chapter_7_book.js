var e=`# 7장. 객체지향 프로그래밍 심화

기초 과정에서 우리는 클래스, 객체, 생성자, 인스턴스 변수, 메서드, 상속, 오버라이딩, \`@property\`, \`dataclass\` 같은 객체지향 문법을 배웠습니다. 그때의 목표는 “클래스를 만들고 사용할 수 있는가”였습니다.

고급 과정에서의 목표는 조금 다릅니다. 이제는 단순히 클래스를 만드는 수준을 넘어서, **어떤 상황에서 클래스를 써야 하는지, 상속과 조합 중 무엇을 선택해야 하는지, 객체 간 관계를 어떻게 설계해야 하는지**를 이해해야 합니다.

객체지향 프로그래밍은 문법이 아니라 설계 방식입니다. 클래스 문법을 많이 안다고 해서 객체지향 코드를 잘 작성하는 것은 아닙니다. 반대로 클래스 문법을 적게 사용하더라도 책임이 잘 나뉘고, 수정하기 쉽고, 테스트하기 쉬운 구조라면 좋은 객체지향 코드라고 할 수 있습니다.

이번 장에서는 객체지향 문법을 실무적인 관점에서 다시 살펴봅니다. 상속, 다중 상속, MRO, 믹스인, 추상 클래스, 프로토콜, 조합, 설계 원칙을 차례대로 다루면서 데이터 처리 도구나 자동화 프로그램을 만들 때 어떤 구조가 좋은지 생각해보겠습니다.

이번 장의 목표는 다음과 같습니다.

- 상속을 사용해야 하는 경우와 피해야 하는 경우를 구분할 수 있다.
- \`super()\`가 단순히 부모 클래스를 부르는 문법이 아니라 MRO를 따라 동작한다는 점을 이해한다.
- 다중 상속과 MRO의 기본 원리를 설명할 수 있다.
- 믹스인 클래스를 이용해 기능을 조합하는 방식을 이해한다.
- 추상 클래스로 공통 인터페이스를 강제할 수 있다.
- 덕 타이핑과 \`Protocol\`의 관계를 이해한다.
- 상속보다 조합이 적절한 상황을 판단할 수 있다.
- 단일 책임 원칙과 의존성 줄이기의 기초를 이해한다.
- 실무형 클래스 구조를 설계할 수 있다.

---

## 7.1 객체지향 복습과 심화 방향

객체지향 프로그래밍을 공부할 때 가장 먼저 기억해야 할 것은 **객체는 데이터와 동작을 함께 가지는 단위**라는 점입니다.

예를 들어 상품을 표현한다고 해보겠습니다.

\`\`\`python
product_name = "키보드"
product_price = 30000
product_stock = 10
\`\`\`

이 방식은 간단한 데이터에는 충분합니다. 하지만 상품이 많아지고, 상품마다 가격 변경, 재고 차감, 판매 가능 여부 확인 같은 기능이 필요해지면 데이터와 기능이 흩어지기 쉽습니다.

이럴 때 클래스를 사용할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int, stock: int) -> None:
        self.name = name
        self.price = price
        self.stock = stock

    def is_available(self) -> bool:
        return self.stock > 0

    def decrease_stock(self, quantity: int) -> None:
        if quantity <= 0:
            raise ValueError("수량은 1 이상이어야 합니다.")
        if quantity > self.stock:
            raise ValueError("재고가 부족합니다.")

        self.stock -= quantity
\`\`\`

이제 상품이라는 데이터와 상품이 할 수 있는 동작이 하나의 클래스 안에 묶였습니다.

\`\`\`python
keyboard = Product("키보드", 30000, 10)

print(keyboard.is_available())
keyboard.decrease_stock(2)
print(keyboard.stock)
\`\`\`

객체지향은 이렇게 관련 있는 데이터와 동작을 함께 관리하는 방식입니다.

---

## 7.1.1 기초 객체지향과 고급 객체지향의 차이

기초 객체지향에서는 다음과 같은 질문을 주로 다룹니다.

\`\`\`text
클래스는 어떻게 만드는가?
객체는 어떻게 생성하는가?
메서드는 어떻게 정의하는가?
상속은 어떻게 사용하는가?
\`\`\`

고급 객체지향에서는 질문이 달라집니다.

\`\`\`text
이 기능을 클래스로 만들 필요가 있는가?
이 클래스는 너무 많은 일을 하고 있지 않은가?
상속을 사용하는 것이 맞는가, 조합을 사용하는 것이 맞는가?
변경이 생겼을 때 어떤 코드가 영향을 받는가?
테스트하기 쉬운 구조인가?
다른 데이터 소스가 추가되어도 코드를 크게 바꾸지 않을 수 있는가?
\`\`\`

문법 중심에서 설계 중심으로 이동하는 것이 고급 객체지향의 핵심입니다.

---

## 7.1.2 객체지향을 사용하는 이유

객체지향을 사용하는 이유는 단순히 코드를 멋있게 보이게 하기 위해서가 아닙니다. 실무에서는 코드가 계속 바뀝니다. 새로운 요구사항이 추가되고, 데이터 형식이 바뀌고, 처리 방식이 바뀌고, 예외 상황이 늘어납니다.

객체지향은 이런 변화에 대응하기 위한 구조를 만드는 데 도움이 됩니다.

대표적인 장점은 다음과 같습니다.

- 관련 데이터와 기능을 한곳에 모을 수 있다.
- 역할별로 코드를 분리할 수 있다.
- 중복 코드를 줄일 수 있다.
- 새로운 기능을 추가하기 쉬운 구조를 만들 수 있다.
- 테스트하기 쉬운 단위로 코드를 나눌 수 있다.
- 프로그램의 전체 구조를 이해하기 쉬워진다.

하지만 객체지향이 항상 정답은 아닙니다. 간단한 계산 하나를 위해 클래스를 만드는 것은 오히려 코드를 복잡하게 만들 수 있습니다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

이 정도 기능은 함수 하나로 충분합니다.

객체지향은 데이터와 동작이 함께 관리되어야 하거나, 상태를 가진 객체가 여러 기능을 수행해야 하거나, 여러 구현을 같은 방식으로 다루어야 할 때 특히 유용합니다.

---

## 7.1.3 좋은 객체지향 코드의 기준

좋은 객체지향 코드는 다음과 같은 특징을 가집니다.

첫째, 클래스의 책임이 명확합니다.

\`\`\`text
Customer는 고객 정보를 책임진다.
Product는 상품 정보를 책임진다.
Order는 주문 정보를 책임진다.
ReportWriter는 보고서 저장을 책임진다.
\`\`\`

둘째, 클래스가 너무 많은 일을 하지 않습니다.

나쁜 예를 보겠습니다.

\`\`\`python
class OrderManager:
    def read_excel(self):
        pass

    def validate_order(self):
        pass

    def calculate_total(self):
        pass

    def save_database(self):
        pass

    def send_email(self):
        pass
\`\`\`

\`OrderManager\`라는 이름은 주문을 관리하는 클래스처럼 보이지만, 실제로는 엑셀 읽기, 주문 검증, 금액 계산, DB 저장, 이메일 전송까지 모두 하고 있습니다. 이런 클래스는 시간이 지날수록 수정하기 어려워집니다.

더 나은 구조는 역할을 나누는 것입니다.

\`\`\`python
class ExcelOrderReader:
    pass

class OrderValidator:
    pass

class OrderCalculator:
    pass

class OrderRepository:
    pass

class EmailSender:
    pass
\`\`\`

이렇게 나누면 각 클래스가 담당하는 일이 분명해집니다.

셋째, 변경에 강합니다. 엑셀 대신 CSV에서 주문을 읽게 되어도 주문 계산 클래스는 바뀌지 않아야 합니다. 이메일 대신 슬랙으로 알림을 보내도 주문 검증 클래스는 바뀌지 않아야 합니다.

객체지향 설계는 결국 **변경의 영향을 줄이는 구조를 만드는 일**입니다.

---

## 7.2 상속 심화

상속은 객체지향에서 가장 유명한 개념 중 하나입니다. 하지만 실무에서는 상속을 조심해서 사용해야 합니다.

상속은 부모 클래스의 속성과 메서드를 자식 클래스가 물려받는 구조입니다.

\`\`\`python
class User:
    def __init__(self, name: str, email: str) -> None:
        self.name = name
        self.email = email

    def get_profile(self) -> str:
        return f"{self.name} <{self.email}>"


class AdminUser(User):
    def __init__(self, name: str, email: str, level: int) -> None:
        super().__init__(name, email)
        self.level = level

    def can_manage_users(self) -> bool:
        return self.level >= 5
\`\`\`

\`AdminUser\`는 \`User\`의 기능을 물려받습니다.

\`\`\`python
admin = AdminUser("관리자", "admin@example.com", 5)

print(admin.get_profile())
print(admin.can_manage_users())
\`\`\`

이 구조는 자연스럽습니다. 관리자는 사용자이기 때문입니다. 즉, \`AdminUser is a User\` 관계가 성립합니다.

---

## 7.2.1 상속을 사용하기 좋은 경우

상속은 다음과 같은 경우에 적합합니다.

\`\`\`text
자식 클래스가 부모 클래스의 한 종류라고 말할 수 있을 때
공통 속성과 공통 동작이 분명할 때
자식 클래스가 부모 클래스의 기능을 확장하거나 일부 변경할 때
같은 방식으로 다룰 수 있는 여러 클래스가 있을 때
\`\`\`

예를 들어 결제 수단을 생각해보겠습니다.

\`\`\`python
class Payment:
    def pay(self, amount: int) -> None:
        raise NotImplementedError


class CardPayment(Payment):
    def pay(self, amount: int) -> None:
        print(f"카드로 {amount}원을 결제합니다.")


class BankTransferPayment(Payment):
    def pay(self, amount: int) -> None:
        print(f"계좌이체로 {amount}원을 결제합니다.")
\`\`\`

\`CardPayment\`와 \`BankTransferPayment\`는 모두 \`Payment\`의 한 종류입니다.

\`\`\`python
def process_payment(payment: Payment, amount: int) -> None:
    payment.pay(amount)


process_payment(CardPayment(), 30000)
process_payment(BankTransferPayment(), 30000)
\`\`\`

이 함수는 구체적인 결제 수단을 몰라도 됩니다. \`pay()\` 메서드만 있으면 됩니다. 이것이 다형성의 기본입니다.

---

## 7.2.2 상속을 피해야 하는 경우

상속은 강한 관계를 만듭니다. 자식 클래스는 부모 클래스의 구조에 의존합니다. 부모 클래스가 바뀌면 자식 클래스도 영향을 받을 수 있습니다.

다음 예를 보겠습니다.

\`\`\`python
class FileManager:
    def open_file(self, path: str) -> str:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()


class ReportGenerator(FileManager):
    def generate(self, path: str) -> str:
        content = self.open_file(path)
        return content.upper()
\`\`\`

겉으로 보기에는 괜찮아 보일 수 있습니다. 하지만 \`ReportGenerator\`가 정말 \`FileManager\`의 한 종류일까요?

아닙니다. 보고서 생성기는 파일 관리자라기보다 파일 관리 기능을 **사용하는 객체**입니다. 이 경우 상속보다 조합이 더 적합합니다.

\`\`\`python
class FileReader:
    def read(self, path: str) -> str:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()


class ReportGenerator:
    def __init__(self, reader: FileReader) -> None:
        self.reader = reader

    def generate(self, path: str) -> str:
        content = self.reader.read(path)
        return content.upper()
\`\`\`

\`ReportGenerator\`는 \`FileReader\`를 상속하지 않습니다. 대신 내부에 가지고 사용합니다. 이것을 조합이라고 합니다.

상속을 사용할지 고민될 때는 다음 질문을 해보면 좋습니다.

\`\`\`text
A는 B의 한 종류인가?
아니면 A가 B를 사용하는 것인가?
\`\`\`

“A는 B의 한 종류”라면 상속이 어울릴 수 있습니다. “A가 B를 사용한다”라면 조합이 더 어울릴 가능성이 높습니다.

---

## 7.2.3 부모 클래스와 자식 클래스의 책임

상속 구조에서는 부모 클래스와 자식 클래스의 책임이 분명해야 합니다.

부모 클래스는 공통 구조를 제공합니다.

\`\`\`python
class DataExporter:
    def export(self, data: list[dict]) -> None:
        raise NotImplementedError
\`\`\`

자식 클래스는 구체적인 방식을 구현합니다.

\`\`\`python
class CsvExporter(DataExporter):
    def export(self, data: list[dict]) -> None:
        print("CSV 형식으로 저장합니다.")


class JsonExporter(DataExporter):
    def export(self, data: list[dict]) -> None:
        print("JSON 형식으로 저장합니다.")
\`\`\`

이 구조에서 부모 클래스는 “데이터를 내보낸다”는 공통 인터페이스를 정의하고, 자식 클래스는 “어떤 형식으로 내보낼지”를 구현합니다.

이처럼 부모와 자식의 역할이 분명하면 상속은 유용합니다.

하지만 부모 클래스가 너무 많은 기능을 가지면 자식 클래스는 필요하지 않은 기능까지 억지로 물려받게 됩니다. 이런 구조는 유지보수하기 어렵습니다.

---

## 7.2.4 \`super()\` 심화

기초 과정에서는 \`super()\`를 “부모 클래스의 메서드를 호출하는 문법”으로 배웠습니다.

\`\`\`python
class User:
    def __init__(self, name: str) -> None:
        self.name = name


class AdminUser(User):
    def __init__(self, name: str, level: int) -> None:
        super().__init__(name)
        self.level = level
\`\`\`

단일 상속에서는 이렇게 이해해도 큰 문제가 없습니다. 하지만 고급 과정에서는 조금 더 정확히 이해해야 합니다.

\`super()\`는 단순히 “부모 클래스”를 직접 가리키는 것이 아니라, **현재 클래스 다음에 메서드를 찾을 클래스를 MRO에 따라 결정하는 프록시 객체**를 반환합니다.

다음 예를 보겠습니다.

\`\`\`python
class A:
    def hello(self) -> None:
        print("A")


class B(A):
    def hello(self) -> None:
        print("B")
        super().hello()


b = B()
b.hello()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
B
A
\`\`\`

여기까지는 단순합니다. 하지만 다중 상속에서는 \`super()\`가 더 중요해집니다.

\`\`\`python
class A:
    def process(self) -> None:
        print("A.process")


class B(A):
    def process(self) -> None:
        print("B.process")
        super().process()


class C(A):
    def process(self) -> None:
        print("C.process")
        super().process()


class D(B, C):
    def process(self) -> None:
        print("D.process")
        super().process()


d = D()
d.process()
print(D.__mro__)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
D.process
B.process
C.process
A.process
(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)
\`\`\`

여기서 \`B\`의 \`super()\`는 단순히 \`A\`를 호출하지 않습니다. \`D\`의 MRO에서 \`B\` 다음에 오는 \`C\`를 호출합니다. 이 점이 중요합니다.

즉, 다중 상속에서 \`super()\`는 상속 관계 전체를 고려해 다음 호출 대상을 찾습니다.

---

## 7.2.5 협력적 상속

다중 상속에서 \`super()\`를 제대로 사용하려면 각 클래스가 같은 호출 규칙을 따라야 합니다. 이를 협력적 상속이라고 부를 수 있습니다.

다음 예를 보겠습니다.

\`\`\`python
class Base:
    def save(self) -> None:
        print("Base.save")


class ValidateMixin(Base):
    def save(self) -> None:
        print("검증합니다.")
        super().save()


class LogMixin(Base):
    def save(self) -> None:
        print("로그를 남깁니다.")
        super().save()


class UserRepository(ValidateMixin, LogMixin):
    def save(self) -> None:
        print("사용자 저장을 시작합니다.")
        super().save()
\`\`\`

사용해보겠습니다.

\`\`\`python
repo = UserRepository()
repo.save()
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
사용자 저장을 시작합니다.
검증합니다.
로그를 남깁니다.
Base.save
\`\`\`

각 클래스가 \`super().save()\`를 호출했기 때문에 MRO 순서대로 모든 기능이 실행됩니다. 만약 중간 클래스가 \`super()\`를 호출하지 않으면 그 뒤의 클래스는 실행되지 않습니다.

\`\`\`python
class BadLogMixin(Base):
    def save(self) -> None:
        print("로그를 남깁니다.")
        # super().save()를 호출하지 않음
\`\`\`

다중 상속에서 \`super()\`를 빠뜨리면 전체 호출 체인이 끊어질 수 있습니다.

---

## 7.3 다중 상속과 MRO

파이썬은 다중 상속을 지원합니다. 즉, 하나의 클래스가 여러 부모 클래스를 가질 수 있습니다.

\`\`\`python
class A:
    pass


class B:
    pass


class C(A, B):
    pass
\`\`\`

\`C\`는 \`A\`와 \`B\`를 모두 상속합니다.

다중 상속은 강력하지만, 잘못 사용하면 코드 흐름이 복잡해집니다. 특히 같은 이름의 메서드가 여러 부모 클래스에 있을 때 어떤 메서드가 호출되는지 이해해야 합니다. 이때 필요한 개념이 MRO입니다.

---

## 7.3.1 MRO란 무엇인가

MRO는 Method Resolution Order의 약자입니다. 한국어로는 메서드 탐색 순서라고 할 수 있습니다.

어떤 객체에서 메서드를 호출하면 파이썬은 다음 순서로 메서드를 찾습니다.

\`\`\`text
1. 객체의 클래스에서 찾는다.
2. 없으면 부모 클래스에서 찾는다.
3. 부모가 여러 개라면 정해진 순서대로 찾는다.
4. 최종적으로 object까지 올라간다.
\`\`\`

MRO는 이 탐색 순서를 나타냅니다.

\`\`\`python
class A:
    def hello(self) -> None:
        print("A")


class B(A):
    def hello(self) -> None:
        print("B")


class C(A):
    def hello(self) -> None:
        print("C")


class D(B, C):
    pass


print(D.__mro__)
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)
\`\`\`

따라서 \`D\` 객체에서 \`hello()\`를 호출하면 \`B\`의 메서드가 먼저 발견됩니다.

\`\`\`python
d = D()
d.hello()
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
B
\`\`\`

---

## 7.3.2 다이아몬드 상속 문제

다중 상속에서 자주 언급되는 구조가 다이아몬드 상속입니다.

\`\`\`text
    A
   / \\
  B   C
   \\ /
    D
\`\`\`

코드로 표현하면 다음과 같습니다.

\`\`\`python
class A:
    def process(self) -> None:
        print("A")


class B(A):
    def process(self) -> None:
        print("B")
        super().process()


class C(A):
    def process(self) -> None:
        print("C")
        super().process()


class D(B, C):
    def process(self) -> None:
        print("D")
        super().process()
\`\`\`

사용해보겠습니다.

\`\`\`python
d = D()
d.process()
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
D
B
C
A
\`\`\`

\`A\`가 \`B\`와 \`C\`의 부모이지만 두 번 호출되지 않습니다. 파이썬의 MRO는 이런 다이아몬드 구조에서도 같은 클래스를 중복해서 탐색하지 않도록 순서를 계산합니다.

이것이 다중 상속에서 MRO가 중요한 이유입니다.

---

## 7.3.3 다중 상속을 사용할 때 주의할 점

다중 상속은 편리하지만 다음 문제를 만들 수 있습니다.

- 메서드 호출 순서를 이해하기 어려워진다.
- 같은 이름의 메서드가 여러 부모 클래스에 있을 수 있다.
- \`super()\` 호출 체인이 끊어지기 쉽다.
- 부모 클래스 간 책임이 섞일 수 있다.
- 디버깅이 어려워질 수 있다.

따라서 다중 상속은 다음처럼 제한적으로 사용하는 것이 좋습니다.

\`\`\`text
하나의 주요 부모 클래스 + 여러 개의 작은 기능 믹스인
\`\`\`

예를 들어 다음 구조는 비교적 이해하기 쉽습니다.

\`\`\`python
class BaseRepository:
    pass


class LoggingMixin:
    pass


class ValidationMixin:
    pass


class UserRepository(LoggingMixin, ValidationMixin, BaseRepository):
    pass
\`\`\`

\`BaseRepository\`는 핵심 부모 클래스이고, \`LoggingMixin\`과 \`ValidationMixin\`은 작은 기능을 추가하는 보조 클래스입니다.

반대로 여러 부모 클래스가 모두 큰 책임을 가지고 있다면 다중 상속은 피하는 것이 좋습니다.

---

## 7.3.4 MRO 확인하기

MRO는 직접 확인할 수 있습니다.

\`\`\`python
print(UserRepository.__mro__)
\`\`\`

또는 \`mro()\` 메서드를 사용할 수도 있습니다.

\`\`\`python
print(UserRepository.mro())
\`\`\`

고급 객체지향 코드를 읽을 때 다중 상속이 보이면 먼저 MRO를 확인하는 습관을 들이면 좋습니다.

---

## 7.4 믹스인

믹스인은 특정 기능을 여러 클래스에 섞어 넣기 위한 작은 클래스입니다.

믹스인은 보통 단독으로 객체를 만들기보다, 다른 클래스와 함께 상속되어 기능을 추가하는 용도로 사용합니다.

예를 들어 여러 클래스에 “딕셔너리로 변환하는 기능”을 추가하고 싶다고 해보겠습니다.

\`\`\`python
class ToDictMixin:
    def to_dict(self) -> dict:
        return self.__dict__.copy()
\`\`\`

이 믹스인을 다른 클래스에 섞어 넣을 수 있습니다.

\`\`\`python
class Customer(ToDictMixin):
    def __init__(self, name: str, email: str) -> None:
        self.name = name
        self.email = email


customer = Customer("홍길동", "hong@example.com")
print(customer.to_dict())
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
{'name': '홍길동', 'email': 'hong@example.com'}
\`\`\`

---

## 7.4.1 믹스인의 특징

믹스인은 일반적인 부모 클래스와 목적이 조금 다릅니다.

일반적인 상속은 “A는 B의 한 종류다”라는 관계를 표현합니다.

\`\`\`text
AdminUser는 User의 한 종류다.
CsvExporter는 Exporter의 한 종류다.
\`\`\`

믹스인은 “이 기능을 추가한다”에 가깝습니다.

\`\`\`text
ToDictMixin은 딕셔너리 변환 기능을 추가한다.
LoggingMixin은 로그 기록 기능을 추가한다.
ValidationMixin은 검증 기능을 추가한다.
\`\`\`

그래서 믹스인 이름에는 보통 \`Mixin\`을 붙입니다.

\`\`\`python
class JsonSerializableMixin:
    pass

class LoggingMixin:
    pass

class ValidationMixin:
    pass
\`\`\`

이름만 보고도 “이 클래스는 단독 부모라기보다 기능 조합용이구나”라고 알 수 있습니다.

---

## 7.4.2 로깅 믹스인 만들기

간단한 로깅 믹스인을 만들어보겠습니다.

\`\`\`python
class LoggingMixin:
    def log(self, message: str) -> None:
        class_name = self.__class__.__name__
        print(f"[{class_name}] {message}")
\`\`\`

이제 여러 클래스에서 사용할 수 있습니다.

\`\`\`python
class FileImporter(LoggingMixin):
    def import_file(self, path: str) -> None:
        self.log(f"파일을 가져옵니다: {path}")
        print("파일 처리 중...")


class ApiClient(LoggingMixin):
    def request(self, url: str) -> None:
        self.log(f"API 요청을 보냅니다: {url}")
        print("요청 처리 중...")
\`\`\`

사용해보겠습니다.

\`\`\`python
importer = FileImporter()
importer.import_file("orders.csv")

client = ApiClient()
client.request("https://example.com/api")
\`\`\`

믹스인을 사용하면 여러 클래스에 공통 기능을 반복해서 작성하지 않아도 됩니다.

---

## 7.4.3 직렬화 믹스인 만들기

객체를 JSON으로 저장하고 싶을 때가 있습니다. 다음은 간단한 JSON 변환 믹스인입니다.

\`\`\`python
import json


class JsonMixin:
    def to_dict(self) -> dict:
        return self.__dict__.copy()

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
class Product(JsonMixin):
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price


product = Product("키보드", 30000)
print(product.to_json())
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
{"name": "키보드", "price": 30000}
\`\`\`

이 예제는 단순하지만 실무에서 자주 등장하는 구조입니다. 데이터 객체에 공통 변환 기능을 붙이고 싶을 때 믹스인을 사용할 수 있습니다.

---

## 7.4.4 믹스인을 사용할 때 주의할 점

믹스인은 편리하지만 남용하면 상속 구조가 복잡해집니다.

다음처럼 믹스인이 너무 많으면 코드를 이해하기 어렵습니다.

\`\`\`python
class ReportService(
    LoggingMixin,
    ValidationMixin,
    JsonMixin,
    CacheMixin,
    RetryMixin,
    PermissionMixin,
    BaseService,
):
    pass
\`\`\`

이런 클래스는 어떤 메서드가 어디에서 오는지 파악하기 어렵습니다.

믹스인을 사용할 때는 다음 원칙을 지키는 것이 좋습니다.

\`\`\`text
믹스인은 작고 독립적인 기능만 가져야 한다.
믹스인은 상태를 많이 가지지 않는 것이 좋다.
믹스인은 이름에 Mixin을 붙여 의도를 드러낸다.
믹스인 간 의존성을 줄인다.
MRO를 이해하지 못한 상태에서 복잡한 믹스인을 만들지 않는다.
\`\`\`

---

## 7.5 추상 클래스

추상 클래스는 직접 객체를 만들기 위한 클래스라기보다, 자식 클래스가 반드시 구현해야 할 공통 규칙을 정의하는 클래스입니다.

예를 들어 여러 데이터 저장 방식이 있다고 해보겠습니다.

- CSV 파일에 저장
- JSON 파일에 저장
- 데이터베이스에 저장

저장 방식은 다르지만 모두 \`save()\`라는 동작을 가져야 한다고 정할 수 있습니다.

이때 추상 클래스를 사용할 수 있습니다.

\`\`\`python
from abc import ABC, abstractmethod


class DataSaver(ABC):
    @abstractmethod
    def save(self, data: list[dict]) -> None:
        pass
\`\`\`

\`DataSaver\`는 \`save()\` 메서드를 반드시 구현해야 한다는 규칙을 만듭니다.

\`\`\`python
class CsvSaver(DataSaver):
    def save(self, data: list[dict]) -> None:
        print("CSV 파일로 저장합니다.")


class JsonSaver(DataSaver):
    def save(self, data: list[dict]) -> None:
        print("JSON 파일로 저장합니다.")
\`\`\`

이제 \`CsvSaver\`와 \`JsonSaver\`는 \`DataSaver\`의 규칙을 따릅니다.

---

## 7.5.1 추상 메서드를 구현하지 않으면 어떻게 될까

다음 클래스를 보겠습니다.

\`\`\`python
class BrokenSaver(DataSaver):
    pass
\`\`\`

\`BrokenSaver\`는 \`save()\` 메서드를 구현하지 않았습니다. 이 클래스로 객체를 만들면 에러가 발생합니다.

\`\`\`python
saver = BrokenSaver()
\`\`\`

실행하면 다음과 비슷한 에러가 발생합니다.

\`\`\`text
TypeError: Can't instantiate abstract class BrokenSaver with abstract method save
\`\`\`

추상 클래스는 이렇게 자식 클래스가 반드시 구현해야 할 메서드를 강제합니다.

---

## 7.5.2 추상 클래스가 필요한 이유

추상 클래스가 없으면 다음과 같은 실수가 생길 수 있습니다.

\`\`\`python
class CsvSaver:
    def save(self, data: list[dict]) -> None:
        print("CSV 저장")


class JsonSaver:
    def write(self, data: list[dict]) -> None:
        print("JSON 저장")
\`\`\`

\`CsvSaver\`는 \`save()\`를 가지고 있지만, \`JsonSaver\`는 \`write()\`를 가지고 있습니다. 그러면 두 클래스를 같은 방식으로 다루기 어렵습니다.

\`\`\`python
def save_data(saver, data: list[dict]) -> None:
    saver.save(data)
\`\`\`

\`JsonSaver\`를 넘기면 에러가 납니다.

추상 클래스를 사용하면 모든 저장 클래스가 같은 메서드 이름을 가지도록 강제할 수 있습니다.

\`\`\`python
def save_data(saver: DataSaver, data: list[dict]) -> None:
    saver.save(data)
\`\`\`

이 함수는 구체적인 저장 방식에 관심이 없습니다. \`DataSaver\` 규칙을 따르는 객체라면 모두 사용할 수 있습니다.

---

## 7.5.3 추상 클래스와 공통 코드

추상 클래스는 추상 메서드만 가질 필요는 없습니다. 공통 코드도 가질 수 있습니다.

\`\`\`python
from abc import ABC, abstractmethod


class ReportExporter(ABC):
    def export(self, data: list[dict], path: str) -> None:
        self.validate(data)
        self.write(data, path)
        print("내보내기가 완료되었습니다.")

    def validate(self, data: list[dict]) -> None:
        if not data:
            raise ValueError("내보낼 데이터가 없습니다.")

    @abstractmethod
    def write(self, data: list[dict], path: str) -> None:
        pass
\`\`\`

\`export()\`와 \`validate()\`는 공통 기능입니다. \`write()\`만 자식 클래스가 구현합니다.

\`\`\`python
class CsvReportExporter(ReportExporter):
    def write(self, data: list[dict], path: str) -> None:
        print(f"{path}에 CSV 형식으로 저장합니다.")


class JsonReportExporter(ReportExporter):
    def write(self, data: list[dict], path: str) -> None:
        print(f"{path}에 JSON 형식으로 저장합니다.")
\`\`\`

사용해보겠습니다.

\`\`\`python
data = [{"name": "홍길동", "amount": 30000}]

exporter = CsvReportExporter()
exporter.export(data, "report.csv")
\`\`\`

이 구조에서는 공통 처리 흐름은 부모 클래스가 담당하고, 구체적인 저장 방식은 자식 클래스가 담당합니다.

---

## 7.5.4 추상 클래스 사용 시 주의점

추상 클래스는 공통 규칙을 명확하게 만들 때 유용합니다. 하지만 너무 일찍 추상 클래스를 만들면 오히려 코드가 복잡해질 수 있습니다.

처음부터 “혹시 나중에 필요할 수도 있으니까”라는 이유로 추상 클래스를 만들 필요는 없습니다. 먼저 구체적인 클래스 몇 개를 만들고, 반복되는 구조가 보일 때 추상화를 고려하는 것이 좋습니다.

추상 클래스는 다음과 같은 상황에서 적합합니다.

\`\`\`text
여러 클래스가 같은 메서드 이름과 사용 방식을 가져야 한다.
공통 처리 흐름은 같고 세부 구현만 다르다.
새 구현을 추가해도 기존 코드를 크게 바꾸고 싶지 않다.
팀 작업에서 구현 규칙을 명확히 강제하고 싶다.
\`\`\`

---

## 7.6 인터페이스와 Protocol 개념

다른 언어에서는 인터페이스라는 문법이 별도로 있는 경우가 많습니다. 인터페이스는 “이 객체는 어떤 메서드를 가져야 한다”는 규칙을 정의합니다.

파이썬에는 전통적인 의미의 인터페이스 문법이 따로 있지는 않습니다. 대신 파이썬은 오랫동안 **덕 타이핑**이라는 방식을 사용해왔습니다.

---

## 7.6.1 덕 타이핑

덕 타이핑은 다음 문장으로 자주 설명됩니다.

\`\`\`text
오리처럼 걷고 오리처럼 꽥꽥거리면, 그것을 오리로 보겠다.
\`\`\`

프로그래밍에서는 “객체의 실제 클래스가 무엇인지보다, 필요한 메서드를 가지고 있는지가 중요하다”는 뜻입니다.

예를 들어 다음 함수는 객체의 구체적인 클래스를 확인하지 않습니다.

\`\`\`python
def print_report(writer, content: str) -> None:
    writer.write(content)
\`\`\`

이 함수는 \`writer\`가 어떤 클래스인지 모릅니다. 중요한 것은 \`write()\` 메서드를 가지고 있다는 점입니다.

\`\`\`python
class ConsoleWriter:
    def write(self, content: str) -> None:
        print(content)


class FileLikeWriter:
    def write(self, content: str) -> None:
        print(f"파일에 저장: {content}")
\`\`\`

두 클래스는 상속 관계가 없습니다. 그래도 둘 다 \`write()\` 메서드를 가지고 있으므로 \`print_report()\`에서 사용할 수 있습니다.

\`\`\`python
print_report(ConsoleWriter(), "보고서 내용")
print_report(FileLikeWriter(), "보고서 내용")
\`\`\`

이것이 파이썬다운 유연함입니다.

---

## 7.6.2 덕 타이핑의 장점과 단점

덕 타이핑의 장점은 유연함입니다.

- 상속 관계가 없어도 같은 방식으로 사용할 수 있다.
- 불필요한 부모 클래스를 만들지 않아도 된다.
- 작은 객체를 쉽게 교체할 수 있다.

하지만 단점도 있습니다.

- 어떤 메서드가 필요한지 코드만 보고 명확하지 않을 수 있다.
- 잘못된 객체를 넘겼을 때 실행 중에야 에러가 날 수 있다.
- 협업할 때 기대하는 구조를 문서화하기 어렵다.

이 단점을 보완하기 위해 타입 힌트에서는 \`Protocol\`을 사용할 수 있습니다.

---

## 7.6.3 Protocol 기초

\`Protocol\`은 “이 객체는 이런 메서드를 가져야 한다”는 구조를 타입 힌트로 표현하는 방법입니다.

\`\`\`python
from typing import Protocol


class Writer(Protocol):
    def write(self, content: str) -> None:
        ...
\`\`\`

\`Writer\`는 실제 구현을 제공하지 않습니다. 대신 \`write()\` 메서드를 가져야 한다는 규칙을 표현합니다.

이제 함수에 타입 힌트를 붙일 수 있습니다.

\`\`\`python
def print_report(writer: Writer, content: str) -> None:
    writer.write(content)
\`\`\`

다음 클래스는 \`Writer\`를 상속하지 않았지만, \`write()\` 메서드를 가지고 있습니다.

\`\`\`python
class ConsoleWriter:
    def write(self, content: str) -> None:
        print(content)
\`\`\`

구조가 맞기 때문에 타입 검사 도구는 \`ConsoleWriter\`를 \`Writer\`처럼 사용할 수 있다고 판단할 수 있습니다.

\`\`\`python
writer = ConsoleWriter()
print_report(writer, "보고서 내용")
\`\`\`

이것을 구조적 서브타이핑이라고 합니다. 파이썬의 덕 타이핑을 타입 힌트 세계에서 표현하는 방식이라고 이해하면 됩니다.

---

## 7.6.4 Protocol과 추상 클래스의 차이

추상 클래스와 \`Protocol\`은 비슷해 보이지만 목적이 조금 다릅니다.

| 구분 | 추상 클래스 | Protocol |
|---|---|---|
| 핵심 목적 | 공통 부모와 구현 규칙 제공 | 필요한 구조를 타입으로 표현 |
| 상속 필요 여부 | 보통 상속 필요 | 명시적 상속이 없어도 구조가 맞으면 사용 가능 |
| 공통 코드 제공 | 가능 | 일반적으로 구조 표현 중심 |
| 실행 중 강제 | 추상 메서드 미구현 시 객체 생성 불가 | 기본적으로 타입 검사 도구에서 확인 |
| 적합한 상황 | 공통 흐름과 구현 규칙이 필요할 때 | 덕 타이핑을 타입 힌트로 표현하고 싶을 때 |

예를 들어 저장 기능에 공통 검증 흐름까지 포함하고 싶다면 추상 클래스가 좋습니다.

\`\`\`python
class BaseSaver(ABC):
    def save(self, data: list[dict]) -> None:
        self.validate(data)
        self.write(data)

    def validate(self, data: list[dict]) -> None:
        if not data:
            raise ValueError("데이터가 없습니다.")

    @abstractmethod
    def write(self, data: list[dict]) -> None:
        pass
\`\`\`

반대로 단순히 “\`write()\` 메서드가 있는 객체면 된다”라고 표현하고 싶다면 \`Protocol\`이 더 가볍습니다.

\`\`\`python
class Writer(Protocol):
    def write(self, content: str) -> None:
        ...
\`\`\`

---

## 7.6.5 Protocol 실무 예제

다음은 알림을 보내는 기능입니다. 알림 방식은 이메일, 슬랙, 콘솔 등 다양할 수 있습니다.

\`\`\`python
from typing import Protocol


class Notifier(Protocol):
    def send(self, message: str) -> None:
        ...
\`\`\`

이제 알림을 사용하는 서비스는 구체적인 구현을 몰라도 됩니다.

\`\`\`python
class OrderService:
    def __init__(self, notifier: Notifier) -> None:
        self.notifier = notifier

    def complete_order(self, order_id: str) -> None:
        print(f"주문 {order_id}를 완료했습니다.")
        self.notifier.send(f"주문 {order_id}가 완료되었습니다.")
\`\`\`

구체적인 알림 구현은 따로 만들 수 있습니다.

\`\`\`python
class ConsoleNotifier:
    def send(self, message: str) -> None:
        print(f"[알림] {message}")


class EmailNotifier:
    def __init__(self, email: str) -> None:
        self.email = email

    def send(self, message: str) -> None:
        print(f"{self.email}로 이메일 전송: {message}")
\`\`\`

사용해보겠습니다.

\`\`\`python
service = OrderService(ConsoleNotifier())
service.complete_order("A001")

email_service = OrderService(EmailNotifier("admin@example.com"))
email_service.complete_order("A002")
\`\`\`

\`OrderService\`는 \`ConsoleNotifier\`인지 \`EmailNotifier\`인지 알 필요가 없습니다. \`send()\` 메서드를 가진 객체라면 사용할 수 있습니다.

이 구조는 테스트에도 유리합니다.

\`\`\`python
class FakeNotifier:
    def __init__(self) -> None:
        self.messages: list[str] = []

    def send(self, message: str) -> None:
        self.messages.append(message)


fake = FakeNotifier()
service = OrderService(fake)
service.complete_order("A003")

assert fake.messages == ["주문 A003가 완료되었습니다."]
\`\`\`

실제 이메일을 보내지 않고도 주문 완료 로직을 테스트할 수 있습니다.

---

## 7.7 조합

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

## 7.8 객체지향 설계 원칙 기초

객체지향 설계 원칙은 매우 많습니다. 이번 장에서는 기초 수준에서 가장 중요한 관점만 다룹니다.

- 단일 책임 원칙
- 개방 폐쇄 원칙
- 의존성 줄이기
- 변경에 강한 구조 만들기

이 원칙들은 외우기 위한 것이 아니라, 코드를 점검하는 기준으로 사용하면 좋습니다.

---

## 7.8.1 단일 책임 원칙

단일 책임 원칙은 하나의 클래스가 하나의 책임만 가져야 한다는 원칙입니다.

여기서 책임은 “변경되는 이유”라고 이해하면 좋습니다. 하나의 클래스가 여러 이유로 변경된다면 책임이 너무 많은 것입니다.

나쁜 예를 보겠습니다.

\`\`\`python
class SalesReportManager:
    def read_sales_file(self, path: str) -> list[dict]:
        print("매출 파일을 읽습니다.")
        return []

    def calculate_total(self, data: list[dict]) -> int:
        print("총 매출을 계산합니다.")
        return 0

    def save_report(self, path: str, total: int) -> None:
        print("보고서를 저장합니다.")

    def send_email(self, email: str) -> None:
        print("이메일을 보냅니다.")
\`\`\`

이 클래스는 다음 이유로 변경될 수 있습니다.

- 파일 형식이 바뀔 때
- 매출 계산 방식이 바뀔 때
- 보고서 저장 방식이 바뀔 때
- 이메일 전송 방식이 바뀔 때

변경 이유가 너무 많습니다.

역할을 나눠보겠습니다.

\`\`\`python
class SalesReader:
    def read(self, path: str) -> list[dict]:
        print("매출 파일을 읽습니다.")
        return []


class SalesCalculator:
    def calculate_total(self, data: list[dict]) -> int:
        print("총 매출을 계산합니다.")
        return 0


class ReportSaver:
    def save(self, path: str, total: int) -> None:
        print("보고서를 저장합니다.")


class EmailSender:
    def send(self, email: str, message: str) -> None:
        print("이메일을 보냅니다.")
\`\`\`

각 클래스의 책임이 분명해졌습니다.

---

## 7.8.2 개방 폐쇄 원칙

개방 폐쇄 원칙은 **확장에는 열려 있고, 수정에는 닫혀 있어야 한다**는 원칙입니다.

말이 어렵지만 예제로 보면 쉽습니다.

다음 함수는 저장 형식에 따라 조건문을 사용합니다.

\`\`\`python
def save_data(data: list[dict], save_type: str) -> None:
    if save_type == "csv":
        print("CSV로 저장")
    elif save_type == "json":
        print("JSON으로 저장")
    elif save_type == "db":
        print("DB에 저장")
\`\`\`

처음에는 괜찮아 보입니다. 하지만 저장 방식이 추가될 때마다 이 함수를 수정해야 합니다.

\`\`\`python
elif save_type == "excel":
    print("엑셀로 저장")
\`\`\`

기존 코드를 계속 수정해야 하므로 변경 위험이 커집니다.

객체지향적으로 바꿔보겠습니다.

\`\`\`python
from abc import ABC, abstractmethod


class Saver(ABC):
    @abstractmethod
    def save(self, data: list[dict]) -> None:
        pass


class CsvSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("CSV로 저장")


class JsonSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("JSON으로 저장")


class DatabaseSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("DB에 저장")
\`\`\`

이제 저장 함수는 단순해집니다.

\`\`\`python
def save_data(data: list[dict], saver: Saver) -> None:
    saver.save(data)
\`\`\`

엑셀 저장 방식이 추가되어도 기존 \`save_data()\` 함수는 수정하지 않아도 됩니다.

\`\`\`python
class ExcelSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("엑셀로 저장")
\`\`\`

새 클래스를 추가해서 확장할 수 있습니다. 이것이 개방 폐쇄 원칙의 기본 아이디어입니다.

---

## 7.8.3 의존성 줄이기

클래스가 구체적인 구현에 직접 의존하면 변경에 약해집니다.

나쁜 예를 보겠습니다.

\`\`\`python
class ReportService:
    def __init__(self) -> None:
        self.saver = CsvSaver()

    def create_report(self, data: list[dict]) -> None:
        self.saver.save(data)
\`\`\`

이 클래스는 \`CsvSaver\`에 직접 의존합니다. JSON 저장으로 바꾸려면 \`ReportService\` 내부 코드를 수정해야 합니다.

의존성을 낮추려면 외부에서 전달받도록 바꿀 수 있습니다.

\`\`\`python
class ReportService:
    def __init__(self, saver: Saver) -> None:
        self.saver = saver

    def create_report(self, data: list[dict]) -> None:
        self.saver.save(data)
\`\`\`

사용할 때 저장 방식을 선택합니다.

\`\`\`python
service = ReportService(CsvSaver())
service.create_report([])

json_service = ReportService(JsonSaver())
json_service.create_report([])
\`\`\`

이 구조는 테스트할 때도 좋습니다.

\`\`\`python
class FakeSaver(Saver):
    def __init__(self) -> None:
        self.saved = False

    def save(self, data: list[dict]) -> None:
        self.saved = True


fake_saver = FakeSaver()
service = ReportService(fake_saver)
service.create_report([])

assert fake_saver.saved is True
\`\`\`

실제 파일 저장 없이도 \`ReportService\`가 저장 기능을 호출했는지 확인할 수 있습니다.

---

## 7.8.4 변경에 강한 구조 만들기

객체지향 설계의 핵심은 변경에 강한 구조를 만드는 것입니다.

변경에 강한 코드는 다음 특징을 가집니다.

- 변경되는 부분과 변경되지 않는 부분이 분리되어 있다.
- 구체적인 구현보다 공통 인터페이스에 의존한다.
- 하나의 클래스가 너무 많은 책임을 가지지 않는다.
- 외부 시스템과 연결되는 코드는 분리되어 있다.
- 테스트할 수 있는 단위로 나뉘어 있다.

다음 구조를 생각해보겠습니다.

\`\`\`python
class DataReader(Protocol):
    def read(self, source: str) -> list[dict]:
        ...


class DataCleaner(Protocol):
    def clean(self, data: list[dict]) -> list[dict]:
        ...


class DataSaver(Protocol):
    def save(self, data: list[dict], output: str) -> None:
        ...
\`\`\`

그리고 전체 흐름을 담당하는 파이프라인을 만듭니다.

\`\`\`python
class DataPipeline:
    def __init__(
        self,
        reader: DataReader,
        cleaner: DataCleaner,
        saver: DataSaver,
    ) -> None:
        self.reader = reader
        self.cleaner = cleaner
        self.saver = saver

    def run(self, source: str, output: str) -> None:
        data = self.reader.read(source)
        cleaned_data = self.cleaner.clean(data)
        self.saver.save(cleaned_data, output)
\`\`\`

이 구조에서는 파일 읽기 방식, 정리 방식, 저장 방식이 각각 독립적으로 바뀔 수 있습니다.

\`\`\`text
CSV Reader → Excel Reader로 변경
Simple Cleaner → Advanced Cleaner로 변경
JSON Saver → Database Saver로 변경
\`\`\`

변경이 생겨도 \`DataPipeline\` 자체는 크게 바뀌지 않습니다.

---

## 7.9 실무 활용 예제: 데이터 처리 파이프라인 설계

이제 지금까지 배운 내용을 하나의 예제로 연결해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 데이터를 읽는다.
2. 데이터를 검증한다.
3. 데이터를 정리한다.
4. 데이터를 저장한다.
\`\`\`

이런 흐름은 데이터분석 전처리, API 수집, 파일 자동화, 로그 분석 등에서 자주 등장합니다.

---

## 7.9.1 데이터 구조 정하기

먼저 데이터는 간단히 \`list[dict]\` 형태로 다루겠습니다.

\`\`\`python
sales_data = [
    {"name": "키보드", "price": "30000", "quantity": "2"},
    {"name": "마우스", "price": "15000", "quantity": "3"},
]
\`\`\`

실무에서는 CSV나 API에서 읽은 데이터가 처음에는 문자열 형태인 경우가 많습니다. 그래서 정리 단계에서 숫자로 바꾸는 작업이 필요할 수 있습니다.

---

## 7.9.2 Protocol로 역할 정의하기

먼저 각 역할을 \`Protocol\`로 정의합니다.

\`\`\`python
from typing import Protocol


class Reader(Protocol):
    def read(self, source: str) -> list[dict]:
        ...


class Validator(Protocol):
    def validate(self, data: list[dict]) -> None:
        ...


class Cleaner(Protocol):
    def clean(self, data: list[dict]) -> list[dict]:
        ...


class Saver(Protocol):
    def save(self, data: list[dict], output: str) -> None:
        ...
\`\`\`

이 코드는 구체적인 구현이 아닙니다. 각 객체가 어떤 메서드를 가져야 하는지 표현합니다.

---

## 7.9.3 Reader 구현하기

예제를 단순하게 하기 위해 실제 파일을 읽는 대신 샘플 데이터를 반환하는 리더를 만들겠습니다.

\`\`\`python
class SampleReader:
    def read(self, source: str) -> list[dict]:
        print(f"{source}에서 데이터를 읽습니다.")
        return [
            {"name": "키보드", "price": "30000", "quantity": "2"},
            {"name": "마우스", "price": "15000", "quantity": "3"},
        ]
\`\`\`

나중에는 이 클래스를 \`CsvReader\`, \`JsonReader\`, \`ApiReader\` 등으로 바꿀 수 있습니다.

---

## 7.9.4 Validator 구현하기

검증 클래스는 필수 컬럼이 있는지 확인합니다.

\`\`\`python
class SalesValidator:
    required_columns = {"name", "price", "quantity"}

    def validate(self, data: list[dict]) -> None:
        if not data:
            raise ValueError("데이터가 비어 있습니다.")

        for index, row in enumerate(data, start=1):
            missing_columns = self.required_columns - row.keys()
            if missing_columns:
                raise ValueError(
                    f"{index}번째 행에 필수 컬럼이 없습니다: {missing_columns}"
                )
\`\`\`

검증 로직은 데이터 처리에서 매우 중요합니다. 잘못된 데이터를 뒤 단계로 넘기면 오류를 찾기 어려워집니다.

---

## 7.9.5 Cleaner 구현하기

정리 클래스는 문자열 숫자를 정수로 바꾸고, 총액을 계산합니다.

\`\`\`python
class SalesCleaner:
    def clean(self, data: list[dict]) -> list[dict]:
        cleaned_data = []

        for row in data:
            price = int(row["price"])
            quantity = int(row["quantity"])

            cleaned_row = {
                "name": row["name"].strip(),
                "price": price,
                "quantity": quantity,
                "total": price * quantity,
            }
            cleaned_data.append(cleaned_row)

        return cleaned_data
\`\`\`

이 클래스는 검증이 완료된 데이터를 받는다고 가정합니다.

---

## 7.9.6 Saver 구현하기

저장 클래스는 결과를 출력하는 방식으로 단순화하겠습니다.

\`\`\`python
class ConsoleSaver:
    def save(self, data: list[dict], output: str) -> None:
        print(f"{output}에 저장할 데이터:")
        for row in data:
            print(row)
\`\`\`

나중에는 \`CsvSaver\`, \`JsonSaver\`, \`DatabaseSaver\`로 바꿀 수 있습니다.

---

## 7.9.7 Pipeline 구현하기

이제 전체 흐름을 조합하는 파이프라인 클래스를 만듭니다.

\`\`\`python
class DataPipeline:
    def __init__(
        self,
        reader: Reader,
        validator: Validator,
        cleaner: Cleaner,
        saver: Saver,
    ) -> None:
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

\`DataPipeline\`은 각 단계의 구체적인 구현을 모릅니다. 읽기, 검증, 정리, 저장이라는 역할만 알고 있습니다.

---

## 7.9.8 실행하기

\`\`\`python
pipeline = DataPipeline(
    reader=SampleReader(),
    validator=SalesValidator(),
    cleaner=SalesCleaner(),
    saver=ConsoleSaver(),
)

pipeline.run("sales.csv", "result.csv")
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
sales.csv에서 데이터를 읽습니다.
result.csv에 저장할 데이터:
{'name': '키보드', 'price': 30000, 'quantity': 2, 'total': 60000}
{'name': '마우스', 'price': 15000, 'quantity': 3, 'total': 45000}
\`\`\`

이 구조의 장점은 각 단계를 쉽게 교체할 수 있다는 점입니다.

예를 들어 API에서 데이터를 읽고 싶다면 \`ApiReader\`를 만들어 넣으면 됩니다. 저장을 파일로 하고 싶다면 \`CsvSaver\`를 만들어 넣으면 됩니다. 파이프라인의 핵심 흐름은 그대로 유지됩니다.

---

## 7.10 실무 객체지향 설계 체크리스트

객체지향 코드를 작성한 뒤에는 다음 질문으로 점검해보면 좋습니다.

### 클래스 책임 점검

\`\`\`text
이 클래스는 한 문장으로 설명할 수 있는가?
이 클래스가 변경되는 이유는 하나인가?
이 클래스 이름과 실제 역할이 일치하는가?
\`\`\`

### 상속 점검

\`\`\`text
자식 클래스는 정말 부모 클래스의 한 종류인가?
부모 클래스의 기능을 모두 자연스럽게 사용할 수 있는가?
상속이 아니라 조합으로 해결할 수 있지 않은가?
\`\`\`

### 조합 점검

\`\`\`text
이 클래스가 직접 만들고 있는 객체를 외부에서 받을 수 있는가?
구체 클래스 대신 Protocol이나 추상 클래스에 의존할 수 있는가?
테스트용 가짜 객체를 쉽게 넣을 수 있는가?
\`\`\`

### 변경 가능성 점검

\`\`\`text
파일 형식이 바뀌면 어떤 클래스가 수정되는가?
저장 방식이 바뀌면 어떤 클래스가 수정되는가?
알림 방식이 바뀌면 어떤 클래스가 수정되는가?
새 기능을 추가할 때 기존 코드를 많이 수정해야 하는가?
\`\`\`

### 테스트 가능성 점검

\`\`\`text
외부 API 없이 테스트할 수 있는가?
실제 파일 저장 없이 테스트할 수 있는가?
실제 이메일 전송 없이 테스트할 수 있는가?
입력과 출력이 명확한가?
\`\`\`

이 질문에 답하면서 코드를 고치다 보면 자연스럽게 더 좋은 구조로 개선할 수 있습니다.

---

## 7.11 정리

이번 장에서는 객체지향 프로그래밍을 문법이 아니라 설계 관점에서 살펴보았습니다.

기초 과정에서는 클래스를 만들고 사용하는 방법을 배웠다면, 이번 장에서는 다음과 같은 더 깊은 질문을 다루었습니다.

\`\`\`text
언제 상속을 사용할 것인가?
다중 상속은 어떻게 동작하는가?
MRO는 왜 중요한가?
믹스인은 어떤 상황에서 유용한가?
추상 클래스는 무엇을 강제하는가?
Protocol은 덕 타이핑을 어떻게 타입으로 표현하는가?
상속보다 조합이 좋은 경우는 언제인가?
좋은 객체지향 구조는 어떤 특징을 가지는가?
\`\`\`

객체지향 설계에서 가장 중요한 것은 “클래스를 많이 만드는 것”이 아닙니다. 중요한 것은 **책임을 잘 나누고, 변경에 강하며, 테스트하기 쉬운 구조를 만드는 것**입니다.

데이터분석 과정으로 이어질 때도 이 관점은 중요합니다. 분석 코드는 처음에는 노트북에서 빠르게 작성할 수 있지만, 반복 실행하고 자동화하고 운영하려면 구조가 필요합니다. 데이터를 읽는 코드, 검증하는 코드, 정리하는 코드, 저장하는 코드를 역할별로 나누면 분석 전처리 과정도 훨씬 안정적으로 관리할 수 있습니다.

---

# 연습문제

## 문제 1. 상속이 적절한지 판단하기

다음 관계 중 상속이 가장 적절한 것을 고르세요.

1. \`Order\`는 \`Product\`를 상속한다.
2. \`CsvSaver\`는 \`DataSaver\`를 상속한다.
3. \`ReportGenerator\`는 \`FileReader\`를 상속한다.
4. \`Customer\`는 \`Order\`를 상속한다.

---

## 문제 2. 조합으로 바꾸기

다음 코드는 상속을 잘못 사용한 예입니다. 조합을 사용하는 구조로 바꿔보세요.

\`\`\`python
class EmailSender:
    def send_email(self, message: str) -> None:
        print(f"이메일 전송: {message}")


class OrderService(EmailSender):
    def complete_order(self, order_id: str) -> None:
        print(f"주문 {order_id} 완료")
        self.send_email("주문이 완료되었습니다.")
\`\`\`

---

## 문제 3. MRO 확인하기

다음 코드의 출력 순서를 예상해보세요.

\`\`\`python
class A:
    def run(self) -> None:
        print("A")


class B(A):
    def run(self) -> None:
        print("B")
        super().run()


class C(A):
    def run(self) -> None:
        print("C")
        super().run()


class D(B, C):
    def run(self) -> None:
        print("D")
        super().run()


D().run()
print(D.__mro__)
\`\`\`

---

## 문제 4. 믹스인 만들기

다음 요구사항을 만족하는 \`TimestampMixin\`을 만들어보세요.

- \`created_at\` 속성을 현재 시간 문자열로 저장한다.
- \`get_created_at()\` 메서드로 생성 시간을 반환한다.
- \`Post\` 클래스에서 이 믹스인을 사용한다.

힌트: \`datetime.now().isoformat()\`을 사용할 수 있습니다.

---

## 문제 5. 추상 클래스 만들기

다음 요구사항을 만족하는 추상 클래스를 작성하세요.

- 추상 클래스 이름은 \`DataLoader\`입니다.
- 반드시 \`load()\` 메서드를 구현해야 합니다.
- \`CsvLoader\`와 \`JsonLoader\`가 \`DataLoader\`를 상속합니다.
- 각 클래스의 \`load()\` 메서드는 임시로 문자열을 출력해도 됩니다.

---

## 문제 6. Protocol 사용하기

다음 요구사항을 만족하는 코드를 작성하세요.

- \`Notifier\` Protocol을 만듭니다.
- \`Notifier\`는 \`send(message: str) -> None\` 메서드를 요구합니다.
- \`ConsoleNotifier\`는 메시지를 화면에 출력합니다.
- \`AlertService\`는 생성자에서 \`Notifier\`를 받고, \`alert()\` 메서드에서 알림을 보냅니다.

---

## 문제 7. 단일 책임 원칙으로 나누기

다음 클래스는 너무 많은 일을 하고 있습니다. 어떤 책임으로 나누면 좋을지 클래스 이름만 제안해보세요.

\`\`\`python
class CustomerDataManager:
    def read_csv(self):
        pass

    def clean_phone_numbers(self):
        pass

    def validate_emails(self):
        pass

    def save_json(self):
        pass

    def send_result_email(self):
        pass
\`\`\`

---

## 문제 8. 데이터 파이프라인 구조 이해하기

다음 중 \`DataPipeline\` 클래스가 직접 담당하지 않는 것이 더 좋은 일을 모두 고르세요.

1. 데이터를 읽는 구체적인 방법
2. 검증 객체 호출
3. 정리 객체 호출
4. CSV 저장 세부 구현
5. 전체 처리 흐름 실행

---

# 정답 및 해설

## 문제 1 정답

정답은 2번입니다.

\`CsvSaver\`는 \`DataSaver\`의 한 종류라고 볼 수 있습니다. 즉, “CSV 저장기는 데이터 저장기의 한 종류다”라는 관계가 자연스럽습니다.

반면 \`Order\`는 \`Product\`의 한 종류가 아닙니다. 주문은 상품을 포함할 수 있지만 상품을 상속하는 관계는 아닙니다. \`ReportGenerator\`도 \`FileReader\`의 한 종류라기보다 파일 읽기 기능을 사용하는 객체입니다. \`Customer\`도 \`Order\`의 한 종류가 아닙니다.

---

## 문제 2 정답 예시

\`\`\`python
class EmailSender:
    def send_email(self, message: str) -> None:
        print(f"이메일 전송: {message}")


class OrderService:
    def __init__(self, sender: EmailSender) -> None:
        self.sender = sender

    def complete_order(self, order_id: str) -> None:
        print(f"주문 {order_id} 완료")
        self.sender.send_email("주문이 완료되었습니다.")


sender = EmailSender()
service = OrderService(sender)
service.complete_order("A001")
\`\`\`

\`OrderService\`는 \`EmailSender\`의 한 종류가 아닙니다. 이메일 전송 기능을 사용하는 객체입니다. 따라서 상속보다 조합이 적절합니다.

---

## 문제 3 정답

출력 순서는 다음과 같습니다.

\`\`\`text
D
B
C
A
\`\`\`

MRO는 다음과 비슷합니다.

\`\`\`text
(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)
\`\`\`

\`D\`의 \`super()\`는 \`B\`를 찾고, \`B\`의 \`super()\`는 단순히 \`A\`로 바로 가지 않고 MRO에서 \`B\` 다음에 있는 \`C\`로 이동합니다. 그다음 \`C\`의 \`super()\`가 \`A\`로 이동합니다.

---

## 문제 4 정답 예시

\`\`\`python
from datetime import datetime


class TimestampMixin:
    def set_created_at(self) -> None:
        self.created_at = datetime.now().isoformat()

    def get_created_at(self) -> str:
        return self.created_at


class Post(TimestampMixin):
    def __init__(self, title: str) -> None:
        self.title = title
        self.set_created_at()


post = Post("첫 번째 글")
print(post.title)
print(post.get_created_at())
\`\`\`

믹스인이 생성자까지 직접 강하게 가정하면 다른 클래스와 함께 사용할 때 충돌이 생길 수 있습니다. 그래서 예시에서는 \`set_created_at()\` 메서드를 제공하고, 사용하는 클래스가 생성자에서 직접 호출하도록 했습니다.

---

## 문제 5 정답 예시

\`\`\`python
from abc import ABC, abstractmethod


class DataLoader(ABC):
    @abstractmethod
    def load(self) -> list[dict]:
        pass


class CsvLoader(DataLoader):
    def load(self) -> list[dict]:
        print("CSV 데이터를 불러옵니다.")
        return []


class JsonLoader(DataLoader):
    def load(self) -> list[dict]:
        print("JSON 데이터를 불러옵니다.")
        return []
\`\`\`

\`DataLoader\`는 \`load()\` 메서드를 반드시 구현하도록 강제합니다. \`CsvLoader\`와 \`JsonLoader\`는 서로 다른 방식으로 데이터를 불러올 수 있지만 같은 인터페이스를 가집니다.

---

## 문제 6 정답 예시

\`\`\`python
from typing import Protocol


class Notifier(Protocol):
    def send(self, message: str) -> None:
        ...


class ConsoleNotifier:
    def send(self, message: str) -> None:
        print(f"[알림] {message}")


class AlertService:
    def __init__(self, notifier: Notifier) -> None:
        self.notifier = notifier

    def alert(self, message: str) -> None:
        self.notifier.send(message)


service = AlertService(ConsoleNotifier())
service.alert("작업이 완료되었습니다.")
\`\`\`

\`AlertService\`는 구체적인 알림 방식에 의존하지 않고 \`Notifier\`라는 구조에 의존합니다. 나중에 이메일 알림, 슬랙 알림으로 바꾸기 쉬운 구조입니다.

---

## 문제 7 정답 예시

다음처럼 책임을 나눌 수 있습니다.

\`\`\`text
CustomerCsvReader
PhoneNumberCleaner
EmailValidator
CustomerJsonSaver
ResultEmailSender
\`\`\`

전체 흐름을 조합하는 클래스가 필요하다면 다음 이름도 생각할 수 있습니다.

\`\`\`text
CustomerDataPipeline
CustomerDataProcessor
\`\`\`

중요한 것은 하나의 클래스가 파일 읽기, 데이터 정리, 검증, 저장, 이메일 전송을 모두 담당하지 않도록 나누는 것입니다.

---

## 문제 8 정답

정답은 1번과 4번입니다.

\`DataPipeline\`은 전체 처리 흐름을 실행하고, 검증 객체와 정리 객체를 호출하는 역할을 할 수 있습니다. 하지만 데이터를 읽는 구체적인 방법이나 CSV 저장 세부 구현까지 직접 담당하면 책임이 너무 많아집니다.

더 좋은 구조는 다음과 같습니다.

\`\`\`text
Reader가 읽기 세부 구현 담당
Validator가 검증 담당
Cleaner가 정리 담당
Saver가 저장 세부 구현 담당
DataPipeline이 전체 흐름 조합 담당
\`\`\`

---

# 참고 자료

- Python 공식 문서, \`super()\` 내장 함수 설명: https://docs.python.org/3/library/functions.html#super
- Python 공식 튜토리얼, 클래스와 다중 상속: https://docs.python.org/3/tutorial/classes.html
- Python 공식 문서, 데이터 모델과 \`__mro__\`: https://docs.python.org/3/reference/datamodel.html
- Python 공식 문서, \`abc\` 모듈: https://docs.python.org/3/library/abc.html
- Python typing 문서, Protocol: https://typing.python.org/en/latest/spec/protocol.html
`;export{e as default};