var e=`# 18장. SQL 기반 분석 실습

## 18.8 GROUP BY로 매출 집계하기

SQL에서도 pandas의 groupby와 같은 집계를 할 수 있습니다.

### 18.8.1 월별 매출 집계

\`\`\`python
query = """
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY year_month
ORDER BY year_month
"""

sql_monthly_sales = con.execute(query).df()
sql_monthly_sales
\`\`\`

저장합니다.

\`\`\`python
sql_monthly_sales.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_monthly_sales.csv",
    index=False
)
\`\`\`

### 18.8.2 pandas 결과와 비교

\`\`\`python
pandas_monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
    .sort_values("year_month")
)

pandas_monthly_sales
\`\`\`

SQL 결과와 비교합니다.

\`\`\`python
monthly_compare = sql_monthly_sales.merge(
    pandas_monthly_sales,
    on="year_month",
    suffixes=("_sql", "_pandas")
)

monthly_compare["sales_diff"] = (
    monthly_compare["total_sales_sql"] -
    monthly_compare["total_sales_pandas"]
)

monthly_compare
\`\`\`

### 18.8.3 카테고리별 매출 집계

\`\`\`python
query = """
SELECT
    category,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY category
ORDER BY total_sales DESC
"""

sql_category_sales = con.execute(query).df()
sql_category_sales
\`\`\`

저장합니다.

\`\`\`python
sql_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_category_sales.csv",
    index=False
)
\`\`\`

### 18.8.4 지역별 매출 집계

\`\`\`python
query = """
SELECT
    region,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(net_amount) AS avg_order_amount
FROM orders
GROUP BY region
ORDER BY total_sales DESC
"""

sql_region_sales = con.execute(query).df()
sql_region_sales
\`\`\`

저장합니다.

\`\`\`python
sql_region_sales.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_region_sales.csv",
    index=False
)
\`\`\`

### 18.8.5 해석 예시

\`\`\`text
SQL의 GROUP BY는 pandas의 groupby와 같은 역할을 한다.
월별, 카테고리별, 지역별 매출 집계를 SQL로 수행할 수 있다.
COUNT(DISTINCT customer_id)는 고유 고객 수를 계산할 때 사용한다.
\`\`\`

---
`;export{e as default};