var e=`# 10장. 고객별 Feature Table 만들기

## 10.17 Feature Table 보고서 작성하기

이번 장의 결과를 Markdown 보고서로 정리합니다.

---

### 10.17.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. Feature Table 생성 기준
4. 구매 요약 Feature
5. 날짜 기반 Feature
6. 카테고리 Feature
7. 쿠폰 Feature
8. 고객 가치 세그먼트
9. Feature Table 품질 점검
10. 주요 인사이트
11. 주의사항
12. 다음 단계
\`\`\`

---

### 10.17.2 보고서 작성 코드

\`\`\`python
feature_report = f'''# 10장 실습 보고서: 고객별 Feature Table 만들기

## 1. 분석 목적

본 실습은 주문 단위 데이터를 고객 단위로 요약하여 고객 분석용 Feature Table을 만드는 것을 목적으로 한다.
생성한 Feature Table은 RFM 분석, 리텐션 분석, 고객 세그먼트 분석, 마케팅 대상 고객 추출의 기반 데이터로 활용할 수 있다.

## 2. 사용 데이터

- 입력 데이터: chapter_09_orders_joined_verified.csv, chapter_04_orders_mart.csv 또는 수업용 주문 데이터
- 분석 단위: 고객
- 기준 key: customer_id
- 주요 컬럼: order_id, order_date, customer_id, category, net_amount, coupon_amount, signup_date

## 3. Feature Table 생성 기준

- 매출 분석이 가능한 주문만 사용했다.
- customer_id, order_date, net_amount가 없는 주문은 제외했다.
- 기준일은 2026-04-30으로 설정했다.
- 고객별 Feature는 customer_id 기준으로 집계했다.
- 재구매 고객은 order_count가 2 이상인 고객으로 정의했다.
- 쿠폰 사용 주문은 coupon_amount가 0보다 큰 주문으로 정의했다.
- 고객 가치 세그먼트는 total_purchase의 분위수를 기준으로 High, Middle, Low로 나누었다.

## 4. 구매 요약 Feature

생성한 주요 구매 요약 Feature는 다음과 같다.

- total_purchase
- order_count
- avg_order_amount
- median_order_amount
- max_order_amount
- min_order_amount
- total_quantity
- avg_quantity_per_order
- is_repeat_customer

결과 파일:
- chapter_10_customer_purchase_summary.csv

## 5. 날짜 기반 Feature

생성한 날짜 기반 Feature는 다음과 같다.

- first_order_date
- last_order_date
- days_since_first_order
- days_since_last_order
- active_period_days
- signup_to_first_order_days
- active_order_months

결과 파일:
- chapter_10_customer_recency_features.csv

## 6. 카테고리 Feature

생성한 카테고리 Feature는 다음과 같다.

- category_count
- product_count
- main_category
- main_category_sales
- book_sales
- lifestyle_sales
- electronics_sales
- electronics_sales_ratio

결과 파일:
- chapter_10_customer_category_features.csv

## 7. 쿠폰 Feature

생성한 쿠폰 Feature는 다음과 같다.

- coupon_order_count
- coupon_usage_rate
- total_coupon_amount
- avg_coupon_amount
- is_coupon_user

결과 파일:
- chapter_10_customer_coupon_features.csv

## 8. 고객 가치 세그먼트

총구매액 기준으로 고객을 다음 세 그룹으로 나누었다.

- High Value
- Middle Value
- Low Value

결과 파일:
- chapter_10_customer_value_segment.csv

## 9. Feature Table 품질 점검

최종 Feature Table에서 customer_id 중복 여부, 주요 수치형 Feature의 음수 여부,
coupon_usage_rate 범위 등을 점검했다.

결과 파일:
- chapter_10_feature_quality_check.csv

## 10. 최종 결과물

최종 고객별 Feature Table을 생성했다.

결과 파일:
- chapter_10_customer_feature_table.csv

총 고객 수:
- {len(customer_feature_table)}

생성된 Feature 수:
- {customer_feature_table.shape[1]}

## 11. 주요 인사이트

- total_purchase와 order_count는 고객 가치와 구매 빈도를 파악하는 핵심 Feature다.
- days_since_last_order는 고객의 최근 활동성을 보여주며, RFM 분석의 Recency에 해당한다.
- category_count와 main_category는 고객의 구매 다양성과 주요 관심 카테고리를 보여준다.
- coupon_usage_rate는 쿠폰 반응 성향을 파악하는 데 활용할 수 있다.
- value_segment는 고객을 간단히 가치 기준으로 나누는 데 유용하다.

## 12. 주의사항

- Feature 계산 기준은 반드시 문서화해야 한다.
- 기준일이 바뀌면 days_since_last_order 값도 바뀐다.
- 분석 기간이 짧으면 재구매 여부와 구매 빈도가 낮게 나타날 수 있다.
- 총구매액만으로 고객 가치를 판단하면 최근성이나 구매 빈도를 놓칠 수 있다.
- 쿠폰 사용률은 쿠폰 효과의 인과관계를 의미하지 않는다.
- Feature Table은 모델링이나 분석 목적에 따라 추가 정제가 필요할 수 있다.

## 13. 다음 단계

다음 장에서는 통계적 비교 실습을 진행한다.
VIP 고객과 일반 고객의 구매 금액 차이를 비교하고, 평균 차이가 의미 있는지 확인하는 방법을 실습한다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_10_customer_feature_report.md").write_text(
    feature_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};