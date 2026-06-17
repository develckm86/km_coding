var e=`# 7장. 누적 지표와 이동평균 분석

## 7.20 함수로 누적 지표와 이동평균 계산하기

반복 분석을 위해 함수로 정리할 수 있습니다.

---

### 7.20.1 일별 매출 생성 함수

\`\`\`python
def make_daily_sales(df: pd.DataFrame) -> pd.DataFrame:
    daily = (
        df
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

    date_range = pd.date_range(
        start=daily["order_date_dt"].min(),
        end=daily["order_date_dt"].max(),
        freq="D"
    )

    daily = (
        daily
        .set_index("order_date_dt")
        .reindex(date_range)
        .rename_axis("order_date_dt")
        .reset_index()
    )

    daily[["daily_sales", "order_count", "unique_customers"]] = (
        daily[["daily_sales", "order_count", "unique_customers"]]
        .fillna(0)
    )

    daily["order_count"] = daily["order_count"].astype(int)
    daily["unique_customers"] = daily["unique_customers"].astype(int)

    return daily
\`\`\`

---

### 7.20.2 누적 지표와 이동평균 추가 함수

\`\`\`python
def add_window_metrics(daily: pd.DataFrame) -> pd.DataFrame:
    daily = daily.sort_values("order_date_dt").copy()

    daily["cumulative_sales"] = daily["daily_sales"].cumsum()
    daily["cumulative_order_count"] = daily["order_count"].cumsum()

    daily["sales_3d_ma"] = (
        daily["daily_sales"]
        .rolling(window=3, min_periods=1)
        .mean()
    )

    daily["sales_7d_ma"] = (
        daily["daily_sales"]
        .rolling(window=7, min_periods=1)
        .mean()
    )

    daily["daily_sales_diff"] = daily["daily_sales"].diff()

    daily["daily_sales_pct_change"] = (
        daily["daily_sales"]
        .pct_change()
        .replace([np.inf, -np.inf], np.nan)
        * 100
    ).round(1)

    return daily
\`\`\`

---

### 7.20.3 함수 사용 예시

\`\`\`python
daily_sales_func = make_daily_sales(orders_mart)
daily_sales_func = add_window_metrics(daily_sales_func)

daily_sales_func.head()
\`\`\`

이렇게 함수로 만들면 매월 새로운 데이터에도 같은 방식으로 적용할 수 있습니다.

---
`;export{e as default};