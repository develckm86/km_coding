var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-4 -->

# 11.4 중복값 제거하기

중복값을 제거할 때는 \`drop_duplicates()\`를 사용합니다.

---

### 11.4.1 전체 행 기준 중복 제거

전체 행이 완전히 같은 중복을 제거하려면 다음처럼 작성합니다.

\`\`\`python
orders.drop_duplicates()
\`\`\`

기본적으로 첫 번째 행을 남기고 이후 중복 행을 제거합니다.

정리된 결과를 계속 사용하려면 새 변수에 저장합니다.

\`\`\`python
orders_no_duplicates = orders.drop_duplicates()

orders_no_duplicates
\`\`\`

초보 단계에서는 \`inplace=True\`를 사용하는 것보다 새 변수에 저장하는 방식을 권장합니다.  
원본 데이터와 처리된 데이터를 구분할 수 있기 때문입니다.

---

### 11.4.2 특정 컬럼 기준 중복 제거

주문번호 기준으로 중복을 제거하려면 다음처럼 작성합니다.

\`\`\`python
orders.drop_duplicates(subset=["order_id"])
\`\`\`

이 코드는 같은 \`order_id\`가 여러 번 나오면 첫 번째 행만 남깁니다.

마지막 행을 남기고 싶다면 \`keep="last"\`를 사용합니다.

\`\`\`python
orders.drop_duplicates(subset=["order_id"], keep="last")
\`\`\`

중복된 모든 행을 제거하고, 중복되지 않은 행만 남기려면 \`keep=False\`를 사용합니다.

\`\`\`python
orders.drop_duplicates(subset=["order_id"], keep=False)
\`\`\`

\`keep=False\`는 중복 그룹 전체를 제거합니다.  
따라서 중복된 주문번호가 있는 행을 모두 제외하고 싶을 때 사용합니다.

---

### 11.4.3 어떤 행을 남길지 정하기

중복 제거에서 가장 중요한 질문은 이것입니다.

\`\`\`text
중복된 행 중 어떤 행을 남길 것인가?
\`\`\`

예를 들어 고객 데이터가 있다고 가정합시다.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 2, 3],
    "name": ["민수", "지영", "지영", "철수"],
    "updated_at": ["2026-01-01", "2026-01-01", "2026-01-05", "2026-01-03"],
    "grade": ["일반", "일반", "VIP", "일반"]
})

customers
\`\`\`

\`customer_id\` 2가 중복되어 있습니다.  
이때 최신 정보가 더 정확하다고 판단한다면, 먼저 날짜 기준으로 정렬한 뒤 마지막 값을 남길 수 있습니다.

\`\`\`python
customers["updated_at"] = pd.to_datetime(customers["updated_at"])

customers_latest = (
    customers
    .sort_values(by="updated_at")
    .drop_duplicates(subset=["customer_id"], keep="last")
    .reset_index(drop=True)
)

customers_latest
\`\`\`

이 방식은 실무에서 자주 사용됩니다.

\`\`\`text
1. 최신 날짜 기준으로 정렬한다.
2. ID 기준으로 중복을 제거한다.
3. 최신 행을 남긴다.
\`\`\`

중복 제거는 단순히 \`drop_duplicates()\`만 실행하는 문제가 아닙니다.  
어떤 행이 더 신뢰할 수 있는지 판단해야 합니다.

---

### 11.4.4 중복 제거 후 확인하기

중복을 제거한 뒤에는 반드시 결과를 확인해야 합니다.

\`\`\`python
before_count = len(orders)
after_count = len(orders.drop_duplicates(subset=["order_id"]))

print("제거 전 행 수:", before_count)
print("제거 후 행 수:", after_count)
print("제거된 행 수:", before_count - after_count)
\`\`\`

중복 제거 후에도 중복이 남아 있는지 확인합니다.

\`\`\`python
orders_no_dup = orders.drop_duplicates(subset=["order_id"])

orders_no_dup.duplicated(subset=["order_id"]).sum()
\`\`\`

결과가 0이면 해당 기준으로 중복이 제거된 것입니다.

---

### 11.4.5 인덱스 정리하기

중복 제거 후에는 인덱스가 중간중간 비어 있을 수 있습니다.

\`\`\`python
orders_no_dup = orders.drop_duplicates(subset=["order_id"])

orders_no_dup
\`\`\`

결과를 보고서나 새 파일로 저장하려면 인덱스를 다시 정리하는 것이 좋습니다.

\`\`\`python
orders_no_dup = orders_no_dup.reset_index(drop=True)

orders_no_dup
\`\`\`

\`drop=True\`를 사용하면 기존 인덱스를 새 컬럼으로 남기지 않습니다.

또는 \`drop_duplicates()\`에서 \`ignore_index=True\`를 사용할 수도 있습니다.

\`\`\`python
orders_no_dup = orders.drop_duplicates(
    subset=["order_id"],
    ignore_index=True
)

orders_no_dup
\`\`\`

---
`;export{e as default};