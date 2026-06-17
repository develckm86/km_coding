var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-14 -->

# 12.14 실무 예제 3: 상품 코드에서 정보 추출

상품 코드에는 여러 정보가 포함될 수 있습니다.

\`\`\`python
products["product_code"]
\`\`\`

예를 들어 \`ELEC-KEY-001\`은 다음처럼 해석할 수 있습니다.

\`\`\`text
ELEC: 대분류
KEY: 상품 약어
001: 상품 번호
\`\`\`

\`split()\`으로 분리해보겠습니다.

\`\`\`python
products[["main_code", "item_code", "item_number"]] = products["product_code"].str.split("-", expand=True)

products[["product_code", "main_code", "item_code", "item_number"]]
\`\`\`

대분류 코드에 의미를 부여할 수 있습니다.

\`\`\`python
category_name_map = {
    "ELEC": "전자기기",
    "BOOK": "도서",
    "LIFE": "생활용품"
}

products["main_category_name"] = products["main_code"].replace(category_name_map)

products[["product_code", "main_code", "main_category_name"]]
\`\`\`

이제 상품 대분류별 개수를 확인할 수 있습니다.

\`\`\`python
products["main_category_name"].value_counts()
\`\`\`

상품 코드가 일정한 규칙을 가지고 있다면, 문자열 처리를 통해 분석에 필요한 컬럼을 만들 수 있습니다.

---
`;export{e as default};