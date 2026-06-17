var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-9 -->

# 20.9 4단계: 데이터 결합

주문 데이터에 고객 정보와 상품 정보를 붙여 분석용 데이터를 만듭니다.

---

### 20.9.1 결합 전 기준값 저장

결합 전 행 수와 계산 가능한 주문 금액 관련 정보를 저장합니다.

\`\`\`python
before_rows = len(orders)

before_rows
\`\`\`

주문 데이터에는 아직 상품 단가가 없으므로 최종 매출은 결합 후 계산합니다.

---

### 20.9.2 고객 정보 결합

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer["_merge"].value_counts()
\`\`\`

매칭되지 않은 고객을 확인합니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

주문 데이터에는 \`customer_id\` 11이 있지만 고객 데이터에는 없습니다.  
따라서 해당 주문은 고객 정보가 결측치로 남습니다.

검증이 끝나면 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

---

### 20.9.3 상품 정보 결합

\`\`\`python
orders_full = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_full["_merge"].value_counts()
\`\`\`

매칭되지 않은 상품을 확인합니다.

\`\`\`python
orders_full[orders_full["_merge"] == "left_only"]
\`\`\`

\`product_id\` P999는 상품 데이터에 없으므로 상품명, 카테고리, 단가가 결측치로 남습니다.

검증 후 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_full = orders_full.drop(columns=["_merge"])
\`\`\`

---

### 20.9.4 결합 후 행 수 확인

\`\`\`python
after_rows = len(orders_full)

before_rows, after_rows
\`\`\`

\`left join\`을 사용했으므로 행 수는 유지되어야 합니다.

---

### 20.9.5 결합 후 결측치 확인

\`\`\`python
orders_full.isna().sum()
\`\`\`

고객 정보가 없는 주문, 상품 정보가 없는 주문, 날짜 변환에 실패한 주문을 확인할 수 있습니다.

---
`;export{e as default};