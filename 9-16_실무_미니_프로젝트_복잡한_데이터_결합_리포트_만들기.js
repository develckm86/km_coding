var e=`# 9장. 복잡한 데이터 결합 실습

## 9.16 실무 미니 프로젝트: 복잡한 데이터 결합 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 결합 리포트를 작성합니다.

---

### 9.16.1 프로젝트 목표

\`\`\`text
주문 데이터에 고객 마스터, 상품 마스터, 지점별 가격, 상품 가격 이력, 고객 등급 이력, 광고비 데이터를 결합하고,
결합 결과를 검증한 뒤 분석 가능한 데이터셋을 생성한다.
\`\`\`

---

### 9.16.2 Step 1. key 점검

\`\`\`python
join_key_check = pd.DataFrame([
    check_key_uniqueness(orders, "orders", ["order_id"]),
    check_key_uniqueness(customers, "customers", ["customer_id"]),
    check_key_uniqueness(products, "products", ["product_id"]),
    check_key_uniqueness(store_product_prices, "store_product_prices", ["store_id", "product_id"]),
    check_key_uniqueness(price_history, "price_history", ["product_id", "effective_date"]),
    check_key_uniqueness(grade_history, "grade_history", ["customer_id", "effective_date"]),
    check_key_uniqueness(ad_spend, "ad_spend", ["year_month", "campaign_id"])
])
\`\`\`

---

### 9.16.3 Step 2. 고객·상품 마스터 결합

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

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

### 9.16.4 Step 3. 다중 key 결합

\`\`\`python
orders_store_price = orders.merge(
    store_product_prices,
    on=["store_id", "product_id"],
    how="left",
    validate="many_to_one",
    indicator=True
)
\`\`\`

---

### 9.16.5 Step 4. 가격 이력 결합

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
\`\`\`

---

### 9.16.6 Step 5. 고객 등급 이력 결합

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

### 9.16.7 Step 6. 광고비 데이터 결합

\`\`\`python
orders_with_price_history["year_month"] = (
    orders_with_price_history["order_date"]
    .dt.to_period("M")
    .astype(str)
)

orders_with_price_history["net_amount_history"] = (
    orders_with_price_history["quantity"] *
    orders_with_price_history["unit_price"] -
    orders_with_price_history["coupon_amount"]
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
    sales_ad_joined["total_sales"] / sales_ad_joined["ad_spend"]
).round(2)
\`\`\`

---

### 9.16.8 Step 7. 결합 검증 보고서 작성

\`\`\`text
결합 검증 항목

1. 고객 마스터 결합 후 행 수가 유지되었는가?
2. 상품 마스터 결합 후 행 수가 유지되었는가?
3. 상품 마스터에 없는 product_id는 무엇인가?
4. 지점별 가격 결합에서 매칭 실패가 있는가?
5. 가격 이력 결합에서 가격이 붙지 않은 주문이 있는가?
6. 고객 등급 이력 결합에서 등급이 붙지 않은 주문이 있는가?
7. 광고비 결합에서 매칭 실패가 있는가?
\`\`\`

---
`;export{e as default};