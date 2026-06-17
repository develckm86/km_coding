var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.13 품질 이슈 목록 만들기

지금까지 발견한 문제를 하나의 품질 이슈 목록으로 정리합니다.

---

### 3.13.1 품질 이슈 목록 설계

품질 이슈 목록에는 다음 컬럼을 포함합니다.

\`\`\`text
issue_id
issue_area
issue_name
severity
affected_table
affected_column
affected_count
impact
recommended_action
\`\`\`

각 컬럼의 의미는 다음과 같습니다.

| 컬럼 | 의미 |
|---|---|
| \`issue_id\` | 이슈 번호 |
| \`issue_area\` | 결측, 중복, key, 날짜, 이상값 등 |
| \`issue_name\` | 이슈 이름 |
| \`severity\` | High, Medium, Low |
| \`affected_table\` | 영향을 받는 테이블 |
| \`affected_column\` | 영향을 받는 컬럼 |
| \`affected_count\` | 이슈 건수 |
| \`impact\` | 분석에 미치는 영향 |
| \`recommended_action\` | 권장 처리 방법 |

---

### 3.13.2 품질 이슈 목록 생성

\`\`\`python
quality_issues = pd.DataFrame([
    {
        "issue_id": 1,
        "issue_area": "missing",
        "issue_name": "coupon_amount 결측치",
        "severity": "Medium",
        "affected_table": "orders",
        "affected_column": "coupon_amount",
        "affected_count": int(orders["coupon_amount"].isna().sum()),
        "impact": "순매출 계산 기준에 영향",
        "recommended_action": "쿠폰 미사용으로 판단 가능하면 0으로 대체"
    },
    {
        "issue_id": 2,
        "issue_area": "duplicate",
        "issue_name": "order_id 중복",
        "severity": "High",
        "affected_table": "orders",
        "affected_column": "order_id",
        "affected_count": int(orders.duplicated(subset=["order_id"]).sum()),
        "impact": "매출 중복 집계 가능",
        "recommended_action": "중복 주문 검토 후 하나만 유지"
    },
    {
        "issue_id": 3,
        "issue_area": "duplicate",
        "issue_name": "customer_id 중복",
        "severity": "High",
        "affected_table": "customers",
        "affected_column": "customer_id",
        "affected_count": int(customers.duplicated(subset=["customer_id"]).sum()),
        "impact": "주문-고객 결합 시 행 수 증가 가능",
        "recommended_action": "고객 마스터 중복 제거 기준 수립"
    },
    {
        "issue_id": 4,
        "issue_area": "duplicate",
        "issue_name": "product_id 중복",
        "severity": "High",
        "affected_table": "products",
        "affected_column": "product_id",
        "affected_count": int(products.duplicated(subset=["product_id"]).sum()),
        "impact": "주문-상품 결합 시 행 수 증가 가능",
        "recommended_action": "상품 마스터 중복 제거 기준 수립"
    },
    {
        "issue_id": 5,
        "issue_area": "key_matching",
        "issue_name": "고객 마스터에 없는 customer_id",
        "severity": "Medium",
        "affected_table": "orders",
        "affected_column": "customer_id",
        "affected_count": len(missing_customer_ids),
        "impact": "고객 등급별, 지역별 분석에서 고객 정보 결측",
        "recommended_action": "고객 마스터 보완 또는 미상 그룹 처리"
    },
    {
        "issue_id": 6,
        "issue_area": "key_matching",
        "issue_name": "상품 마스터에 없는 product_id",
        "severity": "High",
        "affected_table": "orders",
        "affected_column": "product_id",
        "affected_count": len(missing_product_ids),
        "impact": "카테고리별 매출과 주문 금액 계산 불가",
        "recommended_action": "상품 마스터 보완 또는 해당 주문 매출 분석 제외"
    },
    {
        "issue_id": 7,
        "issue_area": "date",
        "issue_name": "날짜 변환 실패",
        "severity": "Medium",
        "affected_table": "orders/customers",
        "affected_column": "order_date/signup_date",
        "affected_count": len(invalid_dates),
        "impact": "월별 분석, 리텐션 분석, 코호트 분석에 영향",
        "recommended_action": "원본 날짜 수정 또는 날짜 기반 분석에서 제외"
    },
    {
        "issue_id": 8,
        "issue_area": "numeric",
        "issue_name": "수량 또는 쿠폰 금액 업무 규칙 위반",
        "severity": "High",
        "affected_table": "orders",
        "affected_column": "quantity/coupon_amount",
        "affected_count": len(invalid_quantity) + len(invalid_coupon),
        "impact": "순매출 계산 오류 가능",
        "recommended_action": "원본 확인 후 수정 또는 제외"
    }
])

quality_issues
\`\`\`

---

### 3.13.3 품질 이슈 목록 저장하기

\`\`\`python
quality_issues.to_csv(
    OUTPUT_TABLES / "chapter_03_quality_issue_list.csv",
    index=False
)
\`\`\`

---
`;export{e as default};