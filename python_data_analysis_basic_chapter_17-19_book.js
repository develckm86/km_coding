var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-19 -->

# 17.19 실무 예제 5: 방문 횟수와 주문 금액 관계

방문 횟수와 주문 금액의 관계를 산점도로 확인합니다.

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

상관계수도 함께 확인합니다.

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
방문 횟수가 많은 고객일수록 주문 금액이 높은 경향이 있을 수 있다.
하지만 상관관계는 인과관계가 아니므로 방문 횟수가 주문 금액을 증가시켰다고 단정할 수 없다.
고객 등급, 상품 카테고리, 이벤트 참여 여부 같은 다른 요인이 영향을 주었을 수 있다.
\`\`\`

---
`;export{e as default};