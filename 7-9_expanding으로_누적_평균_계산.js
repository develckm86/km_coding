var e=`# 7장. 누적 지표와 이동평균 분석

## 7.9 expanding으로 누적 평균 계산

\`expanding()\`은 시작일부터 현재일까지 모든 데이터를 포함해 계산합니다.

---

### 7.9.1 누적 평균 매출 계산

\`\`\`python
daily_sales["expanding_avg_sales"] = (
    daily_sales["daily_sales"]
    .expanding(min_periods=1)
    .mean()
)

daily_sales[["order_date_dt", "daily_sales", "expanding_avg_sales"]].head()
\`\`\`

\`expanding_avg_sales\`는 분석 시작일부터 해당 날짜까지의 평균 일매출입니다.

---

### 7.9.2 이동평균과 expanding 평균 비교

\`\`\`python
daily_sales[[
    "order_date_dt",
    "daily_sales",
    "sales_3d_ma",
    "sales_7d_ma",
    "expanding_avg_sales"
]].head(10)
\`\`\`

이동평균과 expanding 평균은 목적이 다릅니다.

| 지표 | 설명 |
|---|---|
| 3일 이동평균 | 최근 3일 흐름 |
| 7일 이동평균 | 최근 7일 흐름 |
| expanding 평균 | 시작일부터 현재까지 평균 |

---

### 7.9.3 해석 예시

\`\`\`text
expanding 평균은 전체 기간의 평균 수준이 시간이 지나며 어떻게 안정되는지 보여준다.
초기에는 값이 크게 흔들릴 수 있지만 데이터가 쌓일수록 변화 폭이 줄어드는 경향이 있다.
최근 흐름을 보고 싶다면 이동평균을, 전체 누적 평균 수준을 보고 싶다면 expanding 평균을 사용한다.
\`\`\`

---
`;export{e as default};