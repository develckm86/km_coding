var e=`# 10장. 고객별 Feature Table 만들기

## 10.22 핵심 정리

이번 장에서는 고객별 Feature Table을 만드는 방법을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
Feature Table은 분석이나 모델링에 사용할 변수를 정리한 표다.
고객 Feature Table은 고객 한 명이 한 행이어야 한다.
주문 단위 데이터를 고객 단위로 변환하려면 groupby가 필요하다.
고객 Feature에는 구매 금액, 구매 빈도, 날짜 기반 변수, 카테고리 변수, 쿠폰 변수, 세그먼트 변수가 포함될 수 있다.
days_since_last_order는 기준일에 따라 달라지므로 기준일을 반드시 기록해야 한다.
is_repeat_customer는 분석 기간에 영향을 받는다.
main_category는 고객의 주요 구매 카테고리를 나타낸다.
coupon_usage_rate는 고객의 쿠폰 사용 성향을 보여주지만 쿠폰 효과를 의미하지는 않는다.
value_segment는 총구매액 기준의 간단한 고객 가치 분류다.
Feature 정의서는 변수의 의미와 계산 기준을 문서화하는 데 필요하다.
최종 Feature Table은 customer_id 중복이 없어야 한다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_10_customer_feature_table.csv
chapter_10_customer_order_base.csv
chapter_10_customer_feature_definition.csv
chapter_10_customer_purchase_summary.csv
chapter_10_customer_category_features.csv
chapter_10_customer_coupon_features.csv
chapter_10_customer_recency_features.csv
chapter_10_customer_value_segment.csv
chapter_10_feature_quality_check.csv
chapter_10_feature_table_summary.csv
chapter_10_customer_feature_report.md
\`\`\`

---
`;export{e as default};