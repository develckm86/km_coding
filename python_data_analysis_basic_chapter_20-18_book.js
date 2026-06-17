var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-18 -->

# 20.18 13단계: 방문 횟수와 주문 금액 관계 분석

방문 횟수와 주문 금액 사이의 관계를 확인합니다.

---

### 20.18.1 상관계수 계산

\`\`\`python
visit_price_corr = orders_analysis["visit_count"].corr(
    orders_analysis["net_amount"]
)

visit_price_corr
\`\`\`

---

### 20.18.2 산점도

\`\`\`python
sns.scatterplot(
    data=orders_analysis,
    x="visit_count",
    y="net_amount",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 20.18.3 해석 예시

\`\`\`text
방문 횟수와 주문 금액 사이에 양의 관계가 관찰될 수 있다.
다만 상관관계는 인과관계를 의미하지 않는다.
방문 횟수가 높은 고객이 원래 구매 의향이 높은 고객일 수도 있고, VIP 고객 특성이 함께 영향을 줄 수도 있다.
\`\`\`

---
`;export{e as default};