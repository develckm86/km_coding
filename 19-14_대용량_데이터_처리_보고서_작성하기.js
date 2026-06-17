var e=`# 19장. 대용량 데이터 처리 실습

## 19.14 대용량 데이터 처리 보고서 작성하기

이번 장의 결과를 Markdown 보고서로 정리합니다.

---

### 19.14.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. 데이터 크기
4. 전체 CSV 읽기 결과
5. 필요한 컬럼만 읽기 결과
6. 자료형 최적화 결과
7. chunk 처리 결과
8. Parquet 저장 결과
9. DuckDB 집계 결과
10. pandas와 DuckDB 결과 검증
11. 주요 인사이트
12. 주의사항
13. 다음 단계
\`\`\`

---

### 19.14.2 보고서 작성 코드

\`\`\`python
large_data_report = f"""
# 19장 실습 보고서: 대용량 데이터 처리 실습

## 1. 분석 목적

본 실습은 대용량 주문 CSV 데이터를 효율적으로 처리하는 방법을 익히는 것을 목적으로 한다.
필요한 컬럼만 읽기, 자료형 최적화, chunk 단위 처리, Parquet 저장, DuckDB 직접 집계 방식을 비교했다.

## 2. 사용 데이터

- 데이터 파일: chapter_19_large_orders.csv
- 행 수: {N_ROWS:,}
- 주요 컬럼: order_id, order_date, customer_id, product_id, category, region, channel, device, quantity, net_amount

## 3. 데이터 크기

원본 CSV 파일 크기:
- {round(csv_size_mb, 2)} MB

Parquet 파일 크기:
- {round(parquet_size_mb, 2)} MB

## 4. 전체 CSV 읽기 결과

전체 CSV를 한 번에 읽고 메모리 사용량을 확인했다.

처리 시간:
- {round(read_full_elapsed, 3)}초

메모리 사용량:
- {round(before_opt_memory_mb, 2)} MB

결과 파일:
- chapter_19_read_time_comparison.csv

## 5. 필요한 컬럼만 읽기 결과

분석에 필요한 컬럼만 usecols로 지정해 읽었다.
필요한 컬럼만 읽으면 메모리 사용량과 읽기 시간을 줄일 수 있다.

결과 파일:
- chapter_19_read_time_comparison.csv

## 6. 자료형 최적화 결과

정수형 컬럼은 downcast하고, 반복 값이 많은 문자열 컬럼은 category로 변환했다.

최적화 전 메모리:
- {round(before_opt_memory_mb, 2)} MB

최적화 후 메모리:
- {round(after_opt_memory_mb, 2)} MB

메모리 절감률:
- {round(memory_reduction_percent, 2)}%

결과 파일:
- chapter_19_memory_usage_before_after.csv
- chapter_19_dtype_optimization_summary.csv

## 7. chunk 처리 결과

전체 CSV를 한 번에 읽지 않고 chunk 단위로 월별 매출과 카테고리별 매출을 계산했다.

결과 파일:
- chapter_19_monthly_sales_from_chunks.csv
- chapter_19_category_sales_from_chunks.csv
- chapter_19_chunk_processing_summary.csv

주의:
고유 고객 수처럼 중복 제거가 필요한 지표는 chunk 간 중복을 고려해야 한다.

## 8. Parquet 저장 결과

자료형 최적화 후 데이터를 Parquet 형식으로 저장했다.

결과 파일:
- chapter_19_large_orders.parquet
- chapter_19_parquet_comparison_summary.csv

해석:
Parquet은 반복 분석용 중간 저장 형식으로 적합하다.
파일 크기가 줄어들고 읽기 속도가 개선될 수 있다.

## 9. DuckDB 집계 결과

DuckDB를 사용해 CSV를 pandas로 모두 읽지 않고 직접 집계했다.

결과 파일:
- chapter_19_duckdb_monthly_sales.csv
- chapter_19_duckdb_category_sales.csv
- chapter_19_duckdb_processing_summary.csv

SQL 쿼리 파일:
- chapter_19_large_data_duckdb_queries.sql

## 10. pandas와 DuckDB 결과 검증

chunk 방식으로 계산한 월별 매출과 DuckDB 결과를 비교했다.

결과 파일:
- chapter_19_pandas_duckdb_validation.csv

해석:
대용량 처리 방식이 다르더라도 결과는 일관되어야 한다.
결과 차이가 있으면 필터 조건, 집계 기준, 고유 개수 계산 방식을 확인해야 한다.

## 11. 주요 인사이트

- 대용량 데이터를 다룰 때는 필요한 컬럼만 읽는 것이 중요하다.
- 자료형 최적화만으로도 메모리 사용량을 크게 줄일 수 있다.
- chunk 처리는 전체 데이터를 메모리에 올리지 않고 집계할 수 있는 방법이다.
- 고유 고객 수처럼 중복 제거가 필요한 지표는 chunk 처리 시 주의해야 한다.
- Parquet은 반복 분석과 중간 저장에 유리하다.
- DuckDB는 큰 CSV를 직접 SQL로 집계할 수 있어 효율적이다.
- pandas와 DuckDB 결과를 비교하면 처리 로직을 검증할 수 있다.

## 12. 주의사항

- 너무 큰 CSV를 무작정 pd.read_csv로 읽으면 메모리 부족이 발생할 수 있다.
- 자료형 최적화 전후 결과가 동일한지 확인해야 한다.
- chunk별 고유 개수를 단순 합산하면 중복 계산될 수 있다.
- Parquet 저장에는 pyarrow 또는 fastparquet이 필요할 수 있다.
- DuckDB 결과와 pandas 결과가 다르면 집계 기준을 반드시 확인해야 한다.
- 중간 파일은 명확한 이름과 폴더 구조로 관리해야 한다.

## 13. 다음 단계

다음 장에서는 종합 프로젝트를 수행한다.
데이터 품질 진단, 데이터마트 생성, SQL 분석, 고객 분석, 시각화 리포트까지 연결해
하나의 완성형 데이터 분석 프로젝트를 만든다.
"""
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_19_large_data_processing_report.md").write_text(
    large_data_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};