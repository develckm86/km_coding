var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-14 -->

# 15.14 실무 예제 1: 월별 주문 파일 합치기

월별 주문 파일을 하나로 합치는 상황을 연습해보겠습니다.

---

### 15.14.1 월별 데이터 준비

\`\`\`python
orders_jan = pd.DataFrame({
    "order_id": [1001, 1002],
    "order_date": ["2026-01-03", "2026-01-05"],
    "customer_id": [1, 2],
    "total_price": [300000, 45000]
})

orders_feb = pd.DataFrame({
    "order_id": [1003, 1004],
    "order_date": ["2026-02-10", "2026-02-14"],
    "customer_id": [3, 1],
    "total_price": [50000, 220000]
})

orders_mar = pd.DataFrame({
    "order_id": [1005, 1006],
    "order_date": ["2026-03-01", "2026-03-15"],
    "customer_id": [4, 2],
    "total_price": [35000, 60000]
})
\`\`\`

---

### 15.14.2 출처 월 컬럼 추가

\`\`\`python
orders_jan["source_month"] = "2026-01"
orders_feb["source_month"] = "2026-02"
orders_mar["source_month"] = "2026-03"
\`\`\`

---

### 15.14.3 \`concat()\`으로 결합

\`\`\`python
orders_all = pd.concat(
    [orders_jan, orders_feb, orders_mar],
    ignore_index=True
)

orders_all
\`\`\`

---

### 15.14.4 결합 결과 확인

\`\`\`python
len(orders_jan) + len(orders_feb) + len(orders_mar)
len(orders_all)
\`\`\`

두 값이 같아야 합니다.

컬럼별 결측치도 확인합니다.

\`\`\`python
orders_all.isna().sum()
\`\`\`

주문번호 중복도 확인합니다.

\`\`\`python
orders_all.duplicated(subset=["order_id"]).sum()
\`\`\`

월별 주문 수를 확인합니다.

\`\`\`python
orders_all["source_month"].value_counts().sort_index()
\`\`\`

---
`;export{e as default};