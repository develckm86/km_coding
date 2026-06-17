var e=`# 10장. 고객별 Feature Table 만들기

## 10.9 고객별 카테고리 Feature 만들기

고객이 어떤 카테고리를 구매했는지는 고객 취향을 이해하는 데 중요합니다.

---

### 10.9.1 고객별 카테고리 수

\`\`\`python
customer_category_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        category_count=("category", "nunique"),
        product_count=("product_name", "nunique")
    )
    .reset_index()
)

customer_category_features.head()
\`\`\`

---

### 10.9.2 고객별 카테고리 매출

\`\`\`python
customer_category_sales = (
    customer_order_base
    .groupby(["customer_id", "category"])
    .agg(
        category_sales=("net_amount", "sum"),
        category_order_count=("order_id", "count")
    )
    .reset_index()
)

customer_category_sales.head()
\`\`\`

---

### 10.9.3 주 구매 카테고리 찾기

고객별 카테고리 매출 순위를 계산합니다.

\`\`\`python
customer_category_sales["category_rank"] = (
    customer_category_sales
    .groupby("customer_id")["category_sales"]
    .rank(ascending=False, method="dense")
)

main_category = (
    customer_category_sales
    .query("category_rank == 1")
    .sort_values(["customer_id", "category"])
    .drop_duplicates(subset=["customer_id"], keep="first")
    [["customer_id", "category", "category_sales"]]
    .rename(columns={
        "category": "main_category",
        "category_sales": "main_category_sales"
    })
)

main_category.head()
\`\`\`

고객 카테고리 Feature에 붙입니다.

\`\`\`python
customer_category_features = customer_category_features.merge(
    main_category,
    on="customer_id",
    how="left"
)
\`\`\`

---

### 10.9.4 카테고리별 구매액을 wide 형태로 만들기

카테고리별 구매액을 고객 Feature로 만들 수 있습니다.

\`\`\`python
customer_category_pivot = pd.pivot_table(
    data=customer_order_base,
    index="customer_id",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

customer_category_pivot = customer_category_pivot.reset_index()

customer_category_pivot.head()
\`\`\`

컬럼명을 feature 형식으로 바꿉니다.

\`\`\`python
customer_category_pivot = customer_category_pivot.rename(columns={
    "도서": "book_sales",
    "생활용품": "lifestyle_sales",
    "전자기기": "electronics_sales"
})

customer_category_pivot.head()
\`\`\`

존재하지 않는 카테고리 컬럼이 있을 수 있으므로 필요한 컬럼을 보완합니다.

\`\`\`python
for col in ["book_sales", "lifestyle_sales", "electronics_sales"]:
    if col not in customer_category_pivot.columns:
        customer_category_pivot[col] = 0
\`\`\`

고객 카테고리 Feature에 붙입니다.

\`\`\`python
customer_category_features = customer_category_features.merge(
    customer_category_pivot,
    on="customer_id",
    how="left"
)
\`\`\`

---

### 10.9.5 전자기기 구매 비중 계산

\`\`\`python
customer_total_sales = (
    customer_order_base
    .groupby("customer_id")
    .agg(total_purchase=("net_amount", "sum"))
    .reset_index()
)

customer_category_features = customer_category_features.merge(
    customer_total_sales,
    on="customer_id",
    how="left"
)

customer_category_features["electronics_sales_ratio"] = np.where(
    customer_category_features["total_purchase"] > 0,
    customer_category_features["electronics_sales"] /
    customer_category_features["total_purchase"] * 100,
    0
).round(1)

customer_category_features = customer_category_features.drop(columns=["total_purchase"])

customer_category_features.head()
\`\`\`

---

### 10.9.6 저장하기

\`\`\`python
customer_category_features.to_csv(
    OUTPUT_TABLES / "chapter_10_customer_category_features.csv",
    index=False
)
\`\`\`

---

### 10.9.7 해석 예시

\`\`\`text
category_count는 고객이 얼마나 다양한 카테고리를 구매했는지 보여준다.
main_category는 고객의 주요 관심 카테고리를 나타낸다.
electronics_sales_ratio가 높은 고객은 전자기기 중심 고객으로 볼 수 있으며, 전자기기 프로모션 대상 후보가 될 수 있다.
\`\`\`

---
`;export{e as default};