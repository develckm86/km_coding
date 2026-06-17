var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-5 -->

# 18.5 데이터 품질 확인

데이터 구조를 확인한 뒤에는 데이터 품질을 점검합니다.

---

### 18.5.1 결측치 확인

\`\`\`python
orders.isna().sum()
\`\`\`

결측치가 있는 컬럼을 확인합니다.

결측치가 있다면 다음 질문을 해야 합니다.

\`\`\`text
결측치가 왜 생겼는가?
분석에서 제거해야 하는가?
다른 값으로 대체해야 하는가?
결측치 자체가 의미 있는가?
\`\`\`

이번 예제 데이터에는 결측치가 없다고 가정할 수 있습니다.  
하지만 실무에서는 결측치가 없는 경우보다 있는 경우가 훨씬 많습니다.

---

### 18.5.2 중복값 확인

전체 행 기준 중복을 확인합니다.

\`\`\`python
orders.duplicated().sum()
\`\`\`

주문 ID 기준 중복도 확인합니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

주문 데이터에서 \`order_id\`는 일반적으로 고유해야 합니다.  
중복이 있다면 같은 주문이 두 번 들어갔을 가능성이 있습니다.

---

### 18.5.3 수치형 컬럼 범위 확인

\`\`\`python
orders[["quantity", "total_price", "visit_count", "satisfaction"]].describe()
\`\`\`

각 컬럼의 최솟값과 최댓값을 확인합니다.

\`\`\`text
quantity가 0 이하인 값은 없는가?
total_price가 음수인 값은 없는가?
satisfaction이 1~5 범위를 벗어나지 않는가?
visit_count가 비정상적으로 큰 값은 없는가?
\`\`\`

예를 들어 만족도가 1~5점 척도라면 6이나 0이 있으면 이상한 값입니다.

---

### 18.5.4 범주형 값 확인

지역, 등급, 카테고리의 고유값을 확인합니다.

\`\`\`python
orders["region"].unique()
orders["grade"].unique()
orders["category"].unique()
\`\`\`

빈도도 확인합니다.

\`\`\`python
orders["region"].value_counts()
orders["grade"].value_counts()
orders["category"].value_counts()
\`\`\`

범주형 컬럼에서는 표기 불일치가 자주 발생합니다.

예를 들어 다음 값들은 모두 같은 지역을 의미할 수 있습니다.

\`\`\`text
서울
서울시
서울특별시
\`\`\`

이런 값이 섞여 있다면 문자열 표준화가 필요합니다.

---

### 18.5.5 날짜 범위 확인

주문일의 최소값과 최대값을 확인합니다.

\`\`\`python
orders["order_date"].min()
orders["order_date"].max()
\`\`\`

분석 기간을 파악할 수 있습니다.

\`\`\`text
이 데이터는 2026년 1월부터 2026년 4월까지의 주문 데이터이다.
\`\`\`

날짜 범위를 확인하면 분석 결과를 해석할 때 도움이 됩니다.

예를 들어 1년 데이터인지, 1개월 데이터인지에 따라 해석이 달라집니다.

---
`;export{e as default};