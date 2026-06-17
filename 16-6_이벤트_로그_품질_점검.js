var e=`# 16장. 퍼널 분석 실습

## 16.6 이벤트 로그 품질 점검

퍼널 분석 전에 이벤트 로그의 품질을 점검합니다.

---

### 16.6.1 데이터 구조 확인

\`\`\`python
event_log_raw.shape
\`\`\`

\`\`\`python
event_log_raw.info()
\`\`\`

\`\`\`python
event_log_raw.head()
\`\`\`

---

### 16.6.2 이벤트명 분포 확인

\`\`\`python
event_log_raw["event_name"].value_counts(dropna=False)
\`\`\`

정의한 퍼널 단계에 없는 이벤트가 있는지 확인합니다.

\`\`\`python
invalid_events = event_log_raw[
    ~event_log_raw["event_name"].isin(funnel_steps)
]

invalid_events
\`\`\`

---

### 16.6.3 결측치 확인

\`\`\`python
event_log_raw.isna().sum()
\`\`\`

---

### 16.6.4 중복 이벤트 확인

완전히 같은 행이 중복되어 있는지 확인합니다.

\`\`\`python
event_log_raw.duplicated().sum()
\`\`\`

중복 행을 확인합니다.

\`\`\`python
event_log_raw[event_log_raw.duplicated(keep=False)].sort_values(
    ["user_id", "event_time", "event_name"]
)
\`\`\`

---

### 16.6.5 이벤트 시간 변환

\`\`\`python
event_log_raw["event_time"] = pd.to_datetime(
    event_log_raw["event_time"],
    errors="coerce"
)
\`\`\`

날짜 변환 실패 행을 확인합니다.

\`\`\`python
event_log_raw[event_log_raw["event_time"].isna()]
\`\`\`

---

### 16.6.6 품질 점검표 만들기

\`\`\`python
event_log_quality_check = pd.DataFrame([
    {
        "check_name": "전체 행 수",
        "check_result": len(event_log_raw),
        "expected": "기록용",
        "status": "INFO"
    },
    {
        "check_name": "event_time 결측",
        "check_result": int(event_log_raw["event_time"].isna().sum()),
        "expected": 0,
        "status": "PASS" if event_log_raw["event_time"].isna().sum() == 0 else "FAIL"
    },
    {
        "check_name": "user_id 결측",
        "check_result": int(event_log_raw["user_id"].isna().sum()),
        "expected": 0,
        "status": "PASS" if event_log_raw["user_id"].isna().sum() == 0 else "FAIL"
    },
    {
        "check_name": "정의되지 않은 event_name",
        "check_result": int(len(invalid_events)),
        "expected": 0,
        "status": "PASS" if len(invalid_events) == 0 else "WARN"
    },
    {
        "check_name": "완전 중복 행",
        "check_result": int(event_log_raw.duplicated().sum()),
        "expected": 0,
        "status": "PASS" if event_log_raw.duplicated().sum() == 0 else "WARN"
    }
])

event_log_quality_check
\`\`\`

저장합니다.

\`\`\`python
event_log_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_16_event_log_quality_check.csv",
    index=False
)
\`\`\`

---
`;export{e as default};