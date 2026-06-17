var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-7 -->

# 16.7 사분위수와 IQR

사분위수는 데이터를 크기순으로 정렬했을 때 4등분하는 기준값입니다.

대표적으로 다음 값이 있습니다.

| 이름 | 의미 |
|---|---|
| Q1 | 25% 지점 |
| Q2 | 50% 지점, 중앙값 |
| Q3 | 75% 지점 |

pandas에서는 \`quantile()\`을 사용합니다.

---

### 16.7.1 사분위수 계산

\`\`\`python
q1 = orders["total_price"].quantile(0.25)
q2 = orders["total_price"].quantile(0.50)
q3 = orders["total_price"].quantile(0.75)

q1, q2, q3
\`\`\`

여러 분위수를 한 번에 확인할 수도 있습니다.

\`\`\`python
orders["total_price"].quantile([0.25, 0.5, 0.75])
\`\`\`

\`describe()\`의 \`25%\`, \`50%\`, \`75%\`도 사분위수입니다.

\`\`\`python
orders["total_price"].describe()
\`\`\`

---

### 16.7.2 IQR

IQR은 Interquartile Range의 약자입니다.  
Q3에서 Q1을 뺀 값입니다.

\`\`\`python
iqr = q3 - q1

iqr
\`\`\`

IQR은 데이터의 가운데 50%가 어느 정도 범위에 퍼져 있는지를 보여줍니다.

이상값을 찾을 때도 IQR을 사용할 수 있습니다.

\`\`\`python
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

lower_bound, upper_bound
\`\`\`

이 범위를 벗어난 값은 이상값 후보로 볼 수 있습니다.

\`\`\`python
outliers = orders[
    (orders["total_price"] < lower_bound) |
    (orders["total_price"] > upper_bound)
]

outliers
\`\`\`

이상값 처리는 11장에서 이미 다루었습니다.  
이번 장에서는 IQR이 통계적으로 데이터의 퍼짐을 이해하는 데도 사용된다는 점을 기억하면 됩니다.

---

### 16.7.3 분위수로 데이터 해석하기

분위수는 평균보다 데이터의 분포를 더 자세히 보여줍니다.

예를 들어 다음 결과를 생각해봅시다.

\`\`\`text
25%: 47,500
50%: 67,500
75%: 210,000
\`\`\`

이 결과는 다음처럼 해석할 수 있습니다.

\`\`\`text
주문 금액의 25%는 47,500원 이하이다.
주문 금액의 절반은 67,500원 이하이다.
주문 금액의 75%는 210,000원 이하이다.
상위 25% 주문은 210,000원보다 크다.
\`\`\`

분위수는 “상위 몇 %”, “하위 몇 %”를 이해하는 데 유용합니다.

---
`;export{e as default};