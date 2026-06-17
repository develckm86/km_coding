var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.9 샘플 데이터 저장하기

이번 과정에서는 여러 장에서 같은 데이터를 사용합니다.  
따라서 샘플 데이터를 CSV 파일로 저장해두겠습니다.

---

### 1.9.1 주문 데이터 만들기

\`\`\`python
orders_sample = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14"],
    "customer_id": [1, 2, 3, 1, 4],
    "product_id": ["P001", "P002", "P003", "P001", "P004"],
    "quantity": [1, 3, 2, 1, 2],
    "coupon_amount": [0, 0, 5000, 10000, None]
})
\`\`\`

---

### 1.9.2 고객 데이터 만들기

\`\`\`python
customers_sample = pd.DataFrame({
    "customer_id": [1, 2, 3, 4],
    "customer_name": [" 김민수", "이지영 ", "박철수", "최영희"],
    "region": ["서울특별시", "부산광역시", "서울시", "대전광역시"],
    "grade": ["VIP", "일반", "일반", "일반"],
    "signup_date": ["2025-12-01", "2026-01-01", "2026-01-08", "2026-02-01"],
    "visit_count": [12, 5, 7, 3]
})
\`\`\`

---

### 1.9.3 상품 데이터 만들기

\`\`\`python
products_sample = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

---

### 1.9.4 CSV로 저장하기

\`\`\`python
orders_sample.to_csv(DATA_RAW / "orders_sample.csv", index=False)
customers_sample.to_csv(DATA_RAW / "customers_sample.csv", index=False)
products_sample.to_csv(DATA_RAW / "products_sample.csv", index=False)
\`\`\`

저장된 파일을 다시 불러와 확인합니다.

\`\`\`python
orders_loaded = pd.read_csv(DATA_RAW / "orders_sample.csv")
customers_loaded = pd.read_csv(DATA_RAW / "customers_sample.csv")
products_loaded = pd.read_csv(DATA_RAW / "products_sample.csv")

orders_loaded.head()
\`\`\`

파일을 저장하고 다시 불러오는 이유는 실제 프로젝트 흐름과 비슷하게 연습하기 위해서입니다.

---
`;export{e as default};