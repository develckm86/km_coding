var e=`# 6장. 고급 groupby 분석 리포트

## 6.5 고객별 구매 요약 리포트 만들기

이번에는 주문 단위 데이터를 고객 단위로 요약합니다.

분석 질문:

\`\`\`text
고객별 총구매액, 구매 횟수, 평균 주문 금액, 최근 구매일은 어떻게 다른가?
\`\`\`

고객 분석에서는 주문 단위 데이터를 고객 단위로 바꾸는 과정이 자주 필요합니다.

---

### 6.5.1 고객별 기본 요약

\`\`\`python
customer_summary = (
    orders_mart
    .groupby(["customer_id", "customer_name", "grade", "region"])
    .agg(
        total_purchase=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean"),
        total_quantity=("quantity", "sum"),
        first_order_date=("order_date_dt", "min"),
        last_order_date=("order_date_dt", "max"),
        category_count=("category", "nunique")
    )
    .reset_index()
)

customer_summary
\`\`\`

---

### 6.5.2 기준일과 최근 구매 후 경과일 계산

고객 분석에서는 마지막 구매일이 중요합니다.

\`\`\`python
base_date = pd.Timestamp("2026-04-30")

customer_summary["days_since_last_order"] = (
    base_date - customer_summary["last_order_date"]
).dt.days

customer_summary
\`\`\`

---

### 6.5.3 평균 주문 금액 반올림

\`\`\`python
customer_summary["avg_order_amount"] = customer_summary["avg_order_amount"].round(0)
\`\`\`

---

### 6.5.4 재구매 여부 추가

구매 횟수가 2회 이상이면 재구매 고객으로 봅니다.

\`\`\`python
customer_summary["is_repeat_customer"] = customer_summary["order_count"] >= 2
\`\`\`

---

### 6.5.5 고객별 주 구매 카테고리 구하기

고객별로 가장 많이 구매한 카테고리를 찾습니다.

먼저 고객별 카테고리별 구매 금액을 계산합니다.

\`\`\`python
customer_category_sales = (
    orders_mart
    .groupby(["customer_id", "category"])
    .agg(
        category_sales=("net_amount", "sum")
    )
    .reset_index()
)

customer_category_sales
\`\`\`

고객별 카테고리 매출 순위를 계산합니다.

\`\`\`python
customer_category_sales["category_rank"] = (
    customer_category_sales
    .groupby("customer_id")["category_sales"]
    .rank(ascending=False, method="dense")
)

customer_category_sales
\`\`\`

1위 카테고리만 선택합니다.

\`\`\`python
main_category = (
    customer_category_sales
    .query("category_rank == 1")
    .sort_values(["customer_id", "category"])
    .drop_duplicates(subset=["customer_id"], keep="first")
    [["customer_id", "category"]]
    .rename(columns={"category": "main_category"})
)

main_category
\`\`\`

고객 요약표에 붙입니다.

\`\`\`python
customer_summary = customer_summary.merge(
    main_category,
    on="customer_id",
    how="left"
)

customer_summary
\`\`\`

---

### 6.5.6 총구매액 기준 정렬

\`\`\`python
customer_summary = customer_summary.sort_values(
    by="total_purchase",
    ascending=False
).reset_index(drop=True)

customer_summary
\`\`\`

---

### 6.5.7 저장하기

\`\`\`python
customer_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_customer_summary.csv",
    index=False
)
\`\`\`

---

### 6.5.8 해석 예시

\`\`\`text
고객별 구매 요약표를 통해 총구매액이 높은 고객, 재구매 고객, 최근 구매 고객을 확인할 수 있다.
총구매액이 높고 최근 구매일이 가까운 고객은 우선 관리 대상 고객으로 볼 수 있다.
order_count가 2회 이상인 고객은 재구매 고객으로 분류할 수 있으며, 이후 RFM 분석의 기초 데이터로 활용할 수 있다.
\`\`\`

---
`;export{e as default};