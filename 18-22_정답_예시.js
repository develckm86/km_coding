var e=`# 18장. SQL 기반 분석 실습

## 18.22 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

### 18.22.1 월별 매출 SQL

\`\`\`sql
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY year_month
ORDER BY year_month;
\`\`\`

### 18.22.2 카테고리별 매출 SQL

\`\`\`sql
SELECT
    category,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY category
ORDER BY total_sales DESC;
\`\`\`

### 18.22.3 고객별 구매 요약 SQL

\`\`\`sql
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
\`\`\`

### 18.22.4 윈도우 함수 순위 SQL

\`\`\`sql
WITH product_sales AS (
    SELECT
        category,
        product_id,
        SUM(net_amount) AS total_sales
    FROM orders
    GROUP BY category, product_id
)
SELECT
    category,
    product_id,
    total_sales,
    RANK() OVER (
        PARTITION BY category
        ORDER BY total_sales DESC
    ) AS sales_rank_in_category
FROM product_sales
ORDER BY category, sales_rank_in_category;
\`\`\`

### 18.22.5 누적 매출 SQL

\`\`\`sql
WITH monthly_sales AS (
    SELECT
        year_month,
        SUM(net_amount) AS total_sales
    FROM orders
    GROUP BY year_month
)
SELECT
    year_month,
    total_sales,
    SUM(total_sales) OVER (
        ORDER BY year_month
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_sales
FROM monthly_sales
ORDER BY year_month;
\`\`\`

---
`;export{e as default};