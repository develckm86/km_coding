var e=`<!-- 원본: python_data_analysis_basic_chapter_7_book.md / 세부 장: 7-5 -->

# 7.5 범위 조건 필터링

## 범위 조건이란?

범위 조건은 어떤 값이 특정 구간 안에 있는지 확인하는 조건입니다.

예를 들어 다음과 같은 질문을 할 수 있습니다.

- 주문 금액이 30,000원 이상 100,000원 이하인가?
- 주문 수량이 3개 이상 10개 이하인가?
- 단가가 1,000원 이상 10,000원 이하인가?

---

## 비교 연산자로 범위 조건 만들기

총 주문 금액이 30,000원 이상 100,000원 이하인 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["total_price"] >= 30000) & (orders["total_price"] <= 100000)

orders[condition]
\`\`\`

범위 조건도 여러 조건을 함께 쓰는 것이므로 각 조건을 괄호로 감싸야 합니다.

---

## \`between()\` 사용하기

pandas에서는 범위 조건을 더 간단하게 표현할 수 있는 \`between()\`을 제공합니다.

\`\`\`python
orders[orders["total_price"].between(30000, 100000)]
\`\`\`

위 코드는 \`total_price\`가 30,000 이상 100,000 이하인 행을 선택합니다.

일반적으로 \`between(a, b)\`는 a와 b 사이에 있는 값을 찾을 때 사용합니다.

---

## 수량 범위 필터링

주문 수량이 3개 이상 10개 이하인 주문을 선택해 보겠습니다.

\`\`\`python
orders[orders["quantity"].between(3, 10)]
\`\`\`

---

## 범위 조건과 다른 조건 결합하기

서울 지역 주문 중 총 주문 금액이 30,000원 이상 100,000원 이하인 데이터를 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["total_price"].between(30000, 100000))

orders[condition]
\`\`\`

실무 분석에서는 이런 방식으로 범위 조건과 범주 조건을 자주 함께 사용합니다.

---
`;export{e as default};