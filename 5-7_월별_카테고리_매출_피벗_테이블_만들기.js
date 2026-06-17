var e=`# 5장. 데이터 재구조화 실습

## 5.7 월별 카테고리 매출 피벗 테이블 만들기

두 번째 실습은 월별 카테고리 매출을 보는 것입니다.

분석 질문:

\`\`\`text
월별로 어떤 카테고리가 매출에 기여했는가?
\`\`\`

이 질문은 시계열 분석과 카테고리 분석이 결합된 질문입니다.

---

### 5.7.1 월별 카테고리 매출 long 데이터 만들기

\`\`\`python
monthly_category_long = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(["year_month", "category"])
)

monthly_category_long
\`\`\`

이 데이터는 long format입니다.

\`\`\`text
year_month | category | total_sales | order_count
\`\`\`

시각화나 groupby 후속 분석에 적합합니다.

저장합니다.

\`\`\`python
monthly_category_long.to_csv(
    OUTPUT_TABLES / "chapter_05_monthly_category_long.csv",
    index=False
)
\`\`\`

---

### 5.7.2 월별 카테고리 매출 pivot 만들기

\`\`\`python
monthly_category_pivot = pd.pivot_table(
    data=orders_mart,
    index="year_month",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

monthly_category_pivot
\`\`\`

이 표는 월별로 카테고리 매출을 비교할 때 좋습니다.

---

### 5.7.3 월별 합계 추가하기

\`\`\`python
monthly_category_pivot["합계"] = monthly_category_pivot.sum(axis=1)

monthly_category_pivot
\`\`\`

열 합계도 보고 싶다면 다음처럼 전체 합계 행을 추가할 수 있습니다.

\`\`\`python
monthly_category_pivot_with_total = monthly_category_pivot.copy()
monthly_category_pivot_with_total.loc["합계"] = monthly_category_pivot_with_total.sum(axis=0)

monthly_category_pivot_with_total
\`\`\`

---

### 5.7.4 저장하기

\`\`\`python
monthly_category_pivot_with_total.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_05_monthly_category_pivot.csv",
    index=False
)
\`\`\`

---

### 5.7.5 해석 예시

\`\`\`text
월별 카테고리 매출 피벗 테이블을 보면 특정 월의 매출 증가가 어떤 카테고리에서 발생했는지 확인할 수 있다.
예를 들어 4월 매출이 높다면 전자기기 매출이 증가했기 때문인지, 도서나 생활용품 매출도 함께 증가했는지 확인할 수 있다.
\`\`\`

---
`;export{e as default};