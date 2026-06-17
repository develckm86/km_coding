var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.18 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
cohort_output_summary = pd.DataFrame([
    {
        "output_name": "cohort_base_orders",
        "file_name": "chapter_15_cohort_base_orders.csv",
        "description": "코호트 분석에 사용한 주문 기준 데이터"
    },
    {
        "output_name": "customer_cohort_table",
        "file_name": "chapter_15_customer_cohort_table.csv",
        "description": "고객별 첫 구매일, 첫 구매 월, 가입 월"
    },
    {
        "output_name": "cohort_data",
        "file_name": "chapter_15_cohort_data.csv",
        "description": "주문별 코호트 월, 구매 월, 코호트 인덱스 포함 데이터"
    },
    {
        "output_name": "cohort_count_table",
        "file_name": "chapter_15_cohort_count_table.csv",
        "description": "코호트별 경과 월별 활성 고객 수"
    },
    {
        "output_name": "cohort_retention_table",
        "file_name": "chapter_15_cohort_retention_table.csv",
        "description": "첫 구매 월 기준 리텐션 테이블"
    },
    {
        "output_name": "signup_cohort_retention_table",
        "file_name": "chapter_15_signup_cohort_retention_table.csv",
        "description": "가입 월 기준 리텐션 테이블"
    },
    {
        "output_name": "cohort_sales_table",
        "file_name": "chapter_15_cohort_sales_table.csv",
        "description": "코호트별 경과 월별 매출"
    },
    {
        "output_name": "cohort_avg_order_table",
        "file_name": "chapter_15_cohort_avg_order_table.csv",
        "description": "코호트별 경과 월별 평균 주문 금액"
    },
    {
        "output_name": "cohort_summary",
        "file_name": "chapter_15_cohort_summary.csv",
        "description": "코호트별 크기, 매출, 1개월 후 리텐션 요약"
    },
    {
        "output_name": "cohort_quality_check",
        "file_name": "chapter_15_cohort_quality_check.csv",
        "description": "코호트 분석 결과 품질 점검"
    },
    {
        "output_name": "cohort_analysis_report",
        "file_name": "chapter_15_cohort_analysis_report.md",
        "description": "코호트와 리텐션 분석 보고서"
    }
])

cohort_output_summary
\`\`\`

저장합니다.

\`\`\`python
cohort_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};