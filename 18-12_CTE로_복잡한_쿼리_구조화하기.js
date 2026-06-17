var e=`# 18장. SQL 기반 분석 실습

## 18.12 CTE로 복잡한 쿼리 구조화하기

CTE는 Common Table Expression의 약자입니다. SQL에서 임시 결과를 이름 붙여 사용할 수 있게 해줍니다.

\`\`\`sql
WITH monthly_sales AS (
    SELECT ...
)
SELECT *
FROM monthly_sales;
\`\`\`

복잡한 쿼리를 여러 단계로 나눌 수 있어 가독성이 좋아집니다.

### 18.12.1 CTE 예제: 월별 카테고리 매출 비중

\`\`\`python
query = """
WITH category_monthly_sales AS (
    SELECT
        year_month,
        category,
        SUM(net_amount) AS category_sales
    FROM orders
    GROUP BY
        year_month,
        category
),
monthly_total_sales AS (
    SELECT
        year_month,
        SUM(category_sales) AS monthly_sales
    FROM category_monthly_sales
    GROUP BY year_month
)
SELECT
    c.year_month,
    c.category,
    c.category_sales,
    m.monthly_sales,
    ROUND(c.category_sales / m.monthly_sales * 100, 2) AS category_sales_ratio
FROM category_monthly_sales AS c
LEFT JOIN monthly_total_sales AS m
    ON c.year_month = m.year_month
ORDER BY
    c.year_month,
    c.category_sales DESC
"""

monthly_category_ratio_sql = con.execute(query).df()
monthly_category_ratio_sql
\`\`\`

### 18.12.2 CTE 해석

위 쿼리는 세 단계로 구성되어 있습니다.

\`\`\`text
1. category_monthly_sales:
   월별 카테고리 매출 계산

2. monthly_total_sales:
   월별 총매출 계산

3. 최종 SELECT:
   카테고리 매출을 월별 총매출로 나누어 비중 계산
\`\`\`

pandas에서는 중간 DataFrame을 여러 개 만드는 것과 비슷합니다.

---
`;export{e as default};