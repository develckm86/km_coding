var e=`<!-- 원본: python_basic_chapter_11_book.md / 세부 장: 11-2 -->

# 11.2 날짜와 시간 데이터 처리

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
`;export{e as default};