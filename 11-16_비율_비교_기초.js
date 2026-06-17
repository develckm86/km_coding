var e=`# 11장. 통계적 비교 실습

## 11.16 비율 비교 기초

수치형 평균 비교뿐 아니라 비율 비교도 자주 필요합니다.

예를 들어 다음 질문을 생각해봅시다.

\`\`\`text
VIP 고객의 재구매율은 일반 고객보다 높은가?
쿠폰 사용자 중 재구매 고객 비율은 미사용자보다 높은가?
\`\`\`

이번 절에서는 기초적인 비율 비교를 실습합니다.

---

### 11.16.1 고객 등급별 재구매율

\`\`\`python
ratio_comparison_summary = (
    customer_features
    .groupby("customer_grade")
    .agg(
        customer_count=("customer_id", "count"),
        repeat_customer_count=("is_repeat_customer", "sum"),
        repeat_customer_rate=("is_repeat_customer", "mean")
    )
    .reset_index()
)

ratio_comparison_summary["repeat_customer_rate_percent"] = (
    ratio_comparison_summary["repeat_customer_rate"] * 100
).round(1)

ratio_comparison_summary
\`\`\`

---

### 11.16.2 쿠폰 사용 여부별 재구매율

\`\`\`python
coupon_repeat_summary = (
    customer_features
    .groupby("is_coupon_user")
    .agg(
        customer_count=("customer_id", "count"),
        repeat_customer_count=("is_repeat_customer", "sum"),
        repeat_customer_rate=("is_repeat_customer", "mean")
    )
    .reset_index()
)

coupon_repeat_summary["repeat_customer_rate_percent"] = (
    coupon_repeat_summary["repeat_customer_rate"] * 100
).round(1)

coupon_repeat_summary
\`\`\`

---

### 11.16.3 비율 비교 결과 합치기

\`\`\`python
ratio_comparison_summary["comparison_type"] = "customer_grade"
coupon_repeat_summary["comparison_type"] = "is_coupon_user"

ratio_comparison_summary = ratio_comparison_summary.rename(
    columns={"customer_grade": "group_value"}
)

coupon_repeat_summary = coupon_repeat_summary.rename(
    columns={"is_coupon_user": "group_value"}
)

ratio_comparison_result = pd.concat([
    ratio_comparison_summary[[
        "comparison_type",
        "group_value",
        "customer_count",
        "repeat_customer_count",
        "repeat_customer_rate_percent"
    ]],
    coupon_repeat_summary[[
        "comparison_type",
        "group_value",
        "customer_count",
        "repeat_customer_count",
        "repeat_customer_rate_percent"
    ]]
], ignore_index=True)

ratio_comparison_result
\`\`\`

저장합니다.

\`\`\`python
ratio_comparison_result.to_csv(
    OUTPUT_TABLES / "chapter_11_ratio_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 11.16.4 비율 비교 해석 예시

\`\`\`text
고객 등급별 재구매율을 비교하면 VIP 고객과 일반 고객의 반복 구매 성향 차이를 확인할 수 있다.
다만 표본 수가 적으면 비율 차이가 크게 흔들릴 수 있으므로 고객 수를 함께 확인해야 한다.
쿠폰 사용자와 미사용자의 재구매율 차이는 쿠폰 사용과 재구매의 관계를 보여줄 수 있지만, 쿠폰의 인과 효과를 의미하지는 않는다.
\`\`\`

---
`;export{e as default};