var e=`# 4장. 분석용 데이터마트 만들기

## 4.8 중복값 처리

중복값은 데이터 결합과 집계에 큰 영향을 줍니다.

---

### 4.8.1 주문 ID 중복 처리

주문 데이터에서 \`order_id\` 중복을 확인합니다.

\`\`\`python
orders[orders.duplicated(subset=["order_id"], keep=False)]
\`\`\`

이번 실습에서는 중복 주문 ID가 있을 경우 첫 번째 행만 유지합니다.

\`\`\`python
orders = orders.drop_duplicates(
    subset=["order_id"],
    keep="first",
    ignore_index=True
)
\`\`\`

처리 후 확인합니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

---

### 4.8.2 고객 ID 중복 처리

고객 데이터에서 \`customer_id\` 중복을 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

이번 실습에서는 첫 번째 행만 유지합니다.

\`\`\`python
customers = customers.drop_duplicates(
    subset=["customer_id"],
    keep="first",
    ignore_index=True
)
\`\`\`

실무에서는 최신 수정일이나 상태값을 기준으로 남길 행을 정하는 것이 더 좋습니다.  
하지만 이번 실습 데이터에는 수정일이 없으므로 첫 번째 행을 유지합니다.

---

### 4.8.3 상품 ID 중복 처리

상품 데이터에서 \`product_id\` 중복을 확인합니다.

\`\`\`python
products[products.duplicated(subset=["product_id"], keep=False)]
\`\`\`

첫 번째 행만 유지합니다.

\`\`\`python
products = products.drop_duplicates(
    subset=["product_id"],
    keep="first",
    ignore_index=True
)
\`\`\`

처리 후 key 유일성을 확인합니다.

\`\`\`python
products["product_id"].is_unique
\`\`\`

---

### 4.8.4 중복 처리 요약

\`\`\`python
duplicate_processing_summary = pd.DataFrame([
    {
        "table_name": "orders",
        "key": "order_id",
        "before_rows": len(orders_raw),
        "after_rows": len(orders),
        "removed_rows": len(orders_raw) - len(orders)
    },
    {
        "table_name": "customers",
        "key": "customer_id",
        "before_rows": len(customers_raw),
        "after_rows": len(customers),
        "removed_rows": len(customers_raw) - len(customers)
    },
    {
        "table_name": "products",
        "key": "product_id",
        "before_rows": len(products_raw),
        "after_rows": len(products),
        "removed_rows": len(products_raw) - len(products)
    }
])

duplicate_processing_summary
\`\`\`

---
`;export{e as default};