var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-10 -->

# 9.10 핵심 정리

이번 장에서는 타입 힌트를 더 깊게 살펴보았습니다.

타입 힌트는 파이썬의 실행 방식을 정적 타입 언어처럼 바꾸는 기능이 아닙니다. 타입 힌트는 코드의 의도를 표현하고, IDE와 타입 검사 도구가 오류 가능성을 찾도록 돕는 장치입니다.

기본 타입 힌트만으로는 실무 데이터를 충분히 표현하기 어렵습니다. 그래서 여러 고급 타입 표현이 필요합니다.

\`\`\`text
str | None          값이 문자열 또는 None일 수 있음
Literal[...]        특정 값만 허용
Final[...]          재할당하지 않을 값이라는 의도 표현
Callable[...]       함수나 호출 가능한 객체 표현
Iterable[...]       반복 가능한 객체 표현
Sequence[...]       순서와 인덱싱이 가능한 객체 표현
Mapping[...]        읽기 중심 key-value 객체 표현
TypedDict           딕셔너리 구조 표현
Protocol            필요한 메서드나 속성을 가진 객체 표현
TypeVar             입력 타입과 반환 타입의 관계 표현
Generic             타입을 매개변수화한 클래스 표현
\`\`\`

특히 데이터분석 과정으로 넘어가기 전에는 \`TypedDict\`, \`Iterable\`, \`Mapping\`, \`Protocol\`, 제네릭 \`Result\` 패턴이 유용합니다. 원본 데이터와 정제 데이터를 타입으로 분리하고, 데이터 처리 함수의 입력과 출력을 명확히 하면 전처리 코드의 품질이 좋아집니다.

타입 힌트는 테스트, 예외 처리, 로깅과 함께 사용할 때 더 강력합니다. 타입 힌트는 구조를 설명하고, 테스트는 실제 동작을 확인하며, 예외 처리와 로깅은 실패 상황을 다룹니다.

---

# 연습문제

## 문제 1. Optional의 의미

다음 함수의 타입 힌트를 해석해보세요.

\`\`\`python
def find_email(user_id: int) -> str | None:
    ...
\`\`\`

\`str | None\`은 무엇을 의미하나요?

---

## 문제 2. 선택 인자 만들기

다음 함수는 \`name\`이 문자열 또는 \`None\`일 수 있지만, 인자를 생략할 수는 없습니다.

\`\`\`python
def greet(name: str | None) -> str:
    if name is None:
        return "이름 없음"
    return f"안녕하세요, {name}님"
\`\`\`

\`greet()\`처럼 인자를 생략해도 동작하게 수정해보세요.

---

## 문제 3. Literal 사용하기

다음 함수의 \`format\` 인자는 \`"csv"\`, \`"json"\`, \`"xlsx"\` 중 하나만 허용하려고 합니다. 타입 힌트를 완성하세요.

\`\`\`python
from typing import Literal

FileFormat = ______________________


def export_data(path: str, format: FileFormat) -> None:
    print(path, format)
\`\`\`

---

## 문제 4. Callable 타입 작성하기

다음 함수는 정수 하나를 받아 정수를 반환하는 함수를 인자로 받습니다. \`discount_func\`의 타입 힌트를 작성하세요.

\`\`\`python
from collections.abc import Callable


def apply_discount(price: int, discount_func: ____________) -> int:
    return discount_func(price)
\`\`\`

---

## 문제 5. Iterable로 바꾸기

다음 함수는 리스트뿐 아니라 튜플, 집합, 제너레이터도 받을 수 있도록 수정하는 것이 좋습니다.

\`\`\`python
def total(numbers: list[int]) -> int:
    return sum(numbers)
\`\`\`

더 적절한 타입 힌트로 바꿔보세요.

---

## 문제 6. TypedDict 작성하기

다음 딕셔너리 구조를 표현하는 \`TypedDict\`를 작성하세요.

\`\`\`python
product = {
    "id": 100,
    "name": "키보드",
    "price": 30000,
    "in_stock": True,
}
\`\`\`

---

## 문제 7. 선택 key 표현하기

다음 사용자 데이터에서 \`phone\`은 있을 수도 있고 없을 수도 있습니다. \`TypedDict\`를 작성하세요.

\`\`\`python
user = {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "phone": "010-1234-5678",
}
\`\`\`

---

## 문제 8. TypeVar 사용하기

다음 함수는 리스트의 첫 번째 값을 반환합니다. 정수 리스트를 넣으면 정수를, 문자열 리스트를 넣으면 문자열을 반환하도록 제네릭 타입 힌트를 작성하세요.

\`\`\`python
from typing import TypeVar

T = TypeVar("T")


def first(items: ____________) -> ____________:
    return items[0]
\`\`\`

---

## 문제 9. Protocol 작성하기

다음 함수는 \`save(data: str) -> None\` 메서드를 가진 객체라면 무엇이든 받을 수 있어야 합니다. \`Saver\` 프로토콜을 작성하세요.

\`\`\`python
from typing import Protocol

class Saver(Protocol):
    ______________________________


def save_report(saver: Saver, content: str) -> None:
    saver.save(content)
\`\`\`

---

## 문제 10. 타입 힌트 개선하기

다음 함수는 타입 힌트가 너무 넓습니다.

\`\`\`python
from typing import Any


def clean_names(names: Any) -> Any:
    return [name.strip() for name in names]
\`\`\`

문자열을 반복 가능한 형태로 받아 정제된 문자열 리스트를 반환하도록 타입 힌트를 개선하세요.

---

## 문제 11. Result 클래스 만들기

성공 여부, 성공 값, 오류 메시지를 담는 제네릭 \`Result\` 클래스를 작성하세요.

조건은 다음과 같습니다.

\`\`\`text
클래스 이름은 Result
제네릭 타입 T 사용
success: bool
value: T | None
error: str | None
\`\`\`

---

## 문제 12. 코드 읽기

다음 타입 힌트가 의미하는 바를 설명하세요.

\`\`\`python
from collections.abc import Mapping


def get_name(user: Mapping[str, object]) -> str:
    value = user.get("name")
    if isinstance(value, str):
        return value
    return ""
\`\`\`

\`dict[str, object]\` 대신 \`Mapping[str, object]\`을 사용한 이유는 무엇일까요?

---

# 정답 및 해설

## 정답 1

\`str | None\`은 반환값이 문자열이거나 \`None\`일 수 있다는 뜻입니다.

즉, 사용자를 찾으면 이메일 문자열을 반환하고, 사용자를 찾지 못하면 \`None\`을 반환할 수 있습니다.

---

## 정답 2

\`\`\`python
def greet(name: str | None = None) -> str:
    if name is None:
        return "이름 없음"
    return f"안녕하세요, {name}님"
\`\`\`

\`str | None\`은 값이 \`None\`일 수 있다는 뜻이고, 인자를 생략 가능하게 하려면 \`= None\`처럼 기본값을 지정해야 합니다.

---

## 정답 3

\`\`\`python
from typing import Literal

FileFormat = Literal["csv", "json", "xlsx"]


def export_data(path: str, format: FileFormat) -> None:
    print(path, format)
\`\`\`

\`Literal\`을 사용하면 정해진 문자열 값 중 하나만 허용한다는 의도를 표현할 수 있습니다.

---

## 정답 4

\`\`\`python
from collections.abc import Callable


def apply_discount(price: int, discount_func: Callable[[int], int]) -> int:
    return discount_func(price)
\`\`\`

\`Callable[[int], int]\`는 정수 하나를 인자로 받고 정수를 반환하는 함수라는 뜻입니다.

---

## 정답 5

\`\`\`python
from collections.abc import Iterable


def total(numbers: Iterable[int]) -> int:
    return sum(numbers)
\`\`\`

이 함수는 리스트 전용 기능을 사용하지 않고 반복만 필요로 합니다. 따라서 \`list[int]\`보다 \`Iterable[int]\`가 더 유연합니다.

---

## 정답 6

\`\`\`python
from typing import TypedDict

class ProductRow(TypedDict):
    id: int
    name: str
    price: int
    in_stock: bool
\`\`\`

\`TypedDict\`는 딕셔너리의 key와 각 key의 value 타입을 표현할 수 있습니다.

---

## 정답 7

\`\`\`python
from typing import NotRequired, TypedDict

class UserRow(TypedDict):
    id: int
    name: str
    email: str
    phone: NotRequired[str]
\`\`\`

\`NotRequired[str]\`는 해당 key가 없어도 되지만, 있다면 문자열이어야 한다는 뜻입니다.

---

## 정답 8

\`\`\`python
from typing import TypeVar

T = TypeVar("T")


def first(items: list[T]) -> T:
    return items[0]
\`\`\`

더 유연하게 작성하려면 \`Sequence\`를 사용할 수도 있습니다.

\`\`\`python
from collections.abc import Sequence
from typing import TypeVar

T = TypeVar("T")


def first(items: Sequence[T]) -> T:
    return items[0]
\`\`\`

\`Sequence[T] -> T\`는 같은 요소 타입을 유지한다는 뜻입니다.

---

## 정답 9

\`\`\`python
from typing import Protocol

class Saver(Protocol):
    def save(self, data: str) -> None:
        ...


def save_report(saver: Saver, content: str) -> None:
    saver.save(content)
\`\`\`

이제 \`save()\` 메서드를 가진 객체라면 명시적으로 \`Saver\`를 상속하지 않아도 사용할 수 있습니다.

---

## 정답 10

\`\`\`python
from collections.abc import Iterable


def clean_names(names: Iterable[str]) -> list[str]:
    return [name.strip() for name in names]
\`\`\`

입력은 리스트뿐 아니라 반복 가능한 문자열 데이터면 되므로 \`Iterable[str]\`가 적절합니다. 반환값은 실제로 리스트를 만들기 때문에 \`list[str]\`로 구체적으로 표시합니다.

---

## 정답 11

\`\`\`python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class Result(Generic[T]):
    success: bool
    value: T | None = None
    error: str | None = None
\`\`\`

\`Result[int]\`, \`Result[str]\`, \`Result[OrderRow]\`처럼 여러 타입의 결과를 표현할 수 있습니다.

---

## 정답 12

\`Mapping[str, object]\`는 문자열 key와 임의의 object 값을 가진 읽기 중심 key-value 구조를 의미합니다.

이 함수는 \`user\`에서 값을 읽기만 하고 수정하지 않습니다. 따라서 반드시 일반 \`dict\`일 필요가 없습니다. key로 값을 조회할 수 있는 객체라면 충분합니다.

\`dict[str, object]\`보다 \`Mapping[str, object]\`을 사용하면 함수가 더 유연해지고, “이 함수는 입력 데이터를 수정하지 않는다”는 의도를 더 잘 표현할 수 있습니다.

---

# 9장 마무리

이번 장에서는 타입 힌트를 단순한 문법 표시가 아니라 코드 설계 도구로 다루었습니다.

고급 파이썬에서 타입 힌트는 다음 역할을 합니다.

\`\`\`text
함수의 입력과 출력 명확히 하기
복잡한 딕셔너리 구조 표현하기
콜백 함수의 형태 표현하기
반복 가능한 데이터와 수정 가능한 데이터를 구분하기
제네릭으로 타입 관계 유지하기
Protocol로 느슨한 결합 만들기
타입 검사 도구로 실행 전 오류 찾기
\`\`\`

이제 우리는 데이터 처리 코드에서 “무엇이 들어오고 무엇이 나가는지”를 훨씬 명확하게 표현할 수 있습니다.

다음 장에서는 **모듈, 패키지, 프로젝트 구조**를 다룹니다. 지금까지 배운 고급 문법과 타입 힌트를 실제 프로젝트 폴더 구조 안에서 어떻게 구성하고 관리할지 살펴보겠습니다.

---

# 참고 문서

- Python 공식 문서: \`typing\` — Support for type hints  
  https://docs.python.org/3/library/typing.html
- Python 공식 문서: \`collections.abc\` — Abstract Base Classes for Containers  
  https://docs.python.org/3/library/collections.abc.html
- mypy 공식 문서  
  https://mypy.readthedocs.io/
- Static Typing with Python  
  https://typing.python.org/
`;export{e as default};