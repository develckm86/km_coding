var e=`# 5장. 데이터 재구조화 실습

## 5.11 \`stack()\`과 \`unstack()\` 실습

\`stack()\`과 \`unstack()\`은 인덱스 기반 재구조화에 사용됩니다.

특히 groupby 결과가 MultiIndex 형태일 때 유용합니다.

---

### 5.11.1 MultiIndex groupby 결과 만들기

\`\`\`python
region_category_sales = (
    orders_mart
    .groupby(["region", "category"])["net_amount"]
    .sum()
)

region_category_sales
\`\`\`

이 결과는 MultiIndex Series입니다.

인덱스가 다음 두 단계로 구성됩니다.

\`\`\`text
region
category
\`\`\`

---

### 5.11.2 unstack으로 열로 펼치기

\`\`\`python
region_category_unstacked = region_category_sales.unstack(fill_value=0)

region_category_unstacked
\`\`\`

\`category\` 인덱스 레벨이 열로 이동했습니다.

이 결과는 \`pivot_table()\`과 비슷한 형태입니다.

---

### 5.11.3 stack으로 다시 long 형태로 되돌리기

\`\`\`python
region_category_stacked = region_category_unstacked.stack()

region_category_stacked
\`\`\`

다시 MultiIndex Series 형태가 됩니다.

DataFrame으로 만들려면 \`reset_index()\`를 사용합니다.

\`\`\`python
region_category_stacked_df = (
    region_category_stacked
    .reset_index(name="total_sales")
)

region_category_stacked_df
\`\`\`

---

### 5.11.4 stack과 unstack 사용 상황

| 함수 | 역할 | 사용 상황 |
|---|---|---|
| \`unstack()\` | 인덱스 레벨을 컬럼으로 이동 | MultiIndex 결과를 피벗처럼 만들 때 |
| \`stack()\` | 컬럼을 인덱스 레벨로 이동 | 넓은 데이터를 다시 긴 형태로 만들 때 |

처음에는 \`pivot_table()\`과 \`melt()\`를 더 많이 사용해도 됩니다.  
하지만 groupby 결과를 다룰 때는 \`stack()\`과 \`unstack()\`을 알면 편리합니다.

---
`;export{e as default};