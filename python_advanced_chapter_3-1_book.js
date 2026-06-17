var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-1 -->

# 3.1 함수도 객체다

파이썬에서는 숫자, 문자열, 리스트, 딕셔너리뿐 아니라 함수도 객체입니다. 객체라는 말은 변수에 저장할 수 있고, 다른 곳으로 전달할 수 있으며, 필요한 경우 반환값으로 사용할 수도 있다는 뜻입니다.

기초 단계에서는 함수를 다음과 같이 사용했습니다.

\`\`\`python
def greet(name):
    return f"안녕하세요, {name}님"

message = greet("민수")
print(message)
\`\`\`

위 코드에서 \`greet\`는 함수 이름입니다. 보통은 \`greet("민수")\`처럼 괄호를 붙여 함수를 실행합니다. 하지만 괄호를 붙이지 않고 함수 이름만 사용하면 함수 자체를 값처럼 다룰 수 있습니다.

\`\`\`python
def greet(name):
    return f"안녕하세요, {name}님"

func = greet

print(func("지영"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요, 지영님
\`\`\`

여기서 \`func = greet\`는 \`greet\` 함수를 실행한 것이 아닙니다. \`greet\`라는 함수 객체를 \`func\`라는 이름으로도 가리키게 한 것입니다. 그래서 \`func("지영")\`을 호출하면 \`greet("지영")\`을 호출한 것과 같은 결과가 나옵니다.

---

### 3.1.1 함수를 변수에 저장하기

함수를 변수에 저장하면 상황에 따라 실행할 함수를 바꿀 수 있습니다.

\`\`\`python
def add(a, b):
    return a + b


def multiply(a, b):
    return a * b

operation = add
print(operation(10, 3))

operation = multiply
print(operation(10, 3))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
13
30
\`\`\`

\`operation\`이라는 이름은 처음에는 \`add\` 함수를 가리켰고, 나중에는 \`multiply\` 함수를 가리켰습니다. 함수도 객체이므로 변수에 저장하고 바꿔 사용할 수 있습니다.

이 구조는 단순해 보이지만 실무에서 자주 사용됩니다. 예를 들어 사용자가 선택한 옵션에 따라 다른 계산 함수를 실행하거나, 데이터 종류에 따라 다른 변환 함수를 적용할 때 유용합니다.

---

### 3.1.2 함수를 리스트나 딕셔너리에 저장하기

함수는 리스트나 딕셔너리에도 저장할 수 있습니다.

\`\`\`python
def clean_text(text):
    return text.strip()


def to_lower(text):
    return text.lower()


def remove_dash(text):
    return text.replace("-", "")

functions = [clean_text, to_lower, remove_dash]

value = "  USER-001  "

for function in functions:
    value = function(value)

print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
user001
\`\`\`

이 코드는 문자열 정리 작업을 순서대로 적용합니다.

1. 앞뒤 공백 제거
2. 소문자 변환
3. 하이픈 제거

함수를 리스트에 담으면 처리 단계를 데이터처럼 관리할 수 있습니다. 이 방식은 데이터 전처리나 검증 로직을 만들 때 유용합니다.

딕셔너리에 함수를 저장하면 이름으로 함수를 선택할 수 있습니다.

\`\`\`python
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b

operations = {
    "add": add,
    "subtract": subtract,
    "multiply": multiply,
}

selected = "multiply"
result = operations[selected](10, 5)

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
50
\`\`\`

조건문을 길게 쓰지 않고도 문자열 키를 기준으로 실행할 함수를 선택할 수 있습니다.

---

### 3.1.3 함수를 인자로 전달하기

함수를 다른 함수의 인자로 전달할 수도 있습니다.

\`\`\`python
def apply_operation(a, b, operation):
    return operation(a, b)


def add(a, b):
    return a + b


def multiply(a, b):
    return a * b

print(apply_operation(10, 3, add))
print(apply_operation(10, 3, multiply))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
13
30
\`\`\`

\`apply_operation\` 함수는 직접 더하기나 곱하기를 하지 않습니다. 대신 어떤 계산을 할지 \`operation\`이라는 인자로 전달받습니다.

이처럼 함수를 인자로 받는 함수는 더 유연합니다. 처리 방식은 외부에서 결정하고, 공통 흐름은 함수 안에서 담당할 수 있기 때문입니다.

---

### 3.1.4 함수를 반환하기

함수는 다른 함수를 반환할 수도 있습니다.

\`\`\`python
def get_discount_function(member_type):
    if member_type == "VIP":
        def discount(price):
            return price * 0.8
    else:
        def discount(price):
            return price * 0.95

    return discount

vip_discount = get_discount_function("VIP")
normal_discount = get_discount_function("NORMAL")

print(vip_discount(10000))
print(normal_discount(10000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
8000.0
9500.0
\`\`\`

\`get_discount_function\`은 회원 종류에 따라 다른 할인 함수를 만들어 반환합니다. 반환된 함수는 나중에 필요한 곳에서 호출할 수 있습니다.

이 구조는 이후에 배울 **클로저**와 **데코레이터**를 이해하는 데 중요한 기반이 됩니다.

---

### 3.1.5 콜백 함수 개념

콜백 함수란 다른 함수에 전달되어, 특정 시점에 호출되는 함수를 말합니다.

\`\`\`python
def process_data(data, callback):
    result = []

    for item in data:
        result.append(callback(item))

    return result


def double(number):
    return number * 2

numbers = [1, 2, 3, 4]
processed = process_data(numbers, double)

print(processed)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[2, 4, 6, 8]
\`\`\`

여기서 \`double\`은 \`process_data\` 함수 안에서 호출됩니다. 즉, \`double\`은 콜백 함수로 전달된 것입니다.

콜백은 다음과 같은 상황에서 많이 사용됩니다.

- 데이터 하나하나에 같은 규칙 적용하기
- 특정 이벤트가 발생했을 때 실행할 함수 지정하기
- 정렬 기준을 함수로 전달하기
- 검증 규칙을 외부에서 주입하기
- 로그 처리 방식이나 에러 처리 방식을 바꾸기

---
`;export{e as default};