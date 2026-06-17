var e=`# 4장. 분석용 데이터마트 만들기

## 4.14 주문 데이터와 고객 데이터 결합

이제 주문 데이터에 고객 정보를 붙입니다.

---

### 4.14.1 결합 전 행 수 저장

\`\`\`python
before_customer_merge_rows = len(orders)

before_customer_merge_rows
\`\`\`

---

### 4.14.2 고객 정보 결합

\`\`\`python
orders_customer = orders.merge(
    customers_clean,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)
\`\`\`

매칭 상태를 확인합니다.

\`\`\`python
orders_customer["_merge"].value_counts()
\`\`\`

고객 정보가 없는 주문을 확인합니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

---

### 4.14.3 결합 후 행 수 확인

\`\`\`python
after_customer_merge_rows = len(orders_customer)

before_customer_merge_rows, after_customer_merge_rows
\`\`\`

\`left join\`을 사용했으므로 행 수가 유지되어야 합니다.

---

### 4.14.4 고객 정보 결측치 처리

검증 후 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

고객 정보가 없는 주문은 \`미상\`으로 처리합니다.

\`\`\`python
orders_customer["customer_name"] = orders_customer["customer_name"].fillna("고객정보없음")
orders_customer["region"] = orders_customer["region"].fillna("미상")
orders_customer["grade"] = orders_customer["grade"].fillna("미상")
\`\`\`

---
`;export{e as default};