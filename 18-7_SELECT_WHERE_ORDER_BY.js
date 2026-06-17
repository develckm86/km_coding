var e=`# 18장. SQL 기반 분석 실습

## 18.7 SELECT, WHERE, ORDER BY

SQL의 기본은 필요한 컬럼을 선택하고 조건을 적용하는 것입니다.

### 18.7.1 특정 컬럼 선택

\`\`\`python
query = """
SELECT
    order_id,
    order_date,
    customer_id,
    net_amount
FROM orders
LIMIT 10
"""

con.execute(query).df()
\`\`\`

### 18.7.2 WHERE 조건

매출이 100,000원 이상인 주문만 조회합니다.

\`\`\`python
query = """
SELECT
    order_id,
    order_date,
    customer_id,
    net_amount
FROM orders
WHERE net_amount >= 100000
ORDER BY net_amount DESC
"""

high_amount_orders = con.execute(query).df()
high_amount_orders
\`\`\`

### 18.7.3 날짜 조건

2026년 4월 이후 주문만 조회합니다.

\`\`\`python
query = """
SELECT
    order_id,
    order_date,
    customer_id,
    net_amount
FROM orders
WHERE order_date >= DATE '2026-04-01'
ORDER BY order_date
"""

orders_after_april = con.execute(query).df()
orders_after_april
\`\`\`

### 18.7.4 pandas와 비교

\`\`\`python
orders_after_april_pd = (
    orders[orders["order_date"] >= pd.Timestamp("2026-04-01")]
    [["order_id", "order_date", "customer_id", "net_amount"]]
    .sort_values("order_date")
)

orders_after_april_pd.head()
\`\`\`

SQL과 pandas는 표현 방식은 다르지만 같은 결과를 만들 수 있습니다.

---
`;export{e as default};