var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-3 -->

# 5.3 인자를 받는 함수에 데코레이터 적용하기

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
`;export{e as default};