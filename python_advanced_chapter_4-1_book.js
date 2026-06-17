var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-1 -->

# 4.1 반복 가능한 객체

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
`;export{e as default};