var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-5 -->

# 5.5 클래스 기반 데코레이터

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
`;export{e as default};