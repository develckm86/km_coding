var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.8 매출 분석

이제 데이터마트를 사용해 핵심 매출 지표를 계산합니다.

---

### 20.8.1 전체 매출 요약

\`\`\`python
sales_summary = pd.DataFrame([
    {
        "metric": "total_sales",
        "value": data_mart["net_amount"].sum()
    },
    {
        "metric": "order_count",
        "value": data_mart["order_id"].nunique()
    },
    {
        "metric": "customer_count",
        "value": data_mart["customer_id"].nunique()
    },
    {
        "metric": "avg_order_amount",
        "value": data_mart["net_amount"].sum() / data_mart["order_id"].nunique()
    }
])

sales_summary
\`\`\`

저장합니다.

\`\`\`python
sales_summary.to_csv(
    OUTPUT_TABLES / "final_project_sales_summary.csv",
    index=False
)
\`\`\`

---

### 20.8.2 월별 매출

\`\`\`python
monthly_sales = (
    data_mart
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values("year_month")
)

monthly_sales["avg_order_amount"] = (
    monthly_sales["total_sales"] / monthly_sales["order_count"]
).round(0)

monthly_sales
\`\`\`

저장합니다.

\`\`\`python
monthly_sales.to_csv(
    OUTPUT_TABLES / "final_project_monthly_sales.csv",
    index=False
)
\`\`\`

---

### 20.8.3 카테고리별 매출

\`\`\`python
category_sales = (
    data_mart
    .groupby("product_category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values("total_sales", ascending=False)
)

category_sales["sales_ratio_percent"] = (
    category_sales["total_sales"] /
    category_sales["total_sales"].sum() * 100
).round(1)

category_sales
\`\`\`

저장합니다.

\`\`\`python
category_sales.to_csv(
    OUTPUT_TABLES / "final_project_category_sales.csv",
    index=False
)
\`\`\`

---
`;export{e as default};