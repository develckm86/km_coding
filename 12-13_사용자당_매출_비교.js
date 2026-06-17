var e=`# 12장. A/B 테스트 분석 실습

## 12.13 사용자당 매출 비교

사용자당 매출은 전체 사용자 기준 매출입니다.

전환하지 않은 사용자는 구매 금액이 0으로 포함됩니다.

---

### 12.13.1 그룹별 사용자당 매출 계산

\`\`\`python
revenue_per_user_comparison = (
    ab_test_clean
    .groupby("experiment_group")
    .agg(
        users=("user_id", "nunique"),
        total_revenue=("purchase_amount", "sum"),
        revenue_per_user=("purchase_amount", "mean"),
        conversion_rate=("converted", "mean")
    )
    .reset_index()
)

revenue_per_user_comparison["conversion_rate_percent"] = (
    revenue_per_user_comparison["conversion_rate"] * 100
).round(2)

revenue_per_user_comparison["revenue_per_user"] = (
    revenue_per_user_comparison["revenue_per_user"].round(2)
)

revenue_per_user_comparison
\`\`\`

저장합니다.

\`\`\`python
revenue_per_user_comparison.to_csv(
    OUTPUT_TABLES / "chapter_12_revenue_per_user_comparison.csv",
    index=False
)
\`\`\`

---

### 12.13.2 사용자당 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    revenue_per_user_comparison["experiment_group"],
    revenue_per_user_comparison["revenue_per_user"]
)

plt.title("그룹별 사용자당 매출")
plt.xlabel("실험 그룹")
plt.ylabel("사용자당 매출")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_12_revenue_per_user_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 12.13.3 해석 예시

\`\`\`text
사용자당 매출은 전환율과 구매 금액을 함께 반영한다.
전환율이 상승했더라도 사용자당 매출이 크게 개선되지 않았다면 실무적 효과가 제한적일 수 있다.
A/B 테스트 의사결정에서는 전환율뿐 아니라 사용자당 매출과 가드레일 지표도 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};