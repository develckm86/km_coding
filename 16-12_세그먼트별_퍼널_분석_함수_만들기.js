var e=`# 16장. 퍼널 분석 실습

## 16.12 세그먼트별 퍼널 분석 함수 만들기

신규/기존 고객, 채널, 기기별 퍼널을 반복 계산하기 위해 함수를 만듭니다.

---

### 16.12.1 세그먼트별 퍼널 함수

\`\`\`python
def make_segment_funnel(
    user_flags: pd.DataFrame,
    segment_col: str,
    funnel_steps: list[str],
    step_name_map: dict[str, str]
) -> pd.DataFrame:
    records = []

    for segment_value, group in user_flags.groupby(segment_col):
        first_step_users = group[funnel_steps[0]].sum()

        previous_users = None

        for idx, step in enumerate(funnel_steps, start=1):
            users = group[step].sum()

            if idx == 1:
                step_conversion_rate = 100
                dropoff_users = 0
                dropoff_rate = 0
            else:
                step_conversion_rate = users / previous_users * 100 if previous_users else np.nan
                dropoff_users = previous_users - users if previous_users is not None else np.nan
                dropoff_rate = dropoff_users / previous_users * 100 if previous_users else np.nan

            overall_conversion_rate = (
                users / first_step_users * 100
                if first_step_users else np.nan
            )

            records.append({
                "segment_column": segment_col,
                "segment_value": segment_value,
                "step_order": idx,
                "event_name": step,
                "step_name": step_name_map[step],
                "users": int(users),
                "overall_conversion_rate": round(overall_conversion_rate, 2),
                "step_conversion_rate": round(step_conversion_rate, 2) if pd.notna(step_conversion_rate) else np.nan,
                "dropoff_users": int(dropoff_users) if pd.notna(dropoff_users) else np.nan,
                "dropoff_rate": round(dropoff_rate, 2) if pd.notna(dropoff_rate) else np.nan
            })

            previous_users = users

    return pd.DataFrame(records)
\`\`\`

---
`;export{e as default};