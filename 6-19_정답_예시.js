var e=`# 6장. 고급 groupby 분석 리포트

## 6.19 정답 예시

아래는 이번 장 과제의 한 가지 정답 예시입니다.

---

### 6.19.1 카테고리 요약 정답 예시

\`\`\`python
category_summary = (
    orders_mart
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        avg_order_amount=("net_amount", "mean"),
        median_order_amount=("net_amount", "median"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_summary["sales_ratio_percent"] = (
    category_summary["total_sales"] / category_summary["total_sales"].sum() * 100
).round(1)
\`\`\`

---

### 6.19.2 고객 요약 정답 예시

\`\`\`python
customer_summary = (
    orders_mart
    .groupby(["customer_id", "customer_name", "grade", "region"])
    .agg(
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean"),
        first_order_date=("order_date_dt", "min"),
        last_order_date=("order_date_dt", "max"),
        category_count=("category", "nunique")
    )
    .reset_index()
)

base_date = pd.Timestamp("2026-04-30")

customer_summary["days_since_last_order"] = (
    base_date - customer_summary["last_order_date"]
).dt.days

customer_summary["is_repeat_customer"] = customer_summary["order_count"] >= 2
\`\`\`

---

### 6.19.3 카테고리 내 상품 순위 정답 예시

\`\`\`python
product_summary = (
    orders_mart
    .groupby(["category", "product_id", "product_name"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

product_summary["sales_rank_in_category"] = (
    product_summary
    .groupby("category")["total_sales"]
    .rank(ascending=False, method="dense")
    .astype(int)
)

product_summary["category_total_sales"] = (
    product_summary
    .groupby("category")["total_sales"]
    .transform("sum")
)

product_summary["sales_ratio_in_category"] = (
    product_summary["total_sales"] /
    product_summary["category_total_sales"] * 100
).round(1)
\`\`\`

---

### 6.19.4 그룹 필터링 정답 예시

\`\`\`python
high_value_customer_orders = (
    orders_mart
    .groupby("customer_id")
    .filter(lambda group: group["net_amount"].sum() >= 100000)
)

group_filter_result = (
    high_value_customer_orders
    .groupby(["customer_id", "customer_name"])
    .agg(
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)
\`\`\`

---

### 6.19.5 구매 차수 정답 예시

\`\`\`python
orders_sorted = orders_mart.sort_values(
    ["customer_id", "order_date_dt", "order_id"]
).copy()

orders_sorted["purchase_number"] = (
    orders_sorted
    .groupby("customer_id")
    .cumcount() + 1
)
\`\`\`

---
`;export{e as default};