var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-4 -->

# 9.4 값 변경

## 9.4.1 값을 변경해야 하는 상황

데이터를 분석하다 보면 기존 값을 수정해야 하는 경우가 많습니다.

예를 들어 다음과 같은 상황입니다.

- 지역명이 \`Seoul\`, \`SEOUL\`, \`seoul\`처럼 다르게 입력되어 있다.
- 성별 값이 \`M\`, \`Male\`, \`남성\`처럼 섞여 있다.
- 상품 카테고리명이 바뀌었다.
- 잘못 입력된 값을 올바른 값으로 수정해야 한다.
- 특정 조건을 만족하는 행의 값을 변경해야 한다.
- 결측치나 이상값을 별도 값으로 표시해야 한다.

값을 변경할 때는 무작정 바꾸기보다, 어떤 기준으로 바꾸는지 명확히 해야 합니다.

---

## 9.4.2 특정 컬럼의 문자열 값 정리하기

\`region\` 컬럼을 확인해봅시다.

\`\`\`python
orders["region"]
\`\`\`

현재 값은 다음과 같이 섞여 있습니다.

\`\`\`text
Seoul
Busan
Seoul
Incheon
busan
SEOUL
\`\`\`

대소문자를 통일하면 분석하기 쉬워집니다.

\`\`\`python
orders["region"] = orders["region"].str.lower()

orders
\`\`\`

이제 \`Seoul\`, \`SEOUL\`은 모두 \`seoul\`로 통일됩니다.

보고서에는 소문자보다 첫 글자 대문자가 보기 좋을 수 있습니다.

\`\`\`python
orders["region"] = orders["region"].str.title()

orders
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
Seoul
Busan
Seoul
Incheon
Busan
Seoul
\`\`\`

문자열 컬럼 정리는 12장에서 더 자세히 다룹니다.  
이번 장에서는 “값을 바꾸는 작업도 분석 준비의 일부”라는 점에 집중합니다.

---

## 9.4.3 \`replace()\`로 특정 값 변경하기

특정 값을 다른 값으로 바꾸고 싶을 때는 \`replace()\`를 사용할 수 있습니다.

\`\`\`python
orders["category"] = orders["category"].replace({
    "전자기기": "Electronics",
    "도서": "Books",
    "생활용품": "Daily Goods"
})

orders
\`\`\`

\`replace()\`는 값 자체를 기준으로 바꿉니다.  
위 코드는 \`category\` 컬럼에서 특정 한글 값을 영문 값으로 변경합니다.

하나의 값만 변경할 수도 있습니다.

\`\`\`python
orders["region"] = orders["region"].replace("Seoul", "서울")
\`\`\`

여러 값을 한 번에 바꿀 수도 있습니다.

\`\`\`python
orders["region"] = orders["region"].replace({
    "서울": "Seoul",
    "Busan": "부산",
    "Incheon": "인천"
})
\`\`\`

값 표준화는 분석의 정확도에 큰 영향을 줍니다.  
예를 들어 \`"Seoul"\`, \`"SEOUL"\`, \`"seoul"\`이 모두 다른 값으로 남아 있으면 지역별 집계 결과가 잘못 나올 수 있습니다.

---

## 9.4.4 \`loc\`로 조건에 맞는 값 변경하기

조건에 맞는 행의 특정 컬럼 값을 바꿀 때는 \`loc\`를 사용합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.loc[조건, "컬럼명"] = 새_값
\`\`\`

예를 들어 최종 결제 금액이 100000원 이상이면 \`high_value\` 컬럼을 \`True\`로 만들고 싶다고 가정해봅시다.

먼저 기본값을 넣습니다.

\`\`\`python
orders["high_value"] = False
\`\`\`

그다음 조건에 맞는 행만 \`True\`로 바꿉니다.

\`\`\`python
orders.loc[orders["final_amount"] >= 100000, "high_value"] = True

orders
\`\`\`

\`loc\`를 사용하면 행 조건과 수정할 컬럼을 명확하게 지정할 수 있습니다.

다음 예도 가능합니다.

\`\`\`python
orders.loc[orders["category"] == "Books", "shipping_type"] = "standard"
orders.loc[orders["category"] == "Electronics", "shipping_type"] = "safe_delivery"
\`\`\`

조건에 맞는 값 변경은 실무에서 매우 자주 사용됩니다.

- 금액이 일정 기준 이상이면 VIP 주문으로 표시
- 특정 지역이면 배송 구역을 따로 지정
- 재고가 0이면 판매 상태를 품절로 변경
- 점수가 낮으면 위험 등급으로 표시
- 날짜가 지난 항목은 마감 상태로 변경

---

## 9.4.5 \`loc\` 사용 시 주의할 점

값을 변경할 때는 다음과 같이 쓰는 것이 안전합니다.

\`\`\`python
orders.loc[orders["final_amount"] >= 100000, "high_value"] = True
\`\`\`

반면 다음처럼 필터링한 결과에 바로 값을 넣는 방식은 피하는 것이 좋습니다.

\`\`\`python
orders[orders["final_amount"] >= 100000]["high_value"] = True
\`\`\`

이런 코드는 의도대로 원본이 수정되지 않거나 경고가 발생할 수 있습니다.  
조건에 따라 값을 수정할 때는 \`loc\`를 사용하는 습관을 들이는 것이 좋습니다.

---
`;export{e as default};