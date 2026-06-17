var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-23 -->

# 15.23 정답 및 해설

### 문제 1 정답

정답: B

같은 구조의 여러 DataFrame을 위아래 또는 좌우로 이어 붙일 때는 \`pd.concat()\`을 사용합니다.

---

### 문제 2 정답

\`\`\`python
result = pd.concat([df1, df2], ignore_index=True)

result
\`\`\`

\`ignore_index=True\`를 사용하면 결합 후 인덱스를 0부터 다시 부여합니다.

---

### 문제 3 정답

\`\`\`python
result = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

result
\`\`\`

주문 데이터를 기준으로 유지하면서 고객 정보를 붙입니다.  
\`customer_id\`가 4인 주문은 고객 데이터에 없으므로 \`customer_name\`이 결측치가 됩니다.

---

### 문제 4 정답

\`left join\`은 왼쪽 DataFrame의 모든 행을 유지하면서 오른쪽 DataFrame에서 key가 일치하는 정보를 붙이는 결합 방식입니다.

오른쪽에 매칭되는 key가 없으면 오른쪽에서 가져온 컬럼 값은 결측치가 됩니다.

---

### 문제 5 정답

\`\`\`python
result = orders.merge(
    customers,
    left_on="customer_id",
    right_on="id",
    how="left"
)

result
\`\`\`

왼쪽과 오른쪽의 key 컬럼명이 다르므로 \`left_on\`과 \`right_on\`을 사용합니다.

---

### 문제 6 정답

\`\`\`python
result = sales.merge(
    prices,
    on=["store_id", "product_id"],
    how="left"
)

result
\`\`\`

두 컬럼을 함께 기준으로 결합해야 지점별 상품 가격이 올바르게 붙습니다.

---

### 문제 7 정답

\`\`\`python
result = left.merge(
    right,
    on="id",
    how="outer",
    indicator=True
)

result
\`\`\`

\`indicator=True\`를 사용하면 \`_merge\` 컬럼이 추가되어 각 행이 \`left_only\`, \`right_only\`, \`both\` 중 어디에 해당하는지 확인할 수 있습니다.

---

### 문제 8 정답

결합 후 행 수가 예상보다 늘어났다면 오른쪽 DataFrame의 key가 중복되어 있을 가능성을 의심해야 합니다.

예를 들어 주문 데이터에 고객 정보를 붙일 때 고객 데이터에 같은 \`customer_id\`가 여러 번 있으면, 한 주문이 여러 고객 행과 매칭되어 행 수가 늘어날 수 있습니다.

이런 문제를 방지하려면 결합 전 key 중복을 확인하고, \`validate="many_to_one"\` 같은 옵션을 사용할 수 있습니다.

---

### 문제 9 정답

\`\`\`python
customers["customer_id"].is_unique
\`\`\`

중복된 고객 ID를 직접 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

---

### 문제 10 정답

\`\`\`python
before_rows = len(orders)
before_sales = orders["sales"].sum()

orders_with_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)

orders_full = orders_with_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one"
)

after_rows = len(orders_full)
after_sales = orders_full["sales"].sum()

print("결합 전 행 수:", before_rows)
print("결합 후 행 수:", after_rows)
print("결합 전 sales 합계:", before_sales)
print("결합 후 sales 합계:", after_sales)

orders_full.isna().sum()
\`\`\`

매칭되지 않은 고객과 상품을 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders_full[orders_full["name"].isna()]
orders_full[orders_full["product_name"].isna()]
\`\`\`

이 예제에서는 \`customer_id\` 40이 고객 데이터에 없고, \`product_id\` P9가 상품 데이터에 없습니다.  
따라서 결합 후 해당 행의 고객 정보 또는 상품 정보에 결측치가 생깁니다.

하지만 \`left join\`을 사용했기 때문에 주문 데이터의 행 수와 \`sales\` 합계는 유지됩니다.

---
`;export{e as default};