var e=`# 19장. 대용량 데이터 처리 실습

## 19.8 chunk 단위 처리

이제 전체 파일을 한 번에 읽지 않고 chunk 단위로 집계합니다.

목표는 다음 두 결과를 만드는 것입니다.

\`\`\`text
월별 매출
카테고리별 매출
\`\`\`

---

### 19.8.1 chunk 크기 설정

\`\`\`python
CHUNK_SIZE = 50_000
\`\`\`

chunk 크기는 환경에 따라 조정할 수 있습니다.

\`\`\`text
메모리가 부족하면 chunk 크기를 줄인다.
처리 속도를 높이고 싶으면 메모리 한도 안에서 chunk 크기를 늘린다.
\`\`\`

---

### 19.8.2 chunk로 월별 매출 집계

\`\`\`python
monthly_results = []

start = now()

for chunk in pd.read_csv(
    large_csv_path,
    usecols=["year_month", "net_amount", "order_id", "customer_id"],
    chunksize=CHUNK_SIZE
):
    monthly_chunk = (
        chunk
        .groupby("year_month")
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "nunique"),
            unique_customers=("customer_id", "nunique")
        )
        .reset_index()
    )

    monthly_results.append(monthly_chunk)

chunk_monthly_elapsed = now() - start
\`\`\`

---

### 19.8.3 chunk 결과 합치기

chunk별 결과를 다시 합칩니다.

\`\`\`python
monthly_from_chunks = pd.concat(monthly_results, ignore_index=True)

monthly_sales_from_chunks = (
    monthly_from_chunks
    .groupby("year_month")
    .agg(
        total_sales=("total_sales", "sum"),
        order_count=("order_count", "sum"),
        unique_customers=("unique_customers", "sum")
    )
    .reset_index()
    .sort_values("year_month")
)

monthly_sales_from_chunks.head()
\`\`\`

주의할 점이 있습니다.

\`unique_customers\`를 chunk별로 고유 고객 수를 센 뒤 더하면 같은 고객이 여러 chunk에 있을 때 중복 계산될 수 있습니다.

정확한 고유 고객 수가 필요하면 고객 ID를 별도로 모으거나 DuckDB를 사용하는 것이 더 안전합니다.

따라서 위 방식은 \`total_sales\`와 \`order_count\`에는 적합하지만, 전체 고유 고객 수에는 주의해야 합니다.

정확한 월별 고유 고객 수를 chunk로 계산하려면 월별 고객 ID 쌍을 모은 뒤 중복 제거해야 합니다.

---

### 19.8.4 정확한 월별 고유 고객 수 계산

\`\`\`python
monthly_customer_pairs = []

for chunk in pd.read_csv(
    large_csv_path,
    usecols=["year_month", "customer_id"],
    chunksize=CHUNK_SIZE
):
    pairs = chunk[["year_month", "customer_id"]].drop_duplicates()
    monthly_customer_pairs.append(pairs)

monthly_customer_pairs_df = pd.concat(monthly_customer_pairs, ignore_index=True)

monthly_unique_customers = (
    monthly_customer_pairs_df
    .drop_duplicates()
    .groupby("year_month")
    .agg(unique_customers=("customer_id", "nunique"))
    .reset_index()
)

monthly_unique_customers.head()
\`\`\`

월별 매출 결과에 정확한 고객 수를 붙입니다.

\`\`\`python
monthly_sales_from_chunks = monthly_sales_from_chunks.drop(columns=["unique_customers"])

monthly_sales_from_chunks = monthly_sales_from_chunks.merge(
    monthly_unique_customers,
    on="year_month",
    how="left"
)

monthly_sales_from_chunks.head()
\`\`\`

저장합니다.

\`\`\`python
monthly_sales_from_chunks.to_csv(
    DATA_PROCESSED / "chapter_19_monthly_sales_from_chunks.csv",
    index=False
)
\`\`\`

---

### 19.8.5 chunk로 카테고리별 매출 집계

\`\`\`python
category_results = []

start = now()

for chunk in pd.read_csv(
    large_csv_path,
    usecols=["category", "net_amount", "order_id"],
    chunksize=CHUNK_SIZE
):
    category_chunk = (
        chunk
        .groupby("category")
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "nunique")
        )
        .reset_index()
    )

    category_results.append(category_chunk)

chunk_category_elapsed = now() - start

category_from_chunks = pd.concat(category_results, ignore_index=True)

category_sales_from_chunks = (
    category_from_chunks
    .groupby("category")
    .agg(
        total_sales=("total_sales", "sum"),
        order_count=("order_count", "sum")
    )
    .reset_index()
    .sort_values("total_sales", ascending=False)
)

category_sales_from_chunks
\`\`\`

저장합니다.

\`\`\`python
category_sales_from_chunks.to_csv(
    DATA_PROCESSED / "chapter_19_category_sales_from_chunks.csv",
    index=False
)
\`\`\`

---

### 19.8.6 chunk 처리 요약표

\`\`\`python
chunk_processing_summary = pd.DataFrame([
    {
        "task": "monthly_sales_from_chunks",
        "chunksize": CHUNK_SIZE,
        "elapsed_seconds": round(chunk_monthly_elapsed, 3),
        "result_rows": len(monthly_sales_from_chunks),
        "output_file": "chapter_19_monthly_sales_from_chunks.csv"
    },
    {
        "task": "category_sales_from_chunks",
        "chunksize": CHUNK_SIZE,
        "elapsed_seconds": round(chunk_category_elapsed, 3),
        "result_rows": len(category_sales_from_chunks),
        "output_file": "chapter_19_category_sales_from_chunks.csv"
    }
])

chunk_processing_summary
\`\`\`

저장합니다.

\`\`\`python
chunk_processing_summary.to_csv(
    OUTPUT_TABLES / "chapter_19_chunk_processing_summary.csv",
    index=False
)
\`\`\`

---

### 19.8.7 해석 예시

\`\`\`text
chunk 처리는 전체 파일을 메모리에 한 번에 올리지 않고 나누어 처리하는 방식이다.
합계나 주문 수처럼 단순히 더할 수 있는 지표는 chunk별 집계 후 다시 합치기 쉽다.
하지만 고유 고객 수처럼 중복 제거가 필요한 지표는 chunk 간 중복을 고려해야 한다.
\`\`\`

---
`;export{e as default};