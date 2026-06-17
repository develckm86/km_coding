var e=`# 12장. A/B 테스트 분석 실습

## 12.16 실무 미니 프로젝트: 쿠폰 배너 A/B 테스트 리포트

이번 장에서 배운 내용을 하나의 분석 흐름으로 정리합니다.

---

### 12.16.1 프로젝트 목표

\`\`\`text
쿠폰 배너 노출 실험 데이터를 분석해 실험군이 대조군보다 구매 전환율을 개선했는지 확인한다.
전환율, 구매 금액, 사용자당 매출, 통계적 유의성, 실무적 의미를 함께 검토한다.
\`\`\`

---

### 12.16.2 Step 1. 데이터 정리

\`\`\`python
valid_groups = ["control", "treatment"]

ab_test_clean = ab_test_raw[
    ab_test_raw["experiment_group"].isin(valid_groups)
].copy()

ab_test_clean = ab_test_clean.drop_duplicates(
    subset=["user_id"],
    keep="first",
    ignore_index=True
)

ab_test_clean["converted"] = ab_test_clean["converted"].astype(int)
ab_test_clean["purchase_amount"] = ab_test_clean["purchase_amount"].astype(float)
\`\`\`

---

### 12.16.3 Step 2. 그룹 규모 확인

\`\`\`python
group_summary = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        converted_users=("converted", "sum"),
        total_revenue=("purchase_amount", "sum")
    )
    .reset_index()
)

group_summary["conversion_rate"] = (
    group_summary["converted_users"] / group_summary["users"] * 100
).round(2)
\`\`\`

---

### 12.16.4 Step 3. 전환율 비교

\`\`\`python
control_rate = group_summary.loc[
    group_summary["experiment_group"] == "control",
    "conversion_rate"
].iloc[0]

treatment_rate = group_summary.loc[
    group_summary["experiment_group"] == "treatment",
    "conversion_rate"
].iloc[0]

conversion_rate_diff = treatment_rate - control_rate
relative_lift = conversion_rate_diff / control_rate * 100
\`\`\`

---

### 12.16.5 Step 4. 통계 검정

\`\`\`python
z_stat, p_value = two_proportion_z_test(
    success_a=control_conversions,
    n_a=control_users,
    success_b=treatment_conversions,
    n_b=treatment_users
)
\`\`\`

---

### 12.16.6 Step 5. 구매 금액과 사용자당 매출 확인

\`\`\`python
purchase_amount_comparison = (
    buyers
    .groupby("experiment_group")
    .agg(
        buyers=("user_id", "nunique"),
        avg_purchase_amount=("purchase_amount", "mean"),
        median_purchase_amount=("purchase_amount", "median")
    )
    .reset_index()
)

revenue_per_user_comparison = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        total_revenue=("purchase_amount", "sum"),
        revenue_per_user=("purchase_amount", "mean")
    )
    .reset_index()
)
\`\`\`

---

### 12.16.7 Step 6. 결론 문장 작성

\`\`\`text
실험군의 전환율은 대조군보다 높게 나타났다.
전환율 차이가 통계적으로 유의하다면 쿠폰 배너가 구매 전환율 개선에 긍정적인 영향을 주었을 가능성이 있다.
다만 구매 금액과 사용자당 매출이 악화되지 않았는지 함께 확인해야 한다.
또한 실험군과 대조군의 배정 비율에 문제가 없는지, 중복 사용자가 제거되었는지 확인해야 한다.
최종 적용 여부는 통계적 유의성뿐 아니라 실무적으로 필요한 개선폭과 운영 비용을 함께 고려해 결정해야 한다.
\`\`\`

---
`;export{e as default};