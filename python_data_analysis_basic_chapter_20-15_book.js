var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-15 -->

# 20.15 10단계: 지역별 매출 분석

지역별 매출 차이를 확인합니다.

---

### 20.15.1 지역별 요약표

\`\`\`python
region_report = (
    orders_analysis
    .groupby("region_clean")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

region_report["avg_order_amount"] = region_report["avg_order_amount"].round(0)

region_report = region_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

region_report
\`\`\`

---

### 20.15.2 지역별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(region_report["region_clean"], region_report["total_sales"])

plt.title("지역별 총매출")
plt.xlabel("지역")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 20.15.3 해석 예시

\`\`\`text
지역별 매출을 보면 특정 지역의 매출이 높게 나타날 수 있다.
하지만 지역별 매출 차이는 고객 수, 주문 수, 평균 주문 금액의 영향을 함께 받는다.
따라서 지역별 총매출만 보고 지역 성과를 단정하기보다는 주문 수와 고객 수를 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};