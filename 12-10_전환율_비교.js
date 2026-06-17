var e=`# 12장. A/B 테스트 분석 실습

## 12.10 전환율 비교

이제 A/B 테스트의 핵심 지표인 전환율을 비교합니다.

---

### 12.10.1 그룹별 전환율 계산

\`\`\`python
conversion_summary = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        conversions=("converted", "sum")
    )
    .reset_index()
)

conversion_summary["conversion_rate"] = (
    conversion_summary["conversions"] /
    conversion_summary["users"] * 100
).round(2)

conversion_summary
\`\`\`

---

### 12.10.2 전환율 차이와 상대 개선율

\`\`\`python
control_rate = conversion_summary.loc[
    conversion_summary["experiment_group"] == "control",
    "conversion_rate"
].iloc[0]

treatment_rate = conversion_summary.loc[
    conversion_summary["experiment_group"] == "treatment",
    "conversion_rate"
].iloc[0]

conversion_rate_diff = treatment_rate - control_rate

relative_lift = (
    conversion_rate_diff / control_rate * 100
)

conversion_rate_diff, relative_lift
\`\`\`

---

### 12.10.3 전환율 비교표 만들기

\`\`\`python
conversion_rate_comparison = conversion_summary.copy()

conversion_rate_comparison["control_conversion_rate"] = control_rate
conversion_rate_comparison["treatment_conversion_rate"] = treatment_rate
conversion_rate_comparison["conversion_rate_diff_pp"] = round(conversion_rate_diff, 2)
conversion_rate_comparison["relative_lift_percent"] = round(relative_lift, 2)

conversion_rate_comparison
\`\`\`

저장합니다.

\`\`\`python
conversion_rate_comparison.to_csv(
    OUTPUT_TABLES / "chapter_12_conversion_rate_comparison.csv",
    index=False
)
\`\`\`

---

### 12.10.4 전환율 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    conversion_summary["experiment_group"],
    conversion_summary["conversion_rate"]
)

plt.title("A/B 테스트 그룹별 전환율")
plt.xlabel("실험 그룹")
plt.ylabel("전환율(%)")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_12_conversion_rate_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 12.10.5 해석 예시

\`\`\`text
실험군의 전환율이 대조군보다 높게 나타날 수 있다.
전환율 차이는 퍼센트포인트로 해석해야 하고, 상대 개선율은 기존 전환율 대비 개선 비율로 해석해야 한다.
예를 들어 8%에서 10%로 증가한 것은 2%p 증가이며, 상대 개선율은 25%다.
\`\`\`

---
`;export{e as default};