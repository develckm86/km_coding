var e=`# 14장. RFM 고객 분석 실습

## 14.6 RFM 원본 지표 계산

이제 Recency, Frequency, Monetary를 계산합니다.

---

### 14.6.1 기준일 설정

기준일을 2026년 4월 30일로 설정합니다.

\`\`\`python
base_date = pd.Timestamp("2026-04-30")
\`\`\`

실무에서는 보통 분석 데이터의 마지막 날짜 다음 날을 기준일로 사용하기도 합니다.

\`\`\`python
base_date = rfm_base_orders["order_date"].max() + pd.Timedelta(days=1)
\`\`\`

이번 실습에서는 수업 흐름을 고정하기 위해 2026년 4월 30일을 사용합니다.

---

### 14.6.2 고객별 RFM 계산

\`\`\`python
rfm_raw_table = (
    rfm_base_orders
    .groupby("customer_id")
    .agg(
        customer_name=("customer_name", "first"),
        region=("region", "first"),
        last_order_date=("order_date", "max"),
        first_order_date=("order_date", "min"),
        frequency=("order_id", "nunique"),
        monetary=("net_amount", "sum"),
        avg_order_amount=("net_amount", "mean"),
        category_count=("category", "nunique")
    )
    .reset_index()
)

rfm_raw_table["recency"] = (
    base_date - rfm_raw_table["last_order_date"]
).dt.days

rfm_raw_table["avg_order_amount"] = rfm_raw_table["avg_order_amount"].round(0)

rfm_raw_table.head()
\`\`\`

---

### 14.6.3 컬럼 순서 정리

\`\`\`python
rfm_raw_table = rfm_raw_table[[
    "customer_id",
    "customer_name",
    "region",
    "first_order_date",
    "last_order_date",
    "recency",
    "frequency",
    "monetary",
    "avg_order_amount",
    "category_count"
]]

rfm_raw_table.head()
\`\`\`

---

### 14.6.4 저장하기

\`\`\`python
rfm_raw_table.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_raw_table.csv",
    index=False
)
\`\`\`

---

### 14.6.5 RFM 원본 지표 해석

\`\`\`text
recency는 기준일 기준 마지막 구매 후 경과일이다.
frequency는 고객별 주문 횟수다.
monetary는 고객별 총구매액이다.
recency는 값이 작을수록 좋고, frequency와 monetary는 값이 클수록 좋다.
\`\`\`

---
`;export{e as default};