var e=`# 6장. 고급 groupby 분석 리포트

## 6.17 이번 장에서 자주 하는 실수

고급 groupby 분석에서 자주 하는 실수를 정리합니다.

---

### 6.17.1 count와 nunique를 혼동하는 실수

주문 수와 고객 수는 다릅니다.

\`\`\`python
order_count=("order_id", "count")
unique_customers=("customer_id", "nunique")
\`\`\`

같은 고객이 여러 번 주문할 수 있으므로 고객 수를 구할 때는 \`nunique()\`를 사용해야 합니다.

---

### 6.17.2 평균만 보고 판단하는 실수

평균 주문 금액은 고가 주문의 영향을 받을 수 있습니다.

\`\`\`python
avg_order_amount=("net_amount", "mean")
median_order_amount=("net_amount", "median")
\`\`\`

평균과 중앙값을 함께 보는 것이 좋습니다.

---

### 6.17.3 transform 대신 agg를 사용해 원본 행에 붙이지 못하는 실수

그룹별 값을 원본 행에 붙이고 싶다면 \`transform()\`을 사용해야 합니다.

\`\`\`python
df["category_total_sales"] = (
    df.groupby("category")["net_amount"].transform("sum")
)
\`\`\`

\`agg()\`는 행 수를 줄이는 요약 결과를 만듭니다.

---

### 6.17.4 그룹 내 비율의 기준을 잘못 잡는 실수

비율을 계산할 때 분모가 무엇인지 명확해야 합니다.

\`\`\`text
전체 매출 대비 카테고리 비중
지역 내 카테고리 비중
월 내 카테고리 비중
카테고리 내 상품 비중
\`\`\`

분모가 달라지면 해석도 달라집니다.

---

### 6.17.5 rank 동점 처리 방식을 확인하지 않는 실수

\`rank()\`의 동점 처리 방식에 따라 순위가 달라질 수 있습니다.

\`\`\`python
rank(method="dense")
rank(method="min")
rank(method="first")
\`\`\`

보고서에서는 어떤 방식으로 순위를 계산했는지 적는 것이 좋습니다.

---

### 6.17.6 filter와 행 필터링을 혼동하는 실수

행 단위 필터링:

\`\`\`python
df[df["net_amount"] >= 100000]
\`\`\`

그룹 단위 필터링:

\`\`\`python
df.groupby("customer_id").filter(
    lambda group: group["net_amount"].sum() >= 100000
)
\`\`\`

두 결과는 다릅니다.

---

### 6.17.7 apply를 너무 많이 사용하는 실수

\`apply()\`는 유연하지만 느릴 수 있습니다.

먼저 다음 기능으로 해결할 수 있는지 확인합니다.

\`\`\`text
agg
transform
rank
cumcount
sort_values
drop_duplicates
\`\`\`

정말 복잡한 로직이 필요한 경우에만 \`apply()\`를 사용하는 것이 좋습니다.

---
`;export{e as default};