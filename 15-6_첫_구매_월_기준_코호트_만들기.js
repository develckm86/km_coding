var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.6 첫 구매 월 기준 코호트 만들기

가장 많이 사용하는 방식은 첫 구매 월 기준 코호트입니다.

---

### 15.6.1 고객별 첫 구매일 계산

\`\`\`python
customer_first_order = (
    cohort_base_orders
    .groupby("customer_id")
    .agg(
        first_order_date=("order_date", "min"),
        customer_name=("customer_name", "first"),
        region=("region", "first"),
        signup_date=("signup_date", "first")
    )
    .reset_index()
)

customer_first_order.head()
\`\`\`

---

### 15.6.2 첫 구매 월 계산

\`\`\`python
customer_first_order["cohort_month"] = (
    customer_first_order["first_order_date"]
    .dt.to_period("M")
)

customer_first_order["signup_month"] = (
    customer_first_order["signup_date"]
    .dt.to_period("M")
)

customer_first_order.head()
\`\`\`

---

### 15.6.3 저장하기

\`\`\`python
customer_first_order.to_csv(
    OUTPUT_TABLES / "chapter_15_first_purchase_cohort.csv",
    index=False
)
\`\`\`

고객별 코호트 테이블도 저장합니다.

\`\`\`python
customer_first_order.to_csv(
    DATA_PROCESSED / "chapter_15_customer_cohort_table.csv",
    index=False
)
\`\`\`

---

### 15.6.4 코호트 크기 확인

\`\`\`python
cohort_size = (
    customer_first_order
    .groupby("cohort_month")
    .agg(
        cohort_customers=("customer_id", "nunique")
    )
    .reset_index()
)

cohort_size
\`\`\`

---

### 15.6.5 해석 예시

\`\`\`text
cohort_month는 고객이 처음 구매한 월이다.
cohort_size는 각 월에 처음 구매한 신규 구매 고객 수를 의미한다.
코호트 크기가 너무 작은 월은 리텐션 비율이 크게 흔들릴 수 있으므로 해석에 주의해야 한다.
\`\`\`

---
`;export{e as default};