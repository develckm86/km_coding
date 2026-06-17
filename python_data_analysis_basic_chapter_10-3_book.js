var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-3 -->

# 10.3 결측치 확인하기

결측치 처리는 확인에서 시작합니다.  
어떤 컬럼에 결측치가 있는지, 얼마나 많은지, 어떤 행에 문제가 있는지 알아야 적절한 처리 기준을 세울 수 있습니다.

---

### 10.3.1 \`isna()\`

\`isna()\`는 값이 결측치인지 확인합니다.

\`\`\`python
orders.isna()
\`\`\`

결과는 원래 DataFrame과 같은 모양의 DataFrame입니다.  
값이 결측치이면 \`True\`, 결측치가 아니면 \`False\`로 표시됩니다.

\`\`\`text
True  → 결측치
False → 결측치 아님
\`\`\`

\`isnull()\`도 같은 역할을 합니다.

\`\`\`python
orders.isnull()
\`\`\`

pandas에서는 \`isna()\`와 \`isnull()\`을 모두 사용할 수 있습니다.  
이 책에서는 이름이 더 직관적인 \`isna()\`를 주로 사용하겠습니다.

---

### 10.3.2 \`notna()\`

\`notna()\`는 \`isna()\`의 반대입니다.  
값이 결측치가 아니면 \`True\`, 결측치이면 \`False\`를 반환합니다.

\`\`\`python
orders.notna()
\`\`\`

값이 있는 행만 선택할 때 유용합니다.

\`\`\`python
orders[orders["customer"].notna()]
\`\`\`

이 코드는 \`customer\` 컬럼에 값이 있는 행만 선택합니다.

---

### 10.3.3 컬럼별 결측치 개수 확인

실무에서는 전체 표를 \`isna()\`로 보는 것보다 컬럼별 결측치 개수를 보는 경우가 많습니다.

\`\`\`python
orders.isna().sum()
\`\`\`

\`isna()\`는 결측치 여부를 \`True\`와 \`False\`로 표시합니다.  
파이썬에서 \`True\`는 1, \`False\`는 0처럼 계산될 수 있습니다.  
따라서 \`sum()\`을 사용하면 컬럼별 결측치 개수를 계산할 수 있습니다.

예상 결과는 다음과 비슷합니다.

\`\`\`text
order_id      0
customer      1
region        1
category      1
quantity      1
unit_price    1
order_date    1
dtype: int64
\`\`\`

주의할 점은 빈 문자열 \`""\`은 아직 결측치로 인식되지 않았다는 것입니다.  
따라서 \`region\`과 \`order_date\`의 빈 문자열은 위 결과에 포함되지 않을 수 있습니다.

---

### 10.3.4 컬럼별 결측치 비율 확인

결측치 개수도 중요하지만, 전체 데이터에서 얼마나 차지하는지 비율로 보는 것도 중요합니다.

\`\`\`python
orders.isna().mean()
\`\`\`

결측치 비율을 백분율로 보고 싶으면 100을 곱합니다.

\`\`\`python
missing_ratio = orders.isna().mean() * 100

missing_ratio
\`\`\`

결측치 비율을 보기 좋게 정렬할 수도 있습니다.

\`\`\`python
missing_ratio.sort_values(ascending=False)
\`\`\`

결측치가 많은 컬럼부터 확인하면 우선적으로 처리해야 할 컬럼을 찾기 쉽습니다.

---

### 10.3.5 결측치가 있는 행 찾기

어떤 행에 결측치가 하나라도 있는지 확인하려면 \`any(axis=1)\`을 사용합니다.

\`\`\`python
orders[orders.isna().any(axis=1)]
\`\`\`

\`axis=1\`은 행 방향으로 검사하겠다는 의미입니다.  
즉, 각 행에서 결측치가 하나라도 있으면 \`True\`가 됩니다.

반대로 결측치가 전혀 없는 행만 선택하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders[orders.notna().all(axis=1)]
\`\`\`

\`all(axis=1)\`은 각 행에서 모든 값이 결측치가 아닌지 확인합니다.

---

### 10.3.6 행별 결측치 개수 확인

각 행에 결측치가 몇 개 있는지 알고 싶을 때는 다음처럼 작성합니다.

\`\`\`python
orders.isna().sum(axis=1)
\`\`\`

이 결과를 원본 데이터에 임시로 붙여서 볼 수도 있습니다.

\`\`\`python
orders_with_missing_count = orders.copy()
orders_with_missing_count["missing_count"] = orders_with_missing_count.isna().sum(axis=1)

orders_with_missing_count
\`\`\`

결측치가 많은 행은 데이터 품질이 낮을 가능성이 있습니다.  
특히 한 행에서 여러 핵심 컬럼이 동시에 비어 있다면 제거를 고려할 수 있습니다.

---

### 10.3.7 빈 문자열을 결측치로 바꾸기

예제 데이터에는 빈 문자열 \`""\`이 있습니다.  
pandas는 빈 문자열을 자동으로 결측치로 보지 않습니다.

\`\`\`python
orders.isna().sum()
\`\`\`

이 상태에서는 \`""\`이 결측치 개수에 포함되지 않습니다.

빈 문자열을 결측치로 처리하려면 \`replace()\`를 사용합니다.

\`\`\`python
orders_clean = orders.replace("", pd.NA)

orders_clean
\`\`\`

이제 다시 결측치 개수를 확인합니다.

\`\`\`python
orders_clean.isna().sum()
\`\`\`

실무에서는 다음과 같은 값들도 결측치처럼 처리해야 할 수 있습니다.

\`\`\`python
missing_values = ["", " ", "-", "N/A", "NA", "없음", "미입력"]

orders_clean = orders.replace(missing_values, pd.NA)
\`\`\`

다만 모든 값을 무조건 결측치로 바꾸면 안 됩니다.  
예를 들어 \`"-"\`가 실제 상품 코드일 수도 있습니다.  
데이터의 의미를 확인한 뒤 처리해야 합니다.

---
`;export{e as default};