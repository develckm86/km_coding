var e=`# 5장. 데이터 재구조화 실습

## 5.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  outputs/
    tables/
      chapter_05_region_category_pivot.csv
      chapter_05_monthly_category_pivot.csv
      chapter_05_monthly_category_long.csv
      chapter_05_customer_month_pivot.csv
      chapter_05_wide_sales_sample.csv
      chapter_05_long_sales_sample.csv
      chapter_05_exploded_product_tags.csv
      chapter_05_reshape_summary.csv
    reports/
      chapter_05_reshape_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_05_region_category_pivot.csv\` | 지역 × 카테고리 매출 피벗 테이블 |
| \`chapter_05_monthly_category_pivot.csv\` | 월 × 카테고리 매출 피벗 테이블 |
| \`chapter_05_monthly_category_long.csv\` | 월별 카테고리 매출 long format |
| \`chapter_05_customer_month_pivot.csv\` | 고객별 월별 구매 금액 피벗 테이블 |
| \`chapter_05_wide_sales_sample.csv\` | wide format 예제 데이터 |
| \`chapter_05_long_sales_sample.csv\` | melt로 변환한 long format 데이터 |
| \`chapter_05_exploded_product_tags.csv\` | 리스트형 태그 컬럼을 행으로 펼친 데이터 |
| \`chapter_05_reshape_summary.csv\` | 재구조화 실습 결과 요약 |
| \`chapter_05_reshape_report.md\` | 데이터 재구조화 실습 보고서 |

이번 장의 실습 결과물은 6장 **고급 groupby 분석 리포트**와 17장 **고급 시각화 리포트**에서 계속 활용할 수 있습니다.

---
`;export{e as default};