var e=`# 8장. 시계열 매출 분석

## 8.20 정답 예시

아래는 이번 장 과제의 한 가지 정답 예시입니다.

---

### 8.20.1 날짜 인덱스 설정 정답

\`\`\`python
orders_mart["order_date_dt"] = pd.to_datetime(
    orders_mart["order_date_dt"],
    errors="coerce"
)

orders_ts = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .set_index("order_date_dt")
    .sort_index()
)
\`\`\`

---

### 8.20.2 일별 매출 리포트 정답

\`\`\`python
daily_sales = (
    orders_ts
    .resample("D")
    .agg(
        daily_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

daily_sales[["daily_sales", "order_count", "unique_customers"]] = (
    daily_sales[["daily_sales", "order_count", "unique_customers"]]
    .fillna(0)
)

daily_sales["avg_order_amount"] = np.where(
    daily_sales["order_count"] > 0,
    daily_sales["daily_sales"] / daily_sales["order_count"],
    0
).round(0)
\`\`\`

---

### 8.20.3 주별 매출 리포트 정답

\`\`\`python
weekly_sales = (
    orders_ts
    .resample("W")
    .agg(
        weekly_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

weekly_sales["avg_order_amount"] = np.where(
    weekly_sales["order_count"] > 0,
    weekly_sales["weekly_sales"] / weekly_sales["order_count"],
    0
).round(0)

weekly_sales["weekly_sales_diff"] = weekly_sales["weekly_sales"].diff()

weekly_sales["weekly_sales_pct_change"] = (
    weekly_sales["weekly_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)
\`\`\`

---

### 8.20.4 월별 매출 성장률 정답

\`\`\`python
monthly_sales = (
    orders_ts
    .resample("M")
    .agg(
        monthly_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_sales["year_month"] = (
    monthly_sales["order_date_dt"]
    .dt.to_period("M")
    .astype(str)
)

monthly_sales["avg_order_amount"] = np.where(
    monthly_sales["order_count"] > 0,
    monthly_sales["monthly_sales"] / monthly_sales["order_count"],
    0
).round(0)

monthly_sales["previous_month_sales"] = monthly_sales["monthly_sales"].shift(1)
monthly_sales["monthly_sales_diff"] = monthly_sales["monthly_sales"].diff()

monthly_sales["monthly_sales_growth_rate"] = (
    monthly_sales["monthly_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)
\`\`\`

---

### 8.20.5 요일별 분석 정답

\`\`\`python
orders_mart["weekday_num"] = orders_mart["order_date_dt"].dt.dayofweek
orders_mart["weekday_name"] = orders_mart["order_date_dt"].dt.day_name()

weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_mart["weekday_kr"] = orders_mart["weekday_name"].replace(weekday_map)

weekday_sales = (
    orders_mart
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_sales["avg_order_amount"] = weekday_sales["avg_order_amount"].round(0)
\`\`\`

---

### 8.20.6 이벤트 전후 비교 정답

\`\`\`python
event_date = pd.Timestamp("2026-03-15")

before_start = event_date - pd.Timedelta(days=14)
before_end = event_date - pd.Timedelta(days=1)

after_start = event_date
after_end = event_date + pd.Timedelta(days=13)

event_orders = orders_mart[
    (orders_mart["order_date_dt"] >= before_start) &
    (orders_mart["order_date_dt"] <= after_end)
].copy()

event_orders["event_period"] = np.where(
    event_orders["order_date_dt"] < event_date,
    "이벤트 전",
    "이벤트 후"
)

event_summary = (
    event_orders
    .groupby("event_period")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

event_summary["avg_order_amount"] = event_summary["avg_order_amount"].round(0)
\`\`\`

---

### 8.20.7 월별 카테고리 매출 정답

\`\`\`python
monthly_category_sales = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

monthly_category_sales["monthly_total_sales"] = (
    monthly_category_sales
    .groupby("year_month")["total_sales"]
    .transform("sum")
)

monthly_category_sales["sales_ratio_in_month"] = (
    monthly_category_sales["total_sales"] /
    monthly_category_sales["monthly_total_sales"] * 100
).round(1)
\`\`\`

---

### 8.20.8 카테고리 성장 기여도 정답

\`\`\`python
monthly_category_pivot = pd.pivot_table(
    data=monthly_category_sales,
    index="year_month",
    columns="category",
    values="total_sales",
    aggfunc="sum",
    fill_value=0
)

category_sales_diff = monthly_category_pivot.diff()

category_growth_contribution = (
    category_sales_diff
    .reset_index()
    .melt(
        id_vars="year_month",
        var_name="category",
        value_name="sales_diff"
    )
)
\`\`\`

---
`;export{e as default};