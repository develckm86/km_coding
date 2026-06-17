var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-10 -->

# 13.10 실무 예제 1: 월별 매출 분석

이번 절에서는 주문 데이터를 사용해 월별 매출을 분석합니다.

---

### 13.10.1 주문일 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

잘못된 날짜는 \`NaT\`가 됩니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

월별 분석에서는 날짜가 없는 행을 제외합니다.

\`\`\`python
orders_valid_date = orders.dropna(subset=["order_date_dt"]).copy()
\`\`\`

---

### 13.10.2 연월 컬럼 생성

\`\`\`python
orders_valid_date["order_year_month"] = orders_valid_date["order_date_dt"].dt.to_period("M")

orders_valid_date[["order_date_dt", "order_year_month"]]
\`\`\`

---

### 13.10.3 월별 매출 집계

\`\`\`python
monthly_sales = (
    orders_valid_date
    .groupby("order_year_month")["total_price"]
    .sum()
    .reset_index()
)

monthly_sales
\`\`\`

월별 주문 수와 평균 주문 금액도 함께 계산할 수 있습니다.

\`\`\`python
monthly_summary = (
    orders_valid_date
    .groupby("order_year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        average_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_summary
\`\`\`

\`agg()\`는 여러 집계를 한 번에 수행할 때 사용합니다.  
그룹화와 집계는 다음 장에서 더 자세히 다룹니다.

---
`;export{e as default};