var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-10 -->

# 14.10 교차표: \`crosstab()\`

\`crosstab()\`은 두 개 이상의 범주형 변수 사이의 빈도를 계산할 때 자주 사용합니다.

예를 들어 고객 등급과 지역의 관계를 보고 싶다고 해봅시다.

\`\`\`text
지역별 VIP 고객 수는 몇 명인가?
지역별 일반 고객 수는 몇 명인가?
\`\`\`

이런 질문에는 \`pd.crosstab()\`을 사용할 수 있습니다.

---

### 14.10.1 기본 교차표

지역과 고객 등급의 교차 빈도표를 만들어보겠습니다.

\`\`\`python
region_grade_table = pd.crosstab(
    orders["region"],
    orders["grade"]
)

region_grade_table
\`\`\`

결과는 지역을 행으로, 고객 등급을 열로 하는 빈도표입니다.

\`\`\`text
grade | VIP | 일반
region
서울   | ... | ...
부산   | ... | ...
대전   | ... | ...
\`\`\`

기본적으로 \`crosstab()\`은 빈도, 즉 개수를 계산합니다.

---

### 14.10.2 합계 추가

행과 열의 합계를 추가하려면 \`margins=True\`를 사용합니다.

\`\`\`python
region_grade_table = pd.crosstab(
    orders["region"],
    orders["grade"],
    margins=True,
    margins_name="합계"
)

region_grade_table
\`\`\`

---

### 14.10.3 비율로 보기: \`normalize\`

교차표를 개수뿐 아니라 비율로 보고 싶을 때가 있습니다.

전체 대비 비율을 보고 싶다면 \`normalize=True\`를 사용합니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize=True
)
\`\`\`

행 기준 비율을 보고 싶다면 \`normalize="index"\`를 사용합니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
)
\`\`\`

이 결과는 각 지역 안에서 VIP와 일반 고객이 차지하는 비율을 보여줍니다.

열 기준 비율을 보고 싶다면 \`normalize="columns"\`를 사용할 수 있습니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="columns"
)
\`\`\`

비율을 백분율로 보고 싶다면 100을 곱하고 반올림합니다.

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio.round(1)
\`\`\`

---

### 14.10.4 값과 집계 함수 사용

\`crosstab()\`은 기본적으로 빈도를 계산하지만, \`values\`와 \`aggfunc\`를 사용하면 특정 값의 집계도 할 수 있습니다.

지역과 등급별 매출 합계를 계산해보겠습니다.

\`\`\`python
region_grade_sales = pd.crosstab(
    index=orders["region"],
    columns=orders["grade"],
    values=orders["total_price"],
    aggfunc="sum"
)

region_grade_sales
\`\`\`

결측 조합을 0으로 채우려면 \`fillna(0)\`을 사용할 수 있습니다.

\`\`\`python
region_grade_sales = region_grade_sales.fillna(0)

region_grade_sales
\`\`\`

다만 값 집계가 목적이라면 \`pivot_table()\`이 더 직관적일 때도 많습니다.

---

### 14.10.5 \`crosstab()\`과 \`pivot_table()\` 비교

두 함수는 비슷해 보이지만 주로 사용하는 상황이 조금 다릅니다.

| 함수 | 주 용도 |
|---|---|
| \`crosstab()\` | 범주형 변수 간 빈도표, 비율표 |
| \`pivot_table()\` | 행과 열 기준으로 수치값 집계 |
| \`groupby()\` | 가장 일반적인 그룹화와 집계 |

예를 들어 지역별 등급 고객 수는 \`crosstab()\`이 편합니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

지역별 카테고리별 매출은 \`pivot_table()\`이 편합니다.

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

---
`;export{e as default};