var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-10 -->

# 15.10 겹치는 컬럼명 처리: \`suffixes\`

두 DataFrame에 key가 아닌 같은 이름의 컬럼이 있으면 pandas가 자동으로 접미사를 붙입니다.

예를 들어 두 데이터에 모두 \`name\` 컬럼이 있다고 해봅시다.

\`\`\`python
orders_sample = pd.DataFrame({
    "order_id": [1001, 1002],
    "customer_id": [1, 2],
    "name": ["주문A", "주문B"]
})

customers_sample = pd.DataFrame({
    "customer_id": [1, 2],
    "name": ["민수", "지영"],
    "region": ["서울", "부산"]
})
\`\`\`

결합해봅니다.

\`\`\`python
orders_sample.merge(
    customers_sample,
    on="customer_id",
    how="left"
)
\`\`\`

결과에는 다음과 같은 컬럼이 생길 수 있습니다.

\`\`\`text
name_x
name_y
\`\`\`

\`name_x\`는 왼쪽 데이터의 \`name\`, \`name_y\`는 오른쪽 데이터의 \`name\`입니다.

이름이 헷갈릴 수 있으므로 \`suffixes\`를 지정하는 것이 좋습니다.

\`\`\`python
merged = orders_sample.merge(
    customers_sample,
    on="customer_id",
    how="left",
    suffixes=("_order", "_customer")
)

merged
\`\`\`

이제 컬럼명이 더 명확해집니다.

\`\`\`text
name_order
name_customer
\`\`\`

실무에서는 결합 전 컬럼명을 명확히 바꾸는 것도 좋은 방법입니다.

\`\`\`python
orders_sample = orders_sample.rename(columns={"name": "order_name"})
customers_sample = customers_sample.rename(columns={"name": "customer_name"})
\`\`\`

컬럼명이 명확하면 결합 후 혼란을 줄일 수 있습니다.

---
`;export{e as default};