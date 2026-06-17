var e=`# 7장. 누적 지표와 이동평균 분석

## 7.14 카테고리별 누적 매출 분석

전체 누적 매출뿐 아니라 카테고리별 누적 매출도 볼 수 있습니다.

분석 질문:

\`\`\`text
카테고리별 누적 매출은 시간에 따라 어떻게 쌓이는가?
\`\`\`

---

### 7.14.1 날짜별 카테고리 매출 집계

\`\`\`python
daily_category_sales = (
    orders_mart
    .dropna(subset=["order_date_dt"])
    .groupby(["order_date_dt", "category"])
    .agg(
        daily_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(["category", "order_date_dt"])
)

daily_category_sales
\`\`\`

---

### 7.14.2 카테고리별 누적 매출 계산

\`\`\`python
daily_category_sales["category_cumulative_sales"] = (
    daily_category_sales
    .groupby("category")["daily_sales"]
    .cumsum()
)

daily_category_sales
\`\`\`

---

### 7.14.3 카테고리별 최종 누적 매출 확인

\`\`\`python
category_final_cumulative = (
    daily_category_sales
    .sort_values(["category", "order_date_dt"])
    .groupby("category")
    .tail(1)
    [["category", "category_cumulative_sales"]]
    .sort_values("category_cumulative_sales", ascending=False)
)

category_final_cumulative
\`\`\`

---

### 7.14.4 저장하기

\`\`\`python
daily_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_07_category_cumulative_sales.csv",
    index=False
)
\`\`\`

---

### 7.14.5 카테고리별 누적 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

for category in daily_category_sales["category"].unique():
    temp = daily_category_sales[daily_category_sales["category"] == category]
    plt.plot(
        temp["order_date_dt"],
        temp["category_cumulative_sales"],
        label=category
    )

plt.title("카테고리별 누적 매출")
plt.xlabel("날짜")
plt.ylabel("누적 매출")
plt.legend()

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_07_category_cumulative_sales_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 7.14.6 해석 예시

\`\`\`text
카테고리별 누적 매출을 보면 어떤 카테고리가 전체 매출을 빠르게 쌓아가는지 확인할 수 있다.
전자기기처럼 단가가 높은 카테고리는 주문 수가 많지 않아도 누적 매출이 빠르게 증가할 수 있다.
카테고리별 누적 매출은 상품 운영 우선순위와 매출 기여도 분석에 활용할 수 있다.
\`\`\`

---
`;export{e as default};