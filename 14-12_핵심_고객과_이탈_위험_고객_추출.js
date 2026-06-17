var e=`# 14장. RFM 고객 분석 실습

## 14.12 핵심 고객과 이탈 위험 고객 추출

RFM 분석 결과를 사용하면 특정 고객 리스트를 추출할 수 있습니다.

---

### 14.12.1 핵심 고객 추출

\`\`\`python
top_customers = (
    rfm_customer_segments
    .query("rfm_segment == 'Champions' or rfm_segment == 'Loyal Customers'")
    .sort_values(["rfm_score_sum", "monetary"], ascending=False)
)

top_customers.head()
\`\`\`

저장합니다.

\`\`\`python
top_customers.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_top_customers.csv",
    index=False
)
\`\`\`

---

### 14.12.2 이탈 위험 고객 추출

\`\`\`python
at_risk_customers = (
    rfm_customer_segments
    .query("rfm_segment == 'At Risk'")
    .sort_values(["monetary", "frequency"], ascending=False)
)

at_risk_customers.head()
\`\`\`

저장합니다.

\`\`\`python
at_risk_customers.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_at_risk_customers.csv",
    index=False
)
\`\`\`

---

### 14.12.3 휴면 고객 추출

\`\`\`python
hibernating_customers = (
    rfm_customer_segments
    .query("rfm_segment == 'Hibernating'")
    .sort_values(["recency", "monetary"], ascending=[False, False])
)

hibernating_customers.head()
\`\`\`

저장합니다.

\`\`\`python
hibernating_customers.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_hibernating_customers.csv",
    index=False
)
\`\`\`

---

### 14.12.4 해석 예시

\`\`\`text
핵심 고객 목록은 VIP 혜택이나 멤버십 강화 대상자로 활용할 수 있다.
이탈 위험 고객은 과거 구매 이력이 있지만 최근 구매가 없는 고객으로, 복귀 캠페인 대상이 될 수 있다.
휴면 고객은 비용 대비 효과를 고려해 저비용 재활성화 캠페인으로 접근하는 것이 좋다.
\`\`\`

---
`;export{e as default};