var e=`# 19장. 대용량 데이터 처리 실습

## 19.7 자료형 최적화

이번에는 DataFrame의 자료형을 최적화해 메모리를 줄입니다.

---

### 19.7.1 최적화 전 메모리

\`\`\`python
before_opt_memory_mb = dataframe_memory_mb(orders_full)

before_opt_memory_mb
\`\`\`

---

### 19.7.2 자료형 최적화 함수

\`\`\`python
def optimize_order_dtypes(df: pd.DataFrame) -> pd.DataFrame:
    result = df.copy()

    if "order_id" in result.columns:
        result["order_id"] = pd.to_numeric(result["order_id"], downcast="integer")

    if "customer_id" in result.columns:
        result["customer_id"] = pd.to_numeric(result["customer_id"], downcast="integer")

    for col in ["quantity", "unit_price", "coupon_amount", "gross_amount", "net_amount"]:
        if col in result.columns:
            result[col] = pd.to_numeric(result[col], downcast="integer")

    for col in ["product_id", "category", "region", "channel", "device", "year_month"]:
        if col in result.columns:
            result[col] = result[col].astype("category")

    if "order_date" in result.columns:
        result["order_date"] = pd.to_datetime(result["order_date"], errors="coerce")

    return result
\`\`\`

---

### 19.7.3 최적화 적용

\`\`\`python
orders_optimized = optimize_order_dtypes(orders_full)

after_opt_memory_mb = dataframe_memory_mb(orders_optimized)

before_opt_memory_mb, after_opt_memory_mb
\`\`\`

---

### 19.7.4 메모리 절감률 계산

\`\`\`python
memory_reduction_percent = (
    (before_opt_memory_mb - after_opt_memory_mb) /
    before_opt_memory_mb * 100
)

memory_reduction_percent
\`\`\`

---

### 19.7.5 메모리 비교표 만들기

\`\`\`python
memory_usage_before_after = pd.DataFrame([
    {
        "stage": "before_optimization",
        "memory_mb": round(before_opt_memory_mb, 2)
    },
    {
        "stage": "after_optimization",
        "memory_mb": round(after_opt_memory_mb, 2)
    },
    {
        "stage": "reduction_percent",
        "memory_mb": round(memory_reduction_percent, 2)
    }
])

memory_usage_before_after
\`\`\`

저장합니다.

\`\`\`python
memory_usage_before_after.to_csv(
    OUTPUT_TABLES / "chapter_19_memory_usage_before_after.csv",
    index=False
)
\`\`\`

---

### 19.7.6 자료형 최적화 요약표

\`\`\`python
dtype_optimization_summary = pd.DataFrame({
    "column": orders_full.columns,
    "before_dtype": [str(orders_full[col].dtype) for col in orders_full.columns],
    "after_dtype": [str(orders_optimized[col].dtype) for col in orders_full.columns]
})

dtype_optimization_summary
\`\`\`

저장합니다.

\`\`\`python
dtype_optimization_summary.to_csv(
    OUTPUT_TABLES / "chapter_19_dtype_optimization_summary.csv",
    index=False
)
\`\`\`

---

### 19.7.7 최적화된 CSV 저장

\`\`\`python
orders_optimized.to_csv(
    DATA_PROCESSED / "chapter_19_large_orders_optimized.csv",
    index=False
)
\`\`\`

---

### 19.7.8 해석 예시

\`\`\`text
자료형 최적화는 대용량 데이터 처리에서 매우 중요하다.
반복 값이 많은 문자열 컬럼은 category 자료형으로 바꾸면 메모리를 크게 줄일 수 있다.
정수형 컬럼은 값의 범위에 맞게 downcast하면 메모리를 줄일 수 있다.
\`\`\`

---
`;export{e as default};