var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.16 실무 미니 프로젝트: 코호트 리텐션 리포트 만들기

이번 장에서 배운 내용을 하나의 실무 분석 흐름으로 정리합니다.

---

### 15.16.1 프로젝트 목표

\`\`\`text
주문 데이터를 사용해 첫 구매 월 기준 코호트를 만들고,
경과 월별 재구매 고객 수와 리텐션 비율을 계산한다.
코호트별 리텐션 히트맵과 요약표를 만들고,
고객 유지 전략에 활용할 인사이트를 정리한다.
\`\`\`

---

### 15.16.2 Step 1. 주문 데이터 준비

\`\`\`python
cohort_base_orders = orders.dropna(
    subset=["customer_id", "order_id", "order_date", "net_amount"]
).copy()

cohort_base_orders["order_date"] = pd.to_datetime(
    cohort_base_orders["order_date"],
    errors="coerce"
)

cohort_base_orders = cohort_base_orders.dropna(subset=["order_date"])

cohort_base_orders["order_month"] = (
    cohort_base_orders["order_date"]
    .dt.to_period("M")
)
\`\`\`

---

### 15.16.3 Step 2. 첫 구매 월 계산

\`\`\`python
customer_first_order = (
    cohort_base_orders
    .groupby("customer_id")
    .agg(first_order_date=("order_date", "min"))
    .reset_index()
)

customer_first_order["cohort_month"] = (
    customer_first_order["first_order_date"]
    .dt.to_period("M")
)
\`\`\`

---

### 15.16.4 Step 3. 코호트 인덱스 계산

\`\`\`python
cohort_data = cohort_base_orders.merge(
    customer_first_order[["customer_id", "cohort_month"]],
    on="customer_id",
    how="left"
)

cohort_data["cohort_index"] = cohort_data.apply(
    lambda row: calculate_month_diff(row["order_month"], row["cohort_month"]),
    axis=1
)
\`\`\`

---

### 15.16.5 Step 4. 리텐션 테이블 만들기

\`\`\`python
cohort_counts = (
    cohort_data
    .groupby(["cohort_month", "cohort_index"])
    .agg(active_customers=("customer_id", "nunique"))
    .reset_index()
)

cohort_count_table = pd.pivot_table(
    data=cohort_counts,
    index="cohort_month",
    columns="cohort_index",
    values="active_customers",
    aggfunc="sum"
)

cohort_retention_table = cohort_count_table.divide(
    cohort_count_table[0],
    axis=0
) * 100

cohort_retention_table = cohort_retention_table.round(1)
\`\`\`

---

### 15.16.6 Step 5. 해석 문장 작성

\`\`\`text
첫 구매 월 기준 리텐션 테이블을 보면 신규 구매 고객이 시간이 지나며 얼마나 다시 구매하는지 확인할 수 있다.
대부분의 코호트에서 0개월 이후 리텐션이 감소하는 패턴이 나타날 수 있다.
1개월 후 리텐션이 낮다면 첫 구매 이후 두 번째 구매를 유도하는 온보딩 캠페인이 필요할 수 있다.
특정 코호트의 리텐션이 다른 코호트보다 높다면 해당 월의 유입 채널, 프로모션, 상품 구성을 추가로 확인할 필요가 있다.
\`\`\`

---
`;export{e as default};