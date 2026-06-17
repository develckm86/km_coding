var e=`# 17장. 고급 시각화 리포트 만들기

## 17.14 그래프별 해석 문장 테이블 만들기

시각화 리포트에서는 그래프마다 해석 문장이 필요합니다.

---

### 17.14.1 해석 문장 테이블

\`\`\`python
chart_interpretation_table = pd.DataFrame([
    {
        "chart_name": "monthly_sales_trend",
        "file_name": "chapter_17_monthly_sales_trend.png",
        "question": "월별 매출은 어떻게 변하는가?",
        "interpretation": "월별 매출 추이를 통해 분석 기간 동안 매출 증가 또는 감소 흐름을 확인할 수 있다.",
        "caution": "매출 변화 원인은 주문 수, 평균 주문 금액, 카테고리 구성 변화를 함께 확인해야 한다."
    },
    {
        "chart_name": "category_sales_bar",
        "file_name": "chapter_17_category_sales_bar.png",
        "question": "어떤 카테고리가 매출을 주도하는가?",
        "interpretation": "카테고리별 매출 그래프는 전체 매출에서 어떤 상품군이 큰 비중을 차지하는지 보여준다.",
        "caution": "단가가 높은 카테고리는 주문 수가 적어도 매출 비중이 높을 수 있다."
    },
    {
        "chart_name": "rfm_segment_count",
        "file_name": "chapter_17_rfm_segment_count.png",
        "question": "고객은 어떤 RFM 세그먼트로 구성되어 있는가?",
        "interpretation": "RFM 세그먼트별 고객 수는 고객 기반의 구조를 보여준다.",
        "caution": "세그먼트 기준은 분석 목적에 따라 조정될 수 있다."
    },
    {
        "chart_name": "rfm_segment_sales",
        "file_name": "chapter_17_rfm_segment_sales.png",
        "question": "어떤 고객 세그먼트가 매출에 기여하는가?",
        "interpretation": "RFM 세그먼트별 매출은 매출 기여도가 높은 고객군을 찾는 데 유용하다.",
        "caution": "고객 수와 매출 비중을 함께 확인해야 한다."
    },
    {
        "chart_name": "cohort_retention_heatmap",
        "file_name": "chapter_17_cohort_retention_heatmap.png",
        "question": "고객은 시간이 지나도 계속 구매하는가?",
        "interpretation": "코호트 리텐션 히트맵은 첫 구매 월별 고객 유지 흐름을 보여준다.",
        "caution": "코호트 크기가 작으면 리텐션 비율이 불안정할 수 있다."
    },
    {
        "chart_name": "funnel_chart",
        "file_name": "chapter_17_funnel_chart.png",
        "question": "구매 과정에서 어디서 고객이 이탈하는가?",
        "interpretation": "퍼널 그래프는 구매 과정의 단계별 사용자 감소를 보여준다.",
        "caution": "이벤트 로그 누락이나 중복은 전환율을 왜곡할 수 있다."
    },
    {
        "chart_name": "ab_conversion_rate",
        "file_name": "chapter_17_ab_conversion_rate.png",
        "question": "실험군의 전환율은 대조군보다 높은가?",
        "interpretation": "A/B 테스트 전환율 그래프는 실험군과 대조군의 전환율 차이를 보여준다.",
        "caution": "통계적 유의성, 사용자당 매출, 가드레일 지표를 함께 확인해야 한다."
    },
    {
        "chart_name": "actual_vs_predicted",
        "file_name": "chapter_17_actual_vs_predicted.png",
        "question": "회귀 모델은 실제값을 잘 설명하는가?",
        "interpretation": "실제값과 예측값 비교 그래프는 모델 예측이 실제 구매액과 얼마나 가까운지 보여준다.",
        "caution": "큰 잔차를 가진 고객은 별도 분석이 필요할 수 있다."
    }
])

chart_interpretation_table
\`\`\`

저장합니다.

\`\`\`python
chart_interpretation_table.to_csv(
    OUTPUT_TABLES / "chapter_17_chart_interpretation_table.csv",
    index=False
)
\`\`\`

---
`;export{e as default};