var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.9 실습: KPI 정의서 만들기

이제 KPI 정의서를 작성합니다.

---

### 2.9.1 KPI 정의서 DataFrame 만들기

\`\`\`python
kpi_definition = pd.DataFrame([
    {
        "metric_name": "총매출",
        "purpose": "전체 매출 규모 확인",
        "formula": "net_amount 합계",
        "base_data": "주문 데이터",
        "aggregation_unit": "월, 카테고리, 고객 등급",
        "filter_condition": "상품 정보가 없는 주문 제외",
        "interpretation": "값이 높을수록 매출 규모가 큼",
        "caution": "쿠폰 차감 전/후 기준을 명확히 구분해야 함"
    },
    {
        "metric_name": "주문 수",
        "purpose": "구매 발생 빈도 확인",
        "formula": "order_id 고유값 개수",
        "base_data": "주문 데이터",
        "aggregation_unit": "월, 카테고리, 고객 등급",
        "filter_condition": "중복 주문 제거",
        "interpretation": "값이 높을수록 주문 발생이 많음",
        "caution": "동일 주문이 중복 집계되지 않도록 order_id 중복 확인 필요"
    },
    {
        "metric_name": "평균 주문 금액",
        "purpose": "주문당 평균 구매 규모 확인",
        "formula": "총매출 / 주문 수",
        "base_data": "주문 데이터",
        "aggregation_unit": "월, 카테고리, 고객 등급",
        "filter_condition": "순매출 계산 가능한 주문만 포함",
        "interpretation": "값이 높을수록 주문당 구매 규모가 큼",
        "caution": "고가 주문 이상값이 평균을 끌어올릴 수 있으므로 중앙값도 함께 확인"
    },
    {
        "metric_name": "매출 비중",
        "purpose": "전체 매출에서 특정 그룹의 기여도 확인",
        "formula": "그룹별 매출 / 전체 매출 × 100",
        "base_data": "주문 데이터",
        "aggregation_unit": "카테고리, 지역, 고객 등급",
        "filter_condition": "전체 매출과 그룹 매출의 기준 동일",
        "interpretation": "값이 높을수록 해당 그룹의 매출 기여도가 큼",
        "caution": "비중만 보지 말고 실제 매출 규모도 함께 확인"
    },
    {
        "metric_name": "재구매율",
        "purpose": "고객 유지 수준 확인",
        "formula": "2회 이상 구매 고객 수 / 전체 구매 고객 수 × 100",
        "base_data": "주문 데이터",
        "aggregation_unit": "전체, 고객 등급, 코호트",
        "filter_condition": "고객 ID가 있는 주문만 포함",
        "interpretation": "값이 높을수록 고객 유지가 잘 되고 있음",
        "caution": "분석 기간이 짧으면 재구매율이 낮게 계산될 수 있음"
    },
    {
        "metric_name": "쿠폰 사용률",
        "purpose": "쿠폰 활용 정도 확인",
        "formula": "쿠폰 사용 주문 수 / 전체 주문 수 × 100",
        "base_data": "주문 데이터",
        "aggregation_unit": "월, 고객 등급, 카테고리",
        "filter_condition": "coupon_amount > 0인 주문을 쿠폰 사용으로 정의",
        "interpretation": "값이 높을수록 쿠폰 사용 주문 비중이 높음",
        "caution": "쿠폰 사용 여부와 구매 증가의 인과관계는 별도 실험 분석 필요"
    },
    {
        "metric_name": "전월 대비 매출 성장률",
        "purpose": "월별 매출 변화 확인",
        "formula": "(이번 달 매출 - 지난달 매출) / 지난달 매출 × 100",
        "base_data": "주문 데이터",
        "aggregation_unit": "월",
        "filter_condition": "월별 매출 기준 동일",
        "interpretation": "양수이면 전월 대비 증가, 음수이면 감소",
        "caution": "전월 매출이 매우 작으면 성장률이 과장될 수 있음"
    }
])

kpi_definition
\`\`\`

---

### 2.9.2 KPI 정의서 저장하기

\`\`\`python
kpi_definition.to_csv(
    OUTPUT_TABLES / "chapter_02_kpi_definition.csv",
    index=False
)
\`\`\`

---

### 2.9.3 KPI 정의서 확인하기

\`\`\`python
saved_kpi = pd.read_csv(OUTPUT_TABLES / "chapter_02_kpi_definition.csv")

saved_kpi.head()
\`\`\`

파일로 저장한 뒤 다시 불러와 확인하는 습관이 좋습니다.

---
`;export{e as default};