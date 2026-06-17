var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.16 최종 Executive Summary 작성

이제 의사결정자용 최종 보고서를 작성합니다.

---

### 20.16.1 핵심 KPI 추출

\`\`\`python
total_sales = data_mart["net_amount"].sum()
order_count = data_mart["order_id"].nunique()
customer_count = data_mart["customer_id"].nunique()
avg_order_amount = total_sales / order_count

purchase_conversion_rate = funnel_report.loc[
    funnel_report["event_name"] == "purchase",
    "overall_conversion_rate"
].iloc[0]

month1_retention = (
    cohort_retention[1].mean()
    if 1 in cohort_retention.columns
    else np.nan
)
\`\`\`

---

### 20.16.2 최종 보고서 작성

\`\`\`python
executive_report = f"""
# Final Project Executive Report

## 1. 프로젝트 목적

본 프로젝트는 온라인 쇼핑몰의 주문, 고객, 상품, 이벤트 로그 데이터를 분석해
매출 현황, 고객 구조, 고객 유지율, 구매 퍼널 문제를 파악하고
실행 가능한 개선 액션을 제안하는 것을 목적으로 한다.

## 2. 핵심 KPI

| KPI | 값 | 설명 |
|---|---:|---|
| 총매출 | {total_sales:,.0f}원 | 분석 기간 전체 순매출 |
| 주문 수 | {order_count:,}건 | 고유 주문 수 |
| 구매 고객 수 | {customer_count:,}명 | 고유 구매 고객 수 |
| 평균 주문 금액 | {avg_order_amount:,.0f}원 | 총매출 / 주문 수 |
| 구매 전환율 | {purchase_conversion_rate:.2f}% | 퍼널 기준 방문 대비 구매 완료율 |
| 평균 1개월 후 리텐션 | {month1_retention:.2f}% | 첫 구매 월 기준 평균 1개월 후 재구매율 |

## 3. 매출 분석 요약

![월별 매출](../charts/final_project_monthly_sales.png)

월별 매출 추이를 통해 분석 기간 동안 매출 흐름을 확인했다.
월별 매출 변동은 주문 수, 평균 주문 금액, 카테고리 구성 변화와 함께 해석해야 한다.

![카테고리별 매출](../charts/final_project_category_sales.png)

카테고리별 매출 분석 결과, **{top_category}** 카테고리가 매출에 크게 기여하는 것으로 나타났다.
해당 카테고리에 대해서는 상품별 매출, 재구매율, 고객 세그먼트별 구매 패턴을 추가로 확인할 필요가 있다.

## 4. 고객 분석 요약

![RFM 세그먼트](../charts/final_project_rfm_segments.png)

RFM 분석을 통해 고객을 최근성, 구매 빈도, 구매 금액 기준으로 세분화했다.
핵심 고객은 유지 전략이 중요하고, 이탈 위험 고객은 복귀 캠페인 대상이 될 수 있다.

## 5. 리텐션 분석 요약

![코호트 리텐션](../charts/final_project_cohort_retention.png)

첫 구매 월 기준 코호트 리텐션을 계산했다.
첫 구매 후 1개월 리텐션은 신규 고객 온보딩과 두 번째 구매 유도 전략의 핵심 지표다.

## 6. 퍼널 분석 요약

![구매 퍼널](../charts/final_project_funnel_chart.png)

구매 퍼널 분석 결과, 최종 구매 전환율은 **{purchase_conversion_rate:.2f}%**로 나타났다.
가장 이탈률이 높은 단계는 **{highest_dropoff_step['step_name']}** 단계이며,
해당 단계의 이탈률은 **{highest_dropoff_step['dropoff_rate']:.2f}%**다.

## 7. 권장 액션

1. 매출 기여도가 높은 카테고리에 대해 상품별 성과를 추가 분석한다.
2. RFM 핵심 고객에게는 유지 혜택과 전용 메시지를 제공한다.
3. 이탈 위험 고객에게는 최근 구매 카테고리 기반 복귀 캠페인을 설계한다.
4. 첫 구매 후 1개월 리텐션을 높이기 위해 온보딩 메시지와 재구매 쿠폰을 테스트한다.
5. 퍼널 이탈이 큰 단계의 UX와 로그를 점검하고 개선안을 A/B 테스트한다.
6. SQL 기반 집계 결과와 pandas 분석 결과를 정기적으로 비교해 지표 신뢰도를 관리한다.

## 8. 분석 한계

- 본 프로젝트는 실습용 샘플 데이터를 기반으로 한다.
- RFM 세그먼트 기준은 비즈니스 상황에 따라 조정해야 한다.
- 코호트 크기가 작은 경우 리텐션 비율이 불안정할 수 있다.
- 퍼널 분석은 이벤트 로그 품질에 영향을 받는다.
- 관찰된 패턴은 인과관계를 의미하지 않으며, 개선안은 A/B 테스트로 검증해야 한다.

## 9. 최종 산출물

- final_project_data_mart.csv
- final_project_customer_features.csv
- final_project_rfm_segments.csv
- final_project_cohort_retention.csv
- final_project_funnel_report.csv
- final_project_dashboard.png
- final_project_executive_report.md
"""
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "final_project_executive_report.md").write_text(
    executive_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};