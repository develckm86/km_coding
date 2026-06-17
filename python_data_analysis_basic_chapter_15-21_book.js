var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-21 -->

# 15.21 핵심 정리

이번 장에서는 pandas에서 데이터를 결합하는 방법을 배웠습니다.

같은 구조의 데이터를 위아래로 붙일 때는 \`pd.concat()\`을 사용합니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb], ignore_index=True)
\`\`\`

행 방향 결합에서는 인덱스가 중복될 수 있으므로 \`ignore_index=True\`를 자주 사용합니다.

서로 다른 정보를 공통 key 기준으로 연결할 때는 \`merge()\`를 사용합니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

\`merge()\`에서 중요한 옵션은 다음과 같습니다.

| 옵션 | 의미 |
|---|---|
| \`on\` | 결합 기준 컬럼 |
| \`left_on\`, \`right_on\` | 양쪽 key 컬럼명이 다를 때 사용 |
| \`how\` | 결합 방식 |
| \`suffixes\` | 겹치는 컬럼명 접미사 |
| \`indicator\` | 매칭 상태 확인 |
| \`validate\` | 결합 관계 검증 |

join 종류는 다음과 같습니다.

| 방식 | 의미 |
|---|---|
| \`inner\` | 양쪽에 모두 있는 key만 유지 |
| \`left\` | 왼쪽 데이터는 모두 유지 |
| \`right\` | 오른쪽 데이터는 모두 유지 |
| \`outer\` | 양쪽 데이터의 모든 key 유지 |

실무 분석에서는 기준 데이터 전체를 유지하기 위해 \`left join\`을 자주 사용합니다.

결합 후에는 반드시 검증해야 합니다.

\`\`\`python
len(before)
len(after)
df.isna().sum()
df["total_price"].sum()
df.duplicated(subset=["order_id"]).sum()
\`\`\`

데이터 결합은 분석용 데이터셋을 만드는 핵심 과정입니다.  
잘못 결합하면 분석 결과가 크게 왜곡될 수 있으므로, 결합 기준과 검증 과정을 항상 명확히 남기는 습관이 필요합니다.

---
`;export{e as default};