var e=`<!-- 원본: python_basic_chapter_4_book.md / 세부 장: 4-6 -->

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