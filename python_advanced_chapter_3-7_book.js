var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-7 -->

# 3.7 실습: 주문 데이터 처리 함수 만들기

이번 장에서 배운 내용을 이용해 간단한 주문 데이터 처리 흐름을 만들어보겠습니다.

다음과 같은 주문 데이터가 있다고 가정합니다.

\`\`\`python
orders = [
    {"id": 1, "customer": "  Kim ", "price": "10,000", "quantity": 2},
    {"id": 2, "customer": " Lee", "price": "25,000", "quantity": 1},
    {"id": 3, "customer": "Park ", "price": "8,000", "quantity": 5},
]
\`\`\`

목표는 다음과 같습니다.

1. 고객 이름의 앞뒤 공백을 제거한다.
2. 가격 문자열에서 쉼표를 제거하고 정수로 변환한다.
3. 주문 금액을 계산한다.
4. 주문 금액이 일정 금액 이상인 주문만 필터링한다.

먼저 작은 함수들을 만듭니다.

\`\`\`python
def clean_customer_name(name):
    return name.strip()


def parse_price(price_text):
    return int(price_text.replace(",", ""))


def calculate_order_total(price, quantity):
    return price * quantity
\`\`\`

이제 주문 하나를 정리하는 함수를 만듭니다.

\`\`\`python
def clean_order(order):
    customer = clean_customer_name(order["customer"])
    price = parse_price(order["price"])
    quantity = order["quantity"]
    total = calculate_order_total(price, quantity)

    return {
        "id": order["id"],
        "customer": customer,
        "price": price,
        "quantity": quantity,
        "total": total,
    }
\`\`\`

전체 주문을 정리합니다.

\`\`\`python
cleaned_orders = list(map(clean_order, orders))

for order in cleaned_orders:
    print(order)
\`\`\`

필터링 함수도 만듭니다.

\`\`\`python
def make_minimum_total_filter(minimum_total):
    def filter_order(order):
        return order["total"] >= minimum_total

    return filter_order
\`\`\`

이 함수는 클로저입니다. \`minimum_total\` 값을 기억하는 필터 함수를 만들어 반환합니다.

\`\`\`python
minimum_filter = make_minimum_total_filter(20000)
large_orders = list(filter(minimum_filter, cleaned_orders))

for order in large_orders:
    print(order)
\`\`\`

이 예제에는 이번 장에서 배운 내용이 여러 개 들어 있습니다.

- 함수를 값처럼 전달하는 \`map()\`
- 함수를 값처럼 전달하는 \`filter()\`
- 클로저를 이용해 기준값을 기억하는 필터 함수 만들기
- 작은 함수를 조합해서 큰 작업 처리하기
- 입력과 출력이 명확한 함수 설계

---
`;export{e as default};