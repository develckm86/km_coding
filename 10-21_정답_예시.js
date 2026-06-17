var e=`# 10장. 고객별 Feature Table 만들기

## 10.21 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 10.21.1 고객 주문 기준 데이터 정답 예시

\`\`\`python
customer_order_base = orders_base.dropna(
    subset=["customer_id", "order_date", "net_amount"]
).copy()

customer_order_base["order_date"] = pd.to_datetime(
    customer_order_base["order_date"],
    errors="coerce"
)

customer_order_base = customer_order_base.dropna(subset=["order_date"])

customer_order_base["year_month"] = (
    customer_order_base["order_date"]
    .dt.to_period("M")
    .astype(str)
)

customer_order_base["used_coupon"] = (
    customer_order_base["coupon_amount"].fillna(0) > 0
)

customer_order_base["is_high_amount_order"] = (
    customer_order_base["net_amount"] >= 200000
)
\`\`\`

---

### 10.21.2 구매 요약 Feature 정답 예시

\`\`\`python
customer_purchase_summary = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        customer_name=("customer_name", "first"),
        region=("region", "first"),
        customer_grade=("customer_grade", "last"),
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean"),
        median_order_amount=("net_amount", "median"),
        max_order_amount=("net_amount", "max"),
        min_order_amount=("net_amount", "min"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
)

customer_purchase_summary["is_repeat_customer"] = (
    customer_purchase_summary["order_count"] >= 2
)
\`\`\`

---

### 10.21.3 날짜 기반 Feature 정답 예시

\`\`\`python
customer_recency_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        first_order_date=("order_date", "min"),
        last_order_date=("order_date", "max"),
        active_order_months=("year_month", "nunique")
    )
    .reset_index()
)

base_date = pd.Timestamp("2026-04-30")

customer_recency_features["days_since_last_order"] = (
    base_date - customer_recency_features["last_order_date"]
).dt.days

customer_recency_features["active_period_days"] = (
    customer_recency_features["last_order_date"] -
    customer_recency_features["first_order_date"]
).dt.days
\`\`\`

---

### 10.21.4 카테고리 Feature 정답 예시

\`\`\`python
customer_category_sales = (
    customer_order_base
    .groupby(["customer_id", "category"])
    .agg(category_sales=("net_amount", "sum"))
    .reset_index()
)

customer_category_sales["category_rank"] = (
    customer_category_sales
    .groupby("customer_id")["category_sales"]
    .rank(ascending=False, method="dense")
)

main_category = (
    customer_category_sales
    .query("category_rank == 1")
    .sort_values(["customer_id", "category"])
    .drop_duplicates(subset=["customer_id"], keep="first")
    [["customer_id", "category"]]
    .rename(columns={"category": "main_category"})
)
\`\`\`

---

### 10.21.5 쿠폰 Feature 정답 예시

\`\`\`python
customer_coupon_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        coupon_order_count=("used_coupon", "sum"),
        total_order_count=("order_id", "count"),
        total_coupon_amount=("coupon_amount", "sum"),
        avg_coupon_amount=("coupon_amount", "mean")
    )
    .reset_index()
)

customer_coupon_features["coupon_usage_rate"] = (
    customer_coupon_features["coupon_order_count"] /
    customer_coupon_features["total_order_count"] * 100
).round(1)

customer_coupon_features["is_coupon_user"] = (
    customer_coupon_features["coupon_order_count"] > 0
)
\`\`\`

---

### 10.21.6 최종 Feature Table 정답 예시

\`\`\`python
customer_feature_table = (
    customer_purchase_summary
    .merge(customer_recency_features, on="customer_id", how="left", validate="one_to_one")
    .merge(customer_category_features, on="customer_id", how="left", validate="one_to_one")
    .merge(customer_coupon_features, on="customer_id", how="left", validate="one_to_one")
    .merge(
        customer_value_segment[["customer_id", "purchase_ratio_to_avg", "value_segment", "is_high_value_customer"]],
        on="customer_id",
        how="left",
        validate="one_to_one"
    )
)
\`\`\`

---
`;export{e as default};