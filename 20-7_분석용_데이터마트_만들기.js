var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.7 분석용 데이터마트 만들기

정제된 주문 데이터에 고객과 상품 정보를 결합합니다.

---

### 20.7.1 주문과 고객 결합

\`\`\`python
orders_customers = orders_clean.merge(
    customers_raw,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customers["_merge"].value_counts()
\`\`\`

---

### 20.7.2 주문·고객 데이터와 상품 결합

\`\`\`python
orders_customers = orders_customers.drop(columns=["_merge"])

data_mart = orders_customers.merge(
    products_raw[["product_id", "product_name", "category", "supplier"]],
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

data_mart["_merge"].value_counts()
\`\`\`

\`orders_clean\`에서 이미 상품 마스터에 없는 상품을 제거했기 때문에 모두 매칭되어야 합니다.

---

### 20.7.3 컬럼 정리

\`\`\`python
data_mart = data_mart.drop(columns=["_merge"])

data_mart = data_mart.rename(columns={
    "category": "product_category",
    "region": "customer_region"
})

data_mart.head()
\`\`\`

---

### 20.7.4 데이터마트 저장

\`\`\`python
data_mart.to_csv(
    DATA_PROCESSED / "final_project_data_mart.csv",
    index=False
)
\`\`\`

---
`;export{e as default};