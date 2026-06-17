var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-26 -->

# 20.26 연습문제

### 문제 1. 개념 확인

종합 분석 프로젝트의 일반적인 흐름으로 가장 적절한 것은 무엇인가요?

A. 그래프 작성 → 데이터 불러오기 → 전처리 → 분석 목적 정의  
B. 분석 목적 정의 → 데이터 준비 → 전처리 → 분석 → 보고서 작성  
C. 보고서 작성 → 데이터 삭제 → 그래프 작성 → 결측치 확인  
D. 모델 학습 → 데이터 생성 → 결론 작성 → 코드 삭제  

---

### 문제 2. 코드 작성

다음 주문 데이터에서 \`coupon_amount\` 결측치를 0으로 채우세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "coupon_amount": [1000, None, 0]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 주문 데이터에서 \`order_date\`를 날짜형으로 변환하되, 변환할 수 없는 값은 \`NaT\`로 처리하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "잘못된 날짜", "2026-01-03"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 고객 데이터에서 \`customer_name\`의 앞뒤 공백을 제거하세요.

\`\`\`python
customers = pd.DataFrame({
    "customer_name": [" 김민수", "이지영 ", " 박철수 "]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 주문 데이터와 고객 데이터를 \`customer_id\` 기준으로 left join하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "customer_id": [10, 20, 30]
})

customers = pd.DataFrame({
    "customer_id": [10, 20],
    "customer_name": ["민수", "지영"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 \`net_amount = quantity * unit_price - coupon_amount\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "quantity": [1, 2, 3],
    "unit_price": [10000, 20000, 30000],
    "coupon_amount": [0, 1000, 5000]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 카테고리별 총매출과 주문 수를 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "category": ["전자기기", "도서", "전자기기", "생활용품"],
    "net_amount": [300000, 20000, 250000, 50000]
})
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 월별 매출을 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-20"],
    "net_amount": [10000, 20000, 30000, 40000]
})
\`\`\`

---

### 문제 9. 해석 문제

다음 결과를 보고 인사이트 문장을 작성하세요.

\`\`\`text
전자기기 카테고리의 총매출이 가장 높고,
평균 주문 금액도 다른 카테고리보다 높다.
\`\`\`

---

### 문제 10. 보고서 작성 문제

종합 분석 보고서에 포함해야 할 항목을 6가지 이상 적으세요.

---
`;export{e as default};