var e=`# 9장. 타입 힌트 심화

8장에서 우리는 파이썬 객체가 언어 문법과 연결되는 방식을 살펴보았습니다. \`len()\`, \`in\`, \`[]\`, \`==\`, 함수 호출 같은 문법이 내부적으로 특수 메서드와 연결된다는 사실을 이해하면, 객체를 더 파이썬답게 설계할 수 있습니다.

이번 장에서는 코드의 **의도와 데이터 구조를 더 명확하게 표현하는 방법**을 다룹니다. 바로 타입 힌트입니다.

타입 힌트는 파이썬을 자바나 C#처럼 강한 정적 타입 언어로 바꾸는 기능이 아닙니다. 파이썬은 여전히 동적 타입 언어입니다. 즉, 실행 중에는 변수에 어떤 값이든 들어갈 수 있습니다. 타입 힌트는 실행 중에 자동으로 값을 검사하는 장치가 아니라, 사람과 도구에게 코드의 의도를 알려주는 표시입니다.

예를 들어 다음 함수를 봅시다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

이 함수는 \`price\`와 \`quantity\`가 정수이고, 반환값도 정수라는 의도를 드러냅니다. 파이썬이 이 힌트를 보고 자동으로 실행을 막지는 않습니다. 하지만 IDE, 타입 검사 도구, 코드 리뷰어는 이 힌트를 보고 훨씬 쉽게 코드를 이해할 수 있습니다.

고급 파이썬에서 타입 힌트가 중요한 이유는 단순히 “자료형을 적어두기 위해서”가 아닙니다. 타입 힌트는 다음 문제를 해결하는 데 도움을 줍니다.

\`\`\`text
이 함수는 어떤 데이터를 받는가?
이 함수는 어떤 값을 반환하는가?
이 딕셔너리는 어떤 key를 가져야 하는가?
이 객체는 어떤 메서드를 가지고 있어야 하는가?
이 함수는 어떤 형태의 콜백을 받을 수 있는가?
이 클래스는 어떤 타입의 데이터를 담는가?
\`\`\`

데이터분석 과정으로 넘어가면 CSV, JSON, API 응답, 설정값, 분석용 데이터 행처럼 구조가 있는 데이터를 많이 다루게 됩니다. 이때 타입 힌트를 잘 사용하면 데이터 처리 코드가 훨씬 안정적이고 읽기 쉬워집니다.

이번 장의 목표는 다음과 같습니다.

- 타입 힌트의 역할과 한계를 정확히 이해한다.
- \`Union\`, \`Optional\`, \`Literal\`, \`Final\`, \`Any\`, \`Callable\` 같은 고급 타입 표현을 사용할 수 있다.
- \`Iterable\`, \`Iterator\`, \`Sequence\`, \`Mapping\`의 차이를 이해하고 함수 인자 타입을 더 유연하게 설계할 수 있다.
- \`TypeVar\`와 제네릭을 사용해 입력 타입과 반환 타입의 관계를 표현할 수 있다.
- \`TypedDict\`로 딕셔너리 데이터의 구조를 표현할 수 있다.
- \`Protocol\`로 “특정 메서드를 가진 객체”를 표현할 수 있다.
- mypy, pyright 같은 타입 검사 도구의 역할을 이해한다.
- API 응답, CSV 행, 설정값, 데이터 처리 함수에 타입 힌트를 적용할 수 있다.

---

## 9.1 타입 힌트 복습

타입 힌트는 변수, 함수 매개변수, 함수 반환값, 클래스 속성 등에 자료형 정보를 적는 문법입니다.

기초 과정에서는 다음과 같은 형태를 배웠습니다.

\`\`\`python
name: str = "홍길동"
age: int = 30
height: float = 175.5
is_active: bool = True
\`\`\`

함수에는 매개변수와 반환값에 타입을 표시할 수 있습니다.

\`\`\`python
def greet(name: str) -> str:
    return f"안녕하세요, {name}님"
\`\`\`

\`name: str\`은 \`name\` 매개변수에 문자열이 들어오기를 기대한다는 뜻입니다. \`-> str\`은 이 함수가 문자열을 반환한다는 뜻입니다.

---

## 9.1.1 타입 힌트는 실행을 강제하지 않는다

중요한 점은 타입 힌트가 실행 중에 자동으로 타입을 강제하지 않는다는 것입니다.

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

print(add(10, 20))
print(add("A", "B"))
\`\`\`

위 함수에는 \`int\` 타입 힌트가 붙어 있지만, 파이썬은 실행 중에 \`"A"\`와 \`"B"\`가 들어오는 것을 자동으로 막지 않습니다. 두 문자열은 \`+\` 연산이 가능하므로 실행 결과는 다음과 같습니다.

\`\`\`text
30
AB
\`\`\`

그렇다면 타입 힌트는 의미가 없을까요? 그렇지 않습니다. 타입 힌트는 다음 도구와 상황에서 큰 효과를 냅니다.

\`\`\`text
IDE 자동완성
정적 타입 검사 도구
코드 리뷰
문서화
리팩터링
테스트 전 오류 발견
협업 시 의사소통
\`\`\`

타입 힌트는 파이썬 코드의 실행 방식을 바꾸는 기능이라기보다, **코드의 의도를 명확하게 만드는 설계 도구**입니다.

---

## 9.1.2 타입 힌트와 런타임 검증은 다르다

다음 코드를 봅시다.

\`\`\`python
def calculate_discount(price: int, rate: float) -> int:
    return int(price * rate)
\`\`\`

타입 힌트는 \`price\`가 정수이고 \`rate\`가 실수라는 의도를 표현합니다. 하지만 사용자가 문자열을 넣는 것을 실행 중에 자동으로 막지는 않습니다.

\`\`\`python
calculate_discount("10000", 0.1)  # 실행 중 오류 가능
\`\`\`

실행 중에 값을 검사하려면 별도의 검증 코드가 필요합니다.

\`\`\`python
def calculate_discount(price: int, rate: float) -> int:
    if not isinstance(price, int):
        raise TypeError("price는 int여야 합니다.")
    if not isinstance(rate, float):
        raise TypeError("rate는 float이어야 합니다.")

    return int(price * rate)
\`\`\`

정리하면 다음과 같습니다.

| 구분 | 역할 |
|---|---|
| 타입 힌트 | 코드의 의도를 표현한다 |
| 정적 타입 검사 도구 | 실행 전에 타입 오류 가능성을 찾아준다 |
| 런타임 검증 | 실행 중 실제 값을 검사한다 |

실무에서는 이 세 가지를 혼동하지 않는 것이 중요합니다.

---

## 9.1.3 기본 타입 힌트 복습

가장 기본적인 타입 힌트는 파이썬의 기본 자료형을 그대로 사용합니다.

\`\`\`python
def format_user(name: str, age: int, active: bool) -> str:
    status = "활성" if active else "비활성"
    return f"{name}({age}) - {status}"
\`\`\`

반환값이 없는 함수는 \`None\`을 사용합니다.

\`\`\`python
def print_log(message: str) -> None:
    print(f"[LOG] {message}")
\`\`\`

\`None\`은 “반환하는 값이 없다”는 의도를 표시할 때 자주 사용됩니다.

---

## 9.1.4 컬렉션 타입 힌트 복습

리스트, 딕셔너리, 튜플, 집합처럼 여러 값을 담는 자료형은 내부 요소의 타입까지 함께 표시하는 것이 좋습니다.

\`\`\`python
names: list[str] = ["민수", "지영", "철수"]
prices: list[int] = [10000, 20000, 15000]

user: dict[str, str] = {
    "name": "홍길동",
    "email": "hong@example.com",
}

tags: set[str] = {"python", "data", "api"}
point: tuple[int, int] = (10, 20)
\`\`\`

딕셔너리는 \`dict[key타입, value타입]\` 형태로 작성합니다.

\`\`\`python
scores: dict[str, int] = {
    "math": 90,
    "english": 85,
}
\`\`\`

튜플은 위치마다 타입이 다를 수 있습니다.

\`\`\`python
user_row: tuple[int, str, str] = (1, "홍길동", "hong@example.com")
\`\`\`

같은 타입의 값이 길이에 제한 없이 들어가는 튜플은 다음과 같이 씁니다.

\`\`\`python
numbers: tuple[int, ...] = (1, 2, 3, 4, 5)
\`\`\`

\`...\`은 “이 타입의 값이 여러 개 올 수 있다”는 의미입니다.

---

## 9.1.5 타입 힌트가 특히 유용한 상황

타입 힌트는 모든 코드에 무작정 많이 붙인다고 좋은 것은 아닙니다. 특히 다음 상황에서 효과가 큽니다.

\`\`\`text
함수의 입력과 출력이 중요한 경우
여러 사람이 함께 사용하는 함수인 경우
딕셔너리 구조가 복잡한 경우
API 응답을 처리하는 경우
CSV 또는 JSON 데이터를 처리하는 경우
클래스 간 의존 관계가 있는 경우
테스트 코드를 작성해야 하는 경우
\`\`\`

예를 들어 다음 함수는 타입 힌트가 없으면 어떤 형태의 데이터를 받는지 바로 알기 어렵습니다.

\`\`\`python
def summarize_orders(orders):
    total = 0
    for order in orders:
        total += order["amount"]
    return total
\`\`\`

타입 힌트를 붙이면 의도가 훨씬 명확해집니다.

\`\`\`python
def summarize_orders(orders: list[dict[str, int]]) -> int:
    total = 0
    for order in orders:
        total += order["amount"]
    return total
\`\`\`

하지만 이 표현에도 한계가 있습니다. \`dict[str, int]\`는 모든 key가 문자열이고 모든 value가 정수라는 뜻일 뿐, 반드시 \`"amount"\`라는 key가 있어야 한다는 뜻은 아닙니다. 이런 경우 뒤에서 배울 \`TypedDict\`가 더 적합합니다.

---

## 9.2 고급 타입 표현

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

## 9.3 제네릭

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

## 9.4 TypedDict

파이썬에서 실무 데이터를 다루다 보면 딕셔너리를 많이 사용합니다.

\`\`\`python
user = {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "active": True,
}
\`\`\`

이런 딕셔너리에 \`dict[str, object]\` 또는 \`dict[str, str | int | bool]\` 같은 타입을 붙일 수는 있습니다.

\`\`\`python
user: dict[str, str | int | bool] = {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "active": True,
}
\`\`\`

하지만 이 표현은 부족합니다. 왜냐하면 다음을 설명하지 못하기 때문입니다.

\`\`\`text
id key는 반드시 있어야 한다.
name key는 문자열이어야 한다.
email key는 문자열이어야 한다.
active key는 불리언이어야 한다.
각 key마다 value 타입이 다르다.
\`\`\`

이럴 때 사용하는 것이 \`TypedDict\`입니다.

---

## 9.4.1 TypedDict 기본 문법

\`TypedDict\`는 딕셔너리의 key와 value 타입을 구조적으로 표현합니다.

\`\`\`python
from typing import TypedDict

class UserRow(TypedDict):
    id: int
    name: str
    email: str
    active: bool
\`\`\`

이제 다음처럼 사용할 수 있습니다.

\`\`\`python
user: UserRow = {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "active": True,
}
\`\`\`

타입 검사 도구는 key가 빠졌거나 value 타입이 맞지 않는 경우 경고할 수 있습니다.

\`\`\`python
bad_user: UserRow = {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    # active가 빠짐
}
\`\`\`

\`TypedDict\`는 딕셔너리를 클래스처럼 바꾸는 기능이 아닙니다. 실행 중 실제 값은 여전히 일반 딕셔너리입니다.

\`\`\`python
print(type(user))  # <class 'dict'>
\`\`\`

즉, \`TypedDict\`는 딕셔너리 구조를 타입 힌트로 표현하는 도구입니다.

---

## 9.4.2 선택 key

모든 key가 항상 필요한 것은 아닙니다.

예를 들어 사용자 정보에서 \`phone\`은 있을 수도 있고 없을 수도 있습니다.

\`\`\`python
from typing import NotRequired, TypedDict

class UserRow(TypedDict):
    id: int
    name: str
    email: str
    phone: NotRequired[str]
\`\`\`

이제 \`phone\` key는 생략할 수 있습니다.

\`\`\`python
user1: UserRow = {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
}

user2: UserRow = {
    "id": 2,
    "name": "김영희",
    "email": "kim@example.com",
    "phone": "010-1234-5678",
}
\`\`\`

\`NotRequired[str]\`는 “이 key는 없어도 되지만, 있다면 문자열이어야 한다”는 뜻입니다.

---

## 9.4.3 total=False

선택 key가 많은 경우 \`total=False\`를 사용할 수 있습니다.

\`\`\`python
from typing import TypedDict

class UserPatch(TypedDict, total=False):
    name: str
    email: str
    active: bool
\`\`\`

이 타입은 사용자 정보 일부만 수정하는 데이터에 적합합니다.

\`\`\`python
patch1: UserPatch = {"name": "새이름"}
patch2: UserPatch = {"active": False}
patch3: UserPatch = {}
\`\`\`

\`total=False\`는 모든 key를 기본적으로 선택 사항으로 만듭니다.

---

## 9.4.4 Required와 NotRequired 함께 사용하기

어떤 key는 반드시 필요하고 어떤 key는 선택 사항일 때는 \`Required\`와 \`NotRequired\`를 사용할 수 있습니다.

\`\`\`python
from typing import NotRequired, Required, TypedDict

class ProductRow(TypedDict, total=False):
    id: Required[int]
    name: Required[str]
    price: Required[int]
    category: NotRequired[str]
    description: NotRequired[str]
\`\`\`

이 타입은 \`id\`, \`name\`, \`price\`는 반드시 필요하고, \`category\`, \`description\`은 선택 사항임을 나타냅니다.

\`\`\`python
product: ProductRow = {
    "id": 100,
    "name": "키보드",
    "price": 30000,
}
\`\`\`

---

## 9.4.5 중첩 TypedDict

API 응답이나 JSON 데이터는 중첩 구조를 가지는 경우가 많습니다.

\`\`\`python
from typing import TypedDict

class Address(TypedDict):
    city: str
    street: str


class UserProfile(TypedDict):
    id: int
    name: str
    address: Address
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
profile: UserProfile = {
    "id": 1,
    "name": "홍길동",
    "address": {
        "city": "Seoul",
        "street": "Teheran-ro",
    },
}
\`\`\`

이렇게 표현하면 중첩 JSON 구조도 더 명확하게 다룰 수 있습니다.

---

## 9.4.6 리스트 안의 TypedDict

CSV를 읽거나 API 목록 응답을 처리할 때는 딕셔너리 리스트를 많이 사용합니다.

\`\`\`python
from typing import TypedDict

class OrderRow(TypedDict):
    order_id: int
    user_id: int
    amount: int
    status: str


orders: list[OrderRow] = [
    {"order_id": 1, "user_id": 10, "amount": 30000, "status": "paid"},
    {"order_id": 2, "user_id": 20, "amount": 15000, "status": "pending"},
]
\`\`\`

이제 주문 목록을 처리하는 함수도 더 명확하게 작성할 수 있습니다.

\`\`\`python
def total_paid_amount(orders: list[OrderRow]) -> int:
    total = 0
    for order in orders:
        if order["status"] == "paid":
            total += order["amount"]
    return total
\`\`\`

딕셔너리의 key 이름과 value 타입이 명확해지므로 코드 자동완성과 오류 예방에 도움이 됩니다.

---

## 9.4.7 TypedDict와 런타임 검증

\`TypedDict\`는 실행 중에 값을 자동 검사하지 않습니다.

\`\`\`python
from typing import TypedDict

class UserRow(TypedDict):
    id: int
    name: str

user: UserRow = {"id": "wrong", "name": 123}
\`\`\`

타입 검사 도구는 위 코드를 경고할 수 있지만, 파이썬 실행 자체는 딕셔너리를 만드는 것을 막지 않습니다.

외부에서 들어온 데이터를 실제로 검증하려면 별도의 검증 코드가 필요합니다.

\`\`\`python
def validate_user_row(data: dict[str, object]) -> bool:
    return (
        isinstance(data.get("id"), int)
        and isinstance(data.get("name"), str)
    )
\`\`\`

실무에서는 보통 다음 흐름으로 처리합니다.

\`\`\`text
외부 데이터 수집
런타임 검증
검증된 데이터를 TypedDict 타입으로 다루기
내부 처리 함수에 전달
\`\`\`

타입 힌트와 데이터 검증은 서로 경쟁하는 개념이 아니라 함께 사용하는 도구입니다.

---

## 9.4.8 TypedDict 사용 기준

\`TypedDict\`는 다음 상황에 적합합니다.

\`\`\`text
딕셔너리의 key가 정해져 있다.
key마다 value 타입이 다르다.
API 응답 구조를 표현하고 싶다.
CSV 한 행의 구조를 표현하고 싶다.
설정값 구조를 표현하고 싶다.
클래스로 만들기에는 가볍게 유지하고 싶다.
\`\`\`

반대로 다음 상황에서는 일반 클래스나 \`dataclass\`가 더 나을 수 있습니다.

\`\`\`text
데이터와 함께 메서드가 필요하다.
값 검증을 객체 생성 시점에 하고 싶다.
불변 객체로 다루고 싶다.
비즈니스 로직을 함께 묶고 싶다.
\`\`\`

예를 들어 단순 API 응답은 \`TypedDict\`가 좋습니다.

\`\`\`python
class ApiUser(TypedDict):
    id: int
    name: str
    email: str
\`\`\`

하지만 사용자 객체가 등급 변경, 권한 검사 같은 기능을 가져야 한다면 클래스가 더 적합합니다.

\`\`\`python
class User:
    def __init__(self, id: int, name: str, email: str) -> None:
        self.id = id
        self.name = name
        self.email = email

    def can_access_admin(self) -> bool:
        return self.email.endswith("@company.com")
\`\`\`

---

## 9.5 Protocol

\`Protocol\`은 “이런 메서드나 속성을 가진 객체라면 사용할 수 있다”는 구조적 타입을 표현합니다.

파이썬에는 덕 타이핑이라는 사고방식이 있습니다.

\`\`\`text
오리처럼 걷고 오리처럼 꽥꽥거리면 오리로 취급한다.
\`\`\`

파이썬식으로 바꾸면 다음과 같습니다.

\`\`\`text
어떤 객체가 필요한 메서드를 가지고 있으면 그 객체로 사용할 수 있다.
\`\`\`

예를 들어 어떤 객체가 \`save()\` 메서드를 가지고 있으면 저장 가능한 객체로 볼 수 있습니다. 그 객체가 어떤 클래스를 상속했는지는 중요하지 않을 수 있습니다.

---

## 9.5.1 Protocol 기본 문법

다음은 저장 가능한 객체를 표현하는 \`Protocol\`입니다.

\`\`\`python
from typing import Protocol

class Saver(Protocol):
    def save(self, data: str) -> None:
        ...
\`\`\`

이제 \`save()\` 메서드를 가진 객체는 \`Saver\`처럼 사용할 수 있습니다.

\`\`\`python
class FileSaver:
    def save(self, data: str) -> None:
        print(f"파일에 저장: {data}")


class DatabaseSaver:
    def save(self, data: str) -> None:
        print(f"DB에 저장: {data}")
\`\`\`

함수는 \`Saver\` 타입을 받을 수 있습니다.

\`\`\`python
def save_report(saver: Saver, content: str) -> None:
    saver.save(content)
\`\`\`

사용할 때는 다음처럼 전달합니다.

\`\`\`python
save_report(FileSaver(), "보고서 내용")
save_report(DatabaseSaver(), "보고서 내용")
\`\`\`

\`FileSaver\`와 \`DatabaseSaver\`가 \`Saver\`를 명시적으로 상속하지 않아도, 필요한 메서드 구조를 가지고 있으면 타입 검사 도구가 호환 가능하다고 판단할 수 있습니다.

---

## 9.5.2 Protocol과 ABC의 차이

추상 클래스는 명시적인 상속 관계를 사용합니다.

\`\`\`python
from abc import ABC, abstractmethod

class SaverBase(ABC):
    @abstractmethod
    def save(self, data: str) -> None:
        pass


class FileSaver(SaverBase):
    def save(self, data: str) -> None:
        print(data)
\`\`\`

이 방식은 “반드시 이 부모 클래스를 상속해야 한다”는 명시적인 구조입니다.

반면 \`Protocol\`은 “필요한 메서드만 가지고 있으면 된다”는 구조입니다.

\`\`\`python
from typing import Protocol

class Saver(Protocol):
    def save(self, data: str) -> None:
        ...
\`\`\`

비교하면 다음과 같습니다.

| 구분 | ABC | Protocol |
|---|---|---|
| 관계 방식 | 명시적 상속 | 구조적 호환 |
| 목적 | 공통 부모와 구현 강제 | 필요한 형태를 표현 |
| 런타임 영향 | 실제 상속 구조 있음 | 주로 타입 검사 용도 |
| 적합한 경우 | 프레임워크 내부 구조, 강한 계약 | 느슨한 결합, 덕 타이핑 |

실무에서는 둘 다 사용할 수 있습니다. 중요한 것은 어떤 방식이 코드 구조를 더 단순하게 만드는지 판단하는 것입니다.

---

## 9.5.3 Protocol로 데이터 처리기 표현하기

데이터분석 전 단계에서는 데이터를 변환하는 객체를 자주 만듭니다.

\`\`\`python
from typing import Protocol

class Transformer(Protocol):
    def transform(self, row: dict[str, object]) -> dict[str, object]:
        ...
\`\`\`

이제 다양한 변환기를 만들 수 있습니다.

\`\`\`python
class StripNameTransformer:
    def transform(self, row: dict[str, object]) -> dict[str, object]:
        new_row = row.copy()
        name = new_row.get("name")
        if isinstance(name, str):
            new_row["name"] = name.strip()
        return new_row


class AddSourceTransformer:
    def transform(self, row: dict[str, object]) -> dict[str, object]:
        new_row = row.copy()
        new_row["source"] = "api"
        return new_row
\`\`\`

파이프라인 함수는 \`Transformer\` 목록을 받을 수 있습니다.

\`\`\`python
from collections.abc import Iterable


def apply_transformers(
    row: dict[str, object],
    transformers: Iterable[Transformer],
) -> dict[str, object]:
    result = row
    for transformer in transformers:
        result = transformer.transform(result)
    return result
\`\`\`

이 구조의 장점은 변환기 클래스들이 같은 부모를 상속하지 않아도 된다는 것입니다. \`transform()\` 메서드만 가지고 있으면 됩니다.

---

## 9.5.4 속성을 가진 Protocol

\`Protocol\`은 메서드뿐 아니라 속성도 표현할 수 있습니다.

\`\`\`python
from typing import Protocol

class HasName(Protocol):
    name: str


def print_name(obj: HasName) -> None:
    print(obj.name)
\`\`\`

다음 클래스는 \`name\` 속성을 가지고 있으므로 \`HasName\`처럼 사용할 수 있습니다.

\`\`\`python
class User:
    def __init__(self, name: str) -> None:
        self.name = name


class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price


print_name(User("홍길동"))
print_name(Product("키보드", 30000))
\`\`\`

이런 표현은 “이 객체가 어떤 클래스인지”보다 “이 객체가 어떤 속성을 제공하는지”가 더 중요할 때 유용합니다.

---

## 9.5.5 runtime_checkable

기본적으로 \`Protocol\`은 정적 타입 검사 도구를 위한 기능입니다. \`isinstance()\`로 검사하려면 \`@runtime_checkable\`을 붙여야 합니다.

\`\`\`python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Saver(Protocol):
    def save(self, data: str) -> None:
        ...


class FileSaver:
    def save(self, data: str) -> None:
        print(data)


saver = FileSaver()
print(isinstance(saver, Saver))
\`\`\`

주의할 점이 있습니다. 런타임에서 \`Protocol\` 검사는 주로 필요한 속성이나 메서드가 존재하는지만 확인합니다. 메서드의 매개변수 타입과 반환 타입까지 정교하게 검사하는 용도는 아닙니다.

따라서 \`@runtime_checkable\`은 필요한 경우에만 제한적으로 사용하고, 대부분의 타입 안정성은 정적 타입 검사 도구에 맡기는 것이 좋습니다.

---

## 9.5.6 Protocol 사용 기준

\`Protocol\`은 다음 상황에 적합합니다.

\`\`\`text
특정 부모 클래스를 강제하고 싶지 않다.
필요한 메서드나 속성만 표현하고 싶다.
객체 간 결합도를 낮추고 싶다.
테스트용 가짜 객체를 쉽게 넣고 싶다.
플러그인 구조를 만들고 싶다.
데이터 처리 파이프라인의 각 단계를 교체 가능하게 만들고 싶다.
\`\`\`

예를 들어 API 클라이언트를 사용하는 서비스가 있다고 합시다.

\`\`\`python
from typing import Protocol

class UserClient(Protocol):
    def get_user(self, user_id: int) -> dict[str, object]:
        ...


class UserService:
    def __init__(self, client: UserClient) -> None:
        self.client = client

    def get_user_name(self, user_id: int) -> str:
        user = self.client.get_user(user_id)
        name = user.get("name")
        return name if isinstance(name, str) else ""
\`\`\`

실제 운영 환경에서는 진짜 API 클라이언트를 넣을 수 있고, 테스트에서는 가짜 클라이언트를 넣을 수 있습니다.

\`\`\`python
class FakeUserClient:
    def get_user(self, user_id: int) -> dict[str, object]:
        return {"id": user_id, "name": "테스트 사용자"}
\`\`\`

이렇게 하면 테스트하기 쉬운 구조를 만들 수 있습니다.

---

## 9.6 타입 검사 도구

타입 힌트는 그 자체로도 문서 역할을 하지만, 타입 검사 도구와 함께 사용할 때 훨씬 강력해집니다.

대표적인 타입 검사 도구는 다음과 같습니다.

\`\`\`text
mypy
pyright
\`\`\`

이 도구들은 코드를 실행하지 않고 타입 힌트를 바탕으로 오류 가능성을 찾아줍니다.

---

## 9.6.1 정적 타입 검사란?

정적 타입 검사는 프로그램을 실행하기 전에 코드의 타입 관계를 분석하는 과정입니다.

다음 코드를 생각해봅시다.

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b


result = add(10, "20")
\`\`\`

파이썬은 이 파일을 실행하기 전에는 오류를 내지 않습니다. 실행 중에 \`10 + "20"\`을 만나야 오류가 발생합니다.

하지만 타입 검사 도구는 실행 전에 다음과 같은 문제를 발견할 수 있습니다.

\`\`\`text
두 번째 인자로 str이 전달되었지만, 함수는 int를 기대한다.
\`\`\`

이것이 정적 타입 검사의 장점입니다.

---

## 9.6.2 mypy 설치와 실행

\`mypy\`는 널리 사용되는 파이썬 정적 타입 검사 도구입니다.

설치는 다음처럼 할 수 있습니다.

\`\`\`bash
pip install mypy
\`\`\`

예를 들어 \`example.py\` 파일이 있다고 합시다.

\`\`\`python
# example.py

def add(a: int, b: int) -> int:
    return a + b


result = add(10, "20")
\`\`\`

터미널에서 다음 명령을 실행합니다.

\`\`\`bash
mypy example.py
\`\`\`

그러면 타입 검사 결과를 확인할 수 있습니다.

프로젝트 전체를 검사하려면 폴더를 지정할 수 있습니다.

\`\`\`bash
mypy src
\`\`\`

---

## 9.6.3 pyright 개요

\`pyright\`는 Microsoft에서 만든 정적 타입 검사 도구입니다. VS Code의 Pylance와도 관련이 깊습니다.

설치 방식은 환경에 따라 다르지만, 일반적으로 Node.js 기반 도구로 사용되거나 VS Code 확장을 통해 자연스럽게 접하게 됩니다.

명령행에서 사용하는 경우에는 다음과 같은 흐름을 가집니다.

\`\`\`bash
pyright
\`\`\`

\`pyright\`는 빠른 검사 속도와 IDE 연동 측면에서 장점이 있습니다. 수업에서는 반드시 mypy와 pyright를 모두 깊게 다룰 필요는 없습니다. 중요한 것은 타입 힌트가 단순 주석이 아니라 도구와 연결되어 오류를 미리 찾는 데 사용될 수 있다는 점입니다.

---

## 9.6.4 타입 검사 설정

타입 검사 도구는 설정을 통해 검사 강도를 조절할 수 있습니다.

예를 들어 mypy는 \`pyproject.toml\`에 설정을 둘 수 있습니다.

\`\`\`toml
[tool.mypy]
python_version = "3.12"
strict = true
warn_return_any = true
warn_unused_ignores = true
\`\`\`

처음부터 \`strict = true\`로 시작하면 기존 코드에서 경고가 너무 많이 나올 수 있습니다. 실무에서는 다음처럼 단계적으로 도입하는 편이 좋습니다.

\`\`\`text
1단계: 새로 작성하는 함수에만 타입 힌트 붙이기
2단계: 핵심 모듈부터 mypy 검사하기
3단계: Any 사용 줄이기
4단계: strict 옵션 일부 적용하기
5단계: CI에서 타입 검사 자동 실행하기
\`\`\`

---

## 9.6.5 타입 오류를 고치는 방식

타입 검사 도구가 오류를 알려준다고 해서 무조건 타입 힌트만 고치면 되는 것은 아닙니다.

다음 코드를 봅시다.

\`\`\`python
def parse_price(value: str) -> int:
    return value
\`\`\`

반환 타입은 \`int\`인데 실제로는 \`str\`을 반환합니다. 이때 해결 방법은 두 가지처럼 보일 수 있습니다.

첫 번째는 타입 힌트를 바꾸는 것입니다.

\`\`\`python
def parse_price(value: str) -> str:
    return value
\`\`\`

두 번째는 실제 로직을 고치는 것입니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)
\`\`\`

어떤 것이 맞을까요? 함수의 의도에 따라 다릅니다. 함수 이름이 \`parse_price\`이고 가격 문자열을 정수로 바꾸는 역할이라면 두 번째가 맞습니다.

타입 오류를 고칠 때는 항상 다음 질문을 해야 합니다.

\`\`\`text
타입 힌트가 잘못되었는가?
코드 로직이 잘못되었는가?
함수 이름과 실제 동작이 어긋났는가?
입력 데이터 검증이 부족한가?
\`\`\`

---

## 9.6.6 \`# type: ignore\`는 신중하게 사용하기

타입 검사 도구의 경고를 무시하고 싶을 때 \`# type: ignore\`를 사용할 수 있습니다.

\`\`\`python
value = external_library_call()  # type: ignore
\`\`\`

하지만 이것을 남용하면 타입 검사의 의미가 약해집니다. 가능한 한 다음 순서로 해결하는 것이 좋습니다.

\`\`\`text
1. 타입 힌트를 더 정확하게 고친다.
2. 데이터 검증 코드를 추가한다.
3. 타입 별칭이나 TypedDict를 사용해 구조를 표현한다.
4. Protocol로 필요한 메서드 구조를 표현한다.
5. 정말 불가피한 경우에만 type: ignore를 사용한다.
\`\`\`

\`type: ignore\`를 사용할 때는 이유를 주석으로 남기는 것이 좋습니다.

\`\`\`python
value = external_library_call()  # type: ignore[no-untyped-call]  # 외부 라이브러리에 타입 정보가 없음
\`\`\`

---

## 9.7 실무 활용

이번 절에서는 고급 타입 힌트를 실제 데이터 처리 코드에 어떻게 적용할 수 있는지 살펴봅니다.

데이터분석 과정으로 넘어가기 전 단계에서 자주 만나는 데이터는 다음과 같습니다.

\`\`\`text
API 응답 JSON
CSV 한 행
설정값
데이터 검증 결과
데이터 변환 함수
저장소 객체
\`\`\`

이런 데이터에 타입 힌트를 붙이면 분석 코드로 넘기기 전 단계가 더 안정적이 됩니다.

---

## 9.7.1 API 응답 타입 정의

API에서 사용자 목록을 받아온다고 가정해봅시다.

응답 구조는 다음과 같습니다.

\`\`\`json
{
  "users": [
    {"id": 1, "name": "홍길동", "email": "hong@example.com"},
    {"id": 2, "name": "김영희", "email": "kim@example.com"}
  ],
  "next_page": null
}
\`\`\`

이 구조를 \`TypedDict\`로 표현할 수 있습니다.

\`\`\`python
from typing import TypedDict

class ApiUser(TypedDict):
    id: int
    name: str
    email: str


class UserListResponse(TypedDict):
    users: list[ApiUser]
    next_page: int | None
\`\`\`

이제 API 응답을 처리하는 함수의 타입이 명확해집니다.

\`\`\`python
def extract_emails(response: UserListResponse) -> list[str]:
    return [user["email"] for user in response["users"]]
\`\`\`

타입 힌트가 없으면 \`response["users"]\` 안에 어떤 구조가 들어있는지 코드를 읽는 사람이 추측해야 합니다. \`TypedDict\`를 사용하면 구조가 문서처럼 드러납니다.

---

## 9.7.2 CSV 행 타입 정의

CSV 파일을 읽으면 보통 처음에는 문자열 중심의 딕셔너리로 들어옵니다.

\`\`\`python
raw_row = {
    "order_id": "1001",
    "user_id": "10",
    "amount": "30000",
    "status": "paid",
}
\`\`\`

원본 행과 정제된 행의 타입을 나누면 좋습니다.

\`\`\`python
from typing import Literal, TypedDict

class RawOrderRow(TypedDict):
    order_id: str
    user_id: str
    amount: str
    status: str


OrderStatus = Literal["pending", "paid", "cancelled"]

class OrderRow(TypedDict):
    order_id: int
    user_id: int
    amount: int
    status: OrderStatus
\`\`\`

변환 함수는 다음처럼 작성할 수 있습니다.

\`\`\`python
def parse_order_row(row: RawOrderRow) -> OrderRow:
    status = row["status"]
    if status not in {"pending", "paid", "cancelled"}:
        raise ValueError(f"잘못된 주문 상태: {status}")

    return {
        "order_id": int(row["order_id"]),
        "user_id": int(row["user_id"]),
        "amount": int(row["amount"]),
        "status": status,  # 타입 검사 도구에 따라 추가 처리가 필요할 수 있음
    }
\`\`\`

실무에서는 외부 데이터가 항상 깨끗하지 않습니다. 원본 타입과 정제 후 타입을 분리하면 데이터 처리 흐름이 훨씬 분명해집니다.

---

## 9.7.3 설정값 타입 정의

설정값도 구조가 정해져 있다면 \`TypedDict\`로 표현할 수 있습니다.

\`\`\`python
from typing import NotRequired, TypedDict

class AppConfig(TypedDict):
    input_path: str
    output_path: str
    encoding: NotRequired[str]
    retry_count: NotRequired[int]
\`\`\`

설정값을 사용하는 함수는 다음처럼 작성할 수 있습니다.

\`\`\`python
def get_encoding(config: AppConfig) -> str:
    return config.get("encoding", "utf-8")
\`\`\`

설정값이 복잡해지고 검증 로직이 많아지면 \`dataclass\`로 바꾸는 것도 좋은 선택입니다.

\`\`\`python
from dataclasses import dataclass

@dataclass
class AppConfig:
    input_path: str
    output_path: str
    encoding: str = "utf-8"
    retry_count: int = 3
\`\`\`

\`TypedDict\`와 \`dataclass\` 중 무엇을 사용할지는 데이터의 성격에 따라 결정합니다.

| 상황 | 추천 |
|---|---|
| 외부 JSON 구조를 그대로 표현 | \`TypedDict\` |
| 단순 딕셔너리 구조 문서화 | \`TypedDict\` |
| 객체 생성 시 검증 또는 기본값 필요 | \`dataclass\` |
| 메서드가 필요한 데이터 객체 | 클래스 또는 \`dataclass\` |

---

## 9.7.4 데이터 처리 함수 타입 설계

데이터 처리 함수는 입력과 출력 타입이 명확해야 합니다.

다음 함수는 타입 힌트가 부족합니다.

\`\`\`python
def clean_rows(rows):
    result = []
    for row in rows:
        row["name"] = row["name"].strip()
        result.append(row)
    return result
\`\`\`

이 함수는 여러 가지 질문을 남깁니다.

\`\`\`text
rows는 리스트인가?
row는 딕셔너리인가?
name key는 항상 있는가?
함수는 원본을 수정하는가?
반환값은 새 리스트인가?
\`\`\`

타입 힌트를 붙여보겠습니다.

\`\`\`python
from collections.abc import Iterable
from typing import TypedDict

class CustomerRow(TypedDict):
    id: int
    name: str
    email: str


def clean_customer_rows(rows: Iterable[CustomerRow]) -> list[CustomerRow]:
    result: list[CustomerRow] = []
    for row in rows:
        result.append({
            "id": row["id"],
            "name": row["name"].strip(),
            "email": row["email"].strip().lower(),
        })
    return result
\`\`\`

이 함수는 다음 의도를 명확히 표현합니다.

\`\`\`text
CustomerRow를 반복 가능한 형태로 받는다.
원본을 직접 수정하지 않는다.
정제된 CustomerRow 리스트를 반환한다.
name과 email은 문자열이다.
\`\`\`

이처럼 타입 힌트는 코드의 설계 의도를 드러냅니다.

---

## 9.7.5 Protocol을 사용한 저장소 교체

데이터 처리 결과를 CSV에 저장할 수도 있고, 데이터베이스에 저장할 수도 있습니다. 저장 방식이 바뀌어도 처리 로직은 그대로 두고 싶다면 \`Protocol\`을 사용할 수 있습니다.

\`\`\`python
from typing import Protocol, TypedDict

class OrderRow(TypedDict):
    order_id: int
    user_id: int
    amount: int
    status: str


class OrderRepository(Protocol):
    def save_many(self, orders: list[OrderRow]) -> None:
        ...
\`\`\`

CSV 저장소와 DB 저장소를 만들 수 있습니다.

\`\`\`python
class CsvOrderRepository:
    def __init__(self, path: str) -> None:
        self.path = path

    def save_many(self, orders: list[OrderRow]) -> None:
        print(f"{self.path}에 {len(orders)}건 저장")


class DbOrderRepository:
    def save_many(self, orders: list[OrderRow]) -> None:
        print(f"DB에 {len(orders)}건 저장")
\`\`\`

서비스 함수는 구체적인 저장소 클래스가 아니라 \`OrderRepository\`에 의존합니다.

\`\`\`python
def save_paid_orders(
    orders: list[OrderRow],
    repository: OrderRepository,
) -> None:
    paid_orders = [order for order in orders if order["status"] == "paid"]
    repository.save_many(paid_orders)
\`\`\`

이 구조는 데이터분석 전처리 도구를 만들 때 유용합니다. 저장 방식이 CSV에서 DB로 바뀌어도 처리 함수는 크게 바뀌지 않습니다.

---

## 9.7.6 Generic Result로 오류 처리 구조화하기

데이터 처리 중에는 일부 행이 실패할 수 있습니다. 성공 결과와 실패 메시지를 함께 표현하려면 제네릭 \`Result\`를 사용할 수 있습니다.

\`\`\`python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class Result(Generic[T]):
    ok: bool
    value: T | None = None
    error: str | None = None
\`\`\`

주문 행 파싱 함수에 적용해보겠습니다.

\`\`\`python
def parse_amount(value: str) -> Result[int]:
    try:
        return Result(ok=True, value=int(value))
    except ValueError:
        return Result(ok=False, error=f"금액 변환 실패: {value}")
\`\`\`

이 함수의 반환 타입은 \`Result[int]\`입니다. 성공하면 \`value\`에 정수가 들어갑니다.

\`\`\`python
result = parse_amount("30000")

if result.ok:
    print(result.value)
else:
    print(result.error)
\`\`\`

이런 구조는 대량 데이터 처리에서 “전체 프로그램을 중단하지 않고 실패한 데이터만 따로 기록하는 방식”에 잘 어울립니다.

---

## 9.7.7 타입 힌트 작성 실무 원칙

타입 힌트를 실무 코드에 적용할 때는 다음 원칙을 기억하면 좋습니다.

첫째, 함수의 경계를 먼저 표시합니다.

\`\`\`python
def load_orders(path: str) -> list[OrderRow]:
    ...
\`\`\`

모든 지역 변수에 타입을 붙이는 것보다, 함수의 입력과 출력에 타입을 붙이는 것이 더 중요합니다.

둘째, 외부 데이터는 원본 타입과 정제 타입을 나눕니다.

\`\`\`python
class RawOrderRow(TypedDict):
    amount: str

class OrderRow(TypedDict):
    amount: int
\`\`\`

셋째, 함수가 데이터를 수정하지 않는다면 넓은 타입을 사용합니다.

\`\`\`python
from collections.abc import Iterable, Mapping


def summarize(rows: Iterable[Mapping[str, object]]) -> int:
    ...
\`\`\`

넷째, 내부에서 수정해야 한다면 구체적인 타입을 사용합니다.

\`\`\`python
def add_default_tag(tags: list[str]) -> None:
    tags.append("default")
\`\`\`

다섯째, \`Any\`는 경계에서만 사용하고 내부로 들어올수록 구체화합니다.

\`\`\`python
def parse_api_response(data: dict[str, object]) -> UserListResponse:
    ...
\`\`\`

여섯째, 타입 힌트가 너무 복잡해지면 타입 별칭을 사용합니다.

\`\`\`python
RowValue = str | int | float | None
Row = dict[str, RowValue]
Rows = list[Row]
\`\`\`

일곱째, 타입 힌트는 테스트와 함께 사용해야 합니다. 타입 힌트는 모든 오류를 막지 못합니다. 데이터 값 자체가 잘못된 경우는 테스트와 런타임 검증이 필요합니다.

---

## 9.8 실습: 타입이 있는 데이터 처리 파이프라인 만들기

이번 절에서는 지금까지 배운 내용을 하나의 작은 예제로 묶어보겠습니다.

목표는 원본 주문 행을 정제하고, 유효한 주문만 저장소에 전달하는 구조를 만드는 것입니다.

---

## 9.8.1 원본 데이터와 정제 데이터 타입 정의

\`\`\`python
from typing import Literal, NotRequired, TypedDict

class RawOrderRow(TypedDict):
    order_id: str
    user_id: str
    amount: str
    status: str
    memo: NotRequired[str]


OrderStatus = Literal["pending", "paid", "cancelled"]

class OrderRow(TypedDict):
    order_id: int
    user_id: int
    amount: int
    status: OrderStatus
    memo: str | None
\`\`\`

원본 데이터는 모두 문자열입니다. CSV에서 읽은 데이터라고 생각하면 자연스럽습니다.

정제된 데이터는 \`order_id\`, \`user_id\`, \`amount\`가 정수로 변환되어야 하고, \`status\`는 정해진 값 중 하나여야 합니다.

---

## 9.8.2 파싱 결과 타입 정의

\`\`\`python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class ParseResult(Generic[T]):
    ok: bool
    value: T | None = None
    error: str | None = None
\`\`\`

이 클래스는 성공 또는 실패를 표현합니다. \`ParseResult[OrderRow]\`라면 성공했을 때 \`OrderRow\`가 들어옵니다.

---

## 9.8.3 상태값 검증 함수

\`\`\`python
def parse_status(value: str) -> OrderStatus:
    if value not in {"pending", "paid", "cancelled"}:
        raise ValueError(f"잘못된 주문 상태: {value}")
    return value  # 타입 검사 도구에 따라 cast가 필요할 수 있음
\`\`\`

엄밀한 타입 검사 도구에서는 \`value\`가 \`OrderStatus\`임을 자동으로 추론하지 못할 수 있습니다. 그런 경우 \`typing.cast\`를 사용할 수 있습니다.

\`\`\`python
from typing import cast


def parse_status(value: str) -> OrderStatus:
    if value not in {"pending", "paid", "cancelled"}:
        raise ValueError(f"잘못된 주문 상태: {value}")
    return cast(OrderStatus, value)
\`\`\`

\`cast()\`는 실행 중 값을 바꾸지 않습니다. 타입 검사 도구에게 “이 값은 이 타입으로 봐도 된다”고 알려주는 기능입니다. 따라서 실제 검증 없이 무분별하게 사용하면 위험합니다.

---

## 9.8.4 행 파싱 함수

\`\`\`python
def parse_order(row: RawOrderRow) -> ParseResult[OrderRow]:
    try:
        order: OrderRow = {
            "order_id": int(row["order_id"]),
            "user_id": int(row["user_id"]),
            "amount": int(row["amount"]),
            "status": parse_status(row["status"]),
            "memo": row.get("memo"),
        }
        return ParseResult(ok=True, value=order)
    except (ValueError, KeyError) as error:
        return ParseResult(ok=False, error=str(error))
\`\`\`

이 함수는 원본 주문 행 하나를 정제된 주문 행으로 변환합니다. 변환에 실패하면 예외를 밖으로 던지는 대신 실패 결과를 반환합니다.

대량 데이터 처리에서는 이런 방식이 유용합니다. 한 행이 잘못되었다고 전체 작업을 중단하지 않아도 되기 때문입니다.

---

## 9.8.5 저장소 Protocol 정의

\`\`\`python
from typing import Protocol

class OrderRepository(Protocol):
    def save_many(self, orders: list[OrderRow]) -> None:
        ...
\`\`\`

저장소는 \`save_many()\` 메서드만 가지고 있으면 됩니다. CSV 저장소든 DB 저장소든 상관없습니다.

\`\`\`python
class ConsoleOrderRepository:
    def save_many(self, orders: list[OrderRow]) -> None:
        for order in orders:
            print("저장:", order)
\`\`\`

---

## 9.8.6 전체 처리 함수

\`\`\`python
from collections.abc import Iterable


def process_orders(
    rows: Iterable[RawOrderRow],
    repository: OrderRepository,
) -> list[str]:
    valid_orders: list[OrderRow] = []
    errors: list[str] = []

    for index, row in enumerate(rows, start=1):
        result = parse_order(row)
        if result.ok and result.value is not None:
            valid_orders.append(result.value)
        else:
            errors.append(f"{index}번째 행 실패: {result.error}")

    repository.save_many(valid_orders)
    return errors
\`\`\`

이 함수의 타입 힌트를 보면 전체 흐름이 잘 드러납니다.

\`\`\`text
RawOrderRow를 반복 가능한 형태로 받는다.
OrderRepository 역할을 하는 객체를 받는다.
실패 메시지 목록을 반환한다.
\`\`\`

이 구조는 데이터분석 전처리 코드의 기본 형태와 비슷합니다.

---

## 9.8.7 실행 예시

\`\`\`python
rows: list[RawOrderRow] = [
    {"order_id": "1", "user_id": "10", "amount": "30000", "status": "paid"},
    {"order_id": "2", "user_id": "20", "amount": "ABC", "status": "paid"},
    {"order_id": "3", "user_id": "30", "amount": "15000", "status": "unknown"},
]

repository = ConsoleOrderRepository()
errors = process_orders(rows, repository)

print("오류 목록")
for error in errors:
    print(error)
\`\`\`

이 예제는 타입 힌트, \`TypedDict\`, \`Literal\`, 제네릭, \`Protocol\`, 예외 처리를 함께 사용합니다. 고급 문법을 따로따로 배우는 것보다, 이렇게 하나의 데이터 처리 흐름에 연결해보면 왜 필요한지 이해하기 쉽습니다.

---

## 9.9 자주 하는 실수

타입 힌트를 사용할 때 초보자와 중급자가 자주 하는 실수를 정리해봅시다.

---

## 9.9.1 \`Optional\`을 “선택 인자”로 오해하기

\`\`\`python
def greet(name: str | None) -> str:
    ...
\`\`\`

이 함수에서 \`name\`은 \`None\`일 수 있지만, 인자를 생략할 수 있는 것은 아닙니다.

\`\`\`python
greet()  # 오류
\`\`\`

생략 가능하게 하려면 기본값을 지정해야 합니다.

\`\`\`python
def greet(name: str | None = None) -> str:
    ...
\`\`\`

---

## 9.9.2 \`Any\`를 너무 많이 쓰기

\`\`\`python
def process(data: Any) -> Any:
    return data
\`\`\`

이 함수는 타입 힌트가 있지만 사실상 아무 정보도 제공하지 않습니다. 가능하면 더 구체적인 타입으로 바꾸는 것이 좋습니다.

\`\`\`python
def process(rows: list[OrderRow]) -> list[OrderRow]:
    return rows
\`\`\`

---

## 9.9.3 인자 타입을 너무 좁게 쓰기

\`\`\`python
def total(numbers: list[int]) -> int:
    return sum(numbers)
\`\`\`

이 함수는 사실 리스트만 필요한 것이 아니라 반복 가능한 정수 데이터면 충분합니다.

\`\`\`python
from collections.abc import Iterable


def total(numbers: Iterable[int]) -> int:
    return sum(numbers)
\`\`\`

입력 타입은 필요한 기능만 표현할수록 함수가 더 유연해집니다.

---

## 9.9.4 반환 타입을 너무 넓게 쓰기

입력 타입은 넓게 받되, 반환 타입은 가능한 구체적으로 표현하는 것이 좋습니다.

\`\`\`python
from collections.abc import Iterable


def clean_names(names: Iterable[str]) -> list[str]:
    return [name.strip() for name in names]
\`\`\`

입력은 \`Iterable[str]\`로 넓게 받지만, 반환은 실제로 리스트를 만들기 때문에 \`list[str]\`로 구체적으로 씁니다.

---

## 9.9.5 TypedDict를 런타임 검증으로 착각하기

\`\`\`python
class UserRow(TypedDict):
    id: int
    name: str
\`\`\`

이 타입은 정적 타입 검사에 도움을 주지만, 실행 중 외부 데이터가 실제로 이 구조인지 자동 검사하지 않습니다.

외부 데이터에는 검증 함수가 필요합니다.

\`\`\`python
def is_user_row(data: dict[str, object]) -> bool:
    return isinstance(data.get("id"), int) and isinstance(data.get("name"), str)
\`\`\`

---

## 9.9.6 cast를 검증 없이 사용하기

\`cast()\`는 값을 변환하지 않습니다.

\`\`\`python
from typing import cast

value = cast(int, "123")
print(type(value))  # <class 'str'>
\`\`\`

\`cast(int, "123")\`를 했다고 문자열이 정수로 바뀌는 것이 아닙니다. 실제 변환은 \`int()\`를 사용해야 합니다.

\`\`\`python
value = int("123")
\`\`\`

\`cast()\`는 타입 검사 도구에게 힌트를 주는 기능일 뿐입니다. 따라서 실제 검증이나 변환 후에 사용하는 것이 안전합니다.

---

## 9.10 핵심 정리

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