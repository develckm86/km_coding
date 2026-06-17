var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.15 데이터 품질 진단 함수 만들기

지금까지의 코드를 함수로 만들면 다른 데이터에도 재사용할 수 있습니다.

---

### 3.15.1 결측치 진단 함수

\`\`\`python
def diagnose_missing(tables: dict[str, pd.DataFrame]) -> pd.DataFrame:
    summaries = []

    for table_name, df in tables.items():
        summary = pd.DataFrame({
            "table_name": table_name,
            "column_name": df.columns,
            "row_count": len(df),
            "missing_count": df.isna().sum().values,
            "missing_ratio_percent": (df.isna().mean().values * 100).round(2)
        })
        summaries.append(summary)

    return pd.concat(summaries, ignore_index=True)
\`\`\`

사용 예:

\`\`\`python
tables = {
    "orders": orders,
    "customers": customers,
    "products": products
}

diagnose_missing(tables)
\`\`\`

---

### 3.15.2 key 중복 진단 함수

\`\`\`python
def diagnose_duplicate_keys(key_specs: list[dict]) -> pd.DataFrame:
    records = []

    for spec in key_specs:
        df = spec["df"]
        table_name = spec["table_name"]
        key_columns = spec["key_columns"]

        duplicate_count = df.duplicated(subset=key_columns).sum()
        duplicate_ratio = duplicate_count / len(df) * 100 if len(df) > 0 else 0

        records.append({
            "table_name": table_name,
            "key_columns": ", ".join(key_columns),
            "row_count": len(df),
            "duplicate_count": int(duplicate_count),
            "duplicate_ratio_percent": round(duplicate_ratio, 2),
            "is_unique": duplicate_count == 0
        })

    return pd.DataFrame(records)
\`\`\`

사용 예:

\`\`\`python
key_specs = [
    {"table_name": "orders", "df": orders, "key_columns": ["order_id"]},
    {"table_name": "customers", "df": customers, "key_columns": ["customer_id"]},
    {"table_name": "products", "df": products, "key_columns": ["product_id"]},
]

diagnose_duplicate_keys(key_specs)
\`\`\`

---

### 3.15.3 key 매칭 진단 함수

\`\`\`python
def diagnose_key_matching(
    source_df: pd.DataFrame,
    source_key: str,
    master_df: pd.DataFrame,
    master_key: str,
    source_table: str,
    master_table: str
) -> pd.DataFrame:
    source_keys = set(source_df[source_key].dropna())
    master_keys = set(master_df[master_key].dropna())

    unmatched_keys = source_keys - master_keys

    return pd.DataFrame([{
        "source_table": source_table,
        "source_key": source_key,
        "master_table": master_table,
        "master_key": master_key,
        "source_unique_key_count": len(source_keys),
        "master_unique_key_count": len(master_keys),
        "unmatched_key_count": len(unmatched_keys),
        "unmatched_keys": ", ".join(map(str, sorted(unmatched_keys)))
    }])
\`\`\`

사용 예:

\`\`\`python
customer_key_result = diagnose_key_matching(
    source_df=orders,
    source_key="customer_id",
    master_df=customers,
    master_key="customer_id",
    source_table="orders",
    master_table="customers"
)

product_key_result = diagnose_key_matching(
    source_df=orders,
    source_key="product_id",
    master_df=products,
    master_key="product_id",
    source_table="orders",
    master_table="products"
)

pd.concat([customer_key_result, product_key_result], ignore_index=True)
\`\`\`

---

### 3.15.4 날짜 변환 진단 함수

\`\`\`python
def diagnose_invalid_dates(
    df: pd.DataFrame,
    table_name: str,
    date_column: str,
    key_columns: list[str]
) -> pd.DataFrame:
    converted = pd.to_datetime(df[date_column], errors="coerce")
    invalid_mask = converted.isna() & df[date_column].notna()

    result = df.loc[invalid_mask, key_columns + [date_column]].copy()
    result.insert(0, "table_name", table_name)
    result.insert(1, "date_column", date_column)
    result = result.rename(columns={date_column: "invalid_value"})

    return result
\`\`\`

사용 예:

\`\`\`python
diagnose_invalid_dates(
    df=orders,
    table_name="orders",
    date_column="order_date",
    key_columns=["order_id", "customer_id", "product_id"]
)
\`\`\`

---
`;export{e as default};