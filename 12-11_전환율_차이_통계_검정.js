var e=`# 12장. A/B 테스트 분석 실습

## 12.11 전환율 차이 통계 검정

전환율 차이가 실제로 의미 있는지 확인하기 위해 비율 차이 검정을 수행합니다.

이번 장에서는 두 비율 z-test를 직접 계산합니다.

---

### 12.11.1 두 비율 z-test 함수

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

여기서 A는 대조군, B는 실험군으로 둡니다.

---

### 12.11.2 검정에 필요한 값 준비

\`\`\`python
control_row = conversion_summary[
    conversion_summary["experiment_group"] == "control"
].iloc[0]

treatment_row = conversion_summary[
    conversion_summary["experiment_group"] == "treatment"
].iloc[0]

control_conversions = control_row["conversions"]
control_users = control_row["users"]

treatment_conversions = treatment_row["conversions"]
treatment_users = treatment_row["users"]
\`\`\`

---

### 12.11.3 z-test 수행

\`\`\`python
z_stat, p_value = two_proportion_z_test(
    success_a=control_conversions,
    n_a=control_users,
    success_b=treatment_conversions,
    n_b=treatment_users
)

z_stat, p_value
\`\`\`

---

### 12.11.4 전환율 차이 신뢰구간

두 비율 차이에 대한 근사 신뢰구간도 계산해봅니다.

\`\`\`python
p_control = control_conversions / control_users
p_treatment = treatment_conversions / treatment_users

diff = p_treatment - p_control

se_unpooled = np.sqrt(
    p_control * (1 - p_control) / control_users +
    p_treatment * (1 - p_treatment) / treatment_users
)

ci_lower = diff - 1.96 * se_unpooled
ci_upper = diff + 1.96 * se_unpooled

ci_lower_percent = ci_lower * 100
ci_upper_percent = ci_upper * 100

ci_lower_percent, ci_upper_percent
\`\`\`

---

### 12.11.5 통계 검정 결과표 만들기

\`\`\`python
conversion_statistical_result = pd.DataFrame([
    {
        "metric": "conversion_rate",
        "control_users": int(control_users),
        "control_conversions": int(control_conversions),
        "control_conversion_rate_percent": round(p_control * 100, 2),
        "treatment_users": int(treatment_users),
        "treatment_conversions": int(treatment_conversions),
        "treatment_conversion_rate_percent": round(p_treatment * 100, 2),
        "diff_percentage_point": round(diff * 100, 2),
        "relative_lift_percent": round((diff / p_control) * 100, 2),
        "z_statistic": round(z_stat, 4),
        "p_value": round(p_value, 4),
        "ci_lower_95_pp": round(ci_lower_percent, 2),
        "ci_upper_95_pp": round(ci_upper_percent, 2),
        "alpha": 0.05,
        "is_statistically_significant": bool(p_value < 0.05)
    }
])

conversion_statistical_result
\`\`\`

저장합니다.

\`\`\`python
conversion_statistical_result.to_csv(
    OUTPUT_TABLES / "chapter_12_conversion_statistical_result.csv",
    index=False
)
\`\`\`

---

### 12.11.6 해석 예시

\`\`\`text
전환율 차이 검정 결과 p-value가 0.05보다 작다면, 실험군과 대조군의 전환율 차이가 통계적으로 유의하다고 볼 수 있다.
하지만 p-value가 0.05보다 크다고 해서 두 그룹이 완전히 같다는 뜻은 아니다.
전환율 차이의 크기, 신뢰구간, 실무적으로 필요한 최소 개선폭을 함께 고려해야 한다.
\`\`\`

---
`;export{e as default};