var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-11 -->

# 15.11 결합 상태 확인: \`indicator\`

\`merge()\`에서 \`indicator=True\`를 사용하면 각 행이 어디에서 왔는지 확인할 수 있습니다.

\`\`\`python
left = pd.DataFrame({
    "id": [1, 2, 3],
    "left_value": ["A", "B", "C"]
})

right = pd.DataFrame({
    "id": [2, 3, 4],
    "right_value": ["X", "Y", "Z"]
})

merged = pd.merge(
    left,
    right,
    on="id",
    how="outer",
    indicator=True
)

merged
\`\`\`

결과에는 \`_merge\` 컬럼이 추가됩니다.

\`\`\`text
left_only   → 왼쪽에만 있음
right_only  → 오른쪽에만 있음
both        → 양쪽에 모두 있음
\`\`\`

이 기능은 결합 결과를 검증할 때 매우 유용합니다.

예를 들어 주문 데이터에 고객 정보를 붙였는데 고객 정보가 없는 주문이 있는지 확인할 수 있습니다.

\`\`\`python
orders_customer_check = orders.merge(
    customers,
    on="customer_id",
    how="left",
    indicator=True
)

orders_customer_check["_merge"].value_counts()
\`\`\`

\`left_only\`가 있다면 주문 데이터에는 있지만 고객 데이터에는 없는 고객 ID가 있다는 뜻입니다.

\`\`\`python
orders_customer_check[orders_customer_check["_merge"] == "left_only"]
\`\`\`

이런 행은 별도로 확인해야 합니다.

---
`;export{e as default};