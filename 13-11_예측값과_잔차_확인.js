var e=`# 13장. 회귀분석 실습

## 13.11 예측값과 잔차 확인

회귀분석 결과를 이해하려면 예측값과 잔차를 확인해야 합니다.

---

### 13.11.1 예측값 만들기

범주형 변수를 포함한 모델을 최종 모델로 사용하겠습니다.

\`\`\`python
regression_df["predicted_total_purchase"] = categorical_model.predict(regression_df)
\`\`\`

---

### 13.11.2 잔차 계산

\`\`\`python
regression_df["residual"] = (
    regression_df["total_purchase"] -
    regression_df["predicted_total_purchase"]
)

regression_df[[
    "customer_id",
    "total_purchase",
    "predicted_total_purchase",
    "residual"
]].head()
\`\`\`

---

### 13.11.3 예측 샘플 저장

\`\`\`python
prediction_sample = regression_df[[
    "customer_id",
    "total_purchase",
    "predicted_total_purchase",
    "residual",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "customer_grade",
    "main_category"
]].copy()

prediction_sample["predicted_total_purchase"] = (
    prediction_sample["predicted_total_purchase"].round(0)
)

prediction_sample["residual"] = prediction_sample["residual"].round(0)

prediction_sample.to_csv(
    OUTPUT_TABLES / "chapter_13_prediction_sample.csv",
    index=False
)

prediction_sample.head()
\`\`\`

또한 processed 폴더에도 저장합니다.

\`\`\`python
prediction_sample.to_csv(
    DATA_PROCESSED / "chapter_13_regression_prediction_sample.csv",
    index=False
)
\`\`\`

---

### 13.11.4 실제값과 예측값 그래프

\`\`\`python
plt.figure(figsize=(6, 6))

plt.scatter(
    regression_df["total_purchase"],
    regression_df["predicted_total_purchase"]
)

min_value = min(
    regression_df["total_purchase"].min(),
    regression_df["predicted_total_purchase"].min()
)

max_value = max(
    regression_df["total_purchase"].max(),
    regression_df["predicted_total_purchase"].max()
)

plt.plot([min_value, max_value], [min_value, max_value])

plt.title("실제값과 예측값 비교")
plt.xlabel("실제 총구매액")
plt.ylabel("예측 총구매액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_13_actual_vs_predicted.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 13.11.5 잔차 플롯

\`\`\`python
plt.figure(figsize=(8, 4))

plt.scatter(
    regression_df["predicted_total_purchase"],
    regression_df["residual"]
)

plt.axhline(0, linestyle="--")

plt.title("예측값과 잔차")
plt.xlabel("예측 총구매액")
plt.ylabel("잔차")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_13_residual_plot.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 13.11.6 잔차 해석 예시

\`\`\`text
잔차는 실제값과 예측값의 차이다.
잔차가 0 근처에 고르게 분포하면 모델이 특정 구간에서 크게 치우치지 않았다고 볼 수 있다.
예측값이 커질수록 잔차의 퍼짐이 커진다면 분산이 일정하지 않을 가능성이 있다.
잔차가 매우 큰 고객은 모델이 잘 설명하지 못하는 특이 고객일 수 있다.
\`\`\`

---
`;export{e as default};