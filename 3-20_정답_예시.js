var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.20 정답 예시

아래 코드는 3장 실습 과제를 수행하는 하나의 예시입니다.

---

### 3.20.1 결측치 요약 함수 정답 예시

\`\`\`python
def make_missing_summary(df: pd.DataFrame, table_name: str) -> pd.DataFrame:
    return pd.DataFrame({
        "table_name": table_name,
        "column_name": df.columns,
        "row_count": len(df),
        "missing_count": df.isna().sum().values,
        "missing_ratio_percent": (df.isna().mean().values * 100).round(2)
    })
\`\`\`

사용 예:

\`\`\`python
missing_summary = pd.concat([
    make_missing_summary(orders, "orders"),
    make_missing_summary(customers, "customers"),
    make_missing_summary(products, "products")
], ignore_index=True)
\`\`\`

---

### 3.20.2 중복 key 진단 정답 예시

\`\`\`python
duplicate_summary = pd.DataFrame([
    check_duplicate_key(orders, "orders", ["order_id"]),
    check_duplicate_key(customers, "customers", ["customer_id"]),
    check_duplicate_key(products, "products", ["product_id"])
])
\`\`\`

---

### 3.20.3 key 매칭 실패 정답 예시

\`\`\`python
missing_customer_ids = set(orders["customer_id"].dropna()) - set(customers["customer_id"].dropna())
missing_product_ids = set(orders["product_id"].dropna()) - set(products["product_id"].dropna())

key_matching_summary = pd.DataFrame([
    {
        "source_table": "orders",
        "source_key": "customer_id",
        "master_table": "customers",
        "master_key": "customer_id",
        "unmatched_key_count": len(missing_customer_ids),
        "unmatched_keys": ", ".join(map(str, sorted(missing_customer_ids)))
    },
    {
        "source_table": "orders",
        "source_key": "product_id",
        "master_table": "products",
        "master_key": "product_id",
        "unmatched_key_count": len(missing_product_ids),
        "unmatched_keys": ", ".join(sorted(missing_product_ids))
    }
])
\`\`\`

---

### 3.20.4 날짜 오류 진단 정답 예시

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"], errors="coerce")
customers["signup_date_dt"] = pd.to_datetime(customers["signup_date"], errors="coerce")

invalid_orders = orders[orders["order_date_dt"].isna()]
invalid_customers = customers[customers["signup_date_dt"].isna()]
\`\`\`

---

### 3.20.5 이상값 후보 진단 정답 예시

\`\`\`python
invalid_quantity = orders[orders["quantity"] <= 0]
invalid_coupon = orders[orders["coupon_amount"] < 0]
invalid_unit_price = products[products["unit_price"] <= 0]
\`\`\`

IQR 기준 이상값 후보:

\`\`\`python
products_unique = products.drop_duplicates(subset=["product_id"], keep="first")

orders_amount = orders.merge(
    products_unique,
    on="product_id",
    how="left"
)

orders_amount["coupon_amount_filled"] = orders_amount["coupon_amount"].fillna(0)

orders_amount["net_amount"] = (
    orders_amount["quantity"] * orders_amount["unit_price"]
    - orders_amount["coupon_amount_filled"]
)

amount_data = orders_amount.dropna(subset=["net_amount"]).copy()

q1 = amount_data["net_amount"].quantile(0.25)
q3 = amount_data["net_amount"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outliers = amount_data[
    (amount_data["net_amount"] < lower_bound) |
    (amount_data["net_amount"] > upper_bound)
]
\`\`\`

---
`;export{e as default};