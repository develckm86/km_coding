var e=`# 14장. RFM 고객 분석 실습

## 14.15 RFM 분석 보고서 작성하기

이번 장의 분석 결과를 Markdown 보고서로 정리합니다.

---

### 14.15.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. RFM 분석 기준
4. RFM 원본 지표
5. RFM 점수화 방법
6. RFM 세그먼트 정의
7. 세그먼트별 요약
8. 핵심 고객과 이탈 위험 고객
9. 세그먼트별 전략 제안
10. 품질 점검
11. 주요 인사이트
12. 주의사항
13. 다음 단계
\`\`\`

---

### 14.15.2 보고서 작성 코드

\`\`\`python
rfm_report = f'''# 14장 실습 보고서: RFM 고객 분석 실습

## 1. 분석 목적

본 실습은 주문 데이터를 사용해 고객별 Recency, Frequency, Monetary를 계산하고,
RFM 점수를 기반으로 고객을 세그먼트로 분류하는 것을 목적으로 한다.
분석 결과는 고객 유지, 재구매 유도, 이탈 방지, VIP 관리 전략 수립에 활용할 수 있다.

## 2. 사용 데이터

- 입력 데이터: chapter_10_customer_order_base.csv, chapter_04_orders_mart.csv 또는 수업용 주문 데이터
- 분석 단위: 고객
- 기준 key: customer_id
- 주요 컬럼: order_id, customer_id, customer_name, order_date, net_amount, category, region

RFM 분석용 주문 데이터:
- chapter_14_rfm_base_orders.csv

## 3. RFM 분석 기준

기준일:
- 2026-04-30

RFM 정의:
- Recency = 기준일 - 마지막 구매일
- Frequency = 고객별 주문 횟수
- Monetary = 고객별 총구매액

주의:
- Recency는 값이 작을수록 좋은 고객이다.
- Frequency와 Monetary는 값이 클수록 좋은 고객이다.

## 4. RFM 원본 지표

고객별 마지막 구매일, 첫 구매일, 구매 횟수, 총구매액을 계산했다.

결과 파일:
- chapter_14_rfm_raw_table.csv

## 5. RFM 점수화 방법

각 지표를 1점부터 5점까지 분위수 기반으로 점수화했다.

점수 방향:
- Recency: 값이 작을수록 높은 점수
- Frequency: 값이 클수록 높은 점수
- Monetary: 값이 클수록 높은 점수

결과 파일:
- chapter_14_rfm_score_table.csv

## 6. RFM 세그먼트 정의

다음 세그먼트를 사용했다.

- Champions
- Loyal Customers
- Big Spenders
- Potential Loyalists
- New Customers
- Need Attention
- At Risk
- Hibernating
- Others

최종 고객 세그먼트 파일:
- chapter_14_rfm_customer_segments.csv

## 7. 세그먼트별 요약

세그먼트별 고객 수, 총구매액, 평균 Recency, 평균 Frequency, 평균 Monetary를 계산했다.

결과 파일:
- chapter_14_rfm_segment_summary.csv

그래프:
- chapter_14_rfm_segment_count_chart.png
- chapter_14_rfm_segment_sales_chart.png

## 8. 핵심 고객과 이탈 위험 고객

핵심 고객:
- Champions
- Loyal Customers

이탈 위험 고객:
- At Risk

휴면 고객:
- Hibernating

결과 파일:
- chapter_14_rfm_top_customers.csv
- chapter_14_rfm_at_risk_customers.csv
- chapter_14_rfm_hibernating_customers.csv

## 9. 세그먼트별 전략 제안

세그먼트별 전략을 작성했다.

결과 파일:
- chapter_14_rfm_segment_strategy.csv

예시:
- Champions: VIP 혜택, 신상품 우선 안내, 멤버십 강화
- At Risk: 복귀 쿠폰, 과거 구매 상품 리마인드
- New Customers: 두 번째 구매 유도 쿠폰
- Hibernating: 저비용 재활성화 캠페인

## 10. 품질 점검

RFM 결과에 대해 다음 항목을 점검했다.

- customer_id 중복 여부
- recency 음수 여부
- frequency 0 이하 여부
- monetary 음수 여부
- R, F, M 점수 범위

결과 파일:
- chapter_14_rfm_quality_check.csv

## 11. 주요 인사이트

- RFM 분석은 고객의 최근성, 구매 빈도, 구매 금액을 함께 고려해 고객을 분류한다.
- Champions와 Loyal Customers는 유지와 관계 강화 전략이 중요하다.
- At Risk 고객은 과거 구매 이력이 있으나 최근 구매가 부족하므로 복귀 캠페인 대상이 될 수 있다.
- New Customers는 두 번째 구매를 유도하는 것이 중요하다.
- Hibernating 고객은 비용 대비 효과를 고려해 저비용 캠페인으로 접근하는 것이 좋다.

## 12. 주의사항

- RFM 점수 기준은 비즈니스 상황에 따라 달라질 수 있다.
- Recency 기준일을 반드시 명시해야 한다.
- 분석 기간이 짧으면 Frequency와 Monetary가 낮게 계산될 수 있다.
- 분위수 점수화는 고객 수가 적거나 값이 중복될 때 불안정할 수 있다.
- RFM은 고객 행동을 단순화한 분석이므로 고객 만족도, 유입 채널, 상품 선호도 등 추가 데이터와 함께 보는 것이 좋다.
- 세그먼트는 절대적인 고객 가치가 아니라 분석 기준에 따른 분류 결과다.

## 13. 다음 단계

다음 장에서는 코호트와 리텐션 분석을 실습한다.
RFM이 고객의 현재 상태를 요약한다면, 코호트 분석은 고객이 시간이 지나며 얼마나 유지되는지 보여준다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_14_rfm_segment_report.md").write_text(
    rfm_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};