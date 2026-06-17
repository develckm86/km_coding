var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-3 -->

# 3.3 언패킹

언패킹은 리스트, 튜플, 딕셔너리 같은 자료구조 안에 들어 있는 값을 풀어서 사용하는 문법입니다. 기초 단계에서 튜플 언패킹을 간단히 배웠다면, 이번에는 함수 호출과 연결해서 더 깊게 살펴보겠습니다.

---

### 3.3.1 리스트와 튜플 언패킹

다음과 같은 튜플이 있다고 하겠습니다.

\`\`\`python
point = (10, 20)
\`\`\`

이 값을 각각 변수에 나누어 담을 수 있습니다.

\`\`\`python
x, y = point

print(x)
print(y)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
20
\`\`\`

리스트도 같은 방식으로 언패킹할 수 있습니다.

\`\`\`python
user = ["민수", 25, "minsu@example.com"]
name, age, email = user

print(name)
print(age)
print(email)
\`\`\`

언패킹할 때는 왼쪽 변수 개수와 오른쪽 값 개수가 맞아야 합니다.

\`\`\`python
name, age = ["민수", 25, "minsu@example.com"]
\`\`\`

위 코드는 값이 3개인데 변수는 2개이므로 에러가 발생합니다.

---

### 3.3.2 확장 언패킹

값의 일부만 따로 받고 나머지를 묶어서 받을 수도 있습니다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]

first, *rest = numbers

print(first)
print(rest)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
[2, 3, 4, 5]
\`\`\`

마지막 값만 따로 받을 수도 있습니다.

\`\`\`python
*body, last = numbers

print(body)
print(last)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
5
\`\`\`

처음과 마지막을 따로 받고 가운데를 묶을 수도 있습니다.

\`\`\`python
first, *middle, last = numbers

print(first)
print(middle)
print(last)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
[2, 3, 4]
5
\`\`\`

확장 언패킹은 데이터의 첫 번째 값, 마지막 값, 나머지 값을 구분해 처리할 때 유용합니다.

---

### 3.3.3 함수 호출에서 \`*\` 사용하기

리스트나 튜플에 담긴 값을 함수 인자로 풀어서 전달할 수 있습니다.

\`\`\`python
def calculate_total(price, quantity, discount_rate):
    discounted_price = price * (1 - discount_rate)
    return discounted_price * quantity

values = [10000, 3, 0.1]

result = calculate_total(*values)
print(result)
\`\`\`

위 코드는 다음 호출과 같습니다.

\`\`\`python
calculate_total(10000, 3, 0.1)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
27000.0
\`\`\`

\`*values\`는 리스트 안의 값을 위치 인자로 풀어서 전달합니다.

이 방식은 데이터가 리스트나 튜플로 준비되어 있고, 함수가 여러 인자를 받을 때 유용합니다.

---

### 3.3.4 함수 호출에서 \`**\` 사용하기

딕셔너리에 담긴 값을 키워드 인자로 풀어서 전달할 수 있습니다.

\`\`\`python
def create_user(name, age, email):
    return {
        "name": name,
        "age": age,
        "email": email,
    }

user_data = {
    "name": "민수",
    "age": 25,
    "email": "minsu@example.com",
}

user = create_user(**user_data)
print(user)
\`\`\`

위 코드는 다음 호출과 같습니다.

\`\`\`python
create_user(name="민수", age=25, email="minsu@example.com")
\`\`\`

딕셔너리의 key 이름과 함수의 매개변수 이름이 일치해야 합니다.

만약 딕셔너리에 함수가 받지 않는 key가 있으면 에러가 발생합니다.

\`\`\`python
user_data = {
    "name": "민수",
    "age": 25,
    "email": "minsu@example.com",
    "department": "개발팀",
}

create_user(**user_data)
\`\`\`

\`create_user\` 함수는 \`department\` 매개변수를 받지 않기 때문에 에러가 발생합니다.

이런 상황에서는 필요한 key만 골라 전달해야 합니다.

\`\`\`python
allowed_keys = ["name", "age", "email"]
filtered_data = {}

for key in allowed_keys:
    filtered_data[key] = user_data[key]

user = create_user(**filtered_data)
print(user)
\`\`\`

---

### 3.3.5 딕셔너리 병합과 언패킹

딕셔너리 언패킹을 사용하면 여러 딕셔너리를 합쳐 새 딕셔너리를 만들 수 있습니다.

\`\`\`python
default_config = {
    "encoding": "utf-8",
    "timeout": 10,
    "retry": 3,
}

user_config = {
    "timeout": 30,
}

config = {
    **default_config,
    **user_config,
}

print(config)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{'encoding': 'utf-8', 'timeout': 30, 'retry': 3}
\`\`\`

나중에 나온 값이 앞의 값을 덮어씁니다. 그래서 \`timeout\`은 \`10\`이 아니라 \`30\`이 됩니다.

이 방식은 기본 설정값과 사용자 설정값을 합칠 때 자주 사용됩니다.

---
`;export{e as default};