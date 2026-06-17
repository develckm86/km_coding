var e=`# 11장. 통계적 비교 실습

## 11.12 주 구매 카테고리별 고객 구매액 비교

이번에는 고객의 주 구매 카테고리에 따라 총구매액이 다른지 확인합니다.

---

### 11.12.1 주 구매 카테고리별 요약 통계

\`\`\`python
main_category_comparison_summary = make_group_comparison_summary(
    df=customer_features,
    group_col="main_category",
    value_col="total_purchase"
)

main_category_comparison_summary
\`\`\`

저장합니다.

\`\`\`python
main_category_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_main_category_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 11.12.2 평균 막대 그래프

\`\`\`python
main_category_mean = (
    main_category_comparison_summary
    .sort_values("mean_value", ascending=False)
)

plt.figure(figsize=(8, 4))

plt.bar(
    main_category_mean["main_category"],
    main_category_mean["mean_value"]
)

plt.title("주 구매 카테고리별 평균 총구매액")
plt.xlabel("주 구매 카테고리")
plt.ylabel("평균 총구매액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_11_group_mean_bar.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 11.12.3 해석 예시

\`\`\`text
주 구매 카테고리별 평균 총구매액을 보면 어떤 카테고리를 중심으로 구매하는 고객이 높은 구매액을 보이는지 확인할 수 있다.
전자기기를 주로 구매하는 고객의 평균 구매액이 높다면 고가 상품 구매 특성이 영향을 주었을 가능성이 있다.
다만 카테고리별 고객 수가 적으면 평균 비교가 불안정할 수 있다.
\`\`\`

---
`;export{e as default};