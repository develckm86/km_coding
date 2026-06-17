var e=`# 14장. RFM 고객 분석 실습

## 14.20 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 14.20.1 RFM 원본 지표 계산

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
        monetary=("net_amount", "sum"),
        avg_order_amount=("net_amount", "mean"),
        category_count=("category", "nunique")
    )
    .reset_index()
)

rfm_raw_table["recency"] = (
    base_date - rfm_raw_table["last_order_date"]
).dt.days
\`\`\`

---

### 14.20.2 RFM 점수화

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

### 14.20.3 세그먼트 분류

\`\`\`python
rfm_customer_segments = rfm_score_table.copy()

rfm_customer_segments["rfm_segment"] = rfm_customer_segments.apply(
    assign_rfm_segment,
    axis=1
)
\`\`\`

---

### 14.20.4 세그먼트 요약

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
`;export{e as default};