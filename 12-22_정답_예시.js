var e=`# 12장. A/B 테스트 분석 실습

## 12.22 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 12.22.1 분석용 데이터 정리

\`\`\`python
valid_groups = ["control", "treatment"]

ab_test_clean = ab_test_raw[
    ab_test_raw["experiment_group"].isin(valid_groups)
].copy()

ab_test_clean = ab_test_clean.drop_duplicates(
    subset=["user_id"],
    keep="first",
    ignore_index=True
)

ab_test_clean["converted"] = ab_test_clean["converted"].astype(int)
ab_test_clean["purchase_amount"] = ab_test_clean["purchase_amount"].astype(float)
\`\`\`

---

### 12.22.2 그룹 요약표

\`\`\`python
group_summary = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        converted_users=("converted", "sum"),
        total_revenue=("purchase_amount", "sum")
    )
    .reset_index()
)

group_summary["conversion_rate"] = (
    group_summary["converted_users"] / group_summary["users"] * 100
).round(2)

group_summary["revenue_per_user"] = (
    group_summary["total_revenue"] / group_summary["users"]
).round(2)
\`\`\`

---

### 12.22.3 전환율 차이 검정

\`\`\`python
def two_proportion_z_test(success_a, n_a, success_b, n_b):
    p_a = success_a / n_a
    p_b = success_b / n_b

    p_pool = (success_a + success_b) / (n_a + n_b)

    se = np.sqrt(
        p_pool * (1 - p_pool) * (1 / n_a + 1 / n_b)
    )

    z_stat = (p_b - p_a) / se

    p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))

    return z_stat, p_value
\`\`\`

---

### 12.22.4 사용자당 매출

\`\`\`python
revenue_per_user_comparison = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        total_revenue=("purchase_amount", "sum"),
        revenue_per_user=("purchase_amount", "mean")
    )
    .reset_index()
)
\`\`\`

---
`;export{e as default};