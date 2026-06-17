var e=`# 18장. SQL 기반 분석 실습

## 18.17 SQL 분석 결과 요약표 만들기

이번 장에서 만든 결과물을 요약합니다.

\`\`\`python
sql_output_summary = pd.DataFrame([
    {
        "output_name": "orders_sql_base",
        "file_name": "chapter_18_orders_sql_base.csv",
        "description": "SQL 실습용 주문 데이터"
    },
    {
        "output_name": "customers_sql_base",
        "file_name": "chapter_18_customers_sql_base.csv",
        "description": "SQL 실습용 고객 데이터"
    },
    {
        "output_name": "products_sql_base",
        "file_name": "chapter_18_products_sql_base.csv",
        "description": "SQL 실습용 상품 데이터"
    },
    {
        "output_name": "sql_monthly_sales",
        "file_name": "chapter_18_sql_monthly_sales.csv",
        "description": "SQL로 계산한 월별 매출"
    },
    {
        "output_name": "sql_category_sales",
        "file_name": "chapter_18_sql_category_sales.csv",
        "description": "SQL로 계산한 카테고리별 매출"
    },
    {
        "output_name": "sql_region_sales",
        "file_name": "chapter_18_sql_region_sales.csv",
        "description": "SQL로 계산한 지역별 매출"
    },
    {
        "output_name": "sql_customer_summary",
        "file_name": "chapter_18_sql_customer_summary.csv",
        "description": "SQL로 계산한 고객별 구매 요약"
    },
    {
        "output_name": "sql_product_rank",
        "file_name": "chapter_18_sql_product_rank.csv",
        "description": "SQL 윈도우 함수로 계산한 상품 순위"
    },
    {
        "output_name": "sql_customer_rank",
        "file_name": "chapter_18_sql_customer_rank.csv",
        "description": "SQL 윈도우 함수로 계산한 고객 순위"
    },
    {
        "output_name": "pandas_sql_comparison",
        "file_name": "chapter_18_pandas_sql_comparison.csv",
        "description": "pandas 결과와 SQL 결과 비교"
    },
    {
        "output_name": "sql_analysis_report",
        "file_name": "chapter_18_sql_analysis_report.md",
        "description": "SQL 기반 분석 보고서"
    }
])

sql_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_18_sql_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};