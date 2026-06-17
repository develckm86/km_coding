var e=`# 6장. 고급 groupby 분석 리포트

## 6.6 transform으로 그룹 내 비율 계산하기

\`transform()\`은 고급 groupby에서 매우 중요한 기능입니다.

\`agg()\`는 그룹별 결과를 요약해서 행 수를 줄입니다.  
반면 \`transform()\`은 그룹별 계산 결과를 원래 행 수에 맞춰 다시 붙입니다.

---

### 6.6.1 agg와 transform의 차이

예를 들어 카테고리별 평균 주문 금액을 계산한다고 해봅시다.

\`agg()\`를 사용하면 카테고리별 결과만 남습니다.

\`\`\`python
orders_mart.groupby("category")["net_amount"].mean()
\`\`\`

하지만 \`transform()\`을 사용하면 각 주문 행에 자기 카테고리 평균을 붙일 수 있습니다.

\`\`\`python
orders_mart["category_avg_amount"] = (
    orders_mart
    .groupby("category")["net_amount"]
    .transform("mean")
)

orders_mart[["order_id", "category", "net_amount", "category_avg_amount"]].head()
\`\`\`

---

### 6.6.2 카테고리 평균 대비 차이 계산

각 주문이 자기 카테고리 평균보다 얼마나 높은지 계산합니다.

\`\`\`python
orders_mart["amount_diff_from_category_avg"] = (
    orders_mart["net_amount"] - orders_mart["category_avg_amount"]
)

orders_mart[[
    "order_id",
    "category",
    "net_amount",
    "category_avg_amount",
    "amount_diff_from_category_avg"
]].head()
\`\`\`

양수이면 카테고리 평균보다 높은 주문입니다.  
음수이면 카테고리 평균보다 낮은 주문입니다.

---

### 6.6.3 카테고리 내 매출 비중 계산

각 주문이 자기 카테고리 매출에서 차지하는 비중을 계산합니다.

먼저 카테고리별 총매출을 원본 행에 붙입니다.

\`\`\`python
orders_mart["category_total_sales"] = (
    orders_mart
    .groupby("category")["net_amount"]
    .transform("sum")
)
\`\`\`

비중을 계산합니다.

\`\`\`python
orders_mart["order_ratio_in_category"] = (
    orders_mart["net_amount"] / orders_mart["category_total_sales"] * 100
).round(2)

orders_mart[[
    "order_id",
    "category",
    "net_amount",
    "category_total_sales",
    "order_ratio_in_category"
]].head()
\`\`\`

---

### 6.6.4 지역별 카테고리 매출 비중

이번에는 지역 안에서 각 카테고리가 차지하는 비중을 계산합니다.

먼저 지역별 카테고리 매출을 구합니다.

\`\`\`python
region_category_sales = (
    orders_mart
    .groupby(["region", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

region_category_sales
\`\`\`

지역별 총매출을 \`transform()\`으로 붙입니다.

\`\`\`python
region_category_sales["region_total_sales"] = (
    region_category_sales
    .groupby("region")["total_sales"]
    .transform("sum")
)

region_category_sales["sales_ratio_in_region"] = (
    region_category_sales["total_sales"] /
    region_category_sales["region_total_sales"] * 100
).round(1)

region_category_sales
\`\`\`

---

### 6.6.5 저장하기

\`\`\`python
region_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_06_region_category_ratio.csv",
    index=False
)
\`\`\`

---

### 6.6.6 해석 예시

\`\`\`text
지역별 카테고리 매출 비중을 보면 각 지역에서 어떤 카테고리가 중요한지 알 수 있다.
총매출이 큰 지역과 특정 카테고리 비중이 높은 지역은 다를 수 있다.
따라서 지역 전략을 세울 때는 지역별 총매출뿐 아니라 지역 내 카테고리 비중도 함께 봐야 한다.
\`\`\`

---
`;export{e as default};