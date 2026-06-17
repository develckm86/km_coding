var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.10 날짜 오류 진단

날짜 데이터는 월별 분석, 리텐션 분석, 코호트 분석에서 매우 중요합니다.

날짜 변환에 실패한 값이 있으면 기간 분석이 틀어질 수 있습니다.

---

### 3.10.1 주문일 변환 실패 확인

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

orders[orders["order_date_dt"].isna()]
\`\`\`

---

### 3.10.2 가입일 변환 실패 확인

\`\`\`python
customers["signup_date_dt"] = pd.to_datetime(
    customers["signup_date"],
    errors="coerce"
)

customers[customers["signup_date_dt"].isna()]
\`\`\`

---

### 3.10.3 날짜 오류 목록 만들기

\`\`\`python
invalid_order_dates = orders.loc[
    orders["order_date_dt"].isna(),
    ["order_id", "order_date", "customer_id", "product_id"]
].copy()

invalid_order_dates["table_name"] = "orders"
invalid_order_dates["date_column"] = "order_date"
invalid_order_dates = invalid_order_dates.rename(columns={"order_date": "invalid_value"})

invalid_signup_dates = customers.loc[
    customers["signup_date_dt"].isna(),
    ["customer_id", "customer_name", "signup_date"]
].copy()

invalid_signup_dates["table_name"] = "customers"
invalid_signup_dates["date_column"] = "signup_date"
invalid_signup_dates = invalid_signup_dates.rename(columns={"signup_date": "invalid_value"})
\`\`\`

두 결과를 하나의 표로 합치기 위해 컬럼을 맞춥니다.

\`\`\`python
invalid_order_dates = invalid_order_dates[[
    "table_name", "date_column", "invalid_value", "order_id", "customer_id", "product_id"
]]

invalid_signup_dates["order_id"] = pd.NA
invalid_signup_dates["product_id"] = pd.NA

invalid_signup_dates = invalid_signup_dates[[
    "table_name", "date_column", "invalid_value", "order_id", "customer_id", "product_id"
]]

invalid_dates = pd.concat(
    [invalid_order_dates, invalid_signup_dates],
    ignore_index=True
)

invalid_dates
\`\`\`

---

### 3.10.4 날짜 오류 목록 저장하기

\`\`\`python
invalid_dates.to_csv(
    OUTPUT_TABLES / "chapter_03_invalid_dates.csv",
    index=False
)
\`\`\`

---

### 3.10.5 날짜 오류 해석하기

해석 예시:

\`\`\`text
orders.order_date 컬럼에서 날짜 변환 실패 값이 발견되었다.
해당 주문은 월별 매출, 요일별 주문 수, 리텐션 분석 등 날짜 기반 분석에서 제외하거나 원본 수정이 필요하다.

customers.signup_date 컬럼에서도 날짜 변환 실패 값이 발견되었다.
가입일 오류는 가입 후 첫 구매까지 걸린 기간, 코호트 분석, 리텐션 분석에 영향을 줄 수 있다.
\`\`\`

---
`;export{e as default};