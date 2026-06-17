var e=`<!-- 원본: python_basic_chapter_11_book.md / 세부 장: 11-1 -->

# 11.1 JSON 데이터 다루기

### 11.1.1 JSON이란 무엇인가

JSON은 데이터를 주고받을 때 자주 사용하는 텍스트 기반 형식입니다. JSON은 **JavaScript Object Notation**의 줄임말이지만, 현재는 JavaScript뿐만 아니라 파이썬, 자바, C#, PHP 등 다양한 언어에서 널리 사용됩니다.

JSON은 사람이 읽기에도 비교적 쉽고, 프로그램이 해석하기에도 좋은 구조를 가지고 있습니다. 특히 API에서 데이터를 주고받을 때 JSON 형식이 자주 사용됩니다.

예를 들어 한 명의 고객 정보를 JSON으로 표현하면 다음과 같습니다.

\`\`\`json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "grade": "VIP",
  "point": 1200
}
\`\`\`

겉모습은 파이썬 딕셔너리와 매우 비슷합니다. key와 value가 있고, 중괄호 \`{}\`로 데이터를 묶습니다.

하지만 JSON은 파이썬 객체가 아니라 **문자열 형식의 데이터 표현 방식**입니다. 따라서 파이썬에서 JSON을 사용하려면 JSON 문자열을 파이썬 딕셔너리나 리스트로 변환하거나, 반대로 파이썬 객체를 JSON 문자열로 변환해야 합니다.

---

### 11.1.2 JSON과 파이썬 자료형의 관계

JSON은 파이썬 자료형과 비슷한 구조를 가지고 있습니다.

| JSON | 파이썬 |
|---|---|
| object | dict |
| array | list |
| string | str |
| number | int 또는 float |
| true | True |
| false | False |
| null | None |

예를 들어 다음 JSON 데이터를 봅시다.

\`\`\`json
{
  "name": "김민수",
  "age": 28,
  "is_member": true,
  "coupon": null,
  "orders": ["A001", "A002", "A003"]
}
\`\`\`

이 데이터를 파이썬 객체로 바꾸면 다음과 비슷한 구조가 됩니다.

\`\`\`python
customer = {
    "name": "김민수",
    "age": 28,
    "is_member": True,
    "coupon": None,
    "orders": ["A001", "A002", "A003"]
}
\`\`\`

차이가 보이나요? JSON에서는 \`true\`, \`false\`, \`null\`처럼 소문자를 사용하지만, 파이썬에서는 \`True\`, \`False\`, \`None\`처럼 첫 글자가 대문자입니다.

이 차이 때문에 JSON 문자열을 직접 파이썬 코드처럼 사용하면 안 됩니다. 파이썬에서는 \`json\` 모듈을 사용해 JSON과 파이썬 객체를 안전하게 변환합니다.

---

### 11.1.3 JSON 문자열을 파이썬 객체로 변환하기

파이썬에서 JSON을 다루려면 먼저 \`json\` 모듈을 import합니다.

\`\`\`python
import json
\`\`\`

JSON 문자열을 파이썬 객체로 변환할 때는 \`json.loads()\`를 사용합니다.

\`\`\`python
import json

json_text = '{"name": "홍길동", "age": 30, "is_member": true}'

data = json.loads(json_text)

print(data)
print(type(data))
print(data["name"])
print(data["age"])
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{'name': '홍길동', 'age': 30, 'is_member': True}
<class 'dict'>
홍길동
30
\`\`\`

\`json.loads()\`에서 \`s\`는 string을 의미한다고 이해하면 쉽습니다. 즉, JSON **문자열**을 파이썬 객체로 읽어 오는 함수입니다.

주의할 점은 JSON 문자열 안의 문자열은 반드시 큰따옴표를 사용해야 한다는 것입니다.

다음은 올바른 JSON 문자열입니다.

\`\`\`python
json_text = '{"name": "홍길동"}'
\`\`\`

다음은 JSON 형식으로는 올바르지 않습니다.

\`\`\`python
json_text = "{'name': '홍길동'}"
\`\`\`

파이썬 딕셔너리처럼 보이지만 JSON에서는 작은따옴표가 아니라 큰따옴표를 사용해야 합니다.

---

### 11.1.4 파이썬 객체를 JSON 문자열로 변환하기

파이썬 딕셔너리나 리스트를 JSON 문자열로 바꿀 때는 \`json.dumps()\`를 사용합니다.

\`\`\`python
import json

customer = {
    "name": "홍길동",
    "age": 30,
    "grade": "VIP"
}

json_text = json.dumps(customer)

print(json_text)
print(type(json_text))
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
{"name": "\\ud64d\\uae38\\ub3d9", "age": 30, "grade": "VIP"}
<class 'str'>
\`\`\`

한글이 \`\\ud64d\\uae38\\ub3d9\`처럼 보일 수 있습니다. 이것은 한글이 깨진 것이 아니라, JSON 문자열 안에서 유니코드 이스케이프 형태로 표현된 것입니다.

사람이 읽기 좋게 한글을 그대로 출력하려면 \`ensure_ascii=False\`를 사용합니다.

\`\`\`python
import json

customer = {
    "name": "홍길동",
    "age": 30,
    "grade": "VIP"
}

json_text = json.dumps(customer, ensure_ascii=False)

print(json_text)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{"name": "홍길동", "age": 30, "grade": "VIP"}
\`\`\`

JSON을 보기 좋게 줄바꿈과 들여쓰기로 출력하고 싶다면 \`indent\` 옵션을 사용합니다.

\`\`\`python
json_text = json.dumps(customer, ensure_ascii=False, indent=2)
print(json_text)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`json
{
  "name": "홍길동",
  "age": 30,
  "grade": "VIP"
}
\`\`\`

---

### 11.1.5 JSON 파일 읽기

JSON 데이터는 문자열로만 사용하는 것이 아니라 파일로 저장해서 사용하는 경우도 많습니다.

예를 들어 \`customer.json\` 파일이 다음과 같다고 가정합니다.

\`\`\`json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "grade": "VIP"
}
\`\`\`

파이썬에서 이 파일을 읽으려면 \`json.load()\`를 사용합니다.

\`\`\`python
import json

with open("customer.json", "r", encoding="utf-8") as file:
    customer = json.load(file)

print(customer)
print(customer["name"])
print(customer["email"])
\`\`\`

\`json.loads()\`와 \`json.load()\`는 이름이 비슷해서 헷갈리기 쉽습니다.

| 함수 | 용도 |
|---|---|
| \`json.loads()\` | JSON 문자열을 파이썬 객체로 변환 |
| \`json.load()\` | JSON 파일을 읽어 파이썬 객체로 변환 |

\`s\`가 붙으면 문자열(string)을 다룬다고 기억하면 좋습니다.

---

### 11.1.6 JSON 파일 쓰기

파이썬 객체를 JSON 파일로 저장할 때는 \`json.dump()\`를 사용합니다.

\`\`\`python
import json

customer = {
    "name": "이서연",
    "email": "seo@example.com",
    "grade": "BASIC",
    "point": 500
}

with open("customer_output.json", "w", encoding="utf-8") as file:
    json.dump(customer, file, ensure_ascii=False, indent=2)
\`\`\`

위 코드를 실행하면 \`customer_output.json\` 파일이 생성됩니다.

저장된 파일 내용은 다음과 같습니다.

\`\`\`json
{
  "name": "이서연",
  "email": "seo@example.com",
  "grade": "BASIC",
  "point": 500
}
\`\`\`

정리하면 다음과 같습니다.

| 함수 | 용도 |
|---|---|
| \`json.dumps()\` | 파이썬 객체를 JSON 문자열로 변환 |
| \`json.dump()\` | 파이썬 객체를 JSON 파일로 저장 |
| \`json.loads()\` | JSON 문자열을 파이썬 객체로 변환 |
| \`json.load()\` | JSON 파일을 파이썬 객체로 읽기 |

---

### 11.1.7 중첩 JSON 데이터 접근하기

실무에서 만나는 JSON 데이터는 단순한 구조보다 중첩 구조가 많습니다.

다음 예제를 봅시다.

\`\`\`python
customer = {
    "name": "홍길동",
    "grade": "VIP",
    "address": {
        "city": "서울",
        "district": "강남구"
    },
    "orders": [
        {"id": "A001", "price": 12000},
        {"id": "A002", "price": 35000},
        {"id": "A003", "price": 18000}
    ]
}
\`\`\`

고객의 도시를 가져오려면 딕셔너리 안의 딕셔너리에 접근해야 합니다.

\`\`\`python
city = customer["address"]["city"]
print(city)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
서울
\`\`\`

주문 목록의 첫 번째 주문 번호를 가져오려면 리스트 안의 딕셔너리에 접근해야 합니다.

\`\`\`python
first_order_id = customer["orders"][0]["id"]
print(first_order_id)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
A001
\`\`\`

주문 금액의 합계를 구하려면 반복문을 사용할 수 있습니다.

\`\`\`python
total_price = 0

for order in customer["orders"]:
    total_price += order["price"]

print(total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
65000
\`\`\`

JSON 데이터를 잘 다루려면 리스트와 딕셔너리 구조를 정확히 이해해야 합니다. 그래서 4장에서 배운 자료구조가 여기서 다시 중요해집니다.

---

### 11.1.8 없는 key를 안전하게 처리하기

외부에서 받은 JSON 데이터는 항상 우리가 기대한 key를 가지고 있지 않을 수 있습니다.

\`\`\`python
customer = {
    "name": "홍길동",
    "grade": "VIP"
}

print(customer["email"])
\`\`\`

위 코드는 \`email\` key가 없기 때문에 \`KeyError\`가 발생합니다.

이럴 때는 \`get()\`을 사용할 수 있습니다.

\`\`\`python
email = customer.get("email")
print(email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
None
\`\`\`

기본값을 지정할 수도 있습니다.

\`\`\`python
email = customer.get("email", "이메일 없음")
print(email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
이메일 없음
\`\`\`

실무에서는 API 응답이나 외부 파일의 데이터 구조가 일부 달라질 수 있습니다. 이럴 때 \`get()\`을 사용하면 프로그램이 갑자기 멈추는 상황을 줄일 수 있습니다.

---

### 11.1.9 JSON 실무 예제: 활성 사용자만 추출하기

다음과 같은 사용자 데이터가 있다고 가정해 봅시다.

\`\`\`python
users = [
    {"name": "홍길동", "email": "hong@example.com", "active": True},
    {"name": "김민수", "email": "minsu@example.com", "active": False},
    {"name": "이서연", "email": "seo@example.com", "active": True}
]
\`\`\`

이 중에서 활성 사용자만 골라 새 JSON 파일로 저장해 보겠습니다.

\`\`\`python
import json

users = [
    {"name": "홍길동", "email": "hong@example.com", "active": True},
    {"name": "김민수", "email": "minsu@example.com", "active": False},
    {"name": "이서연", "email": "seo@example.com", "active": True}
]

active_users = []

for user in users:
    if user["active"]:
        active_users.append(user)

with open("active_users.json", "w", encoding="utf-8") as file:
    json.dump(active_users, file, ensure_ascii=False, indent=2)
\`\`\`

저장된 JSON 파일은 다음과 같습니다.

\`\`\`json
[
  {
    "name": "홍길동",
    "email": "hong@example.com",
    "active": true
  },
  {
    "name": "이서연",
    "email": "seo@example.com",
    "active": true
  }
]
\`\`\`

이 예제는 간단하지만 실무에서 자주 나오는 흐름입니다.

\`\`\`text
1. 데이터 목록을 읽는다.
2. 조건에 맞는 데이터만 고른다.
3. 결과를 새 파일로 저장한다.
\`\`\`

---
`;export{e as default};