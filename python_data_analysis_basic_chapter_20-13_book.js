var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-13 -->

# 20.13 8단계: 월별 매출 분석

날짜가 유효한 주문만 사용해 월별 매출을 분석합니다.

---

### 20.13.1 월별 요약표

\`\`\`python
monthly_report = (
    orders_analysis
    .dropna(subset=["year_month"])
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_report["avg_order_amount"] = monthly_report["avg_order_amount"].round(0)

monthly_report
\`\`\`

---

### 20.13.2 월별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_report["year_month"], monthly_report["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 20.13.3 해석 예시

\`\`\`text
월별 매출은 특정 월에 증가하거나 감소하는 흐름을 보일 수 있다.
매출 변화의 원인을 이해하려면 주문 수, 평균 주문 금액, 카테고리별 매출을 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};