var e=`# 19장. 대용량 데이터 처리 실습

## 19.5 전체 CSV 읽기와 메모리 확인

먼저 전체 CSV를 한 번에 읽고 메모리 사용량을 확인합니다.

---

### 19.5.1 전체 CSV 읽기

\`\`\`python
start = now()

orders_full = pd.read_csv(large_csv_path)

read_full_elapsed = now() - start

read_full_elapsed
\`\`\`

---

### 19.5.2 메모리 사용량 확인

\`\`\`python
full_memory_mb = dataframe_memory_mb(orders_full)

full_memory_mb
\`\`\`

---

### 19.5.3 자료형 확인

\`\`\`python
orders_full.dtypes
\`\`\`

CSV에서 읽은 날짜 컬럼은 문자열로 들어올 수 있습니다.

\`\`\`python
orders_full["order_date"] = pd.to_datetime(
    orders_full["order_date"],
    errors="coerce"
)
\`\`\`

---

### 19.5.4 기본 정보 확인

\`\`\`python
orders_full.shape
\`\`\`

\`\`\`python
orders_full.head()
\`\`\`

\`\`\`python
orders_full.info()
\`\`\`

---
`;export{e as default};