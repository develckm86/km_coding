var e=`# 10장. 고객별 Feature Table 만들기

## 10.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_10_customer_feature_table.csv
      chapter_10_customer_order_base.csv
  outputs/
    tables/
      chapter_10_customer_feature_definition.csv
      chapter_10_customer_purchase_summary.csv
      chapter_10_customer_category_features.csv
      chapter_10_customer_coupon_features.csv
      chapter_10_customer_recency_features.csv
      chapter_10_customer_value_segment.csv
      chapter_10_feature_quality_check.csv
      chapter_10_feature_table_summary.csv
    reports/
      chapter_10_customer_feature_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_10_customer_feature_table.csv\` | 최종 고객별 Feature Table |
| \`chapter_10_customer_order_base.csv\` | Feature Table 생성에 사용한 주문 기준 데이터 |
| \`chapter_10_customer_feature_definition.csv\` | 고객 변수 정의서 |
| \`chapter_10_customer_purchase_summary.csv\` | 고객별 구매 금액, 구매 횟수 요약 |
| \`chapter_10_customer_category_features.csv\` | 고객별 카테고리 관련 변수 |
| \`chapter_10_customer_coupon_features.csv\` | 고객별 쿠폰 사용 관련 변수 |
| \`chapter_10_customer_recency_features.csv\` | 고객별 최근 구매 관련 변수 |
| \`chapter_10_customer_value_segment.csv\` | 고객 가치 등급 결과 |
| \`chapter_10_feature_quality_check.csv\` | Feature Table 품질 점검표 |
| \`chapter_10_feature_table_summary.csv\` | 이번 장 결과물 요약 |
| \`chapter_10_customer_feature_report.md\` | 고객별 Feature Table 생성 보고서 |

이번 장의 최종 핵심 파일은 다음입니다.

\`\`\`text
chapter_10_customer_feature_table.csv
\`\`\`

이 파일은 14장 RFM 고객 분석, 15장 코호트와 리텐션 분석, 19장 자동 리포트, 20장 종합 프로젝트에서 다시 사용할 수 있습니다.

---
`;export{e as default};