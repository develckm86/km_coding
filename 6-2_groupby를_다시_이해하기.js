var e=`# 6장. 고급 groupby 분석 리포트

## 6.2 groupby를 다시 이해하기

\`groupby()\`는 데이터를 특정 기준으로 나누고, 각 그룹별로 계산한 뒤, 결과를 다시 합치는 기능입니다.

이 구조를 흔히 다음처럼 설명합니다.

\`\`\`text
split → apply → combine
\`\`\`

예를 들어 카테고리별 매출 합계를 구하는 과정은 다음과 같습니다.

\`\`\`text
split: category 기준으로 데이터를 나눈다.
apply: 각 category 그룹에서 net_amount 합계를 계산한다.
combine: 계산 결과를 하나의 표로 합친다.
\`\`\`

코드로는 다음처럼 작성합니다.

\`\`\`python
orders_mart.groupby("category")["net_amount"].sum()
\`\`\`

---

### 6.2.1 groupby가 필요한 이유

실무 분석 질문은 대부분 “무엇별로?”라는 기준을 포함합니다.

\`\`\`text
카테고리별 매출
지역별 주문 수
월별 평균 주문 금액
고객별 구매 횟수
상품별 판매 수량
등급별 재구매율
\`\`\`

이런 질문은 모두 그룹화가 필요합니다.

---

### 6.2.2 기초 groupby와 고급 groupby의 차이

기초 groupby는 단일 지표 계산에 집중합니다.

\`\`\`python
df.groupby("category")["sales"].sum()
\`\`\`

고급 groupby는 여러 지표를 동시에 계산하고, 그룹 안에서의 상대적 위치나 비율까지 계산합니다.

\`\`\`python
df.groupby("category").agg(
    total_sales=("sales", "sum"),
    order_count=("order_id", "count"),
    avg_order_amount=("sales", "mean"),
    unique_customers=("customer_id", "nunique")
)
\`\`\`

또는 그룹별 평균을 원본 행에 붙일 수도 있습니다.

\`\`\`python
df["category_avg_sales"] = (
    df.groupby("category")["sales"].transform("mean")
)
\`\`\`

고급 분석에서는 단순 요약표보다 다음과 같은 지표가 중요해집니다.

\`\`\`text
그룹 내 비율
그룹 내 순위
전체 대비 차이
그룹 평균 대비 차이
누적 비중
조건을 만족하는 그룹만 필터링
\`\`\`

---
`;export{e as default};