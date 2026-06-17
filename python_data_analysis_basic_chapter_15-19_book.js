var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-19 -->

# 15.19 결합 시 자주 하는 실수

데이터 결합은 실무에서 오류가 매우 자주 발생하는 작업입니다.  
이번 절에서는 초보자가 자주 하는 실수를 정리합니다.

---

### 15.19.1 행 순서만 믿고 좌우로 붙이는 실수

\`\`\`python
pd.concat([orders, customers], axis=1)
\`\`\`

행 순서가 정확히 같지 않으면 고객 정보가 잘못 붙을 수 있습니다.  
공통 ID가 있다면 \`merge()\`를 사용하는 것이 안전합니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

---

### 15.19.2 결합 key를 확인하지 않는 실수

결합 전에 key 컬럼이 있는지 확인해야 합니다.

\`\`\`python
orders.columns
customers.columns
\`\`\`

key의 자료형도 확인해야 합니다.

\`\`\`python
orders["customer_id"].dtype
customers["customer_id"].dtype
\`\`\`

한쪽은 정수, 한쪽은 문자열이면 결합이 제대로 되지 않을 수 있습니다.

\`\`\`python
orders["customer_id"] = orders["customer_id"].astype(str)
customers["customer_id"] = customers["customer_id"].astype(str)
\`\`\`

단, 자료형 변환은 데이터 의미에 맞게 신중하게 해야 합니다.

---

### 15.19.3 오른쪽 기준표의 key 중복을 확인하지 않는 실수

고객 데이터나 상품 데이터의 key가 중복되어 있으면 결합 후 행 수가 늘어날 수 있습니다.

\`\`\`python
customers["customer_id"].is_unique
\`\`\`

중복이 있다면 결합 전에 정리해야 합니다.

\`\`\`python
customers = customers.drop_duplicates(subset=["customer_id"])
\`\`\`

하지만 어떤 행을 남길지 기준이 필요합니다.  
최신 정보가 있다면 날짜 기준으로 정렬 후 최신 행을 남길 수 있습니다.

---

### 15.19.4 join 방식을 잘못 선택하는 실수

\`inner join\`을 사용하면 매칭되지 않는 행이 사라집니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="inner")
\`\`\`

주문 데이터 전체를 유지해야 하는 분석에서 \`inner join\`을 쓰면 고객 정보가 없는 주문이 사라질 수 있습니다.

주문 데이터 전체를 유지하려면 \`left join\`을 사용하는 것이 일반적입니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

---

### 15.19.5 결합 후 검증하지 않는 실수

결합 후에는 최소한 다음을 확인해야 합니다.

\`\`\`python
len(before)
len(after)
df.isna().sum()
df["amount"].sum()
df.duplicated(subset=["key"]).sum()
\`\`\`

결합 코드는 실행되었더라도 결과가 맞는지는 별개의 문제입니다.

---

### 15.19.6 겹치는 컬럼명을 방치하는 실수

결합 후 \`name_x\`, \`name_y\` 같은 컬럼이 생기면 의미가 불명확합니다.

\`\`\`python
df.merge(other, on="id")
\`\`\`

\`suffixes\`를 사용하거나 결합 전 컬럼명을 명확히 바꾸는 것이 좋습니다.

\`\`\`python
df.merge(other, on="id", suffixes=("_order", "_customer"))
\`\`\`

---

### 15.19.7 many-to-many 결합을 모르고 사용하는 실수

양쪽 데이터 모두 key가 중복되어 있으면 many-to-many 결합이 발생합니다.  
이 경우 행 수가 크게 늘어날 수 있습니다.

예를 들어 왼쪽에 ID 1이 2개, 오른쪽에 ID 1이 3개 있으면 결합 결과는 6행이 됩니다.

\`\`\`text
2 × 3 = 6
\`\`\`

이것이 의도한 결과인지 반드시 확인해야 합니다.

\`validate\` 옵션을 사용하면 예상하지 못한 결합 관계를 방지할 수 있습니다.

\`\`\`python
orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

---
`;export{e as default};