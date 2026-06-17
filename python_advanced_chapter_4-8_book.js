var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-8 -->

# 4.8 이터레이터와 제너레이터를 사용할 때의 기준

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