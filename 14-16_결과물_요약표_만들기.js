var e=`# 14장. RFM 고객 분석 실습

## 14.16 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
rfm_output_summary = pd.DataFrame([
    {
        "output_name": "rfm_base_orders",
        "file_name": "chapter_14_rfm_base_orders.csv",
        "description": "RFM 분석에 사용한 주문 기준 데이터"
    },
    {
        "output_name": "rfm_raw_table",
        "file_name": "chapter_14_rfm_raw_table.csv",
        "description": "Recency, Frequency, Monetary 원본 지표"
    },
    {
        "output_name": "rfm_score_table",
        "file_name": "chapter_14_rfm_score_table.csv",
        "description": "R, F, M 점수와 RFM 총점"
    },
    {
        "output_name": "rfm_customer_segments",
        "file_name": "chapter_14_rfm_customer_segments.csv",
        "description": "최종 고객별 RFM 세그먼트"
    },
    {
        "output_name": "rfm_segment_summary",
        "file_name": "chapter_14_rfm_segment_summary.csv",
        "description": "RFM 세그먼트별 고객 수와 매출 요약"
    },
    {
        "output_name": "rfm_segment_strategy",
        "file_name": "chapter_14_rfm_segment_strategy.csv",
        "description": "세그먼트별 전략 제안"
    },
    {
        "output_name": "rfm_top_customers",
        "file_name": "chapter_14_rfm_top_customers.csv",
        "description": "핵심 고객 목록"
    },
    {
        "output_name": "rfm_at_risk_customers",
        "file_name": "chapter_14_rfm_at_risk_customers.csv",
        "description": "이탈 위험 고객 목록"
    },
    {
        "output_name": "rfm_hibernating_customers",
        "file_name": "chapter_14_rfm_hibernating_customers.csv",
        "description": "휴면 고객 목록"
    },
    {
        "output_name": "rfm_quality_check",
        "file_name": "chapter_14_rfm_quality_check.csv",
        "description": "RFM 결과 품질 점검표"
    },
    {
        "output_name": "rfm_segment_report",
        "file_name": "chapter_14_rfm_segment_report.md",
        "description": "RFM 고객 분석 보고서"
    }
])

rfm_output_summary
\`\`\`

저장합니다.

\`\`\`python
rfm_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};