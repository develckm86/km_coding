var e=`# 19장. 대용량 데이터 처리 실습

## 19.10 DuckDB로 대용량 CSV 직접 집계

이번에는 pandas로 전체 파일을 읽지 않고 DuckDB로 CSV를 직접 집계합니다.

---

### 19.10.1 DuckDB 연결

\`\`\`python
con = duckdb.connect()
\`\`\`

---

### 19.10.2 월별 매출 DuckDB 집계

\`\`\`python
duckdb_monthly_query = f"""
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM read_csv_auto('{large_csv_path}')
GROUP BY year_month
ORDER BY year_month
"""

start = now()

duckdb_monthly_sales = con.execute(duckdb_monthly_query).df()

duckdb_monthly_elapsed = now() - start

duckdb_monthly_sales.head()
\`\`\`

저장합니다.

\`\`\`python
duckdb_monthly_sales.to_csv(
    DATA_PROCESSED / "chapter_19_duckdb_monthly_sales.csv",
    index=False
)
\`\`\`

---

### 19.10.3 카테고리별 매출 DuckDB 집계

\`\`\`python
duckdb_category_query = f"""
SELECT
    category,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM read_csv_auto('{large_csv_path}')
GROUP BY category
ORDER BY total_sales DESC
"""

start = now()

duckdb_category_sales = con.execute(duckdb_category_query).df()

duckdb_category_elapsed = now() - start

duckdb_category_sales
\`\`\`

저장합니다.

\`\`\`python
duckdb_category_sales.to_csv(
    DATA_PROCESSED / "chapter_19_duckdb_category_sales.csv",
    index=False
)
\`\`\`

---

### 19.10.4 DuckDB 처리 요약표

\`\`\`python
duckdb_processing_summary = pd.DataFrame([
    {
        "task": "duckdb_monthly_sales",
        "elapsed_seconds": round(duckdb_monthly_elapsed, 3),
        "result_rows": len(duckdb_monthly_sales),
        "output_file": "chapter_19_duckdb_monthly_sales.csv"
    },
    {
        "task": "duckdb_category_sales",
        "elapsed_seconds": round(duckdb_category_elapsed, 3),
        "result_rows": len(duckdb_category_sales),
        "output_file": "chapter_19_duckdb_category_sales.csv"
    }
])

duckdb_processing_summary
\`\`\`

저장합니다.

\`\`\`python
duckdb_processing_summary.to_csv(
    OUTPUT_TABLES / "chapter_19_duckdb_processing_summary.csv",
    index=False
)
\`\`\`

---

### 19.10.5 DuckDB 쿼리 저장

\`\`\`python
duckdb_queries = f"""
-- 19장 대용량 데이터 처리 실습 DuckDB 쿼리

-- 1. 월별 매출 집계
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM read_csv_auto('{large_csv_path}')
GROUP BY year_month
ORDER BY year_month;

-- 2. 카테고리별 매출 집계
SELECT
    category,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM read_csv_auto('{large_csv_path}')
GROUP BY category
ORDER BY total_sales DESC;

-- 3. 채널별 매출 집계
SELECT
    channel,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM read_csv_auto('{large_csv_path}')
GROUP BY channel
ORDER BY total_sales DESC;
"""
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_QUERIES / "chapter_19_large_data_duckdb_queries.sql").write_text(
    duckdb_queries,
    encoding="utf-8"
)
\`\`\`

---

### 19.10.6 해석 예시

\`\`\`text
DuckDB를 사용하면 대용량 CSV를 pandas로 모두 읽지 않고도 SQL로 집계할 수 있다.
특히 월별 매출, 카테고리별 매출처럼 집계 결과만 필요한 경우 효율적이다.
분석 결과를 pandas DataFrame으로 가져와 후속 시각화와 리포트에 사용할 수 있다.
\`\`\`

---
`;export{e as default};