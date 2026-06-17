var e=`# 4장. 분석용 데이터마트 만들기

## 4.15 주문 데이터와 상품 데이터 결합

이제 상품 정보를 붙입니다.

---

### 4.15.1 결합 전 행 수 저장

\`\`\`python
before_product_merge_rows = len(orders_customer)

before_product_merge_rows
\`\`\`

---

### 4.15.2 상품 정보 결합

\`\`\`python
orders_full = orders_customer.merge(
    products_clean,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)
\`\`\`

매칭 상태를 확인합니다.

\`\`\`python
orders_full["_merge"].value_counts()
\`\`\`

상품 정보가 없는 주문을 확인합니다.

\`\`\`python
orders_full[orders_full["_merge"] == "left_only"]
\`\`\`

---

### 4.15.3 결합 후 행 수 확인

\`\`\`python
after_product_merge_rows = len(orders_full)

before_product_merge_rows, after_product_merge_rows
\`\`\`

행 수가 유지되어야 합니다.

---

### 4.15.4 상품 매칭 실패 플래그 만들기

상품 정보가 없는 주문을 표시합니다.

\`\`\`python
orders_full["missing_product_info"] = orders_full["_merge"] == "left_only"
\`\`\`

검증 후 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_full = orders_full.drop(columns=["_merge"])
\`\`\`

---
`;export{e as default};