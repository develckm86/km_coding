var e=`# 8장. 데이터 정렬과 순위

## 8.0 들어가며

데이터를 처음 불러오면 행의 순서가 분석에 적합하지 않은 경우가 많습니다.  
파일에 저장된 순서가 오래된 순서일 수도 있고, 입력된 순서일 수도 있으며, 단순히 시스템에서 내려준 순서일 수도 있습니다.

하지만 분석을 할 때는 다음과 같은 질문을 자주 하게 됩니다.

- 매출이 가장 높은 상품은 무엇인가?
- 구매 금액이 가장 큰 고객은 누구인가?
- 주문일이 가장 최근인 데이터는 무엇인가?
- 리뷰 점수가 낮은 상품은 무엇인가?
- 상품별 판매량 순위는 어떻게 되는가?
- 같은 점수를 받은 데이터는 어떻게 순위를 매길 것인가?

이런 질문에 답하려면 데이터를 원하는 기준으로 **정렬**하고, 필요한 경우 **순위**를 계산할 수 있어야 합니다.

정렬은 단순히 데이터를 보기 좋게 만드는 기능이 아닙니다.  
데이터를 비교하고, 상위 데이터와 하위 데이터를 찾고, 이상한 값을 발견하고, 분석 대상을 좁히는 데 필요한 기본 도구입니다.

이번 장에서는 pandas에서 데이터를 정렬하고 순위를 계산하는 방법을 배웁니다.

---

## 8.1 정렬이 필요한 이유

정렬은 데이터를 특정 기준에 따라 순서대로 배치하는 작업입니다.  
예를 들어 주문 금액이 큰 순서대로 정렬하면 매출에 가장 크게 기여한 주문을 쉽게 찾을 수 있습니다.

다음과 같은 데이터가 있다고 생각해봅시다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006],
    "customer": ["민수", "지영", "철수", "영희", "민수", "지영"],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "전자기기"],
    "order_date": ["2026-01-03", "2026-01-01", "2026-01-05", "2026-01-02", "2026-01-04", "2026-01-06"],
    "quantity": [1, 3, 2, 5, 4, 1],
    "total_price": [300000, 45000, 160000, 50000, 60000, 300000],
    "review_score": [5, 4, 3, 4, 5, 2]
})

orders
\`\`\`

이 데이터는 주문번호 순서로 정리되어 있습니다.  
하지만 분석 질문에 따라 보고 싶은 순서는 달라집니다.

예를 들어 다음 질문들은 각각 다른 정렬 기준을 요구합니다.

| 분석 질문 | 정렬 기준 |
|---|---|
| 가장 비싼 주문은 무엇인가? | \`total_price\` 내림차순 |
| 가장 최근 주문은 무엇인가? | \`order_date\` 내림차순 |
| 리뷰 점수가 낮은 주문은 무엇인가? | \`review_score\` 오름차순 |
| 주문 수량이 많은 주문은 무엇인가? | \`quantity\` 내림차순 |
| 고객 이름순으로 보고 싶은가? | \`customer\` 오름차순 |

정렬은 데이터를 바꾸는 것이 아니라, **데이터를 바라보는 순서를 바꾸는 작업**이라고 이해하면 좋습니다.

물론 정렬된 결과를 새 변수에 저장하면 이후 분석에서 그 순서를 계속 사용할 수 있습니다.

---

## 8.2 값 기준 정렬: \`sort_values()\`

pandas에서 특정 컬럼의 값을 기준으로 정렬할 때는 \`sort_values()\`를 사용합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.sort_values(by="컬럼명")
\`\`\`

여기서 \`by\`는 어떤 컬럼을 기준으로 정렬할지 지정하는 인자입니다.

---

### 8.2.1 오름차순 정렬

오름차순 정렬은 작은 값에서 큰 값으로 정렬하는 방식입니다.  
문자열이라면 가나다순 또는 알파벳순으로 정렬됩니다.

\`\`\`python
orders.sort_values(by="total_price")
\`\`\`

위 코드는 \`total_price\`가 작은 주문부터 큰 주문 순서로 정렬합니다.

예상되는 흐름은 다음과 같습니다.

\`\`\`text
45,000
50,000
60,000
160,000
300,000
300,000
\`\`\`

기본값은 오름차순입니다.  
따라서 아래 두 코드는 같은 의미입니다.

\`\`\`python
orders.sort_values(by="total_price")
orders.sort_values(by="total_price", ascending=True)
\`\`\`

---

### 8.2.2 내림차순 정렬

내림차순 정렬은 큰 값에서 작은 값으로 정렬하는 방식입니다.  
상위 데이터를 보고 싶을 때 많이 사용합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

이 코드는 주문 금액이 큰 순서대로 데이터를 정렬합니다.

\`\`\`text
300,000
300,000
160,000
60,000
50,000
45,000
\`\`\`

실무에서는 내림차순 정렬을 자주 사용합니다.  
매출, 주문 수량, 방문자 수, 점수처럼 “큰 값이 중요한 지표”가 많기 때문입니다.

---

### 8.2.3 정렬 결과는 원본을 자동으로 바꾸지 않는다

pandas에서 많은 메서드는 원본 데이터를 직접 바꾸지 않고, 변경된 결과를 새로 반환합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

위 코드를 실행하면 정렬된 결과가 화면에 보입니다.  
하지만 \`orders\` 자체가 영구적으로 정렬되는 것은 아닙니다.

정렬된 결과를 계속 사용하려면 새 변수에 저장해야 합니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)

sorted_orders
\`\`\`

원본을 확인해보면 원래 순서가 유지됩니다.

\`\`\`python
orders
\`\`\`

초보 단계에서는 \`inplace=True\`를 사용하는 것보다, 정렬 결과를 새 변수에 저장하는 방식을 권장합니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)
\`\`\`

이 방식은 원본 데이터와 정렬된 데이터를 구분할 수 있어 실수를 줄이는 데 도움이 됩니다.

---

### 8.2.4 여러 컬럼 기준으로 정렬하기

하나의 컬럼만으로 정렬 기준이 충분하지 않을 때가 있습니다.

예를 들어 주문 금액이 같은 경우에는 리뷰 점수가 높은 순서로 다시 정렬하고 싶을 수 있습니다.

\`\`\`python
orders.sort_values(
    by=["total_price", "review_score"],
    ascending=[False, False]
)
\`\`\`

위 코드는 다음 순서로 정렬합니다.

1. \`total_price\`를 기준으로 내림차순 정렬
2. \`total_price\`가 같으면 \`review_score\`를 기준으로 내림차순 정렬

여러 컬럼을 기준으로 정렬할 때는 \`by\`에 컬럼명을 리스트로 전달합니다.  
각 컬럼마다 오름차순과 내림차순을 다르게 지정하고 싶다면 \`ascending\`에도 리스트를 전달합니다.

다음 예를 봅시다.

\`\`\`python
orders.sort_values(
    by=["category", "total_price"],
    ascending=[True, False]
)
\`\`\`

이 코드는 먼저 \`category\`를 오름차순으로 정렬하고, 같은 카테고리 안에서는 \`total_price\`를 내림차순으로 정렬합니다.

실무에서는 다음과 같은 상황에서 여러 기준 정렬을 사용합니다.

- 지역별로 정렬한 뒤, 지역 안에서 매출이 높은 순서로 보기
- 부서별로 정렬한 뒤, 부서 안에서 근속연수가 긴 순서로 보기
- 카테고리별로 정렬한 뒤, 카테고리 안에서 판매량이 많은 순서로 보기
- 날짜순으로 정렬한 뒤, 같은 날짜 안에서 주문 금액이 큰 순서로 보기

---

### 8.2.5 결측치가 있는 컬럼 정렬하기

정렬 기준 컬럼에 결측치가 있을 수 있습니다.

다음 데이터를 보겠습니다.

\`\`\`python
products = pd.DataFrame({
    "product": ["키보드", "마우스", "모니터", "노트북", "스피커"],
    "price": [30000, 15000, 200000, None, 70000],
    "stock": [10, 50, 7, 3, 20]
})

products
\`\`\`

\`price\` 컬럼에는 \`None\` 값이 있습니다.  
pandas에서는 이런 값을 결측치로 처리합니다.

기본적으로 정렬할 때 결측치는 뒤쪽에 배치됩니다.

\`\`\`python
products.sort_values(by="price")
\`\`\`

결측치를 앞쪽에 배치하고 싶다면 \`na_position="first"\`를 사용합니다.

\`\`\`python
products.sort_values(by="price", na_position="first")
\`\`\`

결측치를 뒤쪽에 두려면 다음처럼 작성합니다.

\`\`\`python
products.sort_values(by="price", na_position="last")
\`\`\`

결측치가 있는 데이터를 정렬할 때는 결측치가 어디에 배치되는지 확인해야 합니다.  
특히 상위 또는 하위 데이터를 추출할 때 결측치가 분석 결과에 영향을 줄 수 있습니다.

---

### 8.2.6 정렬 후 인덱스 정리하기

정렬을 하면 행의 순서는 바뀌지만 기존 인덱스는 그대로 유지됩니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)

sorted_orders
\`\`\`

결과를 보면 행의 순서는 바뀌었지만 왼쪽 인덱스는 원래 행 번호를 유지합니다.  
이것은 pandas가 “이 행이 원래 몇 번째 행이었는지” 기억하고 있기 때문입니다.

하지만 보고서나 결과 파일을 만들 때는 인덱스를 0부터 다시 정리하고 싶을 수 있습니다.

이때는 \`reset_index()\`를 사용합니다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)
sorted_orders = sorted_orders.reset_index(drop=True)

sorted_orders
\`\`\`

\`drop=True\`를 지정하면 기존 인덱스를 새 컬럼으로 남기지 않고 버립니다.

또는 \`sort_values()\`에서 바로 \`ignore_index=True\`를 사용할 수도 있습니다.

\`\`\`python
orders.sort_values(
    by="total_price",
    ascending=False,
    ignore_index=True
)
\`\`\`

정렬 결과를 새로운 표처럼 사용할 때는 인덱스를 정리하는 습관이 도움이 됩니다.

---

## 8.3 인덱스 기준 정렬: \`sort_index()\`

값 기준 정렬이 컬럼의 값을 기준으로 행을 정렬하는 것이라면,  
인덱스 기준 정렬은 행의 **인덱스 라벨**을 기준으로 데이터를 정렬하는 것입니다.

\`\`\`python
df.sort_index()
\`\`\`

예를 들어 정렬이나 필터링 후 인덱스 순서가 섞인 데이터가 있다고 가정해봅시다.

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)

sorted_orders
\`\`\`

이 데이터는 주문 금액 기준으로 정렬되어 있으므로 인덱스 순서가 0, 1, 2, 3처럼 이어지지 않을 수 있습니다.

이때 인덱스 기준으로 다시 원래 순서에 가깝게 정렬하려면 다음처럼 작성합니다.

\`\`\`python
sorted_orders.sort_index()
\`\`\`

\`sort_index()\`는 다음과 같은 상황에서 사용합니다.

- 인덱스가 날짜일 때 날짜순으로 정렬하기
- 필터링 후 인덱스 순서를 다시 확인하기
- 컬럼 이름을 알파벳순으로 정렬하기
- 인덱스가 분석 기준일 때 정렬하기

---

### 8.3.1 행 인덱스 정렬

기본적으로 \`sort_index()\`는 행 인덱스를 기준으로 정렬합니다.

\`\`\`python
sorted_orders.sort_index()
\`\`\`

내림차순으로 정렬하려면 \`ascending=False\`를 사용합니다.

\`\`\`python
sorted_orders.sort_index(ascending=False)
\`\`\`

---

### 8.3.2 컬럼 이름 기준 정렬

\`axis=1\`을 지정하면 컬럼 이름 기준으로 정렬할 수 있습니다.

\`\`\`python
orders.sort_index(axis=1)
\`\`\`

이 코드는 컬럼명을 알파벳순으로 정렬합니다.

컬럼이 많고 이름이 뒤섞여 있을 때 컬럼 구조를 확인하는 데 도움이 될 수 있습니다.  
하지만 실무 분석에서는 컬럼 순서가 의미를 가지는 경우도 많으므로, 무조건 컬럼을 정렬하기보다는 필요한 상황에서만 사용하는 것이 좋습니다.

---

### 8.3.3 \`sort_index()\`와 \`reset_index()\`의 차이

두 메서드는 비슷해 보이지만 역할이 다릅니다.

| 메서드 | 역할 |
|---|---|
| \`sort_index()\` | 기존 인덱스 값을 기준으로 행 순서를 정렬 |
| \`reset_index()\` | 인덱스를 0부터 다시 부여 |

예를 들어 정렬된 결과가 있을 때:

\`\`\`python
sorted_orders = orders.sort_values(by="total_price", ascending=False)
\`\`\`

기존 인덱스 순서로 되돌려 보고 싶으면:

\`\`\`python
sorted_orders.sort_index()
\`\`\`

현재 정렬 순서는 유지하면서 인덱스만 다시 매기고 싶으면:

\`\`\`python
sorted_orders.reset_index(drop=True)
\`\`\`

정리하면 다음과 같습니다.

- **행 순서를 인덱스 기준으로 다시 정렬하고 싶다** → \`sort_index()\`
- **현재 행 순서는 유지하고 번호만 다시 붙이고 싶다** → \`reset_index(drop=True)\`

---

## 8.4 상위 데이터와 하위 데이터 추출

정렬을 배우는 가장 큰 이유 중 하나는 상위 또는 하위 데이터를 찾기 위해서입니다.

예를 들어 다음과 같은 질문을 생각할 수 있습니다.

- 주문 금액 상위 3건은 무엇인가?
- 리뷰 점수 하위 2건은 무엇인가?
- 재고가 가장 적은 상품은 무엇인가?
- 매출이 가장 높은 고객은 누구인가?

이런 질문에 답하는 방법은 크게 두 가지입니다.

1. \`sort_values()\`로 정렬한 뒤 \`head()\` 또는 \`tail()\` 사용
2. \`nlargest()\` 또는 \`nsmallest()\` 사용

---

### 8.4.1 \`sort_values()\`와 \`head()\`

주문 금액이 큰 상위 3건을 보려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

해석하면 다음과 같습니다.

1. \`total_price\` 기준으로 내림차순 정렬한다.
2. 위에서 3개 행만 선택한다.

이 방식은 직관적입니다.  
정렬과 추출 과정이 눈에 잘 보이기 때문에 초보자가 이해하기 좋습니다.

---

### 8.4.2 \`sort_values()\`와 \`tail()\`

오름차순으로 정렬한 뒤 마지막 몇 개를 볼 수도 있습니다.

\`\`\`python
orders.sort_values(by="total_price").tail(3)
\`\`\`

하지만 상위 데이터를 구할 때는 보통 내림차순 정렬 후 \`head()\`를 사용하는 편이 더 명확합니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

하위 데이터를 구할 때는 오름차순 정렬 후 \`head()\`를 사용하는 것이 좋습니다.

\`\`\`python
orders.sort_values(by="total_price").head(3)
\`\`\`

---

### 8.4.3 \`nlargest()\`

\`nlargest()\`는 특정 컬럼에서 값이 가장 큰 행을 빠르게 가져오는 메서드입니다.

\`\`\`python
orders.nlargest(3, "total_price")
\`\`\`

이 코드는 \`total_price\`가 가장 큰 3개 행을 반환합니다.

아래 코드와 비슷한 결과를 냅니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

\`nlargest()\`는 “큰 값 상위 n개”를 찾는 목적이 분명할 때 사용하기 좋습니다.

---

### 8.4.4 \`nsmallest()\`

\`nsmallest()\`는 특정 컬럼에서 값이 가장 작은 행을 가져오는 메서드입니다.

\`\`\`python
orders.nsmallest(3, "total_price")
\`\`\`

이 코드는 \`total_price\`가 가장 작은 3개 행을 반환합니다.

아래 코드와 비슷한 결과를 냅니다.

\`\`\`python
orders.sort_values(by="total_price").head(3)
\`\`\`

---

### 8.4.5 \`nlargest()\`와 \`nsmallest()\` 사용 시 주의점

\`nlargest()\`와 \`nsmallest()\`는 숫자형 컬럼에서 상위 또는 하위 값을 찾을 때 사용하기 좋습니다.

예를 들어 다음과 같은 컬럼에 적합합니다.

- 매출
- 주문 금액
- 수량
- 점수
- 방문자 수
- 가격
- 재고

반면 문자열 컬럼을 기준으로 가나다순 정렬을 하고 싶다면 \`sort_values()\`를 사용하는 것이 더 적절합니다.

\`\`\`python
orders.sort_values(by="customer")
\`\`\`

정리하면 다음과 같습니다.

| 목적 | 권장 방법 |
|---|---|
| 특정 숫자 컬럼의 상위 n개 찾기 | \`nlargest()\` |
| 특정 숫자 컬럼의 하위 n개 찾기 | \`nsmallest()\` |
| 문자열, 날짜, 여러 기준 정렬 | \`sort_values()\` |
| 정렬 과정을 명확히 보여주기 | \`sort_values().head()\` |

---

## 8.5 순위 계산: \`rank()\`

정렬은 데이터를 순서대로 배치하는 작업입니다.  
반면 순위 계산은 각 행에 “몇 등인지”를 부여하는 작업입니다.

예를 들어 주문 금액 기준으로 순위를 매기면 다음과 같은 컬럼을 만들 수 있습니다.

\`\`\`text
주문 금액 300000 → 1등
주문 금액 160000 → 3등
주문 금액 60000  → 4등
\`\`\`

pandas에서는 \`rank()\`를 사용해 순위를 계산합니다.

---

### 8.5.1 기본 순위 계산

\`total_price\` 기준으로 순위를 계산해봅시다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank()

orders
\`\`\`

기본 설정에서는 작은 값이 1등입니다.  
즉, 오름차순 기준으로 순위가 매겨집니다.

하지만 매출이나 주문 금액 분석에서는 보통 큰 값이 1등이어야 합니다.  
이때는 \`ascending=False\`를 사용합니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(ascending=False)

orders
\`\`\`

이제 \`total_price\`가 큰 주문일수록 더 높은 순위를 갖습니다.

---

### 8.5.2 순위는 기본적으로 실수로 표시된다

\`rank()\` 결과는 보통 \`1.0\`, \`2.0\`, \`3.0\`처럼 실수 형태로 나옵니다.

\`\`\`python
orders["total_price"].rank(ascending=False)
\`\`\`

그 이유는 동점자가 있을 때 평균 순위를 부여할 수 있기 때문입니다.

예를 들어 주문 금액이 같은 데이터가 두 개 있고, 이들이 1등과 2등 자리를 함께 차지한다면 기본 방식에서는 두 행 모두 \`1.5\`등이 됩니다.

---

### 8.5.3 동점자 처리 방식

\`rank()\`에서 가장 중요한 부분은 동점자 처리입니다.

\`method\` 인자를 사용하면 동점자 순위를 어떻게 매길지 정할 수 있습니다.

\`\`\`python
orders["rank_average"] = orders["total_price"].rank(
    ascending=False,
    method="average"
)
\`\`\`

주요 방식은 다음과 같습니다.

| method | 의미 |
|---|---|
| \`"average"\` | 동점자의 평균 순위 부여 |
| \`"min"\` | 동점자에게 가장 높은 순위 번호 부여 |
| \`"max"\` | 동점자에게 가장 낮은 순위 번호 부여 |
| \`"first"\` | 데이터에 등장한 순서대로 순위 부여 |
| \`"dense"\` | 동점자는 같은 순위, 다음 순위는 바로 다음 번호 |

말만 보면 헷갈릴 수 있으므로 예제로 확인해봅시다.

\`\`\`python
scores = pd.DataFrame({
    "name": ["A", "B", "C", "D"],
    "score": [100, 90, 90, 80]
})

scores
\`\`\`

내림차순으로 순위를 매겨보겠습니다.

\`\`\`python
scores["rank_average"] = scores["score"].rank(ascending=False, method="average")
scores["rank_min"] = scores["score"].rank(ascending=False, method="min")
scores["rank_max"] = scores["score"].rank(ascending=False, method="max")
scores["rank_first"] = scores["score"].rank(ascending=False, method="first")
scores["rank_dense"] = scores["score"].rank(ascending=False, method="dense")

scores
\`\`\`

결과를 개념적으로 정리하면 다음과 같습니다.

| 이름 | 점수 | average | min | max | first | dense |
|---|---:|---:|---:|---:|---:|---:|
| A | 100 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 |
| B | 90 | 2.5 | 2.0 | 3.0 | 2.0 | 2.0 |
| C | 90 | 2.5 | 2.0 | 3.0 | 3.0 | 2.0 |
| D | 80 | 4.0 | 4.0 | 4.0 | 4.0 | 3.0 |

실무에서는 상황에 따라 적절한 방식을 선택해야 합니다.

- 스포츠 경기처럼 공동 2등 다음을 4등으로 둘 수 있다면 \`min\`
- 동점자를 같은 순위로 묶고 다음 순위를 바로 이어가려면 \`dense\`
- 입력 순서가 의미가 있다면 \`first\`
- 통계적 평균 순위가 필요하다면 \`average\`

일반적인 매출 순위표에서는 \`dense\`를 사용하면 보기 편한 경우가 많습니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
)
\`\`\`

---

### 8.5.4 순위를 정수로 변환하기

순위 결과가 \`1.0\`, \`2.0\`처럼 보이는 것이 어색할 수 있습니다.  
동점자 처리 방식으로 \`dense\`나 \`min\`을 사용하면 순위를 정수로 변환할 수 있습니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders
\`\`\`

다만 \`average\` 방식은 \`2.5\` 같은 값이 나올 수 있으므로 무조건 정수로 바꾸면 의미가 왜곡될 수 있습니다.

---

### 8.5.5 순위 기준 정렬하기

순위 컬럼을 만든 뒤에는 그 순위 컬럼을 기준으로 다시 정렬할 수 있습니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders.sort_values(by="price_rank")
\`\`\`

이렇게 하면 순위가 높은 데이터부터 볼 수 있습니다.

사실 \`total_price\` 자체를 내림차순 정렬해도 비슷하게 볼 수 있지만, 순위 컬럼을 추가하면 보고서 형태로 정리하기 좋습니다.

---

### 8.5.6 백분위 순위

\`rank()\`에는 \`pct=True\` 옵션이 있습니다.  
이 옵션을 사용하면 순위를 비율 형태로 계산합니다.

\`\`\`python
orders["price_rank_pct"] = orders["total_price"].rank(
    ascending=False,
    pct=True
)

orders
\`\`\`

백분위 순위는 전체 데이터에서 상대적인 위치를 보고 싶을 때 사용합니다.

예를 들어 고객 구매 금액 데이터에서 상위 10% 고객을 구분하거나, 점수 데이터에서 상대적 위치를 판단할 때 사용할 수 있습니다.

기초 과정에서는 백분위 순위를 깊게 다루지 않습니다.  
다만 \`rank()\`가 단순한 등수뿐 아니라 상대적 위치를 계산하는 데도 쓰일 수 있다는 점만 기억하면 됩니다.

---

## 8.6 실무 정렬 패턴

이번 절에서는 정렬과 순위 계산을 실제 분석 질문에 연결해봅니다.

---

### 8.6.1 매출 상위 주문 찾기

질문:

> 주문 금액이 가장 큰 주문 3건은 무엇인가?

\`\`\`python
orders.sort_values(by="total_price", ascending=False).head(3)
\`\`\`

또는:

\`\`\`python
orders.nlargest(3, "total_price")
\`\`\`

상위 데이터만 빠르게 확인하려면 \`nlargest()\`가 편합니다.  
하지만 정렬 기준을 여러 개 사용하거나 정렬 결과를 자세히 보고 싶다면 \`sort_values()\`가 더 유연합니다.

---

### 8.6.2 리뷰 점수가 낮은 주문 찾기

질문:

> 리뷰 점수가 가장 낮은 주문은 무엇인가?

\`\`\`python
orders.sort_values(by="review_score").head()
\`\`\`

리뷰 점수가 낮은 데이터는 고객 불만이나 상품 문제를 파악하는 데 도움이 될 수 있습니다.

\`\`\`python
low_review_orders = orders.sort_values(by="review_score").head(3)

low_review_orders
\`\`\`

---

### 8.6.3 최신 주문 확인하기

날짜 데이터가 문자열이어도 \`"YYYY-MM-DD"\` 형식이면 문자열 정렬로도 어느 정도 날짜순 정렬이 가능합니다.  
하지만 실제 분석에서는 날짜형으로 변환한 뒤 정렬하는 것이 안전합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])

orders.sort_values(by="order_date", ascending=False)
\`\`\`

최신 주문 3건만 보고 싶다면 다음과 같이 작성합니다.

\`\`\`python
orders.sort_values(by="order_date", ascending=False).head(3)
\`\`\`

날짜와 시간 데이터 처리는 13장에서 더 자세히 다룹니다.

---

### 8.6.4 여러 기준으로 우선순위 정하기

질문:

> 리뷰 점수가 높은 주문을 먼저 보고, 리뷰 점수가 같으면 주문 금액이 큰 주문을 먼저 보고 싶다.

\`\`\`python
orders.sort_values(
    by=["review_score", "total_price"],
    ascending=[False, False]
)
\`\`\`

이런 정렬은 우선순위를 정할 때 유용합니다.

예를 들어 다음과 같은 상황에서 사용합니다.

- 점수가 높은 사람 중에서 제출 시간이 빠른 순서로 정렬
- 매출이 높은 상품 중에서 재고가 적은 순서로 정렬
- 고객 등급이 높은 고객 중에서 구매 금액이 큰 순서로 정렬

---

### 8.6.5 순위 컬럼 만들기

질문:

> 주문 금액 기준 순위 컬럼을 만들고 싶다.

\`\`\`python
orders["sales_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders.sort_values(by="sales_rank")
\`\`\`

보고서에는 정렬된 순서만 있는 것보다, 순위 컬럼이 함께 있으면 읽기 좋습니다.

\`\`\`text
1위: 주문 금액 300000
2위: 주문 금액 160000
3위: 주문 금액 60000
\`\`\`

순위 컬럼은 다음 장들에서 집계 결과를 정리할 때도 자주 사용됩니다.

---

## 8.7 실무 미니 프로젝트: 주문 데이터 순위표 만들기

이번 장에서 배운 내용을 하나로 묶어 간단한 순위표를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 만든다.
2. 주문일을 날짜형으로 변환한다.
3. 총 주문 금액 기준으로 순위를 만든다.
4. 주문 금액 상위 5건을 추출한다.
5. 리뷰 점수가 낮은 주문을 따로 확인한다.
6. 최종 결과를 보기 좋게 정렬한다.
\`\`\`

---

### 8.7.1 데이터 준비

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008],
    "customer": ["민수", "지영", "철수", "영희", "민수", "지영", "수진", "현우"],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "전자기기", "생활용품", "도서"],
    "order_date": ["2026-01-03", "2026-01-01", "2026-01-05", "2026-01-02", "2026-01-04", "2026-01-06", "2026-01-07", "2026-01-03"],
    "quantity": [1, 3, 2, 5, 4, 1, 2, 10],
    "total_price": [300000, 45000, 160000, 50000, 60000, 300000, 40000, 150000],
    "review_score": [5, 4, 3, 4, 5, 2, 3, 5]
})

orders
\`\`\`

---

### 8.7.2 주문일을 날짜형으로 변환하기

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

날짜형으로 변환해두면 날짜 기준 정렬과 기간 필터링을 더 안전하게 할 수 있습니다.

---

### 8.7.3 주문 금액 기준 순위 만들기

\`\`\`python
orders["sales_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders
\`\`\`

\`method="dense"\`를 사용하면 같은 금액은 같은 순위를 받고, 다음 순위는 바로 다음 번호가 됩니다.

예를 들어 300000원이 공동 1위라면, 그다음 금액은 2위가 됩니다.

---

### 8.7.4 주문 금액 상위 5건 추출하기

\`\`\`python
top_orders = orders.sort_values(
    by=["sales_rank", "order_date"],
    ascending=[True, False]
).head(5)

top_orders
\`\`\`

이 코드는 다음 기준으로 정렬합니다.

1. \`sales_rank\`가 작은 순서, 즉 높은 순위부터 정렬
2. 같은 순위라면 주문일이 최근인 순서로 정렬
3. 상위 5개 행만 선택

---

### 8.7.5 리뷰 점수가 낮은 주문 확인하기

\`\`\`python
low_review_orders = orders.sort_values(
    by=["review_score", "total_price"],
    ascending=[True, False]
).head(3)

low_review_orders
\`\`\`

이 코드는 리뷰 점수가 낮은 주문을 먼저 보여줍니다.  
리뷰 점수가 같다면 주문 금액이 큰 주문을 먼저 보여줍니다.

리뷰 점수가 낮고 주문 금액이 큰 주문은 특히 주의해서 확인할 필요가 있습니다.  
고객 불만이 크거나 중요한 주문일 가능성이 있기 때문입니다.

---

### 8.7.6 보고용 컬럼만 선택하기

분석 결과를 보고서로 만들 때는 모든 컬럼을 보여줄 필요가 없습니다.  
필요한 컬럼만 선택해서 보기 좋게 정리할 수 있습니다.

\`\`\`python
report_columns = [
    "sales_rank",
    "order_id",
    "customer",
    "category",
    "order_date",
    "total_price",
    "review_score"
]

sales_report = orders[report_columns].sort_values(
    by=["sales_rank", "order_date"],
    ascending=[True, False]
).reset_index(drop=True)

sales_report
\`\`\`

최종 결과는 “주문 금액 순위표”로 사용할 수 있습니다.

---

## 8.8 정렬할 때 자주 하는 실수

정렬은 간단해 보이지만 초보자가 자주 하는 실수가 있습니다.

---

### 8.8.1 정렬 결과를 저장하지 않는 실수

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

이 코드는 정렬된 결과를 보여주지만 원본 \`orders\`를 바꾸지는 않습니다.

정렬 결과를 계속 사용하려면 반드시 변수에 저장해야 합니다.

\`\`\`python
orders_sorted = orders.sort_values(by="total_price", ascending=False)
\`\`\`

---

### 8.8.2 \`ascending=False\`를 문자열로 쓰는 실수

다음 코드는 잘못된 예입니다.

\`\`\`python
orders.sort_values(by="total_price", ascending="False")
\`\`\`

\`"False"\`는 문자열입니다.  
\`ascending\`에는 불리언 값인 \`False\`를 넣어야 합니다.

올바른 코드는 다음과 같습니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

---

### 8.8.3 여러 조건 정렬에서 \`ascending\` 개수를 맞추지 않는 실수

다음 코드는 두 개 컬럼을 기준으로 정렬합니다.

\`\`\`python
orders.sort_values(
    by=["category", "total_price"],
    ascending=[True, False]
)
\`\`\`

\`by\`에 두 개 컬럼을 넣었다면, \`ascending\`에도 각 컬럼에 대응하는 값을 넣어야 합니다.

\`\`\`text
category → True
total_price → False
\`\`\`

---

### 8.8.4 날짜를 문자열로 둔 채 정렬하는 실수

날짜 문자열이 \`"2026-1-2"\`처럼 자리수가 일정하지 않으면 문자열 정렬 결과가 날짜 순서와 다를 수 있습니다.

안전하게 정렬하려면 날짜형으로 변환합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders.sort_values(by="order_date")
\`\`\`

날짜 데이터 처리는 이후 장에서 더 자세히 다룹니다.

---

### 8.8.5 순위와 정렬을 혼동하는 실수

정렬은 행의 순서를 바꾸는 작업입니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

순위 계산은 각 행에 등수 값을 부여하는 작업입니다.

\`\`\`python
orders["rank"] = orders["total_price"].rank(ascending=False)
\`\`\`

정렬만 한다고 순위 컬럼이 생기지는 않습니다.  
순위 컬럼이 필요하다면 \`rank()\`를 사용해야 합니다.

---

## 8.9 핵심 정리

이번 장에서는 pandas에서 데이터를 정렬하고 순위를 계산하는 방법을 배웠습니다.

정렬은 데이터를 특정 기준에 따라 순서대로 배치하는 작업입니다.  
값 기준 정렬에는 \`sort_values()\`를 사용하고, 인덱스 기준 정렬에는 \`sort_index()\`를 사용합니다.

상위 또는 하위 데이터를 찾을 때는 \`sort_values().head()\` 방식이나 \`nlargest()\`, \`nsmallest()\`를 사용할 수 있습니다.  
\`nlargest()\`와 \`nsmallest()\`는 숫자형 컬럼의 상위 또는 하위 데이터를 빠르게 찾는 데 유용합니다.

순위 계산에는 \`rank()\`를 사용합니다.  
순위를 매길 때는 큰 값이 1등인지, 작은 값이 1등인지 결정해야 하며, 동점자 처리 방식도 함께 고려해야 합니다.

정렬과 순위는 이후 그룹화, 집계, 시각화, EDA 과정에서도 계속 사용됩니다.  
데이터를 제대로 해석하려면 단순히 정렬하는 방법뿐 아니라, 어떤 기준으로 정렬해야 분석 질문에 답할 수 있는지를 함께 생각해야 합니다.

---

## 8.10 연습문제

### 문제 1. 개념 확인

다음 중 \`sort_values()\`의 역할로 가장 적절한 것은 무엇인가요?

A. 인덱스를 0부터 다시 매긴다.  
B. 특정 컬럼의 값을 기준으로 행을 정렬한다.  
C. 결측치를 모두 제거한다.  
D. 새로운 컬럼을 추가한다.

---

### 문제 2. 개념 확인

다음 코드에서 \`ascending=False\`의 의미는 무엇인가요?

\`\`\`python
df.sort_values(by="sales", ascending=False)
\`\`\`

A. \`sales\`가 작은 값부터 정렬한다.  
B. \`sales\`가 큰 값부터 정렬한다.  
C. \`sales\` 컬럼을 삭제한다.  
D. \`sales\` 컬럼의 결측치를 앞에 배치한다.

---

### 문제 3. 코드 작성

다음 DataFrame에서 \`price\`가 높은 순서대로 정렬하는 코드를 작성하세요.

\`\`\`python
products = pd.DataFrame({
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})
\`\`\`

---

### 문제 4. 코드 작성

위 \`products\` 데이터에서 가격이 가장 낮은 상품 1개를 추출하는 코드를 작성하세요.

---

### 문제 5. 코드 결과 예측

다음 코드의 결과에서 첫 번째 행에 올 가능성이 가장 높은 상품은 무엇인가요?

\`\`\`python
products.sort_values(by="price", ascending=False)
\`\`\`

\`\`\`python
products = pd.DataFrame({
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 주문 데이터에서 \`total_price\` 기준으로 큰 값이 1등이 되도록 \`rank\` 컬럼을 추가하세요.  
동점자는 같은 순위를 부여하고, 다음 순위는 바로 다음 번호가 되도록 하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "total_price": [10000, 30000, 30000, 20000]
})
\`\`\`

---

### 문제 7. 개념 확인

\`sort_index()\`와 \`reset_index()\`의 차이를 간단히 설명하세요.

---

### 문제 8. 코드 작성

다음 데이터에서 \`category\`는 오름차순, \`sales\`는 내림차순으로 정렬하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "category": ["B", "A", "B", "A"],
    "sales": [100, 200, 300, 150]
})
\`\`\`

---

### 문제 9. 코드 작성

다음 데이터에서 \`score\` 상위 2개 행을 \`nlargest()\`로 추출하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "지영", "철수", "영희"],
    "score": [80, 95, 70, 90]
})
\`\`\`

---

### 문제 10. 실무형 문제

다음 고객 데이터에서 구매 금액이 높은 순서대로 순위를 만들고, 순위가 높은 고객부터 정렬하세요.  
동점자는 같은 순위로 처리하고, 다음 순위는 바로 다음 번호가 되도록 하세요.

\`\`\`python
customers = pd.DataFrame({
    "customer": ["A", "B", "C", "D", "E"],
    "total_purchase": [500000, 300000, 500000, 100000, 300000]
})
\`\`\`

---

## 8.11 정답 및 해설

### 문제 1 정답

정답: B

\`sort_values()\`는 특정 컬럼의 값을 기준으로 행을 정렬합니다.

---

### 문제 2 정답

정답: B

\`ascending=False\`는 내림차순 정렬을 의미합니다.  
따라서 \`sales\` 값이 큰 행부터 정렬됩니다.

---

### 문제 3 정답

\`\`\`python
products.sort_values(by="price", ascending=False)
\`\`\`

\`price\`가 높은 순서대로 정렬해야 하므로 \`ascending=False\`를 사용합니다.

---

### 문제 4 정답

방법 1:

\`\`\`python
products.sort_values(by="price").head(1)
\`\`\`

방법 2:

\`\`\`python
products.nsmallest(1, "price")
\`\`\`

가격이 가장 낮은 상품을 찾는 것이므로 오름차순 정렬 후 첫 번째 행을 가져오거나, \`nsmallest()\`를 사용할 수 있습니다.

---

### 문제 5 정답

정답: 모니터

\`price\` 값이 가장 큰 상품은 모니터입니다.

\`\`\`text
모니터: 200000
키보드: 30000
마우스: 15000
\`\`\`

---

### 문제 6 정답

\`\`\`python
orders["rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders
\`\`\`

\`ascending=False\`는 큰 값이 높은 순위가 되도록 합니다.  
\`method="dense"\`는 동점자에게 같은 순위를 주고, 다음 순위를 바로 이어서 부여합니다.

예상 순위는 다음과 같습니다.

| order_id | total_price | rank |
|---:|---:|---:|
| 1 | 10000 | 3 |
| 2 | 30000 | 1 |
| 3 | 30000 | 1 |
| 4 | 20000 | 2 |

---

### 문제 7 정답

\`sort_index()\`는 기존 인덱스 값을 기준으로 행 순서를 정렬합니다.  
\`reset_index()\`는 현재 행 순서를 유지하면서 인덱스를 0부터 다시 부여합니다.

예를 들어 정렬된 데이터에서 원래 인덱스 순서로 되돌리고 싶으면 \`sort_index()\`를 사용합니다.  
정렬된 순서는 유지하고 왼쪽 번호만 다시 정리하고 싶으면 \`reset_index(drop=True)\`를 사용합니다.

---

### 문제 8 정답

\`\`\`python
df.sort_values(
    by=["category", "sales"],
    ascending=[True, False]
)
\`\`\`

\`category\`는 오름차순, \`sales\`는 내림차순이어야 하므로 \`ascending\`에 \`[True, False]\`를 전달합니다.

---

### 문제 9 정답

\`\`\`python
df.nlargest(2, "score")
\`\`\`

\`score\`가 가장 큰 2개 행을 추출합니다.  
결과에는 점수가 95인 지영, 90인 영희가 포함됩니다.

---

### 문제 10 정답

\`\`\`python
customers["purchase_rank"] = customers["total_purchase"].rank(
    ascending=False,
    method="dense"
).astype(int)

customers_sorted = customers.sort_values(by="purchase_rank").reset_index(drop=True)

customers_sorted
\`\`\`

예상 결과는 다음과 같습니다.

| customer | total_purchase | purchase_rank |
|---|---:|---:|
| A | 500000 | 1 |
| C | 500000 | 1 |
| B | 300000 | 2 |
| E | 300000 | 2 |
| D | 100000 | 3 |

\`method="dense"\`를 사용했기 때문에 동점자는 같은 순위를 받고, 다음 순위는 바로 다음 번호가 됩니다.

---

## 8.12 다음 장 예고

이번 장에서는 데이터를 원하는 순서로 정렬하고, 상위·하위 데이터를 추출하고, 순위를 계산하는 방법을 배웠습니다.

다음 장에서는 데이터를 단순히 정렬하는 것을 넘어, 새로운 컬럼을 만들고 기존 값을 수정하는 방법을 배웁니다.

다음 장의 핵심 주제는 **데이터 수정과 파생 변수**입니다.

예를 들어 다음과 같은 작업을 다룹니다.

- 컬럼 이름 변경하기
- 기존 컬럼으로 새 컬럼 만들기
- 조건에 따라 값 변경하기
- 데이터 타입 변환하기
- 주문 금액, 할인 금액, 무료배송 여부 같은 파생 변수 만들기

정렬과 순위가 데이터를 “비교해서 보는 방법”이라면, 다음 장의 파생 변수는 데이터를 “분석에 맞게 새롭게 만드는 방법”입니다.

---

## 참고 문서

- pandas 공식 문서: \`DataFrame.sort_values\`
- pandas 공식 문서: \`DataFrame.sort_index\`
- pandas 공식 문서: \`DataFrame.nlargest\`
- pandas 공식 문서: \`DataFrame.nsmallest\`
- pandas 공식 문서: \`DataFrame.rank\`
`;export{e as default};