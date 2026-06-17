var e=`# 19장. 대용량 데이터 처리 실습

## 19.19 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 19.19.1 필요한 컬럼만 읽기

\`\`\`python
usecols = ["order_id", "order_date", "year_month", "category", "customer_id", "net_amount"]

df = pd.read_csv(
    "large_orders.csv",
    usecols=usecols
)
\`\`\`

---

### 19.19.2 자료형 최적화

\`\`\`python
df["order_id"] = pd.to_numeric(df["order_id"], downcast="integer")
df["customer_id"] = pd.to_numeric(df["customer_id"], downcast="integer")
df["net_amount"] = pd.to_numeric(df["net_amount"], downcast="integer")
df["category"] = df["category"].astype("category")
df["year_month"] = df["year_month"].astype("category")
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
\`\`\`

---

### 19.19.3 chunk 월별 매출 집계

\`\`\`python
results = []

for chunk in pd.read_csv(
    "large_orders.csv",
    usecols=["year_month", "net_amount"],
    chunksize=50_000
):
    chunk_result = (
        chunk
        .groupby("year_month")
        .agg(total_sales=("net_amount", "sum"))
        .reset_index()
    )

    results.append(chunk_result)

monthly_sales = (
    pd.concat(results, ignore_index=True)
    .groupby("year_month")
    .agg(total_sales=("total_sales", "sum"))
    .reset_index()
)
\`\`\`

---

### 19.19.4 DuckDB 월별 매출 집계

\`\`\`python
query = """
SELECT
    year_month,
    SUM(net_amount) AS total_sales,
    COUNT(DISTINCT order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM read_csv_auto('large_orders.csv')
GROUP BY year_month
ORDER BY year_month
"""

duckdb_monthly_sales = duckdb.connect().execute(query).df()
\`\`\`

---

### 19.19.5 Parquet 저장

\`\`\`python
df.to_parquet(
    "large_orders.parquet",
    index=False
)
\`\`\`

---
`;export{e as default};