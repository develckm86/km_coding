var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-4 -->

# 8.4 상위 데이터와 하위 데이터 추출

정렬을 배우는 가장 큰 이유 중 하나는 상위 또는 하위 데이터를 찾기 위해서입니다.

예를 들어 다음과 같은 질문을 생각할 수 있습니다.

- 주문 금액 상위 3건은 무엇인가?
- 리뷰 점수 하위 2건은 무엇인가?
- 재고가 가장 적은 상품은 무엇인가?
- 매출이 가장 높은 고객은 누구인가?

이런 질문에 답하는 방법은 크게 두 가지입니다.

1. \`sort_values()\`로 정렬한 뒤 \`head()\` 또는 \`tail()\` 사용
2. \`nlargest()\` 또는 \`nsmallest()\` 사용

---

### 8.4.1 \`sort_values()\`와 \`head()\`

주문 금액이 큰 상위 3건을 보려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

해석하면 다음과 같습니다.

1. \`total_price\` 기준으로 내림차순 정렬한다.
2. 위에서 3개 행만 선택한다.

이 방식은 직관적입니다.  
정렬과 추출 과정이 눈에 잘 보이기 때문에 초보자가 이해하기 좋습니다.

---

### 8.4.2 \`sort_values()\`와 \`tail()\`

오름차순으로 정렬한 뒤 마지막 몇 개를 볼 수도 있습니다.

\`\`\`python
orders.sort_values(by="total_price").tail(3)
\`\`\`

하지만 상위 데이터를 구할 때는 보통 내림차순 정렬 후 \`head()\`를 사용하는 편이 더 명확합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

하위 데이터를 구할 때는 오름차순 정렬 후 \`head()\`를 사용하는 것이 좋습니다.

\`\`\`python
orders.sort_values(by="total_price").head(3)
\`\`\`

---

### 8.4.3 \`nlargest()\`

\`nlargest()\`는 특정 컬럼에서 값이 가장 큰 행을 빠르게 가져오는 메서드입니다.

\`\`\`python
orders.nlargest(3, "total_price")
\`\`\`

이 코드는 \`total_price\`가 가장 큰 3개 행을 반환합니다.

아래 코드와 비슷한 결과를 냅니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

\`nlargest()\`는 “큰 값 상위 n개”를 찾는 목적이 분명할 때 사용하기 좋습니다.

---

### 8.4.4 \`nsmallest()\`

\`nsmallest()\`는 특정 컬럼에서 값이 가장 작은 행을 가져오는 메서드입니다.

\`\`\`python
orders.nsmallest(3, "total_price")
\`\`\`

이 코드는 \`total_price\`가 가장 작은 3개 행을 반환합니다.

아래 코드와 비슷한 결과를 냅니다.

\`\`\`python
orders.sort_values(by="total_price").head(3)
\`\`\`

---

### 8.4.5 \`nlargest()\`와 \`nsmallest()\` 사용 시 주의점

\`nlargest()\`와 \`nsmallest()\`는 숫자형 컬럼에서 상위 또는 하위 값을 찾을 때 사용하기 좋습니다.

예를 들어 다음과 같은 컬럼에 적합합니다.

- 매출
- 주문 금액
- 수량
- 점수
- 방문자 수
- 가격
- 재고

반면 문자열 컬럼을 기준으로 가나다순 정렬을 하고 싶다면 \`sort_values()\`를 사용하는 것이 더 적절합니다.

\`\`\`python
orders.sort_values(by="customer")
\`\`\`

정리하면 다음과 같습니다.

| 목적 | 권장 방법 |
|---|---|
| 특정 숫자 컬럼의 상위 n개 찾기 | \`nlargest()\` |
| 특정 숫자 컬럼의 하위 n개 찾기 | \`nsmallest()\` |
| 문자열, 날짜, 여러 기준 정렬 | \`sort_values()\` |
| 정렬 과정을 명확히 보여주기 | \`sort_values().head()\` |

---
`;export{e as default};