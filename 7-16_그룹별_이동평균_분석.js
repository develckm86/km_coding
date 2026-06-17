var e=`# 7장. 누적 지표와 이동평균 분석

## 7.16 그룹별 이동평균 분석

이동평균은 전체 매출뿐 아니라 카테고리별로도 계산할 수 있습니다.

---

### 7.16.1 카테고리별 일별 매출 데이터 만들기

카테고리별로 모든 날짜가 존재하도록 만들면 더 정확한 이동평균을 계산할 수 있습니다.

먼저 날짜와 카테고리 조합을 만듭니다.

\`\`\`python
all_dates = pd.date_range(
    start=orders_mart["order_date_dt"].min(),
    end=orders_mart["order_date_dt"].max(),
    freq="D"
)

all_categories = orders_mart["category"].dropna().unique()

date_category_index = pd.MultiIndex.from_product(
    [all_dates, all_categories],
    names=["order_date_dt", "category"]
)
\`\`\`

일별 카테고리 매출을 인덱스에 맞춥니다.

\`\`\`python
daily_category_full = (
    daily_category_sales
    .set_index(["order_date_dt", "category"])
    .reindex(date_category_index)
    .reset_index()
)

daily_category_full[["daily_sales", "order_count"]] = (
    daily_category_full[["daily_sales", "order_count"]]
    .fillna(0)
)

daily_category_full.head()
\`\`\`

---

### 7.16.2 카테고리별 3일 이동평균

\`\`\`python
daily_category_full = daily_category_full.sort_values(
    ["category", "order_date_dt"]
)

daily_category_full["category_sales_3d_ma"] = (
    daily_category_full
    .groupby("category")["daily_sales"]
    .transform(lambda s: s.rolling(window=3, min_periods=1).mean())
)

daily_category_full.head()
\`\`\`

---

### 7.16.3 해석 예시

\`\`\`text
카테고리별 이동평균은 각 카테고리의 최근 매출 흐름을 부드럽게 보여준다.
전체 매출 이동평균이 상승하더라도 특정 카테고리는 하락하고 있을 수 있으므로, 카테고리별 이동평균을 함께 확인하는 것이 좋다.
\`\`\`

---
`;export{e as default};