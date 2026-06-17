var e=`# 11장. 통계적 비교 실습

## 11.23 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 11.23.1 그룹별 요약 통계 함수

\`\`\`python
def make_group_comparison_summary(df, group_col, value_col):
    return (
        df
        .dropna(subset=[group_col, value_col])
        .groupby(group_col)
        .agg(
            customer_count=(value_col, "count"),
            mean_value=(value_col, "mean"),
            median_value=(value_col, "median"),
            std_value=(value_col, "std"),
            min_value=(value_col, "min"),
            q1_value=(value_col, lambda x: x.quantile(0.25)),
            q3_value=(value_col, lambda x: x.quantile(0.75)),
            max_value=(value_col, "max")
        )
        .reset_index()
    )
\`\`\`

---

### 11.23.2 고객 등급별 비교

\`\`\`python
grade_comparison_summary = make_group_comparison_summary(
    customer_features,
    "customer_grade",
    "total_purchase"
)
\`\`\`

---

### 11.23.3 부트스트랩 평균 차이

\`\`\`python
vip_purchase = customer_features.loc[
    customer_features["customer_grade"] == "VIP",
    "total_purchase"
].dropna().values

normal_purchase = customer_features.loc[
    customer_features["customer_grade"] != "VIP",
    "total_purchase"
].dropna().values

bootstrap_mean_diff = bootstrap_mean_difference(
    vip_purchase,
    normal_purchase,
    n_bootstrap=1000,
    random_state=42
)
\`\`\`

---

### 11.23.4 신뢰구간

\`\`\`python
ci_lower = bootstrap_mean_diff["mean_difference"].quantile(0.025)
ci_upper = bootstrap_mean_diff["mean_difference"].quantile(0.975)
\`\`\`

---

### 11.23.5 t-test

\`\`\`python
from scipy import stats

ttest_result = stats.ttest_ind(
    vip_purchase,
    normal_purchase,
    equal_var=False
)
\`\`\`

---
`;export{e as default};