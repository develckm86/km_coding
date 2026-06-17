var e=`# 8장. 시계열 매출 분석

## 8.17 함수로 시계열 리포트 구조화하기

반복되는 시계열 분석은 함수로 만들 수 있습니다.

---

### 8.17.1 날짜 인덱스 설정 함수

\`\`\`python
def prepare_time_series_data(df: pd.DataFrame, date_col: str) -> pd.DataFrame:
    result = df.copy()
    result[date_col] = pd.to_datetime(result[date_col], errors="coerce")
    result = result.dropna(subset=[date_col])
    result = result.sort_values(date_col)
    result = result.set_index(date_col)
    return result
\`\`\`

사용 예:

\`\`\`python
orders_ts_func = prepare_time_series_data(orders_mart, "order_date_dt")
\`\`\`

---

### 8.17.2 기간별 매출 집계 함수

\`\`\`python
def make_period_sales_report(
    df_ts: pd.DataFrame,
    freq: str,
    sales_col: str = "net_amount"
) -> pd.DataFrame:
    report = (
        df_ts
        .resample(freq)
        .agg(
            total_sales=(sales_col, "sum"),
            order_count=("order_id", "count"),
            unique_customers=("customer_id", "nunique")
        )
        .reset_index()
    )

    report["avg_order_amount"] = np.where(
        report["order_count"] > 0,
        report["total_sales"] / report["order_count"],
        0
    )

    report["avg_order_amount"] = report["avg_order_amount"].round(0)
    report["sales_diff"] = report["total_sales"].diff()

    report["sales_growth_rate"] = (
        report["total_sales"]
        .pct_change()
        .replace([np.inf, -np.inf], np.nan)
        * 100
    ).round(1)

    return report
\`\`\`

사용 예:

\`\`\`python
weekly_report_func = make_period_sales_report(orders_ts_func, "W")
monthly_report_func = make_period_sales_report(orders_ts_func, "M")
\`\`\`

---

### 8.17.3 요일별 분석 함수

\`\`\`python
def make_weekday_sales_report(df: pd.DataFrame) -> pd.DataFrame:
    result = df.copy()

    result["weekday_num"] = result["order_date_dt"].dt.dayofweek
    result["weekday_name"] = result["order_date_dt"].dt.day_name()

    weekday_map = {
        "Monday": "월",
        "Tuesday": "화",
        "Wednesday": "수",
        "Thursday": "목",
        "Friday": "금",
        "Saturday": "토",
        "Sunday": "일"
    }

    result["weekday_kr"] = result["weekday_name"].replace(weekday_map)

    report = (
        result
        .groupby(["weekday_num", "weekday_kr"])
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "count"),
            unique_customers=("customer_id", "nunique"),
            avg_order_amount=("net_amount", "mean")
        )
        .reset_index()
        .sort_values("weekday_num")
    )

    report["avg_order_amount"] = report["avg_order_amount"].round(0)

    return report
\`\`\`

---

### 8.17.4 함수화의 장점

시계열 리포트를 함수로 만들면 다음 장점이 있습니다.

\`\`\`text
매월 같은 방식으로 리포트를 만들 수 있다.
일별, 주별, 월별 집계를 같은 함수로 처리할 수 있다.
분석 기준이 코드에 명확히 남는다.
자동 리포트 생성으로 확장하기 쉽다.
\`\`\`

---
`;export{e as default};