var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-22 -->

# 15.22 연습문제

### 문제 1. 개념 확인

같은 컬럼 구조를 가진 여러 월별 주문 데이터를 위아래로 붙일 때 가장 적절한 pandas 함수는 무엇인가요?

A. \`pd.merge()\`  
B. \`pd.concat()\`  
C. \`pd.to_datetime()\`  
D. \`pd.crosstab()\`

---

### 문제 2. 코드 작성

다음 두 DataFrame을 행 방향으로 결합하고 인덱스를 새로 부여하세요.

\`\`\`python
df1 = pd.DataFrame({
    "id": [1, 2],
    "value": [100, 200]
})

df2 = pd.DataFrame({
    "id": [3, 4],
    "value": [300, 400]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 주문 데이터와 고객 데이터를 \`customer_id\` 기준으로 left join하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "customer_id": [1, 2, 4],
    "sales": [10000, 20000, 30000]
})

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"]
})
\`\`\`

---

### 문제 4. 개념 확인

\`left join\`의 의미를 설명하세요.

---

### 문제 5. 코드 작성

다음 두 DataFrame에서 왼쪽 key는 \`customer_id\`, 오른쪽 key는 \`id\`입니다.  
두 데이터를 결합하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2],
    "customer_id": [10, 20]
})

customers = pd.DataFrame({
    "id": [10, 20],
    "name": ["민수", "지영"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 \`store_id\`와 \`product_id\` 두 컬럼을 기준으로 결합하세요.

\`\`\`python
sales = pd.DataFrame({
    "store_id": ["S1", "S1", "S2"],
    "product_id": ["P1", "P2", "P1"],
    "quantity": [2, 3, 1]
})

prices = pd.DataFrame({
    "store_id": ["S1", "S1", "S2"],
    "product_id": ["P1", "P2", "P1"],
    "unit_price": [1000, 2000, 1100]
})
\`\`\`

---

### 문제 7. 코드 작성

\`merge()\` 결과에서 매칭 상태를 확인할 수 있도록 \`_merge\` 컬럼을 추가하는 옵션을 사용해 결합하세요.

\`\`\`python
left = pd.DataFrame({
    "id": [1, 2, 3]
})

right = pd.DataFrame({
    "id": [2, 3, 4]
})
\`\`\`

---

### 문제 8. 개념 확인

결합 후 행 수가 예상보다 늘어났다면 어떤 문제를 의심해야 하나요?

---

### 문제 9. 코드 작성

다음 고객 데이터에서 \`customer_id\`가 유일한지 확인하는 코드를 작성하세요.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 2, 3],
    "name": ["민수", "지영", "지영", "철수"]
})
\`\`\`

---

### 문제 10. 실무형 문제

다음 주문 데이터, 고객 데이터, 상품 데이터를 결합하여 분석용 데이터를 만드세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- 주문 데이터는 기준 데이터로 유지한다.
- customer_id 기준으로 고객 정보를 left join한다.
- product_id 기준으로 상품 정보를 left join한다.
- 결합 전후 행 수와 sales 합계가 유지되는지 확인한다.
- 결합 후 결측치를 확인한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "customer_id": [10, 20, 30, 40],
    "product_id": ["P1", "P2", "P1", "P9"],
    "sales": [10000, 20000, 15000, 50000]
})

customers = pd.DataFrame({
    "customer_id": [10, 20, 30],
    "name": ["민수", "지영", "철수"],
    "region": ["서울", "부산", "대전"]
})

products = pd.DataFrame({
    "product_id": ["P1", "P2"],
    "product_name": ["키보드", "마우스"],
    "category": ["전자기기", "전자기기"]
})
\`\`\`

---
`;export{e as default};