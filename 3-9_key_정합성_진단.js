var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.9 key 정합성 진단

여러 데이터를 결합하려면 key가 맞아야 합니다.

주문 데이터에는 \`customer_id\`와 \`product_id\`가 있습니다.  
이 값들이 각각 고객 데이터와 상품 데이터에 존재해야 합니다.

---

### 3.9.1 주문 데이터의 고객 ID 매칭 확인

주문 데이터에는 있지만 고객 데이터에는 없는 고객 ID를 찾습니다.

\`\`\`python
order_customer_ids = set(orders["customer_id"].dropna())
master_customer_ids = set(customers["customer_id"].dropna())

missing_customer_ids = order_customer_ids - master_customer_ids

missing_customer_ids
\`\`\`

\`customer_id\` 11은 고객 데이터에 없을 수 있습니다.

해당 주문을 확인합니다.

\`\`\`python
orders[orders["customer_id"].isin(missing_customer_ids)]
\`\`\`

---

### 3.9.2 주문 데이터의 상품 ID 매칭 확인

\`\`\`python
order_product_ids = set(orders["product_id"].dropna())
master_product_ids = set(products["product_id"].dropna())

missing_product_ids = order_product_ids - master_product_ids

missing_product_ids
\`\`\`

해당 주문을 확인합니다.

\`\`\`python
orders[orders["product_id"].isin(missing_product_ids)]
\`\`\`

\`P999\`는 상품 데이터에 없는 상품 ID입니다.

---

### 3.9.3 key 매칭 요약표 만들기

\`\`\`python
key_matching_summary = pd.DataFrame([
    {
        "source_table": "orders",
        "source_key": "customer_id",
        "master_table": "customers",
        "master_key": "customer_id",
        "source_unique_key_count": orders["customer_id"].nunique(),
        "master_unique_key_count": customers["customer_id"].nunique(),
        "unmatched_key_count": len(missing_customer_ids),
        "unmatched_keys": ", ".join(map(str, sorted(missing_customer_ids)))
    },
    {
        "source_table": "orders",
        "source_key": "product_id",
        "master_table": "products",
        "master_key": "product_id",
        "source_unique_key_count": orders["product_id"].nunique(),
        "master_unique_key_count": products["product_id"].nunique(),
        "unmatched_key_count": len(missing_product_ids),
        "unmatched_keys": ", ".join(sorted(missing_product_ids))
    }
])

key_matching_summary
\`\`\`

---

### 3.9.4 key 매칭 요약표 저장하기

\`\`\`python
key_matching_summary.to_csv(
    OUTPUT_TABLES / "chapter_03_key_matching_summary.csv",
    index=False
)
\`\`\`

---

### 3.9.5 key 매칭 실패 해석하기

해석 예시:

\`\`\`text
orders.customer_id 중 고객 마스터에 존재하지 않는 값이 발견되었다.
해당 주문은 고객 등급별 분석이나 지역별 분석에서 고객 정보가 결측치로 남을 수 있다.

orders.product_id 중 상품 마스터에 존재하지 않는 값이 발견되었다.
해당 주문은 상품명, 카테고리, 단가를 확인할 수 없으므로 카테고리별 매출 분석에서 제외되거나 별도 검토가 필요하다.
\`\`\`

key 매칭 실패는 데이터 결합 전에 반드시 확인해야 합니다.

---
`;export{e as default};