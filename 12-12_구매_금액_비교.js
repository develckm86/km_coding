var e=`# 12장. A/B 테스트 분석 실습

## 12.12 구매 금액 비교

전환율만 높아도 구매 금액이 낮아지면 전체 매출에는 도움이 되지 않을 수 있습니다.

이번에는 구매 금액을 비교합니다.

---

### 12.12.1 구매자만 대상으로 평균 구매 금액 비교

\`\`\`python
buyers = ab_test_clean[ab_test_clean["converted"] == 1].copy()

purchase_amount_comparison = (
    buyers
    .groupby("experiment_group")
    .agg(
        buyers=("user_id", "nunique"),
        total_purchase_amount=("purchase_amount", "sum"),
        avg_purchase_amount=("purchase_amount", "mean"),
        median_purchase_amount=("purchase_amount", "median"),
        std_purchase_amount=("purchase_amount", "std")
    )
    .reset_index()
)

purchase_amount_comparison["avg_purchase_amount"] = (
    purchase_amount_comparison["avg_purchase_amount"].round(0)
)

purchase_amount_comparison["median_purchase_amount"] = (
    purchase_amount_comparison["median_purchase_amount"].round(0)
)

purchase_amount_comparison["std_purchase_amount"] = (
    purchase_amount_comparison["std_purchase_amount"].round(0)
)

purchase_amount_comparison
\`\`\`

저장합니다.

\`\`\`python
purchase_amount_comparison.to_csv(
    OUTPUT_TABLES / "chapter_12_purchase_amount_comparison.csv",
    index=False
)
\`\`\`

---

### 12.12.2 구매 금액 박스플롯

\`\`\`python
purchase_values = [
    buyers.loc[
        buyers["experiment_group"] == group,
        "purchase_amount"
    ].dropna()
    for group in ["control", "treatment"]
]

plt.figure(figsize=(8, 4))

plt.boxplot(purchase_values, labels=["control", "treatment"])

plt.title("구매자 기준 구매 금액 분포")
plt.xlabel("실험 그룹")
plt.ylabel("구매 금액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_12_purchase_amount_boxplot.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 12.12.3 해석 예시

\`\`\`text
구매자 기준 평균 구매 금액은 전환한 사용자들의 객단가를 보여준다.
실험군의 전환율이 높더라도 평균 구매 금액이 낮다면 매출 효과는 제한적일 수 있다.
구매 금액은 이상값에 영향을 받을 수 있으므로 평균과 중앙값을 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};