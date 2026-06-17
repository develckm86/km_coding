var e=`# 10장. 고객별 Feature Table 만들기

## 10.8 고객별 날짜 기반 Feature 만들기

날짜 기반 Feature는 고객의 구매 시점과 최근성을 나타냅니다.

---

### 10.8.1 고객별 첫 구매일과 마지막 구매일

\`\`\`python
customer_recency_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        first_order_date=("order_date", "min"),
        last_order_date=("order_date", "max"),
        active_order_months=("year_month", "nunique")
    )
    .reset_index()
)

customer_recency_features.head()
\`\`\`

---

### 10.8.2 기준일 설정

최근 구매 후 경과일을 계산하려면 기준일이 필요합니다.

실무에서는 분석 기준일을 명확히 정해야 합니다.

\`\`\`python
base_date = pd.Timestamp("2026-04-30")
\`\`\`

---

### 10.8.3 최근 구매 후 경과일

\`\`\`python
customer_recency_features["days_since_last_order"] = (
    base_date - customer_recency_features["last_order_date"]
).dt.days
\`\`\`

---

### 10.8.4 첫 구매 후 경과일

\`\`\`python
customer_recency_features["days_since_first_order"] = (
    base_date - customer_recency_features["first_order_date"]
).dt.days
\`\`\`

---

### 10.8.5 구매 활동 기간

첫 구매일부터 마지막 구매일까지의 기간입니다.

\`\`\`python
customer_recency_features["active_period_days"] = (
    customer_recency_features["last_order_date"] -
    customer_recency_features["first_order_date"]
).dt.days
\`\`\`

구매가 한 번뿐인 고객은 활동 기간이 0일 수 있습니다.

---

### 10.8.6 가입 후 첫 구매까지 걸린 기간

가입일 정보가 있는 경우 계산할 수 있습니다.

먼저 고객별 가입일을 가져옵니다.

\`\`\`python
signup_info = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        signup_date=("signup_date", "first")
    )
    .reset_index()
)

signup_info["signup_date"] = pd.to_datetime(
    signup_info["signup_date"],
    errors="coerce"
)

customer_recency_features = customer_recency_features.merge(
    signup_info,
    on="customer_id",
    how="left"
)
\`\`\`

가입 후 첫 구매까지 걸린 일수를 계산합니다.

\`\`\`python
customer_recency_features["signup_to_first_order_days"] = (
    customer_recency_features["first_order_date"] -
    customer_recency_features["signup_date"]
).dt.days
\`\`\`

---

### 10.8.7 저장하기

\`\`\`python
customer_recency_features.to_csv(
    OUTPUT_TABLES / "chapter_10_customer_recency_features.csv",
    index=False
)
\`\`\`

---

### 10.8.8 해석 예시

\`\`\`text
days_since_last_order는 고객이 최근에 얼마나 활동했는지 보여주는 핵심 Feature다.
값이 작을수록 최근에 구매한 고객이며, 값이 클수록 휴면 가능성이 있는 고객으로 볼 수 있다.
signup_to_first_order_days는 가입 후 구매 전환까지 걸린 시간을 보여준다.
이 값이 짧은 고객은 가입 후 빠르게 구매한 고객이고, 긴 고객은 전환까지 시간이 오래 걸린 고객이다.
\`\`\`

---
`;export{e as default};