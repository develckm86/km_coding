var e=`# 10장. 고객별 Feature Table 만들기

## 10.7 고객별 구매 요약 Feature 만들기

가장 기본적인 고객 Feature는 구매 금액과 구매 횟수입니다.

---

### 10.7.1 고객별 구매 요약

\`\`\`python
customer_purchase_summary = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        customer_name=("customer_name", "first"),
        region=("region", "first"),
        customer_grade=("customer_grade", "last"),
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean"),
        median_order_amount=("net_amount", "median"),
        max_order_amount=("net_amount", "max"),
        min_order_amount=("net_amount", "min"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
)

customer_purchase_summary.head()
\`\`\`

---

### 10.7.2 평균값 반올림

\`\`\`python
customer_purchase_summary["avg_order_amount"] = (
    customer_purchase_summary["avg_order_amount"].round(0)
)

customer_purchase_summary["median_order_amount"] = (
    customer_purchase_summary["median_order_amount"].round(0)
)
\`\`\`

---

### 10.7.3 재구매 여부 추가

\`\`\`python
customer_purchase_summary["is_repeat_customer"] = (
    customer_purchase_summary["order_count"] >= 2
)
\`\`\`

---

### 10.7.4 고객당 평균 구매 수량

\`\`\`python
customer_purchase_summary["avg_quantity_per_order"] = (
    customer_purchase_summary["total_quantity"] /
    customer_purchase_summary["order_count"]
).round(2)
\`\`\`

---

### 10.7.5 저장하기

\`\`\`python
customer_purchase_summary.to_csv(
    OUTPUT_TABLES / "chapter_10_customer_purchase_summary.csv",
    index=False
)
\`\`\`

---

### 10.7.6 해석 예시

\`\`\`text
고객별 구매 요약 Feature는 고객의 구매 규모와 빈도를 보여준다.
total_purchase가 높은 고객은 매출 기여도가 큰 고객이며, order_count가 높은 고객은 반복 구매 성향이 있는 고객으로 볼 수 있다.
avg_order_amount는 고객의 객단가를 보여주지만, 고가 주문의 영향을 받을 수 있으므로 median_order_amount와 함께 확인하는 것이 좋다.
\`\`\`

---
`;export{e as default};