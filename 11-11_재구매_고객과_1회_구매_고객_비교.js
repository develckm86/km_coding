var e=`# 11장. 통계적 비교 실습

## 11.11 재구매 고객과 1회 구매 고객 비교

이번에는 재구매 고객과 1회 구매 고객의 평균 주문 금액을 비교합니다.

---

### 11.11.1 재구매 여부별 평균 주문 금액 요약

\`\`\`python
repeat_customer_comparison_summary = make_group_comparison_summary(
    df=customer_features,
    group_col="is_repeat_customer",
    value_col="avg_order_amount"
)

repeat_customer_comparison_summary
\`\`\`

저장합니다.

\`\`\`python
repeat_customer_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_repeat_customer_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 11.11.2 박스플롯

\`\`\`python
repeat_values = [
    customer_features.loc[
        customer_features["is_repeat_customer"] == value,
        "avg_order_amount"
    ].dropna()
    for value in [False, True]
]

repeat_labels = ["1회 구매 고객", "재구매 고객"]

plt.figure(figsize=(8, 4))

plt.boxplot(repeat_values, labels=repeat_labels)

plt.title("재구매 여부별 평균 주문 금액 분포")
plt.xlabel("재구매 여부")
plt.ylabel("평균 주문 금액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_11_repeat_customer_boxplot.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 11.11.3 해석 예시

\`\`\`text
재구매 고객과 1회 구매 고객의 평균 주문 금액을 비교하면 반복 구매 고객의 객단가 특성을 파악할 수 있다.
재구매 고객의 평균 주문 금액이 높다면 충성 고객의 구매 규모가 더 크다는 원인 후보를 생각할 수 있다.
다만 재구매 여부는 분석 기간에 영향을 받으므로 기간이 짧으면 해석에 주의해야 한다.
\`\`\`

---
`;export{e as default};