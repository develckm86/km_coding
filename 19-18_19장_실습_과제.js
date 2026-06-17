var e=`# 19장. 대용량 데이터 처리 실습

## 19.18 19장 실습 과제

이번 장의 과제는 대용량 주문 데이터를 효율적으로 처리하고 보고서를 작성하는 것입니다.

---

### 과제 1. 대용량 주문 데이터 생성 또는 준비

최소 100,000행 이상의 주문 데이터를 준비하세요.

필수 컬럼:

\`\`\`text
order_id
order_date
customer_id
product_id
category
region
channel
device
quantity
unit_price
coupon_amount
net_amount
year_month
\`\`\`

제출물:

\`\`\`text
large_orders.csv
\`\`\`

---

### 과제 2. 전체 CSV 읽기와 메모리 확인

전체 CSV를 읽고 다음을 기록하세요.

\`\`\`text
읽기 시간
행 수
컬럼 수
메모리 사용량
\`\`\`

제출물:

\`\`\`text
read_time_comparison.csv
\`\`\`

---

### 과제 3. 필요한 컬럼만 읽기

월별 매출 분석에 필요한 컬럼만 읽고 전체 읽기와 비교하세요.

필수 비교 항목:

\`\`\`text
읽기 시간
메모리 사용량
읽은 컬럼 수
\`\`\`

---

### 과제 4. 자료형 최적화

다음 최적화를 수행하세요.

\`\`\`text
정수형 downcast
반복 문자열 category 변환
날짜 컬럼 datetime 변환
\`\`\`

제출물:

\`\`\`text
memory_usage_before_after.csv
dtype_optimization_summary.csv
\`\`\`

---

### 과제 5. chunk 단위 월별 매출 집계

CSV를 chunk 단위로 읽어 월별 매출을 계산하세요.

필수 지표:

\`\`\`text
year_month
total_sales
order_count
unique_customers
\`\`\`

제출물:

\`\`\`text
monthly_sales_from_chunks.csv
\`\`\`

---

### 과제 6. chunk 단위 카테고리별 매출 집계

CSV를 chunk 단위로 읽어 카테고리별 매출을 계산하세요.

필수 지표:

\`\`\`text
category
total_sales
order_count
\`\`\`

제출물:

\`\`\`text
category_sales_from_chunks.csv
\`\`\`

---

### 과제 7. Parquet 저장과 비교

최적화된 데이터를 Parquet으로 저장하고 CSV와 비교하세요.

비교 항목:

\`\`\`text
파일 크기
읽기 시간
쓰기 시간
\`\`\`

제출물:

\`\`\`text
large_orders.parquet
parquet_comparison_summary.csv
\`\`\`

---

### 과제 8. DuckDB로 직접 집계

DuckDB를 사용해 CSV를 직접 조회하고 다음 집계를 수행하세요.

\`\`\`text
월별 매출
카테고리별 매출
채널별 매출
\`\`\`

제출물:

\`\`\`text
duckdb_monthly_sales.csv
duckdb_category_sales.csv
large_data_duckdb_queries.sql
\`\`\`

---

### 과제 9. 결과 검증

chunk 방식 결과와 DuckDB 결과를 비교하세요.

검증 항목:

\`\`\`text
total_sales 차이
order_count 차이
unique_customers 차이
\`\`\`

제출물:

\`\`\`text
pandas_duckdb_validation.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 대용량 데이터 처리 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 데이터 크기

## 4. 전체 CSV 읽기 결과

## 5. 필요한 컬럼만 읽기 결과

## 6. 자료형 최적화 결과

## 7. chunk 처리 결과

## 8. Parquet 저장 결과

## 9. DuckDB 집계 결과

## 10. pandas와 DuckDB 결과 검증

## 11. 주요 인사이트

## 12. 주의사항

## 13. 다음 단계
\`\`\`

제출물:

\`\`\`text
large_data_processing_report.md
\`\`\`

---
`;export{e as default};