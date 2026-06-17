var e=`# 17장. 고급 시각화 리포트 만들기

## 17.15 시각화 결과물 인덱스 만들기

생성한 그래프를 관리하기 위해 인덱스 표를 만듭니다.

---

### 17.15.1 그래프 인덱스 표

\`\`\`python
visual_report_index = pd.DataFrame([
    {
        "chart_file": "chapter_17_monthly_sales_trend.png",
        "chart_type": "line",
        "analysis_area": "sales",
        "main_message": "월별 매출 흐름 확인"
    },
    {
        "chart_file": "chapter_17_category_sales_bar.png",
        "chart_type": "bar",
        "analysis_area": "sales",
        "main_message": "카테고리별 매출 구조 확인"
    },
    {
        "chart_file": "chapter_17_rfm_segment_count.png",
        "chart_type": "bar",
        "analysis_area": "customer",
        "main_message": "RFM 고객 세그먼트 구성 확인"
    },
    {
        "chart_file": "chapter_17_rfm_segment_sales.png",
        "chart_type": "bar",
        "analysis_area": "customer",
        "main_message": "RFM 세그먼트별 매출 기여 확인"
    },
    {
        "chart_file": "chapter_17_cohort_retention_heatmap.png",
        "chart_type": "heatmap",
        "analysis_area": "retention",
        "main_message": "첫 구매 월별 고객 유지율 확인"
    },
    {
        "chart_file": "chapter_17_funnel_chart.png",
        "chart_type": "bar",
        "analysis_area": "funnel",
        "main_message": "구매 단계별 사용자 감소 확인"
    },
    {
        "chart_file": "chapter_17_ab_conversion_rate.png",
        "chart_type": "bar",
        "analysis_area": "experiment",
        "main_message": "A/B 테스트 전환율 차이 확인"
    },
    {
        "chart_file": "chapter_17_actual_vs_predicted.png",
        "chart_type": "scatter",
        "analysis_area": "regression",
        "main_message": "회귀 모델 예측 성능 확인"
    },
    {
        "chart_file": "chapter_17_dashboard_summary.png",
        "chart_type": "dashboard",
        "analysis_area": "summary",
        "main_message": "핵심 분석 결과 요약"
    }
])

visual_report_index
\`\`\`

저장합니다.

\`\`\`python
visual_report_index.to_csv(
    OUTPUT_TABLES / "chapter_17_visual_report_index.csv",
    index=False
)
\`\`\`

---
`;export{e as default};