var e=`# 7장. 누적 지표와 이동평균 분석

## 7.11 일별 매출 추이 그래프

이제 일별 매출과 이동평균을 그래프로 확인합니다.

---

### 7.11.1 일별 매출 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(daily_sales["order_date_dt"], daily_sales["daily_sales"])

plt.title("일별 매출 추이")
plt.xlabel("날짜")
plt.ylabel("매출")

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_07_daily_sales_trend.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 7.11.2 이동평균 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.plot(daily_sales["order_date_dt"], daily_sales["daily_sales"], label="일별 매출")
plt.plot(daily_sales["order_date_dt"], daily_sales["sales_3d_ma"], label="3일 이동평균")
plt.plot(daily_sales["order_date_dt"], daily_sales["sales_7d_ma"], label="7일 이동평균")

plt.title("일별 매출과 이동평균")
plt.xlabel("날짜")
plt.ylabel("매출")
plt.legend()

plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_07_rolling_average_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 7.11.3 그래프 해석 예시

\`\`\`text
일별 매출은 날짜별로 변동이 크지만, 3일 이동평균과 7일 이동평균을 함께 보면 전체적인 흐름을 더 쉽게 파악할 수 있다.
3일 이동평균은 단기 변화를 빠르게 반영하고, 7일 이동평균은 더 부드러운 추세를 보여준다.
일별 매출이 급증하거나 급감한 날짜는 별도로 원인을 확인할 필요가 있다.
\`\`\`

---
`;export{e as default};