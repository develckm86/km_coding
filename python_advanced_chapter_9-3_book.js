var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-3 -->

# 9.3 제네릭

제네릭은 타입을 고정하지 않고, 사용하는 시점에 타입을 정할 수 있게 하는 방법입니다.

말로만 들으면 어렵지만, 핵심은 다음과 같습니다.

\`\`\`text
입력 타입과 반환 타입의 관계를 유지하고 싶을 때 제네릭을 사용한다.
\`\`\`

예를 들어 다음 함수는 리스트의 첫 번째 값을 반환합니다.

\`\`\`python
def first(items: list[int]) -> int:
    return items[0]
\`\`\`

이 함수는 정수 리스트에만 사용할 수 있습니다.

문자열 리스트에도 쓰고 싶다면 어떻게 해야 할까요?

\`\`\`python
def first_str(items: list[str]) -> str:
    return items[0]
\`\`\`

타입마다 함수를 따로 만들 수는 없습니다. 이럴 때 제네릭을 사용합니다.

---

## 9.3.1 TypeVar

\`TypeVar\`는 “아직 정해지지 않은 타입”을 의미하는 타입 변수입니다.

\`\`\`python
from typing import TypeVar

T = TypeVar("T")


def first(items: list[T]) -> T:
    return items[0]
\`\`\`

이 함수는 다음처럼 사용할 수 있습니다.

\`\`\`python
number = first([1, 2, 3])
name = first(["민수", "지영", "철수"])
\`\`\`

타입 검사 도구는 \`number\`를 \`int\`, \`name\`을 \`str\`로 추론할 수 있습니다.

여기서 중요한 점은 \`T\`가 입력과 반환 타입의 관계를 표현한다는 것입니다.

\`\`\`text
list[int]가 들어오면 int를 반환한다.
list[str]이 들어오면 str을 반환한다.
list[float]이 들어오면 float을 반환한다.
\`\`\`

---

## 9.3.2 제네릭 함수

제네릭 함수는 여러 타입에 대해 재사용할 수 있으면서도 타입 정보를 잃지 않는 함수입니다.

다음 함수는 두 값 중 첫 번째 값을 반환합니다.

\`\`\`python
from typing import TypeVar

T = TypeVar("T")


def choose_first(a: T, b: T) -> T:
    return a
\`\`\`

이 함수는 \`a\`와 \`b\`가 같은 타입이라는 관계를 표현합니다.

\`\`\`python
x = choose_first(10, 20)       # int
name = choose_first("A", "B") # str
\`\`\`

하지만 다음처럼 서로 다른 타입을 넣으면 타입 검사 도구가 경고할 수 있습니다.

\`\`\`python
value = choose_first(10, "A")
\`\`\`

물론 파이썬 실행 자체가 무조건 실패하는 것은 아닙니다. 타입 검사 도구가 “의도와 다를 수 있다”고 알려주는 것입니다.

---

## 9.3.3 Sequence와 TypeVar 함께 사용하기

리스트뿐 아니라 튜플, 문자열 등 순서가 있는 데이터에서 첫 번째 값을 가져오고 싶다면 \`Sequence\`를 사용할 수 있습니다.

\`\`\`python
from collections.abc import Sequence
from typing import TypeVar

T = TypeVar("T")


def first(items: Sequence[T]) -> T:
    return items[0]
\`\`\`

이 함수는 리스트와 튜플 모두에 사용할 수 있습니다.

\`\`\`python
print(first([1, 2, 3]))
print(first(("A", "B", "C")))
\`\`\`

\`Sequence[T] -> T\`라는 표현은 매우 강력합니다. “어떤 타입 T의 시퀀스가 들어오면, 그 안의 요소 타입 T를 반환한다”는 관계가 분명하게 드러납니다.

---

## 9.3.4 제네릭 클래스

클래스도 제네릭으로 만들 수 있습니다.

다음은 하나의 값을 담는 간단한 상자 클래스입니다.

\`\`\`python
from typing import Generic, TypeVar

T = TypeVar("T")


class Box(Generic[T]):
    def __init__(self, value: T) -> None:
        self.value = value

    def get(self) -> T:
        return self.value
\`\`\`

이제 \`Box[int]\`, \`Box[str]\`처럼 사용할 수 있습니다.

\`\`\`python
int_box = Box[int](10)
str_box = Box[str]("hello")

number = int_box.get()
text = str_box.get()
\`\`\`

\`Box[int]\`는 정수를 담는 상자이고, \`Box[str]\`는 문자열을 담는 상자입니다.

실무에서는 제네릭 클래스를 다음과 같은 상황에서 사용할 수 있습니다.

\`\`\`text
결과를 감싸는 Result 클래스
페이지네이션 응답 클래스
캐시 클래스
저장소 클래스
데이터 변환기 클래스
\`\`\`

---

## 9.3.5 Result 클래스 예제

실무 코드에서는 함수가 성공할 수도 있고 실패할 수도 있습니다. 이런 결과를 구조화해서 반환하고 싶을 때 \`Result\` 클래스를 만들 수 있습니다.

\`\`\`python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class Result(Generic[T]):
    success: bool
    data: T | None = None
    error: str | None = None
\`\`\`

이제 정수 결과, 문자열 결과, 딕셔너리 결과를 모두 표현할 수 있습니다.

\`\`\`python
def parse_price(value: str) -> Result[int]:
    try:
        return Result(success=True, data=int(value))
    except ValueError:
        return Result(success=False, error="정수로 변환할 수 없습니다.")
\`\`\`

이 함수의 반환 타입은 \`Result[int]\`입니다. 즉, 성공하면 \`data\`에 정수가 들어간다는 의도를 표현합니다.

---

## 9.3.6 bound

\`TypeVar\`에 상한을 줄 수 있습니다. 이를 bound라고 합니다.

다음 예제를 봅시다.

\`\`\`python
from typing import TypeVar

class User:
    def __init__(self, name: str) -> None:
        self.name = name


class AdminUser(User):
    pass


U = TypeVar("U", bound=User)


def rename_user(user: U, new_name: str) -> U:
    user.name = new_name
    return user
\`\`\`

\`U\`는 \`User\` 또는 \`User\`의 하위 타입이어야 합니다.

\`\`\`python
admin = AdminUser("관리자")
renamed = rename_user(admin, "새관리자")
\`\`\`

타입 검사 도구는 \`renamed\`를 단순히 \`User\`가 아니라 \`AdminUser\`로 유지할 수 있습니다.

bound는 “이 타입 또는 이 타입의 하위 타입만 허용한다”는 관계를 표현할 때 사용합니다.

---

## 9.3.7 constraints

\`TypeVar\`는 특정 타입 중 하나로 제한할 수도 있습니다.

\`\`\`python
from typing import TypeVar

Text = TypeVar("Text", str, bytes)


def first_char(value: Text) -> Text:
    return value[:1]
\`\`\`

이 함수는 \`str\` 또는 \`bytes\`만 받습니다.

\`\`\`python
print(first_char("hello"))
print(first_char(b"hello"))
\`\`\`

\`bound\`와 \`constraints\`는 비슷해 보이지만 다릅니다.

| 구분 | 의미 |
|---|---|
| \`bound=SomeType\` | \`SomeType\` 또는 그 하위 타입 허용 |
| \`TypeVar("T", A, B)\` | 정확히 A 또는 B 계열로 제한 |

대부분의 실무 코드에서는 기본 \`TypeVar\`만으로 충분합니다. \`bound\`와 \`constraints\`는 입력과 반환 타입 관계를 더 정교하게 표현해야 할 때 사용합니다.

---

## 9.3.8 Python 3.12 이후 제네릭 문법

Python 3.12부터는 제네릭 함수와 클래스를 더 간단하게 작성할 수 있는 문법이 도입되었습니다.

\`\`\`python
from collections.abc import Sequence


def first[T](items: Sequence[T]) -> T:
    return items[0]
\`\`\`

클래스도 다음처럼 작성할 수 있습니다.

\`\`\`python
class Box[T]:
    def __init__(self, value: T) -> None:
        self.value = value

    def get(self) -> T:
        return self.value
\`\`\`

다만 모든 학습자와 모든 프로젝트가 Python 3.12 이상을 사용하는 것은 아닙니다. 이 교재에서는 호환성을 위해 \`TypeVar\`와 \`Generic\`을 사용하는 기존 문법을 중심으로 설명하고, 새 문법은 “읽을 수 있는 수준”으로 소개합니다.

---

## 9.3.9 제네릭을 남용하지 않기

제네릭은 강력하지만 모든 함수에 사용할 필요는 없습니다.

다음 함수에는 제네릭이 필요하지 않습니다.

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b
\`\`\`

입력과 반환 타입이 명확하게 정수로 고정되어 있기 때문입니다.

제네릭은 다음 질문에 “예”라고 답할 수 있을 때 사용하는 것이 좋습니다.

\`\`\`text
이 함수나 클래스가 여러 타입에 대해 재사용되는가?
입력 타입과 반환 타입 사이의 관계를 보존해야 하는가?
내부에 담긴 요소 타입을 잃지 않아야 하는가?
\`\`\`

그렇지 않다면 구체적인 타입을 쓰는 것이 더 읽기 쉽습니다.

---
`;export{e as default};