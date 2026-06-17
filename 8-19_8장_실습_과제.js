var e=`# 8장. 시계열 매출 분석

## 8.19 8장 실습 과제

이번 장의 과제는 주문 데이터마트를 사용해 시계열 매출 분석 리포트를 만드는 것입니다.

---

### 과제 1. 날짜 인덱스 설정

주문 데이터마트에서 \`order_date_dt\`를 날짜형으로 변환하고 날짜 인덱스를 설정하세요.

제출 내용:

\`\`\`text
날짜 인덱스가 설정된 DataFrame
\`\`\`

---

### 과제 2. 일별 매출 리포트 만들기

다음 컬럼을 가진 일별 매출 리포트를 만드세요.

\`\`\`text
order_date_dt
daily_sales
order_count
unique_customers
avg_order_amount
\`\`\`

제출물:

\`\`\`text
daily_sales_report.csv
\`\`\`

---

### 과제 3. 주별 매출 리포트 만들기

다음 컬럼을 가진 주별 매출 리포트를 만드세요.

\`\`\`text
order_date_dt
weekly_sales
order_count
unique_customers
avg_order_amount
weekly_sales_diff
weekly_sales_pct_change
\`\`\`

제출물:

\`\`\`text
weekly_sales_report.csv
\`\`\`

---

### 과제 4. 월별 매출 성장률 리포트 만들기

다음 컬럼을 가진 월별 매출 리포트를 만드세요.

\`\`\`text
year_month
monthly_sales
order_count
unique_customers
avg_order_amount
previous_month_sales
monthly_sales_diff
monthly_sales_growth_rate
order_count_growth_rate
avg_order_amount_growth_rate
\`\`\`

제출물:

\`\`\`text
monthly_sales_growth.csv
\`\`\`

---

### 과제 5. 요일별 주문 패턴 분석

요일별로 다음 지표를 계산하세요.

\`\`\`text
weekday_num
weekday_kr
total_sales
order_count
unique_customers
avg_order_amount
\`\`\`

제출물:

\`\`\`text
weekday_sales_report.csv
\`\`\`

---

### 과제 6. 이벤트 전후 비교

이벤트 기준일을 하나 정하고, 이벤트 전 14일과 후 14일의 다음 지표를 비교하세요.

\`\`\`text
total_sales
order_count
unique_customers
avg_order_amount
avg_daily_sales
\`\`\`

제출물:

\`\`\`text
event_before_after_summary.csv
\`\`\`

---

### 과제 7. 월별 카테고리 매출 분석

월별 카테고리별로 다음 지표를 계산하세요.

\`\`\`text
year_month
category
total_sales
order_count
avg_order_amount
monthly_total_sales
sales_ratio_in_month
\`\`\`

제출물:

\`\`\`text
monthly_category_sales.csv
\`\`\`

---

### 과제 8. 카테고리별 성장 기여도 분석

월별 카테고리 매출 피벗을 만든 뒤 전월 대비 증감액과 기여도를 계산하세요.

제출물:

\`\`\`text
category_growth_contribution.csv
\`\`\`

---

### 과제 9. 그래프 작성

다음 그래프를 작성하고 저장하세요.

\`\`\`text
일별 매출 추이
주별 매출 추이
월별 매출 성장률
요일별 주문 수
이벤트 전후 일평균 매출
월별 카테고리 매출 추이
\`\`\`

---

### 과제 10. 시계열 매출 분석 보고서 작성

다음 구조로 Markdown 보고서를 작성하세요.

\`\`\`markdown
# 시계열 매출 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 일별 매출 분석

## 4. 주별 매출 분석

## 5. 월별 매출 성장률

## 6. 요일별 주문 패턴

## 7. 이벤트 전후 비교

## 8. 월별 카테고리 매출

## 9. 카테고리별 성장 기여도

## 10. 주요 인사이트

## 11. 주의사항

## 12. 다음 단계
\`\`\`

---
`;export{e as default};