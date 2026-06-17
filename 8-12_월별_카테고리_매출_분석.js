var e=`# 8장. 시계열 매출 분석

## 8.12 월별 카테고리 매출 분석

매출 변화의 원인을 더 자세히 보려면 카테고리별 월별 매출을 확인해야 합니다.

---

### 8.12.1 월별 카테고리 매출 집계

\`\`\`python
monthly_category_sales = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
    .sort_values(["year_month", "category"])
)

monthly_category_sales["avg_order_amount"] = (
    monthly_category_sales["avg_order_amount"].round(0)
)

monthly_category_sales
\`\`\`

---

### 8.12.2 월별 총매출 붙이기

\`\`\`python
monthly_category_sales["monthly_total_sales"] = (
    monthly_category_sales
    .groupby("year_month")["total_sales"]
    .transform("sum")
)

monthly_category_sales["sales_ratio_in_month"] = (
    monthly_category_sales["total_sales"] /
    monthly_category_sales["monthly_total_sales"] * 100
).round(1)

monthly_category_sales
\`\`\`

---

### 8.12.3 저장하기

\`\`\`python
monthly_category_sales.to_csv(
    OUTPUT_TABLES / "chapter_08_monthly_category_sales.csv",
    index=False
)
\`\`\`

---

### 8.12.4 월별 카테고리 매출 피벗

그래프를 그리기 위해 피벗 테이블을 만들 수 있습니다.

\`\`\`python
monthly_category_pivot = pd.pivot_table(
    data=monthly_category_sales,
    index="year_month",
    columns="category",
    values="total_sales",
    aggfunc="sum",
    fill_value=0
)

monthly_category_pivot
\`\`\`

---

### 8.12.5 월별 카테고리 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

for category in monthly_category_pivot.columns:
    plt.plot(
        monthly_category_pivot.index,
        monthly_category_pivot[category],
        label=category
    )

plt.title("월별 카테고리 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.legend()

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_08_monthly_category_sales_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 8.12.6 해석 예시

\`\`\`text
월별 카테고리 매출을 보면 전체 매출 변화가 어떤 카테고리에서 발생했는지 확인할 수 있다.
특정 월의 매출 증가가 전자기기 카테고리에 집중되어 있다면, 전체 매출 성장은 고가 상품 판매의 영향을 크게 받았을 수 있다.
카테고리별 매출 비중을 함께 보면 월별 매출 구조 변화도 확인할 수 있다.
\`\`\`

---
`;export{e as default};