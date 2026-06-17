var e=`# 16장. 퍼널 분석 실습

## 16.19 퍼널 분석 보고서 작성하기

이번 장의 분석 결과를 Markdown 보고서로 정리합니다.

---

### 16.19.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. 퍼널 단계 정의
4. 이벤트 로그 품질 점검
5. 전체 퍼널 분석
6. 단계별 전환율과 이탈률
7. 신규/기존 고객 퍼널 비교
8. 유입 채널별 퍼널 비교
9. 기기별 퍼널 비교
10. 전환까지 걸린 시간
11. 개선 후보 단계와 가설
12. 주요 인사이트
13. 주의사항
14. 다음 단계
\`\`\`

---

### 16.19.2 보고서 작성 코드

\`\`\`python
final_purchase_rate = funnel_conversion_report.loc[
    funnel_conversion_report["event_name"] == "purchase",
    "overall_conversion_rate"
].iloc[0]

highest_dropoff_name = highest_dropoff_step["step_name"].iloc[0]
highest_dropoff_rate = highest_dropoff_step["dropoff_rate"].iloc[0]

funnel_report = f'''# 16장 실습 보고서: 퍼널 분석 실습

## 1. 분석 목적

본 실습은 쇼핑몰 이벤트 로그 데이터를 사용해 구매 퍼널을 분석하는 것을 목적으로 한다.
방문, 상품 조회, 장바구니, 결제 시작, 구매 완료 단계별 사용자 수와 전환율을 계산하고,
이탈이 큰 단계를 찾아 개선 가설을 작성한다.

## 2. 사용 데이터

- 입력 데이터: 이벤트 로그 데이터
- 분석 단위: 사용자
- 주요 컬럼: user_id, event_time, event_name, channel, device, customer_type

정리된 이벤트 로그:
- chapter_16_event_log_clean.csv

## 3. 퍼널 단계 정의

이번 실습에서는 다음 퍼널 단계를 사용했다.

1. 방문
2. 상품 조회
3. 장바구니
4. 결제 시작
5. 구매 완료

이벤트명 기준:
- visit
- product_view
- add_to_cart
- checkout_start
- purchase

## 4. 이벤트 로그 품질 점검

이벤트 로그 분석 전 다음 항목을 점검했다.

- event_time 결측 여부
- user_id 결측 여부
- 정의되지 않은 event_name
- 완전 중복 행

결과 파일:
- chapter_16_event_log_quality_check.csv

## 5. 전체 퍼널 분석

단계별 고유 사용자 수를 계산했다.

결과 파일:
- chapter_16_funnel_step_summary.csv

그래프:
- chapter_16_funnel_chart.png

최종 구매 전환율:
- {final_purchase_rate}%

## 6. 단계별 전환율과 이탈률

이전 단계 대비 다음 단계 전환율과 이탈률을 계산했다.

결과 파일:
- chapter_16_funnel_conversion_report.csv
- chapter_16_funnel_dropoff_report.csv

그래프:
- chapter_16_dropoff_chart.png

가장 이탈률이 높은 단계:
- {highest_dropoff_name}

해당 단계 이탈률:
- {highest_dropoff_rate}%

## 7. 신규/기존 고객 퍼널 비교

신규 고객과 기존 고객의 퍼널을 비교했다.

결과 파일:
- chapter_16_segment_funnel_by_customer_type.csv

해석:
기존 고객은 신규 고객보다 구매 완료 전환율이 높을 수 있다.
신규 고객의 이탈이 큰 단계는 첫 구매 유도 전략의 개선 후보가 된다.

## 8. 유입 채널별 퍼널 비교

유입 채널별 퍼널 전환율을 계산했다.

결과 파일:
- chapter_16_segment_funnel_by_channel.csv

그래프:
- chapter_16_channel_funnel_chart.png

해석:
채널별 전환율은 채널 품질을 비교하는 데 유용하다.
방문 수가 많은 채널이 반드시 구매 전환율도 높은 것은 아니다.

## 9. 기기별 퍼널 비교

모바일과 데스크톱의 퍼널 전환율을 비교했다.

결과 파일:
- chapter_16_segment_funnel_by_device.csv

그래프:
- chapter_16_device_funnel_chart.png

해석:
기기별 퍼널 차이는 사용자 경험 문제를 찾는 데 도움이 된다.
모바일에서 결제 단계 이탈이 높다면 모바일 결제 UX를 점검해야 한다.

## 10. 전환까지 걸린 시간

방문부터 구매 완료까지 걸린 시간을 계산했다.

결과 파일:
- chapter_16_time_to_conversion_summary.csv

그래프:
- chapter_16_time_to_purchase_distribution.png

해석:
전환까지 걸린 시간은 고객이 구매 결정을 내리는 데 필요한 시간을 보여준다.
신규 고객과 기존 고객의 전환 시간 차이를 비교하면 구매 의사결정 속도 차이를 확인할 수 있다.

## 11. 개선 후보 단계와 가설

이탈률이 높은 단계를 개선 후보로 정리했다.

결과 파일:
- chapter_16_funnel_issue_candidates.csv

개선 가설 예시:
- 상품 조회에서 장바구니 전환이 낮으면 상품 정보, 가격, 배송비, 리뷰, 장바구니 버튼을 점검한다.
- 장바구니에서 결제 시작 전환이 낮으면 최종 금액, 쿠폰 적용, 배송비 표시를 점검한다.
- 결제 시작에서 구매 완료 전환이 낮으면 결제 수단, 오류 로그, 로그인 절차, 모바일 UX를 점검한다.

## 12. 주요 인사이트

- 퍼널 분석은 고객 여정의 어느 단계에서 이탈이 발생하는지 보여준다.
- 전체 구매 전환율뿐 아니라 단계별 전환율을 함께 봐야 한다.
- 세그먼트별 퍼널을 비교하면 신규 고객, 유입 채널, 기기별 개선 포인트를 찾을 수 있다.
- 가장 이탈률이 높은 단계는 우선 개선 후보가 될 수 있다.
- 전환까지 걸린 시간은 구매 의사결정 속도와 결제 과정의 복잡성을 이해하는 데 도움이 된다.

## 13. 주의사항

- 퍼널 분석은 이벤트 로그 품질에 크게 의존한다.
- 이벤트 누락이나 중복이 있으면 전환율이 왜곡될 수 있다.
- 사용자 기준 퍼널과 세션 기준 퍼널은 결과가 다를 수 있다.
- 단계 순서가 중요한 퍼널에서는 이벤트 발생 순서를 검증해야 한다.
- 퍼널 차이는 원인 후보를 보여줄 뿐 인과관계를 증명하지 않는다.
- 개선 가설은 A/B 테스트나 추가 로그 분석으로 검증해야 한다.

## 14. 다음 단계

다음 장에서는 고급 시각화 리포트 만들기를 실습한다.
지금까지 만든 매출, 고객, RFM, 코호트, 퍼널 분석 결과를 하나의 시각화 리포트로 구성한다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_16_funnel_analysis_report.md").write_text(
    funnel_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};