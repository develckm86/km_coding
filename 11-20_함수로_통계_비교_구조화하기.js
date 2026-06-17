var e=`# 11장. 통계적 비교 실습

## 11.20 함수로 통계 비교 구조화하기

반복되는 비교 분석은 함수로 만들 수 있습니다.

---

### 11.20.1 두 집단 비교 함수

\`\`\`python
def compare_two_groups(
    df: pd.DataFrame,
    group_col: str,
    value_col: str,
    group_a,
    group_b
) -> dict:
    a = df.loc[df[group_col] == group_a, value_col].dropna().values
    b = df.loc[df[group_col] == group_b, value_col].dropna().values

    result = {
        "group_col": group_col,
        "value_col": value_col,
        "group_a": group_a,
        "group_b": group_b,
        "group_a_count": len(a),
        "group_b_count": len(b),
        "group_a_mean": round(a.mean(), 1) if len(a) > 0 else np.nan,
        "group_b_mean": round(b.mean(), 1) if len(b) > 0 else np.nan,
        "mean_difference": round(a.mean() - b.mean(), 1) if len(a) > 0 and len(b) > 0 else np.nan,
        "group_a_median": round(np.median(a), 1) if len(a) > 0 else np.nan,
        "group_b_median": round(np.median(b), 1) if len(b) > 0 else np.nan
    }

    return result
\`\`\`

사용 예:

\`\`\`python
compare_two_groups(
    df=customer_features,
    group_col="customer_grade",
    value_col="total_purchase",
    group_a="VIP",
    group_b="일반"
)
\`\`\`

---

### 11.20.2 부트스트랩 신뢰구간 함수

\`\`\`python
def bootstrap_ci_for_mean_diff(
    group_a: np.ndarray,
    group_b: np.ndarray,
    n_bootstrap: int = 1000,
    ci: float = 0.95,
    random_state: int = 42
) -> dict:
    boot_df = bootstrap_mean_difference(
        group_a,
        group_b,
        n_bootstrap=n_bootstrap,
        random_state=random_state
    )

    lower_q = (1 - ci) / 2
    upper_q = 1 - lower_q

    return {
        "mean_difference": group_a.mean() - group_b.mean(),
        "ci_lower": boot_df["mean_difference"].quantile(lower_q),
        "ci_upper": boot_df["mean_difference"].quantile(upper_q)
    }
\`\`\`

---

### 11.20.3 함수화의 장점

\`\`\`text
여러 그룹 비교를 반복하기 쉽다.
비교 기준이 코드로 명확해진다.
보고서 자동화에 활용할 수 있다.
실수로 표본 수 확인을 빼먹는 일을 줄일 수 있다.
\`\`\`

---
`;export{e as default};