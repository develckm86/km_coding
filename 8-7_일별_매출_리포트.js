var e=`# 8장. 시계열 매출 분석

## 8.7 일별 매출 리포트

먼저 일별 매출을 다시 만들겠습니다.

7장에서도 일별 매출을 만들었지만, 이번 장에서는 시계열 분석의 기준 데이터로 사용합니다.

---

### 8.7.1 일별 매출 집계

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

daily_sales.head()
\`\`\`

\`resample("D")\`는 날짜 인덱스를 기준으로 일별 집계를 수행합니다.

---

### 8.7.2 주문이 없는 날짜 처리

\`resample("D")\`를 사용하면 주문이 없는 날짜도 포함됩니다.

매출과 주문 수가 없는 날짜는 0으로 처리합니다.

\`\`\`python
daily_sales[["daily_sales", "order_count", "unique_customers"]] = (
    daily_sales[["daily_sales", "order_count", "unique_customers"]]
    .fillna(0)
)

daily_sales["order_count"] = daily_sales["order_count"].astype(int)
daily_sales["unique_customers"] = daily_sales["unique_customers"].astype(int)
\`\`\`

---

### 8.7.3 평균 주문 금액 계산

\`\`\`python
daily_sales["avg_order_amount"] = np.where(
    daily_sales["order_count"] > 0,
    daily_sales["daily_sales"] / daily_sales["order_count"],
    0
)

daily_sales["avg_order_amount"] = daily_sales["avg_order_amount"].round(0)
\`\`\`

---

### 8.7.4 저장하기

\`\`\`python
daily_sales.to_csv(
    OUTPUT_TABLES / "chapter_08_daily_sales_report.csv",
    index=False
)
\`\`\`

---

### 8.7.5 일별 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(daily_sales["order_date_dt"], daily_sales["daily_sales"])

plt.title("일별 매출 추이")
plt.xlabel("날짜")
plt.ylabel("매출")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_08_daily_sales_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 8.7.6 해석 예시

\`\`\`text
일별 매출은 날짜별 변동이 크게 나타날 수 있다.
주문이 없는 날짜는 매출이 0으로 표시되며, 이동평균이나 주별 집계로 변동을 완화해 볼 수 있다.
일별 매출 급증 또는 급감 날짜는 특정 상품 주문, 이벤트, 프로모션 여부를 추가로 확인해야 한다.
\`\`\`

---
`;export{e as default};