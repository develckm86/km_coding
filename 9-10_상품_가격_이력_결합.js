var e=`# 9장. 복잡한 데이터 결합 실습

## 9.10 상품 가격 이력 결합

이번에는 주문일 기준으로 당시 상품 가격을 붙입니다.

상품 가격은 시간에 따라 변합니다.  
따라서 단순 \`product_id\` 결합이 아니라, 주문일 기준으로 유효한 가격을 찾아야 합니다.

---

### 9.10.1 가격 이력 데이터 확인

\`\`\`python
price_history.sort_values(["product_id", "effective_date"])
\`\`\`

예를 들어 P001 가격은 여러 번 바뀝니다.

\`\`\`text
2026-01-01: 300000
2026-03-01: 320000
2026-04-01: 310000
\`\`\`

---

### 9.10.2 merge_asof를 위한 정렬

\`merge_asof()\`를 사용하려면 결합 기준 날짜가 정렬되어 있어야 합니다.

\`\`\`python
orders_for_price = orders.sort_values(["product_id", "order_date"]).copy()
price_history_sorted = price_history.sort_values(["product_id", "effective_date"]).copy()
\`\`\`

하지만 pandas 버전에 따라 \`merge_asof()\`는 \`by\`와 날짜 기준 정렬에서 전체 날짜 기준 정렬을 요구할 수 있습니다.  
안전하게 날짜 기준을 우선 정렬합니다.

\`\`\`python
orders_for_price = orders.sort_values("order_date").copy()
price_history_sorted = price_history.sort_values("effective_date").copy()
\`\`\`

---

### 9.10.3 merge_asof로 주문일 기준 가격 붙이기

\`\`\`python
orders_with_price_history = pd.merge_asof(
    orders_for_price,
    price_history_sorted,
    by="product_id",
    left_on="order_date",
    right_on="effective_date",
    direction="backward"
)

orders_with_price_history[[
    "order_id",
    "order_date",
    "product_id",
    "effective_date",
    "unit_price"
]]
\`\`\`

\`direction="backward"\`는 주문일보다 같거나 이전인 가격 이력 중 가장 가까운 값을 붙입니다.

---

### 9.10.4 가격 이력 기준 주문 금액 계산

\`\`\`python
orders_with_price_history["gross_amount_history"] = (
    orders_with_price_history["quantity"] * orders_with_price_history["unit_price"]
)

orders_with_price_history["net_amount_history"] = (
    orders_with_price_history["gross_amount_history"] - orders_with_price_history["coupon_amount"]
)

orders_with_price_history[[
    "order_id",
    "order_date",
    "product_id",
    "quantity",
    "unit_price",
    "coupon_amount",
    "net_amount_history"
]]
\`\`\`

---

### 9.10.5 가격 이력 매칭 실패 확인

\`P999\`는 가격 이력이 없으므로 결측치가 됩니다.

\`\`\`python
price_history_join_check = orders_with_price_history[
    orders_with_price_history["unit_price"].isna()
][["order_id", "order_date", "product_id"]].copy()

price_history_join_check["issue_type"] = "가격 이력 매칭 실패"

price_history_join_check
\`\`\`

---

### 9.10.6 저장하기

\`\`\`python
orders_with_price_history.to_csv(
    DATA_PROCESSED / "chapter_09_orders_with_price_history.csv",
    index=False
)

price_history_join_check.to_csv(
    OUTPUT_TABLES / "chapter_09_price_history_join_check.csv",
    index=False
)
\`\`\`

---

### 9.10.7 해석 예시

\`\`\`text
상품 가격 이력 결합은 주문 시점의 가격을 반영하는 데 필요하다.
단순 상품 마스터의 현재 가격을 사용하면 과거 주문의 매출이 잘못 계산될 수 있다.
merge_asof를 사용하면 주문일 이전의 최신 가격을 붙일 수 있다.
가격 이력이 없는 상품은 매출 계산에서 제외하거나 상품 이력을 보완해야 한다.
\`\`\`

---
`;export{e as default};