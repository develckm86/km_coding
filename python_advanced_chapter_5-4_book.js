var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-4 -->

# 5.4 인자를 받는 데코레이터

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
`;export{e as default};