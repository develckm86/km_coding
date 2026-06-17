var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-15 -->

# 19.15 실무 예제 2: 고객 등급별 구매 결과 정리

---

### 19.15.1 분석 질문

\`\`\`text
VIP 고객과 일반 고객의 구매 패턴은 어떻게 다른가?
\`\`\`

---

### 19.15.2 분석 코드

\`\`\`python
grade_report = (
    orders
    .groupby("grade")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        avg_visit_count=("visit_count", "mean"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_report = grade_report.round({
    "avg_order_price": 0,
    "median_order_price": 0,
    "avg_visit_count": 1,
    "avg_satisfaction": 1
})

grade_report
\`\`\`

---

### 19.15.3 시각화 코드

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 19.15.4 보고서 문장 예시

\`\`\`text
고객 등급별 분석 결과, VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타났다.
또한 VIP 고객은 방문 횟수와 만족도에서도 상대적으로 높은 값을 보일 수 있다.
이는 VIP 고객이 매출 기여도뿐 아니라 고객 관계 관리 측면에서도 중요한 고객군임을 시사한다.
\`\`\`

---

### 19.15.5 인사이트 예시

\`\`\`text
VIP 고객은 평균 주문 금액이 높아 매출 기여도가 큰 고객군이다.
따라서 VIP 고객의 재구매 유도, 이탈 방지, 전용 혜택 전략을 별도로 검토할 필요가 있다.
\`\`\`

---
`;export{e as default};