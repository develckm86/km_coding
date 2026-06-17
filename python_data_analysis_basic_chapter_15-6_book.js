var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-6 -->

# 15.6 key 기준 결합: \`merge()\`

\`merge()\`는 두 DataFrame을 공통 key 기준으로 연결합니다.

예를 들어 주문 데이터에는 \`customer_id\`가 있고, 고객 데이터에도 \`customer_id\`가 있습니다.

이 공통 컬럼을 기준으로 주문 데이터에 고객 정보를 붙일 수 있습니다.

---

### 15.6.1 기본 \`merge()\`

먼저 1월과 2월 주문을 하나로 합칩니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb], ignore_index=True)
\`\`\`

이제 주문 데이터에 고객 데이터를 붙입니다.

\`\`\`python
orders_with_customer = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

orders_with_customer
\`\`\`

이 코드는 다음 의미입니다.

\`\`\`text
orders를 기준으로 유지하면서,
customer_id가 같은 customers 정보를 붙인다.
\`\`\`

\`on="customer_id"\`는 결합 기준 컬럼입니다.  
\`how="left"\`는 왼쪽 데이터인 \`orders\`를 모두 유지하겠다는 의미입니다.

---

### 15.6.2 \`merge()\` 결과 이해하기

결합 전 주문 데이터에는 고객 ID만 있습니다.

\`\`\`python
orders
\`\`\`

결합 후에는 고객 이름, 지역, 등급이 추가됩니다.

\`\`\`python
orders_with_customer
\`\`\`

이제 다음 분석이 가능해집니다.

\`\`\`python
orders_with_customer.groupby("region")["total_price"].sum()
orders_with_customer.groupby("grade")["total_price"].mean()
\`\`\`

데이터 결합은 분석에 필요한 기준 컬럼을 추가해주는 역할을 합니다.

---

### 15.6.3 상품 데이터 결합하기

주문 데이터에는 \`product_id\`가 있습니다.  
상품 데이터에도 \`product_id\`가 있습니다.

이번에는 상품 정보를 붙여보겠습니다.

\`\`\`python
orders_full = orders_with_customer.merge(
    products,
    on="product_id",
    how="left"
)

orders_full
\`\`\`

이제 주문 데이터에는 고객 정보와 상품 정보가 모두 포함됩니다.

\`\`\`python
orders_full.columns
\`\`\`

분석 가능한 질문이 늘어납니다.

\`\`\`text
지역별 매출
고객 등급별 매출
상품 카테고리별 매출
상품명별 판매 수량
지역별 카테고리 매출
\`\`\`

예를 들어 카테고리별 매출을 계산할 수 있습니다.

\`\`\`python
orders_full.groupby("category")["total_price"].sum()
\`\`\`

---
`;export{e as default};