var e=`<!-- 원본: python_basic_chapter_5_book.md / 세부 장: 5-5 -->

# 5.5 람다 함수와 고차 함수 기초

## 람다 함수란 무엇인가

람다 함수는 이름이 없는 간단한 함수이다. 보통 한 줄로 표현할 수 있는 짧은 함수를 만들 때 사용한다.

기본 구조는 다음과 같다.

\`\`\`python
lambda 매개변수: 반환값
\`\`\`

두 숫자를 더하는 람다 함수는 다음과 같이 만들 수 있다.

\`\`\`python
add = lambda a, b: a + b

print(add(10, 20))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30
\`\`\`

위 코드는 다음 일반 함수와 비슷하다.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

람다 함수는 간단한 함수를 짧게 작성할 수 있지만, 복잡한 로직에는 적합하지 않다.

## 람다를 사용하는 상황

람다 함수는 보통 함수를 한 번만 간단히 사용할 때 유용하다. 특히 \`sorted()\`, \`map()\`, \`filter()\` 같은 함수와 함께 자주 사용된다.

예를 들어 상품 목록을 가격순으로 정렬한다고 하자.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

print(sorted_products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '마우스', 'price': 15000}, {'name': '키보드', 'price': 30000}, {'name': '모니터', 'price': 200000}]
\`\`\`

\`lambda product: product["price"]\`는 각 상품 딕셔너리에서 가격을 꺼내 정렬 기준으로 사용한다.

람다를 일반 함수로 바꾸면 다음과 같다.

\`\`\`python
def get_price(product):
    return product["price"]


sorted_products = sorted(products, key=get_price)
\`\`\`

둘 다 가능하다. 간단한 기준이면 람다를 쓰고, 여러 줄이 필요하거나 의미를 분명히 하고 싶으면 일반 함수를 쓰는 것이 좋다.

## 람다를 남용하면 안 되는 경우

람다는 짧은 함수에 적합하다. 다음처럼 복잡한 조건이 들어가면 읽기 어렵다.

\`\`\`python
result = sorted(users, key=lambda user: user["age"] if user["active"] else 999)
\`\`\`

이런 코드는 동작하더라도 초보자나 동료가 이해하기 어려울 수 있다. 복잡한 로직은 일반 함수로 분리하는 것이 좋다.

\`\`\`python
def get_sort_age(user):
    if user["active"]:
        return user["age"]
    return 999


result = sorted(users, key=get_sort_age)
\`\`\`

함수 이름이 로직의 의미를 설명해 주기 때문에 읽기 쉽다.

람다는 “짧고 단순할 때만” 사용하는 것이 좋다.

## 고차 함수란 무엇인가

고차 함수는 함수를 인자로 받거나 함수를 반환하는 함수이다.

처음에는 어렵게 느껴질 수 있지만, 이미 우리는 고차 함수를 사용하고 있다. \`sorted()\`의 \`key\` 인자에 함수를 전달하는 것이 대표적인 예이다.

\`\`\`python
numbers = [3, 1, 4, 2]

sorted_numbers = sorted(numbers)
print(sorted_numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4]
\`\`\`

이번에는 문자열 길이를 기준으로 정렬해 보자.

\`\`\`python
words = ["python", "is", "easy", "powerful"]

sorted_words = sorted(words, key=len)
print(sorted_words)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['is', 'easy', 'python', 'powerful']
\`\`\`

\`sorted()\`는 \`key\`에 전달한 함수 \`len\`을 각 값에 적용한 뒤 그 결과를 기준으로 정렬한다. 이처럼 함수를 다른 함수에 전달할 수 있다.

## \`map()\`

\`map()\`은 여러 데이터에 같은 함수를 적용할 때 사용한다.

기본 구조는 다음과 같다.

\`\`\`python
map(함수, 반복가능한데이터)
\`\`\`

예를 들어 숫자 리스트의 모든 값에 2를 곱한다고 하자.

일반 반복문으로 작성하면 다음과 같다.

\`\`\`python
numbers = [1, 2, 3, 4]

doubled = []
for number in numbers:
    doubled.append(number * 2)

print(doubled)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[2, 4, 6, 8]
\`\`\`

\`map()\`을 사용하면 다음처럼 작성할 수 있다.

\`\`\`python
numbers = [1, 2, 3, 4]

doubled = list(map(lambda number: number * 2, numbers))

print(doubled)
\`\`\`

실행 결과는 같다.

\`\`\`text
[2, 4, 6, 8]
\`\`\`

\`map()\`의 결과는 바로 리스트가 아니므로 \`list()\`로 감싸서 리스트로 변환했다.

문자열 숫자를 정수로 변환할 때도 \`map()\`이 자주 사용된다.

\`\`\`python
values = ["10", "20", "30"]

numbers = list(map(int, values))

print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 20, 30]
\`\`\`

이 코드는 \`values\`의 각 문자열에 \`int()\`를 적용한다.

## \`filter()\`

\`filter()\`는 조건에 맞는 값만 걸러낼 때 사용한다.

기본 구조는 다음과 같다.

\`\`\`python
filter(조건함수, 반복가능한데이터)
\`\`\`

조건 함수는 \`True\` 또는 \`False\`를 반환해야 한다.

예를 들어 짝수만 걸러내는 코드를 보자.

\`\`\`python
def is_even(number):
    return number % 2 == 0


numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(is_even, numbers))

print(even_numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[2, 4, 6]
\`\`\`

람다를 사용하면 다음처럼 작성할 수 있다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(lambda number: number % 2 == 0, numbers))

print(even_numbers)
\`\`\`

실행 결과는 같다.

\`\`\`text
[2, 4, 6]
\`\`\`

하지만 조건이 복잡하면 일반 함수로 분리하는 것이 좋다.

## \`sorted()\`와 \`key\`

\`sorted()\`는 데이터를 정렬한 새 리스트를 반환한다.

\`\`\`python
numbers = [3, 1, 4, 2]

result = sorted(numbers)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4]
\`\`\`

내림차순 정렬은 \`reverse=True\`를 사용한다.

\`\`\`python
numbers = [3, 1, 4, 2]

result = sorted(numbers, reverse=True)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[4, 3, 2, 1]
\`\`\`

문자열 리스트는 기본적으로 사전식으로 정렬된다.

\`\`\`python
names = ["Charlie", "Alice", "Bob"]

result = sorted(names)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['Alice', 'Bob', 'Charlie']
\`\`\`

정렬 기준을 직접 지정하려면 \`key\`를 사용한다.

\`\`\`python
words = ["python", "is", "easy", "powerful"]

result = sorted(words, key=len)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['is', 'easy', 'python', 'powerful']
\`\`\`

딕셔너리 리스트를 정렬할 때는 람다가 많이 사용된다.

\`\`\`python
students = [
    {"name": "김민수", "score": 85},
    {"name": "이지영", "score": 92},
    {"name": "박철수", "score": 78},
]

sorted_students = sorted(students, key=lambda student: student["score"])

print(sorted_students)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '박철수', 'score': 78}, {'name': '김민수', 'score': 85}, {'name': '이지영', 'score': 92}]
\`\`\`

점수가 높은 순서로 정렬하려면 \`reverse=True\`를 추가한다.

\`\`\`python
sorted_students = sorted(
    students,
    key=lambda student: student["score"],
    reverse=True
)

print(sorted_students)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '이지영', 'score': 92}, {'name': '김민수', 'score': 85}, {'name': '박철수', 'score': 78}]
\`\`\`

## 리스트 컴프리헨션과 비교

\`map()\`과 \`filter()\`는 리스트 컴프리헨션으로도 표현할 수 있다.

\`map()\` 예제는 다음 리스트 컴프리헨션과 비슷하다.

\`\`\`python
numbers = [1, 2, 3, 4]

doubled = [number * 2 for number in numbers]
print(doubled)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[2, 4, 6, 8]
\`\`\`

\`filter()\` 예제는 다음 리스트 컴프리헨션과 비슷하다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]

even_numbers = [number for number in numbers if number % 2 == 0]
print(even_numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[2, 4, 6]
\`\`\`

파이썬에서는 간단한 변환과 필터링에는 리스트 컴프리헨션이 더 읽기 쉬운 경우가 많다. 다만 \`map(int, values)\`처럼 이미 존재하는 함수를 적용할 때는 \`map()\`이 간결할 수 있다.

\`\`\`python
values = ["10", "20", "30"]

numbers = list(map(int, values))
\`\`\`

다음과 같이 리스트 컴프리헨션으로도 쓸 수 있다.

\`\`\`python
numbers = [int(value) for value in values]
\`\`\`

둘 다 가능하다. 중요한 것은 팀이나 상황에 맞게 읽기 쉬운 방식을 선택하는 것이다.

## 실무 예제: 상품 목록 정렬

상품 목록을 가격순으로 정렬해 보자.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
    {"name": "USB 케이블", "price": 7000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

for product in sorted_products:
    print(product["name"], product["price"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
USB 케이블 7000
마우스 15000
키보드 30000
모니터 200000
\`\`\`

이번에는 가격이 높은 순서로 정렬해 보자.

\`\`\`python
sorted_products = sorted(
    products,
    key=lambda product: product["price"],
    reverse=True
)

for product in sorted_products:
    print(product["name"], product["price"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
모니터 200000
키보드 30000
마우스 15000
USB 케이블 7000
\`\`\`

## 실무 예제: 특정 조건의 데이터 필터링

상품 목록에서 30,000원 이상인 상품만 골라보자.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
    {"name": "USB 케이블", "price": 7000},
]

expensive_products = list(
    filter(lambda product: product["price"] >= 30000, products)
)

print(expensive_products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '키보드', 'price': 30000}, {'name': '모니터', 'price': 200000}]
\`\`\`

리스트 컴프리헨션으로 작성하면 다음과 같다.

\`\`\`python
expensive_products = [
    product
    for product in products
    if product["price"] >= 30000
]
\`\`\`

이 예제에서는 리스트 컴프리헨션이 더 읽기 쉽다. 람다와 고차 함수는 알아두되, 항상 사용하는 것이 정답은 아니다.

---

# 5장 마무리

## 핵심 정리

함수는 특정 작업을 수행하는 코드 묶음이다. 함수를 사용하면 반복되는 코드를 줄이고, 프로그램을 작은 단위로 나눌 수 있다. 함수는 코드 재사용, 중복 제거, 유지보수성 향상, 가독성 향상에 도움이 된다.

함수를 만들 때는 \`def\`를 사용한다. 함수는 정의만 해서는 실행되지 않으며, 함수 이름 뒤에 괄호를 붙여 호출해야 실행된다.

매개변수는 함수를 정의할 때 값을 받기 위해 사용하는 이름이고, 인자는 함수를 호출할 때 실제로 전달하는 값이다. 인자는 위치에 따라 전달할 수도 있고, 매개변수 이름을 지정해 키워드 인자로 전달할 수도 있다.

\`return\`은 함수의 결과를 반환하고 함수를 종료한다. \`print()\`는 화면에 출력하는 기능이고, \`return\`은 값을 함수 밖으로 돌려주는 기능이다. 계산 결과를 이후 코드에서 사용해야 한다면 \`return\`을 사용해야 한다.

함수 안에서 만든 변수는 지역 변수이고, 함수 밖에서 만든 변수는 전역 변수이다. 함수 안에서 만든 값을 밖에서 사용하려면 \`return\`으로 반환해야 한다. 전역 변수를 함수 안에서 직접 변경하는 코드는 가능하면 피하는 것이 좋다.

좋은 함수는 하나의 역할만 담당하고, 이름만 보아도 하는 일을 알 수 있으며, 입력과 출력이 분명하다. 너무 긴 함수는 작은 함수로 나누는 것이 좋다.

람다 함수는 이름 없는 간단한 함수이다. \`map()\`, \`filter()\`, \`sorted()\`와 함께 사용할 수 있다. 다만 복잡한 로직은 람다보다 일반 함수로 작성하는 것이 좋다.

## 자주 하는 실수

### 1. 함수를 정의만 하고 호출하지 않는 실수

\`\`\`python
def say_hello():
    print("안녕하세요")
\`\`\`

위 코드는 함수를 정의했을 뿐 실행하지 않았다.

\`\`\`python
say_hello()
\`\`\`

호출해야 실행된다.

### 2. \`print()\`와 \`return\`을 혼동하는 실수

\`\`\`python
def add(a, b):
    print(a + b)


result = add(10, 20)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30
None
\`\`\`

계산 결과를 변수에 저장하려면 \`return\`을 사용해야 한다.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

### 3. 함수 안의 지역 변수를 함수 밖에서 사용하려는 실수

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity


calculate_total(10000, 3)
print(total)
\`\`\`

\`total\`은 함수 안에서만 사용할 수 있다. 함수 밖에서 사용하려면 반환해야 한다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(result)
\`\`\`

### 4. 인자 순서를 잘못 전달하는 실수

\`\`\`python
def print_order(product_name, quantity):
    print(product_name, quantity)


print_order(3, "키보드")
\`\`\`

위 코드는 순서가 잘못되었다. 키워드 인자를 사용하면 의미가 분명해진다.

\`\`\`python
print_order(product_name="키보드", quantity=3)
\`\`\`

### 5. 수정 가능한 기본값을 사용하는 실수

\`\`\`python
def add_item(item, items=[]):
    items.append(item)
    return items
\`\`\`

이런 방식은 같은 리스트가 계속 재사용될 수 있다. 다음처럼 작성하는 것이 안전하다.

\`\`\`python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
\`\`\`

---

# 연습문제

## 문제 1. 함수의 개념

다음 설명 중 함수에 대한 설명으로 적절한 것을 모두 고르시오.

1. 함수는 특정 작업을 수행하는 코드 묶음이다.
2. 함수는 반드시 매개변수가 있어야 한다.
3. 함수는 코드를 재사용하는 데 도움이 된다.
4. 함수는 정의만 해도 자동으로 실행된다.
5. 함수는 결과값을 반환할 수 있다.

---

## 문제 2. 함수 호출 결과 예측

다음 코드의 실행 결과를 쓰시오.

\`\`\`python
def greet(name):
    print(name + "님 안녕하세요")


greet("민수")
greet("지영")
\`\`\`

---

## 문제 3. 반환값 이해

다음 코드의 실행 결과를 쓰시오.

\`\`\`python
def add(a, b):
    return a + b


result = add(10, 5)
print(result)
\`\`\`

---

## 문제 4. \`print()\`와 \`return\`

다음 코드의 실행 결과를 쓰시오.

\`\`\`python
def multiply(a, b):
    print(a * b)


result = multiply(3, 4)
print(result)
\`\`\`

---

## 문제 5. 주문 금액 계산 함수 작성

상품 가격 \`price\`와 수량 \`quantity\`를 받아 총 주문 금액을 반환하는 함수 \`calculate_total_price\`를 작성하시오.

실행 예시는 다음과 같다.

\`\`\`python
result = calculate_total_price(10000, 3)
print(result)
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
30000
\`\`\`

---

## 문제 6. 배송비 계산 함수 작성

주문 금액 \`order_price\`를 받아 배송비를 반환하는 함수 \`calculate_delivery_fee\`를 작성하시오.

조건은 다음과 같다.

\`\`\`text
주문 금액이 50,000원 이상이면 배송비는 0원
그렇지 않으면 배송비는 3,000원
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
print(calculate_delivery_fee(60000))
print(calculate_delivery_fee(30000))
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
0
3000
\`\`\`

---

## 문제 7. 기본값 인자

다음 코드의 실행 결과를 쓰시오.

\`\`\`python
def greet(name="손님"):
    print(name + "님 환영합니다")


greet("홍길동")
greet()
\`\`\`

---

## 문제 8. 변수의 범위

다음 코드에서 에러가 발생하는 이유를 설명하시오.

\`\`\`python
def create_message():
    message = "안녕하세요"


create_message()
print(message)
\`\`\`

---

## 문제 9. 입력값 검증 함수 작성

문자열 \`value\`를 받아 빈 문자열인지 확인하는 함수 \`is_empty\`를 작성하시오.

조건은 다음과 같다.

\`\`\`text
앞뒤 공백을 제거한 뒤 빈 문자열이면 True를 반환한다.
그렇지 않으면 False를 반환한다.
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
print(is_empty(""))
print(is_empty("   "))
print(is_empty("Python"))
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
True
True
False
\`\`\`

---

## 문제 10. 이메일 검증 함수 작성

문자열 \`email\`을 받아 이메일 형식이 간단히 올바른지 확인하는 함수 \`is_valid_email\`을 작성하시오.

조건은 다음과 같다.

\`\`\`text
문자열에 @가 포함되어 있고 .도 포함되어 있으면 True를 반환한다.
그렇지 않으면 False를 반환한다.
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
print(is_valid_email("user@example.com"))
print(is_valid_email("userexample.com"))
print(is_valid_email("user@example"))
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
True
False
False
\`\`\`

---

## 문제 11. 리스트 합계 함수 작성

숫자 리스트 \`numbers\`를 받아 모든 숫자의 합계를 반환하는 함수 \`calculate_sum\`을 작성하시오. \`sum()\`을 사용하지 않고 반복문으로 작성하시오.

실행 예시는 다음과 같다.

\`\`\`python
numbers = [10, 20, 30]
print(calculate_sum(numbers))
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
60
\`\`\`

---

## 문제 12. 조건에 맞는 데이터 필터링

상품 딕셔너리 리스트 \`products\`와 최소 가격 \`min_price\`를 받아, 가격이 \`min_price\` 이상인 상품만 리스트로 반환하는 함수 \`filter_products_by_price\`를 작성하시오.

실행 예시는 다음과 같다.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

result = filter_products_by_price(products, 30000)
print(result)
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
[{'name': '키보드', 'price': 30000}, {'name': '모니터', 'price': 200000}]
\`\`\`

---

## 문제 13. 람다 함수

다음 람다 함수와 같은 동작을 하는 일반 함수를 작성하시오.

\`\`\`python
multiply = lambda a, b: a * b
\`\`\`

---

## 문제 14. \`sorted()\`와 \`key\`

다음 학생 목록을 점수가 높은 순서로 정렬하는 코드를 작성하시오.

\`\`\`python
students = [
    {"name": "민수", "score": 80},
    {"name": "지영", "score": 95},
    {"name": "철수", "score": 70},
]
\`\`\`

기대 결과는 다음과 같다.

\`\`\`text
[{'name': '지영', 'score': 95}, {'name': '민수', 'score': 80}, {'name': '철수', 'score': 70}]
\`\`\`

---

## 문제 15. 함수 쪼개기

다음 함수는 여러 역할을 한 번에 수행한다. 역할별로 함수를 나누려면 어떤 함수들이 필요할지 함수 이름을 3개 이상 작성하시오.

\`\`\`python
def process_user(name, email, age):
    name = name.strip()
    email = email.strip().lower()
    if name == "":
        return "이름 오류"
    if "@" not in email:
        return "이메일 오류"
    if age < 19:
        return "미성년자"
    print(name, email, age)
    return "처리 완료"
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답은 1, 3, 5이다.

함수는 특정 작업을 수행하는 코드 묶음이다. 코드를 재사용하는 데 도움이 되며, \`return\`을 통해 결과값을 반환할 수 있다.

2번은 틀렸다. 매개변수가 없는 함수도 만들 수 있다.

\`\`\`python
def say_hello():
    print("안녕하세요")
\`\`\`

4번도 틀렸다. 함수는 정의만 해서는 실행되지 않고 호출해야 실행된다.

---

## 문제 2 정답

실행 결과는 다음과 같다.

\`\`\`text
민수님 안녕하세요
지영님 안녕하세요
\`\`\`

\`greet("민수")\`를 호출하면 \`name\`에 \`"민수"\`가 들어가고, \`greet("지영")\`을 호출하면 \`name\`에 \`"지영"\`이 들어간다.

---

## 문제 3 정답

실행 결과는 다음과 같다.

\`\`\`text
15
\`\`\`

\`add(10, 5)\`는 \`10 + 5\`의 결과인 \`15\`를 반환한다. 반환된 값이 \`result\`에 저장되고 출력된다.

---

## 문제 4 정답

실행 결과는 다음과 같다.

\`\`\`text
12
None
\`\`\`

\`multiply(3, 4)\`는 함수 안에서 \`12\`를 출력한다. 하지만 \`return\`이 없기 때문에 함수의 반환값은 \`None\`이다. 따라서 \`result\`에는 \`None\`이 저장된다.

---

## 문제 5 정답

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity


result = calculate_total_price(10000, 3)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
\`\`\`

상품 가격과 수량을 곱한 값을 반환하면 된다.

---

## 문제 6 정답

\`\`\`python
def calculate_delivery_fee(order_price):
    if order_price >= 50000:
        return 0
    return 3000


print(calculate_delivery_fee(60000))
print(calculate_delivery_fee(30000))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0
3000
\`\`\`

\`order_price\`가 50,000 이상이면 첫 번째 \`return\`이 실행되고 함수가 종료된다. 그렇지 않으면 3,000을 반환한다.

---

## 문제 7 정답

실행 결과는 다음과 같다.

\`\`\`text
홍길동님 환영합니다
손님님 환영합니다
\`\`\`

첫 번째 호출에서는 \`name\`에 \`"홍길동"\`이 들어간다. 두 번째 호출에서는 인자를 전달하지 않았기 때문에 기본값 \`"손님"\`이 사용된다.

---

## 문제 8 정답

\`message\`는 \`create_message\` 함수 안에서 만든 지역 변수이다. 지역 변수는 함수 안에서만 사용할 수 있다. 함수 밖에서 \`print(message)\`를 실행하면 \`message\`라는 이름을 찾을 수 없기 때문에 \`NameError\`가 발생한다.

함수 안에서 만든 값을 밖에서 사용하려면 \`return\`으로 반환해야 한다.

\`\`\`python
def create_message():
    message = "안녕하세요"
    return message


result = create_message()
print(result)
\`\`\`

---

## 문제 9 정답

\`\`\`python
def is_empty(value):
    return value.strip() == ""


print(is_empty(""))
print(is_empty("   "))
print(is_empty("Python"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
True
False
\`\`\`

\`strip()\`은 문자열 앞뒤 공백을 제거한다. 공백을 제거한 결과가 빈 문자열이면 \`True\`를 반환한다.

---

## 문제 10 정답

\`\`\`python
def is_valid_email(email):
    return "@" in email and "." in email


print(is_valid_email("user@example.com"))
print(is_valid_email("userexample.com"))
print(is_valid_email("user@example"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
False
\`\`\`

이 함수는 매우 단순한 이메일 검사이다. 실제 서비스에서는 더 정교한 검증이 필요할 수 있다. 여기서는 검증 로직을 함수로 분리하는 방법을 익히는 것이 목적이다.

---

## 문제 11 정답

\`\`\`python
def calculate_sum(numbers):
    total = 0
    for number in numbers:
        total += number
    return total


numbers = [10, 20, 30]
print(calculate_sum(numbers))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
60
\`\`\`

반복문으로 리스트의 값을 하나씩 꺼내 \`total\`에 누적하면 된다.

---

## 문제 12 정답

\`\`\`python
def filter_products_by_price(products, min_price):
    result = []
    for product in products:
        if product["price"] >= min_price:
            result.append(product)
    return result


products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

result = filter_products_by_price(products, 30000)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '키보드', 'price': 30000}, {'name': '모니터', 'price': 200000}]
\`\`\`

조건에 맞는 상품 딕셔너리만 새 리스트에 담아 반환한다.

---

## 문제 13 정답

\`\`\`python
def multiply(a, b):
    return a * b
\`\`\`

람다 함수 \`lambda a, b: a * b\`는 두 값을 받아 곱한 결과를 반환한다. 같은 동작을 일반 함수로 작성하면 위와 같다.

---

## 문제 14 정답

\`\`\`python
students = [
    {"name": "민수", "score": 80},
    {"name": "지영", "score": 95},
    {"name": "철수", "score": 70},
]

result = sorted(students, key=lambda student: student["score"], reverse=True)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '지영', 'score': 95}, {'name': '민수', 'score': 80}, {'name': '철수', 'score': 70}]
\`\`\`

\`key\`에는 정렬 기준을 반환하는 함수를 전달한다. 여기서는 각 학생 딕셔너리의 \`score\` 값을 기준으로 정렬한다. 높은 순서가 필요하므로 \`reverse=True\`를 사용한다.

---

## 문제 15 정답 예시

역할별로 다음과 같은 함수로 나눌 수 있다.

\`\`\`python
def clean_name(name):
    return name.strip()


def clean_email(email):
    return email.strip().lower()


def is_valid_name(name):
    return name != ""


def is_valid_email(email):
    return "@" in email


def is_adult(age):
    return age >= 19


def print_user(name, email, age):
    print(name, email, age)
\`\`\`

함수 이름은 정답이 하나로 정해져 있지 않다. 중요한 것은 데이터 정리, 검증, 출력처럼 서로 다른 역할을 함수로 분리하는 것이다.

---

# 다음 장으로 넘어가기 전에

이 장에서는 함수를 배웠다. 함수는 단순히 코드를 줄이는 도구가 아니라, 프로그램을 작은 단위로 나누어 관리하는 방법이다. 좋은 함수는 코드를 읽기 쉽게 만들고, 수정하기 쉽게 만들고, 테스트하기 쉽게 만든다.

다음 장에서는 예외 처리와 디버깅을 배운다. 지금까지 작성한 코드는 올바른 입력값이 들어온다는 가정 아래 동작했다. 하지만 실제 프로그램에서는 숫자가 들어와야 할 자리에 문자가 들어오거나, 없는 key를 조회하거나, 잘못된 값이 들어오는 일이 자주 발생한다. 이런 상황에서 프로그램이 갑자기 멈추지 않도록 처리하는 방법이 예외 처리이다.
`;export{e as default};