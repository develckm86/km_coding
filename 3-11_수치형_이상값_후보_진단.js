var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.11 수치형 이상값 후보 진단

수치형 데이터에서는 비정상적으로 크거나 작은 값을 확인해야 합니다.

이번 실습에서는 다음 컬럼을 확인합니다.

\`\`\`text
quantity
coupon_amount
unit_price
\`\`\`

\`unit_price\`는 상품 데이터에 있고, \`quantity\`와 \`coupon_amount\`는 주문 데이터에 있습니다.

---

### 3.11.1 수량 오류 확인

수량은 일반적으로 0보다 커야 합니다.

\`\`\`python
invalid_quantity = orders[orders["quantity"] <= 0]

invalid_quantity
\`\`\`

이번 데이터에는 \`quantity\`가 -1인 주문이 있습니다.

---

### 3.11.2 쿠폰 금액 오류 확인

쿠폰 금액은 결측치가 있을 수 있지만, 음수는 일반적으로 비정상입니다.

\`\`\`python
invalid_coupon = orders[orders["coupon_amount"] < 0]

invalid_coupon
\`\`\`

음수 쿠폰 금액은 입력 오류일 가능성이 있습니다.

---

### 3.11.3 상품 단가 오류 확인

상품 단가는 0보다 커야 합니다.

\`\`\`python
invalid_unit_price = products[products["unit_price"] <= 0]

invalid_unit_price
\`\`\`

이번 상품 데이터에는 단가 오류가 없을 수 있습니다.

---

### 3.11.4 IQR 기준 이상값 후보 확인

주문 데이터에 상품 단가를 붙여 주문 금액을 계산해봅니다.  
다만 상품 데이터에 product_id 중복이 있으므로 실제 분석에서는 먼저 상품 마스터 중복을 처리해야 합니다.

품질 진단 단계에서는 이상값 후보 탐색용으로 중복 제거한 상품 데이터를 임시로 사용하겠습니다.

\`\`\`python
products_unique = products.drop_duplicates(subset=["product_id"], keep="first")

orders_for_amount = orders.merge(
    products_unique,
    on="product_id",
    how="left"
)

orders_for_amount["coupon_amount_filled"] = orders_for_amount["coupon_amount"].fillna(0)

orders_for_amount["net_amount"] = (
    orders_for_amount["quantity"] * orders_for_amount["unit_price"]
    - orders_for_amount["coupon_amount_filled"]
)

orders_for_amount[["order_id", "quantity", "unit_price", "coupon_amount", "net_amount"]]
\`\`\`

\`net_amount\`가 계산 가능한 행만 대상으로 IQR 기준 이상값 후보를 찾습니다.

\`\`\`python
amount_data = orders_for_amount.dropna(subset=["net_amount"]).copy()

q1 = amount_data["net_amount"].quantile(0.25)
q3 = amount_data["net_amount"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

amount_outliers = amount_data[
    (amount_data["net_amount"] < lower_bound) |
    (amount_data["net_amount"] > upper_bound)
].copy()

amount_outliers[["order_id", "product_id", "quantity", "unit_price", "coupon_amount", "net_amount"]]
\`\`\`

이 값들은 오류라고 단정하지 않습니다.  
이상값 후보로 표시하고 원본 확인이 필요합니다.

---

### 3.11.5 이상값 후보 목록 만들기

여러 이상값 후보를 하나의 표로 정리합니다.

\`\`\`python
outlier_records = []

for _, row in invalid_quantity.iterrows():
    outlier_records.append({
        "table_name": "orders",
        "column_name": "quantity",
        "issue_type": "business_rule_violation",
        "key_value": row["order_id"],
        "value": row["quantity"],
        "reason": "quantity는 0보다 커야 함"
    })

for _, row in invalid_coupon.iterrows():
    outlier_records.append({
        "table_name": "orders",
        "column_name": "coupon_amount",
        "issue_type": "business_rule_violation",
        "key_value": row["order_id"],
        "value": row["coupon_amount"],
        "reason": "coupon_amount는 음수가 될 수 없음"
    })

for _, row in amount_outliers.iterrows():
    outlier_records.append({
        "table_name": "orders",
        "column_name": "net_amount",
        "issue_type": "iqr_outlier_candidate",
        "key_value": row["order_id"],
        "value": row["net_amount"],
        "reason": "IQR 기준 이상값 후보"
    })

outlier_candidates = pd.DataFrame(outlier_records)

outlier_candidates
\`\`\`

---

### 3.11.6 이상값 후보 목록 저장하기

\`\`\`python
outlier_candidates.to_csv(
    OUTPUT_TABLES / "chapter_03_outlier_candidates.csv",
    index=False
)
\`\`\`

---

### 3.11.7 이상값 해석하기

해석 예시:

\`\`\`text
quantity가 0 이하인 주문이 발견되었다.
수량은 주문 금액 계산의 핵심 요소이므로 원본 확인 후 수정 또는 제외가 필요하다.

coupon_amount가 음수인 주문이 발견되었다.
쿠폰 금액은 음수가 될 수 없으므로 입력 오류 가능성이 높다.

net_amount 기준 IQR 이상값 후보가 발견될 수 있다.
다만 고가 상품 주문은 실제 정상 주문일 수 있으므로 이상값이라는 이유만으로 삭제하지 않는다.
\`\`\`

이상값은 “삭제할 값”이 아니라 “검토할 값”입니다.

---
`;export{e as default};