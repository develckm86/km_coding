var e=`# 19장. 대용량 데이터 처리 실습

## 19.20 핵심 정리

이번 장에서는 대용량 데이터 처리 실습을 진행했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
대용량 데이터는 무조건 전체를 읽기보다 필요한 컬럼만 읽어야 한다.
pd.read_csv의 usecols를 사용하면 메모리와 시간을 줄일 수 있다.
자료형 최적화는 메모리 절약에 매우 중요하다.
반복 값이 많은 문자열 컬럼은 category로 변환하는 것이 좋다.
큰 CSV는 chunksize를 사용해 나누어 처리할 수 있다.
chunk 처리 시 단순 합계는 합치기 쉽지만 고유 개수는 중복에 주의해야 한다.
Parquet은 반복 분석용 중간 저장 형식으로 유용하다.
DuckDB는 CSV를 직접 SQL로 집계할 수 있어 대용량 분석에 유용하다.
pandas, chunk, DuckDB 결과는 서로 비교해 검증해야 한다.
중간 결과와 쿼리 파일은 명확한 폴더 구조로 저장해야 한다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_19_large_orders.csv
chapter_19_large_orders_sample.csv
chapter_19_large_orders_optimized.csv
chapter_19_large_orders.parquet
chapter_19_monthly_sales_from_chunks.csv
chapter_19_category_sales_from_chunks.csv
chapter_19_duckdb_monthly_sales.csv
chapter_19_duckdb_category_sales.csv
chapter_19_memory_usage_before_after.csv
chapter_19_read_time_comparison.csv
chapter_19_dtype_optimization_summary.csv
chapter_19_chunk_processing_summary.csv
chapter_19_parquet_comparison_summary.csv
chapter_19_duckdb_processing_summary.csv
chapter_19_pandas_duckdb_validation.csv
chapter_19_large_data_duckdb_queries.sql
chapter_19_large_data_processing_report.md
\`\`\`

---
`;export{e as default};