var e=`# 6장. 고급 groupby 분석 리포트

## 6.16 함수로 groupby 리포트 구조화하기

반복되는 groupby 분석은 함수로 만들 수 있습니다.

---

### 6.16.1 카테고리 요약 함수

\`\`\`python
def make_category_summary(df: pd.DataFrame) -> pd.DataFrame:
    summary = (
        df
        .groupby("category")
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "count"),
            total_quantity=("quantity", "sum"),
            avg_order_amount=("net_amount", "mean"),
            median_order_amount=("net_amount", "median"),
            unique_customers=("customer_id", "nunique")
        )
        .reset_index()
    )

    summary["sales_ratio_percent"] = (
        summary["total_sales"] / summary["total_sales"].sum() * 100
    ).round(1)

    summary["avg_order_amount"] = summary["avg_order_amount"].round(0)
    summary["median_order_amount"] = summary["median_order_amount"].round(0)

    return summary.sort_values(
        by="total_sales",
        ascending=False
    ).reset_index(drop=True)
\`\`\`

---

### 6.16.2 고객 요약 함수

\`\`\`python
def make_customer_summary(df: pd.DataFrame, base_date: str) -> pd.DataFrame:
    base_date = pd.Timestamp(base_date)

    summary = (
        df
        .groupby(["customer_id", "customer_name", "grade", "region"])
        .agg(
            total_purchase=("net_amount", "sum"),
            order_count=("order_id", "count"),
            avg_order_amount=("net_amount", "mean"),
            first_order_date=("order_date_dt", "min"),
            last_order_date=("order_date_dt", "max"),
            category_count=("category", "nunique")
        )
        .reset_index()
    )

    summary["days_since_last_order"] = (
        base_date - summary["last_order_date"]
    ).dt.days

    summary["is_repeat_customer"] = summary["order_count"] >= 2

    avg_customer_purchase = summary["total_purchase"].mean()

    summary["purchase_ratio_to_avg"] = (
        summary["total_purchase"] / avg_customer_purchase
    ).round(2)

    summary["avg_order_amount"] = summary["avg_order_amount"].round(0)

    return summary.sort_values(
        by="total_purchase",
        ascending=False
    ).reset_index(drop=True)
\`\`\`

---

### 6.16.3 카테고리 내 상품 순위 함수

\`\`\`python
def make_product_rank_by_category(df: pd.DataFrame) -> pd.DataFrame:
    product_summary = (
        df
        .groupby(["category", "product_id", "product_name"])
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "count"),
            total_quantity=("quantity", "sum"),
            unique_customers=("customer_id", "nunique")
        )
        .reset_index()
    )

    product_summary["sales_rank_in_category"] = (
        product_summary
        .groupby("category")["total_sales"]
        .rank(ascending=False, method="dense")
        .astype(int)
    )

    product_summary["category_total_sales"] = (
        product_summary
        .groupby("category")["total_sales"]
        .transform("sum")
    )

    product_summary["sales_ratio_in_category"] = (
        product_summary["total_sales"] /
        product_summary["category_total_sales"] * 100
    ).round(1)

    return product_summary.sort_values(
        ["category", "sales_rank_in_category"]
    ).reset_index(drop=True)
\`\`\`

---

### 6.16.4 함수 사용 예시

\`\`\`python
category_summary_func = make_category_summary(orders_mart)
customer_summary_func = make_customer_summary(orders_mart, "2026-04-30")
product_rank_func = make_product_rank_by_category(orders_mart)

category_summary_func
customer_summary_func
product_rank_func
\`\`\`

함수로 만든 분석 코드는 이후 자동 리포트 생성에 활용할 수 있습니다.

---
`;export{e as default};