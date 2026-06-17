var e=`# 17장. 고급 시각화 리포트 만들기

## 17.8 RFM 세그먼트 시각화

RFM 세그먼트는 고객 전략 수립에 직접 연결됩니다.

분석 질문:

\`\`\`text
고객은 어떤 세그먼트로 구성되어 있는가?
어떤 세그먼트가 매출에 가장 크게 기여하는가?
\`\`\`

---

### 17.8.1 RFM 세그먼트별 고객 수와 매출

\`\`\`python
rfm_segment_summary = (
    rfm_segments
    .groupby("rfm_segment")
    .agg(
        customer_count=("customer_id", "nunique"),
        total_monetary=("monetary", "sum")
    )
    .reset_index()
    .sort_values("total_monetary", ascending=False)
)

rfm_segment_summary
\`\`\`

---

### 17.8.2 RFM 세그먼트별 고객 수 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    rfm_segment_summary["rfm_segment"].astype(str),
    rfm_segment_summary["customer_count"]
)

plt.title("RFM 세그먼트별 고객 수")
plt.xlabel("RFM 세그먼트")
plt.ylabel("고객 수")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_rfm_segment_count.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.8.3 RFM 세그먼트별 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    rfm_segment_summary["rfm_segment"].astype(str),
    rfm_segment_summary["total_monetary"]
)

plt.title("RFM 세그먼트별 매출")
plt.xlabel("RFM 세그먼트")
plt.ylabel("총구매액")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_rfm_segment_sales.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.8.4 해석 문장 예시

\`\`\`text
RFM 세그먼트별 고객 수와 매출을 함께 보면 고객 수는 적지만 매출 기여도가 큰 세그먼트를 찾을 수 있다.
핵심 고객과 충성 고객은 유지 전략이 중요하고, 이탈 위험 고객은 재활성화 캠페인 대상이 될 수 있다.
\`\`\`

---
`;export{e as default};