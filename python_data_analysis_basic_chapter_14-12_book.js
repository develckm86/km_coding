var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-12 -->

# 14.12 실무 예제 2: 월별 매출 리포트

이번에는 월별 매출 리포트를 만들어보겠습니다.

\`\`\`python
monthly_report = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_report["avg_order_price"] = monthly_report["avg_order_price"].round(0)

monthly_report
\`\`\`

월별 리포트는 시간 흐름에 따른 매출 변화를 보는 데 사용합니다.

예를 들어 다음 질문에 답할 수 있습니다.

\`\`\`text
월별 매출은 증가하고 있는가?
주문 건수는 어느 달에 가장 많았는가?
평균 주문 금액은 어느 달이 가장 높은가?
월별 구매 고객 수는 어떻게 변하는가?
\`\`\`

이 결과는 이후 시각화 장에서 선 그래프나 막대 그래프로 표현할 수 있습니다.

---
`;export{e as default};