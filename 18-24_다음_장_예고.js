var e=`# 18장. SQL 기반 분석 실습

## 18.24 다음 장 예고

다음 장에서는 **대용량 데이터 처리 실습**을 진행합니다.

지금까지는 비교적 작은 데이터로 분석했습니다. 하지만 실무에서는 데이터가 수십만 행, 수백만 행, 수천만 행으로 커질 수 있습니다.

대용량 데이터에서는 다음 문제가 발생할 수 있습니다.

\`\`\`text
CSV 파일을 읽는 데 시간이 오래 걸린다.
메모리 부족이 발생한다.
중간 결과 파일이 너무 커진다.
groupby 처리 시간이 길어진다.
엑셀로 열 수 없는 크기의 데이터가 생긴다.
\`\`\`

19장에서는 이런 문제를 다룹니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
대용량 CSV 읽기
필요한 컬럼만 읽기
자료형 최적화
chunk 단위 처리
Parquet 파일 저장
DuckDB로 대용량 CSV 집계
메모리 사용량 비교
대용량 분석 결과 저장
대용량 처리 보고서 작성
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
large_data_processing_report.md
large_monthly_sales.csv
large_category_sales.csv
orders_optimized.parquet
\`\`\`

SQL 기반 분석이 데이터 조회와 집계를 데이터베이스 방식으로 수행하는 방법이었다면, 대용량 데이터 처리는 데이터가 커졌을 때 분석 파이프라인을 안정적으로 만드는 방법입니다.

---

## 참고 문서

- DuckDB 공식 문서: Python API
- DuckDB 공식 문서: SQL Introduction
- DuckDB 공식 문서: CSV Import
- DuckDB 공식 문서: Window Functions
- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: Comparison with SQL
`;export{e as default};