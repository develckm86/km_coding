var e=`# 9장. 복잡한 데이터 결합 실습

## 9.12 매출 데이터와 광고비 데이터 결합

이번에는 월별 매출과 광고비 데이터를 결합합니다.

광고비는 \`year_month\`와 \`campaign_id\` 기준으로 존재합니다.  
주문 데이터도 같은 기준으로 집계해야 합니다.

---

### 9.12.1 주문 데이터에 연월 만들기

\`\`\`python
orders_with_price_history["year_month"] = (
    orders_with_price_history["order_date"]
    .dt.to_period("M")
    .astype(str)
)
\`\`\`

---

### 9.12.2 캠페인별 월별 매출 집계

\`\`\`python
campaign_monthly_sales = (
    orders_with_price_history
    .dropna(subset=["net_amount_history"])
    .groupby(["year_month", "campaign_id"])
    .agg(
        total_sales=("net_amount_history", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

campaign_monthly_sales
\`\`\`

---

### 9.12.3 광고비 데이터와 결합

\`\`\`python
sales_ad_joined = campaign_monthly_sales.merge(
    ad_spend,
    on=["year_month", "campaign_id"],
    how="left",
    validate="one_to_one",
    indicator=True
)

sales_ad_joined
\`\`\`

---

### 9.12.4 광고비 매칭 상태 확인

\`\`\`python
sales_ad_joined["_merge"].value_counts()
\`\`\`

매칭 실패가 있다면 확인합니다.

\`\`\`python
sales_ad_joined[sales_ad_joined["_merge"] == "left_only"]
\`\`\`

---

### 9.12.5 ROAS 계산

ROAS는 광고비 대비 매출을 의미합니다.

\`\`\`text
ROAS = 매출 / 광고비
\`\`\`

\`\`\`python
sales_ad_joined["roas"] = (
    sales_ad_joined["total_sales"] / sales_ad_joined["ad_spend"]
).round(2)

sales_ad_joined
\`\`\`

---

### 9.12.6 저장하기

\`\`\`python
sales_ad_joined.to_csv(
    DATA_PROCESSED / "chapter_09_sales_ad_joined.csv",
    index=False
)
\`\`\`

광고비 결합 요약표도 만듭니다.

\`\`\`python
ad_sales_join_summary = sales_ad_joined[[
    "year_month",
    "campaign_id",
    "total_sales",
    "ad_spend",
    "roas",
    "_merge"
]].copy()

ad_sales_join_summary.to_csv(
    OUTPUT_TABLES / "chapter_09_ad_sales_join_summary.csv",
    index=False
)

ad_sales_join_summary
\`\`\`

---

### 9.12.7 해석 예시

\`\`\`text
매출 데이터와 광고비 데이터를 월·캠페인 기준으로 결합하면 캠페인별 ROAS를 계산할 수 있다.
ROAS가 높다는 것은 광고비 대비 매출이 높다는 의미지만, 이것만으로 광고 효과를 단정할 수는 없다.
광고 효과를 판단하려면 광고 노출, 클릭, 전환, 실험 설계, 자연 매출 등을 함께 고려해야 한다.
\`\`\`

---
`;export{e as default};