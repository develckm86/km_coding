var e=`# 18장. SQL 기반 분석 실습

## 18.0 들어가며

17장에서는 고급 시각화 리포트를 만들었습니다. 월별 매출, 카테고리별 매출, RFM 세그먼트, 코호트 리텐션, 퍼널 분석, A/B 테스트, 회귀분석 결과를 그래프로 정리하고 Executive Summary 리포트까지 작성했습니다.

지금까지 대부분의 분석은 pandas를 중심으로 진행했습니다. 예를 들어 월별 매출을 계산할 때 다음과 같은 코드를 사용했습니다.

\`\`\`python
monthly_sales = (
    orders_mart
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique")
    )
    .reset_index()
)
\`\`\`

pandas는 매우 강력한 분석 도구입니다. 하지만 실무 데이터 분석에서는 SQL도 매우 중요합니다. 많은 회사의 데이터는 데이터베이스나 데이터웨어하우스에 저장되어 있습니다.

실무 분석가는 데이터를 매번 CSV로 내려받아 pandas로만 분석하지 않습니다. 대부분의 경우 SQL로 데이터를 조회하고, 필요한 집계를 만든 뒤, pandas로 후속 분석이나 시각화를 수행합니다.

이번 장에서는 **DuckDB**를 사용해 SQL 기반 분석을 실습합니다. DuckDB는 로컬 파일을 SQL로 분석할 수 있는 분석용 데이터베이스입니다. CSV, Parquet 같은 파일을 별도 서버 없이 SQL로 조회할 수 있어 수업과 실습에 적합합니다.

이번 장의 핵심 질문은 다음과 같습니다.

\`\`\`text
pandas로 하던 분석을 SQL로 어떻게 표현할 수 있는가?
SQL 결과와 pandas 결과가 같은지 어떻게 검증하는가?
SQL 쿼리를 분석 자산으로 어떻게 저장하고 관리하는가?
\`\`\`

이번 장을 마치면 pandas와 SQL을 함께 사용하는 분석 흐름을 만들 수 있습니다.

---
`;export{e as default};