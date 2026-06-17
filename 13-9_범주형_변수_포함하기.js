var e=`# 13장. 회귀분석 실습

## 13.9 범주형 변수 포함하기

고객 등급이나 주 구매 카테고리 같은 범주형 변수도 회귀분석에 포함할 수 있습니다.

\`statsmodels\` formula에서는 \`C()\`를 사용하면 범주형 변수로 처리합니다.

---

### 13.9.1 범주형 변수 포함 모델

\`\`\`python
categorical_formula = (
    "total_purchase ~ visit_count + order_count + "
    "coupon_usage_rate + days_since_last_order + category_count + "
    "C(customer_grade) + C(main_category)"
)

categorical_model = smf.ols(
    formula=categorical_formula,
    data=regression_df
).fit()

print(categorical_model.summary())
\`\`\`

---

### 13.9.2 범주형 회귀 결과표 만들기

\`\`\`python
categorical_regression_result = pd.DataFrame({
    "term": categorical_model.params.index,
    "coefficient": categorical_model.params.values,
    "std_error": categorical_model.bse.values,
    "t_value": categorical_model.tvalues.values,
    "p_value": categorical_model.pvalues.values
})

categorical_regression_result["coefficient"] = categorical_regression_result["coefficient"].round(2)
categorical_regression_result["std_error"] = categorical_regression_result["std_error"].round(2)
categorical_regression_result["t_value"] = categorical_regression_result["t_value"].round(3)
categorical_regression_result["p_value"] = categorical_regression_result["p_value"].round(4)

categorical_regression_result
\`\`\`

저장합니다.

\`\`\`python
categorical_regression_result.to_csv(
    OUTPUT_TABLES / "chapter_13_categorical_regression_result.csv",
    index=False
)
\`\`\`

---

### 13.9.3 범주형 계수 해석

범주형 변수는 기준 범주와 비교해서 해석합니다.

예를 들어 결과에 다음 항목이 있다고 해봅시다.

\`\`\`text
C(customer_grade)[T.VIP] = 150000
\`\`\`

이는 기준 등급이 일반이라고 할 때 다음처럼 해석할 수 있습니다.

\`\`\`text
다른 변수가 같다고 가정할 때,
VIP 고객은 일반 고객보다 총구매액이 평균적으로 약 150,000원 높게 나타난다.
\`\`\`

주 구매 카테고리도 마찬가지입니다.

\`\`\`text
C(main_category)[T.전자기기] = 90000
\`\`\`

해석:

\`\`\`text
다른 변수가 같다고 가정할 때,
주 구매 카테고리가 전자기기인 고객은 기준 카테고리 고객보다 총구매액이 평균적으로 약 90,000원 높게 나타난다.
\`\`\`

기준 범주는 데이터의 정렬이나 내부 처리 기준에 따라 정해집니다.  
보고서에서는 어떤 기준 범주와 비교한 것인지 주의해야 합니다.

---

### 13.9.4 모델 비교표에 추가

\`\`\`python
model_comparison_summary = pd.concat([
    model_comparison_summary,
    pd.DataFrame([{
        "model_name": "categorical_model",
        "formula": categorical_formula,
        "r_squared": round(categorical_model.rsquared, 4),
        "adj_r_squared": round(categorical_model.rsquared_adj, 4),
        "aic": round(categorical_model.aic, 2),
        "bic": round(categorical_model.bic, 2)
    }])
], ignore_index=True)

model_comparison_summary
\`\`\`

다시 저장합니다.

\`\`\`python
model_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_13_model_comparison_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};