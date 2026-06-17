var e=`# 9장. 복잡한 데이터 결합 실습

## 9.19 9장 실습 과제

이번 장의 과제는 복잡한 데이터 결합 과정을 직접 수행하는 것입니다.

---

### 과제 1. key 유일성 점검표 만들기

다음 데이터의 key 유일성을 확인하는 표를 만드세요.

\`\`\`text
orders.order_id
customers.customer_id
products.product_id
store_product_prices.store_id + product_id
price_history.product_id + effective_date
grade_history.customer_id + effective_date
ad_spend.year_month + campaign_id
\`\`\`

제출물:

\`\`\`text
join_key_check.csv
\`\`\`

---

### 과제 2. 고객·상품 마스터 결합

주문 데이터에 고객 마스터와 상품 마스터를 결합하세요.

조건:

\`\`\`text
orders + customers: customer_id 기준 left join
orders + products: product_id 기준 left join
validate 사용
indicator 사용
\`\`\`

제출물:

\`\`\`text
join_validation_summary.csv
unmatched_keys_report.csv
\`\`\`

---

### 과제 3. many-to-many 문제 실습

중복 key가 있는 기준표를 만들어 결합 후 행 수가 증가하는 문제를 확인하세요.

제출물:

\`\`\`text
many_to_many_problem.csv
\`\`\`

---

### 과제 4. 다중 key 결합

\`store_id\`와 \`product_id\`를 함께 기준으로 지점별 상품 가격을 결합하세요.

필수 컬럼:

\`\`\`text
order_id
store_id
product_id
quantity
store_unit_price
net_amount_store
\`\`\`

제출물:

\`\`\`text
multi_key_join_result.csv
\`\`\`

---

### 과제 5. 상품 가격 이력 결합

\`merge_asof()\`를 사용해 주문일 기준 가장 가까운 이전 상품 가격을 붙이세요.

필수 컬럼:

\`\`\`text
order_id
order_date
product_id
effective_date
unit_price
net_amount_history
\`\`\`

제출물:

\`\`\`text
orders_with_price_history.csv
price_history_join_check.csv
\`\`\`

---

### 과제 6. 고객 등급 이력 결합

\`merge_asof()\`를 사용해 주문일 기준 고객 등급 이력을 붙이세요.

필수 컬럼:

\`\`\`text
order_id
order_date
customer_id
effective_date
grade_at_time
\`\`\`

제출물:

\`\`\`text
orders_with_grade_history.csv
grade_history_join_check.csv
\`\`\`

---

### 과제 7. 광고비 데이터 결합

월별 캠페인 매출과 광고비 데이터를 결합하고 ROAS를 계산하세요.

필수 컬럼:

\`\`\`text
year_month
campaign_id
total_sales
ad_spend
roas
\`\`\`

제출물:

\`\`\`text
sales_ad_joined.csv
ad_sales_join_summary.csv
\`\`\`

---

### 과제 8. 결합 결과 검증표 만들기

다음 검증 항목을 포함한 표를 만드세요.

\`\`\`text
결합 전후 행 수
row_diff
매칭 실패 건수
가격 이력 매칭 실패 건수
등급 이력 매칭 실패 건수
광고비 매칭 실패 건수
\`\`\`

제출물:

\`\`\`text
advanced_join_summary.csv
\`\`\`

---

### 과제 9. 검증된 결합 데이터 만들기

고객 정보, 상품 정보, 주문 당시 가격, 주문 당시 고객 등급, 순매출을 포함한 최종 결합 데이터를 만드세요.

제출물:

\`\`\`text
orders_joined_verified.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 복잡한 데이터 결합 실습 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 결합 전 key 점검

## 4. 고객·상품 마스터 결합

## 5. many-to-many 결합 문제

## 6. 다중 key 결합

## 7. 상품 가격 이력 결합

## 8. 고객 등급 이력 결합

## 9. 매출·광고비 데이터 결합

## 10. 결합 결과 검증

## 11. 주요 인사이트

## 12. 주의사항

## 13. 다음 단계
\`\`\`

제출물:

\`\`\`text
advanced_join_report.md
\`\`\`

---
`;export{e as default};