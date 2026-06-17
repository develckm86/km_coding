var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-13 -->

# 15.13 결합 후 검증하기

데이터 결합에서 가장 중요한 부분은 결합 후 검증입니다.

결합 코드를 실행했다고 끝이 아닙니다.  
결과가 예상과 맞는지 반드시 확인해야 합니다.

---

### 15.13.1 결합 전후 행 수 확인

먼저 결합 전후 행 수를 확인합니다.

\`\`\`python
before_rows = len(orders)

orders_with_customer = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

after_rows = len(orders_with_customer)

before_rows, after_rows
\`\`\`

\`left join\`으로 고객 정보를 붙였다면 행 수는 보통 유지되어야 합니다.

\`\`\`text
결합 전 주문 행 수 = 결합 후 행 수
\`\`\`

만약 행 수가 늘어났다면 오른쪽 데이터의 key가 중복되어 있을 가능성이 있습니다.

---

### 15.13.2 결합 후 결측치 확인

결합 후 새로 붙인 컬럼에 결측치가 있는지 확인합니다.

\`\`\`python
orders_with_customer[["customer_name", "region", "grade"]].isna().sum()
\`\`\`

결측치가 있다면 매칭되지 않은 key가 있다는 뜻일 수 있습니다.

\`\`\`python
orders_with_customer[orders_with_customer["customer_name"].isna()]
\`\`\`

이 행의 \`customer_id\`가 고객 데이터에 있는지 확인합니다.

\`\`\`python
missing_customer_ids = orders_with_customer.loc[
    orders_with_customer["customer_name"].isna(),
    "customer_id"
].unique()

missing_customer_ids
\`\`\`

---

### 15.13.3 key 목록 비교하기

주문 데이터의 고객 ID와 고객 데이터의 고객 ID를 비교할 수 있습니다.

\`\`\`python
order_customer_ids = set(orders["customer_id"])
master_customer_ids = set(customers["customer_id"])

order_customer_ids - master_customer_ids
\`\`\`

이 결과는 주문 데이터에는 있지만 고객 데이터에는 없는 고객 ID입니다.

반대로 고객 데이터에는 있지만 주문 데이터에는 없는 고객 ID도 확인할 수 있습니다.

\`\`\`python
master_customer_ids - order_customer_ids
\`\`\`

이런 key 비교는 결합 전후 검증에 유용합니다.

---

### 15.13.4 집계값이 유지되는지 확인

고객 정보를 붙인다고 해서 주문 금액 합계가 달라지면 안 됩니다.

\`\`\`python
orders["total_price"].sum()
orders_with_customer["total_price"].sum()
\`\`\`

두 값이 같아야 합니다.

만약 결합 후 합계가 커졌다면 중복 매칭으로 행이 늘어났을 가능성이 있습니다.

예를 들어 오른쪽 데이터의 \`customer_id\`가 중복되어 있으면 한 주문이 여러 고객 정보와 매칭되어 행이 늘어날 수 있습니다.

---

### 15.13.5 \`_merge\` 컬럼으로 검증하기

\`indicator=True\`를 사용하면 매칭 상태를 쉽게 확인할 수 있습니다.

\`\`\`python
check = orders.merge(
    customers,
    on="customer_id",
    how="left",
    indicator=True
)

check["_merge"].value_counts()
\`\`\`

\`left join\`에서 \`_merge\`가 \`both\`이면 정상 매칭입니다.  
\`left_only\`가 있다면 왼쪽 주문 데이터에만 있고 고객 데이터에는 없는 key입니다.

---
`;export{e as default};