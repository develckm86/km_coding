var e=`# 18장. SQL 기반 분석 실습

## 18.21 18장 실습 과제

이번 장의 과제는 DuckDB를 사용해 SQL 기반 분석 리포트를 만드는 것입니다.

### 과제 1. DuckDB 연결과 테이블 등록

주문, 고객, 상품 데이터를 DuckDB에 등록하세요.

\`\`\`python
con.register("orders", orders)
con.register("customers", customers)
con.register("products", products)
\`\`\`

### 과제 2. 기본 조회 쿼리 작성

다음 조건의 SQL 쿼리를 작성하세요.

\`\`\`text
주문 ID, 주문일, 고객 ID, 주문 금액 조회
주문 금액 100,000원 이상 주문만 조회
2026년 4월 이후 주문만 조회
\`\`\`

### 과제 3. 월별 매출 SQL 작성

다음 지표를 월별로 계산하세요.

\`\`\`text
total_sales
order_count
unique_customers
avg_order_amount
\`\`\`

제출물:

\`\`\`text
sql_monthly_sales.csv
\`\`\`

### 과제 4. 카테고리별 매출 SQL 작성

카테고리별로 다음 지표를 계산하세요.

\`\`\`text
total_sales
order_count
unique_customers
avg_order_amount
\`\`\`

제출물:

\`\`\`text
sql_category_sales.csv
\`\`\`

### 과제 5. 고객별 구매 요약 SQL 작성

주문 데이터와 고객 데이터를 결합해 고객별 구매 요약을 만드세요.

필수 컬럼:

\`\`\`text
customer_id
customer_name
grade
region
order_count
total_purchase
avg_order_amount
last_order_date
first_order_date
category_count
\`\`\`

제출물:

\`\`\`text
sql_customer_summary.csv
\`\`\`

### 과제 6. JOIN 품질 점검 SQL 작성

주문·고객·상품 결합 후 다음을 확인하세요.

\`\`\`text
전체 행 수
고객 정보 누락 행 수
상품 정보 누락 행 수
\`\`\`

제출물:

\`\`\`text
sql_join_quality_check.csv
\`\`\`

### 과제 7. 윈도우 함수로 순위 계산

다음 순위를 계산하세요.

\`\`\`text
카테고리 내 상품 매출 순위
고객별 총구매액 순위
\`\`\`

제출물:

\`\`\`text
sql_product_rank.csv
sql_customer_rank.csv
\`\`\`

### 과제 8. pandas와 SQL 결과 비교

월별 매출 결과를 pandas와 SQL로 각각 계산하고 차이를 비교하세요.

제출물:

\`\`\`text
pandas_sql_comparison.csv
\`\`\`

### 과제 9. SQL 쿼리 파일 저장

작성한 주요 SQL 쿼리를 \`.sql\` 파일로 저장하세요.

제출물:

\`\`\`text
sales_analysis_queries.sql
customer_analysis_queries.sql
join_analysis_queries.sql
\`\`\`

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# SQL 기반 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. DuckDB 사용 방식

## 4. 기본 조회

## 5. 월별 매출 분석

## 6. 카테고리별 매출 분석

## 7. 고객별 구매 요약

## 8. 데이터 결합 분석

## 9. 윈도우 함수 분석

## 10. pandas와 SQL 결과 비교

## 11. 주요 인사이트

## 12. 주의사항

## 13. 다음 단계
\`\`\`

제출물:

\`\`\`text
sql_analysis_report.md
\`\`\`

---
`;export{e as default};