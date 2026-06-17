var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-6 -->

# 7.6 인터페이스와 Protocol 개념

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
`;export{e as default};