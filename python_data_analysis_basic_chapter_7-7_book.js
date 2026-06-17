var e=`<!-- 원본: python_data_analysis_basic_chapter_7_book.md / 세부 장: 7-7 -->

# 7.7 필요한 행과 열을 동시에 선택하기

## 필터링 후 필요한 컬럼만 보기

실무에서는 조건에 맞는 행을 선택한 뒤, 필요한 컬럼만 보는 경우가 많습니다.

예를 들어 서울 지역 주문 중 다음 컬럼만 보고 싶다고 가정하겠습니다.

- 고객명
- 상품명
- 총 주문 금액

\`\`\`python
condition = orders["region"] == "서울"
columns = ["customer_name", "product", "total_price"]

orders.loc[condition, columns]
\`\`\`

이 코드는 조건 필터링과 컬럼 선택을 동시에 수행합니다.

---

## \`loc\`를 사용하는 이유

다음 코드도 비슷한 결과를 만들 수 있습니다.

\`\`\`python
orders[orders["region"] == "서울"][["customer_name", "product", "total_price"]]
\`\`\`

하지만 실무에서는 다음 방식이 더 명확합니다.

\`\`\`python
orders.loc[orders["region"] == "서울", ["customer_name", "product", "total_price"]]
\`\`\`

\`loc[행 조건, 열 목록]\` 구조는 “어떤 행과 어떤 열을 선택하는지”가 분명하게 드러납니다.

---

## 여러 조건과 컬럼 선택 함께 사용하기

서울 지역이면서 주문 상태가 완료인 주문에서 고객명, 상품명, 총 주문 금액만 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["order_status"] == "완료")
columns = ["customer_name", "product", "total_price"]

orders.loc[condition, columns]
\`\`\`

결과는 분석 목적에 맞게 정리된 작은 DataFrame입니다.

---

## 수정은 \`loc\`를 사용해서 명확하게 하기

이번 장은 데이터 선택과 필터링이 중심이지만, 선택한 위치의 값을 수정할 때도 \`loc\`를 자주 사용합니다.

예를 들어 주문 상태가 \`취소\`인 주문에 표시용 컬럼을 추가하는 경우를 생각해 보겠습니다.

\`\`\`python
orders.loc[orders["order_status"] == "취소", "is_canceled"] = True
\`\`\`

값 수정은 9장 데이터 수정과 파생 변수에서 더 자세히 다룹니다. 여기서는 \`loc\`가 행과 열을 명확하게 지정할 수 있는 도구라는 점만 기억하면 됩니다.

---
`;export{e as default};