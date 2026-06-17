var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-9 -->

# 14.9 피벗 테이블: \`pivot_table()\`

\`groupby()\` 결과는 세로로 긴 형태가 많습니다.

예를 들어 지역별 카테고리별 매출은 다음처럼 나올 수 있습니다.

\`\`\`text
region | category | total_sales
서울    | 도서      | 84000
서울    | 전자기기  | 780000
부산    | 생활용품  | 100000
...
\`\`\`

이 데이터를 표 형태로 넓게 펼치면 더 보기 쉬울 때가 있습니다.

\`\`\`text
region | 도서 | 생활용품 | 전자기기
서울    | ... | ...     | ...
부산    | ... | ...     | ...
대전    | ... | ...     | ...
\`\`\`

이런 표를 만들 때 \`pivot_table()\`을 사용할 수 있습니다.

---

### 14.9.1 \`pivot_table()\` 기본 구조

기본 구조는 다음과 같습니다.

\`\`\`python
pd.pivot_table(
    data=df,
    values="계산할값",
    index="행기준",
    columns="열기준",
    aggfunc="집계함수"
)
\`\`\`

지역을 행으로, 카테고리를 열로 두고 매출 합계를 계산해보겠습니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum"
)

region_category_pivot
\`\`\`

이 결과는 지역별 카테고리별 매출표입니다.

---

### 14.9.2 결측 조합 채우기: \`fill_value\`

어떤 지역에는 특정 카테고리 주문이 없을 수 있습니다.  
이 경우 결과에 결측치가 생길 수 있습니다.

결측치를 0으로 채우려면 \`fill_value=0\`을 사용합니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)

region_category_pivot
\`\`\`

여기서 0은 “해당 조합의 주문이 없어서 매출 합계가 0”이라는 의미로 사용할 수 있습니다.

---

### 14.9.3 합계 행과 열 추가: \`margins\`

행과 열의 총합을 함께 보고 싶다면 \`margins=True\`를 사용합니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot
\`\`\`

이렇게 하면 행과 열에 전체 합계가 추가됩니다.

보고서용 요약표를 만들 때 유용합니다.

---

### 14.9.4 여러 집계 함수 사용

\`aggfunc\`에 여러 집계 함수를 넣을 수 있습니다.

\`\`\`python
pivot_multi = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc=["sum", "mean"],
    fill_value=0
)

pivot_multi
\`\`\`

결과는 다층 컬럼이 됩니다.  
기초 과정에서는 여러 집계 함수를 넣을 수 있다는 정도만 이해하면 됩니다.

보고서용으로는 하나의 집계 함수만 사용하거나, \`groupby().agg()\`로 정리하는 것이 더 읽기 쉬울 때가 많습니다.

---

### 14.9.5 \`pivot_table()\`과 \`groupby()\` 비교

\`pivot_table()\`은 \`groupby()\`와 비슷한 일을 합니다.  
차이는 결과 모양입니다.

\`\`\`python
# groupby 방식
orders.groupby(["region", "category"])["total_price"].sum().reset_index()
\`\`\`

\`\`\`python
# pivot_table 방식
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

정리하면 다음과 같습니다.

| 목적 | 추천 방법 |
|---|---|
| 세로형 요약표 만들기 | \`groupby()\` |
| 행과 열이 있는 교차 요약표 만들기 | \`pivot_table()\` |
| 보고서용 매트릭스 표 만들기 | \`pivot_table()\` |
| 여러 지표를 깔끔한 컬럼으로 정리 | \`groupby().agg()\` |

---
`;export{e as default};