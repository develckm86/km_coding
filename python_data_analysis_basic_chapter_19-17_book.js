var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-17 -->

# 19.17 실무 예제 4: 방문 횟수와 주문 금액 관계 정리

---

### 19.17.1 분석 질문

\`\`\`text
방문 횟수와 주문 금액 사이에 관계가 있는가?
\`\`\`

---

### 19.17.2 분석 코드

\`\`\`python
visit_price_corr = orders["visit_count"].corr(orders["total_price"])

visit_price_corr
\`\`\`

---

### 19.17.3 시각화 코드

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 19.17.4 보고서 문장 예시

\`\`\`text
방문 횟수와 주문 금액 사이에는 양의 관계가 관찰될 수 있다.
방문 횟수가 높은 고객 중 일부는 높은 주문 금액을 보이며, 특히 VIP 고객군에서 이러한 경향이 나타날 수 있다.
다만 상관관계는 인과관계를 의미하지 않으므로,
방문 횟수가 주문 금액을 증가시킨다고 단정할 수는 없다.
\`\`\`

---

### 19.17.5 인사이트 예시

\`\`\`text
방문 횟수는 구매 가능성이 높은 고객을 식별하는 보조 지표로 활용될 수 있다.
다만 실제 마케팅 전략에 활용하려면 재구매율, 유입 경로, 장바구니 행동 같은 추가 데이터를 함께 분석해야 한다.
\`\`\`

---
`;export{e as default};