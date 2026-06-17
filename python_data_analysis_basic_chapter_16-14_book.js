var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-14 -->

# 16.14 실무 예제 3: 상관관계 분석

방문 횟수, 주문 금액, 만족도 사이의 관계를 확인해보겠습니다.

\`\`\`python
corr_data = orders[["age", "quantity", "total_price", "visit_count", "satisfaction"]]

corr_matrix = corr_data.corr()

corr_matrix
\`\`\`

특정 변수와 주문 금액의 상관관계를 정렬해볼 수 있습니다.

\`\`\`python
corr_with_price = corr_matrix["total_price"].sort_values(ascending=False)

corr_with_price
\`\`\`

자기 자신과의 상관관계는 항상 1입니다.  
실제로는 다른 변수와의 관계를 봐야 합니다.

\`\`\`python
corr_with_price.drop("total_price")
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
visit_count와 total_price의 상관계수가 양수라면, 방문 횟수가 많은 고객일수록 주문 금액이 큰 경향이 있을 수 있다.
하지만 이것이 방문 횟수가 주문 금액을 증가시킨다는 의미는 아니다.
고객 등급, 상품 종류, 이벤트 참여 여부 같은 다른 요인이 영향을 줄 수 있다.
\`\`\`

---
`;export{e as default};