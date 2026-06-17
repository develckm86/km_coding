var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-8 -->

# 18.8 두 변수 관계 분석

두 변수 관계 분석은 변수 간 연결성을 확인하는 과정입니다.

---

### 18.8.1 수치형과 수치형: 방문 횟수와 주문 금액

방문 횟수와 주문 금액의 관계를 확인합니다.

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

산점도를 그립니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
방문 횟수가 높은 주문에서 주문 금액도 높은 경향이 있는지 확인할 수 있다.
하지만 상관관계는 인과관계를 의미하지 않는다.
방문 횟수가 높은 고객이 원래 구매 의향이 높은 고객일 수도 있다.
\`\`\`

---

### 18.8.2 수치형과 수치형: 만족도와 주문 금액

만족도와 주문 금액의 관계를 확인합니다.

\`\`\`python
orders["satisfaction"].corr(orders["total_price"])
\`\`\`

산점도를 그립니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="satisfaction",
    y="total_price"
)

plt.title("만족도와 주문 금액의 관계")
plt.xlabel("만족도")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

만족도는 1~5점의 제한된 값이므로 산점도에서 점이 겹칠 수 있습니다.  
이런 경우 등급별 평균 주문 금액을 함께 보는 것이 좋습니다.

\`\`\`python
orders.groupby("satisfaction")["total_price"].mean()
\`\`\`

---

### 18.8.3 범주형과 수치형: 고객 등급별 주문 금액

고객 등급별 평균 주문 금액을 계산합니다.

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        total_sales=("total_price", "sum")
    )
    .reset_index()
)

grade_summary
\`\`\`

박스플롯으로 분포를 비교합니다.

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
VIP 고객의 주문 금액이 일반 고객보다 높게 나타날 수 있다.
다만 평균뿐 아니라 중앙값과 데이터 개수도 함께 확인해야 한다.
\`\`\`

---

### 18.8.4 범주형과 수치형: 카테고리별 매출

카테고리별 매출을 계산합니다.

\`\`\`python
category_sales = (
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

category_sales
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높다.
전자기기는 단가가 높아 주문 수가 많지 않아도 매출 기여도가 클 수 있다.
주문 건수와 평균 주문 금액을 함께 확인하면 매출 차이의 원인을 더 잘 이해할 수 있다.
\`\`\`

---

### 18.8.5 범주형과 범주형: 지역과 고객 등급

지역별 고객 등급 분포를 확인합니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

비율로도 확인합니다.

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio.round(1)
\`\`\`

해석 예시:

\`\`\`text
지역별로 VIP와 일반 고객의 비율이 다를 수 있다.
하지만 각 지역의 주문 수가 적다면 비율 해석에 주의해야 한다.
\`\`\`

범주형 변수의 관계를 해석할 때는 개수와 비율을 함께 봐야 합니다.

---
`;export{e as default};