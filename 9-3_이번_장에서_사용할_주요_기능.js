var e=`# 9장. 복잡한 데이터 결합 실습

## 9.3 이번 장에서 사용할 주요 기능

이번 장에서는 다음 pandas 기능을 사용합니다.

| 기능 | 역할 |
|---|---|
| \`merge()\` | key 기준 데이터 결합 |
| \`indicator=True\` | 결합 결과의 매칭 상태 확인 |
| \`validate\` | 결합 관계 검증 |
| \`left_on\`, \`right_on\` | 양쪽 key 이름이 다를 때 사용 |
| 다중 key 결합 | 여러 컬럼을 기준으로 결합 |
| \`duplicated()\` | key 중복 확인 |
| \`is_unique\` | key 유일성 확인 |
| \`merge_asof()\` | 시간 기준 가장 가까운 이전 값 결합 |
| \`sort_values()\` | 시간 기준 결합 전 정렬 |
| \`groupby()\` | 결합 후 검증 집계 |
| \`set\` 차집합 | 매칭 실패 key 확인 |

---

### 9.3.1 \`indicator=True\`

\`indicator=True\`를 사용하면 \`_merge\` 컬럼이 생깁니다.

\`\`\`python
merged = orders.merge(
    customers,
    on="customer_id",
    how="left",
    indicator=True
)

merged["_merge"].value_counts()
\`\`\`

\`_merge\` 값은 다음 세 가지입니다.

| 값 | 의미 |
|---|---|
| \`left_only\` | 왼쪽 데이터에만 있음 |
| \`right_only\` | 오른쪽 데이터에만 있음 |
| \`both\` | 양쪽 데이터에 모두 있음 |

left join에서는 \`left_only\`가 있으면 매칭 실패가 있다는 뜻입니다.

---

### 9.3.2 \`validate\`

\`validate\`는 결합 관계가 예상과 맞는지 검증합니다.

\`\`\`python
orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

주문 데이터와 고객 마스터는 보통 many-to-one 관계입니다.

\`\`\`text
orders: 같은 customer_id가 여러 번 나올 수 있음
customers: customer_id가 한 번만 나와야 함
\`\`\`

오른쪽 고객 데이터에 같은 \`customer_id\`가 여러 번 있으면 오류가 발생합니다.

대표 옵션은 다음과 같습니다.

| 옵션 | 의미 |
|---|---|
| \`one_to_one\` | 양쪽 key가 모두 유일 |
| \`one_to_many\` | 왼쪽 key 유일, 오른쪽 key 중복 가능 |
| \`many_to_one\` | 왼쪽 key 중복 가능, 오른쪽 key 유일 |
| \`many_to_many\` | 양쪽 key 모두 중복 가능 |

실무에서는 \`validate\`를 적극적으로 사용하는 것이 좋습니다.

---

### 9.3.3 \`merge_asof()\`

\`merge_asof()\`는 시간 기준 결합에 사용합니다.

예를 들어 주문일 기준으로 해당 시점 이전의 최신 가격을 붙일 수 있습니다.

\`\`\`python
pd.merge_asof(
    orders_sorted,
    price_history_sorted,
    by="product_id",
    left_on="order_date",
    right_on="effective_date",
    direction="backward"
)
\`\`\`

\`direction="backward"\`는 주문일보다 같거나 이전인 날짜 중 가장 가까운 값을 붙인다는 뜻입니다.

시간 이력 데이터를 다룰 때 매우 유용합니다.

---
`;export{e as default};