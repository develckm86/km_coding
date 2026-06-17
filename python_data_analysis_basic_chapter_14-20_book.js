var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-20 -->

# 14.20 다음 장 예고

이번 장에서는 그룹화와 집계를 배웠습니다.

다음 장에서는 **데이터 결합**을 배웁니다.

실무 데이터는 하나의 파일에 모두 들어 있는 경우보다 여러 파일이나 여러 테이블로 나뉘어 있는 경우가 많습니다.

예를 들어 다음과 같은 데이터가 따로 있을 수 있습니다.

\`\`\`text
고객 정보
주문 정보
상품 정보
매출 정보
지역 정보
\`\`\`

분석을 하려면 이런 데이터를 하나로 합쳐야 합니다.

다음 장에서는 다음 내용을 다룹니다.

- 데이터 결합이 필요한 이유
- 행 방향 결합 \`concat()\`
- 열 방향 결합
- 공통 key를 기준으로 결합하는 \`merge()\`
- inner join, left join, right join, outer join
- 결합 후 행 개수와 결측치 확인
- 고객 정보와 주문 데이터 결합
- 상품 정보와 매출 데이터 결합

그룹화와 집계가 “데이터를 요약하는 방법”이라면, 데이터 결합은 “분석에 필요한 데이터를 하나로 모으는 방법”입니다.

---

## 참고 문서

- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: \`DataFrame.groupby\`
- pandas 공식 문서: GroupBy aggregation
- pandas 공식 문서: \`DataFrame.agg\`
- pandas 공식 문서: \`pivot_table\`
- pandas 공식 문서: Reshaping and pivot tables
- pandas 공식 문서: \`crosstab\`
`;export{e as default};