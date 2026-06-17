var e=`# 13장. 회귀분석 실습

## 13.21 정답 예시

아래는 이번 장 과제의 핵심 정답 예시입니다.

---

### 13.21.1 단순 회귀

\`\`\`python
simple_model = smf.ols(
    formula="total_purchase ~ visit_count",
    data=regression_df
).fit()

simple_result = make_regression_result_table(simple_model)
\`\`\`

---

### 13.21.2 다중 회귀

\`\`\`python
multiple_model = smf.ols(
    formula=(
        "total_purchase ~ visit_count + order_count + "
        "coupon_usage_rate + days_since_last_order + category_count"
    ),
    data=regression_df
).fit()

multiple_result = make_regression_result_table(multiple_model)
\`\`\`

---

### 13.21.3 범주형 변수 포함 회귀

\`\`\`python
categorical_model = smf.ols(
    formula=(
        "total_purchase ~ visit_count + order_count + "
        "coupon_usage_rate + days_since_last_order + category_count + "
        "C(customer_grade) + C(main_category)"
    ),
    data=regression_df
).fit()

categorical_result = make_regression_result_table(categorical_model)
\`\`\`

---

### 13.21.4 예측값과 잔차

\`\`\`python
regression_df["predicted_total_purchase"] = categorical_model.predict(regression_df)
regression_df["residual"] = regression_df["total_purchase"] - regression_df["predicted_total_purchase"]
\`\`\`

---

### 13.21.5 모델 비교

\`\`\`python
model_comparison = pd.concat([
    make_model_summary(simple_model, "simple_model", "total_purchase ~ visit_count"),
    make_model_summary(multiple_model, "multiple_model", multiple_formula),
    make_model_summary(categorical_model, "categorical_model", categorical_formula)
], ignore_index=True)
\`\`\`

---
`;export{e as default};