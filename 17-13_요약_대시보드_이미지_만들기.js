var e=`# 17장. 고급 시각화 리포트 만들기

## 17.13 요약 대시보드 이미지 만들기

여러 그래프를 하나의 요약 이미지로 묶어 경영진 보고용으로 사용할 수 있습니다.

단, 너무 많은 그래프를 한 이미지에 넣으면 읽기 어려워집니다.

이번 실습에서는 4개의 핵심 그래프를 하나의 이미지로 묶습니다.

\`\`\`text
월별 매출 추이
카테고리별 매출
RFM 세그먼트별 고객 수
구매 퍼널
\`\`\`

---

### 17.13.1 대시보드용 데이터 준비

\`\`\`python
dashboard_monthly = monthly_sales.copy()
dashboard_category = category_sales.copy()
dashboard_rfm = rfm_segment_summary.copy()
dashboard_funnel = funnel_report.copy()
\`\`\`

---

### 17.13.2 대시보드 이미지 생성

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(14, 9))

axes[0, 0].plot(
    dashboard_monthly["year_month"],
    dashboard_monthly["total_sales"],
    marker="o"
)
axes[0, 0].set_title("월별 매출 추이")
axes[0, 0].set_xlabel("월")
axes[0, 0].set_ylabel("매출")
axes[0, 0].tick_params(axis="x", rotation=30)

axes[0, 1].bar(
    dashboard_category["category"],
    dashboard_category["total_sales"]
)
axes[0, 1].set_title("카테고리별 매출")
axes[0, 1].set_xlabel("카테고리")
axes[0, 1].set_ylabel("매출")

axes[1, 0].bar(
    dashboard_rfm["rfm_segment"].astype(str),
    dashboard_rfm["customer_count"]
)
axes[1, 0].set_title("RFM 세그먼트별 고객 수")
axes[1, 0].set_xlabel("RFM 세그먼트")
axes[1, 0].set_ylabel("고객 수")
axes[1, 0].tick_params(axis="x", rotation=45)

axes[1, 1].bar(
    dashboard_funnel["step_name"],
    dashboard_funnel["users"]
)
axes[1, 1].set_title("구매 퍼널")
axes[1, 1].set_xlabel("퍼널 단계")
axes[1, 1].set_ylabel("사용자 수")
axes[1, 1].tick_params(axis="x", rotation=30)

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_dashboard_summary.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.13.3 대시보드 해석 예시

\`\`\`text
요약 대시보드는 매출 흐름, 카테고리 구조, 고객 세그먼트, 구매 퍼널을 한 화면에서 보여준다.
경영진 보고에서는 모든 세부 분석을 보여주기보다 핵심 그래프와 주요 메시지를 먼저 제시하는 것이 좋다.
\`\`\`

---
`;export{e as default};