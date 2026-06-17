var e=`<!-- 원본: python_data_analysis_basic_chapter_6_book.md / 세부 장: 6-7 -->

# 6.7 고유값 확인

범주형 데이터에서는 어떤 값들이 들어 있는지 확인하는 것이 중요하다. 예를 들어 지역 컬럼에는 서울, 부산, 대구 등이 들어 있을 수 있고, 결제수단 컬럼에는 카드, 현금, 계좌이체가 들어 있을 수 있다.

이런 값의 종류를 **고유값**이라고 한다.

---

## 6.7.1 \`unique()\`로 고유값 목록 확인하기

\`\`\`python
orders["region"].unique()
\`\`\`

결과는 다음과 비슷하다.

\`\`\`text
array(['서울', '부산', '대구', '제주'], dtype=object)
\`\`\`

\`unique()\`는 해당 컬럼에 어떤 값들이 있는지 목록으로 보여준다.

---

## 6.7.2 \`nunique()\`로 고유값 개수 확인하기

고유값의 개수만 알고 싶다면 \`nunique()\`를 사용한다.

\`\`\`python
orders["region"].nunique()
\`\`\`

여러 컬럼의 고유값 개수를 한 번에 확인할 수도 있다.

\`\`\`python
orders.nunique()
\`\`\`

\`nunique()\`는 데이터의 다양성을 파악할 때 유용하다. 예를 들어 고객 ID 컬럼의 고유값 개수는 고객 수를 파악하는 데 도움이 된다.

---

## 6.7.3 \`value_counts()\`로 값의 빈도 확인하기

\`value_counts()\`는 각 값이 몇 번 등장했는지 세어준다.

\`\`\`python
orders["region"].value_counts()
\`\`\`

출력 예시는 다음과 비슷하다.

\`\`\`text
region
부산    3
서울    3
대구    1
제주    1
Name: count, dtype: int64
\`\`\`

결제수단별 주문 건수도 확인할 수 있다.

\`\`\`python
orders["payment"].value_counts()
\`\`\`

---

## 6.7.4 비율로 확인하기

빈도 대신 비율을 보고 싶다면 \`normalize=True\`를 사용한다.

\`\`\`python
orders["payment"].value_counts(normalize=True)
\`\`\`

결과는 각 값의 비율로 나타난다.

\`\`\`text
카드      0.625
계좌이체   0.250
현금      0.125
Name: proportion, dtype: float64
\`\`\`

비율을 퍼센트로 보고 싶다면 100을 곱하면 된다.

\`\`\`python
orders["payment"].value_counts(normalize=True) * 100
\`\`\`

---

## 6.7.5 고유값 확인이 중요한 이유

고유값을 확인하면 다음 문제를 찾을 수 있다.

\`\`\`text
- 같은 값이 다르게 표기된 경우
- 오타가 있는 경우
- 예상하지 못한 범주가 있는 경우
- 범주 수가 너무 많은 경우
- 결측치나 빈 문자열이 섞여 있는 경우
\`\`\`

예를 들어 지역 컬럼에 다음 값들이 들어 있다면 문제가 있을 수 있다.

\`\`\`text
서울
서울시
seoul
SEOUL
\`\`\`

사람에게는 모두 서울처럼 보이지만 컴퓨터는 서로 다른 값으로 처리한다. 이런 문제는 12장 문자열 데이터 처리에서 정리하게 된다.

---
`;export{e as default};