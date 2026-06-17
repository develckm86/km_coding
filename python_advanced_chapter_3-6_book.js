var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-6 -->

# 3.6 함수 설계 실무 패턴

함수 고급 문법을 배웠다면 이제 중요한 질문이 남습니다.

“실무에서는 함수를 어떻게 설계해야 할까?”

함수를 많이 만드는 것보다 중요한 것은 **좋은 단위로 나누는 것**입니다. 좋은 함수는 읽기 쉽고, 테스트하기 쉽고, 재사용하기 쉽습니다.

---

### 3.6.1 순수 함수

순수 함수는 같은 입력을 넣으면 항상 같은 출력을 반환하고, 함수 밖의 상태를 바꾸지 않는 함수입니다.

\`\`\`python
def calculate_total(price, quantity):
    return price * quantity
\`\`\`

이 함수는 \`price\`와 \`quantity\`가 같으면 항상 같은 결과를 반환합니다. 또한 함수 밖의 변수를 바꾸지 않습니다.

순수 함수는 테스트하기 쉽습니다.

\`\`\`python
assert calculate_total(10000, 3) == 30000
\`\`\`

데이터 처리 코드에서는 가능한 한 핵심 계산 로직을 순수 함수로 만드는 것이 좋습니다.

---

### 3.6.2 부수 효과가 있는 함수

부수 효과가 있는 함수는 함수 밖의 상태에 영향을 줍니다.

예를 들면 다음과 같습니다.

- 화면에 출력한다.
- 파일을 저장한다.
- 데이터베이스에 기록한다.
- 전역 변수를 수정한다.
- API를 호출한다.
- 리스트나 딕셔너리를 직접 변경한다.

\`\`\`python
def add_item(items, item):
    items.append(item)
\`\`\`

이 함수는 반환값이 없어도 \`items\` 리스트를 변경합니다.

\`\`\`python
products = ["키보드"]
add_item(products, "마우스")

print(products)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['키보드', '마우스']
\`\`\`

부수 효과가 항상 나쁜 것은 아닙니다. 파일 저장, 로그 기록, DB 저장 같은 작업은 부수 효과가 필요합니다. 중요한 것은 **부수 효과가 있는 함수를 명확히 구분하는 것**입니다.

---

### 3.6.3 입력과 출력이 명확한 함수 만들기

좋은 함수는 무엇을 입력받고 무엇을 반환하는지 명확합니다.

좋지 않은 예를 보겠습니다.

\`\`\`python
def process(data):
    result = []
    for item in data:
        if item["price"] >= 10000:
            result.append(item)
    print(result)
\`\`\`

이 함수는 데이터를 처리하지만 결과를 반환하지 않고 출력만 합니다. 다른 곳에서 결과를 재사용하기 어렵습니다.

개선하면 다음과 같습니다.

\`\`\`python
def filter_expensive_products(products, minimum_price):
    result = []

    for product in products:
        if product["price"] >= minimum_price:
            result.append(product)

    return result
\`\`\`

이 함수는 입력과 출력이 명확합니다.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "USB", "price": 8000},
]

filtered = filter_expensive_products(products, 10000)
print(filtered)
\`\`\`

화면 출력은 별도의 코드에서 담당합니다. 처리 함수와 출력 함수를 분리하면 재사용성이 좋아집니다.

---

### 3.6.4 변환 함수와 검증 함수 분리하기

데이터 처리에서는 변환과 검증을 나누는 것이 좋습니다.

변환 함수는 입력값을 다른 형태로 바꿉니다.

\`\`\`python
def normalize_phone_number(phone_number):
    return phone_number.replace("-", "").strip()
\`\`\`

검증 함수는 값이 올바른지 True 또는 False로 판단합니다.

\`\`\`python
def is_valid_phone_number(phone_number):
    return phone_number.isdigit() and len(phone_number) == 11
\`\`\`

이 둘을 분리하면 테스트하기 쉽고, 문제가 생겼을 때 원인을 찾기도 쉽습니다.

\`\`\`python
phone = "010-1234-5678"
normalized_phone = normalize_phone_number(phone)

if is_valid_phone_number(normalized_phone):
    print("올바른 전화번호입니다.")
else:
    print("잘못된 전화번호입니다.")
\`\`\`

---

### 3.6.5 작은 함수들을 조합하기

하나의 큰 함수에 모든 로직을 넣으면 이해하기 어렵습니다.

좋지 않은 예는 다음과 같습니다.

\`\`\`python
def process_user(user):
    name = user["name"].strip()
    email = user["email"].strip().lower()
    phone = user["phone"].replace("-", "").strip()

    if not name:
        return None
    if "@" not in email:
        return None
    if not phone.isdigit():
        return None

    return {
        "name": name,
        "email": email,
        "phone": phone,
    }
\`\`\`

함수가 너무 많은 일을 하고 있습니다. 이름 정리, 이메일 정리, 전화번호 정리, 검증, 결과 생성까지 모두 담당합니다.

작은 함수로 나누면 다음과 같습니다.

\`\`\`python
def clean_name(name):
    return name.strip()


def clean_email(email):
    return email.strip().lower()


def clean_phone(phone):
    return phone.replace("-", "").strip()


def is_valid_user(name, email, phone):
    if not name:
        return False
    if "@" not in email:
        return False
    if not phone.isdigit():
        return False

    return True


def process_user(user):
    name = clean_name(user["name"])
    email = clean_email(user["email"])
    phone = clean_phone(user["phone"])

    if not is_valid_user(name, email, phone):
        return None

    return {
        "name": name,
        "email": email,
        "phone": phone,
    }
\`\`\`

함수가 많아졌지만 각각의 역할은 더 명확해졌습니다. 테스트도 쉬워집니다.

---

### 3.6.6 함수를 조합하는 파이프라인 패턴

여러 변환 함수를 순서대로 적용하는 구조를 파이프라인처럼 만들 수 있습니다.

\`\`\`python
def strip_text(text):
    return text.strip()


def lower_text(text):
    return text.lower()


def remove_dash(text):
    return text.replace("-", "")


def apply_pipeline(value, functions):
    for function in functions:
        value = function(value)

    return value

pipeline = [strip_text, lower_text, remove_dash]

result = apply_pipeline("  USER-001  ", pipeline)
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
user001
\`\`\`

이 방식의 장점은 처리 단계를 쉽게 추가하거나 제거할 수 있다는 점입니다.

\`\`\`python
pipeline = [strip_text, lower_text]
\`\`\`

또는 다음처럼 순서를 바꿀 수도 있습니다.

\`\`\`python
pipeline = [strip_text, remove_dash, lower_text]
\`\`\`

데이터분석 전처리 과정에서도 이런 사고방식이 중요합니다. 원천 데이터를 여러 단계로 나누어 정리하면 코드가 더 관리하기 쉬워집니다.

---

### 3.6.7 함수 이름 짓기

고급 문법을 많이 사용해도 함수 이름이 모호하면 좋은 코드가 아닙니다.

다음 함수 이름은 의미가 불분명합니다.

\`\`\`python
def process(data):
    pass


def handle(value):
    pass


def check(x):
    pass
\`\`\`

무엇을 처리하는지, 무엇을 확인하는지 알기 어렵습니다.

더 나은 이름은 다음과 같습니다.

\`\`\`python
def clean_customer_data(customers):
    pass


def calculate_total_price(order_items):
    pass


def is_valid_email(email):
    pass
\`\`\`

함수 이름만 읽어도 역할이 드러나야 합니다. 특히 데이터 처리 함수는 다음과 같은 동사를 자주 사용합니다.

- \`clean\`: 정리하다
- \`normalize\`: 형식을 통일하다
- \`validate\`: 검증하다
- \`calculate\`: 계산하다
- \`filter\`: 조건에 맞게 걸러내다
- \`parse\`: 문자열을 구조화된 데이터로 해석하다
- \`load\`: 불러오다
- \`save\`: 저장하다
- \`convert\`: 변환하다
- \`extract\`: 추출하다

---
`;export{e as default};