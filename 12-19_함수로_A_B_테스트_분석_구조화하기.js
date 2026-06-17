var e=`# 12장. A/B 테스트 분석 실습

## 12.19 함수로 A/B 테스트 분석 구조화하기

반복되는 실험 분석을 함수로 만들 수 있습니다.

---

### 12.19.1 전환율 요약 함수

\`\`\`python
def make_conversion_summary(df: pd.DataFrame) -> pd.DataFrame:
    summary = (
        df
        .groupby("experiment_group")
        .agg(
            users=("user_id", "nunique"),
            conversions=("converted", "sum"),
            total_revenue=("purchase_amount", "sum")
        )
        .reset_index()
    )

    summary["conversion_rate"] = (
        summary["conversions"] / summary["users"] * 100
    ).round(2)

    summary["revenue_per_user"] = (
        summary["total_revenue"] / summary["users"]
    ).round(2)

    return summary
\`\`\`

---

### 12.19.2 전환율 검정 함수

\`\`\`python
def make_conversion_test_result(summary: pd.DataFrame) -> pd.DataFrame:
    control = summary[summary["experiment_group"] == "control"].iloc[0]
    treatment = summary[summary["experiment_group"] == "treatment"].iloc[0]

    z_stat, p_value = two_proportion_z_test(
        success_a=control["conversions"],
        n_a=control["users"],
        success_b=treatment["conversions"],
        n_b=treatment["users"]
    )

    p_control = control["conversions"] / control["users"]
    p_treatment = treatment["conversions"] / treatment["users"]

    diff = p_treatment - p_control

    return pd.DataFrame([{
        "control_conversion_rate": round(p_control * 100, 2),
        "treatment_conversion_rate": round(p_treatment * 100, 2),
        "diff_percentage_point": round(diff * 100, 2),
        "relative_lift_percent": round(diff / p_control * 100, 2),
        "z_statistic": round(z_stat, 4),
        "p_value": round(p_value, 4),
        "is_statistically_significant": bool(p_value < 0.05)
    }])
\`\`\`

---

### 12.19.3 함수 사용 예시

\`\`\`python
conversion_summary_func = make_conversion_summary(ab_test_clean)
conversion_test_func = make_conversion_test_result(conversion_summary_func)

conversion_summary_func
conversion_test_func
\`\`\`

---

### 12.19.4 함수화의 장점

\`\`\`text
다른 실험 데이터에도 같은 분석 로직을 적용할 수 있다.
분석 기준이 일관된다.
자동 리포트 생성에 활용할 수 있다.
실험 결과표 형식을 표준화할 수 있다.
\`\`\`

---
`;export{e as default};