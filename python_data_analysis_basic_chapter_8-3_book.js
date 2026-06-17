var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-3 -->

# 8.3 인덱스 기준 정렬: \`sort_index()\`

값 기준 정렬이 컬럼의 값을 기준으로 행을 정렬하는 것이라면,  
인덱스 기준 정렬은 행의 **인덱스 라벨**을 기준으로 데이터를 정렬하는 것입니다.

\`\`\`python
df.sort_index()
\`\`\`

예를 들어 정렬이나 필터링 후 인덱스 순서가 섞인 데이터가 있다고 가정해봅시다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)

sorted_orders
\`\`\`

이 데이터는 주문 금액 기준으로 정렬되어 있으므로 인덱스 순서가 0, 1, 2, 3처럼 이어지지 않을 수 있습니다.

이때 인덱스 기준으로 다시 원래 순서에 가깝게 정렬하려면 다음처럼 작성합니다.

\`\`\`python
sorted_orders.sort_index()
\`\`\`

\`sort_index()\`는 다음과 같은 상황에서 사용합니다.

- 인덱스가 날짜일 때 날짜순으로 정렬하기
- 필터링 후 인덱스 순서를 다시 확인하기
- 컬럼 이름을 알파벳순으로 정렬하기
- 인덱스가 분석 기준일 때 정렬하기

---

### 8.3.1 행 인덱스 정렬

기본적으로 \`sort_index()\`는 행 인덱스를 기준으로 정렬합니다.

\`\`\`python
sorted_orders.sort_index()
\`\`\`

내림차순으로 정렬하려면 \`ascending=False\`를 사용합니다.

\`\`\`python
sorted_orders.sort_index(ascending=False)
\`\`\`

---

### 8.3.2 컬럼 이름 기준 정렬

\`axis=1\`을 지정하면 컬럼 이름 기준으로 정렬할 수 있습니다.

\`\`\`python
orders.sort_index(axis=1)
\`\`\`

이 코드는 컬럼명을 알파벳순으로 정렬합니다.

컬럼이 많고 이름이 뒤섞여 있을 때 컬럼 구조를 확인하는 데 도움이 될 수 있습니다.  
하지만 실무 분석에서는 컬럼 순서가 의미를 가지는 경우도 많으므로, 무조건 컬럼을 정렬하기보다는 필요한 상황에서만 사용하는 것이 좋습니다.

---

### 8.3.3 \`sort_index()\`와 \`reset_index()\`의 차이

두 메서드는 비슷해 보이지만 역할이 다릅니다.

| 메서드 | 역할 |
|---|---|
| \`sort_index()\` | 기존 인덱스 값을 기준으로 행 순서를 정렬 |
| \`reset_index()\` | 인덱스를 0부터 다시 부여 |

예를 들어 정렬된 결과가 있을 때:

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)
\`\`\`

기존 인덱스 순서로 되돌려 보고 싶으면:

\`\`\`python
sorted_orders.sort_index()
\`\`\`

현재 정렬 순서는 유지하면서 인덱스만 다시 매기고 싶으면:

\`\`\`python
sorted_orders.reset_index(drop=True)
\`\`\`

정리하면 다음과 같습니다.

- **행 순서를 인덱스 기준으로 다시 정렬하고 싶다** → \`sort_index()\`
- **현재 행 순서는 유지하고 번호만 다시 붙이고 싶다** → \`reset_index(drop=True)\`

---
`;export{e as default};