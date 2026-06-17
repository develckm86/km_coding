var e=`# 6장. 고급 groupby 분석 리포트

## 6.11 전체 평균 대비 고객 구매액 비교

이번에는 고객별 총구매액이 전체 고객 평균보다 높은지 비교합니다.

분석 질문:

\`\`\`text
어떤 고객이 평균보다 높은 구매액을 보이는가?
\`\`\`

---

### 6.11.1 고객별 총구매액 계산

이미 만든 \`customer_summary\`를 사용할 수 있습니다.

\`\`\`python
customer_summary.head()
\`\`\`

고객별 평균 총구매액을 계산합니다.

\`\`\`python
avg_customer_purchase = customer_summary["total_purchase"].mean()

avg_customer_purchase
\`\`\`

---

### 6.11.2 평균 대비 차이 계산

\`\`\`python
customer_summary["diff_from_avg_customer_purchase"] = (
    customer_summary["total_purchase"] - avg_customer_purchase
)

customer_summary["is_above_avg_purchase"] = (
    customer_summary["total_purchase"] > avg_customer_purchase
)

customer_summary[[
    "customer_id",
    "customer_name",
    "total_purchase",
    "diff_from_avg_customer_purchase",
    "is_above_avg_purchase"
]]
\`\`\`

---

### 6.11.3 평균 대비 비율 계산

\`\`\`python
customer_summary["purchase_ratio_to_avg"] = (
    customer_summary["total_purchase"] / avg_customer_purchase
).round(2)

customer_summary[[
    "customer_id",
    "customer_name",
    "total_purchase",
    "purchase_ratio_to_avg"
]]
\`\`\`

\`purchase_ratio_to_avg\`가 2이면 평균의 2배 구매했다는 뜻입니다.

---

### 6.11.4 저장하기

\`\`\`python
customer_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_customer_avg_comparison.csv",
    index=False
)
\`\`\`

---

### 6.11.5 해석 예시

\`\`\`text
전체 고객 평균 총구매액보다 높은 고객은 매출 기여도가 높은 고객군으로 볼 수 있다.
특히 평균 대비 2배 이상 구매한 고객은 VIP 후보 또는 집중 관리 대상으로 볼 수 있다.
다만 구매 금액만으로 고객 가치를 판단하기보다는 최근 구매일, 구매 빈도, 재구매 여부도 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};