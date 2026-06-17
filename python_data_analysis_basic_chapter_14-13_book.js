var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-13 -->

# 14.13 실무 예제 3: 지역별 카테고리 매출 피벗 테이블

지역과 카테고리를 기준으로 매출표를 만들어보겠습니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot
\`\`\`

이 표는 엑셀 피벗 테이블과 비슷한 형태입니다.

행에는 지역이 있고, 열에는 카테고리가 있습니다.  
값에는 매출 합계가 들어갑니다.

이 표를 통해 다음 질문에 답할 수 있습니다.

\`\`\`text
서울에서 매출이 가장 높은 카테고리는 무엇인가?
부산과 대전의 카테고리별 매출 구조는 어떻게 다른가?
전체 매출에서 가장 큰 카테고리는 무엇인가?
\`\`\`

---
`;export{e as default};