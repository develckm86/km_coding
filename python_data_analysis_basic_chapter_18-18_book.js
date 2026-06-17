var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-18 -->

# 18.18 정답 및 해설

### 문제 1 정답

정답: B

EDA는 데이터를 탐색하며 구조, 품질, 패턴, 관계를 이해하는 과정입니다.  
그래프를 그리는 것도 EDA의 일부이지만, EDA가 시각화만 의미하는 것은 아닙니다.

---

### 문제 2 정답

정답: D

EDA 초반에는 데이터 구조, 자료형, 결측치, 중복값 등을 확인합니다.  
최종 사업 전략은 EDA 이후 더 많은 분석과 논의를 거쳐 결정해야 합니다.

---

### 문제 3 정답

\`\`\`python
df.shape
df.info()
df.describe()
\`\`\`

추가로 앞부분 데이터를 확인하려면 다음을 사용할 수 있습니다.

\`\`\`python
df.head()
\`\`\`

---

### 문제 4 정답

\`\`\`python
df.isna().sum()
df.duplicated().sum()
\`\`\`

특정 ID 기준 중복을 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
df.duplicated(subset=["id"]).sum()
\`\`\`

---

### 문제 5 정답

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

category_sales
\`\`\`

---

### 문제 6 정답

\`\`\`python
grade_avg = (
    orders
    .groupby("grade")["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
)

grade_avg
\`\`\`

---

### 문제 7 정답

상관계수:

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

산점도:

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

---

### 문제 8 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")

monthly_sales = (
    orders
    .groupby("year_month")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_sales
\`\`\`

---

### 문제 9 정답

EDA 결과 정리에는 다음 항목을 포함할 수 있습니다.

\`\`\`text
데이터 개요
데이터 품질 이슈
주요 통계 요약
주요 패턴
이상값 또는 특이점
추가 분석 질문
분석 한계
\`\`\`

---

### 문제 10 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")
\`\`\`

데이터 구조 확인:

\`\`\`python
orders.head()
orders.shape
orders.info()
orders.describe()
\`\`\`

결측치와 중복값 확인:

\`\`\`python
orders.isna().sum()
orders.duplicated().sum()
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

카테고리별 매출:

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

고객 등급별 평균 주문 금액:

\`\`\`python
grade_avg = (
    orders
    .groupby("grade")["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
)

grade_avg
\`\`\`

월별 매출:

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_sales
\`\`\`

방문 횟수와 주문 금액 산점도:

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높게 나타나며, 전체 매출에 큰 영향을 주는 것으로 보인다.
VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타날 수 있다.
방문 횟수가 높은 고객의 주문 금액이 높은 경향이 있는지 산점도로 추가 확인할 수 있다.
다만 데이터 수가 적으므로 결과를 일반화하기에는 한계가 있다.
\`\`\`

---
`;export{e as default};