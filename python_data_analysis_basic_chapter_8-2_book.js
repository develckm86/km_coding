var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-2 -->

# 8.2 값 기준 정렬: \`sort_values()\`

pandas에서 특정 컬럼의 값을 기준으로 정렬할 때는 \`sort_values()\`를 사용합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.sort_values(by="컬럼명")
\`\`\`

여기서 \`by\`는 어떤 컬럼을 기준으로 정렬할지 지정하는 인자입니다.

---

### 8.2.1 오름차순 정렬

오름차순 정렬은 작은 값에서 큰 값으로 정렬하는 방식입니다.  
문자열이라면 가나다순 또는 알파벳순으로 정렬됩니다.

\`\`\`python
orders.sort_values(by="total_price")
\`\`\`

위 코드는 \`total_price\`가 작은 주문부터 큰 주문 순서로 정렬합니다.

예상되는 흐름은 다음과 같습니다.

\`\`\`text
45,000
50,000
60,000
160,000
300,000
300,000
\`\`\`

기본값은 오름차순입니다.  
따라서 아래 두 코드는 같은 의미입니다.

\`\`\`python
orders.sort_values(by="total_price")
orders.sort_values(by="total_price", ascending=True)
\`\`\`

---

### 8.2.2 내림차순 정렬

내림차순 정렬은 큰 값에서 작은 값으로 정렬하는 방식입니다.  
상위 데이터를 보고 싶을 때 많이 사용합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

이 코드는 주문 금액이 큰 순서대로 데이터를 정렬합니다.

\`\`\`text
300,000
300,000
160,000
60,000
50,000
45,000
\`\`\`

실무에서는 내림차순 정렬을 자주 사용합니다.  
매출, 주문 수량, 방문자 수, 점수처럼 “큰 값이 중요한 지표”가 많기 때문입니다.

---

### 8.2.3 정렬 결과는 원본을 자동으로 바꾸지 않는다

pandas에서 많은 메서드는 원본 데이터를 직접 바꾸지 않고, 변경된 결과를 새로 반환합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

위 코드를 실행하면 정렬된 결과가 화면에 보입니다.  
하지만 \`orders\` 자체가 영구적으로 정렬되는 것은 아닙니다.

정렬된 결과를 계속 사용하려면 새 변수에 저장해야 합니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)

sorted_orders
\`\`\`

원본을 확인해보면 원래 순서가 유지됩니다.

\`\`\`python
orders
\`\`\`

초보 단계에서는 \`inplace=True\`를 사용하는 것보다, 정렬 결과를 새 변수에 저장하는 방식을 권장합니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)
\`\`\`

이 방식은 원본 데이터와 정렬된 데이터를 구분할 수 있어 실수를 줄이는 데 도움이 됩니다.

---

### 8.2.4 여러 컬럼 기준으로 정렬하기

하나의 컬럼만으로 정렬 기준이 충분하지 않을 때가 있습니다.

예를 들어 주문 금액이 같은 경우에는 리뷰 점수가 높은 순서로 다시 정렬하고 싶을 수 있습니다.

\`\`\`python
orders.sort_values(
    by=["total_price", "review_score"],
    ascending=[False, False]
)
\`\`\`

위 코드는 다음 순서로 정렬합니다.

1. \`total_price\`를 기준으로 내림차순 정렬
2. \`total_price\`가 같으면 \`review_score\`를 기준으로 내림차순 정렬

여러 컬럼을 기준으로 정렬할 때는 \`by\`에 컬럼명을 리스트로 전달합니다.  
각 컬럼마다 오름차순과 내림차순을 다르게 지정하고 싶다면 \`ascending\`에도 리스트를 전달합니다.

다음 예를 봅시다.

\`\`\`python
orders.sort_values(
    by=["category", "total_price"],
    ascending=[True, False]
)
\`\`\`

이 코드는 먼저 \`category\`를 오름차순으로 정렬하고, 같은 카테고리 안에서는 \`total_price\`를 내림차순으로 정렬합니다.

실무에서는 다음과 같은 상황에서 여러 기준 정렬을 사용합니다.

- 지역별로 정렬한 뒤, 지역 안에서 매출이 높은 순서로 보기
- 부서별로 정렬한 뒤, 부서 안에서 근속연수가 긴 순서로 보기
- 카테고리별로 정렬한 뒤, 카테고리 안에서 판매량이 많은 순서로 보기
- 날짜순으로 정렬한 뒤, 같은 날짜 안에서 주문 금액이 큰 순서로 보기

---

### 8.2.5 결측치가 있는 컬럼 정렬하기

정렬 기준 컬럼에 결측치가 있을 수 있습니다.

다음 데이터를 보겠습니다.

\`\`\`python
products = pd.DataFrame({
    "product": ["키보드", "마우스", "모니터", "노트북", "스피커"],
    "price": [30000, 15000, 200000, None, 70000],
    "stock": [10, 50, 7, 3, 20]
})

products
\`\`\`

\`price\` 컬럼에는 \`None\` 값이 있습니다.  
pandas에서는 이런 값을 결측치로 처리합니다.

기본적으로 정렬할 때 결측치는 뒤쪽에 배치됩니다.

\`\`\`python
products.sort_values(by="price")
\`\`\`

결측치를 앞쪽에 배치하고 싶다면 \`na_position="first"\`를 사용합니다.

\`\`\`python
products.sort_values(by="price", na_position="first")
\`\`\`

결측치를 뒤쪽에 두려면 다음처럼 작성합니다.

\`\`\`python
products.sort_values(by="price", na_position="last")
\`\`\`

결측치가 있는 데이터를 정렬할 때는 결측치가 어디에 배치되는지 확인해야 합니다.  
특히 상위 또는 하위 데이터를 추출할 때 결측치가 분석 결과에 영향을 줄 수 있습니다.

---

### 8.2.6 정렬 후 인덱스 정리하기

정렬을 하면 행의 순서는 바뀌지만 기존 인덱스는 그대로 유지됩니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)

sorted_orders
\`\`\`

결과를 보면 행의 순서는 바뀌었지만 왼쪽 인덱스는 원래 행 번호를 유지합니다.  
이것은 pandas가 “이 행이 원래 몇 번째 행이었는지” 기억하고 있기 때문입니다.

하지만 보고서나 결과 파일을 만들 때는 인덱스를 0부터 다시 정리하고 싶을 수 있습니다.

이때는 \`reset_index()\`를 사용합니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)
sorted_orders = sorted_orders.reset_index(drop=True)

sorted_orders
\`\`\`

\`drop=True\`를 지정하면 기존 인덱스를 새 컬럼으로 남기지 않고 버립니다.

또는 \`sort_values()\`에서 바로 \`ignore_index=True\`를 사용할 수도 있습니다.

\`\`\`python
orders.sort_values(
    by="total_price",
    ascending=False,
    ignore_index=True
)
\`\`\`

정렬 결과를 새로운 표처럼 사용할 때는 인덱스를 정리하는 습관이 도움이 됩니다.

---
`;export{e as default};