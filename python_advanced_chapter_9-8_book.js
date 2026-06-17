var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-8 -->

# 9.8 실습: 타입이 있는 데이터 처리 파이프라인 만들기

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
`;export{e as default};