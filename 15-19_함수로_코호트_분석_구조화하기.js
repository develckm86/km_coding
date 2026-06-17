var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.19 함수로 코호트 분석 구조화하기

코호트 분석도 반복 수행할 수 있으므로 함수로 만들 수 있습니다.

---

### 15.19.1 코호트 데이터 생성 함수

\`\`\`python
def make_cohort_data(
    orders: pd.DataFrame,
    customer_col: str = "customer_id",
    date_col: str = "order_date"
) -> pd.DataFrame:
    data = orders.copy()

    data[date_col] = pd.to_datetime(data[date_col], errors="coerce")
    data = data.dropna(subset=[customer_col, date_col])

    data["order_month"] = data[date_col].dt.to_period("M")

    first_order = (
        data
        .groupby(customer_col)[date_col]
        .min()
        .reset_index(name="first_order_date")
    )

    first_order["cohort_month"] = first_order["first_order_date"].dt.to_period("M")

    result = data.merge(
        first_order[[customer_col, "cohort_month"]],
        on=customer_col,
        how="left"
    )

    result["cohort_index"] = result.apply(
        lambda row: calculate_month_diff(row["order_month"], row["cohort_month"]),
        axis=1
    )

    return result
\`\`\`

---

### 15.19.2 리텐션 테이블 생성 함수

\`\`\`python
def make_retention_table(
    cohort_data: pd.DataFrame,
    customer_col: str = "customer_id"
) -> pd.DataFrame:
    counts = (
        cohort_data
        .groupby(["cohort_month", "cohort_index"])
        .agg(active_customers=(customer_col, "nunique"))
        .reset_index()
    )

    count_table = pd.pivot_table(
        data=counts,
        index="cohort_month",
        columns="cohort_index",
        values="active_customers",
        aggfunc="sum"
    )

    retention_table = count_table.divide(count_table[0], axis=0) * 100

    return retention_table.round(1)
\`\`\`

---

### 15.19.3 함수 사용 예시

\`\`\`python
cohort_data_func = make_cohort_data(cohort_base_orders)
retention_table_func = make_retention_table(cohort_data_func)

retention_table_func
\`\`\`

---

### 15.19.4 함수화의 장점

\`\`\`text
매월 같은 방식으로 코호트 리텐션을 계산할 수 있다.
첫 구매 월 기준 리텐션을 자동화할 수 있다.
대시보드나 월간 리포트에 재사용할 수 있다.
분석 기준을 코드로 명확히 남길 수 있다.
\`\`\`

---
`;export{e as default};