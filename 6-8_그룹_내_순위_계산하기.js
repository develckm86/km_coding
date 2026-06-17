var e=`# 6장. 고급 groupby 분석 리포트

## 6.8 그룹 내 순위 계산하기

고급 분석에서는 단순히 전체 순위만 보는 것이 아니라 **그룹 안에서의 순위**를 보는 경우가 많습니다.

예를 들어 다음 질문을 생각해봅시다.

\`\`\`text
전자기기 카테고리 안에서 가장 매출이 높은 상품은 무엇인가?
도서 카테고리 안에서 1위 상품은 무엇인가?
각 카테고리별 매출 상위 상품을 추출하고 싶다.
\`\`\`

---

### 6.8.1 상품별 매출 집계

\`\`\`python
product_summary = (
    orders_mart
    .groupby(["category", "product_id", "product_name"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

product_summary
\`\`\`

---

### 6.8.2 카테고리 내 상품 순위 계산

\`\`\`python
product_summary["sales_rank_in_category"] = (
    product_summary
    .groupby("category")["total_sales"]
    .rank(ascending=False, method="dense")
    .astype(int)
)

product_summary
\`\`\`

---

### 6.8.3 카테고리별 상위 상품 추출

\`\`\`python
top_products_by_category = (
    product_summary
    .query("sales_rank_in_category <= 3")
    .sort_values(["category", "sales_rank_in_category"])
    .reset_index(drop=True)
)

top_products_by_category
\`\`\`

---

### 6.8.4 카테고리 내 매출 비중 추가

\`\`\`python
product_summary["category_total_sales"] = (
    product_summary
    .groupby("category")["total_sales"]
    .transform("sum")
)

product_summary["sales_ratio_in_category"] = (
    product_summary["total_sales"] /
    product_summary["category_total_sales"] * 100
).round(1)

product_summary = product_summary.sort_values(
    ["category", "sales_rank_in_category"]
).reset_index(drop=True)

product_summary
\`\`\`

---

### 6.8.5 저장하기

\`\`\`python
product_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_product_rank_by_category.csv",
    index=False
)
\`\`\`

---

### 6.8.6 해석 예시

\`\`\`text
카테고리 내 상품 순위는 각 카테고리에서 어떤 상품이 매출을 주도하는지 보여준다.
전체 매출 순위만 보면 전자기기 상품이 상위에 몰릴 수 있지만, 카테고리 내 순위를 보면 도서나 생활용품 내부의 핵심 상품도 확인할 수 있다.
카테고리별 운영 전략을 세울 때는 전체 순위와 카테고리 내 순위를 함께 봐야 한다.
\`\`\`

---
`;export{e as default};