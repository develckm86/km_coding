var e=`# 6장. 고급 groupby 분석 리포트

## 6.9 그룹별 필터링: filter()

\`filter()\`는 조건을 만족하는 그룹만 남길 때 사용합니다.

예를 들어 다음 질문을 생각해봅시다.

\`\`\`text
주문 수가 2건 이상인 고객만 분석하고 싶다.
총구매액이 100,000원 이상인 고객만 추출하고 싶다.
주문 수가 너무 적은 카테고리는 제외하고 싶다.
\`\`\`

이런 경우 그룹 단위 조건이 필요합니다.

---

### 6.9.1 주문 수가 2건 이상인 고객만 남기기

\`\`\`python
repeat_customer_orders = (
    orders_mart
    .groupby("customer_id")
    .filter(lambda group: len(group) >= 2)
)

repeat_customer_orders
\`\`\`

이 코드는 고객별 주문 그룹 중 주문 수가 2건 이상인 그룹만 남깁니다.

---

### 6.9.2 총구매액이 일정 금액 이상인 고객만 남기기

\`\`\`python
high_value_customer_orders = (
    orders_mart
    .groupby("customer_id")
    .filter(lambda group: group["net_amount"].sum() >= 100000)
)

high_value_customer_orders
\`\`\`

이 코드는 고객별 총구매액이 100,000원 이상인 고객의 주문만 남깁니다.

---

### 6.9.3 필터링 결과 요약

\`\`\`python
group_filter_summary = (
    high_value_customer_orders
    .groupby(["customer_id", "customer_name"])
    .agg(
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(by="total_purchase", ascending=False)
)

group_filter_summary
\`\`\`

---

### 6.9.4 저장하기

\`\`\`python
group_filter_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_group_filter_result.csv",
    index=False
)
\`\`\`

---

### 6.9.5 filter 사용 시 주의점

\`filter()\`는 그룹 전체를 남기거나 제거합니다.  
행 단위 조건 필터링과 다릅니다.

행 단위 조건:

\`\`\`python
orders_mart[orders_mart["net_amount"] >= 100000]
\`\`\`

그룹 단위 조건:

\`\`\`python
orders_mart.groupby("customer_id").filter(
    lambda group: group["net_amount"].sum() >= 100000
)
\`\`\`

첫 번째는 주문 금액이 100,000원 이상인 주문만 남깁니다.  
두 번째는 총구매액이 100,000원 이상인 고객의 모든 주문을 남깁니다.

---
`;export{e as default};