var e=`# 4장. 자료구조와 컬렉션 자료형

## 이 장에서 배우는 것

3장에서는 조건문과 반복문을 배웠다. 조건문을 사용하면 상황에 따라 다른 코드를 실행할 수 있고, 반복문을 사용하면 여러 데이터를 차례대로 처리할 수 있다. 하지만 반복문을 제대로 활용하려면 먼저 여러 데이터를 하나로 묶어서 저장할 수 있어야 한다.

예를 들어 고객 이름이 세 명만 있다면 다음처럼 변수 세 개를 만들 수도 있다.

\`\`\`python
customer1 = "김민수"
customer2 = "이지영"
customer3 = "박철수"
\`\`\`

하지만 고객이 100명, 1,000명, 10,000명으로 늘어나면 이런 방식은 사용할 수 없다. 데이터를 하나씩 따로 저장하면 추가, 삭제, 검색, 반복 처리가 모두 어려워진다.

이럴 때 사용하는 것이 자료구조이다. 자료구조는 데이터를 저장하고 관리하는 방식이다. 파이썬에서는 여러 개의 데이터를 담기 위한 기본 자료형으로 리스트, 튜플, 딕셔너리, 집합을 제공한다. 이들을 컬렉션 자료형이라고 부르기도 한다.

이 장에서는 다음 내용을 배운다.

- 자료구조가 필요한 이유
- 컬렉션 자료형의 개념
- 리스트 \`list\`
- 튜플 \`tuple\`
- 딕셔너리 \`dict\`
- 집합 \`set\`
- 자료구조별 특징과 사용 기준
- 자료구조와 반복문을 함께 사용하는 방법

이 장을 마치면 여러 데이터를 하나의 변수로 관리하고, 상황에 맞는 자료구조를 선택할 수 있다. 이후 함수, 파일 처리, 데이터 분석, API 응답 처리에서도 자료구조는 계속 사용된다.

---

# 4.1 자료구조가 필요한 이유

## 자료구조란 무엇인가

자료구조는 데이터를 저장하고 관리하는 방식이다.

프로그래밍에서 데이터는 하나만 존재하지 않는 경우가 많다. 고객 명단, 상품 목록, 주문 내역, 시험 점수, 파일 이름, 설정값처럼 여러 개의 데이터를 함께 다루어야 하는 상황이 많다. 이때 데이터를 어떤 형태로 묶고, 어떤 방식으로 꺼내고, 어떻게 수정할지 결정해야 한다.

예를 들어 쇼핑몰의 상품 이름을 저장한다고 생각해 보자.

\`\`\`python
product1 = "키보드"
product2 = "마우스"
product3 = "모니터"
\`\`\`

상품이 세 개뿐이라면 이렇게 작성할 수도 있다. 하지만 상품이 1,000개라면 \`product1\`부터 \`product1000\`까지 변수를 만들 수는 없다. 이런 방식은 관리하기 어렵고, 반복문으로 처리하기도 불편하다.

리스트를 사용하면 여러 상품명을 하나의 변수로 관리할 수 있다.

\`\`\`python
products = ["키보드", "마우스", "모니터"]
\`\`\`

이제 상품 목록은 \`products\`라는 하나의 변수에 들어 있다. 반복문으로 하나씩 처리할 수도 있고, 새 상품을 추가하거나 기존 상품을 삭제할 수도 있다.

\`\`\`python
for product in products:
    print(product)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
키보드
마우스
모니터
\`\`\`

자료구조를 사용하면 데이터가 많아져도 일정한 방식으로 관리할 수 있다.

## 여러 데이터를 묶어서 관리해야 하는 이유

여러 데이터를 각각 다른 변수에 저장하면 다음과 같은 문제가 생긴다.

첫째, 데이터가 늘어날수록 변수 이름이 많아진다.

\`\`\`python
score1 = 90
score2 = 80
score3 = 70
score4 = 100
score5 = 85
\`\`\`

데이터가 다섯 개라면 그나마 가능하지만, 100개라면 변수를 100개 만들어야 한다.

둘째, 반복 처리가 어렵다. 위와 같이 값을 따로 저장하면 전체 점수의 합계를 구할 때 다음처럼 하나씩 더해야 한다.

\`\`\`python
total = score1 + score2 + score3 + score4 + score5
\`\`\`

반면 리스트를 사용하면 반복문으로 처리할 수 있다.

\`\`\`python
scores = [90, 80, 70, 100, 85]

total = 0
for score in scores:
    total += score

print(total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
425
\`\`\`

셋째, 데이터 추가와 삭제가 어렵다. 변수를 각각 만들면 중간에 새 데이터를 넣거나 특정 데이터를 제거하는 작업이 번거롭다. 하지만 자료구조를 사용하면 추가, 삭제, 검색, 수정 작업을 일정한 방법으로 처리할 수 있다.

## 데이터의 추가, 삭제, 검색, 수정

자료구조를 배우는 이유는 단순히 여러 값을 담기 위해서만이 아니다. 실무에서는 데이터를 계속 다룬다. 데이터를 추가하고, 삭제하고, 찾고, 수정하는 작업이 자주 발생한다.

예를 들어 고객 명단을 관리한다고 생각해 보자.

\`\`\`python
customers = ["김민수", "이지영", "박철수"]
\`\`\`

새 고객이 가입하면 데이터를 추가해야 한다.

\`\`\`python
customers.append("최유리")
print(customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['김민수', '이지영', '박철수', '최유리']
\`\`\`

탈퇴한 고객이 있으면 데이터를 삭제해야 한다.

\`\`\`python
customers.remove("박철수")
print(customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['김민수', '이지영', '최유리']
\`\`\`

특정 고객이 명단에 있는지 확인할 수도 있다.

\`\`\`python
print("김민수" in customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
\`\`\`

자료구조를 알면 이런 작업을 상황에 맞게 처리할 수 있다.

## 적절한 자료구조를 선택해야 하는 이유

모든 데이터를 리스트에 넣으면 될 것처럼 보일 수 있다. 하지만 데이터의 성격에 따라 더 적합한 자료구조가 있다.

예를 들어 순서가 중요한 데이터는 리스트가 적합하다.

\`\`\`python
orders = ["주문1", "주문2", "주문3"]
\`\`\`

변경되면 안 되는 고정 값은 튜플이 적합하다.

\`\`\`python
weekdays = ("월", "화", "수", "목", "금")
\`\`\`

이름, 이메일, 등급처럼 항목별 이름이 필요한 데이터는 딕셔너리가 적합하다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}
\`\`\`

중복을 제거해야 하는 데이터는 집합이 적합하다.

\`\`\`python
emails = {"a@example.com", "b@example.com", "a@example.com"}
print(emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'a@example.com', 'b@example.com'}
\`\`\`

집합은 중복을 허용하지 않기 때문에 같은 이메일이 하나만 남는다.

좋은 코드는 단순히 동작하는 코드가 아니다. 데이터의 성격에 맞는 자료구조를 선택하면 코드가 더 읽기 쉽고, 실수도 줄어들고, 나중에 수정하기도 쉬워진다.

## 자료구조 선택 기준

자료구조를 선택할 때는 다음 질문을 해 보면 좋다.

\`\`\`text
데이터의 순서가 중요한가?
데이터를 나중에 수정해야 하는가?
중복된 값이 허용되어야 하는가?
값을 이름으로 찾을 필요가 있는가?
중복 제거나 집합 연산이 필요한가?
\`\`\`

이 질문에 따라 사용할 자료구조가 달라진다.

순서가 있고 수정할 수 있어야 한다면 리스트를 사용한다.

\`\`\`python
todo_list = ["메일 확인", "보고서 작성", "회의 참석"]
\`\`\`

순서는 필요하지만 수정되면 안 된다면 튜플을 사용한다.

\`\`\`python
rgb_color = (255, 255, 255)
\`\`\`

이름으로 값을 찾고 싶다면 딕셔너리를 사용한다.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10
}
\`\`\`

중복 제거가 필요하면 집합을 사용한다.

\`\`\`python
unique_names = {"김민수", "이지영", "김민수"}
\`\`\`

자료구조를 잘 선택하면 이후 조건문과 반복문도 훨씬 자연스럽게 사용할 수 있다.

---

# 4.2 파이썬의 컬렉션 자료형

## 컬렉션이란 무엇인가

컬렉션은 여러 개의 데이터를 담는 자료형을 말한다. 파이썬의 대표적인 컬렉션 자료형은 다음 네 가지이다.

\`\`\`text
list   리스트
tuple  튜플
dict   딕셔너리
set    집합
\`\`\`

각 자료형은 여러 데이터를 담는다는 점은 같지만, 데이터를 관리하는 방식은 다르다. 어떤 자료형은 순서가 있고, 어떤 자료형은 순서보다 중복 제거에 집중한다. 어떤 자료형은 값을 번호로 찾고, 어떤 자료형은 이름으로 값을 찾는다.

## 리스트, 튜플, 딕셔너리, 집합 비교

다음 표는 네 가지 컬렉션 자료형의 주요 특징을 비교한 것이다.

| 자료형 | 순서 | 수정 가능 | 중복 허용 | 데이터 접근 방식 | 주요 용도 |
|---|---|---|---|---|---|
| 리스트 \`list\` | 있음 | 가능 | 허용 | 인덱스 | 순서가 있는 여러 데이터 관리 |
| 튜플 \`tuple\` | 있음 | 불가능 | 허용 | 인덱스 | 변경되면 안 되는 데이터 관리 |
| 딕셔너리 \`dict\` | 있음 | 가능 | key 중복 불가 | key | 이름으로 값을 찾는 데이터 관리 |
| 집합 \`set\` | 없음 | 가능 | 허용 안 함 | 포함 여부 | 중복 제거, 집합 연산 |

여기서 순서가 있다는 말은 데이터를 넣은 순서대로 접근할 수 있다는 뜻이다. 리스트와 튜플은 인덱스를 사용해 데이터를 꺼낼 수 있다.

\`\`\`python
items = ["A", "B", "C"]
print(items[0])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
A
\`\`\`

딕셔너리는 인덱스가 아니라 key를 사용해 값을 꺼낸다.

\`\`\`python
user = {"name": "김민수", "age": 25}
print(user["name"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
\`\`\`

집합은 순서가 없기 때문에 인덱스로 값을 꺼낼 수 없다. 대신 어떤 값이 들어 있는지 확인하거나 중복을 제거하는 데 유용하다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
print("a@example.com" in emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
\`\`\`

## 수정 가능성과 불변성

자료구조를 선택할 때 수정 가능 여부도 중요하다.

리스트는 수정할 수 있다.

\`\`\`python
numbers = [1, 2, 3]
numbers[0] = 10
print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 2, 3]
\`\`\`

튜플은 수정할 수 없다.

\`\`\`python
numbers = (1, 2, 3)
numbers[0] = 10
\`\`\`

위 코드는 에러가 발생한다. 튜플은 한 번 만들어지면 내부 값을 바꿀 수 없는 불변 자료형이기 때문이다.

불변이라는 특징은 단점만 있는 것이 아니다. 값이 바뀌면 안 되는 데이터를 튜플로 만들면 실수로 수정하는 일을 줄일 수 있다.

## 중복 허용 여부

리스트와 튜플은 중복 값을 허용한다.

\`\`\`python
numbers = [1, 1, 2, 2, 3]
print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 1, 2, 2, 3]
\`\`\`

집합은 중복을 허용하지 않는다.

\`\`\`python
numbers = {1, 1, 2, 2, 3}
print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{1, 2, 3}
\`\`\`

딕셔너리는 key가 중복될 수 없다. 같은 key를 다시 사용하면 기존 값이 새 값으로 바뀐다.

\`\`\`python
user = {
    "name": "김민수",
    "name": "이지영"
}

print(user)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '이지영'}
\`\`\`

\`name\`이라는 key가 두 번 사용되었기 때문에 마지막 값인 \`"이지영"\`이 남는다.

## 자료형별 사용 기준

자료구조를 처음 배울 때는 다음 기준으로 생각하면 된다.

순서대로 여러 데이터를 저장하고 나중에 수정해야 한다면 리스트를 사용한다.

\`\`\`python
file_names = ["report.xlsx", "memo.txt", "image.png"]
\`\`\`

순서가 있지만 수정되면 안 되는 데이터라면 튜플을 사용한다.

\`\`\`python
status_codes = ("READY", "RUNNING", "DONE")
\`\`\`

각 데이터에 이름을 붙여 관리해야 한다면 딕셔너리를 사용한다.

\`\`\`python
employee = {
    "name": "최유리",
    "department": "마케팅",
    "position": "매니저"
}
\`\`\`

중복을 제거하거나 두 그룹을 비교해야 한다면 집합을 사용한다.

\`\`\`python
old_customers = {"김민수", "이지영", "박철수"}
new_customers = {"이지영", "최유리"}

common_customers = old_customers & new_customers
print(common_customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'이지영'}
\`\`\`

자료구조는 외워서 쓰는 것이 아니라, 데이터의 성격을 보고 선택하는 것이다.

---

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

# 4.4 튜플

## 튜플이란 무엇인가

튜플은 여러 값을 순서대로 저장하는 자료구조이다. 리스트와 비슷하지만 중요한 차이가 있다. 튜플은 한 번 만들어지면 값을 수정할 수 없다.

튜플의 특징은 다음과 같다.

- 여러 값을 하나의 변수에 저장할 수 있다.
- 순서가 있다.
- 인덱스로 값에 접근할 수 있다.
- 값을 수정할 수 없다.
- 같은 값이 여러 번 들어갈 수 있다.

튜플은 소괄호 \`()\`를 사용해 만든다.

\`\`\`python
point = (10, 20)
\`\`\`

리스트는 수정 가능한 자료구조이고, 튜플은 수정할 수 없는 자료구조이다.

\`\`\`python
numbers = [1, 2, 3]
numbers[0] = 10
print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 2, 3]
\`\`\`

하지만 튜플은 수정할 수 없다.

\`\`\`python
numbers = (1, 2, 3)
numbers[0] = 10
\`\`\`

위 코드는 에러가 발생한다.

## 튜플 선언법

빈 튜플은 다음처럼 만든다.

\`\`\`python
empty = ()
\`\`\`

값이 있는 튜플은 쉼표로 값을 구분해 작성한다.

\`\`\`python
colors = ("red", "green", "blue")
\`\`\`

값이 하나인 튜플을 만들 때는 반드시 쉼표를 붙여야 한다.

\`\`\`python
single = (10,)
print(type(single))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
<class 'tuple'>
\`\`\`

쉼표가 없으면 튜플이 아니라 괄호로 묶은 값이 된다.

\`\`\`python
not_tuple = (10)
print(type(not_tuple))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
<class 'int'>
\`\`\`

튜플은 괄호 없이도 만들 수 있다.

\`\`\`python
point = 10, 20
print(point)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
(10, 20)
\`\`\`

하지만 초보 단계에서는 괄호를 붙여 명확하게 작성하는 것이 좋다.

## 튜플 인덱싱과 슬라이싱

튜플은 순서가 있으므로 리스트처럼 인덱싱과 슬라이싱을 사용할 수 있다.

\`\`\`python
colors = ("red", "green", "blue")

print(colors[0])
print(colors[-1])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
red
blue
\`\`\`

슬라이싱도 가능하다.

\`\`\`python
numbers = (10, 20, 30, 40, 50)
print(numbers[1:4])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
(20, 30, 40)
\`\`\`

튜플도 반복문으로 처리할 수 있다.

\`\`\`python
weekdays = ("월", "화", "수", "목", "금")

for day in weekdays:
    print(day)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
월
화
수
목
금
\`\`\`

## 튜플은 불변 데이터다

튜플은 불변 자료형이다. 한 번 만들어진 튜플의 값을 직접 바꿀 수 없다.

다음 작업은 모두 불가능하다.

\`\`\`python
numbers = (1, 2, 3)

numbers[0] = 10
numbers.append(4)
del numbers[1]
\`\`\`

튜플에는 리스트의 \`append()\`, \`remove()\` 같은 수정 메서드가 없다.

불변이라는 특징은 값을 보호하는 데 도움이 된다. 예를 들어 프로그램에서 사용할 고정된 상태값이 있다고 하자.

\`\`\`python
order_status = ("주문접수", "결제완료", "배송중", "배송완료")
\`\`\`

이 값들은 프로그램 실행 중 마음대로 바뀌면 안 된다. 이런 경우 튜플을 사용하면 수정 가능성을 줄일 수 있다.

물론 튜플을 사용한다고 해서 완벽한 보안이 되는 것은 아니다. 하지만 이 데이터는 바꾸지 않겠다는 의도를 코드로 표현할 수 있다.

## 패킹과 언패킹

여러 값을 하나의 튜플로 묶는 것을 패킹이라고 한다.

\`\`\`python
person = ("김민수", 25, "서울")
\`\`\`

튜플에 담긴 값을 여러 변수로 나누어 담는 것을 언패킹이라고 한다.

\`\`\`python
person = ("김민수", 25, "서울")
name, age, city = person

print(name)
print(age)
print(city)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
25
서울
\`\`\`

튜플 언패킹은 값을 여러 개 다룰 때 유용하다.

\`\`\`python
x, y = (10, 20)

print(x)
print(y)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
10
20
\`\`\`

두 변수의 값을 바꿀 때도 튜플 언패킹을 사용할 수 있다.

\`\`\`python
a = 10
b = 20

a, b = b, a

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
20
10
\`\`\`

파이썬에서는 이런 식으로 간단하게 두 값을 교환할 수 있다.

## 튜플을 사용하는 상황

튜플은 리스트보다 덜 쓰이는 것처럼 보일 수 있지만, 실무 코드에서 자주 등장한다. 특히 다음과 같은 상황에서 사용한다.

변경되면 안 되는 데이터가 있을 때 사용한다.

\`\`\`python
rgb_white = (255, 255, 255)
\`\`\`

좌표처럼 여러 값을 하나의 묶음으로 표현할 때 사용한다.

\`\`\`python
location = (37.5665, 126.9780)
\`\`\`

상태값처럼 고정된 선택지를 표현할 때 사용한다.

\`\`\`python
roles = ("admin", "manager", "user")
\`\`\`

또한 반복문에서 여러 값을 한 번에 꺼낼 때도 튜플 구조가 자주 사용된다.

\`\`\`python
items = [("키보드", 30000), ("마우스", 15000), ("모니터", 200000)]

for name, price in items:
    print(name, price)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

각 항목은 \`(상품명, 가격)\` 형태의 튜플이다. 반복문에서 \`name\`, \`price\`로 바로 나누어 사용할 수 있다.

## 튜플 실무 예제

회원 등급 목록을 튜플로 관리해 보자.

\`\`\`python
grades = ("BASIC", "SILVER", "GOLD", "VIP")
user_grade = "VIP"

if user_grade in grades:
    print("올바른 회원 등급입니다.")
else:
    print("잘못된 회원 등급입니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
올바른 회원 등급입니다.
\`\`\`

튜플은 수정되지 않아야 하는 기준값, 코드값, 좌표값, 색상값 등을 표현할 때 유용하다.

---

# 4.5 딕셔너리

## 딕셔너리란 무엇인가

딕셔너리는 key와 value를 쌍으로 저장하는 자료구조이다. 리스트와 튜플은 인덱스로 값을 찾지만, 딕셔너리는 key로 값을 찾는다.

딕셔너리의 특징은 다음과 같다.

- key-value 구조로 데이터를 저장한다.
- key를 사용해 value를 찾는다.
- key는 중복될 수 없다.
- 값을 추가, 수정, 삭제할 수 있다.
- 여러 속성을 가진 하나의 대상을 표현하기 좋다.

딕셔너리는 중괄호 \`{}\`를 사용해 만든다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}
\`\`\`

위 딕셔너리에서 \`"name"\`, \`"email"\`, \`"grade"\`는 key이고, \`"김민수"\`, \`"minsu@example.com"\`, \`"VIP"\`는 value이다.

## 딕셔너리 선언법

빈 딕셔너리는 다음처럼 만든다.

\`\`\`python
user = {}
\`\`\`

값이 있는 딕셔너리는 key와 value를 콜론 \`:\`으로 연결해 작성한다.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10
}
\`\`\`

key는 보통 문자열을 많이 사용한다. value에는 문자열, 숫자, 불리언, 리스트, 다른 딕셔너리 등 다양한 값을 넣을 수 있다.

\`\`\`python
user = {
    "name": "이지영",
    "age": 28,
    "is_active": True,
    "skills": ["Python", "Excel", "SQL"]
}
\`\`\`

딕셔너리 안에 딕셔너리를 넣을 수도 있다.

\`\`\`python
company = {
    "name": "ABC Company",
    "address": {
        "city": "서울",
        "district": "강남구"
    }
}
\`\`\`

이런 구조는 API 응답 데이터나 설정 파일에서 자주 볼 수 있다.

## 딕셔너리 값 조회

딕셔너리에서 값을 가져올 때는 key를 사용한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

print(customer["name"])
print(customer["email"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

존재하지 않는 key로 값을 조회하면 \`KeyError\`가 발생한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

print(customer["grade"])
\`\`\`

\`grade\`라는 key가 없으므로 에러가 발생한다.

없는 key를 안전하게 조회하려면 \`get()\`을 사용할 수 있다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

print(customer.get("grade"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
None
\`\`\`

\`get()\`은 key가 없을 때 에러를 발생시키지 않고 \`None\`을 반환한다.

기본값을 지정할 수도 있다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

print(customer.get("grade", "BASIC"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
BASIC
\`\`\`

실무에서는 외부 데이터나 API 응답을 다룰 때 key가 없을 수 있다. 이럴 때 \`get()\`을 사용하면 프로그램이 갑자기 멈추는 일을 줄일 수 있다.

## 딕셔너리 값 추가와 수정

딕셔너리에 새 key를 추가할 때는 대괄호에 key를 지정하고 값을 대입한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

customer["grade"] = "VIP"

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'email': 'minsu@example.com', 'grade': 'VIP'}
\`\`\`

이미 존재하는 key에 값을 대입하면 값이 수정된다.

\`\`\`python
customer = {
    "name": "김민수",
    "grade": "BASIC"
}

customer["grade"] = "VIP"

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'grade': 'VIP'}
\`\`\`

여러 값을 한 번에 추가하거나 수정할 때는 \`update()\`를 사용할 수 있다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

customer.update({
    "grade": "VIP",
    "point": 1200
})

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'email': 'minsu@example.com', 'grade': 'VIP', 'point': 1200}
\`\`\`

## 딕셔너리 값 삭제

딕셔너리에서 값을 삭제할 때는 \`pop()\`, \`del\`, \`clear()\`를 사용할 수 있다.

\`pop()\`은 key를 기준으로 값을 삭제하고, 삭제한 값을 반환한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

removed_value = customer.pop("grade")

print(removed_value)
print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
VIP
{'name': '김민수', 'email': 'minsu@example.com'}
\`\`\`

\`del\`도 key를 기준으로 값을 삭제한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

del customer["email"]

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수'}
\`\`\`

\`clear()\`는 모든 값을 삭제한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

customer.clear()

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{}
\`\`\`

## 딕셔너리 주요 함수

\`keys()\`는 딕셔너리의 key 목록을 가져온다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

print(customer.keys())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
dict_keys(['name', 'email', 'grade'])
\`\`\`

\`values()\`는 value 목록을 가져온다.

\`\`\`python
print(customer.values())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
dict_values(['김민수', 'minsu@example.com', 'VIP'])
\`\`\`

\`items()\`는 key와 value를 함께 가져온다.

\`\`\`python
print(customer.items())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
dict_items([('name', '김민수'), ('email', 'minsu@example.com'), ('grade', 'VIP')])
\`\`\`

\`items()\`는 반복문에서 특히 자주 사용한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

for key, value in customer.items():
    print(key, value)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
name 김민수
email minsu@example.com
grade VIP
\`\`\`

## 딕셔너리 반복문

딕셔너리를 반복하면 기본적으로 key가 하나씩 나온다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

for key in customer:
    print(key)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
name
email
grade
\`\`\`

key를 사용해 value를 함께 출력할 수 있다.

\`\`\`python
for key in customer:
    print(key, customer[key])
\`\`\`

하지만 key와 value를 함께 사용할 때는 \`items()\`가 더 읽기 쉽다.

\`\`\`python
for key, value in customer.items():
    print(key, value)
\`\`\`

value만 반복하고 싶다면 \`values()\`를 사용할 수 있다.

\`\`\`python
for value in customer.values():
    print(value)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
minsu@example.com
VIP
\`\`\`

## 리스트 안의 딕셔너리

실무 데이터는 하나의 딕셔너리만으로 끝나지 않는 경우가 많다. 여러 고객, 여러 상품, 여러 주문을 다뤄야 한다. 이때는 리스트 안에 딕셔너리를 넣는 구조를 자주 사용한다.

\`\`\`python
customers = [
    {"name": "김민수", "grade": "VIP", "point": 1200},
    {"name": "이지영", "grade": "BASIC", "point": 300},
    {"name": "박철수", "grade": "VIP", "point": 2000}
]
\`\`\`

VIP 고객만 출력해 보자.

\`\`\`python
for customer in customers:
    if customer["grade"] == "VIP":
        print(customer["name"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
박철수
\`\`\`

이번에는 포인트가 1,000점 이상인 고객만 새 리스트에 모아 보자.

\`\`\`python
customers = [
    {"name": "김민수", "grade": "VIP", "point": 1200},
    {"name": "이지영", "grade": "BASIC", "point": 300},
    {"name": "박철수", "grade": "VIP", "point": 2000}
]

result = []

for customer in customers:
    if customer["point"] >= 1000:
        result.append(customer)

print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '김민수', 'grade': 'VIP', 'point': 1200}, {'name': '박철수', 'grade': 'VIP', 'point': 2000}]
\`\`\`

리스트 안의 딕셔너리 구조는 CSV, 엑셀, JSON, API 응답 데이터를 다룰 때 매우 자주 사용된다.

## 딕셔너리 실무 예제

상품 정보를 딕셔너리로 표현해 보자.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10
}
\`\`\`

재고가 있는지 확인해 보자.

\`\`\`python
if product["stock"] > 0:
    print("구매 가능합니다.")
else:
    print("품절입니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
구매 가능합니다.
\`\`\`

할인 가격을 추가할 수도 있다.

\`\`\`python
product["discount_price"] = product["price"] * 0.9
print(product)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '키보드', 'price': 30000, 'stock': 10, 'discount_price': 27000.0}
\`\`\`

딕셔너리는 여러 속성을 가진 데이터를 표현할 때 가장 많이 사용하는 자료구조이다.

---

# 4.6 집합

## 집합이란 무엇인가

집합은 중복을 허용하지 않는 자료구조이다. 수학에서 말하는 집합과 비슷하게 생각할 수 있다. 파이썬의 집합은 여러 값을 담을 수 있지만, 같은 값이 여러 번 들어가도 하나만 남는다.

집합의 특징은 다음과 같다.

- 중복을 허용하지 않는다.
- 순서가 없다.
- 인덱스로 값을 꺼낼 수 없다.
- 포함 여부 확인에 유용하다.
- 합집합, 교집합, 차집합 같은 집합 연산을 할 수 있다.

집합은 중괄호 \`{}\`를 사용해 만든다.

\`\`\`python
emails = {"a@example.com", "b@example.com", "a@example.com"}
print(emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'a@example.com', 'b@example.com'}
\`\`\`

\`"a@example.com"\`이 두 번 들어갔지만 결과에는 한 번만 남는다.

## 집합 선언법

값이 있는 집합은 중괄호를 사용해 만든다.

\`\`\`python
numbers = {1, 2, 3}
\`\`\`

빈 집합을 만들 때는 주의해야 한다.

\`\`\`python
empty = {}
print(type(empty))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
<class 'dict'>
\`\`\`

\`{}\`는 빈 집합이 아니라 빈 딕셔너리이다. 빈 집합을 만들려면 \`set()\`을 사용해야 한다.

\`\`\`python
empty_set = set()
print(type(empty_set))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
<class 'set'>
\`\`\`

리스트를 집합으로 변환할 수도 있다.

\`\`\`python
numbers = [1, 1, 2, 2, 3]
unique_numbers = set(numbers)

print(unique_numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{1, 2, 3}
\`\`\`

이 방법은 중복 제거에 자주 사용한다.

문자열을 집합으로 변환하면 문자 단위로 중복이 제거된다.

\`\`\`python
text = "banana"
letters = set(text)

print(letters)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'b', 'a', 'n'}
\`\`\`

집합은 순서가 없기 때문에 출력 순서는 달라질 수 있다. 따라서 집합의 출력 순서에 의존하는 코드는 작성하지 않는 것이 좋다.

## 집합 값 추가와 삭제

집합에 값을 추가할 때는 \`add()\`를 사용한다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
emails.add("c@example.com")

print(emails)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'a@example.com', 'b@example.com', 'c@example.com'}
\`\`\`

이미 있는 값을 추가해도 중복으로 들어가지 않는다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
emails.add("a@example.com")

print(emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'a@example.com', 'b@example.com'}
\`\`\`

값을 삭제할 때는 \`remove()\` 또는 \`discard()\`를 사용할 수 있다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
emails.remove("a@example.com")

print(emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'b@example.com'}
\`\`\`

\`remove()\`는 없는 값을 삭제하려고 하면 에러가 발생한다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
emails.remove("c@example.com")
\`\`\`

반면 \`discard()\`는 없는 값을 삭제하려고 해도 에러가 발생하지 않는다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
emails.discard("c@example.com")

print(emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'a@example.com', 'b@example.com'}
\`\`\`

모든 값을 삭제할 때는 \`clear()\`를 사용한다.

\`\`\`python
emails = {"a@example.com", "b@example.com"}
emails.clear()

print(emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
set()
\`\`\`

## 포함 여부 확인

집합은 포함 여부 확인에 유용하다.

\`\`\`python
processed_ids = {1001, 1002, 1003}

print(1002 in processed_ids)
print(2000 in processed_ids)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
\`\`\`

이미 처리한 데이터인지 확인할 때 집합을 사용할 수 있다.

\`\`\`python
processed_files = {"a.xlsx", "b.xlsx"}
file_name = "a.xlsx"

if file_name in processed_files:
    print("이미 처리한 파일입니다.")
else:
    print("처리가 필요한 파일입니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
이미 처리한 파일입니다.
\`\`\`

## 집합 연산

집합은 두 데이터 그룹을 비교할 때 매우 유용하다.

예를 들어 기존 고객과 신규 고객이 있다고 하자.

\`\`\`python
old_customers = {"김민수", "이지영", "박철수"}
new_customers = {"이지영", "최유리", "정다은"}
\`\`\`

합집합은 두 집합의 모든 값을 합친 것이다. 중복은 제거된다.

\`\`\`python
all_customers = old_customers | new_customers
print(all_customers)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'김민수', '이지영', '박철수', '최유리', '정다은'}
\`\`\`

\`union()\` 메서드를 사용할 수도 있다.

\`\`\`python
all_customers = old_customers.union(new_customers)
\`\`\`

교집합은 두 집합에 모두 있는 값이다.

\`\`\`python
common_customers = old_customers & new_customers
print(common_customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'이지영'}
\`\`\`

\`intersection()\` 메서드를 사용할 수도 있다.

\`\`\`python
common_customers = old_customers.intersection(new_customers)
\`\`\`

차집합은 한쪽 집합에는 있지만 다른 집합에는 없는 값이다.

\`\`\`python
only_old = old_customers - new_customers
print(only_old)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'김민수', '박철수'}
\`\`\`

\`difference()\` 메서드를 사용할 수도 있다.

\`\`\`python
only_old = old_customers.difference(new_customers)
\`\`\`

대칭 차집합은 둘 중 한 집합에만 있는 값이다. 두 집합에 모두 있는 값은 제외된다.

\`\`\`python
not_common = old_customers ^ new_customers
print(not_common)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'김민수', '박철수', '최유리', '정다은'}
\`\`\`

집합 연산은 이벤트 참여자 비교, 기존 고객과 신규 고객 비교, 처리 완료 데이터와 신규 데이터 비교 등에서 사용할 수 있다.

## 집합 사용 시 주의할 점

집합은 순서가 없으므로 인덱싱을 사용할 수 없다.

\`\`\`python
numbers = {10, 20, 30}
print(numbers[0])
\`\`\`

위 코드는 에러가 발생한다.

순서가 필요한 데이터라면 집합이 아니라 리스트를 사용해야 한다.

또한 집합은 중복을 제거하기 때문에 중복 개수가 중요한 데이터에는 적합하지 않다. 예를 들어 상품 판매 목록에서 같은 상품이 몇 번 팔렸는지 세어야 한다면 집합만으로는 부족하다.

\`\`\`python
sold_items = ["키보드", "마우스", "키보드", "모니터"]
unique_items = set(sold_items)

print(unique_items)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'키보드', '마우스', '모니터'}
\`\`\`

중복 제거에는 좋지만, \`"키보드"\`가 두 번 팔렸다는 정보는 사라진다. 따라서 중복이 의미 있는 데이터라면 리스트를 유지해야 한다.

## 집합 실무 예제

이벤트 A 참여자와 이벤트 B 참여자를 비교해 보자.

\`\`\`python
event_a = {"김민수", "이지영", "박철수", "최유리"}
event_b = {"이지영", "정다은", "최유리", "한지훈"}
\`\`\`

두 이벤트에 모두 참여한 사람은 교집합으로 구한다.

\`\`\`python
both = event_a & event_b
print(both)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'이지영', '최유리'}
\`\`\`

이벤트 A에만 참여한 사람은 차집합으로 구한다.

\`\`\`python
only_a = event_a - event_b
print(only_a)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'김민수', '박철수'}
\`\`\`

전체 참여자 목록은 합집합으로 구한다.

\`\`\`python
all_participants = event_a | event_b
print(all_participants)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'김민수', '이지영', '박철수', '최유리', '정다은', '한지훈'}
\`\`\`

집합은 두 그룹의 관계를 빠르게 파악할 때 매우 유용하다.

---

# 4장 핵심 정리

자료구조는 데이터를 저장하고 관리하는 방식이다. 데이터가 많아질수록 자료구조를 사용해야 코드를 단순하고 안정적으로 작성할 수 있다.

리스트는 순서가 있고 수정 가능한 자료구조이다. 여러 데이터를 순서대로 저장하고, 반복문으로 처리할 때 가장 자주 사용한다.

튜플은 순서가 있지만 수정할 수 없는 자료구조이다. 변경되면 안 되는 데이터나 여러 값을 하나의 묶음으로 표현할 때 사용한다.

딕셔너리는 key-value 구조로 데이터를 저장한다. 이름으로 값을 찾을 수 있기 때문에 고객 정보, 상품 정보, 설정값, API 응답 데이터처럼 여러 속성을 가진 데이터를 표현하는 데 적합하다.

집합은 중복을 허용하지 않는 자료구조이다. 중복 제거, 포함 여부 확인, 합집합, 교집합, 차집합 같은 집합 연산이 필요할 때 사용한다.

자료구조를 선택할 때는 순서가 필요한지, 수정해야 하는지, 중복을 허용해야 하는지, 이름으로 값을 찾아야 하는지 생각해야 한다.

---

# 4장 연습문제

## 문제 1

다음 중 여러 상품명을 순서대로 저장하고 나중에 값을 추가하거나 삭제해야 할 때 가장 적합한 자료구조는 무엇인가?

A. 리스트  
B. 튜플  
C. 집합  
D. 문자열

## 문제 2

다음 중 변경되면 안 되는 요일 목록을 저장하기에 가장 적합한 자료구조는 무엇인가?

A. 리스트  
B. 튜플  
C. 딕셔너리  
D. 불리언

## 문제 3

다음 중 고객의 이름, 이메일, 등급처럼 항목 이름과 값을 함께 저장하기에 가장 적합한 자료구조는 무엇인가?

A. 리스트  
B. 튜플  
C. 딕셔너리  
D. 정수

## 문제 4

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
numbers = [10, 20, 30, 40]
print(numbers[0])
print(numbers[-1])
\`\`\`

## 문제 5

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:4])
\`\`\`

## 문제 6

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
items = ["A", "B"]
items.append("C")
print(items)
\`\`\`

## 문제 7

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
items = ["A", "B"]
items.extend(["C", "D"])
print(items)
\`\`\`

## 문제 8

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
items = ["A", "B", "C"]
removed = items.pop()

print(removed)
print(items)
\`\`\`

## 문제 9

다음 리스트에서 30,000원 이상인 가격만 새 리스트에 담아 출력하는 코드를 작성해 보자.

\`\`\`python
prices = [12000, 45000, 30000, 8000, 70000]
\`\`\`

## 문제 10

다음 리스트의 합계를 구하는 코드를 작성해 보자. 단, \`sum()\`을 사용하지 않고 반복문을 사용한다.

\`\`\`python
scores = [80, 90, 70, 100]
\`\`\`

## 문제 11

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
point = (10, 20)
x, y = point

print(x)
print(y)
\`\`\`

## 문제 12

값이 하나인 튜플을 올바르게 선언한 것은 무엇인가?

A. \`(10)\`  
B. \`[10]\`  
C. \`(10,)\`  
D. \`{10:}\`

## 문제 13

다음 딕셔너리에서 고객 이름을 출력하는 코드를 작성해 보자.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}
\`\`\`

## 문제 14

다음 딕셔너리에 \`point\`라는 key로 \`1500\`을 추가하는 코드를 작성해 보자.

\`\`\`python
customer = {
    "name": "김민수",
    "grade": "VIP"
}
\`\`\`

## 문제 15

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
customer = {
    "name": "김민수",
    "grade": "VIP"
}

print(customer.get("email", "이메일 없음"))
\`\`\`

## 문제 16

다음 리스트에서 VIP 고객의 이름만 출력하는 코드를 작성해 보자.

\`\`\`python
customers = [
    {"name": "김민수", "grade": "VIP"},
    {"name": "이지영", "grade": "BASIC"},
    {"name": "박철수", "grade": "VIP"}
]
\`\`\`

## 문제 17

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
numbers = {1, 1, 2, 2, 3}
print(numbers)
\`\`\`

## 문제 18

다음 리스트에서 중복을 제거하는 코드를 작성해 보자.

\`\`\`python
emails = ["a@example.com", "b@example.com", "a@example.com", "c@example.com"]
\`\`\`

## 문제 19

다음 두 집합에서 두 이벤트에 모두 참여한 사람을 구하는 코드를 작성해 보자.

\`\`\`python
event_a = {"김민수", "이지영", "박철수"}
event_b = {"이지영", "최유리", "김민수"}
\`\`\`

## 문제 20

다음 두 집합에서 이벤트 A에만 참여한 사람을 구하는 코드를 작성해 보자.

\`\`\`python
event_a = {"김민수", "이지영", "박철수"}
event_b = {"이지영", "최유리", "김민수"}
\`\`\`

## 문제 21

다음 코드에서 에러가 발생하는 이유를 설명해 보자.

\`\`\`python
numbers = {10, 20, 30}
print(numbers[0])
\`\`\`

## 문제 22

다음 상황에 가장 적합한 자료구조를 고르고 이유를 적어 보자.

\`\`\`text
상품 하나의 이름, 가격, 재고 수량을 함께 저장해야 한다.
\`\`\`

## 문제 23

다음 상황에 가장 적합한 자료구조를 고르고 이유를 적어 보자.

\`\`\`text
여러 파일명을 순서대로 저장하고, 반복문으로 하나씩 처리해야 한다.
\`\`\`

## 문제 24

다음 상황에 가장 적합한 자료구조를 고르고 이유를 적어 보자.

\`\`\`text
설정 가능한 회원 등급 목록을 저장한다. 이 목록은 프로그램 실행 중 바뀌면 안 된다.
\`\`\`

## 문제 25

다음 상황에 가장 적합한 자료구조를 고르고 이유를 적어 보자.

\`\`\`text
이메일 목록에서 중복 이메일을 제거해야 한다.
\`\`\`

---

# 4장 연습문제 정답 및 해설

## 문제 1 정답

정답은 A이다.

상품명을 순서대로 저장하고 나중에 값을 추가하거나 삭제해야 하므로 리스트가 적합하다.

## 문제 2 정답

정답은 B이다.

요일 목록은 순서가 있고, 일반적으로 실행 중 변경되면 안 되는 고정 데이터이다. 이런 경우 튜플이 적합하다.

## 문제 3 정답

정답은 C이다.

이름, 이메일, 등급처럼 항목 이름과 값을 함께 저장하려면 key-value 구조인 딕셔너리가 적합하다.

## 문제 4 정답

\`\`\`text
10
40
\`\`\`

\`numbers[0]\`은 첫 번째 값이고, \`numbers[-1]\`은 마지막 값이다.

## 문제 5 정답

\`\`\`text
[20, 30, 40]
\`\`\`

슬라이싱에서 시작 인덱스는 포함되고 끝 인덱스는 포함되지 않는다. 따라서 인덱스 1, 2, 3의 값이 출력된다.

## 문제 6 정답

\`\`\`text
['A', 'B', 'C']
\`\`\`

\`append()\`는 리스트의 끝에 값을 하나 추가한다.

## 문제 7 정답

\`\`\`text
['A', 'B', 'C', 'D']
\`\`\`

\`extend()\`는 전달받은 리스트의 값을 하나씩 기존 리스트에 추가한다.

## 문제 8 정답

\`\`\`text
C
['A', 'B']
\`\`\`

\`pop()\`에 인덱스를 지정하지 않으면 마지막 값을 삭제하고 반환한다.

## 문제 9 정답

\`\`\`python
prices = [12000, 45000, 30000, 8000, 70000]
result = []

for price in prices:
    if price >= 30000:
        result.append(price)

print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[45000, 30000, 70000]
\`\`\`

## 문제 10 정답

\`\`\`python
scores = [80, 90, 70, 100]
total = 0

for score in scores:
    total += score

print(total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
340
\`\`\`

## 문제 11 정답

\`\`\`text
10
20
\`\`\`

튜플 \`(10, 20)\`이 \`x\`, \`y\`에 각각 나누어 저장된다. 이것을 언패킹이라고 한다.

## 문제 12 정답

정답은 C이다.

값이 하나인 튜플은 \`(10,)\`처럼 쉼표를 붙여야 한다. \`(10)\`은 튜플이 아니라 정수 \`10\`을 괄호로 묶은 표현이다.

## 문제 13 정답

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

print(customer["name"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
\`\`\`

## 문제 14 정답

\`\`\`python
customer = {
    "name": "김민수",
    "grade": "VIP"
}

customer["point"] = 1500

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'grade': 'VIP', 'point': 1500}
\`\`\`

## 문제 15 정답

\`\`\`text
이메일 없음
\`\`\`

딕셔너리에 \`email\`이라는 key가 없기 때문에 \`get()\`의 기본값인 \`"이메일 없음"\`이 반환된다.

## 문제 16 정답

\`\`\`python
customers = [
    {"name": "김민수", "grade": "VIP"},
    {"name": "이지영", "grade": "BASIC"},
    {"name": "박철수", "grade": "VIP"}
]

for customer in customers:
    if customer["grade"] == "VIP":
        print(customer["name"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
박철수
\`\`\`

## 문제 17 정답

\`\`\`text
{1, 2, 3}
\`\`\`

집합은 중복을 허용하지 않으므로 같은 값은 하나만 남는다. 단, 집합은 순서가 없으므로 출력 순서는 환경에 따라 다르게 보일 수 있다.

## 문제 18 정답

\`\`\`python
emails = ["a@example.com", "b@example.com", "a@example.com", "c@example.com"]
unique_emails = set(emails)

print(unique_emails)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'a@example.com', 'b@example.com', 'c@example.com'}
\`\`\`

집합은 순서가 없기 때문에 출력 순서는 달라질 수 있다.

## 문제 19 정답

\`\`\`python
event_a = {"김민수", "이지영", "박철수"}
event_b = {"이지영", "최유리", "김민수"}

both = event_a & event_b
print(both)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'김민수', '이지영'}
\`\`\`

두 집합에 모두 있는 값은 교집합으로 구한다.

## 문제 20 정답

\`\`\`python
event_a = {"김민수", "이지영", "박철수"}
event_b = {"이지영", "최유리", "김민수"}

only_a = event_a - event_b
print(only_a)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
{'박철수'}
\`\`\`

A에는 있지만 B에는 없는 값은 차집합으로 구한다.

## 문제 21 정답

집합은 순서가 없는 자료구조이므로 인덱스로 값을 꺼낼 수 없다. 따라서 \`numbers[0]\`과 같은 코드는 사용할 수 없다. 순서대로 값을 꺼내야 한다면 리스트를 사용해야 한다.

## 문제 22 정답

딕셔너리가 적합하다.

상품 하나에는 이름, 가격, 재고 수량처럼 여러 속성이 있다. 이런 데이터는 key-value 구조로 표현하는 것이 좋다.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10
}
\`\`\`

## 문제 23 정답

리스트가 적합하다.

여러 파일명을 순서대로 저장하고 반복문으로 하나씩 처리해야 하므로 리스트를 사용하면 좋다.

\`\`\`python
file_names = ["a.xlsx", "b.xlsx", "c.xlsx"]
\`\`\`

## 문제 24 정답

튜플이 적합하다.

회원 등급 목록은 순서가 있고 프로그램 실행 중 바뀌면 안 되는 고정 데이터이다. 이런 경우 튜플을 사용하면 변경하지 않겠다는 의도를 표현할 수 있다.

\`\`\`python
grades = ("BASIC", "SILVER", "GOLD", "VIP")
\`\`\`

## 문제 25 정답

집합이 적합하다.

이메일 목록에서 중복을 제거해야 하므로 중복을 허용하지 않는 집합을 사용할 수 있다.

\`\`\`python
emails = ["a@example.com", "b@example.com", "a@example.com"]
unique_emails = set(emails)
\`\`\`

---

# 4장을 마치며

이 장에서는 파이썬의 대표적인 자료구조인 리스트, 튜플, 딕셔너리, 집합을 배웠다. 이 네 가지 자료구조는 파이썬 기초에서 가장 중요한 내용 중 하나이다.

리스트는 순서대로 여러 데이터를 저장하고 수정할 수 있는 자료구조이다. 튜플은 리스트와 비슷하지만 수정할 수 없다는 점이 다르다. 딕셔너리는 key-value 구조로 데이터를 저장하며, 이름으로 값을 찾을 수 있다. 집합은 중복을 제거하고 두 데이터 그룹을 비교할 때 유용하다.

자료구조를 배우면 프로그램이 다룰 수 있는 데이터의 범위가 넓어진다. 이제 단순한 값 하나가 아니라 고객 목록, 상품 정보, 주문 내역, 파일 목록처럼 실제 업무에서 자주 만나는 데이터를 표현할 수 있다.

다음 장에서는 함수를 배운다. 함수는 지금까지 배운 변수, 조건문, 반복문, 자료구조를 하나의 기능 단위로 묶어 재사용할 수 있게 해 준다. 자료구조와 함수를 함께 사용하면 더 실용적이고 관리하기 쉬운 코드를 작성할 수 있다.
`;export{e as default};