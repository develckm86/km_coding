var e=`<!-- 원본: python_basic_chapter_8_book.md / 세부 장: 8-5 -->

# 8.5 자주 쓰는 내장 함수

모듈은 \`import\`해서 사용하는 기능입니다. 하지만 파이썬에는 \`import\` 없이 바로 사용할 수 있는 함수도 있습니다. 이런 함수를 **내장 함수**라고 합니다.

예를 들어 \`print()\`, \`len()\`, \`type()\`은 별도로 import하지 않아도 사용할 수 있습니다.

\`\`\`python
print("안녕하세요")
print(len("Python"))
print(type(10))
\`\`\`

이 절에서는 실무에서 자주 쓰는 내장 함수를 정리합니다.

---

### 8.5.1 자료형 확인과 변환 함수

가장 먼저 볼 함수는 자료형 확인과 변환에 사용하는 함수입니다.

| 함수 | 설명 |
|---|---|
| \`type()\` | 값의 자료형 확인 |
| \`isinstance()\` | 특정 자료형인지 확인 |
| \`int()\` | 정수로 변환 |
| \`float()\` | 실수로 변환 |
| \`str()\` | 문자열로 변환 |
| \`bool()\` | 불리언으로 변환 |
| \`list()\` | 리스트로 변환 |
| \`tuple()\` | 튜플로 변환 |
| \`dict()\` | 딕셔너리로 변환 |
| \`set()\` | 집합으로 변환 |

\`type()\`은 값의 자료형을 확인할 때 사용합니다.

\`\`\`python
print(type("Python"))
print(type(10))
print(type(3.14))
print(type(True))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
\`\`\`

\`isinstance()\`는 값이 특정 자료형인지 확인할 때 사용합니다.

\`\`\`python
value = 10

print(isinstance(value, int))
print(isinstance(value, str))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

실무에서는 입력값이나 함수 인자의 자료형을 확인할 때 사용할 수 있습니다.

\`\`\`python
def calculate_total(price, quantity):
    if not isinstance(price, int):
        raise TypeError("price는 정수여야 합니다.")
    if not isinstance(quantity, int):
        raise TypeError("quantity는 정수여야 합니다.")
    return price * quantity
\`\`\`

자료형 변환 함수도 자주 사용합니다.

\`\`\`python
price_text = "30000"
price = int(price_text)

rate_text = "0.1"
rate = float(rate_text)

message = str(price)
\`\`\`

입력값, CSV 데이터, API 응답 데이터는 문자열로 들어오는 경우가 많기 때문에 필요한 자료형으로 변환하는 과정이 중요합니다.

---

### 8.5.2 반복과 순회 함수

반복문과 함께 자주 사용하는 내장 함수도 있습니다.

| 함수 | 설명 |
|---|---|
| \`range()\` | 정해진 범위의 숫자 생성 |
| \`enumerate()\` | 인덱스와 값을 함께 반환 |
| \`zip()\` | 여러 반복 가능한 데이터를 묶음 |

\`range()\`는 정해진 횟수만큼 반복할 때 사용합니다.

\`\`\`python
for number in range(1, 6):
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

\`enumerate()\`는 리스트를 반복하면서 인덱스와 값을 함께 사용하고 싶을 때 유용합니다.

\`\`\`python
names = ["민수", "지영", "철수"]

for index, name in enumerate(names):
    print(index, name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
0 민수
1 지영
2 철수
\`\`\`

번호를 1부터 시작하고 싶다면 두 번째 인자에 시작값을 줄 수 있습니다.

\`\`\`python
names = ["민수", "지영", "철수"]

for index, name in enumerate(names, start=1):
    print(index, name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1 민수
2 지영
3 철수
\`\`\`

\`zip()\`은 여러 리스트를 같은 위치끼리 묶을 때 사용합니다.

\`\`\`python
names = ["키보드", "마우스", "모니터"]
prices = [30000, 15000, 200000]

for name, price in zip(names, prices):
    print(name, price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

실무에서는 상품명 목록과 가격 목록, 이름 목록과 이메일 목록처럼 서로 대응되는 데이터를 묶을 때 사용할 수 있습니다.

---

### 8.5.3 집계 함수

여러 데이터에서 개수, 합계, 최댓값, 최솟값을 구할 때는 다음 내장 함수를 자주 사용합니다.

| 함수 | 설명 |
|---|---|
| \`len()\` | 길이 또는 개수 |
| \`sum()\` | 합계 |
| \`min()\` | 최솟값 |
| \`max()\` | 최댓값 |

\`\`\`python
prices = [30000, 15000, 200000]

print(len(prices))
print(sum(prices))
print(min(prices))
print(max(prices))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
3
245000
15000
200000
\`\`\`

\`len()\`은 문자열, 리스트, 튜플, 딕셔너리, 집합 등 다양한 컬렉션에 사용할 수 있습니다.

\`\`\`python
print(len("Python"))
print(len([10, 20, 30]))
print(len({"name": "민수", "age": 30}))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
6
3
2
\`\`\`

실무에서는 다음과 같은 상황에서 자주 사용합니다.

- 고객 수 구하기
- 주문 건수 구하기
- 매출 합계 구하기
- 가장 높은 점수 찾기
- 가장 낮은 가격 찾기

---

### 8.5.4 정렬과 판단 함수

\`sorted()\`는 정렬된 새 리스트를 반환합니다.

\`\`\`python
numbers = [3, 1, 4, 2]

sorted_numbers = sorted(numbers)

print(sorted_numbers)
print(numbers)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
[3, 1, 4, 2]
\`\`\`

\`sorted()\`는 원본 리스트를 바꾸지 않습니다. 원본 리스트 자체를 바꾸고 싶다면 리스트의 \`sort()\` 메서드를 사용합니다.

딕셔너리 리스트를 특정 기준으로 정렬할 수도 있습니다.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

print(sorted_products)
\`\`\`

\`any()\`는 여러 값 중 하나라도 참이면 \`True\`를 반환합니다.

\`\`\`python
values = [False, False, True]

print(any(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

\`all()\`은 모든 값이 참일 때만 \`True\`를 반환합니다.

\`\`\`python
values = [True, True, True]

print(all(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

실무에서는 입력값 검증에 유용합니다.

\`\`\`python
required_values = ["김민수", "minsu@example.com", "VIP"]

if all(required_values):
    print("모든 필수 값이 입력되었습니다.")
else:
    print("비어 있는 값이 있습니다.")
\`\`\`

하나라도 조건에 맞는 데이터가 있는지 확인할 수도 있습니다.

\`\`\`python
orders = [5000, 12000, 8000, 30000]

has_large_order = any(order >= 30000 for order in orders)

print(has_large_order)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

---

### 8.5.5 입출력 관련 함수

입출력과 관련된 대표 내장 함수는 다음과 같습니다.

| 함수 | 설명 |
|---|---|
| \`print()\` | 화면에 출력 |
| \`input()\` | 사용자 입력 받기 |
| \`open()\` | 파일 열기 |

\`print()\`는 값을 화면에 출력합니다.

\`\`\`python
name = "민수"
print("안녕하세요", name)
\`\`\`

\`input()\`은 사용자 입력을 받습니다.

\`\`\`python
name = input("이름을 입력하세요: ")
print(name)
\`\`\`

\`input()\`의 결과는 항상 문자열입니다. 숫자로 사용하려면 변환해야 합니다.

\`\`\`python
age_text = input("나이를 입력하세요: ")
age = int(age_text)

print(age + 1)
\`\`\`

\`open()\`은 파일을 열 때 사용합니다.

\`\`\`python
file = open("memo.txt", "w", encoding="utf-8")
file.write("안녕하세요")
file.close()
\`\`\`

파일 처리는 실수하면 파일이 덮어쓰이거나 데이터가 손상될 수 있으므로 10장에서 더 자세히 배웁니다. 실무에서는 보통 \`with\` 문과 함께 사용합니다.

\`\`\`python
with open("memo.txt", "w", encoding="utf-8") as file:
    file.write("안녕하세요")
\`\`\`

---

### 8.5.6 내장 함수를 사용할 때의 주의점

내장 함수 이름을 변수명으로 사용하지 않는 것이 좋습니다.

예를 들어 다음 코드는 좋지 않습니다.

\`\`\`python
list = [1, 2, 3]
print(list)
\`\`\`

이렇게 작성하면 원래 내장 함수 \`list()\`를 사용하기 어려워질 수 있습니다.

\`\`\`python
list = [1, 2, 3]

numbers = list("123")
\`\`\`

위 코드는 에러가 발생합니다. \`list\`라는 이름에 이미 리스트 값이 저장되어 있기 때문입니다.

다음과 같은 이름은 변수명으로 사용하지 않는 것이 좋습니다.

\`\`\`text
list
str
int
dict
set
sum
min
max
input
open
\`\`\`

대신 의미가 분명한 이름을 사용합니다.

\`\`\`python
numbers = [1, 2, 3]
user_name = "민수"
total_price = 30000
\`\`\`

내장 함수는 편리하지만, 이름을 덮어쓰지 않도록 주의해야 합니다.

---
`;export{e as default};