var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-7 -->

# 13.7 날짜 계산

날짜형 데이터끼리는 뺄셈이 가능합니다.  
날짜 차이를 계산하면 기간 분석을 할 수 있습니다.

---

### 13.7.1 배송 소요일 계산

주문일과 배송일의 차이를 계산해보겠습니다.

\`\`\`python
orders["delivery_time"] = orders["ship_date_dt"] - orders["order_date_dt"]

orders[["order_date_dt", "ship_date_dt", "delivery_time"]]
\`\`\`

결과는 \`Timedelta\` 형태로 나타납니다.

\`\`\`text
2 days
3 days
\`\`\`

일수만 숫자로 추출하려면 \`.dt.days\`를 사용합니다.

\`\`\`python
orders["delivery_days"] = orders["delivery_time"].dt.days

orders[["order_date_dt", "ship_date_dt", "delivery_days"]]
\`\`\`

이제 배송 소요일을 평균으로 계산할 수 있습니다.

\`\`\`python
orders["delivery_days"].mean()
\`\`\`

---

### 13.7.2 특정 날짜와의 차이 계산

기준일과 주문일의 차이를 계산할 수도 있습니다.

\`\`\`python
base_date = pd.Timestamp("2026-03-31")

orders["days_since_order"] = (base_date - orders["order_date_dt"]).dt.days

orders[["order_date_dt", "days_since_order"]]
\`\`\`

이렇게 하면 기준일로부터 주문이 며칠 전인지 알 수 있습니다.

고객 분석에서는 다음과 같은 지표에 사용할 수 있습니다.

\`\`\`text
마지막 구매 후 경과일
가입 후 경과일
마지막 로그인 후 경과일
최근 방문 후 경과일
\`\`\`

---

### 13.7.3 가입 후 첫 주문까지 걸린 기간

고객 데이터와 주문 데이터를 이용해 가입 후 첫 주문까지 걸린 기간을 계산해보겠습니다.

먼저 고객 가입일을 날짜형으로 변환합니다.

\`\`\`python
customers["signup_date_dt"] = pd.to_datetime(customers["signup_date"])

customers
\`\`\`

주문 데이터에서 고객별 첫 주문일을 구합니다.

\`\`\`python
first_order = (
    orders
    .dropna(subset=["order_date_dt"])
    .groupby("customer_id")["order_date_dt"]
    .min()
    .reset_index()
)

first_order = first_order.rename(columns={"order_date_dt": "first_order_date"})

first_order
\`\`\`

고객 데이터와 첫 주문일 데이터를 결합합니다.

\`\`\`python
customer_order = customers.merge(first_order, on="customer_id", how="left")

customer_order
\`\`\`

가입 후 첫 주문까지 걸린 기간을 계산합니다.

\`\`\`python
customer_order["days_to_first_order"] = (
    customer_order["first_order_date"] - customer_order["signup_date_dt"]
).dt.days

customer_order[["customer_id", "name", "signup_date_dt", "first_order_date", "days_to_first_order"]]
\`\`\`

이 분석은 고객 전환 기간을 파악하는 데 유용합니다.

---

### 13.7.4 마감일까지 남은 기간 계산

업무 데이터에서는 마감일까지 남은 기간을 계산할 수 있습니다.

\`\`\`python
tasks = pd.DataFrame({
    "task": ["보고서 작성", "데이터 정리", "회의 준비"],
    "due_date": ["2026-04-05", "2026-04-10", "2026-03-28"]
})

tasks["due_date"] = pd.to_datetime(tasks["due_date"])

base_date = pd.Timestamp("2026-03-31")

tasks["days_left"] = (tasks["due_date"] - base_date).dt.days

tasks
\`\`\`

마감일이 지난 업무도 찾을 수 있습니다.

\`\`\`python
overdue_tasks = tasks[tasks["days_left"] < 0]

overdue_tasks
\`\`\`

---
`;export{e as default};