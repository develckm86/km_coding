var e=`# 14장. RFM 고객 분석 실습

## 14.13 RFM 결과 품질 점검

RFM 결과를 만들었다면 품질을 점검해야 합니다.

---

### 14.13.1 고객 ID 중복 확인

\`\`\`python
rfm_customer_segments["customer_id"].duplicated().sum()
\`\`\`

고객 세그먼트 테이블에서는 고객 ID가 유일해야 합니다.

---

### 14.13.2 RFM 점수 범위 확인

\`\`\`python
score_range_check = {
    "r_score_min": rfm_customer_segments["r_score"].min(),
    "r_score_max": rfm_customer_segments["r_score"].max(),
    "f_score_min": rfm_customer_segments["f_score"].min(),
    "f_score_max": rfm_customer_segments["f_score"].max(),
    "m_score_min": rfm_customer_segments["m_score"].min(),
    "m_score_max": rfm_customer_segments["m_score"].max()
}

score_range_check
\`\`\`

점수는 1에서 5 사이여야 합니다.

---

### 14.13.3 주요 지표 음수 여부 확인

\`\`\`python
negative_recency_count = (rfm_customer_segments["recency"] < 0).sum()
non_positive_frequency_count = (rfm_customer_segments["frequency"] <= 0).sum()
negative_monetary_count = (rfm_customer_segments["monetary"] < 0).sum()
\`\`\`

---

### 14.13.4 품질 점검표 만들기

\`\`\`python
rfm_quality_check = pd.DataFrame([
    {
        "check_name": "customer_id 중복",
        "check_result": int(rfm_customer_segments["customer_id"].duplicated().sum()),
        "expected": 0,
        "status": "PASS" if rfm_customer_segments["customer_id"].duplicated().sum() == 0 else "FAIL"
    },
    {
        "check_name": "recency 음수 여부",
        "check_result": int(negative_recency_count),
        "expected": 0,
        "status": "PASS" if negative_recency_count == 0 else "FAIL"
    },
    {
        "check_name": "frequency 0 이하 여부",
        "check_result": int(non_positive_frequency_count),
        "expected": 0,
        "status": "PASS" if non_positive_frequency_count == 0 else "FAIL"
    },
    {
        "check_name": "monetary 음수 여부",
        "check_result": int(negative_monetary_count),
        "expected": 0,
        "status": "PASS" if negative_monetary_count == 0 else "FAIL"
    },
    {
        "check_name": "R 점수 범위",
        "check_result": f"{rfm_customer_segments['r_score'].min()}~{rfm_customer_segments['r_score'].max()}",
        "expected": "1~5",
        "status": "PASS" if rfm_customer_segments["r_score"].between(1, 5).all() else "FAIL"
    },
    {
        "check_name": "F 점수 범위",
        "check_result": f"{rfm_customer_segments['f_score'].min()}~{rfm_customer_segments['f_score'].max()}",
        "expected": "1~5",
        "status": "PASS" if rfm_customer_segments["f_score"].between(1, 5).all() else "FAIL"
    },
    {
        "check_name": "M 점수 범위",
        "check_result": f"{rfm_customer_segments['m_score'].min()}~{rfm_customer_segments['m_score'].max()}",
        "expected": "1~5",
        "status": "PASS" if rfm_customer_segments["m_score"].between(1, 5).all() else "FAIL"
    }
])

rfm_quality_check
\`\`\`

---

### 14.13.5 저장하기

\`\`\`python
rfm_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_quality_check.csv",
    index=False
)
\`\`\`

---

### 14.13.6 해석 예시

\`\`\`text
RFM 결과 테이블에서는 customer_id가 유일해야 한다.
Recency가 음수이면 기준일보다 미래의 주문이 있다는 뜻이므로 날짜 오류를 확인해야 한다.
Frequency는 1 이상이어야 하며, Monetary는 음수가 되면 안 된다.
R, F, M 점수는 1점에서 5점 사이여야 한다.
\`\`\`

---
`;export{e as default};