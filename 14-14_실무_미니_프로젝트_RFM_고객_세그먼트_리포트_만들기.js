var e=`# 14장. RFM 고객 분석 실습

## 14.14 실무 미니 프로젝트: RFM 고객 세그먼트 리포트 만들기

이번 장에서 배운 내용을 하나의 프로젝트 흐름으로 정리합니다.

---

### 14.14.1 프로젝트 목표

\`\`\`text
주문 데이터를 사용해 고객별 RFM 지표를 계산하고,
RFM 점수를 부여한 뒤 고객 세그먼트를 분류한다.
세그먼트별 고객 수, 매출 비중, 평균 Recency, Frequency, Monetary를 분석하고
세그먼트별 마케팅 전략을 제안한다.
\`\`\`

---

### 14.14.2 Step 1. RFM 원본 지표 계산

\`\`\`python
base_date = pd.Timestamp("2026-04-30")

rfm_raw_table = (
    rfm_base_orders
    .groupby("customer_id")
    .agg(
        customer_name=("customer_name", "first"),
        region=("region", "first"),
        first_order_date=("order_date", "min"),
        last_order_date=("order_date", "max"),
        frequency=("order_id", "nunique"),
        monetary=("net_amount", "sum")
    )
    .reset_index()
)

rfm_raw_table["recency"] = (
    base_date - rfm_raw_table["last_order_date"]
).dt.days
\`\`\`

---

### 14.14.3 Step 2. RFM 점수화

\`\`\`python
rfm_score_table = rfm_raw_table.copy()

rfm_score_table["r_score"] = make_quantile_score(
    rfm_score_table["recency"],
    ascending=False,
    n_bins=5
)

rfm_score_table["f_score"] = make_quantile_score(
    rfm_score_table["frequency"],
    ascending=True,
    n_bins=5
)

rfm_score_table["m_score"] = make_quantile_score(
    rfm_score_table["monetary"],
    ascending=True,
    n_bins=5
)

rfm_score_table["rfm_score_sum"] = (
    rfm_score_table["r_score"] +
    rfm_score_table["f_score"] +
    rfm_score_table["m_score"]
)
\`\`\`

---

### 14.14.4 Step 3. 세그먼트 분류

\`\`\`python
rfm_customer_segments = rfm_score_table.copy()

rfm_customer_segments["rfm_segment"] = rfm_customer_segments.apply(
    assign_rfm_segment,
    axis=1
)
\`\`\`

---

### 14.14.5 Step 4. 세그먼트 요약

\`\`\`python
rfm_segment_summary = (
    rfm_customer_segments
    .groupby("rfm_segment")
    .agg(
        customer_count=("customer_id", "count"),
        total_monetary=("monetary", "sum"),
        avg_recency=("recency", "mean"),
        avg_frequency=("frequency", "mean"),
        avg_monetary=("monetary", "mean")
    )
    .reset_index()
)
\`\`\`

---

### 14.14.6 Step 5. 전략 제안

\`\`\`text
Champions:
- VIP 혜택과 멤버십 강화
- 신상품 우선 안내
- 이탈 방지보다 관계 유지가 중요

At Risk:
- 복귀 쿠폰
- 과거 구매 카테고리 기반 추천
- 개인화 메시지 발송

New Customers:
- 첫 구매 감사 메시지
- 두 번째 구매 유도 쿠폰
- 베스트셀러 추천

Hibernating:
- 저비용 재활성화 캠페인
- 반응 여부에 따라 캠페인 지속 여부 판단
\`\`\`

---
`;export{e as default};