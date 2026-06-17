var e=`# 9장. 복잡한 데이터 결합 실습

## 9.20 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 9.20.1 고객·상품 마스터 결합 정답 예시

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer["_merge"].value_counts()

orders_customer = orders_customer.drop(columns=["_merge"])

orders_product = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)
\`\`\`

---

### 9.20.2 다중 key 결합 정답 예시

\`\`\`python
orders_store_price = orders.merge(
    store_product_prices,
    on=["store_id", "product_id"],
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_store_price["net_amount_store"] = (
    orders_store_price["quantity"] *
    orders_store_price["store_unit_price"] -
    orders_store_price["coupon_amount"]
)
\`\`\`

---

### 9.20.3 가격 이력 결합 정답 예시

\`\`\`python
orders_for_price = orders.sort_values("order_date").copy()
price_history_sorted = price_history.sort_values("effective_date").copy()

orders_with_price_history = pd.merge_asof(
    orders_for_price,
    price_history_sorted,
    by="product_id",
    left_on="order_date",
    right_on="effective_date",
    direction="backward"
)

orders_with_price_history["net_amount_history"] = (
    orders_with_price_history["quantity"] *
    orders_with_price_history["unit_price"] -
    orders_with_price_history["coupon_amount"]
)
\`\`\`

---

### 9.20.4 고객 등급 이력 결합 정답 예시

\`\`\`python
orders_for_grade = orders.sort_values("order_date").copy()
grade_history_sorted = grade_history.sort_values("effective_date").copy()

orders_with_grade_history = pd.merge_asof(
    orders_for_grade,
    grade_history_sorted,
    by="customer_id",
    left_on="order_date",
    right_on="effective_date",
    direction="backward"
)
\`\`\`

---

### 9.20.5 광고비 결합 정답 예시

\`\`\`python
orders_with_price_history["year_month"] = (
    orders_with_price_history["order_date"]
    .dt.to_period("M")
    .astype(str)
)

campaign_monthly_sales = (
    orders_with_price_history
    .dropna(subset=["net_amount_history"])
    .groupby(["year_month", "campaign_id"])
    .agg(
        total_sales=("net_amount_history", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

sales_ad_joined = campaign_monthly_sales.merge(
    ad_spend,
    on=["year_month", "campaign_id"],
    how="left",
    validate="one_to_one",
    indicator=True
)

sales_ad_joined["roas"] = (
    sales_ad_joined["total_sales"] /
    sales_ad_joined["ad_spend"]
).round(2)
\`\`\`

---
`;export{e as default};