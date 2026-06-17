var e=`# 5장. 데이터 재구조화 실습

## 5.10 고객별 월별 구매 금액 테이블 만들기

이번에는 고객별 월별 구매 금액을 피벗 테이블로 만듭니다.

분석 질문:

\`\`\`text
고객별로 월별 구매 금액은 어떻게 다른가?
\`\`\`

---

### 5.10.1 고객별 월별 구매 금액 long 데이터

\`\`\`python
customer_month_long = (
    orders_mart
    .groupby(["customer_id", "customer_name", "year_month"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

customer_month_long
\`\`\`

---

### 5.10.2 고객별 월별 구매 금액 pivot 만들기

\`\`\`python
customer_month_pivot = pd.pivot_table(
    data=orders_mart,
    index=["customer_id", "customer_name"],
    columns="year_month",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

customer_month_pivot
\`\`\`

이 표는 고객별 월별 구매 금액을 한눈에 볼 수 있습니다.

---

### 5.10.3 고객별 총구매액 추가

\`\`\`python
customer_month_pivot["총구매액"] = customer_month_pivot.sum(axis=1)

customer_month_pivot = customer_month_pivot.sort_values(
    by="총구매액",
    ascending=False
)

customer_month_pivot
\`\`\`

---

### 5.10.4 저장하기

\`\`\`python
customer_month_pivot.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_05_customer_month_pivot.csv",
    index=False
)
\`\`\`

---

### 5.10.5 해석 예시

\`\`\`text
고객별 월별 구매 금액 테이블을 보면 특정 고객이 어느 월에 구매했는지 확인할 수 있다.
총구매액이 높은 고객은 VIP 후보로 볼 수 있으며, 이후 RFM 분석이나 고객 세그먼트 분석의 입력 데이터로 활용할 수 있다.
\`\`\`

---
`;export{e as default};