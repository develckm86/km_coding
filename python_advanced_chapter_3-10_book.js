var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-10 -->

# 3.10 정답 및 해설

### 문제 1 정답

\`\`\`python
def greet(name):
    return f"Hello, {name}"

hello = greet

print(hello("Python"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Hello, Python
\`\`\`

\`hello = greet\`는 함수를 실행하는 코드가 아니라, \`greet\` 함수 객체를 \`hello\`라는 이름으로도 가리키게 하는 코드입니다.

---

### 문제 2 정답

\`\`\`python
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b

operations = {
    "add": add,
    "subtract": subtract,
}

print(operations["add"](10, 3))
print(operations["subtract"](10, 3))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
13
7
\`\`\`

함수를 딕셔너리에 저장하면 문자열 key를 기준으로 실행할 함수를 선택할 수 있습니다.

---

### 문제 3 정답

\`\`\`python
def find_max(*numbers):
    if not numbers:
        return None

    return max(numbers)

print(find_max(10, 3, 25, 7))
print(find_max())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
25
None
\`\`\`

\`*numbers\`는 전달된 위치 인자를 튜플로 받습니다. 값이 없으면 빈 튜플이 됩니다.

---

### 문제 4 정답

\`\`\`python
def print_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_profile(name="민수", age=25, email="minsu@example.com")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
name: 민수
age: 25
email: minsu@example.com
\`\`\`

\`**kwargs\`는 키워드 인자를 딕셔너리로 받습니다.

---

### 문제 5 정답

\`\`\`python
def calculate_total(price, quantity, discount_rate):
    return price * quantity * (1 - discount_rate)

values = [10000, 3, 0.1]
result = calculate_total(*values)

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
27000.0
\`\`\`

\`*values\`는 리스트 안의 값을 위치 인자로 풀어서 전달합니다.

---

### 문제 6 정답

\`\`\`python
def create_user(name, age, email):
    return {
        "name": name,
        "age": age,
        "email": email,
    }

user_data = {
    "name": "지영",
    "age": 28,
    "email": "jiyoung@example.com",
}

user = create_user(**user_data)
print(user)
\`\`\`

\`**user_data\`는 딕셔너리의 key와 value를 키워드 인자로 풀어서 전달합니다.

---

### 문제 7 정답

\`\`\`python
def square(number):
    return number * number

numbers = [1, 2, 3, 4, 5]
result = list(map(square, numbers))

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

람다 함수를 사용하면 다음과 같이 쓸 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
result = list(map(lambda number: number * number, numbers))

print(result)
\`\`\`

---

### 문제 8 정답

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]


def is_expensive(product):
    return product["price"] >= 30000

expensive_products = list(filter(is_expensive, products))

print(expensive_products)
\`\`\`

람다 함수를 사용하면 다음과 같습니다.

\`\`\`python
expensive_products = list(
    filter(lambda product: product["price"] >= 30000, products)
)
\`\`\`

---

### 문제 9 정답

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

print(sorted_products)
\`\`\`

가격이 낮은 순서로 정렬됩니다.

---

### 문제 10 정답

\`\`\`python
def make_discount_calculator(discount_rate):
    def calculate(price):
        return price * (1 - discount_rate)

    return calculate

vip_discount = make_discount_calculator(0.2)
print(vip_discount(10000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
8000.0
\`\`\`

\`calculate\` 함수는 외부 함수의 변수인 \`discount_rate\`를 기억합니다. 이것이 클로저입니다.

---

### 문제 11 정답

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total

result = calculate_total(10000, 3)
print(result)
\`\`\`

출력만 하는 함수보다 값을 반환하는 함수가 재사용하기 쉽습니다.

---

### 문제 12 정답

\`\`\`python
def clean_user(user):
    return {
        "name": user["name"].strip(),
        "email": user["email"].strip().lower(),
    }

user = {
    "name": "  Kim  ",
    "email": "KIM@EXAMPLE.COM",
}

cleaned_user = clean_user(user)
print(cleaned_user)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`python
{'name': 'Kim', 'email': 'kim@example.com'}
\`\`\`

입력 딕셔너리를 직접 수정하지 않고 새 딕셔너리를 반환하면 함수의 동작이 더 예측 가능해집니다.

---
`;export{e as default};