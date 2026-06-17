var e=`<!-- 원본: python_basic_chapter_4_book.md / 세부 장: 4-3 -->

# 4.3 리스트

## 리스트란 무엇인가

리스트는 여러 값을 순서대로 저장하는 자료구조이다. 파이썬에서 가장 많이 사용하는 컬렉션 자료형 중 하나이다.

리스트의 특징은 다음과 같다.

- 여러 값을 하나의 변수에 저장할 수 있다.
- 순서가 있다.
- 인덱스로 값에 접근할 수 있다.
- 값을 추가, 수정, 삭제할 수 있다.
- 같은 값이 여러 번 들어갈 수 있다.

리스트는 대괄호 \`[]\`를 사용해 만든다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
\`\`\`

\`products\`에는 세 개의 문자열이 순서대로 들어 있다.

## 리스트 선언법

빈 리스트는 다음처럼 만든다.

\`\`\`python
items = []
\`\`\`

값이 있는 리스트는 대괄호 안에 값을 쉼표로 구분해 작성한다.

\`\`\`python
numbers = [10, 20, 30]
names = ["김민수", "이지영", "박철수"]
\`\`\`

리스트에는 여러 자료형을 함께 넣을 수도 있다.

\`\`\`python
mixed = ["김민수", 25, True]
\`\`\`

하지만 실무에서는 한 리스트에는 같은 성격의 데이터를 넣는 것이 좋다. 이름 목록이면 이름만, 가격 목록이면 가격만 넣는 것이 코드를 이해하기 쉽다.

\`\`\`python
prices = [12000, 35000, 8000]
\`\`\`

리스트 안에 리스트를 넣을 수도 있다. 이것을 중첩 리스트라고 한다.

\`\`\`python
scores = [
    [90, 80, 70],
    [100, 95, 90],
    [60, 75, 85]
]
\`\`\`

이런 구조는 표 형태의 데이터를 표현할 때 사용할 수 있다.

## 리스트 인덱싱

리스트는 순서가 있는 자료구조이므로 인덱스를 사용해 특정 값에 접근할 수 있다. 인덱스는 0부터 시작한다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

print(products[0])
print(products[1])
print(products[2])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
키보드
마우스
모니터
\`\`\`

첫 번째 값의 인덱스는 0이다. 초보자가 자주 하는 실수는 첫 번째 값의 인덱스를 1이라고 생각하는 것이다.

음수 인덱스를 사용하면 뒤에서부터 값을 가져올 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

print(products[-1])
print(products[-2])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
모니터
마우스
\`\`\`

\`-1\`은 마지막 값을 의미하고, \`-2\`는 뒤에서 두 번째 값을 의미한다.

존재하지 않는 인덱스에 접근하면 \`IndexError\`가 발생한다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
print(products[3])
\`\`\`

\`products\`에는 인덱스 0, 1, 2만 존재한다. 인덱스 3은 없으므로 에러가 발생한다.

## 리스트 슬라이싱

슬라이싱은 리스트에서 일부 구간을 잘라내는 문법이다.

\`\`\`python
리스트[시작:끝]
\`\`\`

시작 인덱스는 포함되고, 끝 인덱스는 포함되지 않는다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[20, 30, 40]
\`\`\`

인덱스 1부터 인덱스 4 전까지 가져온다. 따라서 인덱스 1, 2, 3에 해당하는 값이 결과에 포함된다.

시작 인덱스를 생략하면 처음부터 가져온다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]
print(numbers[:3])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 20, 30]
\`\`\`

끝 인덱스를 생략하면 끝까지 가져온다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]
print(numbers[2:])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[30, 40, 50]
\`\`\`

간격을 지정할 수도 있다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]
print(numbers[::2])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 30, 50]
\`\`\`

\`[::-1]\`을 사용하면 리스트를 역순으로 가져올 수 있다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]
print(numbers[::-1])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[50, 40, 30, 20, 10]
\`\`\`

## 리스트 값 추가

리스트에 값을 추가하는 대표적인 메서드는 \`append()\`, \`extend()\`, \`insert()\`이다.

\`append()\`는 리스트의 끝에 값을 하나 추가한다.

\`\`\`python
items = ["A", "B"]
items.append("C")

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A', 'B', 'C']
\`\`\`

\`extend()\`는 다른 리스트의 여러 값을 한 번에 추가한다.

\`\`\`python
items = ["A", "B"]
items.extend(["C", "D"])

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A', 'B', 'C', 'D']
\`\`\`

\`insert()\`는 원하는 위치에 값을 추가한다.

\`\`\`python
items = ["A", "C"]
items.insert(1, "B")

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A', 'B', 'C']
\`\`\`

\`insert(1, "B")\`는 인덱스 1 위치에 \`"B"\`를 넣는다는 뜻이다.

\`append()\`와 \`extend()\`는 자주 헷갈린다.

\`\`\`python
items = ["A", "B"]
items.append(["C", "D"])

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A', 'B', ['C', 'D']]
\`\`\`

\`append()\`는 값을 하나 추가하기 때문에 리스트 자체가 하나의 값으로 들어간다.

\`\`\`python
items = ["A", "B"]
items.extend(["C", "D"])

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A', 'B', 'C', 'D']
\`\`\`

\`extend()\`는 리스트 안의 값을 하나씩 꺼내 기존 리스트에 붙인다.

## 리스트 값 수정

리스트는 수정 가능한 자료구조이다. 인덱스를 사용해 특정 위치의 값을 바꿀 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
products[1] = "무선 마우스"

print(products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['키보드', '무선 마우스', '모니터']
\`\`\`

슬라이싱을 사용하면 여러 값을 한 번에 수정할 수도 있다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers[1:3] = [20, 30]

print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 20, 30, 4, 5]
\`\`\`

## 리스트 값 삭제

리스트에서 값을 삭제하는 방법은 여러 가지가 있다.

\`remove()\`는 값을 기준으로 삭제한다.

\`\`\`python
items = ["A", "B", "C"]
items.remove("B")

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['A', 'C']
\`\`\`

\`pop()\`은 인덱스를 기준으로 값을 삭제하고, 삭제한 값을 반환한다.

\`\`\`python
items = ["A", "B", "C"]
removed_item = items.pop(1)

print(removed_item)
print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
B
['A', 'C']
\`\`\`

인덱스를 생략하면 마지막 값을 삭제한다.

\`\`\`python
items = ["A", "B", "C"]
removed_item = items.pop()

print(removed_item)
print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
C
['A', 'B']
\`\`\`

\`clear()\`는 리스트의 모든 값을 삭제한다.

\`\`\`python
items = ["A", "B", "C"]
items.clear()

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[]
\`\`\`

\`del\`은 인덱스나 슬라이싱을 사용해 값을 삭제할 수 있다.

\`\`\`python
items = ["A", "B", "C"]
del items[0]

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['B', 'C']
\`\`\`

## 리스트 검색과 개수 확인

리스트에 특정 값이 있는지 확인할 때는 \`in\`을 사용할 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

print("마우스" in products)
print("스피커" in products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
\`\`\`

값이 없는지 확인할 때는 \`not in\`을 사용할 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
print("스피커" not in products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
\`\`\`

\`index()\`는 특정 값의 인덱스를 찾는다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
print(products.index("마우스"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
1
\`\`\`

단, 없는 값을 \`index()\`로 찾으면 에러가 발생한다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
print(products.index("스피커"))
\`\`\`

이런 경우에는 먼저 \`in\`으로 포함 여부를 확인하는 것이 안전하다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

if "스피커" in products:
    print(products.index("스피커"))
else:
    print("상품이 없습니다.")
\`\`\`

\`count()\`는 특정 값이 몇 번 등장하는지 세어 준다.

\`\`\`python
numbers = [1, 2, 2, 3, 3, 3]
print(numbers.count(3))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
3
\`\`\`

## 리스트 정렬과 순서 변경

리스트를 정렬할 때는 \`sort()\` 또는 \`sorted()\`를 사용할 수 있다.

\`sort()\`는 원본 리스트를 직접 변경한다.

\`\`\`python
numbers = [3, 1, 4, 2]
numbers.sort()

print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4]
\`\`\`

내림차순 정렬은 \`reverse=True\`를 사용한다.

\`\`\`python
numbers = [3, 1, 4, 2]
numbers.sort(reverse=True)

print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[4, 3, 2, 1]
\`\`\`

\`sorted()\`는 원본을 바꾸지 않고 정렬된 새 리스트를 반환한다.

\`\`\`python
numbers = [3, 1, 4, 2]
sorted_numbers = sorted(numbers)

print(numbers)
print(sorted_numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[3, 1, 4, 2]
[1, 2, 3, 4]
\`\`\`

\`reverse()\`는 리스트의 순서를 뒤집는다. 정렬하는 것이 아니라 현재 순서를 반대로 바꾼다.

\`\`\`python
items = ["A", "B", "C"]
items.reverse()

print(items)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['C', 'B', 'A']
\`\`\`

\`reversed()\`는 뒤집힌 순서로 반복할 때 사용할 수 있다.

\`\`\`python
items = ["A", "B", "C"]

for item in reversed(items):
    print(item)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
C
B
A
\`\`\`

## 리스트 복사

리스트를 복사할 때는 주의해야 한다.

\`\`\`python
a = [1, 2, 3]
b = a

b.append(4)

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4]
[1, 2, 3, 4]
\`\`\`

\`b = a\`는 리스트를 복사한 것이 아니라 같은 리스트를 함께 가리키는 것이다. 그래서 \`b\`를 수정하면 \`a\`도 바뀐 것처럼 보인다.

리스트를 실제로 복사하려면 \`copy()\`를 사용할 수 있다.

\`\`\`python
a = [1, 2, 3]
b = a.copy()

b.append(4)

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3]
[1, 2, 3, 4]
\`\`\`

슬라이싱으로도 복사할 수 있다.

\`\`\`python
a = [1, 2, 3]
b = a[:]
\`\`\`

단, 중첩 리스트를 복사할 때는 더 주의해야 한다.

\`\`\`python
a = [[1, 2], [3, 4]]
b = a.copy()

b[0][0] = 100

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[[100, 2], [3, 4]]
[[100, 2], [3, 4]]
\`\`\`

겉 리스트는 복사되었지만 안쪽 리스트는 여전히 공유된다. 이것을 얕은 복사라고 한다. 중첩 구조를 깊게 복사해야 하는 상황은 이후 실무 코드에서 더 자세히 다룬다.

## 리스트 반복문

리스트는 반복문과 함께 사용할 때 가장 강력하다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

for product in products:
    print(product)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
키보드
마우스
모니터
\`\`\`

인덱스와 값을 함께 사용하고 싶다면 \`enumerate()\`를 사용할 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

for index, product in enumerate(products):
    print(index, product)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0 키보드
1 마우스
2 모니터
\`\`\`

번호를 1부터 출력하고 싶다면 \`start=1\`을 지정할 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]

for index, product in enumerate(products, start=1):
    print(index, product)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
1 키보드
2 마우스
3 모니터
\`\`\`

## 리스트 실무 예제

상품 가격 목록에서 30,000원 이상인 가격만 모아 보자.

\`\`\`python
prices = [12000, 45000, 30000, 8000, 70000]
expensive_prices = []

for price in prices:
    if price >= 30000:
        expensive_prices.append(price)

print(expensive_prices)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[45000, 30000, 70000]
\`\`\`

이번에는 가격 합계를 구해 보자.

\`\`\`python
prices = [12000, 45000, 30000, 8000, 70000]
total = 0

for price in prices:
    total += price

print(total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
165000
\`\`\`

리스트는 고객 목록, 상품 목록, 파일 목록, 점수 목록처럼 같은 성격의 데이터를 순서대로 처리할 때 자주 사용한다.

---
`;export{e as default};