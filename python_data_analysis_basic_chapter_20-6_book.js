var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-6 -->

# 20.6 1단계: 데이터 구조 확인

분석을 시작할 때는 각 데이터의 구조를 확인합니다.

---

### 20.6.1 주문 데이터 구조 확인

\`\`\`python
orders_raw.head()
orders_raw.shape
orders_raw.info()
\`\`\`

확인할 내용은 다음과 같습니다.

\`\`\`text
행과 열 개수
컬럼명
자료형
결측치 여부
날짜 컬럼이 문자열인지 여부
\`\`\`

주문 데이터에서 \`order_date\`는 문자열입니다.  
날짜 분석을 위해 날짜형으로 변환해야 합니다.

---

### 20.6.2 고객 데이터 구조 확인

\`\`\`python
customers_raw.head()
customers_raw.shape
customers_raw.info()
\`\`\`

고객 데이터에서는 이름과 지역 표기 방식을 확인합니다.

\`\`\`python
customers_raw["region"].value_counts()
\`\`\`

지역 표기가 섞여 있으므로 표준화가 필요합니다.

---

### 20.6.3 상품 데이터 구조 확인

\`\`\`python
products_raw.head()
products_raw.shape
products_raw.info()
\`\`\`

상품 데이터에서는 \`product_id\`가 유일한지 확인해야 합니다.

\`\`\`python
products_raw["product_id"].is_unique
\`\`\`

상품 ID는 상품 기준표의 key이므로 유일해야 합니다.

---
`;export{e as default};