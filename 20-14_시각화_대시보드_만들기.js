var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.14 시각화 대시보드 만들기

이제 핵심 결과를 시각화합니다.

---

### 20.14.1 월별 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(
    monthly_sales["year_month"],
    monthly_sales["total_sales"],
    marker="o"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "final_project_monthly_sales.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 20.14.2 카테고리별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    category_sales["product_category"],
    category_sales["total_sales"]
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "final_project_category_sales.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 20.14.3 RFM 세그먼트 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    rfm_segment_summary["rfm_segment"],
    rfm_segment_summary["customer_count"]
)

plt.title("RFM 세그먼트별 고객 수")
plt.xlabel("RFM 세그먼트")
plt.ylabel("고객 수")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "final_project_rfm_segments.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 20.14.4 코호트 리텐션 히트맵

\`\`\`python
plt.figure(figsize=(10, 5))

plt.imshow(
    cohort_retention.values,
    aspect="auto"
)

plt.title("첫 구매 월 기준 코호트 리텐션")
plt.xlabel("경과 월")
plt.ylabel("첫 구매 월")

plt.xticks(
    ticks=range(len(cohort_retention.columns)),
    labels=cohort_retention.columns
)

plt.yticks(
    ticks=range(len(cohort_retention.index)),
    labels=cohort_retention.index.astype(str)
)

plt.colorbar(label="리텐션(%)")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "final_project_cohort_retention.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 20.14.5 퍼널 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    funnel_report["step_name"],
    funnel_report["users"]
)

plt.title("구매 퍼널 단계별 사용자 수")
plt.xlabel("퍼널 단계")
plt.ylabel("사용자 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "final_project_funnel_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 20.14.6 종합 대시보드

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(14, 9))

axes[0, 0].plot(
    monthly_sales["year_month"],
    monthly_sales["total_sales"],
    marker="o"
)
axes[0, 0].set_title("월별 매출 추이")
axes[0, 0].set_xlabel("월")
axes[0, 0].set_ylabel("매출")
axes[0, 0].tick_params(axis="x", rotation=30)

axes[0, 1].bar(
    category_sales["product_category"],
    category_sales["total_sales"]
)
axes[0, 1].set_title("카테고리별 매출")
axes[0, 1].set_xlabel("카테고리")
axes[0, 1].set_ylabel("매출")

axes[1, 0].bar(
    rfm_segment_summary["rfm_segment"],
    rfm_segment_summary["customer_count"]
)
axes[1, 0].set_title("RFM 세그먼트별 고객 수")
axes[1, 0].set_xlabel("RFM 세그먼트")
axes[1, 0].set_ylabel("고객 수")
axes[1, 0].tick_params(axis="x", rotation=45)

axes[1, 1].bar(
    funnel_report["step_name"],
    funnel_report["users"]
)
axes[1, 1].set_title("구매 퍼널")
axes[1, 1].set_xlabel("퍼널 단계")
axes[1, 1].set_ylabel("사용자 수")
axes[1, 1].tick_params(axis="x", rotation=30)

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "final_project_dashboard.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---
`;export{e as default};