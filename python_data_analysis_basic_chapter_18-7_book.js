var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-7 -->

# 18.7 단일 변수 분석

단일 변수 분석은 하나의 컬럼을 집중적으로 살펴보는 것입니다.

수치형 변수와 범주형 변수는 분석 방법이 다릅니다.

---

### 18.7.1 수치형 변수 분석: 주문 금액

주문 금액의 기본 통계를 확인합니다.

\`\`\`python
orders["total_price"].describe()
\`\`\`

평균과 중앙값을 비교합니다.

\`\`\`python
orders["total_price"].mean()
orders["total_price"].median()
\`\`\`

평균이 중앙값보다 크다면 일부 고가 주문이 평균을 끌어올리고 있을 수 있습니다.

히스토그램으로 분포를 확인합니다.

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

박스플롯으로 이상값 후보를 확인합니다.

\`\`\`python
sns.boxplot(
    data=orders,
    y="total_price"
)

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
주문 금액은 낮은 금액대에 많이 분포하고, 일부 고가 주문이 존재한다.
평균 주문 금액은 고가 주문의 영향을 받을 수 있으므로 중앙값도 함께 확인해야 한다.
\`\`\`

---

### 18.7.2 수치형 변수 분석: 방문 횟수

방문 횟수의 기본 통계를 확인합니다.

\`\`\`python
orders["visit_count"].describe()
\`\`\`

분포를 확인합니다.

\`\`\`python
plt.hist(orders["visit_count"], bins=5)

plt.title("방문 횟수 분포")
plt.xlabel("방문 횟수")
plt.ylabel("빈도")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
방문 횟수는 고객의 관심도나 활동성을 나타내는 지표로 볼 수 있다.
방문 횟수가 높은 고객이 실제로 높은 구매 금액을 보이는지는 두 변수 관계 분석에서 추가로 확인해야 한다.
\`\`\`

---

### 18.7.3 수치형 변수 분석: 만족도

만족도 점수의 분포를 확인합니다.

\`\`\`python
orders["satisfaction"].value_counts().sort_index()
\`\`\`

만족도는 숫자형이지만 1점부터 5점까지의 등급형 데이터로 볼 수 있습니다.  
따라서 평균뿐 아니라 점수별 빈도도 중요합니다.

\`\`\`python
satisfaction_count = orders["satisfaction"].value_counts().sort_index()

plt.bar(satisfaction_count.index, satisfaction_count.values)

plt.title("만족도 점수 분포")
plt.xlabel("만족도")
plt.ylabel("건수")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
만족도는 3점에서 5점 사이에 분포한다.
5점 비중이 높다면 전반적인 만족도가 높다고 볼 수 있지만, 데이터 수가 적으므로 일반화에는 주의해야 한다.
\`\`\`

---

### 18.7.4 범주형 변수 분석: 카테고리

카테고리별 주문 수를 확인합니다.

\`\`\`python
orders["category"].value_counts()
\`\`\`

비율도 확인합니다.

\`\`\`python
orders["category"].value_counts(normalize=True) * 100
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
category_count = orders["category"].value_counts()

plt.bar(category_count.index, category_count.values)

plt.title("카테고리별 주문 수")
plt.xlabel("카테고리")
plt.ylabel("주문 수")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
카테고리별 주문 수를 보면 어떤 카테고리의 주문이 많은지 확인할 수 있다.
다만 주문 수가 많다고 매출이 가장 높다는 뜻은 아니다.
단가가 높은 카테고리는 주문 수가 적어도 매출이 클 수 있다.
\`\`\`

---

### 18.7.5 범주형 변수 분석: 지역

지역별 주문 수를 확인합니다.

\`\`\`python
orders["region"].value_counts()
\`\`\`

지역별 비율을 계산합니다.

\`\`\`python
region_ratio = orders["region"].value_counts(normalize=True) * 100

region_ratio.round(1)
\`\`\`

해석 예시:

\`\`\`text
서울 지역 주문 수가 가장 많다.
하지만 지역별 고객 수나 마케팅 노출량을 함께 보지 않으면 지역 성과를 단정하기 어렵다.
\`\`\`

EDA에서는 결과를 단정하기보다 추가로 필요한 데이터를 함께 생각해야 합니다.

---
`;export{e as default};