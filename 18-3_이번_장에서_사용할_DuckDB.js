var e=`# 18장. SQL 기반 분석 실습

## 18.3 이번 장에서 사용할 DuckDB

이번 장에서는 DuckDB를 사용합니다. DuckDB는 로컬에서 실행할 수 있는 분석용 SQL 엔진입니다. 서버를 따로 설치하지 않고도 CSV나 Parquet 파일을 SQL로 조회할 수 있습니다.

### 18.3.1 DuckDB의 장점

\`\`\`text
설치가 간단하다.
별도 서버가 필요 없다.
CSV 파일을 바로 SQL로 조회할 수 있다.
pandas DataFrame과 쉽게 연동된다.
분석용 SQL 기능을 지원한다.
윈도우 함수도 사용할 수 있다.
\`\`\`

### 18.3.2 DuckDB 설치

실습 환경에 DuckDB가 없다면 다음 명령으로 설치합니다.

\`\`\`python
# pip install duckdb
\`\`\`

설치 후 Python에서 불러옵니다.

\`\`\`python
import duckdb
\`\`\`

### 18.3.3 DuckDB 연결

\`\`\`python
import duckdb

con = duckdb.connect()
\`\`\`

파일 기반으로 저장하려면 다음처럼 사용할 수 있습니다.

\`\`\`python
con = duckdb.connect("analysis.duckdb")
\`\`\`

---
`;export{e as default};