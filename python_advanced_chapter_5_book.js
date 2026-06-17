var e=`# 5장. 데코레이터

기초 과정에서 우리는 함수와 클래스, 그리고 객체지향 문법에서 \`@property\`, \`@classmethod\`, \`@staticmethod\`, \`@dataclass\` 같은 문법을 만났습니다. 이 문법들은 모두 이름 앞에 \`@\`가 붙어 있습니다.

\`\`\`python
@property

def total_price(self):
    return self.price * self.quantity
\`\`\`

\`\`\`python
@dataclass
class Product:
    name: str
    price: int
\`\`\`

처음에는 \`@property\`나 \`@dataclass\`를 “특별한 문법”처럼 외워도 괜찮습니다. 하지만 고급 파이썬에서는 이 \`@\` 문법이 실제로 무엇을 의미하는지 이해해야 합니다.

\`@\`가 붙은 문법을 **데코레이터**라고 합니다. 데코레이터는 기존 함수나 클래스의 코드를 직접 수정하지 않고, 앞뒤로 새로운 기능을 덧붙이는 방법입니다.

예를 들어 어떤 함수가 실행될 때마다 실행 시간을 측정하고 싶다고 해봅시다. 모든 함수 안에 다음 코드를 직접 넣을 수도 있습니다.

\`\`\`python
import time

start = time.time()
# 원래 하려던 작업
end = time.time()
print(end - start)
\`\`\`

하지만 이렇게 하면 함수마다 같은 코드가 반복됩니다. 나중에 실행 시간 출력 방식을 바꾸고 싶으면 여러 함수를 모두 고쳐야 합니다.

데코레이터를 사용하면 이런 공통 기능을 함수 바깥에서 감싸는 방식으로 처리할 수 있습니다.

\`\`\`python
@measure_time
def load_data():
    ...
\`\`\`

위 코드는 \`load_data()\` 함수의 본문을 직접 수정하지 않고도 실행 시간을 측정할 수 있게 만듭니다.

이번 장의 목표는 다음과 같습니다.

- 데코레이터가 무엇인지 설명할 수 있다.
- 함수도 객체라는 사실을 데코레이터와 연결해 이해한다.
- 기본 데코레이터를 직접 만들 수 있다.
- \`*args\`, \`**kwargs\`를 사용해 다양한 함수에 적용 가능한 데코레이터를 만들 수 있다.
- \`functools.wraps\`가 필요한 이유를 이해한다.
- 인자를 받는 데코레이터를 만들 수 있다.
- 클래스 기반 데코레이터의 구조를 이해한다.
- 실무에서 자주 쓰는 데코레이터 패턴을 읽고 활용할 수 있다.

---

## 5.1 데코레이터란 무엇인가

**데코레이터는 함수나 클래스를 감싸서 기능을 추가하는 도구**입니다.

여기서 중요한 표현은 “감싼다”입니다. 데코레이터는 기존 함수 내부를 직접 바꾸는 것이 아니라, 기존 함수가 실행되기 전이나 실행된 후에 추가 동작을 넣습니다.

예를 들어 다음과 같은 함수가 있다고 해봅시다.

\`\`\`python
def greet():
    print("안녕하세요")
\`\`\`

이 함수는 단순히 인사말을 출력합니다.

\`\`\`python
greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요
\`\`\`

그런데 이 함수가 실행되기 전후에 로그를 출력하고 싶다면 어떻게 해야 할까요?

가장 단순한 방법은 함수 안에 직접 코드를 추가하는 것입니다.

\`\`\`python
def greet():
    print("함수 실행 전")
    print("안녕하세요")
    print("함수 실행 후")
\`\`\`

하지만 이 방식에는 문제가 있습니다. 이런 로그를 여러 함수에 넣고 싶다면 모든 함수에 같은 코드를 반복해서 작성해야 합니다.

\`\`\`python
def greet():
    print("함수 실행 전")
    print("안녕하세요")
    print("함수 실행 후")


def say_bye():
    print("함수 실행 전")
    print("안녕히 가세요")
    print("함수 실행 후")
\`\`\`

공통 기능이 반복되고 있습니다. 데코레이터는 이런 상황에서 유용합니다.

---

### 5.1.1 함수도 객체다

데코레이터를 이해하려면 먼저 함수도 객체라는 사실을 이해해야 합니다.

파이썬에서는 함수를 변수에 저장할 수 있습니다.

\`\`\`python
def greet():
    print("안녕하세요")

hello = greet

hello()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요
\`\`\`

\`hello = greet\`는 함수를 실행한 것이 아닙니다. \`greet()\`처럼 괄호를 붙이지 않았기 때문에, 함수 자체를 \`hello\`라는 이름에 저장한 것입니다.

다음 코드를 비교해봅시다.

\`\`\`python
def greet():
    print("안녕하세요")

hello = greet      # 함수 자체를 저장
result = greet()   # 함수를 실행한 결과를 저장
\`\`\`

함수 이름 뒤에 괄호가 있으면 함수를 실행합니다.

\`\`\`python
greet()
\`\`\`

함수 이름 뒤에 괄호가 없으면 함수 자체를 가리킵니다.

\`\`\`python
greet
\`\`\`

데코레이터는 이 성질을 이용합니다. 함수 자체를 다른 함수에 전달하고, 그 함수를 감싼 새로운 함수를 반환합니다.

---

### 5.1.2 함수를 인자로 전달하기

함수는 다른 함수의 인자로 전달될 수 있습니다.

\`\`\`python
def greet():
    print("안녕하세요")


def run_function(func):
    func()

run_function(greet)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요
\`\`\`

\`run_function(greet)\`에서 \`greet\`는 함수 자체입니다. \`run_function()\` 안에서는 이 함수를 \`func\`라는 이름으로 받아서 실행합니다.

\`\`\`python
def run_function(func):
    func()
\`\`\`

이 구조가 데코레이터의 출발점입니다.

---

### 5.1.3 함수를 반환하기

함수는 다른 함수를 반환할 수도 있습니다.

\`\`\`python
def outer():
    def inner():
        print("안쪽 함수입니다")

    return inner

func = outer()
func()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안쪽 함수입니다
\`\`\`

\`outer()\`를 실행하면 내부에 정의된 \`inner\` 함수가 반환됩니다. 그리고 반환된 함수를 \`func\`라는 변수에 저장한 뒤 \`func()\`로 실행합니다.

이 구조도 데코레이터에서 매우 중요합니다.

데코레이터는 보통 다음 구조를 가집니다.

\`\`\`python
def decorator(func):
    def wrapper():
        # 함수 실행 전 추가 작업
        func()
        # 함수 실행 후 추가 작업

    return wrapper
\`\`\`

- \`decorator\`는 원래 함수를 인자로 받습니다.
- \`wrapper\`는 원래 함수를 감싸는 새 함수입니다.
- \`wrapper\` 안에서 원래 함수 \`func()\`를 실행합니다.
- \`decorator\`는 \`wrapper\`를 반환합니다.

---

## 5.2 기본 데코레이터 만들기

이제 가장 단순한 데코레이터를 직접 만들어보겠습니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")

    return wrapper
\`\`\`

이 함수는 다른 함수를 인자로 받아서 \`wrapper\` 함수를 반환합니다.

이제 이 데코레이터를 사용해봅시다.

\`\`\`python
def greet():
    print("안녕하세요")

greet = simple_decorator(greet)

greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
안녕하세요
함수 실행 후
\`\`\`

여기서 중요한 줄은 다음입니다.

\`\`\`python
greet = simple_decorator(greet)
\`\`\`

오른쪽의 \`simple_decorator(greet)\`는 원래 \`greet\` 함수를 감싼 \`wrapper\` 함수를 반환합니다. 그 반환값을 다시 \`greet\`라는 이름에 저장합니다.

즉, 이제 \`greet\`라는 이름은 원래 함수가 아니라, 원래 함수를 감싸는 \`wrapper\` 함수를 가리키게 됩니다.

---

### 5.2.1 \`@\` 문법 사용하기

파이썬은 위 코드를 더 간단하게 쓸 수 있는 문법을 제공합니다.

\`\`\`python
@simple_decorator
def greet():
    print("안녕하세요")
\`\`\`

이 코드는 다음 코드와 같은 의미입니다.

\`\`\`python
def greet():
    print("안녕하세요")

greet = simple_decorator(greet)
\`\`\`

전체 코드는 다음과 같습니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")

    return wrapper


@simple_decorator
def greet():
    print("안녕하세요")


greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
안녕하세요
함수 실행 후
\`\`\`

\`@simple_decorator\`는 \`greet\` 함수를 \`simple_decorator\` 함수에 전달해서, 그 결과를 다시 \`greet\`라는 이름으로 저장하라는 뜻입니다.

---

### 5.2.2 데코레이터의 실행 시점

데코레이터를 처음 배울 때 자주 헷갈리는 부분이 있습니다. 데코레이터 함수는 언제 실행될까요?

다음 코드를 보겠습니다.

\`\`\`python
def simple_decorator(func):
    print("데코레이터 실행")

    def wrapper():
        print("wrapper 실행")
        func()

    return wrapper


@simple_decorator
def greet():
    print("안녕하세요")

print("함수 호출 전")
greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
데코레이터 실행
함수 호출 전
wrapper 실행
안녕하세요
\`\`\`

\`데코레이터 실행\`은 \`greet()\`를 호출하기 전에 출력됩니다. 이유는 \`@simple_decorator\`가 붙은 함수가 정의될 때 데코레이터가 먼저 적용되기 때문입니다.

반면 \`wrapper 실행\`은 실제로 \`greet()\`를 호출할 때 출력됩니다.

정리하면 다음과 같습니다.

- 데코레이터 함수 자체는 함수가 정의될 때 한 번 실행됩니다.
- \`wrapper\` 함수는 데코레이트된 함수를 호출할 때 실행됩니다.

이 차이를 이해해야 인자를 받는 데코레이터를 배울 때 덜 헷갈립니다.

---

### 5.2.3 반환값이 있는 함수 감싸기

앞의 예제에서는 원래 함수가 아무 값도 반환하지 않았습니다. 이번에는 반환값이 있는 함수를 감싸보겠습니다.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

이 함수에 단순한 데코레이터를 적용해봅시다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")

    return wrapper


@simple_decorator
def add():
    return 10 + 20

result = add()
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
함수 실행 후
None
\`\`\`

왜 \`30\`이 아니라 \`None\`이 나왔을까요?

\`wrapper\` 안에서 \`func()\`를 실행하기는 했지만, 그 결과를 반환하지 않았기 때문입니다.

\`\`\`python
def wrapper():
    print("함수 실행 전")
    func()
    print("함수 실행 후")
\`\`\`

반환값을 유지하려면 원래 함수의 반환값을 받아서 다시 반환해야 합니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        result = func()
        print("함수 실행 후")
        return result

    return wrapper
\`\`\`

이제 다시 실행해봅시다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        result = func()
        print("함수 실행 후")
        return result

    return wrapper


@simple_decorator
def add():
    return 10 + 20

result = add()
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
함수 실행 후
30
\`\`\`

데코레이터를 만들 때는 원래 함수의 반환값을 잃어버리지 않도록 주의해야 합니다.

---

## 5.3 인자를 받는 함수에 데코레이터 적용하기

실제 함수는 대부분 인자를 받습니다.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

그런데 앞에서 만든 데코레이터의 \`wrapper\`는 인자를 받지 않습니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        result = func()
        print("함수 실행 후")
        return result

    return wrapper
\`\`\`

이 데코레이터를 \`add(a, b)\` 함수에 적용하면 문제가 생깁니다.

\`\`\`python
@simple_decorator
def add(a, b):
    return a + b

print(add(10, 20))
\`\`\`

실행하면 다음과 같은 에러가 발생합니다.

\`\`\`text
TypeError: wrapper() takes 0 positional arguments but 2 were given
\`\`\`

\`add(10, 20)\`을 호출하는 것처럼 보이지만, 실제로는 데코레이터가 적용된 뒤 \`add\`라는 이름이 \`wrapper\`를 가리키고 있습니다. 그런데 \`wrapper\`는 인자를 받지 않기 때문에 에러가 발생합니다.

---

### 5.3.1 \`*args\`와 \`**kwargs\` 사용하기

여러 종류의 함수에 적용할 수 있는 데코레이터를 만들려면 \`wrapper\`가 어떤 인자든 받을 수 있어야 합니다.

이때 \`*args\`와 \`**kwargs\`를 사용합니다.

\`\`\`python
def simple_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수 실행 전")
        result = func(*args, **kwargs)
        print("함수 실행 후")
        return result

    return wrapper
\`\`\`

이제 인자를 받는 함수에도 적용할 수 있습니다.

\`\`\`python
def simple_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수 실행 전")
        result = func(*args, **kwargs)
        print("함수 실행 후")
        return result

    return wrapper


@simple_decorator
def add(a, b):
    return a + b

print(add(10, 20))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
함수 실행 후
30
\`\`\`

\`*args\`는 위치 인자를 모아서 받고, \`**kwargs\`는 키워드 인자를 모아서 받습니다.

\`\`\`python
result = func(*args, **kwargs)
\`\`\`

이 코드는 \`wrapper\`가 받은 인자를 그대로 원래 함수에 전달합니다.

---

### 5.3.2 여러 함수에 같은 데코레이터 적용하기

이제 같은 데코레이터를 여러 함수에 적용할 수 있습니다.

\`\`\`python
def log_execution(func):
    def wrapper(*args, **kwargs):
        print(f"{func.__name__} 함수 실행 시작")
        result = func(*args, **kwargs)
        print(f"{func.__name__} 함수 실행 종료")
        return result

    return wrapper


@log_execution
def add(a, b):
    return a + b


@log_execution
def greet(name):
    return f"안녕하세요, {name}님"


print(add(10, 20))
print(greet("민수"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
add 함수 실행 시작
add 함수 실행 종료
30
greet 함수 실행 시작
greet 함수 실행 종료
안녕하세요, 민수님
\`\`\`

\`func.__name__\`은 함수의 이름을 의미합니다.

이처럼 데코레이터를 사용하면 함수마다 반복해서 작성해야 하는 공통 기능을 하나로 분리할 수 있습니다.

---

### 5.3.3 \`functools.wraps\`가 필요한 이유

데코레이터를 사용할 때 자주 놓치는 문제가 있습니다.

다음 코드를 보겠습니다.

\`\`\`python
def log_execution(func):
    def wrapper(*args, **kwargs):
        print("함수 실행")
        return func(*args, **kwargs)

    return wrapper


@log_execution
def add(a, b):
    """두 숫자를 더합니다."""
    return a + b

print(add.__name__)
print(add.__doc__)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
wrapper
None
\`\`\`

우리는 \`add\` 함수의 이름과 문서 문자열을 확인하고 싶었습니다. 하지만 데코레이터가 적용된 뒤 \`add\`는 실제로 \`wrapper\` 함수를 가리키고 있기 때문에 이름이 \`wrapper\`로 바뀌었습니다.

이 문제를 해결하려면 \`functools.wraps\`를 사용합니다.

\`\`\`python
from functools import wraps


def log_execution(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("함수 실행")
        return func(*args, **kwargs)

    return wrapper
\`\`\`

다시 실행해봅시다.

\`\`\`python
from functools import wraps


def log_execution(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("함수 실행")
        return func(*args, **kwargs)

    return wrapper


@log_execution
def add(a, b):
    """두 숫자를 더합니다."""
    return a + b

print(add.__name__)
print(add.__doc__)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
add
두 숫자를 더합니다.
\`\`\`

실무에서 데코레이터를 직접 만들 때는 특별한 이유가 없다면 \`@wraps(func)\`를 붙이는 습관을 들이는 것이 좋습니다.

---

## 5.4 인자를 받는 데코레이터

지금까지 만든 데코레이터는 다음처럼 사용했습니다.

\`\`\`python
@log_execution
def add(a, b):
    return a + b
\`\`\`

이번에는 데코레이터 자체에 값을 전달해보겠습니다.

\`\`\`python
@repeat(3)
def greet():
    print("안녕하세요")
\`\`\`

이 코드는 \`greet()\`를 한 번 호출했을 때 내부적으로 세 번 실행되도록 만들고 싶은 경우입니다.

데코레이터에 인자를 전달하려면 함수가 한 겹 더 필요합니다.

---

### 5.4.1 데코레이터에 인자가 필요한 상황

실무에서는 데코레이터에 설정값이 필요한 경우가 많습니다.

예를 들어 다음과 같은 경우입니다.

- 함수를 몇 번 반복 실행할지 지정한다.
- 실패했을 때 몇 번 재시도할지 지정한다.
- 실행 시간이 특정 초 이상이면 경고를 출력한다.
- 특정 권한을 가진 사용자만 함수를 실행할 수 있게 한다.
- 로그 메시지의 접두어를 설정한다.

이런 경우 데코레이터 자체에 값을 전달해야 합니다.

\`\`\`python
@retry(max_attempts=3)
def request_data():
    ...
\`\`\`

\`\`\`python
@slow_warning(seconds=1.0)
def process_data():
    ...
\`\`\`

---

### 5.4.2 반복 실행 데코레이터 만들기

먼저 함수를 여러 번 반복 실행하는 데코레이터를 만들어보겠습니다.

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
@repeat(3)
def greet(name):
    print(f"안녕하세요, {name}님")


greet("지영")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요, 지영님
안녕하세요, 지영님
안녕하세요, 지영님
\`\`\`

구조를 천천히 살펴봅시다.

\`\`\`python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            ...
        return wrapper
    return decorator
\`\`\`

- \`repeat(times)\`는 데코레이터를 만들어주는 함수입니다.
- \`decorator(func)\`는 원래 함수를 받는 실제 데코레이터입니다.
- \`wrapper(*args, **kwargs)\`는 원래 함수를 감싸는 함수입니다.

즉, 인자를 받는 데코레이터는 보통 세 겹 구조를 가집니다.

---

### 5.4.3 \`@repeat(3)\`의 실제 의미

다음 코드는

\`\`\`python
@repeat(3)
def greet():
    print("안녕하세요")
\`\`\`

대략 다음 코드와 같습니다.

\`\`\`python
def greet():
    print("안녕하세요")

greet = repeat(3)(greet)
\`\`\`

먼저 \`repeat(3)\`이 실행되어 \`decorator\` 함수를 반환합니다.

\`\`\`python
decorator = repeat(3)
\`\`\`

그다음 반환된 \`decorator\` 함수에 원래 함수 \`greet\`가 전달됩니다.

\`\`\`python
greet = decorator(greet)
\`\`\`

이 흐름이 처음에는 복잡해 보일 수 있습니다. 하지만 구조는 다음 세 단계로 이해하면 됩니다.

\`\`\`text
1. 데코레이터 설정값을 받는다.
2. 원래 함수를 받는다.
3. 원래 함수를 감싸는 wrapper를 반환한다.
\`\`\`

---

### 5.4.4 실행 시간 측정 데코레이터

실무에서 가장 자주 만드는 데코레이터 중 하나는 실행 시간을 측정하는 데코레이터입니다.

\`\`\`python
import time
from functools import wraps


def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} 실행 시간: {end - start:.4f}초")
        return result

    return wrapper
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@measure_time
def slow_function():
    total = 0
    for number in range(1_000_000):
        total += number
    return total

result = slow_function()
\`\`\`

실행 결과는 환경에 따라 다르지만 다음과 비슷합니다.

\`\`\`text
slow_function 실행 시간: 0.0452초
\`\`\`

데이터분석 전처리 코드나 API 수집 코드에서는 어떤 함수가 오래 걸리는지 확인하는 일이 중요합니다. 이때 실행 시간 측정 데코레이터를 사용하면 여러 함수의 성능을 쉽게 비교할 수 있습니다.

---

### 5.4.5 느린 함수 경고 데코레이터

이번에는 실행 시간이 일정 기준을 넘으면 경고를 출력하는 데코레이터를 만들어보겠습니다.

\`\`\`python
import time
from functools import wraps


def warn_if_slow(seconds):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            result = func(*args, **kwargs)
            elapsed = time.perf_counter() - start

            if elapsed >= seconds:
                print(f"경고: {func.__name__} 함수가 {elapsed:.4f}초 걸렸습니다.")

            return result

        return wrapper

    return decorator
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@warn_if_slow(0.5)
def process_data():
    total = 0
    for number in range(10_000_000):
        total += number
    return total

process_data()
\`\`\`

이 함수가 0.5초 이상 걸리면 경고 메시지가 출력됩니다.

이런 데코레이터는 다음과 같은 상황에서 유용합니다.

- 데이터 처리 함수의 병목을 찾을 때
- API 호출이 너무 오래 걸리는지 확인할 때
- 자동화 작업에서 특정 단계가 느려졌는지 감시할 때

---

### 5.4.6 재시도 데코레이터

외부 API 요청이나 네트워크 작업은 일시적으로 실패할 수 있습니다. 이런 경우 곧바로 프로그램을 종료하기보다 몇 번 다시 시도하는 것이 좋을 때가 있습니다.

재시도 로직을 데코레이터로 만들면 여러 함수에 같은 패턴을 적용할 수 있습니다.

\`\`\`python
import time
from functools import wraps


def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None

            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as error:
                    last_error = error
                    print(f"{attempt}번째 시도 실패: {error}")

                    if attempt < max_attempts:
                        time.sleep(delay)

            raise last_error

        return wrapper

    return decorator
\`\`\`

예시를 위해 실패할 수 있는 함수를 만들어보겠습니다.

\`\`\`python
count = 0


@retry(max_attempts=3, delay=0.5)
def unstable_task():
    global count
    count += 1

    if count < 3:
        raise ValueError("일시적인 오류")

    return "성공"

print(unstable_task())
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
1번째 시도 실패: 일시적인 오류
2번째 시도 실패: 일시적인 오류
성공
\`\`\`

재시도 데코레이터는 실무에서 매우 유용하지만 주의할 점도 있습니다.

모든 오류를 무조건 재시도하면 안 됩니다. 예를 들어 파일 경로가 완전히 잘못되었거나, 인증 정보가 틀린 경우에는 재시도해도 해결되지 않습니다. 재시도는 네트워크 일시 오류처럼 다시 시도하면 성공할 가능성이 있는 작업에 주로 사용합니다.

---

## 5.5 클래스 기반 데코레이터

데코레이터는 함수로 만들 수도 있지만 클래스로 만들 수도 있습니다.

클래스 기반 데코레이터를 이해하려면 \`__call__\` 특수 메서드를 알아야 합니다.

---

### 5.5.1 \`__call__\`이란?

파이썬에서 객체 뒤에 괄호를 붙여 호출할 수 있게 하려면 \`__call__\` 메서드를 정의합니다.

\`\`\`python
class Greeter:
    def __call__(self, name):
        print(f"안녕하세요, {name}님")


greeter = Greeter()
greeter("민수")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요, 민수님
\`\`\`

\`greeter("민수")\`는 내부적으로 다음과 비슷하게 동작합니다.

\`\`\`python
greeter.__call__("민수")
\`\`\`

이처럼 \`__call__\`을 가진 객체는 함수처럼 사용할 수 있습니다.

---

### 5.5.2 클래스로 데코레이터 만들기

이제 클래스로 데코레이터를 만들어보겠습니다.

\`\`\`python
from functools import wraps


class LogExecution:
    def __init__(self, func):
        self.func = func
        wraps(func)(self)

    def __call__(self, *args, **kwargs):
        print(f"{self.func.__name__} 실행 시작")
        result = self.func(*args, **kwargs)
        print(f"{self.func.__name__} 실행 종료")
        return result
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@LogExecution
def add(a, b):
    return a + b

print(add(10, 20))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
add 실행 시작
add 실행 종료
30
\`\`\`

여기서 \`@LogExecution\`은 대략 다음 코드와 같습니다.

\`\`\`python
add = LogExecution(add)
\`\`\`

즉, \`add\`라는 이름은 이제 함수가 아니라 \`LogExecution\` 클래스의 인스턴스를 가리킵니다. 하지만 이 인스턴스는 \`__call__\`을 가지고 있기 때문에 함수처럼 호출할 수 있습니다.

---

### 5.5.3 상태를 가지는 데코레이터

클래스 기반 데코레이터의 장점은 상태를 저장하기 쉽다는 것입니다.

예를 들어 함수가 몇 번 호출되었는지 세는 데코레이터를 만들어보겠습니다.

\`\`\`python
from functools import wraps


class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0
        wraps(func)(self)

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"{self.func.__name__} 호출 횟수: {self.count}")
        return self.func(*args, **kwargs)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@CountCalls
def greet(name):
    print(f"안녕하세요, {name}님")


greet("민수")
greet("지영")
greet("철수")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
greet 호출 횟수: 1
안녕하세요, 민수님
greet 호출 횟수: 2
안녕하세요, 지영님
greet 호출 횟수: 3
안녕하세요, 철수님
\`\`\`

함수 기반 데코레이터에서도 클로저를 사용하면 상태를 저장할 수 있습니다. 하지만 관리해야 할 상태가 많아지면 클래스 기반 데코레이터가 더 읽기 쉬울 때도 있습니다.

---

### 5.5.4 인자를 받는 클래스 기반 데코레이터

클래스 기반 데코레이터도 인자를 받을 수 있습니다.

예를 들어 접두어를 설정할 수 있는 로그 데코레이터를 만들어보겠습니다.

\`\`\`python
from functools import wraps


class LogWithPrefix:
    def __init__(self, prefix):
        self.prefix = prefix

    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(f"[{self.prefix}] {func.__name__} 실행")
            return func(*args, **kwargs)

        return wrapper
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@LogWithPrefix("INFO")
def save_file(filename):
    print(f"{filename} 저장 완료")

save_file("result.csv")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[INFO] save_file 실행
result.csv 저장 완료
\`\`\`

이 구조에서는 \`LogWithPrefix("INFO")\`가 먼저 실행되어 데코레이터 객체를 만들고, 그 객체의 \`__call__\` 메서드가 원래 함수를 받아 \`wrapper\`를 반환합니다.

---

## 5.6 실무에서 자주 만나는 데코레이터

데코레이터를 직접 만드는 것도 중요하지만, 실무에서는 이미 만들어진 데코레이터를 읽는 일이 더 많습니다.

대표적인 예는 다음과 같습니다.

- \`@property\`
- \`@classmethod\`
- \`@staticmethod\`
- \`@dataclass\`
- \`@pytest.fixture\`
- 웹 프레임워크의 라우터 데코레이터

이번 절에서는 기초 과정에서 봤던 데코레이터를 데코레이터 관점에서 다시 정리합니다.

---

### 5.6.1 \`@property\`

\`@property\`는 메서드를 속성처럼 사용할 수 있게 해주는 데코레이터입니다.

\`\`\`python
class Product:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    @property
    def total_price(self):
        return self.price * self.quantity


product = Product(10000, 3)
print(product.total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30000
\`\`\`

\`total_price\`는 메서드처럼 정의되어 있지만 사용할 때는 괄호를 붙이지 않습니다.

\`\`\`python
product.total_price
\`\`\`

이렇게 하면 계산된 값을 속성처럼 제공할 수 있습니다.

\`@property\`는 다음과 같은 상황에서 유용합니다.

- 실제로 저장된 값이 아니라 계산된 값을 제공할 때
- 외부에서는 속성처럼 읽게 하고 내부에서는 메서드로 계산하고 싶을 때
- 읽기 전용 값을 만들고 싶을 때

---

### 5.6.2 \`@classmethod\`

\`@classmethod\`는 인스턴스가 아니라 클래스 자체를 첫 번째 인자로 받는 메서드를 만들 때 사용합니다.

\`\`\`python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @classmethod
    def from_text(cls, text):
        name, email = text.split(",")
        return cls(name.strip(), email.strip())


user = User.from_text("홍길동, hong@example.com")
print(user.name)
print(user.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
홍길동
hong@example.com
\`\`\`

\`from_text\`는 문자열을 받아 \`User\` 객체를 생성합니다. 이런 메서드를 **대체 생성자**라고 부르기도 합니다.

\`@classmethod\`는 다음과 같은 상황에서 유용합니다.

- 문자열, 딕셔너리, JSON 등으로부터 객체를 만들 때
- 클래스 변수를 다룰 때
- 상속을 고려해 \`cls\`로 객체를 생성하고 싶을 때

---

### 5.6.3 \`@staticmethod\`

\`@staticmethod\`는 인스턴스 상태나 클래스 상태를 사용하지 않는 메서드를 클래스 안에 넣고 싶을 때 사용합니다.

\`\`\`python
class Validator:
    @staticmethod
    def is_email(value):
        return "@" in value and "." in value


print(Validator.is_email("user@example.com"))
print(Validator.is_email("invalid-email"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

\`is_email()\`은 특정 객체의 상태를 사용하지 않습니다. 단지 이메일 형식인지 검사하는 유틸리티 함수입니다.

\`@staticmethod\`는 다음과 같은 상황에서 유용합니다.

- 클래스와 관련은 있지만 객체 상태를 사용하지 않는 함수
- 간단한 검증 함수
- 변환 함수
- 계산 도우미 함수

다만 모든 유틸리티 함수를 클래스 안에 넣을 필요는 없습니다. 클래스와 관련이 약하다면 일반 함수로 두는 편이 더 낫습니다.

---

### 5.6.4 \`@dataclass\`

\`@dataclass\`는 데이터를 담는 클래스를 간단하게 만들 수 있게 해주는 데코레이터입니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: int
    quantity: int


product = Product("키보드", 30000, 2)
print(product)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
Product(name='키보드', price=30000, quantity=2)
\`\`\`

\`@dataclass\`를 사용하면 \`__init__\`, \`__repr__\`, 비교 관련 메서드 등을 자동으로 만들어줍니다.

기초 과정에서는 \`@dataclass\`를 “데이터를 담는 클래스를 쉽게 만드는 문법”으로 배웠습니다. 고급 과정에서는 이것도 데코레이터라는 사실을 이해하면 됩니다. 즉, \`@dataclass\`는 클래스 정의를 받아서 여러 기능이 추가된 클래스로 바꿔주는 역할을 합니다.

---

### 5.6.5 \`@pytest.fixture\`

테스트 코드에서는 \`@pytest.fixture\`라는 데코레이터를 자주 만납니다.

\`\`\`python
import pytest


@pytest.fixture
def sample_user():
    return {"name": "홍길동", "email": "hong@example.com"}


def test_user_name(sample_user):
    assert sample_user["name"] == "홍길동"
\`\`\`

\`@pytest.fixture\`는 테스트에서 반복적으로 사용할 준비 데이터를 만드는 데 사용됩니다.

이 장에서 pytest를 자세히 다루지는 않습니다. 중요한 점은 \`@pytest.fixture\`도 데코레이터라는 것입니다. 즉, \`sample_user\` 함수에 테스트 도구가 필요한 기능을 덧붙이는 역할을 합니다.

---

### 5.6.6 웹 프레임워크의 라우터 데코레이터

웹 프레임워크에서도 데코레이터가 자주 사용됩니다.

예를 들어 FastAPI나 Flask 같은 프레임워크에서는 다음과 같은 형태의 코드를 볼 수 있습니다.

\`\`\`python
@app.get("/users")
def get_users():
    return ["민수", "지영", "철수"]
\`\`\`

여기서 \`@app.get("/users")\`는 \`get_users\` 함수를 \`/users\`라는 주소와 연결합니다.

웹 프레임워크를 아직 배우지 않았더라도 다음 정도로 이해하면 됩니다.

\`\`\`text
이 함수는 특정 URL로 요청이 들어왔을 때 실행될 함수로 등록된다.
\`\`\`

프레임워크의 데코레이터는 직접 만들기보다 먼저 읽을 수 있어야 합니다. 데코레이터 문법을 이해하면 나중에 웹 개발, 테스트, 데이터 파이프라인 도구를 배울 때 코드가 훨씬 덜 낯설게 느껴집니다.

---

## 5.7 실무 활용 패턴

데코레이터는 잘 사용하면 코드 중복을 줄이고 공통 기능을 깔끔하게 분리할 수 있습니다. 하지만 너무 많이 사용하면 코드 흐름이 숨겨져 오히려 이해하기 어려운 코드가 될 수도 있습니다.

이번 절에서는 실무에서 데코레이터를 사용할 만한 대표 패턴을 살펴봅니다.

---

### 5.7.1 로그 자동 기록

여러 함수의 실행 시작과 종료를 기록하고 싶다면 로그 데코레이터를 만들 수 있습니다.

\`\`\`python
from functools import wraps


def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[START] {func.__name__}")
        result = func(*args, **kwargs)
        print(f"[END] {func.__name__}")
        return result

    return wrapper
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@log_call
def load_file(filename):
    print(f"{filename} 파일을 읽습니다.")


@log_call
def save_file(filename):
    print(f"{filename} 파일을 저장합니다.")


load_file("input.csv")
save_file("output.csv")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[START] load_file
input.csv 파일을 읽습니다.
[END] load_file
[START] save_file
output.csv 파일을 저장합니다.
[END] save_file
\`\`\`

실제 실무에서는 \`print()\` 대신 \`logging\` 모듈을 사용하는 것이 좋습니다.

---

### 5.7.2 입력값 검증

특정 함수의 입력값이 비어 있으면 실행하지 않도록 만들 수도 있습니다.

\`\`\`python
from functools import wraps


def require_non_empty(func):
    @wraps(func)
    def wrapper(value, *args, **kwargs):
        if value is None or value == "":
            raise ValueError("값이 비어 있습니다.")

        return func(value, *args, **kwargs)

    return wrapper
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@require_non_empty
def normalize_name(name):
    return name.strip()

print(normalize_name("  홍길동  "))
print(normalize_name(""))
\`\`\`

두 번째 호출에서는 \`ValueError\`가 발생합니다.

이런 검증 데코레이터는 편리하지만, 모든 검증을 데코레이터로 처리하는 것은 좋지 않습니다. 함수별로 검증 조건이 다르면 함수 내부에서 명시적으로 처리하는 편이 더 읽기 쉽습니다.

---

### 5.7.3 권한 검사

웹 서비스나 업무 시스템에서는 특정 권한을 가진 사용자만 어떤 기능을 실행할 수 있게 해야 하는 경우가 있습니다.

간단한 예시를 보겠습니다.

\`\`\`python
from functools import wraps


def require_role(required_role):
    def decorator(func):
        @wraps(func)
        def wrapper(user, *args, **kwargs):
            if user.get("role") != required_role:
                raise PermissionError("권한이 없습니다.")

            return func(user, *args, **kwargs)

        return wrapper

    return decorator
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
@require_role("admin")
def delete_user(user, target_user_id):
    print(f"{target_user_id} 사용자를 삭제합니다.")


admin = {"name": "관리자", "role": "admin"}
member = {"name": "일반회원", "role": "member"}

delete_user(admin, 10)
delete_user(member, 10)
\`\`\`

첫 번째 호출은 성공하지만, 두 번째 호출에서는 권한 오류가 발생합니다.

이 패턴은 웹 프레임워크의 인증, 권한 검사 데코레이터와 비슷한 구조입니다.

---

### 5.7.4 캐싱

캐싱은 같은 입력에 대해 같은 결과가 반복해서 필요할 때, 계산 결과를 저장해두고 재사용하는 방식입니다.

파이썬 표준 라이브러리에는 \`functools.lru_cache\`라는 데코레이터가 있습니다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(30))
\`\`\`

피보나치 수열은 같은 계산이 반복해서 발생합니다. \`@lru_cache\`를 사용하면 이전 계산 결과를 저장해두기 때문에 훨씬 빠르게 실행됩니다.

다만 캐싱은 항상 좋은 것은 아닙니다. 입력이 매번 다르거나, 결과가 외부 상태에 따라 달라지는 함수에는 적합하지 않을 수 있습니다.

캐싱에 적합한 함수는 보통 다음 조건을 만족합니다.

- 같은 입력이면 항상 같은 결과가 나온다.
- 계산 비용이 크다.
- 결과를 일정 개수만 저장해도 효과가 있다.

데이터분석 전처리에서도 코드값 변환, 반복 계산, 외부 조회 결과 저장 등에 캐싱 개념이 사용될 수 있습니다.

---

### 5.7.5 데코레이터를 사용할 때 주의할 점

데코레이터는 강력하지만 남용하면 코드가 어려워집니다.

다음 사항을 주의해야 합니다.

첫째, 함수의 실제 동작이 숨겨질 수 있습니다.

\`\`\`python
@some_decorator
def process():
    ...
\`\`\`

겉으로는 \`process()\` 함수만 보이지만 실제로는 데코레이터 안의 코드도 함께 실행됩니다. 데코레이터가 많아지면 함수의 실행 흐름을 추적하기 어려워질 수 있습니다.

둘째, 반환값을 잃어버리지 않아야 합니다.

\`\`\`python
def wrapper(*args, **kwargs):
    func(*args, **kwargs)
\`\`\`

이렇게 작성하면 원래 함수의 반환값이 사라집니다. 보통은 다음처럼 작성해야 합니다.

\`\`\`python
def wrapper(*args, **kwargs):
    return func(*args, **kwargs)
\`\`\`

셋째, 예외를 무조건 숨기면 안 됩니다.

\`\`\`python
def wrapper(*args, **kwargs):
    try:
        return func(*args, **kwargs)
    except Exception:
        pass
\`\`\`

이런 코드는 오류의 원인을 숨겨버립니다. 실무에서는 매우 위험합니다.

넷째, \`functools.wraps\`를 사용하는 것이 좋습니다.

\`\`\`python
from functools import wraps


def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper
\`\`\`

다섯째, 단순한 코드는 그냥 함수 안에 쓰는 편이 나을 수 있습니다. 공통 기능이 여러 곳에서 반복되거나, 함수 바깥에서 일관되게 적용해야 할 때 데코레이터를 고려하면 됩니다.

---

## 5.8 데코레이터와 데이터 처리 코드

이 고급 파이썬 과정 이후에는 데이터분석 기초와 고급 과정으로 이어집니다. 데이터분석 코드에서도 데코레이터 개념은 직접 또는 간접적으로 도움이 됩니다.

---

### 5.8.1 실행 시간 측정

데이터 전처리 함수는 데이터가 커질수록 시간이 오래 걸릴 수 있습니다.

\`\`\`python
@measure_time
def clean_data(rows):
    cleaned = []
    for row in rows:
        if row:
            cleaned.append(row.strip())
    return cleaned
\`\`\`

실행 시간을 측정하면 어떤 단계가 느린지 찾을 수 있습니다.

---

### 5.8.2 실패한 작업 기록

파일 처리나 API 수집에서는 일부 데이터만 실패할 수 있습니다.

\`\`\`python
@log_call
def process_file(filename):
    ...
\`\`\`

실행 로그를 자동으로 남기면 어떤 파일이 처리되었고 어떤 파일에서 문제가 발생했는지 추적하기 쉽습니다.

---

### 5.8.3 API 재시도

API 요청은 네트워크 문제로 실패할 수 있습니다.

\`\`\`python
@retry(max_attempts=3, delay=1)
def fetch_page(page):
    ...
\`\`\`

재시도 데코레이터를 사용하면 API 수집 함수의 본문은 데이터 요청에 집중하고, 실패 처리 로직은 바깥으로 분리할 수 있습니다.

---

### 5.8.4 검증과 전처리 분리

데이터 처리 함수마다 입력값 검증 로직이 반복된다면 일부 검증은 데코레이터로 분리할 수 있습니다.

\`\`\`python
@require_non_empty
def normalize_text(text):
    return text.strip().lower()
\`\`\`

하지만 데이터 검증 규칙은 상황마다 다르기 때문에 무조건 데코레이터로 빼기보다, 공통 규칙일 때만 사용하는 것이 좋습니다.

---

## 5.9 핵심 정리

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