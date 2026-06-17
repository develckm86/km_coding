var e=`# 17장. 데이터 시각화 기초

## 17.0 들어가며

데이터 분석에서 숫자 요약만으로는 충분하지 않을 때가 많습니다.  
평균, 중앙값, 표준편차, 상관계수 같은 통계값은 데이터를 짧게 요약해주지만, 데이터의 모양과 패턴을 직관적으로 보여주지는 못합니다.

예를 들어 다음과 같은 질문을 생각해봅시다.

\`\`\`text
월별 매출은 증가하고 있는가?
카테고리별 매출 차이는 큰가?
주문 금액은 어느 구간에 많이 몰려 있는가?
이상값이 있는가?
방문 횟수와 주문 금액은 관계가 있는가?
변수들 사이의 상관관계는 어떻게 나타나는가?
\`\`\`

이 질문들은 표와 숫자만으로도 어느 정도 답할 수 있습니다.  
하지만 그래프로 표현하면 훨씬 빠르게 이해할 수 있습니다.

예를 들어 월별 매출 표가 다음과 같다고 해봅시다.

\`\`\`text
2026-01: 395000
2026-02: 255000
2026-03: 345000
2026-04: 354000
\`\`\`

숫자만 보면 월별 차이를 읽어야 합니다.  
하지만 선 그래프나 막대 그래프로 그리면 어느 달이 높고 낮은지 더 빠르게 보입니다.

데이터 시각화는 단순히 예쁜 그래프를 만드는 작업이 아닙니다.  
시각화의 목적은 데이터를 더 잘 이해하고, 분석 결과를 더 명확하게 전달하는 것입니다.

이번 장에서는 파이썬 데이터 분석에서 자주 사용하는 시각화 도구와 기본 그래프를 배웁니다.

- matplotlib 기초
- pandas plot
- seaborn 기초
- 선 그래프
- 막대 그래프
- 히스토그램
- 박스플롯
- 산점도
- 히트맵
- 그래프 선택 기준
- 시각화 실무 주의점

이 장은 데이터 분석 기초 과정의 시각화 입문입니다.  
고급 시각화, 인터랙티브 시각화, 대시보드, 복합 그래프 설계는 데이터 분석 고급 과정에서 더 자세히 다루는 것이 좋습니다.

---

## 17.1 시각화가 필요한 이유

시각화는 데이터를 그림으로 표현해 패턴을 쉽게 파악하게 해줍니다.

---

### 17.1.1 패턴을 빠르게 발견할 수 있다

숫자 표를 보면 값을 하나씩 비교해야 합니다.  
하지만 그래프는 전체 흐름을 한눈에 보여줍니다.

예를 들어 월별 매출이 다음과 같다고 해봅시다.

\`\`\`text
1월: 395000
2월: 255000
3월: 345000
4월: 354000
\`\`\`

이 값을 선 그래프로 그리면 매출이 2월에 낮아졌다가 다시 회복되는 흐름을 쉽게 확인할 수 있습니다.

---

### 17.1.2 분포를 확인할 수 있다

평균만 보면 데이터가 어떻게 퍼져 있는지 알기 어렵습니다.

예를 들어 두 데이터가 모두 평균 100이라고 해도 분포는 전혀 다를 수 있습니다.

\`\`\`text
A: 90, 95, 100, 105, 110
B: 10, 50, 100, 150, 190
\`\`\`

두 데이터의 평균은 비슷할 수 있지만, A는 값들이 평균 근처에 모여 있고 B는 넓게 퍼져 있습니다.

히스토그램이나 박스플롯을 사용하면 이런 차이를 쉽게 확인할 수 있습니다.

---

### 17.1.3 이상값을 찾을 수 있다

이상값은 숫자 요약에서도 찾을 수 있지만, 그래프로 보면 더 직관적입니다.

박스플롯은 이상값 후보를 확인하는 데 유용합니다.  
산점도는 두 변수의 관계에서 멀리 떨어진 값을 찾는 데 유용합니다.

예를 들어 주문 금액이 대부분 10만 원 이하인데 한 주문만 500만 원이라면 박스플롯에서 눈에 띌 수 있습니다.

---

### 17.1.4 관계를 확인할 수 있다

두 변수 사이의 관계를 볼 때는 산점도가 유용합니다.

예를 들어 방문 횟수와 주문 금액의 관계를 보고 싶다면 산점도를 사용할 수 있습니다.

\`\`\`text
방문 횟수가 많을수록 주문 금액도 큰가?
방문 횟수와 주문 금액 사이에 특별한 패턴이 있는가?
\`\`\`

상관계수는 관계를 숫자 하나로 요약하지만, 산점도는 실제 데이터가 어떻게 퍼져 있는지 보여줍니다.

---

### 17.1.5 분석 결과를 전달하기 쉽다

데이터 분석 결과는 혼자 이해하는 것으로 끝나지 않습니다.  
보고서, 발표, 회의, 문서에서 다른 사람에게 전달해야 합니다.

좋은 그래프는 분석 결과를 더 쉽게 전달합니다.

\`\`\`text
표: 정확한 숫자를 보여주는 데 강하다.
그래프: 흐름, 차이, 분포, 관계를 보여주는 데 강하다.
\`\`\`

따라서 분석 보고서에서는 표와 그래프를 함께 사용하는 것이 좋습니다.

---

## 17.2 파이썬 시각화 도구

파이썬 데이터 분석에서 자주 사용하는 시각화 도구는 다음과 같습니다.

\`\`\`text
matplotlib
pandas plot
seaborn
\`\`\`

---

### 17.2.1 matplotlib

matplotlib은 파이썬의 대표적인 시각화 라이브러리입니다.

가장 기본적인 시각화 도구이며, 많은 다른 시각화 라이브러리가 matplotlib을 기반으로 동작합니다.

보통 다음처럼 사용합니다.

\`\`\`python
import matplotlib.pyplot as plt
\`\`\`

matplotlib은 세밀한 설정이 가능하다는 장점이 있습니다.  
그래프 제목, 축 이름, 범례, 크기, 눈금, 저장 등 다양한 요소를 직접 조정할 수 있습니다.

기초 과정에서는 matplotlib의 모든 기능을 외울 필요는 없습니다.  
다음 정도를 익히면 충분합니다.

\`\`\`python
plt.plot()
plt.bar()
plt.hist()
plt.scatter()
plt.boxplot()
plt.title()
plt.xlabel()
plt.ylabel()
plt.legend()
plt.show()
\`\`\`

---

### 17.2.2 pandas plot

pandas는 DataFrame과 Series에서 바로 그래프를 그릴 수 있는 \`plot()\` 기능을 제공합니다.

\`\`\`python
df.plot()
df["column"].plot(kind="hist")
\`\`\`

pandas plot은 내부적으로 matplotlib을 사용합니다.  
따라서 간단한 그래프를 빠르게 그릴 때 편리합니다.

예를 들어 월별 매출 데이터가 DataFrame에 있을 때 다음처럼 바로 그래프를 그릴 수 있습니다.

\`\`\`python
monthly_sales.plot(x="month", y="sales", kind="line")
\`\`\`

pandas plot은 데이터프레임과 바로 연결되어 있어서 기초 분석에 매우 유용합니다.

---

### 17.2.3 seaborn

seaborn은 통계적 시각화에 편리한 라이브러리입니다.

보통 다음처럼 사용합니다.

\`\`\`python
import seaborn as sns
\`\`\`

seaborn은 pandas DataFrame과 잘 어울립니다.  
컬럼명을 직접 지정해 그래프를 그릴 수 있습니다.

\`\`\`python
sns.barplot(data=df, x="category", y="sales")
sns.scatterplot(data=df, x="visit_count", y="total_price")
\`\`\`

기초 과정에서는 seaborn의 모든 그래프를 깊게 다루지 않습니다.  
다만 다음 그래프를 간단히 사용해봅니다.

\`\`\`python
sns.barplot()
sns.histplot()
sns.boxplot()
sns.scatterplot()
sns.heatmap()
\`\`\`

seaborn은 그래프를 편하게 그릴 수 있지만, 그래프의 의미를 이해하지 못하면 잘못 해석할 수 있습니다.  
따라서 이 장에서는 그래프를 그리는 법뿐 아니라 어떤 그래프를 언제 써야 하는지도 함께 다룹니다.

---

## 17.3 예제 데이터 준비

이번 장에서는 주문 데이터를 사용합니다.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date"].dt.day_name()

orders
\`\`\`

이 데이터에는 주문일, 지역, 등급, 카테고리, 주문 금액, 방문 횟수, 만족도 등이 포함되어 있습니다.

시각화 예제를 위해 월별 매출과 카테고리별 매출도 미리 만들어보겠습니다.

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_sales
\`\`\`

\`\`\`python
category_sales = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

---

## 17.4 matplotlib 기초

matplotlib은 파이썬 시각화의 기본 도구입니다.

일반적으로 다음과 같이 불러옵니다.

\`\`\`python
import matplotlib.pyplot as plt
\`\`\`

\`plt\`는 matplotlib의 pyplot 모듈을 줄여 부르는 관례적인 이름입니다.

---

### 17.4.1 가장 간단한 선 그래프

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])
plt.show()
\`\`\`

\`plt.plot()\`은 선 그래프를 그립니다.  
첫 번째 값은 x축, 두 번째 값은 y축에 해당합니다.

---

### 17.4.2 제목과 축 이름 추가

그래프에는 제목과 축 이름을 붙이는 것이 좋습니다.

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

제목과 축 이름이 없으면 그래프를 보는 사람이 무엇을 의미하는지 이해하기 어렵습니다.

---

### 17.4.3 그래프 크기 조정

그래프 크기는 \`plt.figure(figsize=(가로, 세로))\`로 조정할 수 있습니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

그래프가 너무 작으면 글자가 겹치고 해석하기 어렵습니다.  
보고서나 발표 자료에서는 적절한 크기로 조정하는 것이 좋습니다.

---

### 17.4.4 범례 추가

여러 선을 함께 그릴 때는 범례가 필요합니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"], label="매출")
plt.plot(monthly_sales["year_month"], monthly_sales["order_count"], label="주문 수")

plt.title("월별 매출과 주문 수")
plt.xlabel("월")
plt.ylabel("값")
plt.legend()

plt.show()
\`\`\`

다만 서로 단위가 크게 다른 값을 같은 y축에 그리면 해석이 어려울 수 있습니다.  
예를 들어 매출은 수십만 원이고 주문 수는 몇 건이면 같은 축에서 비교하기 어렵습니다.

기초 과정에서는 여러 값을 한 그래프에 넣기보다, 필요하면 그래프를 따로 그리는 것이 좋습니다.

---

### 17.4.5 그래프 저장하기

그래프를 파일로 저장하려면 \`plt.savefig()\`를 사용합니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.savefig("monthly_sales.png", bbox_inches="tight")
plt.show()
\`\`\`

\`bbox_inches="tight"\`는 그래프의 여백을 적절히 조정해 저장할 때 유용합니다.

실무에서는 분석 결과 그래프를 이미지 파일로 저장해 보고서나 문서에 넣는 경우가 많습니다.

---

## 17.5 pandas plot 기초

pandas는 DataFrame이나 Series에서 바로 그래프를 그릴 수 있는 \`plot()\` 기능을 제공합니다.

pandas plot은 내부적으로 matplotlib을 사용합니다.  
따라서 pandas plot으로 그래프를 그리고, matplotlib 함수로 제목과 축 이름을 추가할 수 있습니다.

---

### 17.5.1 DataFrame에서 바로 선 그래프 그리기

\`\`\`python
monthly_sales.plot(
    x="year_month",
    y="total_sales",
    kind="line"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

이 코드는 \`monthly_sales\` DataFrame에서 \`year_month\`를 x축, \`total_sales\`를 y축으로 하는 선 그래프를 그립니다.

---

### 17.5.2 막대 그래프 그리기

\`\`\`python
category_sales.plot(
    x="category",
    y="total_sales",
    kind="bar"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

pandas plot에서 \`kind="bar"\`를 지정하면 막대 그래프가 됩니다.

---

### 17.5.3 히스토그램 그리기

\`\`\`python
orders["total_price"].plot(kind="hist", bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

Series에서도 \`plot()\`을 사용할 수 있습니다.  
수치형 Series에 \`kind="hist"\`를 사용하면 히스토그램을 그립니다.

---

### 17.5.4 박스플롯 그리기

\`\`\`python
orders["total_price"].plot(kind="box")

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

박스플롯은 중앙값, 사분위수, 이상값 후보를 확인할 때 사용합니다.

---

### 17.5.5 pandas plot의 장점과 한계

pandas plot의 장점은 간단하다는 것입니다.

\`\`\`python
df.plot()
\`\`\`

DataFrame에서 바로 그래프를 그릴 수 있기 때문에 탐색 단계에서 빠르게 사용하기 좋습니다.

하지만 복잡한 그래프를 세밀하게 조정하려면 matplotlib이나 seaborn을 직접 사용하는 것이 더 적합할 수 있습니다.

정리하면 다음과 같습니다.

| 상황 | 추천 도구 |
|---|---|
| 빠르게 데이터 확인 | pandas plot |
| 기본 그래프를 직접 제어 | matplotlib |
| 통계적 시각화를 편하게 작성 | seaborn |
| 고급 커스터마이징 | matplotlib |

---

## 17.6 seaborn 기초

seaborn은 통계적 시각화에 편리한 라이브러리입니다.  
pandas DataFrame과 함께 사용하기 좋습니다.

일반적으로 다음처럼 불러옵니다.

\`\`\`python
import seaborn as sns
\`\`\`

seaborn은 보통 \`data\`, \`x\`, \`y\` 인자를 사용합니다.

\`\`\`python
sns.barplot(data=category_sales, x="category", y="total_sales")
\`\`\`

이 구조는 읽기 쉽습니다.

\`\`\`text
category_sales 데이터에서
x축은 category
y축은 total_sales
\`\`\`

---

### 17.6.1 seaborn 막대 그래프

\`\`\`python
sns.barplot(
    data=category_sales,
    x="category",
    y="total_sales"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

seaborn의 \`barplot()\`은 범주별 값을 비교할 때 사용합니다.

주의할 점은 원본 데이터에서 \`barplot()\`을 사용하면 기본적으로 평균을 그릴 수 있다는 것입니다.  
이미 집계된 데이터인 \`category_sales\`를 사용하면 각 카테고리의 \`total_sales\` 값을 막대로 표현합니다.

---

### 17.6.2 seaborn 히스토그램

\`\`\`python
sns.histplot(
    data=orders,
    x="total_price",
    bins=5
)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

\`histplot()\`은 분포를 확인할 때 사용합니다.

---

### 17.6.3 seaborn 박스플롯

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

박스플롯은 그룹별 분포를 비교할 때 유용합니다.  
예를 들어 VIP 고객과 일반 고객의 주문 금액 분포를 비교할 수 있습니다.

---

### 17.6.4 seaborn 산점도

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

산점도는 두 수치형 변수의 관계를 확인할 때 사용합니다.

---

### 17.6.5 seaborn 히트맵

상관관계 행렬을 히트맵으로 표현할 수 있습니다.

\`\`\`python
corr_matrix = orders[["quantity", "total_price", "visit_count", "satisfaction"]].corr()

sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

\`annot=True\`는 각 칸에 상관계수 값을 표시합니다.

히트맵은 상관관계나 교차표처럼 행과 열이 있는 데이터를 시각화할 때 유용합니다.

---

## 17.7 선 그래프

선 그래프는 시간 흐름에 따른 변화를 보여줄 때 적합합니다.

예를 들어 다음과 같은 분석에 사용합니다.

\`\`\`text
월별 매출 추이
일별 방문자 수
주별 주문 건수
연도별 고객 수
시간대별 로그 수
\`\`\`

---

### 17.7.1 월별 매출 선 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

선 그래프는 흐름을 보여주는 데 강합니다.  
각 월의 값을 점으로 보고, 점들이 이어진 선을 통해 증가와 감소를 확인할 수 있습니다.

---

### 17.7.2 pandas plot으로 선 그래프 그리기

\`\`\`python
monthly_sales.plot(
    x="year_month",
    y="total_sales",
    kind="line"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

pandas plot은 간단한 추이 그래프를 빠르게 그릴 때 편리합니다.

---

### 17.7.3 선 그래프 해석

선 그래프를 볼 때는 다음을 확인합니다.

\`\`\`text
전체적으로 증가하는가, 감소하는가?
특정 시점에 급증하거나 급감하는가?
반복되는 패턴이 있는가?
이상하게 튀는 값이 있는가?
\`\`\`

예를 들어 월별 매출 선 그래프에서 2월에 매출이 낮고 3월에 회복된다면 다음 질문을 할 수 있습니다.

\`\`\`text
2월에 매출이 낮은 이유는 무엇인가?
3월에는 어떤 이벤트나 상품 판매가 있었는가?
주문 건수와 평균 주문 금액 중 무엇이 매출 변화에 영향을 주었는가?
\`\`\`

그래프는 답을 바로 주는 것이 아니라, 추가 분석 질문을 만들게 도와줍니다.

---

### 17.7.4 선 그래프 사용 시 주의점

선 그래프는 순서가 있는 데이터에 적합합니다.  
특히 시간 데이터에 잘 맞습니다.

하지만 순서가 없는 범주형 데이터에 선 그래프를 사용하면 오해를 줄 수 있습니다.

예를 들어 카테고리별 매출을 선으로 연결하면 마치 카테고리 사이에 연속적인 흐름이 있는 것처럼 보일 수 있습니다.

\`\`\`text
전자기기 → 도서 → 생활용품
\`\`\`

이 값들은 시간처럼 이어지는 관계가 아닙니다.  
따라서 카테고리별 비교에는 막대 그래프가 더 적합합니다.

---

## 17.8 막대 그래프

막대 그래프는 범주별 크기를 비교할 때 사용합니다.

예를 들어 다음 분석에 적합합니다.

\`\`\`text
카테고리별 매출
지역별 고객 수
고객 등급별 평균 주문 금액
상품별 판매량
요일별 주문 건수
\`\`\`

---

### 17.8.1 카테고리별 매출 막대 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

막대의 길이가 값의 크기를 나타냅니다.  
값이 큰 카테고리와 작은 카테고리를 쉽게 비교할 수 있습니다.

---

### 17.8.2 pandas plot으로 막대 그래프 그리기

\`\`\`python
category_sales.plot(
    x="category",
    y="total_sales",
    kind="bar"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

pandas plot에서는 집계된 DataFrame에서 바로 막대 그래프를 그릴 수 있습니다.

---

### 17.8.3 seaborn으로 막대 그래프 그리기

\`\`\`python
sns.barplot(
    data=category_sales,
    x="category",
    y="total_sales"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

seaborn은 DataFrame의 컬럼명을 직접 사용하므로 코드가 읽기 쉽습니다.

---

### 17.8.4 막대 그래프 정렬

막대 그래프는 보통 큰 값부터 정렬하면 보기 좋습니다.

\`\`\`python
category_sales_sorted = category_sales.sort_values(
    by="total_sales",
    ascending=False
)

sns.barplot(
    data=category_sales_sorted,
    x="category",
    y="total_sales"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

정렬되지 않은 막대 그래프는 비교가 어려울 수 있습니다.  
특히 범주가 많을 때는 정렬이 중요합니다.

---

### 17.8.5 가로 막대 그래프

범주 이름이 길거나 항목이 많을 때는 가로 막대 그래프가 더 보기 좋습니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.barh(category_sales_sorted["category"], category_sales_sorted["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("매출")
plt.ylabel("카테고리")

plt.show()
\`\`\`

가로 막대 그래프는 상품명, 지역명, 긴 카테고리명처럼 x축에 쓰기 어려운 이름을 보여줄 때 유용합니다.

---

### 17.8.6 막대 그래프 사용 시 주의점

막대 그래프는 범주 비교에 적합합니다.  
하지만 범주가 너무 많으면 그래프가 복잡해집니다.

예를 들어 상품 500개의 매출을 모두 막대 그래프로 그리면 읽기 어렵습니다.  
이럴 때는 상위 10개 또는 상위 20개만 선택하는 것이 좋습니다.

\`\`\`python
top_categories = category_sales_sorted.head(10)
\`\`\`

또한 막대 그래프는 보통 0을 기준으로 시작하는 것이 해석에 안전합니다.  
축을 과도하게 잘라내면 작은 차이가 크게 보일 수 있습니다.

---

## 17.9 히스토그램

히스토그램은 수치형 데이터의 분포를 보여줍니다.

예를 들어 주문 금액이 어느 구간에 많이 몰려 있는지 알고 싶을 때 사용합니다.

\`\`\`text
주문 금액이 낮은 구간에 몰려 있는가?
고가 주문이 일부 존재하는가?
데이터가 한쪽으로 치우쳐 있는가?
\`\`\`

---

### 17.9.1 matplotlib 히스토그램

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

\`bins\`는 구간 개수를 의미합니다.  
구간 개수에 따라 그래프 모양이 달라질 수 있습니다.

---

### 17.9.2 pandas plot 히스토그램

\`\`\`python
orders["total_price"].plot(kind="hist", bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

pandas Series에서 바로 히스토그램을 그릴 수 있습니다.

---

### 17.9.3 seaborn 히스토그램

\`\`\`python
sns.histplot(
    data=orders,
    x="total_price",
    bins=5
)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

seaborn의 \`histplot()\`은 분포 확인에 자주 사용됩니다.

---

### 17.9.4 히스토그램 해석

히스토그램을 볼 때는 다음을 확인합니다.

\`\`\`text
어느 구간에 값이 많이 몰려 있는가?
분포가 오른쪽으로 치우쳐 있는가?
분포가 왼쪽으로 치우쳐 있는가?
값이 넓게 퍼져 있는가?
빈 구간이 있는가?
이상하게 떨어진 값이 있는가?
\`\`\`

주문 금액 데이터는 보통 오른쪽으로 치우친 분포를 보일 수 있습니다.  
대부분의 주문은 낮거나 중간 금액이고, 일부 고가 주문이 존재하기 때문입니다.

---

### 17.9.5 bins 설정 주의점

\`bins\` 값이 너무 작으면 분포가 지나치게 단순하게 보입니다.

\`\`\`python
plt.hist(orders["total_price"], bins=3)
plt.show()
\`\`\`

\`bins\` 값이 너무 크면 데이터가 너무 잘게 나뉘어 해석이 어려울 수 있습니다.

\`\`\`python
plt.hist(orders["total_price"], bins=20)
plt.show()
\`\`\`

적절한 구간 수는 데이터 크기와 분석 목적에 따라 다릅니다.  
기초 분석에서는 여러 \`bins\` 값을 시도해보고 분포를 확인하는 것이 좋습니다.

---

## 17.10 박스플롯

박스플롯은 데이터의 중앙값, 사분위수, 이상값 후보를 확인할 때 사용합니다.

특히 그룹별 분포를 비교할 때 유용합니다.

\`\`\`text
고객 등급별 주문 금액 분포
지역별 주문 금액 분포
카테고리별 가격 분포
요일별 매출 분포
\`\`\`

---

### 17.10.1 pandas 박스플롯

\`\`\`python
orders["total_price"].plot(kind="box")

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

박스플롯은 주문 금액의 중앙값과 이상값 후보를 보여줍니다.

---

### 17.10.2 seaborn 박스플롯

고객 등급별 주문 금액 분포를 비교해보겠습니다.

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

이 그래프를 보면 VIP와 일반 고객의 주문 금액 분포가 어떻게 다른지 확인할 수 있습니다.

---

### 17.10.3 박스플롯 읽는 법

박스플롯은 다음 요소를 보여줍니다.

\`\`\`text
상자의 가운데 선: 중앙값
상자의 아래쪽: 1사분위수
상자의 위쪽: 3사분위수
상자의 높이: IQR
상자 밖의 점: 이상값 후보
\`\`\`

기초 과정에서는 다음 정도로 해석하면 충분합니다.

\`\`\`text
중앙값이 어디에 있는가?
상자가 크면 값들이 넓게 퍼져 있다.
상자가 작으면 값들이 좁게 모여 있다.
상자 밖의 점은 이상값 후보일 수 있다.
그룹 간 중앙값과 분포가 다른지 확인한다.
\`\`\`

---

### 17.10.4 박스플롯 사용 시 주의점

박스플롯은 분포를 요약해 보여주지만, 데이터 개수가 너무 적으면 해석이 불안정할 수 있습니다.

예를 들어 VIP 주문이 2건뿐이라면 박스플롯의 분포를 일반화하기 어렵습니다.

따라서 그룹별 박스플롯을 볼 때는 각 그룹의 데이터 개수도 함께 확인하는 것이 좋습니다.

\`\`\`python
orders["grade"].value_counts()
\`\`\`

---

## 17.11 산점도

산점도는 두 수치형 변수의 관계를 확인할 때 사용합니다.

예를 들어 다음 질문에 적합합니다.

\`\`\`text
방문 횟수가 많을수록 주문 금액도 큰가?
주문 수량이 많을수록 주문 금액도 큰가?
만족도가 높을수록 구매 금액이 큰가?
나이와 구매 금액 사이에 관계가 있는가?
\`\`\`

---

### 17.11.1 matplotlib 산점도

\`\`\`python
plt.figure(figsize=(8, 4))

plt.scatter(orders["visit_count"], orders["total_price"])

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

각 점은 하나의 주문 또는 고객을 나타냅니다.  
x축은 방문 횟수, y축은 주문 금액입니다.

---

### 17.11.2 pandas plot 산점도

\`\`\`python
orders.plot(
    kind="scatter",
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

pandas plot으로도 산점도를 쉽게 그릴 수 있습니다.

---

### 17.11.3 seaborn 산점도

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

seaborn은 \`hue\`를 사용해 범주별로 구분할 수도 있습니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

\`hue\`는 범주에 따라 점을 구분해서 보여줍니다.  
고객 등급별로 방문 횟수와 주문 금액의 관계가 다른지 확인할 수 있습니다.

---

### 17.11.4 산점도 해석

산점도를 볼 때는 다음을 확인합니다.

\`\`\`text
점들이 오른쪽 위로 올라가는가?
점들이 오른쪽 아래로 내려가는가?
점들이 흩어져 있는가?
멀리 떨어진 점이 있는가?
그룹별로 패턴이 다른가?
\`\`\`

오른쪽 위로 올라가는 형태라면 양의 관계가 있을 수 있습니다.  
오른쪽 아래로 내려가는 형태라면 음의 관계가 있을 수 있습니다.  
점들이 무작위로 흩어져 있으면 뚜렷한 관계가 약할 수 있습니다.

---

### 17.11.5 상관계수와 함께 보기

산점도는 상관계수와 함께 보면 좋습니다.

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

상관계수는 두 변수의 선형 관계를 숫자로 요약합니다.  
하지만 상관계수만 보면 데이터의 실제 모양을 놓칠 수 있습니다.

따라서 두 변수 관계를 분석할 때는 다음을 함께 확인합니다.

\`\`\`text
상관계수
산점도
이상값
그룹별 차이
\`\`\`

---

## 17.12 히트맵

히트맵은 행과 열로 이루어진 값을 색의 진하기로 표현하는 그래프입니다.

데이터 분석 기초에서는 주로 상관관계 행렬을 시각화할 때 사용합니다.

---

### 17.12.1 상관관계 행렬 만들기

먼저 수치형 컬럼의 상관관계를 계산합니다.

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

corr_matrix
\`\`\`

---

### 17.12.2 seaborn 히트맵

\`\`\`python
sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

\`annot=True\`를 사용하면 각 칸에 상관계수 숫자가 표시됩니다.

히트맵은 상관관계 행렬처럼 여러 변수 간 관계를 한눈에 볼 때 유용합니다.

---

### 17.12.3 히트맵 해석

히트맵을 볼 때는 다음을 확인합니다.

\`\`\`text
어떤 변수 쌍의 상관관계가 높은가?
양의 관계인가, 음의 관계인가?
상관계수가 0에 가까운 변수 쌍은 무엇인가?
\`\`\`

다만 히트맵도 상관관계만 보여줄 뿐 인과관계를 증명하지는 않습니다.

예를 들어 방문 횟수와 주문 금액의 상관관계가 높아도 방문 횟수가 주문 금액을 증가시켰다고 단정할 수 없습니다.

---

### 17.12.4 히트맵 사용 시 주의점

히트맵은 변수가 너무 많으면 해석이 어려워집니다.  
처음에는 분석 목적에 맞는 수치형 컬럼만 선택하는 것이 좋습니다.

\`\`\`python
selected_columns = ["quantity", "total_price", "visit_count", "satisfaction"]
\`\`\`

또한 상관계수는 수치형 변수의 선형 관계를 나타내므로 범주형 변수를 그대로 넣으면 적절하지 않을 수 있습니다.

---

## 17.13 그래프 선택 기준

시각화에서 중요한 것은 “어떤 그래프를 그릴 수 있는가”보다 “어떤 그래프를 선택해야 하는가”입니다.

분석 질문에 따라 적절한 그래프가 다릅니다.

---

### 17.13.1 시간 흐름을 보고 싶을 때

시간에 따른 변화를 보고 싶다면 선 그래프가 적합합니다.

\`\`\`text
월별 매출 추이
일별 방문자 수
주별 주문 건수
연도별 고객 수
\`\`\`

권장 그래프:

\`\`\`text
선 그래프
\`\`\`

예:

\`\`\`python
monthly_sales.plot(x="year_month", y="total_sales", kind="line")
plt.show()
\`\`\`

---

### 17.13.2 범주별 크기를 비교하고 싶을 때

카테고리, 지역, 고객 등급처럼 범주별 값을 비교하려면 막대 그래프가 적합합니다.

\`\`\`text
카테고리별 매출
지역별 고객 수
등급별 평균 주문 금액
상품별 판매량
\`\`\`

권장 그래프:

\`\`\`text
막대 그래프
가로 막대 그래프
\`\`\`

---

### 17.13.3 분포를 보고 싶을 때

수치형 데이터가 어느 구간에 몰려 있는지 보고 싶다면 히스토그램이 적합합니다.

\`\`\`text
주문 금액 분포
고객 나이 분포
방문 횟수 분포
배송 소요일 분포
\`\`\`

권장 그래프:

\`\`\`text
히스토그램
박스플롯
\`\`\`

---

### 17.13.4 그룹별 분포를 비교하고 싶을 때

고객 등급별 주문 금액 분포처럼 그룹별 수치형 데이터의 분포를 비교하려면 박스플롯이 좋습니다.

\`\`\`text
등급별 주문 금액 분포
지역별 배송 소요일 분포
카테고리별 상품 가격 분포
\`\`\`

권장 그래프:

\`\`\`text
박스플롯
\`\`\`

---

### 17.13.5 두 수치형 변수의 관계를 보고 싶을 때

두 수치형 변수 사이의 관계를 보려면 산점도가 적합합니다.

\`\`\`text
방문 횟수와 주문 금액
광고비와 매출
나이와 구매 금액
주문 수량과 주문 금액
\`\`\`

권장 그래프:

\`\`\`text
산점도
\`\`\`

---

### 17.13.6 여러 변수 간 상관관계를 보고 싶을 때

여러 수치형 변수 간 상관관계를 한 번에 보고 싶다면 히트맵이 유용합니다.

\`\`\`text
방문 횟수, 주문 금액, 만족도, 수량 사이의 관계
\`\`\`

권장 그래프:

\`\`\`text
상관관계 히트맵
\`\`\`

---

### 17.13.7 그래프 선택 요약표

| 분석 목적 | 추천 그래프 |
|---|---|
| 시간 흐름 보기 | 선 그래프 |
| 범주별 크기 비교 | 막대 그래프 |
| 수치형 분포 확인 | 히스토그램 |
| 그룹별 분포 비교 | 박스플롯 |
| 두 수치형 변수 관계 확인 | 산점도 |
| 여러 변수 상관관계 확인 | 히트맵 |
| 상위 항목 비교 | 정렬된 막대 그래프 |
| 이상값 확인 | 박스플롯, 산점도 |

---

## 17.14 시각화 실무 주의점

그래프는 잘 만들면 이해를 돕지만, 잘못 만들면 오해를 만들 수 있습니다.

---

### 17.14.1 제목을 명확히 작성하기

그래프 제목은 그래프가 무엇을 보여주는지 알려야 합니다.

나쁜 예:

\`\`\`text
그래프 1
매출
\`\`\`

좋은 예:

\`\`\`text
2026년 월별 매출 추이
카테고리별 총매출 비교
고객 등급별 주문 금액 분포
\`\`\`

제목만 보고도 그래프의 목적을 알 수 있어야 합니다.

---

### 17.14.2 축 이름과 단위 표시하기

축 이름이 없으면 그래프를 해석하기 어렵습니다.

\`\`\`python
plt.xlabel("월")
plt.ylabel("매출")
\`\`\`

금액, 비율, 개수 같은 단위도 명확히 표시해야 합니다.

\`\`\`text
매출
매출액(원)
매출액(만원)
비율(%)
주문 수(건)
\`\`\`

단위가 빠지면 숫자의 의미가 불분명해집니다.

---

### 17.14.3 너무 많은 항목을 한 번에 보여주지 않기

범주가 너무 많으면 그래프가 복잡해집니다.

예를 들어 상품 500개의 매출을 모두 막대 그래프로 그리면 해석하기 어렵습니다.

이럴 때는 상위 항목만 선택합니다.

\`\`\`python
top_products = product_sales.sort_values(
    by="total_sales",
    ascending=False
).head(10)
\`\`\`

보고서에서는 핵심 항목을 선별하는 것이 중요합니다.

---

### 17.14.4 정렬해서 보여주기

범주형 막대 그래프는 값을 기준으로 정렬하면 비교가 쉬워집니다.

\`\`\`python
category_sales_sorted = category_sales.sort_values(
    by="total_sales",
    ascending=False
)
\`\`\`

정렬되지 않은 막대 그래프는 차이를 파악하기 어렵습니다.

---

### 17.14.5 축을 과도하게 조작하지 않기

그래프의 y축 범위를 과도하게 좁히면 작은 차이가 크게 보일 수 있습니다.

특히 막대 그래프에서는 y축을 0부터 시작하는 것이 일반적으로 안전합니다.

물론 특정 상황에서는 축 범위를 조정할 수 있지만, 보고서에서는 왜 그렇게 했는지 설명해야 합니다.

---

### 17.14.6 그래프만 보고 단정하지 않기

그래프는 패턴을 보여주지만, 원인을 증명하지는 않습니다.

예를 들어 월별 매출이 3월에 증가했다고 해서 바로 마케팅 효과라고 단정하면 안 됩니다.

다음과 같은 추가 확인이 필요합니다.

\`\`\`text
3월에 이벤트가 있었는가?
주문 건수가 늘었는가?
평균 주문 금액이 늘었는가?
특정 카테고리 매출이 증가했는가?
데이터 수집 방식이 바뀌었는가?
\`\`\`

그래프는 질문을 만드는 도구이기도 합니다.

---

### 17.14.7 표와 그래프를 함께 사용하기

그래프는 흐름과 패턴을 보여주는 데 강합니다.  
표는 정확한 값을 보여주는 데 강합니다.

실무 보고서에서는 둘을 함께 사용하는 것이 좋습니다.

예를 들어 카테고리별 매출 분석은 다음과 같이 구성할 수 있습니다.

\`\`\`text
1. 카테고리별 매출 요약표
2. 카테고리별 매출 막대 그래프
3. 핵심 해석 문장
\`\`\`

그래프만 있으면 정확한 숫자가 부족하고, 표만 있으면 패턴 파악이 느릴 수 있습니다.

---

## 17.15 실무 예제 1: 월별 매출 추이 시각화

월별 매출 추이를 선 그래프로 표현해보겠습니다.

---

### 17.15.1 월별 매출 데이터 만들기

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_sales
\`\`\`

---

### 17.15.2 선 그래프 그리기

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 17.15.3 해석 예시

\`\`\`text
월별 매출 추이를 보면 2월에 매출이 낮아진 뒤 3월과 4월에 다시 회복되는 흐름을 확인할 수 있다.
다만 매출 변화의 원인을 파악하려면 주문 건수, 평균 주문 금액, 카테고리별 매출을 추가로 확인해야 한다.
\`\`\`

---

## 17.16 실무 예제 2: 카테고리별 매출 비교

카테고리별 매출은 막대 그래프로 표현하는 것이 적합합니다.

---

### 17.16.1 카테고리별 매출 데이터 만들기

\`\`\`python
category_sales = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

---

### 17.16.2 막대 그래프 그리기

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 17.16.3 seaborn으로 그리기

\`\`\`python
sns.barplot(
    data=category_sales,
    x="category",
    y="total_sales"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

---

### 17.16.4 해석 예시

\`\`\`text
전자기기 카테고리의 매출이 가장 높게 나타난다.
전자기기는 주문 건수가 많지 않더라도 단가가 높아 전체 매출 기여도가 클 수 있다.
주문 건수와 평균 주문 금액을 함께 확인하면 매출 차이의 원인을 더 잘 이해할 수 있다.
\`\`\`

---

## 17.17 실무 예제 3: 주문 금액 분포 확인

주문 금액의 분포를 히스토그램과 박스플롯으로 확인해보겠습니다.

---

### 17.17.1 히스토그램

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

---

### 17.17.2 박스플롯

\`\`\`python
sns.boxplot(
    data=orders,
    y="total_price"
)

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

---

### 17.17.3 해석 예시

\`\`\`text
히스토그램을 보면 주문 금액이 낮은 구간에 많이 몰려 있고 일부 고가 주문이 존재할 수 있다.
박스플롯을 보면 중앙값과 사분위수, 이상값 후보를 확인할 수 있다.
평균 주문 금액을 해석할 때는 고가 주문이 평균을 끌어올리는지 함께 확인해야 한다.
\`\`\`

---

## 17.18 실무 예제 4: 고객 등급별 주문 금액 분포

고객 등급별 주문 금액 분포를 비교해보겠습니다.

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
VIP 고객의 주문 금액 분포가 일반 고객보다 높은 위치에 있다면 VIP 고객의 구매 금액이 상대적으로 높다고 볼 수 있다.
다만 각 등급별 데이터 수가 충분한지 확인해야 한다.
박스플롯만으로 원인을 설명할 수는 없으며, 카테고리나 방문 횟수 같은 다른 변수도 함께 확인해야 한다.
\`\`\`

그룹별 데이터 개수를 확인합니다.

\`\`\`python
orders["grade"].value_counts()
\`\`\`

데이터 수가 적으면 그래프 해석에 주의해야 합니다.

---

## 17.19 실무 예제 5: 방문 횟수와 주문 금액 관계

방문 횟수와 주문 금액의 관계를 산점도로 확인합니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

상관계수도 함께 확인합니다.

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
방문 횟수가 많은 고객일수록 주문 금액이 높은 경향이 있을 수 있다.
하지만 상관관계는 인과관계가 아니므로 방문 횟수가 주문 금액을 증가시켰다고 단정할 수 없다.
고객 등급, 상품 카테고리, 이벤트 참여 여부 같은 다른 요인이 영향을 주었을 수 있다.
\`\`\`

---

## 17.20 실무 예제 6: 상관관계 히트맵

여러 수치형 변수의 상관관계를 히트맵으로 확인해보겠습니다.

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

corr_matrix
\`\`\`

히트맵을 그립니다.

\`\`\`python
sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
상관계수가 양수인 변수들은 함께 증가하는 경향이 있을 수 있다.
상관계수가 음수인 변수들은 한쪽이 증가할 때 다른 쪽이 감소하는 경향이 있을 수 있다.
상관계수가 0에 가까우면 직선적인 관계가 약할 수 있다.
다만 상관관계는 인과관계를 의미하지 않는다.
\`\`\`

---

## 17.21 실무 미니 프로젝트: 주문 데이터 시각화 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 주문 데이터 시각화 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 월별 매출 추이를 선 그래프로 그린다.
3. 카테고리별 매출을 막대 그래프로 그린다.
4. 주문 금액 분포를 히스토그램으로 확인한다.
5. 고객 등급별 주문 금액 분포를 박스플롯으로 비교한다.
6. 방문 횟수와 주문 금액 관계를 산점도로 확인한다.
7. 수치형 변수 간 상관관계를 히트맵으로 확인한다.
8. 각 그래프에 대한 해석 문장을 작성한다.
\`\`\`

---

### 17.21.1 데이터 준비

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)

orders
\`\`\`

---

### 17.21.2 월별 매출 추이

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
월별 매출은 2월에 낮아진 뒤 3월과 4월에 회복되는 흐름을 보인다.
정확한 원인을 파악하려면 월별 주문 건수와 평균 주문 금액을 함께 확인해야 한다.
\`\`\`

---

### 17.21.3 카테고리별 매출

\`\`\`python
category_sales = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

plt.figure(figsize=(8, 4))

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높다.
전자기기는 단가가 높아 전체 매출에 크게 기여할 수 있다.
\`\`\`

---

### 17.21.4 주문 금액 분포

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
주문 금액은 낮은 금액대에 많이 분포하며, 일부 고가 주문이 존재할 수 있다.
평균 주문 금액을 해석할 때는 중앙값과 박스플롯도 함께 확인하는 것이 좋다.
\`\`\`

---

### 17.21.5 고객 등급별 주문 금액 분포

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
VIP 고객의 주문 금액 분포가 일반 고객보다 높은지 확인할 수 있다.
단, 등급별 데이터 수가 적으면 해석에 주의해야 한다.
\`\`\`

---

### 17.21.6 방문 횟수와 주문 금액 관계

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
방문 횟수가 많은 고객의 주문 금액이 높은 경향이 있는지 확인할 수 있다.
다만 산점도에서 보이는 관계는 인과관계를 의미하지 않는다.
\`\`\`

---

### 17.21.7 상관관계 히트맵

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
상관계수가 높은 변수 쌍은 함께 움직이는 경향이 있을 수 있다.
상관관계가 높은 변수는 산점도로 추가 확인하는 것이 좋다.
\`\`\`

---

### 17.21.8 시각화 리포트 구성 예시

분석 보고서에서는 다음과 같은 구조로 정리할 수 있습니다.

\`\`\`text
1. 분석 목적
   - 주문 데이터의 매출 흐름과 주요 패턴을 시각화한다.

2. 월별 매출 추이
   - 선 그래프
   - 해석 문장

3. 카테고리별 매출
   - 막대 그래프
   - 해석 문장

4. 주문 금액 분포
   - 히스토그램
   - 박스플롯
   - 해석 문장

5. 고객 등급별 주문 금액 비교
   - 박스플롯
   - 해석 문장

6. 방문 횟수와 주문 금액 관계
   - 산점도
   - 상관계수
   - 해석 문장

7. 결론
   - 핵심 패턴
   - 추가 확인이 필요한 점
\`\`\`

---

### 17.21.9 처리 기준 문서화

시각화 과정도 문서화할 수 있습니다.

\`\`\`text
시각화 기준
- 월별 매출은 order_date에서 추출한 year_month 기준으로 total_price 합계를 계산했다.
- 카테고리별 매출은 category 기준으로 total_price 합계를 계산하고 내림차순 정렬했다.
- 주문 금액 분포는 total_price를 기준으로 히스토그램과 박스플롯을 사용해 확인했다.
- 등급별 주문 금액 분포는 grade와 total_price를 사용해 박스플롯으로 비교했다.
- 방문 횟수와 주문 금액 관계는 visit_count와 total_price를 사용해 산점도로 확인했다.
- 상관관계 히트맵은 quantity, total_price, visit_count, satisfaction 컬럼을 사용했다.
\`\`\`

---

## 17.22 시각화 시 자주 하는 실수

시각화는 데이터를 쉽게 보여주지만, 잘못 사용하면 오해를 만들 수 있습니다.

---

### 17.22.1 그래프 종류를 잘못 선택하는 실수

시간 흐름에는 선 그래프가 적합합니다.  
범주 비교에는 막대 그래프가 적합합니다.  
분포 확인에는 히스토그램이나 박스플롯이 적합합니다.  
두 수치형 변수의 관계에는 산점도가 적합합니다.

분석 질문과 맞지 않는 그래프를 사용하면 해석이 어려워집니다.

---

### 17.22.2 범주형 데이터를 선 그래프로 연결하는 실수

카테고리별 매출은 시간 흐름이 아닙니다.  
전자기기, 도서, 생활용품은 서로 순서대로 이어지는 값이 아닙니다.

따라서 카테고리별 매출은 선 그래프보다 막대 그래프가 적합합니다.

---

### 17.22.3 제목과 축 이름을 빼먹는 실수

그래프에 제목과 축 이름이 없으면 다른 사람이 이해하기 어렵습니다.

\`\`\`python
plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
\`\`\`

보고서용 그래프에는 반드시 제목, 축 이름, 단위를 표시하는 습관이 필요합니다.

---

### 17.22.4 너무 많은 데이터를 한 그래프에 넣는 실수

상품 수가 수백 개일 때 모든 상품을 막대 그래프로 그리면 읽을 수 없습니다.

이럴 때는 상위 10개만 선택하거나 그룹화 수준을 높여야 합니다.

\`\`\`python
top_products = product_sales.head(10)
\`\`\`

---

### 17.22.5 y축 범위로 차이를 과장하는 실수

y축을 너무 좁게 설정하면 작은 차이가 크게 보일 수 있습니다.  
특히 막대 그래프에서는 y축이 0부터 시작하지 않으면 차이가 과장될 수 있습니다.

보고서에서는 축 범위를 조정했다면 그 이유를 설명해야 합니다.

---

### 17.22.6 그래프만 보고 원인을 단정하는 실수

그래프는 패턴을 보여줄 뿐 원인을 증명하지 않습니다.

예를 들어 4월 매출이 높다고 해서 바로 마케팅 효과라고 단정하면 안 됩니다.  
주문 건수, 평균 주문 금액, 카테고리 구성, 이벤트 여부 등을 추가로 확인해야 합니다.

---

### 17.22.7 데이터 개수를 확인하지 않는 실수

그룹별 박스플롯이나 막대 그래프를 볼 때는 그룹별 데이터 개수도 확인해야 합니다.

\`\`\`python
orders["grade"].value_counts()
\`\`\`

데이터가 적은 그룹의 평균이나 분포는 불안정할 수 있습니다.

---

### 17.22.8 한글 깨짐 문제를 고려하지 않는 실수

matplotlib 환경에 따라 한글 제목이나 축 이름이 깨질 수 있습니다.  
이 문제는 운영체제와 설치된 폰트에 따라 다릅니다.

수업 환경에서 한글이 깨진다면 사용 가능한 한글 폰트를 설정해야 합니다.  
다만 폰트 설정은 환경마다 다르므로, 본 교재에서는 기본 코드 중심으로 진행합니다.

---

## 17.23 핵심 정리

이번 장에서는 데이터 시각화의 기초를 배웠습니다.

시각화는 데이터를 더 잘 이해하고 전달하기 위한 도구입니다.  
통계값이 데이터를 숫자로 요약한다면, 그래프는 데이터의 흐름, 비교, 분포, 관계를 시각적으로 보여줍니다.

파이썬 데이터 분석에서 자주 사용하는 시각화 도구는 다음과 같습니다.

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns
\`\`\`

pandas에서도 \`plot()\`을 사용해 간단한 그래프를 빠르게 그릴 수 있습니다.

\`\`\`python
df.plot()
df["column"].plot(kind="hist")
\`\`\`

그래프 선택 기준은 다음과 같습니다.

| 목적 | 그래프 |
|---|---|
| 시간 흐름 확인 | 선 그래프 |
| 범주별 크기 비교 | 막대 그래프 |
| 수치형 분포 확인 | 히스토그램 |
| 그룹별 분포 비교 | 박스플롯 |
| 두 수치형 변수 관계 확인 | 산점도 |
| 여러 변수 상관관계 확인 | 히트맵 |

matplotlib에서는 다음과 같은 기본 함수를 사용합니다.

\`\`\`python
plt.plot()
plt.bar()
plt.hist()
plt.scatter()
plt.title()
plt.xlabel()
plt.ylabel()
plt.show()
\`\`\`

seaborn에서는 DataFrame과 컬럼명을 직접 사용해 그래프를 그릴 수 있습니다.

\`\`\`python
sns.barplot(data=df, x="category", y="sales")
sns.histplot(data=df, x="sales")
sns.boxplot(data=df, x="grade", y="sales")
sns.scatterplot(data=df, x="visit_count", y="sales")
sns.heatmap(corr_matrix, annot=True)
\`\`\`

좋은 그래프에는 제목, 축 이름, 단위, 적절한 정렬, 명확한 해석이 필요합니다.  
그래프를 만들 때는 “무엇을 보여주려는가?”를 먼저 생각해야 합니다.

그래프는 분석 결과를 전달하는 도구이지만, 원인을 증명하는 도구는 아닙니다.  
그래프에서 보이는 패턴은 추가 분석 질문으로 이어져야 합니다.

---

## 17.24 연습문제

### 문제 1. 개념 확인

시간에 따른 매출 변화를 보여주기에 가장 적절한 그래프는 무엇인가요?

A. 선 그래프  
B. 히스토그램  
C. 박스플롯  
D. 히트맵  

---

### 문제 2. 개념 확인

카테고리별 매출을 비교할 때 가장 적절한 그래프는 무엇인가요?

A. 산점도  
B. 막대 그래프  
C. 선 그래프  
D. 히스토그램  

---

### 문제 3. 코드 작성

다음 월별 매출 데이터로 선 그래프를 그리는 코드를 작성하세요.

\`\`\`python
monthly_sales = pd.DataFrame({
    "month": ["2026-01", "2026-02", "2026-03"],
    "sales": [100000, 150000, 130000]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 카테고리별 매출 데이터로 막대 그래프를 그리는 코드를 작성하세요.

\`\`\`python
category_sales = pd.DataFrame({
    "category": ["전자기기", "도서", "생활용품"],
    "sales": [300000, 80000, 120000]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 주문 금액 데이터의 히스토그램을 그리는 코드를 작성하세요.

\`\`\`python
orders = pd.DataFrame({
    "total_price": [10000, 20000, 30000, 50000, 100000, 300000]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 고객 등급별 주문 금액 분포를 박스플롯으로 그리세요.

\`\`\`python
orders = pd.DataFrame({
    "grade": ["VIP", "일반", "VIP", "일반", "VIP", "일반"],
    "total_price": [300000, 50000, 250000, 40000, 180000, 60000]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 방문 횟수와 주문 금액의 관계를 산점도로 그리세요.

\`\`\`python
orders = pd.DataFrame({
    "visit_count": [1, 2, 3, 4, 5],
    "total_price": [10000, 20000, 30000, 45000, 70000]
})
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 수치형 컬럼의 상관관계 히트맵을 그리세요.

\`\`\`python
df = pd.DataFrame({
    "quantity": [1, 2, 3, 4, 5],
    "sales": [10000, 20000, 35000, 40000, 60000],
    "visit_count": [2, 3, 5, 7, 9]
})
\`\`\`

---

### 문제 9. 개념 확인

히스토그램과 박스플롯은 각각 어떤 목적에 적합한지 설명하세요.

---

### 문제 10. 실무형 문제

다음 주문 데이터로 시각화 리포트를 만드세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- 월별 매출 합계를 계산하고 선 그래프로 그린다.
- 카테고리별 매출 합계를 계산하고 막대 그래프로 그린다.
- total_price의 분포를 히스토그램으로 확인한다.
- visit_count와 total_price의 관계를 산점도로 확인한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-20", "2026-03-05", "2026-03-25"],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "전자기기"],
    "visit_count": [10, 3, 8, 4, 5, 12],
    "total_price": [300000, 20000, 250000, 50000, 30000, 280000]
})
\`\`\`

---

## 17.25 정답 및 해설

### 문제 1 정답

정답: A

시간 흐름에 따른 변화를 볼 때는 선 그래프가 적합합니다.  
월별 매출, 일별 방문자 수, 연도별 고객 수 같은 데이터를 표현할 때 사용합니다.

---

### 문제 2 정답

정답: B

카테고리처럼 범주별 크기를 비교할 때는 막대 그래프가 적합합니다.

---

### 문제 3 정답

\`\`\`python
plt.plot(monthly_sales["month"], monthly_sales["sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

또는 pandas plot을 사용할 수 있습니다.

\`\`\`python
monthly_sales.plot(
    x="month",
    y="sales",
    kind="line"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

---

### 문제 4 정답

\`\`\`python
plt.bar(category_sales["category"], category_sales["sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

막대 그래프는 범주별 값 비교에 적합합니다.

---

### 문제 5 정답

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

히스토그램은 수치형 데이터가 어느 구간에 많이 분포하는지 보여줍니다.

---

### 문제 6 정답

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

박스플롯은 그룹별 분포와 이상값 후보를 비교할 때 유용합니다.

---

### 문제 7 정답

\`\`\`python
plt.scatter(orders["visit_count"], orders["total_price"])

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

또는 seaborn을 사용할 수 있습니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 문제 8 정답

\`\`\`python
corr_matrix = df[["quantity", "sales", "visit_count"]].corr()

sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("상관관계 히트맵")
plt.show()
\`\`\`

히트맵은 여러 수치형 변수 간 상관관계를 한눈에 확인할 때 유용합니다.

---

### 문제 9 정답

히스토그램은 수치형 데이터가 어떤 구간에 얼마나 분포하는지 확인할 때 사용합니다.  
예를 들어 주문 금액이 낮은 구간에 몰려 있는지, 고가 주문이 일부 존재하는지 확인할 수 있습니다.

박스플롯은 중앙값, 사분위수, 이상값 후보를 확인할 때 사용합니다.  
또한 고객 등급별 주문 금액처럼 그룹별 분포를 비교할 때 유용합니다.

---

### 문제 10 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)

monthly_sales = (
    orders
    .groupby("year_month")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

카테고리별 매출 막대 그래프:

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

주문 금액 분포 히스토그램:

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

방문 횟수와 주문 금액 산점도:

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석할 때는 다음을 함께 확인해야 합니다.

\`\`\`text
월별 매출이 증가 또는 감소하는가?
어떤 카테고리의 매출이 가장 큰가?
주문 금액은 어느 구간에 몰려 있는가?
방문 횟수와 주문 금액 사이에 관계가 있어 보이는가?
\`\`\`

---

## 17.26 다음 장 예고

이번 장에서는 데이터 시각화의 기초를 배웠습니다.

다음 장에서는 **탐색적 데이터 분석, EDA**를 배웁니다.

지금까지 배운 내용은 각각 따로 존재하는 기술처럼 보일 수 있습니다.

\`\`\`text
데이터 확인
결측치 처리
중복값 처리
이상값 확인
문자열 처리
날짜 처리
그룹화와 집계
기본 통계
시각화
\`\`\`

EDA는 이 기술들을 하나의 분석 흐름으로 연결하는 과정입니다.

다음 장에서는 데이터를 처음 받았을 때 어떻게 질문을 만들고, 어떤 순서로 확인하고, 어떤 표와 그래프를 만들며, 어떻게 인사이트를 정리하는지 배웁니다.

다음 장의 주요 내용은 다음과 같습니다.

- EDA란 무엇인가
- EDA 기본 흐름
- 분석 질문 만들기
- 단일 변수 분석
- 두 변수 관계 분석
- 그룹별 비교
- 시각화와 통계값 함께 사용하기
- EDA 결과 정리
- 쇼핑몰 주문 데이터 EDA 미니 프로젝트

시각화는 EDA의 핵심 도구입니다.  
이번 장에서 배운 그래프를 다음 장에서 실제 분석 흐름 안에 적용하게 됩니다.

---

## 참고 문서

- Matplotlib 공식 문서: Pyplot tutorial
- Matplotlib 공식 문서: Plot types and examples
- pandas 공식 문서: Chart visualization
- pandas 공식 문서: \`DataFrame.plot\`
- seaborn 공식 문서: Tutorial
- seaborn 공식 문서: \`barplot\`
- seaborn 공식 문서: \`histplot\`
- seaborn 공식 문서: \`boxplot\`
- seaborn 공식 문서: \`scatterplot\`
- seaborn 공식 문서: \`heatmap\`
`;export{e as default};