var e=`# 6장. 고급 groupby 분석 리포트

## 6.18 6장 실습 과제

이번 장의 과제는 고급 groupby 분석 리포트를 직접 만드는 것입니다.

---

### 과제 1. 카테고리별 요약 리포트 만들기

다음 지표를 포함한 카테고리별 요약표를 만드세요.

\`\`\`text
total_sales
order_count
total_quantity
avg_order_amount
median_order_amount
unique_customers
sales_ratio_percent
\`\`\`

제출물:

\`\`\`text
category_summary.csv
\`\`\`

---

### 과제 2. 고객별 구매 요약 리포트 만들기

다음 지표를 포함한 고객별 요약표를 만드세요.

\`\`\`text
total_purchase
order_count
avg_order_amount
first_order_date
last_order_date
days_since_last_order
is_repeat_customer
category_count
\`\`\`

제출물:

\`\`\`text
customer_summary.csv
\`\`\`

---

### 과제 3. 카테고리 내 상품 순위 만들기

상품별 매출을 계산하고, 카테고리 내 상품 순위를 구하세요.

필수 컬럼:

\`\`\`text
category
product_id
product_name
total_sales
order_count
sales_rank_in_category
sales_ratio_in_category
\`\`\`

제출물:

\`\`\`text
product_rank_by_category.csv
\`\`\`

---

### 과제 4. 지역별 카테고리 매출 비중 계산

지역별 카테고리 매출과 지역 내 비중을 계산하세요.

필수 컬럼:

\`\`\`text
region
category
total_sales
region_total_sales
sales_ratio_in_region
\`\`\`

제출물:

\`\`\`text
region_category_ratio.csv
\`\`\`

---

### 과제 5. 월별 카테고리 매출 비중 계산

월별 카테고리 매출, 월별 총매출, 월 내 비중, 월 내 순위를 계산하세요.

필수 컬럼:

\`\`\`text
year_month
category
total_sales
monthly_total_sales
sales_ratio_in_month
category_rank_in_month
\`\`\`

제출물:

\`\`\`text
monthly_category_ratio.csv
\`\`\`

---

### 과제 6. 그룹 필터링

총구매액이 100,000원 이상인 고객의 주문만 추출하고, 고객별 요약표를 만드세요.

제출물:

\`\`\`text
group_filter_result.csv
\`\`\`

---

### 과제 7. 구매 차수 만들기

고객별 주문일 기준으로 구매 차수를 만드세요.

필수 컬럼:

\`\`\`text
customer_id
order_id
order_date_dt
purchase_number
\`\`\`

---

### 과제 8. 분석 보고서 작성

다음 구조로 Markdown 보고서를 작성하세요.

\`\`\`markdown
# 고급 groupby 분석 리포트

## 1. 분석 목적

## 2. 사용 데이터

## 3. 카테고리별 매출 요약

## 4. 고객별 구매 요약

## 5. 카테고리 내 상품 순위

## 6. 지역별 카테고리 비중

## 7. 월별 카테고리 비중

## 8. 주요 인사이트

## 9. 주의사항

## 10. 다음 단계
\`\`\`

제출물:

\`\`\`text
advanced_groupby_report.md
\`\`\`

---
`;export{e as default};