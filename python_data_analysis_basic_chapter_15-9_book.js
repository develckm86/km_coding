var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-9 -->

# 15.9 여러 key를 기준으로 결합하기

하나의 key만으로는 데이터를 정확히 연결할 수 없을 때가 있습니다.

예를 들어 지점별 상품 가격 데이터가 있다고 합시다.  
같은 상품이라도 지점마다 가격이 다를 수 있습니다.

이 경우 \`product_id\`만으로 결합하면 안 되고, \`store_id\`와 \`product_id\`를 함께 기준으로 사용해야 합니다.

---

### 15.9.1 예제 데이터

\`\`\`python
sales = pd.DataFrame({
    "store_id": ["S1", "S1", "S2", "S2"],
    "product_id": ["P001", "P002", "P001", "P002"],
    "quantity": [2, 3, 1, 4]
})

store_prices = pd.DataFrame({
    "store_id": ["S1", "S1", "S2", "S2"],
    "product_id": ["P001", "P002", "P001", "P002"],
    "unit_price": [300000, 15000, 310000, 14000]
})
\`\`\`

두 컬럼을 기준으로 결합합니다.

\`\`\`python
sales_with_price = sales.merge(
    store_prices,
    on=["store_id", "product_id"],
    how="left"
)

sales_with_price
\`\`\`

이제 매출을 계산할 수 있습니다.

\`\`\`python
sales_with_price["total_price"] = (
    sales_with_price["quantity"] * sales_with_price["unit_price"]
)

sales_with_price
\`\`\`

---

### 15.9.2 여러 key 결합이 필요한 경우

여러 key 결합은 다음과 같은 상황에서 사용됩니다.

\`\`\`text
지점 ID + 상품 ID
날짜 + 상품 ID
고객 ID + 주문일
국가 + 도시
학년 + 반 + 학생 번호
회사 ID + 부서 ID
\`\`\`

하나의 key로만 결합하면 중복 매칭이 발생할 수 있습니다.  
정확한 결합 기준이 여러 컬럼이라면 반드시 여러 key를 사용해야 합니다.

---
`;export{e as default};