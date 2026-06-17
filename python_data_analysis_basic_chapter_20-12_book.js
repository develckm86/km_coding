var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-12 -->

# 20.12 7단계: 카테고리별 매출 분석

카테고리별 매출 구조를 분석합니다.

---

### 20.12.1 카테고리별 요약표

\`\`\`python
category_report = (
    orders_analysis
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        avg_order_amount=("net_amount", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

total_sales = category_report["total_sales"].sum()

category_report["sales_ratio_percent"] = (
    category_report["total_sales"] / total_sales * 100
).round(1)

category_report["avg_order_amount"] = category_report["avg_order_amount"].round(0)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

---

### 20.12.2 카테고리별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_report["category"], category_report["total_sales"])

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 20.12.3 해석 예시

\`\`\`text
카테고리별 매출 분석 결과, 전자기기 카테고리의 매출 비중이 가장 높게 나타난다.
전자기기는 평균 주문 금액이 높아 전체 매출 기여도가 큰 카테고리로 볼 수 있다.
도서와 생활용품은 매출 규모는 상대적으로 작지만 주문 수와 고객 수 측면에서 별도 관리가 필요할 수 있다.
\`\`\`

---
`;export{e as default};