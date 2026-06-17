var e=`# 17장. 고급 시각화 리포트 만들기

## 17.5 KPI 요약 테이블 만들기

시각화 리포트 상단에는 핵심 KPI를 배치하는 것이 좋습니다.

예를 들어 다음 지표를 보여줄 수 있습니다.

\`\`\`text
총매출
주문 수
고객 수
평균 주문 금액
구매 전환율
핵심 고객 수
1개월 후 리텐션
\`\`\`

---

### 17.5.1 기본 KPI 계산

\`\`\`python
total_sales = orders_mart["net_amount"].sum()
order_count = orders_mart["order_id"].nunique()
customer_count = orders_mart["customer_id"].nunique()
avg_order_amount = total_sales / order_count if order_count > 0 else 0
\`\`\`

---

### 17.5.2 RFM 핵심 고객 수

\`\`\`python
core_segments = ["Champions", "Loyal Customers", "핵심 고객", "충성 고객"]

core_customer_count = rfm_segments[
    rfm_segments["rfm_segment"].isin(core_segments)
]["customer_id"].nunique()
\`\`\`

---

### 17.5.3 퍼널 최종 구매 전환율

\`\`\`python
purchase_conversion_rate = funnel_report.loc[
    funnel_report["event_name"] == "purchase",
    "overall_conversion_rate"
].iloc[0]
\`\`\`

---

### 17.5.4 1개월 후 리텐션

\`\`\`python
if 1 in cohort_retention_table.columns:
    month1_retention = cohort_retention_table[1].mean()
else:
    month1_retention = np.nan
\`\`\`

---

### 17.5.5 KPI 요약표 만들기

\`\`\`python
kpi_summary = pd.DataFrame([
    {
        "kpi_name": "총매출",
        "kpi_value": round(total_sales, 0),
        "unit": "원",
        "description": "분석 기간 전체 순매출"
    },
    {
        "kpi_name": "주문 수",
        "kpi_value": order_count,
        "unit": "건",
        "description": "분석 기간 고유 주문 수"
    },
    {
        "kpi_name": "구매 고객 수",
        "kpi_value": customer_count,
        "unit": "명",
        "description": "분석 기간 구매 고객 수"
    },
    {
        "kpi_name": "평균 주문 금액",
        "kpi_value": round(avg_order_amount, 0),
        "unit": "원",
        "description": "총매출 / 주문 수"
    },
    {
        "kpi_name": "구매 전환율",
        "kpi_value": round(purchase_conversion_rate, 2),
        "unit": "%",
        "description": "퍼널 기준 방문 대비 구매 완료율"
    },
    {
        "kpi_name": "핵심 고객 수",
        "kpi_value": core_customer_count,
        "unit": "명",
        "description": "RFM 기준 핵심 또는 충성 고객"
    },
    {
        "kpi_name": "평균 1개월 후 리텐션",
        "kpi_value": round(month1_retention, 2) if pd.notna(month1_retention) else np.nan,
        "unit": "%",
        "description": "첫 구매 월 기준 평균 1개월 후 리텐션"
    }
])

kpi_summary
\`\`\`

저장합니다.

\`\`\`python
kpi_summary.to_csv(
    OUTPUT_TABLES / "chapter_17_kpi_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};