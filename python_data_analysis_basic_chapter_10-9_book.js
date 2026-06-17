var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-9 -->

# 10.9 실무 미니 프로젝트: 주문 데이터 결측치 처리하기

이번 장에서 배운 내용을 이용해 주문 데이터를 정리해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 빈 문자열을 결측치로 변환한다.
3. 컬럼별 결측치 개수와 비율을 확인한다.
4. 지역과 카테고리 결측치를 별도 값으로 대체한다.
5. 수량과 단가가 없는 행은 주문 금액 분석에서 제외한다.
6. 쿠폰 금액 결측치는 0으로 대체한다.
7. 최종 주문 금액을 계산한다.
8. 처리 결과를 요약한다.
\`\`\`

---

### 10.9.1 데이터 준비

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008],
    "customer": ["민수", "지영", "철수", None, "수진", "현우", "영희", "도윤"],
    "region": ["서울", "부산", "", "서울", None, "대전", "부산", " "],
    "category": ["전자기기", "도서", None, "생활용품", "전자기기", "", "도서", "생활용품"],
    "quantity": [1, 3, 2, None, 1, 4, 2, 5],
    "unit_price": [300000, 15000, None, 10000, 200000, 12000, 15000, None],
    "coupon_amount": [0, None, 5000, 1000, None, 0, 2000, None],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-06", "", "2026-01-08", "2026-01-09", None, "2026-01-10"]
})

orders
\`\`\`

---

### 10.9.2 빈 문자열을 결측치로 변환

\`\`\`python
orders_clean = orders.replace(["", " "], pd.NA)

orders_clean
\`\`\`

빈 문자열과 공백 문자열을 \`pd.NA\`로 변환했습니다.

---

### 10.9.3 결측치 개수와 비율 확인

\`\`\`python
missing_count = orders_clean.isna().sum()
missing_ratio = orders_clean.isna().mean() * 100

missing_summary = pd.DataFrame({
    "missing_count": missing_count,
    "missing_ratio": missing_ratio
})

missing_summary.sort_values(by="missing_count", ascending=False)
\`\`\`

이 표를 보면 어떤 컬럼에 결측치가 많은지 알 수 있습니다.

---

### 10.9.4 범주형 컬럼 결측치 대체

지역과 카테고리는 별도 범주로 처리합니다.

\`\`\`python
orders_clean["region"] = orders_clean["region"].fillna("미상")
orders_clean["category"] = orders_clean["category"].fillna("미분류")
\`\`\`

이렇게 하면 지역이나 카테고리가 없는 데이터를 분석에서 삭제하지 않고 별도로 확인할 수 있습니다.

---

### 10.9.5 쿠폰 금액 결측치 대체

쿠폰 금액이 비어 있는 경우, 쿠폰을 사용하지 않은 것으로 보고 0으로 채우겠습니다.

\`\`\`python
orders_clean["coupon_amount"] = orders_clean["coupon_amount"].fillna(0)
\`\`\`

이 기준은 데이터 의미에 따라 달라질 수 있습니다.  
만약 쿠폰 금액이 누락된 것인지 사용하지 않은 것인지 알 수 없다면 0으로 채우면 안 됩니다.

---

### 10.9.6 주문 금액 계산 가능한 행만 선택

주문 금액을 계산하려면 \`quantity\`와 \`unit_price\`가 필요합니다.  
둘 중 하나라도 없으면 계산할 수 없습니다.

\`\`\`python
orders_amount = orders_clean.dropna(subset=["quantity", "unit_price"]).copy()

orders_amount
\`\`\`

---

### 10.9.7 최종 주문 금액 계산

\`\`\`python
orders_amount["total_price"] = (
    orders_amount["quantity"] * orders_amount["unit_price"]
    - orders_amount["coupon_amount"]
)

orders_amount
\`\`\`

이제 주문 금액 분석에 사용할 수 있는 데이터가 준비되었습니다.

---

### 10.9.8 처리 결과 요약

결측치 처리 후 남은 데이터 개수를 확인합니다.

\`\`\`python
original_count = len(orders)
analysis_count = len(orders_amount)

print("원본 행 수:", original_count)
print("주문 금액 분석 가능 행 수:", analysis_count)
print("제외된 행 수:", original_count - analysis_count)
\`\`\`

컬럼별 결측치도 다시 확인합니다.

\`\`\`python
orders_amount.isna().sum()
\`\`\`

마지막으로 분석에 필요한 컬럼만 선택합니다.

\`\`\`python
result_columns = [
    "order_id",
    "customer",
    "region",
    "category",
    "quantity",
    "unit_price",
    "coupon_amount",
    "total_price",
    "order_date"
]

orders_result = orders_amount[result_columns].reset_index(drop=True)

orders_result
\`\`\`

---

### 10.9.9 처리 기준 문서화

데이터 정리 후에는 처리 기준을 남겨야 합니다.

\`\`\`text
결측치 처리 기준
- 빈 문자열과 공백 문자열은 결측치로 변환했다.
- region 결측치는 "미상"으로 대체했다.
- category 결측치는 "미분류"로 대체했다.
- coupon_amount 결측치는 쿠폰 미사용으로 보고 0으로 대체했다.
- quantity 또는 unit_price가 없는 행은 주문 금액 계산에서 제외했다.
- order_date 결측치는 이번 주문 금액 분석에서는 유지했지만, 날짜 분석에서는 제외가 필요하다.
\`\`\`

이런 기록은 보고서 작성, 코드 리뷰, 협업에서 매우 중요합니다.

---
`;export{e as default};