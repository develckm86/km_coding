var e=`# 18장. SQL 기반 분석 실습

## 18.10 JOIN으로 데이터 결합하기

SQL에서도 여러 테이블을 결합할 수 있습니다. pandas의 \`merge()\`와 SQL의 \`JOIN\`은 같은 목적을 가집니다.

### 18.10.1 주문과 고객 결합

\`\`\`python
query = """
SELECT
    o.order_id,
    o.order_date,
    o.customer_id,
    c.customer_name,
    c.grade,
    c.region AS customer_region,
    o.product_id,
    o.net_amount
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
ORDER BY o.order_id
"""

orders_customers_sql = con.execute(query).df()
orders_customers_sql.head()
\`\`\`

### 18.10.2 주문과 상품 결합

\`\`\`python
query = """
SELECT
    o.order_id,
    o.order_date,
    o.customer_id,
    o.product_id,
    p.product_name,
    p.category AS product_category,
    p.supplier,
    o.quantity,
    o.net_amount
FROM orders AS o
LEFT JOIN products AS p
    ON o.product_id = p.product_id
ORDER BY o.order_id
"""

orders_products_sql = con.execute(query).df()
orders_products_sql.head()
\`\`\`

### 18.10.3 주문·고객·상품 결합

\`\`\`python
query = """
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
ORDER BY o.order_id
"""

orders_joined_sql = con.execute(query).df()
orders_joined_sql.head()
\`\`\`

저장합니다.

\`\`\`python
orders_joined_sql.to_csv(
    DATA_PROCESSED / "chapter_18_sql_analysis_result.csv",
    index=False
)
\`\`\`

### 18.10.4 JOIN 결과 품질 점검

결합 후 고객명이나 상품명이 없는 행을 확인합니다.

\`\`\`python
query = """
SELECT
    COUNT(*) AS total_rows,
    SUM(CASE WHEN customer_name IS NULL THEN 1 ELSE 0 END) AS missing_customer_rows,
    SUM(CASE WHEN product_name IS NULL THEN 1 ELSE 0 END) AS missing_product_rows
FROM (
    SELECT
        o.order_id,
        c.customer_name,
        p.product_name
    FROM orders AS o
    LEFT JOIN customers AS c
        ON o.customer_id = c.customer_id
    LEFT JOIN products AS p
        ON o.product_id = p.product_id
) AS joined
"""

sql_join_quality_check = con.execute(query).df()
sql_join_quality_check
\`\`\`

저장합니다.

\`\`\`python
sql_join_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_join_quality_check.csv",
    index=False
)
\`\`\`

### 18.10.5 해석 예시

\`\`\`text
SQL의 LEFT JOIN은 pandas의 how='left' merge와 같은 역할을 한다.
주문 데이터에 고객 정보와 상품 정보를 붙일 수 있다.
결합 후에는 고객명이나 상품명이 NULL인 행이 있는지 확인해야 한다.
\`\`\`

---
`;export{e as default};