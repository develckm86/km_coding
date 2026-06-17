var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-3 -->

# 11.3 중복값 확인하기

pandas에서 중복값을 확인할 때는 \`duplicated()\`를 사용합니다.

\`duplicated()\`는 각 행이 중복인지 아닌지를 \`True\` 또는 \`False\`로 반환합니다.

---

### 11.3.1 전체 행 기준 중복 확인

전체 행이 완전히 같은지 확인하려면 다음처럼 작성합니다.

\`\`\`python
orders.duplicated()
\`\`\`

이 코드는 각 행이 이전 행과 비교했을 때 중복인지 확인합니다.

결과는 Series로 반환됩니다.

\`\`\`text
0    False
1    False
2     True
3    False
...
\`\`\`

\`True\`로 표시된 행은 중복 행입니다.

중복 행만 보고 싶다면 불리언 인덱싱을 사용합니다.

\`\`\`python
orders[orders.duplicated()]
\`\`\`

이 코드는 전체 행 기준으로 중복된 행만 선택합니다.

---

### 11.3.2 중복 개수 확인

중복 행이 몇 개인지 확인하려면 \`sum()\`을 사용합니다.

\`\`\`python
orders.duplicated().sum()
\`\`\`

\`duplicated()\`의 결과는 \`True\`와 \`False\`입니다.  
\`True\`는 1처럼 계산되므로 \`sum()\`을 사용하면 중복 행 개수를 구할 수 있습니다.

전체 행 기준 중복이 많다면 데이터 병합이나 수집 과정에 문제가 있었을 가능성이 있습니다.

---

### 11.3.3 특정 컬럼 기준 중복 확인

실무에서는 전체 행이 완전히 같은지보다 특정 컬럼이 중복되는지가 더 중요할 때가 많습니다.

예를 들어 주문 데이터에서는 \`order_id\`가 중복되면 문제가 될 수 있습니다.

\`\`\`python
orders.duplicated(subset=["order_id"])
\`\`\`

중복된 주문번호를 가진 행만 확인하려면 다음처럼 작성합니다.

\`\`\`python
orders[orders.duplicated(subset=["order_id"])]
\`\`\`

\`subset\`에는 중복 판단 기준이 되는 컬럼을 지정합니다.

여러 컬럼을 기준으로 중복을 확인할 수도 있습니다.

\`\`\`python
orders.duplicated(subset=["customer_id", "order_date"])
\`\`\`

이 코드는 같은 고객이 같은 날짜에 주문한 행이 중복인지 확인합니다.  
다만 같은 고객이 같은 날짜에 여러 번 주문할 수 있으므로, 이것이 항상 오류라고 볼 수는 없습니다.

중복 판단 기준은 데이터의 의미와 분석 목적에 따라 정해야 합니다.

---

### 11.3.4 모든 중복 행 함께 보기

기본적으로 \`duplicated()\`는 첫 번째 값은 중복이 아닌 것으로 보고, 두 번째부터 \`True\`로 표시합니다.

예를 들어 \`order_id\`가 1002인 행이 두 개 있다면 첫 번째 1002는 \`False\`, 두 번째 1002는 \`True\`가 됩니다.

중복된 모든 행을 함께 보고 싶을 때는 \`keep=False\`를 사용합니다.

\`\`\`python
orders[orders.duplicated(subset=["order_id"], keep=False)]
\`\`\`

이 코드는 중복 그룹에 속한 모든 행을 보여줍니다.

중복을 검토할 때는 \`keep=False\`가 유용합니다.  
첫 번째 행과 중복 행을 같이 봐야 어떤 값을 유지할지 판단할 수 있기 때문입니다.

---

### 11.3.5 \`keep\` 옵션 이해하기

\`duplicated()\`와 \`drop_duplicates()\`에는 \`keep\` 옵션이 있습니다.

\`keep\`은 중복값 중 어떤 행을 유지하거나 표시하지 않을지 정하는 옵션입니다.

| 옵션 | 의미 |
|---|---|
| \`keep="first"\` | 첫 번째 행은 중복으로 보지 않음 |
| \`keep="last"\` | 마지막 행은 중복으로 보지 않음 |
| \`keep=False\` | 중복 그룹의 모든 행을 중복으로 표시 |

예제를 보겠습니다.

\`\`\`python
sample = pd.DataFrame({
    "id": [1, 2, 2, 3, 3, 3],
    "value": ["A", "B", "B", "C", "C", "C"]
})

sample
\`\`\`

기본값은 \`keep="first"\`입니다.

\`\`\`python
sample.duplicated(subset=["id"])
\`\`\`

마지막 행을 남기고 싶다면:

\`\`\`python
sample.duplicated(subset=["id"], keep="last")
\`\`\`

중복 그룹의 모든 행을 표시하고 싶다면:

\`\`\`python
sample.duplicated(subset=["id"], keep=False)
\`\`\`

실무에서 중복을 확인할 때는 \`keep=False\`로 전체 중복 그룹을 확인하고, 제거할 때는 기준에 따라 \`first\`나 \`last\`를 선택하는 것이 좋습니다.

---
`;export{e as default};