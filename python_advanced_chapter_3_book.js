var e=`# 3장. 함수 고급 활용

기초 과정에서 함수는 “코드를 재사용하기 위해 이름을 붙인 코드 묶음”으로 배웠습니다. 함수는 입력을 받고, 필요한 처리를 한 뒤, 결과를 반환할 수 있습니다. 이 정도만 알아도 작은 프로그램을 만들 수 있습니다.

하지만 파이썬에서 함수는 단순한 코드 묶음이 아닙니다. 파이썬의 함수는 **객체**입니다. 함수도 변수에 담을 수 있고, 다른 함수에 전달할 수 있으며, 함수 안에서 새 함수를 만들어 반환할 수도 있습니다. 이 특징을 이해하면 파이썬 코드를 훨씬 유연하게 설계할 수 있습니다.

이번 장에서는 함수를 더 깊게 다룹니다. \`*args\`, \`**kwargs\`, 언패킹, 고차 함수, 클로저 같은 개념은 처음에는 낯설 수 있습니다. 그러나 이 내용들은 데코레이터, 이터레이터, API 클라이언트, 데이터 처리 파이프라인, 테스트 코드, 콜백 구조를 이해하는 데 매우 중요합니다.

이 장의 목표는 복잡한 문법을 많이 외우는 것이 아닙니다. 목표는 **함수를 값처럼 다루고, 입력과 출력을 유연하게 설계하며, 재사용 가능한 처리 구조를 만드는 방법을 익히는 것**입니다.

---

## 3.1 함수도 객체다

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

## 3.2 인자 처리 심화

함수를 잘 설계하려면 함수가 값을 어떻게 받는지 정확히 이해해야 합니다. 기초 과정에서는 위치 인자, 키워드 인자, 기본값 인자를 배웠습니다. 이번에는 여기에 \`*args\`, \`**kwargs\`, 키워드 전용 인자, 위치 전용 인자 개념까지 확장합니다.

---

### 3.2.1 위치 인자와 키워드 인자 복습

위치 인자는 순서대로 전달되는 인자입니다.

\`\`\`python
def create_user(name, age, email):
    return {
        "name": name,
        "age": age,
        "email": email,
    }

user = create_user("민수", 25, "minsu@example.com")
print(user)
\`\`\`

위치 인자는 순서가 중요합니다. 순서가 바뀌면 잘못된 값이 들어갈 수 있습니다.

\`\`\`python
user = create_user(25, "민수", "minsu@example.com")
print(user)
\`\`\`

위 코드는 문법적으로는 실행될 수 있지만 의미상 잘못된 데이터가 만들어집니다.

키워드 인자는 인자 이름을 명시해서 전달합니다.

\`\`\`python
user = create_user(
    name="민수",
    age=25,
    email="minsu@example.com",
)

print(user)
\`\`\`

키워드 인자는 순서가 바뀌어도 의미가 명확합니다.

\`\`\`python
user = create_user(
    email="minsu@example.com",
    name="민수",
    age=25,
)
\`\`\`

실무에서는 값이 여러 개인 함수를 호출할 때 키워드 인자를 사용하면 코드가 더 읽기 쉬워집니다.

---

### 3.2.2 기본값 인자

기본값 인자는 인자를 전달하지 않았을 때 사용할 값을 미리 정해두는 방식입니다.

\`\`\`python
def calculate_price(price, quantity=1):
    return price * quantity

print(calculate_price(10000))
print(calculate_price(10000, 3))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10000
30000
\`\`\`

\`quantity\`를 전달하지 않으면 기본값 \`1\`이 사용됩니다.

기본값 인자는 선택 옵션이 있는 함수에서 자주 사용합니다.

\`\`\`python
def send_message(message, receiver="관리자"):
    print(f"{receiver}에게 메시지 전송: {message}")

send_message("서버가 시작되었습니다.")
send_message("보고서가 생성되었습니다.", receiver="팀장")
\`\`\`

---

### 3.2.3 기본값으로 가변 객체를 사용하면 안 되는 이유

기본값 인자에서 가장 주의해야 할 것은 리스트나 딕셔너리 같은 가변 객체를 기본값으로 사용하지 않는 것입니다.

다음 코드를 보겠습니다.

\`\`\`python
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("A"))
print(add_item("B"))
print(add_item("C"))
\`\`\`

많은 초보자는 다음 결과를 예상합니다.

\`\`\`text
['A']
['B']
['C']
\`\`\`

하지만 실제 결과는 다음과 같습니다.

\`\`\`text
['A']
['A', 'B']
['A', 'B', 'C']
\`\`\`

이유는 기본값 \`[]\`가 함수가 호출될 때마다 새로 만들어지는 것이 아니라, 함수가 정의될 때 한 번 만들어지고 계속 재사용되기 때문입니다.

이 문제를 피하려면 기본값을 \`None\`으로 두고 함수 안에서 새 리스트를 만들어야 합니다.

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

실행 결과는 다음과 같습니다.

\`\`\`text
['A']
['B']
['C']
\`\`\`

이 패턴은 실무에서 매우 중요합니다. 기본값에 리스트, 딕셔너리, 집합을 직접 넣지 않는 습관을 들여야 합니다.

---

### 3.2.4 \`*args\`

\`*args\`는 개수가 정해지지 않은 위치 인자를 받을 때 사용합니다.

\`\`\`python
def add_all(*args):
    total = 0

    for number in args:
        total += number

    return total

print(add_all(1, 2, 3))
print(add_all(10, 20, 30, 40))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
6
100
\`\`\`

\`args\`는 함수 안에서 튜플처럼 다뤄집니다.

\`\`\`python
def show_args(*args):
    print(args)
    print(type(args))

show_args("A", "B", "C")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
('A', 'B', 'C')
<class 'tuple'>
\`\`\`

\`*args\`는 인자 개수가 유동적인 함수를 만들 때 유용합니다.

예를 들어 여러 개의 점수를 받아 평균을 계산할 수 있습니다.

\`\`\`python
def average(*scores):
    if not scores:
        return 0

    return sum(scores) / len(scores)

print(average(80, 90, 100))
print(average())
\`\`\`

---

### 3.2.5 \`**kwargs\`

\`**kwargs\`는 개수가 정해지지 않은 키워드 인자를 받을 때 사용합니다.

\`\`\`python
def create_profile(**kwargs):
    print(kwargs)
    print(type(kwargs))

create_profile(name="민수", age=25, email="minsu@example.com")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{'name': '민수', 'age': 25, 'email': 'minsu@example.com'}
<class 'dict'>
\`\`\`

\`kwargs\`는 함수 안에서 딕셔너리처럼 다뤄집니다.

\`\`\`python
def print_user_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_user_info(name="지영", department="마케팅", level="대리")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
name: 지영
department: 마케팅
level: 대리
\`\`\`

\`**kwargs\`는 옵션이 많은 함수, 설정값을 받는 함수, 외부 라이브러리에서 전달받은 인자를 그대로 넘겨야 하는 함수에서 자주 보입니다.

---

### 3.2.6 \`*args\`와 \`**kwargs\` 함께 사용하기

\`*args\`와 \`**kwargs\`를 함께 사용할 수 있습니다.

\`\`\`python
def show_arguments(*args, **kwargs):
    print("위치 인자:", args)
    print("키워드 인자:", kwargs)

show_arguments(1, 2, 3, name="민수", age=25)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
위치 인자: (1, 2, 3)
키워드 인자: {'name': '민수', 'age': 25}
\`\`\`

함수 정의에서 일반적인 순서는 다음과 같습니다.

\`\`\`python
def function_name(일반_인자, *args, 기본값_인자=None, **kwargs):
    pass
\`\`\`

실무에서 자주 보는 형태는 다음과 같습니다.

\`\`\`python
def request_data(url, *args, timeout=10, **kwargs):
    print("URL:", url)
    print("추가 위치 인자:", args)
    print("timeout:", timeout)
    print("추가 옵션:", kwargs)
\`\`\`

---

### 3.2.7 키워드 전용 인자

키워드 전용 인자는 반드시 이름을 명시해서 전달해야 하는 인자입니다.

\`\`\`python
def create_report(title, *, author, format="pdf"):
    return f"{title} / 작성자: {author} / 형식: {format}"

print(create_report("월간 보고서", author="민수"))
\`\`\`

\`*\` 뒤에 있는 \`author\`와 \`format\`은 키워드로만 전달할 수 있습니다.

다음 코드는 에러가 발생합니다.

\`\`\`python
create_report("월간 보고서", "민수")
\`\`\`

키워드 전용 인자를 사용하면 함수 호출이 더 명확해집니다. 특히 옵션이 여러 개인 함수에서는 실수를 줄일 수 있습니다.

\`\`\`python
def save_file(content, *, path, encoding="utf-8", overwrite=False):
    print("저장 경로:", path)
    print("인코딩:", encoding)
    print("덮어쓰기 여부:", overwrite)
\`\`\`

이 함수는 다음처럼 호출해야 합니다.

\`\`\`python
save_file(
    "hello",
    path="result.txt",
    encoding="utf-8",
    overwrite=True,
)
\`\`\`

---

### 3.2.8 위치 전용 인자 개념

파이썬에서는 \`/\` 앞의 인자를 위치 전용 인자로 만들 수 있습니다.

\`\`\`python
def divide(a, b, /):
    return a / b

print(divide(10, 2))
\`\`\`

다음처럼 키워드 인자로 호출하면 에러가 발생합니다.

\`\`\`python
divide(a=10, b=2)
\`\`\`

위치 전용 인자는 일반적인 입문 코드에서는 자주 직접 작성하지 않습니다. 그러나 파이썬 내장 함수나 표준 라이브러리 문서에서 볼 수 있으므로, \`/\`가 이런 의미라는 정도는 알아두면 좋습니다.

예를 들어 어떤 함수 설명에서 다음과 같은 형태를 보면,

\`\`\`python
some_function(a, b, /, c, *, d)
\`\`\`

의미는 다음과 같습니다.

- \`a\`, \`b\`: 위치 인자로만 전달
- \`c\`: 위치 인자 또는 키워드 인자로 전달 가능
- \`d\`: 키워드 인자로만 전달

---

## 3.3 언패킹

언패킹은 리스트, 튜플, 딕셔너리 같은 자료구조 안에 들어 있는 값을 풀어서 사용하는 문법입니다. 기초 단계에서 튜플 언패킹을 간단히 배웠다면, 이번에는 함수 호출과 연결해서 더 깊게 살펴보겠습니다.

---

### 3.3.1 리스트와 튜플 언패킹

다음과 같은 튜플이 있다고 하겠습니다.

\`\`\`python
point = (10, 20)
\`\`\`

이 값을 각각 변수에 나누어 담을 수 있습니다.

\`\`\`python
x, y = point

print(x)
print(y)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
20
\`\`\`

리스트도 같은 방식으로 언패킹할 수 있습니다.

\`\`\`python
user = ["민수", 25, "minsu@example.com"]
name, age, email = user

print(name)
print(age)
print(email)
\`\`\`

언패킹할 때는 왼쪽 변수 개수와 오른쪽 값 개수가 맞아야 합니다.

\`\`\`python
name, age = ["민수", 25, "minsu@example.com"]
\`\`\`

위 코드는 값이 3개인데 변수는 2개이므로 에러가 발생합니다.

---

### 3.3.2 확장 언패킹

값의 일부만 따로 받고 나머지를 묶어서 받을 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]

first, *rest = numbers

print(first)
print(rest)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
[2, 3, 4, 5]
\`\`\`

마지막 값만 따로 받을 수도 있습니다.

\`\`\`python
*body, last = numbers

print(body)
print(last)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
5
\`\`\`

처음과 마지막을 따로 받고 가운데를 묶을 수도 있습니다.

\`\`\`python
first, *middle, last = numbers

print(first)
print(middle)
print(last)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
[2, 3, 4]
5
\`\`\`

확장 언패킹은 데이터의 첫 번째 값, 마지막 값, 나머지 값을 구분해 처리할 때 유용합니다.

---

### 3.3.3 함수 호출에서 \`*\` 사용하기

리스트나 튜플에 담긴 값을 함수 인자로 풀어서 전달할 수 있습니다.

\`\`\`python
def calculate_total(price, quantity, discount_rate):
    discounted_price = price * (1 - discount_rate)
    return discounted_price * quantity

values = [10000, 3, 0.1]

result = calculate_total(*values)
print(result)
\`\`\`

위 코드는 다음 호출과 같습니다.

\`\`\`python
calculate_total(10000, 3, 0.1)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
27000.0
\`\`\`

\`*values\`는 리스트 안의 값을 위치 인자로 풀어서 전달합니다.

이 방식은 데이터가 리스트나 튜플로 준비되어 있고, 함수가 여러 인자를 받을 때 유용합니다.

---

### 3.3.4 함수 호출에서 \`**\` 사용하기

딕셔너리에 담긴 값을 키워드 인자로 풀어서 전달할 수 있습니다.

\`\`\`python
def create_user(name, age, email):
    return {
        "name": name,
        "age": age,
        "email": email,
    }

user_data = {
    "name": "민수",
    "age": 25,
    "email": "minsu@example.com",
}

user = create_user(**user_data)
print(user)
\`\`\`

위 코드는 다음 호출과 같습니다.

\`\`\`python
create_user(name="민수", age=25, email="minsu@example.com")
\`\`\`

딕셔너리의 key 이름과 함수의 매개변수 이름이 일치해야 합니다.

만약 딕셔너리에 함수가 받지 않는 key가 있으면 에러가 발생합니다.

\`\`\`python
user_data = {
    "name": "민수",
    "age": 25,
    "email": "minsu@example.com",
    "department": "개발팀",
}

create_user(**user_data)
\`\`\`

\`create_user\` 함수는 \`department\` 매개변수를 받지 않기 때문에 에러가 발생합니다.

이런 상황에서는 필요한 key만 골라 전달해야 합니다.

\`\`\`python
allowed_keys = ["name", "age", "email"]
filtered_data = {}

for key in allowed_keys:
    filtered_data[key] = user_data[key]

user = create_user(**filtered_data)
print(user)
\`\`\`

---

### 3.3.5 딕셔너리 병합과 언패킹

딕셔너리 언패킹을 사용하면 여러 딕셔너리를 합쳐 새 딕셔너리를 만들 수 있습니다.

\`\`\`python
default_config = {
    "encoding": "utf-8",
    "timeout": 10,
    "retry": 3,
}

user_config = {
    "timeout": 30,
}

config = {
    **default_config,
    **user_config,
}

print(config)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{'encoding': 'utf-8', 'timeout': 30, 'retry': 3}
\`\`\`

나중에 나온 값이 앞의 값을 덮어씁니다. 그래서 \`timeout\`은 \`10\`이 아니라 \`30\`이 됩니다.

이 방식은 기본 설정값과 사용자 설정값을 합칠 때 자주 사용됩니다.

---

## 3.4 고차 함수

고차 함수는 함수를 인자로 받거나 함수를 반환하는 함수를 말합니다. 이미 앞에서 함수를 인자로 전달하거나 반환하는 예제를 보았습니다. 여기서는 파이썬에서 자주 사용하는 고차 함수와 실무 패턴을 살펴봅니다.

---

### 3.4.1 고차 함수란 무엇인가

다음 함수는 다른 함수를 인자로 받습니다.

\`\`\`python
def apply_to_each(items, function):
    result = []

    for item in items:
        result.append(function(item))

    return result
\`\`\`

이 함수는 고차 함수입니다. \`function\`이라는 매개변수로 함수를 전달받기 때문입니다.

\`\`\`python
def square(number):
    return number * number

numbers = [1, 2, 3, 4]
result = apply_to_each(numbers, square)

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 4, 9, 16]
\`\`\`

고차 함수는 공통 반복 흐름과 개별 처리 방식을 분리할 수 있게 해줍니다.

---

### 3.4.2 \`map()\`

\`map()\`은 여러 값에 같은 함수를 적용할 때 사용합니다.

\`\`\`python
def double(number):
    return number * 2

numbers = [1, 2, 3, 4]
result = map(double, numbers)

print(result)
print(list(result))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
<map object at ...>
[2, 4, 6, 8]
\`\`\`

\`map()\`의 결과는 바로 리스트가 아니라 반복 가능한 객체입니다. 실제 값을 확인하려면 \`list()\`로 변환하거나 반복문으로 순회해야 합니다.

람다 함수와 함께 사용할 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4]
result = list(map(lambda number: number * 2, numbers))

print(result)
\`\`\`

다만 너무 복잡한 람다를 \`map()\` 안에 넣으면 코드가 읽기 어려워집니다. 그런 경우에는 일반 함수나 리스트 컴프리헨션이 더 좋습니다.

\`\`\`python
numbers = [1, 2, 3, 4]
result = [number * 2 for number in numbers]

print(result)
\`\`\`

입문자나 협업 코드에서는 위와 같은 리스트 컴프리헨션이 더 읽기 쉬운 경우가 많습니다.

---

### 3.4.3 \`filter()\`

\`filter()\`는 조건에 맞는 값만 걸러낼 때 사용합니다.

\`\`\`python
def is_even(number):
    return number % 2 == 0

numbers = [1, 2, 3, 4, 5, 6]
result = filter(is_even, numbers)

print(list(result))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[2, 4, 6]
\`\`\`

람다 함수와 함께 사용할 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(lambda number: number % 2 == 0, numbers))

print(even_numbers)
\`\`\`

이 역시 리스트 컴프리헨션으로 표현할 수 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = [number for number in numbers if number % 2 == 0]

print(even_numbers)
\`\`\`

파이썬에서는 단순한 변환과 필터링에는 리스트 컴프리헨션이 더 자연스럽게 쓰이는 경우가 많습니다. 하지만 \`map()\`과 \`filter()\`는 함수형 프로그래밍 스타일, 지연 평가, 외부 함수 재사용 구조를 이해하는 데 중요합니다.

---

### 3.4.4 \`sorted()\`와 \`key\` 함수

\`sorted()\`는 정렬된 새 리스트를 반환합니다. 기본적으로 숫자는 작은 순서, 문자열은 사전 순서로 정렬됩니다.

\`\`\`python
numbers = [3, 1, 4, 2]
print(sorted(numbers))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
\`\`\`

딕셔너리 리스트를 정렬할 때는 정렬 기준을 직접 지정해야 합니다.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

print(sorted_products)
\`\`\`

\`key\`에는 함수가 들어갑니다. \`sorted()\`는 각 요소를 정렬할 때 \`key\` 함수의 반환값을 기준으로 삼습니다.

람다를 일반 함수로 바꿔 쓰면 다음과 같습니다.

\`\`\`python
def get_price(product):
    return product["price"]

sorted_products = sorted(products, key=get_price)
\`\`\`

정렬 기준이 복잡하거나 재사용된다면 일반 함수로 분리하는 편이 좋습니다.

내림차순 정렬은 \`reverse=True\`를 사용합니다.

\`\`\`python
sorted_products = sorted(
    products,
    key=lambda product: product["price"],
    reverse=True,
)
\`\`\`

---

### 3.4.5 \`functools.partial\`

\`functools.partial\`은 함수의 일부 인자를 미리 고정한 새 함수를 만들 때 사용합니다.

\`\`\`python
from functools import partial


def calculate_price(price, quantity, discount_rate):
    return price * quantity * (1 - discount_rate)

vip_price = partial(calculate_price, discount_rate=0.2)
normal_price = partial(calculate_price, discount_rate=0.05)

print(vip_price(10000, 3))
print(normal_price(10000, 3))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
24000.0
28500.0
\`\`\`

\`calculate_price\` 함수는 가격, 수량, 할인율을 모두 받아야 합니다. 하지만 \`partial\`을 사용하면 할인율만 미리 고정한 새 함수를 만들 수 있습니다.

실무에서는 설정값이 일부 고정된 함수를 만들 때 유용합니다.

\`\`\`python
from functools import partial


def log_message(level, message):
    print(f"[{level}] {message}")

info = partial(log_message, "INFO")
error = partial(log_message, "ERROR")

info("작업을 시작합니다.")
error("파일을 찾을 수 없습니다.")
\`\`\`

---

### 3.4.6 \`operator\` 모듈 기초

\`operator\` 모듈은 자주 쓰는 연산을 함수 형태로 제공합니다.

예를 들어 딕셔너리 리스트를 특정 key 기준으로 정렬할 때 \`lambda\` 대신 \`itemgetter\`를 사용할 수 있습니다.

\`\`\`python
from operator import itemgetter

products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=itemgetter("price"))

print(sorted_products)
\`\`\`

객체의 속성 기준으로 정렬할 때는 \`attrgetter\`를 사용할 수 있습니다.

\`\`\`python
from dataclasses import dataclass
from operator import attrgetter


@dataclass
class Product:
    name: str
    price: int


products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
    Product("모니터", 200000),
]

sorted_products = sorted(products, key=attrgetter("price"))

print(sorted_products)
\`\`\`

\`lambda\`가 항상 나쁜 것은 아닙니다. 하지만 단순히 특정 key나 속성을 꺼내는 경우에는 \`itemgetter\`, \`attrgetter\`가 더 명확할 수 있습니다.

---

## 3.5 클로저

클로저는 함수 안에서 만든 내부 함수가 외부 함수의 변수를 기억하는 구조입니다. 클로저는 데코레이터를 이해하는 핵심 개념이기도 합니다.

처음에는 어려워 보일 수 있지만, 차근차근 보면 “설정값을 기억하는 함수”라고 이해할 수 있습니다.

---

### 3.5.1 중첩 함수

먼저 함수 안에 함수를 정의하는 중첩 함수를 보겠습니다.

\`\`\`python
def outer():
    print("outer 함수 실행")

    def inner():
        print("inner 함수 실행")

    inner()

outer()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
outer 함수 실행
inner 함수 실행
\`\`\`

\`inner\` 함수는 \`outer\` 함수 안에서 정의되었습니다. 따라서 기본적으로 \`outer\` 함수 안에서만 사용할 수 있습니다.

---

### 3.5.2 내부 함수를 반환하기

내부 함수를 반환하면 외부에서도 사용할 수 있습니다.

\`\`\`python
def outer():
    def inner():
        print("inner 함수 실행")

    return inner

func = outer()
func()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
inner 함수 실행
\`\`\`

\`outer()\`를 호출하면 \`inner\` 함수가 반환됩니다. 반환된 함수는 \`func\`라는 변수에 저장되고, 이후 \`func()\`로 호출할 수 있습니다.

---

### 3.5.3 외부 함수의 변수 기억하기

클로저의 핵심은 내부 함수가 외부 함수의 변수를 기억한다는 점입니다.

\`\`\`python
def make_multiplier(factor):
    def multiplier(number):
        return number * factor

    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(10))
print(triple(10))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
20
30
\`\`\`

\`make_multiplier(2)\`가 실행된 뒤에는 이미 \`make_multiplier\` 함수 실행이 끝났습니다. 그런데 반환된 \`double\` 함수는 여전히 \`factor\` 값 \`2\`를 기억합니다.

마찬가지로 \`triple\` 함수는 \`factor\` 값 \`3\`을 기억합니다.

이처럼 내부 함수가 외부 함수의 변수를 기억하는 구조가 클로저입니다.

---

### 3.5.4 클로저가 필요한 이유

클로저는 설정값을 기억하는 함수를 만들 때 유용합니다.

예를 들어 할인율을 기억하는 함수를 만들 수 있습니다.

\`\`\`python
def make_discount_calculator(discount_rate):
    def calculate(price):
        return price * (1 - discount_rate)

    return calculate

vip_discount = make_discount_calculator(0.2)
normal_discount = make_discount_calculator(0.05)

print(vip_discount(10000))
print(normal_discount(10000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
8000.0
9500.0
\`\`\`

할인율을 매번 인자로 전달하지 않아도 됩니다. 할인율을 기억하는 함수를 한 번 만들어두고, 가격만 전달하면 됩니다.

---

### 3.5.5 검증 규칙을 기억하는 함수

클로저를 사용하면 기준값을 기억하는 검증 함수를 만들 수 있습니다.

\`\`\`python
def make_minimum_validator(min_value):
    def validate(value):
        return value >= min_value

    return validate

is_adult = make_minimum_validator(19)
is_free_shipping = make_minimum_validator(30000)

print(is_adult(20))
print(is_adult(15))
print(is_free_shipping(45000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
True
\`\`\`

\`is_adult\`는 최소값 \`19\`를 기억하고, \`is_free_shipping\`은 최소값 \`30000\`을 기억합니다.

---

### 3.5.6 \`nonlocal\`

클로저 내부에서 외부 함수의 변수를 변경하려면 \`nonlocal\`을 사용할 수 있습니다.

\`\`\`python
def make_counter():
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count

    return counter

counter = make_counter()

print(counter())
print(counter())
print(counter())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

\`counter\` 함수는 \`count\` 값을 기억하고, 호출될 때마다 값을 증가시킵니다.

\`nonlocal\`은 내부 함수에서 외부 함수의 지역 변수를 수정하겠다는 의미입니다. 너무 많이 사용하면 코드 흐름이 복잡해질 수 있으므로 필요한 경우에만 사용하는 것이 좋습니다.

---

### 3.5.7 클로저와 클래스 비교

클로저는 상태를 기억하는 함수를 만들 수 있습니다. 하지만 상태와 동작이 복잡해지면 클래스를 사용하는 편이 더 명확할 수 있습니다.

클로저 방식은 다음과 같습니다.

\`\`\`python
def make_discount_calculator(discount_rate):
    def calculate(price):
        return price * (1 - discount_rate)

    return calculate
\`\`\`

클래스 방식은 다음과 같습니다.

\`\`\`python
class DiscountCalculator:
    def __init__(self, discount_rate):
        self.discount_rate = discount_rate

    def calculate(self, price):
        return price * (1 - self.discount_rate)
\`\`\`

둘 다 할인율을 기억하고 계산할 수 있습니다. 선택 기준은 다음과 같습니다.

- 간단히 설정값 하나를 기억하는 함수가 필요하다면 클로저가 적합합니다.
- 여러 상태와 여러 메서드가 필요하다면 클래스가 적합합니다.
- 협업자가 이해하기 쉬운 구조가 중요하다면 클래스가 더 나을 수 있습니다.
- 데코레이터 구조를 만들 때는 클로저가 자주 사용됩니다.

---

## 3.6 함수 설계 실무 패턴

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

## 3.7 실습: 주문 데이터 처리 함수 만들기

이번 장에서 배운 내용을 이용해 간단한 주문 데이터 처리 흐름을 만들어보겠습니다.

다음과 같은 주문 데이터가 있다고 가정합니다.

\`\`\`python
orders = [
    {"id": 1, "customer": "  Kim ", "price": "10,000", "quantity": 2},
    {"id": 2, "customer": " Lee", "price": "25,000", "quantity": 1},
    {"id": 3, "customer": "Park ", "price": "8,000", "quantity": 5},
]
\`\`\`

목표는 다음과 같습니다.

1. 고객 이름의 앞뒤 공백을 제거한다.
2. 가격 문자열에서 쉼표를 제거하고 정수로 변환한다.
3. 주문 금액을 계산한다.
4. 주문 금액이 일정 금액 이상인 주문만 필터링한다.

먼저 작은 함수들을 만듭니다.

\`\`\`python
def clean_customer_name(name):
    return name.strip()


def parse_price(price_text):
    return int(price_text.replace(",", ""))


def calculate_order_total(price, quantity):
    return price * quantity
\`\`\`

이제 주문 하나를 정리하는 함수를 만듭니다.

\`\`\`python
def clean_order(order):
    customer = clean_customer_name(order["customer"])
    price = parse_price(order["price"])
    quantity = order["quantity"]
    total = calculate_order_total(price, quantity)

    return {
        "id": order["id"],
        "customer": customer,
        "price": price,
        "quantity": quantity,
        "total": total,
    }
\`\`\`

전체 주문을 정리합니다.

\`\`\`python
cleaned_orders = list(map(clean_order, orders))

for order in cleaned_orders:
    print(order)
\`\`\`

필터링 함수도 만듭니다.

\`\`\`python
def make_minimum_total_filter(minimum_total):
    def filter_order(order):
        return order["total"] >= minimum_total

    return filter_order
\`\`\`

이 함수는 클로저입니다. \`minimum_total\` 값을 기억하는 필터 함수를 만들어 반환합니다.

\`\`\`python
minimum_filter = make_minimum_total_filter(20000)
large_orders = list(filter(minimum_filter, cleaned_orders))

for order in large_orders:
    print(order)
\`\`\`

이 예제에는 이번 장에서 배운 내용이 여러 개 들어 있습니다.

- 함수를 값처럼 전달하는 \`map()\`
- 함수를 값처럼 전달하는 \`filter()\`
- 클로저를 이용해 기준값을 기억하는 필터 함수 만들기
- 작은 함수를 조합해서 큰 작업 처리하기
- 입력과 출력이 명확한 함수 설계

---

## 3.8 핵심 정리

이번 장에서는 함수를 더 유연하게 사용하는 방법을 배웠습니다.

첫째, 파이썬에서 함수는 객체입니다. 함수도 변수에 저장할 수 있고, 리스트나 딕셔너리에 담을 수 있으며, 다른 함수에 인자로 전달하거나 반환할 수도 있습니다.

둘째, 함수 인자를 더 유연하게 받을 수 있습니다. \`*args\`는 여러 위치 인자를 튜플로 받고, \`**kwargs\`는 여러 키워드 인자를 딕셔너리로 받습니다. 키워드 전용 인자를 사용하면 함수 호출을 더 명확하게 만들 수 있습니다.

셋째, 언패킹을 이용하면 리스트, 튜플, 딕셔너리에 담긴 값을 함수 인자로 풀어서 전달할 수 있습니다. \`*\`는 위치 인자 언패킹에 사용하고, \`**\`는 키워드 인자 언패킹에 사용합니다.

넷째, 고차 함수는 함수를 인자로 받거나 함수를 반환하는 함수입니다. \`map()\`, \`filter()\`, \`sorted()\`의 \`key\` 함수는 고차 함수 개념을 이해하는 좋은 예입니다.

다섯째, 클로저는 내부 함수가 외부 함수의 변수를 기억하는 구조입니다. 클로저는 설정값을 기억하는 함수나 데코레이터를 만들 때 중요합니다.

마지막으로, 실무에서는 함수 문법을 많이 아는 것보다 함수를 잘 나누고 조합하는 능력이 중요합니다. 좋은 함수는 입력과 출력이 명확하고, 하나의 역할을 담당하며, 테스트하기 쉽습니다.

---

## 3.9 연습문제

### 문제 1. 함수 객체 이해하기

다음 코드의 실행 결과를 예상해보세요.

\`\`\`python
def greet(name):
    return f"Hello, {name}"

hello = greet

print(hello("Python"))
\`\`\`

---

### 문제 2. 함수를 딕셔너리에 저장하기

다음 조건을 만족하는 코드를 작성하세요.

1. \`add(a, b)\` 함수는 두 수의 합을 반환한다.
2. \`subtract(a, b)\` 함수는 두 수의 차를 반환한다.
3. \`operations\` 딕셔너리에 \`"add"\`, \`"subtract"\`를 key로 하여 두 함수를 저장한다.
4. \`operations["add"](10, 3)\`을 실행하면 \`13\`이 나오게 한다.

---

### 문제 3. \`*args\` 사용하기

개수가 정해지지 않은 숫자를 받아 그중 가장 큰 값을 반환하는 함수 \`find_max(*numbers)\`를 작성하세요.

단, 전달된 숫자가 없으면 \`None\`을 반환하세요.

---

### 문제 4. \`**kwargs\` 사용하기

키워드 인자로 전달된 사용자 정보를 다음 형식으로 출력하는 함수 \`print_profile(**kwargs)\`를 작성하세요.

\`\`\`text
name: 민수
age: 25
email: minsu@example.com
\`\`\`

호출 예시는 다음과 같습니다.

\`\`\`python
print_profile(name="민수", age=25, email="minsu@example.com")
\`\`\`

---

### 문제 5. 언패킹 사용하기

다음 리스트를 \`calculate_total(price, quantity, discount_rate)\` 함수에 언패킹해서 전달하세요.

\`\`\`python
values = [10000, 3, 0.1]
\`\`\`

함수는 할인 적용 후 총액을 반환해야 합니다.

---

### 문제 6. 딕셔너리 언패킹 사용하기

다음 딕셔너리를 \`create_user(name, age, email)\` 함수에 언패킹해서 전달하세요.

\`\`\`python
user_data = {
    "name": "지영",
    "age": 28,
    "email": "jiyoung@example.com",
}
\`\`\`

---

### 문제 7. \`map()\` 사용하기

숫자 리스트 \`[1, 2, 3, 4, 5]\`의 각 값을 제곱한 새 리스트를 \`map()\`을 사용해 만드세요.

---

### 문제 8. \`filter()\` 사용하기

다음 상품 목록에서 가격이 30000원 이상인 상품만 필터링하세요.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]
\`\`\`

---

### 문제 9. \`sorted()\`와 \`key\` 사용하기

문제 8의 상품 목록을 가격이 낮은 순서로 정렬하세요.

---

### 문제 10. 클로저 만들기

할인율을 기억하는 함수 \`make_discount_calculator(discount_rate)\`를 작성하세요.

사용 예시는 다음과 같습니다.

\`\`\`python
vip_discount = make_discount_calculator(0.2)
print(vip_discount(10000))
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
8000.0
\`\`\`

---

### 문제 11. 입력과 출력이 명확한 함수로 개선하기

다음 함수는 결과를 출력만 하고 반환하지 않습니다. 결과를 반환하도록 개선하세요.

\`\`\`python
def show_total(price, quantity):
    total = price * quantity
    print(total)
\`\`\`

---

### 문제 12. 데이터 정리 함수 만들기

다음 사용자 데이터에서 이름의 앞뒤 공백을 제거하고, 이메일을 소문자로 변환하는 함수 \`clean_user(user)\`를 작성하세요.

\`\`\`python
user = {
    "name": "  Kim  ",
    "email": "KIM@EXAMPLE.COM",
}
\`\`\`

반환 결과는 다음과 같아야 합니다.

\`\`\`python
{
    "name": "Kim",
    "email": "kim@example.com",
}
\`\`\`

---

## 3.10 정답 및 해설

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

## 3.11 다음 장으로 넘어가기 전에

이번 장에서 함수가 객체라는 사실을 배웠습니다. 이 개념은 다음 장에서 매우 중요합니다. 다음 장에서는 이터레이터와 제너레이터를 다룹니다.

제너레이터도 함수와 깊은 관련이 있습니다. 일반 함수는 \`return\`으로 값을 한 번 반환하지만, 제너레이터 함수는 \`yield\`를 사용해 값을 하나씩 만들어냅니다. 이를 이해하면 큰 파일이나 많은 데이터를 메모리에 한 번에 올리지 않고 처리하는 방식을 배울 수 있습니다.

함수를 값처럼 다룰 수 있다는 감각을 가지고 다음 장으로 넘어가면, 제너레이터와 데코레이터도 훨씬 자연스럽게 이해할 수 있습니다.
`;export{e as default};