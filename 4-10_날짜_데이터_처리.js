var e=`# 4장. 분석용 데이터마트 만들기

## 4.10 날짜 데이터 처리

날짜는 월별 분석과 리텐션 분석의 핵심입니다.

---

### 4.10.1 주문일 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

변환 실패 행을 확인합니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

변환 실패 행은 날짜 기반 분석에서 제외됩니다.  
하지만 매출 계산이 가능하면 전체 매출 분석에는 포함할 수 있습니다.

---

### 4.10.2 주문 연월과 요일 만들기

\`\`\`python
orders["year_month"] = orders["order_date_dt"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date_dt"].dt.day_name()
\`\`\`

확인합니다.

\`\`\`python
orders[["order_date", "order_date_dt", "year_month", "weekday"]]
\`\`\`

---

### 4.10.3 가입일 변환

고객 데이터의 가입일도 날짜형으로 변환합니다.

\`\`\`python
customers["signup_date_dt"] = pd.to_datetime(
    customers["signup_date"],
    errors="coerce"
)
\`\`\`

변환 실패 행을 확인합니다.

\`\`\`python
customers[customers["signup_date_dt"].isna()]
\`\`\`

가입일이 오류인 고객은 코호트 분석이나 가입 후 첫 구매 기간 분석에서 제외되거나 별도 처리해야 합니다.

---
`;export{e as default};