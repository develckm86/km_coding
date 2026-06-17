var e=`# 13장. 회귀분석 실습

## 13.18 함수로 회귀분석 구조화하기

반복되는 회귀분석 작업은 함수로 만들 수 있습니다.

---

### 13.18.1 회귀 결과표 생성 함수

\`\`\`python
def make_regression_result_table(model) -> pd.DataFrame:
    result = pd.DataFrame({
        "term": model.params.index,
        "coefficient": model.params.values,
        "std_error": model.bse.values,
        "t_value": model.tvalues.values,
        "p_value": model.pvalues.values
    })

    result["coefficient"] = result["coefficient"].round(2)
    result["std_error"] = result["std_error"].round(2)
    result["t_value"] = result["t_value"].round(3)
    result["p_value"] = result["p_value"].round(4)

    return result
\`\`\`

사용 예:

\`\`\`python
make_regression_result_table(categorical_model)
\`\`\`

---

### 13.18.2 모델 요약 함수

\`\`\`python
def make_model_summary(model, model_name: str, formula: str) -> pd.DataFrame:
    return pd.DataFrame([{
        "model_name": model_name,
        "formula": formula,
        "r_squared": round(model.rsquared, 4),
        "adj_r_squared": round(model.rsquared_adj, 4),
        "aic": round(model.aic, 2),
        "bic": round(model.bic, 2),
        "nobs": int(model.nobs)
    }])
\`\`\`

---

### 13.18.3 예측값과 잔차 생성 함수

\`\`\`python
def add_predictions_and_residuals(
    df: pd.DataFrame,
    model,
    actual_col: str,
    prediction_col: str = "predicted",
    residual_col: str = "residual"
) -> pd.DataFrame:
    result = df.copy()
    result[prediction_col] = model.predict(result)
    result[residual_col] = result[actual_col] - result[prediction_col]
    return result
\`\`\`

---

### 13.18.4 함수화의 장점

\`\`\`text
여러 모델 결과를 같은 형식으로 저장할 수 있다.
보고서 자동화에 활용할 수 있다.
회귀분석 반복 작업을 줄일 수 있다.
모델 비교표를 쉽게 만들 수 있다.
\`\`\`

---
`;export{e as default};