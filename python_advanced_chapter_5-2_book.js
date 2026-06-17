var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-2 -->

# 5.2 기본 데코레이터 만들기

이제 가장 단순한 데코레이터를 직접 만들어보겠습니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")

    return wrapper
\`\`\`

이 함수는 다른 함수를 인자로 받아서 \`wrapper\` 함수를 반환합니다.

이제 이 데코레이터를 사용해봅시다.

\`\`\`python
def greet():
    print("안녕하세요")

greet = simple_decorator(greet)

greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
안녕하세요
함수 실행 후
\`\`\`

여기서 중요한 줄은 다음입니다.

\`\`\`python
greet = simple_decorator(greet)
\`\`\`

오른쪽의 \`simple_decorator(greet)\`는 원래 \`greet\` 함수를 감싼 \`wrapper\` 함수를 반환합니다. 그 반환값을 다시 \`greet\`라는 이름에 저장합니다.

즉, 이제 \`greet\`라는 이름은 원래 함수가 아니라, 원래 함수를 감싸는 \`wrapper\` 함수를 가리키게 됩니다.

---

### 5.2.1 \`@\` 문법 사용하기

파이썬은 위 코드를 더 간단하게 쓸 수 있는 문법을 제공합니다.

\`\`\`python
@simple_decorator
def greet():
    print("안녕하세요")
\`\`\`

이 코드는 다음 코드와 같은 의미입니다.

\`\`\`python
def greet():
    print("안녕하세요")

greet = simple_decorator(greet)
\`\`\`

전체 코드는 다음과 같습니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")

    return wrapper


@simple_decorator
def greet():
    print("안녕하세요")


greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
안녕하세요
함수 실행 후
\`\`\`

\`@simple_decorator\`는 \`greet\` 함수를 \`simple_decorator\` 함수에 전달해서, 그 결과를 다시 \`greet\`라는 이름으로 저장하라는 뜻입니다.

---

### 5.2.2 데코레이터의 실행 시점

데코레이터를 처음 배울 때 자주 헷갈리는 부분이 있습니다. 데코레이터 함수는 언제 실행될까요?

다음 코드를 보겠습니다.

\`\`\`python
def simple_decorator(func):
    print("데코레이터 실행")

    def wrapper():
        print("wrapper 실행")
        func()

    return wrapper


@simple_decorator
def greet():
    print("안녕하세요")

print("함수 호출 전")
greet()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
데코레이터 실행
함수 호출 전
wrapper 실행
안녕하세요
\`\`\`

\`데코레이터 실행\`은 \`greet()\`를 호출하기 전에 출력됩니다. 이유는 \`@simple_decorator\`가 붙은 함수가 정의될 때 데코레이터가 먼저 적용되기 때문입니다.

반면 \`wrapper 실행\`은 실제로 \`greet()\`를 호출할 때 출력됩니다.

정리하면 다음과 같습니다.

- 데코레이터 함수 자체는 함수가 정의될 때 한 번 실행됩니다.
- \`wrapper\` 함수는 데코레이트된 함수를 호출할 때 실행됩니다.

이 차이를 이해해야 인자를 받는 데코레이터를 배울 때 덜 헷갈립니다.

---

### 5.2.3 반환값이 있는 함수 감싸기

앞의 예제에서는 원래 함수가 아무 값도 반환하지 않았습니다. 이번에는 반환값이 있는 함수를 감싸보겠습니다.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

이 함수에 단순한 데코레이터를 적용해봅시다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")

    return wrapper


@simple_decorator
def add():
    return 10 + 20

result = add()
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
함수 실행 후
None
\`\`\`

왜 \`30\`이 아니라 \`None\`이 나왔을까요?

\`wrapper\` 안에서 \`func()\`를 실행하기는 했지만, 그 결과를 반환하지 않았기 때문입니다.

\`\`\`python
def wrapper():
    print("함수 실행 전")
    func()
    print("함수 실행 후")
\`\`\`

반환값을 유지하려면 원래 함수의 반환값을 받아서 다시 반환해야 합니다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        result = func()
        print("함수 실행 후")
        return result

    return wrapper
\`\`\`

이제 다시 실행해봅시다.

\`\`\`python
def simple_decorator(func):
    def wrapper():
        print("함수 실행 전")
        result = func()
        print("함수 실행 후")
        return result

    return wrapper


@simple_decorator
def add():
    return 10 + 20

result = add()
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
함수 실행 전
함수 실행 후
30
\`\`\`

데코레이터를 만들 때는 원래 함수의 반환값을 잃어버리지 않도록 주의해야 합니다.

---
`;export{e as default};