var e=`# 14장. RFM 고객 분석 실습

## 14.8 RFM 점수화 방법

RFM 원본 지표를 1점부터 5점까지의 점수로 바꿉니다.

점수화 방법은 여러 가지가 있습니다.

\`\`\`text
분위수 기준
고정 기준
업무 기준
상대 순위 기준
\`\`\`

이번 장에서는 분위수 기준 점수화를 사용합니다.

---

### 14.8.1 분위수 기준 점수화

분위수 기준은 고객을 값의 크기에 따라 비슷한 수의 그룹으로 나누는 방식입니다.

예를 들어 Monetary를 5개 구간으로 나누면 다음처럼 점수를 줄 수 있습니다.

\`\`\`text
하위 20% → 1점
20~40% → 2점
40~60% → 3점
60~80% → 4점
상위 20% → 5점
\`\`\`

Frequency와 Monetary는 값이 클수록 좋습니다.

\`\`\`text
값이 클수록 높은 점수
\`\`\`

Recency는 반대입니다.

\`\`\`text
값이 작을수록 높은 점수
\`\`\`

---

### 14.8.2 qcut 사용 시 주의점

pandas의 \`qcut()\`은 분위수 기준으로 구간을 나눕니다.

\`\`\`python
pd.qcut(series, q=5, labels=[1, 2, 3, 4, 5])
\`\`\`

하지만 값이 중복되어 구간을 정확히 나누기 어려우면 오류가 발생할 수 있습니다.  
특히 고객 수가 적거나 frequency 값이 대부분 1, 2처럼 비슷하면 문제가 생길 수 있습니다.

따라서 이번 장에서는 오류를 줄이기 위해 순위 기반 점수화 함수를 사용합니다.

---

### 14.8.3 안전한 점수화 함수 만들기

\`\`\`python
def make_quantile_score(series: pd.Series, ascending: bool = True, n_bins: int = 5) -> pd.Series:
    ranked = series.rank(method="first", ascending=ascending)

    score = pd.qcut(
        ranked,
        q=n_bins,
        labels=range(1, n_bins + 1)
    )

    return score.astype(int)
\`\`\`

이 함수에서 \`ascending=True\`이면 값이 작을수록 낮은 순위가 됩니다.  
하지만 점수는 qcut 결과가 1부터 5까지 올라갑니다.

Recency는 값이 작을수록 좋은 점수를 받아야 합니다.  
따라서 Recency는 \`ascending=False\`를 사용해 작은 값이 높은 점수를 받도록 만들 수 있습니다.

조금 더 직관적으로 다음 기준을 사용합니다.

\`\`\`text
Recency: 작은 값이 5점
Frequency: 큰 값이 5점
Monetary: 큰 값이 5점
\`\`\`

---

### 14.8.4 R 점수 계산

Recency는 작을수록 좋습니다.

\`\`\`python
rfm_score_table = rfm_raw_table.copy()

rfm_score_table["r_score"] = make_quantile_score(
    rfm_score_table["recency"],
    ascending=False,
    n_bins=5
)

rfm_score_table[["customer_id", "recency", "r_score"]].head()
\`\`\`

---

### 14.8.5 F 점수 계산

Frequency는 클수록 좋습니다.

\`\`\`python
rfm_score_table["f_score"] = make_quantile_score(
    rfm_score_table["frequency"],
    ascending=True,
    n_bins=5
)

rfm_score_table[["customer_id", "frequency", "f_score"]].head()
\`\`\`

---

### 14.8.6 M 점수 계산

Monetary는 클수록 좋습니다.

\`\`\`python
rfm_score_table["m_score"] = make_quantile_score(
    rfm_score_table["monetary"],
    ascending=True,
    n_bins=5
)

rfm_score_table[["customer_id", "monetary", "m_score"]].head()
\`\`\`

---

### 14.8.7 RFM 총점과 코드 만들기

\`\`\`python
rfm_score_table["rfm_score_sum"] = (
    rfm_score_table["r_score"] +
    rfm_score_table["f_score"] +
    rfm_score_table["m_score"]
)

rfm_score_table["rfm_code"] = (
    rfm_score_table["r_score"].astype(str) +
    rfm_score_table["f_score"].astype(str) +
    rfm_score_table["m_score"].astype(str)
)

rfm_score_table.head()
\`\`\`

---

### 14.8.8 저장하기

\`\`\`python
rfm_score_table.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_score_table.csv",
    index=False
)
\`\`\`

---

### 14.8.9 점수 해석 예시

\`\`\`text
r_score가 높을수록 최근 구매 고객이다.
f_score가 높을수록 구매 횟수가 많은 고객이다.
m_score가 높을수록 총구매액이 높은 고객이다.
rfm_score_sum은 세 점수의 합계이며, 고객의 전반적인 가치를 간단히 비교하는 데 사용할 수 있다.
rfm_code는 고객의 R, F, M 특성을 한눈에 보기 위한 코드다.
\`\`\`

---
`;export{e as default};