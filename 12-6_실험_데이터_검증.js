var e=`# 12장. A/B 테스트 분석 실습

## 12.6 실험 데이터 검증

A/B 테스트 분석에서 가장 먼저 할 일은 실험 데이터 검증입니다.

전환율 계산보다 먼저 해야 합니다.

---

### 12.6.1 데이터 구조 확인

\`\`\`python
ab_test_raw.shape
\`\`\`

\`\`\`python
ab_test_raw.info()
\`\`\`

\`\`\`python
ab_test_raw.head()
\`\`\`

---

### 12.6.2 그룹 값 확인

\`\`\`python
ab_test_raw["experiment_group"].value_counts(dropna=False)
\`\`\`

\`control\`과 \`treatment\` 이외의 값이 있으면 처리해야 합니다.

---

### 12.6.3 중복 사용자 확인

실험 단위가 사용자라면 user_id는 유일해야 합니다.

\`\`\`python
ab_test_raw["user_id"].duplicated().sum()
\`\`\`

중복 사용자를 확인합니다.

\`\`\`python
ab_test_raw[ab_test_raw["user_id"].duplicated(keep=False)].sort_values("user_id")
\`\`\`

---

### 12.6.4 결측치 확인

\`\`\`python
ab_test_raw.isna().sum()
\`\`\`

---

### 12.6.5 값의 범위 확인

전환 여부는 0 또는 1이어야 합니다.

\`\`\`python
ab_test_raw["converted"].value_counts(dropna=False)
\`\`\`

구매 금액은 0 이상이어야 합니다.

\`\`\`python
(ab_test_raw["purchase_amount"] < 0).sum()
\`\`\`

---
`;export{e as default};