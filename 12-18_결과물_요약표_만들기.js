var e=`# 12장. A/B 테스트 분석 실습

## 12.18 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
ab_test_output_summary = pd.DataFrame([
    {
        "output_name": "ab_test_clean",
        "file_name": "chapter_12_ab_test_clean.csv",
        "description": "정리된 A/B 테스트 분석 데이터"
    },
    {
        "output_name": "ab_test_group_summary",
        "file_name": "chapter_12_ab_test_group_summary.csv",
        "description": "실험군과 대조군의 사용자 수, 전환자 수, 매출 요약"
    },
    {
        "output_name": "sample_ratio_check",
        "file_name": "chapter_12_sample_ratio_check.csv",
        "description": "기대 배정 비율과 실제 배정 비율 비교"
    },
    {
        "output_name": "conversion_rate_comparison",
        "file_name": "chapter_12_conversion_rate_comparison.csv",
        "description": "그룹별 전환율, 전환율 차이, 상대 개선율"
    },
    {
        "output_name": "conversion_statistical_result",
        "file_name": "chapter_12_conversion_statistical_result.csv",
        "description": "두 비율 z-test와 전환율 차이 신뢰구간"
    },
    {
        "output_name": "purchase_amount_comparison",
        "file_name": "chapter_12_purchase_amount_comparison.csv",
        "description": "구매자 기준 평균 구매 금액 비교"
    },
    {
        "output_name": "revenue_per_user_comparison",
        "file_name": "chapter_12_revenue_per_user_comparison.csv",
        "description": "전체 사용자 기준 사용자당 매출 비교"
    },
    {
        "output_name": "purchase_bootstrap_result",
        "file_name": "chapter_12_purchase_bootstrap_result.csv",
        "description": "구매 금액 평균 차이 부트스트랩 결과"
    },
    {
        "output_name": "ab_test_decision_summary",
        "file_name": "chapter_12_ab_test_decision_summary.csv",
        "description": "실험 적용 여부 의사결정 요약"
    },
    {
        "output_name": "ab_test_result_report",
        "file_name": "chapter_12_ab_test_result_report.md",
        "description": "A/B 테스트 분석 보고서"
    }
])

ab_test_output_summary
\`\`\`

저장합니다.

\`\`\`python
ab_test_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_12_ab_test_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};