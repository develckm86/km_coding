var e=`# 18장. SQL 기반 분석 실습

## 18.9 CASE WHEN으로 조건 분류하기

SQL의 \`CASE WHEN\`은 pandas의 \`np.where()\` 또는 \`loc\` 조건 처리와 비슷합니다.

### 18.9.1 주문 금액 구간 만들기

\`\`\`python
query = """
SELECT
    order_id,
    net_amount,
    CASE
        WHEN net_amount >= 200000 THEN '고액 주문'
        WHEN net_amount >= 50000 THEN '중간 주문'
        ELSE '소액 주문'
    END AS amount_segment
FROM orders
ORDER BY net_amount DESC
"""

amount_segment_orders = con.execute(query).df()
amount_segment_orders.head()
\`\`\`

### 18.9.2 금액 구간별 매출 집계

\`\`\`python
query = """
SELECT
    CASE
        WHEN net_amount >= 200000 THEN '고액 주문'
        WHEN net_amount >= 50000 THEN '중간 주문'
        ELSE '소액 주문'
    END AS amount_segment,
    COUNT(DISTINCT order_id) AS order_count,
    SUM(net_amount) AS total_sales,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY amount_segment
ORDER BY total_sales DESC
"""

amount_segment_summary = con.execute(query).df()
amount_segment_summary
\`\`\`

### 18.9.3 쿠폰 사용 여부 분류

\`\`\`python
query = """
SELECT
    CASE
        WHEN coupon_amount > 0 THEN '쿠폰 사용'
        ELSE '쿠폰 미사용'
    END AS coupon_segment,
    COUNT(DISTINCT order_id) AS order_count,
    SUM(net_amount) AS total_sales,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY coupon_segment
ORDER BY total_sales DESC
"""

coupon_segment_summary = con.execute(query).df()
coupon_segment_summary
\`\`\`

### 18.9.4 해석 예시

\`\`\`text
CASE WHEN은 SQL에서 조건에 따라 새로운 분류 컬럼을 만들 때 사용한다.
주문 금액 구간, 쿠폰 사용 여부, 고객 가치 구간 같은 파생 변수를 SQL에서 만들 수 있다.
\`\`\`

---
`;export{e as default};