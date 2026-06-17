var e=`# 17장. 고급 시각화 리포트 만들기

## 17.7 카테고리별 매출 그래프

카테고리별 매출은 상품 운영 전략을 세우는 데 중요합니다.

분석 질문:

\`\`\`text
어떤 카테고리가 매출을 주도하는가?
\`\`\`

---

### 17.7.1 카테고리별 매출 집계

\`\`\`python
category_sales = (
    orders_mart
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique")
    )
    .reset_index()
    .sort_values("total_sales", ascending=False)
)

category_sales["sales_ratio_percent"] = (
    category_sales["total_sales"] /
    category_sales["total_sales"].sum() * 100
).round(1)

category_sales
\`\`\`

---

### 17.7.2 카테고리별 매출 막대 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    category_sales["category"],
    category_sales["total_sales"]
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_category_sales_bar.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.7.3 해석 문장 예시

\`\`\`text
카테고리별 매출 그래프는 전체 매출에서 어떤 카테고리가 가장 큰 비중을 차지하는지 보여준다.
전자기기처럼 단가가 높은 카테고리는 주문 수가 많지 않아도 매출 비중이 높을 수 있으므로 주문 수와 함께 해석해야 한다.
\`\`\`

---
`;export{e as default};