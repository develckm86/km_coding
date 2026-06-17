var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-17 -->

# 14.17 핵심 정리

이번 장에서는 pandas에서 그룹화와 집계를 수행하는 방법을 배웠습니다.

그룹화는 데이터를 특정 기준으로 나누는 작업입니다.  
집계는 각 그룹에 대해 합계, 평균, 개수 같은 계산을 수행하는 작업입니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.groupby("그룹화기준")["계산할컬럼"].집계함수()
\`\`\`

예를 들어 카테고리별 매출 합계는 다음처럼 계산합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

결과를 DataFrame으로 만들려면 \`reset_index()\`를 사용합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum().reset_index(name="total_sales")
\`\`\`

여러 집계를 한 번에 수행할 때는 \`agg()\`를 사용합니다.

\`\`\`python
orders.groupby("category").agg(
    total_sales=("total_price", "sum"),
    avg_order_price=("total_price", "mean"),
    order_count=("order_id", "count")
).reset_index()
\`\`\`

여러 기준으로 그룹화할 수도 있습니다.

\`\`\`python
orders.groupby(["region", "category"])["total_price"].sum()
\`\`\`

행과 열이 있는 요약표를 만들 때는 \`pivot_table()\`을 사용할 수 있습니다.

\`\`\`python
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

범주형 변수 간 빈도표를 만들 때는 \`crosstab()\`을 사용할 수 있습니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

그룹화와 집계는 데이터 분석의 핵심입니다.  
분석 질문을 정하고, 그룹화 기준과 계산할 값을 정한 뒤, 적절한 집계 함수를 선택하는 습관이 중요합니다.

---
`;export{e as default};