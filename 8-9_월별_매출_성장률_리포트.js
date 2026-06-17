var e=`# 8장. 시계열 매출 분석

## 8.9 월별 매출 성장률 리포트

월별 매출은 실무 리포트에서 가장 자주 사용되는 지표 중 하나입니다.

이번 절에서는 월별 매출과 전월 대비 성장률을 계산합니다.

---

### 8.9.1 월별 매출 집계

\`\`\`python
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

monthly_sales
\`\`\`

\`resample("M")\`은 월 단위로 집계합니다.

---

### 8.9.2 연월 컬럼 만들기

월말 날짜보다 \`2026-01\` 같은 연월 형태가 보고서에 더 보기 좋을 수 있습니다.

\`\`\`python
monthly_sales["year_month"] = (
    monthly_sales["order_date_dt"]
    .dt.to_period("M")
    .astype(str)
)

monthly_sales
\`\`\`

---

### 8.9.3 평균 주문 금액 계산

\`\`\`python
monthly_sales["avg_order_amount"] = np.where(
    monthly_sales["order_count"] > 0,
    monthly_sales["monthly_sales"] / monthly_sales["order_count"],
    0
)

monthly_sales["avg_order_amount"] = monthly_sales["avg_order_amount"].round(0)
\`\`\`

---

### 8.9.4 전월 대비 증감액

\`\`\`python
monthly_sales["previous_month_sales"] = monthly_sales["monthly_sales"].shift(1)

monthly_sales["monthly_sales_diff"] = (
    monthly_sales["monthly_sales"] - monthly_sales["previous_month_sales"]
)

monthly_sales
\`\`\`

---

### 8.9.5 전월 대비 성장률

\`\`\`python
monthly_sales["monthly_sales_growth_rate"] = (
    monthly_sales["monthly_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)

monthly_sales
\`\`\`

---

### 8.9.6 성장 원인 후보 분해

월별 매출은 다음 두 요소의 영향을 받습니다.

\`\`\`text
매출 = 주문 수 × 평균 주문 금액
\`\`\`

따라서 매출이 증가했다면 다음 중 하나일 수 있습니다.

\`\`\`text
주문 수가 증가했다.
평균 주문 금액이 증가했다.
둘 다 증가했다.
\`\`\`

주문 수 증감률과 평균 주문 금액 증감률도 계산합니다.

\`\`\`python
monthly_sales["order_count_growth_rate"] = (
    monthly_sales["order_count"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)

monthly_sales["avg_order_amount_growth_rate"] = (
    monthly_sales["avg_order_amount"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)

monthly_sales
\`\`\`

---

### 8.9.7 저장하기

\`\`\`python
monthly_sales.to_csv(
    OUTPUT_TABLES / "chapter_08_monthly_sales_growth.csv",
    index=False
)
\`\`\`

---

### 8.9.8 월별 매출 성장률 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(monthly_sales["year_month"], monthly_sales["monthly_sales_growth_rate"])

plt.title("전월 대비 매출 성장률")
plt.xlabel("월")
plt.ylabel("성장률(%)")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_08_monthly_sales_growth_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 8.9.9 해석 예시

\`\`\`text
월별 매출 성장률은 전월 대비 매출이 얼마나 증가하거나 감소했는지 보여준다.
매출 성장률만 보면 원인을 알기 어렵기 때문에 주문 수 성장률과 평균 주문 금액 성장률을 함께 확인해야 한다.
매출이 증가했더라도 주문 수 증가 때문인지, 객단가 상승 때문인지에 따라 전략이 달라진다.
\`\`\`

---
`;export{e as default};