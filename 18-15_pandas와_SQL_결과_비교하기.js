var e=`# 18장. SQL 기반 분석 실습

## 18.15 pandas와 SQL 결과 비교하기

분석 결과가 맞는지 확인하기 위해 pandas 결과와 SQL 결과를 비교합니다.

### 18.15.1 월별 매출 비교

\`\`\`python
pandas_sql_comparison = sql_monthly_sales.merge(
    pandas_monthly_sales,
    on="year_month",
    suffixes=("_sql", "_pandas")
)

pandas_sql_comparison["total_sales_diff"] = (
    pandas_sql_comparison["total_sales_sql"] -
    pandas_sql_comparison["total_sales_pandas"]
)

pandas_sql_comparison["order_count_diff"] = (
    pandas_sql_comparison["order_count_sql"] -
    pandas_sql_comparison["order_count_pandas"]
)

pandas_sql_comparison["customer_count_diff"] = (
    pandas_sql_comparison["unique_customers_sql"] -
    pandas_sql_comparison["unique_customers_pandas"]
)

pandas_sql_comparison
\`\`\`

저장합니다.

\`\`\`python
pandas_sql_comparison.to_csv(
    OUTPUT_TABLES / "chapter_18_pandas_sql_comparison.csv",
    index=False
)
\`\`\`

### 18.15.2 검증 기준

비교 결과에서 차이가 0이면 같은 결과입니다.

\`\`\`text
total_sales_diff = 0
order_count_diff = 0
customer_count_diff = 0
\`\`\`

차이가 발생한다면 다음을 확인해야 합니다.

\`\`\`text
필터 조건이 같은가?
집계 기준이 같은가?
고유 개수 기준이 같은가?
날짜 변환 방식이 같은가?
결측치 처리 방식이 같은가?
JOIN 방식이 같은가?
\`\`\`

---
`;export{e as default};