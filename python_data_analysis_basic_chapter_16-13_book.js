var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-13 -->

# 16.13 실무 예제 2: 고객 등급별 구매 특성 분석

이번에는 고객 등급별 구매 특성을 분석해보겠습니다.

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        avg_visit_count=("visit_count", "mean"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_summary
\`\`\`

평균값을 보기 좋게 반올림합니다.

\`\`\`python
grade_summary = grade_summary.round({
    "avg_order_price": 0,
    "median_order_price": 0,
    "avg_visit_count": 1,
    "avg_satisfaction": 1
})

grade_summary
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
VIP 고객은 일반 고객보다 평균 주문 금액이 높게 나타난다.
VIP 고객은 평균 방문 횟수와 만족도도 높을 수 있다.
다만 데이터 수가 적다면 이 결과를 일반화하기 어렵다.
추가 데이터가 필요하며, 실제 분석에서는 기간과 표본 수를 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};