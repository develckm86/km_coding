var e=`# 14장. RFM 고객 분석 실습

## 14.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_14_rfm_base_orders.csv
      chapter_14_rfm_customer_segments.csv
  outputs/
    tables/
      chapter_14_rfm_raw_table.csv
      chapter_14_rfm_score_table.csv
      chapter_14_rfm_segment_summary.csv
      chapter_14_rfm_segment_strategy.csv
      chapter_14_rfm_top_customers.csv
      chapter_14_rfm_at_risk_customers.csv
      chapter_14_rfm_hibernating_customers.csv
      chapter_14_rfm_quality_check.csv
      chapter_14_rfm_output_summary.csv
    charts/
      chapter_14_rfm_segment_count_chart.png
      chapter_14_rfm_segment_sales_chart.png
      chapter_14_recency_distribution.png
      chapter_14_frequency_distribution.png
      chapter_14_monetary_distribution.png
    reports/
      chapter_14_rfm_segment_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_14_rfm_base_orders.csv\` | RFM 계산에 사용할 주문 기준 데이터 |
| \`chapter_14_rfm_raw_table.csv\` | Recency, Frequency, Monetary 원본 지표 |
| \`chapter_14_rfm_score_table.csv\` | R, F, M 점수와 RFM 총점 |
| \`chapter_14_rfm_customer_segments.csv\` | 최종 고객별 RFM 세그먼트 데이터 |
| \`chapter_14_rfm_segment_summary.csv\` | 세그먼트별 고객 수, 매출, 평균 RFM 지표 |
| \`chapter_14_rfm_segment_strategy.csv\` | 세그먼트별 마케팅 전략 제안 |
| \`chapter_14_rfm_top_customers.csv\` | 핵심 고객 후보 목록 |
| \`chapter_14_rfm_at_risk_customers.csv\` | 이탈 위험 고객 목록 |
| \`chapter_14_rfm_hibernating_customers.csv\` | 휴면 고객 목록 |
| \`chapter_14_rfm_quality_check.csv\` | RFM 결과 품질 점검표 |
| \`chapter_14_rfm_segment_report.md\` | RFM 고객 분석 보고서 |

이번 장의 핵심 파일은 다음입니다.

\`\`\`text
chapter_14_rfm_customer_segments.csv
chapter_14_rfm_segment_report.md
\`\`\`

---
`;export{e as default};