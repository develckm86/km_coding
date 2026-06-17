var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.22 20장 실습 과제

이번 장의 과제는 전체 데이터 분석 프로젝트를 완성하는 것입니다.

---

### 과제 1. 원본 데이터 준비

다음 원본 데이터를 준비하세요.

\`\`\`text
orders_raw
customers_raw
products_raw
events_raw
\`\`\`

제출물:

\`\`\`text
final_project_orders_raw.csv
final_project_customers_raw.csv
final_project_products_raw.csv
final_project_events_raw.csv
\`\`\`

---

### 과제 2. 데이터 품질 진단

주문 데이터에 대해 다음 품질 점검을 수행하세요.

\`\`\`text
customer_id 결측
order_date 결측
net_amount 음수
order_id 중복
상품 마스터 매칭 실패
\`\`\`

제출물:

\`\`\`text
final_project_data_quality_report.csv
\`\`\`

---

### 과제 3. 주문 데이터 정제

품질 진단 결과를 바탕으로 주문 데이터를 정제하세요.

제출물:

\`\`\`text
final_project_orders_clean.csv
\`\`\`

---

### 과제 4. 분석용 데이터마트 생성

정제 주문 데이터에 고객과 상품 정보를 결합하세요.

제출물:

\`\`\`text
final_project_data_mart.csv
\`\`\`

---

### 과제 5. 매출 분석

다음 분석을 수행하세요.

\`\`\`text
전체 매출 요약
월별 매출
카테고리별 매출
\`\`\`

제출물:

\`\`\`text
final_project_sales_summary.csv
final_project_monthly_sales.csv
final_project_category_sales.csv
\`\`\`

---

### 과제 6. 고객 Feature Table 생성

고객별 Feature Table을 생성하세요.

필수 컬럼:

\`\`\`text
customer_id
total_purchase
order_count
avg_order_amount
first_order_date
last_order_date
days_since_last_order
category_count
value_segment
\`\`\`

제출물:

\`\`\`text
final_project_customer_features.csv
\`\`\`

---

### 과제 7. RFM 고객 세그먼트 분석

고객별 RFM 점수와 세그먼트를 생성하세요.

제출물:

\`\`\`text
final_project_rfm_segments.csv
final_project_rfm_segment_summary.csv
\`\`\`

---

### 과제 8. 코호트와 퍼널 분석

첫 구매 월 기준 코호트 리텐션과 구매 퍼널 분석을 수행하세요.

제출물:

\`\`\`text
final_project_cohort_retention.csv
final_project_funnel_report.csv
\`\`\`

---

### 과제 9. 시각화 대시보드 작성

다음 그래프를 포함한 대시보드를 작성하세요.

\`\`\`text
월별 매출 추이
카테고리별 매출
RFM 세그먼트별 고객 수
구매 퍼널
\`\`\`

제출물:

\`\`\`text
final_project_dashboard.png
\`\`\`

---

### 과제 10. 최종 보고서 작성

Executive Summary와 기술 보고서를 작성하세요.

제출물:

\`\`\`text
final_project_executive_report.md
final_project_technical_report.md
\`\`\`

---
`;export{e as default};