var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-13 -->

# 10.13 정답 및 해설

### 문제 1 정답

정답: B

결측치는 값이 비어 있거나 존재하지 않는 상태를 말합니다.  
결측치가 항상 0을 의미하는 것은 아닙니다.

---

### 문제 2 정답

\`\`\`python
df.isna().sum()
\`\`\`

\`isna()\`로 결측치 여부를 확인하고, \`sum()\`으로 컬럼별 결측치 개수를 계산합니다.

---

### 문제 3 정답

\`\`\`python
df = df.replace("", pd.NA)
\`\`\`

빈 문자열은 pandas에서 자동으로 결측치로 인식되지 않습니다.  
따라서 \`replace()\`를 사용해 명시적으로 \`pd.NA\`로 변환합니다.

---

### 문제 4 정답

\`\`\`python
products_clean = products.dropna(subset=["price"])
\`\`\`

\`subset=["price"]\`를 지정했으므로 \`price\` 컬럼이 결측치인 행만 제거합니다.

---

### 문제 5 정답

\`\`\`python
customers["region"] = customers["region"].fillna("미상")
\`\`\`

범주형 데이터의 결측치는 \`"미상"\`처럼 별도 범주로 채울 수 있습니다.

---

### 문제 6 정답

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)
\`\`\`

쿠폰 금액이 비어 있는 것을 쿠폰 미사용으로 해석할 수 있다면 0으로 채울 수 있습니다.  
단, 실제 데이터에서는 이 기준이 맞는지 확인해야 합니다.

---

### 문제 7 정답

\`\`\`python
mean_score = scores["score"].mean()
scores["score"] = scores["score"].fillna(mean_score)
\`\`\`

평균값을 구한 뒤 \`fillna()\`로 결측치를 채웁니다.

---

### 문제 8 정답

\`\`\`python
dropna(subset=["quantity", "unit_price"])
\`\`\`

이 코드는 \`quantity\` 또는 \`unit_price\` 컬럼에 결측치가 있는 행을 제거합니다.  
다른 컬럼에 결측치가 있더라도 이 두 컬럼이 채워져 있으면 행은 유지됩니다.

---

### 문제 9 정답

\`\`\`python
stock["stock_count"] = stock["stock_count"].ffill()
\`\`\`

\`ffill()\`은 앞에 있는 유효한 값으로 결측치를 채웁니다.

예상 결과는 다음과 같습니다.

\`\`\`text
100
100
100
90
90
\`\`\`

---

### 문제 10 정답

\`\`\`python
orders_clean = orders.replace("", pd.NA)

orders_clean["region"] = orders_clean["region"].fillna("미상")
orders_clean["coupon_amount"] = orders_clean["coupon_amount"].fillna(0)

orders_amount = orders_clean.dropna(subset=["quantity", "unit_price"]).copy()

orders_amount["total_price"] = (
    orders_amount["quantity"] * orders_amount["unit_price"]
    - orders_amount["coupon_amount"]
)

orders_amount
\`\`\`

처리 순서는 다음과 같습니다.

1. 빈 문자열을 결측치로 바꿉니다.
2. \`region\` 결측치를 \`"미상"\`으로 채웁니다.
3. \`coupon_amount\` 결측치를 0으로 채웁니다.
4. \`quantity\` 또는 \`unit_price\`가 없는 행은 주문 금액 계산에서 제외합니다.
5. \`total_price\`를 계산합니다.

이 문제에서 중요한 점은 모든 컬럼을 같은 방식으로 처리하지 않는다는 것입니다.  
지역, 쿠폰 금액, 수량, 단가는 각각 의미가 다르므로 처리 방식도 달라야 합니다.

---
`;export{e as default};