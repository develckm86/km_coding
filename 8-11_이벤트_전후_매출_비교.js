var e=`# 8장. 시계열 매출 분석

## 8.11 이벤트 전후 매출 비교

실무에서는 이벤트나 프로모션 전후 매출이 달라졌는지 자주 확인합니다.

예를 들어 다음 질문이 있을 수 있습니다.

\`\`\`text
3월 15일 이벤트 이후 매출이 증가했는가?
이벤트 이후 주문 수가 증가했는가?
이벤트 이후 평균 주문 금액은 달라졌는가?
\`\`\`

이번 실습에서는 2026년 3월 15일을 이벤트 기준일로 가정합니다.

---

### 8.11.1 이벤트 기준일 설정

\`\`\`python
event_date = pd.Timestamp("2026-03-15")
\`\`\`

이벤트 전후 비교 기간을 설정합니다.

\`\`\`python
before_start = event_date - pd.Timedelta(days=14)
before_end = event_date - pd.Timedelta(days=1)

after_start = event_date
after_end = event_date + pd.Timedelta(days=13)

before_start, before_end, after_start, after_end
\`\`\`

이번 실습에서는 이벤트 전 14일과 이벤트 후 14일을 비교합니다.

---

### 8.11.2 이벤트 전후 기간 데이터 선택

\`\`\`python
event_orders = orders_mart[
    (orders_mart["order_date_dt"] >= before_start) &
    (orders_mart["order_date_dt"] <= after_end)
].copy()

event_orders["event_period"] = np.where(
    event_orders["order_date_dt"] < event_date,
    "이벤트 전",
    "이벤트 후"
)

event_orders[["order_id", "order_date_dt", "event_period", "net_amount"]].head()
\`\`\`

---

### 8.11.3 이벤트 전후 요약

\`\`\`python
event_summary = (
    event_orders
    .groupby("event_period")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

event_summary["avg_order_amount"] = event_summary["avg_order_amount"].round(0)

event_summary
\`\`\`

---

### 8.11.4 이벤트 전후 일평균 매출

비교 기간의 일수가 같으면 총매출을 비교할 수 있습니다.  
하지만 기간 길이가 다르면 일평균 매출을 비교하는 것이 좋습니다.

이번 실습에서도 일평균 매출을 계산해봅니다.

\`\`\`python
period_days = pd.DataFrame({
    "event_period": ["이벤트 전", "이벤트 후"],
    "days": [
        (before_end - before_start).days + 1,
        (after_end - after_start).days + 1
    ]
})

event_summary = event_summary.merge(
    period_days,
    on="event_period",
    how="left"
)

event_summary["avg_daily_sales"] = (
    event_summary["total_sales"] / event_summary["days"]
).round(0)

event_summary
\`\`\`

---

### 8.11.5 이벤트 전후 변화율 계산

\`\`\`python
before_sales = event_summary.loc[
    event_summary["event_period"] == "이벤트 전",
    "avg_daily_sales"
].iloc[0]

after_sales = event_summary.loc[
    event_summary["event_period"] == "이벤트 후",
    "avg_daily_sales"
].iloc[0]

event_sales_change_rate = (after_sales - before_sales) / before_sales * 100

event_sales_change_rate = round(event_sales_change_rate, 1)

event_sales_change_rate
\`\`\`

---

### 8.11.6 저장하기

\`\`\`python
event_summary.to_csv(
    OUTPUT_TABLES / "chapter_08_event_before_after_summary.csv",
    index=False
)
\`\`\`

---

### 8.11.7 이벤트 전후 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(event_summary["event_period"], event_summary["avg_daily_sales"])

plt.title("이벤트 전후 일평균 매출 비교")
plt.xlabel("기간")
plt.ylabel("일평균 매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_08_event_before_after_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 8.11.8 해석 예시

\`\`\`text
이벤트 후 일평균 매출이 이벤트 전보다 높게 나타날 수 있다.
하지만 단순 전후 비교만으로 이벤트가 매출 증가의 원인이라고 단정할 수는 없다.
요일 구성, 다른 프로모션, 광고비, 외부 요인, 계절성 등을 함께 고려해야 한다.
정확한 효과 분석을 위해서는 실험군과 대조군이 있는 A/B 테스트 설계가 필요할 수 있다.
\`\`\`

---
`;export{e as default};