var e=`# 6장. 고급 groupby 분석 리포트

## 6.1 이번 장에서 만들 결과물

이번 장에서는 다음 파일을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  outputs/
    tables/
      chapter_06_category_summary.csv
      chapter_06_customer_summary.csv
      chapter_06_product_rank_by_category.csv
      chapter_06_region_category_ratio.csv
      chapter_06_monthly_category_ratio.csv
      chapter_06_customer_avg_comparison.csv
      chapter_06_group_filter_result.csv
      chapter_06_groupby_summary.csv
    reports/
      chapter_06_advanced_groupby_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_06_category_summary.csv\` | 카테고리별 매출, 주문 수, 평균 주문 금액, 고객 수 요약 |
| \`chapter_06_customer_summary.csv\` | 고객별 구매 횟수, 총구매액, 평균 주문 금액, 주 구매 카테고리 |
| \`chapter_06_product_rank_by_category.csv\` | 카테고리 내 상품별 매출 순위 |
| \`chapter_06_region_category_ratio.csv\` | 지역별 카테고리 매출 비중 |
| \`chapter_06_monthly_category_ratio.csv\` | 월별 카테고리 매출 비중 |
| \`chapter_06_customer_avg_comparison.csv\` | 고객별 구매액과 전체 평균 비교 |
| \`chapter_06_group_filter_result.csv\` | 조건을 만족하는 그룹만 필터링한 결과 |
| \`chapter_06_groupby_summary.csv\` | 이번 장에서 생성한 결과물 요약 |
| \`chapter_06_advanced_groupby_report.md\` | 고급 groupby 분석 보고서 |

이번 장의 결과물은 이후 7장 이동평균 분석, 8장 시계열 분석, 10장 고객 Feature Table, 14장 RFM 분석에서 계속 활용할 수 있습니다.

---
`;export{e as default};