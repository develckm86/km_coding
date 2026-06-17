var e=`# 18장. SQL 기반 분석 실습

## 18.13 윈도우 함수로 순위 계산하기

SQL의 윈도우 함수는 그룹별 순위, 누적 합계, 이동 계산을 할 때 유용합니다.

### 18.13.1 카테고리 내 상품 매출 순위

\`\`\`python
query = """
WITH product_sales AS (
    SELECT
        category,
        product_id,
        SUM(net_amount) AS total_sales,
        COUNT(DISTINCT order_id) AS order_count
    FROM orders
    GROUP BY
        category,
        product_id
)
SELECT
    category,
    product_id,
    total_sales,
    order_count,
    RANK() OVER (
        PARTITION BY category
        ORDER BY total_sales DESC
    ) AS sales_rank_in_category
FROM product_sales
ORDER BY
    category,
    sales_rank_in_category
"""

sql_product_rank = con.execute(query).df()
sql_product_rank
\`\`\`

저장합니다.

\`\`\`python
sql_product_rank.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_product_rank.csv",
    index=False
)
\`\`\`

### 18.13.2 고객별 총구매액 순위

\`\`\`python
query = """
WITH customer_sales AS (
    SELECT
        customer_id,
        SUM(net_amount) AS total_purchase,
        COUNT(DISTINCT order_id) AS order_count
    FROM orders
    GROUP BY customer_id
)
SELECT
    customer_id,
    total_purchase,
    order_count,
    RANK() OVER (
        ORDER BY total_purchase DESC
    ) AS purchase_rank,
    ROUND(
        total_purchase / SUM(total_purchase) OVER () * 100,
        2
    ) AS sales_ratio_percent
FROM customer_sales
ORDER BY purchase_rank
"""

sql_customer_rank = con.execute(query).df()
sql_customer_rank
\`\`\`

저장합니다.

\`\`\`python
sql_customer_rank.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_customer_rank.csv",
    index=False
)
\`\`\`

### 18.13.3 윈도우 함수 해석

윈도우 함수는 \`OVER()\`를 사용합니다.

\`\`\`sql
RANK() OVER (
    PARTITION BY category
    ORDER BY total_sales DESC
)
\`\`\`

해석:

\`\`\`text
category별로 나누고,
total_sales가 높은 순서대로 순위를 매긴다.
\`\`\`

\`SUM(total_purchase) OVER ()\`는 전체 합계를 각 행에 붙입니다. pandas의 \`transform("sum")\`과 비슷한 역할입니다.

---
`;export{e as default};