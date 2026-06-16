var e=`<!-- 원본: python_basic_chapter_6_book.md / 세부 장: 6-4 -->

# 6.4 디버깅 기초

## 디버깅이란 무엇인가

디버깅은 코드에서 문제를 찾고 수정하는 과정이다. 여기서 문제는 반드시 에러 메시지로 나타나는 것만 의미하지 않는다. 프로그램은 실행되지만 결과가 이상한 경우도 디버깅이 필요하다.

다음 코드를 보자.

\`\`\`python
prices = [10000, 20000, 30000]

total = 0
for price in prices:
    total = price

print(total)
\`\`\`

이 코드는 에러 없이 실행된다. 실행 결과는 다음과 같다.

\`\`\`text
30000
\`\`\`

하지만 우리가 원한 것이 가격 합계라면 결과는 \`60000\`이어야 한다. 에러 메시지는 없지만 코드의 로직이 잘못되었다.

문제는 이 줄이다.

\`\`\`python
total = price
\`\`\`

매번 \`total\`에 현재 가격을 새로 저장하고 있다. 누적하려면 다음처럼 작성해야 한다.

\`\`\`python
total += price
\`\`\`

수정한 코드는 다음과 같다.

\`\`\`python
prices = [10000, 20000, 30000]

total = 0
for price in prices:
    total += price

print(total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
60000
\`\`\`

이처럼 디버깅은 “왜 결과가 이렇게 나왔을까?”를 추적하는 과정이다.

## 버그의 종류

디버깅이 필요한 상황은 여러 가지다.

\`\`\`text
1. 에러가 발생해서 프로그램이 멈춘다.
2. 에러는 없지만 결과가 틀리다.
3. 조건문이 예상과 다르게 실행된다.
4. 반복문이 너무 많이 또는 너무 적게 실행된다.
5. 함수가 예상과 다른 값을 반환한다.
6. 데이터가 중간에 잘못 바뀐다.
\`\`\`

초보 단계에서는 대부분 다음 세 가지 문제를 자주 만난다.

\`\`\`text
변수 값이 예상과 다르다.
조건식이 예상과 다르다.
반복문 흐름이 예상과 다르다.
\`\`\`

디버깅은 이 세 가지를 확인하는 작업에서 시작한다.

## 디버깅의 기본 질문

디버깅할 때는 다음 질문을 순서대로 던져 보자.

\`\`\`text
이 변수에는 지금 어떤 값이 들어 있는가?
이 조건식은 True인가 False인가?
이 반복문은 몇 번 실행되는가?
이 함수는 어떤 값을 입력받고 어떤 값을 반환하는가?
내가 예상한 값과 실제 값은 어디서 달라지는가?
\`\`\`

이 질문에 답할 수 있으면 문제의 위치를 좁힐 수 있다.

---

## \`print\` 디버깅

가장 간단한 디버깅 방법은 중간중간 \`print()\`를 넣어 값을 확인하는 것이다. 이것을 흔히 \`print\` 디버깅이라고 부른다.

## 중간값 확인하기

다음 함수는 할인 금액을 계산한다.

\`\`\`python
def calculate_final_price(price, discount_rate):
    discount = price * discount_rate
    final_price = price - discount
    return final_price


result = calculate_final_price(10000, 0.1)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
9000.0
\`\`\`

문제가 없는 코드이다. 하지만 계산 결과가 이상하다면 중간값을 확인할 수 있다.

\`\`\`python
def calculate_final_price(price, discount_rate):
    print("price:", price)
    print("discount_rate:", discount_rate)

    discount = price * discount_rate
    print("discount:", discount)

    final_price = price - discount
    print("final_price:", final_price)

    return final_price


result = calculate_final_price(10000, 0.1)
print("result:", result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
price: 10000
discount_rate: 0.1
discount: 1000.0
final_price: 9000.0
result: 9000.0
\`\`\`

중간값을 확인하면 계산이 어떤 순서로 진행되는지 볼 수 있다.

## 조건문 확인하기

조건문이 예상과 다르게 동작할 때도 \`print()\`를 사용할 수 있다.

\`\`\`python
age = 18
has_permission = True

if age >= 19 and has_permission:
    print("입장 가능")
else:
    print("입장 불가")
\`\`\`

결과는 다음과 같다.

\`\`\`text
입장 불가
\`\`\`

왜 \`입장 불가\`가 나왔는지 확인하려면 조건식의 각 부분을 출력해 본다.

\`\`\`python
age = 18
has_permission = True

print("age >= 19:", age >= 19)
print("has_permission:", has_permission)
print("전체 조건:", age >= 19 and has_permission)

if age >= 19 and has_permission:
    print("입장 가능")
else:
    print("입장 불가")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
age >= 19: False
has_permission: True
전체 조건: False
입장 불가
\`\`\`

\`has_permission\`은 \`True\`이지만 \`age >= 19\`가 \`False\`이기 때문에 전체 조건이 \`False\`가 된다.

## 반복문 확인하기

반복문에서 문제가 생기면 현재 몇 번째 반복인지, 현재 값이 무엇인지 확인해야 한다.

\`\`\`python
numbers = [10, 20, 30]

total = 0
for number in numbers:
    total += number

print(total)
\`\`\`

중간값을 확인하려면 다음처럼 작성한다.

\`\`\`python
numbers = [10, 20, 30]

total = 0
for number in numbers:
    print("현재 number:", number)
    print("더하기 전 total:", total)

    total += number

    print("더한 후 total:", total)
    print("---")

print("최종 total:", total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
현재 number: 10
더하기 전 total: 0
더한 후 total: 10
---
현재 number: 20
더하기 전 total: 10
더한 후 total: 30
---
현재 number: 30
더하기 전 total: 30
더한 후 total: 60
---
최종 total: 60
\`\`\`

이렇게 출력하면 값이 어떻게 변하는지 한눈에 볼 수 있다.

## 함수의 입력과 반환값 확인하기

함수가 예상과 다른 결과를 반환하면 입력값과 반환값을 확인해야 한다.

\`\`\`python
def is_adult(age):
    return age >= 19


print(is_adult(20))
print(is_adult(18))
\`\`\`

문제가 생기면 다음처럼 확인할 수 있다.

\`\`\`python
def is_adult(age):
    print("is_adult 호출, age:", age)
    result = age >= 19
    print("판단 결과:", result)
    return result
\`\`\`

함수가 여러 곳에서 호출될 때는 이런 출력이 문제의 원인을 찾는 데 도움이 된다.

## \`print\` 디버깅 후에는 정리하기

디버깅을 위해 넣은 \`print()\`는 문제를 해결한 뒤 정리하는 것이 좋다. 디버깅 출력이 너무 많이 남아 있으면 프로그램의 실제 출력과 섞여서 보기 어려워진다.

디버깅용 출력에는 표시를 해두면 나중에 찾기 쉽다.

\`\`\`python
print("[DEBUG] price:", price)
\`\`\`

하지만 실무에서는 디버깅 정보를 계속 남겨야 할 때 \`print()\`보다 \`logging\`을 사용한다. 이 내용은 12장에서 다룬다.

---

## VS Code 디버거

\`print\` 디버깅은 간단하고 유용하지만, 코드가 길어지면 출력문을 계속 넣고 지우는 일이 번거롭다. 이럴 때는 디버거를 사용할 수 있다.

디버거는 코드를 한 줄씩 실행하면서 변수 값을 확인할 수 있는 도구이다. VS Code에는 파이썬 디버깅 기능이 포함되어 있다.

## 브레이크포인트

브레이크포인트는 프로그램 실행을 잠시 멈출 위치이다. 코드 왼쪽 줄 번호 옆을 클릭하면 빨간 점이 생기는데, 이것이 브레이크포인트이다.

예를 들어 다음 코드에서 \`total += price\` 줄에 브레이크포인트를 걸 수 있다.

\`\`\`python
prices = [10000, 20000, 30000]

total = 0
for price in prices:
    total += price

print(total)
\`\`\`

디버깅을 시작하면 프로그램이 해당 줄에서 멈춘다. 그 상태에서 현재 \`price\`와 \`total\` 값이 무엇인지 확인할 수 있다.

## 한 줄씩 실행하기

디버거에서는 코드를 한 줄씩 실행할 수 있다. 한 줄씩 실행하면 값이 언제 바뀌는지 직접 확인할 수 있다.

예를 들어 반복문 안에서 다음 흐름을 볼 수 있다.

\`\`\`text
1. price에 10000이 들어온다.
2. total은 0이다.
3. total += price 실행 후 total은 10000이 된다.
4. 다음 반복에서 price는 20000이 된다.
5. total은 30000이 된다.
\`\`\`

이런 식으로 실행 흐름을 눈으로 확인하면 반복문을 이해하는 데 큰 도움이 된다.

## 함수 안으로 들어가기

디버거에서는 함수 호출을 만났을 때 함수 안으로 들어갈 수 있다.

\`\`\`python
def calculate_total(price, quantity):
    return price * quantity


result = calculate_total(10000, 3)
print(result)
\`\`\`

\`calculate_total(10000, 3)\` 줄에서 함수 안으로 들어가면 \`price\`와 \`quantity\`에 어떤 값이 들어왔는지 확인할 수 있다.

함수를 많이 사용하는 코드에서는 이 기능이 매우 유용하다.

## 변수 상태 확인하기

디버거를 사용하면 현재 변수 값 목록을 볼 수 있다.

예를 들어 다음 변수들이 있다고 하자.

\`\`\`python
price = 10000
quantity = 3
discount_rate = 0.1
\`\`\`

디버거에서는 각 변수의 현재 값을 확인할 수 있다.

\`\`\`text
price: 10000
quantity: 3
discount_rate: 0.1
\`\`\`

값이 예상과 다르면 그 값이 어디에서 바뀌었는지 추적하면 된다.

## 디버거를 사용할 때의 기본 순서

VS Code 디버거를 처음 사용할 때는 다음 순서로 진행하면 된다.

\`\`\`text
1. 의심되는 줄에 브레이크포인트를 건다.
2. 디버깅 실행을 시작한다.
3. 코드가 멈추면 변수 값을 확인한다.
4. 한 줄씩 실행하면서 값의 변화를 확인한다.
5. 함수 호출이 있다면 함수 안으로 들어가 본다.
6. 예상과 달라지는 지점을 찾는다.
\`\`\`

디버거를 처음부터 완벽하게 사용할 필요는 없다. 우선 브레이크포인트를 걸고 변수 값을 보는 것부터 익히면 충분하다.

---

## 실무 예제: 계산 결과가 예상과 다를 때

다음 코드는 상품 목록에서 총 매출을 계산하려는 코드이다.

\`\`\`python
orders = [
    {"product": "키보드", "price": 30000, "quantity": 2},
    {"product": "마우스", "price": 15000, "quantity": 3},
    {"product": "모니터", "price": 200000, "quantity": 1},
]

total_sales = 0

for order in orders:
    total_sales = order["price"] * order["quantity"]

print(total_sales)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
200000
\`\`\`

하지만 전체 매출은 다음처럼 계산되어야 한다.

\`\`\`text
30000 * 2 = 60000
15000 * 3 = 45000
200000 * 1 = 200000
총합 = 305000
\`\`\`

코드의 문제를 찾기 위해 중간값을 출력해 보자.

\`\`\`python
total_sales = 0

for order in orders:
    order_total = order["price"] * order["quantity"]
    print("현재 주문 금액:", order_total)
    print("누적 전 total_sales:", total_sales)

    total_sales = order_total

    print("누적 후 total_sales:", total_sales)
    print("---")
\`\`\`

출력 결과를 보면 \`total_sales\`가 누적되는 것이 아니라 매번 새 주문 금액으로 바뀌고 있다는 사실을 알 수 있다.

문제의 줄은 다음과 같다.

\`\`\`python
total_sales = order_total
\`\`\`

누적하려면 다음처럼 작성해야 한다.

\`\`\`python
total_sales += order_total
\`\`\`

수정한 전체 코드는 다음과 같다.

\`\`\`python
orders = [
    {"product": "키보드", "price": 30000, "quantity": 2},
    {"product": "마우스", "price": 15000, "quantity": 3},
    {"product": "모니터", "price": 200000, "quantity": 1},
]

total_sales = 0

for order in orders:
    order_total = order["price"] * order["quantity"]
    total_sales += order_total

print(total_sales)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
305000
\`\`\`

## 실무 예제: 조건문이 잘못 동작할 때

다음 코드는 무료배송 여부를 판단하려는 코드이다.

\`\`\`python
order_price = 40000
is_member = False

if order_price >= 50000 or is_member:
    print("무료배송")
else:
    print("배송비 3000원")
\`\`\`

이 조건은 “주문 금액이 5만 원 이상이거나 회원이면 무료배송”이라는 의미이다. 만약 정책이 “주문 금액이 5만 원 이상이고 회원이어야 무료배송”이라면 조건식이 잘못되었다.

현재 조건을 확인해 보자.

\`\`\`python
print("order_price >= 50000:", order_price >= 50000)
print("is_member:", is_member)
print("전체 조건:", order_price >= 50000 or is_member)
\`\`\`

정책에 맞게 수정하려면 \`or\`가 아니라 \`and\`를 사용해야 한다.

\`\`\`python
if order_price >= 50000 and is_member:
    print("무료배송")
else:
    print("배송비 3000원")
\`\`\`

조건문 오류는 문법 에러가 아닌 경우가 많다. 그래서 조건식의 각 부분을 직접 출력해 확인하는 습관이 중요하다.

## 실무 예제: 함수 반환값이 예상과 다를 때

다음 함수는 회원 등급에 따라 할인율을 반환하려는 함수이다.

\`\`\`python
def get_discount_rate(grade):
    if grade == "VIP":
        return 0.2
    if grade == "GOLD":
        return 0.1
    if grade == "SILVER":
        return 0.05


rate = get_discount_rate("NORMAL")
print(rate)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
None
\`\`\`

\`NORMAL\` 등급에 대한 처리가 없기 때문에 함수는 아무 값도 반환하지 않고 끝난다. 파이썬 함수는 \`return\` 없이 끝나면 \`None\`을 반환한다.

이 문제를 해결하려면 기본 할인율을 반환하면 된다.

\`\`\`python
def get_discount_rate(grade):
    if grade == "VIP":
        return 0.2
    if grade == "GOLD":
        return 0.1
    if grade == "SILVER":
        return 0.05
    return 0
\`\`\`

이제 \`NORMAL\` 등급이 들어와도 \`0\`을 반환한다.

\`\`\`python
rate = get_discount_rate("NORMAL")
print(rate)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0
\`\`\`

함수의 모든 가능한 입력값에 대해 반환값이 있는지 확인하는 것은 중요한 디버깅 습관이다.

---

# 6장 핵심 정리

이 장에서는 예외 처리와 디버깅을 배웠다.

에러는 프로그램이 정상적으로 실행되지 못하는 상황이다. 에러에는 문법 에러, 실행 중 에러, 논리 에러가 있다. 문법 에러는 파이썬 문법을 잘못 작성했을 때 발생하고, 실행 중 에러는 문법은 맞지만 실행 과정에서 문제가 생겼을 때 발생한다. 논리 에러는 에러 메시지는 없지만 결과가 의도와 다른 경우이다.

에러 메시지를 읽을 때는 마지막 줄에서 에러 종류와 설명을 확인하고, 위쪽에서 에러가 발생한 파일과 줄 번호를 확인한다. 에러 메시지는 문제 해결을 위한 단서이다.

예외 처리는 실패할 수 있는 코드를 안전하게 다루는 문법이다. \`try\`에는 에러가 발생할 수 있는 코드를 넣고, \`except\`에는 에러가 발생했을 때 실행할 코드를 넣는다. 가능하면 \`except:\`처럼 모든 예외를 잡기보다 \`except ValueError:\`처럼 예상되는 예외를 구체적으로 처리하는 것이 좋다.

\`else\`는 예외가 발생하지 않았을 때 실행된다. \`finally\`는 예외 발생 여부와 관계없이 항상 실행된다. 모든 예외 처리에서 \`else\`와 \`finally\`를 반드시 써야 하는 것은 아니며, 필요한 상황에 맞게 사용하면 된다.

예외를 무조건 숨기면 안 된다. \`except: pass\`처럼 에러를 조용히 무시하는 코드는 문제를 찾기 어렵게 만든다. 사용자에게는 이해하기 쉬운 메시지를 보여주고, 개발자는 원인을 확인할 수 있는 정보를 남기는 것이 좋다.

디버깅은 코드의 문제를 찾고 수정하는 과정이다. 가장 간단한 방법은 \`print()\`로 중간값을 확인하는 것이다. 변수 값, 조건식 결과, 반복문 흐름, 함수 입력값과 반환값을 확인하면 문제의 원인을 좁힐 수 있다. 코드가 길어지면 VS Code 디버거를 사용해 브레이크포인트를 걸고 한 줄씩 실행하면서 값을 확인할 수 있다.

---

# 6장 연습문제

## 문제 1

다음 중 문법 에러에 해당하는 것은 무엇인가?

A. 존재하지 않는 리스트 인덱스에 접근했다.  
B. 문자열 \`"abc"\`를 정수로 변환하려고 했다.  
C. \`if\` 문 뒤에 콜론을 쓰지 않았다.  
D. 주문 금액 계산에서 곱하기 대신 더하기를 사용했다.

---

## 문제 2

다음 코드에서 발생하는 에러의 종류를 쓰시오.

\`\`\`python
number = int("abc")
\`\`\`

---

## 문제 3

다음 코드에서 발생하는 에러의 종류를 쓰시오.

\`\`\`python
scores = [80, 90, 100]
print(scores[5])
\`\`\`

---

## 문제 4

다음 코드에서 발생하는 에러의 종류를 쓰시오.

\`\`\`python
customer = {"name": "홍길동"}
print(customer["email"])
\`\`\`

---

## 문제 5

다음 코드가 에러 없이 실행되도록 \`try-except\`를 사용해 수정하시오.

\`\`\`python
value = "abc"
number = int(value)
print(number)
\`\`\`

조건:

- 숫자로 변환할 수 없으면 \`"숫자로 변환할 수 없습니다."\`를 출력한다.

---

## 문제 6

다음 함수는 두 숫자를 나누는 함수이다. \`b\`가 0일 때 프로그램이 멈추지 않고 \`None\`을 반환하도록 수정하시오.

\`\`\`python
def divide(a, b):
    return a / b
\`\`\`

---

## 문제 7

다음 함수는 딕셔너리에서 \`grade\` 값을 꺼낸다. \`grade\` key가 없으면 \`"일반"\`을 반환하도록 수정하시오.

\`\`\`python
def get_grade(customer):
    return customer["grade"]
\`\`\`

---

## 문제 8

다음 코드의 실행 결과를 예상하시오.

\`\`\`python
try:
    number = int("100")
except ValueError:
    print("변환 실패")
else:
    print("변환 성공")
finally:
    print("작업 종료")
\`\`\`

---

## 문제 9

다음 코드의 실행 결과를 예상하시오.

\`\`\`python
try:
    number = int("abc")
except ValueError:
    print("변환 실패")
else:
    print("변환 성공")
finally:
    print("작업 종료")
\`\`\`

---

## 문제 10

다음 함수는 문자열을 정수로 변환한다. 변환에 실패하면 기본값 \`0\`을 반환하도록 완성하시오.

\`\`\`python
def to_int(value):
    # 여기에 코드 작성
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
print(to_int("100"))
print(to_int("abc"))
\`\`\`

예상 결과는 다음과 같다.

\`\`\`text
100
0
\`\`\`

---

## 문제 11

다음 함수는 숫자 리스트의 평균을 구한다. 빈 리스트가 들어오면 \`0\`을 반환하도록 수정하시오.

\`\`\`python
def average(numbers):
    return sum(numbers) / len(numbers)
\`\`\`

---

## 문제 12

다음 코드의 문제점을 찾고 수정하시오.

\`\`\`python
prices = [10000, 20000, 30000]

total = 0
for price in prices:
    total = price

print(total)
\`\`\`

목표 결과는 다음과 같다.

\`\`\`text
60000
\`\`\`

---

## 문제 13

다음 함수는 회원 등급에 따라 할인율을 반환한다. \`VIP\`, \`GOLD\`, \`SILVER\`가 아닌 등급이 들어오면 \`0\`을 반환하도록 수정하시오.

\`\`\`python
def get_discount_rate(grade):
    if grade == "VIP":
        return 0.2
    if grade == "GOLD":
        return 0.1
    if grade == "SILVER":
        return 0.05
\`\`\`

---

## 문제 14

다음 코드는 주문 금액을 계산하려고 한다. 가격과 수량이 숫자로 변환되지 않으면 \`None\`을 반환하도록 함수를 완성하시오.

\`\`\`python
def calculate_order_total(price_text, quantity_text):
    # 여기에 코드 작성
\`\`\`

실행 예시는 다음과 같다.

\`\`\`python
print(calculate_order_total("10000", "3"))
print(calculate_order_total("가격", "3"))
\`\`\`

예상 결과는 다음과 같다.

\`\`\`text
30000
None
\`\`\`

---

## 문제 15

다음 코드가 예상과 다르게 동작한다. 디버깅을 위해 어떤 값을 출력해 보면 좋을지 쓰고, 코드를 수정하시오.

\`\`\`python
orders = [
    {"product": "키보드", "price": 30000, "quantity": 2},
    {"product": "마우스", "price": 15000, "quantity": 3},
    {"product": "모니터", "price": 200000, "quantity": 1},
]

total_sales = 0

for order in orders:
    total_sales = order["price"] * order["quantity"]

print(total_sales)
\`\`\`

목표 결과는 다음과 같다.

\`\`\`text
305000
\`\`\`

---

# 6장 정답 및 해설

## 문제 1 정답

정답은 C이다.

\`\`\`python
if age >= 19
\`\`\`

\`if\` 문 뒤에는 콜론 \`:\`이 필요하다. 콜론을 빠뜨리면 \`SyntaxError\`가 발생한다.

A는 \`IndexError\`, B는 \`ValueError\`, D는 논리 에러에 가깝다.

---

## 문제 2 정답

정답은 \`ValueError\`이다.

\`\`\`python
number = int("abc")
\`\`\`

\`int()\`는 문자열을 정수로 변환할 수 있지만, \`"abc"\`는 숫자 형태가 아니기 때문에 변환할 수 없다.

---

## 문제 3 정답

정답은 \`IndexError\`이다.

\`\`\`python
scores = [80, 90, 100]
print(scores[5])
\`\`\`

리스트에는 인덱스 \`0\`, \`1\`, \`2\`만 존재한다. 인덱스 \`5\`는 범위를 벗어난다.

---

## 문제 4 정답

정답은 \`KeyError\`이다.

\`\`\`python
customer = {"name": "홍길동"}
print(customer["email"])
\`\`\`

딕셔너리에는 \`"email"\`이라는 key가 없다. 없는 key를 대괄호로 조회하면 \`KeyError\`가 발생한다.

---

## 문제 5 정답

\`\`\`python
value = "abc"

try:
    number = int(value)
    print(number)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
숫자로 변환할 수 없습니다.
\`\`\`

\`int(value)\`에서 \`ValueError\`가 발생하므로 \`except ValueError\` 블록이 실행된다.

---

## 문제 6 정답

조건문으로 처리하는 방법은 다음과 같다.

\`\`\`python
def divide(a, b):
    if b == 0:
        return None
    return a / b
\`\`\`

예외 처리로 작성하면 다음과 같다.

\`\`\`python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
\`\`\`

이 경우에는 \`b == 0\`을 미리 확인할 수 있으므로 조건문 방식이 더 단순하고 명확하다.

---

## 문제 7 정답

\`get()\`을 사용하는 방법이 가장 간단하다.

\`\`\`python
def get_grade(customer):
    return customer.get("grade", "일반")
\`\`\`

예외 처리로 작성하면 다음과 같다.

\`\`\`python
def get_grade(customer):
    try:
        return customer["grade"]
    except KeyError:
        return "일반"
\`\`\`

딕셔너리에 없는 key를 기본값으로 처리할 때는 보통 \`get()\`을 사용하는 편이 좋다.

---

## 문제 8 정답

실행 결과는 다음과 같다.

\`\`\`text
변환 성공
작업 종료
\`\`\`

\`int("100")\`은 정상적으로 실행된다. 따라서 \`except\`는 실행되지 않고 \`else\`가 실행된다. \`finally\`는 항상 실행된다.

---

## 문제 9 정답

실행 결과는 다음과 같다.

\`\`\`text
변환 실패
작업 종료
\`\`\`

\`int("abc")\`에서 \`ValueError\`가 발생한다. 따라서 \`except ValueError\` 블록이 실행된다. 예외가 발생했으므로 \`else\`는 실행되지 않는다. \`finally\`는 항상 실행된다.

---

## 문제 10 정답

\`\`\`python
def to_int(value):
    try:
        return int(value)
    except ValueError:
        return 0
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
print(to_int("100"))
print(to_int("abc"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
100
0
\`\`\`

변환에 성공하면 정수를 반환하고, 변환에 실패하면 기본값 \`0\`을 반환한다.

---

## 문제 11 정답

\`\`\`python
def average(numbers):
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)
\`\`\`

빈 리스트는 길이가 \`0\`이므로 바로 평균을 계산하면 0으로 나누는 에러가 발생한다. 계산 전에 빈 리스트인지 확인하면 안전하다.

---

## 문제 12 정답

문제의 코드는 다음 줄에서 값을 누적하지 않고 매번 새로 대입하고 있다.

\`\`\`python
total = price
\`\`\`

수정 코드는 다음과 같다.

\`\`\`python
prices = [10000, 20000, 30000]

total = 0
for price in prices:
    total += price

print(total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
60000
\`\`\`

\`+=\`는 기존 값에 새 값을 더해 다시 저장하는 연산자이다.

---

## 문제 13 정답

\`\`\`python
def get_discount_rate(grade):
    if grade == "VIP":
        return 0.2
    if grade == "GOLD":
        return 0.1
    if grade == "SILVER":
        return 0.05
    return 0
\`\`\`

\`VIP\`, \`GOLD\`, \`SILVER\` 중 어느 조건에도 해당하지 않으면 마지막 \`return 0\`이 실행된다. 함수가 아무 값도 반환하지 않고 끝나면 \`None\`이 반환되므로, 기본 반환값을 명시하는 것이 좋다.

---

## 문제 14 정답

\`\`\`python
def calculate_order_total(price_text, quantity_text):
    try:
        price = int(price_text)
        quantity = int(quantity_text)
    except ValueError:
        return None

    return price * quantity
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
print(calculate_order_total("10000", "3"))
print(calculate_order_total("가격", "3"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
None
\`\`\`

가격이나 수량 중 하나라도 정수로 변환할 수 없으면 \`ValueError\`가 발생하고 \`None\`을 반환한다.

음수까지 막고 싶다면 다음처럼 작성할 수 있다.

\`\`\`python
def calculate_order_total(price_text, quantity_text):
    try:
        price = int(price_text)
        quantity = int(quantity_text)
    except ValueError:
        return None

    if price < 0 or quantity < 0:
        return None

    return price * quantity
\`\`\`

---

## 문제 15 정답 예시

디버깅을 위해 다음 값을 출력해 보면 좋다.

\`\`\`text
각 주문의 주문 금액
누적 전 total_sales
누적 후 total_sales
\`\`\`

디버깅 출력 예시는 다음과 같다.

\`\`\`python
for order in orders:
    order_total = order["price"] * order["quantity"]
    print("현재 주문 금액:", order_total)
    print("누적 전 total_sales:", total_sales)

    total_sales = order_total

    print("누적 후 total_sales:", total_sales)
    print("---")
\`\`\`

출력을 보면 \`total_sales\`가 누적되지 않고 매번 현재 주문 금액으로 바뀌고 있음을 알 수 있다.

수정 코드는 다음과 같다.

\`\`\`python
orders = [
    {"product": "키보드", "price": 30000, "quantity": 2},
    {"product": "마우스", "price": 15000, "quantity": 3},
    {"product": "모니터", "price": 200000, "quantity": 1},
]

total_sales = 0

for order in orders:
    order_total = order["price"] * order["quantity"]
    total_sales += order_total

print(total_sales)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
305000
\`\`\`

핵심은 \`=\`와 \`+=\`의 차이이다. \`=\`는 값을 새로 대입하고, \`+=\`는 기존 값에 더해 누적한다.

---

# 다음 장으로 넘어가기 전에

이 장에서는 예외 처리와 디버깅을 배웠다. 이제 코드를 작성하다가 에러가 발생해도 에러 메시지에서 문제의 위치와 종류를 확인할 수 있다. 또한 실패할 가능성이 있는 코드를 \`try-except\`로 안전하게 처리하고, 코드가 예상과 다르게 동작할 때 중간값을 확인하며 원인을 찾을 수 있다.

다음 장에서는 객체지향 프로그래밍을 배운다. 지금까지는 변수, 조건문, 반복문, 함수로 프로그램을 구성했다. 객체지향 프로그래밍에서는 데이터와 기능을 하나로 묶어 클래스로 표현한다. 고객, 상품, 주문처럼 실무에서 자주 만나는 개념을 코드 구조로 표현하는 방법을 배우게 된다.
`;export{e as default};