var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-17 -->

# 15.17 실무 예제 4: 고객, 상품 정보를 모두 붙인 분석용 데이터 만들기

이번에는 주문 데이터에 고객 정보와 상품 정보를 모두 결합해 분석용 통합 데이터를 만들어보겠습니다.

\`\`\`python
orders_full = (
    orders_all
    .merge(
        customers,
        on="customer_id",
        how="left",
        validate="many_to_one"
    )
    .merge(
        products,
        on="product_id",
        how="left",
        validate="many_to_one"
    )
)

orders_full
\`\`\`

이제 \`orders_full\`에는 다음 정보가 모두 들어 있습니다.

\`\`\`text
주문 정보
고객 정보
상품 정보
\`\`\`

분석 가능한 질문이 많아집니다.

\`\`\`python
orders_full.groupby("region")["total_price"].sum()
orders_full.groupby("grade")["total_price"].mean()
orders_full.groupby("category")["quantity"].sum()
orders_full.groupby(["region", "category"])["total_price"].sum()
\`\`\`

분석용 통합 데이터는 이후 EDA와 시각화의 기본 데이터가 됩니다.

---
`;export{e as default};