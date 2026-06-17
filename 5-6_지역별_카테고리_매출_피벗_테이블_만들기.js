var e=`# 5장. 데이터 재구조화 실습

## 5.6 지역별 카테고리 매출 피벗 테이블 만들기

첫 번째 실습은 지역별 카테고리 매출표를 만드는 것입니다.

분석 질문:

\`\`\`text
지역별로 어떤 카테고리의 매출이 높은가?
\`\`\`

이 질문에는 지역과 카테고리를 동시에 볼 수 있는 표가 좋습니다.

---

### 5.6.1 groupby로 먼저 집계하기

먼저 long 형태의 요약표를 만듭니다.

\`\`\`python
region_category_long = (
    orders_mart
    .groupby(["region", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

region_category_long
\`\`\`

이 결과는 다음 형태입니다.

\`\`\`text
region | category | total_sales | order_count
\`\`\`

이 구조는 분석과 시각화에는 좋지만, 보고용 표로는 지역별 카테고리 비교가 한눈에 들어오지 않을 수 있습니다.

---

### 5.6.2 pivot_table로 넓은 표 만들기

지역을 행으로, 카테고리를 열로 하는 피벗 테이블을 만듭니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders_mart,
    index="region",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

region_category_pivot
\`\`\`

이 표는 다음처럼 해석할 수 있습니다.

\`\`\`text
각 행은 지역이다.
각 열은 카테고리다.
각 값은 해당 지역과 카테고리의 매출 합계다.
\`\`\`

---

### 5.6.3 합계 추가하기

행과 열의 합계를 추가하려면 \`margins=True\`를 사용합니다.

\`\`\`python
region_category_pivot_total = pd.pivot_table(
    data=orders_mart,
    index="region",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot_total
\`\`\`

보고용 표에는 합계가 있는 것이 유용할 때가 많습니다.

---

### 5.6.4 인덱스를 컬럼으로 되돌리기

CSV로 저장하거나 다른 처리에 사용하려면 인덱스를 컬럼으로 바꿀 수 있습니다.

\`\`\`python
region_category_pivot_output = (
    region_category_pivot_total
    .reset_index()
)

region_category_pivot_output
\`\`\`

---

### 5.6.5 저장하기

\`\`\`python
region_category_pivot_output.to_csv(
    OUTPUT_TABLES / "chapter_05_region_category_pivot.csv",
    index=False
)
\`\`\`

---

### 5.6.6 해석 예시

\`\`\`text
지역별 카테고리 매출 피벗 테이블을 보면 각 지역에서 어떤 카테고리가 매출을 주도하는지 확인할 수 있다.
서울 지역은 전자기기 매출이 높게 나타날 수 있으며, 부산 지역은 생활용품 또는 전자기기 매출 비중을 함께 확인할 수 있다.
다만 지역별 고객 수와 주문 수가 다를 수 있으므로 총매출만으로 지역 성과를 단정하면 안 된다.
\`\`\`

---
`;export{e as default};