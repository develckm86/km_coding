var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-8 -->

# 13.8 날짜 기준 집계

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
`;export{e as default};