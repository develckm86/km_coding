var e=`# 5장. 데이터 재구조화 실습

## 5.9 wide 데이터를 long 데이터로 변환하기: \`melt()\`

이번에는 wide format 데이터를 long format으로 바꾸는 실습을 합니다.

---

### 5.9.1 wide format 예제 만들기

월별 매출이 컬럼으로 펼쳐진 데이터를 만들어봅니다.

\`\`\`python
wide_sales = pd.DataFrame({
    "category": ["전자기기", "도서", "생활용품"],
    "2026-01": [300000, 45000, 45000],
    "2026-02": [290000, 35000, 0],
    "2026-03": [300000, 30000, 225000],
    "2026-04": [590000, 75000, 50000]
})

wide_sales
\`\`\`

이 데이터는 사람이 보기에는 좋습니다.  
하지만 시각화나 groupby에 사용하려면 long format이 더 편할 수 있습니다.

저장합니다.

\`\`\`python
wide_sales.to_csv(
    OUTPUT_TABLES / "chapter_05_wide_sales_sample.csv",
    index=False
)
\`\`\`

---

### 5.9.2 melt 기본 사용

\`\`\`python
long_sales = pd.melt(
    wide_sales,
    id_vars=["category"],
    value_vars=["2026-01", "2026-02", "2026-03", "2026-04"],
    var_name="year_month",
    value_name="total_sales"
)

long_sales
\`\`\`

결과는 다음 구조입니다.

\`\`\`text
category | year_month | total_sales
\`\`\`

이 구조는 월별 카테고리 매출 그래프를 그리기 좋습니다.

---

### 5.9.3 value_vars 생략하기

\`id_vars\`를 제외한 모든 컬럼을 펼치려면 \`value_vars\`를 생략할 수 있습니다.

\`\`\`python
long_sales_auto = pd.melt(
    wide_sales,
    id_vars=["category"],
    var_name="year_month",
    value_name="total_sales"
)

long_sales_auto
\`\`\`

컬럼이 많을 때는 이 방식이 편합니다.

---

### 5.9.4 long 데이터 저장하기

\`\`\`python
long_sales.to_csv(
    OUTPUT_TABLES / "chapter_05_long_sales_sample.csv",
    index=False
)
\`\`\`

---

### 5.9.5 melt 결과 해석

wide format에서는 월이 컬럼명으로 들어가 있었습니다.

\`\`\`text
2026-01
2026-02
2026-03
2026-04
\`\`\`

melt 후에는 월이 하나의 값으로 변환되었습니다.

\`\`\`text
year_month
\`\`\`

이제 \`year_month\` 기준으로 정렬하거나 그래프를 그릴 수 있습니다.

\`\`\`python
long_sales.sort_values(["category", "year_month"])
\`\`\`

---
`;export{e as default};