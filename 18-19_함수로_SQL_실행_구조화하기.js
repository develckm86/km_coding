var e=`# 18장. SQL 기반 분석 실습

## 18.19 함수로 SQL 실행 구조화하기

반복해서 SQL을 실행하고 결과를 저장하려면 함수로 만들면 좋습니다.

### 18.19.1 SQL 실행 함수

\`\`\`python
def run_sql(query: str) -> pd.DataFrame:
    return con.execute(query).df()
\`\`\`

사용 예:

\`\`\`python
result = run_sql("""
SELECT category, SUM(net_amount) AS total_sales
FROM orders
GROUP BY category
""")

result
\`\`\`

### 18.19.2 SQL 결과 저장 함수

\`\`\`python
def run_sql_and_save(query: str, output_path: Path) -> pd.DataFrame:
    result = con.execute(query).df()
    result.to_csv(output_path, index=False)
    return result
\`\`\`

### 18.19.3 SQL 파일 저장 함수

\`\`\`python
def save_sql_query(query: str, file_name: str) -> None:
    (OUTPUT_QUERIES / file_name).write_text(
        query,
        encoding="utf-8"
    )
\`\`\`

### 18.19.4 함수화의 장점

\`\`\`text
SQL 실행 방식이 일관된다.
결과 저장 실수를 줄일 수 있다.
자동 리포트 생성에 활용할 수 있다.
쿼리 파일을 분석 자산으로 관리하기 쉽다.
\`\`\`

---
`;export{e as default};