var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-2 -->

# 7.2 상속 심화

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
`;export{e as default};