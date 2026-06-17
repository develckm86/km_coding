var e=`# 16장. 퍼널 분석 실습

## 16.25 핵심 정리

이번 장에서는 퍼널 분석을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
퍼널 분석은 고객이 목표 행동까지 도달하는 단계를 분석하는 방법이다.
쇼핑몰 구매 퍼널은 방문, 상품 조회, 장바구니, 결제 시작, 구매 완료 단계로 정의할 수 있다.
퍼널 분석은 보통 이벤트 로그 데이터를 사용한다.
단계별 사용자 수는 고유 사용자 수 기준으로 계산해야 한다.
전체 전환율은 첫 단계 사용자 대비 각 단계 도달 비율이다.
단계별 전환율은 이전 단계 사용자 대비 현재 단계 도달 비율이다.
이탈률은 이전 단계에서 현재 단계로 넘어오지 못한 사용자 비율이다.
세그먼트별 퍼널은 신규/기존 고객, 채널, 기기별 차이를 보여준다.
전환까지 걸린 시간은 구매 의사결정 속도와 과정의 복잡성을 이해하는 데 도움이 된다.
이탈률이 높은 단계는 개선 후보가 될 수 있다.
퍼널 분석은 원인 후보를 찾는 분석이며, 개선 가설은 A/B 테스트로 검증하는 것이 좋다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_16_event_log_clean.csv
chapter_16_user_funnel_flags.csv
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
chapter_16_funnel_analysis_report.md
\`\`\`

---
`;export{e as default};