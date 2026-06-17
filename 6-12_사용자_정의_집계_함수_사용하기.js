var e=`# 6장. 고급 groupby 분석 리포트

## 6.12 사용자 정의 집계 함수 사용하기

\`agg()\`에는 기본 함수뿐 아니라 직접 만든 함수도 사용할 수 있습니다.

---

### 6.12.1 범위 계산 함수 만들기

주문 금액의 범위를 계산하는 함수를 만듭니다.

\`\`\`python
def amount_range(series: pd.Series) -> float:
    return series.max() - series.min()
\`\`\`

카테고리별 주문 금액 범위를 계산합니다.

\`\`\`python
category_amount_range = (
    orders_mart
    .groupby("category")
    .agg(
        min_amount=("net_amount", "min"),
        max_amount=("net_amount", "max"),
        amount_range=("net_amount", amount_range)
    )
    .reset_index()
)

category_amount_range
\`\`\`

---

### 6.12.2 상위 1개 상품 이름 반환 함수

각 카테고리에서 매출이 가장 높은 상품명을 구하고 싶다고 해봅시다.

먼저 상품별 매출을 계산하는 것이 더 명확하지만, 사용자 정의 함수를 이해하기 위해 예제를 보겠습니다.

\`\`\`python
def top_product_name(group: pd.DataFrame) -> str:
    product_sales = (
        group
        .groupby("product_name")["net_amount"]
        .sum()
        .sort_values(ascending=False)
    )

    return product_sales.index[0]
\`\`\`

\`apply()\`를 사용합니다.

\`\`\`python
top_product_by_category = (
    orders_mart
    .groupby("category")
    .apply(top_product_name)
    .reset_index(name="top_product_name")
)

top_product_by_category
\`\`\`

---

### 6.12.3 사용자 정의 함수 사용 시 주의점

사용자 정의 함수는 유연하지만 성능이 느릴 수 있습니다.

가능하면 먼저 다음 기능으로 해결할 수 있는지 확인합니다.

\`\`\`text
agg
transform
rank
sort_values
drop_duplicates
\`\`\`

\`apply()\`는 복잡한 로직이 필요할 때 사용합니다.

---
`;export{e as default};