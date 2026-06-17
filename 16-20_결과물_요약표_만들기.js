var e=`# 16장. 퍼널 분석 실습

## 16.20 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
funnel_output_summary = pd.DataFrame([
    {
        "output_name": "event_log_clean",
        "file_name": "chapter_16_event_log_clean.csv",
        "description": "정리된 이벤트 로그 데이터"
    },
    {
        "output_name": "user_funnel_flags",
        "file_name": "chapter_16_user_funnel_flags.csv",
        "description": "사용자별 퍼널 단계 도달 여부"
    },
    {
        "output_name": "event_log_quality_check",
        "file_name": "chapter_16_event_log_quality_check.csv",
        "description": "이벤트 로그 품질 점검 결과"
    },
    {
        "output_name": "funnel_step_summary",
        "file_name": "chapter_16_funnel_step_summary.csv",
        "description": "퍼널 단계별 사용자 수"
    },
    {
        "output_name": "funnel_conversion_report",
        "file_name": "chapter_16_funnel_conversion_report.csv",
        "description": "단계별 전환율과 전체 전환율"
    },
    {
        "output_name": "funnel_dropoff_report",
        "file_name": "chapter_16_funnel_dropoff_report.csv",
        "description": "단계별 이탈 수와 이탈률"
    },
    {
        "output_name": "segment_funnel_by_customer_type",
        "file_name": "chapter_16_segment_funnel_by_customer_type.csv",
        "description": "신규/기존 고객별 퍼널"
    },
    {
        "output_name": "segment_funnel_by_channel",
        "file_name": "chapter_16_segment_funnel_by_channel.csv",
        "description": "유입 채널별 퍼널"
    },
    {
        "output_name": "segment_funnel_by_device",
        "file_name": "chapter_16_segment_funnel_by_device.csv",
        "description": "기기별 퍼널"
    },
    {
        "output_name": "time_to_conversion_summary",
        "file_name": "chapter_16_time_to_conversion_summary.csv",
        "description": "구매 완료까지 걸린 시간 요약"
    },
    {
        "output_name": "funnel_analysis_report",
        "file_name": "chapter_16_funnel_analysis_report.md",
        "description": "퍼널 분석 보고서"
    }
])

funnel_output_summary
\`\`\`

저장합니다.

\`\`\`python
funnel_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_16_funnel_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};