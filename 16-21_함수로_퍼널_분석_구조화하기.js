var e=`# 16장. 퍼널 분석 실습

## 16.21 함수로 퍼널 분석 구조화하기

퍼널 분석은 반복적으로 수행될 수 있으므로 함수로 구조화하면 좋습니다.

---

### 16.21.1 전체 퍼널 계산 함수

\`\`\`python
def make_funnel_report(
    event_log: pd.DataFrame,
    funnel_steps: list[str],
    step_name_map: dict[str, str]
) -> pd.DataFrame:
    data = event_log[event_log["event_name"].isin(funnel_steps)].copy()

    step_order_map = {
        step: idx + 1
        for idx, step in enumerate(funnel_steps)
    }

    data["step_order"] = data["event_name"].map(step_order_map)
    data["step_name"] = data["event_name"].map(step_name_map)

    summary = (
        data
        .groupby(["step_order", "event_name", "step_name"])
        .agg(users=("user_id", "nunique"))
        .reset_index()
        .sort_values("step_order")
    )

    first_users = summary["users"].iloc[0]

    summary["overall_conversion_rate"] = (
        summary["users"] / first_users * 100
    ).round(2)

    summary["previous_step_users"] = summary["users"].shift(1)

    summary["step_conversion_rate"] = np.where(
        summary["step_order"] == 1,
        100,
        summary["users"] / summary["previous_step_users"] * 100
    )

    summary["dropoff_users"] = (
        summary["previous_step_users"] - summary["users"]
    )

    summary["dropoff_rate"] = np.where(
        summary["step_order"] == 1,
        0,
        summary["dropoff_users"] / summary["previous_step_users"] * 100
    )

    summary["step_conversion_rate"] = summary["step_conversion_rate"].round(2)
    summary["dropoff_rate"] = summary["dropoff_rate"].round(2)

    return summary
\`\`\`

---

### 16.21.2 함수 사용 예시

\`\`\`python
funnel_report_func = make_funnel_report(
    event_log=event_log_clean,
    funnel_steps=funnel_steps,
    step_name_map=funnel_step_names
)

funnel_report_func
\`\`\`

---

### 16.21.3 함수화의 장점

\`\`\`text
다른 이벤트 로그에도 같은 퍼널 기준을 적용할 수 있다.
월별 퍼널 리포트를 자동화할 수 있다.
세그먼트별 퍼널을 반복 계산하기 쉽다.
분석 기준을 코드로 명확히 남길 수 있다.
\`\`\`

---
`;export{e as default};