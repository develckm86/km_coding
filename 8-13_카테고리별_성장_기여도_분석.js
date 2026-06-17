var e=`# 8장. 시계열 매출 분석

## 8.13 카테고리별 성장 기여도 분석

이번에는 월별 매출 변화에 어떤 카테고리가 기여했는지 확인합니다.

예를 들어 3월에서 4월로 매출이 증가했다면, 어떤 카테고리의 증가가 가장 컸는지 확인할 수 있습니다.

---

### 8.13.1 월별 카테고리 매출 피벗 재사용

\`\`\`python
monthly_category_pivot
\`\`\`

---

### 8.13.2 전월 대비 카테고리별 증감액

\`\`\`python
category_sales_diff = monthly_category_pivot.diff()

category_sales_diff
\`\`\`

---

### 8.13.3 long format으로 변환

\`\`\`python
category_growth_contribution = (
    category_sales_diff
    .reset_index()
    .melt(
        id_vars="year_month",
        var_name="category",
        value_name="sales_diff"
    )
)

category_growth_contribution
\`\`\`

---

### 8.13.4 월별 전체 증감액 붙이기

\`\`\`python
monthly_total_diff = (
    monthly_sales[["year_month", "monthly_sales_diff"]]
    .rename(columns={"monthly_sales_diff": "monthly_total_diff"})
)

category_growth_contribution = category_growth_contribution.merge(
    monthly_total_diff,
    on="year_month",
    how="left"
)

category_growth_contribution
\`\`\`

---

### 8.13.5 기여도 계산

전체 증감액에서 각 카테고리 증감액이 차지하는 비율을 계산합니다.

\`\`\`python
category_growth_contribution["contribution_ratio_percent"] = np.where(
    category_growth_contribution["monthly_total_diff"] != 0,
    category_growth_contribution["sales_diff"] /
    category_growth_contribution["monthly_total_diff"] * 100,
    np.nan
)

category_growth_contribution["contribution_ratio_percent"] = (
    category_growth_contribution["contribution_ratio_percent"].round(1)
)

category_growth_contribution
\`\`\`

기여도는 해석이 까다롭습니다.

월별 전체 증감액이 음수일 때는 기여도 부호가 다르게 해석될 수 있습니다.  
따라서 기여도는 증감액과 함께 봐야 합니다.

---

### 8.13.6 저장하기

\`\`\`python
category_growth_contribution.to_csv(
    OUTPUT_TABLES / "chapter_08_category_growth_contribution.csv",
    index=False
)
\`\`\`

---

### 8.13.7 해석 예시

\`\`\`text
카테고리별 성장 기여도는 월별 매출 변화가 어떤 카테고리에서 발생했는지 보여준다.
전체 매출이 증가한 월에는 양의 증감액을 가진 카테고리가 성장에 기여한 것으로 볼 수 있다.
전체 매출이 감소한 월에는 감소폭이 큰 카테고리가 하락에 영향을 준 것으로 볼 수 있다.
다만 전체 증감액이 작을 경우 기여도 비율이 과장될 수 있으므로 증감액과 함께 해석해야 한다.
\`\`\`

---
`;export{e as default};