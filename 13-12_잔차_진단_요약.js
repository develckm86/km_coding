var e=`# 13장. 회귀분석 실습

## 13.12 잔차 진단 요약

이번 절에서는 잔차를 간단히 요약합니다.

---

### 13.12.1 잔차 기본 통계

\`\`\`python
residual_diagnostics = pd.DataFrame([
    {
        "metric": "mean_residual",
        "value": regression_df["residual"].mean()
    },
    {
        "metric": "median_residual",
        "value": regression_df["residual"].median()
    },
    {
        "metric": "std_residual",
        "value": regression_df["residual"].std()
    },
    {
        "metric": "min_residual",
        "value": regression_df["residual"].min()
    },
    {
        "metric": "max_residual",
        "value": regression_df["residual"].max()
    },
    {
        "metric": "mean_absolute_error",
        "value": regression_df["residual"].abs().mean()
    }
])

residual_diagnostics["value"] = residual_diagnostics["value"].round(2)

residual_diagnostics
\`\`\`

저장합니다.

\`\`\`python
residual_diagnostics.to_csv(
    OUTPUT_TABLES / "chapter_13_residual_diagnostics.csv",
    index=False
)
\`\`\`

---

### 13.12.2 잔차가 큰 고객 확인

\`\`\`python
large_residual_customers = (
    regression_df
    .assign(abs_residual=regression_df["residual"].abs())
    .sort_values("abs_residual", ascending=False)
    .head(10)
)

large_residual_customers[[
    "customer_id",
    "total_purchase",
    "predicted_total_purchase",
    "residual",
    "visit_count",
    "order_count",
    "customer_grade",
    "main_category"
]]
\`\`\`

---

### 13.12.3 해석 예시

\`\`\`text
잔차가 큰 고객은 모델이 예측하기 어려운 고객이다.
이 고객들은 특별한 구매 패턴을 보였거나, 모델에 포함되지 않은 중요한 변수가 있을 수 있다.
예를 들어 특정 프로모션 참여 여부, 구매 상품 가격, 고객 유입 경로 같은 변수가 누락되었을 수 있다.
\`\`\`

---
`;export{e as default};