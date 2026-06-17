var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.22 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 15.22.1 첫 구매 월 기준 코호트

\`\`\`python
customer_first_order = (
    cohort_base_orders
    .groupby("customer_id")
    .agg(first_order_date=("order_date", "min"))
    .reset_index()
)

customer_first_order["cohort_month"] = (
    customer_first_order["first_order_date"]
    .dt.to_period("M")
)
\`\`\`

---

### 15.22.2 코호트 인덱스 계산

\`\`\`python
cohort_data = cohort_base_orders.merge(
    customer_first_order[["customer_id", "cohort_month"]],
    on="customer_id",
    how="left"
)

cohort_data["order_month"] = (
    cohort_data["order_date"]
    .dt.to_period("M")
)

cohort_data["cohort_index"] = cohort_data.apply(
    lambda row: calculate_month_diff(row["order_month"], row["cohort_month"]),
    axis=1
)
\`\`\`

---

### 15.22.3 코호트 고객 수 테이블

\`\`\`python
cohort_counts = (
    cohort_data
    .groupby(["cohort_month", "cohort_index"])
    .agg(active_customers=("customer_id", "nunique"))
    .reset_index()
)

cohort_count_table = pd.pivot_table(
    data=cohort_counts,
    index="cohort_month",
    columns="cohort_index",
    values="active_customers",
    aggfunc="sum"
)
\`\`\`

---

### 15.22.4 리텐션 테이블

\`\`\`python
cohort_retention_table = cohort_count_table.divide(
    cohort_count_table[0],
    axis=0
) * 100

cohort_retention_table = cohort_retention_table.round(1)
\`\`\`

---

### 15.22.5 코호트별 매출

\`\`\`python
cohort_sales = (
    cohort_data
    .groupby(["cohort_month", "cohort_index"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        active_customers=("customer_id", "nunique")
    )
    .reset_index()
)
\`\`\`

---
`;export{e as default};