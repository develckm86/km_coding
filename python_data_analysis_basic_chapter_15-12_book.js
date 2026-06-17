var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-12 -->

# 15.12 결합 관계 검증: \`validate\`

\`merge()\`에는 결합 관계가 예상과 맞는지 확인하는 \`validate\` 옵션이 있습니다.

예를 들어 주문 데이터는 고객 ID가 여러 번 나올 수 있습니다.  
한 고객이 여러 번 주문할 수 있기 때문입니다.

반면 고객 데이터에서는 고객 ID가 한 번만 나와야 합니다.

이 관계는 다음과 같습니다.

\`\`\`text
orders: customer_id 여러 번 가능
customers: customer_id 한 번만 가능
\`\`\`

즉, many-to-one 관계입니다.

\`\`\`python
orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

만약 오른쪽 고객 데이터에 같은 \`customer_id\`가 여러 번 있으면 오류가 발생합니다.  
이렇게 하면 잘못된 결합으로 행 수가 늘어나는 문제를 미리 막을 수 있습니다.

---

### 15.12.1 validate 옵션 종류

| 옵션 | 의미 |
|---|---|
| \`"one_to_one"\` | 양쪽 key가 모두 유일해야 함 |
| \`"one_to_many"\` | 왼쪽 key는 유일, 오른쪽 key는 중복 가능 |
| \`"many_to_one"\` | 왼쪽 key는 중복 가능, 오른쪽 key는 유일 |
| \`"many_to_many"\` | 양쪽 key 모두 중복 가능 |

주문 데이터와 고객 데이터 결합은 보통 \`many_to_one\`입니다.

\`\`\`text
여러 주문 → 한 고객 정보
\`\`\`

주문 데이터와 상품 데이터 결합도 보통 \`many_to_one\`입니다.

\`\`\`text
여러 주문 → 한 상품 정보
\`\`\`

고객 정보와 고객 등급 코드표 결합도 보통 \`many_to_one\`입니다.

\`\`\`text
여러 고객 → 한 등급 설명
\`\`\`

---

### 15.12.2 중복 key 확인하기

\`validate\` 오류가 발생하면 key 중복을 확인해야 합니다.

예를 들어 고객 데이터에서 중복된 고객 ID를 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

상품 데이터에서 중복된 상품 ID를 확인합니다.

\`\`\`python
products[products.duplicated(subset=["product_id"], keep=False)]
\`\`\`

결합 전에 오른쪽 기준표의 key가 유일한지 확인하는 습관이 중요합니다.

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

\`is_unique\`가 \`True\`이면 해당 Series의 값이 모두 고유하다는 뜻입니다.

---
`;export{e as default};