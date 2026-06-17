var e=`# 19장. 대용량 데이터 처리 실습

## 19.6 필요한 컬럼만 읽기

대부분의 분석에는 모든 컬럼이 필요하지 않습니다.

월별 매출 분석에 필요한 컬럼만 읽어보겠습니다.

---

### 19.6.1 필요한 컬럼 정의

\`\`\`python
usecols_sales = [
    "order_id",
    "order_date",
    "year_month",
    "category",
    "region",
    "net_amount"
]
\`\`\`

---

### 19.6.2 필요한 컬럼만 읽기

\`\`\`python
start = now()

orders_selected = pd.read_csv(
    large_csv_path,
    usecols=usecols_sales
)

read_selected_elapsed = now() - start

selected_memory_mb = dataframe_memory_mb(orders_selected)

read_selected_elapsed, selected_memory_mb
\`\`\`

---

### 19.6.3 전체 읽기와 비교

\`\`\`python
read_time_comparison = pd.DataFrame([
    {
        "method": "read_full_csv",
        "elapsed_seconds": round(read_full_elapsed, 3),
        "memory_mb": round(full_memory_mb, 2),
        "columns_read": len(orders_full.columns)
    },
    {
        "method": "read_selected_columns",
        "elapsed_seconds": round(read_selected_elapsed, 3),
        "memory_mb": round(selected_memory_mb, 2),
        "columns_read": len(orders_selected.columns)
    }
])

read_time_comparison
\`\`\`

저장합니다.

\`\`\`python
read_time_comparison.to_csv(
    OUTPUT_TABLES / "chapter_19_read_time_comparison.csv",
    index=False
)
\`\`\`

---

### 19.6.4 해석 예시

\`\`\`text
필요한 컬럼만 읽으면 메모리 사용량이 줄어든다.
대용량 데이터에서는 분석 목적에 맞는 컬럼만 읽는 습관이 중요하다.
특히 이벤트 로그처럼 컬럼 수가 많은 데이터에서는 usecols가 큰 효과를 낼 수 있다.
\`\`\`

---
`;export{e as default};