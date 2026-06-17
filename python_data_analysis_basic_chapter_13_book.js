var e=`# 13장. 날짜와 시간 데이터 처리

## 13.0 들어가며

데이터 분석에서 날짜와 시간은 매우 중요합니다.  
매출 데이터, 주문 데이터, 고객 데이터, 로그 데이터, 예약 데이터, 출석 데이터, 센서 데이터에는 대부분 날짜나 시간이 포함됩니다.

예를 들어 다음과 같은 질문을 생각해볼 수 있습니다.

\`\`\`text
월별 매출은 증가하고 있는가?
요일별 주문 수는 어떻게 다른가?
최근 30일 동안 구매한 고객은 누구인가?
고객이 가입한 뒤 첫 구매까지 며칠이 걸렸는가?
배송 완료까지 평균 며칠이 걸리는가?
특정 이벤트 이후 매출이 증가했는가?
\`\`\`

이 질문들은 모두 날짜 데이터를 제대로 다룰 수 있어야 답할 수 있습니다.

하지만 실제 데이터에서 날짜는 처음부터 분석하기 좋은 형태로 들어오지 않는 경우가 많습니다.

\`\`\`text
2026-01-05
2026/01/05
2026.01.05
01/05/2026
20260105
2026년 1월 5일
\`\`\`

사람 눈에는 모두 날짜처럼 보이지만, 컴퓨터가 처음부터 날짜로 이해하는 것은 아닙니다.  
pandas에서 날짜 분석을 하려면 문자열로 들어온 날짜를 **날짜형 데이터**로 변환해야 합니다.

이번 장에서는 pandas에서 날짜와 시간 데이터를 다루는 기본 방법을 배웁니다.

핵심은 다음 세 가지입니다.

\`\`\`text
1. 문자열 날짜를 날짜형으로 변환한다.
2. 날짜형 데이터에서 연도, 월, 요일 같은 정보를 추출한다.
3. 날짜를 기준으로 필터링, 계산, 집계를 수행한다.
\`\`\`

날짜 데이터 처리는 다음 장의 그룹화와 집계, 이후 EDA와 시각화에서도 계속 사용됩니다.  
따라서 이번 장의 내용을 잘 익혀두면 월별 매출 분석, 요일별 패턴 분석, 기간별 비교 분석을 훨씬 쉽게 할 수 있습니다.

---

## 13.1 날짜 데이터가 중요한 이유

날짜 데이터는 단순히 “언제 발생했는가”를 기록하는 값이 아닙니다.  
분석에서는 날짜를 기준으로 데이터를 나누고, 비교하고, 흐름을 파악합니다.

---

### 13.1.1 시간 흐름을 분석할 수 있다

날짜 데이터가 있으면 시간에 따른 변화를 볼 수 있습니다.

예를 들어 쇼핑몰 매출 데이터에서 주문일이 있다면 다음을 분석할 수 있습니다.

\`\`\`text
일별 매출
주별 매출
월별 매출
분기별 매출
연도별 매출
\`\`\`

시간 흐름을 분석하면 단순한 합계보다 더 많은 정보를 얻을 수 있습니다.

\`\`\`text
매출이 전체적으로 증가하고 있는가?
특정 달에 매출이 급증했는가?
주말에 주문이 많은가?
월초와 월말 중 언제 매출이 높은가?
\`\`\`

---

### 13.1.2 기간 조건으로 데이터를 선택할 수 있다

날짜 데이터가 있으면 특정 기간의 데이터만 선택할 수 있습니다.

\`\`\`text
최근 7일 주문
2026년 1월 주문
이벤트 기간 중 주문
가입 후 30일 이내 구매
배송 완료가 지연된 주문
\`\`\`

기간 필터링은 실무 분석에서 매우 자주 사용됩니다.

---

### 13.1.3 날짜 차이를 계산할 수 있다

날짜끼리 빼면 기간을 계산할 수 있습니다.

예를 들어 다음과 같은 계산이 가능합니다.

\`\`\`text
배송 완료일 - 주문일 = 배송 소요일
첫 구매일 - 가입일 = 첫 구매까지 걸린 기간
오늘 날짜 - 마지막 로그인일 = 미접속 기간
마감일 - 오늘 날짜 = 남은 기간
\`\`\`

이런 기간 계산은 고객 분석, 운영 분석, 물류 분석, 서비스 분석에서 중요합니다.

---

### 13.1.4 날짜를 기준으로 집계할 수 있다

날짜 데이터에서 연도, 월, 요일, 분기 같은 정보를 추출하면 그룹화 분석을 할 수 있습니다.

\`\`\`text
월별 매출 합계
요일별 평균 주문 금액
분기별 고객 수
연도별 신규 가입자 수
\`\`\`

날짜 데이터는 그룹화와 시각화의 중요한 기준 컬럼이 됩니다.

---

## 13.2 날짜 데이터의 기본 개념

pandas에서 날짜를 다루기 전에 몇 가지 개념을 먼저 이해해야 합니다.

---

### 13.2.1 문자열 날짜와 날짜형 데이터

다음 값은 사람 눈에는 날짜처럼 보입니다.

\`\`\`python
date_text = "2026-01-05"
\`\`\`

하지만 이 값은 파이썬 입장에서는 문자열입니다.

\`\`\`python
type(date_text)
\`\`\`

문자열 상태에서는 날짜 계산을 할 수 없습니다.

\`\`\`python
"2026-01-10" - "2026-01-05"
\`\`\`

이런 계산은 불가능합니다.  
따라서 날짜 분석을 하려면 문자열을 날짜형으로 변환해야 합니다.

pandas에서는 \`pd.to_datetime()\`을 사용해 문자열을 날짜형으로 변환합니다.

\`\`\`python
import pandas as pd

date_value = pd.to_datetime("2026-01-05")

date_value
\`\`\`

날짜형으로 변환하면 날짜 계산, 연도 추출, 월 추출, 기간 필터링이 가능해집니다.

---

### 13.2.2 날짜형 데이터의 장점

날짜형 데이터가 되면 다음 작업을 할 수 있습니다.

\`\`\`python
date_value.year
date_value.month
date_value.day
date_value.day_name()
\`\`\`

pandas Series에서는 \`.dt\` 접근자를 사용합니다.

\`\`\`python
df["order_date"].dt.year
df["order_date"].dt.month
df["order_date"].dt.day
\`\`\`

문자열 날짜와 날짜형 데이터의 차이를 정리하면 다음과 같습니다.

| 구분 | 문자열 날짜 | 날짜형 데이터 |
|---|---|---|
| 예시 | \`"2026-01-05"\` | \`Timestamp('2026-01-05')\` |
| 자료형 | 문자열 | datetime |
| 날짜 계산 | 어려움 | 가능 |
| 연도, 월 추출 | 문자열 처리 필요 | \`.dt.year\`, \`.dt.month\` |
| 기간 필터링 | 불안정할 수 있음 | 안정적 |
| 월별 집계 | 별도 처리 필요 | 쉽게 가능 |

---

### 13.2.3 날짜와 시간

날짜 데이터에는 시간 정보가 함께 들어갈 수도 있습니다.

\`\`\`text
2026-01-05 14:30:00
\`\`\`

이 값은 2026년 1월 5일 오후 2시 30분을 의미합니다.

시간 정보가 있으면 다음 분석이 가능합니다.

\`\`\`text
시간대별 주문 수
출근 시간대 이용량
오전과 오후 매출 비교
응답 시간 계산
로그 발생 시간 분석
\`\`\`

기초 과정에서는 날짜 중심으로 학습하되, 시간 정보도 함께 다룰 수 있는 기본 방법을 배웁니다.

---

## 13.3 예제 데이터 준비

이번 장에서는 주문 데이터와 고객 데이터를 사용합니다.

먼저 주문 데이터를 만들어보겠습니다.

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6],
    "order_date": [
        "2026-01-03",
        "2026-01-05",
        "2026-01-10",
        "2026-02-02",
        "2026-02-14",
        "2026-03-01",
        "2026-03-15",
        "잘못된 날짜"
    ],
    "ship_date": [
        "2026-01-05",
        "2026-01-08",
        "2026-01-12",
        "2026-02-04",
        None,
        "2026-03-05",
        "2026-03-18",
        "2026-03-20"
    ],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서"],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 25000]
})

orders
\`\`\`

이 데이터에는 다음 특징이 있습니다.

- \`order_date\`는 주문일입니다.
- \`ship_date\`는 배송일입니다.
- \`order_date\`에는 잘못된 날짜 문자열이 하나 있습니다.
- \`ship_date\`에는 결측치가 하나 있습니다.
- \`total_price\`는 주문 금액입니다.

고객 데이터도 만들어보겠습니다.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 6],
    "name": ["민수", "지영", "철수", "영희", "수진", "현우"],
    "signup_date": [
        "2025-12-20",
        "2026-01-01",
        "2026-01-08",
        "2026-02-01",
        "2026-03-01",
        "2026-03-10"
    ],
    "region": ["서울", "부산", "서울", "대전", "부산", "서울"]
})

customers
\`\`\`

이 고객 데이터에는 가입일이 포함되어 있습니다.  
나중에 주문 데이터와 결합하면 “가입 후 첫 주문까지 걸린 기간” 같은 분석을 할 수 있습니다.

---

## 13.4 날짜형으로 변환하기

날짜 분석의 첫 단계는 문자열 날짜를 날짜형으로 변환하는 것입니다.

pandas에서는 \`pd.to_datetime()\`을 사용합니다.

---

### 13.4.1 \`pd.to_datetime()\` 기본 사용법

주문일을 날짜형으로 변환해보겠습니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"])

orders[["order_date", "order_date_dt"]]
\`\`\`

하지만 이 코드는 오류가 발생할 수 있습니다.  
예제 데이터에는 \`"잘못된 날짜"\`라는 값이 들어 있기 때문입니다.

실무 데이터에는 이런 잘못된 날짜가 자주 포함됩니다.

---

### 13.4.2 변환 실패 처리: \`errors="coerce"\`

잘못된 날짜가 있을 때는 \`errors="coerce"\`를 사용할 수 있습니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

orders[["order_date", "order_date_dt"]]
\`\`\`

\`errors="coerce"\`는 변환할 수 없는 값을 \`NaT\`로 바꿉니다.

\`NaT\`는 Not a Time의 약자입니다.  
날짜와 시간 데이터에서의 결측치라고 이해하면 됩니다.

\`\`\`text
잘못된 날짜 → NaT
\`\`\`

날짜 데이터를 다룰 때는 \`NaN\` 대신 \`NaT\`를 자주 보게 됩니다.

---

### 13.4.3 배송일 변환하기

배송일도 날짜형으로 변환합니다.

\`\`\`python
orders["ship_date_dt"] = pd.to_datetime(
    orders["ship_date"],
    errors="coerce"
)

orders[["ship_date", "ship_date_dt"]]
\`\`\`

\`ship_date\`에 있는 \`None\`도 날짜형 변환 후 \`NaT\`로 처리됩니다.

---

### 13.4.4 날짜 형식 지정하기: \`format\`

날짜 형식이 일정하다면 \`format\`을 지정할 수 있습니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    format="%Y-%m-%d",
    errors="coerce"
)
\`\`\`

여기서 \`"%Y-%m-%d"\`는 다음을 의미합니다.

| 코드 | 의미 | 예시 |
|---|---|---|
| \`%Y\` | 4자리 연도 | 2026 |
| \`%m\` | 2자리 월 | 01 |
| \`%d\` | 2자리 일 | 05 |

날짜 형식 코드는 이후에도 자주 사용됩니다.

대표적인 형식은 다음과 같습니다.

| 문자열 예시 | format |
|---|---|
| \`2026-01-05\` | \`%Y-%m-%d\` |
| \`2026/01/05\` | \`%Y/%m/%d\` |
| \`2026.01.05\` | \`%Y.%m.%d\` |
| \`20260105\` | \`%Y%m%d\` |
| \`05-01-2026\` | \`%d-%m-%Y\` |

형식이 일정할 때는 \`format\`을 지정하면 의도를 명확히 표현할 수 있습니다.

---

### 13.4.5 날짜 변환 후 자료형 확인

날짜형으로 변환한 뒤에는 자료형을 확인합니다.

\`\`\`python
orders.dtypes
\`\`\`

날짜형 컬럼은 보통 다음과 비슷하게 표시됩니다.

\`\`\`text
datetime64[ns]
\`\`\`

이제 이 컬럼은 날짜 계산과 \`.dt\` 접근자를 사용할 수 있는 상태입니다.

\`\`\`python
orders["order_date_dt"].dt.year
\`\`\`

---

### 13.4.6 잘못된 날짜 찾기

\`errors="coerce"\`를 사용하면 잘못된 날짜가 \`NaT\`로 바뀝니다.  
이제 어떤 행에서 날짜 변환에 실패했는지 찾을 수 있습니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

이 코드는 주문일 변환에 실패한 행을 보여줍니다.

실무에서는 이런 행을 별도로 검토해야 합니다.

\`\`\`text
원본 날짜가 잘못 입력되었는가?
수정 가능한가?
분석에서 제외해야 하는가?
날짜 분석이 아닌 다른 분석에는 사용할 수 있는가?
\`\`\`

---

## 13.5 날짜 정보 추출하기

날짜형 데이터가 준비되면 연도, 월, 일, 요일 같은 정보를 쉽게 추출할 수 있습니다.

pandas Series에서 날짜 정보를 추출할 때는 \`.dt\` 접근자를 사용합니다.

---

### 13.5.1 연도, 월, 일 추출

\`\`\`python
orders["order_year"] = orders["order_date_dt"].dt.year
orders["order_month"] = orders["order_date_dt"].dt.month
orders["order_day"] = orders["order_date_dt"].dt.day

orders[["order_date_dt", "order_year", "order_month", "order_day"]]
\`\`\`

이제 날짜에서 연도, 월, 일을 각각 별도 컬럼으로 사용할 수 있습니다.

이런 파생 변수는 그룹화 분석에 자주 사용됩니다.

\`\`\`python
orders.groupby("order_month")["total_price"].sum()
\`\`\`

---

### 13.5.2 요일 추출

요일은 주문 패턴 분석에서 중요합니다.

\`\`\`python
orders["weekday"] = orders["order_date_dt"].dt.dayofweek

orders[["order_date_dt", "weekday"]]
\`\`\`

\`dayofweek\`는 월요일을 0, 일요일을 6으로 표현합니다.

| 값 | 요일 |
|---:|---|
| 0 | 월요일 |
| 1 | 화요일 |
| 2 | 수요일 |
| 3 | 목요일 |
| 4 | 금요일 |
| 5 | 토요일 |
| 6 | 일요일 |

요일 이름을 바로 얻으려면 \`day_name()\`을 사용합니다.

\`\`\`python
orders["weekday_name"] = orders["order_date_dt"].dt.day_name()

orders[["order_date_dt", "weekday_name"]]
\`\`\`

기본적으로 영어 요일명이 나옵니다.

한국어 요일명을 사용하고 싶다면 매핑을 사용할 수 있습니다.

\`\`\`python
weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders["weekday_kr"] = orders["weekday_name"].replace(weekday_map)

orders[["order_date_dt", "weekday_kr"]]
\`\`\`

---

### 13.5.3 분기 추출

분기별 분석이 필요할 때는 \`quarter\`를 사용할 수 있습니다.

\`\`\`python
orders["quarter"] = orders["order_date_dt"].dt.quarter

orders[["order_date_dt", "quarter"]]
\`\`\`

분기는 다음과 같이 나뉩니다.

| 분기 | 월 |
|---:|---|
| 1분기 | 1월, 2월, 3월 |
| 2분기 | 4월, 5월, 6월 |
| 3분기 | 7월, 8월, 9월 |
| 4분기 | 10월, 11월, 12월 |

---

### 13.5.4 날짜와 시간 정보 추출

날짜와 시간이 함께 있는 데이터에서는 시간 정보도 추출할 수 있습니다.

\`\`\`python
logs = pd.DataFrame({
    "event_time": [
        "2026-01-01 09:15:00",
        "2026-01-01 13:30:00",
        "2026-01-01 18:45:00"
    ],
    "event": ["login", "purchase", "logout"]
})

logs["event_time"] = pd.to_datetime(logs["event_time"])

logs["hour"] = logs["event_time"].dt.hour
logs["minute"] = logs["event_time"].dt.minute
logs["second"] = logs["event_time"].dt.second

logs
\`\`\`

시간대별 분석에서는 \`hour\` 컬럼이 자주 사용됩니다.

\`\`\`python
logs.groupby("hour")["event"].count()
\`\`\`

---

### 13.5.5 날짜만 추출하기

날짜와 시간이 함께 있는 데이터에서 날짜만 필요할 수 있습니다.

\`\`\`python
logs["event_date"] = logs["event_time"].dt.date

logs
\`\`\`

다만 \`.dt.date\`의 결과는 파이썬의 date 객체가 됩니다.  
pandas의 날짜형 연산을 계속 사용해야 한다면 datetime 형태를 유지하는 것이 더 편할 수 있습니다.

기초 과정에서는 날짜만 표시하고 싶을 때 \`.dt.date\`를 사용할 수 있다고 이해하면 됩니다.

---

## 13.6 날짜 기준 필터링

날짜형 데이터가 있으면 특정 기간의 데이터만 선택할 수 있습니다.

---

### 13.6.1 특정 날짜 이후 데이터 선택

2026년 2월 1일 이후 주문을 선택해보겠습니다.

\`\`\`python
orders_after_feb = orders[
    orders["order_date_dt"] >= "2026-02-01"
]

orders_after_feb
\`\`\`

날짜형 컬럼은 문자열 날짜와 비교할 수 있습니다.  
pandas가 비교 가능한 날짜로 해석합니다.

더 명확하게 쓰고 싶다면 \`pd.Timestamp\`를 사용할 수 있습니다.

\`\`\`python
orders_after_feb = orders[
    orders["order_date_dt"] >= pd.Timestamp("2026-02-01")
]
\`\`\`

---

### 13.6.2 특정 날짜 이전 데이터 선택

2026년 2월 1일 이전 주문을 선택합니다.

\`\`\`python
orders_before_feb = orders[
    orders["order_date_dt"] < "2026-02-01"
]

orders_before_feb
\`\`\`

비교 연산자는 일반 숫자 비교와 비슷하게 사용합니다.

| 조건 | 의미 |
|---|---|
| \`>=\` | 해당 날짜 이후 포함 |
| \`>\` | 해당 날짜 이후, 해당 날짜 제외 |
| \`<=\` | 해당 날짜 이전 포함 |
| \`<\` | 해당 날짜 이전, 해당 날짜 제외 |
| \`==\` | 해당 날짜와 같은 날짜 |

---

### 13.6.3 특정 기간 데이터 선택

2026년 1월 1일부터 2026년 1월 31일까지의 주문을 선택해봅시다.

\`\`\`python
jan_orders = orders[
    (orders["order_date_dt"] >= "2026-01-01") &
    (orders["order_date_dt"] <= "2026-01-31")
]

jan_orders
\`\`\`

여러 조건을 사용할 때는 각 조건을 괄호로 감싸고 \`&\`를 사용해야 합니다.

다음처럼 \`and\`를 사용하면 안 됩니다.

\`\`\`python
# 잘못된 예
# orders[(orders["order_date_dt"] >= "2026-01-01") and (orders["order_date_dt"] <= "2026-01-31")]
\`\`\`

pandas 조건 필터링에서는 \`and\` 대신 \`&\`, \`or\` 대신 \`|\`를 사용합니다.

---

### 13.6.4 \`between()\` 사용하기

특정 구간을 선택할 때 \`between()\`을 사용할 수도 있습니다.

\`\`\`python
jan_orders = orders[
    orders["order_date_dt"].between("2026-01-01", "2026-01-31")
]

jan_orders
\`\`\`

\`between()\`은 시작값과 끝값을 포함합니다.

기간 조건을 읽기 쉽게 표현할 수 있어 편리합니다.

---

### 13.6.5 특정 월 데이터 선택

월 컬럼을 이미 만들었다면 특정 월 데이터를 쉽게 선택할 수 있습니다.

\`\`\`python
orders["order_month"] = orders["order_date_dt"].dt.month

feb_orders = orders[orders["order_month"] == 2]

feb_orders
\`\`\`

연도와 월을 함께 조건으로 사용할 수도 있습니다.

\`\`\`python
orders["order_year"] = orders["order_date_dt"].dt.year

feb_2026_orders = orders[
    (orders["order_year"] == 2026) &
    (orders["order_month"] == 2)
]

feb_2026_orders
\`\`\`

날짜 데이터가 여러 연도에 걸쳐 있다면 월만 보는 것보다 연도와 월을 함께 확인하는 것이 안전합니다.

---

### 13.6.6 최근 N일 데이터 선택

분석 기준일을 정하고 최근 30일 데이터를 선택할 수 있습니다.

\`\`\`python
base_date = pd.Timestamp("2026-03-31")
start_date = base_date - pd.Timedelta(days=30)

recent_orders = orders[
    (orders["order_date_dt"] >= start_date) &
    (orders["order_date_dt"] <= base_date)
]

recent_orders
\`\`\`

실무에서는 “오늘 기준 최근 30일”을 사용할 수도 있습니다.

\`\`\`python
today = pd.Timestamp.today()
start_date = today - pd.Timedelta(days=30)
\`\`\`

다만 교재나 실습에서는 실행 날짜에 따라 결과가 달라지지 않도록 기준일을 고정하는 것이 좋습니다.

---

## 13.7 날짜 계산

날짜형 데이터끼리는 뺄셈이 가능합니다.  
날짜 차이를 계산하면 기간 분석을 할 수 있습니다.

---

### 13.7.1 배송 소요일 계산

주문일과 배송일의 차이를 계산해보겠습니다.

\`\`\`python
orders["delivery_time"] = orders["ship_date_dt"] - orders["order_date_dt"]

orders[["order_date_dt", "ship_date_dt", "delivery_time"]]
\`\`\`

결과는 \`Timedelta\` 형태로 나타납니다.

\`\`\`text
2 days
3 days
\`\`\`

일수만 숫자로 추출하려면 \`.dt.days\`를 사용합니다.

\`\`\`python
orders["delivery_days"] = orders["delivery_time"].dt.days

orders[["order_date_dt", "ship_date_dt", "delivery_days"]]
\`\`\`

이제 배송 소요일을 평균으로 계산할 수 있습니다.

\`\`\`python
orders["delivery_days"].mean()
\`\`\`

---

### 13.7.2 특정 날짜와의 차이 계산

기준일과 주문일의 차이를 계산할 수도 있습니다.

\`\`\`python
base_date = pd.Timestamp("2026-03-31")

orders["days_since_order"] = (base_date - orders["order_date_dt"]).dt.days

orders[["order_date_dt", "days_since_order"]]
\`\`\`

이렇게 하면 기준일로부터 주문이 며칠 전인지 알 수 있습니다.

고객 분석에서는 다음과 같은 지표에 사용할 수 있습니다.

\`\`\`text
마지막 구매 후 경과일
가입 후 경과일
마지막 로그인 후 경과일
최근 방문 후 경과일
\`\`\`

---

### 13.7.3 가입 후 첫 주문까지 걸린 기간

고객 데이터와 주문 데이터를 이용해 가입 후 첫 주문까지 걸린 기간을 계산해보겠습니다.

먼저 고객 가입일을 날짜형으로 변환합니다.

\`\`\`python
customers["signup_date_dt"] = pd.to_datetime(customers["signup_date"])

customers
\`\`\`

주문 데이터에서 고객별 첫 주문일을 구합니다.

\`\`\`python
first_order = (
    orders
    .dropna(subset=["order_date_dt"])
    .groupby("customer_id")["order_date_dt"]
    .min()
    .reset_index()
)

first_order = first_order.rename(columns={"order_date_dt": "first_order_date"})

first_order
\`\`\`

고객 데이터와 첫 주문일 데이터를 결합합니다.

\`\`\`python
customer_order = customers.merge(first_order, on="customer_id", how="left")

customer_order
\`\`\`

가입 후 첫 주문까지 걸린 기간을 계산합니다.

\`\`\`python
customer_order["days_to_first_order"] = (
    customer_order["first_order_date"] - customer_order["signup_date_dt"]
).dt.days

customer_order[["customer_id", "name", "signup_date_dt", "first_order_date", "days_to_first_order"]]
\`\`\`

이 분석은 고객 전환 기간을 파악하는 데 유용합니다.

---

### 13.7.4 마감일까지 남은 기간 계산

업무 데이터에서는 마감일까지 남은 기간을 계산할 수 있습니다.

\`\`\`python
tasks = pd.DataFrame({
    "task": ["보고서 작성", "데이터 정리", "회의 준비"],
    "due_date": ["2026-04-05", "2026-04-10", "2026-03-28"]
})

tasks["due_date"] = pd.to_datetime(tasks["due_date"])

base_date = pd.Timestamp("2026-03-31")

tasks["days_left"] = (tasks["due_date"] - base_date).dt.days

tasks
\`\`\`

마감일이 지난 업무도 찾을 수 있습니다.

\`\`\`python
overdue_tasks = tasks[tasks["days_left"] < 0]

overdue_tasks
\`\`\`

---

## 13.8 날짜 기준 집계

날짜 데이터를 분석할 때 가장 자주 하는 작업 중 하나가 날짜 기준 집계입니다.

예를 들어 월별 매출 합계, 요일별 주문 수, 일별 평균 주문 금액을 구할 수 있습니다.

---

### 13.8.1 월별 매출 집계

먼저 연도와 월 컬럼을 만듭니다.

\`\`\`python
orders["order_year"] = orders["order_date_dt"].dt.year
orders["order_month"] = orders["order_date_dt"].dt.month
\`\`\`

월별 매출 합계를 계산합니다.

\`\`\`python
monthly_sales = (
    orders
    .dropna(subset=["order_date_dt"])
    .groupby(["order_year", "order_month"])["total_price"]
    .sum()
    .reset_index()
)

monthly_sales
\`\`\`

여러 연도의 데이터가 있을 수 있으므로 연도와 월을 함께 그룹화하는 것이 안전합니다.

---

### 13.8.2 연월 컬럼 만들기

연도와 월을 하나의 컬럼으로 만들 수도 있습니다.

\`\`\`python
orders["order_year_month"] = orders["order_date_dt"].dt.to_period("M")

orders[["order_date_dt", "order_year_month"]]
\`\`\`

\`to_period("M")\`은 날짜를 월 단위 기간으로 표현합니다.

이제 월별 매출을 더 간단히 구할 수 있습니다.

\`\`\`python
monthly_sales = (
    orders
    .dropna(subset=["order_year_month"])
    .groupby("order_year_month")["total_price"]
    .sum()
    .reset_index()
)

monthly_sales
\`\`\`

연월 컬럼은 월별 분석에서 매우 자주 사용됩니다.

---

### 13.8.3 요일별 주문 수

요일별 주문 수를 계산해보겠습니다.

\`\`\`python
orders["weekday"] = orders["order_date_dt"].dt.day_name()

weekday_orders = (
    orders
    .dropna(subset=["weekday"])
    .groupby("weekday")["order_id"]
    .count()
    .reset_index(name="order_count")
)

weekday_orders
\`\`\`

요일 순서를 월요일부터 일요일까지 정렬하려면 별도 순서 컬럼을 사용할 수 있습니다.

\`\`\`python
orders["weekday_num"] = orders["order_date_dt"].dt.dayofweek

weekday_orders = (
    orders
    .dropna(subset=["weekday_num"])
    .groupby(["weekday_num", "weekday"])["order_id"]
    .count()
    .reset_index(name="order_count")
    .sort_values("weekday_num")
)

weekday_orders
\`\`\`

---

### 13.8.4 일별 매출 집계

주문일 기준으로 일별 매출을 구해보겠습니다.

\`\`\`python
daily_sales = (
    orders
    .dropna(subset=["order_date_dt"])
    .groupby("order_date_dt")["total_price"]
    .sum()
    .reset_index()
)

daily_sales
\`\`\`

이 방식은 날짜 컬럼이 날짜만 포함할 때는 잘 작동합니다.  
하지만 시간 정보가 포함되어 있으면 같은 날짜라도 시간이 다르면 다른 값으로 그룹화될 수 있습니다.

시간 정보가 있는 경우 날짜만 따로 추출해서 그룹화할 수 있습니다.

\`\`\`python
logs = pd.DataFrame({
    "event_time": [
        "2026-01-01 09:15:00",
        "2026-01-01 13:30:00",
        "2026-01-02 10:00:00"
    ],
    "amount": [10000, 20000, 15000]
})

logs["event_time"] = pd.to_datetime(logs["event_time"])
logs["event_date"] = logs["event_time"].dt.date

logs.groupby("event_date")["amount"].sum()
\`\`\`

---

### 13.8.5 \`resample()\` 맛보기

날짜 데이터를 집계할 때 \`resample()\`을 사용할 수도 있습니다.

\`resample()\`은 날짜 인덱스를 기준으로 데이터를 다시 묶는 기능입니다.

먼저 주문일을 인덱스로 설정합니다.

\`\`\`python
orders_for_resample = orders.dropna(subset=["order_date_dt"]).set_index("order_date_dt")

orders_for_resample
\`\`\`

월별 매출을 구합니다.

\`\`\`python
orders_for_resample["total_price"].resample("M").sum()
\`\`\`

다만 최근 pandas에서는 월말 기준 \`"M"\` 대신 \`"ME"\` 같은 명시적인 별칭이 사용될 수 있습니다.  
수업에서는 pandas 버전에 따라 경고가 보일 수 있음을 안내하고, 실습 환경의 문서를 확인하도록 지도하면 좋습니다.

월 시작 기준으로 집계하고 싶다면 \`"MS"\`를 사용할 수 있습니다.

\`\`\`python
orders_for_resample["total_price"].resample("MS").sum()
\`\`\`

\`resample()\`은 시계열 분석에서 매우 유용하지만, 기초 과정에서는 “날짜 인덱스를 기준으로 기간별 집계를 할 수 있다” 정도로 이해하면 충분합니다.

더 깊은 시계열 분석은 데이터 분석 고급 과정에서 다루는 것이 좋습니다.

---

## 13.9 날짜 데이터 클리닝

실무 날짜 데이터에는 여러 문제가 섞여 있습니다.

\`\`\`text
잘못된 날짜
서로 다른 날짜 형식
결측치
문자열과 날짜형 혼합
시간대 문제
날짜와 시간이 붙어 있는 데이터
\`\`\`

이번 절에서는 기초 과정에서 알아야 할 날짜 데이터 클리닝 방법을 정리합니다.

---

### 13.9.1 잘못된 날짜 처리

잘못된 날짜는 \`errors="coerce"\`로 \`NaT\`로 변환한 뒤 확인합니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

invalid_dates = orders[orders["order_date_dt"].isna()]

invalid_dates
\`\`\`

잘못된 날짜가 있는 행을 어떻게 처리할지는 분석 목적에 따라 다릅니다.

\`\`\`text
날짜 분석에서는 제외한다.
원본 데이터를 확인해 수정한다.
날짜가 필요 없는 분석에는 유지한다.
\`\`\`

---

### 13.9.2 결측 날짜 처리

날짜 컬럼의 결측치도 분석 목적에 따라 처리해야 합니다.

예를 들어 배송일이 없는 것은 아직 배송되지 않았다는 의미일 수 있습니다.

\`\`\`python
orders[orders["ship_date_dt"].isna()]
\`\`\`

배송일 결측치를 임의로 채우면 잘못된 배송 소요일이 계산될 수 있습니다.  
따라서 배송 소요일 분석에서는 배송일이 있는 행만 사용합니다.

\`\`\`python
delivery_data = orders.dropna(subset=["order_date_dt", "ship_date_dt"]).copy()

delivery_data["delivery_days"] = (
    delivery_data["ship_date_dt"] - delivery_data["order_date_dt"]
).dt.days

delivery_data
\`\`\`

---

### 13.9.3 여러 날짜 형식이 섞인 경우

다음처럼 날짜 형식이 섞여 있을 수 있습니다.

\`\`\`python
mixed_dates = pd.Series([
    "2026-01-05",
    "2026/01/06",
    "2026.01.07",
    "20260108",
    "잘못된 날짜"
])

pd.to_datetime(mixed_dates, errors="coerce")
\`\`\`

pandas가 여러 형식을 자동으로 처리하는 경우도 있지만, 모든 형식을 항상 완벽하게 처리하는 것은 아닙니다.  
형식이 복잡하게 섞여 있다면 먼저 문자열을 표준화하는 작업이 필요할 수 있습니다.

예를 들어 \`/\`와 \`.\`을 \`-\`로 바꿀 수 있습니다.

\`\`\`python
mixed_dates_clean = (
    mixed_dates
    .str.replace("/", "-", regex=False)
    .str.replace(".", "-", regex=False)
)

pd.to_datetime(mixed_dates_clean, errors="coerce")
\`\`\`

형식이 지나치게 다양하면 원본 데이터 생성 단계에서부터 표준 형식을 정하는 것이 가장 좋습니다.

---

### 13.9.4 날짜 형식 표준화

분석 결과를 저장하거나 보고서에 표시할 때는 날짜 형식을 통일하는 것이 좋습니다.

날짜형 데이터를 문자열로 변환하려면 \`dt.strftime()\`을 사용합니다.

\`\`\`python
orders["order_date_text"] = orders["order_date_dt"].dt.strftime("%Y-%m-%d")

orders[["order_date_dt", "order_date_text"]]
\`\`\`

\`strftime()\`은 날짜를 원하는 문자열 형식으로 바꿉니다.

예를 들어 다음과 같은 형식이 가능합니다.

\`\`\`python
orders["order_date_dt"].dt.strftime("%Y/%m/%d")
orders["order_date_dt"].dt.strftime("%Y년 %m월 %d일")
\`\`\`

분석할 때는 날짜형을 유지하고, 출력이나 보고용으로만 문자열 형식을 사용하는 것이 좋습니다.

---

### 13.9.5 시간대 기초

실무에서 해외 서비스나 서버 로그를 다루면 시간대 문제가 생길 수 있습니다.

\`\`\`text
한국 시간
UTC
미국 시간
서버 시간
사용자 로컬 시간
\`\`\`

기초 과정에서는 시간대를 깊게 다루지 않습니다.  
다만 다음 정도는 알고 있어야 합니다.

\`\`\`text
시간대가 다른 데이터를 비교할 때는 기준 시간대를 맞춰야 한다.
서버 로그는 UTC로 저장되는 경우가 많다.
한국 시간은 UTC보다 9시간 빠르다.
\`\`\`

pandas에서는 시간대가 있는 날짜도 다룰 수 있습니다.

\`\`\`python
time_data = pd.to_datetime(["2026-01-01 00:00:00"], utc=True)

time_data
\`\`\`

시간대 처리는 데이터 분석 고급 과정이나 실무 프로젝트에서 더 자세히 다루는 것이 좋습니다.

---

## 13.10 실무 예제 1: 월별 매출 분석

이번 절에서는 주문 데이터를 사용해 월별 매출을 분석합니다.

---

### 13.10.1 주문일 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

잘못된 날짜는 \`NaT\`가 됩니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

월별 분석에서는 날짜가 없는 행을 제외합니다.

\`\`\`python
orders_valid_date = orders.dropna(subset=["order_date_dt"]).copy()
\`\`\`

---

### 13.10.2 연월 컬럼 생성

\`\`\`python
orders_valid_date["order_year_month"] = orders_valid_date["order_date_dt"].dt.to_period("M")

orders_valid_date[["order_date_dt", "order_year_month"]]
\`\`\`

---

### 13.10.3 월별 매출 집계

\`\`\`python
monthly_sales = (
    orders_valid_date
    .groupby("order_year_month")["total_price"]
    .sum()
    .reset_index()
)

monthly_sales
\`\`\`

월별 주문 수와 평균 주문 금액도 함께 계산할 수 있습니다.

\`\`\`python
monthly_summary = (
    orders_valid_date
    .groupby("order_year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        average_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_summary
\`\`\`

\`agg()\`는 여러 집계를 한 번에 수행할 때 사용합니다.  
그룹화와 집계는 다음 장에서 더 자세히 다룹니다.

---

## 13.11 실무 예제 2: 요일별 주문 패턴 분석

요일별 주문 수를 분석해보겠습니다.

---

### 13.11.1 요일 컬럼 만들기

\`\`\`python
orders_valid_date["weekday_num"] = orders_valid_date["order_date_dt"].dt.dayofweek
orders_valid_date["weekday_name"] = orders_valid_date["order_date_dt"].dt.day_name()

weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_valid_date["weekday_kr"] = orders_valid_date["weekday_name"].replace(weekday_map)

orders_valid_date[["order_date_dt", "weekday_num", "weekday_kr"]]
\`\`\`

---

### 13.11.2 요일별 주문 수와 매출

\`\`\`python
weekday_summary = (
    orders_valid_date
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum"),
        average_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_summary
\`\`\`

요일별 주문 수를 보면 특정 요일에 주문이 몰리는지 확인할 수 있습니다.

---

## 13.12 실무 예제 3: 배송 소요일 분석

배송일과 주문일을 이용해 배송 소요일을 계산해보겠습니다.

---

### 13.12.1 날짜형 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"], errors="coerce")
orders["ship_date_dt"] = pd.to_datetime(orders["ship_date"], errors="coerce")
\`\`\`

---

### 13.12.2 배송 소요일 계산

\`\`\`python
delivery_orders = orders.dropna(subset=["order_date_dt", "ship_date_dt"]).copy()

delivery_orders["delivery_days"] = (
    delivery_orders["ship_date_dt"] - delivery_orders["order_date_dt"]
).dt.days

delivery_orders[["order_id", "order_date_dt", "ship_date_dt", "delivery_days"]]
\`\`\`

---

### 13.12.3 배송 소요일 요약

\`\`\`python
delivery_orders["delivery_days"].describe()
\`\`\`

평균 배송 소요일을 계산합니다.

\`\`\`python
delivery_orders["delivery_days"].mean()
\`\`\`

배송이 3일 이상 걸린 주문을 찾을 수도 있습니다.

\`\`\`python
delayed_orders = delivery_orders[delivery_orders["delivery_days"] >= 3]

delayed_orders
\`\`\`

---

## 13.13 실무 미니 프로젝트: 주문 날짜 분석 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 주문 날짜 분석 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 주문일과 배송일을 날짜형으로 변환한다.
3. 잘못된 주문일을 확인한다.
4. 연월, 요일 컬럼을 만든다.
5. 월별 매출을 집계한다.
6. 요일별 주문 수를 집계한다.
7. 배송 소요일을 계산한다.
8. 최근 30일 주문을 추출한다.
9. 분석 결과를 요약한다.
\`\`\`

---

### 13.13.1 데이터 준비

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8],
    "order_date": [
        "2026-01-03",
        "2026-01-05",
        "2026-01-10",
        "2026-02-02",
        "2026-02-14",
        "2026-03-01",
        "2026-03-15",
        "잘못된 날짜",
        "2026-03-20",
        "2026-03-28"
    ],
    "ship_date": [
        "2026-01-05",
        "2026-01-08",
        "2026-01-12",
        "2026-02-04",
        None,
        "2026-03-05",
        "2026-03-18",
        "2026-03-20",
        "2026-03-23",
        "2026-03-30"
    ],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기"],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 25000, 70000, 260000]
})

orders
\`\`\`

---

### 13.13.2 날짜형 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"], errors="coerce")
orders["ship_date_dt"] = pd.to_datetime(orders["ship_date"], errors="coerce")
\`\`\`

잘못된 주문일을 확인합니다.

\`\`\`python
invalid_order_dates = orders[orders["order_date_dt"].isna()]

invalid_order_dates
\`\`\`

---

### 13.13.3 날짜 파생 변수 만들기

날짜가 있는 주문만 따로 사용합니다.

\`\`\`python
orders_valid = orders.dropna(subset=["order_date_dt"]).copy()
\`\`\`

연월, 요일 컬럼을 만듭니다.

\`\`\`python
orders_valid["order_year_month"] = orders_valid["order_date_dt"].dt.to_period("M")
orders_valid["weekday_num"] = orders_valid["order_date_dt"].dt.dayofweek
orders_valid["weekday_name"] = orders_valid["order_date_dt"].dt.day_name()

weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_valid["weekday_kr"] = orders_valid["weekday_name"].replace(weekday_map)

orders_valid[["order_date_dt", "order_year_month", "weekday_kr"]]
\`\`\`

---

### 13.13.4 월별 매출 리포트

\`\`\`python
monthly_report = (
    orders_valid
    .groupby("order_year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        average_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_report
\`\`\`

---

### 13.13.5 요일별 주문 리포트

\`\`\`python
weekday_report = (
    orders_valid
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_report
\`\`\`

---

### 13.13.6 배송 소요일 리포트

배송일이 있는 행만 사용합니다.

\`\`\`python
delivery_data = orders_valid.dropna(subset=["ship_date_dt"]).copy()

delivery_data["delivery_days"] = (
    delivery_data["ship_date_dt"] - delivery_data["order_date_dt"]
).dt.days

delivery_data[["order_id", "order_date_dt", "ship_date_dt", "delivery_days"]]
\`\`\`

배송 요약 정보를 계산합니다.

\`\`\`python
delivery_summary = delivery_data["delivery_days"].describe()

delivery_summary
\`\`\`

배송 지연 주문을 찾습니다.

\`\`\`python
delayed_orders = delivery_data[delivery_data["delivery_days"] >= 3]

delayed_orders
\`\`\`

---

### 13.13.7 최근 30일 주문 추출

기준일을 고정합니다.

\`\`\`python
base_date = pd.Timestamp("2026-03-31")
start_date = base_date - pd.Timedelta(days=30)

recent_30_days_orders = orders_valid[
    (orders_valid["order_date_dt"] >= start_date) &
    (orders_valid["order_date_dt"] <= base_date)
]

recent_30_days_orders
\`\`\`

최근 30일 매출을 계산합니다.

\`\`\`python
recent_30_days_sales = recent_30_days_orders["total_price"].sum()

recent_30_days_sales
\`\`\`

---

### 13.13.8 분석 결과 요약

\`\`\`python
summary = {
    "전체 주문 수": len(orders),
    "날짜 변환 실패 주문 수": orders["order_date_dt"].isna().sum(),
    "날짜 분석 가능 주문 수": len(orders_valid),
    "전체 매출": orders_valid["total_price"].sum(),
    "최근 30일 매출": recent_30_days_sales,
    "평균 배송 소요일": delivery_data["delivery_days"].mean()
}

summary
\`\`\`

---

### 13.13.9 처리 기준 문서화

분석 과정에는 다음과 같이 처리 기준을 남길 수 있습니다.

\`\`\`text
날짜 데이터 처리 기준
- order_date와 ship_date는 pd.to_datetime(errors="coerce")로 날짜형 변환했다.
- 변환할 수 없는 order_date는 NaT로 처리하고 날짜 기반 분석에서는 제외했다.
- 월별 분석에는 order_date가 유효한 주문만 사용했다.
- 배송 소요일 분석에는 order_date와 ship_date가 모두 유효한 주문만 사용했다.
- 최근 30일 분석의 기준일은 2026-03-31로 고정했다.
- 요일 분석은 order_date 기준으로 수행했다.
\`\`\`

처리 기준을 남기면 분석 결과를 다시 확인하거나 다른 사람에게 설명하기 쉬워집니다.

---

## 13.14 날짜 데이터 처리 시 자주 하는 실수

날짜 데이터는 편리하지만 초보자가 자주 실수하는 부분이 많습니다.

---

### 13.14.1 문자열 날짜를 날짜형으로 변환하지 않는 실수

문자열 날짜는 날짜처럼 보이지만 실제 날짜형이 아닙니다.

\`\`\`python
df["date"].dtype
\`\`\`

날짜 분석 전에는 반드시 변환합니다.

\`\`\`python
df["date"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

---

### 13.14.2 잘못된 날짜를 확인하지 않는 실수

\`errors="coerce"\`를 사용하면 잘못된 날짜가 \`NaT\`로 바뀝니다.  
하지만 변환 후 실패한 행을 확인하지 않으면 문제가 숨어 있을 수 있습니다.

\`\`\`python
df[df["date"].isna()]
\`\`\`

날짜 변환 후에는 결측치가 얼마나 생겼는지 확인해야 합니다.

---

### 13.14.3 월만 보고 여러 연도를 섞는 실수

다음 코드는 월만 기준으로 그룹화합니다.

\`\`\`python
df.groupby(df["date"].dt.month)["sales"].sum()
\`\`\`

데이터가 여러 연도에 걸쳐 있다면 2025년 1월과 2026년 1월이 함께 묶입니다.

여러 연도를 다룰 때는 연도와 월을 함께 사용해야 합니다.

\`\`\`python
df["year_month"] = df["date"].dt.to_period("M")
df.groupby("year_month")["sales"].sum()
\`\`\`

---

### 13.14.4 날짜와 시간이 함께 있는 데이터를 날짜만으로 착각하는 실수

다음 두 값은 같은 날짜지만 시간은 다릅니다.

\`\`\`text
2026-01-01 09:00:00
2026-01-01 18:00:00
\`\`\`

시간까지 포함된 상태에서 그룹화하면 같은 날짜라도 서로 다른 값으로 취급될 수 있습니다.

날짜 단위 분석이 필요하면 날짜만 추출하거나 적절한 기간 단위로 집계해야 합니다.

\`\`\`python
df["date_only"] = df["datetime"].dt.date
\`\`\`

또는 시계열 데이터라면 \`resample()\`을 사용할 수 있습니다.

---

### 13.14.5 현재 날짜를 그대로 사용해 실습 결과가 바뀌는 문제

실습이나 교재에서는 \`pd.Timestamp.today()\`를 사용하면 실행하는 날짜에 따라 결과가 달라집니다.

\`\`\`python
today = pd.Timestamp.today()
\`\`\`

수업 예제에서는 결과가 항상 같도록 기준일을 고정하는 것이 좋습니다.

\`\`\`python
base_date = pd.Timestamp("2026-03-31")
\`\`\`

실무에서는 현재 날짜 기준 분석이 필요할 수 있지만, 학습용 예제나 테스트 코드에서는 고정 기준일이 더 적합합니다.

---

### 13.14.6 배송일 결측치를 임의로 채우는 실수

배송일이 비어 있는 것은 아직 배송되지 않았다는 의미일 수 있습니다.  
이를 임의 날짜로 채우면 배송 소요일이 잘못 계산됩니다.

배송 소요일 분석에서는 주문일과 배송일이 모두 있는 행만 사용하는 것이 안전합니다.

\`\`\`python
delivery_data = df.dropna(subset=["order_date", "ship_date"])
\`\`\`

---

### 13.14.7 시간대 차이를 무시하는 실수

해외 서비스나 서버 로그에서는 UTC 기준 시간이 저장될 수 있습니다.  
한국 시간과 비교하려면 시간대를 맞춰야 합니다.

기초 과정에서는 깊게 다루지 않지만, 서버 로그와 해외 데이터를 분석할 때는 시간대가 결과에 영향을 줄 수 있다는 점을 기억해야 합니다.

---

## 13.15 핵심 정리

이번 장에서는 pandas에서 날짜와 시간 데이터를 처리하는 방법을 배웠습니다.

문자열 날짜는 분석하기 전에 날짜형으로 변환해야 합니다.

\`\`\`python
df["date"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

변환할 수 없는 값은 \`errors="coerce"\`를 사용해 \`NaT\`로 만들 수 있습니다.  
변환 후에는 반드시 실패한 행을 확인해야 합니다.

\`\`\`python
df[df["date"].isna()]
\`\`\`

날짜형 데이터에서는 \`.dt\` 접근자를 사용해 연도, 월, 일, 요일 같은 정보를 추출할 수 있습니다.

\`\`\`python
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["weekday"] = df["date"].dt.day_name()
\`\`\`

날짜 기준 필터링은 비교 연산자나 \`between()\`을 사용할 수 있습니다.

\`\`\`python
df[df["date"] >= "2026-01-01"]
df[df["date"].between("2026-01-01", "2026-01-31")]
\`\`\`

날짜끼리 빼면 기간을 계산할 수 있습니다.

\`\`\`python
df["days"] = (df["end_date"] - df["start_date"]).dt.days
\`\`\`

월별 분석에는 연월 컬럼을 만들어 사용하는 것이 좋습니다.

\`\`\`python
df["year_month"] = df["date"].dt.to_period("M")
df.groupby("year_month")["sales"].sum()
\`\`\`

날짜 데이터는 필터링, 집계, 시각화, EDA에서 계속 사용됩니다.  
날짜형 변환과 \`.dt\` 접근자 사용에 익숙해지면 시간 흐름을 기준으로 데이터를 분석할 수 있습니다.

---

## 13.16 연습문제

### 문제 1. 개념 확인

문자열로 들어온 날짜를 pandas 날짜형 데이터로 변환할 때 사용하는 함수는 무엇인가요?

A. \`pd.to_string()\`  
B. \`pd.to_datetime()\`  
C. \`pd.to_dateframe()\`  
D. \`pd.to_number()\`

---

### 문제 2. 코드 작성

다음 DataFrame에서 \`order_date\` 컬럼을 날짜형으로 변환한 \`order_date_dt\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-05", "2026-01-10"]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 데이터에서 잘못된 날짜는 \`NaT\`로 처리되도록 날짜형 변환을 하세요.

\`\`\`python
df = pd.DataFrame({
    "date": ["2026-01-01", "잘못된 날짜", "2026-01-03"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 데이터에서 날짜 컬럼으로부터 연도, 월, 일을 추출하세요.

\`\`\`python
df = pd.DataFrame({
    "date": ["2026-02-14", "2026-03-01"]
})

df["date"] = pd.to_datetime(df["date"])
\`\`\`

---

### 문제 5. 코드 작성

다음 주문 데이터에서 2026년 2월 주문만 선택하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-10", "2026-02-01", "2026-02-15", "2026-03-01"],
    "amount": [10000, 20000, 30000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 주문일과 배송일의 차이를 일수로 계산한 \`delivery_days\` 컬럼을 만드세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-05"],
    "ship_date": ["2026-01-03", "2026-01-10"]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["ship_date"] = pd.to_datetime(orders["ship_date"])
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 월별 매출 합계를 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-10"],
    "sales": [10000, 20000, 30000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 요일 이름을 추출한 \`weekday\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "date": ["2026-01-01", "2026-01-02"]
})

df["date"] = pd.to_datetime(df["date"])
\`\`\`

---

### 문제 9. 개념 확인

여러 연도의 데이터가 있을 때 월별 매출을 분석할 때 단순히 \`dt.month\`만 사용하면 어떤 문제가 생길 수 있나요?

---

### 문제 10. 실무형 문제

다음 주문 데이터에서 날짜 분석 리포트를 만드세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- order_date는 날짜형으로 변환한다.
- 변환할 수 없는 날짜는 NaT로 처리한다.
- 날짜가 유효한 주문만 사용한다.
- year_month 컬럼을 만든다.
- 월별 매출 합계를 계산한다.
- 기준일을 2026-03-31로 두고 최근 30일 주문을 추출한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5],
    "order_date": ["2026-01-01", "2026-02-15", "2026-03-05", "잘못된 날짜", "2026-03-25"],
    "sales": [10000, 20000, 30000, 40000, 50000]
})
\`\`\`

---

## 13.17 정답 및 해설

### 문제 1 정답

정답: B

문자열 날짜를 pandas 날짜형으로 변환할 때는 \`pd.to_datetime()\`을 사용합니다.

---

### 문제 2 정답

\`\`\`python
df["order_date_dt"] = pd.to_datetime(df["order_date"])
\`\`\`

\`order_date\` 문자열 컬럼을 날짜형으로 변환해 새 컬럼에 저장합니다.

---

### 문제 3 정답

\`\`\`python
df["date_dt"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

\`errors="coerce"\`를 사용하면 변환할 수 없는 값은 \`NaT\`로 처리됩니다.

---

### 문제 4 정답

\`\`\`python
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"] = df["date"].dt.day
\`\`\`

날짜형 Series에서 연도, 월, 일을 추출할 때는 \`.dt\` 접근자를 사용합니다.

---

### 문제 5 정답

방법 1: 기간 조건 사용

\`\`\`python
feb_orders = orders[
    orders["order_date"].between("2026-02-01", "2026-02-28")
]
\`\`\`

방법 2: 연도와 월 추출

\`\`\`python
feb_orders = orders[
    (orders["order_date"].dt.year == 2026) &
    (orders["order_date"].dt.month == 2)
]
\`\`\`

---

### 문제 6 정답

\`\`\`python
orders["delivery_days"] = (
    orders["ship_date"] - orders["order_date"]
).dt.days
\`\`\`

날짜끼리 빼면 \`Timedelta\`가 나오고, \`.dt.days\`로 일수만 추출할 수 있습니다.

---

### 문제 7 정답

\`\`\`python
orders["year_month"] = orders["order_date"].dt.to_period("M")

monthly_sales = (
    orders
    .groupby("year_month")["sales"]
    .sum()
    .reset_index()
)

monthly_sales
\`\`\`

연월 컬럼을 만든 뒤 그룹화하여 월별 매출 합계를 계산합니다.

---

### 문제 8 정답

\`\`\`python
df["weekday"] = df["date"].dt.day_name()
\`\`\`

\`day_name()\`은 날짜의 요일 이름을 반환합니다.

---

### 문제 9 정답

\`dt.month\`만 사용하면 여러 연도의 같은 월이 하나로 합쳐질 수 있습니다.

예를 들어 2025년 1월과 2026년 1월이 모두 \`1\`로 표시되므로, 월만 기준으로 그룹화하면 서로 다른 연도의 1월 데이터가 함께 집계됩니다.

따라서 여러 연도에 걸친 데이터를 월별 분석할 때는 \`dt.to_period("M")\`으로 연월을 만들거나, 연도와 월을 함께 사용해야 합니다.

---

### 문제 10 정답

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

orders_valid = orders.dropna(subset=["order_date_dt"]).copy()

orders_valid["year_month"] = orders_valid["order_date_dt"].dt.to_period("M")

monthly_sales = (
    orders_valid
    .groupby("year_month")["sales"]
    .sum()
    .reset_index()
)

base_date = pd.Timestamp("2026-03-31")
start_date = base_date - pd.Timedelta(days=30)

recent_orders = orders_valid[
    (orders_valid["order_date_dt"] >= start_date) &
    (orders_valid["order_date_dt"] <= base_date)
]

monthly_sales, recent_orders
\`\`\`

처리 과정은 다음과 같습니다.

1. \`order_date\`를 날짜형으로 변환합니다.
2. 변환할 수 없는 날짜는 \`NaT\`로 처리합니다.
3. 날짜가 유효한 행만 남깁니다.
4. \`year_month\` 컬럼을 만듭니다.
5. 월별 매출 합계를 계산합니다.
6. 기준일에서 30일 전 날짜를 구합니다.
7. 최근 30일 주문을 필터링합니다.

---

## 13.18 다음 장 예고

이번 장에서는 날짜와 시간 데이터를 처리하는 방법을 배웠습니다.

다음 장에서는 **그룹화와 집계**를 배웁니다.

날짜 데이터에서 월, 요일, 분기 같은 정보를 추출했다면, 이제 이 값을 기준으로 데이터를 묶어 요약할 수 있습니다.

다음 장에서는 다음 내용을 다룹니다.

- 그룹화란 무엇인가
- \`groupby()\` 기본 사용법
- 그룹별 합계, 평균, 개수 계산
- 여러 집계 함수를 한 번에 적용하기
- 피벗 테이블 만들기
- 교차표 만들기
- 지역별 매출, 카테고리별 주문 금액, 월별 주문 수 분석

이번 장에서 만든 \`order_year_month\`, \`weekday\`, \`delivery_days\` 같은 컬럼은 다음 장의 그룹화 분석에서 중요한 기준이 됩니다.

날짜 데이터 처리는 단독으로 끝나는 기술이 아니라, 집계와 시각화로 이어지는 분석의 핵심 준비 단계입니다.

---

## 참고 문서

- pandas 공식 문서: \`pandas.to_datetime\`
- pandas 공식 문서: \`Series.dt\`
- pandas 공식 문서: Time series / date functionality
- pandas 공식 문서: \`DataFrame.resample\`
- pandas 공식 튜토리얼: How to handle time series data with ease
`;export{e as default};