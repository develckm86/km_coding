var e=`# 13장. 회귀분석 실습

## 13.7 단순 선형회귀 실습

첫 번째 회귀분석은 단순 선형회귀입니다.

분석 질문:

\`\`\`text
방문 횟수가 많을수록 총구매액이 높은가?
\`\`\`

결과 변수:

\`\`\`text
total_purchase
\`\`\`

설명 변수:

\`\`\`text
visit_count
\`\`\`

---

### 13.7.1 statsmodels formula 방식

\`statsmodels\`에서는 formula 방식으로 회귀식을 작성할 수 있습니다.

\`\`\`python
simple_model = smf.ols(
    formula="total_purchase ~ visit_count",
    data=regression_df
).fit()

print(simple_model.summary())
\`\`\`

회귀식은 다음 뜻입니다.

\`\`\`text
total_purchase를 visit_count로 설명한다.
\`\`\`

---

### 13.7.2 단순 회귀 결과표 만들기

\`\`\`python
simple_regression_result = pd.DataFrame({
    "term": simple_model.params.index,
    "coefficient": simple_model.params.values,
    "std_error": simple_model.bse.values,
    "t_value": simple_model.tvalues.values,
    "p_value": simple_model.pvalues.values
})

simple_regression_result["coefficient"] = simple_regression_result["coefficient"].round(2)
simple_regression_result["std_error"] = simple_regression_result["std_error"].round(2)
simple_regression_result["t_value"] = simple_regression_result["t_value"].round(3)
simple_regression_result["p_value"] = simple_regression_result["p_value"].round(4)

simple_regression_result
\`\`\`

저장합니다.

\`\`\`python
simple_regression_result.to_csv(
    OUTPUT_TABLES / "chapter_13_simple_regression_result.csv",
    index=False
)
\`\`\`

---

### 13.7.3 계수 해석

예를 들어 \`visit_count\` 계수가 20,000이라면 다음처럼 해석합니다.

\`\`\`text
방문 횟수가 1회 많을수록 총구매액은 평균적으로 약 20,000원 높게 나타난다.
\`\`\`

단순 회귀에서는 다른 변수를 고려하지 않았습니다.  
따라서 방문 횟수와 구매액의 단순 관계만 보여줍니다.

---

### 13.7.4 회귀선 그리기

\`\`\`python
regression_df["simple_predicted"] = simple_model.predict(regression_df)

plt.figure(figsize=(8, 4))

plt.scatter(
    regression_df["visit_count"],
    regression_df["total_purchase"],
    label="실제값"
)

plt.plot(
    regression_df["visit_count"],
    regression_df["simple_predicted"],
    label="회귀선"
)

plt.title("단순 회귀: 방문 횟수와 총구매액")
plt.xlabel("방문 횟수")
plt.ylabel("총구매액")
plt.legend()

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_13_simple_regression_line.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 13.7.5 R-squared 확인

\`\`\`python
simple_r_squared = simple_model.rsquared

simple_r_squared
\`\`\`

해석 예시:

\`\`\`text
R-squared는 visit_count 하나로 total_purchase 변동을 어느 정도 설명하는지를 보여준다.
R-squared가 낮다고 해서 분석이 무조건 실패한 것은 아니다.
고객 구매액은 방문 횟수 외에도 주문 횟수, 고객 등급, 구매 카테고리 등 여러 요인의 영향을 받을 수 있다.
\`\`\`

---
`;export{e as default};