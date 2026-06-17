var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-2 -->

# 9.2 고급 타입 표현

기초 타입 힌트만으로는 실제 코드를 충분히 표현하기 어려운 경우가 많습니다. 예를 들어 다음과 같은 상황을 생각해봅시다.

\`\`\`text
값이 문자열 또는 None일 수 있다.
인자로 특정 문자열 값만 허용하고 싶다.
함수를 인자로 받는 함수를 만들고 싶다.
리스트가 아니라 반복 가능한 모든 객체를 받고 싶다.
딕셔너리를 받지만 수정하지는 않을 것이다.
상수처럼 재할당하지 않을 값을 표현하고 싶다.
\`\`\`

이런 상황에서는 \`typing\` 모듈과 \`collections.abc\` 모듈에서 제공하는 타입 표현을 사용합니다.

---

## 9.2.1 Union과 \`|\`

하나의 값이 여러 타입 중 하나일 수 있을 때는 유니언 타입을 사용합니다.

Python 3.10 이상에서는 \`|\` 연산자를 사용해 간단히 표현할 수 있습니다.

\`\`\`python
def normalize_id(value: int | str) -> str:
    return str(value)
\`\`\`

이 함수는 정수 또는 문자열을 받을 수 있습니다.

\`\`\`python
print(normalize_id(100))
print(normalize_id("A-100"))
\`\`\`

예전 방식으로는 \`typing.Union\`을 사용했습니다.

\`\`\`python
from typing import Union

def normalize_id(value: Union[int, str]) -> str:
    return str(value)
\`\`\`

요즘 새 코드에서는 보통 \`int | str\` 형태가 더 간결합니다. 다만 프로젝트의 Python 버전이 3.9 이하라면 \`Union\` 문법을 사용해야 할 수 있습니다.

---

## 9.2.2 Optional

값이 특정 타입이거나 \`None\`일 수 있을 때는 \`Optional\`이라는 표현을 사용할 수 있습니다.

\`\`\`python
from typing import Optional

def find_user_email(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "user@example.com"
    return None
\`\`\`

\`Optional[str]\`은 다음과 같은 의미입니다.

\`\`\`python
str | None
\`\`\`

Python 3.10 이상에서는 보통 다음처럼 씁니다.

\`\`\`python
def find_user_email(user_id: int) -> str | None:
    if user_id == 1:
        return "user@example.com"
    return None
\`\`\`

중요한 점은 \`Optional[str]\`이 “인자를 생략할 수 있다”는 뜻이 아니라는 것입니다. \`Optional[str]\`은 “값이 \`str\` 또는 \`None\`일 수 있다”는 뜻입니다.

다음 함수에서 \`name\`은 생략할 수 없습니다.

\`\`\`python
def greet(name: str | None) -> str:
    if name is None:
        return "이름 없음"
    return f"안녕하세요, {name}님"
\`\`\`

인자를 생략 가능하게 만들려면 기본값을 지정해야 합니다.

\`\`\`python
def greet(name: str | None = None) -> str:
    if name is None:
        return "이름 없음"
    return f"안녕하세요, {name}님"
\`\`\`

---

## 9.2.3 Literal

\`Literal\`은 특정 값만 허용하고 싶을 때 사용합니다.

예를 들어 파일 모드가 다음 네 가지 중 하나만 가능하다고 해봅시다.

\`\`\`python
from typing import Literal

Mode = Literal["r", "w", "a", "rb"]

def open_file(path: str, mode: Mode) -> None:
    print(f"{path} 파일을 {mode} 모드로 엽니다.")
\`\`\`

이제 타입 검사 도구는 다음 호출을 정상으로 판단할 수 있습니다.

\`\`\`python
open_file("data.txt", "r")
open_file("data.txt", "w")
\`\`\`

하지만 다음 호출은 오타 가능성이 있다고 판단할 수 있습니다.

\`\`\`python
open_file("data.txt", "read")
\`\`\`

\`Literal\`은 특히 옵션 값, 상태 값, 정해진 문자열 코드에 유용합니다.

\`\`\`python
from typing import Literal

OrderStatus = Literal["pending", "paid", "cancelled", "shipped"]

def update_order_status(order_id: int, status: OrderStatus) -> None:
    print(order_id, status)
\`\`\`

실무에서는 다음처럼 상태값이 정해져 있는 경우가 많습니다.

\`\`\`text
주문 상태: pending, paid, cancelled, shipped
회원 등급: basic, silver, gold, vip
파일 형식: csv, json, xlsx
정렬 방향: asc, desc
\`\`\`

이런 값에 \`Literal\`을 사용하면 문자열 오타를 줄이는 데 도움이 됩니다.

---

## 9.2.4 Final

\`Final\`은 재할당하지 않을 값을 표현할 때 사용합니다.

\`\`\`python
from typing import Final

DEFAULT_TIMEOUT: Final[int] = 30
API_BASE_URL: Final[str] = "https://api.example.com"
\`\`\`

\`Final\`은 실행 중 재할당을 자동으로 막지는 않습니다. 하지만 타입 검사 도구는 다음과 같은 코드를 경고할 수 있습니다.

\`\`\`python
DEFAULT_TIMEOUT = 10  # 타입 검사 도구에서 경고 가능
\`\`\`

상수처럼 사용해야 하는 값은 대문자로 작성하는 관례와 함께 \`Final\`을 사용하면 의도가 더 명확해집니다.

\`\`\`python
from typing import Final

MAX_RETRY_COUNT: Final[int] = 3
DEFAULT_ENCODING: Final[str] = "utf-8"
\`\`\`

---

## 9.2.5 Any

\`Any\`는 “어떤 타입이든 가능하다”는 뜻입니다.

\`\`\`python
from typing import Any

def print_value(value: Any) -> None:
    print(value)
\`\`\`

\`Any\`는 편리하지만 남용하면 타입 힌트의 효과가 사라집니다. 다음 함수는 타입 힌트가 있어도 거의 정보를 주지 못합니다.

\`\`\`python
from typing import Any

def process(data: Any) -> Any:
    return data
\`\`\`

이 함수만 보면 \`data\`가 어떤 구조인지, 반환값이 어떤 타입인지 알 수 없습니다.

\`Any\`는 다음 상황에서 제한적으로 사용하는 것이 좋습니다.

\`\`\`text
외부 라이브러리의 타입을 알 수 없는 경우
아직 구조가 확정되지 않은 임시 코드
매우 다양한 타입을 그대로 전달해야 하는 래퍼 함수
점진적으로 타입 힌트를 도입하는 초기 단계
\`\`\`

실무에서는 \`Any\`를 완전히 금지하기보다, **경계 지점에서만 사용하고 내부 코드로 들어올수록 구체적인 타입으로 바꾸는 방식**이 좋습니다.

---

## 9.2.6 Callable

함수를 인자로 받는 함수는 \`Callable\`로 표현할 수 있습니다.

\`\`\`python
from collections.abc import Callable

def apply_discount(price: int, discount_func: Callable[[int], int]) -> int:
    return discount_func(price)
\`\`\`

\`Callable[[int], int]\`는 다음 뜻입니다.

\`\`\`text
정수 하나를 인자로 받고 정수를 반환하는 함수
\`\`\`

예를 들어 다음 함수는 조건을 만족합니다.

\`\`\`python
def ten_percent_off(price: int) -> int:
    return int(price * 0.9)

result = apply_discount(10000, ten_percent_off)
print(result)
\`\`\`

콜백 함수가 여러 인자를 받는 경우도 표현할 수 있습니다.

\`\`\`python
from collections.abc import Callable

def calculate(a: int, b: int, operator: Callable[[int, int], int]) -> int:
    return operator(a, b)


def add(a: int, b: int) -> int:
    return a + b


def multiply(a: int, b: int) -> int:
    return a * b

print(calculate(10, 20, add))
print(calculate(10, 20, multiply))
\`\`\`

인자의 개수가 정해져 있지 않거나 중요하지 않다면 \`Callable[..., str]\`처럼 쓸 수 있습니다.

\`\`\`python
from collections.abc import Callable

def run_and_format(func: Callable[..., str]) -> str:
    return func()
\`\`\`

하지만 \`Callable[..., str]\`는 인자 정보를 포기하는 표현입니다. 가능하면 구체적인 인자 목록을 적는 것이 좋습니다.

---

## 9.2.7 Iterable과 Iterator

반복 가능한 객체를 받을 때 꼭 \`list\`라고 적어야 할까요?

다음 함수는 숫자 목록의 합계를 구합니다.

\`\`\`python
def total(numbers: list[int]) -> int:
    return sum(numbers)
\`\`\`

이 함수는 리스트만 받을 수 있다는 의도를 줍니다. 하지만 실제로 \`sum()\`은 리스트뿐 아니라 튜플, 집합, 제너레이터도 처리할 수 있습니다.

\`\`\`python
print(sum([1, 2, 3]))
print(sum((1, 2, 3)))
print(sum({1, 2, 3}))
\`\`\`

이런 경우에는 \`Iterable\`이 더 적합합니다.

\`\`\`python
from collections.abc import Iterable

def total(numbers: Iterable[int]) -> int:
    return sum(numbers)
\`\`\`

\`Iterable[int]\`는 “정수를 하나씩 반복해서 꺼낼 수 있는 객체”라는 뜻입니다. 리스트인지 튜플인지 제너레이터인지는 중요하지 않습니다.

\`Iterator\`는 \`Iterable\`보다 더 구체적인 개념입니다. \`next()\`로 값을 하나씩 꺼낼 수 있는 객체입니다.

\`\`\`python
from collections.abc import Iterator

def count_up_to(n: int) -> Iterator[int]:
    current = 1
    while current <= n:
        yield current
        current += 1
\`\`\`

제너레이터 함수의 반환 타입은 보통 \`Iterator[T]\` 또는 \`Iterable[T]\`로 표현할 수 있습니다.

---

## 9.2.8 Sequence

\`Sequence\`는 순서가 있고 인덱싱과 길이 확인이 가능한 읽기 중심 컬렉션을 표현할 때 사용합니다.

리스트와 튜플은 모두 \`Sequence\`로 볼 수 있습니다.

\`\`\`python
from collections.abc import Sequence

def first_item(items: Sequence[str]) -> str:
    return items[0]
\`\`\`

이 함수는 리스트도 받을 수 있고 튜플도 받을 수 있습니다.

\`\`\`python
print(first_item(["A", "B", "C"]))
print(first_item(("A", "B", "C")))
\`\`\`

\`Sequence\`는 데이터를 수정하지 않고 읽기만 하는 함수의 인자 타입으로 적합합니다.

\`\`\`python
from collections.abc import Sequence

def average(scores: Sequence[int]) -> float:
    return sum(scores) / len(scores)
\`\`\`

반대로 함수 내부에서 \`append()\`처럼 리스트 전용 수정 메서드를 사용한다면 \`list[int]\`가 더 적합합니다.

\`\`\`python
def add_default_score(scores: list[int]) -> None:
    scores.append(0)
\`\`\`

정리하면 다음과 같습니다.

| 상황 | 추천 타입 |
|---|---|
| 반복만 하면 된다 | \`Iterable[T]\` |
| 인덱싱과 길이 확인이 필요하다 | \`Sequence[T]\` |
| 리스트를 직접 수정해야 한다 | \`list[T]\` |

---

## 9.2.9 Mapping

딕셔너리를 받는 함수도 항상 \`dict\`라고 적을 필요는 없습니다.

\`\`\`python
def get_user_name(user: dict[str, str]) -> str:
    return user["name"]
\`\`\`

이 함수는 딕셔너리에서 값을 읽기만 합니다. 꼭 일반 \`dict\`일 필요는 없습니다. key로 value를 조회할 수 있으면 충분합니다.

이럴 때는 \`Mapping\`이 더 적합합니다.

\`\`\`python
from collections.abc import Mapping

def get_user_name(user: Mapping[str, str]) -> str:
    return user["name"]
\`\`\`

\`Mapping\`은 읽기 중심의 key-value 구조를 나타냅니다.

함수 내부에서 딕셔너리를 수정해야 한다면 \`MutableMapping\`을 사용할 수 있습니다.

\`\`\`python
from collections.abc import MutableMapping

def add_default_role(user: MutableMapping[str, str]) -> None:
    user["role"] = "user"
\`\`\`

실무에서는 함수가 데이터를 수정하지 않는다면 \`Mapping\`을 사용하는 것이 좋습니다. 함수의 의도가 더 명확해지고, 더 다양한 객체를 받을 수 있기 때문입니다.

---

## 9.2.10 타입 별칭

타입이 길어지면 코드가 읽기 어려워집니다.

\`\`\`python
def summarize(data: list[dict[str, str | int | float]]) -> dict[str, float]:
    ...
\`\`\`

이럴 때 타입 별칭을 사용할 수 있습니다.

\`\`\`python
Row = dict[str, str | int | float]
Rows = list[Row]
Summary = dict[str, float]


def summarize(data: Rows) -> Summary:
    ...
\`\`\`

Python 3.12 이상에서는 \`type\` 문을 사용해 타입 별칭을 더 명확하게 만들 수 있습니다.

\`\`\`python
type Row = dict[str, str | int | float]
type Rows = list[Row]
type Summary = dict[str, float]
\`\`\`

프로젝트에서 Python 3.11 이하도 지원해야 한다면 단순 대입 또는 \`TypeAlias\`를 사용할 수 있습니다.

\`\`\`python
from typing import TypeAlias

Row: TypeAlias = dict[str, str | int | float]
Rows: TypeAlias = list[Row]
\`\`\`

타입 별칭은 특히 API 응답, 설정값, 복잡한 중첩 데이터에서 유용합니다.

---

## 9.2.11 \`type[C]\`

클래스 자체를 인자로 받는 함수도 있습니다.

다음 예제를 봅시다.

\`\`\`python
class User:
    def __init__(self, name: str) -> None:
        self.name = name


class AdminUser(User):
    pass
\`\`\`

어떤 클래스가 들어오면 그 클래스로 객체를 생성하는 함수를 만들 수 있습니다.

\`\`\`python
def create_user(user_class: type[User], name: str) -> User:
    return user_class(name)
\`\`\`

\`type[User]\`는 \`User\` 객체가 아니라 \`User\` 클래스 또는 그 하위 클래스를 받는다는 뜻입니다.

\`\`\`python
user = create_user(User, "홍길동")
admin = create_user(AdminUser, "관리자")
\`\`\`

이 표현은 팩토리 함수나 플러그인 구조에서 유용합니다.

---

## 9.2.12 Self

클래스 메서드가 자기 자신과 같은 타입을 반환할 때 \`Self\`를 사용할 수 있습니다.

\`\`\`python
from typing import Self

class Query:
    def __init__(self) -> None:
        self.conditions: list[str] = []

    def where(self, condition: str) -> Self:
        self.conditions.append(condition)
        return self
\`\`\`

이렇게 하면 메서드 체이닝에서 반환 타입을 더 정확하게 표현할 수 있습니다.

\`\`\`python
query = Query().where("age >= 20").where("active = true")
\`\`\`

상속 구조에서도 \`Self\`는 유용합니다.

\`\`\`python
from typing import Self

class BaseBuilder:
    def set_name(self, name: str) -> Self:
        self.name = name
        return self


class UserBuilder(BaseBuilder):
    def set_email(self, email: str) -> Self:
        self.email = email
        return self
\`\`\`

\`Self\`를 사용하면 자식 클래스에서 메서드 체이닝을 할 때도 반환 타입을 더 자연스럽게 유지할 수 있습니다.

---
`;export{e as default};