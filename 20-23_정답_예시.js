var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.23 정답 예시

아래는 최종 프로젝트의 핵심 정답 구조입니다.

---

### 20.23.1 데이터마트 생성 핵심 코드

\`\`\`python
orders_clean = orders_raw.drop_duplicates(subset=["order_id"], keep="first")
orders_clean = orders_clean.dropna(subset=["customer_id", "order_date", "net_amount"])
orders_clean = orders_clean[orders_clean["net_amount"] >= 0]
orders_clean = orders_clean[orders_clean["product_id"].isin(products_raw["product_id"])]

data_mart = orders_clean.merge(
    customers_raw,
    on="customer_id",
    how="left",
    validate="many_to_one"
)

data_mart = data_mart.merge(
    products_raw,
    on="product_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

---

### 20.23.2 매출 분석 핵심 코드

\`\`\`python
monthly_sales = (
    data_mart
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)
\`\`\`

---

### 20.23.3 고객 Feature 핵심 코드

\`\`\`python
customer_features = (
    data_mart
    .groupby("customer_id")
    .agg(
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        avg_order_amount=("net_amount", "mean"),
        first_order_date=("order_date", "min"),
        last_order_date=("order_date", "max"),
        category_count=("category", "nunique")
    )
    .reset_index()
)
\`\`\`

---

### 20.23.4 RFM 핵심 코드

\`\`\`python
rfm["recency"] = (BASE_DATE - rfm["last_order_date"]).dt.days
rfm["frequency"] = rfm["order_count"]
rfm["monetary"] = rfm["total_purchase"]

rfm["r_score"] = make_quantile_score(rfm["recency"], ascending=False)
rfm["f_score"] = make_quantile_score(rfm["frequency"], ascending=True)
rfm["m_score"] = make_quantile_score(rfm["monetary"], ascending=True)
\`\`\`

---

### 20.23.5 퍼널 핵심 코드

\`\`\`python
funnel_flags = (
    events_clean
    .assign(reached=1)
    .pivot_table(
        index="customer_id",
        columns="event_name",
        values="reached",
        aggfunc="max",
        fill_value=0
    )
    .reset_index()
)
\`\`\`

---
`;export{e as default};