var e=`# 19장. 대용량 데이터 처리 실습

## 19.16 함수로 대용량 처리 구조화하기

반복되는 대용량 처리 작업은 함수로 만들 수 있습니다.

---

### 19.16.1 메모리 사용량 함수

\`\`\`python
def get_memory_summary(df: pd.DataFrame, label: str) -> dict:
    return {
        "label": label,
        "rows": len(df),
        "columns": len(df.columns),
        "memory_mb": round(dataframe_memory_mb(df), 2)
    }
\`\`\`

---

### 19.16.2 chunk 집계 함수

\`\`\`python
def aggregate_csv_by_chunks(
    csv_path: Path,
    group_col: str,
    value_col: str,
    chunksize: int = 50_000
) -> pd.DataFrame:
    results = []

    for chunk in pd.read_csv(
        csv_path,
        usecols=[group_col, value_col],
        chunksize=chunksize
    ):
        chunk_result = (
            chunk
            .groupby(group_col)
            .agg(total_value=(value_col, "sum"))
            .reset_index()
        )

        results.append(chunk_result)

    final_result = (
        pd.concat(results, ignore_index=True)
        .groupby(group_col)
        .agg(total_value=("total_value", "sum"))
        .reset_index()
    )

    return final_result
\`\`\`

사용 예:

\`\`\`python
monthly_sales_func = aggregate_csv_by_chunks(
    csv_path=large_csv_path,
    group_col="year_month",
    value_col="net_amount",
    chunksize=50_000
)

monthly_sales_func.head()
\`\`\`

---

### 19.16.3 DuckDB 집계 함수

\`\`\`python
def duckdb_groupby_sum(
    csv_path: Path,
    group_col: str,
    value_col: str
) -> pd.DataFrame:
    query = f"""
    SELECT
        {group_col},
        SUM({value_col}) AS total_value
    FROM read_csv_auto('{csv_path}')
    GROUP BY {group_col}
    ORDER BY {group_col}
    """

    return duckdb.connect().execute(query).df()
\`\`\`

---

### 19.16.4 함수화의 장점

\`\`\`text
대용량 처리 로직을 반복 사용할 수 있다.
월별, 카테고리별, 채널별 집계 함수를 공통화할 수 있다.
보고서 자동화에 활용할 수 있다.
처리 기준을 코드로 명확히 남길 수 있다.
\`\`\`

---
`;export{e as default};