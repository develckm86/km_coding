var e=`# 11장. 통계적 비교 실습

## 11.8 집단별 요약 통계 만들기

집단 비교의 기본은 각 집단의 요약 통계를 보는 것입니다.

---

### 11.8.1 요약 통계 함수 만들기

반복해서 사용할 수 있도록 함수를 만듭니다.

\`\`\`python
def make_group_comparison_summary(
    df: pd.DataFrame,
    group_col: str,
    value_col: str
) -> pd.DataFrame:
    summary = (
        df
        .dropna(subset=[group_col, value_col])
        .groupby(group_col)
        .agg(
            customer_count=(value_col, "count"),
            mean_value=(value_col, "mean"),
            median_value=(value_col, "median"),
            std_value=(value_col, "std"),
            min_value=(value_col, "min"),
            q1_value=(value_col, lambda x: x.quantile(0.25)),
            q3_value=(value_col, lambda x: x.quantile(0.75)),
            max_value=(value_col, "max")
        )
        .reset_index()
    )

    numeric_cols = [
        "mean_value",
        "median_value",
        "std_value",
        "min_value",
        "q1_value",
        "q3_value",
        "max_value"
    ]

    for col in numeric_cols:
        summary[col] = summary[col].round(1)

    summary.insert(0, "value_column", value_col)

    return summary
\`\`\`

---

### 11.8.2 VIP와 일반 고객 구매액 비교 요약

\`\`\`python
grade_comparison_summary = make_group_comparison_summary(
    df=customer_features,
    group_col="customer_grade",
    value_col="total_purchase"
)

grade_comparison_summary
\`\`\`

---

### 11.8.3 저장하기

\`\`\`python
grade_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_grade_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 11.8.4 해석 예시

\`\`\`text
고객 등급별 total_purchase 요약 통계를 보면 VIP 고객과 일반 고객의 평균 및 중앙값 차이를 확인할 수 있다.
평균이 중앙값보다 훨씬 높다면 일부 고액 구매 고객이 평균을 끌어올렸을 가능성이 있다.
표준편차가 크다면 같은 그룹 안에서도 고객별 구매액 차이가 크다는 뜻이다.
\`\`\`

---
`;export{e as default};