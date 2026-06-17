var e=`# 9장. 복잡한 데이터 결합 실습

## 9.14 검증된 주문 결합 데이터 만들기

이번 장에서 만든 여러 결합 결과를 바탕으로 분석용 결합 데이터를 만들겠습니다.

주문 데이터에 다음 정보를 포함합니다.

\`\`\`text
고객 정보
상품 정보
주문 당시 가격
주문 당시 고객 등급
순매출
\`\`\`

---

### 9.14.1 기본 주문 + 고객 + 상품 데이터 정리

\`\`\`python
orders_joined_verified = orders_product.drop(columns=["_merge"]).copy()
\`\`\`

상품 정보가 없는 주문을 표시합니다.

\`\`\`python
orders_joined_verified["missing_product_info"] = (
    orders_joined_verified["product_name"].isna()
)
\`\`\`

---

### 9.14.2 가격 이력 정보 붙이기

\`\`\`python
orders_joined_verified = orders_joined_verified.merge(
    orders_with_price_history[[
        "order_id",
        "effective_date",
        "unit_price",
        "net_amount_history"
    ]].rename(columns={
        "effective_date": "price_effective_date",
        "unit_price": "unit_price_at_order",
        "net_amount_history": "net_amount"
    }),
    on="order_id",
    how="left",
    validate="one_to_one"
)
\`\`\`

---

### 9.14.3 등급 이력 정보 붙이기

\`\`\`python
orders_joined_verified = orders_joined_verified.merge(
    orders_with_grade_history[[
        "order_id",
        "effective_date",
        "grade_at_time"
    ]].rename(columns={
        "effective_date": "grade_effective_date"
    }),
    on="order_id",
    how="left",
    validate="one_to_one"
)
\`\`\`

---

### 9.14.4 분석 가능 여부 표시

\`\`\`python
orders_joined_verified["is_revenue_analysable"] = (
    orders_joined_verified["net_amount"].notna()
)

orders_joined_verified[[
    "order_id",
    "order_date",
    "customer_id",
    "product_id",
    "product_name",
    "grade_at_time",
    "unit_price_at_order",
    "net_amount",
    "is_revenue_analysable"
]]
\`\`\`

---

### 9.14.5 저장하기

\`\`\`python
orders_joined_verified.to_csv(
    DATA_PROCESSED / "chapter_09_orders_joined_verified.csv",
    index=False
)
\`\`\`

---

### 9.14.6 해석 예시

\`\`\`text
검증된 주문 결합 데이터에는 고객 정보, 상품 정보, 주문 당시 가격, 주문 당시 고객 등급이 포함되어 있다.
상품 정보나 가격 이력이 없는 주문은 매출 분석 가능 여부를 별도 플래그로 표시했다.
이 데이터는 이후 고객 분석, 상품 분석, 캠페인 분석에 사용할 수 있다.
\`\`\`

---
`;export{e as default};