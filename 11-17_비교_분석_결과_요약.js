var e=`# 11장. 통계적 비교 실습

## 11.17 비교 분석 결과 요약

이번 장에서 만든 결과물을 요약합니다.

\`\`\`python
statistical_comparison_summary = pd.DataFrame([
    {
        "output_name": "group_size_summary",
        "file_name": "chapter_11_group_size_summary.csv",
        "description": "주요 그룹별 표본 수 요약"
    },
    {
        "output_name": "grade_comparison_summary",
        "file_name": "chapter_11_grade_comparison_summary.csv",
        "description": "VIP와 일반 고객 total_purchase 비교"
    },
    {
        "output_name": "coupon_user_comparison_summary",
        "file_name": "chapter_11_coupon_user_comparison_summary.csv",
        "description": "쿠폰 사용자와 미사용자 total_purchase 비교"
    },
    {
        "output_name": "repeat_customer_comparison_summary",
        "file_name": "chapter_11_repeat_customer_comparison_summary.csv",
        "description": "재구매 고객과 1회 구매 고객 avg_order_amount 비교"
    },
    {
        "output_name": "main_category_comparison_summary",
        "file_name": "chapter_11_main_category_comparison_summary.csv",
        "description": "주 구매 카테고리별 total_purchase 비교"
    },
    {
        "output_name": "bootstrap_mean_diff",
        "file_name": "chapter_11_bootstrap_mean_diff.csv",
        "description": "VIP와 일반 고객 평균 차이 부트스트랩 결과"
    },
    {
        "output_name": "confidence_interval_summary",
        "file_name": "chapter_11_confidence_interval_summary.csv",
        "description": "평균 차이 95% 신뢰구간"
    },
    {
        "output_name": "ttest_result",
        "file_name": "chapter_11_ttest_result.csv",
        "description": "Welch t-test 결과"
    },
    {
        "output_name": "ratio_comparison_summary",
        "file_name": "chapter_11_ratio_comparison_summary.csv",
        "description": "재구매율 비율 비교"
    }
])

statistical_comparison_summary
\`\`\`

저장합니다.

\`\`\`python
statistical_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_statistical_comparison_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};