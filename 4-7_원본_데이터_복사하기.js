var e=`# 4장. 분석용 데이터마트 만들기

## 4.7 원본 데이터 복사하기

원본 데이터는 직접 수정하지 않습니다.

---

### 4.7.1 복사본 만들기

\`\`\`python
orders = orders_raw.copy()
customers = customers_raw.copy()
products = products_raw.copy()
\`\`\`

이제 \`orders\`, \`customers\`, \`products\`를 전처리합니다.

---

### 4.7.2 전처리 전 행 수 저장하기

전처리 전후를 비교하기 위해 행 수를 저장합니다.

\`\`\`python
raw_counts = {
    "orders_raw": len(orders_raw),
    "customers_raw": len(customers_raw),
    "products_raw": len(products_raw)
}

raw_counts
\`\`\`

전처리 후 행 수와 비교할 때 사용합니다.

---
`;export{e as default};