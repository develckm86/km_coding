var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-11 -->

# 13.11 실무 예제 2: 요일별 주문 패턴 분석

요일별 주문 수를 분석해보겠습니다.

---

### 13.11.1 요일 컬럼 만들기

\`\`\`python
orders_valid_date["weekday_num"] = orders_valid_date["order_date_dt"].dt.dayofweek
orders_valid_date["weekday_name"] = orders_valid_date["order_date_dt"].dt.day_name()

weekday_map = {
    "Monday": "월",
    "Tuesday": "화",
    "Wednesday": "수",
    "Thursday": "목",
    "Friday": "금",
    "Saturday": "토",
    "Sunday": "일"
}

orders_valid_date["weekday_kr"] = orders_valid_date["weekday_name"].replace(weekday_map)

orders_valid_date[["order_date_dt", "weekday_num", "weekday_kr"]]
\`\`\`

---

### 13.11.2 요일별 주문 수와 매출

\`\`\`python
weekday_summary = (
    orders_valid_date
    .groupby(["weekday_num", "weekday_kr"])
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum"),
        average_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_summary
\`\`\`

요일별 주문 수를 보면 특정 요일에 주문이 몰리는지 확인할 수 있습니다.

---
`;export{e as default};