var e=`# 16장. 퍼널 분석 실습

## 16.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 생성합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    processed/
      chapter_16_event_log_clean.csv
      chapter_16_user_funnel_flags.csv
  outputs/
    tables/
      chapter_16_event_log_quality_check.csv
      chapter_16_funnel_step_summary.csv
      chapter_16_funnel_conversion_report.csv
      chapter_16_funnel_dropoff_report.csv
      chapter_16_segment_funnel_by_customer_type.csv
      chapter_16_segment_funnel_by_channel.csv
      chapter_16_segment_funnel_by_device.csv
      chapter_16_time_to_conversion_summary.csv
      chapter_16_funnel_issue_candidates.csv
      chapter_16_funnel_output_summary.csv
    charts/
      chapter_16_funnel_chart.png
      chapter_16_dropoff_chart.png
      chapter_16_channel_funnel_chart.png
      chapter_16_device_funnel_chart.png
      chapter_16_time_to_purchase_distribution.png
    reports/
      chapter_16_funnel_analysis_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_16_event_log_clean.csv\` | 정리된 이벤트 로그 데이터 |
| \`chapter_16_user_funnel_flags.csv\` | 사용자별 퍼널 단계 도달 여부 |
| \`chapter_16_event_log_quality_check.csv\` | 이벤트 로그 품질 점검 결과 |
| \`chapter_16_funnel_step_summary.csv\` | 단계별 사용자 수 |
| \`chapter_16_funnel_conversion_report.csv\` | 단계별 전환율과 전체 전환율 |
| \`chapter_16_funnel_dropoff_report.csv\` | 단계별 이탈 수와 이탈률 |
| \`chapter_16_segment_funnel_by_customer_type.csv\` | 신규/기존 고객별 퍼널 |
| \`chapter_16_segment_funnel_by_channel.csv\` | 유입 채널별 퍼널 |
| \`chapter_16_segment_funnel_by_device.csv\` | 기기별 퍼널 |
| \`chapter_16_time_to_conversion_summary.csv\` | 방문부터 구매까지 걸린 시간 요약 |
| \`chapter_16_funnel_issue_candidates.csv\` | 개선 후보 단계 목록 |
| \`chapter_16_funnel_analysis_report.md\` | 퍼널 분석 보고서 |

이번 장의 핵심 결과물은 다음입니다.

\`\`\`text
chapter_16_funnel_conversion_report.csv
chapter_16_funnel_chart.png
chapter_16_funnel_analysis_report.md
\`\`\`

---
`;export{e as default};