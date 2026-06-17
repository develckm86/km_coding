var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-3 -->

# 14.3 \`groupby()\` 기본 사용법

pandas에서 그룹화를 할 때는 \`groupby()\`를 사용합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.groupby("그룹화기준")["계산할컬럼"].집계함수()
\`\`\`

예를 들어 카테고리별 매출 합계는 다음처럼 계산합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

이 코드를 세 부분으로 나누어 보면 다음과 같습니다.

| 코드 | 의미 |
|---|---|
| \`orders.groupby("category")\` | \`category\`별로 데이터를 묶는다 |
| \`["total_price"]\` | 각 그룹에서 \`total_price\` 컬럼을 선택한다 |
| \`.sum()\` | 그룹별 합계를 계산한다 |

---

### 14.3.1 단일 컬럼 기준 그룹화

카테고리별 매출 합계를 구해보겠습니다.

\`\`\`python
category_sales = orders.groupby("category")["total_price"].sum()

category_sales
\`\`\`

결과는 Series 형태로 반환됩니다.

\`\`\`text
category
도서       164000
생활용품     225000
전자기기     960000
Name: total_price, dtype: int64
\`\`\`

왼쪽의 \`category\`는 인덱스가 되고, 오른쪽 값은 그룹별 합계입니다.

---

### 14.3.2 결과를 DataFrame으로 만들기

분석 결과를 보고서처럼 다루려면 DataFrame 형태가 편합니다.  
이때 \`reset_index()\`를 사용합니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index()
)

category_sales
\`\`\`

결과는 다음과 같은 형태가 됩니다.

\`\`\`text
category | total_price
도서      | 164000
생활용품  | 225000
전자기기  | 960000
\`\`\`

\`reset_index()\`는 그룹화 기준으로 사용된 인덱스를 다시 일반 컬럼으로 되돌립니다.

---

### 14.3.3 결과 컬럼명 바꾸기

집계 결과 컬럼명이 원래 컬럼명인 \`total_price\`로 남아 있습니다.  
보고서에서는 \`total_sales\`처럼 더 명확한 이름을 사용하는 것이 좋습니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

category_sales
\`\`\`

SeriesGroupBy 결과에 \`reset_index(name="새컬럼명")\`을 사용하면 집계 결과 컬럼명을 지정할 수 있습니다.

또는 \`rename()\`을 사용할 수도 있습니다.

\`\`\`python
category_sales = category_sales.rename(columns={"total_price": "total_sales"})
\`\`\`

---

### 14.3.4 집계 결과 정렬하기

카테고리별 매출을 큰 순서대로 보고 싶다면 정렬을 추가합니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

분석 보고서에서는 집계 결과를 정렬해서 보여주는 것이 좋습니다.

예를 들어 매출 분석에서는 매출이 큰 순서대로 정렬하면 핵심 카테고리를 쉽게 파악할 수 있습니다.

---

### 14.3.5 개수 세기

카테고리별 주문 건수를 계산하려면 \`count()\`를 사용할 수 있습니다.

\`\`\`python
orders.groupby("category")["order_id"].count()
\`\`\`

또는 \`size()\`를 사용할 수도 있습니다.

\`\`\`python
orders.groupby("category").size()
\`\`\`

\`count()\`와 \`size()\`는 비슷하지만 차이가 있습니다.

| 함수 | 의미 |
|---|---|
| \`count()\` | 결측치가 아닌 값의 개수 |
| \`size()\` | 그룹에 속한 행의 개수 |

결측치가 있는 컬럼을 기준으로 개수를 셀 때는 차이가 생길 수 있습니다.

예를 들어 \`order_id\`처럼 결측치가 없는 컬럼은 \`count()\`를 사용해도 괜찮습니다.  
행 수 자체를 세고 싶다면 \`size()\`가 더 명확합니다.

\`\`\`python
order_count_by_category = (
    orders
    .groupby("category")
    .size()
    .reset_index(name="order_count")
)

order_count_by_category
\`\`\`

---
`;export{e as default};