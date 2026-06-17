var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.13 코호트별 평균 주문 금액 분석

이번에는 코호트별 경과 월별 평균 주문 금액을 계산합니다.

---

### 15.13.1 평균 주문 금액 계산

\`\`\`python
cohort_avg_order = cohort_sales.copy()

cohort_avg_order["avg_order_amount"] = (
    cohort_avg_order["total_sales"] /
    cohort_avg_order["order_count"]
).round(0)

cohort_avg_order.head()
\`\`\`

---

### 15.13.2 평균 주문 금액 피벗

\`\`\`python
cohort_avg_order_table = pd.pivot_table(
    data=cohort_avg_order,
    index="cohort_month",
    columns="cohort_index",
    values="avg_order_amount",
    aggfunc="mean"
)

cohort_avg_order_table
\`\`\`

저장합니다.

\`\`\`python
cohort_avg_order_table.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_avg_order_table.csv",
    index=False
)
\`\`\`

---

### 15.13.3 해석 예시

\`\`\`text
코호트별 평균 주문 금액을 보면 고객이 시간이 지나면서 더 비싼 상품을 구매하는지, 또는 구매 금액이 낮아지는지 확인할 수 있다.
리텐션은 낮아졌지만 평균 주문 금액이 증가한다면 남아 있는 고객의 가치가 높을 수 있다.
\`\`\`

---
`;export{e as default};