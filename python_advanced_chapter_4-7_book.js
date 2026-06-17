var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-7 -->

# 4.7 실무 활용

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
`;export{e as default};