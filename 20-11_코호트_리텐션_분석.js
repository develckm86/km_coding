var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.11 코호트 리텐션 분석

15장에서 배운 방식으로 첫 구매 월 기준 코호트 리텐션을 분석합니다.

---

### 20.11.1 코호트 데이터 만들기

\`\`\`python
cohort_base = data_mart[[
    "order_id",
    "customer_id",
    "order_date",
    "net_amount"
]].copy()

cohort_base["order_month"] = cohort_base["order_date"].dt.to_period("M")

first_purchase = (
    cohort_base
    .groupby("customer_id")
    .agg(first_order_date=("order_date", "min"))
    .reset_index()
)

first_purchase["cohort_month"] = (
    first_purchase["first_order_date"]
    .dt.to_period("M")
)

cohort_data = cohort_base.merge(
    first_purchase[["customer_id", "cohort_month"]],
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

---

### 20.11.2 코호트 인덱스 계산

\`\`\`python
def calculate_month_diff(order_month, cohort_month):
    return (order_month.year - cohort_month.year) * 12 + (order_month.month - cohort_month.month)

cohort_data["cohort_index"] = cohort_data.apply(
    lambda row: calculate_month_diff(row["order_month"], row["cohort_month"]),
    axis=1
)

cohort_data.head()
\`\`\`

저장합니다.

\`\`\`python
cohort_data.to_csv(
    DATA_PROCESSED / "final_project_cohort_data.csv",
    index=False
)
\`\`\`

---

### 20.11.3 리텐션 테이블 만들기

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

cohort_retention = cohort_count_table.divide(
    cohort_count_table[0],
    axis=0
) * 100

cohort_retention = cohort_retention.round(1)

cohort_retention
\`\`\`

저장합니다.

\`\`\`python
cohort_retention.reset_index().to_csv(
    OUTPUT_TABLES / "final_project_cohort_retention.csv",
    index=False
)
\`\`\`

---
`;export{e as default};