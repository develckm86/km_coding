var e=`# 5장. 함수

## 이 장에서 배우는 것

4장에서는 리스트, 튜플, 딕셔너리, 집합처럼 여러 데이터를 묶어서 관리하는 방법을 배웠다. 이제 우리는 데이터를 저장하고, 반복문으로 처리하고, 조건문으로 판단할 수 있다. 하지만 프로그램이 조금만 길어져도 같은 코드가 여러 번 반복되기 시작한다.

예를 들어 쇼핑몰 주문 금액을 계산한다고 생각해 보자.

\`\`\`python
price1 = 12000
quantity1 = 3
total1 = price1 * quantity1

price2 = 15000
quantity2 = 2
total2 = price2 * quantity2

price3 = 8000
quantity3 = 5
total3 = price3 * quantity3
\`\`\`

위 코드는 어렵지는 않지만 같은 형태의 계산이 계속 반복된다. 주문이 많아질수록 비슷한 코드가 계속 늘어난다. 나중에 계산 방식이 바뀌면 반복된 코드를 모두 찾아서 고쳐야 한다.

이럴 때 사용하는 것이 함수이다. 함수는 자주 사용하는 코드를 하나의 이름으로 묶어 두고, 필요할 때마다 호출해서 사용하는 문법이다.

\`\`\`python
def calculate_total(price, quantity):
    return price * quantity


total1 = calculate_total(12000, 3)
total2 = calculate_total(15000, 2)
total3 = calculate_total(8000, 5)
\`\`\`

함수를 사용하면 코드가 짧아지고, 의미가 분명해지고, 수정하기 쉬워진다. 함수는 파이썬을 실무에서 사용하기 위해 반드시 익혀야 하는 핵심 문법이다.

이 장에서는 다음 내용을 배운다.

- 함수가 필요한 이유
- 함수 정의와 호출
- 매개변수와 인자
- 반환값
- 기본값 인자와 키워드 인자
- 변수의 범위
- 좋은 함수 작성법
- \`print()\`와 \`return\`의 차이
- 입력값 검증 함수 만들기
- 람다 함수와 고차 함수 기초

이 장을 마치면 반복되는 코드를 함수로 분리하고, 입력값을 받아 결과를 반환하는 코드를 작성할 수 있다. 이후 예외 처리, 객체지향 프로그래밍, 파일 처리, 데이터 처리에서도 함수는 계속 사용된다.

---

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

# 5.2 함수 기본 문법

## 함수 정의

파이썬에서 함수를 만들 때는 \`def\`를 사용한다.

기본 구조는 다음과 같다.

\`\`\`python
def 함수이름(매개변수):
    실행할 코드
    return 반환값
\`\`\`

예를 들어 두 숫자를 더하는 함수를 만들어 보자.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

이 함수의 구성은 다음과 같다.

\`\`\`text
def              함수를 정의할 때 사용하는 키워드
add              함수 이름
a, b             매개변수
return a + b     결과값 반환
\`\`\`

함수 본문은 반드시 들여쓰기해야 한다. 들여쓰기된 부분이 함수에 포함되는 코드이다.

\`\`\`python
def say_hello():
    print("안녕하세요")
\`\`\`

위 코드에서 \`print("안녕하세요")\`는 함수 안에 있는 코드이다.

함수 이름을 지을 때는 보통 소문자와 언더스코어를 사용한다.

\`\`\`python
def calculate_total_price():
    pass
\`\`\`

함수 이름은 보통 동사로 시작하거나, 함수가 하는 일을 설명하는 형태로 작성한다.

\`\`\`python
def get_user_name():
    pass


def calculate_discount():
    pass


def validate_email():
    pass
\`\`\`

## 함수 호출

함수는 정의만 해서는 실행되지 않는다. 함수를 실행하려면 호출해야 한다.

\`\`\`python
def say_hello():
    print("안녕하세요")


say_hello()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요
\`\`\`

함수 호출은 함수 이름 뒤에 괄호를 붙여서 한다.

\`\`\`python
say_hello()
\`\`\`

다음 코드를 보자.

\`\`\`python
def say_hello():
    print("안녕하세요")


print("함수 호출 전")
say_hello()
print("함수 호출 후")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
함수 호출 전
안녕하세요
함수 호출 후
\`\`\`

파이썬은 위에서 아래로 코드를 실행하다가 \`say_hello()\`를 만나면 함수 안으로 들어가 코드를 실행한다. 함수 실행이 끝나면 다시 호출한 위치로 돌아온다.

## 정의와 호출의 차이

초보자가 자주 헷갈리는 부분이 함수 정의와 함수 호출이다.

\`\`\`python
def greet():
    print("반갑습니다")
\`\`\`

위 코드는 함수를 정의한 것이다. 아직 실행된 것은 아니다. 다음처럼 호출해야 함수 안의 코드가 실행된다.

\`\`\`python
greet()
\`\`\`

전체 코드는 다음과 같다.

\`\`\`python
def greet():
    print("반갑습니다")


greet()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
반갑습니다
\`\`\`

함수 정의는 “이런 기능을 만들겠다”는 선언이고, 함수 호출은 “그 기능을 지금 실행하겠다”는 의미이다.

## 매개변수와 인자

함수는 외부에서 값을 받아 처리할 수 있다. 이때 사용하는 것이 매개변수와 인자이다.

\`\`\`python
def greet(name):
    print(name, "님 안녕하세요")


greet("홍길동")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동 님 안녕하세요
\`\`\`

여기서 \`name\`은 매개변수이다. 함수가 값을 받기 위해 미리 정해 둔 이름이다.

\`"홍길동"\`은 인자이다. 함수를 호출할 때 실제로 전달한 값이다.

\`\`\`text
매개변수: 함수를 정의할 때 사용하는 이름
인자: 함수를 호출할 때 전달하는 실제 값
\`\`\`

하나의 함수는 여러 개의 매개변수를 가질 수 있다.

\`\`\`python
def introduce(name, age):
    print("이름:", name)
    print("나이:", age)


introduce("김민수", 25)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
이름: 김민수
나이: 25
\`\`\`

호출할 때 전달한 인자는 순서대로 매개변수에 들어간다.

\`\`\`text
"김민수" → name
25 → age
\`\`\`

## 위치 인자

위치 인자는 순서에 따라 전달되는 인자이다.

\`\`\`python
def calculate_total(price, quantity):
    return price * quantity


result = calculate_total(10000, 3)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
\`\`\`

\`10000\`은 첫 번째 매개변수 \`price\`에 들어가고, \`3\`은 두 번째 매개변수 \`quantity\`에 들어간다.

순서가 바뀌면 의미가 달라질 수 있다.

\`\`\`python
def print_order(product_name, quantity):
    print(product_name, "상품을", quantity, "개 주문했습니다.")


print_order("키보드", 2)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
키보드 상품을 2 개 주문했습니다.
\`\`\`

하지만 순서를 바꾸면 어색한 결과가 나온다.

\`\`\`python
print_order(2, "키보드")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
2 상품을 키보드 개 주문했습니다.
\`\`\`

위치 인자는 순서가 중요하다.

## 키워드 인자

키워드 인자는 매개변수 이름을 직접 지정해서 전달하는 인자이다.

\`\`\`python
def print_order(product_name, quantity):
    print(product_name, "상품을", quantity, "개 주문했습니다.")


print_order(product_name="키보드", quantity=2)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
키보드 상품을 2 개 주문했습니다.
\`\`\`

키워드 인자를 사용하면 순서를 바꿔도 된다.

\`\`\`python
print_order(quantity=2, product_name="키보드")
\`\`\`

실행 결과는 같다.

\`\`\`text
키보드 상품을 2 개 주문했습니다.
\`\`\`

키워드 인자는 인자가 많을 때 코드의 의미를 분명하게 만들어 준다.

\`\`\`python
def create_user(name, email, age, is_admin):
    print(name, email, age, is_admin)


create_user(
    name="이서연",
    email="seoyeon@example.com",
    age=28,
    is_admin=False
)
\`\`\`

위 코드는 각 값이 어떤 의미인지 쉽게 알 수 있다.

## 반환값

함수는 작업 결과를 돌려줄 수 있다. 이때 사용하는 문법이 \`return\`이다.

\`\`\`python
def add(a, b):
    return a + b


result = add(10, 20)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30
\`\`\`

\`return a + b\`는 \`a + b\`의 결과를 함수 밖으로 돌려준다는 의미이다.

반환값은 변수에 저장할 수 있다.

\`\`\`python
total = add(100, 200)
\`\`\`

다른 계산에 사용할 수도 있다.

\`\`\`python
result = add(10, 20) * 2
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
60
\`\`\`

함수의 반환값은 함수 호출식의 결과가 된다.

## \`return\`은 함수를 종료한다

\`return\`은 결과를 돌려줄 뿐 아니라 함수를 종료한다.

\`\`\`python
def check_age(age):
    if age >= 19:
        return "성인"
    return "미성년자"


print(check_age(20))
print(check_age(15))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
성인
미성년자
\`\`\`

\`age\`가 19 이상이면 첫 번째 \`return\`이 실행되고 함수가 끝난다. 그 아래 코드는 실행되지 않는다.

다음 예를 보자.

\`\`\`python
def test_return():
    print("첫 번째 출력")
    return "결과"
    print("두 번째 출력")


result = test_return()
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
첫 번째 출력
결과
\`\`\`

\`return\` 아래에 있는 \`print("두 번째 출력")\`은 실행되지 않는다.

## 반환값이 없는 함수

모든 함수가 반드시 반환값을 가져야 하는 것은 아니다.

\`\`\`python
def print_welcome_message(name):
    print(name, "님 환영합니다.")


print_welcome_message("홍길동")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동 님 환영합니다.
\`\`\`

이 함수는 화면에 메시지를 출력하지만 값을 반환하지는 않는다.

반환값이 없는 함수의 결과를 변수에 저장하면 \`None\`이 들어간다.

\`\`\`python
def print_message():
    print("안녕하세요")


result = print_message()
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요
None
\`\`\`

함수에서 \`return\`을 쓰지 않으면 파이썬은 자동으로 \`None\`을 반환한다.

## 여러 값 반환하기

파이썬 함수는 여러 값을 반환할 수 있다.

\`\`\`python
def get_user_info():
    name = "김민수"
    age = 25
    return name, age


user_name, user_age = get_user_info()

print(user_name)
print(user_age)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
25
\`\`\`

겉으로는 여러 값을 반환하는 것처럼 보이지만, 실제로는 튜플을 반환한다.

\`\`\`python
def get_point():
    return 10, 20


point = get_point()
print(point)
print(type(point))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
(10, 20)
<class 'tuple'>
\`\`\`

여러 값을 반환할 때는 받는 변수의 개수를 맞춰야 한다.

\`\`\`python
def get_name_and_age():
    return "이지영", 30


name, age = get_name_and_age()
\`\`\`

변수 개수가 맞지 않으면 에러가 발생한다.

## 기본값 인자

함수의 매개변수에는 기본값을 지정할 수 있다.

\`\`\`python
def greet(name="손님"):
    print(name, "님 안녕하세요")


greet("홍길동")
greet()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동 님 안녕하세요
손님 님 안녕하세요
\`\`\`

\`name\` 값을 전달하면 전달한 값이 사용된다. 값을 전달하지 않으면 기본값인 \`"손님"\`이 사용된다.

기본값 인자는 선택적으로 값을 받을 때 유용하다.

\`\`\`python
def calculate_delivery_fee(order_price, free_limit=50000):
    if order_price >= free_limit:
        return 0
    return 3000


print(calculate_delivery_fee(60000))
print(calculate_delivery_fee(40000))
print(calculate_delivery_fee(40000, 30000))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0
3000
0
\`\`\`

세 번째 호출에서는 무료배송 기준을 30,000원으로 직접 지정했다.

## 기본값 인자 사용 시 주의점

기본값이 있는 매개변수는 기본값이 없는 매개변수 뒤에 와야 한다.

올바른 예는 다음과 같다.

\`\`\`python
def create_user(name, age=0):
    print(name, age)
\`\`\`

잘못된 예는 다음과 같다.

\`\`\`python
def create_user(age=0, name):
    print(name, age)
\`\`\`

위 코드는 문법 에러가 발생한다. 기본값이 있는 매개변수 뒤에 기본값이 없는 매개변수가 올 수 없기 때문이다.

또 하나의 중요한 주의점이 있다. 리스트나 딕셔너리처럼 수정 가능한 값을 기본값으로 직접 쓰면 문제가 생길 수 있다.

\`\`\`python
def add_item(item, items=[]):
    items.append(item)
    return items


print(add_item("A"))
print(add_item("B"))
print(add_item("C"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A']
['A', 'B']
['A', 'B', 'C']
\`\`\`

많은 초보자는 매번 새 리스트가 만들어질 것이라고 생각하지만, 실제로는 같은 리스트가 계속 사용된다. 그래서 기본값으로 리스트를 직접 쓰는 방식은 피하는 것이 좋다.

일반적으로는 \`None\`을 기본값으로 사용하고 함수 안에서 새 리스트를 만든다.

\`\`\`python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items


print(add_item("A"))
print(add_item("B"))
print(add_item("C"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A']
['B']
['C']
\`\`\`

이 패턴은 실무 코드에서도 자주 사용된다.

## 문서 문자열

함수 안에 설명을 적어 둘 수 있다. 이를 문서 문자열 또는 docstring이라고 한다.

\`\`\`python
def calculate_total_price(price, quantity):
    """상품 가격과 수량을 받아 총 금액을 반환한다."""
    return price * quantity
\`\`\`

문서 문자열은 함수가 어떤 역할을 하는지 설명한다. 복잡한 함수일수록 간단한 설명이 도움이 된다.

\`\`\`python
def is_valid_email(email):
    """이메일 문자열에 @가 포함되어 있는지 확인한다."""
    return "@" in email
\`\`\`

주석을 많이 쓰기보다 함수 이름과 문서 문자열로 의도를 분명히 하는 것이 좋다.

## 함수 기본 문법 실무 예제

주문 금액을 계산하는 함수를 만들어 보자.

\`\`\`python
def calculate_order_price(price, quantity):
    return price * quantity


order1 = calculate_order_price(12000, 3)
order2 = calculate_order_price(8000, 5)

print(order1)
print(order2)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
36000
40000
\`\`\`

배송비 계산 함수도 만들 수 있다.

\`\`\`python
def calculate_delivery_fee(order_price):
    if order_price >= 50000:
        return 0
    return 3000


price = calculate_order_price(12000, 3)
fee = calculate_delivery_fee(price)

print("주문 금액:", price)
print("배송비:", fee)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
주문 금액: 36000
배송비: 3000
\`\`\`

함수는 다른 함수의 결과를 입력으로 사용할 수도 있다.

---

# 5.3 변수의 범위

## 변수의 범위란 무엇인가

변수의 범위는 변수를 사용할 수 있는 영역을 의미한다. 영어로는 스코프라고 한다.

파이썬에서는 함수 안에서 만든 변수와 함수 밖에서 만든 변수가 서로 다른 범위를 가진다. 이 개념을 이해하지 못하면 함수 안팎에서 변수를 사용할 때 혼란이 생긴다.

다음 코드를 보자.

\`\`\`python
def greet():
    message = "안녕하세요"
    print(message)


greet()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요
\`\`\`

\`message\` 변수는 함수 안에서 만들어졌다. 함수 안에서는 사용할 수 있다. 하지만 함수 밖에서 사용하려고 하면 에러가 발생한다.

\`\`\`python
def greet():
    message = "안녕하세요"
    print(message)


greet()
print(message)
\`\`\`

실행하면 \`NameError\`가 발생한다. 함수 안에서 만든 변수는 함수 밖에서 사용할 수 없기 때문이다.

## 지역 변수

함수 안에서 만든 변수를 지역 변수라고 한다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(result)
\`\`\`

위 코드에서 \`total\`은 지역 변수이다. \`calculate_total\` 함수 안에서 만들어졌기 때문에 함수 안에서만 사용할 수 있다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(total)
\`\`\`

위 코드에서 \`print(total)\`은 에러를 발생시킨다. \`total\`은 함수 밖에서 사용할 수 없는 지역 변수이기 때문이다.

지역 변수는 함수가 실행될 때 만들어지고, 함수 실행이 끝나면 사라진다고 이해하면 된다.

## 매개변수도 지역 변수다

함수의 매개변수도 함수 안에서만 사용할 수 있는 지역 변수이다.

\`\`\`python
def greet(name):
    print(name, "님 안녕하세요")


greet("홍길동")
print(name)
\`\`\`

\`name\`은 매개변수이다. 함수 안에서는 사용할 수 있지만 함수 밖에서는 사용할 수 없다. 따라서 마지막 줄에서 에러가 발생한다.

매개변수는 함수가 호출될 때 전달된 값을 담는 지역 변수라고 생각할 수 있다.

## 전역 변수

함수 밖에서 만든 변수를 전역 변수라고 한다.

\`\`\`python
message = "안녕하세요"


def greet():
    print(message)


greet()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요
\`\`\`

\`message\`는 함수 밖에서 만들어진 전역 변수이다. 함수 안에서 전역 변수를 읽을 수 있다.

하지만 함수 안에서 전역 변수와 같은 이름의 변수를 새로 만들면 상황이 달라진다.

\`\`\`python
message = "안녕하세요"


def greet():
    message = "반갑습니다"
    print(message)


greet()
print(message)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
반갑습니다
안녕하세요
\`\`\`

함수 안의 \`message\`는 지역 변수이고, 함수 밖의 \`message\`는 전역 변수이다. 이름은 같지만 서로 다른 변수이다.

## 전역 변수 변경 시 주의점

함수 안에서 전역 변수를 변경하려면 \`global\`을 사용할 수 있다.

\`\`\`python
count = 0


def increase_count():
    global count
    count += 1


increase_count()
increase_count()

print(count)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
2
\`\`\`

\`global count\`는 함수 안에서 전역 변수 \`count\`를 변경하겠다는 의미이다.

하지만 실무에서는 \`global\`을 자주 사용하는 코드는 피하는 것이 좋다. 함수가 외부 변수에 의존하면 코드를 이해하기 어려워지고, 예상하지 못한 위치에서 값이 바뀔 수 있다.

가능하면 함수는 필요한 값을 매개변수로 받고, 결과를 반환하도록 작성하는 것이 좋다.

좋지 않은 예는 다음과 같다.

\`\`\`python
total = 0


def add_price(price):
    global total
    total += price


add_price(10000)
add_price(20000)
print(total)
\`\`\`

더 나은 예는 다음과 같다.

\`\`\`python
def add_price(total, price):
    return total + price


total = 0
total = add_price(total, 10000)
total = add_price(total, 20000)

print(total)
\`\`\`

실행 결과는 같다.

\`\`\`text
30000
\`\`\`

두 번째 방식은 함수의 입력과 출력이 분명하다. 그래서 테스트하기 쉽고, 코드 흐름도 이해하기 쉽다.

## 같은 이름의 변수가 있을 때

파이썬은 변수를 찾을 때 가까운 범위부터 찾는다. 함수 안에서 변수를 사용하면 먼저 함수 안에서 찾고, 없으면 함수 밖에서 찾는다.

\`\`\`python
name = "전역 이름"


def print_name():
    name = "지역 이름"
    print(name)


print_name()
print(name)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
지역 이름
전역 이름
\`\`\`

함수 안에서는 지역 변수 \`name\`이 사용된다. 함수 밖에서는 전역 변수 \`name\`이 사용된다.

이름이 같으면 헷갈릴 수 있으므로, 함수 안팎에서 같은 이름을 불필요하게 반복해서 쓰지 않는 것이 좋다.

## 함수 안에서 만든 값을 밖에서 사용하려면

함수 안에서 만든 값을 함수 밖에서 사용하려면 \`return\`으로 반환해야 한다.

잘못된 예는 다음과 같다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity


calculate_total(10000, 3)
print(total)
\`\`\`

\`total\`은 함수 안에서 만든 지역 변수이므로 함수 밖에서 사용할 수 없다.

올바른 예는 다음과 같다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
\`\`\`

함수 안에서 계산한 결과를 밖에서 사용하려면 반드시 반환해야 한다.

## 스코프를 이해해야 하는 이유

스코프는 단순한 이론이 아니다. 함수로 코드를 나누기 시작하면 자주 마주치는 개념이다.

다음과 같은 질문에 답할 수 있어야 한다.

\`\`\`text
이 변수는 어디에서 만들어졌는가?
이 변수는 어디에서 사용할 수 있는가?
함수 밖에서 이 값을 쓰려면 어떻게 해야 하는가?
함수 안에서 외부 값을 직접 바꾸는 것이 좋은가?
\`\`\`

이 질문에 답할 수 있으면 함수 코드의 흐름을 훨씬 안정적으로 이해할 수 있다.

---

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