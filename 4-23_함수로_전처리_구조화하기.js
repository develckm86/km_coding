var e=`# 4장. 분석용 데이터마트 만들기

## 4.23 함수로 전처리 구조화하기

지금까지 전처리를 단계별로 수행했습니다.  
실무에서는 이 과정을 함수로 구조화하면 재사용하기 좋습니다.

---

### 4.23.1 고객 데이터 정리 함수

\`\`\`python
def clean_customers(customers_raw: pd.DataFrame) -> pd.DataFrame:
    customers = customers_raw.copy()

    customers = customers.drop_duplicates(
        subset=["customer_id"],
        keep="first",
        ignore_index=True
    )

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

    customers["signup_date"] = pd.to_datetime(
        customers["signup_date"],
        errors="coerce"
    )

    return customers[[
        "customer_id",
        "customer_name",
        "region",
        "grade",
        "signup_date",
        "visit_count"
    ]]
\`\`\`

---

### 4.23.2 상품 데이터 정리 함수

\`\`\`python
def clean_products(products_raw: pd.DataFrame) -> pd.DataFrame:
    products = products_raw.copy()

    products = products.drop_duplicates(
        subset=["product_id"],
        keep="first",
        ignore_index=True
    )

    return products[[
        "product_id",
        "product_name",
        "category",
        "unit_price",
        "supplier"
    ]]
\`\`\`

---

### 4.23.3 주문 데이터 정리 함수

\`\`\`python
def clean_orders(orders_raw: pd.DataFrame) -> pd.DataFrame:
    orders = orders_raw.copy()

    orders = orders.drop_duplicates(
        subset=["order_id"],
        keep="first",
        ignore_index=True
    )

    orders["coupon_amount"] = orders["coupon_amount"].fillna(0)

    orders["order_date_dt"] = pd.to_datetime(
        orders["order_date"],
        errors="coerce"
    )

    orders["year_month"] = orders["order_date_dt"].dt.to_period("M").astype(str)
    orders["weekday"] = orders["order_date_dt"].dt.day_name()

    orders["invalid_quantity"] = orders["quantity"] <= 0
    orders["invalid_coupon_amount"] = orders["coupon_amount"] < 0

    orders["exclude_by_order_rule"] = (
        orders["invalid_quantity"] |
        orders["invalid_coupon_amount"]
    )

    return orders
\`\`\`

---

### 4.23.4 데이터마트 생성 함수

\`\`\`python
def build_orders_mart(
    orders_raw: pd.DataFrame,
    customers_raw: pd.DataFrame,
    products_raw: pd.DataFrame
) -> tuple[pd.DataFrame, pd.DataFrame]:
    orders = clean_orders(orders_raw)
    customers = clean_customers(customers_raw)
    products = clean_products(products_raw)

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

    orders_full["missing_product_info"] = orders_full["product_name"].isna()

    orders_full["gross_amount"] = orders_full["quantity"] * orders_full["unit_price"]
    orders_full["net_amount"] = orders_full["gross_amount"] - orders_full["coupon_amount"]
    orders_full["used_coupon"] = orders_full["coupon_amount"] > 0

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

    excluded_orders = orders_full[
        orders_full["exclusion_reason"].notna()
    ].copy()

    orders_mart = orders_full[
        orders_full["exclusion_reason"].isna()
    ].copy()

    return orders_mart, excluded_orders
\`\`\`

---

### 4.23.5 함수 사용 예시

\`\`\`python
orders_mart_func, excluded_orders_func = build_orders_mart(
    orders_raw,
    customers_raw,
    products_raw
)

orders_mart_func.head()
\`\`\`

함수로 만들면 다음 장점이 있습니다.

\`\`\`text
전처리 과정을 반복 실행할 수 있다.
코드가 구조화된다.
다른 데이터에도 적용하기 쉽다.
자동화로 확장하기 좋다.
\`\`\`

---
`;export{e as default};