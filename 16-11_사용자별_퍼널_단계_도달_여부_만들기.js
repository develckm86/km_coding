var e=`# 16장. 퍼널 분석 실습

## 16.11 사용자별 퍼널 단계 도달 여부 만들기

세그먼트별 퍼널을 분석하려면 사용자별로 각 단계에 도달했는지 표시한 테이블이 필요합니다.

---

### 16.11.1 사용자별 단계 도달 여부 피벗

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

user_funnel_flags.head()
\`\`\`

---

### 16.11.2 없는 단계 컬럼 보완

데이터에 특정 단계가 전혀 없으면 컬럼이 없을 수 있습니다.  
필요한 단계 컬럼을 모두 보완합니다.

\`\`\`python
for step in funnel_steps:
    if step not in user_funnel_flags.columns:
        user_funnel_flags[step] = 0
\`\`\`

---

### 16.11.3 사용자 속성 붙이기

사용자별 채널, 기기, 고객 유형을 붙입니다.

\`\`\`python
user_attributes = (
    event_log_clean
    .sort_values("event_time")
    .groupby("user_id")
    .agg(
        channel=("channel", "first"),
        device=("device", "first"),
        customer_type=("customer_type", "first"),
        first_event_time=("event_time", "min")
    )
    .reset_index()
)

user_funnel_flags = user_funnel_flags.merge(
    user_attributes,
    on="user_id",
    how="left",
    validate="one_to_one"
)

user_funnel_flags.head()
\`\`\`

---

### 16.11.4 단계 도달 여부 컬럼 순서 정리

\`\`\`python
user_funnel_flags = user_funnel_flags[
    ["user_id", "channel", "device", "customer_type", "first_event_time"] + funnel_steps
]

user_funnel_flags.head()
\`\`\`

저장합니다.

\`\`\`python
user_funnel_flags.to_csv(
    DATA_PROCESSED / "chapter_16_user_funnel_flags.csv",
    index=False
)
\`\`\`

---
`;export{e as default};