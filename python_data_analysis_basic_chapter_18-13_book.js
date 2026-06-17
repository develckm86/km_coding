var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-13 -->

# 18.13 실무 미니 프로젝트: 쇼핑몰 주문 데이터 EDA

이번 장에서 배운 내용을 하나의 프로젝트 흐름으로 정리해보겠습니다.

프로젝트 목표는 다음과 같습니다.

\`\`\`text
쇼핑몰 주문 데이터를 탐색해 매출 구조, 고객 특성, 카테고리별 성과, 시간 흐름을 파악한다.
\`\`\`

---

### 18.13.1 데이터 준비

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [
        1001, 1002, 1003, 1004, 1005, 1006,
        1007, 1008, 1009, 1010, 1011, 1012,
        1013, 1014, 1015
    ],
    "customer_id": [
        1, 2, 3, 1, 4, 2,
        5, 6, 7, 8, 3, 5,
        9, 10, 2
    ],
    "customer_name": [
        "민수", "지영", "철수", "민수", "영희", "지영",
        "수진", "현우", "도윤", "서연", "철수", "수진",
        "하준", "유나", "지영"
    ],
    "region": [
        "서울", "부산", "서울", "서울", "대전", "부산",
        "부산", "서울", "대전", "서울", "서울", "부산",
        "대전", "서울", "부산"
    ],
    "grade": [
        "VIP", "일반", "일반", "VIP", "일반", "일반",
        "VIP", "일반", "일반", "VIP", "일반", "VIP",
        "일반", "VIP", "일반"
    ],
    "category": [
        "전자기기", "도서", "생활용품", "전자기기", "도서",
        "생활용품", "전자기기", "도서", "생활용품", "전자기기",
        "도서", "생활용품", "전자기기", "도서", "전자기기"
    ],
    "order_date": [
        "2026-01-03", "2026-01-05", "2026-01-10",
        "2026-02-02", "2026-02-14", "2026-03-01",
        "2026-03-15", "2026-03-20", "2026-03-22",
        "2026-04-01", "2026-04-05", "2026-04-08",
        "2026-04-15", "2026-04-20", "2026-04-25"
    ],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2, 1, 2, 1],
    "total_price": [
        300000, 45000, 50000, 220000, 35000,
        60000, 180000, 30000, 75000, 260000,
        54000, 40000, 350000, 42000, 280000
    ],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10, 8, 11, 5],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5, 4, 5, 4]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date"].dt.day_name()

orders
\`\`\`

---

### 18.13.2 1단계: 데이터 개요 확인

\`\`\`python
orders.head()
orders.shape
orders.info()
orders.describe()
\`\`\`

데이터 개요를 정리합니다.

\`\`\`python
overview = {
    "행 수": len(orders),
    "열 수": orders.shape[1],
    "시작일": orders["order_date"].min(),
    "종료일": orders["order_date"].max(),
    "총매출": orders["total_price"].sum(),
    "평균 주문 금액": orders["total_price"].mean(),
    "고유 고객 수": orders["customer_id"].nunique()
}

overview
\`\`\`

---

### 18.13.3 2단계: 데이터 품질 점검

결측치 확인:

\`\`\`python
missing_summary = orders.isna().sum()

missing_summary
\`\`\`

중복값 확인:

\`\`\`python
duplicate_count = orders.duplicated(subset=["order_id"]).sum()

duplicate_count
\`\`\`

범주형 값 확인:

\`\`\`python
orders["region"].value_counts()
orders["grade"].value_counts()
orders["category"].value_counts()
\`\`\`

수치형 범위 확인:

\`\`\`python
orders[["quantity", "total_price", "visit_count", "satisfaction"]].describe()
\`\`\`

---

### 18.13.4 3단계: 전체 매출 구조 확인

전체 매출과 평균 주문 금액을 확인합니다.

\`\`\`python
total_sales = orders["total_price"].sum()
avg_order_price = orders["total_price"].mean()
median_order_price = orders["total_price"].median()

total_sales, avg_order_price, median_order_price
\`\`\`

주문 금액 분포를 확인합니다.

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

박스플롯도 확인합니다.

\`\`\`python
sns.boxplot(data=orders, y="total_price")

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

---

### 18.13.5 4단계: 카테고리별 성과 분석

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_summary
\`\`\`

그래프로 표현합니다.

\`\`\`python
plt.bar(category_summary["category"], category_summary["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높다.
전자기기는 평균 주문 금액도 높을 가능성이 있으므로 주문 건수와 평균 주문 금액을 함께 확인해야 한다.
\`\`\`

---

### 18.13.6 5단계: 고객 등급별 분석

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        avg_visit_count=("visit_count", "mean"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_summary
\`\`\`

박스플롯으로 주문 금액 분포를 비교합니다.

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
VIP 고객의 평균 주문 금액과 방문 횟수가 일반 고객보다 높게 나타날 수 있다.
다만 등급별 주문 건수와 고유 고객 수를 함께 확인해야 한다.
\`\`\`

---

### 18.13.7 6단계: 지역별 분석

\`\`\`python
region_summary = (
    orders
    .groupby("region")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

region_summary
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(region_summary["region"], region_summary["total_sales"])

plt.title("지역별 매출")
plt.xlabel("지역")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
서울 지역 매출이 가장 높게 나타난다.
그러나 서울 주문 수가 많기 때문인지, 평균 주문 금액이 높기 때문인지 추가 확인이 필요하다.
\`\`\`

---

### 18.13.8 7단계: 월별 매출 흐름 분석

\`\`\`python
monthly_summary = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_summary
\`\`\`

선 그래프로 표현합니다.

\`\`\`python
plt.plot(monthly_summary["year_month"], monthly_summary["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
월별 매출 흐름에서 특정 월의 매출 증가가 관찰된다면,
그 원인이 주문 수 증가인지 평균 주문 금액 증가인지 함께 확인해야 한다.
\`\`\`

---

### 18.13.9 8단계: 방문 횟수와 주문 금액 관계

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

산점도를 그립니다.

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
방문 횟수가 높은 고객일수록 주문 금액이 높은 경향이 있을 수 있다.
하지만 이것은 인과관계가 아니며, VIP 등급 같은 다른 요인이 함께 작용했을 수 있다.
\`\`\`

---

### 18.13.10 9단계: 상관관계 확인

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

corr_matrix
\`\`\`

히트맵을 그립니다.

\`\`\`python
sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
상관관계가 높은 변수 쌍은 추가 분석 후보가 될 수 있다.
하지만 상관관계는 인과관계를 의미하지 않으므로 해석에 주의해야 한다.
\`\`\`

---

### 18.13.11 10단계: EDA 요약 작성

EDA 결과를 문장으로 정리합니다.

\`\`\`text
데이터 개요
- 분석 데이터는 2026년 1월부터 4월까지의 쇼핑몰 주문 데이터이다.
- 총 15건의 주문과 10명의 고객이 포함되어 있다.

데이터 품질
- 주요 컬럼에서 결측치는 발견되지 않았다.
- order_id 기준 중복 주문은 발견되지 않았다.
- order_date는 날짜형으로 변환했다.

주요 패턴
- 전자기기 카테고리의 매출이 가장 높게 나타난다.
- VIP 고객의 평균 주문 금액과 방문 횟수가 일반 고객보다 높게 나타날 수 있다.
- 서울 지역 매출이 가장 높지만, 주문 수와 고객 수를 함께 고려해야 한다.
- 월별 매출은 특정 월에 높아지는 흐름이 관찰된다.
- 방문 횟수와 주문 금액 사이에 양의 관계가 있을 수 있다.

추가 분석 질문
- 전자기기 매출이 높은 이유는 주문 수 때문인가, 평균 주문 금액 때문인가?
- VIP 고객은 어떤 카테고리를 주로 구매하는가?
- 방문 횟수가 높은 고객은 재구매 가능성도 높은가?
- 서울 지역 매출이 높은 이유는 고객 수 때문인가, 평균 주문 금액 때문인가?

분석 한계
- 예제 데이터의 행 수가 적어 결과를 일반화하기 어렵다.
- 할인 여부, 광고비, 유입 경로 같은 외부 요인이 포함되어 있지 않다.
- 상관관계는 인과관계를 의미하지 않는다.
\`\`\`

---
`;export{e as default};