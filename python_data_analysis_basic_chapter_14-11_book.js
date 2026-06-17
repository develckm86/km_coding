var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-11 -->

# 14.11 실무 예제 1: 카테고리별 매출 요약표

카테고리별 매출 요약표를 만들어보겠습니다.

분석 질문은 다음과 같습니다.

\`\`\`text
카테고리별 총매출, 주문 건수, 평균 주문 금액, 총 판매 수량은 얼마인가?
\`\`\`

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_report["avg_order_price"] = category_report["avg_order_price"].round(0)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
)

category_report
\`\`\`

이 요약표는 다음을 보여줍니다.

- 어떤 카테고리의 매출이 가장 큰가?
- 어떤 카테고리의 주문 건수가 많은가?
- 평균 주문 금액이 높은 카테고리는 무엇인가?
- 고유 고객 수가 많은 카테고리는 무엇인가?

보고서에서는 이 표를 기반으로 핵심 카테고리를 설명할 수 있습니다.

---
`;export{e as default};