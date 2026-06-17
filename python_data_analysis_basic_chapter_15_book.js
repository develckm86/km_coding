var e=`# 15장. 데이터 결합

## 15.0 들어가며

실무 데이터는 하나의 표에 모두 들어 있는 경우보다 여러 파일이나 여러 테이블로 나뉘어 있는 경우가 훨씬 많습니다.

예를 들어 쇼핑몰 주문 분석을 한다고 생각해봅시다.

주문 데이터에는 다음 정보가 들어 있을 수 있습니다.

\`\`\`text
주문번호
고객 ID
상품 ID
주문일
주문 수량
주문 금액
\`\`\`

하지만 고객 이름, 고객 지역, 고객 등급은 주문 데이터가 아니라 고객 데이터에 따로 있을 수 있습니다.

\`\`\`text
고객 ID
고객 이름
지역
고객 등급
가입일
\`\`\`

상품명, 카테고리, 정가도 상품 데이터에 따로 있을 수 있습니다.

\`\`\`text
상품 ID
상품명
카테고리
정가
공급사
\`\`\`

이 상태에서는 주문 데이터만 보고 고객 지역별 매출을 분석하기 어렵습니다.  
상품 카테고리별 매출도 분석하기 어렵습니다.

분석을 하려면 주문 데이터에 고객 데이터와 상품 데이터를 연결해야 합니다.  
이 작업을 **데이터 결합**이라고 합니다.

pandas에서는 데이터를 결합할 때 주로 다음 기능을 사용합니다.

\`\`\`python
pd.concat()
pd.merge()
DataFrame.join()
\`\`\`

기초 데이터 분석 과정에서는 특히 \`concat()\`과 \`merge()\`를 잘 익히는 것이 중요합니다.

- \`concat()\`은 같은 구조의 데이터를 위아래 또는 좌우로 붙일 때 사용합니다.
- \`merge()\`는 공통 key를 기준으로 서로 다른 정보를 연결할 때 사용합니다.

이번 장에서는 여러 데이터를 하나로 합치는 방법과, 결합 후 결과가 올바른지 확인하는 방법을 배웁니다.

데이터 결합은 매우 강력하지만 실수도 많이 발생합니다.  
잘못 결합하면 행 수가 예상보다 늘어나거나, 결측치가 갑자기 생기거나, 매출 합계가 왜곡될 수 있습니다.

따라서 이번 장의 핵심은 단순히 데이터를 합치는 것이 아닙니다.

\`\`\`text
1. 어떤 기준으로 결합할지 정한다.
2. 어떤 방식으로 결합할지 선택한다.
3. 결합 결과의 행 수와 결측치를 확인한다.
4. 결합이 올바르게 되었는지 검증한다.
\`\`\`

이 과정을 익히면 여러 파일로 나뉜 데이터를 분석 가능한 하나의 데이터셋으로 만들 수 있습니다.

---

## 15.1 데이터 결합이 필요한 이유

데이터 결합은 분석에 필요한 정보를 하나의 표로 모으기 위해 필요합니다.

---

### 15.1.1 데이터가 여러 파일로 나뉘어 있는 경우

월별 매출 파일이 따로 저장되어 있다고 생각해봅시다.

\`\`\`text
sales_2026_01.csv
sales_2026_02.csv
sales_2026_03.csv
\`\`\`

각 파일은 같은 컬럼 구조를 가지고 있고, 월만 다릅니다.

이런 경우에는 파일들을 위아래로 붙여 하나의 매출 데이터로 만들어야 합니다.

\`\`\`text
1월 매출 데이터
+ 2월 매출 데이터
+ 3월 매출 데이터
= 전체 매출 데이터
\`\`\`

이때는 \`concat()\`을 사용합니다.

---

### 15.1.2 정보가 여러 테이블로 나뉘어 있는 경우

주문 데이터와 고객 데이터가 따로 있다고 생각해봅시다.

주문 데이터:

\`\`\`text
order_id | customer_id | product_id | total_price
1001     | 1           | P001       | 300000
1002     | 2           | P002       | 45000
\`\`\`

고객 데이터:

\`\`\`text
customer_id | customer_name | region | grade
1           | 민수           | 서울   | VIP
2           | 지영           | 부산   | 일반
\`\`\`

주문 데이터에는 고객 ID만 있고 고객 이름과 지역은 없습니다.  
지역별 매출을 분석하려면 \`customer_id\`를 기준으로 두 데이터를 연결해야 합니다.

이때는 \`merge()\`를 사용합니다.

---

### 15.1.3 분석용 통합 데이터 만들기

분석에서는 여러 데이터를 결합해 분석용 통합 데이터를 만드는 일이 많습니다.

예를 들어 다음 데이터를 결합할 수 있습니다.

\`\`\`text
주문 데이터 + 고객 데이터
주문 데이터 + 상품 데이터
고객 데이터 + 지역 데이터
매출 데이터 + 광고비 데이터
로그 데이터 + 사용자 정보
설문 응답 + 응답자 정보
\`\`\`

이렇게 결합한 데이터는 이후 단계에서 다음 분석에 사용됩니다.

\`\`\`text
지역별 매출 분석
고객 등급별 구매 분석
상품 카테고리별 매출 분석
월별 광고비 대비 매출 분석
사용자 그룹별 행동 분석
\`\`\`

데이터 결합은 본격적인 분석으로 넘어가기 전 중요한 준비 단계입니다.

---

## 15.2 데이터 결합 방식 overview

pandas에서 자주 사용하는 결합 방식은 크게 두 가지입니다.

---

### 15.2.1 이어 붙이기: \`concat()\`

\`concat()\`은 여러 DataFrame을 한 방향으로 이어 붙입니다.

행 방향 결합은 위아래로 붙이는 방식입니다.

\`\`\`text
1월 주문 데이터
2월 주문 데이터
3월 주문 데이터
\`\`\`

위 데이터를 하나로 합칩니다.

\`\`\`text
전체 주문 데이터
\`\`\`

열 방향 결합은 좌우로 붙이는 방식입니다.

\`\`\`text
고객 기본 정보 + 고객 추가 정보
\`\`\`

단, 열 방향 결합은 인덱스가 맞아야 하므로 주의가 필요합니다.

---

### 15.2.2 key 기준 연결하기: \`merge()\`

\`merge()\`는 두 DataFrame을 공통 key 기준으로 연결합니다.

예를 들어 두 데이터에 모두 \`customer_id\`가 있으면 이 값을 기준으로 연결할 수 있습니다.

\`\`\`python
orders.merge(customers, on="customer_id")
\`\`\`

이 방식은 SQL의 join과 비슷합니다.

분석에서 가장 자주 사용하는 결합 방식은 \`left join\`입니다.  
주문 데이터 전체는 유지하면서 고객 정보를 붙이고 싶을 때 사용합니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

---

### 15.2.3 어떤 기능을 써야 할까?

| 상황 | 사용 기능 |
|---|---|
| 같은 구조의 여러 월 파일을 위아래로 붙이기 | \`pd.concat(axis=0)\` |
| 같은 행 순서를 가진 정보를 좌우로 붙이기 | \`pd.concat(axis=1)\` |
| 공통 ID 기준으로 고객 정보를 붙이기 | \`merge()\` |
| 공통 ID 기준으로 상품 정보를 붙이기 | \`merge()\` |
| 인덱스를 기준으로 간단히 붙이기 | \`join()\` |
| 엑셀 피벗처럼 요약표 만들기 | \`pivot_table()\` |

이 장에서는 \`concat()\`과 \`merge()\`를 중심으로 학습합니다.

---

## 15.3 예제 데이터 준비

이번 장에서는 주문 데이터, 고객 데이터, 상품 데이터를 사용합니다.

\`\`\`python
import pandas as pd
\`\`\`

먼저 1월 주문 데이터와 2월 주문 데이터를 만들어보겠습니다.

\`\`\`python
orders_jan = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10"],
    "customer_id": [1, 2, 3],
    "product_id": ["P001", "P002", "P003"],
    "quantity": [1, 3, 2],
    "total_price": [300000, 45000, 50000]
})

orders_feb = pd.DataFrame({
    "order_id": [1004, 1005, 1006],
    "order_date": ["2026-02-02", "2026-02-14", "2026-02-20"],
    "customer_id": [1, 4, 2],
    "product_id": ["P001", "P004", "P003"],
    "quantity": [1, 2, 4],
    "total_price": [220000, 35000, 60000]
})
\`\`\`

고객 데이터입니다.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "customer_name": ["민수", "지영", "철수", "영희", "수진"],
    "region": ["서울", "부산", "서울", "대전", "부산"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP"]
})
\`\`\`

상품 데이터입니다.

\`\`\`python
products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 책", "머그컵", "SQL 책"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

각 데이터를 확인합니다.

\`\`\`python
orders_jan
orders_feb
customers
products
\`\`\`

이제 이 데이터들을 결합해 분석용 주문 데이터를 만들어보겠습니다.

---

## 15.4 행 방향 결합: \`pd.concat(axis=0)\`

가장 기본적인 결합은 같은 구조의 데이터를 위아래로 붙이는 것입니다.

예를 들어 1월 주문 데이터와 2월 주문 데이터는 같은 컬럼 구조를 가지고 있습니다.

\`\`\`python
orders_jan
orders_feb
\`\`\`

이 두 데이터를 하나의 주문 데이터로 합치려면 \`pd.concat()\`을 사용합니다.

---

### 15.4.1 기본 행 방향 결합

\`\`\`python
orders = pd.concat([orders_jan, orders_feb])

orders
\`\`\`

\`pd.concat()\`에는 결합할 DataFrame들을 리스트로 전달합니다.

\`\`\`python
pd.concat([df1, df2, df3])
\`\`\`

기본값은 \`axis=0\`입니다.  
즉, 위아래 방향으로 행을 이어 붙입니다.

다음 두 코드는 같은 의미입니다.

\`\`\`python
pd.concat([orders_jan, orders_feb])
pd.concat([orders_jan, orders_feb], axis=0)
\`\`\`

---

### 15.4.2 인덱스 문제

행 방향으로 결합하면 원래 인덱스가 그대로 유지됩니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb])

orders
\`\`\`

결과를 보면 인덱스가 다음처럼 반복될 수 있습니다.

\`\`\`text
0
1
2
0
1
2
\`\`\`

각 DataFrame의 기존 인덱스가 유지되기 때문입니다.

분석용 데이터에서는 인덱스를 새로 정리하는 것이 좋습니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb], ignore_index=True)

orders
\`\`\`

\`ignore_index=True\`를 사용하면 인덱스를 0부터 다시 부여합니다.

실무에서 여러 파일을 위아래로 붙일 때는 \`ignore_index=True\`를 자주 사용합니다.

---

### 15.4.3 컬럼 순서가 다른 경우

두 DataFrame의 컬럼 순서가 달라도 컬럼 이름을 기준으로 맞춰집니다.

\`\`\`python
orders_mar = pd.DataFrame({
    "customer_id": [5, 3],
    "order_id": [1007, 1008],
    "product_id": ["P002", "P001"],
    "total_price": [30000, 280000],
    "quantity": [2, 1],
    "order_date": ["2026-03-01", "2026-03-05"]
})

orders_all = pd.concat([orders_jan, orders_mar], ignore_index=True)

orders_all
\`\`\`

컬럼 순서가 달라도 같은 컬럼명끼리 맞춰서 결합됩니다.

---

### 15.4.4 컬럼이 일부 다른 경우

두 DataFrame의 컬럼이 완전히 같지 않을 수도 있습니다.

\`\`\`python
orders_apr = pd.DataFrame({
    "order_id": [1009, 1010],
    "order_date": ["2026-04-01", "2026-04-03"],
    "customer_id": [2, 4],
    "product_id": ["P004", "P003"],
    "quantity": [1, 3],
    "total_price": [17500, 75000],
    "coupon_amount": [1000, 0]
})

orders_all = pd.concat([orders_jan, orders_apr], ignore_index=True)

orders_all
\`\`\`

\`orders_apr\`에는 \`coupon_amount\` 컬럼이 있지만 \`orders_jan\`에는 없습니다.  
이 경우 없는 값은 결측치로 채워집니다.

\`\`\`text
orders_jan 행의 coupon_amount → NaN
\`\`\`

이것은 유용할 수도 있지만, 의도하지 않은 결측치가 생긴 것일 수도 있습니다.  
따라서 결합 후에는 컬럼과 결측치를 반드시 확인해야 합니다.

\`\`\`python
orders_all.isna().sum()
\`\`\`

---

### 15.4.5 공통 컬럼만 결합하기

컬럼이 일부 다를 때 공통 컬럼만 유지하고 싶다면 \`join="inner"\`를 사용할 수 있습니다.

\`\`\`python
orders_common = pd.concat(
    [orders_jan, orders_apr],
    ignore_index=True,
    join="inner"
)

orders_common
\`\`\`

기본값은 \`join="outer"\`입니다.  
즉, 모든 컬럼을 유지하고 없는 값은 결측치로 채웁니다.

| 옵션 | 의미 |
|---|---|
| \`join="outer"\` | 모든 컬럼 유지 |
| \`join="inner"\` | 공통 컬럼만 유지 |

실무에서는 일반적으로 모든 컬럼을 유지한 뒤 결측치를 확인하는 방식이 안전합니다.

---

### 15.4.6 데이터 출처 표시하기

여러 월 데이터를 결합할 때 원래 어떤 파일에서 온 데이터인지 표시하고 싶을 수 있습니다.

가장 간단한 방법은 결합 전에 월 컬럼을 추가하는 것입니다.

\`\`\`python
orders_jan_copy = orders_jan.copy()
orders_feb_copy = orders_feb.copy()

orders_jan_copy["source_month"] = "2026-01"
orders_feb_copy["source_month"] = "2026-02"

orders = pd.concat(
    [orders_jan_copy, orders_feb_copy],
    ignore_index=True
)

orders
\`\`\`

데이터 출처를 남기면 결합 후 문제가 생겼을 때 원인을 찾기 쉽습니다.

---

## 15.5 열 방향 결합: \`pd.concat(axis=1)\`

\`concat()\`은 열 방향으로도 데이터를 붙일 수 있습니다.  
이때는 \`axis=1\`을 사용합니다.

\`\`\`python
pd.concat([df1, df2], axis=1)
\`\`\`

하지만 열 방향 결합은 주의해서 사용해야 합니다.  
기본적으로 인덱스를 기준으로 좌우로 붙기 때문입니다.

---

### 15.5.1 기본 열 방향 결합

고객 기본 정보와 고객 추가 정보가 있다고 가정합니다.

\`\`\`python
customer_basic = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"]
})

customer_extra = pd.DataFrame({
    "region": ["서울", "부산", "서울"],
    "grade": ["VIP", "일반", "일반"]
})
\`\`\`

두 데이터를 좌우로 붙입니다.

\`\`\`python
customer_full = pd.concat([customer_basic, customer_extra], axis=1)

customer_full
\`\`\`

두 DataFrame의 행 순서가 정확히 같다면 정상적으로 붙습니다.

---

### 15.5.2 열 방향 결합의 위험

열 방향 결합은 행 순서가 다르면 잘못된 결과가 나올 수 있습니다.

\`\`\`python
customer_basic = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"]
})

customer_extra_wrong = pd.DataFrame({
    "region": ["부산", "서울", "서울"],
    "grade": ["일반", "VIP", "일반"]
})
\`\`\`

이 데이터를 단순히 좌우로 붙이면 고객과 지역이 잘못 연결될 수 있습니다.

\`\`\`python
pd.concat([customer_basic, customer_extra_wrong], axis=1)
\`\`\`

행 순서가 정확히 일치한다는 보장이 없다면 \`concat(axis=1)\`보다 \`merge()\`를 사용하는 것이 안전합니다.

---

### 15.5.3 key가 있다면 \`merge()\`를 사용하기

고객 추가 정보에 \`customer_id\`가 있다면 \`merge()\`가 더 적절합니다.

\`\`\`python
customer_extra = pd.DataFrame({
    "customer_id": [2, 1, 3],
    "region": ["부산", "서울", "서울"],
    "grade": ["일반", "VIP", "일반"]
})

customer_full = customer_basic.merge(
    customer_extra,
    on="customer_id",
    how="left"
)

customer_full
\`\`\`

\`merge()\`는 행 순서가 달라도 \`customer_id\`를 기준으로 올바르게 연결합니다.

정리하면 다음과 같습니다.

| 상황 | 권장 방법 |
|---|---|
| 같은 구조의 데이터를 위아래로 붙이기 | \`concat(axis=0)\` |
| 행 순서가 정확히 같은 데이터를 좌우로 붙이기 | \`concat(axis=1)\` |
| 공통 ID 기준으로 정보를 연결하기 | \`merge()\` |

---

## 15.6 key 기준 결합: \`merge()\`

\`merge()\`는 두 DataFrame을 공통 key 기준으로 연결합니다.

예를 들어 주문 데이터에는 \`customer_id\`가 있고, 고객 데이터에도 \`customer_id\`가 있습니다.

이 공통 컬럼을 기준으로 주문 데이터에 고객 정보를 붙일 수 있습니다.

---

### 15.6.1 기본 \`merge()\`

먼저 1월과 2월 주문을 하나로 합칩니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb], ignore_index=True)
\`\`\`

이제 주문 데이터에 고객 데이터를 붙입니다.

\`\`\`python
orders_with_customer = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

orders_with_customer
\`\`\`

이 코드는 다음 의미입니다.

\`\`\`text
orders를 기준으로 유지하면서,
customer_id가 같은 customers 정보를 붙인다.
\`\`\`

\`on="customer_id"\`는 결합 기준 컬럼입니다.  
\`how="left"\`는 왼쪽 데이터인 \`orders\`를 모두 유지하겠다는 의미입니다.

---

### 15.6.2 \`merge()\` 결과 이해하기

결합 전 주문 데이터에는 고객 ID만 있습니다.

\`\`\`python
orders
\`\`\`

결합 후에는 고객 이름, 지역, 등급이 추가됩니다.

\`\`\`python
orders_with_customer
\`\`\`

이제 다음 분석이 가능해집니다.

\`\`\`python
orders_with_customer.groupby("region")["total_price"].sum()
orders_with_customer.groupby("grade")["total_price"].mean()
\`\`\`

데이터 결합은 분석에 필요한 기준 컬럼을 추가해주는 역할을 합니다.

---

### 15.6.3 상품 데이터 결합하기

주문 데이터에는 \`product_id\`가 있습니다.  
상품 데이터에도 \`product_id\`가 있습니다.

이번에는 상품 정보를 붙여보겠습니다.

\`\`\`python
orders_full = orders_with_customer.merge(
    products,
    on="product_id",
    how="left"
)

orders_full
\`\`\`

이제 주문 데이터에는 고객 정보와 상품 정보가 모두 포함됩니다.

\`\`\`python
orders_full.columns
\`\`\`

분석 가능한 질문이 늘어납니다.

\`\`\`text
지역별 매출
고객 등급별 매출
상품 카테고리별 매출
상품명별 판매 수량
지역별 카테고리 매출
\`\`\`

예를 들어 카테고리별 매출을 계산할 수 있습니다.

\`\`\`python
orders_full.groupby("category")["total_price"].sum()
\`\`\`

---

## 15.7 join 종류 이해하기

\`merge()\`에서 \`how\`는 어떤 방식으로 결합할지 정하는 옵션입니다.

대표적인 join 종류는 다음 네 가지입니다.

| 옵션 | 의미 |
|---|---|
| \`inner\` | 양쪽에 모두 있는 key만 유지 |
| \`left\` | 왼쪽 데이터는 모두 유지 |
| \`right\` | 오른쪽 데이터는 모두 유지 |
| \`outer\` | 양쪽 데이터의 모든 key 유지 |

이 차이를 이해하는 것이 매우 중요합니다.

---

### 15.7.1 예제 데이터

join 종류를 이해하기 위해 간단한 데이터를 만들어보겠습니다.

\`\`\`python
left = pd.DataFrame({
    "id": [1, 2, 3],
    "left_value": ["A", "B", "C"]
})

right = pd.DataFrame({
    "id": [2, 3, 4],
    "right_value": ["X", "Y", "Z"]
})
\`\`\`

왼쪽 데이터에는 ID 1, 2, 3이 있습니다.  
오른쪽 데이터에는 ID 2, 3, 4가 있습니다.

공통으로 있는 ID는 2와 3입니다.

---

### 15.7.2 inner join

\`inner join\`은 양쪽에 모두 있는 key만 남깁니다.

\`\`\`python
pd.merge(left, right, on="id", how="inner")
\`\`\`

결과에는 ID 2와 3만 남습니다.

\`\`\`text
id 2
id 3
\`\`\`

ID 1은 오른쪽에 없고, ID 4는 왼쪽에 없으므로 제외됩니다.

\`inner join\`은 양쪽 데이터가 모두 존재하는 경우만 분석하고 싶을 때 사용합니다.

---

### 15.7.3 left join

\`left join\`은 왼쪽 데이터를 모두 유지합니다.

\`\`\`python
pd.merge(left, right, on="id", how="left")
\`\`\`

결과에는 왼쪽 데이터의 ID 1, 2, 3이 모두 남습니다.

ID 1은 오른쪽에 매칭되는 값이 없으므로 \`right_value\`가 결측치가 됩니다.

\`\`\`text
id 1 → right_value 없음
id 2 → 매칭됨
id 3 → 매칭됨
\`\`\`

실무 분석에서는 \`left join\`을 가장 많이 사용합니다.  
분석의 기준이 되는 데이터, 예를 들어 주문 데이터를 모두 유지하면서 고객 정보나 상품 정보를 붙이고 싶기 때문입니다.

---

### 15.7.4 right join

\`right join\`은 오른쪽 데이터를 모두 유지합니다.

\`\`\`python
pd.merge(left, right, on="id", how="right")
\`\`\`

결과에는 오른쪽 데이터의 ID 2, 3, 4가 모두 남습니다.

ID 4는 왼쪽에 매칭되는 값이 없으므로 \`left_value\`가 결측치가 됩니다.

\`right join\`은 사용할 수 있지만, 실무에서는 왼쪽과 오른쪽을 바꾸어 \`left join\`으로 표현하는 경우가 많습니다.

---

### 15.7.5 outer join

\`outer join\`은 양쪽 데이터의 모든 key를 유지합니다.

\`\`\`python
pd.merge(left, right, on="id", how="outer")
\`\`\`

결과에는 ID 1, 2, 3, 4가 모두 포함됩니다.

\`\`\`text
id 1 → 왼쪽에만 있음
id 2 → 양쪽에 있음
id 3 → 양쪽에 있음
id 4 → 오른쪽에만 있음
\`\`\`

\`outer join\`은 두 데이터의 key 차이를 확인하거나 전체 key 목록을 보존하고 싶을 때 사용합니다.

---

### 15.7.6 join 종류 비교 표

| id | left 존재 | right 존재 | inner | left | right | outer |
|---:|---|---|---|---|---|---|
| 1 | 있음 | 없음 | 제외 | 포함 | 제외 | 포함 |
| 2 | 있음 | 있음 | 포함 | 포함 | 포함 | 포함 |
| 3 | 있음 | 있음 | 포함 | 포함 | 포함 | 포함 |
| 4 | 없음 | 있음 | 제외 | 제외 | 포함 | 포함 |

join을 선택할 때는 분석의 기준 데이터를 무엇으로 둘지 생각해야 합니다.

\`\`\`text
주문 데이터 전체를 유지할 것인가?
고객 데이터 전체를 유지할 것인가?
양쪽에 모두 있는 데이터만 볼 것인가?
매칭되지 않은 데이터도 확인할 것인가?
\`\`\`

---

## 15.8 결합 key가 다른 이름일 때

두 DataFrame의 key 컬럼 이름이 항상 같지는 않습니다.

예를 들어 주문 데이터에는 \`customer_id\`라는 컬럼이 있고, 고객 데이터에는 \`id\`라는 컬럼이 있을 수 있습니다.

\`\`\`python
orders_sample = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "customer_id": [1, 2, 3],
    "total_price": [300000, 45000, 50000]
})

customers_sample = pd.DataFrame({
    "id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"],
    "region": ["서울", "부산", "서울"]
})
\`\`\`

이때는 \`left_on\`과 \`right_on\`을 사용합니다.

\`\`\`python
orders_sample.merge(
    customers_sample,
    left_on="customer_id",
    right_on="id",
    how="left"
)
\`\`\`

의미는 다음과 같습니다.

\`\`\`text
왼쪽 DataFrame의 customer_id와
오른쪽 DataFrame의 id를 기준으로 결합한다.
\`\`\`

결합 후에는 \`customer_id\`와 \`id\`가 모두 남을 수 있습니다.  
불필요한 key 컬럼은 제거할 수 있습니다.

\`\`\`python
merged = orders_sample.merge(
    customers_sample,
    left_on="customer_id",
    right_on="id",
    how="left"
)

merged = merged.drop(columns=["id"])

merged
\`\`\`

실무에서는 결합 전에 컬럼명을 통일하는 것도 좋은 방법입니다.

\`\`\`python
customers_sample = customers_sample.rename(columns={"id": "customer_id"})

orders_sample.merge(customers_sample, on="customer_id", how="left")
\`\`\`

---

## 15.9 여러 key를 기준으로 결합하기

하나의 key만으로는 데이터를 정확히 연결할 수 없을 때가 있습니다.

예를 들어 지점별 상품 가격 데이터가 있다고 합시다.  
같은 상품이라도 지점마다 가격이 다를 수 있습니다.

이 경우 \`product_id\`만으로 결합하면 안 되고, \`store_id\`와 \`product_id\`를 함께 기준으로 사용해야 합니다.

---

### 15.9.1 예제 데이터

\`\`\`python
sales = pd.DataFrame({
    "store_id": ["S1", "S1", "S2", "S2"],
    "product_id": ["P001", "P002", "P001", "P002"],
    "quantity": [2, 3, 1, 4]
})

store_prices = pd.DataFrame({
    "store_id": ["S1", "S1", "S2", "S2"],
    "product_id": ["P001", "P002", "P001", "P002"],
    "unit_price": [300000, 15000, 310000, 14000]
})
\`\`\`

두 컬럼을 기준으로 결합합니다.

\`\`\`python
sales_with_price = sales.merge(
    store_prices,
    on=["store_id", "product_id"],
    how="left"
)

sales_with_price
\`\`\`

이제 매출을 계산할 수 있습니다.

\`\`\`python
sales_with_price["total_price"] = (
    sales_with_price["quantity"] * sales_with_price["unit_price"]
)

sales_with_price
\`\`\`

---

### 15.9.2 여러 key 결합이 필요한 경우

여러 key 결합은 다음과 같은 상황에서 사용됩니다.

\`\`\`text
지점 ID + 상품 ID
날짜 + 상품 ID
고객 ID + 주문일
국가 + 도시
학년 + 반 + 학생 번호
회사 ID + 부서 ID
\`\`\`

하나의 key로만 결합하면 중복 매칭이 발생할 수 있습니다.  
정확한 결합 기준이 여러 컬럼이라면 반드시 여러 key를 사용해야 합니다.

---

## 15.10 겹치는 컬럼명 처리: \`suffixes\`

두 DataFrame에 key가 아닌 같은 이름의 컬럼이 있으면 pandas가 자동으로 접미사를 붙입니다.

예를 들어 두 데이터에 모두 \`name\` 컬럼이 있다고 해봅시다.

\`\`\`python
orders_sample = pd.DataFrame({
    "order_id": [1001, 1002],
    "customer_id": [1, 2],
    "name": ["주문A", "주문B"]
})

customers_sample = pd.DataFrame({
    "customer_id": [1, 2],
    "name": ["민수", "지영"],
    "region": ["서울", "부산"]
})
\`\`\`

결합해봅니다.

\`\`\`python
orders_sample.merge(
    customers_sample,
    on="customer_id",
    how="left"
)
\`\`\`

결과에는 다음과 같은 컬럼이 생길 수 있습니다.

\`\`\`text
name_x
name_y
\`\`\`

\`name_x\`는 왼쪽 데이터의 \`name\`, \`name_y\`는 오른쪽 데이터의 \`name\`입니다.

이름이 헷갈릴 수 있으므로 \`suffixes\`를 지정하는 것이 좋습니다.

\`\`\`python
merged = orders_sample.merge(
    customers_sample,
    on="customer_id",
    how="left",
    suffixes=("_order", "_customer")
)

merged
\`\`\`

이제 컬럼명이 더 명확해집니다.

\`\`\`text
name_order
name_customer
\`\`\`

실무에서는 결합 전 컬럼명을 명확히 바꾸는 것도 좋은 방법입니다.

\`\`\`python
orders_sample = orders_sample.rename(columns={"name": "order_name"})
customers_sample = customers_sample.rename(columns={"name": "customer_name"})
\`\`\`

컬럼명이 명확하면 결합 후 혼란을 줄일 수 있습니다.

---

## 15.11 결합 상태 확인: \`indicator\`

\`merge()\`에서 \`indicator=True\`를 사용하면 각 행이 어디에서 왔는지 확인할 수 있습니다.

\`\`\`python
left = pd.DataFrame({
    "id": [1, 2, 3],
    "left_value": ["A", "B", "C"]
})

right = pd.DataFrame({
    "id": [2, 3, 4],
    "right_value": ["X", "Y", "Z"]
})

merged = pd.merge(
    left,
    right,
    on="id",
    how="outer",
    indicator=True
)

merged
\`\`\`

결과에는 \`_merge\` 컬럼이 추가됩니다.

\`\`\`text
left_only   → 왼쪽에만 있음
right_only  → 오른쪽에만 있음
both        → 양쪽에 모두 있음
\`\`\`

이 기능은 결합 결과를 검증할 때 매우 유용합니다.

예를 들어 주문 데이터에 고객 정보를 붙였는데 고객 정보가 없는 주문이 있는지 확인할 수 있습니다.

\`\`\`python
orders_customer_check = orders.merge(
    customers,
    on="customer_id",
    how="left",
    indicator=True
)

orders_customer_check["_merge"].value_counts()
\`\`\`

\`left_only\`가 있다면 주문 데이터에는 있지만 고객 데이터에는 없는 고객 ID가 있다는 뜻입니다.

\`\`\`python
orders_customer_check[orders_customer_check["_merge"] == "left_only"]
\`\`\`

이런 행은 별도로 확인해야 합니다.

---

## 15.12 결합 관계 검증: \`validate\`

\`merge()\`에는 결합 관계가 예상과 맞는지 확인하는 \`validate\` 옵션이 있습니다.

예를 들어 주문 데이터는 고객 ID가 여러 번 나올 수 있습니다.  
한 고객이 여러 번 주문할 수 있기 때문입니다.

반면 고객 데이터에서는 고객 ID가 한 번만 나와야 합니다.

이 관계는 다음과 같습니다.

\`\`\`text
orders: customer_id 여러 번 가능
customers: customer_id 한 번만 가능
\`\`\`

즉, many-to-one 관계입니다.

\`\`\`python
orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

만약 오른쪽 고객 데이터에 같은 \`customer_id\`가 여러 번 있으면 오류가 발생합니다.  
이렇게 하면 잘못된 결합으로 행 수가 늘어나는 문제를 미리 막을 수 있습니다.

---

### 15.12.1 validate 옵션 종류

| 옵션 | 의미 |
|---|---|
| \`"one_to_one"\` | 양쪽 key가 모두 유일해야 함 |
| \`"one_to_many"\` | 왼쪽 key는 유일, 오른쪽 key는 중복 가능 |
| \`"many_to_one"\` | 왼쪽 key는 중복 가능, 오른쪽 key는 유일 |
| \`"many_to_many"\` | 양쪽 key 모두 중복 가능 |

주문 데이터와 고객 데이터 결합은 보통 \`many_to_one\`입니다.

\`\`\`text
여러 주문 → 한 고객 정보
\`\`\`

주문 데이터와 상품 데이터 결합도 보통 \`many_to_one\`입니다.

\`\`\`text
여러 주문 → 한 상품 정보
\`\`\`

고객 정보와 고객 등급 코드표 결합도 보통 \`many_to_one\`입니다.

\`\`\`text
여러 고객 → 한 등급 설명
\`\`\`

---

### 15.12.2 중복 key 확인하기

\`validate\` 오류가 발생하면 key 중복을 확인해야 합니다.

예를 들어 고객 데이터에서 중복된 고객 ID를 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

상품 데이터에서 중복된 상품 ID를 확인합니다.

\`\`\`python
products[products.duplicated(subset=["product_id"], keep=False)]
\`\`\`

결합 전에 오른쪽 기준표의 key가 유일한지 확인하는 습관이 중요합니다.

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

\`is_unique\`가 \`True\`이면 해당 Series의 값이 모두 고유하다는 뜻입니다.

---

## 15.13 결합 후 검증하기

데이터 결합에서 가장 중요한 부분은 결합 후 검증입니다.

결합 코드를 실행했다고 끝이 아닙니다.  
결과가 예상과 맞는지 반드시 확인해야 합니다.

---

### 15.13.1 결합 전후 행 수 확인

먼저 결합 전후 행 수를 확인합니다.

\`\`\`python
before_rows = len(orders)

orders_with_customer = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

after_rows = len(orders_with_customer)

before_rows, after_rows
\`\`\`

\`left join\`으로 고객 정보를 붙였다면 행 수는 보통 유지되어야 합니다.

\`\`\`text
결합 전 주문 행 수 = 결합 후 행 수
\`\`\`

만약 행 수가 늘어났다면 오른쪽 데이터의 key가 중복되어 있을 가능성이 있습니다.

---

### 15.13.2 결합 후 결측치 확인

결합 후 새로 붙인 컬럼에 결측치가 있는지 확인합니다.

\`\`\`python
orders_with_customer[["customer_name", "region", "grade"]].isna().sum()
\`\`\`

결측치가 있다면 매칭되지 않은 key가 있다는 뜻일 수 있습니다.

\`\`\`python
orders_with_customer[orders_with_customer["customer_name"].isna()]
\`\`\`

이 행의 \`customer_id\`가 고객 데이터에 있는지 확인합니다.

\`\`\`python
missing_customer_ids = orders_with_customer.loc[
    orders_with_customer["customer_name"].isna(),
    "customer_id"
].unique()

missing_customer_ids
\`\`\`

---

### 15.13.3 key 목록 비교하기

주문 데이터의 고객 ID와 고객 데이터의 고객 ID를 비교할 수 있습니다.

\`\`\`python
order_customer_ids = set(orders["customer_id"])
master_customer_ids = set(customers["customer_id"])

order_customer_ids - master_customer_ids
\`\`\`

이 결과는 주문 데이터에는 있지만 고객 데이터에는 없는 고객 ID입니다.

반대로 고객 데이터에는 있지만 주문 데이터에는 없는 고객 ID도 확인할 수 있습니다.

\`\`\`python
master_customer_ids - order_customer_ids
\`\`\`

이런 key 비교는 결합 전후 검증에 유용합니다.

---

### 15.13.4 집계값이 유지되는지 확인

고객 정보를 붙인다고 해서 주문 금액 합계가 달라지면 안 됩니다.

\`\`\`python
orders["total_price"].sum()
orders_with_customer["total_price"].sum()
\`\`\`

두 값이 같아야 합니다.

만약 결합 후 합계가 커졌다면 중복 매칭으로 행이 늘어났을 가능성이 있습니다.

예를 들어 오른쪽 데이터의 \`customer_id\`가 중복되어 있으면 한 주문이 여러 고객 정보와 매칭되어 행이 늘어날 수 있습니다.

---

### 15.13.5 \`_merge\` 컬럼으로 검증하기

\`indicator=True\`를 사용하면 매칭 상태를 쉽게 확인할 수 있습니다.

\`\`\`python
check = orders.merge(
    customers,
    on="customer_id",
    how="left",
    indicator=True
)

check["_merge"].value_counts()
\`\`\`

\`left join\`에서 \`_merge\`가 \`both\`이면 정상 매칭입니다.  
\`left_only\`가 있다면 왼쪽 주문 데이터에만 있고 고객 데이터에는 없는 key입니다.

---

## 15.14 실무 예제 1: 월별 주문 파일 합치기

월별 주문 파일을 하나로 합치는 상황을 연습해보겠습니다.

---

### 15.14.1 월별 데이터 준비

\`\`\`python
orders_jan = pd.DataFrame({
    "order_id": [1001, 1002],
    "order_date": ["2026-01-03", "2026-01-05"],
    "customer_id": [1, 2],
    "total_price": [300000, 45000]
})

orders_feb = pd.DataFrame({
    "order_id": [1003, 1004],
    "order_date": ["2026-02-10", "2026-02-14"],
    "customer_id": [3, 1],
    "total_price": [50000, 220000]
})

orders_mar = pd.DataFrame({
    "order_id": [1005, 1006],
    "order_date": ["2026-03-01", "2026-03-15"],
    "customer_id": [4, 2],
    "total_price": [35000, 60000]
})
\`\`\`

---

### 15.14.2 출처 월 컬럼 추가

\`\`\`python
orders_jan["source_month"] = "2026-01"
orders_feb["source_month"] = "2026-02"
orders_mar["source_month"] = "2026-03"
\`\`\`

---

### 15.14.3 \`concat()\`으로 결합

\`\`\`python
orders_all = pd.concat(
    [orders_jan, orders_feb, orders_mar],
    ignore_index=True
)

orders_all
\`\`\`

---

### 15.14.4 결합 결과 확인

\`\`\`python
len(orders_jan) + len(orders_feb) + len(orders_mar)
len(orders_all)
\`\`\`

두 값이 같아야 합니다.

컬럼별 결측치도 확인합니다.

\`\`\`python
orders_all.isna().sum()
\`\`\`

주문번호 중복도 확인합니다.

\`\`\`python
orders_all.duplicated(subset=["order_id"]).sum()
\`\`\`

월별 주문 수를 확인합니다.

\`\`\`python
orders_all["source_month"].value_counts().sort_index()
\`\`\`

---

## 15.15 실무 예제 2: 주문 데이터에 고객 정보 붙이기

월별 주문 데이터를 하나로 합친 뒤 고객 정보를 붙여보겠습니다.

---

### 15.15.1 고객 데이터 준비

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "customer_name": ["민수", "지영", "철수", "영희", "수진"],
    "region": ["서울", "부산", "서울", "대전", "부산"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP"]
})
\`\`\`

---

### 15.15.2 고객 ID 중복 확인

고객 데이터에서는 \`customer_id\`가 유일해야 합니다.

\`\`\`python
customers["customer_id"].is_unique
\`\`\`

중복이 있다면 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

---

### 15.15.3 \`left join\`으로 고객 정보 결합

\`\`\`python
orders_customer = orders_all.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer
\`\`\`

---

### 15.15.4 매칭 상태 확인

\`\`\`python
orders_customer["_merge"].value_counts()
\`\`\`

모두 \`both\`라면 주문 데이터의 모든 고객 ID가 고객 데이터와 매칭된 것입니다.

\`left_only\`가 있다면 고객 정보가 없는 주문입니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

검증이 끝났다면 \`_merge\` 컬럼을 제거할 수 있습니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

---

### 15.15.5 지역별 매출 분석

이제 지역 정보가 붙었으므로 지역별 매출을 계산할 수 있습니다.

\`\`\`python
region_sales = (
    orders_customer
    .groupby("region")["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

---

## 15.16 실무 예제 3: 주문 데이터에 상품 정보 붙이기

이번에는 상품 정보를 붙입니다.

---

### 15.16.1 주문 데이터에 상품 ID 추가

예제용 주문 데이터에 상품 ID가 있다고 가정합니다.

\`\`\`python
orders_all = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006],
    "order_date": ["2026-01-03", "2026-01-05", "2026-02-10", "2026-02-14", "2026-03-01", "2026-03-15"],
    "customer_id": [1, 2, 3, 1, 4, 2],
    "product_id": ["P001", "P002", "P003", "P001", "P004", "P003"],
    "quantity": [1, 3, 2, 1, 2, 4],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000]
})
\`\`\`

상품 데이터입니다.

\`\`\`python
products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 책", "머그컵", "SQL 책"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

---

### 15.16.2 상품 정보 결합

\`\`\`python
orders_product = orders_all.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_product
\`\`\`

---

### 15.16.3 매칭 확인

\`\`\`python
orders_product["_merge"].value_counts()
\`\`\`

매칭되지 않은 상품이 있는지 확인합니다.

\`\`\`python
orders_product[orders_product["_merge"] == "left_only"]
\`\`\`

검증 후 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_product = orders_product.drop(columns=["_merge"])
\`\`\`

---

### 15.16.4 카테고리별 매출 분석

\`\`\`python
category_sales = (
    orders_product
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

상품 정보를 결합했기 때문에 카테고리별 분석이 가능해졌습니다.

---

## 15.17 실무 예제 4: 고객, 상품 정보를 모두 붙인 분석용 데이터 만들기

이번에는 주문 데이터에 고객 정보와 상품 정보를 모두 결합해 분석용 통합 데이터를 만들어보겠습니다.

\`\`\`python
orders_full = (
    orders_all
    .merge(
        customers,
        on="customer_id",
        how="left",
        validate="many_to_one"
    )
    .merge(
        products,
        on="product_id",
        how="left",
        validate="many_to_one"
    )
)

orders_full
\`\`\`

이제 \`orders_full\`에는 다음 정보가 모두 들어 있습니다.

\`\`\`text
주문 정보
고객 정보
상품 정보
\`\`\`

분석 가능한 질문이 많아집니다.

\`\`\`python
orders_full.groupby("region")["total_price"].sum()
orders_full.groupby("grade")["total_price"].mean()
orders_full.groupby("category")["quantity"].sum()
orders_full.groupby(["region", "category"])["total_price"].sum()
\`\`\`

분석용 통합 데이터는 이후 EDA와 시각화의 기본 데이터가 됩니다.

---

## 15.18 결합 후 데이터 품질 점검 체크리스트

데이터를 결합한 뒤에는 반드시 품질을 점검해야 합니다.

---

### 15.18.1 행 수 확인

\`\`\`python
len_before = len(orders_all)
len_after = len(orders_full)

len_before, len_after
\`\`\`

\`left join\`으로 고객과 상품 정보를 붙였다면 행 수는 유지되는 것이 일반적입니다.

행 수가 늘어났다면 오른쪽 데이터의 key 중복을 의심해야 합니다.

---

### 15.18.2 key 중복 확인

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

중복 key가 있으면 확인합니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
products[products.duplicated(subset=["product_id"], keep=False)]
\`\`\`

---

### 15.18.3 결측치 확인

결합 후 붙인 컬럼에 결측치가 있는지 확인합니다.

\`\`\`python
orders_full[["customer_name", "region", "grade", "product_name", "category"]].isna().sum()
\`\`\`

결측치가 있다면 매칭되지 않은 key가 있을 수 있습니다.

---

### 15.18.4 매출 합계 확인

결합 전후 매출 합계가 유지되는지 확인합니다.

\`\`\`python
orders_all["total_price"].sum()
orders_full["total_price"].sum()
\`\`\`

두 값이 달라졌다면 결합이 잘못되었을 가능성이 있습니다.

---

### 15.18.5 예상하지 못한 중복 행 확인

결합 후 주문번호가 중복되었는지 확인합니다.

\`\`\`python
orders_full.duplicated(subset=["order_id"]).sum()
\`\`\`

원래 주문번호가 유일해야 한다면 이 값은 0이어야 합니다.

---

## 15.19 결합 시 자주 하는 실수

데이터 결합은 실무에서 오류가 매우 자주 발생하는 작업입니다.  
이번 절에서는 초보자가 자주 하는 실수를 정리합니다.

---

### 15.19.1 행 순서만 믿고 좌우로 붙이는 실수

\`\`\`python
pd.concat([orders, customers], axis=1)
\`\`\`

행 순서가 정확히 같지 않으면 고객 정보가 잘못 붙을 수 있습니다.  
공통 ID가 있다면 \`merge()\`를 사용하는 것이 안전합니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

---

### 15.19.2 결합 key를 확인하지 않는 실수

결합 전에 key 컬럼이 있는지 확인해야 합니다.

\`\`\`python
orders.columns
customers.columns
\`\`\`

key의 자료형도 확인해야 합니다.

\`\`\`python
orders["customer_id"].dtype
customers["customer_id"].dtype
\`\`\`

한쪽은 정수, 한쪽은 문자열이면 결합이 제대로 되지 않을 수 있습니다.

\`\`\`python
orders["customer_id"] = orders["customer_id"].astype(str)
customers["customer_id"] = customers["customer_id"].astype(str)
\`\`\`

단, 자료형 변환은 데이터 의미에 맞게 신중하게 해야 합니다.

---

### 15.19.3 오른쪽 기준표의 key 중복을 확인하지 않는 실수

고객 데이터나 상품 데이터의 key가 중복되어 있으면 결합 후 행 수가 늘어날 수 있습니다.

\`\`\`python
customers["customer_id"].is_unique
\`\`\`

중복이 있다면 결합 전에 정리해야 합니다.

\`\`\`python
customers = customers.drop_duplicates(subset=["customer_id"])
\`\`\`

하지만 어떤 행을 남길지 기준이 필요합니다.  
최신 정보가 있다면 날짜 기준으로 정렬 후 최신 행을 남길 수 있습니다.

---

### 15.19.4 join 방식을 잘못 선택하는 실수

\`inner join\`을 사용하면 매칭되지 않는 행이 사라집니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="inner")
\`\`\`

주문 데이터 전체를 유지해야 하는 분석에서 \`inner join\`을 쓰면 고객 정보가 없는 주문이 사라질 수 있습니다.

주문 데이터 전체를 유지하려면 \`left join\`을 사용하는 것이 일반적입니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

---

### 15.19.5 결합 후 검증하지 않는 실수

결합 후에는 최소한 다음을 확인해야 합니다.

\`\`\`python
len(before)
len(after)
df.isna().sum()
df["amount"].sum()
df.duplicated(subset=["key"]).sum()
\`\`\`

결합 코드는 실행되었더라도 결과가 맞는지는 별개의 문제입니다.

---

### 15.19.6 겹치는 컬럼명을 방치하는 실수

결합 후 \`name_x\`, \`name_y\` 같은 컬럼이 생기면 의미가 불명확합니다.

\`\`\`python
df.merge(other, on="id")
\`\`\`

\`suffixes\`를 사용하거나 결합 전 컬럼명을 명확히 바꾸는 것이 좋습니다.

\`\`\`python
df.merge(other, on="id", suffixes=("_order", "_customer"))
\`\`\`

---

### 15.19.7 many-to-many 결합을 모르고 사용하는 실수

양쪽 데이터 모두 key가 중복되어 있으면 many-to-many 결합이 발생합니다.  
이 경우 행 수가 크게 늘어날 수 있습니다.

예를 들어 왼쪽에 ID 1이 2개, 오른쪽에 ID 1이 3개 있으면 결합 결과는 6행이 됩니다.

\`\`\`text
2 × 3 = 6
\`\`\`

이것이 의도한 결과인지 반드시 확인해야 합니다.

\`validate\` 옵션을 사용하면 예상하지 못한 결합 관계를 방지할 수 있습니다.

\`\`\`python
orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)
\`\`\`

---

## 15.20 실무 미니 프로젝트: 분석용 주문 데이터 만들기

이번 장에서 배운 내용을 하나로 묶어 분석용 주문 데이터를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 월별 주문 데이터를 위아래로 결합한다.
2. 고객 데이터와 상품 데이터를 준비한다.
3. 고객 ID, 상품 ID 중복을 확인한다.
4. 주문 데이터에 고객 정보를 붙인다.
5. 주문 데이터에 상품 정보를 붙인다.
6. 결합 전후 행 수와 매출 합계를 확인한다.
7. 결합 후 결측치를 확인한다.
8. 지역별, 카테고리별 매출 요약표를 만든다.
\`\`\`

---

### 15.20.1 월별 주문 데이터 준비

\`\`\`python
orders_jan = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10"],
    "customer_id": [1, 2, 3],
    "product_id": ["P001", "P002", "P003"],
    "quantity": [1, 3, 2],
    "total_price": [300000, 45000, 50000]
})

orders_feb = pd.DataFrame({
    "order_id": [1004, 1005, 1006],
    "order_date": ["2026-02-02", "2026-02-14", "2026-02-20"],
    "customer_id": [1, 4, 2],
    "product_id": ["P001", "P004", "P003"],
    "quantity": [1, 2, 4],
    "total_price": [220000, 35000, 60000]
})

orders_mar = pd.DataFrame({
    "order_id": [1007, 1008, 1009],
    "order_date": ["2026-03-01", "2026-03-15", "2026-03-20"],
    "customer_id": [5, 2, 6],
    "product_id": ["P002", "P003", "P999"],
    "quantity": [2, 1, 1],
    "total_price": [30000, 25000, 100000]
})
\`\`\`

3월 데이터에는 \`product_id\`가 \`P999\`인 주문이 있습니다.  
상품 데이터에 이 상품이 없으면 결합 후 결측치가 생길 것입니다.

---

### 15.20.2 월별 데이터 결합

\`\`\`python
orders_jan["source_month"] = "2026-01"
orders_feb["source_month"] = "2026-02"
orders_mar["source_month"] = "2026-03"

orders_all = pd.concat(
    [orders_jan, orders_feb, orders_mar],
    ignore_index=True
)

orders_all["order_date"] = pd.to_datetime(orders_all["order_date"])

orders_all
\`\`\`

---

### 15.20.3 고객 데이터와 상품 데이터 준비

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "customer_name": ["민수", "지영", "철수", "영희", "수진"],
    "region": ["서울", "부산", "서울", "대전", "부산"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP"]
})

products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 책", "머그컵", "SQL 책"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

---

### 15.20.4 key 중복 확인

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
orders_all.duplicated(subset=["order_id"]).sum()
\`\`\`

고객 ID와 상품 ID는 기준표에서 유일해야 합니다.  
주문 ID도 주문 데이터에서 유일한 것이 일반적입니다.

---

### 15.20.5 결합 전 상태 저장

결합 후 검증을 위해 결합 전 행 수와 매출 합계를 저장합니다.

\`\`\`python
before_rows = len(orders_all)
before_sales = orders_all["total_price"].sum()

before_rows, before_sales
\`\`\`

---

### 15.20.6 고객 정보 결합

\`\`\`python
orders_customer = orders_all.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer["_merge"].value_counts()
\`\`\`

매칭되지 않은 고객을 확인합니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

검증 후 \`_merge\`를 제거합니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

---

### 15.20.7 상품 정보 결합

\`\`\`python
orders_full = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_full["_merge"].value_counts()
\`\`\`

상품 정보가 없는 주문을 확인합니다.

\`\`\`python
orders_full[orders_full["_merge"] == "left_only"]
\`\`\`

\`P999\`가 상품 데이터에 없으므로 해당 주문은 상품명과 카테고리가 결측치가 됩니다.

검증 후 \`_merge\`를 제거합니다.

\`\`\`python
orders_full = orders_full.drop(columns=["_merge"])
\`\`\`

---

### 15.20.8 결합 후 검증

\`\`\`python
after_rows = len(orders_full)
after_sales = orders_full["total_price"].sum()

before_rows, after_rows, before_sales, after_sales
\`\`\`

\`left join\`을 사용했으므로 행 수와 매출 합계는 유지되어야 합니다.

결측치를 확인합니다.

\`\`\`python
orders_full.isna().sum()
\`\`\`

상품 정보가 없는 행을 확인합니다.

\`\`\`python
orders_full[orders_full["product_name"].isna()]
\`\`\`

고객 정보가 없는 행도 확인합니다.

\`\`\`python
orders_full[orders_full["customer_name"].isna()]
\`\`\`

---

### 15.20.9 분석용 컬럼 정리

\`\`\`python
analysis_columns = [
    "order_id",
    "order_date",
    "source_month",
    "customer_id",
    "customer_name",
    "region",
    "grade",
    "product_id",
    "product_name",
    "category",
    "quantity",
    "unit_price",
    "total_price"
]

orders_analysis = orders_full[analysis_columns].copy()

orders_analysis
\`\`\`

---

### 15.20.10 요약 분석

지역별 매출입니다.

\`\`\`python
region_sales = (
    orders_analysis
    .groupby("region", dropna=False)["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

카테고리별 매출입니다.

\`\`\`python
category_sales = (
    orders_analysis
    .groupby("category", dropna=False)["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

\`dropna=False\`를 사용하면 결측치 그룹도 함께 표시할 수 있습니다.  
상품 정보가 없는 주문의 카테고리가 결측치로 남아 있다면 별도 그룹으로 확인할 수 있습니다.

---

### 15.20.11 처리 기준 문서화

분석 노트북이나 보고서에는 다음과 같이 결합 기준을 남길 수 있습니다.

\`\`\`text
데이터 결합 기준
- 1월, 2월, 3월 주문 데이터는 같은 컬럼 구조이므로 concat으로 행 방향 결합했다.
- 결합 시 ignore_index=True로 인덱스를 새로 부여했다.
- 주문 데이터는 customer_id 기준으로 고객 데이터와 left join했다.
- 주문 데이터는 product_id 기준으로 상품 데이터와 left join했다.
- customers.customer_id와 products.product_id는 결합 전 유일성을 확인했다.
- merge에는 validate="many_to_one"을 사용해 기준표 중복을 검증했다.
- 결합 전후 주문 행 수와 total_price 합계가 유지되는지 확인했다.
- product_id P999는 상품 데이터에 없어 product_name과 category가 결측치로 남았다.
\`\`\`

이런 기록은 데이터 분석 결과를 신뢰할 수 있게 만드는 중요한 근거가 됩니다.

---

## 15.21 핵심 정리

이번 장에서는 pandas에서 데이터를 결합하는 방법을 배웠습니다.

같은 구조의 데이터를 위아래로 붙일 때는 \`pd.concat()\`을 사용합니다.

\`\`\`python
orders = pd.concat([orders_jan, orders_feb], ignore_index=True)
\`\`\`

행 방향 결합에서는 인덱스가 중복될 수 있으므로 \`ignore_index=True\`를 자주 사용합니다.

서로 다른 정보를 공통 key 기준으로 연결할 때는 \`merge()\`를 사용합니다.

\`\`\`python
orders.merge(customers, on="customer_id", how="left")
\`\`\`

\`merge()\`에서 중요한 옵션은 다음과 같습니다.

| 옵션 | 의미 |
|---|---|
| \`on\` | 결합 기준 컬럼 |
| \`left_on\`, \`right_on\` | 양쪽 key 컬럼명이 다를 때 사용 |
| \`how\` | 결합 방식 |
| \`suffixes\` | 겹치는 컬럼명 접미사 |
| \`indicator\` | 매칭 상태 확인 |
| \`validate\` | 결합 관계 검증 |

join 종류는 다음과 같습니다.

| 방식 | 의미 |
|---|---|
| \`inner\` | 양쪽에 모두 있는 key만 유지 |
| \`left\` | 왼쪽 데이터는 모두 유지 |
| \`right\` | 오른쪽 데이터는 모두 유지 |
| \`outer\` | 양쪽 데이터의 모든 key 유지 |

실무 분석에서는 기준 데이터 전체를 유지하기 위해 \`left join\`을 자주 사용합니다.

결합 후에는 반드시 검증해야 합니다.

\`\`\`python
len(before)
len(after)
df.isna().sum()
df["total_price"].sum()
df.duplicated(subset=["order_id"]).sum()
\`\`\`

데이터 결합은 분석용 데이터셋을 만드는 핵심 과정입니다.  
잘못 결합하면 분석 결과가 크게 왜곡될 수 있으므로, 결합 기준과 검증 과정을 항상 명확히 남기는 습관이 필요합니다.

---

## 15.22 연습문제

### 문제 1. 개념 확인

같은 컬럼 구조를 가진 여러 월별 주문 데이터를 위아래로 붙일 때 가장 적절한 pandas 함수는 무엇인가요?

A. \`pd.merge()\`  
B. \`pd.concat()\`  
C. \`pd.to_datetime()\`  
D. \`pd.crosstab()\`

---

### 문제 2. 코드 작성

다음 두 DataFrame을 행 방향으로 결합하고 인덱스를 새로 부여하세요.

\`\`\`python
df1 = pd.DataFrame({
    "id": [1, 2],
    "value": [100, 200]
})

df2 = pd.DataFrame({
    "id": [3, 4],
    "value": [300, 400]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 주문 데이터와 고객 데이터를 \`customer_id\` 기준으로 left join하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "customer_id": [1, 2, 4],
    "sales": [10000, 20000, 30000]
})

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer_name": ["민수", "지영", "철수"]
})
\`\`\`

---

### 문제 4. 개념 확인

\`left join\`의 의미를 설명하세요.

---

### 문제 5. 코드 작성

다음 두 DataFrame에서 왼쪽 key는 \`customer_id\`, 오른쪽 key는 \`id\`입니다.  
두 데이터를 결합하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2],
    "customer_id": [10, 20]
})

customers = pd.DataFrame({
    "id": [10, 20],
    "name": ["민수", "지영"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 \`store_id\`와 \`product_id\` 두 컬럼을 기준으로 결합하세요.

\`\`\`python
sales = pd.DataFrame({
    "store_id": ["S1", "S1", "S2"],
    "product_id": ["P1", "P2", "P1"],
    "quantity": [2, 3, 1]
})

prices = pd.DataFrame({
    "store_id": ["S1", "S1", "S2"],
    "product_id": ["P1", "P2", "P1"],
    "unit_price": [1000, 2000, 1100]
})
\`\`\`

---

### 문제 7. 코드 작성

\`merge()\` 결과에서 매칭 상태를 확인할 수 있도록 \`_merge\` 컬럼을 추가하는 옵션을 사용해 결합하세요.

\`\`\`python
left = pd.DataFrame({
    "id": [1, 2, 3]
})

right = pd.DataFrame({
    "id": [2, 3, 4]
})
\`\`\`

---

### 문제 8. 개념 확인

결합 후 행 수가 예상보다 늘어났다면 어떤 문제를 의심해야 하나요?

---

### 문제 9. 코드 작성

다음 고객 데이터에서 \`customer_id\`가 유일한지 확인하는 코드를 작성하세요.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 2, 3],
    "name": ["민수", "지영", "지영", "철수"]
})
\`\`\`

---

### 문제 10. 실무형 문제

다음 주문 데이터, 고객 데이터, 상품 데이터를 결합하여 분석용 데이터를 만드세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- 주문 데이터는 기준 데이터로 유지한다.
- customer_id 기준으로 고객 정보를 left join한다.
- product_id 기준으로 상품 정보를 left join한다.
- 결합 전후 행 수와 sales 합계가 유지되는지 확인한다.
- 결합 후 결측치를 확인한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "customer_id": [10, 20, 30, 40],
    "product_id": ["P1", "P2", "P1", "P9"],
    "sales": [10000, 20000, 15000, 50000]
})

customers = pd.DataFrame({
    "customer_id": [10, 20, 30],
    "name": ["민수", "지영", "철수"],
    "region": ["서울", "부산", "대전"]
})

products = pd.DataFrame({
    "product_id": ["P1", "P2"],
    "product_name": ["키보드", "마우스"],
    "category": ["전자기기", "전자기기"]
})
\`\`\`

---

## 15.23 정답 및 해설

### 문제 1 정답

정답: B

같은 구조의 여러 DataFrame을 위아래 또는 좌우로 이어 붙일 때는 \`pd.concat()\`을 사용합니다.

---

### 문제 2 정답

\`\`\`python
result = pd.concat([df1, df2], ignore_index=True)

result
\`\`\`

\`ignore_index=True\`를 사용하면 결합 후 인덱스를 0부터 다시 부여합니다.

---

### 문제 3 정답

\`\`\`python
result = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

result
\`\`\`

주문 데이터를 기준으로 유지하면서 고객 정보를 붙입니다.  
\`customer_id\`가 4인 주문은 고객 데이터에 없으므로 \`customer_name\`이 결측치가 됩니다.

---

### 문제 4 정답

\`left join\`은 왼쪽 DataFrame의 모든 행을 유지하면서 오른쪽 DataFrame에서 key가 일치하는 정보를 붙이는 결합 방식입니다.

오른쪽에 매칭되는 key가 없으면 오른쪽에서 가져온 컬럼 값은 결측치가 됩니다.

---

### 문제 5 정답

\`\`\`python
result = orders.merge(
    customers,
    left_on="customer_id",
    right_on="id",
    how="left"
)

result
\`\`\`

왼쪽과 오른쪽의 key 컬럼명이 다르므로 \`left_on\`과 \`right_on\`을 사용합니다.

---

### 문제 6 정답

\`\`\`python
result = sales.merge(
    prices,
    on=["store_id", "product_id"],
    how="left"
)

result
\`\`\`

두 컬럼을 함께 기준으로 결합해야 지점별 상품 가격이 올바르게 붙습니다.

---

### 문제 7 정답

\`\`\`python
result = left.merge(
    right,
    on="id",
    how="outer",
    indicator=True
)

result
\`\`\`

\`indicator=True\`를 사용하면 \`_merge\` 컬럼이 추가되어 각 행이 \`left_only\`, \`right_only\`, \`both\` 중 어디에 해당하는지 확인할 수 있습니다.

---

### 문제 8 정답

결합 후 행 수가 예상보다 늘어났다면 오른쪽 DataFrame의 key가 중복되어 있을 가능성을 의심해야 합니다.

예를 들어 주문 데이터에 고객 정보를 붙일 때 고객 데이터에 같은 \`customer_id\`가 여러 번 있으면, 한 주문이 여러 고객 행과 매칭되어 행 수가 늘어날 수 있습니다.

이런 문제를 방지하려면 결합 전 key 중복을 확인하고, \`validate="many_to_one"\` 같은 옵션을 사용할 수 있습니다.

---

### 문제 9 정답

\`\`\`python
customers["customer_id"].is_unique
\`\`\`

중복된 고객 ID를 직접 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
customers[customers.duplicated(subset=["customer_id"], keep=False)]
\`\`\`

---

### 문제 10 정답

\`\`\`python
before_rows = len(orders)
before_sales = orders["sales"].sum()

orders_with_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one"
)

orders_full = orders_with_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one"
)

after_rows = len(orders_full)
after_sales = orders_full["sales"].sum()

print("결합 전 행 수:", before_rows)
print("결합 후 행 수:", after_rows)
print("결합 전 sales 합계:", before_sales)
print("결합 후 sales 합계:", after_sales)

orders_full.isna().sum()
\`\`\`

매칭되지 않은 고객과 상품을 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders_full[orders_full["name"].isna()]
orders_full[orders_full["product_name"].isna()]
\`\`\`

이 예제에서는 \`customer_id\` 40이 고객 데이터에 없고, \`product_id\` P9가 상품 데이터에 없습니다.  
따라서 결합 후 해당 행의 고객 정보 또는 상품 정보에 결측치가 생깁니다.

하지만 \`left join\`을 사용했기 때문에 주문 데이터의 행 수와 \`sales\` 합계는 유지됩니다.

---

## 15.24 다음 장 예고

이번 장에서는 여러 데이터를 결합하는 방법을 배웠습니다.

다음 장에서는 **기본 통계 이해**를 배웁니다.

데이터를 불러오고, 정리하고, 결합했다면 이제 데이터를 요약하고 해석해야 합니다.

다음 장에서는 다음 내용을 다룹니다.

- 기술통계란 무엇인가
- 평균, 중앙값, 최빈값
- 최솟값, 최댓값, 범위
- 분산과 표준편차
- 사분위수와 분포
- 상관관계 기초
- 평균과 중앙값을 함께 봐야 하는 이유
- 상관관계와 인과관계의 차이

데이터 결합이 분석용 데이터를 만드는 과정이라면, 기본 통계는 그 데이터를 이해하고 설명하는 과정입니다.

---

## 참고 문서

- pandas 공식 문서: Merge, join, concatenate and compare
- pandas 공식 문서: \`pandas.concat\`
- pandas 공식 문서: \`pandas.merge\`
- pandas 공식 문서: \`DataFrame.join\`
- pandas 공식 문서: \`DataFrame.merge\`
`;export{e as default};