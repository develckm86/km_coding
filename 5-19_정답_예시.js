var e=`# 5장. 데이터 재구조화 실습

## 5.19 정답 예시

아래는 이번 장 과제의 한 가지 정답 예시입니다.

---

### 5.19.1 지역별 카테고리 피벗 정답

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders_mart,
    index="region",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
).reset_index()
\`\`\`

---

### 5.19.2 월별 카테고리 long 정답

\`\`\`python
monthly_category_long = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)
\`\`\`

---

### 5.19.3 월별 카테고리 pivot 정답

\`\`\`python
monthly_category_pivot = pd.pivot_table(
    data=orders_mart,
    index="year_month",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

monthly_category_pivot["합계"] = monthly_category_pivot.sum(axis=1)

monthly_category_pivot = monthly_category_pivot.reset_index()
\`\`\`

---

### 5.19.4 고객별 월별 구매 피벗 정답

\`\`\`python
customer_month_pivot = pd.pivot_table(
    data=orders_mart,
    index=["customer_id", "customer_name"],
    columns="year_month",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

customer_month_pivot["총구매액"] = customer_month_pivot.sum(axis=1)

customer_month_pivot = (
    customer_month_pivot
    .sort_values(by="총구매액", ascending=False)
    .reset_index()
)
\`\`\`

---

### 5.19.5 melt 정답

\`\`\`python
wide_sales = pd.DataFrame({
    "category": ["전자기기", "도서", "생활용품"],
    "2026-01": [300000, 45000, 45000],
    "2026-02": [290000, 35000, 0],
    "2026-03": [300000, 30000, 225000],
    "2026-04": [590000, 75000, 50000]
})

long_sales = pd.melt(
    wide_sales,
    id_vars=["category"],
    var_name="year_month",
    value_name="total_sales"
)
\`\`\`

---

### 5.19.6 explode 정답

\`\`\`python
product_tags = pd.DataFrame({
    "product_id": ["P001", "P002"],
    "product_name": ["노트북", "파이썬 입문서"],
    "tags": [
        ["전자기기", "고가", "업무용"],
        ["도서", "프로그래밍", "입문"]
    ]
})

product_tags_exploded = product_tags.explode("tags")
\`\`\`

---
`;export{e as default};