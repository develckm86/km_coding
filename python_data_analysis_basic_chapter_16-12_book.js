var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-12 -->

# 16.12 실무 예제 1: 주문 금액 요약 분석

주문 금액을 중심으로 기본 통계 분석을 해보겠습니다.

---

### 16.12.1 기본 통계 계산

\`\`\`python
price_summary = orders["total_price"].agg([
    "count",
    "mean",
    "median",
    "min",
    "max",
    "std"
])

price_summary
\`\`\`

범위도 추가해보겠습니다.

\`\`\`python
price_range = orders["total_price"].max() - orders["total_price"].min()

price_range
\`\`\`

사분위수도 계산합니다.

\`\`\`python
price_quantiles = orders["total_price"].quantile([0.25, 0.5, 0.75])

price_quantiles
\`\`\`

---

### 16.12.2 요약표 만들기

\`\`\`python
price_report = pd.DataFrame({
    "metric": [
        "count",
        "mean",
        "median",
        "min",
        "max",
        "range",
        "std",
        "q1",
        "q3",
        "iqr"
    ],
    "value": [
        orders["total_price"].count(),
        orders["total_price"].mean(),
        orders["total_price"].median(),
        orders["total_price"].min(),
        orders["total_price"].max(),
        orders["total_price"].max() - orders["total_price"].min(),
        orders["total_price"].std(),
        orders["total_price"].quantile(0.25),
        orders["total_price"].quantile(0.75),
        orders["total_price"].quantile(0.75) - orders["total_price"].quantile(0.25)
    ]
})

price_report
\`\`\`

이 표는 주문 금액을 이해하는 기본 요약 리포트입니다.

---

### 16.12.3 해석 예시

분석 결과를 다음처럼 해석할 수 있습니다.

\`\`\`text
주문 금액의 평균과 중앙값을 비교했을 때 평균이 더 높다면, 일부 고가 주문이 평균을 끌어올리고 있을 가능성이 있다.
최댓값과 최솟값의 차이가 크다면 주문 금액의 범위가 넓다.
IQR을 통해 주문 금액의 가운데 50%가 어느 범위에 있는지 확인할 수 있다.
표준편차가 크다면 주문 금액 간 차이가 크다는 의미이다.
\`\`\`

숫자를 계산하는 것만큼 중요한 것은 해석입니다.

---
`;export{e as default};