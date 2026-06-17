var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-12 -->

# 10.12 연습문제

### 문제 1. 개념 확인

결측치에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 항상 0을 의미한다.  
B. 값이 비어 있거나 존재하지 않는 상태를 말한다.  
C. 문자열 데이터에서만 발생한다.  
D. 정렬을 하면 자동으로 사라진다.

---

### 문제 2. 코드 작성

다음 DataFrame에서 컬럼별 결측치 개수를 확인하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", None, "철수"],
    "age": [20, 30, None]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 DataFrame에서 빈 문자열 \`""\`을 결측치로 변환하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "", "철수"],
    "region": ["서울", "부산", ""]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 데이터에서 \`price\` 컬럼이 결측치인 행을 제거하는 코드를 작성하세요.

\`\`\`python
products = pd.DataFrame({
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, None, 200000]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 고객 데이터에서 \`region\` 결측치를 \`"미상"\`으로 채우는 코드를 작성하세요.

\`\`\`python
customers = pd.DataFrame({
    "name": ["민수", "지영", "철수"],
    "region": ["서울", None, "부산"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 주문 데이터에서 \`coupon_amount\` 결측치를 0으로 채우세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "coupon_amount": [1000, None, 0]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 \`score\` 결측치를 평균값으로 채우세요.

\`\`\`python
scores = pd.DataFrame({
    "name": ["A", "B", "C", "D"],
    "score": [80, None, 90, 70]
})
\`\`\`

---

### 문제 8. 개념 확인

\`dropna(subset=["quantity", "unit_price"])\`의 의미를 설명하세요.

---

### 문제 9. 코드 작성

다음 데이터에서 앞의 값으로 결측치를 채우는 코드를 작성하세요.

\`\`\`python
stock = pd.DataFrame({
    "date": pd.date_range("2026-01-01", periods=5),
    "stock_count": [100, None, None, 90, None]
})
\`\`\`

---

### 문제 10. 실무형 문제

다음 주문 데이터에서 결측치를 처리하고 \`total_price\`를 계산하세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- 빈 문자열은 결측치로 변환한다.
- region 결측치는 "미상"으로 채운다.
- coupon_amount 결측치는 0으로 채운다.
- quantity 또는 unit_price가 결측치인 행은 주문 금액 계산에서 제외한다.
- total_price = quantity * unit_price - coupon_amount
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "region": ["서울", "", None, "부산"],
    "quantity": [2, None, 1, 3],
    "unit_price": [10000, 20000, None, 15000],
    "coupon_amount": [1000, None, 0, None]
})
\`\`\`

---
`;export{e as default};