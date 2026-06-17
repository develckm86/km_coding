var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.14 코호트 요약표 만들기

코호트별 핵심 지표를 한 표로 정리합니다.

---

### 15.14.1 1개월 후 리텐션 추출

\`\`\`python
month1_retention = cohort_retention_table[1] if 1 in cohort_retention_table.columns else pd.Series(dtype=float)

month1_retention
\`\`\`

---

### 15.14.2 코호트별 총매출

\`\`\`python
cohort_total_sales = (
    cohort_data
    .groupby("cohort_month")
    .agg(
        cohort_total_sales=("net_amount", "sum"),
        total_orders=("order_id", "nunique")
    )
    .reset_index()
)

cohort_total_sales
\`\`\`

---

### 15.14.3 코호트 요약표 생성

\`\`\`python
cohort_summary = cohort_size.merge(
    cohort_total_sales,
    on="cohort_month",
    how="left"
)

if 1 in cohort_retention_table.columns:
    cohort_summary = cohort_summary.merge(
        cohort_retention_table[1].reset_index().rename(columns={1: "month1_retention_rate"}),
        on="cohort_month",
        how="left"
    )
else:
    cohort_summary["month1_retention_rate"] = np.nan

if 2 in cohort_retention_table.columns:
    cohort_summary = cohort_summary.merge(
        cohort_retention_table[2].reset_index().rename(columns={2: "month2_retention_rate"}),
        on="cohort_month",
        how="left"
    )
else:
    cohort_summary["month2_retention_rate"] = np.nan

cohort_summary["avg_sales_per_cohort_customer"] = (
    cohort_summary["cohort_total_sales"] /
    cohort_summary["cohort_customers"]
).round(0)

cohort_summary
\`\`\`

저장합니다.

\`\`\`python
cohort_summary.to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_summary.csv",
    index=False
)
\`\`\`

---

### 15.14.4 코호트 크기 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    cohort_summary["cohort_month"].astype(str),
    cohort_summary["cohort_customers"]
)

plt.title("코호트별 신규 구매 고객 수")
plt.xlabel("첫 구매 월")
plt.ylabel("고객 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_15_cohort_size_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 15.14.5 1개월 후 리텐션 그래프

\`\`\`python
if "month1_retention_rate" in cohort_summary.columns:
    month1_data = cohort_summary.dropna(subset=["month1_retention_rate"])

    plt.figure(figsize=(8, 4))

    plt.bar(
        month1_data["cohort_month"].astype(str),
        month1_data["month1_retention_rate"]
    )

    plt.title("코호트별 1개월 후 리텐션")
    plt.xlabel("첫 구매 월")
    plt.ylabel("1개월 후 리텐션(%)")

    plt.tight_layout()

    plt.savefig(
        OUTPUT_CHARTS / "chapter_15_month1_retention_chart.png",
        bbox_inches="tight"
    )

    plt.show()
\`\`\`

---
`;export{e as default};