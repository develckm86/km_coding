var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-1 -->

# 9.1 타입 힌트 복습

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
`;export{e as default};