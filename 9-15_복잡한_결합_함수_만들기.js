var e=`# 9장. 복잡한 데이터 결합 실습

## 9.15 복잡한 결합 함수 만들기

반복되는 결합 과정을 함수로 만들면 재사용하기 쉽습니다.

---

### 9.15.1 key 유일성 검사 함수

\`\`\`python
def assert_unique_key(df: pd.DataFrame, key_columns: list[str], table_name: str) -> None:
    duplicate_count = df.duplicated(subset=key_columns).sum()

    if duplicate_count > 0:
        raise ValueError(
            f"{table_name}의 key {key_columns}에 중복이 {duplicate_count}건 있습니다."
        )
\`\`\`

사용 예:

\`\`\`python
assert_unique_key(customers, ["customer_id"], "customers")
assert_unique_key(products, ["product_id"], "products")
\`\`\`

---

### 9.15.2 안전한 left join 함수

\`\`\`python
def safe_left_join(
    left: pd.DataFrame,
    right: pd.DataFrame,
    on: list[str] | str,
    right_table_name: str,
    validate: str = "many_to_one"
) -> tuple[pd.DataFrame, pd.DataFrame]:
    merged = left.merge(
        right,
        on=on,
        how="left",
        validate=validate,
        indicator=True
    )

    unmatched = merged[merged["_merge"] == "left_only"].copy()

    summary = pd.DataFrame([{
        "right_table": right_table_name,
        "join_key": ", ".join(on) if isinstance(on, list) else on,
        "left_rows": len(left),
        "merged_rows": len(merged),
        "row_diff": len(merged) - len(left),
        "unmatched_rows": len(unmatched)
    }])

    merged = merged.drop(columns=["_merge"])

    return merged, summary
\`\`\`

---

### 9.15.3 함수 사용 예시

\`\`\`python
orders_customers_safe, customer_join_summary = safe_left_join(
    left=orders,
    right=customers,
    on="customer_id",
    right_table_name="customers"
)

orders_products_safe, product_join_summary = safe_left_join(
    left=orders_customers_safe,
    right=products,
    on="product_id",
    right_table_name="products"
)

pd.concat([customer_join_summary, product_join_summary], ignore_index=True)
\`\`\`

---

### 9.15.4 함수화의 장점

\`\`\`text
결합 방식이 일관된다.
결합 결과 검증이 자동으로 수행된다.
매칭 실패 행을 쉽게 확인할 수 있다.
자동화 리포트에 활용할 수 있다.
실수로 indicator나 validate를 빼먹는 일을 줄일 수 있다.
\`\`\`

---
`;export{e as default};