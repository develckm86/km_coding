var e=`# 8장. 시계열 매출 분석

## 8.8 주별 매출 리포트

일별 매출은 너무 세밀할 수 있습니다.  
주별 매출로 보면 더 안정적인 흐름을 확인할 수 있습니다.

---

### 8.8.1 주별 매출 집계

\`\`\`python
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

weekly_sales
\`\`\`

\`resample("W")\`는 주 단위로 데이터를 집계합니다.  
결과의 날짜는 각 주의 끝 날짜로 표시됩니다.

---

### 8.8.2 평균 주문 금액 계산

\`\`\`python
weekly_sales["avg_order_amount"] = np.where(
    weekly_sales["order_count"] > 0,
    weekly_sales["weekly_sales"] / weekly_sales["order_count"],
    0
)

weekly_sales["avg_order_amount"] = weekly_sales["avg_order_amount"].round(0)
\`\`\`

---

### 8.8.3 전주 대비 증감액과 증감률

\`\`\`python
weekly_sales["weekly_sales_diff"] = weekly_sales["weekly_sales"].diff()

weekly_sales["weekly_sales_pct_change"] = (
    weekly_sales["weekly_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)

weekly_sales
\`\`\`

---

### 8.8.4 저장하기

\`\`\`python
weekly_sales.to_csv(
    OUTPUT_TABLES / "chapter_08_weekly_sales_report.csv",
    index=False
)
\`\`\`

---

### 8.8.5 주별 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(weekly_sales["order_date_dt"], weekly_sales["weekly_sales"])

plt.title("주별 매출 추이")
plt.xlabel("주")
plt.ylabel("매출")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_08_weekly_sales_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 8.8.6 해석 예시

\`\`\`text
주별 매출은 일별 매출보다 변동이 완화되어 전체 흐름을 보기 쉽다.
전주 대비 증감액과 증감률을 함께 보면 특정 주에 매출이 증가했는지 감소했는지 확인할 수 있다.
다만 주의 시작과 끝 기준이 분석 환경이나 비즈니스 기준과 맞는지 확인해야 한다.
\`\`\`

---
`;export{e as default};