var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-5 -->

# 13.5 날짜 정보 추출하기

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
`;export{e as default};