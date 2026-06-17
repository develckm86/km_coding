var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.13 SQL 기반 검증 분석

18장에서 배운 방식으로 DuckDB를 사용해 핵심 집계를 검증합니다.

---

### 20.13.1 DuckDB 연결과 테이블 등록

\`\`\`python
con = duckdb.connect()

con.register("data_mart", data_mart)
\`\`\`

---

### 20.13.2 SQL 월별 매출

\`\`\`python
sql_monthly_query = """
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM data_mart
GROUP BY year_month
ORDER BY year_month
"""

sql_monthly_sales = con.execute(sql_monthly_query).df()

sql_monthly_sales
\`\`\`

저장합니다.

\`\`\`python
sql_monthly_sales.to_csv(
    OUTPUT_TABLES / "final_project_sql_sales_summary.csv",
    index=False
)
\`\`\`

---

### 20.13.3 SQL 쿼리 저장

\`\`\`python
final_project_queries = """
-- Final Project SQL Analysis Queries

-- 1. Monthly Sales
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM data_mart
GROUP BY year_month
ORDER BY year_month;

-- 2. Category Sales
SELECT
    product_category,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM data_mart
GROUP BY product_category
ORDER BY total_sales DESC;

-- 3. Customer Purchase Summary
SELECT
    customer_id,
    customer_name,
    SUM(net_amount) AS total_purchase,
    COUNT(DISTINCT order_id) AS order_count,
    MAX(order_date) AS last_order_date
FROM data_mart
GROUP BY customer_id, customer_name
ORDER BY total_purchase DESC;
"""
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_QUERIES / "final_project_analysis_queries.sql").write_text(
    final_project_queries,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};