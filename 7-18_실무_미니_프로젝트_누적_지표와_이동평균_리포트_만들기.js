var e=`# 7장. 누적 지표와 이동평균 분석

## 7.18 실무 미니 프로젝트: 누적 지표와 이동평균 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 리포트를 만듭니다.

---

### 7.18.1 프로젝트 목표

\`\`\`text
주문 데이터마트를 사용해 일별 매출, 누적 매출, 이동평균, 변화량, 카테고리별 누적 매출, 고객별 누적 구매액을 계산하고 리포트로 정리한다.
\`\`\`

---

### 7.18.2 Step 1. 일별 매출 집계

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
\`\`\`

---

### 7.18.3 Step 2. 날짜 누락 처리

\`\`\`python
date_range = pd.date_range(
    start=daily_sales["order_date_dt"].min(),
    end=daily_sales["order_date_dt"].max(),
    freq="D"
)

daily_sales = (
    daily_sales
    .set_index("order_date_dt")
    .reindex(date_range)
    .rename_axis("order_date_dt")
    .reset_index()
)

daily_sales[["daily_sales", "order_count", "unique_customers"]] = (
    daily_sales[["daily_sales", "order_count", "unique_customers"]]
    .fillna(0)
)
\`\`\`

---

### 7.18.4 Step 3. 누적 지표와 이동평균 계산

\`\`\`python
daily_sales["cumulative_sales"] = daily_sales["daily_sales"].cumsum()
daily_sales["cumulative_order_count"] = daily_sales["order_count"].cumsum()

daily_sales["sales_3d_ma"] = (
    daily_sales["daily_sales"]
    .rolling(window=3, min_periods=1)
    .mean()
)

daily_sales["sales_7d_ma"] = (
    daily_sales["daily_sales"]
    .rolling(window=7, min_periods=1)
    .mean()
)

daily_sales["daily_sales_diff"] = daily_sales["daily_sales"].diff()

daily_sales["daily_sales_pct_change"] = (
    daily_sales["daily_sales"]
    .pct_change()
    .replace([np.inf, -np.inf], np.nan)
    * 100
).round(1)
\`\`\`

---

### 7.18.5 Step 4. 그래프 저장

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(daily_sales["order_date_dt"], daily_sales["daily_sales"], label="일별 매출")
plt.plot(daily_sales["order_date_dt"], daily_sales["sales_3d_ma"], label="3일 이동평균")
plt.plot(daily_sales["order_date_dt"], daily_sales["sales_7d_ma"], label="7일 이동평균")

plt.title("일별 매출과 이동평균")
plt.xlabel("날짜")
plt.ylabel("매출")
plt.legend()

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_07_rolling_average_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 7.18.6 Step 5. 리포트 문장 작성

\`\`\`text
일별 매출은 날짜별 변동이 크지만, 3일 이동평균과 7일 이동평균을 함께 보면 최근 매출 흐름을 더 안정적으로 파악할 수 있다.
누적 매출은 분석 기간 동안 매출이 얼마나 쌓였는지 보여주며, 목표 매출 대비 달성률 계산에 활용할 수 있다.
전일 대비 증감률은 전일 매출이 작을 때 과장될 수 있으므로 증감액과 함께 해석해야 한다.
카테고리별 누적 매출은 어떤 카테고리가 전체 매출을 주도하는지 보여준다.
고객별 누적 구매액은 이후 RFM 분석과 고객 세그먼트 분석의 기초 데이터로 활용할 수 있다.
\`\`\`

---
`;export{e as default};