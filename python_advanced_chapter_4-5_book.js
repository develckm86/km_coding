var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-5 -->

# 4.5 \`yield from\`

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
`;export{e as default};