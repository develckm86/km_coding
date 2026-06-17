var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-14 -->

# 14.14 실무 예제 4: 지역별 고객 등급 비율

지역별 고객 등급 분포를 확인해보겠습니다.

\`\`\`python
region_grade_count = pd.crosstab(
    orders["region"],
    orders["grade"],
    margins=True,
    margins_name="합계"
)

region_grade_count
\`\`\`

지역별 등급 비율도 계산합니다.

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio.round(1)
\`\`\`

이 표는 각 지역 안에서 VIP와 일반 고객이 어느 정도 비율을 차지하는지 보여줍니다.

예를 들어 다음 질문에 답할 수 있습니다.

\`\`\`text
VIP 고객 비율이 높은 지역은 어디인가?
일반 고객 비율이 높은 지역은 어디인가?
지역별 고객 구성이 다른가?
\`\`\`

단, 이 예제 데이터는 행 수가 적기 때문에 실제 분석에서는 더 많은 데이터로 판단해야 합니다.

---
`;export{e as default};