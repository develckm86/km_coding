var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.19 3장 실습 과제

이번 장의 과제는 직접 데이터 품질 진단 리포트를 만드는 것입니다.

---

### 과제 1. 데이터 구조 요약표 만들기

주문, 고객, 상품 데이터에 대해 다음 컬럼을 가진 구조 요약표를 만드세요.

\`\`\`text
table_name
row_count
column_count
\`\`\`

제출물:

\`\`\`text
structure_summary.csv
\`\`\`

---

### 과제 2. 결측치 요약표 만들기

각 테이블의 컬럼별 결측치 개수와 비율을 계산하세요.

필수 컬럼:

\`\`\`text
table_name
column_name
row_count
missing_count
missing_ratio_percent
\`\`\`

제출물:

\`\`\`text
missing_summary.csv
\`\`\`

---

### 과제 3. 중복 key 진단표 만들기

다음 key의 중복 여부를 확인하세요.

\`\`\`text
orders.order_id
customers.customer_id
products.product_id
\`\`\`

필수 컬럼:

\`\`\`text
table_name
key_columns
row_count
duplicate_count
duplicate_ratio_percent
is_unique
\`\`\`

제출물:

\`\`\`text
duplicate_summary.csv
\`\`\`

---

### 과제 4. key 매칭 실패 목록 만들기

다음 항목을 확인하세요.

\`\`\`text
orders.customer_id 중 customers.customer_id에 없는 값
orders.product_id 중 products.product_id에 없는 값
\`\`\`

제출물:

\`\`\`text
key_matching_summary.csv
\`\`\`

---

### 과제 5. 날짜 오류 목록 만들기

다음 컬럼의 날짜 변환 실패 행을 찾으세요.

\`\`\`text
orders.order_date
customers.signup_date
\`\`\`

제출물:

\`\`\`text
invalid_dates.csv
\`\`\`

---

### 과제 6. 이상값 후보 목록 만들기

다음 조건에 해당하는 행을 찾으세요.

\`\`\`text
quantity <= 0
coupon_amount < 0
unit_price <= 0
net_amount IQR 기준 이상값 후보
\`\`\`

제출물:

\`\`\`text
outlier_candidates.csv
\`\`\`

---

### 과제 7. 품질 이슈 목록 만들기

다음 컬럼을 가진 품질 이슈 목록을 만드세요.

\`\`\`text
issue_id
issue_area
issue_name
severity
affected_table
affected_column
affected_count
impact
recommended_action
\`\`\`

제출물:

\`\`\`text
quality_issue_list.csv
\`\`\`

---

### 과제 8. 데이터 품질 진단 보고서 작성하기

다음 구조로 Markdown 보고서를 작성하세요.

\`\`\`markdown
# 데이터 품질 진단 리포트

## 1. 진단 목적

## 2. 진단 대상 데이터

## 3. 결측치 진단 결과

## 4. 중복값 진단 결과

## 5. key 매칭 진단 결과

## 6. 날짜 오류 진단 결과

## 7. 이상값 후보 진단 결과

## 8. 주요 품질 이슈

## 9. 처리 우선순위

## 10. 다음 단계
\`\`\`

제출물:

\`\`\`text
data_quality_report.md
\`\`\`

---
`;export{e as default};