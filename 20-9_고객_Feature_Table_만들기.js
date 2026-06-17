var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.9 고객 Feature Table 만들기

10장에서 배운 방식으로 고객별 Feature Table을 만듭니다.

---

### 20.9.1 고객별 구매 요약

\`\`\`python
customer_features = (
    data_mart
    .groupby("customer_id")
    .agg(
        customer_name=("customer_name", "first"),
        region=("customer_region", "first"),
        grade=("grade", "first"),
        signup_date=("signup_date", "first"),
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        avg_order_amount=("net_amount", "mean"),
        first_order_date=("order_date", "min"),
        last_order_date=("order_date", "max"),
        category_count=("product_category", "nunique")
    )
    .reset_index()
)

customer_features["avg_order_amount"] = (
    customer_features["avg_order_amount"].round(0)
)

customer_features.head()
\`\`\`

---

### 20.9.2 최근 구매 후 경과일

\`\`\`python
customer_features["days_since_last_order"] = (
    BASE_DATE - customer_features["last_order_date"]
).dt.days
\`\`\`

---

### 20.9.3 재구매 여부와 고객 가치 세그먼트

\`\`\`python
customer_features["is_repeat_customer"] = customer_features["order_count"] >= 2

q_low = customer_features["total_purchase"].quantile(0.33)
q_high = customer_features["total_purchase"].quantile(0.67)

def assign_value_segment(value):
    if value >= q_high:
        return "High Value"
    elif value >= q_low:
        return "Middle Value"
    else:
        return "Low Value"

customer_features["value_segment"] = (
    customer_features["total_purchase"]
    .apply(assign_value_segment)
)

customer_features.head()
\`\`\`

저장합니다.

\`\`\`python
customer_features.to_csv(
    DATA_PROCESSED / "final_project_customer_features.csv",
    index=False
)

customer_features.to_csv(
    OUTPUT_TABLES / "final_project_customer_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};