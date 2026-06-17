var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    raw/
      final_project_orders_raw.csv
      final_project_customers_raw.csv
      final_project_products_raw.csv
      final_project_events_raw.csv
    processed/
      final_project_orders_clean.csv
      final_project_data_mart.csv
      final_project_customer_features.csv
      final_project_rfm_segments.csv
      final_project_cohort_data.csv
      final_project_funnel_flags.csv
  outputs/
    tables/
      final_project_data_quality_report.csv
      final_project_sales_summary.csv
      final_project_monthly_sales.csv
      final_project_category_sales.csv
      final_project_customer_summary.csv
      final_project_rfm_segment_summary.csv
      final_project_cohort_retention.csv
      final_project_funnel_report.csv
      final_project_sql_sales_summary.csv
      final_project_action_plan.csv
      final_project_output_inventory.csv
    charts/
      final_project_monthly_sales.png
      final_project_category_sales.png
      final_project_rfm_segments.png
      final_project_cohort_retention.png
      final_project_funnel_chart.png
      final_project_dashboard.png
    queries/
      final_project_analysis_queries.sql
    reports/
      final_project_executive_report.md
      final_project_technical_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`final_project_orders_raw.csv\` | 원본 주문 데이터 |
| \`final_project_customers_raw.csv\` | 원본 고객 데이터 |
| \`final_project_products_raw.csv\` | 원본 상품 데이터 |
| \`final_project_events_raw.csv\` | 원본 이벤트 로그 데이터 |
| \`final_project_orders_clean.csv\` | 정제된 주문 데이터 |
| \`final_project_data_mart.csv\` | 주문·고객·상품이 결합된 분석용 데이터마트 |
| \`final_project_customer_features.csv\` | 고객별 Feature Table |
| \`final_project_rfm_segments.csv\` | 고객별 RFM 세그먼트 |
| \`final_project_cohort_retention.csv\` | 첫 구매 월 기준 리텐션 테이블 |
| \`final_project_funnel_report.csv\` | 구매 퍼널 전환율 리포트 |
| \`final_project_dashboard.png\` | 핵심 그래프를 모은 대시보드 이미지 |
| \`final_project_executive_report.md\` | 의사결정자용 최종 요약 보고서 |
| \`final_project_technical_report.md\` | 분석가용 기술 보고서 |
| \`final_project_analysis_queries.sql\` | SQL 기반 검증 쿼리 |

이번 장의 핵심 산출물은 다음 세 가지입니다.

\`\`\`text
final_project_data_mart.csv
final_project_dashboard.png
final_project_executive_report.md
\`\`\`

---
`;export{e as default};