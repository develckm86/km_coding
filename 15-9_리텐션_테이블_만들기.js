var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.9 리텐션 테이블 만들기

리텐션 테이블은 고객 수를 비율로 바꾼 것입니다.

---

### 15.9.1 코호트 크기 추출

피벗 테이블의 0개월 컬럼이 코호트 크기입니다.

\`\`\`python
cohort_base_size = cohort_count_table[0]

cohort_base_size
\`\`\`

---

### 15.9.2 리텐션 비율 계산

\`\`\`python
cohort_retention_table = cohort_count_table.divide(
    cohort_base_size,
    axis=0
) * 100

cohort_retention_table = cohort_retention_table.round(1)

cohort_retention_table
\`\`\`

---

### 15.9.3 저장하기

\`\`\`python
cohort_retention_table.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_retention_table.csv",
    index=False
)
\`\`\`

---

### 15.9.4 long format 리텐션 데이터 만들기

시각화나 후속 분석을 위해 long format으로도 저장합니다.

\`\`\`python
cohort_retention_long = (
    cohort_retention_table
    .reset_index()
    .melt(
        id_vars="cohort_month",
        var_name="cohort_index",
        value_name="retention_rate"
    )
)

cohort_retention_long = cohort_retention_long.dropna(
    subset=["retention_rate"]
)

cohort_retention_long.head()
\`\`\`

저장합니다.

\`\`\`python
cohort_retention_long.to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_retention_long.csv",
    index=False
)
\`\`\`

---

### 15.9.5 해석 예시

\`\`\`text
리텐션 테이블은 각 코호트의 고객이 시간이 지남에 따라 얼마나 유지되는지 보여준다.
0개월 리텐션은 항상 100%다.
1개월 리텐션은 첫 구매 다음 달에 다시 구매한 고객 비율이다.
리텐션이 급격히 떨어지는 시점을 찾으면 고객 이탈이 발생하는 구간을 파악할 수 있다.
\`\`\`

---
`;export{e as default};