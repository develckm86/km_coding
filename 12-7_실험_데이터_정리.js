var e=`# 12장. A/B 테스트 분석 실습

## 12.7 실험 데이터 정리

이제 분석 가능한 데이터로 정리합니다.

---

### 12.7.1 유효 그룹만 남기기

\`\`\`python
valid_groups = ["control", "treatment"]

ab_test_clean = ab_test_raw[
    ab_test_raw["experiment_group"].isin(valid_groups)
].copy()
\`\`\`

---

### 12.7.2 중복 사용자 제거

중복 사용자는 첫 번째 행만 유지합니다.

\`\`\`python
ab_test_clean = ab_test_clean.drop_duplicates(
    subset=["user_id"],
    keep="first",
    ignore_index=True
)
\`\`\`

---

### 12.7.3 자료형 정리

\`\`\`python
ab_test_clean["converted"] = ab_test_clean["converted"].astype(int)
ab_test_clean["exposed"] = ab_test_clean["exposed"].astype(int)
ab_test_clean["purchase_amount"] = ab_test_clean["purchase_amount"].astype(float)
\`\`\`

---

### 12.7.4 구매자와 비구매자 일관성 확인

구매하지 않은 사용자의 구매 금액은 0이어야 합니다.

\`\`\`python
invalid_purchase_rows = ab_test_clean[
    (ab_test_clean["converted"] == 0) &
    (ab_test_clean["purchase_amount"] > 0)
]

invalid_purchase_rows
\`\`\`

구매했는데 구매 금액이 0인 경우도 확인합니다.

\`\`\`python
converted_zero_amount = ab_test_clean[
    (ab_test_clean["converted"] == 1) &
    (ab_test_clean["purchase_amount"] == 0)
]

converted_zero_amount
\`\`\`

이번 실습에서는 그대로 진행합니다.  
실무에서는 결제 실패, 무료 상품, 데이터 오류 여부를 확인해야 합니다.

---

### 12.7.5 정리된 데이터 저장

\`\`\`python
ab_test_clean.to_csv(
    DATA_PROCESSED / "chapter_12_ab_test_clean.csv",
    index=False
)
\`\`\`

---
`;export{e as default};