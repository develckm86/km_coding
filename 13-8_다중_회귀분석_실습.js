var e=`# 13장. 회귀분석 실습

## 13.8 다중 회귀분석 실습

이제 여러 설명 변수를 함께 넣어봅니다.

분석 질문:

\`\`\`text
방문 횟수, 주문 횟수, 쿠폰 사용률, 최근 구매 후 경과일, 구매 카테고리 수를 함께 고려했을 때 총구매액과 관련이 있는 변수는 무엇인가?
\`\`\`

---

### 13.8.1 다중 회귀 모델 만들기

\`\`\`python
multiple_formula = (
    "total_purchase ~ visit_count + order_count + "
    "coupon_usage_rate + days_since_last_order + category_count"
)

multiple_model = smf.ols(
    formula=multiple_formula,
    data=regression_df
).fit()

print(multiple_model.summary())
\`\`\`

---

### 13.8.2 다중 회귀 결과표 만들기

\`\`\`python
multiple_regression_result = pd.DataFrame({
    "term": multiple_model.params.index,
    "coefficient": multiple_model.params.values,
    "std_error": multiple_model.bse.values,
    "t_value": multiple_model.tvalues.values,
    "p_value": multiple_model.pvalues.values
})

multiple_regression_result["coefficient"] = multiple_regression_result["coefficient"].round(2)
multiple_regression_result["std_error"] = multiple_regression_result["std_error"].round(2)
multiple_regression_result["t_value"] = multiple_regression_result["t_value"].round(3)
multiple_regression_result["p_value"] = multiple_regression_result["p_value"].round(4)

multiple_regression_result
\`\`\`

저장합니다.

\`\`\`python
multiple_regression_result.to_csv(
    OUTPUT_TABLES / "chapter_13_multiple_regression_result.csv",
    index=False
)
\`\`\`

---

### 13.8.3 다중 회귀 계수 해석

다중 회귀에서는 다음 표현이 중요합니다.

\`\`\`text
다른 변수가 일정하다고 가정할 때
\`\`\`

예를 들어 \`order_count\` 계수가 50,000이라면 다음처럼 해석합니다.

\`\`\`text
방문 횟수, 쿠폰 사용률, 최근 구매 후 경과일, 구매 카테고리 수가 같다고 가정할 때,
주문 횟수가 1회 많을수록 총구매액은 평균적으로 약 50,000원 높게 나타난다.
\`\`\`

\`days_since_last_order\` 계수가 음수라면 다음처럼 해석합니다.

\`\`\`text
다른 변수가 일정하다고 가정할 때,
마지막 구매 후 경과일이 1일 길수록 총구매액은 평균적으로 감소하는 경향이 있다.
\`\`\`

---

### 13.8.4 단순 회귀와 다중 회귀 비교

\`\`\`python
model_comparison_summary = pd.DataFrame([
    {
        "model_name": "simple_model",
        "formula": "total_purchase ~ visit_count",
        "r_squared": simple_model.rsquared,
        "adj_r_squared": simple_model.rsquared_adj,
        "aic": simple_model.aic,
        "bic": simple_model.bic
    },
    {
        "model_name": "multiple_model",
        "formula": multiple_formula,
        "r_squared": multiple_model.rsquared,
        "adj_r_squared": multiple_model.rsquared_adj,
        "aic": multiple_model.aic,
        "bic": multiple_model.bic
    }
])

model_comparison_summary["r_squared"] = model_comparison_summary["r_squared"].round(4)
model_comparison_summary["adj_r_squared"] = model_comparison_summary["adj_r_squared"].round(4)
model_comparison_summary["aic"] = model_comparison_summary["aic"].round(2)
model_comparison_summary["bic"] = model_comparison_summary["bic"].round(2)

model_comparison_summary
\`\`\`

저장합니다.

\`\`\`python
model_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_13_model_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 13.8.5 모델 비교 해석

\`\`\`text
다중 회귀 모델은 단순 회귀 모델보다 더 많은 변수를 사용하므로 R-squared가 높아질 수 있다.
하지만 변수를 많이 넣는다고 항상 좋은 모델은 아니다.
Adjusted R-squared, 변수 해석 가능성, 과적합 가능성, 분석 목적을 함께 고려해야 한다.
\`\`\`

---
`;export{e as default};