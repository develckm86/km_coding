var e=`# 9장. 복잡한 데이터 결합 실습

## 9.8 many-to-many 결합 문제 실습

이번에는 잘못된 결합으로 행 수가 늘어나는 문제를 실습합니다.

---

### 9.8.1 중복 고객 마스터 만들기

\`\`\`python
customers_duplicated = pd.DataFrame({
    "customer_id": [1, 1, 2, 3],
    "customer_name": ["김민수", "김민수_중복", "이지영", "박철수"],
    "region": ["서울", "서울", "부산", "서울"]
})

customers_duplicated
\`\`\`

\`customer_id\` 1이 두 번 있습니다.

---

### 9.8.2 validate 없이 결합하기

\`\`\`python
many_to_many_result = orders.merge(
    customers_duplicated,
    on="customer_id",
    how="left"
)

len(orders), len(many_to_many_result)
\`\`\`

행 수가 늘어날 수 있습니다.

\`\`\`python
many_to_many_result[many_to_many_result["customer_id"] == 1]
\`\`\`

\`customer_id\` 1의 주문이 중복 고객 행과 모두 매칭되었기 때문입니다.

---

### 9.8.3 validate로 문제 방지하기

다음 코드는 오류가 발생합니다.

\`\`\`python
# orders.merge(
#     customers_duplicated,
#     on="customer_id",
#     how="left",
#     validate="many_to_one"
# )
\`\`\`

오른쪽 데이터의 \`customer_id\`가 유일하지 않기 때문에 \`many_to_one\` 조건을 만족하지 못합니다.

실무에서는 이런 오류가 오히려 좋습니다.  
잘못된 결합을 미리 막아주기 때문입니다.

---

### 9.8.4 many-to-many 문제 저장하기

\`\`\`python
many_to_many_problem = many_to_many_result[
    many_to_many_result["customer_id"] == 1
].copy()

many_to_many_problem.to_csv(
    OUTPUT_TABLES / "chapter_09_many_to_many_problem.csv",
    index=False
)
\`\`\`

---

### 9.8.5 해석 예시

\`\`\`text
오른쪽 기준표의 key가 중복되어 있으면 left join 후 행 수가 증가할 수 있다.
이 경우 매출 합계가 실제보다 커지는 문제가 발생할 수 있다.
결합 전 기준표 key 유일성을 확인하고, merge 시 validate 옵션을 사용하는 것이 안전하다.
\`\`\`

---
`;export{e as default};