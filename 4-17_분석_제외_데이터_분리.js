var e=`# 4장. 분석용 데이터마트 만들기

## 4.17 분석 제외 데이터 분리

모든 주문을 데이터마트에 그대로 넣을 수도 있지만, 분석 목적에 따라 제외해야 하는 데이터가 있습니다.

이번 실습에서는 다음 조건에 해당하는 주문을 매출 분석에서 제외합니다.

\`\`\`text
수량이 0 이하인 주문
쿠폰 금액이 음수인 주문
상품 정보가 없어 단가를 계산할 수 없는 주문
순매출을 계산할 수 없는 주문
\`\`\`

---

### 4.17.1 제외 사유 컬럼 만들기

\`\`\`python
def get_exclusion_reason(row):
    reasons = []

    if row["invalid_quantity"]:
        reasons.append("수량 오류")

    if row["invalid_coupon_amount"]:
        reasons.append("쿠폰 금액 오류")

    if row["missing_product_info"]:
        reasons.append("상품 정보 없음")

    if pd.isna(row["net_amount"]):
        reasons.append("순매출 계산 불가")

    if len(reasons) == 0:
        return pd.NA

    return ", ".join(reasons)
\`\`\`

함수를 적용합니다.

\`\`\`python
orders_full["exclusion_reason"] = orders_full.apply(
    get_exclusion_reason,
    axis=1
)
\`\`\`

확인합니다.

\`\`\`python
orders_full[["order_id", "exclusion_reason"]]
\`\`\`

---

### 4.17.2 제외 데이터 만들기

\`\`\`python
excluded_orders = orders_full[
    orders_full["exclusion_reason"].notna()
].copy()

excluded_orders
\`\`\`

---

### 4.17.3 분석용 데이터마트 만들기

\`\`\`python
orders_mart = orders_full[
    orders_full["exclusion_reason"].isna()
].copy()

orders_mart
\`\`\`

이제 \`orders_mart\`는 매출 분석에 사용할 수 있는 주문 데이터입니다.

---

### 4.17.4 제외 데이터 저장하기

\`\`\`python
excluded_orders.to_csv(
    DATA_PROCESSED / "chapter_04_excluded_orders.csv",
    index=False
)
\`\`\`

---
`;export{e as default};