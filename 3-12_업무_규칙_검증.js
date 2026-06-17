var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.12 업무 규칙 검증

데이터 품질 진단에서는 단순 결측치나 중복값뿐 아니라 업무 규칙도 확인해야 합니다.

---

### 3.12.1 주문일과 가입일 순서 검증

주문일은 고객 가입일보다 빠르면 이상합니다.

이를 확인하려면 주문 데이터와 고객 데이터를 결합해야 합니다.

고객 데이터의 중복을 먼저 제거합니다.

\`\`\`python
customers_unique = customers.drop_duplicates(subset=["customer_id"], keep="first")

orders_customers = orders.merge(
    customers_unique[["customer_id", "signup_date_dt"]],
    on="customer_id",
    how="left"
)

orders_customers[["order_id", "customer_id", "order_date_dt", "signup_date_dt"]]
\`\`\`

주문일이 가입일보다 빠른 행을 찾습니다.

\`\`\`python
order_before_signup = orders_customers[
    (orders_customers["order_date_dt"].notna()) &
    (orders_customers["signup_date_dt"].notna()) &
    (orders_customers["order_date_dt"] < orders_customers["signup_date_dt"])
]

order_before_signup
\`\`\`

이번 예제에서는 없을 수 있습니다.  
실무에서는 자주 발생할 수 있는 오류입니다.

---

### 3.12.2 고객 정보 없는 주문 확인

\`\`\`python
orders_without_customer = orders_customers[
    orders_customers["signup_date_dt"].isna()
]

orders_without_customer
\`\`\`

단, \`signup_date_dt\`가 없는 이유는 두 가지일 수 있습니다.

\`\`\`text
고객 ID가 고객 데이터에 없음
고객 데이터에는 있지만 signup_date가 오류라 NaT가 됨
\`\`\`

이 둘은 구분해서 봐야 합니다.

---

### 3.12.3 상품 정보 없는 주문 확인

\`\`\`python
orders_products_check = orders.merge(
    products_unique[["product_id", "category", "unit_price"]],
    on="product_id",
    how="left"
)

orders_without_product = orders_products_check[
    orders_products_check["category"].isna()
]

orders_without_product
\`\`\`

상품 정보가 없는 주문은 카테고리별 매출 분석에 영향을 줍니다.

---
`;export{e as default};