var e=`# 16장. 퍼널 분석 실습

## 16.16 전환까지 걸린 시간 분석

퍼널 분석에서는 최종 구매까지 걸린 시간도 중요합니다.

---

### 16.16.1 사용자별 첫 방문 시간과 첫 구매 시간

\`\`\`python
first_visit = (
    event_log_clean[event_log_clean["event_name"] == "visit"]
    .groupby("user_id")
    .agg(first_visit_time=("event_time", "min"))
    .reset_index()
)

first_purchase = (
    event_log_clean[event_log_clean["event_name"] == "purchase"]
    .groupby("user_id")
    .agg(first_purchase_time=("event_time", "min"))
    .reset_index()
)

time_to_conversion = first_visit.merge(
    first_purchase,
    on="user_id",
    how="inner"
)

time_to_conversion.head()
\`\`\`

---

### 16.16.2 구매까지 걸린 시간 계산

\`\`\`python
time_to_conversion["minutes_to_purchase"] = (
    time_to_conversion["first_purchase_time"] -
    time_to_conversion["first_visit_time"]
).dt.total_seconds() / 60

time_to_conversion.head()
\`\`\`

---

### 16.16.3 사용자 속성 결합

\`\`\`python
time_to_conversion = time_to_conversion.merge(
    user_attributes[["user_id", "channel", "device", "customer_type"]],
    on="user_id",
    how="left",
    validate="one_to_one"
)
\`\`\`

---

### 16.16.4 전환 시간 요약

\`\`\`python
time_to_conversion_summary = (
    time_to_conversion
    .groupby("customer_type")
    .agg(
        converted_users=("user_id", "nunique"),
        avg_minutes_to_purchase=("minutes_to_purchase", "mean"),
        median_minutes_to_purchase=("minutes_to_purchase", "median"),
        min_minutes_to_purchase=("minutes_to_purchase", "min"),
        max_minutes_to_purchase=("minutes_to_purchase", "max")
    )
    .reset_index()
)

time_to_conversion_summary["avg_minutes_to_purchase"] = (
    time_to_conversion_summary["avg_minutes_to_purchase"].round(1)
)

time_to_conversion_summary["median_minutes_to_purchase"] = (
    time_to_conversion_summary["median_minutes_to_purchase"].round(1)
)

time_to_conversion_summary["min_minutes_to_purchase"] = (
    time_to_conversion_summary["min_minutes_to_purchase"].round(1)
)

time_to_conversion_summary["max_minutes_to_purchase"] = (
    time_to_conversion_summary["max_minutes_to_purchase"].round(1)
)

time_to_conversion_summary
\`\`\`

저장합니다.

\`\`\`python
time_to_conversion_summary.to_csv(
    OUTPUT_TABLES / "chapter_16_time_to_conversion_summary.csv",
    index=False
)
\`\`\`

---

### 16.16.5 구매까지 걸린 시간 분포 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(time_to_conversion["minutes_to_purchase"], bins=20)

plt.title("방문부터 구매 완료까지 걸린 시간")
plt.xlabel("구매까지 걸린 시간(분)")
plt.ylabel("사용자 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_16_time_to_purchase_distribution.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 16.16.6 해석 예시

\`\`\`text
전환까지 걸린 시간은 사용자가 구매 결정을 내리는 데 필요한 시간을 보여준다.
기존 고객이 신규 고객보다 더 빠르게 구매할 수 있다.
구매까지 걸린 시간이 길다면 상품 비교, 배송 조건 확인, 결제 과정의 복잡성 등이 영향을 줄 수 있다.
\`\`\`

---
`;export{e as default};