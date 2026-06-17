var e=`# 11장. 통계적 비교 실습

## 11.14 신뢰구간 계산하기

부트스트랩 결과를 사용해 평균 차이의 95% 신뢰구간을 계산합니다.

---

### 11.14.1 95% 신뢰구간

\`\`\`python
ci_lower = bootstrap_mean_diff["mean_difference"].quantile(0.025)
ci_upper = bootstrap_mean_diff["mean_difference"].quantile(0.975)

ci_lower, ci_upper
\`\`\`

---

### 11.14.2 신뢰구간 요약표 만들기

\`\`\`python
confidence_interval_summary = pd.DataFrame([
    {
        "comparison": "VIP - 일반",
        "value_column": "total_purchase",
        "observed_mean_difference": round(observed_mean_diff, 1),
        "ci_lower_95": round(ci_lower, 1),
        "ci_upper_95": round(ci_upper, 1),
        "interpretation": "신뢰구간이 0을 포함하지 않으면 평균 차이가 비교적 안정적으로 관찰된다고 볼 수 있음"
    }
])

confidence_interval_summary
\`\`\`

---

### 11.14.3 저장하기

\`\`\`python
confidence_interval_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_confidence_interval_summary.csv",
    index=False
)
\`\`\`

---

### 11.14.4 신뢰구간 해석

신뢰구간을 해석할 때는 0이 포함되는지 확인합니다.

\`\`\`text
신뢰구간이 모두 양수 → A그룹 평균이 B그룹보다 높을 가능성이 큼
신뢰구간이 모두 음수 → A그룹 평균이 B그룹보다 낮을 가능성이 큼
신뢰구간이 0을 포함 → 평균 차이가 불확실함
\`\`\`

예를 들어:

\`\`\`text
평균 차이 95% 신뢰구간: 120,000원 ~ 400,000원
\`\`\`

이 경우 VIP 고객 평균 구매액이 일반 고객보다 높을 가능성이 있다고 해석할 수 있습니다.

반면:

\`\`\`text
평균 차이 95% 신뢰구간: -50,000원 ~ 200,000원
\`\`\`

이 경우 0을 포함하므로 차이가 있다고 단정하기 어렵습니다.

---
`;export{e as default};