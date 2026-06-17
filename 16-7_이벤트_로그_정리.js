var e=`# 16장. 퍼널 분석 실습

## 16.7 이벤트 로그 정리

품질 점검 후 분석에 사용할 수 있도록 이벤트 로그를 정리합니다.

---

### 16.7.1 유효 이벤트만 남기기

\`\`\`python
event_log_clean = event_log_raw[
    event_log_raw["event_name"].isin(funnel_steps)
].copy()
\`\`\`

---

### 16.7.2 완전 중복 제거

\`\`\`python
event_log_clean = event_log_clean.drop_duplicates().reset_index(drop=True)
\`\`\`

---

### 16.7.3 정렬

\`\`\`python
event_log_clean = event_log_clean.sort_values(
    ["user_id", "event_time", "event_name"]
).reset_index(drop=True)

event_log_clean.head()
\`\`\`

---

### 16.7.4 단계 번호 추가

\`\`\`python
step_order_map = {
    step: idx + 1
    for idx, step in enumerate(funnel_steps)
}

event_log_clean["step_order"] = event_log_clean["event_name"].map(step_order_map)
event_log_clean["step_name"] = event_log_clean["event_name"].map(funnel_step_names)

event_log_clean.head()
\`\`\`

---

### 16.7.5 저장하기

\`\`\`python
event_log_clean.to_csv(
    DATA_PROCESSED / "chapter_16_event_log_clean.csv",
    index=False
)
\`\`\`

---
`;export{e as default};