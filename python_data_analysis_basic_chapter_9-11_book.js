var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-11 -->

# 9.11 연습문제

## 문제 1. 개념 확인

다음 중 컬럼명을 변경할 때 사용하는 pandas 메서드는 무엇인가요?

A. \`sort_values()\`  
B. \`rename()\`  
C. \`head()\`  
D. \`dropna()\`

---

## 문제 2. 개념 확인

파생 변수에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 원본 파일 이름을 바꾸는 것이다.  
B. 기존 데이터에서 계산하거나 조건을 적용해 새롭게 만든 변수이다.  
C. 결측치를 삭제하는 작업이다.  
D. 데이터프레임의 행 개수를 확인하는 작업이다.

---

## 문제 3. 코드 작성

다음 DataFrame에서 컬럼명 \`"Customer Name"\`을 \`"customer_name"\`으로 변경하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "Customer Name": ["민수", "지영"],
    "Age": [20, 25]
})
\`\`\`

---

## 문제 4. 코드 작성

다음 데이터에서 \`price\`와 \`quantity\`를 곱해 \`total_price\` 컬럼을 추가하세요.

\`\`\`python
df = pd.DataFrame({
    "product": ["A", "B", "C"],
    "price": [10000, 20000, 15000],
    "quantity": [2, 1, 3]
})
\`\`\`

---

## 문제 5. 코드 작성

다음 데이터에서 \`region\` 컬럼의 \`"SEOUL"\`을 \`"Seoul"\`로 변경하세요.

\`\`\`python
df = pd.DataFrame({
    "customer": ["A", "B", "C"],
    "region": ["Seoul", "SEOUL", "Busan"]
})
\`\`\`

---

## 문제 6. 코드 작성

다음 데이터에서 \`sales\`가 100000 이상이면 \`is_high_sales\` 컬럼에 \`True\`, 그렇지 않으면 \`False\`가 들어가도록 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "order_id": [1, 2, 3],
    "sales": [50000, 150000, 90000]
})
\`\`\`

---

## 문제 7. 코드 작성

다음 데이터에서 \`order_date\` 컬럼을 날짜형으로 변환하세요.

\`\`\`python
df = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-05", "2026-01-10"]
})
\`\`\`

---

## 문제 8. 코드 작성

다음 데이터에서 문자열로 저장된 \`price\` 컬럼을 숫자형으로 변환하세요.

\`\`\`python
df = pd.DataFrame({
    "price": ["10000", "20000", "30000"]
})
\`\`\`

---

## 문제 9. 코드 작성

다음 데이터에서 \`score\`가 90 이상이면 \`"A"\`, 80 이상이면 \`"B"\`, 그 외에는 \`"C"\`를 넣는 \`grade\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "지영", "철수"],
    "score": [95, 85, 70]
})
\`\`\`

---

## 문제 10. 실무형 문제

다음 주문 데이터에서 아래 작업을 수행하세요.

1. \`price\`와 \`quantity\`를 이용해 \`order_amount\` 컬럼을 만드세요.
2. \`discount_rate\`를 이용해 \`discount_amount\` 컬럼을 만드세요.
3. \`final_amount\` 컬럼을 만드세요.
4. \`final_amount\`가 50000 이상이면 \`free_shipping\`이 \`True\`, 아니면 \`False\`가 되도록 하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "price": [10000, 30000, 20000],
    "quantity": [2, 2, 1],
    "discount_rate": [0.0, 0.1, 0.0]
})
\`\`\`

---
`;export{e as default};