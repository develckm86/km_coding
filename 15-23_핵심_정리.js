var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.23 핵심 정리

이번 장에서는 코호트와 리텐션 분석을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
코호트는 같은 시점이나 같은 특성을 가진 고객 그룹이다.
첫 구매 월 기준 코호트는 고객의 첫 구매 월을 기준으로 만든다.
가입 월 기준 코호트는 고객의 가입 월을 기준으로 만든다.
리텐션은 시간이 지나도 고객이 다시 행동하는 비율이다.
구매 리텐션은 보통 재구매 고객 수를 코호트 최초 고객 수로 나누어 계산한다.
cohort_index는 첫 구매 월 이후 몇 개월이 지났는지를 나타낸다.
리텐션 테이블은 코호트별 고객 유지 흐름을 보여준다.
리텐션 히트맵은 코호트별 유지 패턴을 시각적으로 파악하는 데 유용하다.
고객 수 리텐션과 매출 리텐션은 서로 다른 정보를 제공한다.
코호트 크기가 작으면 리텐션 비율 해석에 주의해야 한다.
최근 코호트는 아직 시간이 충분히 지나지 않았기 때문에 긴 기간 리텐션을 알 수 없다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_15_cohort_base_orders.csv
chapter_15_customer_cohort_table.csv
chapter_15_first_purchase_cohort.csv
chapter_15_cohort_data.csv
chapter_15_cohort_count_table.csv
chapter_15_cohort_retention_table.csv
chapter_15_cohort_retention_long.csv
chapter_15_signup_cohort_retention_table.csv
chapter_15_cohort_sales_table.csv
chapter_15_cohort_avg_order_table.csv
chapter_15_cohort_summary.csv
chapter_15_cohort_quality_check.csv
chapter_15_cohort_output_summary.csv
chapter_15_cohort_analysis_report.md
\`\`\`

---
`;export{e as default};