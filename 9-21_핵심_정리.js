var e=`# 9장. 복잡한 데이터 결합 실습

## 9.21 핵심 정리

이번 장에서는 복잡한 데이터 결합을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
결합 전 key 유일성을 반드시 확인해야 한다.
오른쪽 기준표 key가 중복되면 결합 후 행 수가 늘어날 수 있다.
merge에는 validate 옵션을 사용하는 것이 안전하다.
indicator=True를 사용하면 매칭 실패를 확인할 수 있다.
다중 key 결합은 여러 컬럼을 함께 기준으로 사용한다.
상품 가격이 시간에 따라 변하면 주문일 기준 가격 이력을 붙여야 한다.
고객 등급이 시간에 따라 변하면 주문일 기준 등급 이력을 붙여야 한다.
merge_asof는 시간 기준으로 가장 가까운 이전 값을 붙일 때 유용하다.
결합 후에는 행 수, 매칭 실패, 매출 합계를 검증해야 한다.
광고비와 매출 데이터를 결합하면 ROAS 같은 캠페인 지표를 계산할 수 있다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_09_orders_joined_verified.csv
chapter_09_orders_with_price_history.csv
chapter_09_orders_with_grade_history.csv
chapter_09_sales_ad_joined.csv
chapter_09_join_key_check.csv
chapter_09_join_validation_summary.csv
chapter_09_unmatched_keys_report.csv
chapter_09_many_to_many_problem.csv
chapter_09_multi_key_join_result.csv
chapter_09_price_history_join_check.csv
chapter_09_grade_history_join_check.csv
chapter_09_ad_sales_join_summary.csv
chapter_09_advanced_join_summary.csv
chapter_09_advanced_join_report.md
\`\`\`

---
`;export{e as default};