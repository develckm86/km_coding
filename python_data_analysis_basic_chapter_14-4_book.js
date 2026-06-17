var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-4 -->

# 14.4 주요 집계 함수

그룹화 후에는 다양한 집계 함수를 사용할 수 있습니다.

대표적인 함수는 다음과 같습니다.

| 함수 | 의미 |
|---|---|
| \`sum()\` | 합계 |
| \`mean()\` | 평균 |
| \`median()\` | 중앙값 |
| \`count()\` | 결측치가 아닌 값 개수 |
| \`size()\` | 행 개수 |
| \`min()\` | 최솟값 |
| \`max()\` | 최댓값 |
| \`nunique()\` | 고유값 개수 |
| \`std()\` | 표준편차 |

---

### 14.4.1 합계: \`sum()\`

지역별 매출 합계를 계산해보겠습니다.

\`\`\`python
region_sales = (
    orders
    .groupby("region")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

매출 합계는 가장 많이 사용하는 집계 중 하나입니다.

---

### 14.4.2 평균: \`mean()\`

지역별 평균 주문 금액을 계산합니다.

\`\`\`python
region_avg_order = (
    orders
    .groupby("region")["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
    .sort_values(by="avg_order_price", ascending=False)
)

region_avg_order
\`\`\`

평균은 그룹의 일반적인 수준을 파악할 때 사용합니다.  
다만 이상값이 있으면 평균이 크게 흔들릴 수 있으므로 중앙값과 함께 보는 것이 좋습니다.

---

### 14.4.3 중앙값: \`median()\`

지역별 중앙 주문 금액을 계산합니다.

\`\`\`python
region_median_order = (
    orders
    .groupby("region")["total_price"]
    .median()
    .reset_index(name="median_order_price")
    .sort_values(by="median_order_price", ascending=False)
)

region_median_order
\`\`\`

중앙값은 이상값의 영향을 평균보다 덜 받습니다.  
주문 금액처럼 일부 큰 값이 있을 수 있는 데이터에서는 평균과 중앙값을 함께 확인하는 것이 좋습니다.

---

### 14.4.4 최솟값과 최댓값

카테고리별 최소 주문 금액과 최대 주문 금액을 확인합니다.

\`\`\`python
category_min_price = (
    orders
    .groupby("category")["total_price"]
    .min()
    .reset_index(name="min_order_price")
)

category_max_price = (
    orders
    .groupby("category")["total_price"]
    .max()
    .reset_index(name="max_order_price")
)

category_min_price
category_max_price
\`\`\`

최솟값과 최댓값은 이상값이나 극단값을 확인할 때 유용합니다.

---

### 14.4.5 고유값 개수: \`nunique()\`

지역별 고유 고객 수를 계산해보겠습니다.

\`\`\`python
region_customer_count = (
    orders
    .groupby("region")["customer_id"]
    .nunique()
    .reset_index(name="unique_customers")
    .sort_values(by="unique_customers", ascending=False)
)

region_customer_count
\`\`\`

\`nunique()\`는 중복을 제거한 고유값 개수를 계산합니다.

주문 데이터에서는 같은 고객이 여러 번 주문할 수 있습니다.  
따라서 고객 수를 알고 싶다면 단순 주문 건수가 아니라 고유 고객 수를 계산해야 합니다.

---

### 14.4.6 여러 집계 결과 비교하기

지역별 주문 건수, 고유 고객 수, 총 매출, 평균 주문 금액을 각각 계산할 수 있습니다.  
하지만 실무에서는 이런 결과를 하나의 요약표로 만드는 경우가 많습니다.

이럴 때는 다음 절에서 배울 \`agg()\`를 사용합니다.

---
`;export{e as default};