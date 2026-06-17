var e=`# 12장. A/B 테스트 분석 실습

## 12.9 Sample Ratio Mismatch 확인

Sample Ratio Mismatch는 실험군과 대조군의 배정 비율이 기대한 비율과 다르게 나타나는 문제입니다.

예를 들어 50:50으로 배정했는데 실제 데이터가 70:30이면 문제가 있을 수 있습니다.

---

### 12.9.1 기대 비율 설정

이번 실험은 50:50 배정을 기대합니다.

\`\`\`python
expected_ratio = {
    "control": 0.5,
    "treatment": 0.5
}
\`\`\`

---

### 12.9.2 관측 사용자 수

\`\`\`python
observed_counts = (
    ab_test_clean["experiment_group"]
    .value_counts()
    .reindex(["control", "treatment"])
)

observed_counts
\`\`\`

---

### 12.9.3 기대 사용자 수

\`\`\`python
total_users = observed_counts.sum()

expected_counts = pd.Series({
    group: total_users * ratio
    for group, ratio in expected_ratio.items()
})

expected_counts
\`\`\`

---

### 12.9.4 카이제곱 검정으로 비율 확인

\`\`\`python
sample_ratio_stat, sample_ratio_p_value = stats.chisquare(
    f_obs=observed_counts.values,
    f_exp=expected_counts.values
)

sample_ratio_stat, sample_ratio_p_value
\`\`\`

---

### 12.9.5 Sample Ratio Check 요약표

\`\`\`python
sample_ratio_check = pd.DataFrame({
    "experiment_group": observed_counts.index,
    "observed_users": observed_counts.values,
    "expected_users": expected_counts.values,
    "observed_ratio": (observed_counts.values / total_users * 100).round(2),
    "expected_ratio": (expected_counts.values / total_users * 100).round(2)
})

sample_ratio_check["chi_square_statistic"] = round(sample_ratio_stat, 4)
sample_ratio_check["p_value"] = round(sample_ratio_p_value, 4)
sample_ratio_check["sample_ratio_mismatch"] = sample_ratio_p_value < 0.05

sample_ratio_check
\`\`\`

저장합니다.

\`\`\`python
sample_ratio_check.to_csv(
    OUTPUT_TABLES / "chapter_12_sample_ratio_check.csv",
    index=False
)
\`\`\`

---

### 12.9.6 해석 예시

\`\`\`text
Sample Ratio Mismatch 검정은 실험군과 대조군의 배정 비율이 기대한 비율과 크게 다른지 확인하는 데 사용한다.
p-value가 0.05보다 작다면 기대 비율과 관측 비율이 통계적으로 다르다고 볼 수 있으며, 실험 배정이나 데이터 수집 문제를 의심해야 한다.
SRM이 발생한 실험은 결과 해석에 매우 주의해야 한다.
\`\`\`

---
`;export{e as default};