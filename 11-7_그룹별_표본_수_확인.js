var e=`# 11장. 통계적 비교 실습

## 11.7 그룹별 표본 수 확인

비교 분석에서 가장 먼저 확인할 것은 표본 수입니다.

표본 수가 너무 적으면 평균 차이를 일반화하기 어렵습니다.

---

### 11.7.1 고객 등급별 표본 수

\`\`\`python
customer_features["customer_grade"].value_counts()
\`\`\`

---

### 11.7.2 쿠폰 사용 여부별 표본 수

\`\`\`python
customer_features["is_coupon_user"].value_counts()
\`\`\`

---

### 11.7.3 재구매 여부별 표본 수

\`\`\`python
customer_features["is_repeat_customer"].value_counts()
\`\`\`

---

### 11.7.4 주요 그룹별 표본 수 요약표

\`\`\`python
group_size_records = []

for group_col in ["customer_grade", "is_coupon_user", "is_repeat_customer", "main_category", "value_segment"]:
    if group_col in customer_features.columns:
        temp = (
            customer_features[group_col]
            .value_counts(dropna=False)
            .reset_index()
        )
        temp.columns = ["group_value", "customer_count"]
        temp.insert(0, "group_column", group_col)
        group_size_records.append(temp)

group_size_summary = pd.concat(group_size_records, ignore_index=True)

group_size_summary
\`\`\`

---

### 11.7.5 저장하기

\`\`\`python
group_size_summary.to_csv(
    OUTPUT_TABLES / "chapter_11_group_size_summary.csv",
    index=False
)
\`\`\`

---

### 11.7.6 해석 예시

\`\`\`text
집단 비교를 하기 전에는 그룹별 고객 수를 확인해야 한다.
표본 수가 너무 적은 그룹의 평균은 불안정할 수 있다.
예를 들어 VIP 고객이 2명뿐이라면 VIP 평균 구매액이 높더라도 일반화하기 어렵다.
\`\`\`

---
`;export{e as default};