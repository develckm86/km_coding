var e=`<!-- 원본: python_basic_chapter_5_book.md / 세부 장: 5-2 -->

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
`;export{e as default};