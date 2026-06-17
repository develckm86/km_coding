var e=`# 16장. 퍼널 분석 실습

## 16.24 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 16.24.1 단계별 사용자 수

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

first_step_users = funnel_step_summary.loc[
    funnel_step_summary["step_order"] == 1,
    "users"
].iloc[0]

funnel_step_summary["overall_conversion_rate"] = (
    funnel_step_summary["users"] / first_step_users * 100
).round(2)
\`\`\`

---

### 16.24.2 전환율과 이탈률

\`\`\`python
funnel_conversion_report = funnel_step_summary.copy()

funnel_conversion_report["previous_step_users"] = (
    funnel_conversion_report["users"].shift(1)
)

funnel_conversion_report["step_conversion_rate"] = np.where(
    funnel_conversion_report["step_order"] == 1,
    100,
    funnel_conversion_report["users"] /
    funnel_conversion_report["previous_step_users"] * 100
)

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
\`\`\`

---

### 16.24.3 사용자별 단계 도달 여부

\`\`\`python
user_funnel_flags = (
    event_log_clean
    .assign(reached=1)
    .pivot_table(
        index="user_id",
        columns="event_name",
        values="reached",
        aggfunc="max",
        fill_value=0
    )
    .reset_index()
)
\`\`\`

---

### 16.24.4 세그먼트별 퍼널

\`\`\`python
segment_funnel_by_channel = make_segment_funnel(
    user_flags=user_funnel_flags,
    segment_col="channel",
    funnel_steps=funnel_steps,
    step_name_map=funnel_step_names
)
\`\`\`

---

### 16.24.5 전환까지 걸린 시간

\`\`\`python
first_visit = (
    event_log_clean[event_log_clean["event_name"] == "visit"]
    .groupby("user_id")
    .agg(first_visit_time=("event_time", "min"))
    .reset_index()
)

first_purchase = (
    event_log_clean[event_log_clean["event_name"] == "purchase"]
    .groupby("user_id")
    .agg(first_purchase_time=("event_time", "min"))
    .reset_index()
)

time_to_conversion = first_visit.merge(
    first_purchase,
    on="user_id",
    how="inner"
)

time_to_conversion["minutes_to_purchase"] = (
    time_to_conversion["first_purchase_time"] -
    time_to_conversion["first_visit_time"]
).dt.total_seconds() / 60
\`\`\`

---
`;export{e as default};