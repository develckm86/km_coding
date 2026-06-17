var e=`# 6장. 고급 groupby 분석 리포트

## 6.13 실무 미니 프로젝트: 고급 groupby 분석 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 고급 groupby 분석 리포트를 만듭니다.

---

### 6.13.1 프로젝트 목표

\`\`\`text
주문 데이터마트를 사용해 카테고리, 고객, 상품, 지역, 월별 관점의 고급 요약 리포트를 만든다.
단순 합계뿐 아니라 그룹 내 비율, 순위, 평균 대비 차이, 그룹 필터링 결과를 포함한다.
\`\`\`

---

### 6.13.2 Step 1. 카테고리 요약 리포트

\`\`\`python
category_summary = (
    orders_mart
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

category_summary["sales_ratio_percent"] = (
    category_summary["total_sales"] / category_summary["total_sales"].sum() * 100
).round(1)

category_summary["avg_order_amount"] = category_summary["avg_order_amount"].round(0)
category_summary["median_order_amount"] = category_summary["median_order_amount"].round(0)

category_summary = category_summary.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)
\`\`\`

---

### 6.13.3 Step 2. 고객 요약 리포트

\`\`\`python
customer_summary = (
    orders_mart
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

base_date = pd.Timestamp("2026-04-30")

customer_summary["days_since_last_order"] = (
    base_date - customer_summary["last_order_date"]
).dt.days

customer_summary["is_repeat_customer"] = customer_summary["order_count"] >= 2

avg_customer_purchase = customer_summary["total_purchase"].mean()

customer_summary["purchase_ratio_to_avg"] = (
    customer_summary["total_purchase"] / avg_customer_purchase
).round(2)

customer_summary = customer_summary.sort_values(
    by="total_purchase",
    ascending=False
).reset_index(drop=True)
\`\`\`

---

### 6.13.4 Step 3. 상품 순위 리포트

\`\`\`python
product_summary = (
    orders_mart
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

product_summary = product_summary.sort_values(
    ["category", "sales_rank_in_category"]
).reset_index(drop=True)
\`\`\`

---

### 6.13.5 Step 4. 지역별 카테고리 비중 리포트

\`\`\`python
region_category_sales = (
    orders_mart
    .groupby(["region", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

region_category_sales["region_total_sales"] = (
    region_category_sales
    .groupby("region")["total_sales"]
    .transform("sum")
)

region_category_sales["sales_ratio_in_region"] = (
    region_category_sales["total_sales"] /
    region_category_sales["region_total_sales"] * 100
).round(1)
\`\`\`

---

### 6.13.6 Step 5. 월별 카테고리 비중 리포트

\`\`\`python
monthly_category_sales = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_category_sales["monthly_total_sales"] = (
    monthly_category_sales
    .groupby("year_month")["total_sales"]
    .transform("sum")
)

monthly_category_sales["sales_ratio_in_month"] = (
    monthly_category_sales["total_sales"] /
    monthly_category_sales["monthly_total_sales"] * 100
).round(1)

monthly_category_sales["category_rank_in_month"] = (
    monthly_category_sales
    .groupby("year_month")["total_sales"]
    .rank(ascending=False, method="dense")
    .astype(int)
)

monthly_category_sales = monthly_category_sales.sort_values(
    ["year_month", "category_rank_in_month"]
).reset_index(drop=True)
\`\`\`

---

### 6.13.7 Step 6. 결과 저장

\`\`\`python
category_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_category_summary.csv",
    index=False
)

customer_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_customer_summary.csv",
    index=False
)

product_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_product_rank_by_category.csv",
    index=False
)

region_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_06_region_category_ratio.csv",
    index=False
)

monthly_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_06_monthly_category_ratio.csv",
    index=False
)
\`\`\`

---
`;export{e as default};