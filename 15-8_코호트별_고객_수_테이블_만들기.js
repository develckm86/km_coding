var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.8 코호트별 고객 수 테이블 만들기

이제 코호트 월과 코호트 인덱스별로 구매 고객 수를 계산합니다.

---

### 15.8.1 코호트별 구매 고객 수 계산

\`\`\`python
cohort_counts = (
    cohort_data
    .groupby(["cohort_month", "cohort_index"])
    .agg(
        active_customers=("customer_id", "nunique")
    )
    .reset_index()
)

cohort_counts.head()
\`\`\`

---

### 15.8.2 피벗 테이블 만들기

\`\`\`python
cohort_count_table = pd.pivot_table(
    data=cohort_counts,
    index="cohort_month",
    columns="cohort_index",
    values="active_customers",
    aggfunc="sum"
)

cohort_count_table
\`\`\`

---

### 15.8.3 저장하기

\`\`\`python
cohort_count_table.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_15_cohort_count_table.csv",
    index=False
)
\`\`\`

---

### 15.8.4 해석 예시

\`\`\`text
cohort_count_table은 각 코호트에서 시간이 지남에 따라 몇 명의 고객이 구매했는지를 보여준다.
0개월 값은 해당 코호트의 최초 구매 고객 수다.
1개월, 2개월 값은 이후 다시 구매한 고객 수다.
\`\`\`

---
`;export{e as default};