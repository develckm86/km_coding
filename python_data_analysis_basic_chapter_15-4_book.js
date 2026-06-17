var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-4 -->

# 15.4 행 방향 결합: \`pd.concat(axis=0)\`

가장 기본적인 결합은 같은 구조의 데이터를 위아래로 붙이는 것입니다.

예를 들어 1월 주문 데이터와 2월 주문 데이터는 같은 컬럼 구조를 가지고 있습니다.

\`\`\`python
orders_jan
orders_feb
\`\`\`

이 두 데이터를 하나의 주문 데이터로 합치려면 \`pd.concat()\`을 사용합니다.

---

### 15.4.1 기본 행 방향 결합

\`\`\`python
orders = pd.concat([orders_jan, orders_feb])

orders
\`\`\`

\`pd.concat()\`에는 결합할 DataFrame들을 리스트로 전달합니다.

\`\`\`python
pd.concat([df1, df2, df3])
\`\`\`

기본값은 \`axis=0\`입니다.  
즉, 위아래 방향으로 행을 이어 붙입니다.

다음 두 코드는 같은 의미입니다.

\`\`\`python
pd.concat([orders_jan, orders_feb])
pd.concat([orders_jan, orders_feb], axis=0)
\`\`\`

---

### 15.4.2 인덱스 문제

행 방향으로 결합하면 원래 인덱스가 그대로 유지됩니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb])

orders
\`\`\`

결과를 보면 인덱스가 다음처럼 반복될 수 있습니다.

\`\`\`text
0
1
2
0
1
2
\`\`\`

각 DataFrame의 기존 인덱스가 유지되기 때문입니다.

분석용 데이터에서는 인덱스를 새로 정리하는 것이 좋습니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb], ignore_index=True)

orders
\`\`\`

\`ignore_index=True\`를 사용하면 인덱스를 0부터 다시 부여합니다.

실무에서 여러 파일을 위아래로 붙일 때는 \`ignore_index=True\`를 자주 사용합니다.

---

### 15.4.3 컬럼 순서가 다른 경우

두 DataFrame의 컬럼 순서가 달라도 컬럼 이름을 기준으로 맞춰집니다.

\`\`\`python
orders_mar = pd.DataFrame({
    "customer_id": [5, 3],
    "order_id": [1007, 1008],
    "product_id": ["P002", "P001"],
    "total_price": [30000, 280000],
    "quantity": [2, 1],
    "order_date": ["2026-03-01", "2026-03-05"]
})

orders_all = pd.concat([orders_jan, orders_mar], ignore_index=True)

orders_all
\`\`\`

컬럼 순서가 달라도 같은 컬럼명끼리 맞춰서 결합됩니다.

---

### 15.4.4 컬럼이 일부 다른 경우

두 DataFrame의 컬럼이 완전히 같지 않을 수도 있습니다.

\`\`\`python
orders_apr = pd.DataFrame({
    "order_id": [1009, 1010],
    "order_date": ["2026-04-01", "2026-04-03"],
    "customer_id": [2, 4],
    "product_id": ["P004", "P003"],
    "quantity": [1, 3],
    "total_price": [17500, 75000],
    "coupon_amount": [1000, 0]
})

orders_all = pd.concat([orders_jan, orders_apr], ignore_index=True)

orders_all
\`\`\`

\`orders_apr\`에는 \`coupon_amount\` 컬럼이 있지만 \`orders_jan\`에는 없습니다.  
이 경우 없는 값은 결측치로 채워집니다.

\`\`\`text
orders_jan 행의 coupon_amount → NaN
\`\`\`

이것은 유용할 수도 있지만, 의도하지 않은 결측치가 생긴 것일 수도 있습니다.  
따라서 결합 후에는 컬럼과 결측치를 반드시 확인해야 합니다.

\`\`\`python
orders_all.isna().sum()
\`\`\`

---

### 15.4.5 공통 컬럼만 결합하기

컬럼이 일부 다를 때 공통 컬럼만 유지하고 싶다면 \`join="inner"\`를 사용할 수 있습니다.

\`\`\`python
orders_common = pd.concat(
    [orders_jan, orders_apr],
    ignore_index=True,
    join="inner"
)

orders_common
\`\`\`

기본값은 \`join="outer"\`입니다.  
즉, 모든 컬럼을 유지하고 없는 값은 결측치로 채웁니다.

| 옵션 | 의미 |
|---|---|
| \`join="outer"\` | 모든 컬럼 유지 |
| \`join="inner"\` | 공통 컬럼만 유지 |

실무에서는 일반적으로 모든 컬럼을 유지한 뒤 결측치를 확인하는 방식이 안전합니다.

---

### 15.4.6 데이터 출처 표시하기

여러 월 데이터를 결합할 때 원래 어떤 파일에서 온 데이터인지 표시하고 싶을 수 있습니다.

가장 간단한 방법은 결합 전에 월 컬럼을 추가하는 것입니다.

\`\`\`python
orders_jan_copy = orders_jan.copy()
orders_feb_copy = orders_feb.copy()

orders_jan_copy["source_month"] = "2026-01"
orders_feb_copy["source_month"] = "2026-02"

orders = pd.concat(
    [orders_jan_copy, orders_feb_copy],
    ignore_index=True
)

orders
\`\`\`

데이터 출처를 남기면 결합 후 문제가 생겼을 때 원인을 찾기 쉽습니다.

---
`;export{e as default};