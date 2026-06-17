var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-4 -->

# 17.4 자료구조 선택과 성능

## 자료구조가 성능에 미치는 영향

파이썬 기초 과정에서 리스트, 튜플, 딕셔너리, 집합을 배웠다. 그때는 주로 사용법과 특징을 배웠다면, 고급 과정에서는 성능 관점에서 자료구조를 다시 살펴볼 필요가 있다.

같은 데이터를 저장하더라도 어떤 자료구조를 선택하느냐에 따라 속도가 크게 달라질 수 있다.

대표적인 기준은 다음과 같다.

| 작업 | 적합한 자료구조 |
|---|---|
| 순서대로 여러 값을 저장 | 리스트 |
| 변경되지 않는 여러 값 저장 | 튜플 |
| key로 값을 빠르게 찾기 | 딕셔너리 |
| 포함 여부를 빠르게 확인 | 집합 |
| 중복 제거 | 집합 |
| 순서대로 하나씩 처리 | 리스트, 튜플, 제너레이터 |

## 리스트 검색의 비용

리스트에서 특정 값이 있는지 확인할 때는 앞에서부터 차례대로 검사한다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]

print(40 in numbers)
\`\`\`

데이터가 작으면 문제가 없다. 하지만 리스트가 매우 크고, 이 검색을 반복한다면 성능 문제가 생길 수 있다.

다음 예제는 리스트와 집합의 포함 여부 확인 속도를 비교한다.

\`\`\`python
import timeit

numbers_list = list(range(1_000_000))
numbers_set = set(numbers_list)


def search_in_list() -> bool:
    return 999_999 in numbers_list


def search_in_set() -> bool:
    return 999_999 in numbers_set


list_time = timeit.timeit(search_in_list, number=100)
set_time = timeit.timeit(search_in_set, number=100)

print("list:", list_time)
print("set:", set_time)
\`\`\`

많은 경우 집합이 훨씬 빠르게 나온다. 집합은 내부적으로 해시 기반 구조를 사용하기 때문에 포함 여부 확인에 강하다.

## 딕셔너리 조회

딕셔너리는 key로 value를 빠르게 찾을 수 있는 자료구조다.

\`\`\`python
prices = {
    "keyboard": 30000,
    "mouse": 15000,
    "monitor": 200000,
}

print(prices["mouse"])
\`\`\`

리스트 안에 딕셔너리를 여러 개 넣고 매번 검색하는 구조는 데이터가 커질수록 느려질 수 있다.

\`\`\`python
products = [
    {"code": "P001", "name": "keyboard", "price": 30000},
    {"code": "P002", "name": "mouse", "price": 15000},
    {"code": "P003", "name": "monitor", "price": 200000},
]


def find_product(code: str) -> dict | None:
    for product in products:
        if product["code"] == code:
            return product
    return None
\`\`\`

이 함수는 매번 리스트를 처음부터 끝까지 검사한다. 상품이 많고 조회가 자주 발생한다면 딕셔너리로 인덱스를 만들어두는 것이 좋다.

\`\`\`python
product_map = {
    product["code"]: product
    for product in products
}

print(product_map.get("P002"))
\`\`\`

이렇게 하면 상품 코드를 기준으로 빠르게 조회할 수 있다.

## 실무 예시: 조인 전 인덱스 만들기

데이터분석 전처리에서 자주 하는 작업 중 하나는 두 데이터의 값을 연결하는 것이다.

예를 들어 주문 데이터에는 고객 ID만 있고, 고객 데이터에는 고객 이름이 있다고 하자.

\`\`\`python
customers = [
    {"customer_id": "C001", "name": "김민수"},
    {"customer_id": "C002", "name": "이지영"},
]

orders = [
    {"order_id": "O001", "customer_id": "C001", "amount": 30000},
    {"order_id": "O002", "customer_id": "C002", "amount": 15000},
]
\`\`\`

나쁜 방식은 주문마다 고객 리스트를 반복 검색하는 것이다.

\`\`\`python
def find_customer_name(customer_id: str) -> str | None:
    for customer in customers:
        if customer["customer_id"] == customer_id:
            return customer["name"]
    return None


for order in orders:
    order["customer_name"] = find_customer_name(order["customer_id"])
\`\`\`

고객 데이터와 주문 데이터가 모두 많으면 매우 느려질 수 있다.

더 좋은 방식은 고객 ID를 key로 하는 딕셔너리를 먼저 만드는 것이다.

\`\`\`python
customer_map = {
    customer["customer_id"]: customer
    for customer in customers
}

for order in orders:
    customer = customer_map.get(order["customer_id"])
    order["customer_name"] = customer["name"] if customer else None
\`\`\`

이 방식은 데이터분석에서 말하는 조인과 비슷한 생각이다. pandas를 배우기 전에도, key를 기준으로 빠르게 찾기 위해 딕셔너리를 만드는 습관은 매우 중요하다.

## 리스트에 반복해서 추가하기

리스트에 값을 추가할 때는 보통 \`append()\`를 사용한다.

\`\`\`python
result = []

for number in range(1000):
    result.append(number * 2)
\`\`\`

이 방식은 일반적으로 괜찮다. 하지만 문자열을 반복해서 더하는 방식은 주의해야 한다.

\`\`\`python
text = ""

for word in ["Python", "is", "good"]:
    text += word + " "
\`\`\`

문자열은 불변 객체다. 문자열을 더할 때마다 새 문자열이 만들어질 수 있다. 많은 문자열을 합쳐야 할 때는 리스트에 모은 뒤 \`join()\`을 사용하는 것이 좋다.

\`\`\`python
words = ["Python", "is", "good"]
text = " ".join(words)

print(text)
\`\`\`

## 정렬의 비용

정렬은 편리하지만 비용이 있는 작업이다. 데이터가 많고 반복적으로 정렬하면 성능 문제가 생길 수 있다.

\`\`\`python
orders = [
    {"order_id": "O001", "amount": 30000},
    {"order_id": "O002", "amount": 15000},
    {"order_id": "O003", "amount": 50000},
]

orders.sort(key=lambda order: order["amount"])
\`\`\`

정렬은 필요할 때만 수행해야 한다. 반복문 안에서 매번 정렬하는 구조는 피하는 것이 좋다.

나쁜 예시는 다음과 같다.

\`\`\`python
result = []

for order in orders:
    result.append(order)
    result.sort(key=lambda item: item["amount"])
\`\`\`

이 코드는 값을 하나 추가할 때마다 전체 리스트를 정렬한다. 대부분의 경우 마지막에 한 번만 정렬하면 충분하다.

\`\`\`python
result = []

for order in orders:
    result.append(order)

result.sort(key=lambda item: item["amount"])
\`\`\`

## 핵심 정리

자료구조 선택은 성능 최적화에서 매우 중요하다. 리스트는 순서가 있는 데이터 처리에 좋지만, 포함 여부 확인이나 key 기반 조회에는 집합과 딕셔너리가 더 적합하다. 데이터가 작을 때는 차이가 작지만, 데이터가 커지고 반복 횟수가 많아지면 자료구조 선택이 전체 성능을 좌우할 수 있다.

---
`;export{e as default};