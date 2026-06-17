var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-15 -->

# 12.15 실무 예제 4: 가격 문자열을 숫자로 변환

가격 데이터가 문자열로 들어오면 바로 계산할 수 없습니다.

\`\`\`python
products[["product_name", "price_text"]]
\`\`\`

예를 들어 \`"30,000원"\`은 숫자가 아니라 문자열입니다.

\`\`\`python
products["price_text"].dtype
\`\`\`

계산하려면 숫자만 남긴 뒤 정수로 변환해야 합니다.

\`\`\`python
products["price"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)

products[["price_text", "price"]]
\`\`\`

이제 평균 가격을 계산할 수 있습니다.

\`\`\`python
products["price"].mean()
\`\`\`

가격대 컬럼도 만들 수 있습니다.

\`\`\`python
products["price_level"] = "저가"
products.loc[products["price"] >= 30000, "price_level"] = "중가"
products.loc[products["price"] >= 50000, "price_level"] = "고가"

products[["product_name", "price", "price_level"]]
\`\`\`

문자열 데이터 처리와 파생 변수 생성은 자주 함께 사용됩니다.

---
`;export{e as default};