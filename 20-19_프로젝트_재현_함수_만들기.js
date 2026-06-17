var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.19 프로젝트 재현 함수 만들기

실무 프로젝트는 재현 가능해야 합니다.

모든 분석을 하나의 함수로 완전히 묶지는 않더라도, 핵심 처리 로직은 함수로 관리하는 것이 좋습니다.

---

### 20.19.1 데이터 품질 점검 함수

\`\`\`python
def check_order_quality(orders: pd.DataFrame, products: pd.DataFrame) -> pd.DataFrame:
    valid_product_ids = set(products["product_id"])

    return pd.DataFrame([
        {
            "check_name": "missing_customer_id",
            "issue_count": int(orders["customer_id"].isna().sum())
        },
        {
            "check_name": "missing_order_date",
            "issue_count": int(orders["order_date"].isna().sum())
        },
        {
            "check_name": "negative_net_amount",
            "issue_count": int((orders["net_amount"] < 0).sum())
        },
        {
            "check_name": "duplicated_order_id",
            "issue_count": int(orders["order_id"].duplicated().sum())
        },
        {
            "check_name": "unmatched_product_id",
            "issue_count": int((~orders["product_id"].isin(valid_product_ids)).sum())
        }
    ])
\`\`\`

---

### 20.19.2 데이터마트 생성 함수

\`\`\`python
def build_data_mart(
    orders: pd.DataFrame,
    customers: pd.DataFrame,
    products: pd.DataFrame
) -> pd.DataFrame:
    valid_orders = orders.copy()

    valid_orders = valid_orders.drop_duplicates(subset=["order_id"], keep="first")
    valid_orders = valid_orders.dropna(subset=["customer_id", "order_date", "net_amount"])
    valid_orders = valid_orders[valid_orders["net_amount"] >= 0]
    valid_orders = valid_orders[valid_orders["product_id"].isin(products["product_id"])]

    valid_orders["customer_id"] = valid_orders["customer_id"].astype(int)
    valid_orders["order_date"] = pd.to_datetime(valid_orders["order_date"], errors="coerce")
    valid_orders["year_month"] = valid_orders["order_date"].dt.to_period("M").astype(str)

    mart = valid_orders.merge(
        customers,
        on="customer_id",
        how="left",
        validate="many_to_one"
    )

    mart = mart.merge(
        products[["product_id", "product_name", "category", "supplier"]],
        on="product_id",
        how="left",
        validate="many_to_one"
    )

    return mart
\`\`\`

---

### 20.19.3 매출 요약 함수

\`\`\`python
def make_sales_summary(mart: pd.DataFrame) -> pd.DataFrame:
    return (
        mart
        .groupby("year_month")
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "nunique"),
            unique_customers=("customer_id", "nunique")
        )
        .reset_index()
        .sort_values("year_month")
    )
\`\`\`

---

### 20.19.4 고객 Feature 함수

\`\`\`python
def make_customer_features(mart: pd.DataFrame, base_date: str) -> pd.DataFrame:
    base_date = pd.Timestamp(base_date)

    features = (
        mart
        .groupby("customer_id")
        .agg(
            customer_name=("customer_name", "first"),
            region=("region", "first"),
            grade=("grade", "first"),
            total_purchase=("net_amount", "sum"),
            order_count=("order_id", "nunique"),
            avg_order_amount=("net_amount", "mean"),
            first_order_date=("order_date", "min"),
            last_order_date=("order_date", "max"),
            category_count=("category", "nunique")
        )
        .reset_index()
    )

    features["avg_order_amount"] = features["avg_order_amount"].round(0)
    features["days_since_last_order"] = (
        base_date - features["last_order_date"]
    ).dt.days
    features["is_repeat_customer"] = features["order_count"] >= 2

    return features
\`\`\`

---
`;export{e as default};