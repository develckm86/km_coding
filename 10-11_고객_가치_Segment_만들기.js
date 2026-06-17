var e=`# 10장. 고객별 Feature Table 만들기

## 10.11 고객 가치 Segment 만들기

이번에는 총구매액을 기준으로 고객을 간단히 세그먼트화합니다.

본격적인 RFM 분석은 14장에서 다루지만, 여기서는 Feature Table에 사용할 간단한 고객 가치 세그먼트를 만듭니다.

---

### 10.11.1 고객별 총구매액 확인

\`\`\`python
customer_purchase_summary[["customer_id", "customer_name", "total_purchase"]].head()
\`\`\`

---

### 10.11.2 평균 대비 구매액 비율

\`\`\`python
avg_customer_purchase = customer_purchase_summary["total_purchase"].mean()

customer_value_segment = customer_purchase_summary[[
    "customer_id",
    "customer_name",
    "total_purchase"
]].copy()

customer_value_segment["purchase_ratio_to_avg"] = (
    customer_value_segment["total_purchase"] / avg_customer_purchase
).round(2)

customer_value_segment.head()
\`\`\`

---

### 10.11.3 분위수 기준 세그먼트 만들기

총구매액 기준으로 고객을 3개 그룹으로 나누겠습니다.

\`\`\`python
q_low = customer_value_segment["total_purchase"].quantile(0.33)
q_high = customer_value_segment["total_purchase"].quantile(0.67)

q_low, q_high
\`\`\`

세그먼트를 만듭니다.

\`\`\`python
def assign_value_segment(total_purchase):
    if total_purchase >= q_high:
        return "High Value"
    elif total_purchase >= q_low:
        return "Middle Value"
    else:
        return "Low Value"
\`\`\`

적용합니다.

\`\`\`python
customer_value_segment["value_segment"] = (
    customer_value_segment["total_purchase"]
    .apply(assign_value_segment)
)

customer_value_segment["is_high_value_customer"] = (
    customer_value_segment["value_segment"] == "High Value"
)

customer_value_segment.head()
\`\`\`

---

### 10.11.4 세그먼트별 고객 수와 매출

\`\`\`python
value_segment_summary = (
    customer_value_segment
    .groupby("value_segment")
    .agg(
        customer_count=("customer_id", "count"),
        total_purchase=("total_purchase", "sum"),
        avg_purchase=("total_purchase", "mean")
    )
    .reset_index()
)

value_segment_summary["avg_purchase"] = value_segment_summary["avg_purchase"].round(0)

value_segment_summary
\`\`\`

---

### 10.11.5 저장하기

\`\`\`python
customer_value_segment.to_csv(
    OUTPUT_TABLES / "chapter_10_customer_value_segment.csv",
    index=False
)
\`\`\`

---

### 10.11.6 해석 예시

\`\`\`text
고객 가치 세그먼트는 총구매액을 기준으로 고객을 High, Middle, Low 그룹으로 나눈 결과다.
High Value 고객은 매출 기여도가 높은 고객으로 볼 수 있으며, 유지 전략과 재구매 유도가 중요하다.
다만 총구매액만으로 고객 가치를 판단하면 최근성이나 구매 빈도를 놓칠 수 있으므로, 이후 RFM 분석에서 더 정교하게 다룬다.
\`\`\`

---
`;export{e as default};