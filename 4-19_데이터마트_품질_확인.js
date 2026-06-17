var e=`# 4장. 분석용 데이터마트 만들기

## 4.19 데이터마트 품질 확인

데이터마트를 만들었다고 끝이 아닙니다.  
생성 후 품질을 다시 확인해야 합니다.

---

### 4.19.1 데이터마트 기본 구조 확인

\`\`\`python
orders_mart.shape
\`\`\`

\`\`\`python
orders_mart.info()
\`\`\`

\`\`\`python
orders_mart.head()
\`\`\`

---

### 4.19.2 데이터마트 결측치 확인

\`\`\`python
orders_mart.isna().sum()
\`\`\`

일부 날짜 오류가 있었던 주문은 제외되지 않았을 수도 있습니다.  
하지만 이번 실습에서는 날짜 기반 분석에서만 제외할 수 있도록 날짜 결측치를 데이터마트에 남길 수 있습니다.

다만 \`net_amount\`, \`category\`, \`unit_price\`는 매출 분석에 중요하므로 결측치가 없어야 합니다.

---

### 4.19.3 key 중복 확인

\`\`\`python
orders_mart.duplicated(subset=["order_id"]).sum()
\`\`\`

주문 ID 중복은 0이어야 합니다.

---

### 4.19.4 수치형 규칙 확인

\`\`\`python
(orders_mart["quantity"] <= 0).sum()
\`\`\`

\`\`\`python
(orders_mart["coupon_amount"] < 0).sum()
\`\`\`

\`\`\`python
orders_mart["net_amount"].isna().sum()
\`\`\`

모두 0이어야 합니다.

---

### 4.19.5 데이터마트 품질 확인표 만들기

\`\`\`python
mart_quality_check = pd.DataFrame([
    {
        "check_name": "order_id 중복",
        "check_result": int(orders_mart.duplicated(subset=["order_id"]).sum()),
        "expected": 0,
        "status": "PASS" if orders_mart.duplicated(subset=["order_id"]).sum() == 0 else "FAIL"
    },
    {
        "check_name": "net_amount 결측",
        "check_result": int(orders_mart["net_amount"].isna().sum()),
        "expected": 0,
        "status": "PASS" if orders_mart["net_amount"].isna().sum() == 0 else "FAIL"
    },
    {
        "check_name": "category 결측",
        "check_result": int(orders_mart["category"].isna().sum()),
        "expected": 0,
        "status": "PASS" if orders_mart["category"].isna().sum() == 0 else "FAIL"
    },
    {
        "check_name": "quantity 0 이하",
        "check_result": int((orders_mart["quantity"] <= 0).sum()),
        "expected": 0,
        "status": "PASS" if (orders_mart["quantity"] <= 0).sum() == 0 else "FAIL"
    },
    {
        "check_name": "coupon_amount 음수",
        "check_result": int((orders_mart["coupon_amount"] < 0).sum()),
        "expected": 0,
        "status": "PASS" if (orders_mart["coupon_amount"] < 0).sum() == 0 else "FAIL"
    }
])

mart_quality_check
\`\`\`

저장합니다.

\`\`\`python
mart_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_04_mart_quality_check.csv",
    index=False
)
\`\`\`

---
`;export{e as default};