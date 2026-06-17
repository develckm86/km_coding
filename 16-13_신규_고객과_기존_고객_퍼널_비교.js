var e=`# 16장. 퍼널 분석 실습

## 16.13 신규 고객과 기존 고객 퍼널 비교

첫 번째 세그먼트 분석은 신규 고객과 기존 고객 비교입니다.

---

### 16.13.1 고객 유형별 퍼널 계산

\`\`\`python
segment_funnel_by_customer_type = make_segment_funnel(
    user_flags=user_funnel_flags,
    segment_col="customer_type",
    funnel_steps=funnel_steps,
    step_name_map=funnel_step_names
)

segment_funnel_by_customer_type.head()
\`\`\`

저장합니다.

\`\`\`python
segment_funnel_by_customer_type.to_csv(
    OUTPUT_TABLES / "chapter_16_segment_funnel_by_customer_type.csv",
    index=False
)
\`\`\`

---

### 16.13.2 해석 예시

\`\`\`text
기존 고객은 신규 고객보다 구매 완료 전환율이 높을 수 있다.
신규 고객의 상품 조회에서 장바구니 단계 이탈률이 높다면 첫 구매 유도 혜택이나 신뢰 요소 강화가 필요할 수 있다.
기존 고객의 결제 시작 이후 이탈률이 높다면 결제 편의성이나 배송 조건을 점검해야 한다.
\`\`\`

---
`;export{e as default};