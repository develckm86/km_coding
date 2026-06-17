var e=`# 12장. A/B 테스트 분석 실습

## 12.5 실습 데이터 준비

이번 장에서는 쿠폰 제공 A/B 테스트 데이터를 사용합니다.

실험 상황은 다음과 같습니다.

\`\`\`text
A그룹: 기존 화면, 쿠폰 강조 없음
B그룹: 10% 쿠폰 배너 노출
성공 지표: 구매 전환율
보조 지표: 구매 금액, 사용자당 매출
실험 단위: 사용자
\`\`\`

---

### 12.5.1 A/B 테스트 데이터 만들기

\`\`\`python
rng = np.random.default_rng(42)

n_control = 500
n_treatment = 500

control_user_ids = [f"C{i:04d}" for i in range(1, n_control + 1)]
treatment_user_ids = [f"T{i:04d}" for i in range(1, n_treatment + 1)]

control_converted = rng.binomial(1, 0.082, n_control)
treatment_converted = rng.binomial(1, 0.106, n_treatment)

control_purchase_amount = np.where(
    control_converted == 1,
    rng.normal(65000, 18000, n_control),
    0
)

treatment_purchase_amount = np.where(
    treatment_converted == 1,
    rng.normal(62000, 20000, n_treatment),
    0
)

ab_test_raw = pd.DataFrame({
    "user_id": control_user_ids + treatment_user_ids,
    "experiment_group": ["control"] * n_control + ["treatment"] * n_treatment,
    "exposed": [1] * (n_control + n_treatment),
    "converted": np.concatenate([control_converted, treatment_converted]),
    "purchase_amount": np.concatenate([control_purchase_amount, treatment_purchase_amount]),
    "visit_count": np.concatenate([
        rng.poisson(3, n_control),
        rng.poisson(3, n_treatment)
    ]),
    "device": rng.choice(["mobile", "desktop"], n_control + n_treatment, p=[0.65, 0.35]),
    "region": rng.choice(["서울", "부산", "대전"], n_control + n_treatment, p=[0.5, 0.3, 0.2])
})

ab_test_raw.head()
\`\`\`

구매 금액이 음수가 되는 것을 방지합니다.

\`\`\`python
ab_test_raw["purchase_amount"] = ab_test_raw["purchase_amount"].clip(lower=0)
ab_test_raw["purchase_amount"] = ab_test_raw["purchase_amount"].round(0)
\`\`\`

---

### 12.5.2 일부 품질 문제 추가

실습을 위해 중복 사용자와 잘못된 그룹 값을 조금 추가합니다.

\`\`\`python
duplicate_rows = ab_test_raw.sample(3, random_state=1).copy()
ab_test_raw = pd.concat([ab_test_raw, duplicate_rows], ignore_index=True)

invalid_row = pd.DataFrame({
    "user_id": ["X9999"],
    "experiment_group": ["unknown"],
    "exposed": [1],
    "converted": [0],
    "purchase_amount": [0],
    "visit_count": [1],
    "device": ["mobile"],
    "region": ["서울"]
})

ab_test_raw = pd.concat([ab_test_raw, invalid_row], ignore_index=True)

ab_test_raw.tail()
\`\`\`

---

### 12.5.3 데이터 저장

\`\`\`python
ab_test_raw.to_csv(
    DATA_PROCESSED / "chapter_12_ab_test_raw.csv",
    index=False
)
\`\`\`

---
`;export{e as default};