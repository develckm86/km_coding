var e=`<!-- 원본: python_basic_chapter_5_book.md / 세부 장: 5-1 -->

# 5.1 함수가 필요한 이유

## 함수의 개념

함수는 특정 작업을 수행하는 코드 묶음이다.

프로그래밍에서 함수는 다음과 같은 구조로 생각할 수 있다.

\`\`\`text
입력값 → 함수 → 결과값
\`\`\`

예를 들어 두 숫자를 더하는 함수를 생각해 보자.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

이 함수는 숫자 두 개를 입력받고, 두 숫자를 더한 결과를 돌려준다.

\`\`\`python
result = add(10, 20)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30
\`\`\`

여기서 \`10\`과 \`20\`은 함수에 전달한 입력값이고, \`30\`은 함수가 돌려준 결과값이다.

함수는 이미 앞에서도 사용했다. \`print()\`, \`len()\`, \`type()\`, \`int()\`, \`str()\` 같은 것들이 모두 함수이다.

\`\`\`python
print("안녕하세요")
length = len("Python")
data_type = type(10)
number = int("100")
\`\`\`

우리가 직접 만든 함수와 파이썬이 기본으로 제공하는 함수의 차이는 “누가 만들었는가”이다. 사용하는 방식은 비슷하다. 이름을 쓰고 괄호를 붙여 호출한다.

## 코드를 재사용한다는 의미

함수를 사용하는 가장 큰 이유는 코드 재사용이다.

다음 코드를 보자.

\`\`\`python
price = 10000
quantity = 3
discount_rate = 0.1

total = price * quantity
discount = total * discount_rate
final_price = total - discount

print(final_price)
\`\`\`

이 코드는 상품 가격, 수량, 할인율을 이용해 최종 결제 금액을 계산한다. 한 번만 계산한다면 문제가 없다. 하지만 같은 계산을 여러 번 해야 한다면 어떻게 될까?

\`\`\`python
price1 = 10000
quantity1 = 3
discount_rate1 = 0.1

total1 = price1 * quantity1
discount1 = total1 * discount_rate1
final_price1 = total1 - discount1

price2 = 20000
quantity2 = 2
discount_rate2 = 0.2

total2 = price2 * quantity2
discount2 = total2 * discount_rate2
final_price2 = total2 - discount2
\`\`\`

계산 방식이 반복되고 있다. 이런 코드는 길어질수록 읽기 어렵고, 실수하기 쉽다.

함수로 만들면 다음처럼 정리할 수 있다.

\`\`\`python
def calculate_final_price(price, quantity, discount_rate):
    total = price * quantity
    discount = total * discount_rate
    final_price = total - discount
    return final_price


final_price1 = calculate_final_price(10000, 3, 0.1)
final_price2 = calculate_final_price(20000, 2, 0.2)

print(final_price1)
print(final_price2)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
27000.0
32000.0
\`\`\`

계산 로직은 함수 안에 한 번만 작성했다. 그리고 필요한 곳에서 함수를 호출했다. 같은 계산을 여러 번 해야 할 때 함수는 매우 유용하다.

## 코드 중복 제거

코드 중복은 실무에서 큰 문제가 된다.

같은 코드가 여러 곳에 있으면 다음 문제가 생긴다.

- 코드가 길어진다.
- 읽기 어렵다.
- 수정할 곳이 많아진다.
- 수정하다가 한 곳을 빠뜨릴 수 있다.
- 같은 실수가 여러 곳에서 반복될 수 있다.

예를 들어 배송비 계산 기준이 다음과 같다고 하자.

\`\`\`text
주문 금액이 50,000원 이상이면 배송비 무료
그렇지 않으면 배송비 3,000원
\`\`\`

이 기준을 여러 곳에서 직접 작성하면 다음처럼 된다.

\`\`\`python
order_price = 40000

if order_price >= 50000:
    delivery_fee = 0
else:
    delivery_fee = 3000

print(delivery_fee)
\`\`\`

다른 곳에서도 같은 기준을 써야 한다.

\`\`\`python
cart_total = 70000

if cart_total >= 50000:
    cart_delivery_fee = 0
else:
    cart_delivery_fee = 3000

print(cart_delivery_fee)
\`\`\`

만약 무료배송 기준이 50,000원에서 30,000원으로 바뀌면 모든 코드를 찾아서 바꿔야 한다. 실무에서는 이런 변경이 자주 발생한다.

함수로 만들면 기준을 한 곳에서 관리할 수 있다.

\`\`\`python
def calculate_delivery_fee(order_price):
    if order_price >= 50000:
        return 0
    return 3000


fee1 = calculate_delivery_fee(40000)
fee2 = calculate_delivery_fee(70000)

print(fee1)
print(fee2)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
3000
0
\`\`\`

이제 무료배송 기준이 바뀌면 함수 안의 조건만 수정하면 된다.

## 유지보수성 향상

유지보수란 이미 작성된 코드를 수정하고 개선하는 작업이다. 실무에서 코드는 한 번 작성하고 끝나지 않는다. 요구사항은 바뀌고, 예외 상황은 추가되고, 계산 기준도 달라진다.

함수는 유지보수성을 높여 준다. 기능이 함수 단위로 나누어져 있으면 어느 부분을 수정해야 하는지 찾기 쉽다.

예를 들어 다음 함수 이름을 보자.

\`\`\`python
def calculate_discount_price(price, discount_rate):
    return price - (price * discount_rate)
\`\`\`

함수 이름만 보아도 할인 가격을 계산하는 함수라는 것을 알 수 있다. 나중에 할인 계산 방식이 바뀌면 이 함수를 찾아 수정하면 된다.

반대로 계산식이 프로그램 곳곳에 흩어져 있으면 수정할 위치를 찾기 어렵다.

## 읽기 쉬운 코드 만들기

함수는 코드의 의미를 드러내는 데도 도움이 된다.

다음 코드를 보자.

\`\`\`python
price = 10000
quantity = 3
rate = 0.1

result = price * quantity - (price * quantity * rate)
\`\`\`

코드가 길지는 않지만, \`result\`가 정확히 무엇을 의미하는지 바로 파악하기 어렵다.

함수를 사용하면 코드가 문장처럼 읽힌다.

\`\`\`python
def calculate_final_price(price, quantity, discount_rate):
    total = price * quantity
    discount = total * discount_rate
    return total - discount


final_price = calculate_final_price(10000, 3, 0.1)
\`\`\`

\`calculate_final_price\`라는 이름 덕분에 이 코드가 “최종 가격을 계산한다”는 것을 쉽게 알 수 있다.

좋은 함수 이름은 코드에 설명을 추가하는 역할을 한다.

## 문제를 작은 단위로 나누기

프로그래밍은 큰 문제를 작은 문제로 나누어 해결하는 과정이다.

예를 들어 주문 처리 프로그램을 만든다고 생각해 보자. 주문 처리에는 여러 단계가 있다.

\`\`\`text
1. 주문 데이터 확인
2. 상품 재고 확인
3. 주문 금액 계산
4. 배송비 계산
5. 결제 금액 계산
6. 주문 결과 저장
\`\`\`

이 모든 내용을 하나의 긴 코드로 작성하면 이해하기 어렵다. 대신 각 단계를 함수로 나누면 구조가 명확해진다.

\`\`\`python
def validate_order(order):
    pass


def check_stock(order):
    pass


def calculate_order_price(order):
    pass


def calculate_delivery_fee(order_price):
    pass


def save_order(order):
    pass
\`\`\`

여기서 \`pass\`는 아직 코드를 작성하지 않았다는 뜻으로 사용하는 임시 문법이다.

함수로 나누면 프로그램 전체 흐름을 쉽게 파악할 수 있다. 실무에서는 코드가 길어질수록 이런 구조화가 중요해진다.

## 함수가 필요한 상황

다음 상황에서는 함수를 사용하는 것이 좋다.

첫째, 같은 코드가 두 번 이상 반복된다.

\`\`\`python
def print_line():
    print("--------------------")
\`\`\`

둘째, 특정 계산이나 처리를 여러 곳에서 사용한다.

\`\`\`python
def calculate_tax(price):
    return price * 0.1
\`\`\`

셋째, 코드의 의미를 이름으로 표현하고 싶다.

\`\`\`python
def is_adult(age):
    return age >= 19
\`\`\`

넷째, 긴 코드를 작은 단위로 나누고 싶다.

\`\`\`python
def clean_phone_number(phone):
    return phone.replace("-", "")
\`\`\`

다섯째, 나중에 테스트하거나 재사용하고 싶다.

\`\`\`python
def is_valid_email(email):
    return "@" in email
\`\`\`

함수는 단순히 문법이 아니라 코드를 관리하는 방법이다.

---
`;export{e as default};