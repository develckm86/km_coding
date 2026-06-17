var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-18 -->

# 17.18 실무 예제 4: 고객 등급별 주문 금액 분포

고객 등급별 주문 금액 분포를 비교해보겠습니다.

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

해석 예시는 다음과 같습니다.

\`\`\`text
VIP 고객의 주문 금액 분포가 일반 고객보다 높은 위치에 있다면 VIP 고객의 구매 금액이 상대적으로 높다고 볼 수 있다.
다만 각 등급별 데이터 수가 충분한지 확인해야 한다.
박스플롯만으로 원인을 설명할 수는 없으며, 카테고리나 방문 횟수 같은 다른 변수도 함께 확인해야 한다.
\`\`\`

그룹별 데이터 개수를 확인합니다.

\`\`\`python
orders["grade"].value_counts()
\`\`\`

데이터 수가 적으면 그래프 해석에 주의해야 합니다.

---
`;export{e as default};