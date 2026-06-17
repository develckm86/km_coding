var e=`# 11장. 통계적 비교 실습

## 11.15 t-test 실습

이번에는 t-test를 사용해 두 집단 평균 차이를 검정합니다.

t-test는 두 집단의 평균 차이가 통계적으로 유의한지 확인하는 대표적인 방법입니다.

---

### 11.15.1 Welch t-test 사용

두 집단의 분산이 같다고 가정하지 않는 Welch t-test를 사용합니다.

\`\`\`python
from scipy import stats

ttest_result = stats.ttest_ind(
    vip_purchase,
    normal_purchase,
    equal_var=False
)

ttest_result
\`\`\`

---

### 11.15.2 t-test 결과 정리

\`\`\`python
ttest_result_summary = pd.DataFrame([
    {
        "comparison": "VIP vs 일반",
        "value_column": "total_purchase",
        "test_name": "Welch t-test",
        "statistic": round(ttest_result.statistic, 4),
        "p_value": round(ttest_result.pvalue, 4),
        "alpha": 0.05,
        "is_statistically_significant": bool(ttest_result.pvalue < 0.05)
    }
])

ttest_result_summary
\`\`\`

저장합니다.

\`\`\`python
ttest_result_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_ttest_result.csv",
    index=False
)
\`\`\`

---

### 11.15.3 t-test 해석 예시

\`\`\`text
Welch t-test 결과 p-value가 0.05보다 작다면 VIP 고객과 일반 고객의 평균 구매액 차이가 통계적으로 유의하다고 볼 수 있다.
하지만 통계적으로 유의하더라도 차이의 크기가 실무적으로 중요한지 별도로 판단해야 한다.
또한 고객 등급이 구매액 차이의 원인이라고 단정할 수는 없다.
\`\`\`

---

### 11.15.4 t-test 사용 시 주의점

t-test는 다음 점에 주의해야 합니다.

\`\`\`text
표본 수가 너무 작으면 결과가 불안정하다.
이상값이 평균과 검정 결과에 영향을 줄 수 있다.
분포가 심하게 치우친 경우 해석에 주의해야 한다.
p-value는 실무적 중요도를 알려주지 않는다.
집단 차이는 인과관계를 의미하지 않는다.
\`\`\`

실무에서는 t-test 결과만 보지 말고 다음을 함께 봐야 합니다.

\`\`\`text
그룹별 표본 수
평균 차이
중앙값 차이
분포 그래프
신뢰구간
실무적 의미
\`\`\`

---
`;export{e as default};