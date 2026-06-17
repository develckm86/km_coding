var e=`# 4장. 이터레이터와 제너레이터

기초 과정에서 우리는 \`for\` 문으로 리스트, 튜플, 문자열, 딕셔너리를 반복했습니다. 예를 들어 리스트에 들어 있는 값을 하나씩 꺼내거나, 문자열의 문자를 순서대로 확인하거나, 딕셔너리의 key와 value를 반복해서 처리했습니다.

\`\`\`python
numbers = [10, 20, 30]

for number in numbers:
    print(number)
\`\`\`

이 코드는 어렵지 않습니다. 하지만 고급 파이썬에서는 여기서 한 걸음 더 들어갑니다.

\`for\` 문은 어떻게 리스트의 값을 하나씩 꺼낼까요?  
파일을 한 줄씩 읽을 때 파이썬은 전체 파일을 한 번에 메모리에 올릴까요?  
데이터가 100개가 아니라 1억 개라면 리스트로 모두 만들어도 괜찮을까요?  
필요한 값을 그때그때 하나씩 만들어낼 수는 없을까요?

이 질문에 답하려면 **이터레이터**와 **제너레이터**를 이해해야 합니다.

이터레이터와 제너레이터는 단순히 어려운 문법이 아닙니다. 데이터분석, 로그 처리, 파일 처리, API 수집, 대용량 데이터 전처리에서 매우 중요한 개념입니다. 특히 데이터분석 과정으로 넘어가면 “모든 데이터를 한 번에 메모리에 올리는 방식”과 “필요한 만큼만 읽고 처리하는 방식”의 차이가 중요해집니다.

이번 장의 목표는 다음과 같습니다.

- \`for\` 문이 내부적으로 어떻게 반복을 수행하는지 이해한다.
- iterable과 iterator의 차이를 설명할 수 있다.
- \`iter()\`와 \`next()\`를 사용할 수 있다.
- 직접 이터레이터 클래스를 만들 수 있다.
- \`yield\`를 사용해 제너레이터 함수를 만들 수 있다.
- 리스트 컴프리헨션과 제너레이터 표현식의 차이를 이해한다.
- \`itertools\`를 사용해 반복 작업을 효율적으로 처리할 수 있다.
- 대용량 파일과 API 데이터를 메모리 효율적으로 처리하는 흐름을 이해한다.

---

## 4.1 반복 가능한 객체

파이썬에서 \`for\` 문으로 반복할 수 있는 객체를 **iterable**, 즉 반복 가능한 객체라고 합니다.

대표적인 iterable은 다음과 같습니다.

\`\`\`python
numbers = [10, 20, 30]        # 리스트
names = ("민수", "지영")      # 튜플
text = "Python"              # 문자열
scores = {"math": 90, "eng": 85}  # 딕셔너리
unique_values = {1, 2, 3}     # 집합
\`\`\`

이 객체들은 모두 \`for\` 문에서 사용할 수 있습니다.

\`\`\`python
for number in numbers:
    print(number)

for char in text:
    print(char)
\`\`\`

겉으로 보기에는 \`for\` 문이 단순히 값을 하나씩 꺼내는 것처럼 보입니다. 하지만 내부적으로는 일정한 규칙에 따라 반복이 이루어집니다.

---

### 4.1.1 iterable이란 무엇인가

**iterable은 반복 가능한 객체**입니다. 더 정확히 말하면, \`iter()\` 함수에 전달했을 때 iterator를 반환할 수 있는 객체입니다.

\`\`\`python
numbers = [10, 20, 30]

iterator = iter(numbers)

print(iterator)
\`\`\`

실행 결과는 환경에 따라 다르지만 대략 다음과 비슷합니다.

\`\`\`text
<list_iterator object at 0x...>
\`\`\`

\`numbers\`는 리스트입니다. 리스트 자체가 값을 하나씩 직접 꺼내는 것은 아닙니다. \`iter(numbers)\`를 호출하면 리스트를 순회할 수 있는 **iterator 객체**가 만들어집니다.

정리하면 다음과 같습니다.

\`\`\`text
iterable  →  iter()  →  iterator
\`\`\`

리스트, 튜플, 문자열은 iterable입니다. 이 iterable을 \`iter()\`에 넣으면 값을 하나씩 꺼낼 수 있는 iterator가 만들어집니다.

---

### 4.1.2 iterator란 무엇인가

**iterator는 값을 하나씩 꺼낼 수 있는 객체**입니다.

iterator에서는 \`next()\` 함수를 사용해 다음 값을 꺼낼 수 있습니다.

\`\`\`python
numbers = [10, 20, 30]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
20
30
\`\`\`

\`next(iterator)\`를 한 번 호출할 때마다 다음 값이 하나씩 나옵니다. iterator는 현재 어디까지 값을 꺼냈는지 내부적으로 기억합니다.

그렇다면 값을 모두 꺼낸 뒤 다시 \`next()\`를 호출하면 어떻게 될까요?

\`\`\`python
numbers = [10, 20, 30]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
\`\`\`

마지막 줄에서 다음과 같은 에러가 발생합니다.

\`\`\`text
StopIteration
\`\`\`

\`StopIteration\`은 더 이상 꺼낼 값이 없다는 뜻입니다. \`for\` 문은 내부적으로 이 \`StopIteration\`을 만나면 반복을 멈춥니다.

---

### 4.1.3 \`for\` 문이 내부적으로 동작하는 방식

우리가 작성하는 \`for\` 문은 다음과 같습니다.

\`\`\`python
numbers = [10, 20, 30]

for number in numbers:
    print(number)
\`\`\`

이 코드는 내부적으로 대략 다음과 같은 흐름으로 동작합니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

while True:
    try:
        number = next(iterator)
    except StopIteration:
        break

    print(number)
\`\`\`

실제로 매번 이렇게 작성할 필요는 없습니다. 하지만 내부 구조를 이해하는 것은 중요합니다.

\`for\` 문은 다음 순서로 동작합니다.

1. 반복할 객체에서 \`iter()\`를 호출한다.
2. iterator를 얻는다.
3. \`next()\`로 값을 하나씩 꺼낸다.
4. \`StopIteration\`이 발생하면 반복을 종료한다.

이 흐름을 알면 파일, 제너레이터, 데이터 스트림, API 페이지 처리 같은 고급 반복 구조를 이해하기 쉬워집니다.

---

### 4.1.4 iterable과 iterator의 차이

iterable과 iterator는 비슷해 보이지만 다릅니다.

| 구분 | 의미 | 예시 |
|---|---|---|
| iterable | 반복할 수 있는 객체 | 리스트, 튜플, 문자열, 딕셔너리 |
| iterator | 값을 하나씩 꺼내는 객체 | \`iter([1, 2, 3])\`의 결과 |

리스트는 iterable입니다.

\`\`\`python
numbers = [10, 20, 30]
\`\`\`

iterator는 아닙니다. 리스트에 바로 \`next()\`를 호출하면 에러가 납니다.

\`\`\`python
numbers = [10, 20, 30]

next(numbers)
\`\`\`

실행하면 다음과 같은 에러가 발생합니다.

\`\`\`text
TypeError: 'list' object is not an iterator
\`\`\`

리스트를 iterator로 바꾸려면 \`iter()\`를 사용해야 합니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))
\`\`\`

반대로 iterator는 일반적으로 iterable이기도 합니다. iterator에 \`iter()\`를 호출하면 자기 자신을 반환합니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(iter(iterator) is iterator)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

이 말은 iterator도 \`for\` 문에서 사용할 수 있다는 뜻입니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

for number in iterator:
    print(number)
\`\`\`

---

### 4.1.5 iterator는 한 번 지나가면 되돌아가지 않는다

iterator는 현재 위치를 기억하면서 앞으로 나아갑니다. 한 번 꺼낸 값은 다시 나오지 않습니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))

for number in iterator:
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
20
30
\`\`\`

처음 \`next(iterator)\`에서 \`10\`을 꺼냈습니다. 그 다음 \`for\` 문은 남은 값인 \`20\`, \`30\`만 처리합니다.

이 특징은 매우 중요합니다. iterator는 “저장된 전체 데이터”라기보다 “현재 위치를 기억하며 값을 하나씩 꺼내는 통로”에 가깝습니다.

예를 들어 파일 객체도 iterator처럼 동작합니다. 파일을 한 줄씩 읽으면 읽은 위치가 앞으로 이동합니다. 다시 처음부터 읽고 싶다면 파일을 다시 열거나 위치를 되돌려야 합니다.

---

### 4.1.6 iterable을 다시 반복할 수 있는 이유

리스트는 여러 번 반복할 수 있습니다.

\`\`\`python
numbers = [10, 20, 30]

for number in numbers:
    print(number)

for number in numbers:
    print(number)
\`\`\`

두 번 모두 \`10\`, \`20\`, \`30\`이 출력됩니다. 이유는 리스트 자체가 iterator가 아니라 iterable이기 때문입니다. \`for\` 문을 실행할 때마다 새로운 iterator가 만들어집니다.

반면 iterator는 한 번 소비되면 남은 값만 처리합니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

for number in iterator:
    print(number)

for number in iterator:
    print(number)
\`\`\`

두 번째 \`for\` 문에서는 아무것도 출력되지 않습니다. 첫 번째 반복에서 iterator가 이미 끝까지 소비되었기 때문입니다.

---

## 4.2 이터레이터 직접 만들기

파이썬의 \`for\` 문은 \`iter()\`와 \`next()\` 규칙을 따르는 객체라면 직접 만든 객체도 반복할 수 있습니다. 이를 위해 클래스에 두 개의 특수 메서드를 구현합니다.

- \`__iter__()\`
- \`__next__()\`

이 두 메서드를 구현하면 사용자 정의 iterator를 만들 수 있습니다.

---

### 4.2.1 \`__iter__\`와 \`__next__\`

iterator 객체가 되려면 다음 조건을 만족해야 합니다.

1. \`__iter__()\` 메서드를 가진다.
2. \`__next__()\` 메서드를 가진다.
3. \`__next__()\`는 다음 값을 반환한다.
4. 더 이상 반환할 값이 없으면 \`StopIteration\`을 발생시킨다.

가장 단순한 이터레이터를 만들어보겠습니다.

\`\`\`python
class CountUp:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration

        value = self.current
        self.current += 1
        return value

numbers = CountUp(1, 5)

for number in numbers:
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
\`\`\`

\`CountUp(1, 5)\`는 1부터 5까지 값을 하나씩 반환하는 iterator입니다.

---

### 4.2.2 \`__iter__()\`의 역할

\`__iter__()\`는 반복을 시작할 때 호출됩니다. iterator 자신을 반환하는 경우가 많습니다.

\`\`\`python
class CountUp:
    def __iter__(self):
        return self
\`\`\`

\`for\` 문은 반복을 시작할 때 내부적으로 \`iter(numbers)\`를 호출합니다. 이때 \`numbers.__iter__()\`가 실행되고, 반환된 객체를 iterator로 사용합니다.

---

### 4.2.3 \`__next__()\`의 역할

\`__next__()\`는 값을 하나씩 반환합니다.

\`\`\`python
def __next__(self):
    if self.current > self.end:
        raise StopIteration

    value = self.current
    self.current += 1
    return value
\`\`\`

이 메서드는 세 가지 일을 합니다.

1. 더 이상 반환할 값이 있는지 확인한다.
2. 현재 값을 반환한다.
3. 다음 호출을 위해 상태를 변경한다.

iterator는 현재 상태를 기억해야 하므로 보통 인스턴스 변수에 현재 위치를 저장합니다.

---

### 4.2.4 \`StopIteration\`

iterator가 더 이상 값을 반환할 수 없을 때는 \`StopIteration\`을 발생시켜야 합니다.

\`\`\`python
if self.current > self.end:
    raise StopIteration
\`\`\`

\`for\` 문은 이 예외를 직접 사용자에게 보여주지 않습니다. 대신 반복을 자연스럽게 종료합니다.

하지만 \`next()\`를 직접 호출하면 \`StopIteration\`을 볼 수 있습니다.

\`\`\`python
numbers = CountUp(1, 2)

print(next(numbers))
print(next(numbers))
print(next(numbers))
\`\`\`

마지막 줄에서 \`StopIteration\`이 발생합니다.

---

### 4.2.5 직접 만든 iterator의 한계

앞에서 만든 \`CountUp\`은 iterator입니다. 그런데 한 번 반복하면 다시 반복할 수 없습니다.

\`\`\`python
numbers = CountUp(1, 3)

for number in numbers:
    print(number)

for number in numbers:
    print(number)
\`\`\`

두 번째 반복에서는 아무것도 출력되지 않습니다. 이미 \`current\` 값이 끝까지 이동했기 때문입니다.

이것이 iterator의 특징입니다. iterator는 자신이 어디까지 진행했는지 상태를 기억하고, 한 번 지나간 값을 다시 돌려주지 않습니다.

---

### 4.2.6 반복할 때마다 새 iterator를 만들기

여러 번 반복 가능한 객체를 만들고 싶다면 iterable과 iterator를 분리할 수 있습니다.

\`\`\`python
class CountUpIterable:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __iter__(self):
        return CountUpIterator(self.start, self.end)


class CountUpIterator:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration

        value = self.current
        self.current += 1
        return value

numbers = CountUpIterable(1, 3)

for number in numbers:
    print(number)

for number in numbers:
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
1
2
3
\`\`\`

\`CountUpIterable\`은 반복할 수 있는 객체이고, 반복할 때마다 새로운 \`CountUpIterator\`를 만들어 반환합니다.

기초 단계에서는 이 구조가 조금 복잡해 보일 수 있습니다. 하지만 이 구조를 이해하면 파이썬의 반복 시스템을 더 정확하게 이해할 수 있습니다.

---

### 4.2.7 실무 예제: 일정 범위의 날짜 반복하기

날짜 데이터를 처리할 때 특정 시작일부터 종료일까지 하루씩 반복해야 할 때가 있습니다.

\`\`\`python
from datetime import date, timedelta


class DateRange:
    def __init__(self, start_date, end_date):
        self.current = start_date
        self.end_date = end_date

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end_date:
            raise StopIteration

        value = self.current
        self.current += timedelta(days=1)
        return value

start = date(2026, 1, 1)
end = date(2026, 1, 5)

for day in DateRange(start, end):
    print(day)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-01-01
2026-01-02
2026-01-03
2026-01-04
2026-01-05
\`\`\`

이런 구조는 날짜별 파일을 처리하거나, 날짜별 API 요청을 보내거나, 기간별 보고서를 생성할 때 사용할 수 있습니다.

---

## 4.3 제너레이터 함수

직접 iterator 클래스를 만들면 반복 동작을 자세히 제어할 수 있습니다. 하지만 단순히 값을 하나씩 만들어내고 싶을 때마다 클래스를 작성하는 것은 번거롭습니다.

이때 사용하는 것이 **제너레이터**입니다.

제너레이터는 iterator를 더 간단하게 만들 수 있는 파이썬 문법입니다. 핵심 키워드는 \`yield\`입니다.

---

### 4.3.1 \`yield\`란 무엇인가

일반 함수는 \`return\`을 만나면 값을 반환하고 함수 실행을 끝냅니다.

\`\`\`python
def get_numbers():
    return [1, 2, 3]

numbers = get_numbers()
print(numbers)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3]
\`\`\`

이 함수는 리스트 전체를 만들어 반환합니다.

반면 제너레이터 함수는 \`yield\`를 사용해 값을 하나씩 반환합니다.

\`\`\`python
def count_up():
    yield 1
    yield 2
    yield 3

numbers = count_up()

print(numbers)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
<generator object count_up at 0x...>
\`\`\`

\`count_up()\`을 호출해도 함수 본문이 즉시 모두 실행되지 않습니다. 대신 generator 객체가 만들어집니다.

값을 꺼내려면 \`next()\`를 사용합니다.

\`\`\`python
def count_up():
    yield 1
    yield 2
    yield 3

numbers = count_up()

print(next(numbers))
print(next(numbers))
print(next(numbers))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

---

### 4.3.2 제너레이터도 iterator다

제너레이터 객체는 iterator입니다. 따라서 \`for\` 문에서 사용할 수 있습니다.

\`\`\`python
def count_up():
    yield 1
    yield 2
    yield 3

for number in count_up():
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

제너레이터는 직접 \`__iter__()\`와 \`__next__()\`를 구현하지 않아도 iterator처럼 동작합니다. 파이썬이 내부적으로 필요한 iterator 동작을 만들어주기 때문입니다.

---

### 4.3.3 \`return\`과 \`yield\`의 차이

\`return\`과 \`yield\`는 모두 값을 내보내는 것처럼 보이지만 동작 방식이 다릅니다.

| 구분 | \`return\` | \`yield\` |
|---|---|---|
| 함수 실행 | 값을 반환하고 종료 | 값을 반환하고 잠시 멈춤 |
| 다음 호출 | 다시 처음부터 실행 | 멈춘 지점 다음부터 실행 |
| 반환 결과 | 일반 값 | generator 객체 |
| 주 용도 | 결과 하나 반환 | 값을 순차적으로 생성 |

예제를 보겠습니다.

\`\`\`python
def normal_function():
    print("시작")
    return 1
    print("끝")

print(normal_function())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
시작
1
\`\`\`

\`return 1\`을 만나면 함수가 종료되므로 \`print("끝")\`은 실행되지 않습니다.

이번에는 \`yield\`를 사용해보겠습니다.

\`\`\`python
def generator_function():
    print("첫 번째 실행")
    yield 1

    print("두 번째 실행")
    yield 2

    print("세 번째 실행")
    yield 3

numbers = generator_function()

print(next(numbers))
print(next(numbers))
print(next(numbers))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
첫 번째 실행
1
두 번째 실행
2
세 번째 실행
3
\`\`\`

제너레이터는 \`yield\`를 만날 때마다 값을 반환하고 잠시 멈춥니다. 다음에 \`next()\`를 호출하면 멈췄던 지점 다음부터 다시 실행됩니다.

---

### 4.3.4 제너레이터의 실행 흐름

제너레이터의 가장 중요한 특징은 **게으른 실행**, 즉 lazy evaluation입니다. 필요할 때까지 값을 만들지 않습니다.

다음 코드를 봅시다.

\`\`\`python
def make_numbers():
    print("함수 시작")
    yield 1
    print("1 이후")
    yield 2
    print("2 이후")
    yield 3
    print("함수 끝")

numbers = make_numbers()
print("제너레이터 생성 완료")

print(next(numbers))
print(next(numbers))
print(next(numbers))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
제너레이터 생성 완료
함수 시작
1
1 이후
2
2 이후
3
\`\`\`

\`make_numbers()\`를 호출했을 때는 \`함수 시작\`이 출력되지 않습니다. generator 객체만 만들어졌기 때문입니다. 실제 함수 본문은 \`next(numbers)\`가 호출될 때 실행됩니다.

이 특징 덕분에 제너레이터는 큰 데이터를 처리할 때 유용합니다. 모든 값을 미리 만들지 않고, 필요한 순간에 하나씩 만들 수 있기 때문입니다.

---

### 4.3.5 제너레이터로 숫자 범위 만들기

앞에서 클래스로 만든 \`CountUp\`을 제너레이터 함수로 다시 작성하면 훨씬 간단해집니다.

\`\`\`python
def count_up(start, end):
    current = start

    while current <= end:
        yield current
        current += 1

for number in count_up(1, 5):
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
\`\`\`

제너레이터는 내부 상태를 자동으로 기억합니다. \`current\` 값은 \`yield\`에서 멈춘 뒤 다음 호출 때 이어서 사용됩니다.

---

### 4.3.6 제너레이터는 한 번 소비된다

제너레이터도 iterator입니다. 따라서 한 번 끝까지 소비하면 다시 반복할 수 없습니다.

\`\`\`python
def count_up(start, end):
    current = start

    while current <= end:
        yield current
        current += 1

numbers = count_up(1, 3)

for number in numbers:
    print(number)

for number in numbers:
    print(number)
\`\`\`

두 번째 반복에서는 아무것도 출력되지 않습니다. 제너레이터가 이미 끝까지 소비되었기 때문입니다.

다시 반복하고 싶다면 제너레이터 함수를 다시 호출해 새 generator 객체를 만들어야 합니다.

\`\`\`python
for number in count_up(1, 3):
    print(number)

for number in count_up(1, 3):
    print(number)
\`\`\`

---

### 4.3.7 제너레이터와 파일 처리

파일을 한 줄씩 읽는 작업은 제너레이터와 잘 어울립니다.

\`\`\`python
def read_lines(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            yield line.strip()

for line in read_lines("sample.txt"):
    print(line)
\`\`\`

이 함수는 파일 전체를 리스트로 만들어 반환하지 않습니다. 파일에서 한 줄을 읽고, 그 줄을 \`yield\`로 내보냅니다. 다음 줄은 다음 반복에서 읽습니다.

파일이 작다면 차이가 크지 않을 수 있습니다. 하지만 파일이 수백 MB, 수 GB라면 전체 파일을 한 번에 메모리에 올리는 방식은 위험합니다. 제너레이터를 사용하면 한 줄씩 처리할 수 있으므로 메모리를 훨씬 적게 사용합니다.

---

### 4.3.8 제너레이터 파이프라인

제너레이터는 여러 단계를 연결해 데이터 처리 파이프라인처럼 사용할 수 있습니다.

예를 들어 로그 파일에서 에러가 포함된 줄만 골라내고, 그 줄을 정리해서 출력해보겠습니다.

\`\`\`python
def read_lines(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            yield line.strip()


def filter_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line


def remove_timestamp(lines):
    for line in lines:
        yield line[20:]

lines = read_lines("app.log")
error_lines = filter_errors(lines)
messages = remove_timestamp(error_lines)

for message in messages:
    print(message)
\`\`\`

이 구조에서 각 함수는 모든 데이터를 한 번에 처리하지 않습니다. 한 줄씩 읽고, 한 줄씩 필터링하고, 한 줄씩 변환합니다.

이런 방식은 데이터분석 전처리에서 매우 유용합니다. 원천 데이터가 크더라도 단계별로 필요한 만큼만 처리할 수 있기 때문입니다.

---

## 4.4 제너레이터 표현식

기초 과정에서 리스트 컴프리헨션을 배웠습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = [number * number for number in numbers]

print(squares)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

리스트 컴프리헨션은 새 리스트를 만듭니다. 값이 5개라면 문제가 없습니다. 하지만 값이 1억 개라면 새 리스트를 만드는 데 많은 메모리가 필요합니다.

이때 사용할 수 있는 것이 **제너레이터 표현식**입니다.

---

### 4.4.1 리스트 컴프리헨션과 제너레이터 표현식

리스트 컴프리헨션은 대괄호 \`[]\`를 사용합니다.

\`\`\`python
squares = [number * number for number in range(5)]
print(squares)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[0, 1, 4, 9, 16]
\`\`\`

제너레이터 표현식은 소괄호 \`()\`를 사용합니다.

\`\`\`python
squares = (number * number for number in range(5))
print(squares)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
<generator object <genexpr> at 0x...>
\`\`\`

제너레이터 표현식은 리스트를 즉시 만들지 않습니다. generator 객체를 만들고, 값을 요청할 때 하나씩 계산합니다.

\`\`\`python
squares = (number * number for number in range(5))

for value in squares:
    print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
0
1
4
9
16
\`\`\`

---

### 4.4.2 메모리 사용 차이

리스트 컴프리헨션은 모든 값을 메모리에 저장합니다.

\`\`\`python
numbers = [number for number in range(1_000_000)]
\`\`\`

위 코드는 숫자 100만 개가 들어 있는 리스트를 만듭니다.

제너레이터 표현식은 값을 미리 만들지 않습니다.

\`\`\`python
numbers = (number for number in range(1_000_000))
\`\`\`

이 코드는 숫자 100만 개를 즉시 만들지 않습니다. 필요할 때 하나씩 생성합니다.

메모리 사용량을 정확히 이해하기 위해 \`sys.getsizeof()\`로 간단히 비교할 수 있습니다.

\`\`\`python
import sys

list_numbers = [number for number in range(1_000_000)]
generator_numbers = (number for number in range(1_000_000))

print(sys.getsizeof(list_numbers))
print(sys.getsizeof(generator_numbers))
\`\`\`

실행 결과는 환경마다 다르지만, 리스트가 훨씬 큰 메모리를 사용한다는 점을 확인할 수 있습니다.

단, \`sys.getsizeof()\`는 객체 자체의 크기를 보여주는 도구입니다. 리스트 안의 모든 요소까지 포함한 전체 메모리를 완전히 보여주는 것은 아닙니다. 하지만 리스트와 제너레이터의 차이를 이해하는 데는 충분합니다.

---

### 4.4.3 언제 리스트를 사용하고 언제 제너레이터를 사용할까

리스트와 제너레이터는 어느 하나가 항상 더 좋은 것이 아닙니다. 상황에 따라 선택해야 합니다.

리스트가 적합한 경우는 다음과 같습니다.

- 데이터를 여러 번 반복해야 한다.
- 인덱스로 접근해야 한다.
- 길이를 자주 확인해야 한다.
- 정렬, 슬라이싱, 수정이 필요하다.
- 데이터 크기가 작거나 중간 정도다.

제너레이터가 적합한 경우는 다음과 같습니다.

- 데이터를 한 번만 순서대로 처리하면 된다.
- 데이터 크기가 매우 크다.
- 모든 값을 미리 만들 필요가 없다.
- 파일이나 API처럼 순차적으로 들어오는 데이터를 처리한다.
- 메모리 사용량을 줄여야 한다.

예를 들어 총합만 필요하다면 굳이 리스트를 만들 필요가 없습니다.

\`\`\`python
total = sum(number * number for number in range(1_000_000))
print(total)
\`\`\`

\`sum()\`은 iterable을 받을 수 있으므로 제너레이터 표현식을 바로 전달할 수 있습니다.

---

### 4.4.4 제너레이터 표현식과 괄호 생략

함수 호출 안에서 제너레이터 표현식을 하나의 인자로 전달할 때는 바깥 소괄호를 생략할 수 있습니다.

\`\`\`python
total = sum(number for number in range(10))
print(total)
\`\`\`

이는 다음 코드와 같습니다.

\`\`\`python
total = sum((number for number in range(10)))
print(total)
\`\`\`

하지만 함수에 여러 인자를 전달할 때는 소괄호를 명확히 써야 합니다.

\`\`\`python
values = list(number * 2 for number in range(5))
print(values)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[0, 2, 4, 6, 8]
\`\`\`

---

### 4.4.5 제너레이터 표현식은 한 번 소비된다

제너레이터 표현식도 generator 객체를 만듭니다. 따라서 한 번 소비되면 다시 사용할 수 없습니다.

\`\`\`python
values = (number for number in range(3))

print(list(values))
print(list(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[0, 1, 2]
[]
\`\`\`

두 번째 \`list(values)\`는 빈 리스트를 반환합니다. 첫 번째 \`list(values)\`에서 이미 모든 값이 소비되었기 때문입니다.

이 점은 실무에서 자주 실수하는 부분입니다. 제너레이터를 한 번 출력하거나 리스트로 변환한 뒤 다시 쓰려고 하면 남은 값이 없을 수 있습니다.

---

## 4.5 \`yield from\`

제너레이터를 작성하다 보면 다른 iterable이나 다른 generator의 값을 그대로 내보내야 할 때가 있습니다. 이때 사용할 수 있는 문법이 \`yield from\`입니다.

---

### 4.5.1 중첩 반복 구조

여러 리스트를 이어서 하나씩 반환하는 제너레이터를 만들어보겠습니다.

\`\`\`python
def chain_lists(list1, list2):
    for item in list1:
        yield item

    for item in list2:
        yield item

for value in chain_lists([1, 2, 3], [4, 5]):
    print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
\`\`\`

이 코드는 문제없이 동작하지만, 단순히 다른 iterable의 값을 그대로 내보내는 반복문이 반복됩니다.

---

### 4.5.2 \`yield from\` 기본 사용법

\`yield from\`을 사용하면 위 코드를 더 간단하게 작성할 수 있습니다.

\`\`\`python
def chain_lists(list1, list2):
    yield from list1
    yield from list2

for value in chain_lists([1, 2, 3], [4, 5]):
    print(value)
\`\`\`

실행 결과는 동일합니다.

\`\`\`text
1
2
3
4
5
\`\`\`

\`yield from list1\`은 \`list1\`에 들어 있는 값을 하나씩 \`yield\`하는 것과 같습니다.

---

### 4.5.3 여러 데이터 소스 연결하기

여러 데이터 소스를 하나의 흐름으로 연결할 때 \`yield from\`을 사용할 수 있습니다.

\`\`\`python
def read_file_lines(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            yield line.strip()


def read_all_files(file_paths):
    for file_path in file_paths:
        yield from read_file_lines(file_path)

files = ["log_1.txt", "log_2.txt", "log_3.txt"]

for line in read_all_files(files):
    print(line)
\`\`\`

이 구조는 여러 파일을 하나의 큰 파일처럼 순차적으로 처리할 때 유용합니다.

---

### 4.5.4 중첩 리스트 펼치기

\`yield from\`은 중첩 리스트를 펼칠 때도 사용할 수 있습니다.

\`\`\`python
def flatten(items):
    for item in items:
        yield from item

nested = [[1, 2], [3, 4], [5, 6]]

for value in flatten(nested):
    print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
6
\`\`\`

단, 이 예제는 2단계 중첩 리스트를 가정합니다. 중첩 깊이가 다양하다면 별도의 재귀 처리나 더 명확한 데이터 구조 설계가 필요합니다.

---

### 4.5.5 \`yield from\`을 사용할 때의 장점

\`yield from\`은 다음과 같은 장점이 있습니다.

- 단순한 반복 위임 코드를 줄일 수 있다.
- 여러 iterable을 자연스럽게 연결할 수 있다.
- 제너레이터 파이프라인을 읽기 쉽게 만들 수 있다.
- 중첩 반복 구조를 단순화할 수 있다.

다만 모든 반복문을 \`yield from\`으로 바꿔야 하는 것은 아닙니다. 중간에 조건을 검사하거나 값을 변환해야 한다면 일반 \`for\` 문이 더 명확합니다.

\`\`\`python
def filter_positive(numbers):
    for number in numbers:
        if number > 0:
            yield number
\`\`\`

위 코드처럼 조건 처리나 변환이 필요한 경우에는 일반 \`for\` 문을 사용하는 것이 자연스럽습니다.

---

## 4.6 \`itertools\` 활용

파이썬 표준 라이브러리에는 반복 작업을 효율적으로 처리하기 위한 \`itertools\` 모듈이 있습니다. \`itertools\`는 iterator를 만들거나 조합하거나 잘라내거나 묶는 데 유용한 도구를 제공합니다.

고급 파이썬 과정에서 \`itertools\`를 모두 외울 필요는 없습니다. 하지만 자주 쓰는 도구를 알고 있으면 반복문을 더 간결하고 효율적으로 작성할 수 있습니다.

\`\`\`python
import itertools
\`\`\`

---

### 4.6.1 \`count()\`

\`count()\`는 특정 숫자부터 시작해 계속 증가하는 iterator를 만듭니다.

\`\`\`python
from itertools import count

for number in count(1):
    print(number)

    if number == 5:
        break
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
\`\`\`

\`count(1)\`은 1부터 시작해 끝없이 증가합니다. 무한 iterator이므로 반드시 종료 조건을 함께 사용해야 합니다.

증가 간격도 지정할 수 있습니다.

\`\`\`python
from itertools import count

for number in count(10, 2):
    print(number)

    if number >= 16:
        break
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
12
14
16
\`\`\`

---

### 4.6.2 \`cycle()\`

\`cycle()\`은 iterable의 값을 반복해서 순환합니다.

\`\`\`python
from itertools import cycle

colors = cycle(["red", "green", "blue"])

for index in range(7):
    print(next(colors))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
red
green
blue
red
green
blue
red
\`\`\`

\`cycle()\`도 무한 iterator입니다. 종료 조건 없이 \`for\` 문에 바로 사용하면 끝나지 않습니다.

실무에서는 순환 배정이 필요할 때 사용할 수 있습니다.

\`\`\`python
from itertools import cycle

workers = cycle(["민수", "지영", "철수"])
tasks = ["작업1", "작업2", "작업3", "작업4", "작업5"]

for task in tasks:
    worker = next(workers)
    print(task, "->", worker)
\`\`\`

---

### 4.6.3 \`repeat()\`

\`repeat()\`은 같은 값을 반복해서 반환합니다.

\`\`\`python
from itertools import repeat

for value in repeat("Python", 3):
    print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Python
Python
Python
\`\`\`

반복 횟수를 지정하지 않으면 무한 반복됩니다.

\`\`\`python
from itertools import repeat

values = repeat(0, 5)
print(list(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[0, 0, 0, 0, 0]
\`\`\`

---

### 4.6.4 \`chain()\`

\`chain()\`은 여러 iterable을 하나로 이어줍니다.

\`\`\`python
from itertools import chain

first = [1, 2, 3]
second = [4, 5]
third = [6, 7]

for value in chain(first, second, third):
    print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
6
7
\`\`\`

\`yield from\`을 직접 사용하는 것과 비슷하지만, 이미 만들어진 도구를 사용하므로 코드가 간단해집니다.

\`\`\`python
from itertools import chain

all_names = chain(["민수", "지영"], ["철수"], ["영희", "수진"])

for name in all_names:
    print(name)
\`\`\`

---

### 4.6.5 \`islice()\`

\`islice()\`는 iterator에서 원하는 구간만 잘라냅니다. 리스트의 슬라이싱과 비슷하지만, iterator에도 사용할 수 있다는 점이 중요합니다.

\`\`\`python
from itertools import islice

numbers = count(1)
first_five = islice(numbers, 5)

print(list(first_five))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4, 5]
\`\`\`

\`count(1)\`은 무한 iterator지만, \`islice(numbers, 5)\`를 사용하면 앞의 5개만 가져올 수 있습니다.

시작, 끝, 간격도 지정할 수 있습니다.

\`\`\`python
from itertools import islice

numbers = range(100)
selected = islice(numbers, 10, 20, 2)

print(list(selected))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[10, 12, 14, 16, 18]
\`\`\`

---

### 4.6.6 \`groupby()\`

\`groupby()\`는 연속된 데이터를 key 기준으로 묶습니다. 중요한 점은 \`groupby()\`가 전체 데이터를 자동으로 정렬하지 않는다는 것입니다. 같은 key끼리 묶으려면 먼저 정렬되어 있어야 합니다.

\`\`\`python
from itertools import groupby

orders = [
    {"category": "book", "price": 12000},
    {"category": "book", "price": 15000},
    {"category": "food", "price": 8000},
    {"category": "food", "price": 10000},
]

for category, group in groupby(orders, key=lambda order: order["category"]):
    print(category, list(group))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
book [{'category': 'book', 'price': 12000}, {'category': 'book', 'price': 15000}]
food [{'category': 'food', 'price': 8000}, {'category': 'food', 'price': 10000}]
\`\`\`

정렬되지 않은 데이터에 \`groupby()\`를 사용하면 기대와 다른 결과가 나올 수 있습니다.

\`\`\`python
from itertools import groupby

orders = [
    {"category": "book", "price": 12000},
    {"category": "food", "price": 8000},
    {"category": "book", "price": 15000},
]

for category, group in groupby(orders, key=lambda order: order["category"]):
    print(category, list(group))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
book [{'category': 'book', 'price': 12000}]
food [{'category': 'food', 'price': 8000}]
book [{'category': 'book', 'price': 15000}]
\`\`\`

\`book\`이 두 번 나옵니다. \`groupby()\`는 같은 key가 연속으로 나타나는 구간을 묶기 때문입니다.

따라서 보통은 먼저 정렬한 뒤 사용합니다.

\`\`\`python
from itertools import groupby

orders = [
    {"category": "book", "price": 12000},
    {"category": "food", "price": 8000},
    {"category": "book", "price": 15000},
]

orders = sorted(orders, key=lambda order: order["category"])

for category, group in groupby(orders, key=lambda order: order["category"]):
    total = sum(order["price"] for order in group)
    print(category, total)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
book 27000
food 8000
\`\`\`

---

### 4.6.7 \`combinations()\`

\`combinations()\`는 iterable에서 가능한 조합을 만들어냅니다. 조합은 순서를 고려하지 않습니다.

\`\`\`python
from itertools import combinations

items = ["A", "B", "C"]

for pair in combinations(items, 2):
    print(pair)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
('A', 'B')
('A', 'C')
('B', 'C')
\`\`\`

실무에서는 추천 조합, 상품 묶음, 테스트 케이스 조합을 만들 때 사용할 수 있습니다.

---

### 4.6.8 \`product()\`

\`product()\`는 여러 iterable의 모든 조합을 만들어냅니다. 수학에서 말하는 데카르트 곱과 비슷합니다.

\`\`\`python
from itertools import product

colors = ["red", "blue"]
sizes = ["S", "M", "L"]

for item in product(colors, sizes):
    print(item)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
('red', 'S')
('red', 'M')
('red', 'L')
('blue', 'S')
('blue', 'M')
('blue', 'L')
\`\`\`

상품 옵션 조합이나 여러 파라미터 조합을 만들 때 유용합니다.

다만 조합의 개수는 빠르게 커질 수 있습니다. 예를 들어 10개짜리 목록 4개를 \`product()\`로 조합하면 10,000개의 조합이 만들어집니다. 데이터 크기를 항상 확인해야 합니다.

---

### 4.6.9 \`itertools\` 사용 시 주의점

\`itertools\`는 강력하지만 다음 점을 주의해야 합니다.

첫째, 일부 iterator는 무한합니다.

- \`count()\`
- \`cycle()\`
- 반복 횟수를 지정하지 않은 \`repeat()\`

무한 iterator는 반드시 \`break\`, \`islice()\`, 조건문 등으로 제한해야 합니다.

둘째, iterator는 한 번 소비됩니다.

\`\`\`python
from itertools import chain

values = chain([1, 2], [3, 4])

print(list(values))
print(list(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
[]
\`\`\`

셋째, \`groupby()\`는 정렬이 필요할 때가 많습니다. 같은 key가 연속되어야 같은 그룹으로 묶이기 때문입니다.

---

## 4.7 실무 활용

이터레이터와 제너레이터는 문법 자체보다 활용 방식이 중요합니다. 이 절에서는 실무에서 자주 만나는 패턴을 살펴보겠습니다.

---

### 4.7.1 큰 텍스트 파일 한 줄씩 처리하기

작은 파일은 다음처럼 한 번에 읽어도 큰 문제가 없습니다.

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

하지만 파일이 매우 크다면 전체 내용을 한 번에 메모리에 올리는 것은 좋지 않습니다. 대신 한 줄씩 처리합니다.

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        print(line)
\`\`\`

파일 객체는 iterable입니다. 그래서 \`for\` 문으로 한 줄씩 읽을 수 있습니다.

이 구조는 다음과 같은 상황에서 유용합니다.

- 로그 파일 분석
- 대용량 CSV 전처리
- 긴 텍스트 문서 처리
- 데이터 검증 작업

---

### 4.7.2 로그 파일에서 에러만 추출하기

로그 파일에서 \`ERROR\`가 포함된 줄만 추출하는 제너레이터를 만들어보겠습니다.

\`\`\`python
def read_lines(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            yield line.strip()


def find_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

lines = read_lines("app.log")
errors = find_errors(lines)

for error in errors:
    print(error)
\`\`\`

이 코드는 로그 파일 전체를 메모리에 올리지 않습니다. 한 줄씩 읽고, 조건에 맞는 줄만 내보냅니다.

이 구조를 함수로 분리하면 테스트하기도 쉽습니다.

\`\`\`python
def find_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

sample_lines = [
    "INFO start",
    "ERROR failed to connect",
    "INFO end",
]

print(list(find_errors(sample_lines)))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['ERROR failed to connect']
\`\`\`

파일을 직접 읽지 않고도 리스트를 넣어 테스트할 수 있습니다.

---

### 4.7.3 데이터 정리 파이프라인 만들기

다음은 문자열 데이터 목록을 정리하는 예제입니다.

\`\`\`python
def strip_values(values):
    for value in values:
        yield value.strip()


def remove_empty(values):
    for value in values:
        if value:
            yield value


def normalize_email(values):
    for value in values:
        yield value.lower()

raw_emails = [
    " USER1@EXAMPLE.COM ",
    "",
    " user2@example.com",
    "   ",
    "USER3@EXAMPLE.COM",
]

emails = strip_values(raw_emails)
emails = remove_empty(emails)
emails = normalize_email(emails)

print(list(emails))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['user1@example.com', 'user2@example.com', 'user3@example.com']
\`\`\`

각 함수는 하나의 역할만 담당합니다.

- \`strip_values\`: 앞뒤 공백 제거
- \`remove_empty\`: 빈 값 제거
- \`normalize_email\`: 소문자 변환

이 구조는 데이터 클리닝 파이프라인의 기초입니다. 이후 데이터분석 과정에서 pandas를 사용하더라도, 이런 단계적 처리 사고방식은 계속 중요합니다.

---

### 4.7.4 API 페이지네이션을 제너레이터로 표현하기

API에서 데이터를 가져올 때 한 번에 모든 결과가 오지 않는 경우가 많습니다. 보통 페이지 단위로 데이터를 가져옵니다.

예를 들어 다음과 같은 함수가 있다고 가정합니다.

\`\`\`python
def fetch_page(page):
    data = {
        1: ["item1", "item2"],
        2: ["item3", "item4"],
        3: [],
    }
    return data.get(page, [])
\`\`\`

3페이지부터는 더 이상 데이터가 없다고 가정하겠습니다. 이때 제너레이터로 모든 아이템을 하나씩 반환할 수 있습니다.

\`\`\`python
def fetch_all_items():
    page = 1

    while True:
        items = fetch_page(page)

        if not items:
            break

        for item in items:
            yield item

        page += 1

for item in fetch_all_items():
    print(item)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
item1
item2
item3
item4
\`\`\`

사용하는 쪽에서는 페이지가 몇 개인지 몰라도 됩니다. 단지 \`for\` 문으로 아이템을 하나씩 처리하면 됩니다.

실제 API에서는 다음 요소들이 추가됩니다.

- 요청 URL
- 인증 정보
- 응답 상태 코드 확인
- 재시도
- 타임아웃
- 페이지 번호 또는 cursor
- 요청 제한 처리

고급 파이썬 과정의 후반부에서 API 수집을 다룰 때 이 구조를 다시 활용하게 됩니다.

---

### 4.7.5 대용량 데이터에서 조건에 맞는 값만 처리하기

다음은 숫자가 매우 많다고 가정한 예입니다.

\`\`\`python
def generate_numbers(limit):
    for number in range(limit):
        yield number


def filter_even(numbers):
    for number in numbers:
        if number % 2 == 0:
            yield number


def square(numbers):
    for number in numbers:
        yield number * number

numbers = generate_numbers(1_000_000)
even_numbers = filter_even(numbers)
squared_numbers = square(even_numbers)

total = sum(squared_numbers)
print(total)
\`\`\`

이 코드는 100만 개의 숫자를 리스트로 만들지 않습니다. 숫자를 하나씩 만들고, 짝수인지 확인하고, 제곱한 뒤, 합계에 더합니다.

메모리 측면에서 효율적입니다. 데이터분석 전처리에서 모든 중간 결과를 파일이나 리스트로 저장하지 않아도 되는 경우에는 이런 방식이 유용합니다.

---

### 4.7.6 제너레이터를 리스트로 변환할 때 주의하기

디버깅을 위해 제너레이터를 리스트로 변환하는 경우가 있습니다.

\`\`\`python
values = (number for number in range(5))
print(list(values))
\`\`\`

작은 데이터에서는 괜찮습니다. 하지만 제너레이터의 값이 매우 많다면 \`list()\`로 변환하는 순간 모든 값을 메모리에 올리게 됩니다.

\`\`\`python
values = (number for number in range(100_000_000))
# list(values)  # 매우 많은 메모리를 사용할 수 있음
\`\`\`

제너레이터를 사용하는 이유가 메모리 절약이라면, 중간에 \`list()\`로 바꾸는 코드가 없는지 주의해야 합니다.

필요한 일부만 확인하고 싶다면 \`itertools.islice()\`를 사용할 수 있습니다.

\`\`\`python
from itertools import islice

values = (number for number in range(100_000_000))
first_five = list(islice(values, 5))

print(first_five)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[0, 1, 2, 3, 4]
\`\`\`

---

## 4.8 이터레이터와 제너레이터를 사용할 때의 기준

이터레이터와 제너레이터는 강력하지만 모든 코드에 무조건 사용할 필요는 없습니다. 오히려 데이터가 작고 여러 번 사용해야 한다면 리스트가 더 편하고 명확합니다.

---

### 4.8.1 리스트가 더 좋은 경우

다음과 같은 경우에는 리스트가 적합합니다.

- 데이터 크기가 작다.
- 여러 번 반복해야 한다.
- 인덱스로 접근해야 한다.
- 정렬이나 슬라이싱이 필요하다.
- 중간 결과를 눈으로 확인해야 한다.

예를 들어 사용자 10명의 이름을 정렬하고 여러 번 출력해야 한다면 리스트가 자연스럽습니다.

\`\`\`python
names = ["민수", "지영", "철수"]
names.sort()

print(names[0])
print(names)
\`\`\`

---

### 4.8.2 제너레이터가 더 좋은 경우

다음과 같은 경우에는 제너레이터가 적합합니다.

- 데이터 크기가 크다.
- 한 번만 순서대로 처리하면 된다.
- 전체 데이터를 미리 만들 필요가 없다.
- 파일이나 API에서 데이터가 순차적으로 들어온다.
- 중간 단계가 여러 개지만 메모리를 아끼고 싶다.

예를 들어 큰 로그 파일에서 에러 줄만 찾아 저장하는 작업은 제너레이터와 잘 맞습니다.

\`\`\`python
def find_errors(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if "ERROR" in line:
                yield line.strip()
\`\`\`

---

### 4.8.3 실무에서 가장 흔한 실수

이터레이터와 제너레이터를 사용할 때 다음 실수가 자주 발생합니다.

첫째, 한 번 소비한 제너레이터를 다시 사용하려고 합니다.

\`\`\`python
values = (number for number in range(3))

print(list(values))
print(list(values))
\`\`\`

두 번째 결과는 빈 리스트입니다.

둘째, 디버깅하려고 \`list()\`로 바꿨다가 대용량 데이터를 모두 메모리에 올립니다.

\`\`\`python
# 큰 데이터에서는 위험할 수 있음
print(list(values))
\`\`\`

셋째, 무한 iterator를 종료 조건 없이 사용합니다.

\`\`\`python
from itertools import count

# 종료 조건이 없으면 끝나지 않음
for number in count(1):
    print(number)
\`\`\`

넷째, \`groupby()\`를 정렬 없이 사용해 기대와 다른 그룹이 만들어집니다.

이런 실수를 피하려면 iterator가 “값을 저장하는 리스트”가 아니라 “값을 하나씩 흘려보내는 흐름”이라는 점을 기억해야 합니다.

---

## 4장 핵심 정리

이번 장에서는 이터레이터와 제너레이터를 배웠습니다. 핵심은 다음과 같습니다.

1. \`for\` 문으로 반복할 수 있는 객체를 iterable이라고 한다.
2. \`iter()\`는 iterable에서 iterator를 만든다.
3. \`next()\`는 iterator에서 값을 하나씩 꺼낸다.
4. iterator는 값을 모두 꺼내면 \`StopIteration\`을 발생시킨다.
5. \`for\` 문은 내부적으로 \`iter()\`와 \`next()\`를 사용한다.
6. iterator는 한 번 소비되면 다시 처음부터 반복할 수 없다.
7. 직접 iterator를 만들려면 \`__iter__()\`와 \`__next__()\`를 구현한다.
8. 제너레이터는 \`yield\`를 사용해 값을 하나씩 생성하는 함수다.
9. 제너레이터는 필요한 순간에 값을 만들기 때문에 메모리 효율적이다.
10. 제너레이터 표현식은 리스트를 만들지 않고 값을 하나씩 생성한다.
11. \`yield from\`은 다른 iterable의 값을 그대로 위임할 때 사용한다.
12. \`itertools\`는 반복 처리에 유용한 표준 라이브러리다.
13. 대용량 파일, 로그, API 페이지 처리에는 제너레이터가 특히 유용하다.
14. 데이터가 작고 여러 번 사용해야 한다면 리스트가 더 적합할 수 있다.

이터레이터와 제너레이터를 잘 이해하면 데이터 처리 방식이 달라집니다. 단순히 “리스트를 만들어 반복한다”에서 벗어나, “데이터를 필요한 만큼만 흘려보내며 처리한다”는 사고방식을 갖게 됩니다. 이 사고방식은 이후 파일 입출력 심화, API 수집, 데이터베이스, 성능 최적화, 데이터분석 전처리에서 계속 사용됩니다.

---

## 연습문제

### 문제 1. iterable과 iterator 구분하기

다음 중 iterable인 것을 모두 고르세요.

1. 리스트
2. 문자열
3. 딕셔너리
4. \`iter([1, 2, 3])\`의 결과
5. 정수 \`10\`

---

### 문제 2. 실행 결과 예측하기

다음 코드의 실행 결과를 예상하세요.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
\`\`\`

---

### 문제 3. 실행 결과 예측하기

다음 코드의 실행 결과를 예상하세요.

\`\`\`python
values = (number for number in range(3))

print(list(values))
print(list(values))
\`\`\`

---

### 문제 4. 직접 이터레이터 만들기

1부터 3까지 값을 하나씩 반환하는 \`SimpleCounter\` 클래스를 작성하세요.

사용 예시는 다음과 같습니다.

\`\`\`python
counter = SimpleCounter(1, 3)

for number in counter:
    print(number)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
1
2
3
\`\`\`

---

### 문제 5. 제너레이터 함수 만들기

시작 숫자와 끝 숫자를 받아 그 사이의 짝수만 반환하는 제너레이터 함수 \`even_numbers(start, end)\`를 작성하세요.

사용 예시는 다음과 같습니다.

\`\`\`python
for number in even_numbers(1, 10):
    print(number)
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
2
4
6
8
10
\`\`\`

---

### 문제 6. 제너레이터 표현식 사용하기

다음 리스트에서 10 이상인 값만 제곱한 결과의 합계를 구하세요. 단, 중간 결과 리스트를 만들지 말고 제너레이터 표현식을 사용하세요.

\`\`\`python
numbers = [3, 10, 15, 2, 20]
\`\`\`

---

### 문제 7. \`yield from\` 사용하기

다음과 같은 중첩 리스트가 있습니다.

\`\`\`python
nested = [["a", "b"], ["c", "d"], ["e"]]
\`\`\`

\`yield from\`을 사용해 모든 값을 하나씩 반환하는 제너레이터 함수 \`flatten_once(items)\`를 작성하세요.

실행 결과는 다음과 같아야 합니다.

\`\`\`text
a
b
c
d
e
\`\`\`

---

### 문제 8. \`itertools.islice()\` 사용하기

\`itertools.count(1)\`을 사용해 1부터 시작하는 무한 iterator를 만들고, 그중 앞의 10개만 리스트로 출력하세요.

---

### 문제 9. 로그 필터링 제너레이터 만들기

다음 로그 목록에서 \`ERROR\`가 포함된 줄만 반환하는 제너레이터 함수 \`filter_error_logs(logs)\`를 작성하세요.

\`\`\`python
logs = [
    "INFO start",
    "WARNING slow response",
    "ERROR failed to connect",
    "INFO end",
    "ERROR timeout",
]
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
ERROR failed to connect
ERROR timeout
\`\`\`

---

### 문제 10. 리스트와 제너레이터 선택하기

다음 상황에서 리스트와 제너레이터 중 더 적합한 것을 고르고 이유를 간단히 설명하세요.

1. 학생 20명의 이름을 정렬하고 여러 번 출력해야 한다.
2. 5GB 로그 파일에서 \`ERROR\`가 포함된 줄만 찾아야 한다.
3. API에서 페이지 단위로 데이터를 가져와 바로 파일에 저장해야 한다.
4. 상품 5개의 가격을 인덱스로 접근해 수정해야 한다.

---

## 정답 및 해설

### 문제 1 정답

정답은 1, 2, 3, 4입니다.

리스트, 문자열, 딕셔너리는 모두 \`for\` 문으로 반복할 수 있으므로 iterable입니다. \`iter([1, 2, 3])\`의 결과는 iterator이며, iterator도 iterable입니다. 정수 \`10\`은 반복할 수 없으므로 iterable이 아닙니다.

\`\`\`python
for value in 10:
    print(value)
\`\`\`

위 코드는 에러가 발생합니다.

---

### 문제 2 정답

\`\`\`text
10
20
\`\`\`

\`iter(numbers)\`로 iterator를 만들었고, \`next(iterator)\`를 호출할 때마다 리스트의 값이 하나씩 나옵니다. 첫 번째 호출에서는 \`10\`, 두 번째 호출에서는 \`20\`이 반환됩니다.

---

### 문제 3 정답

\`\`\`text
[0, 1, 2]
[]
\`\`\`

제너레이터 표현식은 한 번 소비되면 다시 사용할 수 없습니다. 첫 번째 \`list(values)\`에서 모든 값이 소비되었기 때문에 두 번째 \`list(values)\`는 빈 리스트를 반환합니다.

---

### 문제 4 정답

\`\`\`python
class SimpleCounter:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration

        value = self.current
        self.current += 1
        return value

counter = SimpleCounter(1, 3)

for number in counter:
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

\`__iter__()\`는 iterator 자신을 반환합니다. \`__next__()\`는 현재 값을 반환하고 다음 호출을 위해 \`current\`를 1 증가시킵니다. 끝값을 넘으면 \`StopIteration\`을 발생시켜 반복을 종료합니다.

---

### 문제 5 정답

\`\`\`python
def even_numbers(start, end):
    current = start

    while current <= end:
        if current % 2 == 0:
            yield current

        current += 1

for number in even_numbers(1, 10):
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2
4
6
8
10
\`\`\`

\`yield\`를 사용했기 때문에 \`even_numbers()\`는 제너레이터 함수입니다. 짝수일 때만 값을 반환합니다.

---

### 문제 6 정답

\`\`\`python
numbers = [3, 10, 15, 2, 20]

total = sum(number * number for number in numbers if number >= 10)

print(total)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
725
\`\`\`

10 이상인 값은 \`10\`, \`15\`, \`20\`입니다. 각각 제곱하면 \`100\`, \`225\`, \`400\`이고 합계는 \`725\`입니다.

여기서는 대괄호가 아니라 제너레이터 표현식을 사용했습니다. 따라서 중간 리스트를 만들지 않습니다.

---

### 문제 7 정답

\`\`\`python
def flatten_once(items):
    for item in items:
        yield from item

nested = [["a", "b"], ["c", "d"], ["e"]]

for value in flatten_once(nested):
    print(value)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
a
b
c
d
e
\`\`\`

\`yield from item\`은 \`item\`에 들어 있는 값을 하나씩 반환합니다. 여기서는 각 \`item\`이 리스트이므로 내부 리스트의 값이 차례대로 나옵니다.

---

### 문제 8 정답

\`\`\`python
from itertools import count, islice

numbers = count(1)
first_ten = list(islice(numbers, 10))

print(first_ten)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
\`\`\`

\`count(1)\`은 1부터 시작하는 무한 iterator입니다. \`islice(numbers, 10)\`을 사용하면 앞의 10개만 가져올 수 있습니다.

---

### 문제 9 정답

\`\`\`python
def filter_error_logs(logs):
    for log in logs:
        if "ERROR" in log:
            yield log

logs = [
    "INFO start",
    "WARNING slow response",
    "ERROR failed to connect",
    "INFO end",
    "ERROR timeout",
]

for log in filter_error_logs(logs):
    print(log)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
ERROR failed to connect
ERROR timeout
\`\`\`

이 함수는 로그 목록을 순회하면서 \`ERROR\`가 포함된 줄만 반환합니다. 리스트뿐 아니라 파일에서 읽은 줄 목록이나 다른 iterator도 전달할 수 있습니다.

---

### 문제 10 정답 예시

1. 학생 20명의 이름을 정렬하고 여러 번 출력해야 한다.

리스트가 더 적합합니다. 데이터 크기가 작고, 정렬이 필요하며, 여러 번 반복해야 하기 때문입니다.

2. 5GB 로그 파일에서 \`ERROR\`가 포함된 줄만 찾아야 한다.

제너레이터가 더 적합합니다. 파일 전체를 메모리에 올리지 않고 한 줄씩 처리해야 하기 때문입니다.

3. API에서 페이지 단위로 데이터를 가져와 바로 파일에 저장해야 한다.

제너레이터가 더 적합합니다. 데이터를 페이지 단위로 받아 하나씩 저장하면 전체 데이터를 메모리에 보관할 필요가 없습니다.

4. 상품 5개의 가격을 인덱스로 접근해 수정해야 한다.

리스트가 더 적합합니다. 데이터가 작고, 인덱스 접근과 수정이 필요하기 때문입니다.

---

## 다음 장으로

이번 장에서는 반복을 깊게 다루었습니다. \`for\` 문의 내부 구조를 이해하고, 값을 하나씩 생성하는 제너레이터를 배웠습니다. 이 내용은 다음 장인 **데코레이터**와도 연결됩니다.

데코레이터는 함수를 감싸서 기능을 확장하는 문법입니다. 제너레이터에서 \`yield\`가 함수의 실행 흐름을 특별하게 바꾸었다면, 데코레이터는 함수 호출 전후에 새로운 동작을 추가합니다. 다음 장에서는 함수를 더 유연하게 다루는 또 하나의 중요한 도구인 데코레이터를 배웁니다.
`;export{e as default};