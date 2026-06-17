var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-2 -->

# 4.2 이터레이터 직접 만들기

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
`;export{e as default};