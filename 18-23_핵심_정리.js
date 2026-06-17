var e=`# 18장. SQL 기반 분석 실습

## 18.23 핵심 정리

이번 장에서는 SQL 기반 분석을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
SQL은 데이터베이스와 대용량 데이터 분석에서 매우 중요하다.
DuckDB를 사용하면 로컬 CSV나 pandas DataFrame을 SQL로 분석할 수 있다.
SELECT, WHERE, ORDER BY는 기본 조회에 사용한다.
GROUP BY는 pandas groupby와 비슷한 집계 기능이다.
CASE WHEN은 조건 분류를 만들 때 사용한다.
LEFT JOIN은 pandas merge와 비슷한 데이터 결합 기능이다.
JOIN 후에는 NULL 값과 행 수를 반드시 확인해야 한다.
CTE는 복잡한 SQL을 단계별로 구조화하는 데 유용하다.
윈도우 함수는 그룹 내 순위, 누적 합계, 이전 값 비교에 유용하다.
pandas와 SQL 결과를 비교하면 분석 기준 일치 여부를 검증할 수 있다.
중요한 SQL 쿼리는 .sql 파일로 저장하는 것이 좋다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_18_orders_sql_base.csv
chapter_18_customers_sql_base.csv
chapter_18_products_sql_base.csv
chapter_18_sql_analysis_result.csv
chapter_18_sql_monthly_sales.csv
chapter_18_sql_category_sales.csv
chapter_18_sql_region_sales.csv
chapter_18_sql_customer_summary.csv
chapter_18_sql_product_rank.csv
chapter_18_sql_customer_rank.csv
chapter_18_sql_join_quality_check.csv
chapter_18_pandas_sql_comparison.csv
chapter_18_sql_output_summary.csv
chapter_18_sales_analysis_queries.sql
chapter_18_customer_analysis_queries.sql
chapter_18_join_analysis_queries.sql
chapter_18_sql_analysis_report.md
\`\`\`

---
`;export{e as default};