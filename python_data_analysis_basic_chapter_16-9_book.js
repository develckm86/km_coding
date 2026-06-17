var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-9 -->

# 16.9 범주형 데이터 요약

수치형 데이터는 평균, 중앙값, 표준편차로 요약할 수 있습니다.  
하지만 지역, 등급, 카테고리 같은 범주형 데이터는 다른 방식으로 요약해야 합니다.

범주형 데이터에서는 주로 빈도와 비율을 봅니다.

---

### 16.9.1 빈도 확인: \`value_counts()\`

지역별 데이터 개수를 확인해보겠습니다.

\`\`\`python
orders["region"].value_counts()
\`\`\`

고객 등급별 개수도 확인합니다.

\`\`\`python
orders["grade"].value_counts()
\`\`\`

\`value_counts()\`는 범주형 데이터의 분포를 빠르게 파악하는 데 매우 유용합니다.

---

### 16.9.2 비율 확인

비율로 보고 싶다면 \`normalize=True\`를 사용합니다.

\`\`\`python
orders["region"].value_counts(normalize=True)
\`\`\`

백분율로 표현하려면 100을 곱합니다.

\`\`\`python
region_ratio = orders["region"].value_counts(normalize=True) * 100

region_ratio.round(1)
\`\`\`

이 결과는 각 지역이 전체에서 몇 %를 차지하는지 보여줍니다.

---

### 16.9.3 결측치 포함 여부

\`value_counts()\`는 기본적으로 결측치를 제외합니다.

결측치도 함께 보고 싶다면 \`dropna=False\`를 사용합니다.

\`\`\`python
orders["region"].value_counts(dropna=False)
\`\`\`

실무에서는 결측치가 하나의 품질 문제일 수 있으므로 범주형 데이터 분포를 볼 때 결측치 포함 여부를 확인하는 것이 좋습니다.

---

### 16.9.4 범주형 데이터 요약표 만들기

지역별 빈도와 비율을 함께 보고 싶다면 DataFrame으로 만들 수 있습니다.

\`\`\`python
region_count = orders["region"].value_counts()
region_ratio = orders["region"].value_counts(normalize=True) * 100

region_summary = pd.DataFrame({
    "count": region_count,
    "ratio_percent": region_ratio.round(1)
})

region_summary
\`\`\`

이런 요약표는 보고서에 넣기 좋습니다.

---

### 16.9.5 교차표로 두 범주형 변수 요약

두 범주형 변수의 관계를 보고 싶다면 \`pd.crosstab()\`을 사용할 수 있습니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

지역별 고객 등급 분포를 비율로 보고 싶다면 다음처럼 작성합니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
).round(2)
\`\`\`

교차표는 14장에서 다룬 내용입니다.  
기본 통계에서도 범주형 데이터 요약을 위해 자주 사용됩니다.

---
`;export{e as default};