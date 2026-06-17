var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-13 -->

# 13.13 실무 미니 프로젝트: 주문 날짜 분석 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 주문 날짜 분석 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 주문일과 배송일을 날짜형으로 변환한다.
3. 잘못된 주문일을 확인한다.
4. 연월, 요일 컬럼을 만든다.
5. 월별 매출을 집계한다.
6. 요일별 주문 수를 집계한다.
7. 배송 소요일을 계산한다.
8. 최근 30일 주문을 추출한다.
9. 분석 결과를 요약한다.
\`\`\`

---

### 13.13.1 데이터 준비

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8],
    "order_date": [
        "2026-01-03",
        "2026-01-05",
        "2026-01-10",
        "2026-02-02",
        "2026-02-14",
        "2026-03-01",
        "2026-03-15",
        "잘못된 날짜",
        "2026-03-20",
        "2026-03-28"
    ],
    "ship_date": [
        "2026-01-05",
        "2026-01-08",
        "2026-01-12",
        "2026-02-04",
        None,
        "2026-03-05",
        "2026-03-18",
        "2026-03-20",
        "2026-03-23",
        "2026-03-30"
    ],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기"],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 25000, 70000, 260000]
})

orders
\`\`\`

---

### 13.13.2 날짜형 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"], errors="coerce")
orders["ship_date_dt"] = pd.to_datetime(orders["ship_date"], errors="coerce")
\`\`\`

잘못된 주문일을 확인합니다.

\`\`\`python
invalid_order_dates = orders[orders["order_date_dt"].isna()]

invalid_order_dates
\`\`\`

---

### 13.13.3 날짜 파생 변수 만들기

날짜가 있는 주문만 따로 사용합니다.

\`\`\`python
orders_valid = orders.dropna(subset=["order_date_dt"]).copy()
\`\`\`

연월, 요일 컬럼을 만듭니다.

\`\`\`python
orders_valid["order_year_month"] = orders_valid["order_date_dt"].dt.to_period("M")
orders_valid["weekday_num"] = orders_valid["order_date_dt"].dt.dayofweek
orders_valid["weekday_name"] = orders_valid["order_date_dt"].dt.day_name()

weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_valid["weekday_kr"] = orders_valid["weekday_name"].replace(weekday_map)

orders_valid[["order_date_dt", "order_year_month", "weekday_kr"]]
\`\`\`

---

### 13.13.4 월별 매출 리포트

\`\`\`python
monthly_report = (
    orders_valid
    .groupby("order_year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        average_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_report
\`\`\`

---

### 13.13.5 요일별 주문 리포트

\`\`\`python
weekday_report = (
    orders_valid
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_report
\`\`\`

---

### 13.13.6 배송 소요일 리포트

배송일이 있는 행만 사용합니다.

\`\`\`python
delivery_data = orders_valid.dropna(subset=["ship_date_dt"]).copy()

delivery_data["delivery_days"] = (
    delivery_data["ship_date_dt"] - delivery_data["order_date_dt"]
).dt.days

delivery_data[["order_id", "order_date_dt", "ship_date_dt", "delivery_days"]]
\`\`\`

배송 요약 정보를 계산합니다.

\`\`\`python
delivery_summary = delivery_data["delivery_days"].describe()

delivery_summary
\`\`\`

배송 지연 주문을 찾습니다.

\`\`\`python
delayed_orders = delivery_data[delivery_data["delivery_days"] >= 3]

delayed_orders
\`\`\`

---

### 13.13.7 최근 30일 주문 추출

기준일을 고정합니다.

\`\`\`python
base_date = pd.Timestamp("2026-03-31")
start_date = base_date - pd.Timedelta(days=30)

recent_30_days_orders = orders_valid[
    (orders_valid["order_date_dt"] >= start_date) &
    (orders_valid["order_date_dt"] <= base_date)
]

recent_30_days_orders
\`\`\`

최근 30일 매출을 계산합니다.

\`\`\`python
recent_30_days_sales = recent_30_days_orders["total_price"].sum()

recent_30_days_sales
\`\`\`

---

### 13.13.8 분석 결과 요약

\`\`\`python
summary = {
    "전체 주문 수": len(orders),
    "날짜 변환 실패 주문 수": orders["order_date_dt"].isna().sum(),
    "날짜 분석 가능 주문 수": len(orders_valid),
    "전체 매출": orders_valid["total_price"].sum(),
    "최근 30일 매출": recent_30_days_sales,
    "평균 배송 소요일": delivery_data["delivery_days"].mean()
}

summary
\`\`\`

---

### 13.13.9 처리 기준 문서화

분석 과정에는 다음과 같이 처리 기준을 남길 수 있습니다.

\`\`\`text
날짜 데이터 처리 기준
- order_date와 ship_date는 pd.to_datetime(errors="coerce")로 날짜형 변환했다.
- 변환할 수 없는 order_date는 NaT로 처리하고 날짜 기반 분석에서는 제외했다.
- 월별 분석에는 order_date가 유효한 주문만 사용했다.
- 배송 소요일 분석에는 order_date와 ship_date가 모두 유효한 주문만 사용했다.
- 최근 30일 분석의 기준일은 2026-03-31로 고정했다.
- 요일 분석은 order_date 기준으로 수행했다.
\`\`\`

처리 기준을 남기면 분석 결과를 다시 확인하거나 다른 사람에게 설명하기 쉬워집니다.

---
`;export{e as default};