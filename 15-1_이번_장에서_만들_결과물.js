var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_15_cohort_base_orders.csv
      chapter_15_customer_cohort_table.csv
  outputs/
    tables/
      chapter_15_first_purchase_cohort.csv
      chapter_15_cohort_data.csv
      chapter_15_cohort_count_table.csv
      chapter_15_cohort_retention_table.csv
      chapter_15_cohort_retention_long.csv
      chapter_15_signup_cohort_retention_table.csv
      chapter_15_cohort_sales_table.csv
      chapter_15_cohort_avg_order_table.csv
      chapter_15_cohort_summary.csv
      chapter_15_cohort_quality_check.csv
      chapter_15_cohort_output_summary.csv
    charts/
      chapter_15_cohort_retention_heatmap.png
      chapter_15_signup_cohort_heatmap.png
      chapter_15_cohort_size_chart.png
      chapter_15_month1_retention_chart.png
      chapter_15_cohort_sales_heatmap.png
    reports/
      chapter_15_cohort_analysis_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_15_cohort_base_orders.csv\` | 코호트 분석에 사용할 주문 기준 데이터 |
| \`chapter_15_customer_cohort_table.csv\` | 고객별 첫 구매 월과 가입 월 정보 |
| \`chapter_15_first_purchase_cohort.csv\` | 첫 구매 월 기준 고객 코호트 |
| \`chapter_15_cohort_data.csv\` | 주문별 코호트 월, 구매 월, 코호트 인덱스가 포함된 데이터 |
| \`chapter_15_cohort_count_table.csv\` | 코호트별 경과 월별 구매 고객 수 |
| \`chapter_15_cohort_retention_table.csv\` | 첫 구매 월 기준 리텐션 테이블 |
| \`chapter_15_cohort_retention_long.csv\` | 시각화와 후속 분석용 long format 리텐션 데이터 |
| \`chapter_15_signup_cohort_retention_table.csv\` | 가입 월 기준 리텐션 테이블 |
| \`chapter_15_cohort_sales_table.csv\` | 코호트별 경과 월별 매출 테이블 |
| \`chapter_15_cohort_avg_order_table.csv\` | 코호트별 경과 월별 평균 주문 금액 테이블 |
| \`chapter_15_cohort_summary.csv\` | 코호트별 크기, 1개월 후 리텐션, 총매출 요약 |
| \`chapter_15_cohort_quality_check.csv\` | 코호트 분석 결과 품질 점검표 |
| \`chapter_15_cohort_analysis_report.md\` | 코호트와 리텐션 분석 보고서 |

이번 장의 핵심 결과물은 다음입니다.

\`\`\`text
chapter_15_cohort_retention_table.csv
chapter_15_cohort_retention_heatmap.png
chapter_15_cohort_analysis_report.md
\`\`\`

---
`;export{e as default};