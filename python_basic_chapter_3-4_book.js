var e=`<!-- 원본: python_basic_chapter_3_book.md / 세부 장: 3-4 -->

# 3.4 리스트 컴프리헨션 기초

## 리스트 컴프리헨션이란?

리스트 컴프리헨션은 반복문을 사용해 리스트를 간결하게 만드는 문법이다. 리스트는 4장에서 자세히 배우지만, 파이썬 코드에서 매우 자주 보이는 문법이므로 반복문을 배운 직후에 기본 형태를 먼저 살펴본다.

일반 반복문으로 새 리스트를 만드는 코드를 보자.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = []

for number in numbers:
    squares.append(number * number)

print(squares)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

위 코드는 각 숫자의 제곱을 새 리스트에 담는다. 이 코드는 리스트 컴프리헨션을 사용해 다음처럼 줄일 수 있다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = [number * number for number in numbers]

print(squares)
\`\`\`

실행 결과는 같다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

리스트 컴프리헨션은 반복문을 한 줄로 줄이는 문법이다. 하지만 무조건 짧게 쓰는 것이 좋은 것은 아니다. 읽기 쉬울 때만 사용하는 것이 좋다.

## 기본 구조

리스트 컴프리헨션의 기본 구조는 다음과 같다.

\`\`\`python
[표현식 for 변수 in 반복할_대상]
\`\`\`

예를 들어 1부터 5까지 숫자를 리스트로 만들 수 있다.

\`\`\`python
numbers = [number for number in range(1, 6)]
print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4, 5]
\`\`\`

각 숫자에 10을 곱한 리스트도 만들 수 있다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
result = [number * 10 for number in numbers]

print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 20, 30, 40, 50]
\`\`\`

## 조건문과 함께 사용하기

조건에 맞는 값만 리스트에 넣고 싶다면 \`if\`를 함께 사용할 수 있다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = [number for number in numbers if number % 2 == 0]

print(even_numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[2, 4, 6]
\`\`\`

\`number % 2 == 0\`은 숫자가 짝수인지 확인하는 조건이다. 조건이 참인 값만 새 리스트에 포함된다.

일반 반복문으로 작성하면 다음과 같다.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = []

for number in numbers:
    if number % 2 == 0:
        even_numbers.append(number)

print(even_numbers)
\`\`\`

리스트 컴프리헨션은 이 코드를 한 줄로 표현한 것이다.

## 값을 변환하면서 조건 적용하기

조건에 맞는 값만 고르고, 동시에 값을 변환할 수도 있다.

\`\`\`python
prices = [10000, 25000, 30000, 5000]
discounted_prices = [price * 0.9 for price in prices if price >= 20000]

print(discounted_prices)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[22500.0, 27000.0]
\`\`\`

이 코드는 20,000원 이상인 가격만 골라서 10% 할인한 값을 새 리스트로 만든다.

흐름을 풀어 쓰면 다음과 같다.

\`\`\`text
1. prices에서 가격을 하나씩 꺼낸다.
2. 가격이 20,000원 이상인지 확인한다.
3. 조건에 맞는 가격에 0.9를 곱한다.
4. 그 결과를 새 리스트에 담는다.
\`\`\`

## 조건에 따라 다른 값 넣기

리스트 컴프리헨션에서는 조건에 따라 다른 값을 넣을 수도 있다. 이때는 \`if-else\`의 위치가 조금 다르다.

\`\`\`python
scores = [90, 60, 75, 40]
results = ["통과" if score >= 70 else "탈락" for score in scores]

print(results)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['통과', '탈락', '통과', '탈락']
\`\`\`

조건에 맞는 값만 고를 때는 \`if\`가 뒤에 온다.

\`\`\`python
[number for number in numbers if number % 2 == 0]
\`\`\`

조건에 따라 값을 다르게 만들 때는 \`if-else\`가 앞에 온다.

\`\`\`python
["짝수" if number % 2 == 0 else "홀수" for number in numbers]
\`\`\`

처음에는 이 차이가 헷갈릴 수 있다. 입문 단계에서는 먼저 “조건에 맞는 값만 고르는 형태”부터 익히면 충분하다.

## 문자열 리스트 다루기

문자열 데이터에서도 리스트 컴프리헨션을 사용할 수 있다.

\`\`\`python
emails = ["USER@EXAMPLE.COM", "ADMIN@EXAMPLE.COM", "TEST@EXAMPLE.COM"]
lower_emails = [email.lower() for email in emails]

print(lower_emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['user@example.com', 'admin@example.com', 'test@example.com']
\`\`\`

이 코드는 이메일 주소를 모두 소문자로 바꾼다.

특정 도메인만 고를 수도 있다.

\`\`\`python
emails = ["a@example.com", "b@test.com", "c@example.com"]
example_emails = [email for email in emails if email.endswith("@example.com")]

print(example_emails)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['a@example.com', 'c@example.com']
\`\`\`

## 리스트 컴프리헨션을 사용할 때 주의할 점

리스트 컴프리헨션은 코드를 짧게 만들 수 있지만, 너무 복잡하게 작성하면 오히려 읽기 어렵다.

예를 들어 다음 코드는 한 줄이지만 읽기 어렵다.

\`\`\`python
result = [price * 0.9 if price >= 30000 else price * 0.95 for price in prices if price > 0]
\`\`\`

이런 경우에는 일반 반복문을 사용하는 편이 더 낫다.

\`\`\`python
result = []

for price in prices:
    if price <= 0:
        continue

    if price >= 30000:
        result.append(price * 0.9)
    else:
        result.append(price * 0.95)
\`\`\`

코드가 길더라도 읽기 쉽고 수정하기 쉽다면 좋은 코드이다. 리스트 컴프리헨션은 간단한 변환이나 필터링에 사용하는 것이 좋다.

## 리스트 컴프리헨션 실무 예제 1: 할인 가격 목록 만들기

\`\`\`python
prices = [10000, 20000, 30000]
discounted_prices = [price * 0.9 for price in prices]

print(discounted_prices)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[9000.0, 18000.0, 27000.0]
\`\`\`

## 리스트 컴프리헨션 실무 예제 2: 빈 값 제거하기

\`\`\`python
names = ["홍길동", "", "김철수", "", "이영희"]
valid_names = [name for name in names if name]

print(valid_names)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['홍길동', '김철수', '이영희']
\`\`\`

빈 문자열은 거짓으로 평가되므로 \`if name\` 조건을 사용해 값이 있는 이름만 남길 수 있다.

## 리스트 컴프리헨션 실무 예제 3: 파일 확장자로 필터링하기

\`\`\`python
file_names = ["report.xlsx", "memo.txt", "sales.xlsx", "image.png"]
excel_files = [file_name for file_name in file_names if file_name.endswith(".xlsx")]

print(excel_files)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['report.xlsx', 'sales.xlsx']
\`\`\`

파일 처리 자동화에서는 특정 확장자의 파일만 골라야 하는 경우가 많다. 이런 경우 리스트 컴프리헨션을 사용하면 간결하게 표현할 수 있다.

---

# 3장 핵심 정리

## 조건문 핵심 정리

조건문은 조건에 따라 다른 코드를 실행할 때 사용한다.

\`\`\`python
if 조건식:
    조건이 참일 때 실행할 코드
\`\`\`

조건이 거짓일 때 실행할 코드가 필요하면 \`else\`를 사용한다.

\`\`\`python
if 조건식:
    조건이 참일 때 실행할 코드
else:
    조건이 거짓일 때 실행할 코드
\`\`\`

조건이 여러 개라면 \`elif\`를 사용한다.

\`\`\`python
if 조건식1:
    코드1
elif 조건식2:
    코드2
else:
    코드3
\`\`\`

조건문에서는 들여쓰기가 매우 중요하다. \`if\`, \`elif\`, \`else\` 뒤에는 콜론 \`:\`을 붙이고, 실행할 코드는 들여쓰기해야 한다.

## 반복문 핵심 정리

반복문은 같은 작업을 여러 번 실행할 때 사용한다.

\`for\` 문은 반복할 대상이나 반복 횟수가 명확할 때 사용한다.

\`\`\`python
for 변수 in 반복할_대상:
    반복할 코드
\`\`\`

\`range()\`는 정해진 횟수만큼 반복할 때 자주 사용한다.

\`\`\`python
for number in range(1, 6):
    print(number)
\`\`\`

\`while\` 문은 조건이 참인 동안 반복한다.

\`\`\`python
while 조건식:
    반복할 코드
\`\`\`

\`break\`는 반복문을 종료하고, \`continue\`는 현재 반복을 건너뛴다.

## 반복문 실무 패턴 핵심 정리

반복문에서는 다음 패턴이 자주 사용된다.

- 합계 누적하기
- 조건에 맞는 개수 세기
- 최댓값 찾기
- 최솟값 찾기
- 조건에 맞는 값만 모으기
- 원하는 값을 찾으면 반복 종료하기
- 특정 값은 건너뛰기
- 중첩 반복문으로 표 형태 데이터 처리하기

## 리스트 컴프리헨션 핵심 정리

리스트 컴프리헨션은 반복문을 사용해 새 리스트를 간결하게 만드는 문법이다.

\`\`\`python
[표현식 for 변수 in 반복할_대상]
\`\`\`

조건을 붙일 수도 있다.

\`\`\`python
[표현식 for 변수 in 반복할_대상 if 조건식]
\`\`\`

리스트 컴프리헨션은 간단한 변환과 필터링에는 좋지만, 복잡한 조건이 많을 때는 일반 반복문을 사용하는 편이 좋다.

---

# 3장 연습문제

## 문제 1. 조건문 기본

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
age = 21

if age >= 19:
    print("성인")
else:
    print("미성년자")
\`\`\`

## 문제 2. 조건 검사 순서

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
score = 95

if score >= 70:
    print("C")
elif score >= 80:
    print("B")
elif score >= 90:
    print("A")
else:
    print("D")
\`\`\`

## 문제 3. 무료배송 조건

주문 금액이 50,000원 이상이면 \`"무료배송"\`, 그렇지 않으면 \`"배송비 3000원"\`을 출력하는 코드를 작성해 보자.

조건은 다음과 같다.

\`\`\`python
order_price = 48000
\`\`\`

## 문제 4. 회원 등급 조건

다음 조건에 따라 할인율을 출력하는 코드를 작성해 보자.

\`\`\`text
VIP: 20%
GOLD: 10%
SILVER: 5%
그 외: 0%
\`\`\`

주어진 값은 다음과 같다.

\`\`\`python
grade = "GOLD"
\`\`\`

## 문제 5. \`range()\` 실행 결과

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
for number in range(2, 8, 2):
    print(number)
\`\`\`

## 문제 6. 반복문 합계

\`1\`부터 \`10\`까지의 합계를 구하는 코드를 작성해 보자.

출력 예시는 다음과 같다.

\`\`\`text
합계: 55
\`\`\`

## 문제 7. 짝수만 출력하기

\`1\`부터 \`10\`까지의 숫자 중 짝수만 출력하는 코드를 작성해 보자.

출력 예시는 다음과 같다.

\`\`\`text
2
4
6
8
10
\`\`\`

## 문제 8. \`break\` 실행 결과

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
for number in range(1, 6):
    if number == 4:
        break
    print(number)
\`\`\`

## 문제 9. \`continue\` 실행 결과

다음 코드의 실행 결과를 예상해 보자.

\`\`\`python
for number in range(1, 6):
    if number == 3:
        continue
    print(number)
\`\`\`

## 문제 10. 조건에 맞는 개수 세기

다음 점수 목록에서 70점 이상인 점수의 개수를 세는 코드를 작성해 보자.

\`\`\`python
scores = [90, 65, 80, 50, 100]
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
통과한 개수: 3
\`\`\`

## 문제 11. 최댓값 찾기

다음 가격 목록에서 가장 큰 가격을 찾는 코드를 반복문으로 작성해 보자. \`max()\` 함수는 사용하지 않는다.

\`\`\`python
prices = [12000, 45000, 30000, 8000]
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
가장 큰 가격: 45000
\`\`\`

## 문제 12. 조건에 맞는 값 모으기

다음 가격 목록에서 30,000원 이상인 가격만 새 리스트에 모으는 코드를 작성해 보자.

\`\`\`python
prices = [12000, 45000, 30000, 8000, 70000]
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
[45000, 30000, 70000]
\`\`\`

## 문제 13. 문자열 반복

다음 문자열에서 숫자가 몇 개 들어 있는지 세는 코드를 작성해 보자.

\`\`\`python
text = "A1B2C3D"
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
숫자 개수: 3
\`\`\`

## 문제 14. 리스트 컴프리헨션 기본

다음 숫자 목록의 각 값에 10을 곱한 새 리스트를 리스트 컴프리헨션으로 만들어 보자.

\`\`\`python
numbers = [1, 2, 3, 4]
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
[10, 20, 30, 40]
\`\`\`

## 문제 15. 리스트 컴프리헨션 조건

다음 파일명 목록에서 \`.xlsx\`로 끝나는 파일명만 모아 보자.

\`\`\`python
file_names = ["report.xlsx", "memo.txt", "sales.xlsx", "image.png"]
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
['report.xlsx', 'sales.xlsx']
\`\`\`

## 문제 16. 오류 수정

다음 코드는 에러가 발생한다. 올바르게 수정해 보자.

\`\`\`python
age = 20

if age >= 19
    print("성인입니다.")
\`\`\`

## 문제 17. 오류 수정

다음 코드는 의도와 다르게 동작한다. \`number\`가 1부터 5까지 출력되도록 수정해 보자.

\`\`\`python
number = 1

while number <= 5:
    print(number)
\`\`\`

---

# 3장 연습문제 정답 및 해설

## 문제 1 정답

\`\`\`text
성인
\`\`\`

\`age\`가 21이므로 \`age >= 19\`는 참이다. 따라서 \`if\` 블록이 실행된다.

## 문제 2 정답

\`\`\`text
C
\`\`\`

\`score\`는 95이다. \`score >= 70\`, \`score >= 80\`, \`score >= 90\`이 모두 참이 될 수 있지만, 조건문은 위에서 아래로 검사한다. 첫 번째 조건 \`score >= 70\`이 먼저 참이 되므로 \`C\`가 출력된다. 등급을 정확히 나누려면 큰 점수 조건부터 검사해야 한다.

## 문제 3 정답

\`\`\`python
order_price = 48000

if order_price >= 50000:
    print("무료배송")
else:
    print("배송비 3000원")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
배송비 3000원
\`\`\`

## 문제 4 정답

\`\`\`python
grade = "GOLD"

if grade == "VIP":
    print("20%")
elif grade == "GOLD":
    print("10%")
elif grade == "SILVER":
    print("5%")
else:
    print("0%")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
10%
\`\`\`

## 문제 5 정답

\`\`\`text
2
4
6
\`\`\`

\`range(2, 8, 2)\`는 2부터 시작해서 2씩 증가한다. 끝값 8은 포함되지 않으므로 2, 4, 6이 출력된다.

## 문제 6 정답

\`\`\`python
total = 0

for number in range(1, 11):
    total += number

print("합계:", total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
합계: 55
\`\`\`

## 문제 7 정답

\`\`\`python
for number in range(1, 11):
    if number % 2 == 0:
        print(number)
\`\`\`

\`number % 2 == 0\`은 숫자가 짝수인지 확인하는 조건이다.

다음처럼 \`range()\`의 증가값을 활용할 수도 있다.

\`\`\`python
for number in range(2, 11, 2):
    print(number)
\`\`\`

## 문제 8 정답

\`\`\`text
1
2
3
\`\`\`

\`number\`가 4가 되면 \`break\`가 실행되어 반복문이 종료된다. 따라서 4는 출력되지 않는다.

## 문제 9 정답

\`\`\`text
1
2
4
5
\`\`\`

\`number\`가 3일 때 \`continue\`가 실행되어 \`print(number)\`를 건너뛴다.

## 문제 10 정답

\`\`\`python
scores = [90, 65, 80, 50, 100]
pass_count = 0

for score in scores:
    if score >= 70:
        pass_count += 1

print("통과한 개수:", pass_count)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
통과한 개수: 3
\`\`\`

## 문제 11 정답

\`\`\`python
prices = [12000, 45000, 30000, 8000]
max_price = prices[0]

for price in prices:
    if price > max_price:
        max_price = price

print("가장 큰 가격:", max_price)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
가장 큰 가격: 45000
\`\`\`

첫 번째 값을 기준값으로 잡고, 더 큰 값이 나오면 기준값을 바꾼다.

## 문제 12 정답

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

## 문제 13 정답

\`\`\`python
text = "A1B2C3D"
count = 0

for char in text:
    if char.isdigit():
        count += 1

print("숫자 개수:", count)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
숫자 개수: 3
\`\`\`

## 문제 14 정답

\`\`\`python
numbers = [1, 2, 3, 4]
result = [number * 10 for number in numbers]

print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10, 20, 30, 40]
\`\`\`

## 문제 15 정답

\`\`\`python
file_names = ["report.xlsx", "memo.txt", "sales.xlsx", "image.png"]
excel_files = [file_name for file_name in file_names if file_name.endswith(".xlsx")]

print(excel_files)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['report.xlsx', 'sales.xlsx']
\`\`\`

## 문제 16 정답

\`\`\`python
age = 20

if age >= 19:
    print("성인입니다.")
\`\`\`

\`if\` 조건식 뒤에는 콜론 \`:\`이 필요하다.

## 문제 17 정답

\`\`\`python
number = 1

while number <= 5:
    print(number)
    number += 1
\`\`\`

\`while\` 문에서는 반복이 끝날 수 있도록 조건에 사용되는 값을 바꾸어야 한다. 여기서는 \`number += 1\`을 추가해야 한다.

---

# 3장을 마치며

이 장에서는 조건문과 반복문을 배웠다. 조건문은 프로그램이 상황에 따라 다른 선택을 하도록 만든다. 반복문은 같은 작업을 여러 번 실행하거나 여러 데이터를 하나씩 처리하도록 만든다.

조건문과 반복문을 잘 다루면 프로그램이 훨씬 실용적으로 바뀐다. 단순히 값을 저장하고 출력하는 수준을 넘어, 입력값을 검사하고, 조건에 맞는 데이터를 처리하고, 반복되는 작업을 자동화할 수 있다.

다음 장에서는 여러 데이터를 더 체계적으로 관리하기 위한 자료구조를 배운다. 리스트, 튜플, 딕셔너리, 집합을 배우면 반복문과 함께 훨씬 다양한 데이터를 처리할 수 있다.
`;export{e as default};