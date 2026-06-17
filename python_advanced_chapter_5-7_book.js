var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-7 -->

# 5.7 실무 활용 패턴

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
`;export{e as default};