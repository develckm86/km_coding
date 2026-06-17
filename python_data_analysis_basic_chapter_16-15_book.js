var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-15 -->

# 16.15 실무 미니 프로젝트: 주문 데이터 기본 통계 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 기본 통계 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 수치형 컬럼의 기본 통계를 확인한다.
3. 주문 금액의 평균, 중앙값, 표준편차, 사분위수를 계산한다.
4. 지역별 주문 수와 비율을 계산한다.
5. 고객 등급별 주문 금액 요약표를 만든다.
6. 주요 수치형 변수의 상관관계를 확인한다.
7. 분석 결과를 간단히 해석한다.
\`\`\`

---

### 16.15.1 데이터 준비

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP"],
    "age": [34, 28, 41, 34, 25, 28, 39, 45, 31, 52],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5]
})

orders
\`\`\`

---

### 16.15.2 수치형 컬럼 기본 통계

\`\`\`python
numeric_columns = ["age", "quantity", "total_price", "visit_count", "satisfaction"]

numeric_summary = orders[numeric_columns].describe()

numeric_summary
\`\`\`

이 표를 통해 수치형 컬럼의 평균, 표준편차, 최솟값, 사분위수, 최댓값을 확인합니다.

---

### 16.15.3 주문 금액 상세 요약

\`\`\`python
q1 = orders["total_price"].quantile(0.25)
q3 = orders["total_price"].quantile(0.75)
iqr = q3 - q1

price_summary = pd.DataFrame({
    "metric": [
        "주문 수",
        "평균 주문 금액",
        "중앙값",
        "최솟값",
        "최댓값",
        "범위",
        "표준편차",
        "1사분위수",
        "3사분위수",
        "IQR"
    ],
    "value": [
        orders["total_price"].count(),
        orders["total_price"].mean(),
        orders["total_price"].median(),
        orders["total_price"].min(),
        orders["total_price"].max(),
        orders["total_price"].max() - orders["total_price"].min(),
        orders["total_price"].std(),
        q1,
        q3,
        iqr
    ]
})

price_summary
\`\`\`

---

### 16.15.4 지역별 빈도와 비율

\`\`\`python
region_count = orders["region"].value_counts()
region_ratio = orders["region"].value_counts(normalize=True) * 100

region_summary = pd.DataFrame({
    "count": region_count,
    "ratio_percent": region_ratio.round(1)
})

region_summary
\`\`\`

---

### 16.15.5 고객 등급별 주문 금액 요약

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        std_order_price=("total_price", "std"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_summary = grade_summary.round({
    "avg_order_price": 0,
    "median_order_price": 0,
    "std_order_price": 0,
    "avg_satisfaction": 1
})

grade_summary
\`\`\`

---

### 16.15.6 상관관계 확인

\`\`\`python
corr_matrix = orders[numeric_columns].corr()

corr_matrix
\`\`\`

주문 금액과 다른 변수의 상관관계를 따로 확인합니다.

\`\`\`python
corr_with_price = (
    corr_matrix["total_price"]
    .drop("total_price")
    .sort_values(ascending=False)
)

corr_with_price
\`\`\`

---

### 16.15.7 결과 해석 예시

분석 결과를 다음과 같이 정리할 수 있습니다.

\`\`\`text
주문 금액의 평균과 중앙값을 비교해보면 평균이 더 높게 나타난다.
이는 일부 고가 주문이 평균을 끌어올리고 있을 가능성을 의미한다.

지역별 주문 분포를 보면 서울 주문 비중이 가장 높다.
다만 예제 데이터의 행 수가 적으므로 실제 의사결정에는 더 많은 데이터가 필요하다.

고객 등급별 요약 결과, VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타난다.
또한 VIP 고객의 평균 만족도도 높게 나타날 수 있다.

방문 횟수와 주문 금액의 상관관계가 양수라면 방문 횟수가 많은 고객일수록 구매 금액이 높은 경향이 있을 수 있다.
하지만 상관관계는 인과관계를 의미하지 않으므로 추가 분석이 필요하다.
\`\`\`

---

### 16.15.8 처리 기준 문서화

분석 노트북이나 보고서에는 다음처럼 기준을 남길 수 있습니다.

\`\`\`text
기본 통계 분석 기준
- 수치형 컬럼은 age, quantity, total_price, visit_count, satisfaction으로 정의했다.
- 주문 금액은 평균, 중앙값, 표준편차, 사분위수, IQR로 요약했다.
- 지역 분포는 value_counts와 normalize=True를 사용해 빈도와 비율을 계산했다.
- 고객 등급별 비교는 grade 기준 groupby로 수행했다.
- 상관관계는 수치형 컬럼을 대상으로 corr()를 사용해 계산했다.
- 상관관계는 인과관계로 해석하지 않았다.
\`\`\`

---
`;export{e as default};