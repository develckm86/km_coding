var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-6 -->

# 4.6 \`itertools\` 활용

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
`;export{e as default};