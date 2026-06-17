var e=`# 9장. 데이터 수정과 파생 변수

## 9.0 들어가며

데이터 분석에서 데이터를 불러오고 확인하는 것만으로는 충분하지 않습니다.  
실제 데이터는 분석하기 좋은 형태로 정리되어 있지 않은 경우가 많습니다.

예를 들어 다음과 같은 문제가 자주 나타납니다.

- 컬럼명이 너무 길거나 의미가 불명확하다.
- 컬럼명에 공백이 들어 있다.
- 금액 데이터가 문자열로 저장되어 있다.
- 날짜 데이터가 문자열로 저장되어 있다.
- 전화번호, 지역명, 등급 같은 값의 표현 방식이 제각각이다.
- 분석에 필요한 컬럼이 아직 없다.
- 기존 컬럼을 조합해서 새 컬럼을 만들어야 한다.

데이터 분석에서는 이런 작업을 **데이터 수정** 또는 **데이터 가공**이라고 부릅니다.

이번 장에서는 pandas에서 데이터를 수정하고, 분석에 필요한 새 컬럼인 **파생 변수**를 만드는 방법을 배웁니다.

파생 변수란 기존 데이터에서 계산하거나 조건을 적용해 새롭게 만든 변수를 말합니다.  
예를 들어 주문 데이터에 \`price\`와 \`quantity\`가 있다면, 두 값을 곱해서 \`total_price\`라는 새 컬럼을 만들 수 있습니다.

\`\`\`python
df["total_price"] = df["price"] * df["quantity"]
\`\`\`

이처럼 파생 변수는 분석 질문에 답하기 위해 데이터를 새롭게 구성하는 핵심 도구입니다.

---

## 9.1 예제 데이터 준비

이번 장에서는 쇼핑몰 주문 데이터를 예제로 사용합니다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "Order ID": [1001, 1002, 1003, 1004, 1005, 1006],
    "Customer Name": ["민수", "지영", "철수", "영희", "민수", "수진"],
    "Category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "생활용품"],
    "Order Date": ["2026-01-03", "2026-01-05", "2026-01-07", "2026-01-10", "2026-01-12", "2026-01-15"],
    "Price": ["300000", "15000", "80000", "10000", "12000", "25000"],
    "Quantity": [1, 3, 2, 5, 4, 2],
    "Discount Rate": [0.10, 0.00, 0.05, 0.00, 0.10, 0.05],
    "Region": ["Seoul", "Busan", "Seoul", "Incheon", "busan", "SEOUL"]
})

orders
\`\`\`

이 데이터에는 몇 가지 분석 전 정리가 필요한 부분이 있습니다.

1. 컬럼명에 공백이 있다.
2. 컬럼명이 영어 대문자와 공백을 포함하고 있어 코드에서 쓰기 불편하다.
3. \`Price\`가 숫자가 아니라 문자열이다.
4. \`Order Date\`가 날짜형이 아니라 문자열이다.
5. \`Region\` 값의 대소문자가 통일되어 있지 않다.
6. 총 주문 금액, 할인 금액, 최종 결제 금액 같은 분석용 컬럼이 없다.

이번 장에서는 이 데이터를 분석하기 좋은 형태로 바꾸어 보겠습니다.

---

# 9.2 컬럼 이름 변경

## 9.2.1 컬럼 이름을 바꿔야 하는 이유

데이터를 불러오면 컬럼명이 다음과 같이 되어 있는 경우가 많습니다.

\`\`\`text
Order ID
Customer Name
Order Date
Discount Rate
\`\`\`

이런 컬럼명은 사람이 읽기에는 괜찮지만, 코드에서 사용할 때는 불편합니다.

예를 들어 컬럼명에 공백이 있으면 다음과 같이 대괄호를 사용해야 합니다.

\`\`\`python
orders["Customer Name"]
\`\`\`

물론 이 방식도 문제는 없습니다.  
하지만 여러 번 사용하다 보면 오타가 나기 쉽고, 코드가 길어집니다.

실무에서는 컬럼명을 다음과 같이 정리하는 경우가 많습니다.

\`\`\`text
order_id
customer_name
order_date
discount_rate
\`\`\`

이처럼 소문자와 밑줄을 사용하는 방식은 파이썬 코드와 잘 어울립니다.  
컬럼명은 분석 과정 내내 반복해서 사용되므로, 초기에 정리해두면 이후 작업이 편해집니다.

---

## 9.2.2 \`rename()\`으로 일부 컬럼명 변경하기

특정 컬럼명만 바꾸고 싶을 때는 \`rename()\`을 사용합니다.

\`\`\`python
orders_renamed = orders.rename(columns={
    "Order ID": "order_id",
    "Customer Name": "customer_name",
    "Order Date": "order_date"
})

orders_renamed
\`\`\`

\`columns\`에는 기존 컬럼명과 새 컬럼명을 딕셔너리 형태로 전달합니다.

\`\`\`python
{
    "기존 컬럼명": "새 컬럼명"
}
\`\`\`

\`rename()\`은 기본적으로 원본 DataFrame을 직접 바꾸지 않고, 컬럼명이 바뀐 새 DataFrame을 반환합니다.  
따라서 결과를 계속 사용하려면 새 변수에 저장해야 합니다.

\`\`\`python
orders = orders.rename(columns={
    "Order ID": "order_id",
    "Customer Name": "customer_name"
})
\`\`\`

---

## 9.2.3 전체 컬럼명 한 번에 변경하기

컬럼 개수가 많지 않다면 전체 컬럼명을 한 번에 바꿀 수도 있습니다.

\`\`\`python
orders.columns = [
    "order_id",
    "customer_name",
    "category",
    "order_date",
    "price",
    "quantity",
    "discount_rate",
    "region"
]

orders
\`\`\`

이 방식은 간단하지만 주의할 점이 있습니다.

전체 컬럼명을 바꿀 때는 새 컬럼명 개수가 기존 컬럼 개수와 정확히 같아야 합니다.  
컬럼 개수가 맞지 않으면 에러가 발생합니다.

\`\`\`python
len(orders.columns)
\`\`\`

전체 컬럼명을 바꾸는 방식은 데이터 구조를 정확히 알고 있을 때 사용하면 좋습니다.  
반면 일부 컬럼만 바꾸고 싶을 때는 \`rename()\`이 더 안전합니다.

---

## 9.2.4 컬럼명 공백과 대소문자 정리하기

실무 데이터에서는 컬럼명에 공백이 들어 있거나 대소문자가 섞여 있는 경우가 많습니다.

\`\`\`python
orders.columns
\`\`\`

컬럼명 전체를 규칙적으로 정리하려면 문자열 메서드를 사용할 수 있습니다.

다음 코드는 컬럼명을 모두 소문자로 바꾸고, 공백을 밑줄로 바꿉니다.

\`\`\`python
orders = pd.DataFrame({
    "Order ID": [1001, 1002],
    "Customer Name": ["민수", "지영"],
    "Order Date": ["2026-01-03", "2026-01-05"]
})

orders.columns = (
    orders.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

orders
\`\`\`

실행 후 컬럼명은 다음과 같이 바뀝니다.

\`\`\`text
order_id
customer_name
order_date
\`\`\`

컬럼명 정리는 작은 작업처럼 보이지만, 분석 전체의 가독성을 크게 높여줍니다.

---

## 9.2.5 컬럼 이름 변경 시 주의할 점

컬럼 이름을 변경할 때는 다음을 확인해야 합니다.

- 새 컬럼명이 너무 짧거나 모호하지 않은가?
- 같은 이름의 컬럼이 생기지 않는가?
- 이후 코드에서 기존 컬럼명을 계속 사용하고 있지 않은가?
- 공백, 특수문자, 한글 컬럼명을 어떻게 처리할 것인가?
- 팀이나 프로젝트에서 사용하는 컬럼명 규칙이 있는가?

실무에서는 컬럼명을 자주 바꾸는 것보다, 분석 초기에 한 번 정리하고 그 규칙을 유지하는 것이 좋습니다.

---

# 9.3 컬럼 추가

## 9.3.1 새 컬럼을 추가하는 기본 방법

pandas에서 새 컬럼을 추가하는 가장 기본적인 방법은 다음과 같습니다.

\`\`\`python
df["새_컬럼명"] = 값
\`\`\`

예를 들어 모든 행에 같은 값을 넣는 컬럼을 만들 수 있습니다.

\`\`\`python
orders["source"] = "online"

orders
\`\`\`

이 코드는 \`source\`라는 새 컬럼을 만들고, 모든 행에 \`"online"\`이라는 값을 넣습니다.

---

## 9.3.2 기존 컬럼을 이용해 새 컬럼 만들기

분석에서 가장 자주 하는 작업은 기존 컬럼을 계산해서 새 컬럼을 만드는 것입니다.

다음 데이터로 다시 시작하겠습니다.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006],
    "customer_name": ["민수", "지영", "철수", "영희", "민수", "수진"],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-07", "2026-01-10", "2026-01-12", "2026-01-15"],
    "price": [300000, 15000, 80000, 10000, 12000, 25000],
    "quantity": [1, 3, 2, 5, 4, 2],
    "discount_rate": [0.10, 0.00, 0.05, 0.00, 0.10, 0.05],
    "region": ["Seoul", "Busan", "Seoul", "Incheon", "busan", "SEOUL"]
})

orders
\`\`\`

상품 가격과 수량을 곱해 주문 금액을 만들 수 있습니다.

\`\`\`python
orders["order_amount"] = orders["price"] * orders["quantity"]

orders
\`\`\`

\`order_amount\`는 기존에 없던 컬럼입니다.  
하지만 \`price\`와 \`quantity\`를 이용해 분석에 필요한 새로운 정보를 만들었습니다.

이런 컬럼을 **파생 변수**라고 합니다.

---

## 9.3.3 여러 컬럼을 이용해 새 컬럼 만들기

할인 금액은 주문 금액과 할인율을 곱해서 만들 수 있습니다.

\`\`\`python
orders["discount_amount"] = orders["order_amount"] * orders["discount_rate"]

orders
\`\`\`

최종 결제 금액은 주문 금액에서 할인 금액을 뺀 값입니다.

\`\`\`python
orders["final_amount"] = orders["order_amount"] - orders["discount_amount"]

orders
\`\`\`

이제 데이터에는 다음과 같은 분석용 컬럼이 생겼습니다.

- \`order_amount\`: 할인 전 주문 금액
- \`discount_amount\`: 할인 금액
- \`final_amount\`: 최종 결제 금액

실무 분석에서는 원본 데이터에 없는 지표를 만들어야 하는 경우가 많습니다.  
예를 들어 다음과 같은 컬럼도 파생 변수입니다.

- 객단가
- 구매 횟수
- 할인 여부
- 무료배송 여부
- 가입 후 경과일
- 매출 등급
- 고객 세그먼트

---

## 9.3.4 \`assign()\`으로 컬럼 추가하기

\`assign()\`을 사용해 새 컬럼을 추가할 수도 있습니다.

\`\`\`python
orders_with_amount = orders.assign(
    tax=orders["final_amount"] * 0.1
)

orders_with_amount
\`\`\`

\`assign()\`은 새 컬럼이 추가된 DataFrame을 반환합니다.  
원본을 직접 수정하지 않고 새로운 결과를 만들고 싶을 때 유용합니다.

여러 컬럼을 한 번에 추가할 수도 있습니다.

\`\`\`python
orders = orders.assign(
    tax=orders["final_amount"] * 0.1,
    payment_amount=orders["final_amount"] * 1.1
)

orders
\`\`\`

다만 초보 단계에서는 아래 방식이 가장 직관적입니다.

\`\`\`python
orders["tax"] = orders["final_amount"] * 0.1
\`\`\`

\`assign()\`은 메서드 체이닝을 사용할 때 더 유용해집니다.

\`\`\`python
report = (
    orders
    .assign(order_amount=orders["price"] * orders["quantity"])
    .sort_values(by="order_amount", ascending=False)
)
\`\`\`

메서드 체이닝은 여러 작업을 이어서 표현하는 방식입니다.  
기초 과정에서는 “이런 방식도 있다” 정도로 이해해도 충분합니다.

---

# 9.4 값 변경

## 9.4.1 값을 변경해야 하는 상황

데이터를 분석하다 보면 기존 값을 수정해야 하는 경우가 많습니다.

예를 들어 다음과 같은 상황입니다.

- 지역명이 \`Seoul\`, \`SEOUL\`, \`seoul\`처럼 다르게 입력되어 있다.
- 성별 값이 \`M\`, \`Male\`, \`남성\`처럼 섞여 있다.
- 상품 카테고리명이 바뀌었다.
- 잘못 입력된 값을 올바른 값으로 수정해야 한다.
- 특정 조건을 만족하는 행의 값을 변경해야 한다.
- 결측치나 이상값을 별도 값으로 표시해야 한다.

값을 변경할 때는 무작정 바꾸기보다, 어떤 기준으로 바꾸는지 명확히 해야 합니다.

---

## 9.4.2 특정 컬럼의 문자열 값 정리하기

\`region\` 컬럼을 확인해봅시다.

\`\`\`python
orders["region"]
\`\`\`

현재 값은 다음과 같이 섞여 있습니다.

\`\`\`text
Seoul
Busan
Seoul
Incheon
busan
SEOUL
\`\`\`

대소문자를 통일하면 분석하기 쉬워집니다.

\`\`\`python
orders["region"] = orders["region"].str.lower()

orders
\`\`\`

이제 \`Seoul\`, \`SEOUL\`은 모두 \`seoul\`로 통일됩니다.

보고서에는 소문자보다 첫 글자 대문자가 보기 좋을 수 있습니다.

\`\`\`python
orders["region"] = orders["region"].str.title()

orders
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
Seoul
Busan
Seoul
Incheon
Busan
Seoul
\`\`\`

문자열 컬럼 정리는 12장에서 더 자세히 다룹니다.  
이번 장에서는 “값을 바꾸는 작업도 분석 준비의 일부”라는 점에 집중합니다.

---

## 9.4.3 \`replace()\`로 특정 값 변경하기

특정 값을 다른 값으로 바꾸고 싶을 때는 \`replace()\`를 사용할 수 있습니다.

\`\`\`python
orders["category"] = orders["category"].replace({
    "전자기기": "Electronics",
    "도서": "Books",
    "생활용품": "Daily Goods"
})

orders
\`\`\`

\`replace()\`는 값 자체를 기준으로 바꿉니다.  
위 코드는 \`category\` 컬럼에서 특정 한글 값을 영문 값으로 변경합니다.

하나의 값만 변경할 수도 있습니다.

\`\`\`python
orders["region"] = orders["region"].replace("Seoul", "서울")
\`\`\`

여러 값을 한 번에 바꿀 수도 있습니다.

\`\`\`python
orders["region"] = orders["region"].replace({
    "서울": "Seoul",
    "Busan": "부산",
    "Incheon": "인천"
})
\`\`\`

값 표준화는 분석의 정확도에 큰 영향을 줍니다.  
예를 들어 \`"Seoul"\`, \`"SEOUL"\`, \`"seoul"\`이 모두 다른 값으로 남아 있으면 지역별 집계 결과가 잘못 나올 수 있습니다.

---

## 9.4.4 \`loc\`로 조건에 맞는 값 변경하기

조건에 맞는 행의 특정 컬럼 값을 바꿀 때는 \`loc\`를 사용합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.loc[조건, "컬럼명"] = 새_값
\`\`\`

예를 들어 최종 결제 금액이 100000원 이상이면 \`high_value\` 컬럼을 \`True\`로 만들고 싶다고 가정해봅시다.

먼저 기본값을 넣습니다.

\`\`\`python
orders["high_value"] = False
\`\`\`

그다음 조건에 맞는 행만 \`True\`로 바꿉니다.

\`\`\`python
orders.loc[orders["final_amount"] >= 100000, "high_value"] = True

orders
\`\`\`

\`loc\`를 사용하면 행 조건과 수정할 컬럼을 명확하게 지정할 수 있습니다.

다음 예도 가능합니다.

\`\`\`python
orders.loc[orders["category"] == "Books", "shipping_type"] = "standard"
orders.loc[orders["category"] == "Electronics", "shipping_type"] = "safe_delivery"
\`\`\`

조건에 맞는 값 변경은 실무에서 매우 자주 사용됩니다.

- 금액이 일정 기준 이상이면 VIP 주문으로 표시
- 특정 지역이면 배송 구역을 따로 지정
- 재고가 0이면 판매 상태를 품절로 변경
- 점수가 낮으면 위험 등급으로 표시
- 날짜가 지난 항목은 마감 상태로 변경

---

## 9.4.5 \`loc\` 사용 시 주의할 점

값을 변경할 때는 다음과 같이 쓰는 것이 안전합니다.

\`\`\`python
orders.loc[orders["final_amount"] >= 100000, "high_value"] = True
\`\`\`

반면 다음처럼 필터링한 결과에 바로 값을 넣는 방식은 피하는 것이 좋습니다.

\`\`\`python
orders[orders["final_amount"] >= 100000]["high_value"] = True
\`\`\`

이런 코드는 의도대로 원본이 수정되지 않거나 경고가 발생할 수 있습니다.  
조건에 따라 값을 수정할 때는 \`loc\`를 사용하는 습관을 들이는 것이 좋습니다.

---

# 9.5 데이터 타입 변환

## 9.5.1 데이터 타입을 바꿔야 하는 이유

데이터를 불러오면 숫자처럼 보이는 값이 문자열로 들어오는 경우가 많습니다.

예를 들어 CSV 파일에서 다음처럼 저장되어 있으면:

\`\`\`text
price
"300000"
"15000"
"80000"
\`\`\`

pandas는 이 컬럼을 문자열로 인식할 수 있습니다.

문자열은 숫자처럼 계산할 수 없습니다.  
따라서 분석 전에 데이터 타입을 확인하고 필요하면 변환해야 합니다.

\`\`\`python
orders.dtypes
\`\`\`

데이터 타입 변환은 분석 전처리에서 매우 중요한 작업입니다.

---

## 9.5.2 \`astype()\`으로 타입 변환하기

\`astype()\`은 컬럼의 데이터 타입을 바꿀 때 사용합니다.

다음 예제를 보겠습니다.

\`\`\`python
df = pd.DataFrame({
    "price": ["300000", "15000", "80000"],
    "quantity": ["1", "3", "2"]
})

df.dtypes
\`\`\`

\`price\`와 \`quantity\`가 문자열이라면 숫자로 변환할 수 있습니다.

\`\`\`python
df["price"] = df["price"].astype(int)
df["quantity"] = df["quantity"].astype(int)

df.dtypes
\`\`\`

여러 컬럼을 한 번에 바꿀 수도 있습니다.

\`\`\`python
df = df.astype({
    "price": int,
    "quantity": int
})
\`\`\`

\`astype()\`은 값이 모두 정상적으로 변환 가능할 때 사용하기 좋습니다.

---

## 9.5.3 숫자 변환 실패 처리: \`pd.to_numeric()\`

실무 데이터에는 숫자로 변환할 수 없는 값이 섞여 있을 수 있습니다.

\`\`\`python
df = pd.DataFrame({
    "price": ["300000", "15,000", "unknown", "80000"]
})

df
\`\`\`

이 데이터에서 \`astype(int)\`를 사용하면 에러가 발생할 수 있습니다.  
\`"15,000"\`에는 쉼표가 있고, \`"unknown"\`은 숫자가 아니기 때문입니다.

먼저 쉼표를 제거합니다.

\`\`\`python
df["price_clean"] = df["price"].str.replace(",", "")
\`\`\`

그다음 \`pd.to_numeric()\`을 사용할 수 있습니다.

\`\`\`python
df["price_clean"] = pd.to_numeric(df["price_clean"], errors="coerce")

df
\`\`\`

\`errors="coerce"\`는 변환할 수 없는 값을 \`NaN\`으로 바꿉니다.

\`\`\`text
unknown → NaN
\`\`\`

이 방식은 잘못된 숫자 데이터를 찾아내고 처리하는 데 유용합니다.

---

## 9.5.4 날짜형 변환: \`pd.to_datetime()\`

날짜 데이터는 처음에 문자열로 들어오는 경우가 많습니다.

\`\`\`python
orders["order_date"].dtype
\`\`\`

문자열 상태에서도 화면에는 날짜처럼 보일 수 있습니다.  
하지만 문자열은 날짜 계산이나 월별 집계에 적합하지 않습니다.

날짜형으로 변환하려면 \`pd.to_datetime()\`을 사용합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])

orders.dtypes
\`\`\`

날짜형으로 변환하면 다음과 같은 작업을 할 수 있습니다.

- 연도 추출
- 월 추출
- 요일 추출
- 특정 기간 필터링
- 날짜 차이 계산
- 월별 집계

예를 들어 주문 월을 추출할 수 있습니다.

\`\`\`python
orders["order_month"] = orders["order_date"].dt.month

orders
\`\`\`

날짜와 시간 데이터는 13장에서 더 자세히 다룹니다.  
이번 장에서는 날짜형 변환이 파생 변수 생성과 연결된다는 점을 이해하면 됩니다.

---

## 9.5.5 범주형 데이터로 변환하기

범주형 데이터는 값의 종류가 제한된 데이터입니다.

예를 들어 다음과 같은 컬럼이 범주형 데이터입니다.

- 지역
- 성별
- 고객 등급
- 상품 카테고리
- 주문 상태

pandas에서는 이런 데이터를 \`category\` 타입으로 바꿀 수 있습니다.

\`\`\`python
orders["category"] = orders["category"].astype("category")
orders["region"] = orders["region"].astype("category")

orders.dtypes
\`\`\`

기초 과정에서는 범주형 타입을 깊게 다루지 않습니다.  
다만 값의 종류가 정해진 컬럼은 숫자형이나 일반 문자열과 성격이 다르다는 점을 기억해두면 좋습니다.

---

## 9.5.6 타입 변환 전 확인할 것

타입 변환 전에 다음을 확인하는 습관이 필요합니다.

\`\`\`python
orders.dtypes
orders.head()
orders.info()
\`\`\`

확인할 질문은 다음과 같습니다.

- 숫자여야 하는 컬럼이 문자열로 되어 있지 않은가?
- 날짜여야 하는 컬럼이 문자열로 되어 있지 않은가?
- 쉼표나 원화 기호 같은 문자가 섞여 있지 않은가?
- 변환할 수 없는 값이 섞여 있지 않은가?
- 결측치가 타입 변환에 영향을 주지 않는가?

타입 변환은 한 번에 끝나는 작업이 아닐 수 있습니다.  
실무에서는 값 정리, 결측치 처리, 타입 변환이 함께 이루어집니다.

---

# 9.6 조건 기반 파생 변수 만들기

## 9.6.1 파생 변수란?

파생 변수는 기존 데이터에서 새롭게 만들어낸 변수입니다.

예를 들어 다음 컬럼이 있다고 가정해봅시다.

\`\`\`text
price
quantity
discount_rate
\`\`\`

여기서 다음 컬럼을 만들 수 있습니다.

\`\`\`text
order_amount = price * quantity
discount_amount = order_amount * discount_rate
final_amount = order_amount - discount_amount
\`\`\`

이렇게 기존 컬럼을 조합하거나 조건을 적용해서 만든 새 컬럼이 파생 변수입니다.

파생 변수는 분석 질문에 답하기 위해 만듭니다.  
무작정 컬럼을 많이 만드는 것이 목적이 아니라, 분석에 필요한 의미 있는 정보를 추가하는 것이 목적입니다.

---

## 9.6.2 할인 여부 컬럼 만들기

할인율이 0보다 크면 할인 주문으로 볼 수 있습니다.

\`\`\`python
orders["is_discounted"] = orders["discount_rate"] > 0

orders
\`\`\`

\`is_discounted\` 컬럼은 불리언 값입니다.

\`\`\`text
True
False
\`\`\`

이런 컬럼은 조건 필터링과 그룹화에 유용합니다.

\`\`\`python
orders[orders["is_discounted"]]
\`\`\`

이 코드는 할인된 주문만 선택합니다.

---

## 9.6.3 무료배송 여부 컬럼 만들기

최종 결제 금액이 50000원 이상이면 무료배송이라고 가정해봅시다.

\`\`\`python
orders["free_shipping"] = orders["final_amount"] >= 50000

orders
\`\`\`

이제 무료배송 주문과 아닌 주문을 구분할 수 있습니다.

\`\`\`python
orders["free_shipping"].value_counts()
\`\`\`

---

## 9.6.4 조건에 따라 문자열 값 넣기

불리언 값 대신 \`"무료배송"\`과 \`"배송비 있음"\` 같은 문자열을 넣고 싶을 수 있습니다.

이때는 \`loc\`를 사용할 수 있습니다.

\`\`\`python
orders["shipping_label"] = "배송비 있음"

orders.loc[orders["final_amount"] >= 50000, "shipping_label"] = "무료배송"

orders
\`\`\`

먼저 기본값을 넣고, 조건에 맞는 행만 값을 바꾸는 방식입니다.

이 방식은 조건이 단순할 때 이해하기 쉽습니다.

---

## 9.6.5 \`np.where()\`로 조건 컬럼 만들기

조건에 따라 두 가지 값 중 하나를 넣을 때는 \`np.where()\`를 사용할 수도 있습니다.

\`\`\`python
import numpy as np

orders["shipping_label"] = np.where(
    orders["final_amount"] >= 50000,
    "무료배송",
    "배송비 있음"
)

orders
\`\`\`

\`np.where()\`의 기본 구조는 다음과 같습니다.

\`\`\`python
np.where(조건, 참일_때_값, 거짓일_때_값)
\`\`\`

예를 들어 최종 결제 금액이 100000원 이상이면 \`"고액 주문"\`, 아니면 \`"일반 주문"\`으로 표시할 수 있습니다.

\`\`\`python
orders["order_level"] = np.where(
    orders["final_amount"] >= 100000,
    "고액 주문",
    "일반 주문"
)

orders
\`\`\`

조건이 두 갈래일 때는 \`np.where()\`가 간결합니다.  
조건이 여러 갈래라면 다음 절의 방식이 더 적합합니다.

---

## 9.6.6 여러 조건으로 등급 컬럼 만들기

고객 주문 금액에 따라 주문 등급을 만들고 싶다고 가정해봅시다.

기준은 다음과 같습니다.

| 최종 결제 금액 | 주문 등급 |
|---:|---|
| 200000 이상 | VIP |
| 100000 이상 | Gold |
| 50000 이상 | Silver |
| 그 외 | Basic |

이런 여러 조건에는 \`np.select()\`를 사용할 수 있습니다.

\`\`\`python
conditions = [
    orders["final_amount"] >= 200000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 50000
]

choices = ["VIP", "Gold", "Silver"]

orders["order_grade"] = np.select(
    conditions,
    choices,
    default="Basic"
)

orders
\`\`\`

\`np.select()\`는 조건을 위에서 아래로 확인합니다.  
따라서 큰 기준부터 먼저 작성하는 것이 중요합니다.

만약 50000 이상 조건을 먼저 작성하면, 200000 이상인 주문도 50000 이상 조건에 먼저 걸릴 수 있습니다.  
여러 조건을 만들 때는 조건 순서를 반드시 확인해야 합니다.

---

## 9.6.7 구간 나누기: \`pd.cut()\`

연속적인 숫자 데이터를 구간으로 나누고 싶을 때는 \`pd.cut()\`을 사용할 수 있습니다.

예를 들어 최종 결제 금액을 구간으로 나누어 보겠습니다.

\`\`\`python
orders["amount_range"] = pd.cut(
    orders["final_amount"],
    bins=[0, 50000, 100000, 200000, float("inf")],
    labels=["5만원 이하", "10만원 이하", "20만원 이하", "20만원 초과"]
)

orders
\`\`\`

\`pd.cut()\`은 수치형 데이터를 범주형 구간으로 나눌 때 유용합니다.

예를 들어 다음과 같은 분석에서 사용할 수 있습니다.

- 나이를 연령대로 나누기
- 구매 금액을 고객 등급으로 나누기
- 점수를 성적 구간으로 나누기
- 이용 시간을 짧음, 보통, 김으로 나누기

구간을 만들 때는 경계값이 어느 구간에 포함되는지 주의해야 합니다.  
\`pd.cut()\`의 세부 옵션은 고급 과정에서 더 자세히 다루어도 됩니다.

---

# 9.7 행과 열 삭제

## 9.7.1 컬럼 삭제

분석에 필요 없는 컬럼은 삭제할 수 있습니다.

\`\`\`python
orders = orders.drop(columns=["shipping_label"])

orders
\`\`\`

여러 컬럼을 한 번에 삭제할 수도 있습니다.

\`\`\`python
orders = orders.drop(columns=["tax", "payment_amount"])
\`\`\`

단, 삭제하려는 컬럼이 실제로 존재하지 않으면 에러가 발생합니다.

삭제 전에 컬럼 목록을 확인하면 좋습니다.

\`\`\`python
orders.columns
\`\`\`

---

## 9.7.2 행 삭제

특정 인덱스의 행을 삭제할 수도 있습니다.

\`\`\`python
orders = orders.drop(index=0)

orders
\`\`\`

하지만 실무 분석에서는 인덱스 번호로 행을 삭제하기보다, 조건 필터링을 통해 필요한 행만 남기는 경우가 더 많습니다.

예를 들어 최종 결제 금액이 0보다 큰 행만 남길 수 있습니다.

\`\`\`python
orders = orders[orders["final_amount"] > 0]

orders
\`\`\`

조건으로 행을 걸러내는 방식은 삭제 기준이 코드에 명확히 드러난다는 장점이 있습니다.

---

## 9.7.3 삭제보다 선택을 먼저 생각하기

데이터 분석에서는 “무엇을 삭제할까?”보다 “무엇을 남길까?”를 먼저 생각하는 것이 좋습니다.

예를 들어 보고서에 필요한 컬럼만 선택할 수 있습니다.

\`\`\`python
report = orders[
    [
        "order_id",
        "customer_name",
        "category",
        "order_date",
        "final_amount",
        "order_grade"
    ]
]

report
\`\`\`

불필요한 컬럼을 하나씩 삭제하는 것보다, 필요한 컬럼을 명확히 선택하는 방식이 더 안전한 경우가 많습니다.

---

# 9.8 실무 미니 프로젝트: 주문 데이터 분석용 컬럼 만들기

이번 장에서 배운 내용을 하나의 흐름으로 정리해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 컬럼명을 분석하기 좋은 형태로 바꾼다.
3. 금액 컬럼을 숫자형으로 변환한다.
4. 날짜 컬럼을 날짜형으로 변환한다.
5. 지역명을 통일한다.
6. 주문 금액, 할인 금액, 최종 결제 금액을 만든다.
7. 무료배송 여부와 주문 등급을 만든다.
8. 보고용 컬럼만 선택한다.
\`\`\`

---

## 9.8.1 원본 데이터 준비

\`\`\`python
import pandas as pd
import numpy as np

raw_orders = pd.DataFrame({
    "Order ID": [1001, 1002, 1003, 1004, 1005, 1006],
    "Customer Name": ["민수", "지영", "철수", "영희", "민수", "수진"],
    "Category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "생활용품"],
    "Order Date": ["2026-01-03", "2026-01-05", "2026-01-07", "2026-01-10", "2026-01-12", "2026-01-15"],
    "Price": ["300000", "15000", "80000", "10000", "12000", "25000"],
    "Quantity": [1, 3, 2, 5, 4, 2],
    "Discount Rate": [0.10, 0.00, 0.05, 0.00, 0.10, 0.05],
    "Region": ["Seoul", "Busan", "Seoul", "Incheon", "busan", "SEOUL"]
})

raw_orders
\`\`\`

---

## 9.8.2 컬럼명 정리

\`\`\`python
orders = raw_orders.copy()

orders.columns = (
    orders.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

orders
\`\`\`

원본을 보존하기 위해 \`copy()\`를 사용했습니다.  
분석 과정에서 원본 데이터를 직접 수정하지 않으면 실수를 줄일 수 있습니다.

---

## 9.8.3 데이터 타입 변환

\`\`\`python
orders["price"] = pd.to_numeric(orders["price"], errors="coerce")
orders["order_date"] = pd.to_datetime(orders["order_date"])

orders.dtypes
\`\`\`

\`price\`는 숫자형으로, \`order_date\`는 날짜형으로 변환했습니다.

---

## 9.8.4 지역명 정리

\`\`\`python
orders["region"] = orders["region"].str.strip().str.title()

orders["region"].unique()
\`\`\`

대소문자가 섞인 지역명을 통일했습니다.

---

## 9.8.5 금액 관련 파생 변수 만들기

\`\`\`python
orders["order_amount"] = orders["price"] * orders["quantity"]
orders["discount_amount"] = orders["order_amount"] * orders["discount_rate"]
orders["final_amount"] = orders["order_amount"] - orders["discount_amount"]

orders
\`\`\`

이제 주문 금액, 할인 금액, 최종 결제 금액을 분석할 수 있습니다.

---

## 9.8.6 무료배송 여부 만들기

최종 결제 금액이 50000원 이상이면 무료배송이라고 가정합니다.

\`\`\`python
orders["free_shipping"] = orders["final_amount"] >= 50000

orders
\`\`\`

문자열 라벨이 필요하다면 다음처럼 만들 수 있습니다.

\`\`\`python
orders["shipping_label"] = np.where(
    orders["free_shipping"],
    "무료배송",
    "배송비 있음"
)

orders
\`\`\`

---

## 9.8.7 주문 등급 만들기

최종 결제 금액 기준으로 주문 등급을 만듭니다.

\`\`\`python
conditions = [
    orders["final_amount"] >= 200000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 50000
]

choices = ["VIP", "Gold", "Silver"]

orders["order_grade"] = np.select(
    conditions,
    choices,
    default="Basic"
)

orders
\`\`\`

---

## 9.8.8 주문 월 컬럼 만들기

날짜형으로 변환한 \`order_date\`에서 주문 월을 추출합니다.

\`\`\`python
orders["order_month"] = orders["order_date"].dt.month

orders
\`\`\`

이 컬럼은 이후 월별 매출 분석에서 사용할 수 있습니다.

---

## 9.8.9 보고용 데이터 만들기

분석 결과를 보기 좋게 정리합니다.

\`\`\`python
report_columns = [
    "order_id",
    "customer_name",
    "category",
    "region",
    "order_date",
    "order_month",
    "order_amount",
    "discount_amount",
    "final_amount",
    "free_shipping",
    "order_grade"
]

order_report = orders[report_columns].sort_values(
    by="final_amount",
    ascending=False
).reset_index(drop=True)

order_report
\`\`\`

이제 \`order_report\`는 분석과 보고에 사용하기 좋은 형태가 되었습니다.

---

# 9.9 데이터 수정 시 자주 하는 실수

## 9.9.1 원본 데이터를 바로 덮어쓰는 실수

분석 초반에는 원본 데이터를 바로 수정하기보다 복사본을 만드는 것이 안전합니다.

\`\`\`python
orders = raw_orders.copy()
\`\`\`

원본을 보존해두면 중간에 실수해도 다시 시작할 수 있습니다.

---

## 9.9.2 타입 변환 전에 값을 확인하지 않는 실수

숫자형으로 바꾸기 전에 값에 쉼표, 공백, 문자 등이 섞여 있는지 확인해야 합니다.

\`\`\`python
df["price"].unique()
\`\`\`

값을 확인하지 않고 바로 변환하면 에러가 발생하거나 잘못된 결과가 나올 수 있습니다.

---

## 9.9.3 조건 순서를 잘못 작성하는 실수

여러 조건으로 등급을 만들 때는 조건 순서가 중요합니다.

잘못된 예:

\`\`\`python
conditions = [
    orders["final_amount"] >= 50000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 200000
]
\`\`\`

이렇게 작성하면 200000원 이상인 값도 먼저 50000원 이상 조건에 걸릴 수 있습니다.

올바른 예:

\`\`\`python
conditions = [
    orders["final_amount"] >= 200000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 50000
]
\`\`\`

큰 기준부터 작성하면 의도한 등급을 만들기 쉽습니다.

---

## 9.9.4 \`loc\` 없이 조건 수정하는 실수

다음과 같은 코드는 피하는 것이 좋습니다.

\`\`\`python
orders[orders["final_amount"] >= 100000]["order_grade"] = "High"
\`\`\`

조건에 맞는 값을 수정할 때는 \`loc\`를 사용합니다.

\`\`\`python
orders.loc[orders["final_amount"] >= 100000, "order_grade"] = "High"
\`\`\`

---

## 9.9.5 파생 변수를 만든 뒤 검산하지 않는 실수

파생 변수를 만들었다면 몇 개 행을 직접 확인해야 합니다.

\`\`\`python
orders[["price", "quantity", "order_amount"]].head()
\`\`\`

예를 들어 \`order_amount\`가 \`price * quantity\`로 제대로 계산되었는지 확인합니다.

\`\`\`python
orders[["order_amount", "discount_rate", "discount_amount", "final_amount"]].head()
\`\`\`

데이터 수정 후에는 반드시 결과를 확인하는 습관이 필요합니다.

---

# 9.10 핵심 정리

이번 장에서는 pandas에서 데이터를 수정하고 파생 변수를 만드는 방법을 배웠습니다.

컬럼명은 분석 초기에 정리해두는 것이 좋습니다.  
\`rename()\`을 사용하면 일부 컬럼명을 바꿀 수 있고, \`df.columns\`를 직접 바꾸면 전체 컬럼명을 한 번에 바꿀 수 있습니다.

새 컬럼은 \`df["새_컬럼"] = 값\` 형태로 추가할 수 있습니다.  
기존 컬럼을 계산해서 주문 금액, 할인 금액, 최종 결제 금액 같은 파생 변수를 만들 수 있습니다.

값을 변경할 때는 \`replace()\`와 \`loc\`를 사용할 수 있습니다.  
특정 값을 일괄 변경할 때는 \`replace()\`가 편하고, 조건에 맞는 행의 값을 바꿀 때는 \`loc\`가 안전합니다.

데이터 타입 변환도 중요합니다.  
숫자처럼 보이는 문자열은 숫자형으로, 날짜처럼 보이는 문자열은 날짜형으로 바꿔야 제대로 분석할 수 있습니다.  
숫자 변환에는 \`astype()\` 또는 \`pd.to_numeric()\`, 날짜 변환에는 \`pd.to_datetime()\`을 사용할 수 있습니다.

파생 변수는 분석 질문에 답하기 위해 만드는 새 컬럼입니다.  
할인 여부, 무료배송 여부, 주문 등급, 주문 월 같은 컬럼은 이후 필터링, 그룹화, 시각화, EDA에서 중요한 역할을 합니다.

---

# 9.11 연습문제

## 문제 1. 개념 확인

다음 중 컬럼명을 변경할 때 사용하는 pandas 메서드는 무엇인가요?

A. \`sort_values()\`  
B. \`rename()\`  
C. \`head()\`  
D. \`dropna()\`

---

## 문제 2. 개념 확인

파생 변수에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 원본 파일 이름을 바꾸는 것이다.  
B. 기존 데이터에서 계산하거나 조건을 적용해 새롭게 만든 변수이다.  
C. 결측치를 삭제하는 작업이다.  
D. 데이터프레임의 행 개수를 확인하는 작업이다.

---

## 문제 3. 코드 작성

다음 DataFrame에서 컬럼명 \`"Customer Name"\`을 \`"customer_name"\`으로 변경하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "Customer Name": ["민수", "지영"],
    "Age": [20, 25]
})
\`\`\`

---

## 문제 4. 코드 작성

다음 데이터에서 \`price\`와 \`quantity\`를 곱해 \`total_price\` 컬럼을 추가하세요.

\`\`\`python
df = pd.DataFrame({
    "product": ["A", "B", "C"],
    "price": [10000, 20000, 15000],
    "quantity": [2, 1, 3]
})
\`\`\`

---

## 문제 5. 코드 작성

다음 데이터에서 \`region\` 컬럼의 \`"SEOUL"\`을 \`"Seoul"\`로 변경하세요.

\`\`\`python
df = pd.DataFrame({
    "customer": ["A", "B", "C"],
    "region": ["Seoul", "SEOUL", "Busan"]
})
\`\`\`

---

## 문제 6. 코드 작성

다음 데이터에서 \`sales\`가 100000 이상이면 \`is_high_sales\` 컬럼에 \`True\`, 그렇지 않으면 \`False\`가 들어가도록 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "order_id": [1, 2, 3],
    "sales": [50000, 150000, 90000]
})
\`\`\`

---

## 문제 7. 코드 작성

다음 데이터에서 \`order_date\` 컬럼을 날짜형으로 변환하세요.

\`\`\`python
df = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-05", "2026-01-10"]
})
\`\`\`

---

## 문제 8. 코드 작성

다음 데이터에서 문자열로 저장된 \`price\` 컬럼을 숫자형으로 변환하세요.

\`\`\`python
df = pd.DataFrame({
    "price": ["10000", "20000", "30000"]
})
\`\`\`

---

## 문제 9. 코드 작성

다음 데이터에서 \`score\`가 90 이상이면 \`"A"\`, 80 이상이면 \`"B"\`, 그 외에는 \`"C"\`를 넣는 \`grade\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "지영", "철수"],
    "score": [95, 85, 70]
})
\`\`\`

---

## 문제 10. 실무형 문제

다음 주문 데이터에서 아래 작업을 수행하세요.

1. \`price\`와 \`quantity\`를 이용해 \`order_amount\` 컬럼을 만드세요.
2. \`discount_rate\`를 이용해 \`discount_amount\` 컬럼을 만드세요.
3. \`final_amount\` 컬럼을 만드세요.
4. \`final_amount\`가 50000 이상이면 \`free_shipping\`이 \`True\`, 아니면 \`False\`가 되도록 하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "price": [10000, 30000, 20000],
    "quantity": [2, 2, 1],
    "discount_rate": [0.0, 0.1, 0.0]
})
\`\`\`

---

# 9.12 정답 및 해설

## 문제 1 정답

정답: B

\`rename()\`은 행 또는 컬럼의 이름을 변경할 때 사용하는 메서드입니다.

---

## 문제 2 정답

정답: B

파생 변수는 기존 데이터에서 계산하거나 조건을 적용해서 새롭게 만든 변수입니다.  
예를 들어 \`price * quantity\`로 만든 \`total_price\`는 파생 변수입니다.

---

## 문제 3 정답

\`\`\`python
df = df.rename(columns={
    "Customer Name": "customer_name"
})
\`\`\`

\`columns\` 인자에 기존 컬럼명과 새 컬럼명을 딕셔너리로 전달합니다.

---

## 문제 4 정답

\`\`\`python
df["total_price"] = df["price"] * df["quantity"]
\`\`\`

기존 두 컬럼을 곱해 새 컬럼을 만들었습니다.

---

## 문제 5 정답

\`\`\`python
df["region"] = df["region"].replace("SEOUL", "Seoul")
\`\`\`

특정 값을 다른 값으로 바꿀 때는 \`replace()\`를 사용할 수 있습니다.

---

## 문제 6 정답

\`\`\`python
df["is_high_sales"] = df["sales"] >= 100000
\`\`\`

비교 연산의 결과는 \`True\` 또는 \`False\`가 됩니다.  
따라서 이 결과를 그대로 새 컬럼에 저장할 수 있습니다.

---

## 문제 7 정답

\`\`\`python
df["order_date"] = pd.to_datetime(df["order_date"])
\`\`\`

문자열로 저장된 날짜를 날짜형으로 변환할 때는 \`pd.to_datetime()\`을 사용합니다.

---

## 문제 8 정답

\`\`\`python
df["price"] = df["price"].astype(int)
\`\`\`

모든 값이 숫자로 변환 가능하다면 \`astype(int)\`를 사용할 수 있습니다.

또는 다음과 같이 작성할 수도 있습니다.

\`\`\`python
df["price"] = pd.to_numeric(df["price"])
\`\`\`

---

## 문제 9 정답

\`\`\`python
import numpy as np

conditions = [
    df["score"] >= 90,
    df["score"] >= 80
]

choices = ["A", "B"]

df["grade"] = np.select(
    conditions,
    choices,
    default="C"
)
\`\`\`

조건은 높은 기준부터 작성하는 것이 안전합니다.  
95점은 \`"A"\`, 85점은 \`"B"\`, 70점은 \`"C"\`가 됩니다.

---

## 문제 10 정답

\`\`\`python
orders["order_amount"] = orders["price"] * orders["quantity"]

orders["discount_amount"] = (
    orders["order_amount"] * orders["discount_rate"]
)

orders["final_amount"] = (
    orders["order_amount"] - orders["discount_amount"]
)

orders["free_shipping"] = orders["final_amount"] >= 50000

orders
\`\`\`

각 컬럼의 의미는 다음과 같습니다.

| 컬럼명 | 의미 |
|---|---|
| \`order_amount\` | 할인 전 주문 금액 |
| \`discount_amount\` | 할인 금액 |
| \`final_amount\` | 최종 결제 금액 |
| \`free_shipping\` | 무료배송 여부 |

---

# 9.13 다음 장 예고

이번 장에서는 데이터를 분석에 맞게 수정하고, 새로운 파생 변수를 만드는 방법을 배웠습니다.

다음 장에서는 데이터에서 자주 발생하는 문제인 **결측치**를 다룹니다.

결측치는 값이 비어 있는 데이터를 의미합니다.  
실제 데이터에는 고객 전화번호가 없거나, 가격 정보가 빠져 있거나, 날짜가 입력되지 않은 행이 자주 존재합니다.

다음 장에서는 다음 내용을 배웁니다.

- 결측치란 무엇인가
- \`NaN\`, \`None\`, 빈 문자열의 차이
- 결측치 확인 방법
- 결측치 제거 방법
- 결측치 대체 방법
- 결측치 처리 기준 세우기
- 결측치 처리 후 결과 확인하기

결측치 처리는 데이터 분석에서 반드시 필요한 전처리 과정입니다.  
어떻게 처리하느냐에 따라 분석 결과가 달라질 수 있으므로, 단순히 지우는 방법만 배우는 것이 아니라 판단 기준까지 함께 익히는 것이 중요합니다.

---

# 참고 문서

- pandas 공식 문서: \`DataFrame.rename\`
- pandas 공식 문서: \`DataFrame.loc\`
- pandas 공식 문서: \`DataFrame.replace\`
- pandas 공식 문서: \`DataFrame.astype\`
- pandas 공식 문서: \`pandas.to_numeric\`
- pandas 공식 문서: \`pandas.to_datetime\`
`;export{e as default};