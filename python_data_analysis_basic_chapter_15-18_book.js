var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-18 -->

# 15.18 결합 후 데이터 품질 점검 체크리스트

데이터를 결합한 뒤에는 반드시 품질을 점검해야 합니다.

---

### 15.18.1 행 수 확인

\`\`\`python
len_before = len(orders_all)
len_after = len(orders_full)

len_before, len_after
\`\`\`

\`left join\`으로 고객과 상품 정보를 붙였다면 행 수는 유지되는 것이 일반적입니다.

행 수가 늘어났다면 오른쪽 데이터의 key 중복을 의심해야 합니다.

---

### 15.18.2 key 중복 확인

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

중복 key가 있으면 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
products[products.duplicated(subset=["product_id"], keep=False)]
\`\`\`

---

### 15.18.3 결측치 확인

결합 후 붙인 컬럼에 결측치가 있는지 확인합니다.

\`\`\`python
orders_full[["customer_name", "region", "grade", "product_name", "category"]].isna().sum()
\`\`\`

결측치가 있다면 매칭되지 않은 key가 있을 수 있습니다.

---

### 15.18.4 매출 합계 확인

결합 전후 매출 합계가 유지되는지 확인합니다.

\`\`\`python
orders_all["total_price"].sum()
orders_full["total_price"].sum()
\`\`\`

두 값이 달라졌다면 결합이 잘못되었을 가능성이 있습니다.

---

### 15.18.5 예상하지 못한 중복 행 확인

결합 후 주문번호가 중복되었는지 확인합니다.

\`\`\`python
orders_full.duplicated(subset=["order_id"]).sum()
\`\`\`

원래 주문번호가 유일해야 한다면 이 값은 0이어야 합니다.

---
`;export{e as default};