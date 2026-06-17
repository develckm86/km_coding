var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-21 -->

# 17.21 실무 미니 프로젝트: 주문 데이터 시각화 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 주문 데이터 시각화 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 월별 매출 추이를 선 그래프로 그린다.
3. 카테고리별 매출을 막대 그래프로 그린다.
4. 주문 금액 분포를 히스토그램으로 확인한다.
5. 고객 등급별 주문 금액 분포를 박스플롯으로 비교한다.
6. 방문 횟수와 주문 금액 관계를 산점도로 확인한다.
7. 수치형 변수 간 상관관계를 히트맵으로 확인한다.
8. 각 그래프에 대한 해석 문장을 작성한다.
\`\`\`

---

### 17.21.1 데이터 준비

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)

orders
\`\`\`

---

### 17.21.2 월별 매출 추이

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
월별 매출은 2월에 낮아진 뒤 3월과 4월에 회복되는 흐름을 보인다.
정확한 원인을 파악하려면 월별 주문 건수와 평균 주문 금액을 함께 확인해야 한다.
\`\`\`

---

### 17.21.3 카테고리별 매출

\`\`\`python
category_sales = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

plt.figure(figsize=(8, 4))

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높다.
전자기기는 단가가 높아 전체 매출에 크게 기여할 수 있다.
\`\`\`

---

### 17.21.4 주문 금액 분포

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
주문 금액은 낮은 금액대에 많이 분포하며, 일부 고가 주문이 존재할 수 있다.
평균 주문 금액을 해석할 때는 중앙값과 박스플롯도 함께 확인하는 것이 좋다.
\`\`\`

---

### 17.21.5 고객 등급별 주문 금액 분포

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

해석 문장 예시:

\`\`\`text
VIP 고객의 주문 금액 분포가 일반 고객보다 높은지 확인할 수 있다.
단, 등급별 데이터 수가 적으면 해석에 주의해야 한다.
\`\`\`

---

### 17.21.6 방문 횟수와 주문 금액 관계

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

해석 문장 예시:

\`\`\`text
방문 횟수가 많은 고객의 주문 금액이 높은 경향이 있는지 확인할 수 있다.
다만 산점도에서 보이는 관계는 인과관계를 의미하지 않는다.
\`\`\`

---

### 17.21.7 상관관계 히트맵

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
상관계수가 높은 변수 쌍은 함께 움직이는 경향이 있을 수 있다.
상관관계가 높은 변수는 산점도로 추가 확인하는 것이 좋다.
\`\`\`

---

### 17.21.8 시각화 리포트 구성 예시

분석 보고서에서는 다음과 같은 구조로 정리할 수 있습니다.

\`\`\`text
1. 분석 목적
   - 주문 데이터의 매출 흐름과 주요 패턴을 시각화한다.

2. 월별 매출 추이
   - 선 그래프
   - 해석 문장

3. 카테고리별 매출
   - 막대 그래프
   - 해석 문장

4. 주문 금액 분포
   - 히스토그램
   - 박스플롯
   - 해석 문장

5. 고객 등급별 주문 금액 비교
   - 박스플롯
   - 해석 문장

6. 방문 횟수와 주문 금액 관계
   - 산점도
   - 상관계수
   - 해석 문장

7. 결론
   - 핵심 패턴
   - 추가 확인이 필요한 점
\`\`\`

---

### 17.21.9 처리 기준 문서화

시각화 과정도 문서화할 수 있습니다.

\`\`\`text
시각화 기준
- 월별 매출은 order_date에서 추출한 year_month 기준으로 total_price 합계를 계산했다.
- 카테고리별 매출은 category 기준으로 total_price 합계를 계산하고 내림차순 정렬했다.
- 주문 금액 분포는 total_price를 기준으로 히스토그램과 박스플롯을 사용해 확인했다.
- 등급별 주문 금액 분포는 grade와 total_price를 사용해 박스플롯으로 비교했다.
- 방문 횟수와 주문 금액 관계는 visit_count와 total_price를 사용해 산점도로 확인했다.
- 상관관계 히트맵은 quantity, total_price, visit_count, satisfaction 컬럼을 사용했다.
\`\`\`

---
`;export{e as default};