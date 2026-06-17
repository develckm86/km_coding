var e=`# 18장. SQL 기반 분석 실습

## 18.2 SQL이 필요한 이유

pandas만으로도 많은 분석을 할 수 있습니다. 하지만 실무에서는 SQL이 필요한 경우가 많습니다.

### 18.2.1 데이터가 데이터베이스에 있는 경우

회사 데이터는 보통 데이터베이스에 저장되어 있습니다.

예를 들어 다음 테이블이 있다고 합시다.

\`\`\`text
orders
customers
products
events
payments
campaigns
\`\`\`

이 데이터를 분석하려면 먼저 SQL로 필요한 데이터를 조회해야 합니다.

\`\`\`sql
SELECT
    order_id,
    order_date,
    customer_id,
    product_id,
    net_amount
FROM orders
WHERE order_date >= DATE '2026-01-01';
\`\`\`

그 후 결과를 pandas로 가져와 추가 분석이나 시각화를 할 수 있습니다.

### 18.2.2 대용량 데이터에서는 SQL이 유리한 경우가 많다

pandas는 메모리에 데이터를 올려서 처리합니다. 데이터가 너무 크면 메모리 문제가 발생할 수 있습니다.

SQL 데이터베이스는 대용량 데이터 조회와 집계에 최적화된 경우가 많습니다. 예를 들어 1억 건 주문 데이터에서 월별 매출만 필요하다면 전체 데이터를 pandas로 내려받는 것보다 SQL에서 먼저 집계하는 것이 효율적입니다.

\`\`\`sql
SELECT
    DATE_TRUNC('month', order_date) AS order_month,
    SUM(net_amount) AS total_sales
FROM orders
GROUP BY 1
ORDER BY 1;
\`\`\`

### 18.2.3 SQL은 분석 기준을 공유하기 좋다

SQL 쿼리는 분석 기준을 명확히 남기는 문서 역할도 합니다.

\`\`\`sql
SELECT
    category,
    SUM(net_amount) AS total_sales
FROM orders_mart
WHERE is_cancelled = FALSE
GROUP BY category;
\`\`\`

이 쿼리에는 다음 기준이 들어 있습니다.

\`\`\`text
취소 주문 제외
카테고리 기준 집계
순매출 합계 사용
\`\`\`

SQL 파일을 저장하면 분석 기준을 팀원과 공유하기 쉽습니다.

### 18.2.4 pandas와 SQL은 함께 사용한다

pandas와 SQL은 경쟁 관계가 아닙니다. 실무에서는 보통 다음 흐름을 사용합니다.

\`\`\`text
SQL로 필요한 데이터를 조회하고 집계한다.
pandas로 결과를 검증하고 추가 가공한다.
matplotlib으로 시각화한다.
Markdown이나 대시보드로 보고한다.
\`\`\`

---
`;export{e as default};