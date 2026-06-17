var e=`# 10장. 고객별 Feature Table 만들기

## 10.13 Feature Table 품질 점검

Feature Table을 만들었다면 품질을 확인해야 합니다.

---

### 10.13.1 고객 ID 중복 확인

\`\`\`python
customer_feature_table["customer_id"].duplicated().sum()
\`\`\`

고객별 Feature Table에서는 \`customer_id\`가 유일해야 합니다.

---

### 10.13.2 결측치 확인

\`\`\`python
customer_feature_table.isna().sum()
\`\`\`

Feature Table에서 결측치가 있는 컬럼은 처리 기준을 정해야 합니다.

---

### 10.13.3 주요 수치형 Feature 범위 확인

\`\`\`python
numeric_check_columns = [
    "total_purchase",
    "order_count",
    "avg_order_amount",
    "days_since_last_order",
    "category_count",
    "coupon_usage_rate"
]

existing_numeric_check_columns = [
    col for col in numeric_check_columns
    if col in customer_feature_table.columns
]

customer_feature_table[existing_numeric_check_columns].describe()
\`\`\`

---

### 10.13.4 업무 규칙 점검

다음 값들은 일반적으로 음수가 되면 안 됩니다.

\`\`\`text
total_purchase
order_count
days_since_last_order
category_count
coupon_usage_rate
\`\`\`

점검표를 만듭니다.

\`\`\`python
feature_quality_records = []

feature_quality_records.append({
    "check_name": "customer_id 중복",
    "check_result": int(customer_feature_table["customer_id"].duplicated().sum()),
    "expected": 0,
    "status": "PASS" if customer_feature_table["customer_id"].duplicated().sum() == 0 else "FAIL"
})

for col in ["total_purchase", "order_count", "days_since_last_order", "category_count"]:
    if col in customer_feature_table.columns:
        invalid_count = int((customer_feature_table[col] < 0).sum())
        feature_quality_records.append({
            "check_name": f"{col} 음수 여부",
            "check_result": invalid_count,
            "expected": 0,
            "status": "PASS" if invalid_count == 0 else "FAIL"
        })

if "coupon_usage_rate" in customer_feature_table.columns:
    invalid_coupon_rate = int(
        ((customer_feature_table["coupon_usage_rate"] < 0) |
         (customer_feature_table["coupon_usage_rate"] > 100)).sum()
    )
    feature_quality_records.append({
        "check_name": "coupon_usage_rate 범위",
        "check_result": invalid_coupon_rate,
        "expected": 0,
        "status": "PASS" if invalid_coupon_rate == 0 else "FAIL"
    })

feature_quality_check = pd.DataFrame(feature_quality_records)

feature_quality_check
\`\`\`

---

### 10.13.5 저장하기

\`\`\`python
feature_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_10_feature_quality_check.csv",
    index=False
)
\`\`\`

---

### 10.13.6 해석 예시

\`\`\`text
고객별 Feature Table에서는 customer_id가 유일해야 한다.
총구매액, 주문 횟수, 최근 구매 후 경과일 같은 주요 수치형 Feature는 음수가 되면 안 된다.
쿠폰 사용률은 0%에서 100% 사이여야 한다.
Feature Table 품질 점검은 이후 고객 분석과 모델링의 신뢰도를 높이는 데 필요하다.
\`\`\`

---
`;export{e as default};