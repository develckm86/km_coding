var e=`# 10장. 고객별 Feature Table 만들기

## 10.12 고객 Feature Table 결합

이제 지금까지 만든 Feature들을 하나로 합쳐 최종 고객별 Feature Table을 만듭니다.

---

### 10.12.1 기본 구매 요약과 날짜 Feature 결합

\`\`\`python
customer_feature_table = customer_purchase_summary.merge(
    customer_recency_features,
    on="customer_id",
    how="left",
    validate="one_to_one"
)

customer_feature_table.head()
\`\`\`

중복되는 고객 기본 정보가 없도록 컬럼을 확인합니다.

\`\`\`python
customer_feature_table.columns
\`\`\`

---

### 10.12.2 카테고리 Feature 결합

\`\`\`python
customer_feature_table = customer_feature_table.merge(
    customer_category_features,
    on="customer_id",
    how="left",
    validate="one_to_one"
)

customer_feature_table.head()
\`\`\`

---

### 10.12.3 쿠폰 Feature 결합

\`\`\`python
customer_feature_table = customer_feature_table.merge(
    customer_coupon_features,
    on="customer_id",
    how="left",
    validate="one_to_one"
)
\`\`\`

---

### 10.12.4 고객 가치 Segment 결합

\`\`\`python
customer_feature_table = customer_feature_table.merge(
    customer_value_segment[[
        "customer_id",
        "purchase_ratio_to_avg",
        "value_segment",
        "is_high_value_customer"
    ]],
    on="customer_id",
    how="left",
    validate="one_to_one"
)
\`\`\`

---

### 10.12.5 불필요하거나 중복된 컬럼 정리

merge 과정에서 유사한 의미의 컬럼이 중복될 수 있습니다.

컬럼 목록을 확인합니다.

\`\`\`python
list(customer_feature_table.columns)
\`\`\`

필요한 컬럼 순서를 정합니다.

\`\`\`python
feature_columns = [
    "customer_id",
    "customer_name",
    "region",
    "customer_grade",
    "signup_date",
    "total_purchase",
    "order_count",
    "avg_order_amount",
    "median_order_amount",
    "max_order_amount",
    "min_order_amount",
    "total_quantity",
    "avg_quantity_per_order",
    "first_order_date",
    "last_order_date",
    "days_since_first_order",
    "days_since_last_order",
    "active_period_days",
    "signup_to_first_order_days",
    "active_order_months",
    "is_repeat_customer",
    "category_count",
    "product_count",
    "main_category",
    "main_category_sales",
    "book_sales",
    "lifestyle_sales",
    "electronics_sales",
    "electronics_sales_ratio",
    "coupon_order_count",
    "coupon_usage_rate",
    "total_coupon_amount",
    "avg_coupon_amount",
    "is_coupon_user",
    "purchase_ratio_to_avg",
    "value_segment",
    "is_high_value_customer"
]
\`\`\`

없는 컬럼이 있을 수 있으므로 존재하는 컬럼만 선택합니다.

\`\`\`python
feature_columns_existing = [
    col for col in feature_columns
    if col in customer_feature_table.columns
]

customer_feature_table = customer_feature_table[feature_columns_existing].copy()
\`\`\`

---

### 10.12.6 결측치 처리

카테고리별 구매액이나 쿠폰 관련 변수는 결측치가 있으면 0으로 채울 수 있습니다.

\`\`\`python
zero_fill_columns = [
    "book_sales",
    "lifestyle_sales",
    "electronics_sales",
    "electronics_sales_ratio",
    "coupon_order_count",
    "coupon_usage_rate",
    "total_coupon_amount",
    "avg_coupon_amount"
]

for col in zero_fill_columns:
    if col in customer_feature_table.columns:
        customer_feature_table[col] = customer_feature_table[col].fillna(0)
\`\`\`

문자형 변수의 결측치는 \`미상\`으로 처리할 수 있습니다.

\`\`\`python
text_fill_columns = ["main_category", "value_segment"]

for col in text_fill_columns:
    if col in customer_feature_table.columns:
        customer_feature_table[col] = customer_feature_table[col].fillna("미상")
\`\`\`

---

### 10.12.7 최종 Feature Table 확인

\`\`\`python
customer_feature_table.head()
\`\`\`

\`\`\`python
customer_feature_table.shape
\`\`\`

---

### 10.12.8 저장하기

\`\`\`python
customer_feature_table.to_csv(
    DATA_PROCESSED / "chapter_10_customer_feature_table.csv",
    index=False
)
\`\`\`

---
`;export{e as default};