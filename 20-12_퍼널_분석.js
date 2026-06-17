var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.12 퍼널 분석

16장에서 배운 방식으로 이벤트 로그를 분석합니다.

---

### 20.12.1 이벤트 로그 정리

\`\`\`python
events_clean = events_raw.copy()

events_clean["event_time"] = pd.to_datetime(events_clean["event_time"], errors="coerce")

valid_events = ["visit", "product_view", "add_to_cart", "checkout_start", "purchase"]

events_clean = events_clean[
    events_clean["event_name"].isin(valid_events)
].dropna(subset=["customer_id", "event_time"])

events_clean = events_clean.drop_duplicates()

events_clean.head()
\`\`\`

---

### 20.12.2 사용자별 퍼널 단계 도달 여부

\`\`\`python
funnel_flags = (
    events_clean
    .assign(reached=1)
    .pivot_table(
        index="customer_id",
        columns="event_name",
        values="reached",
        aggfunc="max",
        fill_value=0
    )
    .reset_index()
)

for step in valid_events:
    if step not in funnel_flags.columns:
        funnel_flags[step] = 0

funnel_flags.head()
\`\`\`

저장합니다.

\`\`\`python
funnel_flags.to_csv(
    DATA_PROCESSED / "final_project_funnel_flags.csv",
    index=False
)
\`\`\`

---

### 20.12.3 단계별 사용자 수와 전환율

\`\`\`python
funnel_step_names = {
    "visit": "방문",
    "product_view": "상품 조회",
    "add_to_cart": "장바구니",
    "checkout_start": "결제 시작",
    "purchase": "구매 완료"
}

funnel_records = []

first_step_users = funnel_flags["visit"].sum()
previous_users = None

for idx, step in enumerate(valid_events, start=1):
    users = int(funnel_flags[step].sum())

    if idx == 1:
        step_conversion_rate = 100
        dropoff_users = 0
        dropoff_rate = 0
    else:
        step_conversion_rate = users / previous_users * 100 if previous_users else np.nan
        dropoff_users = previous_users - users
        dropoff_rate = dropoff_users / previous_users * 100 if previous_users else np.nan

    overall_conversion_rate = users / first_step_users * 100 if first_step_users else np.nan

    funnel_records.append({
        "step_order": idx,
        "event_name": step,
        "step_name": funnel_step_names[step],
        "users": users,
        "overall_conversion_rate": round(overall_conversion_rate, 2),
        "step_conversion_rate": round(step_conversion_rate, 2),
        "dropoff_users": int(dropoff_users),
        "dropoff_rate": round(dropoff_rate, 2)
    })

    previous_users = users

funnel_report = pd.DataFrame(funnel_records)

funnel_report
\`\`\`

저장합니다.

\`\`\`python
funnel_report.to_csv(
    OUTPUT_TABLES / "final_project_funnel_report.csv",
    index=False
)
\`\`\`

---
`;export{e as default};