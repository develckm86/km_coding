var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-16 -->

# 14.16 그룹화와 집계 시 자주 하는 실수

그룹화와 집계는 강력하지만 자주 하는 실수가 있습니다.

---

### 14.16.1 분석 질문 없이 groupby부터 쓰는 실수

\`groupby()\`를 사용하기 전에 분석 질문을 먼저 정해야 합니다.

나쁜 접근:

\`\`\`text
일단 groupby를 해본다.
\`\`\`

좋은 접근:

\`\`\`text
카테고리별 총매출을 알고 싶다.
→ 그룹화 기준: category
→ 계산할 컬럼: total_price
→ 집계 함수: sum
\`\`\`

질문이 명확하면 코드도 명확해집니다.

---

### 14.16.2 주문 수와 고객 수를 혼동하는 실수

주문 수와 고객 수는 다릅니다.

\`\`\`python
orders.groupby("region")["order_id"].count()
\`\`\`

이 코드는 지역별 주문 수입니다.

\`\`\`python
orders.groupby("region")["customer_id"].nunique()
\`\`\`

이 코드는 지역별 고유 고객 수입니다.

같은 고객이 여러 번 주문할 수 있으므로, 고객 수를 구할 때는 \`nunique()\`를 사용해야 합니다.

---

### 14.16.3 \`count()\`와 \`size()\`를 혼동하는 실수

\`count()\`는 결측치가 아닌 값의 개수를 셉니다.  
\`size()\`는 행 개수를 셉니다.

결측치가 있는 컬럼을 기준으로 개수를 세면 결과가 다를 수 있습니다.

\`\`\`python
df.groupby("category")["some_column"].count()
df.groupby("category").size()
\`\`\`

행 수를 세고 싶다면 \`size()\`를 사용하는 것이 명확합니다.

---

### 14.16.4 그룹화 결과의 인덱스를 이해하지 못하는 실수

\`groupby()\` 결과에서 그룹화 기준은 기본적으로 인덱스가 됩니다.

\`\`\`python
result = orders.groupby("category")["total_price"].sum()
\`\`\`

보고서나 후속 분석에서 일반 컬럼으로 사용하려면 \`reset_index()\`를 사용합니다.

\`\`\`python
result = result.reset_index(name="total_sales")
\`\`\`

---

### 14.16.5 여러 연도의 같은 월을 합쳐버리는 실수

날짜 분석에서 월만 사용하면 여러 연도의 같은 월이 합쳐질 수 있습니다.

\`\`\`python
orders.groupby(orders["order_date"].dt.month)["total_price"].sum()
\`\`\`

데이터가 여러 연도에 걸쳐 있다면 연월을 사용해야 합니다.

\`\`\`python
orders["year_month"] = orders["order_date"].dt.to_period("M")
orders.groupby("year_month")["total_price"].sum()
\`\`\`

---

### 14.16.6 평균만 보고 판단하는 실수

평균은 이상값의 영향을 받을 수 있습니다.  
따라서 금액 데이터에서는 평균과 중앙값을 함께 보는 것이 좋습니다.

\`\`\`python
orders.groupby("category")["total_price"].agg(["mean", "median"])
\`\`\`

평균이 중앙값보다 훨씬 크다면 일부 큰 값이 평균을 끌어올리고 있을 수 있습니다.

---

### 14.16.7 피벗 테이블의 결측치를 오해하는 실수

\`pivot_table()\` 결과에서 결측치가 나오는 것은 해당 조합의 데이터가 없다는 의미일 수 있습니다.

예를 들어 부산 지역에 전자기기 주문이 없으면 해당 칸이 비어 있을 수 있습니다.

이 경우 매출 합계 표에서는 0으로 채우는 것이 자연스러울 수 있습니다.

\`\`\`python
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

다만 결측치가 항상 0을 의미하는 것은 아니므로 데이터 의미를 확인해야 합니다.

---
`;export{e as default};