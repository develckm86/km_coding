var e=`# 14장. 그룹화와 집계

## 14.0 들어가며

데이터 분석에서 자주 묻는 질문은 대부분 “무엇별로?”라는 기준을 포함합니다.

예를 들어 다음 질문을 보겠습니다.

\`\`\`text
월별 매출은 얼마인가?
카테고리별 평균 주문 금액은 얼마인가?
지역별 고객 수는 몇 명인가?
고객 등급별 구매 금액은 어떻게 다른가?
요일별 주문 건수는 몇 건인가?
상품 카테고리별 주문 수와 총 매출은 얼마인가?
\`\`\`

이 질문들은 모두 데이터를 어떤 기준으로 나누어 계산해야 합니다.

\`\`\`text
월별
카테고리별
지역별
고객 등급별
요일별
\`\`\`

이처럼 데이터를 특정 기준으로 묶은 뒤, 그룹마다 합계나 평균 같은 값을 계산하는 작업을 **그룹화와 집계**라고 합니다.

pandas에서는 \`groupby()\`를 사용해 데이터를 그룹화하고, \`sum()\`, \`mean()\`, \`count()\` 같은 집계 함수를 사용해 그룹별 결과를 계산합니다.

\`\`\`python
df.groupby("category")["sales"].sum()
\`\`\`

이 코드는 대략 다음 의미입니다.

\`\`\`text
category별로 데이터를 묶고,
각 category 그룹의 sales 합계를 계산한다.
\`\`\`

그룹화와 집계는 데이터 분석에서 가장 중요한 기술 중 하나입니다.  
결측치, 중복값, 문자열, 날짜 데이터를 정리한 뒤에는 보통 그룹화와 집계를 통해 데이터를 요약합니다.

이번 장에서는 pandas의 \`groupby()\`, \`agg()\`, \`pivot_table()\`, \`crosstab()\`을 배웁니다.  
이 장을 마치면 데이터를 기준별로 묶고, 요약표를 만들고, 분석 보고서의 핵심 표를 직접 만들 수 있습니다.

---

## 14.1 그룹화란?

그룹화는 데이터를 특정 기준에 따라 나누는 작업입니다.

예를 들어 주문 데이터가 있다고 해봅시다.

\`\`\`text
주문 1: 전자기기, 300000원
주문 2: 도서, 45000원
주문 3: 전자기기, 180000원
주문 4: 생활용품, 50000원
\`\`\`

이 데이터를 카테고리별로 그룹화하면 다음과 같이 나뉩니다.

\`\`\`text
전자기기 그룹: 300000원, 180000원
도서 그룹: 45000원
생활용품 그룹: 50000원
\`\`\`

그다음 각 그룹의 합계를 계산하면 카테고리별 매출이 됩니다.

\`\`\`text
전자기기: 480000원
도서: 45000원
생활용품: 50000원
\`\`\`

이 과정이 그룹화와 집계입니다.

---

### 14.1.1 split-apply-combine

그룹화는 보통 세 단계로 이해할 수 있습니다.

\`\`\`text
1. split: 데이터를 기준별로 나눈다.
2. apply: 각 그룹에 계산을 적용한다.
3. combine: 계산 결과를 하나의 결과로 합친다.
\`\`\`

예를 들어 카테고리별 매출 합계를 구하는 과정은 다음과 같습니다.

\`\`\`text
split   → category별로 데이터 나누기
apply   → 각 category에서 total_price 합계 계산
combine → category별 합계 결과를 하나의 표로 만들기
\`\`\`

pandas에서는 이 전체 흐름을 \`groupby()\`와 집계 함수로 처리합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

처음에는 코드가 짧아 보여서 내부 동작이 잘 보이지 않을 수 있습니다.  
하지만 위 코드는 데이터를 그룹으로 나누고, 각 그룹마다 합계를 계산한 뒤, 결과를 다시 합치는 작업을 수행합니다.

---

### 14.1.2 그룹화가 필요한 분석 질문

그룹화는 다음과 같은 질문에 답할 때 사용합니다.

| 분석 질문 | 그룹화 기준 | 계산할 값 |
|---|---|---|
| 카테고리별 매출은? | \`category\` | \`total_price\` 합계 |
| 지역별 고객 수는? | \`region\` | 고객 수 |
| 월별 주문 건수는? | \`year_month\` | 주문 수 |
| 고객 등급별 평균 구매 금액은? | \`grade\` | \`total_price\` 평균 |
| 요일별 매출은? | \`weekday\` | \`total_price\` 합계 |
| 상품별 판매 수량은? | \`product_name\` | \`quantity\` 합계 |

그룹화할 때는 먼저 분석 질문을 명확히 해야 합니다.

\`\`\`text
무엇을 기준으로 묶을 것인가?
어떤 값을 계산할 것인가?
어떤 집계 함수를 사용할 것인가?
\`\`\`

이 세 가지를 정하면 \`groupby()\` 코드를 작성하기 쉬워집니다.

---

## 14.2 예제 데이터 준비

이번 장에서는 주문 데이터를 사용합니다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "customer": ["민수", "지영", "철수", "민수", "영희", "지영", "수진", "현우", "도윤", "서연", "철수", "수진"],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")
orders["weekday"] = orders["order_date"].dt.day_name()

orders
\`\`\`

이 데이터에는 다음 컬럼이 있습니다.

| 컬럼 | 의미 |
|---|---|
| \`order_id\` | 주문 ID |
| \`customer_id\` | 고객 ID |
| \`customer\` | 고객명 |
| \`region\` | 지역 |
| \`grade\` | 고객 등급 |
| \`category\` | 상품 카테고리 |
| \`order_date\` | 주문일 |
| \`quantity\` | 주문 수량 |
| \`total_price\` | 주문 금액 |
| \`year_month\` | 주문 연월 |
| \`weekday\` | 주문 요일 |

이번 장에서는 이 데이터를 사용해 지역별, 카테고리별, 월별, 등급별 요약표를 만들어보겠습니다.

---

## 14.3 \`groupby()\` 기본 사용법

pandas에서 그룹화를 할 때는 \`groupby()\`를 사용합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.groupby("그룹화기준")["계산할컬럼"].집계함수()
\`\`\`

예를 들어 카테고리별 매출 합계는 다음처럼 계산합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

이 코드를 세 부분으로 나누어 보면 다음과 같습니다.

| 코드 | 의미 |
|---|---|
| \`orders.groupby("category")\` | \`category\`별로 데이터를 묶는다 |
| \`["total_price"]\` | 각 그룹에서 \`total_price\` 컬럼을 선택한다 |
| \`.sum()\` | 그룹별 합계를 계산한다 |

---

### 14.3.1 단일 컬럼 기준 그룹화

카테고리별 매출 합계를 구해보겠습니다.

\`\`\`python
category_sales = orders.groupby("category")["total_price"].sum()

category_sales
\`\`\`

결과는 Series 형태로 반환됩니다.

\`\`\`text
category
도서       164000
생활용품     225000
전자기기     960000
Name: total_price, dtype: int64
\`\`\`

왼쪽의 \`category\`는 인덱스가 되고, 오른쪽 값은 그룹별 합계입니다.

---

### 14.3.2 결과를 DataFrame으로 만들기

분석 결과를 보고서처럼 다루려면 DataFrame 형태가 편합니다.  
이때 \`reset_index()\`를 사용합니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index()
)

category_sales
\`\`\`

결과는 다음과 같은 형태가 됩니다.

\`\`\`text
category | total_price
도서      | 164000
생활용품  | 225000
전자기기  | 960000
\`\`\`

\`reset_index()\`는 그룹화 기준으로 사용된 인덱스를 다시 일반 컬럼으로 되돌립니다.

---

### 14.3.3 결과 컬럼명 바꾸기

집계 결과 컬럼명이 원래 컬럼명인 \`total_price\`로 남아 있습니다.  
보고서에서는 \`total_sales\`처럼 더 명확한 이름을 사용하는 것이 좋습니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

category_sales
\`\`\`

SeriesGroupBy 결과에 \`reset_index(name="새컬럼명")\`을 사용하면 집계 결과 컬럼명을 지정할 수 있습니다.

또는 \`rename()\`을 사용할 수도 있습니다.

\`\`\`python
category_sales = category_sales.rename(columns={"total_price": "total_sales"})
\`\`\`

---

### 14.3.4 집계 결과 정렬하기

카테고리별 매출을 큰 순서대로 보고 싶다면 정렬을 추가합니다.

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

분석 보고서에서는 집계 결과를 정렬해서 보여주는 것이 좋습니다.

예를 들어 매출 분석에서는 매출이 큰 순서대로 정렬하면 핵심 카테고리를 쉽게 파악할 수 있습니다.

---

### 14.3.5 개수 세기

카테고리별 주문 건수를 계산하려면 \`count()\`를 사용할 수 있습니다.

\`\`\`python
orders.groupby("category")["order_id"].count()
\`\`\`

또는 \`size()\`를 사용할 수도 있습니다.

\`\`\`python
orders.groupby("category").size()
\`\`\`

\`count()\`와 \`size()\`는 비슷하지만 차이가 있습니다.

| 함수 | 의미 |
|---|---|
| \`count()\` | 결측치가 아닌 값의 개수 |
| \`size()\` | 그룹에 속한 행의 개수 |

결측치가 있는 컬럼을 기준으로 개수를 셀 때는 차이가 생길 수 있습니다.

예를 들어 \`order_id\`처럼 결측치가 없는 컬럼은 \`count()\`를 사용해도 괜찮습니다.  
행 수 자체를 세고 싶다면 \`size()\`가 더 명확합니다.

\`\`\`python
order_count_by_category = (
    orders
    .groupby("category")
    .size()
    .reset_index(name="order_count")
)

order_count_by_category
\`\`\`

---

## 14.4 주요 집계 함수

그룹화 후에는 다양한 집계 함수를 사용할 수 있습니다.

대표적인 함수는 다음과 같습니다.

| 함수 | 의미 |
|---|---|
| \`sum()\` | 합계 |
| \`mean()\` | 평균 |
| \`median()\` | 중앙값 |
| \`count()\` | 결측치가 아닌 값 개수 |
| \`size()\` | 행 개수 |
| \`min()\` | 최솟값 |
| \`max()\` | 최댓값 |
| \`nunique()\` | 고유값 개수 |
| \`std()\` | 표준편차 |

---

### 14.4.1 합계: \`sum()\`

지역별 매출 합계를 계산해보겠습니다.

\`\`\`python
region_sales = (
    orders
    .groupby("region")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

매출 합계는 가장 많이 사용하는 집계 중 하나입니다.

---

### 14.4.2 평균: \`mean()\`

지역별 평균 주문 금액을 계산합니다.

\`\`\`python
region_avg_order = (
    orders
    .groupby("region")["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
    .sort_values(by="avg_order_price", ascending=False)
)

region_avg_order
\`\`\`

평균은 그룹의 일반적인 수준을 파악할 때 사용합니다.  
다만 이상값이 있으면 평균이 크게 흔들릴 수 있으므로 중앙값과 함께 보는 것이 좋습니다.

---

### 14.4.3 중앙값: \`median()\`

지역별 중앙 주문 금액을 계산합니다.

\`\`\`python
region_median_order = (
    orders
    .groupby("region")["total_price"]
    .median()
    .reset_index(name="median_order_price")
    .sort_values(by="median_order_price", ascending=False)
)

region_median_order
\`\`\`

중앙값은 이상값의 영향을 평균보다 덜 받습니다.  
주문 금액처럼 일부 큰 값이 있을 수 있는 데이터에서는 평균과 중앙값을 함께 확인하는 것이 좋습니다.

---

### 14.4.4 최솟값과 최댓값

카테고리별 최소 주문 금액과 최대 주문 금액을 확인합니다.

\`\`\`python
category_min_price = (
    orders
    .groupby("category")["total_price"]
    .min()
    .reset_index(name="min_order_price")
)

category_max_price = (
    orders
    .groupby("category")["total_price"]
    .max()
    .reset_index(name="max_order_price")
)

category_min_price
category_max_price
\`\`\`

최솟값과 최댓값은 이상값이나 극단값을 확인할 때 유용합니다.

---

### 14.4.5 고유값 개수: \`nunique()\`

지역별 고유 고객 수를 계산해보겠습니다.

\`\`\`python
region_customer_count = (
    orders
    .groupby("region")["customer_id"]
    .nunique()
    .reset_index(name="unique_customers")
    .sort_values(by="unique_customers", ascending=False)
)

region_customer_count
\`\`\`

\`nunique()\`는 중복을 제거한 고유값 개수를 계산합니다.

주문 데이터에서는 같은 고객이 여러 번 주문할 수 있습니다.  
따라서 고객 수를 알고 싶다면 단순 주문 건수가 아니라 고유 고객 수를 계산해야 합니다.

---

### 14.4.6 여러 집계 결과 비교하기

지역별 주문 건수, 고유 고객 수, 총 매출, 평균 주문 금액을 각각 계산할 수 있습니다.  
하지만 실무에서는 이런 결과를 하나의 요약표로 만드는 경우가 많습니다.

이럴 때는 다음 절에서 배울 \`agg()\`를 사용합니다.

---

## 14.5 여러 집계를 한 번에 수행하기: \`agg()\`

\`agg()\`는 여러 집계 함수를 한 번에 적용할 때 사용합니다.

---

### 14.5.1 하나의 컬럼에 여러 집계 함수 적용

카테고리별 주문 금액에 대해 합계, 평균, 최대값을 한 번에 구해보겠습니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")["total_price"]
    .agg(["sum", "mean", "max"])
)

category_summary
\`\`\`

결과는 다음과 같은 형태입니다.

\`\`\`text
           sum       mean     max
category
도서       ...
생활용품     ...
전자기기     ...
\`\`\`

DataFrame 형태로 정리하려면 \`reset_index()\`를 사용합니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")["total_price"]
    .agg(["sum", "mean", "max"])
    .reset_index()
)

category_summary
\`\`\`

컬럼명을 더 명확히 바꿀 수도 있습니다.

\`\`\`python
category_summary = category_summary.rename(columns={
    "sum": "total_sales",
    "mean": "avg_order_price",
    "max": "max_order_price"
})

category_summary
\`\`\`

---

### 14.5.2 여러 컬럼에 여러 집계 적용

카테고리별로 주문 금액 합계와 평균, 주문 수량 합계를 함께 계산해보겠습니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg({
        "total_price": ["sum", "mean", "max"],
        "quantity": ["sum", "mean"],
        "order_id": "count"
    })
)

category_summary
\`\`\`

이 방식은 여러 컬럼에 여러 집계를 적용할 수 있어 강력합니다.  
하지만 결과 컬럼이 다층 구조가 되어 초보자에게는 조금 복잡해 보일 수 있습니다.

---

### 14.5.3 이름 있는 집계

보고서용 요약표를 만들 때는 이름 있는 집계 방식이 가장 읽기 좋습니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        max_order_price=("total_price", "max"),
        total_quantity=("quantity", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_summary
\`\`\`

이 방식의 장점은 다음과 같습니다.

- 결과 컬럼명을 직접 지정할 수 있다.
- 여러 컬럼에 서로 다른 집계 함수를 적용할 수 있다.
- 결과가 보고서 형태로 깔끔하다.
- 컬럼명 정리 과정이 줄어든다.

실무에서는 이 이름 있는 집계 방식을 자주 사용합니다.

---

### 14.5.4 집계 결과 반올림

평균값은 소수점이 길게 나올 수 있습니다.  
보고서에서는 적절히 반올림하는 것이 좋습니다.

\`\`\`python
category_summary["avg_order_price"] = category_summary["avg_order_price"].round(0)

category_summary
\`\`\`

여러 컬럼을 한 번에 반올림할 수도 있습니다.

\`\`\`python
category_summary = category_summary.round({
    "avg_order_price": 0
})
\`\`\`

반올림은 분석 목적에 맞게 사용해야 합니다.  
중간 계산 과정에서는 원본 값을 유지하고, 최종 출력이나 보고 단계에서 반올림하는 것이 좋습니다.

---

## 14.6 여러 기준으로 그룹화하기

하나의 기준이 아니라 여러 기준으로 데이터를 묶을 수도 있습니다.

예를 들어 “지역별 카테고리별 매출”을 보고 싶다면 \`region\`과 \`category\`를 함께 기준으로 사용합니다.

---

### 14.6.1 두 컬럼 기준 그룹화

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
)

region_category_sales
\`\`\`

결과는 MultiIndex 형태가 됩니다.

\`\`\`text
region  category
대전      도서           ...
         생활용품         ...
부산      도서           ...
         생활용품         ...
         전자기기         ...
서울      도서           ...
         생활용품         ...
         전자기기         ...
\`\`\`

DataFrame으로 정리하려면 \`reset_index()\`를 사용합니다.

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

region_category_sales
\`\`\`

---

### 14.6.2 여러 기준 집계 결과 정렬

지역별 카테고리별 매출을 지역과 매출 기준으로 정렬해보겠습니다.

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by=["region", "total_sales"], ascending=[True, False])
)

region_category_sales
\`\`\`

이 코드는 다음 기준으로 정렬합니다.

1. \`region\`은 오름차순
2. 같은 지역 안에서는 \`total_sales\` 내림차순

여러 기준 정렬은 그룹화 결과를 보기 좋게 정리할 때 자주 사용합니다.

---

### 14.6.3 월별 카테고리별 매출

이전 장에서 만든 \`year_month\` 컬럼을 사용해 월별 카테고리별 매출을 구할 수 있습니다.

\`\`\`python
monthly_category_sales = (
    orders
    .groupby(["year_month", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_category_sales
\`\`\`

이 결과는 다음과 같은 질문에 답할 수 있습니다.

\`\`\`text
1월에는 어떤 카테고리 매출이 가장 높았는가?
월별로 전자기기 매출은 어떻게 변했는가?
특정 카테고리는 특정 월에만 매출이 높은가?
\`\`\`

이처럼 날짜 파생 변수와 그룹화를 함께 사용하면 시간 흐름에 따른 분석을 할 수 있습니다.

---

### 14.6.4 고객 등급별 카테고리별 평균 주문 금액

고객 등급과 카테고리를 기준으로 평균 주문 금액을 계산해봅시다.

\`\`\`python
grade_category_avg = (
    orders
    .groupby(["grade", "category"])["total_price"]
    .mean()
    .reset_index(name="avg_order_price")
    .sort_values(by=["grade", "avg_order_price"], ascending=[True, False])
)

grade_category_avg
\`\`\`

이 분석은 다음 질문에 답하는 데 유용합니다.

\`\`\`text
VIP 고객은 어떤 카테고리에서 평균 구매 금액이 높은가?
일반 고객과 VIP 고객의 구매 패턴은 어떻게 다른가?
\`\`\`

---

## 14.7 \`as_index\`와 인덱스 다루기

\`groupby()\` 결과에서 그룹화 기준은 기본적으로 인덱스가 됩니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

이 결과에서 \`category\`는 인덱스입니다.  
보고서용 데이터로 다루려면 보통 \`reset_index()\`를 사용했습니다.

하지만 \`groupby()\`에서 \`as_index=False\`를 사용할 수도 있습니다.

---

### 14.7.1 \`as_index=False\`

\`\`\`python
category_sales = orders.groupby("category", as_index=False)["total_price"].sum()

category_sales
\`\`\`

이렇게 하면 그룹화 기준인 \`category\`가 인덱스가 아니라 일반 컬럼으로 유지됩니다.

다음 코드와 비슷한 결과를 냅니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index()
)
\`\`\`

초보자에게는 \`reset_index()\` 방식이 그룹화 결과의 구조를 이해하기 쉽습니다.  
하지만 실무에서는 \`as_index=False\`도 자주 사용합니다.

---

### 14.7.2 어떤 방식을 사용할까?

두 방식 모두 사용할 수 있습니다.

\`\`\`python
# 방식 1
orders.groupby("category")["total_price"].sum().reset_index()

# 방식 2
orders.groupby("category", as_index=False)["total_price"].sum()
\`\`\`

기초 수업에서는 먼저 \`reset_index()\`를 익히는 것이 좋습니다.  
그룹화 결과가 인덱스로 만들어진다는 점을 이해할 수 있기 때문입니다.

실무 코드에서는 \`as_index=False\`를 사용하면 더 짧게 작성할 수 있습니다.

---

### 14.7.3 MultiIndex 결과 정리하기

여러 컬럼 기준으로 그룹화하거나 여러 집계를 한 번에 적용하면 결과가 복잡해질 수 있습니다.

예를 들어 다음 코드는 다층 컬럼을 만듭니다.

\`\`\`python
summary = orders.groupby("category").agg({
    "total_price": ["sum", "mean"],
    "quantity": ["sum", "mean"]
})

summary
\`\`\`

컬럼이 다음처럼 다층 구조가 됩니다.

\`\`\`text
total_price | sum
total_price | mean
quantity    | sum
quantity    | mean
\`\`\`

기초 과정에서는 이름 있는 집계 방식을 사용하면 이런 복잡성을 줄일 수 있습니다.

\`\`\`python
summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum"),
        avg_quantity=("quantity", "mean")
    )
    .reset_index()
)

summary
\`\`\`

보고서용 요약표를 만들 때는 이름 있는 집계를 권장합니다.

---

## 14.8 그룹별 비율 계산

그룹별 합계뿐 아니라 전체에서 차지하는 비율을 계산해야 할 때도 많습니다.

예를 들어 카테고리별 매출 비중을 구해보겠습니다.

---

### 14.8.1 전체 대비 비율

카테고리별 매출 합계를 먼저 구합니다.

\`\`\`python
category_sales = (
    orders
    .groupby("category")["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

category_sales
\`\`\`

전체 매출을 계산합니다.

\`\`\`python
total_sales = category_sales["total_sales"].sum()
\`\`\`

카테고리별 매출 비율을 추가합니다.

\`\`\`python
category_sales["sales_ratio"] = category_sales["total_sales"] / total_sales

category_sales
\`\`\`

백분율로 보고 싶다면 100을 곱하고 반올림합니다.

\`\`\`python
category_sales["sales_ratio_percent"] = (category_sales["sales_ratio"] * 100).round(1)

category_sales
\`\`\`

이 결과는 다음과 같이 해석할 수 있습니다.

\`\`\`text
전자기기 카테고리가 전체 매출의 몇 %를 차지한다.
도서 카테고리가 전체 매출의 몇 %를 차지한다.
생활용품 카테고리가 전체 매출의 몇 %를 차지한다.
\`\`\`

---

### 14.8.2 그룹 안에서의 비율

이번에는 지역 안에서 카테고리별 매출 비율을 구해보겠습니다.

먼저 지역별 카테고리별 매출을 계산합니다.

\`\`\`python
region_category_sales = (
    orders
    .groupby(["region", "category"])["total_price"]
    .sum()
    .reset_index(name="total_sales")
)

region_category_sales
\`\`\`

각 지역의 전체 매출을 구해 같은 행에 붙입니다.  
이때 \`transform()\`을 사용할 수 있습니다.

\`\`\`python
region_category_sales["region_total_sales"] = (
    region_category_sales
    .groupby("region")["total_sales"]
    .transform("sum")
)

region_category_sales
\`\`\`

이제 지역 내 카테고리 비율을 계산합니다.

\`\`\`python
region_category_sales["category_ratio_in_region"] = (
    region_category_sales["total_sales"] / region_category_sales["region_total_sales"]
)

region_category_sales["category_ratio_percent"] = (
    region_category_sales["category_ratio_in_region"] * 100
).round(1)

region_category_sales
\`\`\`

\`transform()\`은 그룹별 계산 결과를 원래 행 수에 맞춰 반환합니다.  
기초 과정에서는 “그룹별 합계를 각 행에 다시 붙이고 싶을 때 사용한다” 정도로 이해하면 충분합니다.

---

### 14.8.3 비율 계산이 필요한 이유

비율은 단순 합계만 볼 때 놓칠 수 있는 정보를 보여줍니다.

예를 들어 서울의 전자기기 매출이 부산보다 크다고 해서 서울에서 전자기기가 더 중요한 카테고리라고 단정할 수 없습니다.  
서울 전체 매출이 부산보다 훨씬 크기 때문일 수 있습니다.

이럴 때 지역 내 비율을 보면 각 지역에서 어떤 카테고리가 상대적으로 중요한지 알 수 있습니다.

\`\`\`text
전체 매출 기준 비중
지역 안에서의 카테고리 비중
고객 등급 안에서의 구매 비중
월 안에서의 카테고리 비중
\`\`\`

비율은 분석 결과를 해석하는 데 매우 중요한 지표입니다.

---

## 14.9 피벗 테이블: \`pivot_table()\`

\`groupby()\` 결과는 세로로 긴 형태가 많습니다.

예를 들어 지역별 카테고리별 매출은 다음처럼 나올 수 있습니다.

\`\`\`text
region | category | total_sales
서울    | 도서      | 84000
서울    | 전자기기  | 780000
부산    | 생활용품  | 100000
...
\`\`\`

이 데이터를 표 형태로 넓게 펼치면 더 보기 쉬울 때가 있습니다.

\`\`\`text
region | 도서 | 생활용품 | 전자기기
서울    | ... | ...     | ...
부산    | ... | ...     | ...
대전    | ... | ...     | ...
\`\`\`

이런 표를 만들 때 \`pivot_table()\`을 사용할 수 있습니다.

---

### 14.9.1 \`pivot_table()\` 기본 구조

기본 구조는 다음과 같습니다.

\`\`\`python
pd.pivot_table(
    data=df,
    values="계산할값",
    index="행기준",
    columns="열기준",
    aggfunc="집계함수"
)
\`\`\`

지역을 행으로, 카테고리를 열로 두고 매출 합계를 계산해보겠습니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum"
)

region_category_pivot
\`\`\`

이 결과는 지역별 카테고리별 매출표입니다.

---

### 14.9.2 결측 조합 채우기: \`fill_value\`

어떤 지역에는 특정 카테고리 주문이 없을 수 있습니다.  
이 경우 결과에 결측치가 생길 수 있습니다.

결측치를 0으로 채우려면 \`fill_value=0\`을 사용합니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)

region_category_pivot
\`\`\`

여기서 0은 “해당 조합의 주문이 없어서 매출 합계가 0”이라는 의미로 사용할 수 있습니다.

---

### 14.9.3 합계 행과 열 추가: \`margins\`

행과 열의 총합을 함께 보고 싶다면 \`margins=True\`를 사용합니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot
\`\`\`

이렇게 하면 행과 열에 전체 합계가 추가됩니다.

보고서용 요약표를 만들 때 유용합니다.

---

### 14.9.4 여러 집계 함수 사용

\`aggfunc\`에 여러 집계 함수를 넣을 수 있습니다.

\`\`\`python
pivot_multi = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc=["sum", "mean"],
    fill_value=0
)

pivot_multi
\`\`\`

결과는 다층 컬럼이 됩니다.  
기초 과정에서는 여러 집계 함수를 넣을 수 있다는 정도만 이해하면 됩니다.

보고서용으로는 하나의 집계 함수만 사용하거나, \`groupby().agg()\`로 정리하는 것이 더 읽기 쉬울 때가 많습니다.

---

### 14.9.5 \`pivot_table()\`과 \`groupby()\` 비교

\`pivot_table()\`은 \`groupby()\`와 비슷한 일을 합니다.  
차이는 결과 모양입니다.

\`\`\`python
# groupby 방식
orders.groupby(["region", "category"])["total_price"].sum().reset_index()
\`\`\`

\`\`\`python
# pivot_table 방식
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

정리하면 다음과 같습니다.

| 목적 | 추천 방법 |
|---|---|
| 세로형 요약표 만들기 | \`groupby()\` |
| 행과 열이 있는 교차 요약표 만들기 | \`pivot_table()\` |
| 보고서용 매트릭스 표 만들기 | \`pivot_table()\` |
| 여러 지표를 깔끔한 컬럼으로 정리 | \`groupby().agg()\` |

---

## 14.10 교차표: \`crosstab()\`

\`crosstab()\`은 두 개 이상의 범주형 변수 사이의 빈도를 계산할 때 자주 사용합니다.

예를 들어 고객 등급과 지역의 관계를 보고 싶다고 해봅시다.

\`\`\`text
지역별 VIP 고객 수는 몇 명인가?
지역별 일반 고객 수는 몇 명인가?
\`\`\`

이런 질문에는 \`pd.crosstab()\`을 사용할 수 있습니다.

---

### 14.10.1 기본 교차표

지역과 고객 등급의 교차 빈도표를 만들어보겠습니다.

\`\`\`python
region_grade_table = pd.crosstab(
    orders["region"],
    orders["grade"]
)

region_grade_table
\`\`\`

결과는 지역을 행으로, 고객 등급을 열로 하는 빈도표입니다.

\`\`\`text
grade | VIP | 일반
region
서울   | ... | ...
부산   | ... | ...
대전   | ... | ...
\`\`\`

기본적으로 \`crosstab()\`은 빈도, 즉 개수를 계산합니다.

---

### 14.10.2 합계 추가

행과 열의 합계를 추가하려면 \`margins=True\`를 사용합니다.

\`\`\`python
region_grade_table = pd.crosstab(
    orders["region"],
    orders["grade"],
    margins=True,
    margins_name="합계"
)

region_grade_table
\`\`\`

---

### 14.10.3 비율로 보기: \`normalize\`

교차표를 개수뿐 아니라 비율로 보고 싶을 때가 있습니다.

전체 대비 비율을 보고 싶다면 \`normalize=True\`를 사용합니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize=True
)
\`\`\`

행 기준 비율을 보고 싶다면 \`normalize="index"\`를 사용합니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
)
\`\`\`

이 결과는 각 지역 안에서 VIP와 일반 고객이 차지하는 비율을 보여줍니다.

열 기준 비율을 보고 싶다면 \`normalize="columns"\`를 사용할 수 있습니다.

\`\`\`python
pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="columns"
)
\`\`\`

비율을 백분율로 보고 싶다면 100을 곱하고 반올림합니다.

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio.round(1)
\`\`\`

---

### 14.10.4 값과 집계 함수 사용

\`crosstab()\`은 기본적으로 빈도를 계산하지만, \`values\`와 \`aggfunc\`를 사용하면 특정 값의 집계도 할 수 있습니다.

지역과 등급별 매출 합계를 계산해보겠습니다.

\`\`\`python
region_grade_sales = pd.crosstab(
    index=orders["region"],
    columns=orders["grade"],
    values=orders["total_price"],
    aggfunc="sum"
)

region_grade_sales
\`\`\`

결측 조합을 0으로 채우려면 \`fillna(0)\`을 사용할 수 있습니다.

\`\`\`python
region_grade_sales = region_grade_sales.fillna(0)

region_grade_sales
\`\`\`

다만 값 집계가 목적이라면 \`pivot_table()\`이 더 직관적일 때도 많습니다.

---

### 14.10.5 \`crosstab()\`과 \`pivot_table()\` 비교

두 함수는 비슷해 보이지만 주로 사용하는 상황이 조금 다릅니다.

| 함수 | 주 용도 |
|---|---|
| \`crosstab()\` | 범주형 변수 간 빈도표, 비율표 |
| \`pivot_table()\` | 행과 열 기준으로 수치값 집계 |
| \`groupby()\` | 가장 일반적인 그룹화와 집계 |

예를 들어 지역별 등급 고객 수는 \`crosstab()\`이 편합니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

지역별 카테고리별 매출은 \`pivot_table()\`이 편합니다.

\`\`\`python
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

---

## 14.11 실무 예제 1: 카테고리별 매출 요약표

카테고리별 매출 요약표를 만들어보겠습니다.

분석 질문은 다음과 같습니다.

\`\`\`text
카테고리별 총매출, 주문 건수, 평균 주문 금액, 총 판매 수량은 얼마인가?
\`\`\`

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_report["avg_order_price"] = category_report["avg_order_price"].round(0)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
)

category_report
\`\`\`

이 요약표는 다음을 보여줍니다.

- 어떤 카테고리의 매출이 가장 큰가?
- 어떤 카테고리의 주문 건수가 많은가?
- 평균 주문 금액이 높은 카테고리는 무엇인가?
- 고유 고객 수가 많은 카테고리는 무엇인가?

보고서에서는 이 표를 기반으로 핵심 카테고리를 설명할 수 있습니다.

---

## 14.12 실무 예제 2: 월별 매출 리포트

이번에는 월별 매출 리포트를 만들어보겠습니다.

\`\`\`python
monthly_report = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_report["avg_order_price"] = monthly_report["avg_order_price"].round(0)

monthly_report
\`\`\`

월별 리포트는 시간 흐름에 따른 매출 변화를 보는 데 사용합니다.

예를 들어 다음 질문에 답할 수 있습니다.

\`\`\`text
월별 매출은 증가하고 있는가?
주문 건수는 어느 달에 가장 많았는가?
평균 주문 금액은 어느 달이 가장 높은가?
월별 구매 고객 수는 어떻게 변하는가?
\`\`\`

이 결과는 이후 시각화 장에서 선 그래프나 막대 그래프로 표현할 수 있습니다.

---

## 14.13 실무 예제 3: 지역별 카테고리 매출 피벗 테이블

지역과 카테고리를 기준으로 매출표를 만들어보겠습니다.

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot
\`\`\`

이 표는 엑셀 피벗 테이블과 비슷한 형태입니다.

행에는 지역이 있고, 열에는 카테고리가 있습니다.  
값에는 매출 합계가 들어갑니다.

이 표를 통해 다음 질문에 답할 수 있습니다.

\`\`\`text
서울에서 매출이 가장 높은 카테고리는 무엇인가?
부산과 대전의 카테고리별 매출 구조는 어떻게 다른가?
전체 매출에서 가장 큰 카테고리는 무엇인가?
\`\`\`

---

## 14.14 실무 예제 4: 지역별 고객 등급 비율

지역별 고객 등급 분포를 확인해보겠습니다.

\`\`\`python
region_grade_count = pd.crosstab(
    orders["region"],
    orders["grade"],
    margins=True,
    margins_name="합계"
)

region_grade_count
\`\`\`

지역별 등급 비율도 계산합니다.

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio.round(1)
\`\`\`

이 표는 각 지역 안에서 VIP와 일반 고객이 어느 정도 비율을 차지하는지 보여줍니다.

예를 들어 다음 질문에 답할 수 있습니다.

\`\`\`text
VIP 고객 비율이 높은 지역은 어디인가?
일반 고객 비율이 높은 지역은 어디인가?
지역별 고객 구성이 다른가?
\`\`\`

단, 이 예제 데이터는 행 수가 적기 때문에 실제 분석에서는 더 많은 데이터로 판단해야 합니다.

---

## 14.15 실무 미니 프로젝트: 주문 데이터 요약 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 주문 데이터 요약 리포트를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 카테고리별 매출 요약표를 만든다.
3. 월별 매출 요약표를 만든다.
4. 지역별 카테고리 매출 피벗 테이블을 만든다.
5. 지역별 고객 등급 비율표를 만든다.
6. 전체 매출 대비 카테고리별 비중을 계산한다.
7. 분석 결과를 간단히 해석한다.
\`\`\`

---

### 14.15.1 데이터 준비

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "customer": ["민수", "지영", "철수", "민수", "영희", "지영", "수진", "현우", "도윤", "서연", "철수", "수진"],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")

orders
\`\`\`

---

### 14.15.2 카테고리별 매출 요약표

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        total_quantity=("quantity", "sum"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_report["avg_order_price"] = category_report["avg_order_price"].round(0)

total_sales = category_report["total_sales"].sum()
category_report["sales_ratio_percent"] = (
    category_report["total_sales"] / total_sales * 100
).round(1)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

---

### 14.15.3 월별 매출 요약표

\`\`\`python
monthly_report = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_report["avg_order_price"] = monthly_report["avg_order_price"].round(0)

monthly_report
\`\`\`

---

### 14.15.4 지역별 카테고리 매출 피벗 테이블

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot
\`\`\`

---

### 14.15.5 지역별 고객 등급 비율표

\`\`\`python
region_grade_ratio = pd.crosstab(
    orders["region"],
    orders["grade"],
    normalize="index"
) * 100

region_grade_ratio = region_grade_ratio.round(1)

region_grade_ratio
\`\`\`

---

### 14.15.6 분석 결과 해석 예시

분석 결과는 단순히 표를 만드는 것으로 끝나지 않습니다.  
표를 보고 해석 문장을 작성해야 합니다.

예를 들어 다음과 같이 정리할 수 있습니다.

\`\`\`text
카테고리별 매출 요약 결과, 전자기기 카테고리의 총매출이 가장 높았다.
전자기기는 주문 건수는 많지 않더라도 평균 주문 금액이 높아 전체 매출 기여도가 크다.
월별 매출에서는 4월 매출이 높게 나타났으며, 이는 전자기기 주문의 영향으로 보인다.
지역별 카테고리 피벗 테이블을 보면 서울 지역에서 전자기기 매출 비중이 높다.
지역별 고객 등급 비율을 보면 부산은 VIP 주문 비율이 상대적으로 높게 나타난다.
\`\`\`

다만 실제 분석에서는 데이터 크기와 표본 수를 함께 고려해야 합니다.  
예제 데이터처럼 작은 데이터에서는 결과를 일반화하면 안 됩니다.

---

### 14.15.7 처리 기준 문서화

분석 노트북이나 보고서에는 다음과 같이 기준을 남길 수 있습니다.

\`\`\`text
그룹화와 집계 기준
- 카테고리별 매출은 category 기준으로 total_price 합계를 계산했다.
- 주문 건수는 order_id의 count로 계산했다.
- 고유 고객 수는 customer_id의 nunique로 계산했다.
- 월별 분석은 order_date에서 추출한 year_month 기준으로 수행했다.
- 지역별 카테고리 매출표는 pivot_table을 사용해 작성했다.
- 지역별 등급 비율은 crosstab의 normalize="index"를 사용했다.
- 매출 비중은 카테고리별 매출을 전체 매출로 나누어 계산했다.
\`\`\`

기준을 남기면 같은 분석을 반복하거나 다른 사람에게 설명하기 쉽습니다.

---

## 14.16 그룹화와 집계 시 자주 하는 실수

그룹화와 집계는 강력하지만 자주 하는 실수가 있습니다.

---

### 14.16.1 분석 질문 없이 groupby부터 쓰는 실수

\`groupby()\`를 사용하기 전에 분석 질문을 먼저 정해야 합니다.

나쁜 접근:

\`\`\`text
일단 groupby를 해본다.
\`\`\`

좋은 접근:

\`\`\`text
카테고리별 총매출을 알고 싶다.
→ 그룹화 기준: category
→ 계산할 컬럼: total_price
→ 집계 함수: sum
\`\`\`

질문이 명확하면 코드도 명확해집니다.

---

### 14.16.2 주문 수와 고객 수를 혼동하는 실수

주문 수와 고객 수는 다릅니다.

\`\`\`python
orders.groupby("region")["order_id"].count()
\`\`\`

이 코드는 지역별 주문 수입니다.

\`\`\`python
orders.groupby("region")["customer_id"].nunique()
\`\`\`

이 코드는 지역별 고유 고객 수입니다.

같은 고객이 여러 번 주문할 수 있으므로, 고객 수를 구할 때는 \`nunique()\`를 사용해야 합니다.

---

### 14.16.3 \`count()\`와 \`size()\`를 혼동하는 실수

\`count()\`는 결측치가 아닌 값의 개수를 셉니다.  
\`size()\`는 행 개수를 셉니다.

결측치가 있는 컬럼을 기준으로 개수를 세면 결과가 다를 수 있습니다.

\`\`\`python
df.groupby("category")["some_column"].count()
df.groupby("category").size()
\`\`\`

행 수를 세고 싶다면 \`size()\`를 사용하는 것이 명확합니다.

---

### 14.16.4 그룹화 결과의 인덱스를 이해하지 못하는 실수

\`groupby()\` 결과에서 그룹화 기준은 기본적으로 인덱스가 됩니다.

\`\`\`python
result = orders.groupby("category")["total_price"].sum()
\`\`\`

보고서나 후속 분석에서 일반 컬럼으로 사용하려면 \`reset_index()\`를 사용합니다.

\`\`\`python
result = result.reset_index(name="total_sales")
\`\`\`

---

### 14.16.5 여러 연도의 같은 월을 합쳐버리는 실수

날짜 분석에서 월만 사용하면 여러 연도의 같은 월이 합쳐질 수 있습니다.

\`\`\`python
orders.groupby(orders["order_date"].dt.month)["total_price"].sum()
\`\`\`

데이터가 여러 연도에 걸쳐 있다면 연월을 사용해야 합니다.

\`\`\`python
orders["year_month"] = orders["order_date"].dt.to_period("M")
orders.groupby("year_month")["total_price"].sum()
\`\`\`

---

### 14.16.6 평균만 보고 판단하는 실수

평균은 이상값의 영향을 받을 수 있습니다.  
따라서 금액 데이터에서는 평균과 중앙값을 함께 보는 것이 좋습니다.

\`\`\`python
orders.groupby("category")["total_price"].agg(["mean", "median"])
\`\`\`

평균이 중앙값보다 훨씬 크다면 일부 큰 값이 평균을 끌어올리고 있을 수 있습니다.

---

### 14.16.7 피벗 테이블의 결측치를 오해하는 실수

\`pivot_table()\` 결과에서 결측치가 나오는 것은 해당 조합의 데이터가 없다는 의미일 수 있습니다.

예를 들어 부산 지역에 전자기기 주문이 없으면 해당 칸이 비어 있을 수 있습니다.

이 경우 매출 합계 표에서는 0으로 채우는 것이 자연스러울 수 있습니다.

\`\`\`python
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

다만 결측치가 항상 0을 의미하는 것은 아니므로 데이터 의미를 확인해야 합니다.

---

## 14.17 핵심 정리

이번 장에서는 pandas에서 그룹화와 집계를 수행하는 방법을 배웠습니다.

그룹화는 데이터를 특정 기준으로 나누는 작업입니다.  
집계는 각 그룹에 대해 합계, 평균, 개수 같은 계산을 수행하는 작업입니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.groupby("그룹화기준")["계산할컬럼"].집계함수()
\`\`\`

예를 들어 카테고리별 매출 합계는 다음처럼 계산합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum()
\`\`\`

결과를 DataFrame으로 만들려면 \`reset_index()\`를 사용합니다.

\`\`\`python
orders.groupby("category")["total_price"].sum().reset_index(name="total_sales")
\`\`\`

여러 집계를 한 번에 수행할 때는 \`agg()\`를 사용합니다.

\`\`\`python
orders.groupby("category").agg(
    total_sales=("total_price", "sum"),
    avg_order_price=("total_price", "mean"),
    order_count=("order_id", "count")
).reset_index()
\`\`\`

여러 기준으로 그룹화할 수도 있습니다.

\`\`\`python
orders.groupby(["region", "category"])["total_price"].sum()
\`\`\`

행과 열이 있는 요약표를 만들 때는 \`pivot_table()\`을 사용할 수 있습니다.

\`\`\`python
pd.pivot_table(
    data=orders,
    values="total_price",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

범주형 변수 간 빈도표를 만들 때는 \`crosstab()\`을 사용할 수 있습니다.

\`\`\`python
pd.crosstab(orders["region"], orders["grade"])
\`\`\`

그룹화와 집계는 데이터 분석의 핵심입니다.  
분석 질문을 정하고, 그룹화 기준과 계산할 값을 정한 뒤, 적절한 집계 함수를 선택하는 습관이 중요합니다.

---

## 14.18 연습문제

### 문제 1. 개념 확인

그룹화와 집계에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 데이터를 무작위로 섞는 작업이다.  
B. 데이터를 특정 기준으로 묶고, 그룹별 계산을 수행하는 작업이다.  
C. 결측치를 모두 제거하는 작업이다.  
D. 문자열을 숫자로 변환하는 작업이다.

---

### 문제 2. 코드 작성

다음 데이터에서 \`category\`별 \`sales\` 합계를 구하세요.

\`\`\`python
df = pd.DataFrame({
    "category": ["A", "B", "A", "B", "C"],
    "sales": [100, 200, 300, 400, 500]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 데이터에서 \`region\`별 주문 건수를 구하세요.

\`\`\`python
df = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5],
    "region": ["서울", "부산", "서울", "대전", "부산"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 데이터에서 \`region\`별 고유 고객 수를 구하세요.

\`\`\`python
df = pd.DataFrame({
    "region": ["서울", "서울", "부산", "부산", "부산"],
    "customer_id": [1, 1, 2, 3, 3]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 데이터에서 \`category\`별 매출 합계, 평균, 주문 건수를 한 번에 구하세요.

\`\`\`python
df = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5],
    "category": ["A", "B", "A", "B", "A"],
    "sales": [100, 200, 300, 400, 500]
})
\`\`\`

결과 컬럼명은 다음과 같이 만드세요.

\`\`\`text
category
total_sales
avg_sales
order_count
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 \`region\`과 \`category\`별 매출 합계를 구하세요.

\`\`\`python
df = pd.DataFrame({
    "region": ["서울", "서울", "부산", "부산", "서울"],
    "category": ["A", "B", "A", "B", "A"],
    "sales": [100, 200, 300, 400, 500]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 \`region\`을 행, \`category\`를 열로 하는 매출 합계 피벗 테이블을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "region": ["서울", "서울", "부산", "부산", "서울"],
    "category": ["A", "B", "A", "B", "A"],
    "sales": [100, 200, 300, 400, 500]
})
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 \`region\`과 \`grade\`의 교차 빈도표를 만드세요.

\`\`\`python
df = pd.DataFrame({
    "region": ["서울", "서울", "부산", "부산", "대전"],
    "grade": ["VIP", "일반", "VIP", "일반", "일반"]
})
\`\`\`

---

### 문제 9. 개념 확인

\`count()\`와 \`nunique()\`의 차이를 설명하세요.

---

### 문제 10. 실무형 문제

다음 주문 데이터에서 요약 리포트를 만드세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- category별 총매출, 주문 건수, 평균 주문 금액을 계산한다.
- 총매출 기준 내림차순으로 정렬한다.
- 전체 매출 대비 category별 매출 비중을 백분율로 계산한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5, 6],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "전자기기"],
    "sales": [300000, 20000, 150000, 50000, 30000, 200000]
})
\`\`\`

---

## 14.19 정답 및 해설

### 문제 1 정답

정답: B

그룹화와 집계는 데이터를 특정 기준으로 묶고, 각 그룹별로 합계, 평균, 개수 같은 계산을 수행하는 작업입니다.

---

### 문제 2 정답

\`\`\`python
df.groupby("category")["sales"].sum().reset_index(name="total_sales")
\`\`\`

\`category\`별로 묶고 \`sales\` 합계를 계산합니다.

---

### 문제 3 정답

방법 1:

\`\`\`python
df.groupby("region")["order_id"].count().reset_index(name="order_count")
\`\`\`

방법 2:

\`\`\`python
df.groupby("region").size().reset_index(name="order_count")
\`\`\`

행 수를 세는 목적이라면 \`size()\`가 더 명확합니다.

---

### 문제 4 정답

\`\`\`python
df.groupby("region")["customer_id"].nunique().reset_index(name="unique_customers")
\`\`\`

고객 수는 중복을 제거한 고유 고객 수로 계산해야 하므로 \`nunique()\`를 사용합니다.

---

### 문제 5 정답

\`\`\`python
summary = (
    df
    .groupby("category")
    .agg(
        total_sales=("sales", "sum"),
        avg_sales=("sales", "mean"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

summary
\`\`\`

\`agg()\`를 사용하면 여러 집계 결과를 한 번에 계산하고 컬럼명도 직접 지정할 수 있습니다.

---

### 문제 6 정답

\`\`\`python
summary = (
    df
    .groupby(["region", "category"])["sales"]
    .sum()
    .reset_index(name="total_sales")
)

summary
\`\`\`

\`region\`과 \`category\` 두 기준으로 데이터를 묶고 \`sales\` 합계를 계산합니다.

---

### 문제 7 정답

\`\`\`python
pivot = pd.pivot_table(
    data=df,
    values="sales",
    index="region",
    columns="category",
    aggfunc="sum",
    fill_value=0
)

pivot
\`\`\`

\`region\`은 행, \`category\`는 열, \`sales\`는 값으로 사용합니다.  
집계 함수는 합계이므로 \`aggfunc="sum"\`을 지정합니다.

---

### 문제 8 정답

\`\`\`python
pd.crosstab(df["region"], df["grade"])
\`\`\`

\`crosstab()\`은 두 범주형 변수의 교차 빈도표를 만들 때 사용합니다.

---

### 문제 9 정답

\`count()\`는 결측치가 아닌 값의 개수를 셉니다.  
\`nunique()\`는 중복을 제거한 고유값의 개수를 셉니다.

예를 들어 같은 고객이 여러 번 주문한 데이터에서 주문 건수는 \`count()\`로 계산할 수 있고, 고객 수는 \`nunique()\`로 계산해야 합니다.

---

### 문제 10 정답

\`\`\`python
report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("sales", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("sales", "mean")
    )
    .reset_index()
)

total_sales = report["total_sales"].sum()

report["sales_ratio_percent"] = (
    report["total_sales"] / total_sales * 100
).round(1)

report = report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

report
\`\`\`

처리 과정은 다음과 같습니다.

1. \`category\` 기준으로 그룹화합니다.
2. 총매출, 주문 건수, 평균 주문 금액을 계산합니다.
3. 전체 매출을 구합니다.
4. 카테고리별 매출 비중을 계산합니다.
5. 총매출 기준으로 내림차순 정렬합니다.

이 결과는 카테고리별 매출 요약 보고서로 사용할 수 있습니다.

---

## 14.20 다음 장 예고

이번 장에서는 그룹화와 집계를 배웠습니다.

다음 장에서는 **데이터 결합**을 배웁니다.

실무 데이터는 하나의 파일에 모두 들어 있는 경우보다 여러 파일이나 여러 테이블로 나뉘어 있는 경우가 많습니다.

예를 들어 다음과 같은 데이터가 따로 있을 수 있습니다.

\`\`\`text
고객 정보
주문 정보
상품 정보
매출 정보
지역 정보
\`\`\`

분석을 하려면 이런 데이터를 하나로 합쳐야 합니다.

다음 장에서는 다음 내용을 다룹니다.

- 데이터 결합이 필요한 이유
- 행 방향 결합 \`concat()\`
- 열 방향 결합
- 공통 key를 기준으로 결합하는 \`merge()\`
- inner join, left join, right join, outer join
- 결합 후 행 개수와 결측치 확인
- 고객 정보와 주문 데이터 결합
- 상품 정보와 매출 데이터 결합

그룹화와 집계가 “데이터를 요약하는 방법”이라면, 데이터 결합은 “분석에 필요한 데이터를 하나로 모으는 방법”입니다.

---

## 참고 문서

- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: \`DataFrame.groupby\`
- pandas 공식 문서: GroupBy aggregation
- pandas 공식 문서: \`DataFrame.agg\`
- pandas 공식 문서: \`pivot_table\`
- pandas 공식 문서: Reshaping and pivot tables
- pandas 공식 문서: \`crosstab\`
`;export{e as default};