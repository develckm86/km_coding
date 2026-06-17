var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-8 -->

# 14.8 그룹별 비율 계산

그룹별 합계뿐 아니라 전체에서 차지하는 비율을 계산해야 할 때도 많습니다.

예를 들어 카테고리별 매출 비중을 구해보겠습니다.

---

### 14.8.1 전체 대비 비율

카테고리별 매출 합계를 먼저 구합니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

category_sales
\`\`\`

전체 매출을 계산합니다.

\`\`\`python
total_sales = category_sales["total_sales"].sum()
\`\`\`

카테고리별 매출 비율을 추가합니다.

\`\`\`python
category_sales["sales_ratio"] = category_sales["total_sales"] / total_sales

category_sales
\`\`\`

백분율로 보고 싶다면 100을 곱하고 반올림합니다.

\`\`\`python
category_sales["sales_ratio_percent"] = (category_sales["sales_ratio"] * 100).round(1)

category_sales
\`\`\`

이 결과는 다음과 같이 해석할 수 있습니다.

\`\`\`text
전자기기 카테고리가 전체 매출의 몇 %를 차지한다.
도서 카테고리가 전체 매출의 몇 %를 차지한다.
생활용품 카테고리가 전체 매출의 몇 %를 차지한다.
\`\`\`

---

### 14.8.2 그룹 안에서의 비율

이번에는 지역 안에서 카테고리별 매출 비율을 구해보겠습니다.

먼저 지역별 카테고리별 매출을 계산합니다.

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

region_category_sales
\`\`\`

각 지역의 전체 매출을 구해 같은 행에 붙입니다.  
이때 \`transform()\`을 사용할 수 있습니다.

\`\`\`python
region_category_sales["region_total_sales"] = (
    region_category_sales
    .groupby("region")["total_sales"]
    .transform("sum")
)

region_category_sales
\`\`\`

이제 지역 내 카테고리 비율을 계산합니다.

\`\`\`python
region_category_sales["category_ratio_in_region"] = (
    region_category_sales["total_sales"] / region_category_sales["region_total_sales"]
)

region_category_sales["category_ratio_percent"] = (
    region_category_sales["category_ratio_in_region"] * 100
).round(1)

region_category_sales
\`\`\`

\`transform()\`은 그룹별 계산 결과를 원래 행 수에 맞춰 반환합니다.  
기초 과정에서는 “그룹별 합계를 각 행에 다시 붙이고 싶을 때 사용한다” 정도로 이해하면 충분합니다.

---

### 14.8.3 비율 계산이 필요한 이유

비율은 단순 합계만 볼 때 놓칠 수 있는 정보를 보여줍니다.

예를 들어 서울의 전자기기 매출이 부산보다 크다고 해서 서울에서 전자기기가 더 중요한 카테고리라고 단정할 수 없습니다.  
서울 전체 매출이 부산보다 훨씬 크기 때문일 수 있습니다.

이럴 때 지역 내 비율을 보면 각 지역에서 어떤 카테고리가 상대적으로 중요한지 알 수 있습니다.

\`\`\`text
전체 매출 기준 비중
지역 안에서의 카테고리 비중
고객 등급 안에서의 구매 비중
월 안에서의 카테고리 비중
\`\`\`

비율은 분석 결과를 해석하는 데 매우 중요한 지표입니다.

---
`;export{e as default};