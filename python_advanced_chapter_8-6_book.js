var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-6 -->

# 8.6 호출 가능한 객체

파이썬에서는 함수만 호출할 수 있는 것이 아닙니다. 객체도 \`__call__\`을 정의하면 함수처럼 호출할 수 있습니다.

\`\`\`python
obj()
\`\`\`

이 문법은 내부적으로 다음과 연결됩니다.

\`\`\`python
obj.__call__()
\`\`\`

---

## 8.6.1 \`__call__\`

간단한 예제를 보겠습니다.

\`\`\`python
class Greeter:
    def __init__(self, greeting: str) -> None:
        self.greeting = greeting

    def __call__(self, name: str) -> str:
        return f"{self.greeting}, {name}!"


greet = Greeter("안녕하세요")

print(greet("홍길동"))
print(greet("김민수"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요, 홍길동!
안녕하세요, 김민수!
\`\`\`

\`greet\`는 객체이지만 함수처럼 호출할 수 있습니다.

---

## 8.6.2 함수와 호출 가능한 객체의 차이

함수는 보통 필요한 값을 인자로 받아 처리합니다.

\`\`\`python
def add_prefix(text: str, prefix: str) -> str:
    return f"{prefix}{text}"
\`\`\`

그런데 같은 설정값을 여러 번 사용해야 한다면 매번 인자로 넘기는 것이 번거로울 수 있습니다.

\`\`\`python
print(add_prefix("001", "USER-"))
print(add_prefix("002", "USER-"))
print(add_prefix("003", "USER-"))
\`\`\`

호출 가능한 객체를 사용하면 설정값을 객체 상태로 보관할 수 있습니다.

\`\`\`python
class Prefixer:
    def __init__(self, prefix: str) -> None:
        self.prefix = prefix

    def __call__(self, text: str) -> str:
        return f"{self.prefix}{text}"


user_id = Prefixer("USER-")

print(user_id("001"))
print(user_id("002"))
print(user_id("003"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
USER-001
USER-002
USER-003
\`\`\`

호출 가능한 객체는 **상태를 가진 함수**라고 이해하면 좋습니다.

---

## 8.6.3 실무 예제: 데이터 변환기

데이터 처리에서는 같은 규칙을 여러 값에 반복 적용하는 일이 많습니다. 예를 들어 문자열 앞뒤 공백을 제거하고, 빈 문자열이면 기본값으로 바꾸는 변환기를 만들 수 있습니다.

\`\`\`python
class TextCleaner:
    def __init__(self, default: str = "N/A") -> None:
        self.default = default

    def __call__(self, value: object) -> str:
        if value is None:
            return self.default

        text = str(value).strip()
        if not text:
            return self.default

        return text


clean = TextCleaner(default="없음")

values = ["  홍길동  ", "", None, "  김민수"]
cleaned_values = [clean(value) for value in values]

print(cleaned_values)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['홍길동', '없음', '없음', '김민수']
\`\`\`

이처럼 \`__call__\`은 데이터 변환 규칙, 검증 규칙, 필터링 규칙을 객체로 만들 때 유용합니다.

---

## 8.6.4 실무 예제: 조건 필터

다음은 최소 금액 이상인 주문만 통과시키는 필터입니다.

\`\`\`python
class MinAmountFilter:
    def __init__(self, min_amount: int) -> None:
        self.min_amount = min_amount

    def __call__(self, order: dict[str, object]) -> bool:
        amount = int(order.get("amount", 0))
        return amount >= self.min_amount


orders = [
    {"order_id": "A001", "amount": 5000},
    {"order_id": "A002", "amount": 30000},
    {"order_id": "A003", "amount": 12000},
]

is_large_order = MinAmountFilter(10000)
large_orders = list(filter(is_large_order, orders))

print(large_orders)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[{'order_id': 'A002', 'amount': 30000}, {'order_id': 'A003', 'amount': 12000}]
\`\`\`

\`filter()\`는 함수를 받을 수 있지만, 정확히 말하면 호출 가능한 객체를 받을 수 있습니다. 함수도 호출 가능한 객체이고, \`__call__\`이 정의된 객체도 호출 가능한 객체입니다.

---

## 8.6.5 \`__call__\` 사용 기준

\`__call__\`은 편리하지만, 아무 객체나 함수처럼 만들면 코드가 헷갈릴 수 있습니다. 다음 기준을 생각해볼 수 있습니다.

\`__call__\`이 적절한 경우:

- 객체가 하나의 처리 규칙을 표현한다.
- 설정값을 상태로 가지고 반복 호출된다.
- 함수처럼 쓰는 것이 자연스럽다.
- \`map\`, \`filter\`, 콜백, 파이프라인에 넘기기 좋다.

명시적 메서드가 더 나은 경우:

- 객체가 여러 동작을 가진다.
- 호출 의미가 하나로 정해지지 않는다.
- \`obj()\`만 봐서는 무슨 일이 일어나는지 알기 어렵다.

예를 들어 보고서 생성 객체는 다음이 더 명확할 수 있습니다.

\`\`\`python
report_generator.generate()
\`\`\`

다음처럼 호출하는 것은 의미가 덜 분명할 수 있습니다.

\`\`\`python
report_generator()
\`\`\`

---
`;export{e as default};