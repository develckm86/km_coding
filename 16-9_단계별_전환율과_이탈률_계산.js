var e=`# 16장. 퍼널 분석 실습

## 16.9 단계별 전환율과 이탈률 계산

퍼널 분석에서는 이전 단계 대비 다음 단계로 얼마나 이동했는지가 중요합니다.

---

### 16.9.1 이전 단계 사용자 수

\`\`\`python
funnel_conversion_report = funnel_step_summary.copy()

funnel_conversion_report["previous_step_users"] = (
    funnel_conversion_report["users"].shift(1)
)

funnel_conversion_report
\`\`\`

첫 단계는 이전 단계가 없으므로 \`previous_step_users\`가 결측치입니다.

---

### 16.9.2 단계별 전환율

\`\`\`python
funnel_conversion_report["step_conversion_rate"] = np.where(
    funnel_conversion_report["step_order"] == 1,
    100,
    funnel_conversion_report["users"] / funnel_conversion_report["previous_step_users"] * 100
)

funnel_conversion_report["step_conversion_rate"] = (
    funnel_conversion_report["step_conversion_rate"].round(2)
)

funnel_conversion_report
\`\`\`

---

### 16.9.3 단계별 이탈 수와 이탈률

\`\`\`python
funnel_conversion_report["dropoff_users"] = (
    funnel_conversion_report["previous_step_users"] -
    funnel_conversion_report["users"]
)

funnel_conversion_report["dropoff_rate"] = np.where(
    funnel_conversion_report["step_order"] == 1,
    0,
    funnel_conversion_report["dropoff_users"] /
    funnel_conversion_report["previous_step_users"] * 100
)

funnel_conversion_report["dropoff_rate"] = (
    funnel_conversion_report["dropoff_rate"].round(2)
)

funnel_conversion_report
\`\`\`

---

### 16.9.4 저장하기

\`\`\`python
funnel_conversion_report.to_csv(
    OUTPUT_TABLES / "chapter_16_funnel_conversion_report.csv",
    index=False
)
\`\`\`

이탈 리포트만 따로 저장합니다.

\`\`\`python
funnel_dropoff_report = funnel_conversion_report[
    funnel_conversion_report["step_order"] > 1
][[
    "step_order",
    "event_name",
    "step_name",
    "previous_step_users",
    "users",
    "dropoff_users",
    "dropoff_rate"
]].copy()

funnel_dropoff_report.to_csv(
    OUTPUT_TABLES / "chapter_16_funnel_dropoff_report.csv",
    index=False
)

funnel_dropoff_report
\`\`\`

---

### 16.9.5 해석 예시

\`\`\`text
step_conversion_rate는 이전 단계 사용자 중 현재 단계까지 도달한 비율이다.
dropoff_rate는 이전 단계에서 현재 단계로 넘어오지 못한 사용자 비율이다.
dropoff_rate가 가장 높은 단계는 우선 개선 후보가 될 수 있다.
\`\`\`

---
`;export{e as default};