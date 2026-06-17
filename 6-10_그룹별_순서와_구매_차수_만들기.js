var e=`# 6장. 고급 groupby 분석 리포트

## 6.10 그룹별 순서와 구매 차수 만들기

고객 분석에서는 고객의 첫 번째 구매, 두 번째 구매, 마지막 구매를 구분해야 할 때가 많습니다.

이때 \`cumcount()\`를 사용할 수 있습니다.

---

### 6.10.1 고객별 주문 순서 정렬

먼저 고객별 주문일 기준으로 정렬합니다.

\`\`\`python
orders_sorted = orders_mart.sort_values(
    ["customer_id", "order_date_dt", "order_id"]
).copy()

orders_sorted.head()
\`\`\`

---

### 6.10.2 고객별 구매 차수 만들기

\`\`\`python
orders_sorted["purchase_number"] = (
    orders_sorted
    .groupby("customer_id")
    .cumcount() + 1
)

orders_sorted[[
    "customer_id",
    "customer_name",
    "order_id",
    "order_date_dt",
    "purchase_number"
]].head(10)
\`\`\`

\`cumcount()\`는 그룹 안에서 0부터 순서를 매깁니다.  
그래서 \`+ 1\`을 해서 첫 구매를 1로 표시합니다.

---

### 6.10.3 첫 구매 주문만 선택

\`\`\`python
first_orders = orders_sorted[
    orders_sorted["purchase_number"] == 1
]

first_orders[[
    "customer_id",
    "customer_name",
    "order_id",
    "order_date_dt",
    "net_amount"
]]
\`\`\`

---

### 6.10.4 재구매 주문만 선택

\`\`\`python
repeat_orders = orders_sorted[
    orders_sorted["purchase_number"] >= 2
]

repeat_orders[[
    "customer_id",
    "customer_name",
    "order_id",
    "order_date_dt",
    "purchase_number",
    "net_amount"
]]
\`\`\`

---

### 6.10.5 해석 예시

\`\`\`text
고객별 구매 차수를 만들면 첫 구매와 재구매를 구분할 수 있다.
이 정보는 재구매율, 코호트 분석, 리텐션 분석, RFM 분석에서 중요한 기초 데이터가 된다.
\`\`\`

---
`;export{e as default};