var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-19 -->

# 14.19 정답 및 해설

### 문제 1 정답

정답: B

그룹화와 집계는 데이터를 특정 기준으로 묶고, 각 그룹별로 합계, 평균, 개수 같은 계산을 수행하는 작업입니다.

---

### 문제 2 정답

\`\`\`python
df.groupby("category")["sales"].sum().reset_index(name="total_sales")
\`\`\`

\`category\`별로 묶고 \`sales\` 합계를 계산합니다.

---

### 문제 3 정답

방법 1:

\`\`\`python
df.groupby("region")["order_id"].count().reset_index(name="order_count")
\`\`\`

방법 2:

\`\`\`python
df.groupby("region").size().reset_index(name="order_count")
\`\`\`

행 수를 세는 목적이라면 \`size()\`가 더 명확합니다.

---

### 문제 4 정답

\`\`\`python
df.groupby("region")["customer_id"].nunique().reset_index(name="unique_customers")
\`\`\`

고객 수는 중복을 제거한 고유 고객 수로 계산해야 하므로 \`nunique()\`를 사용합니다.

---

### 문제 5 정답

\`\`\`python
summary = (
    df
    .groupby("category")
    .agg(
        total_sales=("sales", "sum"),
        avg_sales=("sales", "mean"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

summary
\`\`\`

\`agg()\`를 사용하면 여러 집계 결과를 한 번에 계산하고 컬럼명도 직접 지정할 수 있습니다.

---

### 문제 6 정답

\`\`\`python
summary = (
    df
    .groupby(["region", "category"])["sales"]
    .sum()
    .reset_index(name="total_sales")
)

summary
\`\`\`

\`region\`과 \`category\` 두 기준으로 데이터를 묶고 \`sales\` 합계를 계산합니다.

---

### 문제 7 정답

\`\`\`python
pivot = pd.pivot_table(
    data=df,
    values="sales",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)

pivot
\`\`\`

\`region\`은 행, \`category\`는 열, \`sales\`는 값으로 사용합니다.  
집계 함수는 합계이므로 \`aggfunc="sum"\`을 지정합니다.

---

### 문제 8 정답

\`\`\`python
pd.crosstab(df["region"], df["grade"])
\`\`\`

\`crosstab()\`은 두 범주형 변수의 교차 빈도표를 만들 때 사용합니다.

---

### 문제 9 정답

\`count()\`는 결측치가 아닌 값의 개수를 셉니다.  
\`nunique()\`는 중복을 제거한 고유값의 개수를 셉니다.

예를 들어 같은 고객이 여러 번 주문한 데이터에서 주문 건수는 \`count()\`로 계산할 수 있고, 고객 수는 \`nunique()\`로 계산해야 합니다.

---

### 문제 10 정답

\`\`\`python
report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("sales", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("sales", "mean")
    )
    .reset_index()
)

total_sales = report["total_sales"].sum()

report["sales_ratio_percent"] = (
    report["total_sales"] / total_sales * 100
).round(1)

report = report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

report
\`\`\`

처리 과정은 다음과 같습니다.

1. \`category\` 기준으로 그룹화합니다.
2. 총매출, 주문 건수, 평균 주문 금액을 계산합니다.
3. 전체 매출을 구합니다.
4. 카테고리별 매출 비중을 계산합니다.
5. 총매출 기준으로 내림차순 정렬합니다.

이 결과는 카테고리별 매출 요약 보고서로 사용할 수 있습니다.

---
`;export{e as default};