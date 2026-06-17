var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-9 -->

# 5.9 핵심 정리

이번 장에서는 데코레이터를 배웠습니다.

데코레이터는 함수나 클래스를 감싸서 기능을 추가하는 문법입니다. 기존 함수의 코드를 직접 수정하지 않고도 실행 전후에 로그를 남기거나, 실행 시간을 측정하거나, 실패 시 재시도하거나, 입력값을 검증할 수 있습니다.

데코레이터를 이해하려면 함수가 객체라는 사실을 알아야 합니다. 함수는 변수에 저장할 수 있고, 다른 함수의 인자로 전달할 수 있으며, 다른 함수의 반환값이 될 수도 있습니다.

기본 데코레이터는 다음 구조를 가집니다.

\`\`\`python
def decorator(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result

    return wrapper
\`\`\`

\`@decorator\` 문법은 다음 코드와 같은 의미입니다.

\`\`\`python
func = decorator(func)
\`\`\`

데코레이터를 만들 때는 원래 함수의 인자와 반환값을 유지해야 합니다. 다양한 함수에 적용하려면 \`*args\`, \`**kwargs\`를 사용하고, 원래 함수의 이름과 문서 문자열을 보존하려면 \`functools.wraps\`를 사용하는 것이 좋습니다.

인자를 받는 데코레이터는 보통 세 겹 구조를 가집니다.

\`\`\`python
def decorator_factory(option):
    def decorator(func):
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
    return decorator
\`\`\`

클래스 기반 데코레이터는 \`__call__\`을 이용해 만들 수 있습니다. 상태를 저장해야 하는 데코레이터에서는 클래스 기반 방식이 유용할 수 있습니다.

실무에서는 직접 만든 데코레이터뿐 아니라 \`@property\`, \`@classmethod\`, \`@staticmethod\`, \`@dataclass\`, \`@pytest.fixture\`, 웹 프레임워크의 라우터 데코레이터처럼 이미 만들어진 데코레이터를 자주 읽게 됩니다. 따라서 데코레이터를 완벽하게 자유자재로 만들지 못하더라도, 데코레이터가 붙은 코드를 읽을 수 있는 것이 중요합니다.

---

# 연습문제

## 문제 1

다음 코드에서 \`hello = greet\`와 \`result = greet()\`의 차이를 설명하세요.

\`\`\`python
def greet():
    print("안녕하세요")

hello = greet
result = greet()
\`\`\`

---

## 문제 2

다음 데코레이터가 하는 일을 설명하세요.

\`\`\`python
def deco(func):
    def wrapper():
        print("A")
        func()
        print("B")

    return wrapper


@deco
def say():
    print("Hello")

say()
\`\`\`

---

## 문제 3

문제 2의 실행 결과를 쓰세요.

---

## 문제 4

다음 코드에서 에러가 발생하는 이유를 설명하세요.

\`\`\`python
def deco(func):
    def wrapper():
        return func()

    return wrapper


@deco
def add(a, b):
    return a + b

print(add(10, 20))
\`\`\`

---

## 문제 5

문제 4의 데코레이터를 \`add(10, 20)\`처럼 인자를 받는 함수에도 사용할 수 있도록 수정하세요.

---

## 문제 6

다음 데코레이터의 문제점을 설명하세요.

\`\`\`python
def deco(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)

    return wrapper


@deco
def add(a, b):
    return a + b

print(add(10, 20))
\`\`\`

---

## 문제 7

함수 실행 전후로 다음 메시지를 출력하는 데코레이터 \`log_execution\`을 작성하세요.

\`\`\`text
함수 실행 시작
함수 실행 종료
\`\`\`

다음 함수에 적용할 수 있어야 합니다.

\`\`\`python
@log_execution
def multiply(a, b):
    return a * b
\`\`\`

---

## 문제 8

다음 코드에서 \`@repeat(3)\`의 의미를 설명하세요.

\`\`\`python
@repeat(3)
def greet():
    print("안녕하세요")
\`\`\`

---

## 문제 9

함수를 지정한 횟수만큼 실행하는 데코레이터 \`repeat(times)\`를 작성하세요.

사용 예시는 다음과 같습니다.

\`\`\`python
@repeat(2)
def say_hi():
    print("Hi")

say_hi()
\`\`\`

기대 결과는 다음과 같습니다.

\`\`\`text
Hi
Hi
\`\`\`

---

## 문제 10

\`functools.wraps\`를 사용하는 이유를 설명하세요.

---

## 문제 11

실행 시간을 측정하는 데코레이터 \`measure_time\`을 작성하세요. 함수 실행 후 다음과 같은 형식으로 출력하면 됩니다.

\`\`\`text
함수명 실행 시간: 0.1234초
\`\`\`

---

## 문제 12

다음 코드에서 \`@property\`가 하는 역할을 설명하세요.

\`\`\`python
class Order:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    @property
    def total_price(self):
        return self.price * self.quantity

order = Order(10000, 3)
print(order.total_price)
\`\`\`

---

## 문제 13

다음 클래스 기반 데코레이터가 하는 일을 설명하세요.

\`\`\`python
class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(self.count)
        return self.func(*args, **kwargs)
\`\`\`

---

## 문제 14

다음 상황 중 데코레이터를 사용하기 적절한 경우를 모두 고르세요.

1. 여러 함수의 실행 시간을 공통으로 측정하고 싶다.
2. 함수 하나에서만 사용하는 간단한 계산식을 작성한다.
3. 여러 API 요청 함수에 재시도 로직을 동일하게 적용하고 싶다.
4. 모든 함수에 숨겨진 예외 처리를 넣어 오류를 무시하고 싶다.
5. 여러 함수의 실행 시작과 종료를 같은 방식으로 로그에 남기고 싶다.

---

## 문제 15

데코레이터를 사용할 때 주의해야 할 점을 세 가지 이상 쓰세요.

---

# 정답 및 해설

## 문제 1 정답

\`hello = greet\`는 \`greet\` 함수 자체를 \`hello\`라는 변수에 저장하는 코드입니다. 이때 함수는 실행되지 않습니다.

\`result = greet()\`는 \`greet\` 함수를 실행하고, 그 반환값을 \`result\`에 저장하는 코드입니다.

함수 이름 뒤에 괄호가 있으면 실행이고, 괄호가 없으면 함수 객체 자체를 의미합니다.

---

## 문제 2 정답

\`deco\`는 \`say\` 함수를 감싸는 데코레이터입니다.

\`say()\`가 호출되면 실제로는 \`wrapper()\`가 실행됩니다. \`wrapper()\`는 먼저 \`A\`를 출력하고, 원래 함수 \`say()\`를 실행한 뒤, 마지막으로 \`B\`를 출력합니다.

---

## 문제 3 정답

\`\`\`text
A
Hello
B
\`\`\`

---

## 문제 4 정답

데코레이터가 적용된 뒤 \`add\`라는 이름은 원래 \`add(a, b)\` 함수가 아니라 \`wrapper()\` 함수를 가리키게 됩니다.

그런데 \`wrapper()\`는 인자를 받지 않도록 정의되어 있습니다.

\`\`\`python
def wrapper():
    return func()
\`\`\`

따라서 \`add(10, 20)\`을 호출하면 실제로는 \`wrapper(10, 20)\`을 호출하는 것이 되어 에러가 발생합니다.

---

## 문제 5 정답

\`\`\`python
def deco(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper


@deco
def add(a, b):
    return a + b

print(add(10, 20))
\`\`\`

\`wrapper\`가 \`*args\`, \`**kwargs\`를 받아 원래 함수에 그대로 전달하도록 수정해야 합니다.

---

## 문제 6 정답

원래 함수의 반환값을 다시 반환하지 않는 것이 문제입니다.

\`\`\`python
def wrapper(*args, **kwargs):
    func(*args, **kwargs)
\`\`\`

이 코드는 \`func()\`를 실행하기는 하지만 결과를 반환하지 않습니다. 따라서 \`add(10, 20)\`의 결과는 \`None\`이 됩니다.

다음처럼 수정해야 합니다.

\`\`\`python
def wrapper(*args, **kwargs):
    return func(*args, **kwargs)
\`\`\`

---

## 문제 7 정답

\`\`\`python
def log_execution(func):
    def wrapper(*args, **kwargs):
        print("함수 실행 시작")
        result = func(*args, **kwargs)
        print("함수 실행 종료")
        return result

    return wrapper
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@log_execution
def multiply(a, b):
    return a * b

print(multiply(3, 4))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 시작
함수 실행 종료
12
\`\`\`

---

## 문제 8 정답

\`@repeat(3)\`은 \`greet\` 함수를 \`repeat(3)\`이 만들어낸 데코레이터로 감싼다는 뜻입니다.

대략 다음 코드와 같은 의미입니다.

\`\`\`python
greet = repeat(3)(greet)
\`\`\`

즉, \`greet()\`를 호출했을 때 원래 함수가 3번 실행되도록 만드는 구조입니다.

---

## 문제 9 정답

\`\`\`python
from functools import wraps


def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = func(*args, **kwargs)
            return result

        return wrapper

    return decorator
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@repeat(2)
def say_hi():
    print("Hi")

say_hi()
\`\`\`

---

## 문제 10 정답

\`functools.wraps\`는 데코레이터를 적용한 뒤에도 원래 함수의 이름, 문서 문자열 같은 메타데이터를 보존하기 위해 사용합니다.

\`wraps\`를 사용하지 않으면 데코레이터가 적용된 함수의 이름이 \`wrapper\`로 보일 수 있습니다.

\`\`\`python
from functools import wraps


def deco(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper
\`\`\`

---

## 문제 11 정답

\`\`\`python
import time
from functools import wraps


def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} 실행 시간: {elapsed:.4f}초")
        return result

    return wrapper
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@measure_time
def work():
    total = 0
    for i in range(1_000_000):
        total += i
    return total

work()
\`\`\`

---

## 문제 12 정답

\`@property\`는 \`total_price\` 메서드를 속성처럼 사용할 수 있게 해줍니다.

따라서 다음처럼 괄호 없이 사용할 수 있습니다.

\`\`\`python
order.total_price
\`\`\`

\`total_price\`는 실제로 저장된 값이 아니라 \`price * quantity\`를 계산해서 반환하는 값입니다. 즉, 계산된 값을 읽기 전용 속성처럼 제공하는 역할을 합니다.

---

## 문제 13 정답

\`CountCalls\`는 클래스 기반 데코레이터입니다. 함수가 호출될 때마다 \`count\` 값을 1씩 증가시키고, 현재 호출 횟수를 출력한 뒤 원래 함수를 실행합니다.

이 클래스는 \`__call__\` 메서드를 가지고 있으므로 인스턴스를 함수처럼 호출할 수 있습니다.

---

## 문제 14 정답

정답은 1, 3, 5입니다.

1. 여러 함수의 실행 시간을 공통으로 측정하는 것은 데코레이터에 적합합니다.
2. 함수 하나에서만 사용하는 간단한 계산식은 굳이 데코레이터로 만들 필요가 없습니다.
3. 여러 API 요청 함수에 같은 재시도 로직을 적용하는 것은 데코레이터에 적합합니다.
4. 모든 예외를 숨겨 오류를 무시하는 것은 위험한 방식입니다.
5. 여러 함수의 실행 시작과 종료를 같은 방식으로 로그에 남기는 것은 데코레이터에 적합합니다.

---

## 문제 15 정답

예시 답안은 다음과 같습니다.

- 원래 함수의 반환값을 잃어버리지 않도록 해야 한다.
- 인자를 받는 함수에 적용하려면 \`*args\`, \`**kwargs\`를 고려해야 한다.
- \`functools.wraps\`를 사용해 원래 함수의 정보를 보존하는 것이 좋다.
- 예외를 무조건 숨기면 안 된다.
- 데코레이터가 많아지면 실행 흐름이 숨겨질 수 있으므로 남용하지 않아야 한다.
- 함수 하나에서만 사용하는 단순한 기능은 데코레이터보다 함수 내부에 명시적으로 작성하는 편이 나을 수 있다.

---

# 마무리

이번 장에서는 데코레이터를 배웠습니다.

데코레이터는 고급 파이썬에서 매우 중요한 문법입니다. 하지만 처음부터 복잡한 데코레이터를 자유롭게 만들려고 하기보다, 다음 순서로 익히는 것이 좋습니다.

\`\`\`text
1. @ 문법이 함수 재할당이라는 사실을 이해한다.
2. 기본 데코레이터 구조를 읽을 수 있다.
3. *args, **kwargs로 인자를 전달하는 방식을 이해한다.
4. 원래 함수의 반환값을 유지해야 한다는 점을 기억한다.
5. functools.wraps를 사용하는 이유를 이해한다.
6. 인자를 받는 데코레이터의 세 겹 구조를 이해한다.
7. 실무에서 자주 보이는 데코레이터를 읽을 수 있다.
\`\`\`

데코레이터를 배우면 파이썬의 여러 문법이 서로 연결되어 있다는 것을 느끼게 됩니다. 함수도 객체이고, 함수 안에 함수를 만들 수 있으며, 함수를 반환할 수 있고, 객체를 함수처럼 호출할 수도 있습니다.

다음 장에서는 \`with\` 문과 컨텍스트 매니저를 배웁니다. 컨텍스트 매니저는 파일, 네트워크 연결, 데이터베이스 연결처럼 열고 닫아야 하는 자원을 안전하게 관리하는 문법입니다. 데코레이터와 마찬가지로 처음에는 특별한 문법처럼 보이지만, 내부 구조를 이해하면 실무 코드의 안정성을 크게 높일 수 있습니다.
`;export{e as default};