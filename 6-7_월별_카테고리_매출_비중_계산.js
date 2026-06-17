var e=`# 6장. 고급 groupby 분석 리포트

## 6.7 월별 카테고리 매출 비중 계산

이번에는 월별로 각 카테고리가 차지하는 매출 비중을 계산합니다.

분석 질문:

\`\`\`text
월별로 어떤 카테고리가 매출을 주도했는가?
\`\`\`

---

### 6.7.1 월별 카테고리 매출 집계

\`\`\`python
monthly_category_sales = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_category_sales
\`\`\`

---

### 6.7.2 월별 총매출 붙이기

\`\`\`python
monthly_category_sales["monthly_total_sales"] = (
    monthly_category_sales
    .groupby("year_month")["total_sales"]
    .transform("sum")
)

monthly_category_sales
\`\`\`

---

### 6.7.3 월별 카테고리 매출 비중 계산

\`\`\`python
monthly_category_sales["sales_ratio_in_month"] = (
    monthly_category_sales["total_sales"] /
    monthly_category_sales["monthly_total_sales"] * 100
).round(1)

monthly_category_sales
\`\`\`

---

### 6.7.4 월별 카테고리 순위 계산

\`\`\`python
monthly_category_sales["category_rank_in_month"] = (
    monthly_category_sales
    .groupby("year_month")["total_sales"]
    .rank(ascending=False, method="dense")
    .astype(int)
)

monthly_category_sales = monthly_category_sales.sort_values(
    ["year_month", "category_rank_in_month"]
).reset_index(drop=True)

monthly_category_sales
\`\`\`

---

### 6.7.5 저장하기

\`\`\`python
monthly_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_06_monthly_category_ratio.csv",
    index=False
)
\`\`\`

---

### 6.7.6 해석 예시

\`\`\`text
월별 카테고리 매출 비중을 보면 특정 월의 매출 증가가 어떤 카테고리에서 발생했는지 확인할 수 있다.
예를 들어 전자기기 비중이 높은 월은 전체 매출이 고가 상품 판매에 크게 의존했을 가능성이 있다.
월별 총매출과 카테고리 비중을 함께 보면 매출 변화의 원인 후보를 더 구체적으로 찾을 수 있다.
\`\`\`

---
`;export{e as default};