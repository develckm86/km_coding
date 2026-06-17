var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.7 주문 데이터에 코호트 정보 붙이기

각 주문에 고객의 첫 구매 월을 붙입니다.

---

### 15.7.1 코호트 월 결합

\`\`\`python
cohort_data = cohort_base_orders.merge(
    customer_first_order[["customer_id", "cohort_month"]],
    on="customer_id",
    how="left",
    validate="many_to_one"
)

cohort_data.head()
\`\`\`

---

### 15.7.2 코호트 인덱스 계산 함수

\`Period\` 타입의 월 차이를 계산하기 위해 함수를 만듭니다.

\`\`\`python
def calculate_month_diff(order_month, cohort_month):
    return (order_month.year - cohort_month.year) * 12 + (order_month.month - cohort_month.month)
\`\`\`

---

### 15.7.3 코호트 인덱스 계산

\`\`\`python
cohort_data["cohort_index"] = cohort_data.apply(
    lambda row: calculate_month_diff(row["order_month"], row["cohort_month"]),
    axis=1
)

cohort_data[[
    "customer_id",
    "order_id",
    "order_month",
    "cohort_month",
    "cohort_index"
]].head()
\`\`\`

---

### 15.7.4 저장하기

\`\`\`python
cohort_data.to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_data.csv",
    index=False
)
\`\`\`

---

### 15.7.5 해석 예시

\`\`\`text
cohort_index는 첫 구매 월 이후 몇 개월이 지났는지를 나타낸다.
cohort_index가 0이면 첫 구매 월의 구매다.
cohort_index가 1이면 첫 구매 후 1개월 뒤 구매다.
이 값을 기준으로 리텐션 테이블을 만들 수 있다.
\`\`\`

---
`;export{e as default};