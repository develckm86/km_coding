var e=`# 5장. 데이터 재구조화 실습

## 5.8 \`pivot()\`과 \`pivot_table()\`의 차이

\`pivot()\`과 \`pivot_table()\`은 비슷하지만 중요한 차이가 있습니다.

---

### 5.8.1 중복이 없는 데이터에서 pivot 사용

먼저 중복 조합이 없는 데이터를 만들어봅니다.

\`\`\`python
simple_sales = pd.DataFrame({
    "month": ["2026-01", "2026-01", "2026-02", "2026-02"],
    "category": ["도서", "전자기기", "도서", "전자기기"],
    "sales": [45000, 300000, 35000, 220000]
})

simple_sales
\`\`\`

\`month\`와 \`category\` 조합이 하나씩만 있습니다.

\`\`\`python
simple_pivot = simple_sales.pivot(
    index="month",
    columns="category",
    values="sales"
)

simple_pivot
\`\`\`

---

### 5.8.2 중복이 있으면 pivot은 오류

이번에는 같은 월과 카테고리 조합이 여러 번 있는 데이터를 만들어봅니다.

\`\`\`python
duplicated_sales = pd.DataFrame({
    "month": ["2026-01", "2026-01", "2026-01", "2026-02"],
    "category": ["도서", "도서", "전자기기", "전자기기"],
    "sales": [20000, 25000, 300000, 220000]
})

duplicated_sales
\`\`\`

이 데이터에서 \`month="2026-01"\`, \`category="도서"\` 조합이 두 번 있습니다.

다음 코드는 오류가 발생할 수 있습니다.

\`\`\`python
# duplicated_sales.pivot(
#     index="month",
#     columns="category",
#     values="sales"
# )
\`\`\`

왜냐하면 하나의 셀에 들어가야 할 값이 두 개이기 때문입니다.

---

### 5.8.3 중복이 있으면 pivot_table 사용

중복 조합이 있을 때는 집계 함수가 필요합니다.

\`\`\`python
duplicated_pivot_table = pd.pivot_table(
    data=duplicated_sales,
    index="month",
    columns="category",
    values="sales",
    aggfunc="sum",
    fill_value=0
)

duplicated_pivot_table
\`\`\`

\`pivot_table()\`은 중복된 값을 합계로 집계해 하나의 셀에 넣습니다.

---

### 5.8.4 차이 정리

| 구분 | pivot | pivot_table |
|---|---|---|
| 중복 조합 | 허용하지 않음 | 집계 함수로 처리 가능 |
| 집계 함수 | 없음 | \`aggfunc\` 사용 |
| 실무 사용 빈도 | 제한적 | 매우 자주 사용 |
| 사용 상황 | 이미 정리된 데이터 | 원본 거래 데이터, 주문 데이터 |

실무에서는 주문 데이터처럼 중복 조합이 자주 있으므로 \`pivot_table()\`을 더 많이 사용합니다.

---
`;export{e as default};