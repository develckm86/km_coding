var e=`# 18장. SQL 기반 분석 실습

## 18.14 윈도우 함수로 누적 매출 계산하기

이번에는 SQL로 월별 누적 매출을 계산합니다.

### 18.14.1 월별 누적 매출

\`\`\`python
query = """
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
ORDER BY year_month
"""

sql_monthly_cumulative_sales = con.execute(query).df()
sql_monthly_cumulative_sales
\`\`\`

### 18.14.2 전월 대비 증감액

\`\`\`python
query = """
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
    LAG(total_sales) OVER (
        ORDER BY year_month
    ) AS previous_month_sales,
    total_sales - LAG(total_sales) OVER (
        ORDER BY year_month
    ) AS sales_diff
FROM monthly_sales
ORDER BY year_month
"""

sql_monthly_diff = con.execute(query).df()
sql_monthly_diff
\`\`\`

### 18.14.3 해석 예시

\`\`\`text
SQL의 윈도우 함수는 누적 매출과 전월 대비 변화량을 계산할 때 유용하다.
SUM() OVER는 누적 합계를 만들 수 있고, LAG()는 이전 행의 값을 가져올 수 있다.
pandas의 cumsum(), shift()와 비슷한 역할을 SQL에서 수행할 수 있다.
\`\`\`

---
`;export{e as default};