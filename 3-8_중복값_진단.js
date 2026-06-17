var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.8 중복값 진단

중복값은 분석 결과를 왜곡할 수 있습니다.

특히 ID 컬럼의 중복은 매우 중요합니다.

---

### 3.8.1 주문 ID 중복 확인

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

중복된 주문을 확인합니다.

\`\`\`python
orders[orders.duplicated(subset=["order_id"], keep=False)]
\`\`\`

주문 데이터에서 \`order_id\`는 일반적으로 유일해야 합니다.  
중복이 있으면 매출이 중복 계산될 수 있습니다.

---

### 3.8.2 고객 ID 중복 확인

\`\`\`python
customers.duplicated(subset=["customer_id"]).sum()
\`\`\`

중복 고객을 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

고객 마스터 데이터에서 \`customer_id\`는 유일해야 합니다.  
중복이 있으면 주문 데이터와 결합할 때 행 수가 늘어날 수 있습니다.

---

### 3.8.3 상품 ID 중복 확인

\`\`\`python
products.duplicated(subset=["product_id"]).sum()
\`\`\`

중복 상품을 확인합니다.

\`\`\`python
products[products.duplicated(subset=["product_id"], keep=False)]
\`\`\`

상품 마스터 데이터에서 \`product_id\`가 중복되어 있으면 주문 데이터와 결합할 때 주문 행이 늘어날 수 있습니다.

---

### 3.8.4 중복 진단 함수 만들기

\`\`\`python
def check_duplicate_key(df: pd.DataFrame, table_name: str, key_columns: list[str]) -> dict:
    duplicate_count = df.duplicated(subset=key_columns).sum()
    duplicate_ratio = duplicate_count / len(df) * 100 if len(df) > 0 else 0

    return {
        "table_name": table_name,
        "key_columns": ", ".join(key_columns),
        "row_count": len(df),
        "duplicate_count": int(duplicate_count),
        "duplicate_ratio_percent": round(duplicate_ratio, 2),
        "is_unique": duplicate_count == 0
    }
\`\`\`

---

### 3.8.5 중복 요약표 만들기

\`\`\`python
duplicate_summary = pd.DataFrame([
    check_duplicate_key(orders, "orders", ["order_id"]),
    check_duplicate_key(customers, "customers", ["customer_id"]),
    check_duplicate_key(products, "products", ["product_id"])
])

duplicate_summary
\`\`\`

---

### 3.8.6 중복 요약표 저장하기

\`\`\`python
duplicate_summary.to_csv(
    OUTPUT_TABLES / "chapter_03_duplicate_summary.csv",
    index=False
)
\`\`\`

---

### 3.8.7 중복값 해석하기

해석 예시:

\`\`\`text
orders 테이블에서 order_id 중복이 발견되었다.
주문 ID는 주문 단위의 고유 식별자이므로 중복 주문은 매출 중복 집계의 원인이 될 수 있다.

customers 테이블에서 customer_id 중복이 발견되었다.
고객 마스터의 key 중복은 주문 데이터 결합 시 행 수 증가를 유발할 수 있으므로 결합 전에 정리해야 한다.

products 테이블에서 product_id 중복이 발견되었다.
상품 마스터의 product_id 중복은 카테고리별 매출 분석을 왜곡할 수 있다.
\`\`\`

중복값은 단순히 제거하기보다 어떤 행을 남길지 기준을 세워야 합니다.

---
`;export{e as default};