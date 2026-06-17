var e=`# 9장. 복잡한 데이터 결합 실습

## 9.7 단순 key 결합과 검증

먼저 고객 데이터와 상품 마스터를 주문 데이터에 붙입니다.

---

### 9.7.1 고객 데이터 결합

\`\`\`python
before_rows = len(orders)

orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer["_merge"].value_counts()
\`\`\`

매칭 실패를 확인합니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

고객 데이터는 모두 매칭될 수 있습니다.

---

### 9.7.2 상품 데이터 결합

검증 후 \`_merge\`를 제거하고 상품 데이터를 결합합니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])

orders_product = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_product["_merge"].value_counts()
\`\`\`

매칭 실패 상품을 확인합니다.

\`\`\`python
orders_product[orders_product["_merge"] == "left_only"]
\`\`\`

\`P999\` 주문이 상품 데이터와 매칭되지 않습니다.

---

### 9.7.3 매칭 실패 key 목록 만들기

\`\`\`python
unmatched_products = (
    orders_product
    .loc[orders_product["_merge"] == "left_only", ["product_id"]]
    .drop_duplicates()
    .assign(issue_type="상품 마스터 매칭 실패")
)

unmatched_products
\`\`\`

고객 매칭 실패도 같은 방식으로 만들 수 있습니다.

\`\`\`python
unmatched_customers = (
    orders_customer
    .merge(customers, on="customer_id", how="left", indicator=True)
    .loc[lambda df: df["_merge"] == "left_only", ["customer_id"]]
    .drop_duplicates()
    .assign(issue_type="고객 마스터 매칭 실패")
)
\`\`\`

이번 데이터에서는 고객 매칭 실패가 없을 수 있습니다.

---

### 9.7.4 결합 후 행 수 검증

\`\`\`python
after_rows = len(orders_product)

before_rows, after_rows
\`\`\`

left join이므로 행 수는 유지되어야 합니다.

---

### 9.7.5 결합 후 금액 계산

기본 상품 단가를 사용해 주문 금액을 계산합니다.

\`\`\`python
orders_product["gross_amount_default"] = (
    orders_product["quantity"] * orders_product["default_unit_price"]
)

orders_product["net_amount_default"] = (
    orders_product["gross_amount_default"] - orders_product["coupon_amount"]
)
\`\`\`

상품 정보가 없는 주문은 금액이 결측치입니다.

\`\`\`python
orders_product[orders_product["net_amount_default"].isna()]
\`\`\`

---

### 9.7.6 검증 요약표 만들기

\`\`\`python
join_validation_summary = pd.DataFrame([
    {
        "join_step": "orders + customers",
        "before_rows": len(orders),
        "after_rows": len(orders_customer),
        "row_diff": len(orders_customer) - len(orders),
        "unmatched_count": 0,
        "validation": "PASS" if len(orders_customer) == len(orders) else "FAIL"
    },
    {
        "join_step": "orders_customer + products",
        "before_rows": len(orders_customer),
        "after_rows": len(orders_product),
        "row_diff": len(orders_product) - len(orders_customer),
        "unmatched_count": int((orders_product["_merge"] == "left_only").sum()),
        "validation": "PASS" if len(orders_product) == len(orders_customer) else "FAIL"
    }
])

join_validation_summary
\`\`\`

저장합니다.

\`\`\`python
join_validation_summary.to_csv(
    OUTPUT_TABLES / "chapter_09_join_validation_summary.csv",
    index=False
)
\`\`\`

---

### 9.7.7 매칭 실패 리포트 저장

\`\`\`python
unmatched_keys_report = pd.DataFrame([
    {
        "source_table": "orders",
        "key_column": "product_id",
        "unmatched_key": key,
        "issue_type": "상품 마스터 매칭 실패",
        "recommended_action": "상품 마스터 보완 또는 해당 주문 분석 제외"
    }
    for key in sorted(set(orders["product_id"]) - set(products["product_id"]))
])

unmatched_keys_report.to_csv(
    OUTPUT_TABLES / "chapter_09_unmatched_keys_report.csv",
    index=False
)

unmatched_keys_report
\`\`\`

---
`;export{e as default};