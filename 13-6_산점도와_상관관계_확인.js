var e=`# 13장. 회귀분석 실습

## 13.6 산점도와 상관관계 확인

회귀분석을 하기 전에 변수 간 관계를 시각적으로 확인해야 합니다.

---

### 13.6.1 방문 횟수와 총구매액 산점도

\`\`\`python
plt.figure(figsize=(8, 4))

plt.scatter(
    regression_df["visit_count"],
    regression_df["total_purchase"]
)

plt.title("방문 횟수와 총구매액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("총구매액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_13_scatter_visit_purchase.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 13.6.2 산점도 해석

산점도를 볼 때는 다음을 확인합니다.

\`\`\`text
점들이 오른쪽 위로 올라가는가?
점들이 오른쪽 아래로 내려가는가?
점들이 넓게 흩어져 있는가?
이상하게 멀리 떨어진 점이 있는가?
선형 관계가 있어 보이는가?
\`\`\`

방문 횟수가 많을수록 총구매액이 높아지는 경향이 있다면 오른쪽 위로 올라가는 패턴이 보일 수 있습니다.

---

### 13.6.3 상관관계 계산

\`\`\`python
correlation_columns = [
    "total_purchase",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count"
]

correlation_columns_existing = [
    col for col in correlation_columns
    if col in regression_df.columns
]

correlation_matrix = regression_df[correlation_columns_existing].corr()

correlation_matrix
\`\`\`

---

### 13.6.4 total_purchase와의 상관관계 요약

\`\`\`python
correlation_summary = (
    correlation_matrix["total_purchase"]
    .drop("total_purchase")
    .reset_index()
)

correlation_summary.columns = ["variable", "correlation_with_total_purchase"]

correlation_summary["abs_correlation"] = (
    correlation_summary["correlation_with_total_purchase"].abs()
)

correlation_summary = correlation_summary.sort_values(
    by="abs_correlation",
    ascending=False
).reset_index(drop=True)

correlation_summary
\`\`\`

저장합니다.

\`\`\`python
correlation_summary.to_csv(
    OUTPUT_TABLES / "chapter_13_correlation_summary.csv",
    index=False
)
\`\`\`

---

### 13.6.5 상관관계 해석 예시

\`\`\`text
상관계수는 두 수치형 변수의 선형 관계를 요약한 값이다.
total_purchase와 visit_count의 상관계수가 양수라면 방문 횟수가 많은 고객일수록 총구매액이 높은 경향이 있다는 뜻이다.
다만 상관관계는 인과관계를 의미하지 않는다.
상관계수는 선형 관계만 요약하므로 산점도와 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};