var e=`# 11장 데이터 처리 기초

## 이 장에서 배울 내용

10장에서는 텍스트 파일, CSV 파일, 엑셀 파일, 폴더와 파일 경로를 다루는 방법을 배웠습니다. 파일을 읽고 쓰는 방법을 알게 되면 이제 그 안에 들어 있는 데이터를 해석하고, 필요한 형태로 바꾸고, 원하는 결과로 정리할 수 있어야 합니다.

실무에서 만나는 데이터는 대부분 다음과 같은 모습입니다.

\`\`\`text
- API에서 받은 JSON 데이터
- 파일명이나 보고서 기준일에 들어 있는 날짜 데이터
- 전화번호, 이메일, 상품 코드처럼 일정한 패턴을 가진 문자열
- CSV나 엑셀에 들어 있는 표 형태 데이터
- 비어 있는 값, 중복된 값, 형식이 맞지 않는 값이 섞인 원본 데이터
\`\`\`

이런 데이터는 그대로 사용하기 어렵습니다. 예를 들어 고객 명단을 받았는데 전화번호 형식이 서로 다르고, 이메일에 대문자와 공백이 섞여 있고, 가입일이 문자열로 저장되어 있다면 먼저 정리하는 과정이 필요합니다.

이 장에서는 데이터를 다루기 위한 기초 도구를 배웁니다.

\`\`\`text
- JSON 데이터 읽고 쓰기
- 날짜와 시간 데이터 처리하기
- 정규표현식으로 문자열 패턴 찾기
- requests로 API 데이터 가져오기
- pandas로 표 형태 데이터 다루기
- 데이터 클리닝 실무 패턴 익히기
\`\`\`

이 장의 목표는 단순히 함수 이름을 외우는 것이 아닙니다. 목표는 **외부에서 들어온 데이터를 파이썬에서 사용할 수 있는 형태로 바꾸고, 필요한 값만 추출하고, 분석하기 좋은 형태로 정리하는 흐름**을 이해하는 것입니다.

---

## 11.1 JSON 데이터 다루기

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

## 11.2 날짜와 시간 데이터 처리

### 11.2.1 날짜와 시간이 필요한 이유

실무 데이터에는 날짜와 시간이 자주 등장합니다.

\`\`\`text
- 주문일
- 가입일
- 결제일
- 보고서 기준일
- 파일 생성일
- 마감일
- 로그 발생 시간
- 최근 7일 데이터
- 이번 달 매출
\`\`\`

문제는 날짜가 항상 같은 형식으로 들어오지 않는다는 점입니다.

\`\`\`text
2026-06-15
2026/06/15
2026.06.15
20260615
2026년 6월 15일
\`\`\`

사람은 위 값들이 모두 같은 날짜라는 것을 알 수 있습니다. 하지만 컴퓨터는 단순한 문자열로 보면 서로 다른 값으로 처리합니다.

날짜를 제대로 비교하거나 계산하려면 문자열을 날짜 객체로 바꿔야 합니다. 파이썬에서는 \`datetime\` 모듈을 사용합니다.

---

### 11.2.2 \`datetime\` 모듈

날짜와 시간을 다루려면 먼저 \`datetime\` 모듈에서 필요한 클래스를 가져옵니다.

\`\`\`python
from datetime import date, time, datetime, timedelta
\`\`\`

각각의 역할은 다음과 같습니다.

| 이름 | 의미 |
|---|---|
| \`date\` | 날짜 |
| \`time\` | 시간 |
| \`datetime\` | 날짜와 시간 |
| \`timedelta\` | 시간 차이 |

날짜 객체는 연, 월, 일을 가집니다.

\`\`\`python
from datetime import date

today = date(2026, 6, 15)
print(today)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-06-15
\`\`\`

시간 객체는 시, 분, 초를 가집니다.

\`\`\`python
from datetime import time

start_time = time(9, 30, 0)
print(start_time)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
09:30:00
\`\`\`

날짜와 시간을 함께 표현하려면 \`datetime\`을 사용합니다.

\`\`\`python
from datetime import datetime

created_at = datetime(2026, 6, 15, 9, 30, 0)
print(created_at)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-06-15 09:30:00
\`\`\`

---

### 11.2.3 현재 날짜와 시간 구하기

현재 날짜와 시간을 구할 때는 \`datetime.now()\`를 사용합니다.

\`\`\`python
from datetime import datetime

now = datetime.now()
print(now)
\`\`\`

실행 결과는 실행하는 시점에 따라 달라집니다.

\`\`\`text
2026-06-15 14:30:21.123456
\`\`\`

오늘 날짜만 필요하다면 \`date.today()\`를 사용할 수 있습니다.

\`\`\`python
from datetime import date

today = date.today()
print(today)
\`\`\`

날짜와 시간을 객체로 다루면 연, 월, 일, 시, 분, 초를 각각 꺼낼 수 있습니다.

\`\`\`python
from datetime import datetime

now = datetime.now()

print(now.year)
print(now.month)
print(now.day)
print(now.hour)
print(now.minute)
print(now.second)
\`\`\`

이 기능은 파일명이나 보고서 기준일을 만들 때 유용합니다.

---

### 11.2.4 날짜를 문자열로 변환하기

날짜 객체를 원하는 문자열 형식으로 바꿀 때는 \`strftime()\`을 사용합니다.

\`\`\`python
from datetime import datetime

now = datetime(2026, 6, 15, 9, 30, 0)

text = now.strftime("%Y-%m-%d")
print(text)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-06-15
\`\`\`

자주 사용하는 형식 코드는 다음과 같습니다.

| 코드 | 의미 | 예시 |
|---|---|---|
| \`%Y\` | 4자리 연도 | 2026 |
| \`%m\` | 2자리 월 | 06 |
| \`%d\` | 2자리 일 | 15 |
| \`%H\` | 24시간 기준 시 | 09 |
| \`%M\` | 분 | 30 |
| \`%S\` | 초 | 00 |

예를 들어 파일명에 날짜를 넣고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
from datetime import datetime

now = datetime.now()
file_name = now.strftime("sales_%Y%m%d.xlsx")

print(file_name)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
sales_20260615.xlsx
\`\`\`

---

### 11.2.5 문자열을 날짜로 변환하기

외부 파일이나 API에서 받은 날짜는 보통 문자열입니다.

\`\`\`python
date_text = "2026-06-15"
\`\`\`

이 값을 날짜로 계산하려면 \`strptime()\`을 사용해 \`datetime\` 객체로 변환해야 합니다.

\`\`\`python
from datetime import datetime

date_text = "2026-06-15"
date_value = datetime.strptime(date_text, "%Y-%m-%d")

print(date_value)
print(type(date_value))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-06-15 00:00:00
<class 'datetime.datetime'>
\`\`\`

문자열 형식과 format 문자열은 반드시 일치해야 합니다.

\`\`\`python
from datetime import datetime

date_text = "2026/06/15"
date_value = datetime.strptime(date_text, "%Y/%m/%d")

print(date_value)
\`\`\`

문자열은 \`/\`를 사용하고 있는데 format 문자열에서 \`-\`를 사용하면 에러가 발생합니다.

\`\`\`python
from datetime import datetime

date_text = "2026/06/15"

# 잘못된 예
# datetime.strptime(date_text, "%Y-%m-%d")
\`\`\`

날짜 변환에서 에러가 자주 발생하는 이유는 대부분 문자열 형식과 format 코드가 맞지 않기 때문입니다.

---

### 11.2.6 날짜 계산하기

날짜를 계산할 때는 \`timedelta\`를 사용합니다.

\`\`\`python
from datetime import date, timedelta

today = date(2026, 6, 15)
tomorrow = today + timedelta(days=1)
yesterday = today - timedelta(days=1)

print(today)
print(tomorrow)
print(yesterday)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-06-15
2026-06-16
2026-06-14
\`\`\`

일주일 전 날짜도 구할 수 있습니다.

\`\`\`python
from datetime import date, timedelta

today = date(2026, 6, 15)
seven_days_ago = today - timedelta(days=7)

print(seven_days_ago)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2026-06-08
\`\`\`

두 날짜의 차이를 구할 수도 있습니다.

\`\`\`python
from datetime import date

start_date = date(2026, 6, 1)
end_date = date(2026, 6, 15)

diff = end_date - start_date

print(diff.days)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
14
\`\`\`

---

### 11.2.7 날짜 비교와 필터링

날짜 객체는 비교할 수 있습니다.

\`\`\`python
from datetime import date

due_date = date(2026, 6, 10)
today = date(2026, 6, 15)

if due_date < today:
    print("마감일이 지났습니다.")
else:
    print("아직 마감 전입니다.")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
마감일이 지났습니다.
\`\`\`

날짜 목록에서 최근 7일 데이터만 고르는 예제를 봅시다.

\`\`\`python
from datetime import datetime, timedelta

orders = [
    {"id": "A001", "date": "2026-06-01", "price": 12000},
    {"id": "A002", "date": "2026-06-10", "price": 35000},
    {"id": "A003", "date": "2026-06-15", "price": 18000}
]

base_date = datetime.strptime("2026-06-15", "%Y-%m-%d")
start_date = base_date - timedelta(days=7)

recent_orders = []

for order in orders:
    order_date = datetime.strptime(order["date"], "%Y-%m-%d")

    if order_date >= start_date:
        recent_orders.append(order)

print(recent_orders)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[{'id': 'A002', 'date': '2026-06-10', 'price': 35000}, {'id': 'A003', 'date': '2026-06-15', 'price': 18000}]
\`\`\`

---

### 11.2.8 시간대 개념 기초

시간 데이터를 다룰 때는 시간대도 중요합니다. 한국에서의 오전 9시는 미국 뉴욕의 오전 9시와 같은 시점이 아닙니다.

기초 수업에서는 시간대를 깊게 다루지 않지만, 다음 개념은 기억해 두는 것이 좋습니다.

\`\`\`text
- 로컬 시간: 현재 컴퓨터나 사용자가 속한 지역의 시간
- UTC: 세계 표준 시간처럼 기준으로 많이 사용하는 시간
- 시간대: 지역별 시간 차이를 표현하는 정보
\`\`\`

API에서 받은 시간이 UTC인지, 한국 시간인지 확인하지 않고 사용하면 보고서 기준일이나 로그 분석 결과가 어긋날 수 있습니다.

처음에는 다음 원칙만 기억하면 됩니다.

\`\`\`text
외부 시스템에서 받은 날짜와 시간은 반드시 기준 시간대가 무엇인지 확인한다.
\`\`\`

---

### 11.2.9 날짜 실무 예제: 오늘 날짜가 들어간 파일명 만들기

보고서 파일을 매일 생성한다면 파일명에 날짜를 넣는 것이 좋습니다.

\`\`\`python
from datetime import datetime

now = datetime.now()
file_name = now.strftime("report_%Y%m%d.txt")

with open(file_name, "w", encoding="utf-8") as file:
    file.write("오늘의 보고서입니다.")

print(file_name)
\`\`\`

실행 결과는 실행 날짜에 따라 달라집니다.

\`\`\`text
report_20260615.txt
\`\`\`

이렇게 하면 파일을 날짜별로 관리하기 쉬워집니다.

---

## 11.3 정규표현식 기본

### 11.3.1 정규표현식이란 무엇인가

정규표현식은 문자열에서 특정 패턴을 찾기 위한 표현 방법입니다.

일반적인 문자열 검색은 특정 단어가 있는지만 확인합니다.

\`\`\`python
text = "문의는 hong@example.com 으로 보내주세요."

print("@" in text)
\`\`\`

하지만 실무에서는 단순히 \`@\`가 들어 있는지보다, 문자열 안에서 이메일 주소 전체를 찾고 싶을 때가 많습니다.

\`\`\`text
hong@example.com
\`\`\`

또는 전화번호를 찾고 싶을 수도 있습니다.

\`\`\`text
010-1234-5678
\`\`\`

이처럼 일정한 규칙을 가진 문자열을 찾을 때 정규표현식을 사용합니다.

정규표현식은 처음 보면 어렵게 느껴질 수 있습니다. 하지만 기초 단계에서는 모든 문법을 외우는 것보다 자주 쓰는 패턴을 이해하는 것이 중요합니다.

---

### 11.3.2 \`re\` 모듈

파이썬에서 정규표현식을 사용하려면 \`re\` 모듈을 import합니다.

\`\`\`python
import re
\`\`\`

자주 사용하는 함수는 다음과 같습니다.

| 함수 | 설명 |
|---|---|
| \`re.search()\` | 문자열 전체에서 첫 번째 매칭 찾기 |
| \`re.match()\` | 문자열 시작 부분에서 매칭 찾기 |
| \`re.findall()\` | 매칭되는 모든 문자열 찾기 |
| \`re.sub()\` | 패턴에 맞는 문자열 바꾸기 |

---

### 11.3.3 \`re.search()\`

\`re.search()\`는 문자열 전체에서 패턴과 일치하는 첫 번째 위치를 찾습니다.

\`\`\`python
import re

text = "문의는 hong@example.com 으로 보내주세요."

result = re.search(r"\\w+@\\w+\\.\\w+", text)

print(result)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
<re.Match object; span=(4, 20), match='hong@example.com'>
\`\`\`

매칭된 문자열만 꺼내려면 \`group()\`을 사용합니다.

\`\`\`python
if result:
    print(result.group())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
hong@example.com
\`\`\`

\`re.search()\`는 일치하는 값이 없으면 \`None\`을 반환합니다. 따라서 \`group()\`을 사용하기 전에 결과가 있는지 확인하는 것이 안전합니다.

---

### 11.3.4 \`re.match()\`

\`re.match()\`는 문자열의 시작 부분이 패턴과 일치하는지 확인합니다.

\`\`\`python
import re

text = "Python 3.14"

result = re.match(r"Python", text)

if result:
    print("시작 부분이 일치합니다.")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
시작 부분이 일치합니다.
\`\`\`

반면 다음 코드는 일치하지 않습니다.

\`\`\`python
import re

text = "I like Python"

result = re.match(r"Python", text)

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
None
\`\`\`

문자열 중간에 있는 패턴을 찾고 싶다면 \`match()\`가 아니라 \`search()\`를 사용해야 합니다.

---

### 11.3.5 \`re.findall()\`

문자열 안에서 패턴에 맞는 모든 값을 찾고 싶다면 \`re.findall()\`을 사용합니다.

\`\`\`python
import re

text = "주문번호는 A001, A002, A003입니다."

result = re.findall(r"A\\d+", text)

print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['A001', 'A002', 'A003']
\`\`\`

\`findall()\`은 결과를 리스트로 반환합니다. 그래서 여러 값을 한 번에 추출할 때 유용합니다.

---

### 11.3.6 \`re.sub()\`

패턴에 맞는 문자열을 다른 문자열로 바꾸고 싶다면 \`re.sub()\`를 사용합니다.

\`\`\`python
import re

text = "전화번호는 010-1234-5678입니다."

masked = re.sub(r"\\d{4}-\\d{4}", "****-****", text)

print(masked)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
전화번호는 010-****-****입니다.
\`\`\`

\`sub()\`는 개인정보 마스킹, 불필요한 문자 제거, 형식 통일에 자주 사용됩니다.

---

### 11.3.7 기본 패턴 익히기

자주 사용하는 정규표현식 패턴은 다음과 같습니다.

| 패턴 | 의미 |
|---|---|
| \`\\d\` | 숫자 하나 |
| \`\\D\` | 숫자가 아닌 문자 하나 |
| \`\\w\` | 문자, 숫자, 밑줄 중 하나 |
| \`\\W\` | 문자, 숫자, 밑줄이 아닌 문자 하나 |
| \`\\s\` | 공백 문자 |
| \`\\S\` | 공백이 아닌 문자 |
| \`.\` | 줄바꿈을 제외한 임의의 문자 하나 |
| \`^\` | 문자열의 시작 |
| \`$\` | 문자열의 끝 |

반복을 나타내는 패턴도 자주 사용합니다.

| 패턴 | 의미 |
|---|---|
| \`*\` | 0번 이상 반복 |
| \`+\` | 1번 이상 반복 |
| \`?\` | 0번 또는 1번 |
| \`{3}\` | 정확히 3번 반복 |
| \`{2,4}\` | 2번 이상 4번 이하 반복 |

예를 들어 숫자 3개를 찾고 싶다면 다음처럼 쓸 수 있습니다.

\`\`\`python
import re

text = "상품 코드: 123"
result = re.search(r"\\d{3}", text)

if result:
    print(result.group())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
123
\`\`\`

---

### 11.3.8 문자 클래스

대괄호 \`[]\`를 사용하면 여러 문자 중 하나를 의미하는 패턴을 만들 수 있습니다.

\`\`\`python
import re

text = "cat bat hat"

result = re.findall(r"[cbh]at", text)
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['cat', 'bat', 'hat']
\`\`\`

범위를 지정할 수도 있습니다.

\`\`\`python
import re

text = "A1 B2 C3"

letters = re.findall(r"[A-Z]", text)
numbers = re.findall(r"[0-9]", text)

print(letters)
print(numbers)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['A', 'B', 'C']
['1', '2', '3']
\`\`\`

---

### 11.3.9 raw string을 사용하는 이유

정규표현식에서는 백슬래시 \`\\\`를 자주 사용합니다. 그런데 파이썬 문자열에서도 백슬래시는 이스케이프 문자로 사용됩니다.

그래서 정규표현식 패턴을 작성할 때는 raw string을 사용하는 것이 일반적입니다.

\`\`\`python
pattern = r"\\d{3}-\\d{4}-\\d{4}"
\`\`\`

앞에 \`r\`을 붙이면 백슬래시를 일반 문자처럼 다룰 수 있습니다.

정규표현식에서는 특별한 이유가 없다면 패턴 문자열 앞에 \`r\`을 붙이는 습관을 들이는 것이 좋습니다.

---

## 11.4 정규표현식 실무 패턴

### 11.4.1 이메일 패턴 찾기

이메일 주소는 보통 다음 구조를 가집니다.

\`\`\`text
아이디@도메인
\`\`\`

간단한 이메일 패턴은 다음과 같이 작성할 수 있습니다.

\`\`\`python
import re

text = "문의: hong@example.com, 지원: help@test.co.kr"

emails = re.findall(r"[\\w.-]+@[\\w.-]+\\.\\w+", text)

print(emails)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['hong@example.com', 'help@test.co.kr']
\`\`\`

이 패턴은 기초 예제용입니다. 실제 이메일 형식은 훨씬 다양하므로, 완벽한 이메일 검증을 직접 만들려고 하기보다 상황에 맞는 수준으로 사용하는 것이 좋습니다.

---

### 11.4.2 전화번호 패턴 찾기

한국 휴대폰 번호는 다음과 같은 형식이 많습니다.

\`\`\`text
010-1234-5678
01012345678
\`\`\`

하이픈이 있는 전화번호를 찾는 예제입니다.

\`\`\`python
import re

text = "연락처는 010-1234-5678입니다."

phone = re.search(r"010-\\d{4}-\\d{4}", text)

if phone:
    print(phone.group())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
010-1234-5678
\`\`\`

하이픈이 있을 수도 있고 없을 수도 있는 번호는 다음처럼 찾을 수 있습니다.

\`\`\`python
import re

text = "연락처1: 010-1234-5678, 연락처2: 01098765432"

phones = re.findall(r"010-?\\d{4}-?\\d{4}", text)

print(phones)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['010-1234-5678', '01098765432']
\`\`\`

\`-?\`는 하이픈이 0번 또는 1번 나올 수 있다는 뜻입니다.

---

### 11.4.3 전화번호 형식 통일하기

전화번호에서 하이픈을 제거하고 숫자만 남기고 싶다면 \`re.sub()\`를 사용할 수 있습니다.

\`\`\`python
import re

phone = "010-1234-5678"

clean_phone = re.sub(r"[^0-9]", "", phone)

print(clean_phone)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
01012345678
\`\`\`

\`[^0-9]\`는 숫자가 아닌 문자를 의미합니다. 따라서 숫자가 아닌 문자를 모두 빈 문자열로 바꾸면 숫자만 남습니다.

---

### 11.4.4 날짜 패턴 찾기

문자열에서 날짜를 찾는 예제입니다.

\`\`\`python
import re

text = "보고서 작성일은 2026-06-15이고, 제출일은 2026-06-20입니다."

dates = re.findall(r"\\d{4}-\\d{2}-\\d{2}", text)

print(dates)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['2026-06-15', '2026-06-20']
\`\`\`

여러 구분자를 허용하려면 문자 클래스를 사용할 수 있습니다.

\`\`\`python
import re

text = "날짜: 2026-06-15, 2026/06/20, 2026.06.25"

dates = re.findall(r"\\d{4}[-/.]\\d{2}[-/.]\\d{2}", text)

print(dates)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['2026-06-15', '2026/06/20', '2026.06.25']
\`\`\`

---

### 11.4.5 숫자만 추출하기

금액 문자열에서 숫자만 추출하는 예제입니다.

\`\`\`python
import re

text = "총 결제 금액은 35,000원입니다."

numbers = re.findall(r"\\d+", text)

print(numbers)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['35', '000']
\`\`\`

금액으로 사용하려면 쉼표를 먼저 제거한 뒤 숫자를 추출하는 것이 좋습니다.

\`\`\`python
import re

text = "총 결제 금액은 35,000원입니다."

clean_text = text.replace(",", "")
number = re.search(r"\\d+", clean_text)

if number:
    price = int(number.group())
    print(price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
35000
\`\`\`

---

### 11.4.6 개인정보 마스킹

실무에서는 개인정보를 그대로 노출하지 않도록 마스킹해야 하는 경우가 많습니다.

이메일 일부를 가리는 예제입니다.

\`\`\`python
import re

email = "hong@example.com"

masked = re.sub(r"(^..).*(@.*$)", r"\\1***\\2", email)

print(masked)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
ho***@example.com
\`\`\`

전화번호 일부를 가리는 예제입니다.

\`\`\`python
import re

phone = "010-1234-5678"

masked = re.sub(r"(010)-\\d{4}-(\\d{4})", r"\\1-****-\\2", phone)

print(masked)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
010-****-5678
\`\`\`

정규표현식의 괄호 \`()\`는 그룹을 의미합니다. \`\\1\`, \`\\2\`는 앞에서 묶은 그룹을 다시 사용하는 표현입니다.

---

### 11.4.7 로그에서 에러 패턴 찾기

로그 파일에는 다음과 같은 문장이 들어 있을 수 있습니다.

\`\`\`python
logs = [
    "2026-06-15 09:00:01 INFO 시작",
    "2026-06-15 09:01:10 ERROR 파일을 찾을 수 없음",
    "2026-06-15 09:02:05 WARNING 응답 지연",
    "2026-06-15 09:03:20 ERROR 권한 없음"
]
\`\`\`

\`ERROR\`가 포함된 로그만 찾으려면 다음처럼 작성할 수 있습니다.

\`\`\`python
import re

logs = [
    "2026-06-15 09:00:01 INFO 시작",
    "2026-06-15 09:01:10 ERROR 파일을 찾을 수 없음",
    "2026-06-15 09:02:05 WARNING 응답 지연",
    "2026-06-15 09:03:20 ERROR 권한 없음"
]

error_logs = []

for log in logs:
    if re.search(r"ERROR", log):
        error_logs.append(log)

print(error_logs)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['2026-06-15 09:01:10 ERROR 파일을 찾을 수 없음', '2026-06-15 09:03:20 ERROR 권한 없음']
\`\`\`

정규표현식은 로그 분석, 개인정보 마스킹, 데이터 형식 검사, 문자열 정리에서 자주 사용됩니다. 하지만 너무 복잡한 정규표현식은 읽기 어려워질 수 있으므로, 실무에서는 적절한 수준으로 나누어 작성하는 것이 좋습니다.

---

## 11.5 \`requests\`로 API 데이터 가져오기

### 11.5.1 API란 무엇인가

API는 프로그램끼리 데이터를 주고받기 위한 약속입니다. 사용자가 웹 브라우저로 웹사이트를 보는 것처럼, 파이썬 프로그램도 API를 통해 다른 서버에 데이터를 요청할 수 있습니다.

예를 들어 다음과 같은 일을 할 수 있습니다.

\`\`\`text
- 날씨 API에서 현재 날씨 가져오기
- 환율 API에서 오늘의 환율 가져오기
- 공공 데이터 API에서 통계 데이터 가져오기
- 사내 시스템 API에서 주문 내역 가져오기
- 외부 서비스 API로 메시지 보내기
\`\`\`

API를 사용하면 사람이 웹사이트에 들어가서 복사해 오던 데이터를 코드로 가져올 수 있습니다.

---

### 11.5.2 HTTP 요청과 응답

API를 이해하려면 요청과 응답의 개념을 알아야 합니다.

\`\`\`text
1. 클라이언트가 서버에 요청을 보낸다.
2. 서버가 요청을 처리한다.
3. 서버가 클라이언트에게 응답을 보낸다.
\`\`\`

파이썬 프로그램은 클라이언트 역할을 할 수 있습니다.

\`\`\`text
파이썬 프로그램 → API 서버: 데이터 주세요.
API 서버 → 파이썬 프로그램: 여기 데이터입니다.
\`\`\`

가장 기본적인 요청 방식은 GET 요청입니다. GET 요청은 서버에서 데이터를 가져올 때 자주 사용합니다.

---

### 11.5.3 \`requests\` 설치와 기본 사용

API 요청을 쉽게 보내기 위해 \`requests\` 라이브러리를 사용할 수 있습니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install requests
\`\`\`

설치 후에는 다음처럼 import합니다.

\`\`\`python
import requests
\`\`\`

기본 GET 요청 예제입니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

response = requests.get(url)

print(response.status_code)
print(response.text)
\`\`\`

\`status_code\`는 서버 응답 상태를 나타냅니다. 대표적인 상태 코드는 다음과 같습니다.

| 상태 코드 | 의미 |
|---|---|
| 200 | 요청 성공 |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 또는 인증 실패 |
| 403 | 접근 권한 없음 |
| 404 | 요청한 자료 없음 |
| 500 | 서버 내부 오류 |

---

### 11.5.4 JSON 응답 처리하기

API 응답이 JSON 형식이라면 \`response.json()\`을 사용해 파이썬 객체로 변환할 수 있습니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

response = requests.get(url)
data = response.json()

print(data)
print(type(data))
print(data["title"])
\`\`\`

응답 JSON이 딕셔너리 형태라면 key로 값을 꺼낼 수 있습니다. 응답이 리스트 형태라면 반복문으로 처리할 수 있습니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts"

response = requests.get(url)
posts = response.json()

for post in posts[:3]:
    print(post["id"], post["title"])
\`\`\`

API 응답을 처리할 때는 항상 데이터 구조를 먼저 확인해야 합니다.

\`\`\`python
print(type(posts))
print(posts[0].keys())
\`\`\`

---

### 11.5.5 요청 파라미터 사용하기

API는 요청할 때 조건을 함께 전달할 수 있습니다. 이를 요청 파라미터라고 합니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts"
params = {
    "userId": 1
}

response = requests.get(url, params=params)
posts = response.json()

for post in posts[:3]:
    print(post["userId"], post["title"])
\`\`\`

\`params\`를 사용하면 URL 뒤에 직접 \`?userId=1\`을 붙이지 않아도 됩니다. requests가 알아서 적절한 URL로 만들어 요청합니다.

---

### 11.5.6 요청 실패 처리하기

API 요청은 항상 성공하지 않습니다.

\`\`\`text
- 인터넷 연결 문제
- 서버 오류
- 잘못된 URL
- 인증 실패
- 응답 시간이 너무 오래 걸림
- JSON 형식이 아닌 응답
\`\`\`

따라서 API 요청 코드는 예외 처리를 함께 사용하는 것이 좋습니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    data = response.json()
    print(data["title"])
except requests.exceptions.Timeout:
    print("요청 시간이 초과되었습니다.")
except requests.exceptions.HTTPError as error:
    print("HTTP 오류가 발생했습니다.", error)
except requests.exceptions.RequestException as error:
    print("요청 중 오류가 발생했습니다.", error)
except ValueError:
    print("JSON 응답을 해석할 수 없습니다.")
\`\`\`

여기서 중요한 부분은 \`timeout\`입니다. 외부 서버가 응답하지 않을 때 프로그램이 계속 기다리는 것을 막기 위해 요청 제한 시간을 지정합니다.

\`raise_for_status()\`는 응답 상태 코드가 오류일 때 예외를 발생시킵니다. 이렇게 하면 실패한 요청을 성공한 요청처럼 처리하는 실수를 줄일 수 있습니다.

---

### 11.5.7 API 데이터를 파일로 저장하기

API에서 받은 데이터를 JSON 파일로 저장해 보겠습니다.

\`\`\`python
import json
import requests

url = "https://jsonplaceholder.typicode.com/posts"

response = requests.get(url, timeout=5)
response.raise_for_status()

posts = response.json()

with open("posts.json", "w", encoding="utf-8") as file:
    json.dump(posts, file, ensure_ascii=False, indent=2)
\`\`\`

필요한 값만 추출해서 CSV로 저장할 수도 있습니다.

\`\`\`python
import csv
import requests

url = "https://jsonplaceholder.typicode.com/posts"

response = requests.get(url, timeout=5)
response.raise_for_status()

posts = response.json()

with open("posts.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["id", "userId", "title"])

    for post in posts:
        writer.writerow([post["id"], post["userId"], post["title"]])
\`\`\`

이 흐름은 실무 API 자동화의 기본 구조입니다.

\`\`\`text
1. API에 요청한다.
2. 응답 상태를 확인한다.
3. JSON 응답을 파이썬 객체로 바꾼다.
4. 필요한 값을 추출한다.
5. 파일로 저장한다.
\`\`\`

---

## 11.6 \`pandas\` 기초

### 11.6.1 pandas를 사용하는 이유

파이썬 기본 문법만으로도 리스트와 딕셔너리를 사용해 데이터를 처리할 수 있습니다. 하지만 데이터가 표 형태로 되어 있고, 행과 열이 많아지면 기본 자료구조만으로는 작업이 번거로워집니다.

예를 들어 다음과 같은 데이터를 생각해 봅시다.

| order_id | customer | category | price | quantity |
|---|---|---|---:|---:|
| A001 | 홍길동 | 문구 | 3000 | 2 |
| A002 | 김민수 | 전자기기 | 15000 | 1 |
| A003 | 이서연 | 문구 | 2000 | 5 |

이런 표 형태 데이터에서는 다음과 같은 작업을 자주 합니다.

\`\`\`text
- 특정 컬럼만 선택하기
- 조건에 맞는 행만 필터링하기
- 새 컬럼 만들기
- 카테고리별 합계 구하기
- 결측치 처리하기
- CSV나 엑셀로 저장하기
\`\`\`

이런 작업을 편하게 해 주는 외부 라이브러리가 \`pandas\`입니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install pandas openpyxl
\`\`\`

엑셀 파일을 읽고 쓰는 예제를 함께 다루려면 \`openpyxl\`도 설치해 두는 것이 좋습니다.

---

### 11.6.2 pandas import

pandas는 보통 \`pd\`라는 별칭으로 import합니다.

\`\`\`python
import pandas as pd
\`\`\`

\`pd\`는 pandas 공식 예제와 실무 코드에서 매우 자주 사용되는 관례입니다.

---

### 11.6.3 Series와 DataFrame

pandas에는 대표적인 데이터 구조가 두 가지 있습니다.

| 구조 | 의미 |
|---|---|
| Series | 1차원 데이터 |
| DataFrame | 2차원 표 형태 데이터 |

Series는 하나의 열처럼 생각할 수 있습니다.

\`\`\`python
import pandas as pd

prices = pd.Series([3000, 15000, 2000])

print(prices)
\`\`\`

DataFrame은 행과 열로 구성된 표입니다.

\`\`\`python
import pandas as pd

data = {
    "order_id": ["A001", "A002", "A003"],
    "customer": ["홍길동", "김민수", "이서연"],
    "category": ["문구", "전자기기", "문구"],
    "price": [3000, 15000, 2000],
    "quantity": [2, 1, 5]
}

df = pd.DataFrame(data)

print(df)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
  order_id customer category  price  quantity
0     A001      홍길동       문구   3000         2
1     A002      김민수     전자기기  15000         1
2     A003      이서연       문구   2000         5
\`\`\`

왼쪽의 \`0\`, \`1\`, \`2\`는 인덱스입니다. 인덱스는 행을 구분하는 이름이라고 생각하면 됩니다.

---

### 11.6.4 CSV 읽기

CSV 파일을 DataFrame으로 읽을 때는 \`pd.read_csv()\`를 사용합니다.

예를 들어 \`orders.csv\` 파일이 다음과 같다고 가정합니다.

\`\`\`csv
order_id,customer,category,price,quantity
A001,홍길동,문구,3000,2
A002,김민수,전자기기,15000,1
A003,이서연,문구,2000,5
\`\`\`

파이썬에서는 다음처럼 읽습니다.

\`\`\`python
import pandas as pd

df = pd.read_csv("orders.csv", encoding="utf-8")

print(df)
\`\`\`

한글이 깨진다면 파일의 인코딩을 확인해야 합니다. 파일에 따라 \`utf-8\`, \`utf-8-sig\`, \`cp949\` 등을 사용해야 할 수 있습니다.

\`\`\`python
df = pd.read_csv("orders.csv", encoding="utf-8-sig")
\`\`\`

또는 다음처럼 읽어야 하는 경우도 있습니다.

\`\`\`python
df = pd.read_csv("orders.csv", encoding="cp949")
\`\`\`

---

### 11.6.5 엑셀 읽기

엑셀 파일을 읽을 때는 \`pd.read_excel()\`을 사용합니다.

\`\`\`python
import pandas as pd

df = pd.read_excel("orders.xlsx")

print(df)
\`\`\`

특정 시트를 읽고 싶다면 \`sheet_name\`을 사용합니다.

\`\`\`python
df = pd.read_excel("orders.xlsx", sheet_name="6월주문")
\`\`\`

엑셀 파일을 읽으려면 보통 \`openpyxl\` 라이브러리가 필요합니다.

\`\`\`bash
python -m pip install openpyxl
\`\`\`

---

### 11.6.6 데이터 확인하기

데이터를 읽은 뒤에는 바로 분석하지 말고 먼저 구조를 확인해야 합니다.

\`\`\`python
print(df.head())
\`\`\`

\`head()\`는 앞부분 몇 행을 보여 줍니다. 기본값은 5행입니다.

\`\`\`python
print(df.tail())
\`\`\`

\`tail()\`은 뒷부분 몇 행을 보여 줍니다.

\`\`\`python
print(df.info())
\`\`\`

\`info()\`는 컬럼 이름, 결측치가 아닌 값의 개수, 자료형 등을 보여 줍니다.

\`\`\`python
print(df.describe())
\`\`\`

\`describe()\`는 숫자형 컬럼의 개수, 평균, 표준편차, 최솟값, 최댓값 등을 요약합니다.

데이터의 크기를 확인할 때는 \`shape\`를 사용합니다.

\`\`\`python
print(df.shape)
\`\`\`

컬럼 목록은 다음처럼 확인합니다.

\`\`\`python
print(df.columns)
\`\`\`

데이터 처리의 첫 단계는 항상 다음 질문에 답하는 것입니다.

\`\`\`text
- 행이 몇 개 있는가?
- 컬럼이 몇 개 있는가?
- 컬럼 이름은 무엇인가?
- 각 컬럼의 자료형은 무엇인가?
- 비어 있는 값은 있는가?
\`\`\`

---

### 11.6.7 컬럼 선택하기

하나의 컬럼을 선택하려면 대괄호를 사용합니다.

\`\`\`python
customers = df["customer"]
print(customers)
\`\`\`

여러 컬럼을 선택하려면 리스트를 사용합니다.

\`\`\`python
selected = df[["order_id", "customer", "price"]]
print(selected)
\`\`\`

대괄호가 두 번 들어가는 것에 주의해야 합니다.

\`\`\`python
df[["컬럼1", "컬럼2"]]
\`\`\`

안쪽 대괄호는 컬럼 이름 목록이고, 바깥쪽 대괄호는 DataFrame에서 컬럼을 선택하는 문법입니다.

---

### 11.6.8 행 필터링하기

조건에 맞는 행만 고를 때는 비교 연산자를 사용합니다.

\`\`\`python
expensive_orders = df[df["price"] >= 10000]
print(expensive_orders)
\`\`\`

여러 조건을 함께 사용할 때는 괄호와 \`&\`, \`|\`를 사용합니다.

\`\`\`python
result = df[(df["price"] >= 10000) & (df["category"] == "전자기기")]
print(result)
\`\`\`

\`and\`, \`or\`가 아니라 \`&\`, \`|\`를 사용한다는 점에 주의해야 합니다.

| 연산자 | 의미 |
|---|---|
| \`&\` | 그리고 |
| \`|\` | 또는 |
| \`~\` | 아니다 |

각 조건은 반드시 괄호로 감싸는 것이 안전합니다.

---

### 11.6.9 새 컬럼 만들기

가격과 수량을 곱해서 총 금액 컬럼을 만들 수 있습니다.

\`\`\`python
df["total"] = df["price"] * df["quantity"]

print(df)
\`\`\`

문자열 컬럼을 조합해서 새 컬럼을 만들 수도 있습니다.

\`\`\`python
df["order_label"] = df["order_id"] + "_" + df["customer"]

print(df)
\`\`\`

새 컬럼을 만들 때는 기존 컬럼의 자료형을 확인해야 합니다. 숫자처럼 보이는 문자열이라면 먼저 숫자로 변환해야 할 수 있습니다.

---

### 11.6.10 컬럼 수정과 삭제

컬럼 값을 수정할 때는 기존 컬럼에 다시 값을 할당합니다.

\`\`\`python
df["customer"] = df["customer"].str.strip()
\`\`\`

컬럼을 삭제할 때는 \`drop()\`을 사용할 수 있습니다.

\`\`\`python
df = df.drop(columns=["order_label"])
\`\`\`

\`drop()\`은 기본적으로 원본을 직접 바꾸지 않고 새 DataFrame을 반환합니다. 그래서 결과를 다시 변수에 저장해야 합니다.

---

### 11.6.11 정렬하기

특정 컬럼 기준으로 정렬할 때는 \`sort_values()\`를 사용합니다.

\`\`\`python
sorted_df = df.sort_values("total")
print(sorted_df)
\`\`\`

내림차순 정렬은 \`ascending=False\`를 사용합니다.

\`\`\`python
sorted_df = df.sort_values("total", ascending=False)
print(sorted_df)
\`\`\`

여러 컬럼 기준으로 정렬할 수도 있습니다.

\`\`\`python
sorted_df = df.sort_values(["category", "total"], ascending=[True, False])
\`\`\`

---

### 11.6.12 그룹화하기

그룹화는 같은 값을 가진 데이터끼리 묶어서 계산하는 작업입니다.

예를 들어 카테고리별 매출 합계를 구하려면 다음처럼 작성합니다.

\`\`\`python
category_sales = df.groupby("category")["total"].sum()

print(category_sales)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
category
문구       16000
전자기기     15000
Name: total, dtype: int64
\`\`\`

DataFrame 형태로 보고 싶다면 \`reset_index()\`를 사용할 수 있습니다.

\`\`\`python
category_sales = df.groupby("category")["total"].sum().reset_index()

print(category_sales)
\`\`\`

여러 집계 함수를 사용할 수도 있습니다.

\`\`\`python
summary = df.groupby("category")["total"].agg(["sum", "mean", "count"]).reset_index()

print(summary)
\`\`\`

그룹화는 실무 데이터 분석에서 매우 자주 사용됩니다.

\`\`\`text
- 부서별 인원 수
- 월별 매출 합계
- 고객 등급별 평균 구매 금액
- 상품 카테고리별 주문 건수
\`\`\`

---

### 11.6.13 결측치 처리

비어 있는 값을 결측치라고 합니다. pandas에서는 결측치를 보통 \`NaN\`으로 표시합니다.

결측치가 있는지 확인하려면 \`isna()\`를 사용합니다.

\`\`\`python
print(df.isna())
\`\`\`

컬럼별 결측치 개수를 확인하려면 다음처럼 작성합니다.

\`\`\`python
print(df.isna().sum())
\`\`\`

결측치가 있는 행을 제거하려면 \`dropna()\`를 사용합니다.

\`\`\`python
clean_df = df.dropna()
\`\`\`

결측치를 특정 값으로 채우려면 \`fillna()\`를 사용합니다.

\`\`\`python
df["customer"] = df["customer"].fillna("이름 없음")
df["quantity"] = df["quantity"].fillna(0)
\`\`\`

무조건 결측치를 제거하는 것이 좋은 것은 아닙니다. 어떤 값은 제거해야 하고, 어떤 값은 기본값으로 채워야 합니다.

예를 들어 고객 이름이 없으면 분석에서 제외할 수 있지만, 포인트가 비어 있으면 0으로 채우는 것이 자연스러울 수 있습니다.

---

### 11.6.14 데이터 저장하기

DataFrame을 CSV로 저장하려면 \`to_csv()\`를 사용합니다.

\`\`\`python
df.to_csv("orders_result.csv", index=False, encoding="utf-8-sig")
\`\`\`

\`index=False\`는 왼쪽 인덱스를 파일에 저장하지 않겠다는 뜻입니다. 실무에서 결과 CSV를 만들 때 자주 사용합니다.

엑셀로 저장하려면 \`to_excel()\`을 사용합니다.

\`\`\`python
df.to_excel("orders_result.xlsx", index=False)
\`\`\`

여러 시트로 저장하려면 \`ExcelWriter\`를 사용할 수 있습니다.

\`\`\`python
import pandas as pd

with pd.ExcelWriter("report.xlsx") as writer:
    df.to_excel(writer, sheet_name="원본데이터", index=False)
    category_sales.to_excel(writer, sheet_name="카테고리별매출", index=False)
\`\`\`

---

### 11.6.15 pandas 실무 예제: 매출 데이터 분석하기

다음 데이터를 사용해 간단한 매출 분석을 해 보겠습니다.

\`\`\`python
import pandas as pd

data = {
    "order_id": ["A001", "A002", "A003", "A004", "A005"],
    "customer": ["홍길동", "김민수", "이서연", "홍길동", "박지훈"],
    "category": ["문구", "전자기기", "문구", "생활용품", "전자기기"],
    "price": [3000, 15000, 2000, 8000, 12000],
    "quantity": [2, 1, 5, 3, 2]
}

df = pd.DataFrame(data)

# 총 금액 컬럼 만들기
df["total"] = df["price"] * df["quantity"]

# 카테고리별 매출 합계
category_sales = df.groupby("category")["total"].sum().reset_index()

# 총 금액 기준 내림차순 정렬
sorted_orders = df.sort_values("total", ascending=False)

print("전체 주문")
print(df)

print("카테고리별 매출")
print(category_sales)

print("주문 금액 높은 순")
print(sorted_orders)
\`\`\`

이 예제는 작지만 실제 업무 분석의 기본 구조를 포함합니다.

\`\`\`text
1. 데이터를 DataFrame으로 만든다.
2. 계산에 필요한 새 컬럼을 만든다.
3. 그룹별로 집계한다.
4. 기준에 따라 정렬한다.
5. 결과를 확인한다.
\`\`\`

---

## 11.7 데이터 클리닝 실무 패턴

### 11.7.1 데이터 클리닝이란 무엇인가

데이터 클리닝은 원본 데이터를 사용하기 좋은 형태로 정리하는 작업입니다.

실무 데이터는 처음부터 깨끗하지 않은 경우가 많습니다.

\`\`\`text
- 같은 고객이 중복으로 들어 있음
- 이름 앞뒤에 공백이 있음
- 전화번호 형식이 서로 다름
- 금액이 문자열로 저장되어 있음
- 날짜 형식이 서로 다름
- 필요한 값이 비어 있음
- 컬럼 이름이 제각각임
\`\`\`

분석이나 자동화 전에 이런 문제를 정리하지 않으면 결과가 틀어질 수 있습니다.

예를 들어 \`"홍길동"\`과 \`" 홍길동 "\`은 사람 눈에는 같아 보이지만, 컴퓨터는 서로 다른 문자열로 처리할 수 있습니다. 따라서 앞뒤 공백을 제거하는 과정이 필요합니다.

---

### 11.7.2 예제 데이터 만들기

다음 데이터는 일부러 문제가 섞여 있는 고객 주문 데이터입니다.

\`\`\`python
import pandas as pd

data = {
    "name": [" 홍길동", "김민수", "이서연 ", "홍길동", None],
    "email": ["HONG@EXAMPLE.COM", "minsu@example.com", "seo@example.com", "hong@example.com", "no_name@example.com"],
    "phone": ["010-1234-5678", "01098765432", "010 2222 3333", "010-1234-5678", None],
    "order_date": ["2026-06-01", "2026/06/02", "2026.06.03", "2026-06-01", "잘못된 날짜"],
    "amount": ["35,000원", "12000", "8,500원", "35,000원", None]
}

df = pd.DataFrame(data)

print(df)
\`\`\`

이 데이터에는 다음 문제가 있습니다.

\`\`\`text
- name 컬럼에 공백과 결측치가 있다.
- email 컬럼에 대문자가 섞여 있다.
- phone 컬럼의 형식이 서로 다르다.
- order_date 컬럼의 날짜 형식이 서로 다르고 잘못된 값도 있다.
- amount 컬럼은 숫자가 아니라 문자열이다.
- 일부 행은 중복이다.
\`\`\`

하나씩 정리해 보겠습니다.

---

### 11.7.3 문자열 공백 제거

이름 앞뒤 공백을 제거합니다.

\`\`\`python
df["name"] = df["name"].str.strip()

print(df["name"])
\`\`\`

문자열 메서드를 pandas 컬럼에 적용할 때는 \`.str\`을 사용합니다.

\`\`\`python
df["컬럼명"].str.strip()
\`\`\`

단, 결측치가 있는 컬럼에서도 \`.str\` 접근자는 대체로 사용할 수 있지만, 결과를 확인하는 습관이 필요합니다.

---

### 11.7.4 대소문자 통일

이메일 주소는 대소문자가 섞여 있으면 비교하기 불편합니다. 보통 소문자로 통일합니다.

\`\`\`python
df["email"] = df["email"].str.lower()

print(df["email"])
\`\`\`

이렇게 하면 \`HONG@EXAMPLE.COM\`과 \`hong@example.com\`을 같은 이메일로 비교하기 쉬워집니다.

---

### 11.7.5 전화번호 형식 통일

전화번호에서 숫자가 아닌 문자를 제거해 숫자만 남깁니다.

\`\`\`python
df["phone"] = df["phone"].str.replace(r"[^0-9]", "", regex=True)

print(df["phone"])
\`\`\`

\`regex=True\`를 사용하면 정규표현식 패턴으로 문자열을 바꿀 수 있습니다.

결과는 다음과 비슷합니다.

\`\`\`text
0    01012345678
1    01098765432
2    01022223333
3    01012345678
4           None
Name: phone, dtype: object
\`\`\`

필요하다면 다시 하이픈이 있는 형식으로 바꿀 수도 있습니다.

\`\`\`python
def format_phone(phone):
    if pd.isna(phone):
        return phone

    if len(phone) == 11:
        return f"{phone[:3]}-{phone[3:7]}-{phone[7:]}"

    return phone


df["phone"] = df["phone"].apply(format_phone)
\`\`\`

---

### 11.7.6 금액 문자열을 숫자로 변환

금액 컬럼에는 쉼표와 원화 기호가 들어 있습니다.

\`\`\`text
35,000원
8,500원
\`\`\`

이 값은 숫자처럼 보이지만 실제로는 문자열입니다. 계산하려면 숫자로 바꿔야 합니다.

\`\`\`python
df["amount"] = df["amount"].str.replace(",", "", regex=False)
df["amount"] = df["amount"].str.replace("원", "", regex=False)
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

print(df["amount"])
\`\`\`

\`pd.to_numeric()\`은 값을 숫자로 변환합니다. \`errors="coerce"\`는 변환할 수 없는 값을 결측치로 처리합니다.

---

### 11.7.7 날짜 형식 통일

날짜 형식이 여러 가지라면 먼저 구분자를 통일하거나, \`pd.to_datetime()\`을 사용할 수 있습니다.

\`\`\`python
df["order_date"] = df["order_date"].str.replace("/", "-", regex=False)
df["order_date"] = df["order_date"].str.replace(".", "-", regex=False)
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

print(df["order_date"])
\`\`\`

잘못된 날짜는 \`NaT\`로 표시됩니다. \`NaT\`는 날짜형 데이터에서 사용하는 결측치라고 이해하면 됩니다.

날짜를 다시 문자열로 저장하고 싶다면 다음처럼 할 수 있습니다.

\`\`\`python
df["order_date_text"] = df["order_date"].dt.strftime("%Y-%m-%d")
\`\`\`

---

### 11.7.8 결측치 처리

결측치를 확인합니다.

\`\`\`python
print(df.isna().sum())
\`\`\`

필수 컬럼에 값이 없는 행은 제거할 수 있습니다.

\`\`\`python
df = df.dropna(subset=["name", "email"])
\`\`\`

금액이 비어 있다면 0으로 채울 수도 있습니다.

\`\`\`python
df["amount"] = df["amount"].fillna(0)
\`\`\`

결측치 처리는 데이터의 의미를 고려해야 합니다. 무조건 0으로 채우면 안 되는 경우도 있습니다.

---

### 11.7.9 중복 제거

중복 행을 확인하려면 \`duplicated()\`를 사용합니다.

\`\`\`python
print(df.duplicated())
\`\`\`

중복 행을 제거하려면 \`drop_duplicates()\`를 사용합니다.

\`\`\`python
df = df.drop_duplicates()
\`\`\`

특정 컬럼 기준으로 중복을 제거할 수도 있습니다.

\`\`\`python
df = df.drop_duplicates(subset=["email"])
\`\`\`

이 경우 같은 이메일이 여러 번 등장하면 하나만 남깁니다.

---

### 11.7.10 컬럼 이름 정리

실무 데이터에서는 컬럼 이름이 다음처럼 들어오는 경우가 있습니다.

\`\`\`text
고객명, 고객 이메일, 주문 금액, 주문일
\`\`\`

코드에서는 공백이 없고 일관된 영문 컬럼명이 더 다루기 편할 때가 많습니다.

\`\`\`python
df = df.rename(columns={
    "name": "customer_name",
    "email": "customer_email",
    "phone": "phone_number",
    "order_date": "ordered_at"
})
\`\`\`

컬럼 이름을 정리하면 이후 코드가 더 명확해집니다.

---

### 11.7.11 필요한 컬럼만 선택하기

정리된 데이터에서 필요한 컬럼만 남길 수 있습니다.

\`\`\`python
result = df[["customer_name", "customer_email", "phone_number", "ordered_at", "amount"]]

print(result)
\`\`\`

분석이나 저장에 필요 없는 컬럼은 제거하는 것이 좋습니다. 결과 파일이 깔끔해지고, 다음 작업자가 이해하기 쉬워집니다.

---

### 11.7.12 데이터 클리닝 전체 흐름

앞에서 배운 내용을 하나의 흐름으로 정리하면 다음과 같습니다.

\`\`\`python
import pandas as pd

# 1. 데이터 만들기
data = {
    "name": [" 홍길동", "김민수", "이서연 ", "홍길동", None],
    "email": ["HONG@EXAMPLE.COM", "minsu@example.com", "seo@example.com", "hong@example.com", "no_name@example.com"],
    "phone": ["010-1234-5678", "01098765432", "010 2222 3333", "010-1234-5678", None],
    "order_date": ["2026-06-01", "2026/06/02", "2026.06.03", "2026-06-01", "잘못된 날짜"],
    "amount": ["35,000원", "12000", "8,500원", "35,000원", None]
}

df = pd.DataFrame(data)

# 2. 문자열 정리
df["name"] = df["name"].str.strip()
df["email"] = df["email"].str.lower()
df["phone"] = df["phone"].str.replace(r"[^0-9]", "", regex=True)

# 3. 금액 정리
df["amount"] = df["amount"].str.replace(",", "", regex=False)
df["amount"] = df["amount"].str.replace("원", "", regex=False)
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

# 4. 날짜 정리
df["order_date"] = df["order_date"].str.replace("/", "-", regex=False)
df["order_date"] = df["order_date"].str.replace(".", "-", regex=False)
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

# 5. 결측치 처리
df = df.dropna(subset=["name", "email"])
df["amount"] = df["amount"].fillna(0)

# 6. 중복 제거
df = df.drop_duplicates(subset=["email"])

# 7. 컬럼 이름 변경
df = df.rename(columns={
    "name": "customer_name",
    "email": "customer_email",
    "phone": "phone_number",
    "order_date": "ordered_at"
})

# 8. 필요한 컬럼만 선택
result = df[["customer_name", "customer_email", "phone_number", "ordered_at", "amount"]]

print(result)
\`\`\`

데이터 클리닝은 정답이 하나로 정해져 있지 않습니다. 데이터의 의미와 업무 목적에 따라 어떤 값을 제거할지, 어떤 값을 기본값으로 채울지, 어떤 형식으로 통일할지를 결정해야 합니다.

---

## 11장 핵심 정리

이 장에서는 데이터를 다루는 기본 도구를 배웠습니다.

JSON은 API와 설정 파일에서 자주 사용하는 데이터 형식입니다. 파이썬에서는 \`json\` 모듈을 사용해 JSON 문자열과 파일을 딕셔너리, 리스트 같은 파이썬 객체로 변환할 수 있습니다.

날짜와 시간 데이터는 문자열 그대로 사용하기보다 \`datetime\` 객체로 변환해서 비교하고 계산하는 것이 좋습니다. \`strftime()\`은 날짜를 문자열로 바꿀 때, \`strptime()\`은 문자열을 날짜로 바꿀 때 사용합니다.

정규표현식은 문자열에서 일정한 패턴을 찾거나 바꿀 때 사용합니다. 이메일, 전화번호, 날짜, 숫자, 로그 메시지처럼 규칙이 있는 문자열을 처리할 때 유용합니다.

\`requests\`는 API에 HTTP 요청을 보내고 응답을 받을 때 사용하는 대표적인 외부 라이브러리입니다. API 요청에서는 상태 코드 확인, 예외 처리, timeout 설정이 중요합니다.

\`pandas\`는 표 형태 데이터를 다루는 강력한 라이브러리입니다. CSV와 엑셀 파일을 읽고, 컬럼을 선택하고, 행을 필터링하고, 그룹별로 집계하고, 결과를 다시 파일로 저장할 수 있습니다.

데이터 클리닝은 실무 데이터 처리의 핵심입니다. 중복 제거, 결측치 처리, 문자열 정리, 날짜 형식 통일, 숫자형 변환을 통해 데이터를 분석하기 좋은 형태로 바꿉니다.

정리하면 11장의 핵심 흐름은 다음과 같습니다.

\`\`\`text
1. 외부 데이터를 읽는다.
2. 데이터 구조를 확인한다.
3. 필요한 값만 추출한다.
4. 날짜, 문자열, 숫자 형식을 정리한다.
5. 결측치와 중복을 처리한다.
6. 분석하거나 저장한다.
\`\`\`

---

## 11장 연습문제

### 문제 1

다음 중 JSON에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 이미지 파일을 저장하기 위한 형식이다.  
B. 데이터를 주고받을 때 자주 사용하는 텍스트 기반 형식이다.  
C. 파이썬에서만 사용할 수 있는 전용 파일 형식이다.  
D. 실행 가능한 파이썬 코드 파일이다.

---

### 문제 2

다음 JSON 문자열을 파이썬 딕셔너리로 변환하는 코드를 작성하세요.

\`\`\`python
json_text = '{"name": "홍길동", "age": 30}'
\`\`\`

---

### 문제 3

다음 파이썬 딕셔너리를 한글이 그대로 보이도록 JSON 문자열로 변환하는 코드를 작성하세요.

\`\`\`python
data = {
    "name": "이서연",
    "grade": "VIP"
}
\`\`\`

---

### 문제 4

다음 코드의 빈칸을 채우세요.

\`\`\`python
from datetime import datetime

date_text = "2026-06-15"
date_value = datetime.______(date_text, "%Y-%m-%d")

print(date_value)
\`\`\`

---

### 문제 5

오늘 날짜를 기준으로 7일 전 날짜를 구하는 코드를 작성하세요. \`date\`와 \`timedelta\`를 사용하세요.

---

### 문제 6

다음 문자열에서 모든 주문번호를 추출하는 정규표현식 코드를 작성하세요.

\`\`\`python
text = "주문번호는 A001, A002, A003입니다."
\`\`\`

원하는 결과는 다음과 같습니다.

\`\`\`python
['A001', 'A002', 'A003']
\`\`\`

---

### 문제 7

다음 전화번호에서 숫자가 아닌 문자를 제거하여 \`01012345678\`로 만드는 코드를 작성하세요.

\`\`\`python
phone = "010-1234-5678"
\`\`\`

---

### 문제 8

다음 중 \`requests.get()\` 요청에서 \`timeout\`을 지정하는 이유로 가장 적절한 것은 무엇인가요?

A. 응답 데이터를 자동으로 엑셀로 저장하기 위해서  
B. 서버가 응답하지 않을 때 프로그램이 계속 기다리는 것을 막기 위해서  
C. JSON 데이터를 자동으로 한글 번역하기 위해서  
D. 상태 코드를 항상 200으로 바꾸기 위해서

---

### 문제 9

다음 코드의 빈칸을 채우세요.

\`\`\`python
import pandas as pd

df = pd.______("orders.csv", encoding="utf-8")
\`\`\`

CSV 파일을 읽는 코드입니다.

---

### 문제 10

다음 DataFrame에서 \`price\`가 10000 이상인 행만 선택하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})
\`\`\`

---

### 문제 11

다음 DataFrame에 \`total\` 컬럼을 추가하세요. \`total\`은 \`price * quantity\`입니다.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스"],
    "price": [30000, 15000],
    "quantity": [2, 3]
})
\`\`\`

---

### 문제 12

다음 DataFrame에서 카테고리별 매출 합계를 구하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "category": ["문구", "문구", "전자기기"],
    "total": [6000, 10000, 15000]
})
\`\`\`

---

### 문제 13

다음 고객 데이터에서 이메일을 소문자로 통일하고, 이름의 앞뒤 공백을 제거하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": [" 홍길동", "김민수 "],
    "email": ["HONG@EXAMPLE.COM", "MINSU@EXAMPLE.COM"]
})
\`\`\`

---

### 문제 14

다음 금액 문자열 컬럼을 숫자형으로 변환하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "amount": ["35,000원", "12000", "8,500원"]
})
\`\`\`

---

### 문제 15

데이터 클리닝을 할 때 결측치를 무조건 0으로 채우면 안 되는 이유를 간단히 설명하세요.

---

## 정답 및 해설

### 문제 1 정답

정답: **B**

해설:

JSON은 데이터를 주고받을 때 자주 사용하는 텍스트 기반 형식입니다. API 응답이나 설정 파일에서 많이 사용됩니다.

---

### 문제 2 정답

\`\`\`python
import json

json_text = '{"name": "홍길동", "age": 30}'

data = json.loads(json_text)

print(data)
\`\`\`

해설:

JSON 문자열을 파이썬 객체로 변환할 때는 \`json.loads()\`를 사용합니다.

---

### 문제 3 정답

\`\`\`python
import json

data = {
    "name": "이서연",
    "grade": "VIP"
}

json_text = json.dumps(data, ensure_ascii=False)

print(json_text)
\`\`\`

해설:

한글을 사람이 읽을 수 있는 형태로 출력하려면 \`ensure_ascii=False\`를 사용합니다.

---

### 문제 4 정답

\`\`\`python
from datetime import datetime

date_text = "2026-06-15"
date_value = datetime.strptime(date_text, "%Y-%m-%d")

print(date_value)
\`\`\`

해설:

문자열을 날짜와 시간 객체로 변환할 때는 \`strptime()\`을 사용합니다.

---

### 문제 5 정답

\`\`\`python
from datetime import date, timedelta

today = date.today()
seven_days_ago = today - timedelta(days=7)

print(seven_days_ago)
\`\`\`

해설:

날짜를 더하거나 뺄 때는 \`timedelta\`를 사용합니다.

---

### 문제 6 정답

\`\`\`python
import re

text = "주문번호는 A001, A002, A003입니다."

orders = re.findall(r"A\\d+", text)

print(orders)
\`\`\`

해설:

\`A\\d+\`는 A 뒤에 숫자가 1개 이상 이어지는 패턴입니다.

---

### 문제 7 정답

\`\`\`python
import re

phone = "010-1234-5678"
clean_phone = re.sub(r"[^0-9]", "", phone)

print(clean_phone)
\`\`\`

해설:

\`[^0-9]\`는 숫자가 아닌 문자를 의미합니다. 숫자가 아닌 문자를 빈 문자열로 바꾸면 숫자만 남습니다.

---

### 문제 8 정답

정답: **B**

해설:

API 서버가 응답하지 않을 때 프로그램이 무한정 기다리지 않도록 \`timeout\`을 지정합니다.

---

### 문제 9 정답

\`\`\`python
import pandas as pd

df = pd.read_csv("orders.csv", encoding="utf-8")
\`\`\`

해설:

CSV 파일을 DataFrame으로 읽을 때는 \`pd.read_csv()\`를 사용합니다.

---

### 문제 10 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})

result = df[df["price"] >= 10000]

print(result)
\`\`\`

해설:

pandas에서는 조건식을 사용해 조건에 맞는 행만 선택할 수 있습니다.

---

### 문제 11 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스"],
    "price": [30000, 15000],
    "quantity": [2, 3]
})

df["total"] = df["price"] * df["quantity"]

print(df)
\`\`\`

해설:

DataFrame에서는 컬럼끼리 연산해서 새 컬럼을 만들 수 있습니다.

---

### 문제 12 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "category": ["문구", "문구", "전자기기"],
    "total": [6000, 10000, 15000]
})

result = df.groupby("category")["total"].sum().reset_index()

print(result)
\`\`\`

해설:

그룹별 합계를 구할 때는 \`groupby()\`와 \`sum()\`을 함께 사용할 수 있습니다.

---

### 문제 13 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": [" 홍길동", "김민수 "],
    "email": ["HONG@EXAMPLE.COM", "MINSU@EXAMPLE.COM"]
})

df["name"] = df["name"].str.strip()
df["email"] = df["email"].str.lower()

print(df)
\`\`\`

해설:

pandas에서 문자열 컬럼에 문자열 함수를 적용할 때는 \`.str\` 접근자를 사용합니다.

---

### 문제 14 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "amount": ["35,000원", "12000", "8,500원"]
})

df["amount"] = df["amount"].str.replace(",", "", regex=False)
df["amount"] = df["amount"].str.replace("원", "", regex=False)
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

print(df)
\`\`\`

해설:

숫자가 아닌 쉼표와 원화 기호를 제거한 뒤 \`pd.to_numeric()\`으로 숫자형으로 변환합니다.

---

### 문제 15 정답

예시 답안:

\`\`\`text
결측치가 무엇을 의미하는지에 따라 처리 방법이 달라지기 때문이다.
예를 들어 포인트가 비어 있으면 0으로 채워도 될 수 있지만,
이름이나 주문일처럼 필수 정보가 비어 있는 경우 0으로 채우면 데이터 의미가 왜곡된다.
\`\`\`

해설:

결측치 처리는 데이터의 의미를 고려해야 합니다. 무조건 제거하거나 무조건 0으로 채우면 잘못된 분석 결과가 나올 수 있습니다.

---

## 다음 장 예고

다음 장에서는 **실무 코드 작성 습관**을 배웁니다.

지금까지는 파이썬 문법과 데이터 처리 방법을 배웠습니다. 하지만 실무에서는 코드가 “작동하는 것”만으로 충분하지 않습니다. 다른 사람이 읽을 수 있어야 하고, 나중에 수정하기 쉬워야 하며, 문제가 생겼을 때 원인을 추적할 수 있어야 합니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
- 읽기 좋은 코드 작성법
- 변수명, 함수명, 클래스명 짓기
- 타입 힌트 기초
- logging으로 로그 남기기
- 설정값 관리
- 이터레이터와 제너레이터 기초
\`\`\`

11장에서 배운 데이터 처리 코드는 12장에서 더 실무적인 형태로 정리됩니다. 같은 기능을 하더라도 더 읽기 쉽고, 더 안전하고, 더 유지보수하기 좋은 코드로 만드는 방법을 배우게 됩니다.
`;export{e as default};