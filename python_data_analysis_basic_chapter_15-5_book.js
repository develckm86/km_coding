var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-5 -->

# 15.5 열 방향 결합: \`pd.concat(axis=1)\`

\`concat()\`은 열 방향으로도 데이터를 붙일 수 있습니다.  
이때는 \`axis=1\`을 사용합니다.

\`\`\`python
pd.concat([df1, df2], axis=1)
\`\`\`

하지만 열 방향 결합은 주의해서 사용해야 합니다.  
기본적으로 인덱스를 기준으로 좌우로 붙기 때문입니다.

---

### 15.5.1 기본 열 방향 결합

고객 기본 정보와 고객 추가 정보가 있다고 가정합니다.

\`\`\`python
customer_basic = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"]
})

customer_extra = pd.DataFrame({
    "region": ["서울", "부산", "서울"],
    "grade": ["VIP", "일반", "일반"]
})
\`\`\`

두 데이터를 좌우로 붙입니다.

\`\`\`python
customer_full = pd.concat([customer_basic, customer_extra], axis=1)

customer_full
\`\`\`

두 DataFrame의 행 순서가 정확히 같다면 정상적으로 붙습니다.

---

### 15.5.2 열 방향 결합의 위험

열 방향 결합은 행 순서가 다르면 잘못된 결과가 나올 수 있습니다.

\`\`\`python
customer_basic = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"]
})

customer_extra_wrong = pd.DataFrame({
    "region": ["부산", "서울", "서울"],
    "grade": ["일반", "VIP", "일반"]
})
\`\`\`

이 데이터를 단순히 좌우로 붙이면 고객과 지역이 잘못 연결될 수 있습니다.

\`\`\`python
pd.concat([customer_basic, customer_extra_wrong], axis=1)
\`\`\`

행 순서가 정확히 일치한다는 보장이 없다면 \`concat(axis=1)\`보다 \`merge()\`를 사용하는 것이 안전합니다.

---

### 15.5.3 key가 있다면 \`merge()\`를 사용하기

고객 추가 정보에 \`customer_id\`가 있다면 \`merge()\`가 더 적절합니다.

\`\`\`python
customer_extra = pd.DataFrame({
    "customer_id": [2, 1, 3],
    "region": ["부산", "서울", "서울"],
    "grade": ["일반", "VIP", "일반"]
})

customer_full = customer_basic.merge(
    customer_extra,
    on="customer_id",
    how="left"
)

customer_full
\`\`\`

\`merge()\`는 행 순서가 달라도 \`customer_id\`를 기준으로 올바르게 연결합니다.

정리하면 다음과 같습니다.

| 상황 | 권장 방법 |
|---|---|
| 같은 구조의 데이터를 위아래로 붙이기 | \`concat(axis=0)\` |
| 행 순서가 정확히 같은 데이터를 좌우로 붙이기 | \`concat(axis=1)\` |
| 공통 ID 기준으로 정보를 연결하기 | \`merge()\` |

---
`;export{e as default};