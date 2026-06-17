var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-4 -->

# 3.4 고차 함수

고차 함수는 함수를 인자로 받거나 함수를 반환하는 함수를 말합니다. 이미 앞에서 함수를 인자로 전달하거나 반환하는 예제를 보았습니다. 여기서는 파이썬에서 자주 사용하는 고차 함수와 실무 패턴을 살펴봅니다.

---

### 3.4.1 고차 함수란 무엇인가

다음 함수는 다른 함수를 인자로 받습니다.

\`\`\`python
def apply_to_each(items, function):
    result = []

    for item in items:
        result.append(function(item))

    return result
\`\`\`

이 함수는 고차 함수입니다. \`function\`이라는 매개변수로 함수를 전달받기 때문입니다.

\`\`\`python
def square(number):
    return number * number

numbers = [1, 2, 3, 4]
result = apply_to_each(numbers, square)

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 4, 9, 16]
\`\`\`

고차 함수는 공통 반복 흐름과 개별 처리 방식을 분리할 수 있게 해줍니다.

---

### 3.4.2 \`map()\`

\`map()\`은 여러 값에 같은 함수를 적용할 때 사용합니다.

\`\`\`python
def double(number):
    return number * 2

numbers = [1, 2, 3, 4]
result = map(double, numbers)

print(result)
print(list(result))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
<map object at ...>
[2, 4, 6, 8]
\`\`\`

\`map()\`의 결과는 바로 리스트가 아니라 반복 가능한 객체입니다. 실제 값을 확인하려면 \`list()\`로 변환하거나 반복문으로 순회해야 합니다.

람다 함수와 함께 사용할 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4]
result = list(map(lambda number: number * 2, numbers))

print(result)
\`\`\`

다만 너무 복잡한 람다를 \`map()\` 안에 넣으면 코드가 읽기 어려워집니다. 그런 경우에는 일반 함수나 리스트 컴프리헨션이 더 좋습니다.

\`\`\`python
numbers = [1, 2, 3, 4]
result = [number * 2 for number in numbers]

print(result)
\`\`\`

입문자나 협업 코드에서는 위와 같은 리스트 컴프리헨션이 더 읽기 쉬운 경우가 많습니다.

---

### 3.4.3 \`filter()\`

\`filter()\`는 조건에 맞는 값만 걸러낼 때 사용합니다.

\`\`\`python
def is_even(number):
    return number % 2 == 0

numbers = [1, 2, 3, 4, 5, 6]
result = filter(is_even, numbers)

print(list(result))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[2, 4, 6]
\`\`\`

람다 함수와 함께 사용할 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(lambda number: number % 2 == 0, numbers))

print(even_numbers)
\`\`\`

이 역시 리스트 컴프리헨션으로 표현할 수 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = [number for number in numbers if number % 2 == 0]

print(even_numbers)
\`\`\`

파이썬에서는 단순한 변환과 필터링에는 리스트 컴프리헨션이 더 자연스럽게 쓰이는 경우가 많습니다. 하지만 \`map()\`과 \`filter()\`는 함수형 프로그래밍 스타일, 지연 평가, 외부 함수 재사용 구조를 이해하는 데 중요합니다.

---

### 3.4.4 \`sorted()\`와 \`key\` 함수

\`sorted()\`는 정렬된 새 리스트를 반환합니다. 기본적으로 숫자는 작은 순서, 문자열은 사전 순서로 정렬됩니다.

\`\`\`python
numbers = [3, 1, 4, 2]
print(sorted(numbers))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
\`\`\`

딕셔너리 리스트를 정렬할 때는 정렬 기준을 직접 지정해야 합니다.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

print(sorted_products)
\`\`\`

\`key\`에는 함수가 들어갑니다. \`sorted()\`는 각 요소를 정렬할 때 \`key\` 함수의 반환값을 기준으로 삼습니다.

람다를 일반 함수로 바꿔 쓰면 다음과 같습니다.

\`\`\`python
def get_price(product):
    return product["price"]

sorted_products = sorted(products, key=get_price)
\`\`\`

정렬 기준이 복잡하거나 재사용된다면 일반 함수로 분리하는 편이 좋습니다.

내림차순 정렬은 \`reverse=True\`를 사용합니다.

\`\`\`python
sorted_products = sorted(
    products,
    key=lambda product: product["price"],
    reverse=True,
)
\`\`\`

---

### 3.4.5 \`functools.partial\`

\`functools.partial\`은 함수의 일부 인자를 미리 고정한 새 함수를 만들 때 사용합니다.

\`\`\`python
from functools import partial


def calculate_price(price, quantity, discount_rate):
    return price * quantity * (1 - discount_rate)

vip_price = partial(calculate_price, discount_rate=0.2)
normal_price = partial(calculate_price, discount_rate=0.05)

print(vip_price(10000, 3))
print(normal_price(10000, 3))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
24000.0
28500.0
\`\`\`

\`calculate_price\` 함수는 가격, 수량, 할인율을 모두 받아야 합니다. 하지만 \`partial\`을 사용하면 할인율만 미리 고정한 새 함수를 만들 수 있습니다.

실무에서는 설정값이 일부 고정된 함수를 만들 때 유용합니다.

\`\`\`python
from functools import partial


def log_message(level, message):
    print(f"[{level}] {message}")

info = partial(log_message, "INFO")
error = partial(log_message, "ERROR")

info("작업을 시작합니다.")
error("파일을 찾을 수 없습니다.")
\`\`\`

---

### 3.4.6 \`operator\` 모듈 기초

\`operator\` 모듈은 자주 쓰는 연산을 함수 형태로 제공합니다.

예를 들어 딕셔너리 리스트를 특정 key 기준으로 정렬할 때 \`lambda\` 대신 \`itemgetter\`를 사용할 수 있습니다.

\`\`\`python
from operator import itemgetter

products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=itemgetter("price"))

print(sorted_products)
\`\`\`

객체의 속성 기준으로 정렬할 때는 \`attrgetter\`를 사용할 수 있습니다.

\`\`\`python
from dataclasses import dataclass
from operator import attrgetter


@dataclass
class Product:
    name: str
    price: int


products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
    Product("모니터", 200000),
]

sorted_products = sorted(products, key=attrgetter("price"))

print(sorted_products)
\`\`\`

\`lambda\`가 항상 나쁜 것은 아닙니다. 하지만 단순히 특정 key나 속성을 꺼내는 경우에는 \`itemgetter\`, \`attrgetter\`가 더 명확할 수 있습니다.

---
`;export{e as default};