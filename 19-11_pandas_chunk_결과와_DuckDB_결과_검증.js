var e=`# 19장. 대용량 데이터 처리 실습

## 19.11 pandas chunk 결과와 DuckDB 결과 검증

대용량 처리에서는 결과 검증이 중요합니다.

이번에는 chunk 방식으로 계산한 월별 매출과 DuckDB로 계산한 월별 매출을 비교합니다.

---

### 19.11.1 월별 매출 결과 비교

\`\`\`python
validation_monthly = monthly_sales_from_chunks.merge(
    duckdb_monthly_sales,
    on="year_month",
    suffixes=("_chunk", "_duckdb")
)

validation_monthly["total_sales_diff"] = (
    validation_monthly["total_sales_chunk"] -
    validation_monthly["total_sales_duckdb"]
)

validation_monthly["order_count_diff"] = (
    validation_monthly["order_count_chunk"] -
    validation_monthly["order_count_duckdb"]
)

validation_monthly["unique_customers_diff"] = (
    validation_monthly["unique_customers_chunk"] -
    validation_monthly["unique_customers_duckdb"]
)

validation_monthly.head()
\`\`\`

---

### 19.11.2 검증 결과 요약

\`\`\`python
pandas_duckdb_validation = pd.DataFrame([
    {
        "check_name": "monthly_total_sales_diff_sum",
        "check_result": validation_monthly["total_sales_diff"].abs().sum(),
        "expected": 0,
        "status": "PASS" if validation_monthly["total_sales_diff"].abs().sum() == 0 else "FAIL"
    },
    {
        "check_name": "monthly_order_count_diff_sum",
        "check_result": validation_monthly["order_count_diff"].abs().sum(),
        "expected": 0,
        "status": "PASS" if validation_monthly["order_count_diff"].abs().sum() == 0 else "FAIL"
    },
    {
        "check_name": "monthly_unique_customers_diff_sum",
        "check_result": validation_monthly["unique_customers_diff"].abs().sum(),
        "expected": 0,
        "status": "PASS" if validation_monthly["unique_customers_diff"].abs().sum() == 0 else "FAIL"
    }
])

pandas_duckdb_validation
\`\`\`

저장합니다.

\`\`\`python
pandas_duckdb_validation.to_csv(
    OUTPUT_TABLES / "chapter_19_pandas_duckdb_validation.csv",
    index=False
)
\`\`\`

---

### 19.11.3 해석 예시

\`\`\`text
대용량 처리 방식이 달라도 결과는 일관되어야 한다.
chunk 방식과 DuckDB 방식의 월별 매출 결과가 같으면 처리 로직이 일치한다고 볼 수 있다.
고유 고객 수는 chunk 방식에서 중복 제거 기준을 잘못 잡으면 DuckDB 결과와 차이가 날 수 있다.
\`\`\`

---
`;export{e as default};