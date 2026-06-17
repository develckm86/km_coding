var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.21 15장 실습 과제

이번 장의 과제는 주문 데이터를 사용해 코호트와 리텐션 분석 보고서를 만드는 것입니다.

---

### 과제 1. 코호트 분석용 주문 데이터 만들기

주문 데이터에서 다음 조건을 만족하는 데이터를 만드세요.

\`\`\`text
customer_id 결측 없음
order_id 결측 없음
order_date 날짜형 변환 가능
net_amount 결측 없음
\`\`\`

추가 컬럼:

\`\`\`text
order_month
signup_month
\`\`\`

제출물:

\`\`\`text
cohort_base_orders.csv
\`\`\`

---

### 과제 2. 첫 구매 월 기준 코호트 만들기

고객별 첫 구매일과 첫 구매 월을 계산하세요.

필수 컬럼:

\`\`\`text
customer_id
first_order_date
cohort_month
\`\`\`

제출물:

\`\`\`text
first_purchase_cohort.csv
\`\`\`

---

### 과제 3. 코호트 인덱스 계산

각 주문에 대해 다음 컬럼을 만드세요.

\`\`\`text
cohort_month
order_month
cohort_index
\`\`\`

제출물:

\`\`\`text
cohort_data.csv
\`\`\`

---

### 과제 4. 코호트별 고객 수 테이블 만들기

코호트 월과 경과 월별 구매 고객 수를 계산하세요.

조건:

\`\`\`text
고객 수는 customer_id의 고유 개수로 계산
\`\`\`

제출물:

\`\`\`text
cohort_count_table.csv
\`\`\`

---

### 과제 5. 리텐션 테이블 만들기

코호트별 0개월 고객 수를 기준으로 리텐션 비율을 계산하세요.

제출물:

\`\`\`text
cohort_retention_table.csv
\`\`\`

---

### 과제 6. 리텐션 히트맵 만들기

첫 구매 월 기준 리텐션 테이블을 히트맵으로 시각화하세요.

제출물:

\`\`\`text
cohort_retention_heatmap.png
\`\`\`

---

### 과제 7. 가입 월 기준 리텐션 분석

가입 월 기준 코호트를 만들고 리텐션 테이블을 계산하세요.

제출물:

\`\`\`text
signup_cohort_retention_table.csv
signup_cohort_heatmap.png
\`\`\`

---

### 과제 8. 코호트별 매출 분석

코호트 월과 경과 월별 총매출과 평균 주문 금액을 계산하세요.

제출물:

\`\`\`text
cohort_sales_table.csv
cohort_avg_order_table.csv
\`\`\`

---

### 과제 9. 코호트 요약표와 품질 점검

다음 요약표와 품질 점검표를 만드세요.

\`\`\`text
cohort_summary.csv
cohort_quality_check.csv
\`\`\`

품질 점검 항목:

\`\`\`text
customer_id 결측
order_date 결측
cohort_month 결측
cohort_index 음수
0개월 리텐션 100% 여부
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 코호트와 리텐션 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 코호트 정의

## 4. 첫 구매 월 기준 코호트

## 5. 리텐션 테이블

## 6. 리텐션 히트맵

## 7. 가입 월 기준 코호트

## 8. 코호트별 매출 분석

## 9. 코호트별 평균 주문 금액 분석

## 10. 코호트 요약 결과

## 11. 품질 점검

## 12. 주요 인사이트

## 13. 주의사항

## 14. 다음 단계
\`\`\`

제출물:

\`\`\`text
cohort_analysis_report.md
\`\`\`

---
`;export{e as default};