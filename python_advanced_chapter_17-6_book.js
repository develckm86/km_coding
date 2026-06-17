var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-6 -->

# 17.6 캐싱

## 캐싱이란?

캐싱은 이미 계산한 결과를 저장해두고, 같은 요청이 다시 들어오면 다시 계산하지 않고 저장된 값을 사용하는 방식이다.

예를 들어 어떤 함수가 같은 입력에 대해 항상 같은 출력을 반환한다면, 그 결과를 저장해두면 반복 계산을 줄일 수 있다.

캐싱이 효과적인 경우는 다음과 같다.

- 같은 계산이 반복된다.
- 계산 비용이 크다.
- 함수 결과가 입력값에 의해서만 결정된다.
- 저장된 결과를 재사용해도 문제가 없다.

반대로 다음 경우에는 캐싱을 조심해야 한다.

- 결과가 시간에 따라 달라진다.
- 외부 파일, API, DB 상태에 따라 결과가 달라진다.
- 입력값 종류가 너무 많아 캐시가 계속 커진다.
- 메모리 사용량이 중요한 상황이다.

## 직접 캐시 만들기

가장 단순한 캐시는 딕셔너리로 만들 수 있다.

\`\`\`python
cache = {}


def calculate_square(number: int) -> int:
    if number in cache:
        return cache[number]

    result = number * number
    cache[number] = result
    return result


print(calculate_square(10))
print(calculate_square(10))
\`\`\`

첫 번째 호출에서는 계산하고, 두 번째 호출에서는 저장된 값을 반환한다.

이 예제는 계산이 너무 단순해서 캐싱 효과가 거의 없다. 실제로는 더 비싼 계산이나 반복 호출되는 함수에서 캐싱이 유용하다.

## 재귀 함수와 캐싱

캐싱의 효과를 보기 쉬운 예는 피보나치 수열이다.

다음 코드는 매우 비효율적인 재귀 함수다.

\`\`\`python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

이 함수는 같은 값을 반복해서 계산한다.

예를 들어 \`fibonacci(5)\`를 계산하는 과정에서 \`fibonacci(3)\`, \`fibonacci(2)\` 같은 값이 여러 번 호출된다.

직접 캐시를 적용하면 다음과 같다.

\`\`\`python
cache = {}


def fibonacci(n: int) -> int:
    if n in cache:
        return cache[n]

    if n <= 1:
        result = n
    else:
        result = fibonacci(n - 1) + fibonacci(n - 2)

    cache[n] = result
    return result


print(fibonacci(40))
\`\`\`

캐시를 사용하면 같은 값을 반복 계산하지 않기 때문에 훨씬 빠르게 실행된다.

## \`functools.lru_cache\`

파이썬은 캐싱을 쉽게 적용할 수 있는 \`functools.lru_cache\`를 제공한다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


print(fibonacci(40))
print(fibonacci.cache_info())
\`\`\`

\`@lru_cache\`는 함수 호출 결과를 저장해두었다가 같은 인자가 들어오면 저장된 결과를 반환한다. \`maxsize\`는 캐시에 저장할 최대 항목 수를 의미한다.

\`cache_info()\`를 호출하면 캐시 사용 정보를 확인할 수 있다.

\`\`\`text
CacheInfo(hits=38, misses=41, maxsize=128, currsize=41)
\`\`\`

각 항목의 의미는 다음과 같다.

| 항목 | 의미 |
|---|---|
| \`hits\` | 캐시에 저장된 값을 사용한 횟수 |
| \`misses\` | 캐시에 없어 새로 계산한 횟수 |
| \`maxsize\` | 캐시에 저장할 최대 항목 수 |
| \`currsize\` | 현재 캐시에 저장된 항목 수 |

## \`functools.cache\`

파이썬에는 크기 제한이 없는 간단한 캐시인 \`functools.cache\`도 있다.

\`\`\`python
from functools import cache


@cache
def normalize_code(code: str) -> str:
    return code.strip().upper()
\`\`\`

\`cache\`는 \`lru_cache(maxsize=None)\`와 비슷하게 동작한다. 크기 제한이 없기 때문에 입력값 종류가 계속 늘어나는 함수에는 주의해서 사용해야 한다.

## 캐싱이 적합한 함수

캐싱은 순수 함수에 특히 잘 맞는다.

순수 함수란 같은 입력에 대해 항상 같은 출력을 반환하고, 외부 상태를 변경하지 않는 함수를 말한다.

\`\`\`python
def calculate_discount(price: int, rate: float) -> int:
    return int(price * rate)
\`\`\`

이런 함수는 캐싱하기 쉽다. 반면 다음 함수는 캐싱에 적합하지 않다.

\`\`\`python
from datetime import datetime


def get_current_time_message() -> str:
    return f"현재 시각은 {datetime.now()}입니다."
\`\`\`

이 함수는 호출할 때마다 결과가 달라진다. 캐싱하면 잘못된 결과를 반환할 수 있다.

## 실무 예시: 코드 변환 결과 캐싱

데이터 전처리에서 같은 코드 값을 반복해서 변환하는 경우가 있다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=1000)
def normalize_category(category: str) -> str:
    category = category.strip().lower()

    mapping = {
        "pc": "컴퓨터",
        "computer": "컴퓨터",
        "notebook": "노트북",
        "laptop": "노트북",
        "phone": "휴대폰",
        "mobile": "휴대폰",
    }

    return mapping.get(category, "기타")
\`\`\`

같은 카테고리 문자열이 반복해서 등장한다면, 캐시가 변환 비용을 줄일 수 있다. 물론 이 정도 변환은 매우 가벼운 작업이므로 실제 효과는 데이터 크기와 호출 횟수에 따라 달라진다. 반드시 측정해야 한다.

## 캐싱 사용 시 주의점

캐싱은 편리하지만 다음 점을 주의해야 한다.

- 캐시는 메모리를 사용한다.
- 입력값이 너무 다양하면 캐시 효과가 작다.
- 외부 상태에 따라 결과가 달라지는 함수에는 부적합하다.
- 리스트나 딕셔너리처럼 해시할 수 없는 인자는 \`lru_cache\`에 바로 사용할 수 없다.
- 오래 실행되는 프로그램에서는 캐시가 계속 커질 수 있다.

다음 코드는 에러가 발생한다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def process_items(items: list[int]) -> int:
    return sum(items)
\`\`\`

리스트는 변경 가능한 객체이므로 해시할 수 없다. 캐시 key로 사용할 수 없기 때문이다. 이런 경우 튜플로 바꾸는 방식을 고려할 수 있다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def process_items(items: tuple[int, ...]) -> int:
    return sum(items)


print(process_items((1, 2, 3)))
\`\`\`

## 핵심 정리

캐싱은 반복 계산을 줄이는 강력한 방법이다. 하지만 모든 함수에 적용할 수 있는 것은 아니다. 같은 입력에 대해 같은 결과를 반환하는 함수에 적합하며, 메모리 사용량과 캐시 크기를 함께 고려해야 한다. \`functools.lru_cache\`는 재귀 함수, 반복 계산 함수, 데이터 변환 함수에서 유용하게 사용할 수 있다.

---
`;export{e as default};