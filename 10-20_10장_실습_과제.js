var e=`# 10장. 고객별 Feature Table 만들기

## 10.20 10장 실습 과제

이번 장의 과제는 고객별 Feature Table을 직접 만드는 것입니다.

---

### 과제 1. 고객 주문 기준 데이터 만들기

주문 데이터에서 다음 조건을 만족하는 고객 주문 기준 데이터를 만드세요.

\`\`\`text
customer_id가 결측치가 아닌 주문
order_date가 날짜형으로 변환 가능한 주문
net_amount가 결측치가 아닌 주문
\`\`\`

추가로 다음 컬럼을 만드세요.

\`\`\`text
year_month
used_coupon
is_high_amount_order
\`\`\`

제출물:

\`\`\`text
customer_order_base.csv
\`\`\`

---

### 과제 2. Feature 정의서 작성

다음 Feature에 대한 정의서를 작성하세요.

\`\`\`text
total_purchase
order_count
avg_order_amount
first_order_date
last_order_date
days_since_last_order
signup_to_first_order_days
category_count
main_category
coupon_usage_rate
is_repeat_customer
value_segment
\`\`\`

제출물:

\`\`\`text
customer_feature_definition.csv
\`\`\`

---

### 과제 3. 구매 요약 Feature 만들기

고객별로 다음 Feature를 계산하세요.

\`\`\`text
total_purchase
order_count
avg_order_amount
median_order_amount
max_order_amount
min_order_amount
total_quantity
avg_quantity_per_order
is_repeat_customer
\`\`\`

제출물:

\`\`\`text
customer_purchase_summary.csv
\`\`\`

---

### 과제 4. 날짜 기반 Feature 만들기

고객별로 다음 Feature를 계산하세요.

\`\`\`text
first_order_date
last_order_date
days_since_first_order
days_since_last_order
active_period_days
active_order_months
signup_to_first_order_days
\`\`\`

제출물:

\`\`\`text
customer_recency_features.csv
\`\`\`

---

### 과제 5. 카테고리 Feature 만들기

고객별로 다음 Feature를 계산하세요.

\`\`\`text
category_count
product_count
main_category
main_category_sales
book_sales
lifestyle_sales
electronics_sales
electronics_sales_ratio
\`\`\`

제출물:

\`\`\`text
customer_category_features.csv
\`\`\`

---

### 과제 6. 쿠폰 Feature 만들기

고객별로 다음 Feature를 계산하세요.

\`\`\`text
coupon_order_count
coupon_usage_rate
total_coupon_amount
avg_coupon_amount
is_coupon_user
\`\`\`

제출물:

\`\`\`text
customer_coupon_features.csv
\`\`\`

---

### 과제 7. 고객 가치 Segment 만들기

총구매액 기준으로 고객을 다음 세 그룹으로 나누세요.

\`\`\`text
High Value
Middle Value
Low Value
\`\`\`

제출물:

\`\`\`text
customer_value_segment.csv
\`\`\`

---

### 과제 8. 최종 고객 Feature Table 만들기

구매, 날짜, 카테고리, 쿠폰, 가치 Segment Feature를 하나로 결합하세요.

제출물:

\`\`\`text
customer_feature_table.csv
\`\`\`

---

### 과제 9. Feature Table 품질 점검

다음 항목을 확인하세요.

\`\`\`text
customer_id 중복
total_purchase 음수 여부
order_count 음수 여부
days_since_last_order 음수 여부
coupon_usage_rate가 0~100 범위인지 여부
\`\`\`

제출물:

\`\`\`text
feature_quality_check.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 고객별 Feature Table 생성 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. Feature Table 생성 기준

## 4. 구매 요약 Feature

## 5. 날짜 기반 Feature

## 6. 카테고리 Feature

## 7. 쿠폰 Feature

## 8. 고객 가치 세그먼트

## 9. Feature Table 품질 점검

## 10. 주요 인사이트

## 11. 주의사항

## 12. 다음 단계
\`\`\`

제출물:

\`\`\`text
customer_feature_report.md
\`\`\`

---
`;export{e as default};