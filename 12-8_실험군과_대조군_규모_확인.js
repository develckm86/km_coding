var e=`# 12장. A/B 테스트 분석 실습

## 12.8 실험군과 대조군 규모 확인

실험군과 대조군의 사용자 수가 너무 다르면 실험 배정에 문제가 있을 수 있습니다.

---

### 12.8.1 그룹별 사용자 수

\`\`\`python
group_summary = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        exposed_users=("exposed", "sum"),
        converted_users=("converted", "sum"),
        total_revenue=("purchase_amount", "sum")
    )
    .reset_index()
)

group_summary
\`\`\`

---

### 12.8.2 전환율과 사용자당 매출 추가

\`\`\`python
group_summary["conversion_rate"] = (
    group_summary["converted_users"] / group_summary["users"] * 100
).round(2)

group_summary["revenue_per_user"] = (
    group_summary["total_revenue"] / group_summary["users"]
).round(2)

group_summary
\`\`\`

---

### 12.8.3 저장하기

\`\`\`python
group_summary.to_csv(
    OUTPUT_TABLES / "chapter_12_ab_test_group_summary.csv",
    index=False
)
\`\`\`

---

### 12.8.4 해석 예시

\`\`\`text
A/B 테스트 분석에서는 전환율을 계산하기 전에 그룹별 사용자 수를 확인해야 한다.
실험군과 대조군의 사용자 수가 지나치게 다르면 무작위 배정이나 로깅에 문제가 있을 수 있다.
\`\`\`

---
`;export{e as default};