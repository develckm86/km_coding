var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.7 결측치 진단

결측치는 데이터 품질 진단에서 가장 먼저 확인하는 항목입니다.

---

### 3.7.1 단일 데이터의 결측치 확인

주문 데이터의 결측치를 확인합니다.

\`\`\`python
orders.isna().sum()
\`\`\`

결측치 비율을 계산합니다.

\`\`\`python
orders.isna().mean() * 100
\`\`\`

---

### 3.7.2 결측치 요약 함수 만들기

여러 데이터에 반복해서 사용할 수 있도록 함수를 만듭니다.

\`\`\`python
def make_missing_summary(df: pd.DataFrame, table_name: str) -> pd.DataFrame:
    summary = pd.DataFrame({
        "column_name": df.columns,
        "missing_count": df.isna().sum().values,
        "missing_ratio_percent": (df.isna().mean().values * 100).round(2)
    })

    summary.insert(0, "table_name", table_name)
    summary["row_count"] = len(df)

    return summary
\`\`\`

---

### 3.7.3 모든 데이터의 결측치 요약표 만들기

\`\`\`python
orders_missing = make_missing_summary(orders, "orders")
customers_missing = make_missing_summary(customers, "customers")
products_missing = make_missing_summary(products, "products")

missing_summary = pd.concat(
    [orders_missing, customers_missing, products_missing],
    ignore_index=True
)

missing_summary
\`\`\`

결측치가 있는 컬럼만 보고 싶다면 다음처럼 필터링합니다.

\`\`\`python
missing_summary[missing_summary["missing_count"] > 0]
\`\`\`

---

### 3.7.4 결측치 요약표 저장하기

\`\`\`python
missing_summary.to_csv(
    OUTPUT_TABLES / "chapter_03_missing_summary.csv",
    index=False
)
\`\`\`

---

### 3.7.5 결측치 해석하기

이번 예제에서는 주문 데이터의 \`coupon_amount\`에 결측치가 있습니다.

해석 예시:

\`\`\`text
orders.coupon_amount 컬럼에 결측치가 존재한다.
쿠폰 금액이 비어 있는 경우 쿠폰 미사용으로 해석할 수 있다면 0으로 대체할 수 있다.
다만 실제 데이터에서는 쿠폰 미사용인지 입력 누락인지 확인이 필요하다.
\`\`\`

결측치 처리는 무조건 0으로 대체하는 것이 아닙니다.  
컬럼의 의미에 따라 처리 기준을 정해야 합니다.

---
`;export{e as default};