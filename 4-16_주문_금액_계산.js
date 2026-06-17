var e=`# 4장. 분석용 데이터마트 만들기

## 4.16 주문 금액 계산

이제 수량, 단가, 쿠폰 금액을 사용해 주문 금액을 계산합니다.

---

### 4.16.1 총 주문 금액 계산

쿠폰 차감 전 금액을 \`gross_amount\`라고 하겠습니다.

\`\`\`python
orders_full["gross_amount"] = (
    orders_full["quantity"] * orders_full["unit_price"]
)
\`\`\`

---

### 4.16.2 순매출 계산

쿠폰 차감 후 금액을 \`net_amount\`라고 하겠습니다.

\`\`\`python
orders_full["net_amount"] = (
    orders_full["gross_amount"] - orders_full["coupon_amount"]
)
\`\`\`

확인합니다.

\`\`\`python
orders_full[[
    "order_id",
    "quantity",
    "unit_price",
    "coupon_amount",
    "gross_amount",
    "net_amount"
]]
\`\`\`

상품 정보가 없는 주문은 \`unit_price\`가 결측치이므로 \`gross_amount\`와 \`net_amount\`도 결측치가 됩니다.

---

### 4.16.3 쿠폰 사용 여부 만들기

\`\`\`python
orders_full["used_coupon"] = orders_full["coupon_amount"] > 0
\`\`\`

확인합니다.

\`\`\`python
orders_full[["order_id", "coupon_amount", "used_coupon"]]
\`\`\`

---

### 4.16.4 가격대 파생 변수 만들기

순매출 기준으로 가격대를 나눕니다.

\`\`\`python
orders_full["price_level"] = pd.NA

orders_full.loc[orders_full["net_amount"] < 50000, "price_level"] = "저가"
orders_full.loc[
    (orders_full["net_amount"] >= 50000) &
    (orders_full["net_amount"] < 200000),
    "price_level"
] = "중가"
orders_full.loc[orders_full["net_amount"] >= 200000, "price_level"] = "고가"
\`\`\`

확인합니다.

\`\`\`python
orders_full[["order_id", "net_amount", "price_level"]]
\`\`\`

가격대 기준은 다음과 같습니다.

\`\`\`text
저가: 50,000원 미만
중가: 50,000원 이상 200,000원 미만
고가: 200,000원 이상
\`\`\`

---
`;export{e as default};