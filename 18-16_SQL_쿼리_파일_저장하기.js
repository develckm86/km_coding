var e=`# 18장. SQL 기반 분석 실습

## 18.16 SQL 쿼리 파일 저장하기

실무에서는 SQL 쿼리를 파일로 저장해 관리하는 것이 좋습니다.

### 18.16.1 매출 분석 SQL 저장

\`\`\`python
sales_analysis_queries = '''
-- 18장 SQL 기반 분석 실습: 매출 분석 쿼리

-- 1. 월별 매출
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY year_month
ORDER BY year_month;

-- 2. 카테고리별 매출
SELECT
    category,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY category
ORDER BY total_sales DESC;
'''

(OUTPUT_QUERIES / "chapter_18_sales_analysis_queries.sql").write_text(
    sales_analysis_queries,
    encoding="utf-8"
)
\`\`\`

### 18.16.2 고객 분석 SQL 저장

\`\`\`python
customer_analysis_queries = '''
-- 18장 SQL 기반 분석 실습: 고객 분석 쿼리

SELECT
    o.customer_id,
    c.customer_name,
    c.grade,
    c.region,
    COUNT(DISTINCT o.order_id) AS order_count,
    SUM(o.net_amount) AS total_purchase,
    AVG(o.net_amount) AS avg_order_amount,
    MAX(o.order_date) AS last_order_date,
    MIN(o.order_date) AS first_order_date,
    COUNT(DISTINCT o.category) AS category_count
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
GROUP BY
    o.customer_id,
    c.customer_name,
    c.grade,
    c.region
ORDER BY total_purchase DESC;
'''

(OUTPUT_QUERIES / "chapter_18_customer_analysis_queries.sql").write_text(
    customer_analysis_queries,
    encoding="utf-8"
)
\`\`\`

### 18.16.3 결합 분석 SQL 저장

\`\`\`python
join_analysis_queries = '''
-- 18장 SQL 기반 분석 실습: 결합 분석 쿼리

SELECT
    o.order_id,
    o.order_date,
    o.year_month,
    o.customer_id,
    c.customer_name,
    c.grade,
    c.region AS customer_region,
    o.product_id,
    p.product_name,
    p.category AS product_category,
    p.supplier,
    o.quantity,
    o.unit_price,
    o.coupon_amount,
    o.net_amount
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
LEFT JOIN products AS p
    ON o.product_id = p.product_id
ORDER BY o.order_id;
'''

(OUTPUT_QUERIES / "chapter_18_join_analysis_queries.sql").write_text(
    join_analysis_queries,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};