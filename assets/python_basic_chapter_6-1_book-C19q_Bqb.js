var e=`<!-- 원본: python_basic_chapter_6_book.md / 세부 장: 6-1 -->

# 6.1 에러 읽는 법

## 에러란 무엇인가

에러는 프로그램이 정상적으로 실행되지 못하는 상황을 말한다. 파이썬 코드를 작성하다 보면 다양한 에러를 만나게 된다.

초보자는 에러 메시지를 보면 겁부터 나는 경우가 많다. 하지만 에러 메시지는 프로그램이 우리에게 보내는 설명서에 가깝다. 파이썬은 단순히 “안 돼”라고 말하는 것이 아니라, 어떤 파일의 몇 번째 줄에서 어떤 종류의 문제가 발생했는지 알려준다.

에러를 크게 나누면 다음 세 가지로 생각할 수 있다.

\`\`\`text
1. 문법 에러
2. 실행 중 에러
3. 논리 에러
\`\`\`

각각을 차례대로 살펴보자.

## 문법 에러

문법 에러는 파이썬 문법 자체가 잘못되었을 때 발생한다. 파이썬이 코드를 해석할 수 없기 때문에 실행 전에 문제가 생긴다.

다음 코드를 보자.

\`\`\`python
if age >= 19
    print("성인입니다.")
\`\`\`

\`if\` 문 뒤에는 콜론 \`:\`이 필요하다. 그런데 위 코드에는 콜론이 없다. 따라서 파이썬은 코드를 실행하기 전에 문법이 잘못되었다고 알려준다.

에러 메시지는 대략 다음과 비슷하다.

\`\`\`text
SyntaxError: expected ':'
\`\`\`

\`SyntaxError\`는 문법 오류를 의미한다. 파이썬 문법 규칙을 지키지 않았다는 뜻이다.

문법 에러는 보통 다음과 같은 경우에 발생한다.

- 콜론 \`:\`을 빠뜨린 경우
- 괄호를 닫지 않은 경우
- 따옴표를 닫지 않은 경우
- 들여쓰기가 잘못된 경우
- 파이썬 문법에 맞지 않는 표현을 사용한 경우

예를 들어 문자열의 따옴표를 닫지 않으면 문법 에러가 발생한다.

\`\`\`python
message = "안녕하세요
print(message)
\`\`\`

파이썬은 문자열이 어디서 끝나는지 알 수 없기 때문에 에러를 발생시킨다.

## 실행 중 에러

실행 중 에러는 문법은 맞지만, 실제로 실행하는 과정에서 문제가 발생하는 경우이다.

다음 코드는 문법적으로는 올바르다.

\`\`\`python
number = int("abc")
print(number)
\`\`\`

하지만 \`"abc"\`는 정수로 바꿀 수 없다. 따라서 실행 중에 에러가 발생한다.

\`\`\`text
ValueError: invalid literal for int() with base 10: 'abc'
\`\`\`

문법은 맞지만 값이 잘못되어 실행할 수 없는 경우이다.

또 다른 예를 보자.

\`\`\`python
numbers = [10, 20, 30]
print(numbers[5])
\`\`\`

리스트에는 인덱스 \`0\`, \`1\`, \`2\`만 존재한다. 그런데 \`numbers[5]\`를 요청했기 때문에 실행 중에 에러가 발생한다.

\`\`\`text
IndexError: list index out of range
\`\`\`

실행 중 에러는 실제 프로그램에서 자주 만난다. 특히 사용자 입력, 외부 데이터, 리스트, 딕셔너리, 숫자 변환을 다룰 때 자주 발생한다.

## 논리 에러

논리 에러는 문법적으로도 맞고 실행도 되지만, 결과가 우리가 의도한 것과 다른 경우이다.

다음 코드를 보자.

\`\`\`python
price = 10000
quantity = 3

total = price + quantity
print(total)
\`\`\`

이 코드는 에러 없이 실행된다.

\`\`\`text
10003
\`\`\`

하지만 주문 금액을 계산하려는 목적이었다면 \`price + quantity\`가 아니라 \`price * quantity\`를 사용해야 한다.

\`\`\`python
total = price * quantity
\`\`\`

논리 에러는 파이썬이 자동으로 알려주지 않는다. 프로그램 입장에서는 \`price + quantity\`도 문법적으로 올바른 계산이기 때문이다. 그래서 논리 에러를 찾으려면 코드의 흐름과 중간값을 직접 확인해야 한다. 이때 필요한 것이 디버깅이다.

## 에러를 읽는 습관

에러를 잘 해결하려면 다음 순서로 읽는 습관을 들이면 좋다.

\`\`\`text
1. 에러가 발생한 줄을 찾는다.
2. 에러 종류를 확인한다.
3. 에러 설명을 읽는다.
4. 그 줄에서 사용한 변수와 값을 확인한다.
5. 최근에 수정한 코드를 확인한다.
\`\`\`

에러 메시지를 처음부터 끝까지 모두 완벽히 이해하려고 할 필요는 없다. 처음에는 다음 두 가지를 먼저 찾으면 된다.

\`\`\`text
어디서 발생했는가?
어떤 종류의 에러인가?
\`\`\`

예를 들어 다음 에러 메시지를 보자.

\`\`\`text
Traceback (most recent call last):
  File "main.py", line 3, in <module>
    print(numbers[5])
IndexError: list index out of range
\`\`\`

여기서 중요한 부분은 다음과 같다.

\`\`\`text
File "main.py", line 3
IndexError: list index out of range
\`\`\`

즉, \`main.py\` 파일의 3번째 줄에서 리스트 인덱스 범위를 벗어난 에러가 발생했다는 뜻이다.

에러 메시지는 적이 아니다. 에러 메시지는 문제를 찾기 위한 단서이다.

---

## 에러 메시지 구조

파이썬에서 실행 중 에러가 발생하면 보통 \`Traceback\`이라는 메시지가 출력된다. \`Traceback\`은 에러가 발생하기까지의 실행 흐름을 보여준다.

다음 코드를 실행한다고 하자.

\`\`\`python
def divide(a, b):
    return a / b


result = divide(10, 0)
print(result)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
Traceback (most recent call last):
  File "main.py", line 4, in <module>
    result = divide(10, 0)
  File "main.py", line 2, in divide
    return a / b
ZeroDivisionError: division by zero
\`\`\`

처음 보면 길어 보이지만, 구조를 나누어 보면 어렵지 않다.

\`\`\`text
Traceback (most recent call last):
\`\`\`

이 문장은 에러가 발생하기까지의 호출 흐름을 보여주겠다는 뜻이다.

\`\`\`text
File "main.py", line 4, in <module>
    result = divide(10, 0)
\`\`\`

\`main.py\` 파일의 4번째 줄에서 \`divide(10, 0)\`을 호출했다는 뜻이다.

\`\`\`text
File "main.py", line 2, in divide
    return a / b
\`\`\`

그 함수 안으로 들어가 보니 2번째 줄에서 \`a / b\`를 실행하다가 문제가 생겼다는 뜻이다.

\`\`\`text
ZeroDivisionError: division by zero
\`\`\`

마지막 줄이 가장 중요하다. 에러 종류는 \`ZeroDivisionError\`이고, 설명은 \`division by zero\`이다. 즉, 0으로 나누려고 해서 에러가 발생했다.

## 에러 메시지에서 가장 먼저 볼 부분

에러 메시지를 읽을 때는 아래 순서로 확인하면 좋다.

첫째, 마지막 줄을 본다.

\`\`\`text
ZeroDivisionError: division by zero
\`\`\`

마지막 줄에는 에러 종류와 간단한 설명이 나온다.

둘째, 에러가 실제로 발생한 코드 줄을 본다.

\`\`\`text
return a / b
\`\`\`

셋째, 그 코드가 왜 실행되었는지 위쪽 호출 흐름을 본다.

\`\`\`text
result = divide(10, 0)
\`\`\`

이렇게 읽으면 에러의 원인을 훨씬 빠르게 찾을 수 있다.

## 함수 안에서 발생한 에러 읽기

함수를 사용하면 에러 메시지가 조금 길어질 수 있다. 함수가 여러 번 호출되기 때문이다.

다음 코드를 보자.

\`\`\`python
def calculate_average(scores):
    total = sum(scores)
    return total / len(scores)


scores = []
average = calculate_average(scores)
print(average)
\`\`\`

실행하면 에러가 발생한다.

\`\`\`text
Traceback (most recent call last):
  File "main.py", line 6, in <module>
    average = calculate_average(scores)
  File "main.py", line 3, in calculate_average
    return total / len(scores)
ZeroDivisionError: division by zero
\`\`\`

이 코드는 빈 리스트의 평균을 구하려고 했다. \`len(scores)\`가 \`0\`이기 때문에 \`total / len(scores)\`는 \`0\`으로 나누는 계산이 된다.

에러가 발생한 줄만 보면 \`return total / len(scores)\`이다. 하지만 진짜 원인은 \`scores\`가 빈 리스트라는 점이다. 그래서 에러를 해결할 때는 문제가 난 줄뿐만 아니라 그 줄에 사용된 값도 함께 확인해야 한다.

\`\`\`python
def calculate_average(scores):
    if len(scores) == 0:
        return 0

    total = sum(scores)
    return total / len(scores)
\`\`\`

이렇게 빈 리스트일 때의 처리를 추가하면 에러를 막을 수 있다.

---

## 자주 만나는 에러

파이썬을 배우는 초반에는 자주 만나는 에러가 어느 정도 정해져 있다. 대표적인 에러를 미리 알아두면 에러 메시지를 보고 원인을 빨리 추측할 수 있다.

## \`SyntaxError\`

\`SyntaxError\`는 문법이 잘못되었을 때 발생한다.

\`\`\`python
if True
    print("실행")
\`\`\`

\`if True\` 뒤에 콜론이 없기 때문에 에러가 발생한다.

\`\`\`text
SyntaxError: expected ':'
\`\`\`

자주 발생하는 원인은 다음과 같다.

- 콜론 누락
- 괄호 누락
- 따옴표 누락
- 잘못된 들여쓰기
- 파이썬 문법에 맞지 않는 코드

## \`NameError\`

\`NameError\`는 정의되지 않은 이름을 사용했을 때 발생한다.

\`\`\`python
print(username)
\`\`\`

\`username\`이라는 변수를 만든 적이 없기 때문에 에러가 발생한다.

\`\`\`text
NameError: name 'username' is not defined
\`\`\`

다음과 같은 경우에 자주 발생한다.

- 변수를 선언하기 전에 사용한 경우
- 변수명을 잘못 입력한 경우
- 대소문자를 다르게 쓴 경우
- 함수 이름을 잘못 쓴 경우

예를 들어 파이썬은 대소문자를 구분한다.

\`\`\`python
name = "홍길동"
print(Name)
\`\`\`

\`name\`과 \`Name\`은 서로 다른 이름이다. 따라서 위 코드는 \`NameError\`가 발생한다.

## \`TypeError\`

\`TypeError\`는 자료형이 맞지 않는 연산이나 함수 호출을 했을 때 발생한다.

\`\`\`python
age = 20
message = "나이: " + age
print(message)
\`\`\`

문자열과 정수를 \`+\`로 바로 연결할 수 없기 때문에 에러가 발생한다.

\`\`\`text
TypeError: can only concatenate str (not "int") to str
\`\`\`

해결하려면 정수를 문자열로 바꾸거나 f-string을 사용하면 된다.

\`\`\`python
age = 20
message = "나이: " + str(age)
print(message)
\`\`\`

또는 다음처럼 작성할 수 있다.

\`\`\`python
age = 20
message = f"나이: {age}"
print(message)
\`\`\`

\`TypeError\`는 함수에 전달한 인자의 개수가 맞지 않을 때도 발생한다.

\`\`\`python
def add(a, b):
    return a + b


print(add(10))
\`\`\`

\`add()\` 함수는 두 개의 값을 받아야 하는데 하나만 전달했기 때문에 에러가 발생한다.

\`\`\`text
TypeError: add() missing 1 required positional argument: 'b'
\`\`\`

## \`ValueError\`

\`ValueError\`는 자료형은 맞지만 값이 적절하지 않을 때 발생한다.

\`\`\`python
number = int("abc")
\`\`\`

\`int()\`는 문자열을 정수로 바꿀 수 있지만, \`"abc"\`는 정수로 바꿀 수 없는 문자열이다. 따라서 에러가 발생한다.

\`\`\`text
ValueError: invalid literal for int() with base 10: 'abc'
\`\`\`

반면 다음 코드는 정상 동작한다.

\`\`\`python
number = int("100")
\`\`\`

자료형은 문자열로 같지만, 값의 내용이 다르다. \`"100"\`은 정수로 바꿀 수 있고, \`"abc"\`는 정수로 바꿀 수 없다.

\`ValueError\`는 사용자 입력값을 숫자로 변환할 때 자주 발생한다.

\`\`\`python
value = input("숫자를 입력하세요: ")
number = int(value)
\`\`\`

사용자가 숫자가 아닌 값을 입력하면 에러가 발생한다.

## \`KeyError\`

\`KeyError\`는 딕셔너리에 없는 key를 조회할 때 발생한다.

\`\`\`python
customer = {
    "name": "홍길동",
    "grade": "VIP"
}

print(customer["email"])
\`\`\`

\`customer\` 딕셔너리에는 \`"email"\` key가 없다.

\`\`\`text
KeyError: 'email'
\`\`\`

없는 key를 안전하게 처리하려면 \`get()\`을 사용할 수 있다.

\`\`\`python
email = customer.get("email", "이메일 없음")
print(email)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
이메일 없음
\`\`\`

## \`IndexError\`

\`IndexError\`는 리스트나 문자열에서 존재하지 않는 인덱스에 접근할 때 발생한다.

\`\`\`python
numbers = [10, 20, 30]
print(numbers[3])
\`\`\`

리스트의 인덱스는 \`0\`, \`1\`, \`2\`까지만 있다. \`3\`번 인덱스는 존재하지 않는다.

\`\`\`text
IndexError: list index out of range
\`\`\`

해결하려면 인덱스 범위를 확인해야 한다.

\`\`\`python
numbers = [10, 20, 30]

if len(numbers) > 3:
    print(numbers[3])
else:
    print("해당 인덱스가 없습니다.")
\`\`\`

## \`ZeroDivisionError\`

\`ZeroDivisionError\`는 0으로 나누려고 할 때 발생한다.

\`\`\`python
result = 10 / 0
\`\`\`

\`\`\`text
ZeroDivisionError: division by zero
\`\`\`

나눗셈을 할 때는 분모가 0인지 확인해야 한다.

\`\`\`python
def divide(a, b):
    if b == 0:
        return None
    return a / b
\`\`\`

## \`FileNotFoundError\`

\`FileNotFoundError\`는 존재하지 않는 파일을 열려고 할 때 발생한다.

\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
\`\`\`

만약 현재 폴더에 \`data.txt\` 파일이 없다면 에러가 발생한다.

\`\`\`text
FileNotFoundError: [Errno 2] No such file or directory: 'data.txt'
\`\`\`

파일 처리는 10장에서 자세히 배운다. 지금은 “없는 파일을 열려고 하면 이런 에러가 발생한다” 정도만 기억하면 된다.

## 에러 종류를 외우는 것보다 중요한 것

에러 이름을 모두 외울 필요는 없다. 중요한 것은 에러 메시지를 읽고 다음 질문을 던지는 것이다.

\`\`\`text
어떤 줄에서 발생했는가?
어떤 종류의 에러인가?
어떤 값 때문에 문제가 되었는가?
이 코드는 어떤 상황을 예상하지 못했는가?
\`\`\`

이 질문을 할 수 있으면 에러를 해결하는 속도가 빨라진다.

---
`;export{e as default};