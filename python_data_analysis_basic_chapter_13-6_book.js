var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-6 -->

# 13.6 날짜 기준 필터링

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
`;export{e as default};