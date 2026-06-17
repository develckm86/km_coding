var e=`# 17장. 고급 시각화 리포트 만들기

## 17.6 월별 매출 추이 그래프

시각화 리포트에서 가장 기본이 되는 그래프는 월별 매출 추이입니다.

분석 질문:

\`\`\`text
월별 매출은 증가하고 있는가?
\`\`\`

---

### 17.6.1 월별 매출 집계

\`\`\`python
monthly_sales = (
    orders_mart
    .dropna(subset=["year_month"])
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values("year_month")
)

monthly_sales["avg_order_amount"] = (
    monthly_sales["total_sales"] / monthly_sales["order_count"]
).round(0)

monthly_sales
\`\`\`

---

### 17.6.2 월별 매출 추이 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(
    monthly_sales["year_month"],
    monthly_sales["total_sales"],
    marker="o"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_monthly_sales_trend.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.6.3 해석 문장 예시

\`\`\`text
월별 매출 추이 그래프는 분석 기간 동안 매출이 어떻게 변했는지 보여준다.
특정 월에 매출이 크게 증가했다면 해당 월의 주문 수, 평균 주문 금액, 카테고리별 매출 기여도를 추가로 확인해야 한다.
\`\`\`

---
`;export{e as default};