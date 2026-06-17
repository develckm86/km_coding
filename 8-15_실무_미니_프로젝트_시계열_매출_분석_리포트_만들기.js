var e=`# 8장. 시계열 매출 분석

## 8.15 실무 미니 프로젝트: 시계열 매출 분석 리포트 만들기

이번 장의 전체 실습을 하나의 프로젝트로 정리합니다.

---

### 8.15.1 프로젝트 목표

\`\`\`text
주문 데이터마트를 사용해 일별, 주별, 월별 매출 흐름을 분석하고,
요일 패턴, 이벤트 전후 변화, 월별 카테고리 매출 변화와 성장 기여도를 리포트로 정리한다.
\`\`\`

---

### 8.15.2 Step 1. 날짜 인덱스 설정

\`\`\`python
orders_ts = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .set_index("order_date_dt")
    .sort_index()
)
\`\`\`

---

### 8.15.3 Step 2. 일별·주별·월별 집계

\`\`\`python
daily_sales = (
    orders_ts
    .resample("D")
    .agg(
        daily_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

weekly_sales = (
    orders_ts
    .resample("W")
    .agg(
        weekly_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_sales = (
    orders_ts
    .resample("M")
    .agg(
        monthly_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)
\`\`\`

---

### 8.15.4 Step 3. 월별 성장률 계산

\`\`\`python
monthly_sales["year_month"] = (
    monthly_sales["order_date_dt"]
    .dt.to_period("M")
    .astype(str)
)

monthly_sales["avg_order_amount"] = np.where(
    monthly_sales["order_count"] > 0,
    monthly_sales["monthly_sales"] / monthly_sales["order_count"],
    0
)

monthly_sales["monthly_sales_diff"] = monthly_sales["monthly_sales"].diff()

monthly_sales["monthly_sales_growth_rate"] = (
    monthly_sales["monthly_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)
\`\`\`

---

### 8.15.5 Step 4. 요일별 패턴 분석

\`\`\`python
orders_mart["weekday_num"] = orders_mart["order_date_dt"].dt.dayofweek
orders_mart["weekday_name"] = orders_mart["order_date_dt"].dt.day_name()

weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_mart["weekday_kr"] = orders_mart["weekday_name"].replace(weekday_map)

weekday_sales = (
    orders_mart
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
    .sort_values("weekday_num")
)
\`\`\`

---

### 8.15.6 Step 5. 이벤트 전후 비교

\`\`\`python
event_date = pd.Timestamp("2026-03-15")

before_start = event_date - pd.Timedelta(days=14)
before_end = event_date - pd.Timedelta(days=1)

after_start = event_date
after_end = event_date + pd.Timedelta(days=13)

event_orders = orders_mart[
    (orders_mart["order_date_dt"] >= before_start) &
    (orders_mart["order_date_dt"] <= after_end)
].copy()

event_orders["event_period"] = np.where(
    event_orders["order_date_dt"] < event_date,
    "이벤트 전",
    "이벤트 후"
)

event_summary = (
    event_orders
    .groupby("event_period")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)
\`\`\`

---

### 8.15.7 Step 6. 월별 카테고리 분석

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
\`\`\`

---

### 8.15.8 Step 7. 리포트 문장 작성

\`\`\`text
월별 매출 성장률은 전월 대비 매출 변화의 방향과 크기를 보여준다.
매출 변화의 원인을 파악하려면 주문 수와 평균 주문 금액의 변화도 함께 확인해야 한다.
요일별 주문 수는 운영 인력 배치나 마케팅 발송 요일을 정할 때 참고할 수 있다.
이벤트 전후 매출 비교는 원인 분석이 아니라 변화 관찰에 가깝다.
정확한 이벤트 효과를 확인하려면 실험군과 대조군이 있는 A/B 테스트가 필요하다.
월별 카테고리 매출 분석은 전체 매출 변화가 어떤 카테고리에서 발생했는지 확인하는 데 유용하다.
\`\`\`

---
`;export{e as default};