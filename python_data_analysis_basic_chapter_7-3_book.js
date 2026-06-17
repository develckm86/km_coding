var e=`<!-- 원본: python_data_analysis_basic_chapter_7_book.md / 세부 장: 7-3 -->

# 7.3 조건 필터링

## 조건 필터링이란?

조건 필터링은 특정 조건을 만족하는 행만 선택하는 작업입니다.

예를 들어 다음 질문을 코드로 표현할 수 있습니다.

- 주문 상태가 완료인 주문만 보고 싶다.
- 서울 지역 주문만 보고 싶다.
- 총 주문 금액이 50,000원 이상인 주문만 보고 싶다.
- 전자제품 주문만 보고 싶다.

조건 필터링은 데이터 분석에서 가장 많이 사용하는 기능 중 하나입니다.

---

## 하나의 조건으로 필터링하기

서울 지역 주문만 선택해 보겠습니다.

\`\`\`python
orders["region"] == "서울"
\`\`\`

이 코드는 각 행이 조건을 만족하는지 \`True\` 또는 \`False\`로 표시합니다.

\`\`\`text
0     True
1    False
2     True
3    False
4     True
5    False
6     True
Name: region, dtype: bool
\`\`\`

이렇게 \`True\`, \`False\`로 이루어진 결과를 **불리언 마스크**라고 부릅니다.

이 마스크를 DataFrame에 넣으면 \`True\`인 행만 선택됩니다.

\`\`\`python
orders[orders["region"] == "서울"]
\`\`\`

결과는 서울 지역 주문만 남습니다.

---

## 조건을 변수로 분리하기

조건이 길어지면 변수로 분리하는 것이 좋습니다.

\`\`\`python
is_seoul = orders["region"] == "서울"

orders[is_seoul]
\`\`\`

\`is_seoul\`이라는 변수명만 보아도 “서울 지역인지 여부”를 나타낸다는 것을 알 수 있습니다.

분석 코드에서는 조건을 변수로 분리하면 코드를 읽고 수정하기 쉬워집니다.

---

## 숫자 조건으로 필터링하기

총 주문 금액이 50,000원 이상인 주문을 선택해 보겠습니다.

\`\`\`python
orders[orders["total_price"] >= 50000]
\`\`\`

비교 연산자를 사용하면 숫자 조건을 쉽게 만들 수 있습니다.

자주 사용하는 비교 연산자는 다음과 같습니다.

| 연산자 | 의미 |
|---|---|
| \`==\` | 같다 |
| \`!=\` | 같지 않다 |
| \`>\` | 크다 |
| \`<\` | 작다 |
| \`>=\` | 크거나 같다 |
| \`<=\` | 작거나 같다 |

---

## 문자열 조건으로 필터링하기

주문 상태가 완료인 행만 선택해 보겠습니다.

\`\`\`python
orders[orders["order_status"] == "완료"]
\`\`\`

전자제품 카테고리만 선택하려면 다음과 같이 작성합니다.

\`\`\`python
orders[orders["category"] == "전자제품"]
\`\`\`

---

## 여러 조건을 함께 사용하기

분석에서는 조건을 하나만 사용하는 경우보다 여러 조건을 함께 사용하는 경우가 더 많습니다.

예를 들어 “서울 지역이면서 주문 상태가 완료인 주문”을 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["order_status"] == "완료")

orders[condition]
\`\`\`

여러 조건을 함께 사용할 때는 파이썬의 \`and\`, \`or\` 대신 pandas에서는 다음 연산자를 사용합니다.

| 의미 | pandas에서 사용하는 연산자 |
|---|---|
| 그리고 | \`&\` |
| 또는 | \`|\` |
| 아니다 | \`~\` |

각 조건은 반드시 괄호로 감싸야 합니다.

---

## \`&\`: 모든 조건을 만족하는 데이터

서울 지역이면서 주문 금액이 50,000원 이상인 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["total_price"] >= 50000)

orders[condition]
\`\`\`

\`&\`는 두 조건을 모두 만족하는 행만 선택합니다.

---

## \`|\`: 하나라도 만족하는 데이터

서울 또는 부산 지역 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") | (orders["region"] == "부산")

orders[condition]
\`\`\`

\`|\`는 둘 중 하나라도 만족하면 선택합니다.

---

## \`~\`: 조건을 반대로 만들기

취소 주문이 아닌 데이터만 선택해 보겠습니다.

\`\`\`python
condition = orders["order_status"] == "취소"

orders[~condition]
\`\`\`

\`~\`는 \`True\`를 \`False\`로, \`False\`를 \`True\`로 바꿉니다.

다음처럼 바로 작성할 수도 있습니다.

\`\`\`python
orders[orders["order_status"] != "취소"]
\`\`\`

실무에서는 상황에 따라 더 읽기 쉬운 방식을 선택하면 됩니다.

---

## \`isin()\`으로 여러 값 중 하나 선택하기

여러 값 중 하나에 해당하는 데이터를 선택할 때는 \`isin()\`이 유용합니다.

\`\`\`python
orders[orders["region"].isin(["서울", "부산"])]
\`\`\`

이 코드는 지역이 서울 또는 부산인 주문을 선택합니다.

다음 코드와 같은 의미입니다.

\`\`\`python
orders[(orders["region"] == "서울") | (orders["region"] == "부산")]
\`\`\`

값이 많아질수록 \`isin()\`이 더 읽기 좋습니다.

\`\`\`python
target_regions = ["서울", "부산", "대구"]

orders[orders["region"].isin(target_regions)]
\`\`\`

---

## \`and\`, \`or\`를 사용하면 안 되는 이유

pandas 조건 필터링에서 다음 코드는 에러가 발생합니다.

\`\`\`python
orders[(orders["region"] == "서울") and (orders["total_price"] >= 50000)]
\`\`\`

pandas의 조건식은 하나의 참/거짓 값이 아니라, 여러 행에 대한 참/거짓 Series입니다. 따라서 일반 파이썬의 \`and\`, \`or\`로 처리할 수 없습니다.

pandas에서는 다음처럼 작성해야 합니다.

\`\`\`python
orders[(orders["region"] == "서울") & (orders["total_price"] >= 50000)]
\`\`\`

---

## 조건 필터링과 원본 데이터

조건 필터링은 기본적으로 원본 DataFrame을 직접 삭제하거나 변경하지 않습니다.

\`\`\`python
seoul_orders = orders[orders["region"] == "서울"]
\`\`\`

이 코드는 서울 지역 주문을 골라 \`seoul_orders\`라는 새 변수에 저장합니다. 원본 \`orders\`는 그대로 남아 있습니다.

분석에서는 원본 데이터를 보존하고, 조건에 맞게 추출한 데이터를 별도 변수로 저장하는 습관이 중요합니다.

---
`;export{e as default};