var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.6 데이터 구조 확인

먼저 각 데이터의 구조를 확인합니다.

---

### 3.6.1 주문 데이터 구조 확인

\`\`\`python
orders.shape
\`\`\`

\`\`\`python
orders.info()
\`\`\`

\`\`\`python
orders.head()
\`\`\`

확인할 내용은 다음과 같습니다.

\`\`\`text
주문 데이터는 몇 행인가?
컬럼은 몇 개인가?
각 컬럼의 자료형은 무엇인가?
결측치가 보이는 컬럼은 무엇인가?
\`\`\`

---

### 3.6.2 고객 데이터 구조 확인

\`\`\`python
customers.shape
customers.info()
customers.head()
\`\`\`

고객 데이터에서는 \`customer_id\` 중복 여부와 \`signup_date\` 날짜 변환 가능 여부가 중요합니다.

---

### 3.6.3 상품 데이터 구조 확인

\`\`\`python
products.shape
products.info()
products.head()
\`\`\`

상품 데이터에서는 \`product_id\`가 기준표 key입니다.  
따라서 유일해야 합니다.

---

### 3.6.4 구조 요약표 만들기

세 데이터의 구조를 하나의 표로 정리합니다.

\`\`\`python
structure_summary = pd.DataFrame([
    {
        "table_name": "orders",
        "row_count": len(orders),
        "column_count": orders.shape[1]
    },
    {
        "table_name": "customers",
        "row_count": len(customers),
        "column_count": customers.shape[1]
    },
    {
        "table_name": "products",
        "row_count": len(products),
        "column_count": products.shape[1]
    }
])

structure_summary
\`\`\`

이 표는 품질 리포트의 데이터 개요에 사용할 수 있습니다.

---
`;export{e as default};