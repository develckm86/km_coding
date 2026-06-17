var e=`# 9장. 복잡한 데이터 결합 실습

## 9.6 결합 전 key 점검

데이터를 결합하기 전에 key를 점검해야 합니다.

---

### 9.6.1 key 유일성 확인 함수

\`\`\`python
def check_key_uniqueness(df: pd.DataFrame, table_name: str, key_columns: list[str]) -> dict:
    duplicate_count = df.duplicated(subset=key_columns).sum()
    return {
        "table_name": table_name,
        "key_columns": ", ".join(key_columns),
        "row_count": len(df),
        "unique_key_count": df[key_columns].drop_duplicates().shape[0],
        "duplicate_count": int(duplicate_count),
        "is_unique": duplicate_count == 0
    }
\`\`\`

---

### 9.6.2 주요 key 점검표 만들기

\`\`\`python
join_key_check = pd.DataFrame([
    check_key_uniqueness(orders, "orders", ["order_id"]),
    check_key_uniqueness(customers, "customers", ["customer_id"]),
    check_key_uniqueness(products, "products", ["product_id"]),
    check_key_uniqueness(store_product_prices, "store_product_prices", ["store_id", "product_id"]),
    check_key_uniqueness(price_history, "price_history", ["product_id", "effective_date"]),
    check_key_uniqueness(grade_history, "grade_history", ["customer_id", "effective_date"]),
    check_key_uniqueness(ad_spend, "ad_spend", ["year_month", "campaign_id"])
])

join_key_check
\`\`\`

---

### 9.6.3 저장하기

\`\`\`python
join_key_check.to_csv(
    OUTPUT_TABLES / "chapter_09_join_key_check.csv",
    index=False
)
\`\`\`

---

### 9.6.4 해석 예시

\`\`\`text
결합 전 key 점검 결과, 고객 마스터의 customer_id와 상품 마스터의 product_id는 유일해야 한다.
지점별 상품 가격 데이터는 store_id와 product_id의 조합이 유일해야 한다.
가격 이력과 등급 이력은 ID와 effective_date 조합이 유일해야 한다.
key가 유일하지 않은 상태에서 결합하면 행 수가 증가하거나 매출이 중복 집계될 수 있다.
\`\`\`

---
`;export{e as default};