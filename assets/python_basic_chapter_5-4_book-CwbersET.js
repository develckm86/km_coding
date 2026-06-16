var e=`<!-- 원본: python_basic_chapter_5_book.md / 세부 장: 5-4 -->

# 5.4 실무형 함수 작성법

## 좋은 함수의 기준

함수 문법을 아는 것과 좋은 함수를 작성하는 것은 다르다. 실무에서는 단순히 코드가 실행되는 것보다 읽기 쉽고 수정하기 쉬운 함수가 중요하다.

좋은 함수에는 몇 가지 기준이 있다.

첫째, 하나의 함수는 하나의 역할만 담당해야 한다.

둘째, 함수 이름만 보아도 어떤 일을 하는지 알 수 있어야 한다.

셋째, 입력과 출력이 분명해야 한다.

넷째, 너무 긴 함수는 작은 함수로 나누는 것이 좋다.

다섯째, 함수 안에서 너무 많은 외부 변수에 의존하지 않는 것이 좋다.

이 기준들을 하나씩 살펴보자.

## 하나의 함수는 하나의 역할만 담당하기

다음 함수는 여러 일을 한꺼번에 한다.

\`\`\`python
def process_order(price, quantity, user_email):
    total = price * quantity
    if total >= 50000:
        delivery_fee = 0
    else:
        delivery_fee = 3000
    final_price = total + delivery_fee
    print("주문자:", user_email)
    print("최종 금액:", final_price)
\`\`\`

이 함수는 다음 일을 모두 하고 있다.

\`\`\`text
1. 주문 금액 계산
2. 배송비 계산
3. 최종 금액 계산
4. 주문자 출력
5. 최종 금액 출력
\`\`\`

작은 예제에서는 괜찮아 보일 수 있지만, 코드가 커지면 유지보수가 어려워진다.

역할별로 함수를 나누면 더 명확해진다.

\`\`\`python
def calculate_order_price(price, quantity):
    return price * quantity


def calculate_delivery_fee(order_price):
    if order_price >= 50000:
        return 0
    return 3000


def calculate_final_price(order_price, delivery_fee):
    return order_price + delivery_fee


def print_order_summary(user_email, final_price):
    print("주문자:", user_email)
    print("최종 금액:", final_price)
\`\`\`

이제 각 함수는 하나의 역할만 담당한다. 어떤 계산을 고쳐야 할 때 해당 함수만 찾아 수정하면 된다.

## 함수 이름을 명확하게 짓기

함수 이름은 함수가 하는 일을 설명해야 한다.

좋지 않은 함수 이름의 예는 다음과 같다.

\`\`\`python
def func(a, b):
    return a * b
\`\`\`

\`func\`라는 이름으로는 어떤 일을 하는지 알 수 없다. \`a\`, \`b\`도 의미가 분명하지 않다.

더 나은 이름은 다음과 같다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

이 함수는 상품 가격과 수량을 받아 총 금액을 계산한다는 것을 이름만 보고 알 수 있다.

함수 이름을 지을 때는 다음과 같은 표현을 자주 사용한다.

\`\`\`text
calculate_   계산한다
get_         가져온다
create_      만든다
update_      수정한다
delete_      삭제한다
check_       확인한다
is_          ~인지 판단한다
has_         ~을 가지고 있는지 판단한다
validate_    유효한지 검증한다
convert_     변환한다
clean_       정리한다
\`\`\`

예를 들어 다음 함수 이름은 의미가 분명하다.

\`\`\`python
def is_adult(age):
    return age >= 19


def has_stock(stock):
    return stock > 0


def clean_phone_number(phone):
    return phone.replace("-", "")


def convert_to_int(value):
    return int(value)
\`\`\`

특히 \`is_\`, \`has_\`로 시작하는 함수는 보통 \`True\` 또는 \`False\`를 반환한다.

\`\`\`python
def is_empty(value):
    return value == ""
\`\`\`

이런 이름은 조건문에서 읽기 좋다.

\`\`\`python
if is_empty(name):
    print("이름을 입력하세요")
\`\`\`

## 입력과 출력을 분명히 하기

좋은 함수는 어떤 값을 입력받고 어떤 값을 반환하는지 분명하다.

다음 함수는 입력과 출력이 명확하다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

입력은 \`price\`, \`quantity\`이고 출력은 총 금액이다.

반대로 다음 함수는 입력과 출력이 불분명하다.

\`\`\`python
total = 0


def calculate():
    global total
    total = price * quantity
\`\`\`

이 함수는 어디에서 \`price\`와 \`quantity\`를 가져오는지 알기 어렵고, \`total\`이라는 외부 변수를 직접 바꾼다. 이런 함수는 사용하기 어렵고 테스트하기도 어렵다.

가능하면 함수는 다음 형태로 작성하는 것이 좋다.

\`\`\`text
필요한 값은 매개변수로 받는다.
처리 결과는 return으로 반환한다.
\`\`\`

예시는 다음과 같다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

## \`print()\`와 \`return\` 구분하기

초보자가 함수에서 가장 자주 헷갈리는 부분 중 하나가 \`print()\`와 \`return\`이다.

\`print()\`는 화면에 값을 출력한다.

\`return\`은 함수의 결과를 밖으로 돌려준다.

다음 함수를 보자.

\`\`\`python
def add_with_print(a, b):
    print(a + b)


def add_with_return(a, b):
    return a + b
\`\`\`

두 함수는 비슷해 보이지만 다르다.

\`\`\`python
result1 = add_with_print(10, 20)
result2 = add_with_return(10, 20)

print("result1:", result1)
print("result2:", result2)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30
result1: None
result2: 30
\`\`\`

\`add_with_print\`는 화면에 \`30\`을 출력했지만 값을 반환하지 않았기 때문에 \`result1\`에는 \`None\`이 들어간다.

\`add_with_return\`은 \`30\`을 반환했기 때문에 \`result2\`에 \`30\`이 저장된다.

계산 결과를 이후 코드에서 다시 사용해야 한다면 \`return\`을 사용해야 한다.

\`\`\`python
def calculate_total(price, quantity):
    return price * quantity


total = calculate_total(10000, 3)
final_price = total + 3000

print(final_price)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
33000
\`\`\`

단순히 화면에 보여주기만 하면 되는 함수라면 \`print()\`를 사용할 수 있다.

\`\`\`python
def print_order_summary(total_price):
    print("주문 금액:", total_price)
\`\`\`

실무에서는 계산 함수와 출력 함수를 구분하는 것이 좋다.

## 너무 긴 함수 쪼개기

함수가 길어지면 읽기 어려워진다. 다음 코드를 보자.

\`\`\`python
def process_customer(name, email, phone):
    name = name.strip()
    email = email.strip().lower()
    phone = phone.replace("-", "")

    if name == "":
        return "이름 오류"
    if "@" not in email:
        return "이메일 오류"
    if not phone.isdigit():
        return "전화번호 오류"

    print("고객명:", name)
    print("이메일:", email)
    print("전화번호:", phone)
    return "처리 완료"
\`\`\`

이 함수는 데이터 정리, 검증, 출력까지 한꺼번에 하고 있다. 역할별로 나누면 더 좋다.

\`\`\`python
def clean_name(name):
    return name.strip()


def clean_email(email):
    return email.strip().lower()


def clean_phone(phone):
    return phone.replace("-", "")


def is_valid_customer(name, email, phone):
    if name == "":
        return False
    if "@" not in email:
        return False
    if not phone.isdigit():
        return False
    return True


def print_customer(name, email, phone):
    print("고객명:", name)
    print("이메일:", email)
    print("전화번호:", phone)
\`\`\`

이렇게 나누면 각 함수의 역할이 분명해진다. 특정 부분만 다시 사용할 수도 있다.

예를 들어 전화번호 정리 기능만 다른 곳에서 사용할 수 있다.

\`\`\`python
phone = clean_phone("010-1234-5678")
print(phone)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
01012345678
\`\`\`

## 입력값 검증 함수 만들기

실무에서는 사용자 입력, 파일 데이터, API 응답처럼 외부에서 들어온 값을 많이 다룬다. 외부 데이터는 항상 올바르다고 가정하면 안 된다.

검증 함수는 값이 올바른지 확인하는 함수이다.

예를 들어 빈 문자열인지 확인하는 함수를 만들 수 있다.

\`\`\`python
def is_empty(value):
    return value.strip() == ""
\`\`\`

사용 예는 다음과 같다.

\`\`\`python
name = "   "

if is_empty(name):
    print("이름을 입력하세요")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
이름을 입력하세요
\`\`\`

숫자 문자열인지 확인하는 함수도 만들 수 있다.

\`\`\`python
def is_number_string(value):
    return value.isdigit()


print(is_number_string("123"))
print(is_number_string("12a"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
\`\`\`

이메일 형식을 간단히 검사하는 함수도 만들 수 있다.

\`\`\`python
def is_valid_email(email):
    return "@" in email and "." in email


print(is_valid_email("user@example.com"))
print(is_valid_email("userexample"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
\`\`\`

정확한 이메일 검사는 더 복잡하지만, 지금 단계에서는 함수로 검증 로직을 분리하는 것이 중요하다.

## 함수에서 조건문 사용하기

함수 안에서는 조건문을 자유롭게 사용할 수 있다.

\`\`\`python
def get_member_grade(point):
    if point >= 10000:
        return "VIP"
    if point >= 5000:
        return "Gold"
    if point >= 1000:
        return "Silver"
    return "Basic"


print(get_member_grade(12000))
print(get_member_grade(3000))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
VIP
Silver
\`\`\`

이 함수는 포인트에 따라 회원 등급을 반환한다. 각 조건에서 \`return\`을 사용했기 때문에 조건이 맞으면 함수가 바로 종료된다.

\`elif\`를 사용해도 된다.

\`\`\`python
def get_member_grade(point):
    if point >= 10000:
        return "VIP"
    elif point >= 5000:
        return "Gold"
    elif point >= 1000:
        return "Silver"
    else:
        return "Basic"
\`\`\`

두 방식 모두 사용할 수 있다.

## 함수에서 반복문 사용하기

함수 안에서는 반복문도 사용할 수 있다.

\`\`\`python
def calculate_total_sales(sales):
    total = 0
    for sale in sales:
        total += sale
    return total


sales = [10000, 20000, 15000]
result = calculate_total_sales(sales)

print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
45000
\`\`\`

물론 파이썬의 내장 함수 \`sum()\`을 사용하면 더 간단하다.

\`\`\`python
def calculate_total_sales(sales):
    return sum(sales)
\`\`\`

하지만 반복문으로 직접 작성해 보면 함수 안에서 데이터가 어떻게 처리되는지 이해할 수 있다.

조건에 맞는 값만 모으는 함수도 만들 수 있다.

\`\`\`python
def filter_expensive_products(products, min_price):
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

filtered_products = filter_expensive_products(products, 30000)
print(filtered_products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '키보드', 'price': 30000}, {'name': '모니터', 'price': 200000}]
\`\`\`

이처럼 함수, 반복문, 조건문, 자료구조는 함께 사용되는 경우가 많다.

## 실무 예제: 최종 결제 금액 계산

상품 가격, 수량, 할인율, 배송비를 고려해 최종 결제 금액을 계산해 보자.

먼저 각 기능을 함수로 나눈다.

\`\`\`python
def calculate_order_price(price, quantity):
    return price * quantity


def calculate_discount(order_price, discount_rate):
    return order_price * discount_rate


def calculate_delivery_fee(order_price):
    if order_price >= 50000:
        return 0
    return 3000


def calculate_final_price(order_price, discount, delivery_fee):
    return order_price - discount + delivery_fee
\`\`\`

이제 함수를 조합해서 사용한다.

\`\`\`python
price = 12000
quantity = 3
discount_rate = 0.1

order_price = calculate_order_price(price, quantity)
discount = calculate_discount(order_price, discount_rate)
delivery_fee = calculate_delivery_fee(order_price)
final_price = calculate_final_price(order_price, discount, delivery_fee)

print("주문 금액:", order_price)
print("할인 금액:", discount)
print("배송비:", delivery_fee)
print("최종 결제 금액:", final_price)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
주문 금액: 36000
할인 금액: 3600.0
배송비: 3000
최종 결제 금액: 35400.0
\`\`\`

코드는 조금 길어 보일 수 있지만, 각 함수의 역할이 분명하다. 나중에 할인 계산 방식이나 배송비 기준이 바뀌면 해당 함수만 수정하면 된다.

## 실무 예제: 고객 데이터 정리

고객 데이터에서 이름, 이메일, 전화번호를 정리하는 함수를 만들어 보자.

\`\`\`python
def clean_name(name):
    return name.strip()


def clean_email(email):
    return email.strip().lower()


def clean_phone_number(phone):
    return phone.replace("-", "").strip()


def clean_customer(customer):
    return {
        "name": clean_name(customer["name"]),
        "email": clean_email(customer["email"]),
        "phone": clean_phone_number(customer["phone"]),
    }
\`\`\`

사용 예는 다음과 같다.

\`\`\`python
customer = {
    "name": "  홍길동  ",
    "email": "HONG@EXAMPLE.COM ",
    "phone": "010-1234-5678",
}

cleaned_customer = clean_customer(customer)
print(cleaned_customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '홍길동', 'email': 'hong@example.com', 'phone': '01012345678'}
\`\`\`

이 예제에서는 작은 함수들을 조합해 더 큰 함수를 만들었다. 실무 코드에서는 이런 방식이 자주 사용된다.

---
`;export{e as default};