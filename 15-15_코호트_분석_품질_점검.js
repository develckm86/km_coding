var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.15 코호트 분석 품질 점검

코호트 분석 결과도 품질 점검이 필요합니다.

---

### 15.15.1 점검 항목

\`\`\`text
customer_id 결측 여부
order_date 결측 여부
cohort_month 결측 여부
cohort_index 음수 여부
0개월 리텐션이 100%인지 여부
코호트 크기가 0인 코호트가 있는지 여부
\`\`\`

---

### 15.15.2 품질 점검표 만들기

\`\`\`python
cohort_quality_records = []

cohort_quality_records.append({
    "check_name": "customer_id 결측",
    "check_result": int(cohort_data["customer_id"].isna().sum()),
    "expected": 0,
    "status": "PASS" if cohort_data["customer_id"].isna().sum() == 0 else "FAIL"
})

cohort_quality_records.append({
    "check_name": "order_date 결측",
    "check_result": int(cohort_data["order_date"].isna().sum()),
    "expected": 0,
    "status": "PASS" if cohort_data["order_date"].isna().sum() == 0 else "FAIL"
})

cohort_quality_records.append({
    "check_name": "cohort_month 결측",
    "check_result": int(cohort_data["cohort_month"].isna().sum()),
    "expected": 0,
    "status": "PASS" if cohort_data["cohort_month"].isna().sum() == 0 else "FAIL"
})

cohort_quality_records.append({
    "check_name": "cohort_index 음수",
    "check_result": int((cohort_data["cohort_index"] < 0).sum()),
    "expected": 0,
    "status": "PASS" if (cohort_data["cohort_index"] < 0).sum() == 0 else "FAIL"
})

if 0 in cohort_retention_table.columns:
    zero_month_check = (cohort_retention_table[0] == 100).all()
else:
    zero_month_check = False

cohort_quality_records.append({
    "check_name": "0개월 리텐션 100%",
    "check_result": bool(zero_month_check),
    "expected": True,
    "status": "PASS" if zero_month_check else "FAIL"
})

cohort_quality_check = pd.DataFrame(cohort_quality_records)

cohort_quality_check
\`\`\`

저장합니다.

\`\`\`python
cohort_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_quality_check.csv",
    index=False
)
\`\`\`

---
`;export{e as default};