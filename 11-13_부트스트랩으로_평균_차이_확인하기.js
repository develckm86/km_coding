var e=`# 11장. 통계적 비교 실습

## 11.13 부트스트랩으로 평균 차이 확인하기

이제 VIP 고객과 일반 고객의 총구매액 차이를 부트스트랩으로 확인해보겠습니다.

---

### 11.13.1 비교할 두 집단 만들기

\`\`\`python
vip_purchase = customer_features.loc[
    customer_features["customer_grade"] == "VIP",
    "total_purchase"
].dropna().values

normal_purchase = customer_features.loc[
    customer_features["customer_grade"] != "VIP",
    "total_purchase"
].dropna().values

len(vip_purchase), len(normal_purchase)
\`\`\`

---

### 11.13.2 실제 평균 차이 계산

\`\`\`python
observed_mean_diff = vip_purchase.mean() - normal_purchase.mean()

observed_mean_diff
\`\`\`

여기서는 VIP 평균에서 일반 고객 평균을 뺍니다.

양수이면 VIP 고객 평균 구매액이 더 높다는 뜻입니다.

---

### 11.13.3 부트스트랩 함수 만들기

\`\`\`python
def bootstrap_mean_difference(
    group_a: np.ndarray,
    group_b: np.ndarray,
    n_bootstrap: int = 1000,
    random_state: int = 42
) -> pd.DataFrame:
    rng = np.random.default_rng(random_state)

    bootstrap_diffs = []

    for i in range(n_bootstrap):
        sample_a = rng.choice(group_a, size=len(group_a), replace=True)
        sample_b = rng.choice(group_b, size=len(group_b), replace=True)

        mean_diff = sample_a.mean() - sample_b.mean()

        bootstrap_diffs.append(mean_diff)

    return pd.DataFrame({
        "bootstrap_iteration": range(1, n_bootstrap + 1),
        "mean_difference": bootstrap_diffs
    })
\`\`\`

---

### 11.13.4 부트스트랩 실행

\`\`\`python
bootstrap_mean_diff = bootstrap_mean_difference(
    vip_purchase,
    normal_purchase,
    n_bootstrap=1000,
    random_state=42
)

bootstrap_mean_diff.head()
\`\`\`

---

### 11.13.5 저장하기

\`\`\`python
bootstrap_mean_diff.to_csv(
    OUTPUT_TABLES / "chapter_11_bootstrap_mean_diff.csv",
    index=False
)
\`\`\`

---

### 11.13.6 부트스트랩 분포 시각화

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(bootstrap_mean_diff["mean_difference"], bins=30)

plt.axvline(observed_mean_diff, linestyle="--")

plt.title("VIP와 일반 고객 평균 구매액 차이 부트스트랩 분포")
plt.xlabel("평균 차이")
plt.ylabel("빈도")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_11_bootstrap_distribution.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 11.13.7 해석 예시

\`\`\`text
부트스트랩 분포는 평균 차이가 표본 재추출에 따라 어느 정도 흔들릴 수 있는지 보여준다.
분포가 대부분 0보다 큰 영역에 있다면 VIP 고객의 평균 구매액이 일반 고객보다 높다는 결과가 비교적 안정적일 수 있다.
다만 부트스트랩은 현재 데이터의 표본 구조에 기반하므로, 원본 데이터가 편향되어 있다면 결과도 영향을 받는다.
\`\`\`

---
`;export{e as default};