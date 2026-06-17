var e=`# 12장. A/B 테스트 분석 실습

## 12.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_12_ab_test_clean.csv
  outputs/
    tables/
      chapter_12_ab_test_group_summary.csv
      chapter_12_sample_ratio_check.csv
      chapter_12_conversion_rate_comparison.csv
      chapter_12_purchase_amount_comparison.csv
      chapter_12_revenue_per_user_comparison.csv
      chapter_12_conversion_statistical_result.csv
      chapter_12_purchase_bootstrap_result.csv
      chapter_12_ab_test_decision_summary.csv
      chapter_12_ab_test_output_summary.csv
    charts/
      chapter_12_conversion_rate_chart.png
      chapter_12_purchase_amount_boxplot.png
      chapter_12_revenue_per_user_chart.png
      chapter_12_bootstrap_purchase_diff.png
    reports/
      chapter_12_ab_test_result_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_12_ab_test_clean.csv\` | 정리된 A/B 테스트 분석 데이터 |
| \`chapter_12_ab_test_group_summary.csv\` | 실험군·대조군 사용자 수와 기본 지표 |
| \`chapter_12_sample_ratio_check.csv\` | 실험군·대조군 비율 검증 |
| \`chapter_12_conversion_rate_comparison.csv\` | 그룹별 전환율 비교 |
| \`chapter_12_purchase_amount_comparison.csv\` | 그룹별 구매 금액 비교 |
| \`chapter_12_revenue_per_user_comparison.csv\` | 그룹별 사용자당 매출 비교 |
| \`chapter_12_conversion_statistical_result.csv\` | 전환율 차이 검정 결과 |
| \`chapter_12_purchase_bootstrap_result.csv\` | 구매 금액 차이 부트스트랩 결과 |
| \`chapter_12_ab_test_decision_summary.csv\` | 실험 의사결정 요약 |
| \`chapter_12_ab_test_result_report.md\` | A/B 테스트 분석 보고서 |

이번 장의 핵심 결과물은 다음입니다.

\`\`\`text
chapter_12_ab_test_result_report.md
\`\`\`

이 보고서는 실험 데이터 검증, 전환율 분석, 구매 금액 분석, 통계 검정, 의사결정 제안을 포함합니다.

---
`;export{e as default};