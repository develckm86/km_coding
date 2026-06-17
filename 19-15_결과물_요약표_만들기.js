var e=`# 19장. 대용량 데이터 처리 실습

## 19.15 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
large_data_output_summary = pd.DataFrame([
    {
        "output_name": "large_orders_csv",
        "file_name": "chapter_19_large_orders.csv",
        "description": "실습용 대용량 주문 CSV"
    },
    {
        "output_name": "large_orders_sample",
        "file_name": "chapter_19_large_orders_sample.csv",
        "description": "대용량 데이터 샘플"
    },
    {
        "output_name": "large_orders_optimized",
        "file_name": "chapter_19_large_orders_optimized.csv",
        "description": "자료형 최적화 후 저장한 CSV"
    },
    {
        "output_name": "large_orders_parquet",
        "file_name": "chapter_19_large_orders.parquet",
        "description": "Parquet 형식 저장 파일"
    },
    {
        "output_name": "monthly_sales_from_chunks",
        "file_name": "chapter_19_monthly_sales_from_chunks.csv",
        "description": "chunk 방식 월별 매출"
    },
    {
        "output_name": "category_sales_from_chunks",
        "file_name": "chapter_19_category_sales_from_chunks.csv",
        "description": "chunk 방식 카테고리별 매출"
    },
    {
        "output_name": "duckdb_monthly_sales",
        "file_name": "chapter_19_duckdb_monthly_sales.csv",
        "description": "DuckDB 방식 월별 매출"
    },
    {
        "output_name": "duckdb_category_sales",
        "file_name": "chapter_19_duckdb_category_sales.csv",
        "description": "DuckDB 방식 카테고리별 매출"
    },
    {
        "output_name": "memory_usage_before_after",
        "file_name": "chapter_19_memory_usage_before_after.csv",
        "description": "자료형 최적화 전후 메모리 비교"
    },
    {
        "output_name": "large_data_processing_report",
        "file_name": "chapter_19_large_data_processing_report.md",
        "description": "대용량 데이터 처리 실습 보고서"
    }
])

large_data_output_summary
\`\`\`

저장합니다.

\`\`\`python
large_data_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_19_large_data_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};