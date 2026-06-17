var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-10 -->

# 8.10 연습문제

### 문제 1. 개념 확인

다음 중 \`sort_values()\`의 역할로 가장 적절한 것은 무엇인가요?

A. 인덱스를 0부터 다시 매긴다.  
B. 특정 컬럼의 값을 기준으로 행을 정렬한다.  
C. 결측치를 모두 제거한다.  
D. 새로운 컬럼을 추가한다.

---

### 문제 2. 개념 확인

다음 코드에서 \`ascending=False\`의 의미는 무엇인가요?

\`\`\`python
df.sort_values(by="sales", ascending=False)
\`\`\`

A. \`sales\`가 작은 값부터 정렬한다.  
B. \`sales\`가 큰 값부터 정렬한다.  
C. \`sales\` 컬럼을 삭제한다.  
D. \`sales\` 컬럼의 결측치를 앞에 배치한다.

---

### 문제 3. 코드 작성

다음 DataFrame에서 \`price\`가 높은 순서대로 정렬하는 코드를 작성하세요.

\`\`\`python
products = pd.DataFrame({
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})
\`\`\`

---

### 문제 4. 코드 작성

위 \`products\` 데이터에서 가격이 가장 낮은 상품 1개를 추출하는 코드를 작성하세요.

---

### 문제 5. 코드 결과 예측

다음 코드의 결과에서 첫 번째 행에 올 가능성이 가장 높은 상품은 무엇인가요?

\`\`\`python
products.sort_values(by="price", ascending=False)
\`\`\`

\`\`\`python
products = pd.DataFrame({
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 주문 데이터에서 \`total_price\` 기준으로 큰 값이 1등이 되도록 \`rank\` 컬럼을 추가하세요.  
동점자는 같은 순위를 부여하고, 다음 순위는 바로 다음 번호가 되도록 하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "total_price": [10000, 30000, 30000, 20000]
})
\`\`\`

---

### 문제 7. 개념 확인

\`sort_index()\`와 \`reset_index()\`의 차이를 간단히 설명하세요.

---

### 문제 8. 코드 작성

다음 데이터에서 \`category\`는 오름차순, \`sales\`는 내림차순으로 정렬하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "category": ["B", "A", "B", "A"],
    "sales": [100, 200, 300, 150]
})
\`\`\`

---

### 문제 9. 코드 작성

다음 데이터에서 \`score\` 상위 2개 행을 \`nlargest()\`로 추출하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "지영", "철수", "영희"],
    "score": [80, 95, 70, 90]
})
\`\`\`

---

### 문제 10. 실무형 문제

다음 고객 데이터에서 구매 금액이 높은 순서대로 순위를 만들고, 순위가 높은 고객부터 정렬하세요.  
동점자는 같은 순위로 처리하고, 다음 순위는 바로 다음 번호가 되도록 하세요.

\`\`\`python
customers = pd.DataFrame({
    "customer": ["A", "B", "C", "D", "E"],
    "total_purchase": [500000, 300000, 500000, 100000, 300000]
})
\`\`\`

---
`;export{e as default};