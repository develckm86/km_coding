var e=`# 7장. 누적 지표와 이동평균 분석

## 7.15 고객별 누적 구매액 분석

고객 분석에서는 고객별 누적 구매액이 중요합니다.

분석 질문:

\`\`\`text
고객별 구매액은 시간에 따라 어떻게 누적되는가?
\`\`\`

---

### 7.15.1 고객별 주문 정렬

\`\`\`python
customer_orders = orders_mart.sort_values(
    ["customer_id", "order_date_dt", "order_id"]
).copy()

customer_orders.head()
\`\`\`

---

### 7.15.2 고객별 누적 구매액 계산

\`\`\`python
customer_orders["customer_cumulative_purchase"] = (
    customer_orders
    .groupby("customer_id")["net_amount"]
    .cumsum()
)

customer_orders[[
    "customer_id",
    "customer_name",
    "order_id",
    "order_date_dt",
    "net_amount",
    "customer_cumulative_purchase"
]].head(10)
\`\`\`

---

### 7.15.3 고객별 구매 차수 만들기

\`\`\`python
customer_orders["purchase_number"] = (
    customer_orders
    .groupby("customer_id")
    .cumcount() + 1
)

customer_orders[[
    "customer_id",
    "customer_name",
    "order_id",
    "purchase_number",
    "net_amount",
    "customer_cumulative_purchase"
]].head(10)
\`\`\`

---

### 7.15.4 고객별 최종 누적 구매액

\`\`\`python
customer_cumulative_summary = (
    customer_orders
    .sort_values(["customer_id", "purchase_number"])
    .groupby(["customer_id", "customer_name"])
    .tail(1)
    [["customer_id", "customer_name", "purchase_number", "customer_cumulative_purchase"]]
    .rename(columns={
        "purchase_number": "total_order_count",
        "customer_cumulative_purchase": "total_purchase"
    })
    .sort_values("total_purchase", ascending=False)
    .reset_index(drop=True)
)

customer_cumulative_summary
\`\`\`

---

### 7.15.5 저장하기

\`\`\`python
customer_orders.to_csv(
    OUTPUT_TABLES / "chapter_07_customer_cumulative_purchase.csv",
    index=False
)
\`\`\`

---

### 7.15.6 해석 예시

\`\`\`text
고객별 누적 구매액은 고객 가치 분석의 핵심 지표다.
구매 차수가 증가하면서 누적 구매액이 빠르게 증가하는 고객은 우선 관리 대상이 될 수 있다.
이 데이터는 이후 RFM 분석과 고객 세그먼트 분석의 기초 데이터로 활용할 수 있다.
\`\`\`

---
`;export{e as default};