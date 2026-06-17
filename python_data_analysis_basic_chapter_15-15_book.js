var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-15 -->

# 15.15 실무 예제 2: 주문 데이터에 고객 정보 붙이기

월별 주문 데이터를 하나로 합친 뒤 고객 정보를 붙여보겠습니다.

---

### 15.15.1 고객 데이터 준비

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "customer_name": ["민수", "지영", "철수", "영희", "수진"],
    "region": ["서울", "부산", "서울", "대전", "부산"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP"]
})
\`\`\`

---

### 15.15.2 고객 ID 중복 확인

고객 데이터에서는 \`customer_id\`가 유일해야 합니다.

\`\`\`python
customers["customer_id"].is_unique
\`\`\`

중복이 있다면 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

---

### 15.15.3 \`left join\`으로 고객 정보 결합

\`\`\`python
orders_customer = orders_all.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer
\`\`\`

---

### 15.15.4 매칭 상태 확인

\`\`\`python
orders_customer["_merge"].value_counts()
\`\`\`

모두 \`both\`라면 주문 데이터의 모든 고객 ID가 고객 데이터와 매칭된 것입니다.

\`left_only\`가 있다면 고객 정보가 없는 주문입니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

검증이 끝났다면 \`_merge\` 컬럼을 제거할 수 있습니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

---

### 15.15.5 지역별 매출 분석

이제 지역 정보가 붙었으므로 지역별 매출을 계산할 수 있습니다.

\`\`\`python
region_sales = (
    orders_customer
    .groupby("region")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

---
`;export{e as default};