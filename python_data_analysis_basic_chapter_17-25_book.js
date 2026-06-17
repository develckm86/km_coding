var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-25 -->

# 17.25 정답 및 해설

### 문제 1 정답

정답: A

시간 흐름에 따른 변화를 볼 때는 선 그래프가 적합합니다.  
월별 매출, 일별 방문자 수, 연도별 고객 수 같은 데이터를 표현할 때 사용합니다.

---

### 문제 2 정답

정답: B

카테고리처럼 범주별 크기를 비교할 때는 막대 그래프가 적합합니다.

---

### 문제 3 정답

\`\`\`python
plt.plot(monthly_sales["month"], monthly_sales["sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

또는 pandas plot을 사용할 수 있습니다.

\`\`\`python
monthly_sales.plot(
    x="month",
    y="sales",
    kind="line"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

---

### 문제 4 정답

\`\`\`python
plt.bar(category_sales["category"], category_sales["sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

막대 그래프는 범주별 값 비교에 적합합니다.

---

### 문제 5 정답

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

히스토그램은 수치형 데이터가 어느 구간에 많이 분포하는지 보여줍니다.

---

### 문제 6 정답

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

박스플롯은 그룹별 분포와 이상값 후보를 비교할 때 유용합니다.

---

### 문제 7 정답

\`\`\`python
plt.scatter(orders["visit_count"], orders["total_price"])

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

또는 seaborn을 사용할 수 있습니다.

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
corr_matrix = df[["quantity", "sales", "visit_count"]].corr()

sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("상관관계 히트맵")
plt.show()
\`\`\`

히트맵은 여러 수치형 변수 간 상관관계를 한눈에 확인할 때 유용합니다.

---

### 문제 9 정답

히스토그램은 수치형 데이터가 어떤 구간에 얼마나 분포하는지 확인할 때 사용합니다.  
예를 들어 주문 금액이 낮은 구간에 몰려 있는지, 고가 주문이 일부 존재하는지 확인할 수 있습니다.

박스플롯은 중앙값, 사분위수, 이상값 후보를 확인할 때 사용합니다.  
또한 고객 등급별 주문 금액처럼 그룹별 분포를 비교할 때 유용합니다.

---

### 문제 10 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)

monthly_sales = (
    orders
    .groupby("year_month")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

카테고리별 매출 막대 그래프:

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

주문 금액 분포 히스토그램:

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

방문 횟수와 주문 금액 산점도:

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

해석할 때는 다음을 함께 확인해야 합니다.

\`\`\`text
월별 매출이 증가 또는 감소하는가?
어떤 카테고리의 매출이 가장 큰가?
주문 금액은 어느 구간에 몰려 있는가?
방문 횟수와 주문 금액 사이에 관계가 있어 보이는가?
\`\`\`

---
`;export{e as default};