var e=`# 10장. 고객별 Feature Table 만들기

## 10.18 함수로 Feature Table 생성 구조화하기

반복해서 고객 Feature Table을 만들 수 있도록 함수를 작성합니다.

---

### 10.18.1 구매 Feature 함수

\`\`\`python
def make_purchase_features(df: pd.DataFrame) -> pd.DataFrame:
    result = (
        df
        .groupby("customer_id")
        .agg(
            customer_name=("customer_name", "first"),
            region=("region", "first"),
            customer_grade=("customer_grade", "last"),
            total_purchase=("net_amount", "sum"),
            order_count=("order_id", "count"),
            avg_order_amount=("net_amount", "mean"),
            median_order_amount=("net_amount", "median"),
            max_order_amount=("net_amount", "max"),
            min_order_amount=("net_amount", "min"),
            total_quantity=("quantity", "sum")
        )
        .reset_index()
    )

    result["avg_order_amount"] = result["avg_order_amount"].round(0)
    result["median_order_amount"] = result["median_order_amount"].round(0)
    result["avg_quantity_per_order"] = (
        result["total_quantity"] / result["order_count"]
    ).round(2)
    result["is_repeat_customer"] = result["order_count"] >= 2

    return result
\`\`\`

---

### 10.18.2 날짜 Feature 함수

\`\`\`python
def make_date_features(df: pd.DataFrame, base_date: str) -> pd.DataFrame:
    base_date = pd.Timestamp(base_date)

    result = (
        df
        .groupby("customer_id")
        .agg(
            first_order_date=("order_date", "min"),
            last_order_date=("order_date", "max"),
            active_order_months=("year_month", "nunique")
        )
        .reset_index()
    )

    result["days_since_last_order"] = (
        base_date - result["last_order_date"]
    ).dt.days

    result["days_since_first_order"] = (
        base_date - result["first_order_date"]
    ).dt.days

    result["active_period_days"] = (
        result["last_order_date"] - result["first_order_date"]
    ).dt.days

    return result
\`\`\`

---

### 10.18.3 쿠폰 Feature 함수

\`\`\`python
def make_coupon_features(df: pd.DataFrame) -> pd.DataFrame:
    result = (
        df
        .groupby("customer_id")
        .agg(
            coupon_order_count=("used_coupon", "sum"),
            total_order_count=("order_id", "count"),
            total_coupon_amount=("coupon_amount", "sum"),
            avg_coupon_amount=("coupon_amount", "mean")
        )
        .reset_index()
    )

    result["coupon_usage_rate"] = (
        result["coupon_order_count"] / result["total_order_count"] * 100
    ).round(1)

    result["is_coupon_user"] = result["coupon_order_count"] > 0
    result["avg_coupon_amount"] = result["avg_coupon_amount"].round(0)

    return result
\`\`\`

---

### 10.18.4 전체 Feature Table 생성 함수

\`\`\`python
def build_customer_feature_table(
    orders: pd.DataFrame,
    base_date: str = "2026-04-30"
) -> pd.DataFrame:
    df = orders.copy()

    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["customer_id", "order_date", "net_amount"]).copy()

    df["year_month"] = df["order_date"].dt.to_period("M").astype(str)
    df["used_coupon"] = df["coupon_amount"].fillna(0) > 0

    purchase_features = make_purchase_features(df)
    date_features = make_date_features(df, base_date)
    coupon_features = make_coupon_features(df)

    result = (
        purchase_features
        .merge(date_features, on="customer_id", how="left", validate="one_to_one")
        .merge(coupon_features, on="customer_id", how="left", validate="one_to_one")
    )

    q_low = result["total_purchase"].quantile(0.33)
    q_high = result["total_purchase"].quantile(0.67)

    def assign_segment(value):
        if value >= q_high:
            return "High Value"
        elif value >= q_low:
            return "Middle Value"
        else:
            return "Low Value"

    result["value_segment"] = result["total_purchase"].apply(assign_segment)

    return result
\`\`\`

---

### 10.18.5 함수 사용 예시

\`\`\`python
customer_feature_table_func = build_customer_feature_table(
    customer_order_base,
    base_date="2026-04-30"
)

customer_feature_table_func.head()
\`\`\`

함수화하면 매월 새 주문 데이터가 들어와도 같은 방식으로 Feature Table을 만들 수 있습니다.

---
`;export{e as default};