var e=`<!-- 원본: python_basic_chapter_12_book.md / 세부 장: 12-5 -->

# 12.5 이터레이터와 제너레이터 기초

### 12.5.1 iterable이란 무엇인가

이터레이터와 제너레이터는 처음 보면 어렵게 느껴질 수 있습니다. 하지만 우리는 이미 이 개념을 사용해왔습니다.

\`\`\`python
names = ["홍길동", "김민수", "이지영"]

for name in names:
    print(name)
\`\`\`

리스트는 \`for\` 문에서 하나씩 꺼내 사용할 수 있습니다. 이렇게 반복할 수 있는 객체를 **iterable**이라고 합니다.

대표적인 iterable은 다음과 같습니다.

\`\`\`text
- 리스트
- 튜플
- 문자열
- 딕셔너리
- 집합
- range 객체
- 파일 객체
\`\`\`

문자열도 iterable입니다.

\`\`\`python
text = "Python"

for char in text:
    print(char)
\`\`\`

실행하면 문자가 하나씩 출력됩니다.

딕셔너리도 iterable입니다.

\`\`\`python
customer = {
    "name": "홍길동",
    "email": "hong@example.com"
}

for key in customer:
    print(key)
\`\`\`

딕셔너리를 그대로 반복하면 key가 하나씩 나옵니다.

---

### 12.5.2 iterator란 무엇인가

iterable은 반복할 수 있는 객체입니다. iterator는 실제로 값을 하나씩 꺼내는 객체입니다.

파이썬에서는 \`iter()\` 함수로 iterator를 만들고, \`next()\` 함수로 값을 하나씩 꺼낼 수 있습니다.

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

더 이상 꺼낼 값이 없을 때 \`next()\`를 호출하면 \`StopIteration\` 예외가 발생합니다.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))  # StopIteration 발생
\`\`\`

\`for\` 문은 내부적으로 이런 과정을 자동으로 처리합니다. 즉, 다음 코드는

\`\`\`python
for number in numbers:
    print(number)
\`\`\`

대략 다음 흐름으로 동작한다고 이해할 수 있습니다.

\`\`\`text
1. numbers에서 iterator를 만든다.
2. next()로 값을 하나씩 꺼낸다.
3. 값이 더 이상 없으면 반복을 종료한다.
\`\`\`

초보 단계에서는 iterator를 직접 만들 일이 많지는 않습니다. 하지만 이 개념을 이해하면 파일 처리, 제너레이터, pandas의 일부 동작을 이해하는 데 도움이 됩니다.

---

### 12.5.3 파일 객체와 iterator

파일을 한 줄씩 읽을 때도 iterator 개념이 사용됩니다.

\`\`\`python
with open("sample.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())
\`\`\`

이 코드는 파일 전체를 한 번에 메모리에 올리지 않고 한 줄씩 읽습니다. 파일이 아주 클 때 특히 유용합니다.

다음처럼 전체를 한 번에 읽는 방식과 비교해봅시다.

\`\`\`python
with open("sample.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    print(line.strip())
\`\`\`

\`readlines()\`는 모든 줄을 리스트로 읽습니다. 파일이 작으면 문제가 없지만, 파일이 매우 크면 메모리를 많이 사용할 수 있습니다.

반면 파일 객체를 직접 반복하면 한 줄씩 처리할 수 있습니다.

\`\`\`python
with open("large_log.txt", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

이 방식은 큰 로그 파일에서 특정 에러 줄만 찾을 때 유용합니다.

---

### 12.5.4 제너레이터란 무엇인가

제너레이터는 값을 한 번에 모두 만들지 않고, 필요할 때 하나씩 만들어내는 객체입니다.

일반 함수는 \`return\`을 만나면 값을 반환하고 종료합니다.

\`\`\`python
def get_numbers():
    return [1, 2, 3]


numbers = get_numbers()
print(numbers)
\`\`\`

제너레이터 함수는 \`return\` 대신 \`yield\`를 사용합니다.

\`\`\`python
def generate_numbers():
    yield 1
    yield 2
    yield 3


numbers = generate_numbers()

for number in numbers:
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

\`yield\`는 값을 하나 돌려준 뒤 함수의 상태를 잠시 멈춰둡니다. 다음 값을 요청하면 멈춘 지점부터 다시 실행합니다.

---

### 12.5.5 \`yield\` 이해하기

다음 코드를 봅시다.

\`\`\`python
def generate_steps():
    print("첫 번째 단계")
    yield 1

    print("두 번째 단계")
    yield 2

    print("세 번째 단계")
    yield 3


steps = generate_steps()

print(next(steps))
print(next(steps))
print(next(steps))
\`\`\`

실행 흐름은 다음과 같습니다.

\`\`\`text
1. generate_steps()를 호출해도 함수 본문이 바로 실행되지는 않는다.
2. next(steps)를 호출하면 첫 번째 yield까지 실행된다.
3. 다시 next(steps)를 호출하면 멈춘 지점부터 다음 yield까지 실행된다.
4. 값이 더 이상 없으면 반복이 끝난다.
\`\`\`

제너레이터는 처음에는 낯설지만 핵심은 간단합니다.

\`\`\`text
return: 값을 반환하고 함수 종료
yield: 값을 하나 반환하고 함수 상태를 잠시 멈춤
\`\`\`

---

### 12.5.6 제너레이터가 필요한 이유

리스트는 모든 값을 한 번에 만들어 저장합니다.

\`\`\`python
numbers = []

for number in range(1, 1000001):
    numbers.append(number)
\`\`\`

이 코드는 1부터 1,000,000까지의 숫자를 리스트에 모두 저장합니다. 데이터가 아주 크면 메모리를 많이 사용합니다.

제너레이터를 사용하면 값을 필요한 순간에 하나씩 만들 수 있습니다.

\`\`\`python
def generate_numbers(limit: int):
    number = 1

    while number <= limit:
        yield number
        number += 1


for number in generate_numbers(1000000):
    if number > 5:
        break
    print(number)
\`\`\`

이 코드는 1,000,000개의 숫자를 모두 리스트로 만들지 않습니다. 필요한 값만 하나씩 생성합니다.

제너레이터는 다음 상황에서 유용합니다.

\`\`\`text
- 큰 파일을 한 줄씩 처리할 때
- 많은 데이터를 한 번에 만들 필요가 없을 때
- 필요한 만큼만 데이터를 생성하고 싶을 때
- 메모리 사용량을 줄이고 싶을 때
\`\`\`

---

### 12.5.7 제너레이터 표현식

리스트 컴프리헨션은 리스트를 만듭니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = [number * number for number in numbers]

print(squares)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

제너레이터 표현식은 대괄호 \`[]\` 대신 소괄호 \`()\`를 사용합니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = (number * number for number in numbers)

print(squares)
\`\`\`

이 코드는 리스트를 바로 만들지 않고 제너레이터 객체를 만듭니다. 값을 사용하려면 반복해야 합니다.

\`\`\`python
for square in squares:
    print(square)
\`\`\`

리스트 컴프리헨션과 제너레이터 표현식을 비교하면 다음과 같습니다.

| 구분 | 리스트 컴프리헨션 | 제너레이터 표현식 |
|---|---|---|
| 괄호 | \`[]\` | \`()\` |
| 결과 | 리스트 | 제너레이터 |
| 값 생성 | 한 번에 생성 | 필요할 때 하나씩 생성 |
| 메모리 | 더 많이 사용할 수 있음 | 더 적게 사용할 수 있음 |
| 반복 | 여러 번 가능 | 보통 한 번 소비됨 |

제너레이터는 한 번 소비하면 다시 처음부터 사용할 수 없습니다.

\`\`\`python
numbers = (number for number in [1, 2, 3])

for number in numbers:
    print(number)

for number in numbers:
    print(number)  # 이미 소비되어 출력되지 않음
\`\`\`

다시 사용해야 한다면 제너레이터를 새로 만들어야 합니다.

---

### 12.5.8 실무 예제: 큰 로그 파일 처리하기

로그 파일에서 에러가 있는 줄만 찾아야 한다고 해봅시다.

\`\`\`python
def read_error_lines(file_path: str):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if "ERROR" in line:
                yield line.strip()
\`\`\`

이 함수는 에러 줄을 한 번에 모두 리스트로 만들지 않습니다. 에러 줄을 발견할 때마다 하나씩 반환합니다.

사용 예시는 다음과 같습니다.

\`\`\`python
for error_line in read_error_lines("app.log"):
    print(error_line)
\`\`\`

에러 줄이 많거나 파일이 커도 한 줄씩 처리할 수 있습니다.

필요하다면 처음 10개만 볼 수도 있습니다.

\`\`\`python
count = 0

for error_line in read_error_lines("app.log"):
    print(error_line)
    count += 1

    if count >= 10:
        break
\`\`\`

이 방식은 큰 파일을 분석할 때 유용합니다.

---

### 12.5.9 이터레이터와 제너레이터를 처음 배울 때의 기준

이터레이터와 제너레이터는 처음부터 깊게 다 이해하려고 하면 어렵습니다. 이 장에서는 다음 정도를 기억하면 충분합니다.

\`\`\`text
- iterable은 for 문으로 반복할 수 있는 객체다.
- iterator는 값을 하나씩 꺼내는 객체다.
- iter()로 iterator를 만들 수 있다.
- next()로 값을 하나씩 꺼낼 수 있다.
- generator는 값을 필요할 때 하나씩 만들어낸다.
- yield는 값을 반환하고 함수 상태를 잠시 멈춘다.
- 큰 데이터 처리에는 제너레이터가 유용할 수 있다.
\`\`\`

실무에서 가장 먼저 활용할 만한 곳은 파일 처리입니다. 큰 파일을 한 줄씩 읽고, 조건에 맞는 줄만 처리하는 방식은 제너레이터 개념과 잘 맞습니다.

---
`;export{e as default};