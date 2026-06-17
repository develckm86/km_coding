var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-2 -->

# 3.2 인자 처리 심화

함수를 잘 설계하려면 함수가 값을 어떻게 받는지 정확히 이해해야 합니다. 기초 과정에서는 위치 인자, 키워드 인자, 기본값 인자를 배웠습니다. 이번에는 여기에 \`*args\`, \`**kwargs\`, 키워드 전용 인자, 위치 전용 인자 개념까지 확장합니다.

---

### 3.2.1 위치 인자와 키워드 인자 복습

위치 인자는 순서대로 전달되는 인자입니다.

\`\`\`python
def create_user(name, age, email):
    return {
        "name": name,
        "age": age,
        "email": email,
    }

user = create_user("민수", 25, "minsu@example.com")
print(user)
\`\`\`

위치 인자는 순서가 중요합니다. 순서가 바뀌면 잘못된 값이 들어갈 수 있습니다.

\`\`\`python
user = create_user(25, "민수", "minsu@example.com")
print(user)
\`\`\`

위 코드는 문법적으로는 실행될 수 있지만 의미상 잘못된 데이터가 만들어집니다.

키워드 인자는 인자 이름을 명시해서 전달합니다.

\`\`\`python
user = create_user(
    name="민수",
    age=25,
    email="minsu@example.com",
)

print(user)
\`\`\`

키워드 인자는 순서가 바뀌어도 의미가 명확합니다.

\`\`\`python
user = create_user(
    email="minsu@example.com",
    name="민수",
    age=25,
)
\`\`\`

실무에서는 값이 여러 개인 함수를 호출할 때 키워드 인자를 사용하면 코드가 더 읽기 쉬워집니다.

---

### 3.2.2 기본값 인자

기본값 인자는 인자를 전달하지 않았을 때 사용할 값을 미리 정해두는 방식입니다.

\`\`\`python
def calculate_price(price, quantity=1):
    return price * quantity

print(calculate_price(10000))
print(calculate_price(10000, 3))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10000
30000
\`\`\`

\`quantity\`를 전달하지 않으면 기본값 \`1\`이 사용됩니다.

기본값 인자는 선택 옵션이 있는 함수에서 자주 사용합니다.

\`\`\`python
def send_message(message, receiver="관리자"):
    print(f"{receiver}에게 메시지 전송: {message}")

send_message("서버가 시작되었습니다.")
send_message("보고서가 생성되었습니다.", receiver="팀장")
\`\`\`

---

### 3.2.3 기본값으로 가변 객체를 사용하면 안 되는 이유

기본값 인자에서 가장 주의해야 할 것은 리스트나 딕셔너리 같은 가변 객체를 기본값으로 사용하지 않는 것입니다.

다음 코드를 보겠습니다.

\`\`\`python
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("A"))
print(add_item("B"))
print(add_item("C"))
\`\`\`

많은 초보자는 다음 결과를 예상합니다.

\`\`\`text
['A']
['B']
['C']
\`\`\`

하지만 실제 결과는 다음과 같습니다.

\`\`\`text
['A']
['A', 'B']
['A', 'B', 'C']
\`\`\`

이유는 기본값 \`[]\`가 함수가 호출될 때마다 새로 만들어지는 것이 아니라, 함수가 정의될 때 한 번 만들어지고 계속 재사용되기 때문입니다.

이 문제를 피하려면 기본값을 \`None\`으로 두고 함수 안에서 새 리스트를 만들어야 합니다.

\`\`\`python
def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items

print(add_item("A"))
print(add_item("B"))
print(add_item("C"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['A']
['B']
['C']
\`\`\`

이 패턴은 실무에서 매우 중요합니다. 기본값에 리스트, 딕셔너리, 집합을 직접 넣지 않는 습관을 들여야 합니다.

---

### 3.2.4 \`*args\`

\`*args\`는 개수가 정해지지 않은 위치 인자를 받을 때 사용합니다.

\`\`\`python
def add_all(*args):
    total = 0

    for number in args:
        total += number

    return total

print(add_all(1, 2, 3))
print(add_all(10, 20, 30, 40))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
6
100
\`\`\`

\`args\`는 함수 안에서 튜플처럼 다뤄집니다.

\`\`\`python
def show_args(*args):
    print(args)
    print(type(args))

show_args("A", "B", "C")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
('A', 'B', 'C')
<class 'tuple'>
\`\`\`

\`*args\`는 인자 개수가 유동적인 함수를 만들 때 유용합니다.

예를 들어 여러 개의 점수를 받아 평균을 계산할 수 있습니다.

\`\`\`python
def average(*scores):
    if not scores:
        return 0

    return sum(scores) / len(scores)

print(average(80, 90, 100))
print(average())
\`\`\`

---

### 3.2.5 \`**kwargs\`

\`**kwargs\`는 개수가 정해지지 않은 키워드 인자를 받을 때 사용합니다.

\`\`\`python
def create_profile(**kwargs):
    print(kwargs)
    print(type(kwargs))

create_profile(name="민수", age=25, email="minsu@example.com")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{'name': '민수', 'age': 25, 'email': 'minsu@example.com'}
<class 'dict'>
\`\`\`

\`kwargs\`는 함수 안에서 딕셔너리처럼 다뤄집니다.

\`\`\`python
def print_user_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_user_info(name="지영", department="마케팅", level="대리")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
name: 지영
department: 마케팅
level: 대리
\`\`\`

\`**kwargs\`는 옵션이 많은 함수, 설정값을 받는 함수, 외부 라이브러리에서 전달받은 인자를 그대로 넘겨야 하는 함수에서 자주 보입니다.

---

### 3.2.6 \`*args\`와 \`**kwargs\` 함께 사용하기

\`*args\`와 \`**kwargs\`를 함께 사용할 수 있습니다.

\`\`\`python
def show_arguments(*args, **kwargs):
    print("위치 인자:", args)
    print("키워드 인자:", kwargs)

show_arguments(1, 2, 3, name="민수", age=25)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
위치 인자: (1, 2, 3)
키워드 인자: {'name': '민수', 'age': 25}
\`\`\`

함수 정의에서 일반적인 순서는 다음과 같습니다.

\`\`\`python
def function_name(일반_인자, *args, 기본값_인자=None, **kwargs):
    pass
\`\`\`

실무에서 자주 보는 형태는 다음과 같습니다.

\`\`\`python
def request_data(url, *args, timeout=10, **kwargs):
    print("URL:", url)
    print("추가 위치 인자:", args)
    print("timeout:", timeout)
    print("추가 옵션:", kwargs)
\`\`\`

---

### 3.2.7 키워드 전용 인자

키워드 전용 인자는 반드시 이름을 명시해서 전달해야 하는 인자입니다.

\`\`\`python
def create_report(title, *, author, format="pdf"):
    return f"{title} / 작성자: {author} / 형식: {format}"

print(create_report("월간 보고서", author="민수"))
\`\`\`

\`*\` 뒤에 있는 \`author\`와 \`format\`은 키워드로만 전달할 수 있습니다.

다음 코드는 에러가 발생합니다.

\`\`\`python
create_report("월간 보고서", "민수")
\`\`\`

키워드 전용 인자를 사용하면 함수 호출이 더 명확해집니다. 특히 옵션이 여러 개인 함수에서는 실수를 줄일 수 있습니다.

\`\`\`python
def save_file(content, *, path, encoding="utf-8", overwrite=False):
    print("저장 경로:", path)
    print("인코딩:", encoding)
    print("덮어쓰기 여부:", overwrite)
\`\`\`

이 함수는 다음처럼 호출해야 합니다.

\`\`\`python
save_file(
    "hello",
    path="result.txt",
    encoding="utf-8",
    overwrite=True,
)
\`\`\`

---

### 3.2.8 위치 전용 인자 개념

파이썬에서는 \`/\` 앞의 인자를 위치 전용 인자로 만들 수 있습니다.

\`\`\`python
def divide(a, b, /):
    return a / b

print(divide(10, 2))
\`\`\`

다음처럼 키워드 인자로 호출하면 에러가 발생합니다.

\`\`\`python
divide(a=10, b=2)
\`\`\`

위치 전용 인자는 일반적인 입문 코드에서는 자주 직접 작성하지 않습니다. 그러나 파이썬 내장 함수나 표준 라이브러리 문서에서 볼 수 있으므로, \`/\`가 이런 의미라는 정도는 알아두면 좋습니다.

예를 들어 어떤 함수 설명에서 다음과 같은 형태를 보면,

\`\`\`python
some_function(a, b, /, c, *, d)
\`\`\`

의미는 다음과 같습니다.

- \`a\`, \`b\`: 위치 인자로만 전달
- \`c\`: 위치 인자 또는 키워드 인자로 전달 가능
- \`d\`: 키워드 인자로만 전달

---
`;export{e as default};