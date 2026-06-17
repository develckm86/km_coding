var e=`# 7장. 누적 지표와 이동평균 분석

## 7.13 월별 누적 매출 분석

이번에는 월별로 누적 매출을 계산합니다.

---

### 7.13.1 월별 매출 집계

\`\`\`python
monthly_sales = (
    orders_mart
    .dropna(subset=["year_month"])
    .groupby("year_month")
    .agg(
        monthly_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values("year_month")
)

monthly_sales
\`\`\`

---

### 7.13.2 월별 누적 매출 계산

\`\`\`python
monthly_sales["cumulative_sales"] = monthly_sales["monthly_sales"].cumsum()
monthly_sales["cumulative_order_count"] = monthly_sales["order_count"].cumsum()

monthly_sales
\`\`\`

---

### 7.13.3 전월 대비 증감액과 증감률

\`\`\`python
monthly_sales["monthly_sales_diff"] = monthly_sales["monthly_sales"].diff()

monthly_sales["monthly_sales_pct_change"] = (
    monthly_sales["monthly_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)

monthly_sales
\`\`\`

---

### 7.13.4 저장하기

\`\`\`python
monthly_sales.to_csv(
    OUTPUT_TABLES / "chapter_07_monthly_cumulative_sales.csv",
    index=False
)
\`\`\`

---

### 7.13.5 해석 예시

\`\`\`text
월별 누적 매출은 분석 기간 동안 매출이 월 단위로 어떻게 쌓였는지 보여준다.
전월 대비 증감액과 증감률을 함께 보면 특정 월에 매출이 증가했는지 감소했는지 확인할 수 있다.
증감률은 전월 매출 규모에 영향을 받으므로 증감액과 함께 해석해야 한다.
\`\`\`

---
`;export{e as default};