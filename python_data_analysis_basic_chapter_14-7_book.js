var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-7 -->

# 14.7 \`as_index\`와 인덱스 다루기

\`groupby()\` 결과에서 그룹화 기준은 기본적으로 인덱스가 됩니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

이 결과에서 \`category\`는 인덱스입니다.  
보고서용 데이터로 다루려면 보통 \`reset_index()\`를 사용했습니다.

하지만 \`groupby()\`에서 \`as_index=False\`를 사용할 수도 있습니다.

---

### 14.7.1 \`as_index=False\`

\`\`\`python
category_sales = orders.groupby("category", as_index=False)["total_price"].sum()

category_sales
\`\`\`

이렇게 하면 그룹화 기준인 \`category\`가 인덱스가 아니라 일반 컬럼으로 유지됩니다.

다음 코드와 비슷한 결과를 냅니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index()
)
\`\`\`

초보자에게는 \`reset_index()\` 방식이 그룹화 결과의 구조를 이해하기 쉽습니다.  
하지만 실무에서는 \`as_index=False\`도 자주 사용합니다.

---

### 14.7.2 어떤 방식을 사용할까?

두 방식 모두 사용할 수 있습니다.

\`\`\`python
# 방식 1
orders.groupby("category")["total_price"].sum().reset_index()

# 방식 2
orders.groupby("category", as_index=False)["total_price"].sum()
\`\`\`

기초 수업에서는 먼저 \`reset_index()\`를 익히는 것이 좋습니다.  
그룹화 결과가 인덱스로 만들어진다는 점을 이해할 수 있기 때문입니다.

실무 코드에서는 \`as_index=False\`를 사용하면 더 짧게 작성할 수 있습니다.

---

### 14.7.3 MultiIndex 결과 정리하기

여러 컬럼 기준으로 그룹화하거나 여러 집계를 한 번에 적용하면 결과가 복잡해질 수 있습니다.

예를 들어 다음 코드는 다층 컬럼을 만듭니다.

\`\`\`python
summary = orders.groupby("category").agg({
    "total_price": ["sum", "mean"],
    "quantity": ["sum", "mean"]
})

summary
\`\`\`

컬럼이 다음처럼 다층 구조가 됩니다.

\`\`\`text
total_price | sum
total_price | mean
quantity    | sum
quantity    | mean
\`\`\`

기초 과정에서는 이름 있는 집계 방식을 사용하면 이런 복잡성을 줄일 수 있습니다.

\`\`\`python
summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum"),
        avg_quantity=("quantity", "mean")
    )
    .reset_index()
)

summary
\`\`\`

보고서용 요약표를 만들 때는 이름 있는 집계를 권장합니다.

---
`;export{e as default};