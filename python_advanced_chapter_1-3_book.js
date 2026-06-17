var e=`<!-- 원본: python_advanced_chapter_1_book.md / 세부 장: 1-3 -->

# 1.3 “문법을 아는 것”과 “코드를 설계하는 것”

문법을 아는 것과 코드를 설계하는 것은 다르다.

예를 들어 리스트를 알고, 반복문을 알고, 조건문을 안다면 아래와 같은 코드를 작성할 수 있다.

\`\`\`python
orders = [
    {"id": 1, "customer": "Kim", "amount": "12000", "status": "paid"},
    {"id": 2, "customer": "Lee", "amount": "", "status": "cancelled"},
    {"id": 3, "customer": "Park", "amount": "33000", "status": "paid"},
]

total = 0

for order in orders:
    if order["status"] == "paid":
        if order["amount"] != "":
            total += int(order["amount"])

print(total)
\`\`\`

이 코드는 실행된다. 결제 완료된 주문의 금액을 합산한다. 기초 문법만으로도 충분히 작성할 수 있다.

하지만 실무에서는 이런 질문을 하게 된다.

\`\`\`text
amount가 숫자로 변환할 수 없는 문자열이면 어떻게 할까?
status 값이 대문자로 들어오면 어떻게 할까?
주문 데이터가 10만 건이면 어떻게 처리할까?
같은 로직을 다른 파일에서도 사용해야 한다면 어떻게 할까?
이 계산이 맞는지 테스트하려면 어떻게 할까?
\`\`\`

이런 질문에 답하기 위해 코드를 조금 더 구조화할 수 있다.

\`\`\`python
def parse_amount(value: str) -> int:
    if not value:
        return 0
    return int(value)


def is_paid_order(order: dict) -> bool:
    return order.get("status") == "paid"


def calculate_paid_total(orders: list[dict]) -> int:
    total = 0

    for order in orders:
        if is_paid_order(order):
            total += parse_amount(order.get("amount", ""))

    return total


orders = [
    {"id": 1, "customer": "Kim", "amount": "12000", "status": "paid"},
    {"id": 2, "customer": "Lee", "amount": "", "status": "cancelled"},
    {"id": 3, "customer": "Park", "amount": "33000", "status": "paid"},
]

result = calculate_paid_total(orders)
print(result)
\`\`\`

두 번째 코드는 더 길어 보일 수 있다. 하지만 역할이 나뉘어 있다.

- \`parse_amount()\`는 금액 문자열을 정수로 바꾸는 역할을 한다.
- \`is_paid_order()\`는 결제 완료 주문인지 판단한다.
- \`calculate_paid_total()\`은 전체 합계를 계산한다.

이렇게 나누면 각 부분을 따로 테스트할 수 있고, 나중에 요구사항이 바뀌어도 수정할 위치를 찾기 쉽다.

고급 파이썬에서는 이런 관점을 중요하게 다룬다. 코드를 단순히 “한 번 실행되게” 만드는 것이 아니라, **읽고, 고치고, 확장하고, 검증할 수 있게** 만든다.

---
`;export{e as default};