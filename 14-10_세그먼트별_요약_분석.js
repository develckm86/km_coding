var e=`# 14장. RFM 고객 분석 실습

## 14.10 세그먼트별 요약 분석

이제 RFM 세그먼트별 고객 수와 매출을 요약합니다.

---

### 14.10.1 세그먼트별 고객 수와 매출

\`\`\`python
rfm_segment_summary = (
    rfm_customer_segments
    .groupby("rfm_segment", observed=False)
    .agg(
        customer_count=("customer_id", "count"),
        total_monetary=("monetary", "sum"),
        avg_recency=("recency", "mean"),
        avg_frequency=("frequency", "mean"),
        avg_monetary=("monetary", "mean"),
        avg_r_score=("r_score", "mean"),
        avg_f_score=("f_score", "mean"),
        avg_m_score=("m_score", "mean")
    )
    .reset_index()
)

rfm_segment_summary["avg_recency"] = rfm_segment_summary["avg_recency"].round(1)
rfm_segment_summary["avg_frequency"] = rfm_segment_summary["avg_frequency"].round(1)
rfm_segment_summary["avg_monetary"] = rfm_segment_summary["avg_monetary"].round(0)
rfm_segment_summary["avg_r_score"] = rfm_segment_summary["avg_r_score"].round(1)
rfm_segment_summary["avg_f_score"] = rfm_segment_summary["avg_f_score"].round(1)
rfm_segment_summary["avg_m_score"] = rfm_segment_summary["avg_m_score"].round(1)

rfm_segment_summary
\`\`\`

---

### 14.10.2 세그먼트별 고객 비중과 매출 비중

\`\`\`python
total_customers = rfm_segment_summary["customer_count"].sum()
total_monetary = rfm_segment_summary["total_monetary"].sum()

rfm_segment_summary["customer_ratio_percent"] = (
    rfm_segment_summary["customer_count"] / total_customers * 100
).round(1)

rfm_segment_summary["monetary_ratio_percent"] = (
    rfm_segment_summary["total_monetary"] / total_monetary * 100
).round(1)

rfm_segment_summary
\`\`\`

---

### 14.10.3 저장하기

\`\`\`python
rfm_segment_summary.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_segment_summary.csv",
    index=False
)
\`\`\`

---

### 14.10.4 세그먼트별 고객 수 그래프

\`\`\`python
segment_count_plot = rfm_segment_summary[
    rfm_segment_summary["customer_count"] > 0
].copy()

plt.figure(figsize=(10, 4))

plt.bar(
    segment_count_plot["rfm_segment"].astype(str),
    segment_count_plot["customer_count"]
)

plt.title("RFM 세그먼트별 고객 수")
plt.xlabel("RFM 세그먼트")
plt.ylabel("고객 수")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_14_rfm_segment_count_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 14.10.5 세그먼트별 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    segment_count_plot["rfm_segment"].astype(str),
    segment_count_plot["total_monetary"]
)

plt.title("RFM 세그먼트별 총구매액")
plt.xlabel("RFM 세그먼트")
plt.ylabel("총구매액")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_14_rfm_segment_sales_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 14.10.6 해석 예시

\`\`\`text
세그먼트별 고객 수를 보면 고객 기반이 어떤 유형으로 구성되어 있는지 확인할 수 있다.
세그먼트별 총구매액을 함께 보면 고객 수는 적지만 매출 기여도가 큰 세그먼트를 찾을 수 있다.
Champions와 Loyal Customers는 유지 전략이 중요하고, At Risk 고객은 재활성화 전략이 필요할 수 있다.
\`\`\`

---
`;export{e as default};