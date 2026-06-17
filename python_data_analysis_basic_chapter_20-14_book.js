var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-14 -->

# 20.14 9단계: 고객 등급별 구매 분석

고객 등급별 구매 차이를 확인합니다.

---

### 20.14.1 등급별 요약표

\`\`\`python
grade_report = (
    orders_analysis
    .groupby("grade")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean"),
        median_order_amount=("net_amount", "median"),
        avg_visit_count=("visit_count", "mean")
    )
    .reset_index()
)

grade_report = grade_report.round({
    "avg_order_amount": 0,
    "median_order_amount": 0,
    "avg_visit_count": 1
})

grade_report
\`\`\`

---

### 20.14.2 등급별 주문 금액 분포

\`\`\`python
sns.boxplot(
    data=orders_analysis,
    x="grade",
    y="net_amount"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 20.14.3 해석 예시

\`\`\`text
VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타날 수 있다.
이는 VIP 고객이 매출 기여도가 높은 고객군일 가능성을 시사한다.
다만 등급별 주문 수와 고유 고객 수가 충분한지 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};