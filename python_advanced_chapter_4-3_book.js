var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-3 -->

# 4.3 제너레이터 함수

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
`;export{e as default};