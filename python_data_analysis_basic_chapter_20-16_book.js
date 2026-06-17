var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-16 -->

# 20.16 11단계: 상품별 성과 분석

상품별 판매 성과를 분석합니다.

---

### 20.16.1 상품별 요약표

\`\`\`python
product_report = (
    orders_analysis
    .groupby(["product_id", "product_name", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

product_report["avg_order_amount"] = product_report["avg_order_amount"].round(0)

product_report = product_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

product_report
\`\`\`

---

### 20.16.2 매출 상위 상품 확인

\`\`\`python
top_products = product_report.head(5)

top_products
\`\`\`

---

### 20.16.3 상품별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.barh(top_products["product_name"], top_products["total_sales"])

plt.title("매출 상위 상품")
plt.xlabel("매출")
plt.ylabel("상품명")

plt.show()
\`\`\`

---

### 20.16.4 해석 예시

\`\`\`text
매출 상위 상품은 전체 매출에 큰 영향을 준다.
특히 단가가 높은 상품은 주문 수가 많지 않아도 매출 기여도가 클 수 있다.
상품별 성과를 볼 때는 총매출, 판매 수량, 주문 수를 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};