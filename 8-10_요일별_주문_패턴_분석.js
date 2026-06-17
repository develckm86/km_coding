var e=`# 8장. 시계열 매출 분석

## 8.10 요일별 주문 패턴 분석

요일별 주문 패턴은 운영과 마케팅에 유용한 정보입니다.

분석 질문:

\`\`\`text
어떤 요일에 주문이 많은가?
어떤 요일에 매출이 높은가?
요일별 평균 주문 금액은 다른가?
\`\`\`

---

### 8.10.1 요일 컬럼 확인

\`\`\`python
orders_mart["weekday_num"] = orders_mart["order_date_dt"].dt.dayofweek
orders_mart["weekday_name"] = orders_mart["order_date_dt"].dt.day_name()

orders_mart[["order_date_dt", "weekday_num", "weekday_name"]].head()
\`\`\`

요일 번호는 월요일이 0, 일요일이 6입니다.

---

### 8.10.2 한글 요일명 만들기

\`\`\`python
weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_mart["weekday_kr"] = orders_mart["weekday_name"].replace(weekday_map)
\`\`\`

---

### 8.10.3 요일별 매출 집계

\`\`\`python
weekday_sales = (
    orders_mart
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_sales["avg_order_amount"] = weekday_sales["avg_order_amount"].round(0)

weekday_sales
\`\`\`

---

### 8.10.4 저장하기

\`\`\`python
weekday_sales.to_csv(
    OUTPUT_TABLES / "chapter_08_weekday_sales_report.csv",
    index=False
)
\`\`\`

---

### 8.10.5 요일별 주문 수 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(weekday_sales["weekday_kr"], weekday_sales["order_count"])

plt.title("요일별 주문 수")
plt.xlabel("요일")
plt.ylabel("주문 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_08_weekday_order_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 8.10.6 해석 예시

\`\`\`text
요일별 주문 수를 보면 특정 요일에 주문이 집중되는지 확인할 수 있다.
요일별 매출과 주문 수를 함께 보면 매출이 높은 요일이 주문 수 때문인지, 평균 주문 금액 때문인지 구분할 수 있다.
단, 분석 기간이 짧으면 요일별 패턴을 일반화하기 어렵다.
\`\`\`

---
`;export{e as default};