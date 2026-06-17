var e=`# 4장. 분석용 데이터마트 만들기

## 4.18 최종 데이터마트 컬럼 정리

데이터마트에는 분석에 필요한 컬럼만 정리해서 저장합니다.

---

### 4.18.1 컬럼 순서 정하기

\`\`\`python
mart_columns = [
    "order_id",
    "order_date",
    "order_date_dt",
    "year_month",
    "weekday",
    "customer_id",
    "customer_name",
    "region",
    "grade",
    "signup_date",
    "visit_count",
    "product_id",
    "product_name",
    "category",
    "supplier",
    "quantity",
    "unit_price",
    "coupon_amount",
    "used_coupon",
    "gross_amount",
    "net_amount",
    "price_level"
]
\`\`\`

---

### 4.18.2 최종 데이터마트 만들기

\`\`\`python
orders_mart = orders_mart[mart_columns].copy()

orders_mart.head()
\`\`\`

---

### 4.18.3 데이터마트 저장하기

\`\`\`python
orders_mart.to_csv(
    DATA_PROCESSED / "chapter_04_orders_mart.csv",
    index=False
)
\`\`\`

이 파일은 이후 장에서 분석용 데이터로 사용할 수 있습니다.

---
`;export{e as default};