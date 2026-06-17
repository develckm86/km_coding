var e=`# 10장. 고객별 Feature Table 만들기

## 10.15 Feature Table 결과물 요약

이번 장에서 만든 결과물을 정리합니다.

\`\`\`python
feature_table_summary = pd.DataFrame([
    {
        "output_name": "customer_order_base",
        "file_name": "chapter_10_customer_order_base.csv",
        "description": "Feature Table 생성에 사용한 주문 기준 데이터"
    },
    {
        "output_name": "customer_feature_definition",
        "file_name": "chapter_10_customer_feature_definition.csv",
        "description": "고객 Feature 정의서"
    },
    {
        "output_name": "customer_purchase_summary",
        "file_name": "chapter_10_customer_purchase_summary.csv",
        "description": "고객별 구매 금액과 구매 횟수 요약"
    },
    {
        "output_name": "customer_recency_features",
        "file_name": "chapter_10_customer_recency_features.csv",
        "description": "고객별 첫 구매일, 마지막 구매일, 최근 구매 후 경과일"
    },
    {
        "output_name": "customer_category_features",
        "file_name": "chapter_10_customer_category_features.csv",
        "description": "고객별 구매 카테고리 수, 주 구매 카테고리, 카테고리별 구매액"
    },
    {
        "output_name": "customer_coupon_features",
        "file_name": "chapter_10_customer_coupon_features.csv",
        "description": "고객별 쿠폰 사용률과 쿠폰 사용 금액"
    },
    {
        "output_name": "customer_value_segment",
        "file_name": "chapter_10_customer_value_segment.csv",
        "description": "총구매액 기준 고객 가치 세그먼트"
    },
    {
        "output_name": "customer_feature_table",
        "file_name": "chapter_10_customer_feature_table.csv",
        "description": "최종 고객별 Feature Table"
    },
    {
        "output_name": "feature_quality_check",
        "file_name": "chapter_10_feature_quality_check.csv",
        "description": "Feature Table 품질 점검표"
    }
])

feature_table_summary
\`\`\`

저장합니다.

\`\`\`python
feature_table_summary.to_csv(
    OUTPUT_TABLES / "chapter_10_feature_table_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};