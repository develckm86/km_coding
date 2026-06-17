var e=`# 5장. 데이터 재구조화 실습

## 5.12 리스트형 컬럼 펼치기: \`explode()\`

이번에는 한 셀에 여러 값이 들어 있는 경우를 다룹니다.

예를 들어 상품마다 여러 태그가 있을 수 있습니다.

\`\`\`text
노트북: 전자기기, 고가, 업무용
파이썬 입문서: 도서, 프로그래밍, 입문
머그컵: 생활용품, 주방, 저가
\`\`\`

이런 데이터를 분석하려면 태그를 여러 행으로 펼쳐야 할 수 있습니다.

---

### 5.12.1 상품 태그 데이터 만들기

\`\`\`python
product_tags = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004", "P005"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초", "무선 마우스"],
    "tags": [
        ["전자기기", "고가", "업무용"],
        ["도서", "프로그래밍", "입문"],
        ["생활용품", "주방", "저가"],
        ["도서", "데이터", "SQL"],
        ["전자기기", "주변기기", "무선"]
    ]
})

product_tags
\`\`\`

---

### 5.12.2 explode로 태그 펼치기

\`\`\`python
product_tags_exploded = product_tags.explode("tags")

product_tags_exploded
\`\`\`

각 상품의 태그가 여러 행으로 펼쳐졌습니다.

---

### 5.12.3 태그별 상품 수 계산

\`\`\`python
tag_summary = (
    product_tags_exploded
    .groupby("tags")
    .agg(
        product_count=("product_id", "nunique")
    )
    .reset_index()
    .sort_values(by="product_count", ascending=False)
)

tag_summary
\`\`\`

---

### 5.12.4 저장하기

\`\`\`python
product_tags_exploded.to_csv(
    OUTPUT_TABLES / "chapter_05_exploded_product_tags.csv",
    index=False
)
\`\`\`

---

### 5.12.5 explode 사용 시 주의점

\`explode()\`를 사용하면 행 수가 늘어납니다.

예를 들어 상품 5개에 태그가 각각 3개씩 있으면 explode 후 15행이 됩니다.

따라서 explode 후에는 행 수가 늘어나는 것이 정상입니다.  
하지만 이 데이터를 매출 데이터와 결합할 때는 중복 집계가 발생할 수 있으므로 주의해야 합니다.

예를 들어 한 상품에 태그가 3개 있으면, 상품 매출이 태그별로 3번 나타날 수 있습니다.  
이 경우 태그별 매출 분석에서는 의도한 집계 방식인지 확인해야 합니다.

---
`;export{e as default};