var e=`# 7장. 누적 지표와 이동평균 분석

## 7.6 일별 매출 집계

누적 지표와 이동평균을 계산하려면 먼저 일별 매출 데이터를 만들어야 합니다.

주문 데이터는 주문 단위입니다.  
이것을 날짜별로 집계합니다.

---

### 7.6.1 일별 매출 집계

\`\`\`python
daily_sales = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .groupby("order_date_dt")
    .agg(
        daily_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values("order_date_dt")
)

daily_sales
\`\`\`

결과는 다음 구조입니다.

\`\`\`text
order_date_dt
daily_sales
order_count
unique_customers
\`\`\`

---

### 7.6.2 날짜가 빠진 경우 처리

실제 데이터에서는 주문이 없는 날짜가 있을 수 있습니다.

예를 들어 1월 1일부터 1월 20일까지 분석하는데 1월 6일에 주문이 없으면 그 날짜가 빠질 수 있습니다.

이동평균을 정확히 계산하려면 주문이 없는 날짜도 0으로 채워야 할 수 있습니다.

먼저 날짜 범위를 만듭니다.

\`\`\`python
date_range = pd.date_range(
    start=daily_sales["order_date_dt"].min(),
    end=daily_sales["order_date_dt"].max(),
    freq="D"
)

date_range
\`\`\`

날짜 범위를 기준으로 다시 인덱스를 맞춥니다.

\`\`\`python
daily_sales = (
    daily_sales
    .set_index("order_date_dt")
    .reindex(date_range)
    .rename_axis("order_date_dt")
    .reset_index()
)

daily_sales
\`\`\`

결측치는 0으로 채웁니다.

\`\`\`python
daily_sales[["daily_sales", "order_count", "unique_customers"]] = (
    daily_sales[["daily_sales", "order_count", "unique_customers"]]
    .fillna(0)
)

daily_sales
\`\`\`

주의할 점은 \`unique_customers\`를 0으로 채우는 것은 해당 날짜에 구매 고객이 없다는 뜻입니다.  
이 경우에는 자연스러운 처리입니다.

---

### 7.6.3 자료형 정리

\`\`\`python
daily_sales["order_count"] = daily_sales["order_count"].astype(int)
daily_sales["unique_customers"] = daily_sales["unique_customers"].astype(int)
\`\`\`

---

### 7.6.4 저장하기

\`\`\`python
daily_sales.to_csv(
    OUTPUT_TABLES / "chapter_07_daily_sales.csv",
    index=False
)
\`\`\`

---

### 7.6.5 해석 예시

\`\`\`text
일별 매출 데이터는 주문 단위 데이터를 날짜 단위로 요약한 결과다.
이 데이터는 누적 매출, 이동평균, 전일 대비 변화량 계산의 기준 데이터로 사용된다.
주문이 없는 날짜를 0으로 채우면 이동평균 계산에서 날짜 간격이 일정하게 유지된다.
\`\`\`

---
`;export{e as default};