var e=`# 12장. A/B 테스트 분석 실습

## 12.15 실험 결과 의사결정 요약

A/B 테스트 결과는 단순히 p-value만 보고 결정하지 않습니다.

다음 요소를 함께 고려합니다.

\`\`\`text
전환율 차이
상대 개선율
통계적 유의성
구매 금액 변화
사용자당 매출 변화
가드레일 지표
실험 품질
실무적 의미
\`\`\`

---

### 12.15.1 의사결정 기준 예시

이번 실습에서는 다음 기준을 사용합니다.

\`\`\`text
1. Sample Ratio Mismatch가 없어야 한다.
2. 전환율 차이가 양수여야 한다.
3. 전환율 차이가 통계적으로 유의해야 한다.
4. 사용자당 매출이 악화되지 않아야 한다.
5. 구매 금액이 크게 하락하지 않아야 한다.
\`\`\`

실무에서는 사전에 더 명확한 기준을 정해야 합니다.

---

### 12.15.2 사용자당 매출 변화 계산

\`\`\`python
control_rpu = revenue_per_user_comparison.loc[
    revenue_per_user_comparison["experiment_group"] == "control",
    "revenue_per_user"
].iloc[0]

treatment_rpu = revenue_per_user_comparison.loc[
    revenue_per_user_comparison["experiment_group"] == "treatment",
    "revenue_per_user"
].iloc[0]

rpu_diff = treatment_rpu - control_rpu

rpu_lift_percent = (rpu_diff / control_rpu * 100) if control_rpu != 0 else np.nan

rpu_diff, rpu_lift_percent
\`\`\`

---

### 12.15.3 결정 요약표 만들기

\`\`\`python
sample_ratio_mismatch = bool(sample_ratio_p_value < 0.05)
conversion_significant = bool(p_value < 0.05)
conversion_positive = bool(diff > 0)
rpu_not_worse = bool(rpu_diff >= 0)

if (not sample_ratio_mismatch) and conversion_significant and conversion_positive and rpu_not_worse:
    decision = "실험군 적용 검토"
else:
    decision = "추가 검토 필요"

ab_test_decision_summary = pd.DataFrame([
    {
        "decision_item": "Sample Ratio Mismatch 여부",
        "result": sample_ratio_mismatch,
        "interpretation": "False이면 그룹 배정 비율에 큰 이상이 없다고 볼 수 있음"
    },
    {
        "decision_item": "전환율 차이 양수 여부",
        "result": conversion_positive,
        "interpretation": "True이면 실험군 전환율이 대조군보다 높음"
    },
    {
        "decision_item": "전환율 차이 통계적 유의성",
        "result": conversion_significant,
        "interpretation": "True이면 p-value < 0.05"
    },
    {
        "decision_item": "사용자당 매출 악화 없음",
        "result": rpu_not_worse,
        "interpretation": "True이면 실험군 사용자당 매출이 대조군보다 낮지 않음"
    },
    {
        "decision_item": "최종 판단",
        "result": decision,
        "interpretation": "사전 정의된 기준에 따른 요약 판단"
    }
])

ab_test_decision_summary
\`\`\`

저장합니다.

\`\`\`python
ab_test_decision_summary.to_csv(
    OUTPUT_TABLES / "chapter_12_ab_test_decision_summary.csv",
    index=False
)
\`\`\`

---

### 12.15.4 해석 예시

\`\`\`text
실험군의 전환율이 높고 통계적으로 유의하더라도 사용자당 매출이 하락한다면 바로 적용하기 어렵다.
반대로 전환율 차이가 통계적으로 유의하지 않더라도 실무적으로 충분히 의미 있는 개선 가능성이 있다면 실험 기간을 늘리거나 추가 실험을 검토할 수 있다.
A/B 테스트 의사결정은 통계 결과와 비즈니스 기준을 함께 고려해야 한다.
\`\`\`

---
`;export{e as default};