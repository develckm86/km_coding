var e=`# 6장. 고급 groupby 분석 리포트

## 6.20 핵심 정리

이번 장에서는 고급 groupby 분석 리포트를 만드는 방법을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
이름 있는 집계는 보고용 요약표를 만들 때 유용하다.
agg는 그룹별 결과를 요약해 행 수를 줄인다.
transform은 그룹별 계산 결과를 원본 행 수에 맞춰 붙인다.
filter는 조건을 만족하는 그룹 전체를 남긴다.
rank는 그룹 내 순위를 계산할 때 사용한다.
cumcount는 그룹 안에서 순서를 만들 때 사용한다.
그룹 내 비율을 계산할 때는 분모가 무엇인지 명확히 해야 한다.
고객별 구매 요약표는 RFM 분석과 리텐션 분석의 기초가 된다.
카테고리 내 상품 순위는 상품 운영 전략에 활용할 수 있다.
월별 카테고리 비중은 매출 변화의 원인 후보를 찾는 데 유용하다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_06_category_summary.csv
chapter_06_customer_summary.csv
chapter_06_product_rank_by_category.csv
chapter_06_region_category_ratio.csv
chapter_06_monthly_category_ratio.csv
chapter_06_customer_avg_comparison.csv
chapter_06_group_filter_result.csv
chapter_06_groupby_summary.csv
chapter_06_advanced_groupby_report.md
\`\`\`

---
`;export{e as default};