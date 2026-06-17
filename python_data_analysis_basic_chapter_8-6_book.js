var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-6 -->

# 8.6 실무 정렬 패턴

이번 절에서는 정렬과 순위 계산을 실제 분석 질문에 연결해봅니다.

---

### 8.6.1 매출 상위 주문 찾기

질문:

> 주문 금액이 가장 큰 주문 3건은 무엇인가?

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

또는:

\`\`\`python
orders.nlargest(3, "total_price")
\`\`\`

상위 데이터만 빠르게 확인하려면 \`nlargest()\`가 편합니다.  
하지만 정렬 기준을 여러 개 사용하거나 정렬 결과를 자세히 보고 싶다면 \`sort_values()\`가 더 유연합니다.

---

### 8.6.2 리뷰 점수가 낮은 주문 찾기

질문:

> 리뷰 점수가 가장 낮은 주문은 무엇인가?

\`\`\`python
orders.sort_values(by="review_score").head()
\`\`\`

리뷰 점수가 낮은 데이터는 고객 불만이나 상품 문제를 파악하는 데 도움이 될 수 있습니다.

\`\`\`python
low_review_orders = orders.sort_values(by="review_score").head(3)

low_review_orders
\`\`\`

---

### 8.6.3 최신 주문 확인하기

날짜 데이터가 문자열이어도 \`"YYYY-MM-DD"\` 형식이면 문자열 정렬로도 어느 정도 날짜순 정렬이 가능합니다.  
하지만 실제 분석에서는 날짜형으로 변환한 뒤 정렬하는 것이 안전합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])

orders.sort_values(by="order_date", ascending=False)
\`\`\`

최신 주문 3건만 보고 싶다면 다음과 같이 작성합니다.

\`\`\`python
orders.sort_values(by="order_date", ascending=False).head(3)
\`\`\`

날짜와 시간 데이터 처리는 13장에서 더 자세히 다룹니다.

---

### 8.6.4 여러 기준으로 우선순위 정하기

질문:

> 리뷰 점수가 높은 주문을 먼저 보고, 리뷰 점수가 같으면 주문 금액이 큰 주문을 먼저 보고 싶다.

\`\`\`python
orders.sort_values(
    by=["review_score", "total_price"],
    ascending=[False, False]
)
\`\`\`

이런 정렬은 우선순위를 정할 때 유용합니다.

예를 들어 다음과 같은 상황에서 사용합니다.

- 점수가 높은 사람 중에서 제출 시간이 빠른 순서로 정렬
- 매출이 높은 상품 중에서 재고가 적은 순서로 정렬
- 고객 등급이 높은 고객 중에서 구매 금액이 큰 순서로 정렬

---

### 8.6.5 순위 컬럼 만들기

질문:

> 주문 금액 기준 순위 컬럼을 만들고 싶다.

\`\`\`python
orders["sales_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders.sort_values(by="sales_rank")
\`\`\`

보고서에는 정렬된 순서만 있는 것보다, 순위 컬럼이 함께 있으면 읽기 좋습니다.

\`\`\`text
1위: 주문 금액 300000
2위: 주문 금액 160000
3위: 주문 금액 60000
\`\`\`

순위 컬럼은 다음 장들에서 집계 결과를 정리할 때도 자주 사용됩니다.

---
`;export{e as default};