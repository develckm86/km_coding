var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-9 -->

# 9.9 자주 하는 실수

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
`;export{e as default};