var e=`# 9장. 복잡한 데이터 결합 실습

## 9.18 이번 장에서 자주 하는 실수

복잡한 데이터 결합에서 자주 하는 실수를 정리합니다.

---

### 9.18.1 결합 전 key 유일성을 확인하지 않는 실수

오른쪽 기준표의 key가 중복되어 있으면 결합 후 행 수가 늘어날 수 있습니다.

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

다중 key는 다음처럼 확인합니다.

\`\`\`python
store_product_prices.duplicated(subset=["store_id", "product_id"]).sum()
\`\`\`

---

### 9.18.2 validate 없이 merge하는 실수

\`validate\`를 사용하면 예상하지 못한 결합 관계를 미리 막을 수 있습니다.

\`\`\`python
orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

---

### 9.18.3 indicator 없이 매칭 실패를 놓치는 실수

\`indicator=True\`를 사용하면 매칭 상태를 확인할 수 있습니다.

\`\`\`python
merged["_merge"].value_counts()
\`\`\`

매칭 실패를 놓치면 일부 주문이 카테고리 분석이나 고객 분석에서 누락될 수 있습니다.

---

### 9.18.4 결합 후 행 수를 확인하지 않는 실수

결합 후에는 반드시 행 수를 확인해야 합니다.

\`\`\`python
len_before = len(orders)
len_after = len(merged)
\`\`\`

left join에서 행 수가 늘어났다면 오른쪽 key 중복을 의심해야 합니다.

---

### 9.18.5 현재 가격을 과거 주문에 붙이는 실수

상품 가격이 시간에 따라 변하는 경우 현재 가격을 과거 주문에 붙이면 안 됩니다.  
주문일 기준 당시 가격을 붙여야 합니다.

\`\`\`python
pd.merge_asof(...)
\`\`\`

---

### 9.18.6 현재 고객 등급을 과거 주문에 붙이는 실수

고객 등급이 변하는 경우 현재 등급을 과거 주문에 붙이면 분석이 왜곡됩니다.

주문 당시 고객 등급을 붙이는 것이 더 정확합니다.

---

### 9.18.7 merge_asof 정렬을 잊는 실수

\`merge_asof()\`는 결합 기준 날짜가 정렬되어 있어야 합니다.

\`\`\`python
orders = orders.sort_values("order_date")
history = history.sort_values("effective_date")
\`\`\`

정렬을 하지 않으면 오류가 발생하거나 잘못된 결과가 나올 수 있습니다.

---

### 9.18.8 ROAS를 광고 효과로 단정하는 실수

ROAS는 광고비 대비 매출을 보여주는 지표입니다.  
하지만 ROAS만으로 광고가 매출을 증가시켰다고 단정할 수 없습니다.

광고 효과를 정확히 판단하려면 실험 설계나 추가 분석이 필요합니다.

---
`;export{e as default};