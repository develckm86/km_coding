var e=`# 7장. 누적 지표와 이동평균 분석

## 7.10 전일 대비 변화량과 변화율 계산

이제 일별 매출이 전날보다 얼마나 변했는지 계산합니다.

---

### 7.10.1 전일 매출 가져오기

\`\`\`python
daily_sales["previous_day_sales"] = daily_sales["daily_sales"].shift(1)

daily_sales[["order_date_dt", "daily_sales", "previous_day_sales"]].head()
\`\`\`

첫 번째 날짜는 이전 날짜가 없기 때문에 결측치가 됩니다.

---

### 7.10.2 전일 대비 증감액

\`\`\`python
daily_sales["daily_sales_diff"] = daily_sales["daily_sales"].diff()

daily_sales[["order_date_dt", "daily_sales", "daily_sales_diff"]].head()
\`\`\`

\`diff()\`는 현재 값에서 이전 값을 뺀 값입니다.

---

### 7.10.3 전일 대비 증감률

\`\`\`python
daily_sales["daily_sales_pct_change"] = (
    daily_sales["daily_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
)

daily_sales["daily_sales_pct_change"] = daily_sales["daily_sales_pct_change"].round(1)

daily_sales[[
    "order_date_dt",
    "daily_sales",
    "daily_sales_diff",
    "daily_sales_pct_change"
]].head()
\`\`\`

주의할 점은 전날 매출이 0이면 변화율이 무한대가 될 수 있다는 것입니다.  
그래서 \`replace([np.inf, -np.inf], np.nan)\`으로 무한대를 결측치로 처리했습니다.

---

### 7.10.4 변화량 리포트 만들기

\`\`\`python
sales_change_report = daily_sales[[
    "order_date_dt",
    "daily_sales",
    "previous_day_sales",
    "daily_sales_diff",
    "daily_sales_pct_change"
]].copy()

sales_change_report.head()
\`\`\`

저장합니다.

\`\`\`python
sales_change_report.to_csv(
    OUTPUT_TABLES / "chapter_07_sales_change_report.csv",
    index=False
)
\`\`\`

---

### 7.10.5 해석 예시

\`\`\`text
전일 대비 증감액은 매출이 실제 금액 기준으로 얼마나 변했는지 보여준다.
전일 대비 증감률은 상대적인 변화 크기를 보여준다.
다만 전일 매출이 매우 작거나 0이면 증감률이 과장되거나 계산되지 않을 수 있다.
따라서 증감률은 증감액과 함께 해석해야 한다.
\`\`\`

---
`;export{e as default};