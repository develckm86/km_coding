var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-7 -->

# 15.7 join 종류 이해하기

\`merge()\`에서 \`how\`는 어떤 방식으로 결합할지 정하는 옵션입니다.

대표적인 join 종류는 다음 네 가지입니다.

| 옵션 | 의미 |
|---|---|
| \`inner\` | 양쪽에 모두 있는 key만 유지 |
| \`left\` | 왼쪽 데이터는 모두 유지 |
| \`right\` | 오른쪽 데이터는 모두 유지 |
| \`outer\` | 양쪽 데이터의 모든 key 유지 |

이 차이를 이해하는 것이 매우 중요합니다.

---

### 15.7.1 예제 데이터

join 종류를 이해하기 위해 간단한 데이터를 만들어보겠습니다.

\`\`\`python
left = pd.DataFrame({
    "id": [1, 2, 3],
    "left_value": ["A", "B", "C"]
})

right = pd.DataFrame({
    "id": [2, 3, 4],
    "right_value": ["X", "Y", "Z"]
})
\`\`\`

왼쪽 데이터에는 ID 1, 2, 3이 있습니다.  
오른쪽 데이터에는 ID 2, 3, 4가 있습니다.

공통으로 있는 ID는 2와 3입니다.

---

### 15.7.2 inner join

\`inner join\`은 양쪽에 모두 있는 key만 남깁니다.

\`\`\`python
pd.merge(left, right, on="id", how="inner")
\`\`\`

결과에는 ID 2와 3만 남습니다.

\`\`\`text
id 2
id 3
\`\`\`

ID 1은 오른쪽에 없고, ID 4는 왼쪽에 없으므로 제외됩니다.

\`inner join\`은 양쪽 데이터가 모두 존재하는 경우만 분석하고 싶을 때 사용합니다.

---

### 15.7.3 left join

\`left join\`은 왼쪽 데이터를 모두 유지합니다.

\`\`\`python
pd.merge(left, right, on="id", how="left")
\`\`\`

결과에는 왼쪽 데이터의 ID 1, 2, 3이 모두 남습니다.

ID 1은 오른쪽에 매칭되는 값이 없으므로 \`right_value\`가 결측치가 됩니다.

\`\`\`text
id 1 → right_value 없음
id 2 → 매칭됨
id 3 → 매칭됨
\`\`\`

실무 분석에서는 \`left join\`을 가장 많이 사용합니다.  
분석의 기준이 되는 데이터, 예를 들어 주문 데이터를 모두 유지하면서 고객 정보나 상품 정보를 붙이고 싶기 때문입니다.

---

### 15.7.4 right join

\`right join\`은 오른쪽 데이터를 모두 유지합니다.

\`\`\`python
pd.merge(left, right, on="id", how="right")
\`\`\`

결과에는 오른쪽 데이터의 ID 2, 3, 4가 모두 남습니다.

ID 4는 왼쪽에 매칭되는 값이 없으므로 \`left_value\`가 결측치가 됩니다.

\`right join\`은 사용할 수 있지만, 실무에서는 왼쪽과 오른쪽을 바꾸어 \`left join\`으로 표현하는 경우가 많습니다.

---

### 15.7.5 outer join

\`outer join\`은 양쪽 데이터의 모든 key를 유지합니다.

\`\`\`python
pd.merge(left, right, on="id", how="outer")
\`\`\`

결과에는 ID 1, 2, 3, 4가 모두 포함됩니다.

\`\`\`text
id 1 → 왼쪽에만 있음
id 2 → 양쪽에 있음
id 3 → 양쪽에 있음
id 4 → 오른쪽에만 있음
\`\`\`

\`outer join\`은 두 데이터의 key 차이를 확인하거나 전체 key 목록을 보존하고 싶을 때 사용합니다.

---

### 15.7.6 join 종류 비교 표

| id | left 존재 | right 존재 | inner | left | right | outer |
|---:|---|---|---|---|---|---|
| 1 | 있음 | 없음 | 제외 | 포함 | 제외 | 포함 |
| 2 | 있음 | 있음 | 포함 | 포함 | 포함 | 포함 |
| 3 | 있음 | 있음 | 포함 | 포함 | 포함 | 포함 |
| 4 | 없음 | 있음 | 제외 | 제외 | 포함 | 포함 |

join을 선택할 때는 분석의 기준 데이터를 무엇으로 둘지 생각해야 합니다.

\`\`\`text
주문 데이터 전체를 유지할 것인가?
고객 데이터 전체를 유지할 것인가?
양쪽에 모두 있는 데이터만 볼 것인가?
매칭되지 않은 데이터도 확인할 것인가?
\`\`\`

---
`;export{e as default};