var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.10 실습: 데이터 요구사항 정의하기

분석 질문과 KPI를 정의했다면, 이제 어떤 데이터가 필요한지 정리해야 합니다.

---

### 2.10.1 데이터 요구사항이 필요한 이유

분석 질문이 있어도 데이터가 없으면 분석할 수 없습니다.

예를 들어 다음 질문을 생각해봅시다.

\`\`\`text
쿠폰 사용 고객의 재구매율은 미사용 고객보다 높은가?
\`\`\`

이 질문에 답하려면 최소한 다음 데이터가 필요합니다.

\`\`\`text
고객 ID
주문 ID
주문일
쿠폰 사용 여부
\`\`\`

재구매율을 계산하려면 고객별 구매 횟수를 알아야 하고, 쿠폰 사용 여부를 비교하려면 쿠폰 관련 컬럼이 필요합니다.

또 다른 질문을 봅시다.

\`\`\`text
전자기기 카테고리의 매출 비중은 얼마인가?
\`\`\`

이 질문에는 다음 데이터가 필요합니다.

\`\`\`text
주문 ID
상품 ID
상품 카테고리
주문 금액
\`\`\`

만약 주문 데이터에 상품 카테고리가 없다면 상품 데이터와 결합해야 합니다.

---

### 2.10.2 데이터 요구사항 표 만들기

\`\`\`python
data_requirements = pd.DataFrame([
    {
        "analysis_question": "월별 총매출, 주문 수, 평균 주문 금액은 어떻게 변했는가?",
        "required_data": "주문 데이터",
        "required_columns": "order_id, order_date, net_amount",
        "join_required": "아니오",
        "data_quality_checks": "order_id 중복, order_date 변환 실패, net_amount 결측"
    },
    {
        "analysis_question": "월별 카테고리별 매출 변화는 전체 매출 변화에 어떤 영향을 주었는가?",
        "required_data": "주문 데이터, 상품 데이터",
        "required_columns": "order_id, order_date, product_id, category, net_amount",
        "join_required": "예, product_id 기준 상품 데이터 결합",
        "data_quality_checks": "product_id 매칭 실패, category 결측"
    },
    {
        "analysis_question": "VIP 고객의 총매출 기여도와 평균 주문 금액은 일반 고객보다 높은가?",
        "required_data": "주문 데이터, 고객 데이터",
        "required_columns": "order_id, customer_id, grade, net_amount",
        "join_required": "예, customer_id 기준 고객 데이터 결합",
        "data_quality_checks": "customer_id 매칭 실패, grade 결측"
    },
    {
        "analysis_question": "전자기기 카테고리의 매출 비중과 평균 주문 금액은 다른 카테고리보다 높은가?",
        "required_data": "주문 데이터, 상품 데이터",
        "required_columns": "order_id, product_id, category, net_amount",
        "join_required": "예, product_id 기준 상품 데이터 결합",
        "data_quality_checks": "category 표준화, product_id 매칭 실패"
    },
    {
        "analysis_question": "쿠폰 사용 주문과 미사용 주문의 평균 주문 금액과 재구매율은 다른가?",
        "required_data": "주문 데이터",
        "required_columns": "order_id, customer_id, order_date, coupon_amount, net_amount",
        "join_required": "아니오",
        "data_quality_checks": "coupon_amount 결측, customer_id 결측, order_date 변환 실패"
    }
])

data_requirements
\`\`\`

---

### 2.10.3 데이터 요구사항 저장하기

\`\`\`python
data_requirements.to_csv(
    OUTPUT_TABLES / "chapter_02_data_requirements.csv",
    index=False
)
\`\`\`

---
`;export{e as default};