var e=`# 12장. A/B 테스트 분석 실습

## 12.14 구매 금액 차이 부트스트랩

구매자 기준 평균 구매 금액 차이를 부트스트랩으로 확인합니다.

---

### 12.14.1 두 그룹 구매 금액 배열 만들기

\`\`\`python
control_purchase = buyers.loc[
    buyers["experiment_group"] == "control",
    "purchase_amount"
].dropna().values

treatment_purchase = buyers.loc[
    buyers["experiment_group"] == "treatment",
    "purchase_amount"
].dropna().values

len(control_purchase), len(treatment_purchase)
\`\`\`

---

### 12.14.2 부트스트랩 함수 만들기

\`\`\`python
def bootstrap_mean_difference(
    group_a: np.ndarray,
    group_b: np.ndarray,
    n_bootstrap: int = 1000,
    random_state: int = 42
) -> pd.DataFrame:
    rng = np.random.default_rng(random_state)

    mean_diffs = []

    for i in range(n_bootstrap):
        sample_a = rng.choice(group_a, size=len(group_a), replace=True)
        sample_b = rng.choice(group_b, size=len(group_b), replace=True)

        mean_diffs.append(sample_b.mean() - sample_a.mean())

    return pd.DataFrame({
        "bootstrap_iteration": range(1, n_bootstrap + 1),
        "mean_difference_treatment_minus_control": mean_diffs
    })
\`\`\`

여기서는 실험군 평균에서 대조군 평균을 뺍니다.

---

### 12.14.3 부트스트랩 실행

\`\`\`python
purchase_bootstrap_result = bootstrap_mean_difference(
    control_purchase,
    treatment_purchase,
    n_bootstrap=1000,
    random_state=42
)

purchase_bootstrap_result.head()
\`\`\`

---

### 12.14.4 신뢰구간 계산

\`\`\`python
purchase_diff_observed = treatment_purchase.mean() - control_purchase.mean()

purchase_ci_lower = purchase_bootstrap_result[
    "mean_difference_treatment_minus_control"
].quantile(0.025)

purchase_ci_upper = purchase_bootstrap_result[
    "mean_difference_treatment_minus_control"
].quantile(0.975)

purchase_diff_observed, purchase_ci_lower, purchase_ci_upper
\`\`\`

---

### 12.14.5 저장하기

\`\`\`python
purchase_bootstrap_result.to_csv(
    OUTPUT_TABLES / "chapter_12_purchase_bootstrap_result.csv",
    index=False
)
\`\`\`

---

### 12.14.6 부트스트랩 분포 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(
    purchase_bootstrap_result["mean_difference_treatment_minus_control"],
    bins=30
)

plt.axvline(purchase_diff_observed, linestyle="--")

plt.title("구매 금액 평균 차이 부트스트랩 분포")
plt.xlabel("평균 차이: treatment - control")
plt.ylabel("빈도")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_12_bootstrap_purchase_diff.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 12.14.7 해석 예시

\`\`\`text
구매 금액 평균 차이의 부트스트랩 분포는 실험군과 대조군 구매자 평균 금액 차이의 불확실성을 보여준다.
신뢰구간이 0을 포함하면 구매 금액 차이가 명확하다고 보기 어렵다.
구매 금액 분석은 구매자만 대상으로 하므로 전환율 분석과 함께 해석해야 한다.
\`\`\`

---
`;export{e as default};