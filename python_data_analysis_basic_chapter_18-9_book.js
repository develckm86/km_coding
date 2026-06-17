var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-9 -->

# 18.9 시간 흐름 분석

날짜 데이터가 있다면 시간 흐름을 분석할 수 있습니다.

---

### 18.9.1 월별 매출 분석

주문일에서 연월을 추출합니다.

\`\`\`python
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
\`\`\`

월별 매출을 계산합니다.

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_sales
\`\`\`

선 그래프로 표현합니다.

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
월별 매출 흐름을 보면 특정 월에 매출이 높거나 낮은지 확인할 수 있다.
매출 변화가 주문 건수 때문인지, 평균 주문 금액 때문인지 추가로 확인해야 한다.
\`\`\`

---

### 18.9.2 월별 주문 수 분석

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["order_count"])

plt.title("월별 주문 수 추이")
plt.xlabel("월")
plt.ylabel("주문 수")
plt.show()
\`\`\`

매출과 주문 수를 함께 비교하면 매출 변화의 원인을 더 잘 이해할 수 있습니다.

예를 들어 매출은 증가했지만 주문 수가 그대로라면 평균 주문 금액이 증가했을 가능성이 있습니다.

---

### 18.9.3 월별 카테고리 매출

월별 카테고리 매출을 계산합니다.

\`\`\`python
monthly_category_sales = (
    orders
    .groupby(["year_month", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_category_sales
\`\`\`

피벗 테이블로 바꿔봅니다.

\`\`\`python
monthly_category_pivot = monthly_category_sales.pivot(
    index="year_month",
    columns="category",
    values="total_sales"
).fillna(0)

monthly_category_pivot
\`\`\`

그래프로 표현합니다.

\`\`\`python
monthly_category_pivot.plot(kind="line")

plt.title("월별 카테고리 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
월별 매출 증가가 특정 카테고리의 증가 때문인지 확인할 수 있다.
전자기기 매출이 특정 월에 높다면 해당 월의 전체 매출 증가에 영향을 주었을 수 있다.
\`\`\`

---

### 18.9.4 요일별 주문 패턴

요일을 추출합니다.

\`\`\`python
orders["weekday"] = orders["order_date"].dt.day_name()
orders["weekday_num"] = orders["order_date"].dt.dayofweek
\`\`\`

요일별 주문 수를 계산합니다.

\`\`\`python
weekday_orders = (
    orders
    .groupby(["weekday_num", "weekday"])
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_orders
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(weekday_orders["weekday"], weekday_orders["order_count"])

plt.title("요일별 주문 수")
plt.xlabel("요일")
plt.ylabel("주문 수")
plt.xticks(rotation=45)
plt.show()
\`\`\`

해석할 때는 데이터 기간이 충분한지 확인해야 합니다.  
예제 데이터처럼 기간이 짧으면 요일별 패턴을 일반화하기 어렵습니다.

---
`;export{e as default};