var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.17 기술 보고서 작성

Executive Summary는 의사결정자용 문서입니다.  
기술 보고서는 분석가나 실무자가 재현할 수 있도록 자세한 기준을 담습니다.

---

### 20.17.1 기술 보고서 구성

\`\`\`text
1. 데이터 출처
2. 데이터 품질 진단 기준
3. 정제 기준
4. 데이터마트 생성 기준
5. 매출 지표 정의
6. 고객 Feature 정의
7. RFM 점수화 기준
8. 코호트 리텐션 기준
9. 퍼널 분석 기준
10. SQL 검증 기준
11. 산출물 목록
\`\`\`

---

### 20.17.2 기술 보고서 작성 코드

\`\`\`python
technical_report = """
# Final Project Technical Report

## 1. 데이터 출처

본 프로젝트에서는 다음 원본 데이터를 사용했다.

- final_project_orders_raw.csv
- final_project_customers_raw.csv
- final_project_products_raw.csv
- final_project_events_raw.csv

## 2. 데이터 품질 진단 기준

주문 데이터에 대해 다음 항목을 점검했다.

- customer_id 결측
- order_date 결측
- net_amount 음수
- order_id 중복
- 상품 마스터 매칭 실패

결과 파일:
- final_project_data_quality_report.csv

## 3. 정제 기준

주문 데이터 정제 기준은 다음과 같다.

- order_id 중복은 첫 번째 행만 유지
- customer_id 결측 주문 제외
- order_date 결측 주문 제외
- net_amount 음수 주문 제외
- 상품 마스터에 없는 product_id 제외

정제 결과:
- final_project_orders_clean.csv

## 4. 데이터마트 생성 기준

정제 주문 데이터에 고객 데이터와 상품 데이터를 left join 방식으로 결합했다.

결합 key:
- orders.customer_id = customers.customer_id
- orders.product_id = products.product_id

결과 파일:
- final_project_data_mart.csv

## 5. 매출 지표 정의

- 총매출 = sum(net_amount)
- 주문 수 = nunique(order_id)
- 구매 고객 수 = nunique(customer_id)
- 평균 주문 금액 = 총매출 / 주문 수

결과 파일:
- final_project_sales_summary.csv
- final_project_monthly_sales.csv
- final_project_category_sales.csv

## 6. 고객 Feature 정의

고객별 Feature Table은 customer_id 기준으로 집계했다.

주요 Feature:
- total_purchase
- order_count
- avg_order_amount
- first_order_date
- last_order_date
- days_since_last_order
- category_count
- value_segment

결과 파일:
- final_project_customer_features.csv

## 7. RFM 점수화 기준

RFM 기준일:
- 2026-06-30

정의:
- Recency = 기준일 - 마지막 구매일
- Frequency = 고객별 주문 수
- Monetary = 고객별 총구매액

점수화:
- R: recency가 작을수록 높은 점수
- F: frequency가 클수록 높은 점수
- M: monetary가 클수록 높은 점수

결과 파일:
- final_project_rfm_segments.csv
- final_project_rfm_segment_summary.csv

## 8. 코호트 리텐션 기준

첫 구매 월을 cohort_month로 정의했다.

- order_month = 주문 월
- cohort_index = order_month - cohort_month
- 리텐션 = 해당 경과 월 구매 고객 수 / 0개월 고객 수

결과 파일:
- final_project_cohort_retention.csv

## 9. 퍼널 분석 기준

퍼널 단계는 다음과 같다.

1. visit
2. product_view
3. add_to_cart
4. checkout_start
5. purchase

사용자 기준으로 각 단계 도달 여부를 계산했다.

결과 파일:
- final_project_funnel_flags.csv
- final_project_funnel_report.csv

## 10. SQL 검증 기준

DuckDB를 사용해 데이터마트의 월별 매출을 SQL로 검증했다.

결과 파일:
- final_project_sql_sales_summary.csv
- final_project_analysis_queries.sql

## 11. 산출물 목록

최종 산출물은 final_project_output_inventory.csv에 정리했다.
"""
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "final_project_technical_report.md").write_text(
    technical_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};