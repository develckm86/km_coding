var e=`# 8장. 시계열 매출 분석

## 8.14 시계열 분석 결과 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
time_series_summary = pd.DataFrame([
    {
        "output_name": "daily_sales_report",
        "file_name": "chapter_08_daily_sales_report.csv",
        "description": "일별 매출, 주문 수, 평균 주문 금액"
    },
    {
        "output_name": "weekly_sales_report",
        "file_name": "chapter_08_weekly_sales_report.csv",
        "description": "주별 매출, 전주 대비 증감액과 증감률"
    },
    {
        "output_name": "monthly_sales_growth",
        "file_name": "chapter_08_monthly_sales_growth.csv",
        "description": "월별 매출, 전월 대비 성장률, 주문 수와 객단가 변화"
    },
    {
        "output_name": "weekday_sales_report",
        "file_name": "chapter_08_weekday_sales_report.csv",
        "description": "요일별 매출, 주문 수, 평균 주문 금액"
    },
    {
        "output_name": "event_before_after_summary",
        "file_name": "chapter_08_event_before_after_summary.csv",
        "description": "이벤트 전후 일평균 매출 비교"
    },
    {
        "output_name": "monthly_category_sales",
        "file_name": "chapter_08_monthly_category_sales.csv",
        "description": "월별 카테고리 매출과 월 내 비중"
    },
    {
        "output_name": "category_growth_contribution",
        "file_name": "chapter_08_category_growth_contribution.csv",
        "description": "카테고리별 전월 대비 매출 증감 기여도"
    }
])

time_series_summary
\`\`\`

저장합니다.

\`\`\`python
time_series_summary.to_csv(
    OUTPUT_TABLES / "chapter_08_time_series_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};