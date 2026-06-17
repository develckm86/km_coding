var e=`# 18장. SQL 기반 분석 실습

## 18.18 SQL 기반 분석 보고서 작성하기

이번 장의 분석 결과를 Markdown 보고서로 정리합니다.

### 18.18.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. DuckDB 사용 방식
4. 기본 조회
5. 월별 매출 분석
6. 카테고리별 매출 분석
7. 지역별 매출 분석
8. 고객별 구매 요약
9. 데이터 결합 분석
10. 윈도우 함수 분석
11. pandas와 SQL 결과 비교
12. 저장한 SQL 쿼리
13. 주요 인사이트
14. 주의사항
15. 다음 단계
\`\`\`

### 18.18.2 보고서 작성 코드

\`\`\`python
sql_report = '''# 18장 실습 보고서: SQL 기반 분석 실습

## 1. 분석 목적

본 실습은 pandas로 수행하던 매출, 고객, 상품 분석을 SQL로 수행하는 것을 목적으로 한다.
DuckDB를 사용해 주문, 고객, 상품 데이터를 SQL 테이블처럼 조회하고,
집계, 조건 분류, JOIN, CTE, 윈도우 함수를 실습했다.

## 2. 사용 데이터

- 주문 데이터: chapter_18_orders_sql_base.csv
- 고객 데이터: chapter_18_customers_sql_base.csv
- 상품 데이터: chapter_18_products_sql_base.csv

## 3. DuckDB 사용 방식

DuckDB에 pandas DataFrame을 등록해 SQL 테이블처럼 사용했다.

## 4. 월별 매출 분석

SQL의 GROUP BY를 사용해 월별 매출을 계산했다.

결과 파일:
- chapter_18_sql_monthly_sales.csv

## 5. 카테고리별 매출 분석

카테고리별 총매출, 주문 수, 고객 수, 평균 주문 금액을 계산했다.

결과 파일:
- chapter_18_sql_category_sales.csv

## 6. 데이터 결합 분석

LEFT JOIN을 사용해 주문 데이터에 고객 정보와 상품 정보를 결합했다.
결합 후 고객 정보와 상품 정보 누락 여부를 확인했다.

결과 파일:
- chapter_18_sql_join_quality_check.csv

## 7. 윈도우 함수 분석

RANK(), SUM() OVER, LAG()를 사용해 순위와 누적 지표를 계산했다.

결과 파일:
- chapter_18_sql_product_rank.csv
- chapter_18_sql_customer_rank.csv

## 8. pandas와 SQL 결과 비교

같은 월별 매출 분석을 pandas와 SQL로 각각 수행한 뒤 결과를 비교했다.

결과 파일:
- chapter_18_pandas_sql_comparison.csv

## 9. 주요 인사이트

- SQL의 GROUP BY는 pandas groupby와 같은 집계 분석을 수행할 수 있다.
- CASE WHEN을 사용하면 주문 금액 구간이나 쿠폰 사용 여부 같은 조건 분류를 만들 수 있다.
- LEFT JOIN은 pandas merge와 같은 역할을 하며, 결합 후 NULL 값을 확인해야 한다.
- CTE를 사용하면 복잡한 SQL을 단계별로 구조화할 수 있다.
- 윈도우 함수는 그룹 내 순위, 누적 합계, 이전 값 비교에 유용하다.
- pandas와 SQL 결과를 비교하면 분석 기준이 일치하는지 검증할 수 있다.

## 10. 주의사항

- SQL과 pandas의 날짜 처리 방식이 다를 수 있으므로 결과를 검증해야 한다.
- COUNT(*)와 COUNT(DISTINCT ...)는 다른 의미다.
- JOIN 후 행 수가 늘어나거나 NULL이 생기는지 반드시 확인해야 한다.
- SQL 쿼리는 저장하고 버전 관리하는 것이 좋다.

## 11. 다음 단계

다음 장에서는 대용량 데이터 처리 실습을 진행한다.
'''

(OUTPUT_REPORTS / "chapter_18_sql_analysis_report.md").write_text(
    sql_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};