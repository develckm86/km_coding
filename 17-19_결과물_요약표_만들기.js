var e=`# 17장. 고급 시각화 리포트 만들기

## 17.19 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
visual_output_summary = pd.DataFrame([
    {
        "output_name": "kpi_summary",
        "file_name": "chapter_17_kpi_summary.csv",
        "description": "핵심 KPI 요약표"
    },
    {
        "output_name": "monthly_sales_trend",
        "file_name": "chapter_17_monthly_sales_trend.png",
        "description": "월별 매출 추이 그래프"
    },
    {
        "output_name": "category_sales_bar",
        "file_name": "chapter_17_category_sales_bar.png",
        "description": "카테고리별 매출 그래프"
    },
    {
        "output_name": "rfm_segment_count",
        "file_name": "chapter_17_rfm_segment_count.png",
        "description": "RFM 세그먼트별 고객 수 그래프"
    },
    {
        "output_name": "rfm_segment_sales",
        "file_name": "chapter_17_rfm_segment_sales.png",
        "description": "RFM 세그먼트별 매출 그래프"
    },
    {
        "output_name": "cohort_retention_heatmap",
        "file_name": "chapter_17_cohort_retention_heatmap.png",
        "description": "코호트 리텐션 히트맵"
    },
    {
        "output_name": "funnel_chart",
        "file_name": "chapter_17_funnel_chart.png",
        "description": "구매 퍼널 그래프"
    },
    {
        "output_name": "ab_conversion_rate",
        "file_name": "chapter_17_ab_conversion_rate.png",
        "description": "A/B 테스트 전환율 그래프"
    },
    {
        "output_name": "actual_vs_predicted",
        "file_name": "chapter_17_actual_vs_predicted.png",
        "description": "회귀분석 실제값과 예측값 그래프"
    },
    {
        "output_name": "dashboard_summary",
        "file_name": "chapter_17_dashboard_summary.png",
        "description": "핵심 그래프 요약 대시보드"
    },
    {
        "output_name": "executive_summary_report",
        "file_name": "chapter_17_executive_summary_report.md",
        "description": "경영진 요약 리포트"
    },
    {
        "output_name": "visual_report",
        "file_name": "chapter_17_visual_report.md",
        "description": "상세 시각화 리포트"
    }
])

visual_output_summary
\`\`\`

저장합니다.

\`\`\`python
visual_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_17_visual_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};