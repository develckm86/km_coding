var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-10 -->

# 18.10 그룹별 비교 분석

EDA에서는 그룹별로 데이터를 비교하는 일이 많습니다.

---

### 18.10.1 지역별 매출 비교

\`\`\`python
region_sales = (
    orders
    .groupby("region")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(region_sales["region"], region_sales["total_sales"])

plt.title("지역별 매출")
plt.xlabel("지역")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
서울 지역 매출이 가장 높게 나타난다.
하지만 서울 주문 수가 많기 때문인지, 평균 주문 금액이 높기 때문인지는 추가로 확인해야 한다.
\`\`\`

---

### 18.10.2 고객 등급별 구매 패턴

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        avg_visit_count=("visit_count", "mean"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_summary
\`\`\`

해석 예시:

\`\`\`text
VIP 고객은 총매출과 평균 주문 금액이 높을 수 있다.
또한 방문 횟수와 만족도도 일반 고객보다 높게 나타날 수 있다.
하지만 고객 등급별 데이터 수가 충분한지 확인해야 한다.
\`\`\`

---

### 18.10.3 카테고리별 주문 수와 매출 비교

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_summary
\`\`\`

매출과 주문 수를 비교합니다.

\`\`\`python
category_summary.plot(
    x="category",
    y=["total_sales", "order_count"],
    kind="bar"
)

plt.title("카테고리별 매출과 주문 수")
plt.xlabel("카테고리")
plt.ylabel("값")
plt.show()
\`\`\`

주의할 점은 매출과 주문 수의 단위가 다르다는 것입니다.  
같은 축에 그리면 해석이 어려울 수 있습니다.

따라서 보고서에서는 매출 그래프와 주문 수 그래프를 따로 그리거나, 표로 함께 보여주는 것이 더 적절할 수 있습니다.

---
`;export{e as default};