var e=`<!-- 원본: python_basic_chapter_5_book.md / 세부 장: 5-3 -->

# 5.3 변수의 범위

## 변수의 범위란 무엇인가

변수의 범위는 변수를 사용할 수 있는 영역을 의미한다. 영어로는 스코프라고 한다.

파이썬에서는 함수 안에서 만든 변수와 함수 밖에서 만든 변수가 서로 다른 범위를 가진다. 이 개념을 이해하지 못하면 함수 안팎에서 변수를 사용할 때 혼란이 생긴다.

다음 코드를 보자.

\`\`\`python
def greet():
    message = "안녕하세요"
    print(message)


greet()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요
\`\`\`

\`message\` 변수는 함수 안에서 만들어졌다. 함수 안에서는 사용할 수 있다. 하지만 함수 밖에서 사용하려고 하면 에러가 발생한다.

\`\`\`python
def greet():
    message = "안녕하세요"
    print(message)


greet()
print(message)
\`\`\`

실행하면 \`NameError\`가 발생한다. 함수 안에서 만든 변수는 함수 밖에서 사용할 수 없기 때문이다.

## 지역 변수

함수 안에서 만든 변수를 지역 변수라고 한다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(result)
\`\`\`

위 코드에서 \`total\`은 지역 변수이다. \`calculate_total\` 함수 안에서 만들어졌기 때문에 함수 안에서만 사용할 수 있다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(total)
\`\`\`

위 코드에서 \`print(total)\`은 에러를 발생시킨다. \`total\`은 함수 밖에서 사용할 수 없는 지역 변수이기 때문이다.

지역 변수는 함수가 실행될 때 만들어지고, 함수 실행이 끝나면 사라진다고 이해하면 된다.

## 매개변수도 지역 변수다

함수의 매개변수도 함수 안에서만 사용할 수 있는 지역 변수이다.

\`\`\`python
def greet(name):
    print(name, "님 안녕하세요")


greet("홍길동")
print(name)
\`\`\`

\`name\`은 매개변수이다. 함수 안에서는 사용할 수 있지만 함수 밖에서는 사용할 수 없다. 따라서 마지막 줄에서 에러가 발생한다.

매개변수는 함수가 호출될 때 전달된 값을 담는 지역 변수라고 생각할 수 있다.

## 전역 변수

함수 밖에서 만든 변수를 전역 변수라고 한다.

\`\`\`python
message = "안녕하세요"


def greet():
    print(message)


greet()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요
\`\`\`

\`message\`는 함수 밖에서 만들어진 전역 변수이다. 함수 안에서 전역 변수를 읽을 수 있다.

하지만 함수 안에서 전역 변수와 같은 이름의 변수를 새로 만들면 상황이 달라진다.

\`\`\`python
message = "안녕하세요"


def greet():
    message = "반갑습니다"
    print(message)


greet()
print(message)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
반갑습니다
안녕하세요
\`\`\`

함수 안의 \`message\`는 지역 변수이고, 함수 밖의 \`message\`는 전역 변수이다. 이름은 같지만 서로 다른 변수이다.

## 전역 변수 변경 시 주의점

함수 안에서 전역 변수를 변경하려면 \`global\`을 사용할 수 있다.

\`\`\`python
count = 0


def increase_count():
    global count
    count += 1


increase_count()
increase_count()

print(count)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
2
\`\`\`

\`global count\`는 함수 안에서 전역 변수 \`count\`를 변경하겠다는 의미이다.

하지만 실무에서는 \`global\`을 자주 사용하는 코드는 피하는 것이 좋다. 함수가 외부 변수에 의존하면 코드를 이해하기 어려워지고, 예상하지 못한 위치에서 값이 바뀔 수 있다.

가능하면 함수는 필요한 값을 매개변수로 받고, 결과를 반환하도록 작성하는 것이 좋다.

좋지 않은 예는 다음과 같다.

\`\`\`python
total = 0


def add_price(price):
    global total
    total += price


add_price(10000)
add_price(20000)
print(total)
\`\`\`

더 나은 예는 다음과 같다.

\`\`\`python
def add_price(total, price):
    return total + price


total = 0
total = add_price(total, 10000)
total = add_price(total, 20000)

print(total)
\`\`\`

실행 결과는 같다.

\`\`\`text
30000
\`\`\`

두 번째 방식은 함수의 입력과 출력이 분명하다. 그래서 테스트하기 쉽고, 코드 흐름도 이해하기 쉽다.

## 같은 이름의 변수가 있을 때

파이썬은 변수를 찾을 때 가까운 범위부터 찾는다. 함수 안에서 변수를 사용하면 먼저 함수 안에서 찾고, 없으면 함수 밖에서 찾는다.

\`\`\`python
name = "전역 이름"


def print_name():
    name = "지역 이름"
    print(name)


print_name()
print(name)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
지역 이름
전역 이름
\`\`\`

함수 안에서는 지역 변수 \`name\`이 사용된다. 함수 밖에서는 전역 변수 \`name\`이 사용된다.

이름이 같으면 헷갈릴 수 있으므로, 함수 안팎에서 같은 이름을 불필요하게 반복해서 쓰지 않는 것이 좋다.

## 함수 안에서 만든 값을 밖에서 사용하려면

함수 안에서 만든 값을 함수 밖에서 사용하려면 \`return\`으로 반환해야 한다.

잘못된 예는 다음과 같다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity


calculate_total(10000, 3)
print(total)
\`\`\`

\`total\`은 함수 안에서 만든 지역 변수이므로 함수 밖에서 사용할 수 없다.

올바른 예는 다음과 같다.

\`\`\`python
def calculate_total(price, quantity):
    total = price * quantity
    return total


result = calculate_total(10000, 3)
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
\`\`\`

함수 안에서 계산한 결과를 밖에서 사용하려면 반드시 반환해야 한다.

## 스코프를 이해해야 하는 이유

스코프는 단순한 이론이 아니다. 함수로 코드를 나누기 시작하면 자주 마주치는 개념이다.

다음과 같은 질문에 답할 수 있어야 한다.

\`\`\`text
이 변수는 어디에서 만들어졌는가?
이 변수는 어디에서 사용할 수 있는가?
함수 밖에서 이 값을 쓰려면 어떻게 해야 하는가?
함수 안에서 외부 값을 직접 바꾸는 것이 좋은가?
\`\`\`

이 질문에 답할 수 있으면 함수 코드의 흐름을 훨씬 안정적으로 이해할 수 있다.

---
`;export{e as default};