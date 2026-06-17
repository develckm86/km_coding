var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-8 -->

# 15.8 결합 key가 다른 이름일 때

두 DataFrame의 key 컬럼 이름이 항상 같지는 않습니다.

예를 들어 주문 데이터에는 \`customer_id\`라는 컬럼이 있고, 고객 데이터에는 \`id\`라는 컬럼이 있을 수 있습니다.

\`\`\`python
orders_sample = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "customer_id": [1, 2, 3],
    "total_price": [300000, 45000, 50000]
})

customers_sample = pd.DataFrame({
    "id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"],
    "region": ["서울", "부산", "서울"]
})
\`\`\`

이때는 \`left_on\`과 \`right_on\`을 사용합니다.

\`\`\`python
orders_sample.merge(
    customers_sample,
    left_on="customer_id",
    right_on="id",
    how="left"
)
\`\`\`

의미는 다음과 같습니다.

\`\`\`text
왼쪽 DataFrame의 customer_id와
오른쪽 DataFrame의 id를 기준으로 결합한다.
\`\`\`

결합 후에는 \`customer_id\`와 \`id\`가 모두 남을 수 있습니다.  
불필요한 key 컬럼은 제거할 수 있습니다.

\`\`\`python
merged = orders_sample.merge(
    customers_sample,
    left_on="customer_id",
    right_on="id",
    how="left"
)

merged = merged.drop(columns=["id"])

merged
\`\`\`

실무에서는 결합 전에 컬럼명을 통일하는 것도 좋은 방법입니다.

\`\`\`python
customers_sample = customers_sample.rename(columns={"id": "customer_id"})

orders_sample.merge(customers_sample, on="customer_id", how="left")
\`\`\`

---
`;export{e as default};