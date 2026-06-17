var e=`# 7장. 누적 지표와 이동평균 분석

## 7.7 누적 매출과 누적 주문 수 계산

이제 일별 매출을 기준으로 누적 지표를 계산합니다.

---

### 7.7.1 누적 매출 계산

\`\`\`python
daily_sales["cumulative_sales"] = daily_sales["daily_sales"].cumsum()

daily_sales[["order_date_dt", "daily_sales", "cumulative_sales"]].head()
\`\`\`

\`cumulative_sales\`는 해당 날짜까지 누적된 매출입니다.

---

### 7.7.2 누적 주문 수 계산

\`\`\`python
daily_sales["cumulative_order_count"] = daily_sales["order_count"].cumsum()

daily_sales[["order_date_dt", "order_count", "cumulative_order_count"]].head()
\`\`\`

---

### 7.7.3 누적 구매 고객 수 계산

일별 고유 고객 수를 단순 누적하면 같은 고객이 여러 날 구매했을 때 중복 계산됩니다.

예를 들어 고객 1이 1월 1일과 1월 3일에 구매하면 일별 고유 고객 수 누적에서는 두 번 계산될 수 있습니다.

정확한 누적 고객 수를 계산하려면 고객별 첫 구매일을 기준으로 해야 합니다.

먼저 고객별 첫 구매일을 구합니다.

\`\`\`python
first_purchase = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .groupby("customer_id")["order_date_dt"]
    .min()
    .reset_index(name="first_purchase_date")
)

first_purchase
\`\`\`

첫 구매일별 신규 구매 고객 수를 계산합니다.

\`\`\`python
new_customers_by_date = (
    first_purchase
    .groupby("first_purchase_date")
    .agg(
        new_customers=("customer_id", "nunique")
    )
    .reset_index()
)

new_customers_by_date
\`\`\`

일별 매출 데이터에 붙입니다.

\`\`\`python
daily_sales = daily_sales.merge(
    new_customers_by_date,
    left_on="order_date_dt",
    right_on="first_purchase_date",
    how="left"
)

daily_sales["new_customers"] = daily_sales["new_customers"].fillna(0).astype(int)
daily_sales = daily_sales.drop(columns=["first_purchase_date"])
\`\`\`

누적 고객 수를 계산합니다.

\`\`\`python
daily_sales["cumulative_customers"] = daily_sales["new_customers"].cumsum()

daily_sales[[
    "order_date_dt",
    "new_customers",
    "cumulative_customers"
]].head()
\`\`\`

---

### 7.7.4 누적 지표 확인

\`\`\`python
daily_sales[[
    "order_date_dt",
    "daily_sales",
    "cumulative_sales",
    "order_count",
    "cumulative_order_count",
    "new_customers",
    "cumulative_customers"
]]
\`\`\`

---

### 7.7.5 해석 예시

\`\`\`text
누적 매출은 분석 시작일부터 현재 날짜까지 매출이 얼마나 쌓였는지 보여준다.
누적 주문 수는 전체 주문 규모의 증가 속도를 보여준다.
누적 고객 수는 신규 구매 고객이 시간에 따라 얼마나 늘어났는지 보여준다.
단순 일별 고유 고객 수 누적은 중복 고객을 여러 번 계산할 수 있으므로, 누적 고객 수는 고객별 첫 구매일을 기준으로 계산하는 것이 좋다.
\`\`\`

---
`;export{e as default};