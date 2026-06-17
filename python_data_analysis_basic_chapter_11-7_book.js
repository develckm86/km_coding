var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-7 -->

# 11.7 이상값 탐색 기초

이상값을 찾는 방법은 여러 가지가 있습니다.  
이번 기초 과정에서는 다음 방법을 다룹니다.

- 최솟값과 최댓값 확인
- \`describe()\`로 요약 통계 확인
- 정렬로 극단값 확인
- 분위수 확인
- IQR 기준 확인
- 박스플롯으로 확인

---

### 11.7.1 최솟값과 최댓값 확인

가장 간단한 방법은 최솟값과 최댓값을 확인하는 것입니다.

\`\`\`python
orders["quantity"].min()
orders["quantity"].max()
\`\`\`

단가도 확인해봅니다.

\`\`\`python
orders["unit_price"].min()
orders["unit_price"].max()
\`\`\`

최솟값과 최댓값은 이상값 탐색의 출발점입니다.

예를 들어 수량의 최댓값이 100이라면 다음 질문을 할 수 있습니다.

\`\`\`text
이 데이터에서 수량 100개 주문은 가능한가?
일반 고객 주문인가, 대량 주문인가?
입력 실수인가?
\`\`\`

---

### 11.7.2 \`describe()\`로 요약 통계 확인

\`describe()\`를 사용하면 수치형 컬럼의 기본 통계를 한 번에 확인할 수 있습니다.

\`\`\`python
orders[["quantity", "unit_price", "total_price"]].describe()
\`\`\`

결과에는 다음 값들이 포함됩니다.

- count
- mean
- std
- min
- 25%
- 50%
- 75%
- max

여기서 특히 확인할 값은 \`min\`, \`max\`, \`mean\`, \`50%\`입니다.

평균과 중앙값이 크게 다르면 이상값이나 치우친 분포가 있을 가능성이 있습니다.

\`\`\`text
mean이 median보다 훨씬 크다 → 큰 값이 일부 존재할 가능성
max가 75%보다 매우 크다 → 상위 극단값이 있을 가능성
min이 현실적으로 불가능하다 → 오류값 가능성
\`\`\`

---

### 11.7.3 정렬로 극단값 확인하기

상위 값과 하위 값을 직접 확인하는 것도 중요합니다.

주문 금액이 큰 순서로 확인합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head()
\`\`\`

주문 수량이 큰 순서로 확인합니다.

\`\`\`python
orders.sort_values(by="quantity", ascending=False).head()
\`\`\`

단가가 큰 순서로 확인합니다.

\`\`\`python
orders.sort_values(by="unit_price", ascending=False).head()
\`\`\`

정렬은 이상값을 찾는 가장 직관적인 방법입니다.  
데이터가 많지 않을 때는 상위 10개, 하위 10개를 직접 보는 것만으로도 많은 문제를 발견할 수 있습니다.

---

### 11.7.4 분위수 확인하기

분위수는 데이터를 작은 값부터 큰 값까지 정렬했을 때 특정 위치에 있는 값을 의미합니다.

예를 들어 25%, 50%, 75% 지점을 확인할 수 있습니다.

\`\`\`python
orders["total_price"].quantile(0.25)
orders["total_price"].quantile(0.5)
orders["total_price"].quantile(0.75)
\`\`\`

여러 분위수를 한 번에 확인할 수도 있습니다.

\`\`\`python
orders["total_price"].quantile([0.25, 0.5, 0.75, 0.9, 0.95, 0.99])
\`\`\`

상위 1% 또는 5% 값이 일반적인 값과 크게 차이 난다면 이상값 후보를 확인할 수 있습니다.

기초 과정에서는 분위수를 다음처럼 이해하면 충분합니다.

\`\`\`text
0.25 → 하위 25% 지점
0.50 → 중앙값
0.75 → 상위 25%가 시작되는 지점
0.95 → 상위 5%가 시작되는 지점
0.99 → 상위 1%가 시작되는 지점
\`\`\`

---

### 11.7.5 IQR 기준으로 이상값 찾기

IQR은 Interquartile Range의 약자로, 사분위 범위를 의미합니다.

계산 방식은 다음과 같습니다.

\`\`\`text
IQR = Q3 - Q1
\`\`\`

여기서 Q1은 25% 지점, Q3는 75% 지점입니다.

일반적으로 다음 범위를 벗어나면 이상값 후보로 봅니다.

\`\`\`text
하한값 = Q1 - 1.5 * IQR
상한값 = Q3 + 1.5 * IQR
\`\`\`

코드로 작성해봅시다.

\`\`\`python
q1 = orders["total_price"].quantile(0.25)
q3 = orders["total_price"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

lower_bound, upper_bound
\`\`\`

이제 이 범위를 벗어나는 값을 찾습니다.

\`\`\`python
outliers = orders[
    (orders["total_price"] < lower_bound) |
    (orders["total_price"] > upper_bound)
]

outliers
\`\`\`

IQR 기준은 이상값 후보를 찾는 간단하고 많이 쓰이는 방법입니다.  
다만 이 기준으로 잡힌 값이 반드시 오류라는 뜻은 아닙니다.  
“검토가 필요한 값”이라고 이해해야 합니다.

---

### 11.7.6 박스플롯으로 이상값 확인하기

박스플롯은 데이터의 분포와 이상값을 한눈에 확인할 수 있는 그래프입니다.

\`\`\`python
import matplotlib.pyplot as plt

orders["total_price"].plot(kind="box")
plt.title("Total Price Boxplot")
plt.show()
\`\`\`

박스플롯은 대략 다음 정보를 보여줍니다.

- 중앙값
- 25% 지점
- 75% 지점
- 일반적인 범위
- 이상값 후보

그래프에서 점으로 따로 표시되는 값이 있다면 이상값 후보일 수 있습니다.

기초 과정에서는 박스플롯을 “이상값 후보를 시각적으로 확인하는 도구”로 이해하면 충분합니다.

---

### 11.7.7 산점도로 관계 속 이상값 확인하기

두 변수의 관계에서 이상한 값을 찾을 수도 있습니다.

예를 들어 수량과 총 주문 금액의 관계를 보겠습니다.

\`\`\`python
orders.plot(
    kind="scatter",
    x="quantity",
    y="total_price"
)

plt.title("Quantity vs Total Price")
plt.show()
\`\`\`

대부분의 데이터가 한쪽에 모여 있는데, 멀리 떨어진 점이 있다면 이상값 후보일 수 있습니다.

산점도는 다음과 같은 질문에 유용합니다.

\`\`\`text
수량이 많을수록 주문 금액도 커지는가?
단가가 비정상적으로 높은 주문이 있는가?
일반적인 관계에서 벗어나는 주문이 있는가?
\`\`\`

---
`;export{e as default};