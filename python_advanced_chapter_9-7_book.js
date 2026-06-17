var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-7 -->

# 9.7 실무 활용

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
`;export{e as default};