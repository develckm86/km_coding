var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-15 -->

# 14.15 실무 미니 프로젝트: 주문 데이터 요약 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 주문 데이터 요약 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 카테고리별 매출 요약표를 만든다.
3. 월별 매출 요약표를 만든다.
4. 지역별 카테고리 매출 피벗 테이블을 만든다.
5. 지역별 고객 등급 비율표를 만든다.
6. 전체 매출 대비 카테고리별 비중을 계산한다.
7. 분석 결과를 간단히 해석한다.
\`\`\`

---

### 14.15.1 데이터 준비

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "customer": ["민수", "지영", "철수", "민수", "영희", "지영", "수진", "현우", "도윤", "서연", "철수", "수진"],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")

orders
\`\`\`

---

### 14.15.2 카테고리별 매출 요약표

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_report["avg_order_price"] = category_report["avg_order_price"].round(0)

total_sales = category_report["total_sales"].sum()
category_report["sales_ratio_percent"] = (
    category_report["total_sales"] / total_sales * 100
).round(1)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

---

### 14.15.3 월별 매출 요약표

\`\`\`python
monthly_report = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_report["avg_order_price"] = monthly_report["avg_order_price"].round(0)

monthly_report
\`\`\`

---

### 14.15.4 지역별 카테고리 매출 피벗 테이블

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot
\`\`\`

---

### 14.15.5 지역별 고객 등급 비율표

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio = region_grade_ratio.round(1)

region_grade_ratio
\`\`\`

---

### 14.15.6 분석 결과 해석 예시

분석 결과는 단순히 표를 만드는 것으로 끝나지 않습니다.  
표를 보고 해석 문장을 작성해야 합니다.

예를 들어 다음과 같이 정리할 수 있습니다.

\`\`\`text
카테고리별 매출 요약 결과, 전자기기 카테고리의 총매출이 가장 높았다.
전자기기는 주문 건수는 많지 않더라도 평균 주문 금액이 높아 전체 매출 기여도가 크다.
월별 매출에서는 4월 매출이 높게 나타났으며, 이는 전자기기 주문의 영향으로 보인다.
지역별 카테고리 피벗 테이블을 보면 서울 지역에서 전자기기 매출 비중이 높다.
지역별 고객 등급 비율을 보면 부산은 VIP 주문 비율이 상대적으로 높게 나타난다.
\`\`\`

다만 실제 분석에서는 데이터 크기와 표본 수를 함께 고려해야 합니다.  
예제 데이터처럼 작은 데이터에서는 결과를 일반화하면 안 됩니다.

---

### 14.15.7 처리 기준 문서화

분석 노트북이나 보고서에는 다음과 같이 기준을 남길 수 있습니다.

\`\`\`text
그룹화와 집계 기준
- 카테고리별 매출은 category 기준으로 total_price 합계를 계산했다.
- 주문 건수는 order_id의 count로 계산했다.
- 고유 고객 수는 customer_id의 nunique로 계산했다.
- 월별 분석은 order_date에서 추출한 year_month 기준으로 수행했다.
- 지역별 카테고리 매출표는 pivot_table을 사용해 작성했다.
- 지역별 등급 비율은 crosstab의 normalize="index"를 사용했다.
- 매출 비중은 카테고리별 매출을 전체 매출로 나누어 계산했다.
\`\`\`

기준을 남기면 같은 분석을 반복하거나 다른 사람에게 설명하기 쉽습니다.

---
`;export{e as default};