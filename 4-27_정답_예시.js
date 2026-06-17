var e=`# 4장. 분석용 데이터마트 만들기

## 4.27 정답 예시

아래는 이번 장 실습 과제의 한 가지 예시입니다.

---

### 4.27.1 전처리 시작

\`\`\`python
orders = orders_raw.copy()
customers = customers_raw.copy()
products = products_raw.copy()
\`\`\`

---

### 4.27.2 중복 처리

\`\`\`python
orders = orders.drop_duplicates(subset=["order_id"], keep="first", ignore_index=True)
customers = customers.drop_duplicates(subset=["customer_id"], keep="first", ignore_index=True)
products = products.drop_duplicates(subset=["product_id"], keep="first", ignore_index=True)
\`\`\`

---

### 4.27.3 결측치와 날짜 처리

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)

orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

orders["year_month"] = orders["order_date_dt"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date_dt"].dt.day_name()

customers["signup_date"] = pd.to_datetime(
    customers["signup_date"],
    errors="coerce"
)
\`\`\`

---

### 4.27.4 문자열 표준화

\`\`\`python
customers["customer_name"] = customers["customer_name"].str.strip()

region_map = {
    "서울특별시": "서울",
    "서울시": "서울",
    "서울": "서울",
    "부산광역시": "부산",
    "부산시": "부산",
    "부산": "부산",
    "대전광역시": "대전",
    "대전": "대전"
}

customers["region"] = customers["region"].replace(region_map)
\`\`\`

---

### 4.27.5 분석 제외 플래그

\`\`\`python
orders["invalid_quantity"] = orders["quantity"] <= 0
orders["invalid_coupon_amount"] = orders["coupon_amount"] < 0
\`\`\`

---

### 4.27.6 고객·상품 결합

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)

orders_customer["customer_name"] = orders_customer["customer_name"].fillna("고객정보없음")
orders_customer["region"] = orders_customer["region"].fillna("미상")
orders_customer["grade"] = orders_customer["grade"].fillna("미상")

orders_full = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

---

### 4.27.7 주문 금액 계산

\`\`\`python
orders_full["missing_product_info"] = orders_full["product_name"].isna()

orders_full["gross_amount"] = (
    orders_full["quantity"] * orders_full["unit_price"]
)

orders_full["net_amount"] = (
    orders_full["gross_amount"] - orders_full["coupon_amount"]
)

orders_full["used_coupon"] = orders_full["coupon_amount"] > 0
\`\`\`

---

### 4.27.8 제외 사유와 데이터마트 생성

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

orders_full["exclusion_reason"] = orders_full.apply(
    get_exclusion_reason,
    axis=1
)

excluded_orders = orders_full[orders_full["exclusion_reason"].notna()].copy()
orders_mart = orders_full[orders_full["exclusion_reason"].isna()].copy()
\`\`\`

---

### 4.27.9 저장

\`\`\`python
orders_mart.to_csv(DATA_PROCESSED / "orders_mart.csv", index=False)
excluded_orders.to_csv(DATA_PROCESSED / "excluded_orders.csv", index=False)
\`\`\`

---
`;export{e as default};