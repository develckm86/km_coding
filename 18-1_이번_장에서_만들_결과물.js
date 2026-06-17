var e=`# 18장. SQL 기반 분석 실습

## 18.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_18_orders_sql_base.csv
      chapter_18_customers_sql_base.csv
      chapter_18_products_sql_base.csv
      chapter_18_sql_analysis_result.csv
  outputs/
    tables/
      chapter_18_sql_monthly_sales.csv
      chapter_18_sql_category_sales.csv
      chapter_18_sql_region_sales.csv
      chapter_18_sql_customer_summary.csv
      chapter_18_sql_product_rank.csv
      chapter_18_sql_customer_rank.csv
      chapter_18_sql_join_quality_check.csv
      chapter_18_pandas_sql_comparison.csv
      chapter_18_sql_output_summary.csv
    queries/
      chapter_18_sales_analysis_queries.sql
      chapter_18_customer_analysis_queries.sql
      chapter_18_join_analysis_queries.sql
    reports/
      chapter_18_sql_analysis_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_18_orders_sql_base.csv\` | SQL 실습용 주문 데이터 |
| \`chapter_18_customers_sql_base.csv\` | SQL 실습용 고객 데이터 |
| \`chapter_18_products_sql_base.csv\` | SQL 실습용 상품 데이터 |
| \`chapter_18_sql_monthly_sales.csv\` | SQL로 계산한 월별 매출 |
| \`chapter_18_sql_category_sales.csv\` | SQL로 계산한 카테고리별 매출 |
| \`chapter_18_sql_region_sales.csv\` | SQL로 계산한 지역별 매출 |
| \`chapter_18_sql_customer_summary.csv\` | SQL로 계산한 고객별 구매 요약 |
| \`chapter_18_sql_product_rank.csv\` | SQL 윈도우 함수로 계산한 상품 순위 |
| \`chapter_18_sql_customer_rank.csv\` | SQL 윈도우 함수로 계산한 고객 순위 |
| \`chapter_18_sql_join_quality_check.csv\` | SQL 결합 품질 점검 결과 |
| \`chapter_18_pandas_sql_comparison.csv\` | pandas 결과와 SQL 결과 비교 |
| \`chapter_18_sales_analysis_queries.sql\` | 매출 분석 SQL 쿼리 모음 |
| \`chapter_18_customer_analysis_queries.sql\` | 고객 분석 SQL 쿼리 모음 |
| \`chapter_18_join_analysis_queries.sql\` | 결합 분석 SQL 쿼리 모음 |
| \`chapter_18_sql_analysis_report.md\` | SQL 기반 분석 보고서 |

---
`;export{e as default};