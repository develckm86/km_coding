var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-11 -->

# 7.11 정리

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