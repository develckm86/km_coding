var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-11 -->

# 16.11 그룹별 통계

전체 데이터의 평균도 중요하지만, 그룹별 평균과 분포를 보는 것도 중요합니다.

예를 들어 전체 평균 주문 금액이 125,500원이라고 해도, VIP 고객과 일반 고객의 평균이 크게 다를 수 있습니다.

---

### 16.11.1 고객 등급별 평균 주문 금액

\`\`\`python
grade_price_summary = (
    orders
    .groupby("grade")
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median")
    )
    .reset_index()
)

grade_price_summary
\`\`\`

이 결과를 보면 VIP와 일반 고객의 주문 금액 차이를 확인할 수 있습니다.

평균과 중앙값을 함께 보는 것이 중요합니다.  
일부 큰 주문이 평균을 끌어올릴 수 있기 때문입니다.

---

### 16.11.2 지역별 통계 요약

지역별 주문 금액 통계를 계산해보겠습니다.

\`\`\`python
region_price_summary = (
    orders
    .groupby("region")
    .agg(
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        min_order_price=("total_price", "min"),
        max_order_price=("total_price", "max")
    )
    .reset_index()
)

region_price_summary
\`\`\`

이 요약표는 지역별 주문 금액의 특징을 보여줍니다.

---

### 16.11.3 그룹별 표준편차

그룹별로 값이 얼마나 퍼져 있는지 확인하려면 표준편차를 계산할 수 있습니다.

\`\`\`python
region_std_summary = (
    orders
    .groupby("region")["total_price"]
    .std()
    .reset_index(name="std_order_price")
)

region_std_summary
\`\`\`

표준편차가 큰 지역은 주문 금액의 차이가 큰 지역입니다.  
표준편차가 작은 지역은 주문 금액이 비교적 비슷한 지역입니다.

다만 그룹별 데이터 수가 너무 적으면 표준편차 해석이 불안정할 수 있습니다.

---
`;export{e as default};