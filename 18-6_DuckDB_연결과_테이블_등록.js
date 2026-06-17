var e=`# 18장. SQL 기반 분석 실습

## 18.6 DuckDB 연결과 테이블 등록

DuckDB에서 pandas DataFrame이나 CSV 파일을 SQL 테이블처럼 사용할 수 있습니다.

### 18.6.1 DuckDB 연결

\`\`\`python
con = duckdb.connect()
\`\`\`

### 18.6.2 DataFrame 등록

\`\`\`python
con.register("orders", orders)
con.register("customers", customers)
con.register("products", products)
\`\`\`

이제 SQL에서 \`orders\`, \`customers\`, \`products\`라는 테이블 이름으로 사용할 수 있습니다.

### 18.6.3 간단한 조회

\`\`\`python
query = """
SELECT *
FROM orders
LIMIT 5
"""

con.execute(query).df()
\`\`\`

\`con.execute(query).df()\`를 사용하면 SQL 결과를 pandas DataFrame으로 가져올 수 있습니다.

### 18.6.4 CSV 파일을 직접 조회하는 방법

DuckDB는 CSV 파일을 직접 SQL로 읽을 수도 있습니다.

\`\`\`python
orders_csv_path = DATA_PROCESSED / "chapter_18_orders_sql_base.csv"

query = f"""
SELECT *
FROM read_csv_auto('{orders_csv_path}')
LIMIT 5
"""

con.execute(query).df()
\`\`\`

이번 장에서는 편의를 위해 DataFrame을 등록해서 사용합니다.

---
`;export{e as default};