var e=`# 11장. 통계적 비교 실습

## 11.18 실무 미니 프로젝트: VIP와 일반 고객 구매액 비교 리포트

이번 장의 내용을 하나로 묶어 VIP와 일반 고객 비교 리포트를 만듭니다.

---

### 11.18.1 프로젝트 목표

\`\`\`text
고객 Feature Table을 사용해 VIP 고객과 일반 고객의 총구매액 차이를 비교한다.
단순 평균 비교뿐 아니라 표본 수, 중앙값, 분포, 부트스트랩 신뢰구간, t-test 결과를 함께 확인한다.
\`\`\`

---

### 11.18.2 Step 1. 그룹별 표본 수 확인

\`\`\`python
customer_features["customer_grade"].value_counts()
\`\`\`

---

### 11.18.3 Step 2. 요약 통계 계산

\`\`\`python
grade_comparison_summary = make_group_comparison_summary(
    df=customer_features,
    group_col="customer_grade",
    value_col="total_purchase"
)
\`\`\`

---

### 11.18.4 Step 3. 박스플롯 작성

\`\`\`python
grade_values = [
    customer_features.loc[
        customer_features["customer_grade"] == grade,
        "total_purchase"
    ].dropna()
    for grade in customer_features["customer_grade"].dropna().unique()
]

grade_labels = customer_features["customer_grade"].dropna().unique()

plt.figure(figsize=(8, 4))
plt.boxplot(grade_values, labels=grade_labels)
plt.title("고객 등급별 총구매액 분포")
plt.xlabel("고객 등급")
plt.ylabel("총구매액")
plt.tight_layout()
plt.show()
\`\`\`

---

### 11.18.5 Step 4. 부트스트랩 평균 차이

\`\`\`python
vip_purchase = customer_features.loc[
    customer_features["customer_grade"] == "VIP",
    "total_purchase"
].dropna().values

normal_purchase = customer_features.loc[
    customer_features["customer_grade"] != "VIP",
    "total_purchase"
].dropna().values

bootstrap_mean_diff = bootstrap_mean_difference(
    vip_purchase,
    normal_purchase,
    n_bootstrap=1000,
    random_state=42
)
\`\`\`

---

### 11.18.6 Step 5. 신뢰구간 계산

\`\`\`python
ci_lower = bootstrap_mean_diff["mean_difference"].quantile(0.025)
ci_upper = bootstrap_mean_diff["mean_difference"].quantile(0.975)
\`\`\`

---

### 11.18.7 Step 6. t-test

\`\`\`python
ttest_result = stats.ttest_ind(
    vip_purchase,
    normal_purchase,
    equal_var=False
)
\`\`\`

---

### 11.18.8 Step 7. 해석 문장 작성

\`\`\`text
VIP 고객의 평균 총구매액은 일반 고객보다 높게 나타난다.
박스플롯에서도 VIP 고객의 구매액 분포가 일반 고객보다 높은 위치에 있는지 확인할 수 있다.
부트스트랩 평균 차이의 신뢰구간이 0보다 큰 범위에 있다면 평균 차이가 비교적 안정적으로 관찰된다고 볼 수 있다.
Welch t-test의 p-value가 0.05보다 작다면 두 집단 평균 차이가 통계적으로 유의하다고 해석할 수 있다.
다만 고객 등급이 구매액 차이의 원인이라고 단정할 수는 없으며, 고객 등급 부여 기준과 구매 이력의 관계를 함께 고려해야 한다.
\`\`\`

---
`;export{e as default};