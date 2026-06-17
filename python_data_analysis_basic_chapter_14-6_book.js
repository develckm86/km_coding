var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-6 -->

# 14.6 여러 기준으로 그룹화하기

하나의 기준이 아니라 여러 기준으로 데이터를 묶을 수도 있습니다.

예를 들어 “지역별 카테고리별 매출”을 보고 싶다면 \`region\`과 \`category\`를 함께 기준으로 사용합니다.

---

### 14.6.1 두 컬럼 기준 그룹화

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
)

region_category_sales
\`\`\`

결과는 MultiIndex 형태가 됩니다.

\`\`\`text
region  category
대전      도서           ...
         생활용품         ...
부산      도서           ...
         생활용품         ...
         전자기기         ...
서울      도서           ...
         생활용품         ...
         전자기기         ...
\`\`\`

DataFrame으로 정리하려면 \`reset_index()\`를 사용합니다.

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

region_category_sales
\`\`\`

---

### 14.6.2 여러 기준 집계 결과 정렬

지역별 카테고리별 매출을 지역과 매출 기준으로 정렬해보겠습니다.

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by=["region", "total_sales"], ascending=[True, False])
)

region_category_sales
\`\`\`

이 코드는 다음 기준으로 정렬합니다.

1. \`region\`은 오름차순
2. 같은 지역 안에서는 \`total_sales\` 내림차순

여러 기준 정렬은 그룹화 결과를 보기 좋게 정리할 때 자주 사용합니다.

---

### 14.6.3 월별 카테고리별 매출

이전 장에서 만든 \`year_month\` 컬럼을 사용해 월별 카테고리별 매출을 구할 수 있습니다.

\`\`\`python
monthly_category_sales = (
    orders
    .groupby(["year_month", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_category_sales
\`\`\`

이 결과는 다음과 같은 질문에 답할 수 있습니다.

\`\`\`text
1월에는 어떤 카테고리 매출이 가장 높았는가?
월별로 전자기기 매출은 어떻게 변했는가?
특정 카테고리는 특정 월에만 매출이 높은가?
\`\`\`

이처럼 날짜 파생 변수와 그룹화를 함께 사용하면 시간 흐름에 따른 분석을 할 수 있습니다.

---

### 14.6.4 고객 등급별 카테고리별 평균 주문 금액

고객 등급과 카테고리를 기준으로 평균 주문 금액을 계산해봅시다.

\`\`\`python
grade_category_avg = (
    orders
    .groupby(["grade", "category"])["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
    .sort_values(by=["grade", "avg_order_price"], ascending=[True, False])
)

grade_category_avg
\`\`\`

이 분석은 다음 질문에 답하는 데 유용합니다.

\`\`\`text
VIP 고객은 어떤 카테고리에서 평균 구매 금액이 높은가?
일반 고객과 VIP 고객의 구매 패턴은 어떻게 다른가?
\`\`\`

---
`;export{e as default};