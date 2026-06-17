var e=`# 6장. 예외 처리와 디버깅

## 이 장에서 배우는 것

5장에서는 함수를 배웠다. 함수 덕분에 우리는 코드를 여러 조각으로 나누고, 필요한 값을 입력받아 결과를 반환하는 코드를 작성할 수 있게 되었다. 이제 프로그램은 조금 더 구조를 갖추기 시작했다.

하지만 실제 프로그램은 항상 예상대로만 동작하지 않는다. 숫자를 입력해야 하는 곳에 사용자가 문자를 입력할 수도 있고, 딕셔너리에 없는 key를 조회할 수도 있다. 리스트의 세 번째 값을 꺼내려고 했는데 실제 리스트에는 값이 하나뿐일 수도 있다.

예를 들어 다음 코드를 보자.

\`\`\`python
age = int(input("나이를 입력하세요: "))

if age >= 19:
    print("성인입니다.")
else:
    print("미성년자입니다.")
\`\`\`

사용자가 \`20\`을 입력하면 문제없이 실행된다. 하지만 사용자가 \`스무살\`이라고 입력하면 어떻게 될까? \`int()\`는 \`"스무살"\`을 정수로 바꿀 수 없기 때문에 프로그램은 에러를 내고 멈춘다.

또 다른 예를 보자.

\`\`\`python
customer = {
    "name": "홍길동",
    "grade": "VIP"
}

print(customer["email"])
\`\`\`

이 딕셔너리에는 \`"email"\`이라는 key가 없다. 따라서 이 코드는 실행 중에 에러가 발생한다.

프로그래밍을 하다 보면 에러를 피할 수 없다. 중요한 것은 에러가 났다는 사실에 당황하지 않고, 에러 메시지를 읽고, 원인을 찾고, 필요한 경우 프로그램이 멈추지 않도록 처리하는 것이다.

이 장에서는 다음 내용을 배운다.

- 에러와 예외의 개념
- 에러 메시지 읽는 법
- 자주 만나는 에러 종류
- \`try-except\` 기본 문법
- 특정 예외 처리하기
- \`else\`와 \`finally\`
- 예외를 무조건 숨기면 안 되는 이유
- 기본값으로 대체하는 패턴
- 사용자용 에러와 개발자용 에러 구분
- 재시도 로직의 기초
- 디버깅의 개념
- \`print\` 디버깅
- VS Code 디버거의 기본 사용법

이 장을 마치면 에러 메시지를 보고 원인을 추측할 수 있고, 실패할 수 있는 코드를 안전하게 처리할 수 있다. 또한 코드가 예상과 다르게 동작할 때 중간값을 확인하며 문제를 찾아가는 방법을 익히게 된다.

---

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

# 6.2 예외 처리 기본 문법

## \`try-except\`

프로그램을 만들 때 어떤 코드는 실패할 가능성이 있다. 예를 들어 문자열을 숫자로 변환하는 코드를 보자.

\`\`\`python
value = input("숫자를 입력하세요: ")
number = int(value)
print(number)
\`\`\`

사용자가 \`100\`을 입력하면 정상 동작한다. 하지만 \`abc\`를 입력하면 \`ValueError\`가 발생하고 프로그램이 멈춘다.

이처럼 실패할 수 있는 코드를 안전하게 처리하기 위해 사용하는 문법이 \`try-except\`이다.

기본 구조는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except:
    에러가 발생했을 때 실행할 코드
\`\`\`

예제로 확인해 보자.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    print(number)
except:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

사용자가 숫자를 입력하면 \`try\` 안의 코드가 정상 실행된다. 사용자가 숫자가 아닌 값을 입력하면 에러가 발생하고, 파이썬은 \`except\` 블록으로 이동한다.

\`\`\`text
숫자로 변환할 수 없습니다.
\`\`\`

\`try-except\`를 사용하면 프로그램이 갑자기 멈추는 대신, 에러 상황에 맞는 처리를 할 수 있다.

## 예외 처리의 흐름

다음 코드를 보자.

\`\`\`python
try:
    print("변환을 시작합니다.")
    number = int("abc")
    print("변환이 완료되었습니다.")
except:
    print("변환 중 문제가 발생했습니다.")

print("프로그램을 종료합니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
변환을 시작합니다.
변환 중 문제가 발생했습니다.
프로그램을 종료합니다.
\`\`\`

\`number = int("abc")\`에서 에러가 발생했기 때문에 그 아래에 있는 \`print("변환이 완료되었습니다.")\`는 실행되지 않는다. 대신 \`except\` 블록이 실행되고, 그 후 프로그램은 계속 진행된다.

예외 처리는 실패한 코드를 억지로 성공시키는 문법이 아니다. 실패가 발생했을 때 프로그램이 무너지는 대신, 적절한 다음 행동을 정하는 문법이다.

## 아무 예외나 처리하는 방식의 문제

아래처럼 \`except:\`만 쓰면 모든 예외를 잡는다.

\`\`\`python
try:
    number = int("abc")
except:
    print("오류가 발생했습니다.")
\`\`\`

초보 단계에서는 이해하기 쉽지만, 실무에서는 조심해야 한다. 모든 에러를 같은 방식으로 처리하면 진짜 문제를 놓칠 수 있기 때문이다.

예를 들어 다음 코드를 보자.

\`\`\`python
try:
    number = int("100")
    result = number / count
except:
    print("오류가 발생했습니다.")
\`\`\`

이 코드에서 \`count\`라는 변수를 만든 적이 없다면 \`NameError\`가 발생한다. 그런데 \`except:\`가 모든 에러를 잡아 버리면 단순히 \`"오류가 발생했습니다."\`만 출력된다. 그러면 개발자는 실제 문제가 \`count\` 변수가 없다는 사실을 바로 알기 어렵다.

그래서 가능하면 어떤 예외를 처리할지 구체적으로 쓰는 것이 좋다.

---

## 특정 예외 처리

특정 예외만 처리하려면 \`except\` 뒤에 예외 이름을 적는다.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    print(number)
except ValueError:
    print("숫자 형식으로 입력해야 합니다.")
\`\`\`

이 코드는 \`ValueError\`만 처리한다. 숫자로 변환할 수 없는 값이 들어왔을 때만 \`except ValueError\` 블록이 실행된다.

특정 예외를 처리하면 코드의 의도가 분명해진다.

\`\`\`text
이 코드는 숫자 변환 실패를 예상하고 있다.
\`\`\`

이처럼 읽을 수 있기 때문이다.

## 여러 예외 처리하기

한 코드에서 여러 종류의 예외가 발생할 수 있다.

다음 코드를 보자.

\`\`\`python
def get_item(items, index_text):
    index = int(index_text)
    return items[index]


products = ["키보드", "마우스", "모니터"]
print(get_item(products, "5"))
\`\`\`

이 함수에서는 두 가지 문제가 생길 수 있다.

첫째, \`index_text\`가 숫자로 바꿀 수 없는 문자열이면 \`ValueError\`가 발생한다.

\`\`\`python
get_item(products, "abc")
\`\`\`

둘째, 숫자로는 바꿀 수 있지만 리스트 범위를 벗어나면 \`IndexError\`가 발생한다.

\`\`\`python
get_item(products, "5")
\`\`\`

이럴 때는 예외를 나누어 처리할 수 있다.

\`\`\`python
def get_item(items, index_text):
    try:
        index = int(index_text)
        return items[index]
    except ValueError:
        return "인덱스는 숫자로 입력해야 합니다."
    except IndexError:
        return "해당 위치의 데이터가 없습니다."


products = ["키보드", "마우스", "모니터"]

print(get_item(products, "abc"))
print(get_item(products, "5"))
print(get_item(products, "1"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
인덱스는 숫자로 입력해야 합니다.
해당 위치의 데이터가 없습니다.
마우스
\`\`\`

예외를 나누어 처리하면 사용자에게 더 정확한 안내를 할 수 있다.

## 여러 예외를 한 번에 처리하기

서로 비슷하게 처리할 예외라면 하나의 \`except\`에서 묶을 수 있다.

\`\`\`python
try:
    index = int(index_text)
    value = items[index]
except (ValueError, IndexError):
    print("올바른 인덱스를 입력해야 합니다.")
\`\`\`

\`ValueError\`와 \`IndexError\`를 같은 방식으로 처리하고 싶을 때 사용할 수 있다.

다만 예외별로 안내 메시지를 다르게 주고 싶다면 따로 처리하는 편이 좋다.

## 예외 객체 확인하기

예외가 발생했을 때 자세한 에러 메시지를 확인하고 싶다면 \`as\`를 사용할 수 있다.

\`\`\`python
try:
    number = int("abc")
except ValueError as error:
    print("에러가 발생했습니다.")
    print(error)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
에러가 발생했습니다.
invalid literal for int() with base 10: 'abc'
\`\`\`

\`error\` 변수에는 실제 에러 메시지가 들어 있다. 이 정보는 개발자가 문제를 확인하거나 로그를 남길 때 유용하다.

## 예외 처리 순서

예외를 여러 개 처리할 때는 구체적인 예외를 먼저 쓰는 것이 좋다. 아직 이 수업에서는 예외 상속 구조를 깊게 다루지는 않지만, 넓은 범위의 예외를 먼저 처리하면 뒤에 있는 구체적인 예외 처리 코드가 실행되지 않을 수 있다.

초보 단계에서는 다음 원칙을 기억하자.

\`\`\`text
가능하면 예상되는 구체적인 예외를 적는다.
모든 예외를 잡는 코드는 마지막 수단으로 사용한다.
\`\`\`

---

## \`else\`

\`try-except\` 문에는 \`else\`를 붙일 수 있다. \`else\`는 \`try\` 블록에서 예외가 발생하지 않았을 때 실행된다.

기본 구조는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
else:
    에러가 발생하지 않았을 때 실행할 코드
\`\`\`

예제를 보자.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
else:
    print("변환 성공:", number)
\`\`\`

사용자가 \`100\`을 입력하면 \`else\`가 실행된다.

\`\`\`text
변환 성공: 100
\`\`\`

사용자가 \`abc\`를 입력하면 \`except\`가 실행되고 \`else\`는 실행되지 않는다.

\`\`\`text
숫자로 변환할 수 없습니다.
\`\`\`

## \`else\`를 사용하는 이유

\`else\` 없이도 코드를 작성할 수 있다.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    print("변환 성공:", number)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

이 코드도 동작한다. 그렇다면 왜 \`else\`를 사용할까?

\`else\`를 사용하면 “예외가 발생할 수 있는 코드”와 “정상일 때 실행할 코드”를 분리할 수 있다.

\`\`\`python
try:
    number = int(value)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
else:
    print("변환 성공:", number)
\`\`\`

이렇게 작성하면 \`try\` 안에는 정말 실패할 수 있는 코드만 두고, 성공 후 처리 코드는 \`else\`로 분리할 수 있다. 코드의 의도가 더 명확해진다.

## 실무 예제: 안전한 할인율 계산

다음 함수는 가격과 할인율 문자열을 받아 할인된 금액을 계산한다.

\`\`\`python
def calculate_discount_price(price, rate_text):
    try:
        rate = float(rate_text)
    except ValueError:
        return "할인율은 숫자로 입력해야 합니다."
    else:
        return price - (price * rate)


print(calculate_discount_price(10000, "0.1"))
print(calculate_discount_price(10000, "십퍼센트"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
9000.0
할인율은 숫자로 입력해야 합니다.
\`\`\`

\`try\`에서는 할인율을 숫자로 변환한다. 변환에 실패하면 메시지를 반환한다. 변환에 성공하면 \`else\`에서 계산을 진행한다.

---

## \`finally\`

\`finally\`는 예외 발생 여부와 상관없이 항상 실행되는 블록이다.

기본 구조는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
finally:
    항상 실행할 코드
\`\`\`

예제를 보자.

\`\`\`python
try:
    number = int("abc")
except ValueError:
    print("숫자로 변환할 수 없습니다.")
finally:
    print("작업을 종료합니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
숫자로 변환할 수 없습니다.
작업을 종료합니다.
\`\`\`

이번에는 에러가 발생하지 않는 예제를 보자.

\`\`\`python
try:
    number = int("100")
    print(number)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
finally:
    print("작업을 종료합니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
100
작업을 종료합니다.
\`\`\`

에러가 발생하든 발생하지 않든 \`finally\`는 실행된다.

## \`finally\`는 언제 사용할까?

\`finally\`는 어떤 작업이 성공하든 실패하든 반드시 정리해야 하는 일이 있을 때 사용한다.

대표적인 예는 다음과 같다.

- 파일 닫기
- 네트워크 연결 종료
- 임시 데이터 정리
- 작업 종료 메시지 출력
- 실행 상태 초기화

파일 처리는 뒤에서 자세히 배우지만, 개념만 간단히 보면 다음과 같다.

\`\`\`python
file = None

try:
    file = open("data.txt", "r", encoding="utf-8")
    content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
finally:
    if file is not None:
        file.close()
\`\`\`

파일을 열었다면 작업이 성공하든 실패하든 마지막에 닫아야 한다. 이처럼 반드시 실행되어야 하는 정리 코드를 \`finally\`에 넣는다.

다만 파일 처리에서는 보통 \`with\` 문을 사용하면 파일을 자동으로 닫을 수 있다. 이 내용은 10장에서 다룬다.

## \`try-except-else-finally\` 전체 구조

네 가지를 모두 사용하면 다음과 같은 구조가 된다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
else:
    에러가 발생하지 않았을 때 실행할 코드
finally:
    항상 실행할 코드
\`\`\`

모든 상황에서 네 가지를 다 써야 하는 것은 아니다. 필요한 부분만 사용하면 된다.

가장 자주 쓰는 형태는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
\`\`\`

조금 더 명확하게 성공 흐름을 분리하고 싶을 때는 \`else\`를 사용한다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러 처리
else:
    성공 후 처리
\`\`\`

항상 실행해야 하는 정리 코드가 있을 때는 \`finally\`를 사용한다.

\`\`\`python
try:
    작업 실행
except 예외종류:
    에러 처리
finally:
    정리 작업
\`\`\`

---

# 6.3 예외 처리 실무 패턴

## 예외를 무조건 숨기면 안 되는 이유

예외 처리를 처음 배우면 모든 코드를 \`try-except\`로 감싸고 싶어질 수 있다.

\`\`\`python
try:
    # 많은 코드
    pass
except:
    pass
\`\`\`

하지만 이런 코드는 위험하다. 에러가 발생해도 아무 일도 하지 않기 때문에 문제가 사라진 것처럼 보인다. 실제로는 문제가 해결된 것이 아니라 감춰진 것이다.

다음 코드를 보자.

\`\`\`python
def calculate_total(price, quantity):
    try:
        return price * quantity
    except:
        return 0


print(calculate_total(10000, 3))
print(calculate_total("10000", 3))
\`\`\`

두 번째 호출은 사실 의도와 다르게 동작할 수 있다. 문자열과 정수를 곱하면 문자열 반복이 된다.

\`\`\`python
"10000" * 3
\`\`\`

결과는 다음과 같다.

\`\`\`text
100001000010000
\`\`\`

이 경우에는 에러가 발생하지 않기 때문에 \`except\`로도 잡히지 않는다. 더 큰 문제는 코드가 잘못된 값으로 계속 진행될 수 있다는 점이다.

또 다른 예를 보자.

\`\`\`python
def get_grade(customer):
    try:
        return customer["grade"]
    except:
        return "일반"
\`\`\`

이 함수는 \`grade\`가 없을 때 기본값을 반환하려는 의도일 수 있다. 하지만 \`customer\`가 딕셔너리가 아니라 문자열이어도 같은 방식으로 처리될 수 있다. 그러면 데이터 구조가 잘못되었다는 중요한 문제를 놓칠 수 있다.

더 나은 코드는 예상되는 예외만 처리하는 것이다.

\`\`\`python
def get_grade(customer):
    try:
        return customer["grade"]
    except KeyError:
        return "일반"
\`\`\`

이 코드는 \`grade\` key가 없을 때만 기본값을 반환한다. 그 외의 문제는 숨기지 않는다.

## \`except: pass\`를 조심하자

다음 코드는 특히 주의해야 한다.

\`\`\`python
try:
    number = int(value)
except:
    pass
\`\`\`

\`pass\`는 아무것도 하지 않는 코드이다. 즉, 에러가 발생해도 아무 메시지도 없고, 어떤 처리도 하지 않는다.

이런 코드는 문제를 찾기 어렵게 만든다. 프로그램이 왜 원하는 대로 동작하지 않는지 알 수 없기 때문이다.

정말 아무것도 하지 않아도 되는 특별한 상황이 아니라면, 최소한 메시지나 로그를 남기는 것이 좋다.

\`\`\`python
try:
    number = int(value)
except ValueError as error:
    print("숫자 변환 실패:", error)
\`\`\`

실무에서는 단순 출력 대신 로그를 남기는 경우가 많다. 로그는 12장에서 자세히 배운다.

## 예외 처리의 적절한 범위

\`try\` 블록에는 가능한 한 실패할 수 있는 코드만 넣는 것이 좋다.

좋지 않은 예를 보자.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    result = number * 10
    message = f"결과는 {result}입니다."
    print(message)
except ValueError:
    print("숫자를 입력해야 합니다.")
\`\`\`

이 코드도 동작하지만, \`try\` 안에 많은 코드가 들어 있다. 현재 실제로 \`ValueError\`가 발생할 가능성이 큰 코드는 \`int(value)\`이다.

조금 더 명확하게 작성하면 다음과 같다.

\`\`\`python
value = input("숫자를 입력하세요: ")

try:
    number = int(value)
except ValueError:
    print("숫자를 입력해야 합니다.")
else:
    result = number * 10
    message = f"결과는 {result}입니다."
    print(message)
\`\`\`

이렇게 작성하면 실패할 수 있는 부분과 성공 후 처리할 부분이 분리된다.

---

## 기본값으로 대체하기

실무에서는 데이터가 항상 완벽하지 않다. 어떤 고객은 이메일이 없을 수 있고, 어떤 상품은 할인율 정보가 없을 수 있다. 이런 경우 에러를 발생시키는 대신 기본값으로 처리할 수 있다.

## 딕셔너리에 없는 값 기본 처리

다음 딕셔너리를 보자.

\`\`\`python
customer = {
    "name": "홍길동",
    "grade": "VIP"
}
\`\`\`

이 고객에게 이메일 정보가 없을 수 있다. 이때 다음처럼 접근하면 \`KeyError\`가 발생한다.

\`\`\`python
email = customer["email"]
\`\`\`

안전하게 처리하려면 \`get()\`을 사용할 수 있다.

\`\`\`python
email = customer.get("email", "이메일 없음")
print(email)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
이메일 없음
\`\`\`

이 경우에는 굳이 \`try-except\`를 사용하지 않아도 된다. 딕셔너리의 없는 key는 \`get()\`으로 처리하는 편이 더 간단하고 명확할 수 있다.

## 숫자 변환 실패 시 기본값 사용

사용자 입력값이나 외부 데이터는 문자열로 들어오는 경우가 많다.

\`\`\`python
price_text = "15,000"
\`\`\`

이 문자열은 바로 정수로 변환할 수 없다.

\`\`\`python
int(price_text)
\`\`\`

쉼표가 들어 있기 때문이다. 먼저 쉼표를 제거해야 한다.

\`\`\`python
price = int(price_text.replace(",", ""))
\`\`\`

하지만 값이 비어 있거나 잘못된 문자열이면 여전히 에러가 발생할 수 있다. 안전한 변환 함수를 만들어 보자.

\`\`\`python
def to_int(value, default=0):
    try:
        return int(value)
    except ValueError:
        return default


print(to_int("100"))
print(to_int("abc"))
print(to_int("abc", default=-1))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
100
0
-1
\`\`\`

이 함수는 변환에 실패하면 기본값을 반환한다.

쉼표가 있는 금액 문자열까지 처리하려면 다음처럼 만들 수 있다.

\`\`\`python
def to_price(value, default=0):
    try:
        cleaned_value = value.replace(",", "")
        return int(cleaned_value)
    except ValueError:
        return default


print(to_price("15,000"))
print(to_price("가격없음"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
15000
0
\`\`\`

## 빈 리스트의 평균 처리

평균을 구하는 함수는 리스트가 비어 있을 때 문제가 생길 수 있다.

\`\`\`python
def average(numbers):
    return sum(numbers) / len(numbers)
\`\`\`

빈 리스트를 전달하면 0으로 나누는 에러가 발생한다.

\`\`\`python
average([])
\`\`\`

이런 경우 기본값을 정할 수 있다.

\`\`\`python
def average(numbers):
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)
\`\`\`

이 코드는 예외 처리를 사용하지 않는다. 예외가 발생하기 전에 조건문으로 미리 막는다. 모든 문제를 \`try-except\`로 처리할 필요는 없다. 조건문으로 자연스럽게 처리할 수 있는 경우에는 조건문을 사용하는 편이 좋다.

## 예외 처리와 조건문의 관계

예외 처리와 조건문은 모두 문제 상황을 다룰 수 있다. 하지만 사용하는 상황이 다르다.

조건문은 예상 가능한 상태를 검사할 때 사용한다.

\`\`\`python
if len(numbers) == 0:
    return 0
\`\`\`

예외 처리는 실행해 보기 전에는 실패 여부를 확실히 알기 어렵거나, 실패 가능성이 있는 작업을 안전하게 처리할 때 사용한다.

\`\`\`python
try:
    number = int(value)
except ValueError:
    return 0
\`\`\`

초보 단계에서는 다음 기준을 기억하면 좋다.

\`\`\`text
미리 쉽게 확인할 수 있으면 조건문을 사용한다.
실행 과정에서 실패할 수 있으면 예외 처리를 사용한다.
\`\`\`

---

## 사용자용 에러와 개발자용 에러

프로그램에서 에러가 발생했을 때, 모든 정보를 사용자에게 그대로 보여주는 것은 좋지 않다. 사용자는 \`ValueError\`, \`Traceback\`, \`KeyError\` 같은 메시지를 보고 무엇을 해야 할지 알기 어렵다.

사용자에게는 이해하기 쉬운 메시지를 보여주는 것이 좋다.

\`\`\`text
나이는 숫자로 입력해 주세요.
\`\`\`

반면 개발자는 원인을 파악할 수 있는 자세한 정보가 필요하다.

\`\`\`text
ValueError: invalid literal for int() with base 10: '스무살'
\`\`\`

따라서 실무에서는 사용자용 메시지와 개발자용 메시지를 구분하는 것이 중요하다.

## 사용자에게 보여줄 메시지

사용자용 메시지는 다음 기준을 만족하는 것이 좋다.

- 무엇이 잘못되었는지 알려준다.
- 어떻게 고치면 되는지 알려준다.
- 너무 기술적인 표현을 피한다.
- 사용자를 탓하는 표현을 피한다.

예를 들어 다음 메시지는 초보 사용자에게 불친절하다.

\`\`\`text
ValueError 발생
\`\`\`

조금 더 좋은 메시지는 다음과 같다.

\`\`\`text
나이는 숫자로 입력해 주세요.
\`\`\`

더 친절하게 쓰면 다음과 같다.

\`\`\`text
나이는 숫자로 입력해야 합니다. 예: 20
\`\`\`

## 개발자가 확인할 메시지

개발자는 실제 에러 원인을 확인해야 한다. 이때 예외 객체를 활용할 수 있다.

\`\`\`python
value = "스무살"

try:
    age = int(value)
except ValueError as error:
    print("사용자 메시지: 나이는 숫자로 입력해 주세요.")
    print("개발자 메시지:", error)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
사용자 메시지: 나이는 숫자로 입력해 주세요.
개발자 메시지: invalid literal for int() with base 10: '스무살'
\`\`\`

실무에서는 개발자 메시지를 화면에 직접 출력하기보다 로그 파일에 남기는 경우가 많다. 로그는 프로그램이 실행되는 동안 발생한 일들을 기록하는 방식이다. 자세한 내용은 12장에서 다룬다.

## 입력값 검증 함수 만들기

예외 처리는 함수로 분리하면 더 깔끔해진다.

\`\`\`python
def parse_age(value):
    try:
        return int(value)
    except ValueError:
        return None


age = parse_age("스무살")

if age is None:
    print("나이는 숫자로 입력해 주세요.")
else:
    print("입력한 나이:", age)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
나이는 숫자로 입력해 주세요.
\`\`\`

이 함수는 문자열을 나이로 변환하려고 시도한다. 성공하면 정수를 반환하고, 실패하면 \`None\`을 반환한다. 호출하는 쪽에서는 반환값이 \`None\`인지 확인해서 사용자에게 적절한 메시지를 보여줄 수 있다.

---

## 재시도 로직 기초

실패할 수 있는 작업 중에는 다시 시도하면 성공할 수 있는 작업도 있다. 예를 들어 사용자가 숫자를 잘못 입력했다면 다시 입력받으면 된다. 외부 API 요청도 일시적인 네트워크 문제 때문에 실패했다가 다시 시도하면 성공할 수 있다.

이번 장에서는 아직 네트워크 요청을 배우지 않았으므로, 사용자 입력을 예로 재시도 로직을 살펴보자.

## 숫자를 입력할 때까지 반복하기

다음 코드는 사용자가 올바른 숫자를 입력할 때까지 계속 입력을 요청한다.

\`\`\`python
while True:
    value = input("숫자를 입력하세요: ")

    try:
        number = int(value)
        break
    except ValueError:
        print("숫자로 입력해 주세요.")

print("입력한 숫자:", number)
\`\`\`

실행 흐름은 다음과 같다.

\`\`\`text
1. 값을 입력받는다.
2. 정수로 변환을 시도한다.
3. 성공하면 반복문을 종료한다.
4. 실패하면 안내 메시지를 출력하고 다시 입력받는다.
\`\`\`

이 코드는 사용자 입력을 다룰 때 자주 사용하는 패턴이다.

## 재시도 횟수 제한하기

무한히 다시 시도하는 것이 항상 좋은 것은 아니다. 경우에 따라 재시도 횟수를 제한해야 한다.

\`\`\`python
max_attempts = 3
attempt = 0
number = None

while attempt < max_attempts:
    value = input("숫자를 입력하세요: ")

    try:
        number = int(value)
        break
    except ValueError:
        attempt += 1
        print("숫자로 입력해 주세요.")

if number is None:
    print("입력 횟수를 초과했습니다.")
else:
    print("입력한 숫자:", number)
\`\`\`

이 코드는 최대 3번까지 입력을 다시 받을 수 있다. 3번 모두 실패하면 더 이상 입력을 받지 않고 종료 메시지를 출력한다.

## 재시도 로직을 함수로 분리하기

같은 입력 검증을 여러 곳에서 사용한다면 함수로 분리하는 것이 좋다.

\`\`\`python
def input_int(message, max_attempts=3):
    attempt = 0

    while attempt < max_attempts:
        value = input(message)

        try:
            return int(value)
        except ValueError:
            attempt += 1
            print("숫자로 입력해 주세요.")

    return None


age = input_int("나이를 입력하세요: ")

if age is None:
    print("나이를 입력하지 못했습니다.")
else:
    print("입력한 나이:", age)
\`\`\`

이 함수는 정수 입력을 안전하게 받는다. 입력에 성공하면 정수를 반환하고, 정해진 횟수 안에 성공하지 못하면 \`None\`을 반환한다.

## 재시도 로직에서 주의할 점

재시도 로직을 만들 때는 다음을 생각해야 한다.

\`\`\`text
몇 번까지 다시 시도할 것인가?
실패할 때 어떤 메시지를 보여줄 것인가?
계속 실패하면 어떤 값을 반환하거나 어떤 동작을 할 것인가?
성공하면 어디서 반복을 멈출 것인가?
\`\`\`

재시도는 좋은 방법이지만 무한 반복이 되지 않도록 조심해야 한다.

---

## 실무 예제: 안전한 주문 금액 계산

이번에는 지금까지 배운 내용을 이용해 안전한 주문 금액 계산 코드를 만들어 보자.

요구사항은 다음과 같다.

\`\`\`text
1. 가격과 수량을 문자열로 받는다.
2. 가격과 수량을 정수로 변환한다.
3. 변환에 실패하면 None을 반환한다.
4. 가격이나 수량이 음수이면 None을 반환한다.
5. 정상 값이면 총 금액을 반환한다.
\`\`\`

먼저 문자열을 정수로 바꾸는 함수를 만든다.

\`\`\`python
def to_int(value):
    try:
        return int(value)
    except ValueError:
        return None
\`\`\`

이제 주문 금액 계산 함수를 만든다.

\`\`\`python
def calculate_order_total(price_text, quantity_text):
    price = to_int(price_text)
    quantity = to_int(quantity_text)

    if price is None or quantity is None:
        return None

    if price < 0 or quantity < 0:
        return None

    return price * quantity
\`\`\`

사용해 보자.

\`\`\`python
print(calculate_order_total("10000", "3"))
print(calculate_order_total("가격", "3"))
print(calculate_order_total("10000", "수량"))
print(calculate_order_total("-10000", "3"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
None
None
None
\`\`\`

이 함수는 잘못된 값이 들어왔을 때 프로그램을 멈추지 않는다. 대신 실패를 의미하는 값으로 \`None\`을 반환한다. 호출하는 쪽에서는 \`None\`인지 확인해서 사용자에게 메시지를 보여줄 수 있다.

\`\`\`python
result = calculate_order_total("가격", "3")

if result is None:
    print("가격과 수량은 0 이상의 숫자로 입력해야 합니다.")
else:
    print("총 금액:", result)
\`\`\`

이처럼 예외 처리는 함수, 조건문, 반환값과 함께 사용될 때 더 실무적인 코드가 된다.

---

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