var e=`# 14장. RFM 고객 분석 실습

## 14.19 14장 실습 과제

이번 장의 과제는 주문 데이터를 사용해 RFM 고객 분석 리포트를 만드는 것입니다.

---

### 과제 1. RFM 분석용 주문 데이터 만들기

주문 데이터에서 다음 컬럼이 있는 분석용 데이터를 만드세요.

\`\`\`text
order_id
customer_id
customer_name
order_date
net_amount
category
region
\`\`\`

조건:

\`\`\`text
customer_id 결측 제거
order_date 변환 실패 제거
net_amount 결측 제거
net_amount 음수 제거
\`\`\`

제출물:

\`\`\`text
rfm_base_orders.csv
\`\`\`

---

### 과제 2. RFM 원본 지표 계산

기준일을 정하고 고객별로 다음 지표를 계산하세요.

\`\`\`text
first_order_date
last_order_date
recency
frequency
monetary
avg_order_amount
category_count
\`\`\`

제출물:

\`\`\`text
rfm_raw_table.csv
\`\`\`

---

### 과제 3. RFM 분포 시각화

다음 분포 그래프를 작성하세요.

\`\`\`text
Recency 분포
Frequency 분포
Monetary 분포
\`\`\`

제출물:

\`\`\`text
recency_distribution.png
frequency_distribution.png
monetary_distribution.png
\`\`\`

---

### 과제 4. RFM 점수화

각 고객에게 다음 점수를 부여하세요.

\`\`\`text
r_score
f_score
m_score
rfm_score_sum
rfm_code
\`\`\`

조건:

\`\`\`text
Recency는 값이 작을수록 높은 점수
Frequency는 값이 클수록 높은 점수
Monetary는 값이 클수록 높은 점수
\`\`\`

제출물:

\`\`\`text
rfm_score_table.csv
\`\`\`

---

### 과제 5. RFM 세그먼트 분류

RFM 점수를 사용해 고객 세그먼트를 만드세요.

예시 세그먼트:

\`\`\`text
Champions
Loyal Customers
Big Spenders
Potential Loyalists
New Customers
Need Attention
At Risk
Hibernating
Others
\`\`\`

제출물:

\`\`\`text
rfm_customer_segments.csv
\`\`\`

---

### 과제 6. 세그먼트별 요약표 만들기

세그먼트별로 다음 지표를 계산하세요.

\`\`\`text
customer_count
total_monetary
avg_recency
avg_frequency
avg_monetary
customer_ratio_percent
monetary_ratio_percent
\`\`\`

제출물:

\`\`\`text
rfm_segment_summary.csv
\`\`\`

---

### 과제 7. 세그먼트별 전략표 만들기

각 세그먼트에 대해 다음을 작성하세요.

\`\`\`text
description
strategy
message_example
\`\`\`

제출물:

\`\`\`text
rfm_segment_strategy.csv
\`\`\`

---

### 과제 8. 핵심 고객과 이탈 위험 고객 추출

다음 고객 목록을 추출하세요.

\`\`\`text
핵심 고객
이탈 위험 고객
휴면 고객
\`\`\`

제출물:

\`\`\`text
rfm_top_customers.csv
rfm_at_risk_customers.csv
rfm_hibernating_customers.csv
\`\`\`

---

### 과제 9. RFM 품질 점검

다음 항목을 점검하세요.

\`\`\`text
customer_id 중복 여부
recency 음수 여부
frequency 0 이하 여부
monetary 음수 여부
R, F, M 점수 범위
\`\`\`

제출물:

\`\`\`text
rfm_quality_check.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# RFM 고객 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. RFM 분석 기준

## 4. RFM 원본 지표

## 5. RFM 점수화 방법

## 6. RFM 세그먼트 정의

## 7. 세그먼트별 요약

## 8. 핵심 고객과 이탈 위험 고객

## 9. 세그먼트별 전략 제안

## 10. 품질 점검

## 11. 주요 인사이트

## 12. 주의사항

## 13. 다음 단계
\`\`\`

제출물:

\`\`\`text
rfm_segment_report.md
\`\`\`

---
`;export{e as default};