var e=`# 19장. 대용량 데이터 처리 실습

## 19.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    raw/
      chapter_19_large_orders.csv
    processed/
      chapter_19_large_orders_sample.csv
      chapter_19_large_orders_optimized.csv
      chapter_19_large_orders.parquet
      chapter_19_monthly_sales_from_chunks.csv
      chapter_19_category_sales_from_chunks.csv
      chapter_19_duckdb_monthly_sales.csv
      chapter_19_duckdb_category_sales.csv
  outputs/
    tables/
      chapter_19_memory_usage_before_after.csv
      chapter_19_read_time_comparison.csv
      chapter_19_dtype_optimization_summary.csv
      chapter_19_chunk_processing_summary.csv
      chapter_19_parquet_comparison_summary.csv
      chapter_19_duckdb_processing_summary.csv
      chapter_19_pandas_duckdb_validation.csv
      chapter_19_large_data_output_summary.csv
    queries/
      chapter_19_large_data_duckdb_queries.sql
    reports/
      chapter_19_large_data_processing_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_19_large_orders.csv\` | 실습용 대용량 주문 CSV |
| \`chapter_19_large_orders_sample.csv\` | 일부 행만 추출한 샘플 데이터 |
| \`chapter_19_large_orders_optimized.csv\` | 필요한 컬럼과 최적화 후 저장한 CSV |
| \`chapter_19_large_orders.parquet\` | Parquet 형식으로 저장한 주문 데이터 |
| \`chapter_19_monthly_sales_from_chunks.csv\` | chunk 단위로 계산한 월별 매출 |
| \`chapter_19_category_sales_from_chunks.csv\` | chunk 단위로 계산한 카테고리별 매출 |
| \`chapter_19_duckdb_monthly_sales.csv\` | DuckDB로 계산한 월별 매출 |
| \`chapter_19_duckdb_category_sales.csv\` | DuckDB로 계산한 카테고리별 매출 |
| \`chapter_19_memory_usage_before_after.csv\` | 자료형 최적화 전후 메모리 비교 |
| \`chapter_19_read_time_comparison.csv\` | CSV 읽기 방식별 시간 비교 |
| \`chapter_19_dtype_optimization_summary.csv\` | 자료형 최적화 결과 요약 |
| \`chapter_19_chunk_processing_summary.csv\` | chunk 처리 결과 요약 |
| \`chapter_19_parquet_comparison_summary.csv\` | CSV와 Parquet 비교 |
| \`chapter_19_duckdb_processing_summary.csv\` | DuckDB 처리 결과 요약 |
| \`chapter_19_pandas_duckdb_validation.csv\` | pandas와 DuckDB 집계 결과 검증 |
| \`chapter_19_large_data_processing_report.md\` | 대용량 데이터 처리 실습 보고서 |

이번 장의 핵심 파일은 다음입니다.

\`\`\`text
chapter_19_large_data_processing_report.md
chapter_19_memory_usage_before_after.csv
chapter_19_duckdb_monthly_sales.csv
chapter_19_large_orders.parquet
\`\`\`

---
`;export{e as default};