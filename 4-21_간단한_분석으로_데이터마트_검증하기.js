var e=`# 4장. 분석용 데이터마트 만들기

## 4.21 간단한 분석으로 데이터마트 검증하기

데이터마트가 제대로 만들어졌는지 간단한 분석을 해봅니다.

---

### 4.21.1 전체 매출 확인

\`\`\`python
orders_mart["net_amount"].sum()
\`\`\`

---

### 4.21.2 카테고리별 매출 확인

\`\`\`python
category_sales = (
    orders_mart
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

---

### 4.21.3 월별 매출 확인

날짜가 유효한 주문만 사용합니다.

\`\`\`python
monthly_sales = (
    orders_mart
    .dropna(subset=["year_month"])
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_sales
\`\`\`

---

### 4.21.4 고객 등급별 매출 확인

\`\`\`python
grade_sales = (
    orders_mart
    .groupby("grade")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

grade_sales
\`\`\`

이런 간단한 분석을 통해 데이터마트가 실제 분석에 사용할 수 있는지 확인할 수 있습니다.

---
`;export{e as default};