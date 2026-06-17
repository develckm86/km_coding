var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-14 -->

# 19.14 실무 예제 1: 카테고리별 매출 결과 정리

이제 실제로 하나의 분석 결과를 보고서 형태로 정리해보겠습니다.

---

### 19.14.1 분석 질문

\`\`\`text
카테고리별 매출 기여도는 어떻게 다른가?
\`\`\`

---

### 19.14.2 분석 코드

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

total_sales = category_report["total_sales"].sum()

category_report["sales_ratio_percent"] = (
    category_report["total_sales"] / total_sales * 100
).round(1)

category_report["avg_order_price"] = category_report["avg_order_price"].round(0)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

---

### 19.14.3 시각화 코드

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_report["category"], category_report["total_sales"])

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 19.14.4 보고서 문장 예시

\`\`\`text
카테고리별 매출 분석 결과, 전자기기 카테고리의 총매출이 가장 높게 나타났다.
전자기기는 다른 카테고리에 비해 평균 주문 금액이 높아 전체 매출 기여도가 크다.
반면 도서와 생활용품은 주문 수와 고객 수 측면에서 의미가 있을 수 있으므로,
매출뿐 아니라 고객 접점 관점에서도 함께 관리할 필요가 있다.
\`\`\`

---

### 19.14.5 인사이트 예시

\`\`\`text
전자기기는 쇼핑몰의 핵심 매출 카테고리로 볼 수 있다.
따라서 전자기기 상품군의 재고 부족, 가격 변동, 프로모션 효과를 우선적으로 모니터링할 필요가 있다.
\`\`\`

---
`;export{e as default};