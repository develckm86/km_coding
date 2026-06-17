var e=`# 10장. 고객별 Feature Table 만들기

## 10.14 고객 Feature Table 요약 분석

Feature Table이 만들어졌으므로 간단한 요약 분석을 수행합니다.

---

### 10.14.1 가치 세그먼트별 고객 수

\`\`\`python
segment_count = (
    customer_feature_table
    .groupby("value_segment")
    .agg(
        customer_count=("customer_id", "count"),
        total_purchase=("total_purchase", "sum"),
        avg_purchase=("total_purchase", "mean")
    )
    .reset_index()
)

segment_count["avg_purchase"] = segment_count["avg_purchase"].round(0)

segment_count
\`\`\`

---

### 10.14.2 재구매 고객 비율

\`\`\`python
repeat_customer_rate = (
    customer_feature_table["is_repeat_customer"].mean() * 100
)

repeat_customer_rate = round(repeat_customer_rate, 1)

repeat_customer_rate
\`\`\`

---

### 10.14.3 지역별 고객 가치 요약

\`\`\`python
region_customer_value = (
    customer_feature_table
    .groupby("region")
    .agg(
        customer_count=("customer_id", "count"),
        total_purchase=("total_purchase", "sum"),
        avg_purchase=("total_purchase", "mean"),
        repeat_customer_rate=("is_repeat_customer", "mean")
    )
    .reset_index()
)

region_customer_value["avg_purchase"] = region_customer_value["avg_purchase"].round(0)
region_customer_value["repeat_customer_rate"] = (
    region_customer_value["repeat_customer_rate"] * 100
).round(1)

region_customer_value
\`\`\`

---

### 10.14.4 주 구매 카테고리별 고객 수

\`\`\`python
main_category_summary = (
    customer_feature_table
    .groupby("main_category")
    .agg(
        customer_count=("customer_id", "count"),
        total_purchase=("total_purchase", "sum"),
        avg_purchase=("total_purchase", "mean")
    )
    .reset_index()
)

main_category_summary["avg_purchase"] = main_category_summary["avg_purchase"].round(0)

main_category_summary
\`\`\`

---

### 10.14.5 해석 예시

\`\`\`text
고객 Feature Table을 사용하면 고객 단위 분석을 쉽게 수행할 수 있다.
value_segment별 고객 수와 총구매액을 보면 고객 가치 구조를 파악할 수 있다.
재구매 고객 비율은 고객 유지 수준을 보여주는 기초 지표다.
지역별 고객 가치 요약은 지역별 고객 관리 전략을 세우는 데 활용할 수 있다.
주 구매 카테고리별 고객 수는 고객 취향 기반 마케팅에 활용할 수 있다.
\`\`\`

---
`;export{e as default};