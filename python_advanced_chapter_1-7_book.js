var e=`<!-- 원본: python_advanced_chapter_1_book.md / 세부 장: 1-7 -->

# 1.7 파이썬다운 코드란?

파이썬에는 “파이썬답다”는 표현이 있다. 영어로는 Pythonic이라고도 한다. 파이썬다운 코드는 파이썬의 문법과 철학을 자연스럽게 활용한 코드를 의미한다.

파이썬다운 코드는 무조건 짧은 코드가 아니다. 오히려 너무 짧아서 이해하기 어려운 코드는 좋은 코드가 아닐 수 있다.

파이썬다운 코드는 다음과 같은 방향을 가진다.

\`\`\`text
명시적인 코드
읽기 쉬운 코드
표준 기능을 적절히 활용한 코드
불필요한 복잡성을 피하는 코드
반복 가능한 구조를 자연스럽게 사용하는 코드
\`\`\`

---

### 1.7.1 명시적인 코드

파이썬에서는 의도가 분명한 코드를 선호한다.

예를 들어 비어 있는 리스트를 확인할 때 다음처럼 작성할 수 있다.

\`\`\`python
items = []

if len(items) == 0:
    print("비어 있습니다.")
\`\`\`

하지만 파이썬에서는 빈 리스트가 거짓처럼 평가되므로 다음과 같이 쓸 수 있다.

\`\`\`python
items = []

if not items:
    print("비어 있습니다.")
\`\`\`

두 번째 방식은 파이썬에서 자주 쓰이는 표현이다. 다만 초보자에게는 처음에 낯설 수 있으므로, 수업에서는 왜 이렇게 동작하는지 함께 이해해야 한다.

---

### 1.7.2 반복 가능한 구조 활용

파이썬은 반복 가능한 객체를 자연스럽게 다룬다.

아래 코드는 인덱스를 사용해 리스트를 반복한다.

\`\`\`python
names = ["Kim", "Lee", "Park"]

for i in range(len(names)):
    print(names[i])
\`\`\`

파이썬에서는 보통 다음과 같이 직접 값을 반복한다.

\`\`\`python
names = ["Kim", "Lee", "Park"]

for name in names:
    print(name)
\`\`\`

인덱스가 꼭 필요하다면 \`enumerate()\`를 사용할 수 있다.

\`\`\`python
names = ["Kim", "Lee", "Park"]

for index, name in enumerate(names, start=1):
    print(index, name)
\`\`\`

이런 방식은 파이썬의 반복 구조를 더 자연스럽게 사용하는 예다.

---

### 1.7.3 표준 라이브러리 활용

파이썬은 표준 라이브러리가 풍부하다. 이미 잘 만들어진 기능이 있다면 직접 구현하기보다 표준 라이브러리를 활용하는 것이 좋다.

예를 들어 파일 경로를 문자열로 직접 조합하는 방식은 운영체제마다 문제가 생길 수 있다.

\`\`\`python
folder = "data"
filename = "sales.csv"
path = folder + "/" + filename
\`\`\`

\`pathlib\`을 사용하면 더 안전하고 읽기 좋다.

\`\`\`python
from pathlib import Path

folder = Path("data")
filename = "sales.csv"
path = folder / filename
\`\`\`

고급 파이썬에서는 표준 라이브러리를 적절히 활용하는 습관도 중요하게 다룬다.

---
`;export{e as default};