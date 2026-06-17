var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-2 -->

# 15.2 데이터 결합 방식 overview

pandas에서 자주 사용하는 결합 방식은 크게 두 가지입니다.

---

### 15.2.1 이어 붙이기: \`concat()\`

\`concat()\`은 여러 DataFrame을 한 방향으로 이어 붙입니다.

행 방향 결합은 위아래로 붙이는 방식입니다.

\`\`\`text
1월 주문 데이터
2월 주문 데이터
3월 주문 데이터
\`\`\`

위 데이터를 하나로 합칩니다.

\`\`\`text
전체 주문 데이터
\`\`\`

열 방향 결합은 좌우로 붙이는 방식입니다.

\`\`\`text
고객 기본 정보 + 고객 추가 정보
\`\`\`

단, 열 방향 결합은 인덱스가 맞아야 하므로 주의가 필요합니다.

---

### 15.2.2 key 기준 연결하기: \`merge()\`

\`merge()\`는 두 DataFrame을 공통 key 기준으로 연결합니다.

예를 들어 두 데이터에 모두 \`customer_id\`가 있으면 이 값을 기준으로 연결할 수 있습니다.

\`\`\`python
orders.merge(customers, on="customer_id")
\`\`\`

이 방식은 SQL의 join과 비슷합니다.

분석에서 가장 자주 사용하는 결합 방식은 \`left join\`입니다.  
주문 데이터 전체는 유지하면서 고객 정보를 붙이고 싶을 때 사용합니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

---

### 15.2.3 어떤 기능을 써야 할까?

| 상황 | 사용 기능 |
|---|---|
| 같은 구조의 여러 월 파일을 위아래로 붙이기 | \`pd.concat(axis=0)\` |
| 같은 행 순서를 가진 정보를 좌우로 붙이기 | \`pd.concat(axis=1)\` |
| 공통 ID 기준으로 고객 정보를 붙이기 | \`merge()\` |
| 공통 ID 기준으로 상품 정보를 붙이기 | \`merge()\` |
| 인덱스를 기준으로 간단히 붙이기 | \`join()\` |
| 엑셀 피벗처럼 요약표 만들기 | \`pivot_table()\` |

이 장에서는 \`concat()\`과 \`merge()\`를 중심으로 학습합니다.

---
`;export{e as default};