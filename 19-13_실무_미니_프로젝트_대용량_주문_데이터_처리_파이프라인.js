var e=`# 19장. 대용량 데이터 처리 실습

## 19.13 실무 미니 프로젝트: 대용량 주문 데이터 처리 파이프라인

이번 장에서 배운 내용을 하나의 실무 흐름으로 정리합니다.

---

### 19.13.1 프로젝트 목표

\`\`\`text
대용량 주문 CSV를 효율적으로 읽고,
자료형을 최적화하며,
chunk 방식과 DuckDB 방식으로 월별·카테고리별 매출을 집계하고,
결과를 검증한 뒤 보고서를 작성한다.
\`\`\`

---

### 19.13.2 Step 1. 대용량 CSV 샘플 확인

\`\`\`python
sample = pd.read_csv(
    large_csv_path,
    nrows=1000
)

sample.head()
\`\`\`

---

### 19.13.3 Step 2. 필요한 컬럼만 읽기

\`\`\`python
usecols = ["order_id", "order_date", "year_month", "category", "customer_id", "net_amount"]

orders_selected = pd.read_csv(
    large_csv_path,
    usecols=usecols
)
\`\`\`

---

### 19.13.4 Step 3. 자료형 최적화

\`\`\`python
orders_selected["order_id"] = pd.to_numeric(
    orders_selected["order_id"],
    downcast="integer"
)

orders_selected["customer_id"] = pd.to_numeric(
    orders_selected["customer_id"],
    downcast="integer"
)

orders_selected["net_amount"] = pd.to_numeric(
    orders_selected["net_amount"],
    downcast="integer"
)

orders_selected["category"] = orders_selected["category"].astype("category")
orders_selected["year_month"] = orders_selected["year_month"].astype("category")
\`\`\`

---

### 19.13.5 Step 4. chunk 집계

\`\`\`python
monthly_results = []

for chunk in pd.read_csv(
    large_csv_path,
    usecols=["year_month", "net_amount"],
    chunksize=50_000
):
    monthly_results.append(
        chunk.groupby("year_month")["net_amount"].sum().reset_index()
    )

monthly_sales = (
    pd.concat(monthly_results)
    .groupby("year_month")["net_amount"]
    .sum()
    .reset_index()
)
\`\`\`

---

### 19.13.6 Step 5. DuckDB 집계

\`\`\`python
query = f"""
SELECT
    year_month,
    SUM(net_amount) AS total_sales
FROM read_csv_auto('{large_csv_path}')
GROUP BY year_month
ORDER BY year_month
"""

duckdb_monthly_sales = duckdb.connect().execute(query).df()
\`\`\`

---

### 19.13.7 Step 6. Parquet 저장

\`\`\`python
orders_selected.to_parquet(
    DATA_PROCESSED / "orders_selected.parquet",
    index=False
)
\`\`\`

---

### 19.13.8 Step 7. 검증과 보고

\`\`\`text
pandas chunk 결과와 DuckDB 결과를 비교한다.
차이가 있으면 집계 기준과 중복 제거 기준을 확인한다.
처리 시간, 메모리 사용량, 파일 크기 비교 결과를 보고서에 기록한다.
\`\`\`

---
`;export{e as default};