var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-16 -->

# 15.16 실무 예제 3: 주문 데이터에 상품 정보 붙이기

이번에는 상품 정보를 붙입니다.

---

### 15.16.1 주문 데이터에 상품 ID 추가

예제용 주문 데이터에 상품 ID가 있다고 가정합니다.

\`\`\`python
orders_all = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006],
    "order_date": ["2026-01-03", "2026-01-05", "2026-02-10", "2026-02-14", "2026-03-01", "2026-03-15"],
    "customer_id": [1, 2, 3, 1, 4, 2],
    "product_id": ["P001", "P002", "P003", "P001", "P004", "P003"],
    "quantity": [1, 3, 2, 1, 2, 4],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000]
})
\`\`\`

상품 데이터입니다.

\`\`\`python
products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 책", "머그컵", "SQL 책"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

---

### 15.16.2 상품 정보 결합

\`\`\`python
orders_product = orders_all.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_product
\`\`\`

---

### 15.16.3 매칭 확인

\`\`\`python
orders_product["_merge"].value_counts()
\`\`\`

매칭되지 않은 상품이 있는지 확인합니다.

\`\`\`python
orders_product[orders_product["_merge"] == "left_only"]
\`\`\`

검증 후 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_product = orders_product.drop(columns=["_merge"])
\`\`\`

---

### 15.16.4 카테고리별 매출 분석

\`\`\`python
category_sales = (
    orders_product
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

상품 정보를 결합했기 때문에 카테고리별 분석이 가능해졌습니다.

---
`;export{e as default};