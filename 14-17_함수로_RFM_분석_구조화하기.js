var e=`# 14장. RFM 고객 분석 실습

## 14.17 함수로 RFM 분석 구조화하기

반복 분석을 위해 RFM 계산을 함수로 만들 수 있습니다.

---

### 14.17.1 RFM 원본 지표 계산 함수

\`\`\`python
def make_rfm_raw_table(
    orders: pd.DataFrame,
    base_date: str,
    customer_col: str = "customer_id",
    date_col: str = "order_date",
    amount_col: str = "net_amount"
) -> pd.DataFrame:
    base_date = pd.Timestamp(base_date)

    data = orders.copy()
    data[date_col] = pd.to_datetime(data[date_col], errors="coerce")
    data = data.dropna(subset=[customer_col, date_col, amount_col])

    rfm = (
        data
        .groupby(customer_col)
        .agg(
            last_order_date=(date_col, "max"),
            first_order_date=(date_col, "min"),
            frequency=("order_id", "nunique"),
            monetary=(amount_col, "sum")
        )
        .reset_index()
    )

    rfm["recency"] = (base_date - rfm["last_order_date"]).dt.days

    return rfm
\`\`\`

---

### 14.17.2 RFM 점수화 함수

\`\`\`python
def add_rfm_scores(rfm: pd.DataFrame, n_bins: int = 5) -> pd.DataFrame:
    result = rfm.copy()

    result["r_score"] = make_quantile_score(
        result["recency"],
        ascending=False,
        n_bins=n_bins
    )

    result["f_score"] = make_quantile_score(
        result["frequency"],
        ascending=True,
        n_bins=n_bins
    )

    result["m_score"] = make_quantile_score(
        result["monetary"],
        ascending=True,
        n_bins=n_bins
    )

    result["rfm_score_sum"] = (
        result["r_score"] +
        result["f_score"] +
        result["m_score"]
    )

    result["rfm_code"] = (
        result["r_score"].astype(str) +
        result["f_score"].astype(str) +
        result["m_score"].astype(str)
    )

    return result
\`\`\`

---

### 14.17.3 RFM 세그먼트 함수

\`\`\`python
def add_rfm_segments(rfm_score: pd.DataFrame) -> pd.DataFrame:
    result = rfm_score.copy()

    result["rfm_segment"] = result.apply(
        assign_rfm_segment,
        axis=1
    )

    return result
\`\`\`

---

### 14.17.4 전체 RFM 분석 함수

\`\`\`python
def build_rfm_segments(
    orders: pd.DataFrame,
    base_date: str = "2026-04-30"
) -> pd.DataFrame:
    rfm_raw = make_rfm_raw_table(
        orders=orders,
        base_date=base_date,
        customer_col="customer_id",
        date_col="order_date",
        amount_col="net_amount"
    )

    rfm_score = add_rfm_scores(rfm_raw)
    rfm_segments = add_rfm_segments(rfm_score)

    return rfm_segments
\`\`\`

---

### 14.17.5 함수 사용 예시

\`\`\`python
rfm_segments_func = build_rfm_segments(
    rfm_base_orders,
    base_date="2026-04-30"
)

rfm_segments_func.head()
\`\`\`

---

### 14.17.6 함수화의 장점

\`\`\`text
월별 RFM 분석을 반복하기 쉽다.
기준일만 바꿔 같은 로직으로 분석할 수 있다.
자동 리포트 생성에 활용할 수 있다.
RFM 점수화 기준을 코드로 관리할 수 있다.
\`\`\`

---
`;export{e as default};