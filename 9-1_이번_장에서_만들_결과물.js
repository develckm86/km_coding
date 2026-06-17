var e=`# 9장. 복잡한 데이터 결합 실습

## 9.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_09_orders_joined_verified.csv
      chapter_09_orders_with_price_history.csv
      chapter_09_orders_with_grade_history.csv
      chapter_09_sales_ad_joined.csv
  outputs/
    tables/
      chapter_09_join_key_check.csv
      chapter_09_join_validation_summary.csv
      chapter_09_unmatched_keys_report.csv
      chapter_09_many_to_many_problem.csv
      chapter_09_multi_key_join_result.csv
      chapter_09_price_history_join_check.csv
      chapter_09_grade_history_join_check.csv
      chapter_09_ad_sales_join_summary.csv
      chapter_09_advanced_join_summary.csv
    reports/
      chapter_09_advanced_join_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_09_orders_joined_verified.csv\` | 고객·상품 정보를 검증 후 결합한 주문 데이터 |
| \`chapter_09_orders_with_price_history.csv\` | 주문일 기준 상품 가격 이력을 붙인 주문 데이터 |
| \`chapter_09_orders_with_grade_history.csv\` | 주문일 기준 고객 등급 이력을 붙인 주문 데이터 |
| \`chapter_09_sales_ad_joined.csv\` | 월별 매출과 광고비 데이터를 결합한 데이터 |
| \`chapter_09_join_key_check.csv\` | 결합 전 key 유일성과 중복 여부 점검표 |
| \`chapter_09_join_validation_summary.csv\` | 결합 전후 행 수와 매출 합계 검증표 |
| \`chapter_09_unmatched_keys_report.csv\` | 매칭 실패 key 목록 |
| \`chapter_09_many_to_many_problem.csv\` | many-to-many 결합 문제 예시 |
| \`chapter_09_multi_key_join_result.csv\` | 다중 key 결합 결과 |
| \`chapter_09_price_history_join_check.csv\` | 가격 이력 결합 검증 결과 |
| \`chapter_09_grade_history_join_check.csv\` | 고객 등급 이력 결합 검증 결과 |
| \`chapter_09_ad_sales_join_summary.csv\` | 매출·광고비 결합 요약 |
| \`chapter_09_advanced_join_summary.csv\` | 이번 장 결과물 요약 |
| \`chapter_09_advanced_join_report.md\` | 복잡한 데이터 결합 실습 보고서 |

이번 장의 결과물은 이후 고객 분석, 캠페인 분석, A/B 테스트, 대용량 분석, 자동 리포트 생성에서 재사용할 수 있습니다.

---
`;export{e as default};