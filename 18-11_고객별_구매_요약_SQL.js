var e=`# 18장. SQL 기반 분석 실습

## 18.11 고객별 구매 요약 SQL

고객별 Feature Table의 일부도 SQL로 만들 수 있습니다.

### 18.11.1 고객별 구매 요약

\`\`\`python
query = """
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
ORDER BY total_purchase DESC
"""

sql_customer_summary = con.execute(query).df()
sql_customer_summary
\`\`\`

저장합니다.

\`\`\`python
sql_customer_summary.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_customer_summary.csv",
    index=False
)
\`\`\`

### 18.11.2 Recency 계산

SQL에서도 기준일을 사용해 최근 구매 후 경과일을 계산할 수 있습니다.

\`\`\`python
query = """
SELECT
    customer_id,
    MAX(order_date) AS last_order_date,
    DATE_DIFF('day', MAX(order_date), DATE '2026-06-30') AS days_since_last_order
FROM orders
GROUP BY customer_id
ORDER BY days_since_last_order
"""

sql_recency = con.execute(query).df()
sql_recency
\`\`\`

### 18.11.3 해석 예시

\`\`\`text
고객별 구매 요약은 SQL의 GROUP BY로 만들 수 있다.
COUNT(DISTINCT order_id)는 구매 횟수, SUM(net_amount)는 총구매액, MAX(order_date)는 마지막 구매일을 의미한다.
이 결과는 고객 Feature Table이나 RFM 분석의 입력으로 사용할 수 있다.
\`\`\`

---
`;export{e as default};