var e=`# 18장. SQL 기반 분석 실습

## 18.20 이번 장에서 자주 하는 실수

SQL 기반 분석에서 자주 하는 실수를 정리합니다.

### 18.20.1 COUNT와 COUNT DISTINCT를 혼동하는 실수

주문 수는 보통 고유 주문 ID 기준입니다.

\`\`\`sql
COUNT(DISTINCT order_id)
\`\`\`

그냥 \`COUNT(*)\`를 사용하면 행 수를 세게 됩니다. JOIN 이후 행이 중복되면 주문 수가 부풀려질 수 있습니다.

### 18.20.2 JOIN 후 행 수를 확인하지 않는 실수

JOIN 후에는 반드시 행 수와 NULL 값을 확인해야 합니다.

\`\`\`sql
SELECT
    COUNT(*) AS total_rows,
    SUM(CASE WHEN customer_name IS NULL THEN 1 ELSE 0 END) AS missing_customer_rows
FROM joined_table;
\`\`\`

### 18.20.3 WHERE 조건을 빠뜨리는 실수

취소 주문, 테스트 주문, 환불 주문을 제외해야 하는데 WHERE 조건을 빠뜨리면 매출이 잘못 계산됩니다.

\`\`\`sql
WHERE is_cancelled = FALSE
\`\`\`

이번 실습 데이터에는 취소 여부 컬럼이 없지만, 실무에서는 반드시 확인해야 합니다.

### 18.20.4 날짜를 문자열처럼 비교하는 실수

날짜는 날짜형으로 처리해야 합니다.

\`\`\`sql
WHERE order_date >= DATE '2026-04-01'
\`\`\`

문자열 날짜가 섞여 있거나 형식이 다르면 잘못된 결과가 나올 수 있습니다.

### 18.20.5 GROUP BY에 필요한 컬럼을 빠뜨리는 실수

SQL에서는 SELECT에 있는 일반 컬럼은 GROUP BY에 포함해야 합니다.

나쁜 예:

\`\`\`sql
SELECT category, product_id, SUM(net_amount)
FROM orders
GROUP BY category;
\`\`\`

좋은 예:

\`\`\`sql
SELECT category, product_id, SUM(net_amount)
FROM orders
GROUP BY category, product_id;
\`\`\`

### 18.20.6 SQL과 pandas 결과가 다른데 검증하지 않는 실수

같은 분석을 SQL과 pandas로 수행했는데 결과가 다르다면 반드시 원인을 찾아야 합니다.

확인할 것:

\`\`\`text
필터 조건
결측치 처리
중복 처리
JOIN 방식
집계 단위
날짜 처리
\`\`\`

### 18.20.7 쿼리를 파일로 저장하지 않는 실수

노트북 셀에만 SQL이 남아 있으면 재사용과 검토가 어렵습니다.

중요한 쿼리는 \`.sql\` 파일로 저장하는 것이 좋습니다.

---
`;export{e as default};