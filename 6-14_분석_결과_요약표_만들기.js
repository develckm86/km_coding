var e=`# 6장. 고급 groupby 분석 리포트

## 6.14 분석 결과 요약표 만들기

이번 장에서 만든 결과물을 요약합니다.

\`\`\`python
groupby_summary = pd.DataFrame([
    {
        "output_name": "category_summary",
        "file_name": "chapter_06_category_summary.csv",
        "description": "카테고리별 총매출, 주문 수, 평균 주문 금액, 매출 비중"
    },
    {
        "output_name": "customer_summary",
        "file_name": "chapter_06_customer_summary.csv",
        "description": "고객별 총구매액, 구매 횟수, 최근 구매일, 재구매 여부"
    },
    {
        "output_name": "product_rank_by_category",
        "file_name": "chapter_06_product_rank_by_category.csv",
        "description": "카테고리 내 상품별 매출 순위와 비중"
    },
    {
        "output_name": "region_category_ratio",
        "file_name": "chapter_06_region_category_ratio.csv",
        "description": "지역별 카테고리 매출 비중"
    },
    {
        "output_name": "monthly_category_ratio",
        "file_name": "chapter_06_monthly_category_ratio.csv",
        "description": "월별 카테고리 매출 비중과 순위"
    },
    {
        "output_name": "customer_avg_comparison",
        "file_name": "chapter_06_customer_avg_comparison.csv",
        "description": "고객별 구매액과 전체 평균 비교"
    },
    {
        "output_name": "group_filter_result",
        "file_name": "chapter_06_group_filter_result.csv",
        "description": "조건을 만족하는 고객 그룹 필터링 결과"
    }
])

groupby_summary
\`\`\`

저장합니다.

\`\`\`python
groupby_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_groupby_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};