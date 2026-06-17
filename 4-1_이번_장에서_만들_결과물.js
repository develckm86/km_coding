var e=`# 4장. 분석용 데이터마트 만들기

## 4.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 만듭니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_04_orders_mart.csv
      chapter_04_excluded_orders.csv
      chapter_04_customers_clean.csv
      chapter_04_products_clean.csv
  outputs/
    tables/
      chapter_04_preprocessing_summary.csv
      chapter_04_mart_quality_check.csv
  outputs/
    reports/
      chapter_04_preprocessing_log.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_04_orders_mart.csv\` | 최종 분석용 주문 데이터마트 |
| \`chapter_04_excluded_orders.csv\` | 분석에서 제외된 주문 목록 |
| \`chapter_04_customers_clean.csv\` | 정리된 고객 마스터 |
| \`chapter_04_products_clean.csv\` | 정리된 상품 마스터 |
| \`chapter_04_preprocessing_summary.csv\` | 전처리 단계별 요약 |
| \`chapter_04_mart_quality_check.csv\` | 데이터마트 생성 후 품질 확인 결과 |
| \`chapter_04_preprocessing_log.md\` | 전처리 기준과 결과를 정리한 Markdown 로그 |

이 장의 실습을 마치면 이후 장에서 계속 사용할 수 있는 분석용 데이터셋이 준비됩니다.

---
`;export{e as default};