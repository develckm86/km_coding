var e=`# 7장. 누적 지표와 이동평균 분석

## 7.12 누적 매출 그래프

누적 매출은 목표 달성 상황을 볼 때 유용합니다.

---

### 7.12.1 누적 매출 그래프 작성

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(daily_sales["order_date_dt"], daily_sales["cumulative_sales"])

plt.title("누적 매출 추이")
plt.xlabel("날짜")
plt.ylabel("누적 매출")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_07_cumulative_sales_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 7.12.2 목표 매출 대비 달성률 계산

목표 매출을 설정해봅니다.

\`\`\`python
sales_target = 2_500_000

daily_sales["target_achievement_rate"] = (
    daily_sales["cumulative_sales"] / sales_target * 100
).round(1)

daily_sales[[
    "order_date_dt",
    "cumulative_sales",
    "target_achievement_rate"
]].tail()
\`\`\`

---

### 7.12.3 해석 예시

\`\`\`text
누적 매출 그래프는 현재까지 매출이 얼마나 쌓였는지 보여준다.
목표 매출을 함께 설정하면 현재 달성률을 확인할 수 있다.
다만 누적 매출은 시간이 지날수록 증가하는 특성이 있으므로 최근 흐름을 보려면 이동평균과 함께 보는 것이 좋다.
\`\`\`

---
`;export{e as default};