var e=`# 17장. 고급 시각화 리포트 만들기

## 17.17 Executive Summary 리포트 작성

Executive Summary는 의사결정자가 빠르게 읽을 수 있는 요약 리포트입니다.

상세한 코드나 긴 설명보다 다음을 중심으로 작성합니다.

\`\`\`text
핵심 KPI
핵심 그래프
주요 인사이트
권장 액션
주의사항
\`\`\`

---

### 17.17.1 Executive Summary 구성

\`\`\`text
1. 리포트 목적
2. 핵심 KPI
3. 매출 요약
4. 고객 요약
5. 리텐션 요약
6. 퍼널 요약
7. 실험과 모델 요약
8. 권장 액션
9. 주의사항
\`\`\`

---

### 17.17.2 주요 수치 추출

\`\`\`python
top_category = category_sales.iloc[0]["category"]
top_category_sales_ratio = category_sales.iloc[0]["sales_ratio_percent"]

top_rfm_segment = rfm_segment_summary.iloc[0]["rfm_segment"]
top_rfm_sales = rfm_segment_summary.iloc[0]["total_monetary"]

highest_dropoff = funnel_report.sort_values("dropoff_rate", ascending=False).head(1)

highest_dropoff_step = highest_dropoff["step_name"].iloc[0]
highest_dropoff_rate = highest_dropoff["dropoff_rate"].iloc[0]
\`\`\`

---

### 17.17.3 Executive Summary 작성 코드

\`\`\`python
executive_summary_report = f'''# 17장 Executive Summary: 고급 시각화 리포트

## 1. 리포트 목적

본 리포트는 매출, 고객, 리텐션, 퍼널, 실험, 모델 분석 결과를 시각화하여
의사결정자가 핵심 현황과 개선 포인트를 빠르게 파악할 수 있도록 정리한 요약 보고서다.

## 2. 핵심 KPI

| KPI | 값 | 단위 | 설명 |
|---|---:|---|---|
| 총매출 | {round(total_sales, 0):,.0f} | 원 | 분석 기간 전체 순매출 |
| 주문 수 | {order_count:,} | 건 | 고유 주문 수 |
| 구매 고객 수 | {customer_count:,} | 명 | 고유 구매 고객 수 |
| 평균 주문 금액 | {round(avg_order_amount, 0):,.0f} | 원 | 총매출 / 주문 수 |
| 구매 전환율 | {round(purchase_conversion_rate, 2)} | % | 퍼널 기준 방문 대비 구매 완료율 |
| 핵심 고객 수 | {core_customer_count:,} | 명 | RFM 기준 핵심 또는 충성 고객 |
| 평균 1개월 후 리텐션 | {round(month1_retention, 2) if pd.notna(month1_retention) else "NA"} | % | 첫 구매 월 기준 평균 1개월 후 리텐션 |

## 3. 매출 요약

![월별 매출 추이](../charts/chapter_17_monthly_sales_trend.png)

월별 매출 추이를 통해 분석 기간 동안 매출이 어떻게 변했는지 확인할 수 있다.
특정 월에 매출이 크게 증가했다면 주문 수, 평균 주문 금액, 카테고리별 매출 기여도를 추가로 확인해야 한다.

![카테고리별 매출](../charts/chapter_17_category_sales_bar.png)

가장 매출 비중이 높은 카테고리는 **{top_category}**이며, 전체 매출의 약 **{top_category_sales_ratio}%**를 차지한다.
단가가 높은 카테고리는 주문 수가 적어도 매출 비중이 높을 수 있으므로 주문 수와 함께 해석해야 한다.

## 4. 고객 요약

![RFM 세그먼트별 고객 수](../charts/chapter_17_rfm_segment_count.png)

RFM 세그먼트별 고객 수를 보면 고객 기반이 어떤 유형으로 구성되어 있는지 확인할 수 있다.

![RFM 세그먼트별 매출](../charts/chapter_17_rfm_segment_sales.png)

매출 기여도가 가장 높은 RFM 세그먼트는 **{top_rfm_segment}**이다.
고객 수와 매출 기여도를 함께 보면 유지해야 할 고객군과 재활성화해야 할 고객군을 구분할 수 있다.

## 5. 리텐션 요약

![코호트 리텐션 히트맵](../charts/chapter_17_cohort_retention_heatmap.png)

코호트 리텐션 히트맵은 첫 구매 월별 고객이 이후 몇 개월 동안 다시 구매하는지 보여준다.
1개월 후 리텐션이 낮다면 첫 구매 이후 두 번째 구매를 유도하는 온보딩 캠페인을 검토할 수 있다.

## 6. 퍼널 요약

![구매 퍼널](../charts/chapter_17_funnel_chart.png)

퍼널 분석 기준 최종 구매 전환율은 **{round(purchase_conversion_rate, 2)}%**다.
가장 이탈률이 높은 단계는 **{highest_dropoff_step}**이며, 이탈률은 **{round(highest_dropoff_rate, 2)}%**다.

이 단계는 우선 개선 후보로 볼 수 있다.
상품 상세 정보, 장바구니 UX, 결제 과정, 모바일 사용성 등 단계별 원인을 추가로 확인해야 한다.

## 7. 실험과 모델 요약

![A/B 테스트 전환율](../charts/chapter_17_ab_conversion_rate.png)

A/B 테스트 전환율 그래프는 실험군과 대조군의 전환율 차이를 보여준다.
최종 의사결정에는 통계적 유의성, 사용자당 매출, 가드레일 지표를 함께 고려해야 한다.

![회귀분석 실제값과 예측값](../charts/chapter_17_actual_vs_predicted.png)

회귀분석 실제값과 예측값 비교 그래프는 모델이 고객 구매액을 어느 정도 설명하는지 보여준다.
대각선에서 크게 벗어난 고객은 추가 분석 대상이 될 수 있다.

## 8. 권장 액션

1. 매출 기여도가 높은 카테고리에 대해 주문 수와 평균 주문 금액을 분해해 성장 원인을 확인한다.
2. RFM 핵심 고객과 충성 고객에 대해서는 유지 캠페인과 전용 혜택을 설계한다.
3. 이탈 위험 고객에 대해서는 최근 구매 카테고리 기반 복귀 캠페인을 검토한다.
4. 1개월 후 리텐션이 낮다면 첫 구매 후 재구매 유도 메시지와 쿠폰 실험을 설계한다.
5. 퍼널 이탈률이 높은 단계에 대해 UI, 가격 정보, 배송비, 결제 오류 로그를 점검한다.
6. A/B 테스트 결과는 전환율뿐 아니라 사용자당 매출과 가드레일 지표를 함께 검토한다.

## 9. 주의사항

- 시각화는 원인 후보를 보여줄 뿐 인과관계를 증명하지 않는다.
- 코호트 크기가 작은 경우 리텐션 비율이 불안정할 수 있다.
- RFM 세그먼트 기준은 분석 목적에 따라 조정될 수 있다.
- 퍼널 전환율은 이벤트 로그 품질에 영향을 받는다.
- A/B 테스트는 실험 설계와 데이터 검증이 선행되어야 한다.
- 회귀분석 결과는 변수 간 관계를 보여주지만 인과관계를 자동으로 증명하지 않는다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_17_executive_summary_report.md").write_text(
    executive_summary_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};