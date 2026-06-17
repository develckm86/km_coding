var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.6 주문 데이터 정제

품질 진단 결과를 바탕으로 주문 데이터를 정제합니다.

---

### 20.6.1 정제 기준

이번 프로젝트에서는 다음 기준으로 정제합니다.

\`\`\`text
order_id 중복은 첫 번째 행만 유지한다.
customer_id가 없는 주문은 제외한다.
order_date가 없는 주문은 제외한다.
net_amount가 음수인 주문은 제외한다.
상품 마스터에 없는 product_id는 분석용 데이터마트에서 제외한다.
\`\`\`

---

### 20.6.2 정제 코드

\`\`\`python
orders_clean = orders_raw.copy()

orders_clean = orders_clean.drop_duplicates(
    subset=["order_id"],
    keep="first"
)

orders_clean = orders_clean.dropna(
    subset=["customer_id", "order_date", "net_amount"]
)

orders_clean = orders_clean[
    orders_clean["net_amount"] >= 0
]

orders_clean = orders_clean[
    orders_clean["product_id"].isin(products_raw["product_id"])
].copy()

orders_clean["customer_id"] = orders_clean["customer_id"].astype(int)
orders_clean["order_date"] = pd.to_datetime(orders_clean["order_date"], errors="coerce")
orders_clean["year_month"] = orders_clean["order_date"].dt.to_period("M").astype(str)

orders_clean.head()
\`\`\`

저장합니다.

\`\`\`python
orders_clean.to_csv(
    DATA_PROCESSED / "final_project_orders_clean.csv",
    index=False
)
\`\`\`

---
`;export{e as default};