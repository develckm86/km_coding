var e=`# 17장. 고급 시각화 리포트 만들기

## 17.12 회귀분석 실제값·예측값 그래프

회귀분석 결과는 실제값과 예측값을 비교하는 그래프로 설명할 수 있습니다.

분석 질문:

\`\`\`text
회귀 모델은 고객 구매액을 어느 정도 설명하는가?
\`\`\`

---

### 17.12.1 실제값과 예측값 그래프

\`\`\`python
plt.figure(figsize=(6, 6))

plt.scatter(
    prediction_sample["total_purchase"],
    prediction_sample["predicted_total_purchase"]
)

min_value = min(
    prediction_sample["total_purchase"].min(),
    prediction_sample["predicted_total_purchase"].min()
)

max_value = max(
    prediction_sample["total_purchase"].max(),
    prediction_sample["predicted_total_purchase"].max()
)

plt.plot([min_value, max_value], [min_value, max_value])

plt.title("회귀분석 실제값과 예측값")
plt.xlabel("실제 총구매액")
plt.ylabel("예측 총구매액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_actual_vs_predicted.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.12.2 해석 문장 예시

\`\`\`text
실제값과 예측값 그래프는 회귀 모델의 예측이 실제 구매액과 얼마나 가까운지 보여준다.
점들이 대각선 근처에 모일수록 예측이 실제값과 가까우며, 크게 벗어난 점은 모델이 잘 설명하지 못하는 고객일 수 있다.
\`\`\`

---
`;export{e as default};