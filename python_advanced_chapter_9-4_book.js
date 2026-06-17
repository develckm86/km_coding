var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-4 -->

# 9.4 TypedDict

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
`;export{e as default};