var e=`# 9장. 복잡한 데이터 결합 실습

## 9.9 다중 key 결합 실습

이번에는 \`store_id\`와 \`product_id\`를 함께 기준으로 지점별 상품 가격을 붙입니다.

---

### 9.9.1 다중 key 결합

\`\`\`python
orders_store_price = orders.merge(
    store_product_prices,
    on=["store_id", "product_id"],
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_store_price["_merge"].value_counts()
\`\`\`

\`P999\`는 가격 데이터에 없으므로 매칭 실패할 수 있습니다.

---

### 9.9.2 지점별 가격 기준 금액 계산

\`\`\`python
orders_store_price["gross_amount_store"] = (
    orders_store_price["quantity"] * orders_store_price["store_unit_price"]
)

orders_store_price["net_amount_store"] = (
    orders_store_price["gross_amount_store"] - orders_store_price["coupon_amount"]
)

orders_store_price[[
    "order_id",
    "store_id",
    "product_id",
    "quantity",
    "store_unit_price",
    "net_amount_store",
    "_merge"
]]
\`\`\`

---

### 9.9.3 다중 key 매칭 실패 확인

\`\`\`python
unmatched_store_price = orders_store_price[
    orders_store_price["_merge"] == "left_only"
][["order_id", "store_id", "product_id"]]

unmatched_store_price
\`\`\`

---

### 9.9.4 저장하기

\`\`\`python
orders_store_price.to_csv(
    OUTPUT_TABLES / "chapter_09_multi_key_join_result.csv",
    index=False
)
\`\`\`

---

### 9.9.5 해석 예시

\`\`\`text
지점별 가격 데이터는 store_id와 product_id를 함께 사용해 결합해야 한다.
product_id만으로 결합하면 지점별 가격 차이를 반영할 수 없다.
다중 key 결합에서도 오른쪽 데이터의 key 조합이 유일한지 확인해야 한다.
\`\`\`

---
`;export{e as default};