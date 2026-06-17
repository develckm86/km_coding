var e=`<!-- 원본: python_advanced_chapter_2_book.md / 세부 장: 2-4 -->

# 2.4 네임스페이스와 스코프

### 2.4.1 네임스페이스란 무엇인가

**네임스페이스(namespace)**는 이름과 객체의 연결을 저장하는 공간이다.

다음 코드를 보자.

\`\`\`python
x = 10
name = "Python"

def hello():
    print("Hello")
\`\`\`

이 코드가 실행되면 현재 모듈의 네임스페이스에는 다음과 같은 이름이 등록된다.

\`\`\`text
x     → 정수 객체 10
name  → 문자열 객체 "Python"
hello → 함수 객체
\`\`\`

네임스페이스는 이름 충돌을 줄이고, 코드가 어느 범위에서 어떤 이름을 사용할 수 있는지 결정하는 역할을 한다.

---

### 2.4.2 지역, 전역, 내장 네임스페이스

파이썬에는 여러 종류의 네임스페이스가 있다.

\`\`\`text
지역 네임스페이스: 함수 안에서 만들어지는 이름
전역 네임스페이스: 모듈 전체에서 사용하는 이름
내장 네임스페이스: print, len, sum 같은 기본 이름
\`\`\`

예를 들어 다음 코드를 보자.

\`\`\`python
x = 10

def show():
    y = 20
    print(x)
    print(y)

show()
\`\`\`

\`x\`는 전역 네임스페이스에 있다. \`y\`는 \`show()\` 함수의 지역 네임스페이스에 있다.

함수 밖에서 \`y\`를 사용하면 에러가 발생한다.

\`\`\`python
print(y)  # NameError
\`\`\`

---

### 2.4.3 LEGB 규칙

파이썬은 이름을 찾을 때 다음 순서로 찾는다.

\`\`\`text
L: Local       지역 범위
E: Enclosing   바깥 함수 범위
G: Global      전역 범위
B: Built-in    내장 범위
\`\`\`

이 순서를 **LEGB 규칙**이라고 한다.

\`\`\`python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()

outer()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
local
\`\`\`

\`inner()\` 안에 지역 변수 \`x\`가 있기 때문에 가장 먼저 그 값을 사용한다.

이번에는 지역 변수 \`x\`를 제거해보자.

\`\`\`python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        print(x)

    inner()

outer()
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
enclosing
\`\`\`

\`inner()\` 안에 \`x\`가 없으므로 바깥 함수인 \`outer()\`의 \`x\`를 찾는다.

---

### 2.4.4 \`global\`

함수 안에서 전역 변수를 읽는 것은 가능하다.

\`\`\`python
count = 0

def show_count():
    print(count)

show_count()
\`\`\`

하지만 함수 안에서 전역 변수에 새 값을 할당하려고 하면 주의해야 한다.

\`\`\`python
count = 0

def increase():
    count = count + 1

increase()
\`\`\`

이 코드는 에러가 발생한다. 함수 안에서 \`count = ...\` 형태의 할당이 있기 때문에 파이썬은 \`count\`를 지역 변수로 판단한다. 그런데 오른쪽의 \`count + 1\`을 계산하려면 아직 만들어지지 않은 지역 변수 \`count\`를 읽어야 하므로 문제가 된다.

전역 변수를 함수 안에서 수정하려면 \`global\`을 사용할 수 있다.

\`\`\`python
count = 0

def increase():
    global count
    count = count + 1

increase()
print(count)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
1
\`\`\`

하지만 \`global\`은 남용하지 않는 것이 좋다. 전역 상태가 많아지면 코드 흐름을 추적하기 어렵고 테스트하기도 어려워진다. 보통은 값을 함수에 전달하고 결과를 반환하는 방식이 더 안전하다.

\`\`\`python
def increase(count):
    return count + 1

count = 0
count = increase(count)
\`\`\`

---

### 2.4.5 \`nonlocal\`

\`nonlocal\`은 중첩 함수에서 바깥 함수의 변수를 수정할 때 사용한다.

\`\`\`python
def make_counter():
    count = 0

    def increase():
        nonlocal count
        count += 1
        return count

    return increase

counter = make_counter()

print(counter())
print(counter())
print(counter())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
1
2
3
\`\`\`

\`increase()\` 함수는 \`make_counter()\`의 지역 변수였던 \`count\`를 기억하고 있다. 이런 구조는 다음 장에서 다룰 클로저와 데코레이터의 기반이 된다.

---

### 2.4.6 내장 이름 가리기 주의

파이썬에는 \`list\`, \`dict\`, \`str\`, \`sum\`, \`len\` 같은 내장 이름이 있다. 이런 이름을 변수명으로 사용하면 내장 함수를 가리게 된다.

\`\`\`python
list = [1, 2, 3]

numbers = list((4, 5, 6))  # TypeError 발생 가능
\`\`\`

\`list\`라는 이름에 리스트 객체를 할당했기 때문에, 원래의 내장 함수 \`list()\`를 사용할 수 없게 된다.

다음과 같은 변수명은 피하는 것이 좋다.

\`\`\`python
list = []
dict = {}
str = "hello"
sum = 100
max = 10
min = 1
\`\`\`

실무에서는 \`items\`, \`data\`, \`text\`, \`total\`, \`max_value\`, \`min_value\`처럼 의미가 드러나는 이름을 사용하는 것이 좋다.

---
`;export{e as default};