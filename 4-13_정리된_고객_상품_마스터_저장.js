var e=`# 4장. 분석용 데이터마트 만들기

## 4.13 정리된 고객·상품 마스터 저장

주문 데이터와 결합하기 전에 정리된 고객과 상품 데이터를 저장합니다.

---

### 4.13.1 고객 마스터 정리 컬럼 선택

\`\`\`python
customers_clean = customers[[
    "customer_id",
    "customer_name",
    "region_clean",
    "grade",
    "signup_date_dt",
    "visit_count"
]].copy()

customers_clean
\`\`\`

컬럼명을 분석용으로 더 명확히 바꿀 수 있습니다.

\`\`\`python
customers_clean = customers_clean.rename(columns={
    "region_clean": "region",
    "signup_date_dt": "signup_date"
})
\`\`\`

저장합니다.

\`\`\`python
customers_clean.to_csv(
    DATA_PROCESSED / "chapter_04_customers_clean.csv",
    index=False
)
\`\`\`

---

### 4.13.2 상품 마스터 정리 컬럼 선택

\`\`\`python
products_clean = products[[
    "product_id",
    "product_name",
    "category",
    "unit_price",
    "supplier"
]].copy()

products_clean
\`\`\`

저장합니다.

\`\`\`python
products_clean.to_csv(
    DATA_PROCESSED / "chapter_04_products_clean.csv",
    index=False
)
\`\`\`

---
`;export{e as default};