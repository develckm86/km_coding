var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-17 -->

# 13.17 정답 및 해설

### 문제 1 정답

정답: B

문자열 날짜를 pandas 날짜형으로 변환할 때는 \`pd.to_datetime()\`을 사용합니다.

---

### 문제 2 정답

\`\`\`python
df["order_date_dt"] = pd.to_datetime(df["order_date"])
\`\`\`

\`order_date\` 문자열 컬럼을 날짜형으로 변환해 새 컬럼에 저장합니다.

---

### 문제 3 정답

\`\`\`python
df["date_dt"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

\`errors="coerce"\`를 사용하면 변환할 수 없는 값은 \`NaT\`로 처리됩니다.

---

### 문제 4 정답

\`\`\`python
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"] = df["date"].dt.day
\`\`\`

날짜형 Series에서 연도, 월, 일을 추출할 때는 \`.dt\` 접근자를 사용합니다.

---

### 문제 5 정답

방법 1: 기간 조건 사용

\`\`\`python
feb_orders = orders[
    orders["order_date"].between("2026-02-01", "2026-02-28")
]
\`\`\`

방법 2: 연도와 월 추출

\`\`\`python
feb_orders = orders[
    (orders["order_date"].dt.year == 2026) &
    (orders["order_date"].dt.month == 2)
]
\`\`\`

---

### 문제 6 정답

\`\`\`python
orders["delivery_days"] = (
    orders["ship_date"] - orders["order_date"]
).dt.days
\`\`\`

날짜끼리 빼면 \`Timedelta\`가 나오고, \`.dt.days\`로 일수만 추출할 수 있습니다.

---

### 문제 7 정답

\`\`\`python
orders["year_month"] = orders["order_date"].dt.to_period("M")

monthly_sales = (
    orders
    .groupby("year_month")["sales"]
    .sum()
    .reset_index()
)

monthly_sales
\`\`\`

연월 컬럼을 만든 뒤 그룹화하여 월별 매출 합계를 계산합니다.

---

### 문제 8 정답

\`\`\`python
df["weekday"] = df["date"].dt.day_name()
\`\`\`

\`day_name()\`은 날짜의 요일 이름을 반환합니다.

---

### 문제 9 정답

\`dt.month\`만 사용하면 여러 연도의 같은 월이 하나로 합쳐질 수 있습니다.

예를 들어 2025년 1월과 2026년 1월이 모두 \`1\`로 표시되므로, 월만 기준으로 그룹화하면 서로 다른 연도의 1월 데이터가 함께 집계됩니다.

따라서 여러 연도에 걸친 데이터를 월별 분석할 때는 \`dt.to_period("M")\`으로 연월을 만들거나, 연도와 월을 함께 사용해야 합니다.

---

### 문제 10 정답

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

orders_valid = orders.dropna(subset=["order_date_dt"]).copy()

orders_valid["year_month"] = orders_valid["order_date_dt"].dt.to_period("M")

monthly_sales = (
    orders_valid
    .groupby("year_month")["sales"]
    .sum()
    .reset_index()
)

base_date = pd.Timestamp("2026-03-31")
start_date = base_date - pd.Timedelta(days=30)

recent_orders = orders_valid[
    (orders_valid["order_date_dt"] >= start_date) &
    (orders_valid["order_date_dt"] <= base_date)
]

monthly_sales, recent_orders
\`\`\`

처리 과정은 다음과 같습니다.

1. \`order_date\`를 날짜형으로 변환합니다.
2. 변환할 수 없는 날짜는 \`NaT\`로 처리합니다.
3. 날짜가 유효한 행만 남깁니다.
4. \`year_month\` 컬럼을 만듭니다.
5. 월별 매출 합계를 계산합니다.
6. 기준일에서 30일 전 날짜를 구합니다.
7. 최근 30일 주문을 필터링합니다.

---
`;export{e as default};