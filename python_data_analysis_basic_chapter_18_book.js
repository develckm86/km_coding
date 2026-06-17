var e=`# 18장. 탐색적 데이터 분석, EDA

## 18.0 들어가며

지금까지 우리는 데이터 분석에 필요한 여러 기술을 하나씩 배웠습니다.

\`\`\`text
데이터 불러오기
데이터 확인
데이터 선택과 필터링
정렬과 순위
파생 변수 만들기
결측치 처리
중복값과 이상값 처리
문자열 데이터 처리
날짜 데이터 처리
그룹화와 집계
기본 통계
데이터 시각화
\`\`\`

각 기술은 중요합니다.  
하지만 실제 분석에서는 이 기술들을 따로따로 사용하는 것이 아니라, 하나의 흐름 안에서 연결해 사용합니다.

데이터를 처음 받았을 때 우리는 바로 결론을 내릴 수 없습니다.  
먼저 데이터가 어떤 구조인지 확인하고, 어떤 문제가 있는지 점검하고, 어떤 질문에 답할 수 있는지 탐색해야 합니다.

이 과정을 **탐색적 데이터 분석**이라고 합니다.

탐색적 데이터 분석은 영어로 **Exploratory Data Analysis**라고 하며, 줄여서 **EDA**라고 부릅니다.

EDA는 데이터를 본격적으로 분석하거나 모델링하기 전에 데이터를 이해하기 위한 과정입니다.

예를 들어 쇼핑몰 주문 데이터를 받았다고 생각해봅시다.  
처음부터 “매출이 증가했다” 또는 “VIP 고객이 중요하다”라고 결론을 내릴 수는 없습니다.

먼저 다음을 확인해야 합니다.

\`\`\`text
데이터는 몇 행, 몇 열인가?
어떤 컬럼이 있는가?
결측치가 있는가?
중복 주문이 있는가?
주문 금액에 이상값이 있는가?
월별 매출은 어떻게 변하는가?
어떤 카테고리의 매출이 높은가?
고객 등급별 구매 패턴이 다른가?
지역별 차이가 있는가?
\`\`\`

이 질문들을 하나씩 확인하면서 데이터에 대한 이해를 쌓아가는 과정이 EDA입니다.

EDA의 목적은 정답을 바로 찾는 것이 아닙니다.  
데이터를 관찰하고, 패턴을 발견하고, 이상한 점을 찾고, 다음 분석 질문을 만드는 것입니다.

이번 장에서는 지금까지 배운 pandas와 시각화 기술을 사용해 EDA를 수행하는 흐름을 배웁니다.

---

## 18.1 EDA란?

EDA는 데이터를 탐색하면서 이해하는 과정입니다.

정해진 답을 찾는 과정이라기보다, 데이터를 보면서 질문을 만들고, 가설을 세우고, 추가로 확인할 부분을 찾는 과정에 가깝습니다.

---

### 18.1.1 EDA의 의미

EDA는 Exploratory Data Analysis의 약자입니다.

\`\`\`text
Exploratory: 탐색하는
Data: 데이터
Analysis: 분석
\`\`\`

즉, EDA는 데이터를 탐색하면서 분석하는 과정입니다.

여기서 중요한 단어는 “탐색”입니다.  
탐색은 이미 알고 있는 정답을 확인하는 것이 아니라, 데이터 안에 무엇이 있는지 살펴보는 작업입니다.

예를 들어 주문 데이터를 처음 받았을 때 다음처럼 접근합니다.

\`\`\`text
이 데이터에는 어떤 컬럼이 있지?
매출은 어느 정도 규모지?
어떤 카테고리가 많이 팔렸지?
특정 월에 매출이 높거나 낮은 이유가 있을까?
고객 등급별 구매 차이가 있을까?
이상하게 큰 주문 금액이 있나?
\`\`\`

EDA는 이런 질문을 통해 데이터를 이해하는 과정입니다.

---

### 18.1.2 EDA와 보고서 분석의 차이

EDA는 최종 보고서와 다릅니다.

최종 보고서는 정리된 결과를 보여줍니다.

\`\`\`text
주요 결과
핵심 그래프
인사이트
결론
제안
\`\`\`

반면 EDA는 결과를 찾기 위한 과정입니다.

\`\`\`text
데이터 구조 확인
결측치 확인
중복값 확인
이상값 탐색
분포 확인
그룹별 비교
관계 확인
새로운 질문 생성
\`\`\`

EDA 과정에서는 여러 그래프를 그려보고, 여러 기준으로 데이터를 나누어보고, 때로는 의미 없는 결과도 확인하게 됩니다.

중요한 것은 EDA 과정에서 나온 모든 결과를 최종 보고서에 넣는 것이 아니라, 그중 의미 있는 결과를 선별해 보고서로 정리하는 것입니다.

---

### 18.1.3 EDA가 필요한 이유

EDA가 필요한 이유는 다음과 같습니다.

첫째, 데이터의 구조를 이해할 수 있습니다.

\`\`\`text
행과 열의 개수
컬럼명
자료형
수치형 컬럼
범주형 컬럼
날짜 컬럼
\`\`\`

둘째, 데이터 품질 문제를 찾을 수 있습니다.

\`\`\`text
결측치
중복값
이상값
잘못된 자료형
잘못된 날짜
문자열 표기 불일치
\`\`\`

셋째, 분석 방향을 잡을 수 있습니다.

\`\`\`text
어떤 변수가 중요한가?
어떤 기준으로 그룹화해야 하는가?
어떤 기간을 비교해야 하는가?
어떤 그래프가 필요한가?
\`\`\`

넷째, 가설을 만들 수 있습니다.

\`\`\`text
전자기기 카테고리가 매출을 주도하는 것 같다.
VIP 고객의 평균 주문 금액이 높은 것 같다.
3월 매출 증가에는 특정 카테고리가 영향을 준 것 같다.
방문 횟수와 주문 금액 사이에 관계가 있을 수 있다.
\`\`\`

다섯째, 최종 분석 결과의 신뢰도를 높일 수 있습니다.

데이터를 제대로 확인하지 않고 바로 분석하면 잘못된 결론을 낼 수 있습니다.  
EDA는 분석 전에 데이터를 이해하고 검증하는 안전장치입니다.

---

### 18.1.4 EDA에서 자주 사용하는 도구

EDA에서는 pandas와 시각화 도구를 함께 사용합니다.

pandas로는 데이터 구조와 요약값을 확인합니다.

\`\`\`python
df.head()
df.info()
df.describe()
df.isna().sum()
df.value_counts()
df.groupby()
\`\`\`

시각화 도구로는 분포, 비교, 관계를 확인합니다.

\`\`\`python
plt.plot()
plt.bar()
plt.hist()
sns.boxplot()
sns.scatterplot()
sns.heatmap()
\`\`\`

EDA는 특정 함수 하나로 끝나는 작업이 아닙니다.  
여러 도구를 조합해 데이터를 다양한 관점에서 살펴보는 과정입니다.

---

## 18.2 EDA의 기본 흐름

EDA에는 정해진 하나의 공식은 없습니다.  
하지만 실무에서 자주 사용하는 기본 흐름은 있습니다.

\`\`\`text
1. 데이터 구조 확인
2. 데이터 품질 확인
3. 단일 변수 분석
4. 두 변수 관계 분석
5. 그룹별 비교
6. 시간 흐름 분석
7. 이상한 점과 패턴 정리
8. 추가 분석 질문 도출
\`\`\`

이 흐름을 절대적인 순서로 외울 필요는 없습니다.  
하지만 처음 EDA를 할 때는 이 순서대로 진행하면 큰 흐름을 놓치지 않을 수 있습니다.

---

### 18.2.1 1단계: 데이터 구조 확인

EDA는 데이터 구조 확인에서 시작합니다.

\`\`\`python
df.head()
df.shape
df.info()
df.columns
df.dtypes
\`\`\`

이 단계에서는 다음을 확인합니다.

\`\`\`text
데이터는 몇 행, 몇 열인가?
어떤 컬럼이 있는가?
각 컬럼의 자료형은 무엇인가?
날짜 컬럼이 문자열로 들어와 있지는 않은가?
숫자여야 할 컬럼이 문자열로 들어와 있지는 않은가?
\`\`\`

이 단계에서 데이터의 전체 모습을 파악합니다.

---

### 18.2.2 2단계: 데이터 품질 확인

데이터 구조를 확인한 뒤에는 품질을 확인합니다.

\`\`\`python
df.isna().sum()
df.duplicated().sum()
df.describe()
\`\`\`

확인할 내용은 다음과 같습니다.

\`\`\`text
결측치가 있는가?
중복 행이 있는가?
ID 컬럼이 중복되어 있지는 않은가?
수치형 컬럼에 비정상적인 값이 있는가?
날짜 변환에 실패한 값이 있는가?
범주형 값이 표준화되어 있는가?
\`\`\`

데이터 품질 문제가 있으면 분석 전에 처리해야 합니다.  
그렇지 않으면 이후 분석 결과가 왜곡될 수 있습니다.

---

### 18.2.3 3단계: 단일 변수 분석

단일 변수 분석은 하나의 컬럼을 집중적으로 살펴보는 과정입니다.

수치형 변수라면 다음을 확인합니다.

\`\`\`text
평균
중앙값
최솟값
최댓값
표준편차
분포
이상값
\`\`\`

범주형 변수라면 다음을 확인합니다.

\`\`\`text
고유값
빈도
비율
상위 범주
희귀 범주
결측치 여부
\`\`\`

예를 들어 주문 금액 컬럼을 분석한다면 다음처럼 확인할 수 있습니다.

\`\`\`python
df["total_price"].describe()
df["total_price"].plot(kind="hist")
\`\`\`

카테고리 컬럼을 분석한다면 다음처럼 확인할 수 있습니다.

\`\`\`python
df["category"].value_counts()
\`\`\`

---

### 18.2.4 4단계: 두 변수 관계 분석

두 변수 관계 분석은 변수들 사이의 관계를 확인하는 과정입니다.

수치형 변수와 수치형 변수의 관계는 산점도와 상관계수로 확인할 수 있습니다.

\`\`\`python
df[["visit_count", "total_price"]].corr()
sns.scatterplot(data=df, x="visit_count", y="total_price")
\`\`\`

범주형 변수와 수치형 변수의 관계는 그룹별 평균이나 박스플롯으로 확인할 수 있습니다.

\`\`\`python
df.groupby("grade")["total_price"].mean()
sns.boxplot(data=df, x="grade", y="total_price")
\`\`\`

범주형 변수와 범주형 변수의 관계는 교차표로 확인할 수 있습니다.

\`\`\`python
pd.crosstab(df["region"], df["grade"])
\`\`\`

---

### 18.2.5 5단계: 그룹별 비교

그룹별 비교는 EDA에서 매우 자주 사용됩니다.

예를 들어 다음과 같은 질문을 할 수 있습니다.

\`\`\`text
고객 등급별 평균 주문 금액은 다른가?
지역별 매출 차이가 있는가?
카테고리별 주문 수는 어떻게 다른가?
요일별 주문 패턴은 다른가?
\`\`\`

pandas에서는 \`groupby()\`를 사용합니다.

\`\`\`python
df.groupby("category")["total_price"].sum()
df.groupby("grade")["total_price"].mean()
\`\`\`

그룹별 비교를 할 때는 데이터 개수도 함께 확인해야 합니다.

\`\`\`python
df.groupby("grade")["order_id"].count()
\`\`\`

데이터 수가 너무 적은 그룹은 평균이나 비율을 일반화하기 어렵습니다.

---

### 18.2.6 6단계: 시간 흐름 분석

날짜 데이터가 있다면 시간 흐름을 확인해야 합니다.

\`\`\`python
df["order_date"] = pd.to_datetime(df["order_date"])
df["year_month"] = df["order_date"].dt.to_period("M")
\`\`\`

월별 매출을 계산할 수 있습니다.

\`\`\`python
monthly_sales = df.groupby("year_month")["total_price"].sum()
\`\`\`

선 그래프로 추이를 볼 수 있습니다.

\`\`\`python
monthly_sales.plot(kind="line")
\`\`\`

시간 흐름 분석에서는 다음을 확인합니다.

\`\`\`text
증가 추세가 있는가?
감소 추세가 있는가?
특정 시점에 급증 또는 급감이 있는가?
월별, 요일별, 분기별 패턴이 있는가?
\`\`\`

---

### 18.2.7 7단계: 패턴과 이상한 점 정리

EDA 과정에서 발견한 내용을 정리해야 합니다.

정리할 내용은 다음과 같습니다.

\`\`\`text
눈에 띄는 패턴
예상과 다른 결과
이상값 후보
결측치 문제
추가 확인이 필요한 컬럼
해석할 때 주의해야 할 점
\`\`\`

예를 들어 다음처럼 정리할 수 있습니다.

\`\`\`text
전자기기 카테고리의 매출 비중이 가장 높다.
VIP 고객의 평균 주문 금액이 일반 고객보다 높다.
3월 매출이 증가했는데 전자기기 매출 증가와 관련이 있을 수 있다.
일부 고객의 주문 금액이 매우 높아 평균에 영향을 줄 수 있다.
\`\`\`

---

### 18.2.8 8단계: 추가 분석 질문 도출

EDA의 마지막은 추가 질문을 만드는 것입니다.

EDA를 통해 다음 분석 방향을 정합니다.

\`\`\`text
3월 매출 증가는 어떤 상품 때문인가?
VIP 고객은 어떤 카테고리를 주로 구매하는가?
방문 횟수가 높은 고객은 재구매율도 높은가?
특정 지역에서 특정 카테고리 매출이 높은 이유는 무엇인가?
할인 여부가 주문 금액에 영향을 주는가?
\`\`\`

EDA는 분석의 끝이 아니라 더 깊은 분석으로 가는 출발점입니다.

---

## 18.3 예제 데이터 준비

이번 장에서는 쇼핑몰 주문 데이터를 사용해 EDA를 진행합니다.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [
        1001, 1002, 1003, 1004, 1005, 1006,
        1007, 1008, 1009, 1010, 1011, 1012,
        1013, 1014, 1015
    ],
    "customer_id": [
        1, 2, 3, 1, 4, 2,
        5, 6, 7, 8, 3, 5,
        9, 10, 2
    ],
    "customer_name": [
        "민수", "지영", "철수", "민수", "영희", "지영",
        "수진", "현우", "도윤", "서연", "철수", "수진",
        "하준", "유나", "지영"
    ],
    "region": [
        "서울", "부산", "서울", "서울", "대전", "부산",
        "부산", "서울", "대전", "서울", "서울", "부산",
        "대전", "서울", "부산"
    ],
    "grade": [
        "VIP", "일반", "일반", "VIP", "일반", "일반",
        "VIP", "일반", "일반", "VIP", "일반", "VIP",
        "일반", "VIP", "일반"
    ],
    "category": [
        "전자기기", "도서", "생활용품", "전자기기", "도서",
        "생활용품", "전자기기", "도서", "생활용품", "전자기기",
        "도서", "생활용품", "전자기기", "도서", "전자기기"
    ],
    "order_date": [
        "2026-01-03", "2026-01-05", "2026-01-10",
        "2026-02-02", "2026-02-14", "2026-03-01",
        "2026-03-15", "2026-03-20", "2026-03-22",
        "2026-04-01", "2026-04-05", "2026-04-08",
        "2026-04-15", "2026-04-20", "2026-04-25"
    ],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2, 1, 2, 1],
    "total_price": [
        300000, 45000, 50000, 220000, 35000,
        60000, 180000, 30000, 75000, 260000,
        54000, 40000, 350000, 42000, 280000
    ],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10, 8, 11, 5],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5, 4, 5, 4]
})

orders
\`\`\`

이 데이터는 작은 예제 데이터입니다.  
실무 데이터와 비교하면 행 수가 매우 적습니다.  
따라서 이 장에서 하는 해석은 “EDA 방법을 익히기 위한 예시”로 이해해야 합니다.

실제 분석에서는 더 많은 데이터와 더 긴 기간을 바탕으로 판단해야 합니다.

---

## 18.4 데이터 구조 확인

EDA의 첫 단계는 데이터 구조 확인입니다.

---

### 18.4.1 첫 행 확인

\`\`\`python
orders.head()
\`\`\`

\`head()\`는 데이터의 앞부분을 보여줍니다.

처음 데이터를 받으면 \`head()\`를 통해 다음을 확인합니다.

\`\`\`text
데이터가 제대로 불러와졌는가?
컬럼명이 예상과 맞는가?
값들이 어떤 형태로 들어 있는가?
숫자, 문자열, 날짜가 대략 어떻게 보이는가?
\`\`\`

---

### 18.4.2 행과 열 개수 확인

\`\`\`python
orders.shape
\`\`\`

예상 결과는 다음과 같습니다.

\`\`\`text
(15, 11)
\`\`\`

15행, 11열이라는 뜻입니다.

데이터 크기는 분석 신뢰도와 처리 방식에 영향을 줍니다.  
예제 데이터처럼 행 수가 적으면 패턴을 일반화하기 어렵습니다.

---

### 18.4.3 컬럼 확인

\`\`\`python
orders.columns
\`\`\`

컬럼 목록을 확인합니다.

\`\`\`text
order_id
customer_id
customer_name
region
grade
category
order_date
quantity
total_price
visit_count
satisfaction
\`\`\`

컬럼명을 보면 이 데이터로 어떤 분석을 할 수 있을지 감을 잡을 수 있습니다.

\`\`\`text
지역별 분석 가능
등급별 분석 가능
카테고리별 분석 가능
월별 분석 가능
주문 금액 분석 가능
방문 횟수와 주문 금액 관계 분석 가능
만족도 분석 가능
\`\`\`

---

### 18.4.4 자료형 확인

\`\`\`python
orders.info()
\`\`\`

\`order_date\`가 문자열로 들어와 있을 가능성이 큽니다.  
날짜 분석을 하려면 날짜형으로 변환해야 합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

변환 후 다시 자료형을 확인합니다.

\`\`\`python
orders.info()
\`\`\`

이제 \`order_date\`가 날짜형으로 변환되었습니다.

---

### 18.4.5 기본 통계 확인

\`\`\`python
orders.describe()
\`\`\`

수치형 컬럼의 기본 통계를 확인합니다.

EDA에서 \`describe()\`는 매우 중요한 출발점입니다.  
다음 값을 빠르게 확인할 수 있습니다.

\`\`\`text
평균
표준편차
최솟값
사분위수
최댓값
\`\`\`

특히 \`total_price\`, \`quantity\`, \`visit_count\`, \`satisfaction\`의 범위를 확인합니다.

---

## 18.5 데이터 품질 확인

데이터 구조를 확인한 뒤에는 데이터 품질을 점검합니다.

---

### 18.5.1 결측치 확인

\`\`\`python
orders.isna().sum()
\`\`\`

결측치가 있는 컬럼을 확인합니다.

결측치가 있다면 다음 질문을 해야 합니다.

\`\`\`text
결측치가 왜 생겼는가?
분석에서 제거해야 하는가?
다른 값으로 대체해야 하는가?
결측치 자체가 의미 있는가?
\`\`\`

이번 예제 데이터에는 결측치가 없다고 가정할 수 있습니다.  
하지만 실무에서는 결측치가 없는 경우보다 있는 경우가 훨씬 많습니다.

---

### 18.5.2 중복값 확인

전체 행 기준 중복을 확인합니다.

\`\`\`python
orders.duplicated().sum()
\`\`\`

주문 ID 기준 중복도 확인합니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

주문 데이터에서 \`order_id\`는 일반적으로 고유해야 합니다.  
중복이 있다면 같은 주문이 두 번 들어갔을 가능성이 있습니다.

---

### 18.5.3 수치형 컬럼 범위 확인

\`\`\`python
orders[["quantity", "total_price", "visit_count", "satisfaction"]].describe()
\`\`\`

각 컬럼의 최솟값과 최댓값을 확인합니다.

\`\`\`text
quantity가 0 이하인 값은 없는가?
total_price가 음수인 값은 없는가?
satisfaction이 1~5 범위를 벗어나지 않는가?
visit_count가 비정상적으로 큰 값은 없는가?
\`\`\`

예를 들어 만족도가 1~5점 척도라면 6이나 0이 있으면 이상한 값입니다.

---

### 18.5.4 범주형 값 확인

지역, 등급, 카테고리의 고유값을 확인합니다.

\`\`\`python
orders["region"].unique()
orders["grade"].unique()
orders["category"].unique()
\`\`\`

빈도도 확인합니다.

\`\`\`python
orders["region"].value_counts()
orders["grade"].value_counts()
orders["category"].value_counts()
\`\`\`

범주형 컬럼에서는 표기 불일치가 자주 발생합니다.

예를 들어 다음 값들은 모두 같은 지역을 의미할 수 있습니다.

\`\`\`text
서울
서울시
서울특별시
\`\`\`

이런 값이 섞여 있다면 문자열 표준화가 필요합니다.

---

### 18.5.5 날짜 범위 확인

주문일의 최소값과 최대값을 확인합니다.

\`\`\`python
orders["order_date"].min()
orders["order_date"].max()
\`\`\`

분석 기간을 파악할 수 있습니다.

\`\`\`text
이 데이터는 2026년 1월부터 2026년 4월까지의 주문 데이터이다.
\`\`\`

날짜 범위를 확인하면 분석 결과를 해석할 때 도움이 됩니다.

예를 들어 1년 데이터인지, 1개월 데이터인지에 따라 해석이 달라집니다.

---

## 18.6 분석 질문 만들기

EDA에서 중요한 것은 분석 질문을 만드는 것입니다.

질문이 없으면 어떤 기준으로 데이터를 확인해야 할지 정하기 어렵습니다.

---

### 18.6.1 좋은 분석 질문의 특징

좋은 분석 질문은 데이터로 확인할 수 있어야 합니다.

나쁜 질문:

\`\`\`text
고객은 왜 우리 쇼핑몰을 좋아할까?
\`\`\`

이 질문은 너무 넓고, 현재 데이터만으로 답하기 어렵습니다.

좋은 질문:

\`\`\`text
VIP 고객의 평균 주문 금액은 일반 고객보다 높은가?
카테고리별 매출 비중은 어떻게 다른가?
월별 매출은 증가하고 있는가?
방문 횟수와 주문 금액 사이에 관계가 있는가?
\`\`\`

이 질문들은 현재 데이터의 컬럼을 사용해 확인할 수 있습니다.

---

### 18.6.2 주문 데이터에서 만들 수 있는 질문

이번 예제 데이터에서는 다음 질문을 만들 수 있습니다.

\`\`\`text
전체 매출은 얼마인가?
평균 주문 금액은 얼마인가?
어떤 카테고리의 매출이 가장 높은가?
월별 매출은 어떻게 변하는가?
고객 등급별 평균 주문 금액은 다른가?
지역별 매출은 어떻게 다른가?
방문 횟수와 주문 금액 사이에 관계가 있는가?
만족도와 주문 금액 사이에 관계가 있는가?
\`\`\`

이 질문들을 하나씩 확인하면서 EDA를 진행하겠습니다.

---

### 18.6.3 질문을 코드로 바꾸는 연습

분석 질문은 코드로 바꿀 수 있어야 합니다.

| 분석 질문 | 필요한 코드 방향 |
|---|---|
| 전체 매출은 얼마인가? | \`total_price.sum()\` |
| 평균 주문 금액은 얼마인가? | \`total_price.mean()\` |
| 카테고리별 매출은? | \`groupby("category")\` |
| 월별 매출은? | \`order_date\`에서 연월 추출 후 groupby |
| 등급별 평균 주문 금액은? | \`groupby("grade")["total_price"].mean()\` |
| 방문 횟수와 주문 금액 관계는? | \`corr()\`, \`scatterplot()\` |

EDA는 질문과 코드를 연결하는 과정입니다.

---

## 18.7 단일 변수 분석

단일 변수 분석은 하나의 컬럼을 집중적으로 살펴보는 것입니다.

수치형 변수와 범주형 변수는 분석 방법이 다릅니다.

---

### 18.7.1 수치형 변수 분석: 주문 금액

주문 금액의 기본 통계를 확인합니다.

\`\`\`python
orders["total_price"].describe()
\`\`\`

평균과 중앙값을 비교합니다.

\`\`\`python
orders["total_price"].mean()
orders["total_price"].median()
\`\`\`

평균이 중앙값보다 크다면 일부 고가 주문이 평균을 끌어올리고 있을 수 있습니다.

히스토그램으로 분포를 확인합니다.

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

박스플롯으로 이상값 후보를 확인합니다.

\`\`\`python
sns.boxplot(
    data=orders,
    y="total_price"
)

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
주문 금액은 낮은 금액대에 많이 분포하고, 일부 고가 주문이 존재한다.
평균 주문 금액은 고가 주문의 영향을 받을 수 있으므로 중앙값도 함께 확인해야 한다.
\`\`\`

---

### 18.7.2 수치형 변수 분석: 방문 횟수

방문 횟수의 기본 통계를 확인합니다.

\`\`\`python
orders["visit_count"].describe()
\`\`\`

분포를 확인합니다.

\`\`\`python
plt.hist(orders["visit_count"], bins=5)

plt.title("방문 횟수 분포")
plt.xlabel("방문 횟수")
plt.ylabel("빈도")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
방문 횟수는 고객의 관심도나 활동성을 나타내는 지표로 볼 수 있다.
방문 횟수가 높은 고객이 실제로 높은 구매 금액을 보이는지는 두 변수 관계 분석에서 추가로 확인해야 한다.
\`\`\`

---

### 18.7.3 수치형 변수 분석: 만족도

만족도 점수의 분포를 확인합니다.

\`\`\`python
orders["satisfaction"].value_counts().sort_index()
\`\`\`

만족도는 숫자형이지만 1점부터 5점까지의 등급형 데이터로 볼 수 있습니다.  
따라서 평균뿐 아니라 점수별 빈도도 중요합니다.

\`\`\`python
satisfaction_count = orders["satisfaction"].value_counts().sort_index()

plt.bar(satisfaction_count.index, satisfaction_count.values)

plt.title("만족도 점수 분포")
plt.xlabel("만족도")
plt.ylabel("건수")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
만족도는 3점에서 5점 사이에 분포한다.
5점 비중이 높다면 전반적인 만족도가 높다고 볼 수 있지만, 데이터 수가 적으므로 일반화에는 주의해야 한다.
\`\`\`

---

### 18.7.4 범주형 변수 분석: 카테고리

카테고리별 주문 수를 확인합니다.

\`\`\`python
orders["category"].value_counts()
\`\`\`

비율도 확인합니다.

\`\`\`python
orders["category"].value_counts(normalize=True) * 100
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
category_count = orders["category"].value_counts()

plt.bar(category_count.index, category_count.values)

plt.title("카테고리별 주문 수")
plt.xlabel("카테고리")
plt.ylabel("주문 수")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
카테고리별 주문 수를 보면 어떤 카테고리의 주문이 많은지 확인할 수 있다.
다만 주문 수가 많다고 매출이 가장 높다는 뜻은 아니다.
단가가 높은 카테고리는 주문 수가 적어도 매출이 클 수 있다.
\`\`\`

---

### 18.7.5 범주형 변수 분석: 지역

지역별 주문 수를 확인합니다.

\`\`\`python
orders["region"].value_counts()
\`\`\`

지역별 비율을 계산합니다.

\`\`\`python
region_ratio = orders["region"].value_counts(normalize=True) * 100

region_ratio.round(1)
\`\`\`

해석 예시:

\`\`\`text
서울 지역 주문 수가 가장 많다.
하지만 지역별 고객 수나 마케팅 노출량을 함께 보지 않으면 지역 성과를 단정하기 어렵다.
\`\`\`

EDA에서는 결과를 단정하기보다 추가로 필요한 데이터를 함께 생각해야 합니다.

---

## 18.8 두 변수 관계 분석

두 변수 관계 분석은 변수 간 연결성을 확인하는 과정입니다.

---

### 18.8.1 수치형과 수치형: 방문 횟수와 주문 금액

방문 횟수와 주문 금액의 관계를 확인합니다.

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

산점도를 그립니다.

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

해석 예시:

\`\`\`text
방문 횟수가 높은 주문에서 주문 금액도 높은 경향이 있는지 확인할 수 있다.
하지만 상관관계는 인과관계를 의미하지 않는다.
방문 횟수가 높은 고객이 원래 구매 의향이 높은 고객일 수도 있다.
\`\`\`

---

### 18.8.2 수치형과 수치형: 만족도와 주문 금액

만족도와 주문 금액의 관계를 확인합니다.

\`\`\`python
orders["satisfaction"].corr(orders["total_price"])
\`\`\`

산점도를 그립니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="satisfaction",
    y="total_price"
)

plt.title("만족도와 주문 금액의 관계")
plt.xlabel("만족도")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

만족도는 1~5점의 제한된 값이므로 산점도에서 점이 겹칠 수 있습니다.  
이런 경우 등급별 평균 주문 금액을 함께 보는 것이 좋습니다.

\`\`\`python
orders.groupby("satisfaction")["total_price"].mean()
\`\`\`

---

### 18.8.3 범주형과 수치형: 고객 등급별 주문 금액

고객 등급별 평균 주문 금액을 계산합니다.

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        total_sales=("total_price", "sum")
    )
    .reset_index()
)

grade_summary
\`\`\`

박스플롯으로 분포를 비교합니다.

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

해석 예시:

\`\`\`text
VIP 고객의 주문 금액이 일반 고객보다 높게 나타날 수 있다.
다만 평균뿐 아니라 중앙값과 데이터 개수도 함께 확인해야 한다.
\`\`\`

---

### 18.8.4 범주형과 수치형: 카테고리별 매출

카테고리별 매출을 계산합니다.

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

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높다.
전자기기는 단가가 높아 주문 수가 많지 않아도 매출 기여도가 클 수 있다.
주문 건수와 평균 주문 금액을 함께 확인하면 매출 차이의 원인을 더 잘 이해할 수 있다.
\`\`\`

---

### 18.8.5 범주형과 범주형: 지역과 고객 등급

지역별 고객 등급 분포를 확인합니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

비율로도 확인합니다.

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio.round(1)
\`\`\`

해석 예시:

\`\`\`text
지역별로 VIP와 일반 고객의 비율이 다를 수 있다.
하지만 각 지역의 주문 수가 적다면 비율 해석에 주의해야 한다.
\`\`\`

범주형 변수의 관계를 해석할 때는 개수와 비율을 함께 봐야 합니다.

---

## 18.9 시간 흐름 분석

날짜 데이터가 있다면 시간 흐름을 분석할 수 있습니다.

---

### 18.9.1 월별 매출 분석

주문일에서 연월을 추출합니다.

\`\`\`python
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
\`\`\`

월별 매출을 계산합니다.

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_sales
\`\`\`

선 그래프로 표현합니다.

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
월별 매출 흐름을 보면 특정 월에 매출이 높거나 낮은지 확인할 수 있다.
매출 변화가 주문 건수 때문인지, 평균 주문 금액 때문인지 추가로 확인해야 한다.
\`\`\`

---

### 18.9.2 월별 주문 수 분석

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["order_count"])

plt.title("월별 주문 수 추이")
plt.xlabel("월")
plt.ylabel("주문 수")
plt.show()
\`\`\`

매출과 주문 수를 함께 비교하면 매출 변화의 원인을 더 잘 이해할 수 있습니다.

예를 들어 매출은 증가했지만 주문 수가 그대로라면 평균 주문 금액이 증가했을 가능성이 있습니다.

---

### 18.9.3 월별 카테고리 매출

월별 카테고리 매출을 계산합니다.

\`\`\`python
monthly_category_sales = (
    orders
    .groupby(["year_month", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_category_sales
\`\`\`

피벗 테이블로 바꿔봅니다.

\`\`\`python
monthly_category_pivot = monthly_category_sales.pivot(
    index="year_month",
    columns="category",
    values="total_sales"
).fillna(0)

monthly_category_pivot
\`\`\`

그래프로 표현합니다.

\`\`\`python
monthly_category_pivot.plot(kind="line")

plt.title("월별 카테고리 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
월별 매출 증가가 특정 카테고리의 증가 때문인지 확인할 수 있다.
전자기기 매출이 특정 월에 높다면 해당 월의 전체 매출 증가에 영향을 주었을 수 있다.
\`\`\`

---

### 18.9.4 요일별 주문 패턴

요일을 추출합니다.

\`\`\`python
orders["weekday"] = orders["order_date"].dt.day_name()
orders["weekday_num"] = orders["order_date"].dt.dayofweek
\`\`\`

요일별 주문 수를 계산합니다.

\`\`\`python
weekday_orders = (
    orders
    .groupby(["weekday_num", "weekday"])
    .agg(
        order_count=("order_id", "count"),
        total_sales=("total_price", "sum")
    )
    .reset_index()
    .sort_values("weekday_num")
)

weekday_orders
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(weekday_orders["weekday"], weekday_orders["order_count"])

plt.title("요일별 주문 수")
plt.xlabel("요일")
plt.ylabel("주문 수")
plt.xticks(rotation=45)
plt.show()
\`\`\`

해석할 때는 데이터 기간이 충분한지 확인해야 합니다.  
예제 데이터처럼 기간이 짧으면 요일별 패턴을 일반화하기 어렵습니다.

---

## 18.10 그룹별 비교 분석

EDA에서는 그룹별로 데이터를 비교하는 일이 많습니다.

---

### 18.10.1 지역별 매출 비교

\`\`\`python
region_sales = (
    orders
    .groupby("region")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(region_sales["region"], region_sales["total_sales"])

plt.title("지역별 매출")
plt.xlabel("지역")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
서울 지역 매출이 가장 높게 나타난다.
하지만 서울 주문 수가 많기 때문인지, 평균 주문 금액이 높기 때문인지는 추가로 확인해야 한다.
\`\`\`

---

### 18.10.2 고객 등급별 구매 패턴

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        avg_visit_count=("visit_count", "mean"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_summary
\`\`\`

해석 예시:

\`\`\`text
VIP 고객은 총매출과 평균 주문 금액이 높을 수 있다.
또한 방문 횟수와 만족도도 일반 고객보다 높게 나타날 수 있다.
하지만 고객 등급별 데이터 수가 충분한지 확인해야 한다.
\`\`\`

---

### 18.10.3 카테고리별 주문 수와 매출 비교

\`\`\`python
category_summary = (
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

category_summary
\`\`\`

매출과 주문 수를 비교합니다.

\`\`\`python
category_summary.plot(
    x="category",
    y=["total_sales", "order_count"],
    kind="bar"
)

plt.title("카테고리별 매출과 주문 수")
plt.xlabel("카테고리")
plt.ylabel("값")
plt.show()
\`\`\`

주의할 점은 매출과 주문 수의 단위가 다르다는 것입니다.  
같은 축에 그리면 해석이 어려울 수 있습니다.

따라서 보고서에서는 매출 그래프와 주문 수 그래프를 따로 그리거나, 표로 함께 보여주는 것이 더 적절할 수 있습니다.

---

## 18.11 EDA에서 가설 만들기

EDA 과정에서 발견한 패턴은 가설로 정리할 수 있습니다.

가설은 아직 증명된 결론이 아닙니다.  
추가 분석으로 확인해야 할 가능성입니다.

---

### 18.11.1 가설의 예

EDA 결과를 바탕으로 다음과 같은 가설을 만들 수 있습니다.

\`\`\`text
가설 1: 전자기기 카테고리가 전체 매출을 주도한다.
가설 2: VIP 고객의 평균 주문 금액은 일반 고객보다 높다.
가설 3: 방문 횟수가 많은 고객일수록 주문 금액이 높다.
가설 4: 4월 매출 증가는 전자기기 주문 증가와 관련이 있다.
가설 5: 서울 지역 매출이 높은 것은 주문 수가 많기 때문일 수 있다.
\`\`\`

이 가설들은 EDA에서 관찰한 패턴을 바탕으로 만든 것입니다.

---

### 18.11.2 좋은 가설의 특징

좋은 가설은 데이터로 확인할 수 있어야 합니다.

나쁜 가설:

\`\`\`text
고객은 전자기기를 좋아한다.
\`\`\`

이 문장은 너무 모호합니다.

좋은 가설:

\`\`\`text
전자기기 카테고리의 평균 주문 금액은 다른 카테고리보다 높다.
\`\`\`

이 가설은 데이터로 확인할 수 있습니다.

\`\`\`python
orders.groupby("category")["total_price"].mean()
\`\`\`

또 다른 예입니다.

나쁜 가설:

\`\`\`text
VIP 고객은 더 충성도가 높다.
\`\`\`

좋은 가설:

\`\`\`text
VIP 고객의 평균 방문 횟수는 일반 고객보다 높다.
\`\`\`

이 가설도 데이터로 확인할 수 있습니다.

\`\`\`python
orders.groupby("grade")["visit_count"].mean()
\`\`\`

---

### 18.11.3 가설은 결론이 아니다

EDA에서 만든 가설은 결론이 아닙니다.  
단지 “그럴 가능성이 있다”는 분석 방향입니다.

예를 들어 방문 횟수와 주문 금액 사이에 양의 상관관계가 있다고 해도 다음처럼 단정하면 안 됩니다.

\`\`\`text
방문 횟수가 주문 금액을 증가시킨다.
\`\`\`

대신 다음처럼 표현하는 것이 안전합니다.

\`\`\`text
방문 횟수가 많은 고객일수록 주문 금액이 높은 경향이 관찰된다.
다만 인과관계를 확인하려면 추가 분석이 필요하다.
\`\`\`

EDA 결과는 조심스럽게 표현해야 합니다.

---

## 18.12 EDA 결과 정리

EDA는 여러 결과를 확인하는 과정이지만, 마지막에는 정리가 필요합니다.

---

### 18.12.1 EDA 결과 정리 항목

EDA 결과는 다음 항목으로 정리할 수 있습니다.

\`\`\`text
1. 데이터 개요
2. 데이터 품질 이슈
3. 주요 통계 요약
4. 주요 패턴
5. 이상값 또는 특이점
6. 추가 분석 질문
7. 분석 한계
\`\`\`

각 항목을 간단히 설명해보겠습니다.

---

### 18.12.2 데이터 개요

데이터 개요에는 데이터 크기와 기간, 주요 컬럼을 정리합니다.

예시:

\`\`\`text
분석 데이터는 2026년 1월부터 4월까지의 쇼핑몰 주문 데이터이다.
총 15건의 주문과 11개 컬럼으로 구성되어 있다.
주요 컬럼은 주문일, 고객 지역, 고객 등급, 상품 카테고리, 주문 금액, 방문 횟수, 만족도이다.
\`\`\`

---

### 18.12.3 데이터 품질 이슈

결측치, 중복값, 이상값, 자료형 문제를 정리합니다.

예시:

\`\`\`text
주문 ID 기준 중복값은 발견되지 않았다.
주요 컬럼의 결측치는 발견되지 않았다.
주문일은 문자열에서 날짜형으로 변환했다.
주문 금액에는 일부 고가 주문이 있어 평균 해석 시 중앙값도 함께 확인했다.
\`\`\`

---

### 18.12.4 주요 통계 요약

수치형 변수의 주요 통계값을 정리합니다.

예시:

\`\`\`text
평균 주문 금액은 중앙값보다 높게 나타나 일부 고가 주문이 평균을 끌어올릴 가능성이 있다.
방문 횟수는 고객별 활동성을 나타내는 지표로 사용했다.
만족도는 3점에서 5점 사이에 분포한다.
\`\`\`

---

### 18.12.5 주요 패턴

EDA에서 발견한 주요 패턴을 정리합니다.

예시:

\`\`\`text
전자기기 카테고리의 매출 비중이 가장 높다.
VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타난다.
서울 지역 매출이 다른 지역보다 높게 나타난다.
월별 매출은 4월에 상대적으로 높다.
방문 횟수와 주문 금액 사이에는 양의 관계가 관찰될 수 있다.
\`\`\`

---

### 18.12.6 이상값 또는 특이점

이상값 후보나 해석에 주의해야 할 점을 정리합니다.

예시:

\`\`\`text
일부 고가 주문이 평균 주문 금액에 영향을 줄 수 있다.
예제 데이터의 행 수가 적어 지역별, 요일별 패턴을 일반화하기 어렵다.
특정 월의 매출 증가는 주문 수 증가인지 평균 주문 금액 증가인지 추가 확인이 필요하다.
\`\`\`

---

### 18.12.7 추가 분석 질문

EDA 결과를 바탕으로 다음 분석 질문을 만듭니다.

예시:

\`\`\`text
전자기기 매출이 높은 이유는 주문 수 때문인가, 평균 주문 금액 때문인가?
VIP 고객은 어떤 카테고리를 주로 구매하는가?
방문 횟수가 높은 고객은 재구매율도 높은가?
4월 매출 증가는 특정 상품이나 고객 등급과 관련이 있는가?
지역별 매출 차이는 고객 수 차이 때문인가, 평균 주문 금액 차이 때문인가?
\`\`\`

---

### 18.12.8 분석 한계

분석 한계도 반드시 정리해야 합니다.

예시:

\`\`\`text
예제 데이터의 행 수가 적어 결과를 일반화하기 어렵다.
분석 기간이 4개월로 짧아 계절성이나 장기 추세를 판단하기 어렵다.
광고비, 할인 여부, 유입 경로 같은 외부 요인이 포함되어 있지 않다.
상관관계는 인과관계를 의미하지 않는다.
\`\`\`

분석 한계를 적는 것은 약점이 아니라 신뢰도를 높이는 과정입니다.  
어떤 조건에서 나온 결과인지 명확히 해야 분석이 더 정확해집니다.

---

## 18.13 실무 미니 프로젝트: 쇼핑몰 주문 데이터 EDA

이번 장에서 배운 내용을 하나의 프로젝트 흐름으로 정리해보겠습니다.

프로젝트 목표는 다음과 같습니다.

\`\`\`text
쇼핑몰 주문 데이터를 탐색해 매출 구조, 고객 특성, 카테고리별 성과, 시간 흐름을 파악한다.
\`\`\`

---

### 18.13.1 데이터 준비

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [
        1001, 1002, 1003, 1004, 1005, 1006,
        1007, 1008, 1009, 1010, 1011, 1012,
        1013, 1014, 1015
    ],
    "customer_id": [
        1, 2, 3, 1, 4, 2,
        5, 6, 7, 8, 3, 5,
        9, 10, 2
    ],
    "customer_name": [
        "민수", "지영", "철수", "민수", "영희", "지영",
        "수진", "현우", "도윤", "서연", "철수", "수진",
        "하준", "유나", "지영"
    ],
    "region": [
        "서울", "부산", "서울", "서울", "대전", "부산",
        "부산", "서울", "대전", "서울", "서울", "부산",
        "대전", "서울", "부산"
    ],
    "grade": [
        "VIP", "일반", "일반", "VIP", "일반", "일반",
        "VIP", "일반", "일반", "VIP", "일반", "VIP",
        "일반", "VIP", "일반"
    ],
    "category": [
        "전자기기", "도서", "생활용품", "전자기기", "도서",
        "생활용품", "전자기기", "도서", "생활용품", "전자기기",
        "도서", "생활용품", "전자기기", "도서", "전자기기"
    ],
    "order_date": [
        "2026-01-03", "2026-01-05", "2026-01-10",
        "2026-02-02", "2026-02-14", "2026-03-01",
        "2026-03-15", "2026-03-20", "2026-03-22",
        "2026-04-01", "2026-04-05", "2026-04-08",
        "2026-04-15", "2026-04-20", "2026-04-25"
    ],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2, 1, 2, 1],
    "total_price": [
        300000, 45000, 50000, 220000, 35000,
        60000, 180000, 30000, 75000, 260000,
        54000, 40000, 350000, 42000, 280000
    ],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10, 8, 11, 5],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5, 4, 5, 4]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date"].dt.day_name()

orders
\`\`\`

---

### 18.13.2 1단계: 데이터 개요 확인

\`\`\`python
orders.head()
orders.shape
orders.info()
orders.describe()
\`\`\`

데이터 개요를 정리합니다.

\`\`\`python
overview = {
    "행 수": len(orders),
    "열 수": orders.shape[1],
    "시작일": orders["order_date"].min(),
    "종료일": orders["order_date"].max(),
    "총매출": orders["total_price"].sum(),
    "평균 주문 금액": orders["total_price"].mean(),
    "고유 고객 수": orders["customer_id"].nunique()
}

overview
\`\`\`

---

### 18.13.3 2단계: 데이터 품질 점검

결측치 확인:

\`\`\`python
missing_summary = orders.isna().sum()

missing_summary
\`\`\`

중복값 확인:

\`\`\`python
duplicate_count = orders.duplicated(subset=["order_id"]).sum()

duplicate_count
\`\`\`

범주형 값 확인:

\`\`\`python
orders["region"].value_counts()
orders["grade"].value_counts()
orders["category"].value_counts()
\`\`\`

수치형 범위 확인:

\`\`\`python
orders[["quantity", "total_price", "visit_count", "satisfaction"]].describe()
\`\`\`

---

### 18.13.4 3단계: 전체 매출 구조 확인

전체 매출과 평균 주문 금액을 확인합니다.

\`\`\`python
total_sales = orders["total_price"].sum()
avg_order_price = orders["total_price"].mean()
median_order_price = orders["total_price"].median()

total_sales, avg_order_price, median_order_price
\`\`\`

주문 금액 분포를 확인합니다.

\`\`\`python
plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

박스플롯도 확인합니다.

\`\`\`python
sns.boxplot(data=orders, y="total_price")

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

---

### 18.13.5 4단계: 카테고리별 성과 분석

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_summary
\`\`\`

그래프로 표현합니다.

\`\`\`python
plt.bar(category_summary["category"], category_summary["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높다.
전자기기는 평균 주문 금액도 높을 가능성이 있으므로 주문 건수와 평균 주문 금액을 함께 확인해야 한다.
\`\`\`

---

### 18.13.6 5단계: 고객 등급별 분석

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_price=("total_price", "mean"),
        median_order_price=("total_price", "median"),
        avg_visit_count=("visit_count", "mean"),
        avg_satisfaction=("satisfaction", "mean")
    )
    .reset_index()
)

grade_summary
\`\`\`

박스플롯으로 주문 금액 분포를 비교합니다.

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

해석 예시:

\`\`\`text
VIP 고객의 평균 주문 금액과 방문 횟수가 일반 고객보다 높게 나타날 수 있다.
다만 등급별 주문 건수와 고유 고객 수를 함께 확인해야 한다.
\`\`\`

---

### 18.13.7 6단계: 지역별 분석

\`\`\`python
region_summary = (
    orders
    .groupby("region")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

region_summary
\`\`\`

막대 그래프로 표현합니다.

\`\`\`python
plt.bar(region_summary["region"], region_summary["total_sales"])

plt.title("지역별 매출")
plt.xlabel("지역")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
서울 지역 매출이 가장 높게 나타난다.
그러나 서울 주문 수가 많기 때문인지, 평균 주문 금액이 높기 때문인지 추가 확인이 필요하다.
\`\`\`

---

### 18.13.8 7단계: 월별 매출 흐름 분석

\`\`\`python
monthly_summary = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_summary
\`\`\`

선 그래프로 표현합니다.

\`\`\`python
plt.plot(monthly_summary["year_month"], monthly_summary["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

해석 예시:

\`\`\`text
월별 매출 흐름에서 특정 월의 매출 증가가 관찰된다면,
그 원인이 주문 수 증가인지 평균 주문 금액 증가인지 함께 확인해야 한다.
\`\`\`

---

### 18.13.9 8단계: 방문 횟수와 주문 금액 관계

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

산점도를 그립니다.

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

해석 예시:

\`\`\`text
방문 횟수가 높은 고객일수록 주문 금액이 높은 경향이 있을 수 있다.
하지만 이것은 인과관계가 아니며, VIP 등급 같은 다른 요인이 함께 작용했을 수 있다.
\`\`\`

---

### 18.13.10 9단계: 상관관계 확인

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

해석 예시:

\`\`\`text
상관관계가 높은 변수 쌍은 추가 분석 후보가 될 수 있다.
하지만 상관관계는 인과관계를 의미하지 않으므로 해석에 주의해야 한다.
\`\`\`

---

### 18.13.11 10단계: EDA 요약 작성

EDA 결과를 문장으로 정리합니다.

\`\`\`text
데이터 개요
- 분석 데이터는 2026년 1월부터 4월까지의 쇼핑몰 주문 데이터이다.
- 총 15건의 주문과 10명의 고객이 포함되어 있다.

데이터 품질
- 주요 컬럼에서 결측치는 발견되지 않았다.
- order_id 기준 중복 주문은 발견되지 않았다.
- order_date는 날짜형으로 변환했다.

주요 패턴
- 전자기기 카테고리의 매출이 가장 높게 나타난다.
- VIP 고객의 평균 주문 금액과 방문 횟수가 일반 고객보다 높게 나타날 수 있다.
- 서울 지역 매출이 가장 높지만, 주문 수와 고객 수를 함께 고려해야 한다.
- 월별 매출은 특정 월에 높아지는 흐름이 관찰된다.
- 방문 횟수와 주문 금액 사이에 양의 관계가 있을 수 있다.

추가 분석 질문
- 전자기기 매출이 높은 이유는 주문 수 때문인가, 평균 주문 금액 때문인가?
- VIP 고객은 어떤 카테고리를 주로 구매하는가?
- 방문 횟수가 높은 고객은 재구매 가능성도 높은가?
- 서울 지역 매출이 높은 이유는 고객 수 때문인가, 평균 주문 금액 때문인가?

분석 한계
- 예제 데이터의 행 수가 적어 결과를 일반화하기 어렵다.
- 할인 여부, 광고비, 유입 경로 같은 외부 요인이 포함되어 있지 않다.
- 상관관계는 인과관계를 의미하지 않는다.
\`\`\`

---

## 18.14 EDA 시 자주 하는 실수

EDA는 자유도가 높은 작업이기 때문에 실수도 많이 발생합니다.

---

### 18.14.1 질문 없이 그래프만 많이 그리는 실수

EDA는 그래프를 많이 그리는 작업이 아닙니다.  
분석 질문을 바탕으로 그래프를 그려야 합니다.

나쁜 접근:

\`\`\`text
일단 그래프를 전부 그려본다.
\`\`\`

좋은 접근:

\`\`\`text
카테고리별 매출 차이를 확인하고 싶다.
→ 카테고리별 매출 집계
→ 막대 그래프
\`\`\`

그래프는 질문에 답하기 위한 도구입니다.

---

### 18.14.2 데이터 품질을 확인하지 않고 분석하는 실수

결측치, 중복값, 이상값을 확인하지 않고 그룹화나 시각화를 하면 잘못된 결과가 나올 수 있습니다.

\`\`\`python
df.isna().sum()
df.duplicated().sum()
df.describe()
\`\`\`

EDA 초반에는 반드시 데이터 품질을 점검해야 합니다.

---

### 18.14.3 평균만 보고 결론 내리는 실수

평균은 이상값의 영향을 크게 받습니다.  
주문 금액처럼 치우친 데이터에서는 중앙값도 함께 확인해야 합니다.

\`\`\`python
df["total_price"].mean()
df["total_price"].median()
\`\`\`

박스플롯과 히스토그램도 함께 보는 것이 좋습니다.

---

### 18.14.4 데이터 개수를 확인하지 않는 실수

그룹별 평균이나 비율을 볼 때는 그룹별 데이터 개수를 확인해야 합니다.

\`\`\`python
df.groupby("grade")["order_id"].count()
\`\`\`

데이터 수가 너무 적은 그룹의 평균은 신뢰하기 어렵습니다.

---

### 18.14.5 상관관계를 인과관계로 해석하는 실수

산점도나 상관계수에서 관계가 보여도 원인을 단정하면 안 됩니다.

\`\`\`text
방문 횟수와 주문 금액이 함께 증가한다.
\`\`\`

이 결과는 방문 횟수가 주문 금액을 증가시킨다는 뜻이 아닙니다.  
다른 요인이 영향을 주었을 수 있습니다.

---

### 18.14.6 예제 데이터 결과를 일반화하는 실수

수업용 예제 데이터는 행 수가 적습니다.  
따라서 결과 해석은 학습용으로만 이해해야 합니다.

실제 의사결정을 위해서는 충분한 기간과 충분한 표본 수가 필요합니다.

---

### 18.14.7 EDA 결과를 정리하지 않는 실수

EDA를 하면서 여러 결과를 확인했지만 정리하지 않으면 나중에 흐름을 잃어버립니다.

EDA 후에는 반드시 다음을 정리해야 합니다.

\`\`\`text
무엇을 확인했는가?
어떤 패턴을 발견했는가?
어떤 점이 이상했는가?
어떤 추가 분석이 필요한가?
분석 한계는 무엇인가?
\`\`\`

---

## 18.15 EDA 체크리스트

EDA를 할 때 아래 체크리스트를 활용할 수 있습니다.

---

### 18.15.1 데이터 구조 체크리스트

\`\`\`text
□ 데이터의 행과 열 개수를 확인했는가?
□ 컬럼명을 확인했는가?
□ 각 컬럼의 의미를 이해했는가?
□ 자료형을 확인했는가?
□ 날짜 컬럼을 날짜형으로 변환했는가?
□ 숫자형이어야 할 컬럼이 문자열로 들어오지 않았는가?
\`\`\`

---

### 18.15.2 데이터 품질 체크리스트

\`\`\`text
□ 결측치를 확인했는가?
□ 중복값을 확인했는가?
□ ID 컬럼의 중복 여부를 확인했는가?
□ 수치형 컬럼의 최솟값과 최댓값을 확인했는가?
□ 이상값 후보를 확인했는가?
□ 범주형 값의 표기 불일치를 확인했는가?
□ 날짜 범위를 확인했는가?
\`\`\`

---

### 18.15.3 단일 변수 분석 체크리스트

\`\`\`text
□ 수치형 변수의 평균과 중앙값을 확인했는가?
□ 수치형 변수의 최솟값과 최댓값을 확인했는가?
□ 수치형 변수의 분포를 확인했는가?
□ 범주형 변수의 빈도와 비율을 확인했는가?
□ 희귀 범주나 이상한 범주를 확인했는가?
\`\`\`

---

### 18.15.4 관계 분석 체크리스트

\`\`\`text
□ 수치형 변수 간 상관관계를 확인했는가?
□ 산점도로 관계를 확인했는가?
□ 범주형 변수별 수치형 변수 차이를 확인했는가?
□ 그룹별 평균과 중앙값을 함께 확인했는가?
□ 범주형 변수 간 교차표를 확인했는가?
\`\`\`

---

### 18.15.5 시각화 체크리스트

\`\`\`text
□ 분석 질문에 맞는 그래프를 선택했는가?
□ 그래프 제목을 작성했는가?
□ 축 이름과 단위를 표시했는가?
□ 범주형 그래프를 정렬했는가?
□ 그래프만 보고 원인을 단정하지 않았는가?
□ 표와 그래프를 함께 확인했는가?
\`\`\`

---

### 18.15.6 결과 정리 체크리스트

\`\`\`text
□ 주요 패턴을 문장으로 정리했는가?
□ 이상한 점을 정리했는가?
□ 추가 분석 질문을 만들었는가?
□ 분석 한계를 적었는가?
□ 최종 보고서에 넣을 결과와 제외할 결과를 구분했는가?
\`\`\`

---

## 18.16 핵심 정리

이번 장에서는 탐색적 데이터 분석, EDA의 개념과 기본 흐름을 배웠습니다.

EDA는 데이터를 본격적으로 분석하거나 보고하기 전에 데이터를 이해하기 위한 과정입니다.

EDA의 목적은 정답을 바로 내리는 것이 아니라, 데이터를 관찰하고 패턴을 발견하며 추가 분석 질문을 만드는 것입니다.

EDA의 기본 흐름은 다음과 같습니다.

\`\`\`text
1. 데이터 구조 확인
2. 데이터 품질 확인
3. 단일 변수 분석
4. 두 변수 관계 분석
5. 그룹별 비교
6. 시간 흐름 분석
7. 패턴과 이상한 점 정리
8. 추가 분석 질문 도출
\`\`\`

데이터 구조 확인에는 다음 메서드를 사용합니다.

\`\`\`python
df.head()
df.shape
df.info()
df.describe()
\`\`\`

데이터 품질 확인에는 다음 메서드를 사용합니다.

\`\`\`python
df.isna().sum()
df.duplicated().sum()
df.value_counts()
\`\`\`

수치형 변수는 평균, 중앙값, 표준편차, 분포를 확인합니다.

\`\`\`python
df["col"].describe()
df["col"].mean()
df["col"].median()
\`\`\`

범주형 변수는 빈도와 비율을 확인합니다.

\`\`\`python
df["category"].value_counts()
df["category"].value_counts(normalize=True)
\`\`\`

변수 간 관계는 그룹화, 상관계수, 산점도, 박스플롯, 교차표로 확인합니다.

\`\`\`python
df.groupby("group")["value"].mean()
df[["x", "y"]].corr()
sns.scatterplot(data=df, x="x", y="y")
sns.boxplot(data=df, x="group", y="value")
pd.crosstab(df["a"], df["b"])
\`\`\`

EDA 결과는 반드시 문장으로 정리해야 합니다.

\`\`\`text
무엇을 발견했는가?
어떤 점이 이상한가?
무엇을 추가로 확인해야 하는가?
이 분석의 한계는 무엇인가?
\`\`\`

EDA는 데이터 분석의 중심 과정입니다.  
지금까지 배운 전처리, 집계, 통계, 시각화는 모두 EDA 안에서 연결되어 사용됩니다.

---

## 18.17 연습문제

### 문제 1. 개념 확인

EDA에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 데이터를 무조건 시각화하는 작업이다.  
B. 데이터를 탐색하며 구조, 품질, 패턴, 관계를 이해하는 과정이다.  
C. 머신러닝 모델을 만드는 과정이다.  
D. 결측치를 0으로 채우는 과정이다.

---

### 문제 2. 개념 확인

EDA 초반에 가장 먼저 확인해야 할 내용으로 적절하지 않은 것은 무엇인가요?

A. 데이터의 행과 열 개수  
B. 컬럼명과 자료형  
C. 결측치와 중복값  
D. 최종 사업 전략 확정  

---

### 문제 3. 코드 작성

다음 데이터에서 행과 열 개수, 자료형, 기본 통계를 확인하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "category": ["A", "B", "A"],
    "sales": [100, 200, 300]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 데이터에서 결측치 개수와 중복 행 개수를 확인하세요.

\`\`\`python
df = pd.DataFrame({
    "id": [1, 2, 2, 3],
    "name": ["민수", "지영", "지영", None],
    "sales": [10000, 20000, 20000, 30000]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 주문 데이터에서 카테고리별 총매출을 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "category": ["전자기기", "도서", "전자기기", "생활용품"],
    "total_price": [300000, 20000, 250000, 50000]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 고객 등급별 평균 주문 금액을 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "grade": ["VIP", "일반", "VIP", "일반"],
    "total_price": [300000, 50000, 250000, 40000]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 방문 횟수와 주문 금액의 상관계수를 계산하고 산점도를 그리세요.

\`\`\`python
orders = pd.DataFrame({
    "visit_count": [1, 2, 3, 4, 5],
    "total_price": [10000, 20000, 30000, 50000, 70000]
})
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 월별 매출 합계를 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-20"],
    "total_price": [10000, 20000, 30000, 40000]
})
\`\`\`

---

### 문제 9. 개념 확인

EDA 결과를 정리할 때 포함하면 좋은 항목을 4가지 이상 적으세요.

---

### 문제 10. 실무형 문제

다음 주문 데이터에 대해 간단한 EDA를 수행하세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- 데이터 구조를 확인한다.
- 결측치와 중복값을 확인한다.
- 카테고리별 매출을 계산한다.
- 고객 등급별 평균 주문 금액을 계산한다.
- 월별 매출을 계산한다.
- 방문 횟수와 주문 금액의 관계를 산점도로 확인한다.
- 발견한 패턴을 2문장 이상으로 정리한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5, 6],
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-20", "2026-03-05", "2026-03-25"],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "전자기기"],
    "grade": ["VIP", "일반", "VIP", "일반", "일반", "VIP"],
    "visit_count": [10, 3, 8, 4, 5, 12],
    "total_price": [300000, 20000, 250000, 50000, 30000, 280000]
})
\`\`\`

---

## 18.18 정답 및 해설

### 문제 1 정답

정답: B

EDA는 데이터를 탐색하며 구조, 품질, 패턴, 관계를 이해하는 과정입니다.  
그래프를 그리는 것도 EDA의 일부이지만, EDA가 시각화만 의미하는 것은 아닙니다.

---

### 문제 2 정답

정답: D

EDA 초반에는 데이터 구조, 자료형, 결측치, 중복값 등을 확인합니다.  
최종 사업 전략은 EDA 이후 더 많은 분석과 논의를 거쳐 결정해야 합니다.

---

### 문제 3 정답

\`\`\`python
df.shape
df.info()
df.describe()
\`\`\`

추가로 앞부분 데이터를 확인하려면 다음을 사용할 수 있습니다.

\`\`\`python
df.head()
\`\`\`

---

### 문제 4 정답

\`\`\`python
df.isna().sum()
df.duplicated().sum()
\`\`\`

특정 ID 기준 중복을 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
df.duplicated(subset=["id"]).sum()
\`\`\`

---

### 문제 5 정답

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

category_sales
\`\`\`

---

### 문제 6 정답

\`\`\`python
grade_avg = (
    orders
    .groupby("grade")["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
)

grade_avg
\`\`\`

---

### 문제 7 정답

상관계수:

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

산점도:

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
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")

monthly_sales = (
    orders
    .groupby("year_month")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_sales
\`\`\`

---

### 문제 9 정답

EDA 결과 정리에는 다음 항목을 포함할 수 있습니다.

\`\`\`text
데이터 개요
데이터 품질 이슈
주요 통계 요약
주요 패턴
이상값 또는 특이점
추가 분석 질문
분석 한계
\`\`\`

---

### 문제 10 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")
\`\`\`

데이터 구조 확인:

\`\`\`python
orders.head()
orders.shape
orders.info()
orders.describe()
\`\`\`

결측치와 중복값 확인:

\`\`\`python
orders.isna().sum()
orders.duplicated().sum()
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

카테고리별 매출:

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

고객 등급별 평균 주문 금액:

\`\`\`python
grade_avg = (
    orders
    .groupby("grade")["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
)

grade_avg
\`\`\`

월별 매출:

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_sales
\`\`\`

방문 횟수와 주문 금액 산점도:

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

해석 예시:

\`\`\`text
전자기기 카테고리의 매출이 가장 높게 나타나며, 전체 매출에 큰 영향을 주는 것으로 보인다.
VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타날 수 있다.
방문 횟수가 높은 고객의 주문 금액이 높은 경향이 있는지 산점도로 추가 확인할 수 있다.
다만 데이터 수가 적으므로 결과를 일반화하기에는 한계가 있다.
\`\`\`

---

## 18.19 다음 장 예고

이번 장에서는 탐색적 데이터 분석, EDA를 배웠습니다.

다음 장에서는 **분석 결과 정리**를 배웁니다.

EDA에서는 많은 표와 그래프를 만들고 다양한 질문을 확인합니다.  
하지만 최종 보고서나 발표 자료에는 모든 과정을 그대로 넣지 않습니다.

분석 결과를 전달하려면 다음을 정리해야 합니다.

\`\`\`text
분석 목적
데이터 설명
전처리 내용
핵심 결과
시각화
해석
인사이트
한계
다음 분석 방향
\`\`\`

다음 장에서는 분석 결과를 어떻게 표와 그래프로 정리하고, 인사이트 문장으로 표현하며, 보고서 구조로 구성하는지 배웁니다.

EDA가 데이터를 탐색하는 과정이라면, 분석 결과 정리는 탐색을 통해 얻은 내용을 다른 사람이 이해할 수 있는 형태로 전달하는 과정입니다.

---

## 참고 문서

- pandas 공식 문서: Getting started tutorials
- pandas 공식 문서: Essential basic functionality
- pandas 공식 문서: Descriptive statistics
- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: Chart visualization
- seaborn 공식 문서: Tutorial
- matplotlib 공식 문서: Pyplot tutorial
`;export{e as default};