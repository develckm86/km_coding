var e=`# 9장. 복잡한 데이터 결합 실습

## 9.11 고객 등급 이력 결합

이번에는 주문일 기준 고객 등급을 붙입니다.

고객 등급도 시간이 지나며 바뀔 수 있습니다.

---

### 9.11.1 등급 이력 데이터 확인

\`\`\`python
grade_history.sort_values(["customer_id", "effective_date"])
\`\`\`

예를 들어 고객 1은 2026년 3월 1일부터 VIP가 됩니다.

---

### 9.11.2 merge_asof를 위한 정렬

\`\`\`python
orders_for_grade = orders.sort_values("order_date").copy()
grade_history_sorted = grade_history.sort_values("effective_date").copy()
\`\`\`

---

### 9.11.3 주문일 기준 고객 등급 붙이기

\`\`\`python
orders_with_grade_history = pd.merge_asof(
    orders_for_grade,
    grade_history_sorted,
    by="customer_id",
    left_on="order_date",
    right_on="effective_date",
    direction="backward"
)

orders_with_grade_history[[
    "order_id",
    "order_date",
    "customer_id",
    "effective_date",
    "grade_at_time"
]]
\`\`\`

---

### 9.11.4 등급 이력 매칭 실패 확인

\`\`\`python
grade_history_join_check = orders_with_grade_history[
    orders_with_grade_history["grade_at_time"].isna()
][["order_id", "order_date", "customer_id"]].copy()

grade_history_join_check["issue_type"] = "고객 등급 이력 매칭 실패"

grade_history_join_check
\`\`\`

이번 예제에서는 매칭 실패가 없을 수 있습니다.

---

### 9.11.5 주문 당시 등급별 매출 분석

가격 이력 데이터와 결합하거나 기본 가격을 붙여야 매출을 계산할 수 있습니다.  
여기서는 앞에서 만든 가격 이력 결합 결과에 고객 등급 이력도 붙이는 방식으로 확장할 수 있습니다.

먼저 등급 이력을 붙인 주문에 가격 이력 결과의 금액을 붙여봅니다.

\`\`\`python
orders_grade_price = orders_with_grade_history.merge(
    orders_with_price_history[["order_id", "net_amount_history"]],
    on="order_id",
    how="left",
    validate="one_to_one"
)

grade_sales_at_time = (
    orders_grade_price
    .dropna(subset=["net_amount_history"])
    .groupby("grade_at_time")
    .agg(
        total_sales=("net_amount_history", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount_history", "mean")
    )
    .reset_index()
)

grade_sales_at_time["avg_order_amount"] = (
    grade_sales_at_time["avg_order_amount"].round(0)
)

grade_sales_at_time
\`\`\`

---

### 9.11.6 저장하기

\`\`\`python
orders_with_grade_history.to_csv(
    DATA_PROCESSED / "chapter_09_orders_with_grade_history.csv",
    index=False
)

grade_history_join_check.to_csv(
    OUTPUT_TABLES / "chapter_09_grade_history_join_check.csv",
    index=False
)
\`\`\`

---

### 9.11.7 해석 예시

\`\`\`text
고객 등급 이력 결합은 주문 당시의 고객 등급을 분석하기 위해 필요하다.
현재 고객 등급을 과거 주문에 붙이면 과거 시점의 고객 상태를 잘못 해석할 수 있다.
주문 당시 등급 기준으로 매출을 분석하면 등급 변화에 따른 구매 패턴을 더 정확히 볼 수 있다.
\`\`\`

---
`;export{e as default};