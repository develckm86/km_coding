var e=`# 7장. 누적 지표와 이동평균 분석

## 7.23 정답 예시

아래는 이번 장 과제의 한 가지 정답 예시입니다.

---

### 7.23.1 일별 매출 집계 정답

\`\`\`python
daily_sales = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .groupby("order_date_dt")
    .agg(
        daily_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values("order_date_dt")
)
\`\`\`

---

### 7.23.2 날짜 누락 처리 정답

\`\`\`python
date_range = pd.date_range(
    start=daily_sales["order_date_dt"].min(),
    end=daily_sales["order_date_dt"].max(),
    freq="D"
)

daily_sales = (
    daily_sales
    .set_index("order_date_dt")
    .reindex(date_range)
    .rename_axis("order_date_dt")
    .reset_index()
)

daily_sales[["daily_sales", "order_count", "unique_customers"]] = (
    daily_sales[["daily_sales", "order_count", "unique_customers"]]
    .fillna(0)
)
\`\`\`

---

### 7.23.3 누적 지표 정답

\`\`\`python
daily_sales["cumulative_sales"] = daily_sales["daily_sales"].cumsum()
daily_sales["cumulative_order_count"] = daily_sales["order_count"].cumsum()
\`\`\`

누적 고객 수:

\`\`\`python
first_purchase = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .groupby("customer_id")["order_date_dt"]
    .min()
    .reset_index(name="first_purchase_date")
)

new_customers_by_date = (
    first_purchase
    .groupby("first_purchase_date")
    .agg(new_customers=("customer_id", "nunique"))
    .reset_index()
)

daily_sales = daily_sales.merge(
    new_customers_by_date,
    left_on="order_date_dt",
    right_on="first_purchase_date",
    how="left"
)

daily_sales["new_customers"] = daily_sales["new_customers"].fillna(0)
daily_sales["cumulative_customers"] = daily_sales["new_customers"].cumsum()
\`\`\`

---

### 7.23.4 이동평균 정답

\`\`\`python
daily_sales["sales_3d_ma"] = (
    daily_sales["daily_sales"]
    .rolling(window=3, min_periods=1)
    .mean()
)

daily_sales["sales_7d_ma"] = (
    daily_sales["daily_sales"]
    .rolling(window=7, min_periods=1)
    .mean()
)

daily_sales["order_count_7d_ma"] = (
    daily_sales["order_count"]
    .rolling(window=7, min_periods=1)
    .mean()
)
\`\`\`

---

### 7.23.5 변화량 정답

\`\`\`python
daily_sales["previous_day_sales"] = daily_sales["daily_sales"].shift(1)
daily_sales["daily_sales_diff"] = daily_sales["daily_sales"].diff()

daily_sales["daily_sales_pct_change"] = (
    daily_sales["daily_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)
\`\`\`

---

### 7.23.6 카테고리별 누적 매출 정답

\`\`\`python
daily_category_sales = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .groupby(["order_date_dt", "category"])
    .agg(daily_sales=("net_amount", "sum"))
    .reset_index()
    .sort_values(["category", "order_date_dt"])
)

daily_category_sales["category_cumulative_sales"] = (
    daily_category_sales
    .groupby("category")["daily_sales"]
    .cumsum()
)
\`\`\`

---

### 7.23.7 고객별 누적 구매액 정답

\`\`\`python
customer_orders = orders_mart.sort_values(
    ["customer_id", "order_date_dt", "order_id"]
).copy()

customer_orders["purchase_number"] = (
    customer_orders
    .groupby("customer_id")
    .cumcount() + 1
)

customer_orders["customer_cumulative_purchase"] = (
    customer_orders
    .groupby("customer_id")["net_amount"]
    .cumsum()
)
\`\`\`

---
`;export{e as default};