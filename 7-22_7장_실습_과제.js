var e=`# 7장. 누적 지표와 이동평균 분석

## 7.22 7장 실습 과제

이번 장의 과제는 주문 데이터마트를 사용해 누적 지표와 이동평균 리포트를 만드는 것입니다.

---

### 과제 1. 일별 매출 집계

주문 데이터마트에서 일별 매출 데이터를 만드세요.

필수 컬럼:

\`\`\`text
order_date_dt
daily_sales
order_count
unique_customers
\`\`\`

제출물:

\`\`\`text
daily_sales.csv
\`\`\`

---

### 과제 2. 날짜 누락 처리

분석 기간의 전체 날짜 범위를 만들고, 주문이 없는 날짜는 다음 값을 0으로 채우세요.

\`\`\`text
daily_sales
order_count
unique_customers
\`\`\`

---

### 과제 3. 누적 지표 계산

다음 컬럼을 만드세요.

\`\`\`text
cumulative_sales
cumulative_order_count
new_customers
cumulative_customers
\`\`\`

---

### 과제 4. 이동평균 계산

다음 컬럼을 만드세요.

\`\`\`text
sales_3d_ma
sales_7d_ma
order_count_7d_ma
\`\`\`

---

### 과제 5. 변화량 계산

다음 컬럼을 만드세요.

\`\`\`text
previous_day_sales
daily_sales_diff
daily_sales_pct_change
\`\`\`

---

### 과제 6. 월별 누적 매출 분석

월별 매출을 집계하고 다음 컬럼을 만드세요.

\`\`\`text
year_month
monthly_sales
order_count
cumulative_sales
monthly_sales_diff
monthly_sales_pct_change
\`\`\`

제출물:

\`\`\`text
monthly_cumulative_sales.csv
\`\`\`

---

### 과제 7. 카테고리별 누적 매출 분석

카테고리별 일별 매출과 누적 매출을 계산하세요.

필수 컬럼:

\`\`\`text
order_date_dt
category
daily_sales
category_cumulative_sales
\`\`\`

제출물:

\`\`\`text
category_cumulative_sales.csv
\`\`\`

---

### 과제 8. 고객별 누적 구매액 분석

고객별 주문일 기준으로 구매 차수와 누적 구매액을 계산하세요.

필수 컬럼:

\`\`\`text
customer_id
customer_name
order_id
order_date_dt
purchase_number
net_amount
customer_cumulative_purchase
\`\`\`

제출물:

\`\`\`text
customer_cumulative_purchase.csv
\`\`\`

---

### 과제 9. 그래프 작성

다음 그래프를 작성하고 저장하세요.

\`\`\`text
일별 매출 추이
일별 매출과 3일·7일 이동평균
누적 매출 추이
카테고리별 누적 매출
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 누적 지표와 이동평균 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 일별 매출 집계

## 4. 누적 매출 분석

## 5. 이동평균 분석

## 6. 전일 대비 변화량 분석

## 7. 카테고리별 누적 매출

## 8. 고객별 누적 구매액

## 9. 주요 인사이트

## 10. 주의사항

## 11. 다음 단계
\`\`\`

---
`;export{e as default};