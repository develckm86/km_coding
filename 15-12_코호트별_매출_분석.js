var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.12 코호트별 매출 분석

리텐션은 고객 수 기준 분석입니다.  
이번에는 코호트별 매출을 분석합니다.

---

### 15.12.1 코호트별 매출 집계

\`\`\`python
cohort_sales = (
    cohort_data
    .groupby(["cohort_month", "cohort_index"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "nunique"),
        active_customers=("customer_id", "nunique")
    )
    .reset_index()
)

cohort_sales.head()
\`\`\`

---

### 15.12.2 코호트별 매출 피벗

\`\`\`python
cohort_sales_table = pd.pivot_table(
    data=cohort_sales,
    index="cohort_month",
    columns="cohort_index",
    values="total_sales",
    aggfunc="sum"
)

cohort_sales_table
\`\`\`

저장합니다.

\`\`\`python
cohort_sales_table.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_sales_table.csv",
    index=False
)
\`\`\`

---

### 15.12.3 매출 히트맵

\`\`\`python
plt.figure(figsize=(10, 5))

plt.imshow(cohort_sales_table.fillna(0).values, aspect="auto")

plt.title("코호트별 매출")
plt.xlabel("경과 월")
plt.ylabel("첫 구매 월")

plt.xticks(
    ticks=range(len(cohort_sales_table.columns)),
    labels=cohort_sales_table.columns
)

plt.yticks(
    ticks=range(len(cohort_sales_table.index)),
    labels=cohort_sales_table.index.astype(str)
)

plt.colorbar(label="매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_15_cohort_sales_heatmap.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 15.12.4 해석 예시

\`\`\`text
코호트별 매출 테이블은 고객 수가 아니라 매출 기준으로 코호트의 기여도를 보여준다.
리텐션이 낮더라도 남아 있는 고객의 구매 금액이 높으면 매출 기여는 유지될 수 있다.
고객 수 리텐션과 매출 리텐션을 함께 보면 고객 유지와 매출 유지의 차이를 이해할 수 있다.
\`\`\`

---
`;export{e as default};