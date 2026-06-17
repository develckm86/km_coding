var e=`<!-- 원본: python_advanced_chapter_4_book.md / 세부 장: 4-4 -->

# 4.4 제너레이터 표현식

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
`;export{e as default};