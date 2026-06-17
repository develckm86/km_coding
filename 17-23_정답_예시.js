var e=`# 17장. 고급 시각화 리포트 만들기

## 17.23 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 17.23.1 월별 매출 그래프

\`\`\`python
monthly_sales = (
    orders_mart
    .groupby("year_month")
    .agg(total_sales=("net_amount", "sum"))
    .reset_index()
)

plt.figure(figsize=(10, 4))
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"], marker="o")
plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.tight_layout()
plt.savefig(OUTPUT_CHARTS / "monthly_sales_trend.png", bbox_inches="tight")
plt.show()
\`\`\`

---

### 17.23.2 카테고리별 매출 그래프

\`\`\`python
category_sales = (
    orders_mart
    .groupby("category")
    .agg(total_sales=("net_amount", "sum"))
    .reset_index()
    .sort_values("total_sales", ascending=False)
)

plt.figure(figsize=(8, 4))
plt.bar(category_sales["category"], category_sales["total_sales"])
plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.tight_layout()
plt.savefig(OUTPUT_CHARTS / "category_sales_bar.png", bbox_inches="tight")
plt.show()
\`\`\`

---

### 17.23.3 퍼널 그래프

\`\`\`python
plt.figure(figsize=(10, 4))
plt.bar(funnel_report["step_name"], funnel_report["users"])
plt.title("구매 퍼널 단계별 사용자 수")
plt.xlabel("퍼널 단계")
plt.ylabel("사용자 수")
plt.xticks(rotation=30)
plt.tight_layout()
plt.savefig(OUTPUT_CHARTS / "funnel_chart.png", bbox_inches="tight")
plt.show()
\`\`\`

---

### 17.23.4 해석 테이블 예시

\`\`\`python
chart_interpretation_table = pd.DataFrame([
    {
        "chart_name": "monthly_sales_trend",
        "question": "월별 매출은 어떻게 변하는가?",
        "interpretation": "월별 매출 흐름을 통해 증가 또는 감소 추세를 확인할 수 있다.",
        "caution": "매출 변화 원인은 추가 분해 분석이 필요하다."
    }
])
\`\`\`

---
`;export{e as default};