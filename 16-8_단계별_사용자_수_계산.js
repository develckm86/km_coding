var e=`# 16장. 퍼널 분석 실습

## 16.8 단계별 사용자 수 계산

이제 퍼널 단계별 고유 사용자 수를 계산합니다.

---

### 16.8.1 단계별 사용자 수

\`\`\`python
funnel_step_summary = (
    event_log_clean
    .groupby(["step_order", "event_name", "step_name"])
    .agg(
        users=("user_id", "nunique"),
        events=("event_name", "count")
    )
    .reset_index()
    .sort_values("step_order")
)

funnel_step_summary
\`\`\`

---

### 16.8.2 단계별 사용자 비율

첫 단계 방문자 수를 기준으로 전체 전환율을 계산합니다.

\`\`\`python
first_step_users = funnel_step_summary.loc[
    funnel_step_summary["step_order"] == 1,
    "users"
].iloc[0]

funnel_step_summary["overall_conversion_rate"] = (
    funnel_step_summary["users"] / first_step_users * 100
).round(2)

funnel_step_summary
\`\`\`

---

### 16.8.3 저장하기

\`\`\`python
funnel_step_summary.to_csv(
    OUTPUT_TABLES / "chapter_16_funnel_step_summary.csv",
    index=False
)
\`\`\`

---

### 16.8.4 해석 예시

\`\`\`text
단계별 사용자 수는 각 퍼널 단계에 도달한 고유 사용자 수를 보여준다.
overall_conversion_rate는 첫 단계 방문자 중 각 단계까지 도달한 비율이다.
마지막 단계의 overall_conversion_rate는 전체 구매 전환율로 해석할 수 있다.
\`\`\`

---
`;export{e as default};