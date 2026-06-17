var e=`# 12장. A/B 테스트 분석 실습

## 12.23 핵심 정리

이번 장에서는 A/B 테스트 분석을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
A/B 테스트는 실험군과 대조군을 비교하는 실험 분석 방법이다.
실험 분석에서는 전환율 계산 전에 데이터 검증이 먼저다.
중복 user_id, 잘못된 그룹 값, 결측치, 값의 범위를 확인해야 한다.
Sample Ratio Mismatch는 실험군과 대조군의 배정 비율이 기대와 다른지 확인하는 과정이다.
전환율 차이는 퍼센트포인트로 해석하고, 상대 개선율은 기존 대비 개선 비율로 해석한다.
두 비율 z-test를 사용해 전환율 차이의 통계적 유의성을 확인할 수 있다.
구매자 평균 구매 금액과 전체 사용자당 매출은 서로 다른 지표다.
p-value만 보고 의사결정하면 안 된다.
통계적 유의성과 실무적 의미는 구분해야 한다.
A/B 테스트 결과는 성공 지표, 보조 지표, 가드레일 지표를 함께 고려해 해석해야 한다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_12_ab_test_clean.csv
chapter_12_ab_test_group_summary.csv
chapter_12_sample_ratio_check.csv
chapter_12_conversion_rate_comparison.csv
chapter_12_purchase_amount_comparison.csv
chapter_12_revenue_per_user_comparison.csv
chapter_12_conversion_statistical_result.csv
chapter_12_purchase_bootstrap_result.csv
chapter_12_ab_test_decision_summary.csv
chapter_12_ab_test_output_summary.csv
chapter_12_ab_test_result_report.md
\`\`\`

---
`;export{e as default};