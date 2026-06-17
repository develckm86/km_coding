var e=`# 14장. RFM 고객 분석 실습

## 14.9 RFM 세그먼트 만들기

RFM 점수를 바탕으로 고객 세그먼트를 만듭니다.

---

### 14.9.1 기본 세그먼트 기준

이번 실습에서는 다음 기준을 사용합니다.

| 세그먼트 | 기준 | 의미 |
|---|---|---|
| Champions | R ≥ 4, F ≥ 4, M ≥ 4 | 최근에도 자주 구매하고 금액도 높은 핵심 고객 |
| Loyal Customers | R ≥ 3, F ≥ 4 | 자주 구매하는 충성 고객 |
| Big Spenders | M = 5, F < 4 | 구매 금액은 크지만 빈도는 상대적으로 낮은 고객 |
| Potential Loyalists | R ≥ 4, F 2~3 | 최근 구매했고 반복 구매 가능성이 있는 고객 |
| New Customers | R = 5, F = 1 | 최근 첫 구매 고객 |
| Need Attention | R 2~3, F 2~3 | 관심이 필요한 중간 고객 |
| At Risk | R ≤ 2, F ≥ 3 | 과거에는 자주 구매했지만 최근 구매가 없는 고객 |
| Hibernating | R ≤ 2, F ≤ 2 | 오래 구매하지 않고 빈도도 낮은 고객 |
| Others | 기타 | 별도 분류되지 않은 고객 |

세그먼트 기준은 정답이 아닙니다.  
비즈니스 상황에 맞게 조정해야 합니다.

---

### 14.9.2 세그먼트 분류 함수 만들기

\`\`\`python
def assign_rfm_segment(row):
    r = row["r_score"]
    f = row["f_score"]
    m = row["m_score"]

    if r >= 4 and f >= 4 and m >= 4:
        return "Champions"

    if r >= 3 and f >= 4:
        return "Loyal Customers"

    if m == 5 and f < 4:
        return "Big Spenders"

    if r >= 4 and 2 <= f <= 3:
        return "Potential Loyalists"

    if r == 5 and f == 1:
        return "New Customers"

    if r <= 2 and f >= 3:
        return "At Risk"

    if r <= 2 and f <= 2:
        return "Hibernating"

    if 2 <= r <= 3 and 2 <= f <= 3:
        return "Need Attention"

    return "Others"
\`\`\`

---

### 14.9.3 세그먼트 적용

\`\`\`python
rfm_customer_segments = rfm_score_table.copy()

rfm_customer_segments["rfm_segment"] = rfm_customer_segments.apply(
    assign_rfm_segment,
    axis=1
)

rfm_customer_segments.head()
\`\`\`

---

### 14.9.4 세그먼트 순서 지정

보고서에서 보기 좋게 세그먼트 순서를 정합니다.

\`\`\`python
segment_order = [
    "Champions",
    "Loyal Customers",
    "Big Spenders",
    "Potential Loyalists",
    "New Customers",
    "Need Attention",
    "At Risk",
    "Hibernating",
    "Others"
]

rfm_customer_segments["rfm_segment"] = pd.Categorical(
    rfm_customer_segments["rfm_segment"],
    categories=segment_order,
    ordered=True
)
\`\`\`

---

### 14.9.5 저장하기

\`\`\`python
rfm_customer_segments.to_csv(
    DATA_PROCESSED / "chapter_14_rfm_customer_segments.csv",
    index=False
)
\`\`\`

---

### 14.9.6 세그먼트 해석 예시

\`\`\`text
Champions는 최근 구매했고, 자주 구매하며, 구매 금액도 높은 핵심 고객이다.
At Risk는 과거에는 구매 빈도가 높았지만 최근 구매가 없는 고객으로, 재활성화 캠페인 대상이 될 수 있다.
New Customers는 최근 첫 구매 고객으로, 재구매 유도가 중요하다.
Hibernating은 최근성, 빈도, 금액이 모두 낮은 고객으로 비용 대비 접근 전략을 신중히 설계해야 한다.
\`\`\`

---
`;export{e as default};