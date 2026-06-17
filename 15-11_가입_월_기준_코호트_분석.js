var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.11 가입 월 기준 코호트 분석

이번에는 가입 월 기준 코호트도 만들어봅니다.

가입 월 기준 코호트는 가입 후 구매 활성화를 확인할 때 유용합니다.

---

### 15.11.1 가입 월 기준 코호트 데이터 만들기

\`\`\`python
signup_cohort_data = cohort_base_orders.copy()

signup_cohort_data["signup_month"] = signup_cohort_data["signup_date"].dt.to_period("M")
signup_cohort_data["order_month"] = signup_cohort_data["order_date"].dt.to_period("M")

signup_cohort_data["signup_cohort_index"] = signup_cohort_data.apply(
    lambda row: calculate_month_diff(row["order_month"], row["signup_month"]),
    axis=1
)

signup_cohort_data.head()
\`\`\`

---

### 15.11.2 가입 월별 활성 고객 수

\`\`\`python
signup_cohort_counts = (
    signup_cohort_data
    .groupby(["signup_month", "signup_cohort_index"])
    .agg(
        active_customers=("customer_id", "nunique")
    )
    .reset_index()
)

signup_cohort_count_table = pd.pivot_table(
    data=signup_cohort_counts,
    index="signup_month",
    columns="signup_cohort_index",
    values="active_customers",
    aggfunc="sum"
)

signup_cohort_count_table
\`\`\`

---

### 15.11.3 가입 월 기준 리텐션

가입 월 기준 코호트 크기는 가입 월별 고객 수입니다.

\`\`\`python
signup_cohort_size = (
    signup_cohort_data
    .groupby("signup_month")
    .agg(
        cohort_customers=("customer_id", "nunique")
    )
)

signup_cohort_size
\`\`\`

리텐션 비율을 계산합니다.

\`\`\`python
signup_cohort_retention_table = signup_cohort_count_table.divide(
    signup_cohort_size["cohort_customers"],
    axis=0
) * 100

signup_cohort_retention_table = signup_cohort_retention_table.round(1)

signup_cohort_retention_table
\`\`\`

---

### 15.11.4 저장하기

\`\`\`python
signup_cohort_retention_table.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_15_signup_cohort_retention_table.csv",
    index=False
)
\`\`\`

---

### 15.11.5 가입 월 기준 히트맵

\`\`\`python
plt.figure(figsize=(10, 5))

plt.imshow(signup_cohort_retention_table.values, aspect="auto")

plt.title("가입 월 기준 코호트 리텐션")
plt.xlabel("가입 후 경과 월")
plt.ylabel("가입 월")

plt.xticks(
    ticks=range(len(signup_cohort_retention_table.columns)),
    labels=signup_cohort_retention_table.columns
)

plt.yticks(
    ticks=range(len(signup_cohort_retention_table.index)),
    labels=signup_cohort_retention_table.index.astype(str)
)

plt.colorbar(label="리텐션(%)")

for i in range(signup_cohort_retention_table.shape[0]):
    for j in range(signup_cohort_retention_table.shape[1]):
        value = signup_cohort_retention_table.iloc[i, j]
        if pd.notna(value):
            plt.text(j, i, f"{value:.1f}", ha="center", va="center")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_15_signup_cohort_heatmap.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 15.11.6 해석 예시

\`\`\`text
가입 월 기준 코호트는 가입 이후 고객이 구매 활동을 하는지 보여준다.
가입 후 0개월 리텐션이 낮다면 가입한 달에 구매하지 않은 고객이 많다는 뜻일 수 있다.
가입 후 1개월, 2개월 리텐션은 회원가입 이후 구매 활성화가 얼마나 잘 이어지는지 보여준다.
\`\`\`

---
`;export{e as default};