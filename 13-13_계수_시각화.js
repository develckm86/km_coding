var e=`# 13장. 회귀분석 실습

## 13.13 계수 시각화

회귀 계수를 그래프로 표현하면 어떤 변수가 양의 관계 또는 음의 관계를 가지는지 보기 쉽습니다.

---

### 13.13.1 절편 제외 계수 선택

\`\`\`python
coef_plot_df = categorical_regression_result[
    categorical_regression_result["term"] != "Intercept"
].copy()

coef_plot_df = coef_plot_df.sort_values(
    "coefficient",
    ascending=True
)

coef_plot_df
\`\`\`

---

### 13.13.2 계수 막대 그래프

\`\`\`python
plt.figure(figsize=(8, 5))

plt.barh(
    coef_plot_df["term"],
    coef_plot_df["coefficient"]
)

plt.axvline(0)

plt.title("회귀 계수")
plt.xlabel("계수")
plt.ylabel("변수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_13_coefficient_bar.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 13.13.3 해석 예시

\`\`\`text
계수 그래프는 각 변수가 결과 변수와 양의 관계인지 음의 관계인지 보여준다.
계수가 양수이면 해당 변수가 증가하거나 해당 범주에 속할 때 총구매액이 높게 나타나는 경향이 있다.
계수가 음수이면 총구매액이 낮게 나타나는 경향이 있다.
다만 범주형 변수의 계수는 기준 범주와 비교한 결과임을 주의해야 한다.
\`\`\`

---
`;export{e as default};