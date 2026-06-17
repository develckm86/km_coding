var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-10 -->

# 11.10 실무 미니 프로젝트: 주문 데이터 품질 점검하기

이번 장에서 배운 내용을 하나로 묶어 주문 데이터의 중복값과 이상값을 점검해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 주문번호 기준 중복을 확인한다.
3. 중복된 주문번호를 검토한다.
4. 주문번호 기준 중복을 제거한다.
5. 주문 금액의 이상값 후보를 IQR 기준으로 찾는다.
6. 이상값 여부 컬럼을 추가한다.
7. 이상값 포함 평균과 제외 평균을 비교한다.
8. 처리 기준을 문서화한다.
\`\`\`

---

### 11.10.1 데이터 준비

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009],
    "customer": ["민수", "지영", "지영", "철수", "영희", "수진", "현우", "도윤", "서연", "하준"],
    "category": ["전자기기", "도서", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "quantity": [1, 3, 3, 2, 1, 5, 4, 1, 2, 100],
    "unit_price": [300000, 15000, 15000, 10000, 200000, 12000, 8000, 5000000, 18000, 9000]
})

orders["total_price"] = orders["quantity"] * orders["unit_price"]

orders
\`\`\`

---

### 11.10.2 주문번호 기준 중복 확인

\`\`\`python
duplicate_orders = orders[orders.duplicated(subset=["order_id"], keep=False)]

duplicate_orders
\`\`\`

\`keep=False\`를 사용했기 때문에 중복 그룹에 속한 모든 행을 함께 확인할 수 있습니다.

중복 개수도 확인합니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

---

### 11.10.3 중복 제거

이번 예제에서는 \`order_id\`가 같은 행이 완전히 같은 중복이라고 가정하고 첫 번째 행만 남기겠습니다.

\`\`\`python
orders_no_dup = orders.drop_duplicates(
    subset=["order_id"],
    keep="first",
    ignore_index=True
)

orders_no_dup
\`\`\`

중복 제거 결과를 확인합니다.

\`\`\`python
orders_no_dup.duplicated(subset=["order_id"]).sum()
\`\`\`

결과가 0이면 주문번호 기준 중복이 제거된 것입니다.

---

### 11.10.4 주문 금액 요약 통계 확인

\`\`\`python
orders_no_dup["total_price"].describe()
\`\`\`

평균, 중앙값, 최댓값을 확인합니다.

\`\`\`python
mean_price = orders_no_dup["total_price"].mean()
median_price = orders_no_dup["total_price"].median()
max_price = orders_no_dup["total_price"].max()

mean_price, median_price, max_price
\`\`\`

평균과 중앙값이 크게 차이 난다면 큰 값이 평균을 끌어올리고 있을 가능성이 있습니다.

---

### 11.10.5 IQR 기준 이상값 후보 찾기

\`\`\`python
q1 = orders_no_dup["total_price"].quantile(0.25)
q3 = orders_no_dup["total_price"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

lower_bound, upper_bound
\`\`\`

상한과 하한을 벗어나는 행을 찾습니다.

\`\`\`python
outliers = orders_no_dup[
    (orders_no_dup["total_price"] < lower_bound) |
    (orders_no_dup["total_price"] > upper_bound)
]

outliers
\`\`\`

---

### 11.10.6 이상값 여부 컬럼 추가

이상값을 바로 제거하지 않고 먼저 표시해두겠습니다.

\`\`\`python
orders_checked = orders_no_dup.copy()

orders_checked["is_outlier_total_price"] = (
    (orders_checked["total_price"] < lower_bound) |
    (orders_checked["total_price"] > upper_bound)
)

orders_checked
\`\`\`

이렇게 하면 이상값 후보를 유지하면서도 따로 구분할 수 있습니다.

---

### 11.10.7 이상값 포함 평균과 제외 평균 비교

\`\`\`python
mean_with_outliers = orders_checked["total_price"].mean()

mean_without_outliers = orders_checked.loc[
    ~orders_checked["is_outlier_total_price"],
    "total_price"
].mean()

mean_with_outliers, mean_without_outliers
\`\`\`

두 값을 비교하면 이상값이 평균에 얼마나 영향을 주는지 확인할 수 있습니다.

\`\`\`python
summary = pd.DataFrame({
    "case": ["이상값 포함", "이상값 제외"],
    "mean_total_price": [mean_with_outliers, mean_without_outliers]
})

summary
\`\`\`

---

### 11.10.8 품질 점검 결과 정리

마지막으로 데이터 품질 점검 결과를 정리합니다.

\`\`\`python
quality_summary = {
    "원본 행 수": len(orders),
    "중복 제거 후 행 수": len(orders_no_dup),
    "제거된 중복 행 수": len(orders) - len(orders_no_dup),
    "이상값 후보 수": orders_checked["is_outlier_total_price"].sum(),
    "이상값 포함 평균 주문 금액": mean_with_outliers,
    "이상값 제외 평균 주문 금액": mean_without_outliers
}

quality_summary
\`\`\`

이런 요약은 보고서나 분석 노트북에 남기기 좋습니다.

---

### 11.10.9 처리 기준 문서화

분석 과정에는 다음과 같이 기록할 수 있습니다.

\`\`\`text
중복값 처리 기준
- order_id를 기준으로 중복을 확인했다.
- 중복된 order_id가 1건 발견되었다.
- 중복 행이 동일한 주문으로 판단되어 첫 번째 행만 남겼다.

이상값 처리 기준
- total_price를 기준으로 IQR 방식의 이상값 후보를 탐지했다.
- 이상값 후보는 즉시 제거하지 않고 is_outlier_total_price 컬럼으로 표시했다.
- 평균 주문 금액은 이상값 포함/제외 두 가지 기준으로 비교했다.
- 이상값 후보는 원본 확인 후 최종 제거 여부를 결정한다.
\`\`\`

이렇게 기준을 남기면 분석 결과의 신뢰도를 높일 수 있습니다.

---
`;export{e as default};