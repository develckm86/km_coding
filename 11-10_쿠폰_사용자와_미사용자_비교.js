var e=`# 11장. 통계적 비교 실습

## 11.10 쿠폰 사용자와 미사용자 비교

이번에는 쿠폰 사용 여부에 따라 고객의 총구매액이 다른지 비교합니다.

---

### 11.10.1 쿠폰 사용 여부별 요약 통계

\`\`\`python
coupon_user_comparison_summary = make_group_comparison_summary(
    df=customer_features,
    group_col="is_coupon_user",
    value_col="total_purchase"
)

coupon_user_comparison_summary
\`\`\`

저장합니다.

\`\`\`python
coupon_user_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_coupon_user_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 11.10.2 박스플롯

\`\`\`python
coupon_values = [
    customer_features.loc[
        customer_features["is_coupon_user"] == value,
        "total_purchase"
    ].dropna()
    for value in [False, True]
]

coupon_labels = ["쿠폰 미사용", "쿠폰 사용"]

plt.figure(figsize=(8, 4))

plt.boxplot(coupon_values, labels=coupon_labels)

plt.title("쿠폰 사용 여부별 총구매액 분포")
plt.xlabel("쿠폰 사용 여부")
plt.ylabel("총구매액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_11_coupon_user_boxplot.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 11.10.3 해석 예시

\`\`\`text
쿠폰 사용 고객과 미사용 고객의 총구매액 차이를 비교할 수 있다.
다만 쿠폰 사용 고객의 구매액이 높다고 해서 쿠폰이 구매액을 증가시켰다고 단정할 수는 없다.
쿠폰 사용 여부는 고객의 구매 성향과도 관련이 있을 수 있으므로 인과 효과 분석은 A/B 테스트가 필요하다.
\`\`\`

---
`;export{e as default};