var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.10 RFM 고객 세그먼트 분석

14장에서 배운 RFM 분석을 최종 프로젝트에 적용합니다.

---

### 20.10.1 RFM 원본 지표

\`\`\`python
rfm = customer_features[[
    "customer_id",
    "customer_name",
    "region",
    "grade",
    "last_order_date",
    "days_since_last_order",
    "order_count",
    "total_purchase"
]].copy()

rfm = rfm.rename(columns={
    "days_since_last_order": "recency",
    "order_count": "frequency",
    "total_purchase": "monetary"
})

rfm.head()
\`\`\`

---

### 20.10.2 RFM 점수화 함수

\`\`\`python
def make_quantile_score(series: pd.Series, ascending: bool = True, n_bins: int = 5) -> pd.Series:
    ranked = series.rank(method="first", ascending=ascending)

    score = pd.qcut(
        ranked,
        q=n_bins,
        labels=range(1, n_bins + 1)
    )

    return score.astype(int)
\`\`\`

---

### 20.10.3 RFM 점수 계산

\`\`\`python
rfm["r_score"] = make_quantile_score(
    rfm["recency"],
    ascending=False,
    n_bins=5
)

rfm["f_score"] = make_quantile_score(
    rfm["frequency"],
    ascending=True,
    n_bins=5
)

rfm["m_score"] = make_quantile_score(
    rfm["monetary"],
    ascending=True,
    n_bins=5
)

rfm["rfm_score_sum"] = (
    rfm["r_score"] +
    rfm["f_score"] +
    rfm["m_score"]
)

rfm["rfm_code"] = (
    rfm["r_score"].astype(str) +
    rfm["f_score"].astype(str) +
    rfm["m_score"].astype(str)
)
\`\`\`

---

### 20.10.4 RFM 세그먼트 분류

\`\`\`python
def assign_rfm_segment(row):
    r = row["r_score"]
    f = row["f_score"]
    m = row["m_score"]

    if r >= 4 and f >= 4 and m >= 4:
        return "Champions"

    if r >= 3 and f >= 4:
        return "Loyal Customers"

    if r <= 2 and f >= 4:
        return "At Risk"

    if r >= 4 and f <= 2:
        return "New Customers"

    if r <= 2 and f <= 2:
        return "Hibernating"

    if m == 5:
        return "Big Spenders"

    return "Others"

rfm["rfm_segment"] = rfm.apply(assign_rfm_segment, axis=1)

rfm.head()
\`\`\`

저장합니다.

\`\`\`python
rfm.to_csv(
    DATA_PROCESSED / "final_project_rfm_segments.csv",
    index=False
)
\`\`\`

---

### 20.10.5 RFM 세그먼트 요약

\`\`\`python
rfm_segment_summary = (
    rfm
    .groupby("rfm_segment")
    .agg(
        customer_count=("customer_id", "nunique"),
        total_monetary=("monetary", "sum"),
        avg_recency=("recency", "mean"),
        avg_frequency=("frequency", "mean"),
        avg_monetary=("monetary", "mean")
    )
    .reset_index()
    .sort_values("total_monetary", ascending=False)
)

rfm_segment_summary["avg_recency"] = rfm_segment_summary["avg_recency"].round(1)
rfm_segment_summary["avg_frequency"] = rfm_segment_summary["avg_frequency"].round(1)
rfm_segment_summary["avg_monetary"] = rfm_segment_summary["avg_monetary"].round(0)

rfm_segment_summary
\`\`\`

저장합니다.

\`\`\`python
rfm_segment_summary.to_csv(
    OUTPUT_TABLES / "final_project_rfm_segment_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};