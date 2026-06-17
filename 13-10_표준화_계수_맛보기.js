var e=`# 13장. 회귀분석 실습

## 13.10 표준화 계수 맛보기

서로 단위가 다른 변수의 계수 크기를 직접 비교하면 안 됩니다.

예를 들어:

\`\`\`text
visit_count: 회
coupon_usage_rate: %
days_since_last_order: 일
\`\`\`

단위가 다르기 때문에 계수 크기를 그대로 비교하기 어렵습니다.

이럴 때 수치형 변수를 표준화한 뒤 회귀분석을 하면 변수 간 상대적 영향력을 비교하는 데 도움이 됩니다.

---

### 13.10.1 수치형 변수 표준화

\`\`\`python
standardized_df = regression_df.copy()

standardize_cols = [
    "total_purchase",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count"
]

for col in standardize_cols:
    standardized_df[col + "_z"] = (
        standardized_df[col] - standardized_df[col].mean()
    ) / standardized_df[col].std()
\`\`\`

---

### 13.10.2 표준화 회귀 모델

\`\`\`python
standardized_model = smf.ols(
    formula=(
        "total_purchase_z ~ visit_count_z + order_count_z + "
        "coupon_usage_rate_z + days_since_last_order_z + category_count_z"
    ),
    data=standardized_df
).fit()

standardized_result = pd.DataFrame({
    "term": standardized_model.params.index,
    "standardized_coefficient": standardized_model.params.values,
    "p_value": standardized_model.pvalues.values
})

standardized_result["standardized_coefficient"] = (
    standardized_result["standardized_coefficient"].round(4)
)
standardized_result["p_value"] = standardized_result["p_value"].round(4)

standardized_result
\`\`\`

---

### 13.10.3 표준화 계수 해석

표준화 계수는 변수가 1표준편차 증가할 때 결과 변수가 몇 표준편차 변하는지를 나타냅니다.

단위가 제거되었기 때문에 변수 간 상대적 크기를 비교하기 쉽습니다.

하지만 표준화 계수도 인과관계를 의미하지는 않습니다.

---
`;export{e as default};