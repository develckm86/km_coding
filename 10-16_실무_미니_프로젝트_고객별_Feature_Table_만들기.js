var e=`# 10장. 고객별 Feature Table 만들기

## 10.16 실무 미니 프로젝트: 고객별 Feature Table 만들기

이번 장에서 배운 내용을 하나의 프로젝트 흐름으로 정리합니다.

---

### 10.16.1 프로젝트 목표

\`\`\`text
주문 단위 데이터를 고객 단위로 요약해 고객 분석용 Feature Table을 만든다.
Feature Table에는 구매 금액, 구매 빈도, 날짜 기반 변수, 카테고리 변수, 쿠폰 변수, 고객 가치 세그먼트를 포함한다.
\`\`\`

---

### 10.16.2 Step 1. 주문 기준 데이터 준비

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
\`\`\`

---

### 10.16.3 Step 2. 구매 요약 Feature 생성

\`\`\`python
purchase_features = (
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
        total_quantity=("quantity", "sum")
    )
    .reset_index()
)
\`\`\`

---

### 10.16.4 Step 3. 날짜 기반 Feature 생성

\`\`\`python
date_features = (
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

date_features["days_since_last_order"] = (
    base_date - date_features["last_order_date"]
).dt.days

date_features["active_period_days"] = (
    date_features["last_order_date"] -
    date_features["first_order_date"]
).dt.days
\`\`\`

---

### 10.16.5 Step 4. 카테고리 Feature 생성

\`\`\`python
category_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        category_count=("category", "nunique"),
        product_count=("product_name", "nunique")
    )
    .reset_index()
)

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

category_features = category_features.merge(
    main_category,
    on="customer_id",
    how="left"
)
\`\`\`

---

### 10.16.6 Step 5. 쿠폰 Feature 생성

\`\`\`python
coupon_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        coupon_order_count=("used_coupon", "sum"),
        total_order_count=("order_id", "count"),
        total_coupon_amount=("coupon_amount", "sum")
    )
    .reset_index()
)

coupon_features["coupon_usage_rate"] = (
    coupon_features["coupon_order_count"] /
    coupon_features["total_order_count"] * 100
).round(1)

coupon_features["is_coupon_user"] = coupon_features["coupon_order_count"] > 0
\`\`\`

---

### 10.16.7 Step 6. Feature 결합

\`\`\`python
customer_features = (
    purchase_features
    .merge(date_features, on="customer_id", how="left", validate="one_to_one")
    .merge(category_features, on="customer_id", how="left", validate="one_to_one")
    .merge(coupon_features, on="customer_id", how="left", validate="one_to_one")
)

customer_features["is_repeat_customer"] = customer_features["order_count"] >= 2
\`\`\`

---

### 10.16.8 Step 7. 가치 세그먼트 생성

\`\`\`python
q_low = customer_features["total_purchase"].quantile(0.33)
q_high = customer_features["total_purchase"].quantile(0.67)

def assign_segment(value):
    if value >= q_high:
        return "High Value"
    elif value >= q_low:
        return "Middle Value"
    else:
        return "Low Value"

customer_features["value_segment"] = customer_features["total_purchase"].apply(assign_segment)
\`\`\`

---

### 10.16.9 Step 8. 저장

\`\`\`python
customer_features.to_csv(
    DATA_PROCESSED / "chapter_10_customer_feature_table.csv",
    index=False
)
\`\`\`

---
`;export{e as default};