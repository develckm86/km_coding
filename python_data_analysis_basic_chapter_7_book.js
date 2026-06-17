var e=`# 7장. 데이터 선택과 필터링

## 들어가며

데이터를 불러오고 구조를 확인했다면, 다음 단계는 **필요한 데이터만 골라내는 것**입니다. 실제 분석에서는 전체 데이터를 항상 그대로 사용하지 않습니다. 분석 목적에 맞게 특정 컬럼만 선택하거나, 특정 조건을 만족하는 행만 추출해야 합니다.

예를 들어 쇼핑몰 주문 데이터가 있다고 가정해 보겠습니다.

- VIP 고객의 주문만 보고 싶다.
- 주문 금액이 50,000원 이상인 주문만 보고 싶다.
- 서울 지역 고객만 보고 싶다.
- 배송 상태가 \`완료\`인 주문만 보고 싶다.
- 고객명, 상품명, 주문금액 컬럼만 보고 싶다.

이런 작업이 바로 **데이터 선택과 필터링**입니다.

데이터 분석에서 선택과 필터링은 매우 자주 사용됩니다. 결측치 처리, 그룹화, 시각화, 보고서 작성도 대부분 필요한 데이터를 먼저 골라낸 뒤 진행합니다. 따라서 이번 장을 잘 익혀두면 이후 장의 거의 모든 분석 작업을 더 쉽게 이해할 수 있습니다.

---

## 이 장에서 배우는 내용

이 장에서는 pandas DataFrame에서 데이터를 선택하고 필터링하는 방법을 배웁니다.

- 컬럼 선택
- 행 선택
- \`loc\`와 \`iloc\`
- 조건 필터링
- 여러 조건을 함께 사용하는 방법
- 문자열 조건 필터링
- 범위 조건 필터링
- 결측치 조건 필터링
- 필요한 행과 열을 동시에 선택하는 방법

---

## 7.0 예제 데이터 준비

이번 장에서는 아래 주문 데이터를 반복해서 사용합니다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    "customer_name": ["김민수", "이지은", "박서준", "최유리", "정다은", "홍길동", "오하나"],
    "region": ["서울", "부산", "서울", "대구", "서울", "부산", "서울"],
    "category": ["전자제품", "생활용품", "전자제품", "식품", "생활용품", "식품", "전자제품"],
    "product": ["키보드", "세제", "모니터", "커피", "수건", "라면", "마우스"],
    "quantity": [2, 5, 1, 10, 3, 20, 4],
    "unit_price": [30000, 7000, 200000, 1200, 8000, 900, 15000],
    "order_status": ["완료", "완료", "취소", "완료", "대기", "완료", "완료"],
    "phone": ["010-1111-2222", "010-2222-3333", None, "010-4444-5555", "", "010-6666-7777", "010-7777-8888"]
})

orders["total_price"] = orders["quantity"] * orders["unit_price"]

orders
\`\`\`

실행하면 다음과 같은 형태의 데이터가 만들어집니다.

| order_id | customer_name | region | category | product | quantity | unit_price | order_status | phone | total_price |
|---:|---|---|---|---|---:|---:|---|---|---:|
| 1001 | 김민수 | 서울 | 전자제품 | 키보드 | 2 | 30000 | 완료 | 010-1111-2222 | 60000 |
| 1002 | 이지은 | 부산 | 생활용품 | 세제 | 5 | 7000 | 완료 | 010-2222-3333 | 35000 |
| 1003 | 박서준 | 서울 | 전자제품 | 모니터 | 1 | 200000 | 취소 | None | 200000 |
| 1004 | 최유리 | 대구 | 식품 | 커피 | 10 | 1200 | 완료 | 010-4444-5555 | 12000 |
| 1005 | 정다은 | 서울 | 생활용품 | 수건 | 3 | 8000 | 대기 |  | 24000 |
| 1006 | 홍길동 | 부산 | 식품 | 라면 | 20 | 900 | 완료 | 010-6666-7777 | 18000 |
| 1007 | 오하나 | 서울 | 전자제품 | 마우스 | 4 | 15000 | 완료 | 010-7777-8888 | 60000 |

이 데이터는 실제 쇼핑몰 데이터보다 단순하지만, 데이터 선택과 필터링의 기본 개념을 익히기에 충분합니다.

---

# 7.1 컬럼 선택

## 컬럼을 선택한다는 것

DataFrame은 행과 열로 이루어진 표 형태 데이터입니다. 여기서 열은 보통 **컬럼**이라고 부릅니다.

분석을 할 때 모든 컬럼이 항상 필요한 것은 아닙니다. 예를 들어 주문 금액 분석을 할 때는 고객 전화번호가 필요 없을 수 있고, 지역별 주문 분석을 할 때는 상품 단가보다 지역과 총금액이 더 중요할 수 있습니다.

컬럼 선택은 DataFrame에서 필요한 열만 가져오는 작업입니다.

---

## 하나의 컬럼 선택하기

하나의 컬럼을 선택할 때는 대괄호 안에 컬럼명을 문자열로 넣습니다.

\`\`\`python
orders["customer_name"]
\`\`\`

이 코드는 \`customer_name\` 컬럼 하나를 선택합니다.

결과는 **Series**입니다.

\`\`\`python
0    김민수
1    이지은
2    박서준
3    최유리
4    정다은
5    홍길동
6    오하나
Name: customer_name, dtype: object
\`\`\`

pandas에서 컬럼 하나를 선택하면 DataFrame이 아니라 Series가 반환됩니다. Series는 한 줄짜리 데이터 구조라고 생각하면 됩니다.

---

## 여러 컬럼 선택하기

여러 컬럼을 선택할 때는 컬럼명을 리스트로 전달합니다.

\`\`\`python
orders[["customer_name", "product", "total_price"]]
\`\`\`

결과는 DataFrame입니다.

| customer_name | product | total_price |
|---|---|---:|
| 김민수 | 키보드 | 60000 |
| 이지은 | 세제 | 35000 |
| 박서준 | 모니터 | 200000 |
| 최유리 | 커피 | 12000 |
| 정다은 | 수건 | 24000 |
| 홍길동 | 라면 | 18000 |
| 오하나 | 마우스 | 60000 |

여러 컬럼을 선택할 때는 대괄호가 두 번 사용됩니다.

\`\`\`python
orders[["customer_name", "product"]]
\`\`\`

겉의 대괄호는 DataFrame에서 컬럼을 선택하기 위한 것이고, 안의 대괄호는 컬럼명 목록을 담은 리스트입니다.

---

## Series와 DataFrame 반환 차이

다음 두 코드는 비슷해 보이지만 결과가 다릅니다.

\`\`\`python
orders["product"]
\`\`\`

위 코드는 Series를 반환합니다.

\`\`\`python
orders[["product"]]
\`\`\`

위 코드는 DataFrame을 반환합니다.

하나의 컬럼만 선택하더라도 DataFrame 형태를 유지하고 싶다면 컬럼명을 리스트로 감싸면 됩니다.

---

## 점 표기법은 조심해서 사용하기

pandas에서는 다음처럼 점을 사용해 컬럼에 접근할 수도 있습니다.

\`\`\`python
orders.product
\`\`\`

하지만 실무에서는 보통 다음 방식을 권장합니다.

\`\`\`python
orders["product"]
\`\`\`

점 표기법은 컬럼명에 공백이 있거나, 컬럼명이 pandas의 기존 속성 이름과 겹치는 경우 문제가 생길 수 있습니다.

예를 들어 컬럼명이 \`order status\`처럼 공백을 포함하면 다음 방식은 사용할 수 없습니다.

\`\`\`python
# 사용할 수 없음
orders.order status
\`\`\`

따라서 데이터 분석 코드에서는 대괄호 방식이 더 명확하고 안전합니다.

---

## 존재하지 않는 컬럼을 선택하면 생기는 에러

다음 코드를 실행하면 에러가 발생합니다.

\`\`\`python
orders["customer"]
\`\`\`

왜냐하면 예제 데이터에는 \`customer\`라는 컬럼이 없고, \`customer_name\`이라는 컬럼만 있기 때문입니다.

pandas는 존재하지 않는 컬럼을 선택하려고 하면 \`KeyError\`를 발생시킵니다.

컬럼 선택 오류가 발생하면 먼저 컬럼명을 확인해야 합니다.

\`\`\`python
orders.columns
\`\`\`

실무 데이터에서는 컬럼명에 공백이 있거나, 대소문자가 다르거나, 보이지 않는 특수 문자가 포함된 경우가 있습니다. 컬럼 선택이 잘 안 될 때는 항상 컬럼명 목록을 먼저 확인하는 습관이 필요합니다.

---

## 실무 예제: 분석에 필요한 컬럼만 선택하기

주문 분석 보고서에 다음 컬럼만 필요하다고 가정하겠습니다.

- 고객명
- 지역
- 상품명
- 총 주문 금액
- 주문 상태

\`\`\`python
report_columns = ["customer_name", "region", "product", "total_price", "order_status"]

order_report = orders[report_columns]
order_report
\`\`\`

필요한 컬럼 목록을 변수로 따로 만들면 코드의 의미가 더 분명해집니다.

\`\`\`python
report_columns = ["customer_name", "region", "product", "total_price", "order_status"]
\`\`\`

이 코드는 “보고서에 사용할 컬럼 목록”이라는 의미를 갖습니다. 분석 코드가 길어질수록 이런 방식이 가독성에 도움이 됩니다.

---

# 7.2 행 선택

## 행을 선택한다는 것

행 선택은 DataFrame에서 특정 행을 가져오는 작업입니다.

예를 들어 다음과 같은 질문을 할 수 있습니다.

- 첫 번째 주문은 무엇인가?
- 세 번째부터 다섯 번째 주문까지 보고 싶다.
- 주문번호가 1003인 주문을 보고 싶다.
- 특정 인덱스에 해당하는 행을 보고 싶다.

pandas에서 행을 선택할 때는 주로 \`loc\`와 \`iloc\`를 사용합니다.

---

## \`loc\`와 \`iloc\`의 차이

\`loc\`와 \`iloc\`는 모두 행과 열을 선택할 때 사용하지만 기준이 다릅니다.

| 구분 | 기준 | 예시 |
|---|---|---|
| \`loc\` | 라벨 기준 | 인덱스 이름, 컬럼명 |
| \`iloc\` | 위치 기준 | 0번째 행, 1번째 열 |

간단히 말하면 다음과 같습니다.

- \`loc\`: 이름으로 선택한다.
- \`iloc\`: 순서 번호로 선택한다.

---

## \`iloc\`로 위치 기준 행 선택하기

\`iloc\`는 행의 위치를 기준으로 데이터를 선택합니다. 파이썬의 리스트처럼 0부터 시작합니다.

\`\`\`python
orders.iloc[0]
\`\`\`

위 코드는 첫 번째 행을 선택합니다.

\`\`\`python
orders.iloc[2]
\`\`\`

위 코드는 세 번째 행을 선택합니다.

---

## 여러 행 선택하기

여러 행을 선택하려면 리스트를 사용합니다.

\`\`\`python
orders.iloc[[0, 2, 4]]
\`\`\`

이 코드는 0번째, 2번째, 4번째 위치의 행을 선택합니다.

---

## 행 범위 선택하기

슬라이싱도 사용할 수 있습니다.

\`\`\`python
orders.iloc[1:4]
\`\`\`

이 코드는 1번째 행부터 3번째 행까지 선택합니다. 파이썬 슬라이싱과 마찬가지로 끝 위치인 4는 포함되지 않습니다.

즉, \`1:4\`는 1, 2, 3번째 위치를 의미합니다.

---

## \`loc\`로 라벨 기준 행 선택하기

기본 DataFrame의 인덱스는 0, 1, 2, 3처럼 자동으로 부여됩니다. 하지만 실무에서는 주문번호, 고객 ID, 날짜 등을 인덱스로 사용하는 경우도 많습니다.

먼저 \`order_id\`를 인덱스로 설정한 DataFrame을 만들어 보겠습니다.

\`\`\`python
orders_by_id = orders.set_index("order_id")
orders_by_id
\`\`\`

이제 인덱스가 주문번호가 됩니다.

\`\`\`python
orders_by_id.loc[1001]
\`\`\`

이 코드는 인덱스 라벨이 \`1001\`인 행을 선택합니다.

중요한 점은 \`loc[1001]\`에서 \`1001\`은 첫 번째 위치가 아니라 **인덱스 이름**이라는 것입니다.

---

## \`loc\`로 여러 행 선택하기

\`\`\`python
orders_by_id.loc[[1001, 1003, 1007]]
\`\`\`

이 코드는 주문번호가 1001, 1003, 1007인 행을 선택합니다.

---

## \`loc\` 슬라이싱의 특징

\`loc\`에서 라벨 기준 슬라이싱을 사용할 때는 끝 라벨이 포함됩니다.

\`\`\`python
orders_by_id.loc[1002:1005]
\`\`\`

이 코드는 1002부터 1005까지 선택합니다. \`iloc[1:4]\`처럼 끝이 제외되는 것과 다릅니다.

정리하면 다음과 같습니다.

| 방식 | 기준 | 슬라이싱 끝 포함 여부 |
|---|---|---|
| \`iloc\` | 위치 | 끝 제외 |
| \`loc\` | 라벨 | 끝 포함 |

이 차이는 자주 헷갈리는 부분이므로 반드시 기억해야 합니다.

---

## 행과 열을 동시에 선택하기

\`loc\`와 \`iloc\`는 행뿐 아니라 열도 함께 선택할 수 있습니다.

기본 구조는 다음과 같습니다.

\`\`\`python
df.loc[행 선택, 열 선택]
df.iloc[행 위치 선택, 열 위치 선택]
\`\`\`

예를 들어 주문번호 1001번의 고객명과 총 주문 금액을 선택해 보겠습니다.

\`\`\`python
orders_by_id.loc[1001, ["customer_name", "total_price"]]
\`\`\`

위 코드는 인덱스 라벨이 1001인 행에서 \`customer_name\`, \`total_price\` 컬럼을 선택합니다.

---

## \`iloc\`로 행과 열 위치 선택하기

\`\`\`python
orders.iloc[0, 1]
\`\`\`

이 코드는 0번째 행, 1번째 열에 있는 값을 선택합니다.

여러 행과 여러 열을 선택할 수도 있습니다.

\`\`\`python
orders.iloc[0:3, 1:4]
\`\`\`

이 코드는 0번째부터 2번째 행까지, 1번째부터 3번째 열까지 선택합니다.

---

## \`loc\`와 \`iloc\` 선택 기준 정리

다음 기준으로 기억하면 좋습니다.

\`loc\`는 컬럼명을 직접 지정할 수 있어 분석 코드에서 의미가 잘 드러납니다.

\`\`\`python
orders_by_id.loc[1001, "customer_name"]
\`\`\`

\`iloc\`는 위치를 기준으로 빠르게 확인할 때 유용합니다.

\`\`\`python
orders.iloc[0, 1]
\`\`\`

실무 분석 코드에서는 \`loc\`를 더 자주 사용합니다. 특히 조건 필터링과 컬럼 선택을 함께 할 때 \`loc\`가 매우 유용합니다.

---

# 7.3 조건 필터링

## 조건 필터링이란?

조건 필터링은 특정 조건을 만족하는 행만 선택하는 작업입니다.

예를 들어 다음 질문을 코드로 표현할 수 있습니다.

- 주문 상태가 완료인 주문만 보고 싶다.
- 서울 지역 주문만 보고 싶다.
- 총 주문 금액이 50,000원 이상인 주문만 보고 싶다.
- 전자제품 주문만 보고 싶다.

조건 필터링은 데이터 분석에서 가장 많이 사용하는 기능 중 하나입니다.

---

## 하나의 조건으로 필터링하기

서울 지역 주문만 선택해 보겠습니다.

\`\`\`python
orders["region"] == "서울"
\`\`\`

이 코드는 각 행이 조건을 만족하는지 \`True\` 또는 \`False\`로 표시합니다.

\`\`\`text
0     True
1    False
2     True
3    False
4     True
5    False
6     True
Name: region, dtype: bool
\`\`\`

이렇게 \`True\`, \`False\`로 이루어진 결과를 **불리언 마스크**라고 부릅니다.

이 마스크를 DataFrame에 넣으면 \`True\`인 행만 선택됩니다.

\`\`\`python
orders[orders["region"] == "서울"]
\`\`\`

결과는 서울 지역 주문만 남습니다.

---

## 조건을 변수로 분리하기

조건이 길어지면 변수로 분리하는 것이 좋습니다.

\`\`\`python
is_seoul = orders["region"] == "서울"

orders[is_seoul]
\`\`\`

\`is_seoul\`이라는 변수명만 보아도 “서울 지역인지 여부”를 나타낸다는 것을 알 수 있습니다.

분석 코드에서는 조건을 변수로 분리하면 코드를 읽고 수정하기 쉬워집니다.

---

## 숫자 조건으로 필터링하기

총 주문 금액이 50,000원 이상인 주문을 선택해 보겠습니다.

\`\`\`python
orders[orders["total_price"] >= 50000]
\`\`\`

비교 연산자를 사용하면 숫자 조건을 쉽게 만들 수 있습니다.

자주 사용하는 비교 연산자는 다음과 같습니다.

| 연산자 | 의미 |
|---|---|
| \`==\` | 같다 |
| \`!=\` | 같지 않다 |
| \`>\` | 크다 |
| \`<\` | 작다 |
| \`>=\` | 크거나 같다 |
| \`<=\` | 작거나 같다 |

---

## 문자열 조건으로 필터링하기

주문 상태가 완료인 행만 선택해 보겠습니다.

\`\`\`python
orders[orders["order_status"] == "완료"]
\`\`\`

전자제품 카테고리만 선택하려면 다음과 같이 작성합니다.

\`\`\`python
orders[orders["category"] == "전자제품"]
\`\`\`

---

## 여러 조건을 함께 사용하기

분석에서는 조건을 하나만 사용하는 경우보다 여러 조건을 함께 사용하는 경우가 더 많습니다.

예를 들어 “서울 지역이면서 주문 상태가 완료인 주문”을 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["order_status"] == "완료")

orders[condition]
\`\`\`

여러 조건을 함께 사용할 때는 파이썬의 \`and\`, \`or\` 대신 pandas에서는 다음 연산자를 사용합니다.

| 의미 | pandas에서 사용하는 연산자 |
|---|---|
| 그리고 | \`&\` |
| 또는 | \`|\` |
| 아니다 | \`~\` |

각 조건은 반드시 괄호로 감싸야 합니다.

---

## \`&\`: 모든 조건을 만족하는 데이터

서울 지역이면서 주문 금액이 50,000원 이상인 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["total_price"] >= 50000)

orders[condition]
\`\`\`

\`&\`는 두 조건을 모두 만족하는 행만 선택합니다.

---

## \`|\`: 하나라도 만족하는 데이터

서울 또는 부산 지역 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") | (orders["region"] == "부산")

orders[condition]
\`\`\`

\`|\`는 둘 중 하나라도 만족하면 선택합니다.

---

## \`~\`: 조건을 반대로 만들기

취소 주문이 아닌 데이터만 선택해 보겠습니다.

\`\`\`python
condition = orders["order_status"] == "취소"

orders[~condition]
\`\`\`

\`~\`는 \`True\`를 \`False\`로, \`False\`를 \`True\`로 바꿉니다.

다음처럼 바로 작성할 수도 있습니다.

\`\`\`python
orders[orders["order_status"] != "취소"]
\`\`\`

실무에서는 상황에 따라 더 읽기 쉬운 방식을 선택하면 됩니다.

---

## \`isin()\`으로 여러 값 중 하나 선택하기

여러 값 중 하나에 해당하는 데이터를 선택할 때는 \`isin()\`이 유용합니다.

\`\`\`python
orders[orders["region"].isin(["서울", "부산"])]
\`\`\`

이 코드는 지역이 서울 또는 부산인 주문을 선택합니다.

다음 코드와 같은 의미입니다.

\`\`\`python
orders[(orders["region"] == "서울") | (orders["region"] == "부산")]
\`\`\`

값이 많아질수록 \`isin()\`이 더 읽기 좋습니다.

\`\`\`python
target_regions = ["서울", "부산", "대구"]

orders[orders["region"].isin(target_regions)]
\`\`\`

---

## \`and\`, \`or\`를 사용하면 안 되는 이유

pandas 조건 필터링에서 다음 코드는 에러가 발생합니다.

\`\`\`python
orders[(orders["region"] == "서울") and (orders["total_price"] >= 50000)]
\`\`\`

pandas의 조건식은 하나의 참/거짓 값이 아니라, 여러 행에 대한 참/거짓 Series입니다. 따라서 일반 파이썬의 \`and\`, \`or\`로 처리할 수 없습니다.

pandas에서는 다음처럼 작성해야 합니다.

\`\`\`python
orders[(orders["region"] == "서울") & (orders["total_price"] >= 50000)]
\`\`\`

---

## 조건 필터링과 원본 데이터

조건 필터링은 기본적으로 원본 DataFrame을 직접 삭제하거나 변경하지 않습니다.

\`\`\`python
seoul_orders = orders[orders["region"] == "서울"]
\`\`\`

이 코드는 서울 지역 주문을 골라 \`seoul_orders\`라는 새 변수에 저장합니다. 원본 \`orders\`는 그대로 남아 있습니다.

분석에서는 원본 데이터를 보존하고, 조건에 맞게 추출한 데이터를 별도 변수로 저장하는 습관이 중요합니다.

---

# 7.4 문자열 조건 필터링

## 문자열 컬럼에서 조건 찾기

실무 데이터에는 문자열 컬럼이 많습니다.

- 고객명
- 지역
- 상품명
- 이메일
- 주소
- 상품 코드
- 주문 상태

문자열 데이터에서는 단순히 값이 같은지 비교하는 것뿐 아니라, 특정 단어가 포함되어 있는지, 특정 문자로 시작하는지, 특정 확장자로 끝나는지 확인해야 할 때가 많습니다.

pandas에서는 문자열 컬럼에 \`.str\`을 붙여 문자열 관련 기능을 사용할 수 있습니다.

---

## 특정 문자열 포함 여부: \`str.contains()\`

상품명에 \`마\`가 포함된 주문을 찾아보겠습니다.

\`\`\`python
orders[orders["product"].str.contains("마", na=False)]
\`\`\`

\`str.contains()\`는 문자열 안에 특정 값이 포함되어 있는지 확인합니다.

\`na=False\`는 결측치가 있을 때 그 값을 \`False\`로 처리하라는 의미입니다. 문자열 컬럼에 결측치가 있을 수 있다면 \`na=False\`를 넣는 것이 안전합니다.

---

## 특정 문자열로 시작하는지 확인하기: \`str.startswith()\`

고객명이 \`김\`으로 시작하는 행을 선택해 보겠습니다.

\`\`\`python
orders[orders["customer_name"].str.startswith("김", na=False)]
\`\`\`

이 코드는 고객명이 김으로 시작하는 행만 선택합니다.

---

## 특정 문자열로 끝나는지 확인하기: \`str.endswith()\`

상품명이 \`터\`로 끝나는 행을 선택해 보겠습니다.

\`\`\`python
orders[orders["product"].str.endswith("터", na=False)]
\`\`\`

파일명 데이터가 있다면 확장자를 확인할 때도 \`str.endswith()\`를 자주 사용합니다.

\`\`\`python
files = pd.DataFrame({
    "filename": ["sales.csv", "report.xlsx", "image.png", "memo.txt"]
})

files[files["filename"].str.endswith(".csv", na=False)]
\`\`\`

---

## 대소문자를 무시하고 검색하기

영문 데이터에서는 대소문자 문제가 자주 발생합니다.

\`\`\`python
emails = pd.DataFrame({
    "email": ["USER@EXAMPLE.COM", "admin@test.com", "manager@Example.com"]
})
\`\`\`

\`example\`이 포함된 이메일을 찾고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
emails[emails["email"].str.contains("example", case=False, na=False)]
\`\`\`

\`case=False\`는 대소문자를 구분하지 않겠다는 의미입니다.

---

## 문자열 조건 필터링 실무 예제

전자제품 중 상품명에 \`터\`가 들어가는 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["category"] == "전자제품") & (orders["product"].str.contains("터", na=False))

orders[condition]
\`\`\`

이처럼 문자열 조건도 다른 조건과 함께 사용할 수 있습니다.

---

# 7.5 범위 조건 필터링

## 범위 조건이란?

범위 조건은 어떤 값이 특정 구간 안에 있는지 확인하는 조건입니다.

예를 들어 다음과 같은 질문을 할 수 있습니다.

- 주문 금액이 30,000원 이상 100,000원 이하인가?
- 주문 수량이 3개 이상 10개 이하인가?
- 단가가 1,000원 이상 10,000원 이하인가?

---

## 비교 연산자로 범위 조건 만들기

총 주문 금액이 30,000원 이상 100,000원 이하인 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["total_price"] >= 30000) & (orders["total_price"] <= 100000)

orders[condition]
\`\`\`

범위 조건도 여러 조건을 함께 쓰는 것이므로 각 조건을 괄호로 감싸야 합니다.

---

## \`between()\` 사용하기

pandas에서는 범위 조건을 더 간단하게 표현할 수 있는 \`between()\`을 제공합니다.

\`\`\`python
orders[orders["total_price"].between(30000, 100000)]
\`\`\`

위 코드는 \`total_price\`가 30,000 이상 100,000 이하인 행을 선택합니다.

일반적으로 \`between(a, b)\`는 a와 b 사이에 있는 값을 찾을 때 사용합니다.

---

## 수량 범위 필터링

주문 수량이 3개 이상 10개 이하인 주문을 선택해 보겠습니다.

\`\`\`python
orders[orders["quantity"].between(3, 10)]
\`\`\`

---

## 범위 조건과 다른 조건 결합하기

서울 지역 주문 중 총 주문 금액이 30,000원 이상 100,000원 이하인 데이터를 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["total_price"].between(30000, 100000))

orders[condition]
\`\`\`

실무 분석에서는 이런 방식으로 범위 조건과 범주 조건을 자주 함께 사용합니다.

---

# 7.6 결측치 조건 필터링

## 결측치가 있는 행 찾기

결측치는 값이 비어 있는 데이터를 의미합니다. pandas에서는 보통 \`NaN\`, \`None\` 등이 결측치로 처리됩니다.

예제 데이터의 \`phone\` 컬럼에는 \`None\`과 빈 문자열이 포함되어 있습니다.

먼저 결측치를 확인해 보겠습니다.

\`\`\`python
orders["phone"].isna()
\`\`\`

이 코드는 \`phone\` 컬럼이 결측치인지 여부를 \`True\`, \`False\`로 반환합니다.

결측치가 있는 행만 선택하려면 다음처럼 작성합니다.

\`\`\`python
orders[orders["phone"].isna()]
\`\`\`

---

## 결측치가 아닌 행 선택하기

전화번호가 있는 행만 선택하려면 \`notna()\`를 사용합니다.

\`\`\`python
orders[orders["phone"].notna()]
\`\`\`

하지만 예제 데이터에는 빈 문자열 \`""\`도 있습니다. 빈 문자열은 pandas에서 자동으로 결측치로 판단되지 않습니다.

따라서 전화번호가 실제로 비어 있지 않은 행을 찾으려면 다음처럼 조건을 추가해야 합니다.

\`\`\`python
condition = orders["phone"].notna() & (orders["phone"] != "")

orders[condition]
\`\`\`

---

## 빈 문자열과 결측치의 차이

다음 두 값은 다릅니다.

\`\`\`python
None
""
\`\`\`

\`None\`은 값이 없다는 의미입니다. pandas에서는 보통 결측치로 처리됩니다.

반면 \`""\`는 길이가 0인 문자열입니다. 값이 비어 보이지만, 문자열 데이터로 존재합니다.

실무 데이터에서는 \`None\`, \`NaN\`, 빈 문자열, 공백 문자열이 섞여 있을 수 있습니다. 따라서 결측치를 처리하기 전에는 데이터가 어떤 형태로 비어 있는지 확인해야 합니다.

---

## 공백 문자열까지 처리하기

빈 문자열뿐 아니라 공백만 들어 있는 경우도 있을 수 있습니다.

\`\`\`python
phones = pd.Series(["010-1111-2222", None, "", "   "])
\`\`\`

공백만 있는 값까지 비어 있다고 판단하려면 문자열 공백을 제거한 뒤 확인할 수 있습니다.

\`\`\`python
phones_clean = phones.fillna("").str.strip()
phones_clean == ""
\`\`\`

이 방식은 12장 문자열 데이터 처리에서 더 자세히 다룹니다.

---

# 7.7 필요한 행과 열을 동시에 선택하기

## 필터링 후 필요한 컬럼만 보기

실무에서는 조건에 맞는 행을 선택한 뒤, 필요한 컬럼만 보는 경우가 많습니다.

예를 들어 서울 지역 주문 중 다음 컬럼만 보고 싶다고 가정하겠습니다.

- 고객명
- 상품명
- 총 주문 금액

\`\`\`python
condition = orders["region"] == "서울"
columns = ["customer_name", "product", "total_price"]

orders.loc[condition, columns]
\`\`\`

이 코드는 조건 필터링과 컬럼 선택을 동시에 수행합니다.

---

## \`loc\`를 사용하는 이유

다음 코드도 비슷한 결과를 만들 수 있습니다.

\`\`\`python
orders[orders["region"] == "서울"][["customer_name", "product", "total_price"]]
\`\`\`

하지만 실무에서는 다음 방식이 더 명확합니다.

\`\`\`python
orders.loc[orders["region"] == "서울", ["customer_name", "product", "total_price"]]
\`\`\`

\`loc[행 조건, 열 목록]\` 구조는 “어떤 행과 어떤 열을 선택하는지”가 분명하게 드러납니다.

---

## 여러 조건과 컬럼 선택 함께 사용하기

서울 지역이면서 주문 상태가 완료인 주문에서 고객명, 상품명, 총 주문 금액만 선택해 보겠습니다.

\`\`\`python
condition = (orders["region"] == "서울") & (orders["order_status"] == "완료")
columns = ["customer_name", "product", "total_price"]

orders.loc[condition, columns]
\`\`\`

결과는 분석 목적에 맞게 정리된 작은 DataFrame입니다.

---

## 수정은 \`loc\`를 사용해서 명확하게 하기

이번 장은 데이터 선택과 필터링이 중심이지만, 선택한 위치의 값을 수정할 때도 \`loc\`를 자주 사용합니다.

예를 들어 주문 상태가 \`취소\`인 주문에 표시용 컬럼을 추가하는 경우를 생각해 보겠습니다.

\`\`\`python
orders.loc[orders["order_status"] == "취소", "is_canceled"] = True
\`\`\`

값 수정은 9장 데이터 수정과 파생 변수에서 더 자세히 다룹니다. 여기서는 \`loc\`가 행과 열을 명확하게 지정할 수 있는 도구라는 점만 기억하면 됩니다.

---

# 7.8 실무 미니 프로젝트: 분석 대상 주문 추출하기

## 문제 상황

쇼핑몰 주문 데이터에서 분석 대상 주문만 추출하려고 합니다.

분석 대상 조건은 다음과 같습니다.

1. 주문 상태가 \`완료\`이다.
2. 지역이 \`서울\` 또는 \`부산\`이다.
3. 총 주문 금액이 30,000원 이상이다.
4. 전화번호가 비어 있지 않다.

최종 결과에는 다음 컬럼만 남깁니다.

- \`order_id\`
- \`customer_name\`
- \`region\`
- \`product\`
- \`total_price\`
- \`phone\`

---

## 1단계: 조건 만들기

\`\`\`python
is_completed = orders["order_status"] == "완료"
is_target_region = orders["region"].isin(["서울", "부산"])
is_enough_price = orders["total_price"] >= 30000
has_phone = orders["phone"].notna() & (orders["phone"] != "")
\`\`\`

조건을 한 줄에 모두 쓰지 않고 변수로 분리했습니다. 이렇게 하면 각각의 조건이 무엇을 의미하는지 쉽게 알 수 있습니다.

---

## 2단계: 조건 결합하기

\`\`\`python
condition = is_completed & is_target_region & is_enough_price & has_phone
\`\`\`

모든 조건을 만족해야 하므로 \`&\`를 사용합니다.

---

## 3단계: 필요한 컬럼 목록 만들기

\`\`\`python
columns = ["order_id", "customer_name", "region", "product", "total_price", "phone"]
\`\`\`

분석 결과에 필요한 컬럼만 남기기 위해 컬럼 목록을 따로 만듭니다.

---

## 4단계: 최종 데이터 추출하기

\`\`\`python
target_orders = orders.loc[condition, columns]

target_orders
\`\`\`

이제 \`target_orders\`에는 분석 대상 주문만 남습니다.

---

## 5단계: 결과 확인하기

\`\`\`python
target_orders.shape
\`\`\`

행과 열 개수를 확인합니다.

\`\`\`python
target_orders.head()
\`\`\`

추출 결과가 예상과 맞는지 일부 데이터를 확인합니다.

---

## 코드 전체

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    "customer_name": ["김민수", "이지은", "박서준", "최유리", "정다은", "홍길동", "오하나"],
    "region": ["서울", "부산", "서울", "대구", "서울", "부산", "서울"],
    "category": ["전자제품", "생활용품", "전자제품", "식품", "생활용품", "식품", "전자제품"],
    "product": ["키보드", "세제", "모니터", "커피", "수건", "라면", "마우스"],
    "quantity": [2, 5, 1, 10, 3, 20, 4],
    "unit_price": [30000, 7000, 200000, 1200, 8000, 900, 15000],
    "order_status": ["완료", "완료", "취소", "완료", "대기", "완료", "완료"],
    "phone": ["010-1111-2222", "010-2222-3333", None, "010-4444-5555", "", "010-6666-7777", "010-7777-8888"]
})

orders["total_price"] = orders["quantity"] * orders["unit_price"]

is_completed = orders["order_status"] == "완료"
is_target_region = orders["region"].isin(["서울", "부산"])
is_enough_price = orders["total_price"] >= 30000
has_phone = orders["phone"].notna() & (orders["phone"] != "")

condition = is_completed & is_target_region & is_enough_price & has_phone

columns = ["order_id", "customer_name", "region", "product", "total_price", "phone"]

target_orders = orders.loc[condition, columns]

target_orders
\`\`\`

---

# 7.9 자주 하는 실수

## 실수 1: 여러 컬럼 선택 시 리스트를 한 번만 쓰는 경우

잘못된 코드입니다.

\`\`\`python
orders["customer_name", "product"]
\`\`\`

여러 컬럼을 선택할 때는 컬럼명 목록을 리스트로 만들어야 합니다.

\`\`\`python
orders[["customer_name", "product"]]
\`\`\`

---

## 실수 2: 여러 조건에 \`and\`, \`or\`를 사용하는 경우

잘못된 코드입니다.

\`\`\`python
orders[(orders["region"] == "서울") and (orders["total_price"] >= 50000)]
\`\`\`

pandas에서는 \`&\`, \`|\`, \`~\`를 사용해야 합니다.

\`\`\`python
orders[(orders["region"] == "서울") & (orders["total_price"] >= 50000)]
\`\`\`

---

## 실수 3: 조건마다 괄호를 쓰지 않는 경우

잘못된 코드입니다.

\`\`\`python
orders[orders["region"] == "서울" & orders["total_price"] >= 50000]
\`\`\`

각 조건을 괄호로 감싸야 합니다.

\`\`\`python
orders[(orders["region"] == "서울") & (orders["total_price"] >= 50000)]
\`\`\`

---

## 실수 4: \`loc\`와 \`iloc\`를 혼동하는 경우

\`\`\`python
orders_by_id = orders.set_index("order_id")
\`\`\`

이 상태에서 다음 코드는 주문번호 1001을 선택합니다.

\`\`\`python
orders_by_id.loc[1001]
\`\`\`

하지만 다음 코드는 1001번째 위치의 행을 선택하려고 하기 때문에 에러가 발생할 가능성이 큽니다.

\`\`\`python
orders_by_id.iloc[1001]
\`\`\`

\`loc\`는 라벨 기준, \`iloc\`는 위치 기준입니다.

---

## 실수 5: 빈 문자열을 결측치로 착각하는 경우

\`\`\`python
orders[orders["phone"].isna()]
\`\`\`

이 코드는 \`None\`이나 \`NaN\`은 찾지만, 빈 문자열 \`""\`은 찾지 못합니다.

빈 문자열까지 비어 있다고 판단하려면 다음처럼 조건을 추가해야 합니다.

\`\`\`python
orders[orders["phone"].isna() | (orders["phone"] == "")]
\`\`\`

---

# 7장 핵심 정리

- 컬럼 하나를 선택하면 보통 Series가 반환된다.
- 여러 컬럼을 선택하려면 컬럼명 리스트를 사용한다.
- \`loc\`는 라벨 기준 선택 도구다.
- \`iloc\`는 위치 기준 선택 도구다.
- 조건 필터링은 \`True\`, \`False\`로 이루어진 불리언 마스크를 사용한다.
- 여러 조건을 연결할 때는 \`&\`, \`|\`, \`~\`를 사용한다.
- pandas 조건식에서는 \`and\`, \`or\`, \`not\`을 사용하지 않는다.
- 여러 조건을 사용할 때는 각 조건을 괄호로 감싼다.
- 문자열 조건은 \`.str.contains()\`, \`.str.startswith()\`, \`.str.endswith()\` 등을 사용한다.
- 범위 조건은 비교 연산자 또는 \`between()\`으로 만들 수 있다.
- 결측치 확인에는 \`isna()\`, \`notna()\`를 사용한다.
- 조건에 맞는 행과 필요한 열을 동시에 선택할 때는 \`df.loc[조건, 컬럼목록]\` 구조가 유용하다.

---

# 연습문제

## 문제 1. 컬럼 선택

다음 DataFrame에서 \`name\` 컬럼만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준"],
    "age": [28, 35, 41],
    "region": ["서울", "부산", "서울"]
})
\`\`\`

---

## 문제 2. 여러 컬럼 선택

위 DataFrame에서 \`name\`, \`region\` 컬럼만 선택하는 코드를 작성하세요.

---

## 문제 3. \`loc\`와 \`iloc\`

다음 설명 중 맞는 것을 고르세요.

1. \`loc\`는 위치 기준으로 행과 열을 선택한다.
2. \`iloc\`는 라벨 기준으로 행과 열을 선택한다.
3. \`loc\`는 라벨 기준, \`iloc\`는 위치 기준으로 선택한다.
4. \`loc\`와 \`iloc\`는 완전히 같은 기능이다.

---

## 문제 4. 조건 필터링

다음 DataFrame에서 \`region\`이 \`서울\`인 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준", "최유리"],
    "region": ["서울", "부산", "서울", "대구"],
    "amount": [50000, 30000, 80000, 20000]
})
\`\`\`

---

## 문제 5. 여러 조건 필터링

문제 4의 DataFrame에서 \`region\`이 \`서울\`이고 \`amount\`가 60,000 이상인 행만 선택하는 코드를 작성하세요.

---

## 문제 6. \`isin()\` 사용하기

문제 4의 DataFrame에서 지역이 \`서울\` 또는 \`부산\`인 행만 선택하는 코드를 \`isin()\`을 사용해 작성하세요.

---

## 문제 7. 문자열 조건 필터링

다음 DataFrame에서 \`email\` 컬럼에 \`gmail\`이 포함된 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준"],
    "email": ["minsu@gmail.com", "jieun@company.com", "seo@gmail.com"]
})
\`\`\`

---

## 문제 8. 범위 조건 필터링

다음 DataFrame에서 \`score\`가 70 이상 90 이하인 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["A", "B", "C", "D"],
    "score": [65, 70, 85, 95]
})
\`\`\`

---

## 문제 9. 결측치 필터링

다음 DataFrame에서 \`phone\`이 결측치인 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준"],
    "phone": ["010-1111-2222", None, "010-3333-4444"]
})
\`\`\`

---

## 문제 10. 행과 열 동시에 선택하기

다음 조건에 맞는 데이터를 선택하세요.

- \`region\`이 \`서울\`
- 선택할 컬럼은 \`name\`, \`amount\`

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준", "최유리"],
    "region": ["서울", "부산", "서울", "대구"],
    "amount": [50000, 30000, 80000, 20000]
})
\`\`\`

---

# 정답 및 해설

## 정답 1

\`\`\`python
df["name"]
\`\`\`

컬럼 하나를 선택할 때는 컬럼명을 문자열로 전달합니다. 결과는 Series입니다.

---

## 정답 2

\`\`\`python
df[["name", "region"]]
\`\`\`

여러 컬럼을 선택할 때는 컬럼명 목록을 리스트로 전달합니다.

---

## 정답 3

정답은 3번입니다.

\`loc\`는 라벨 기준으로 선택하고, \`iloc\`는 위치 기준으로 선택합니다.

---

## 정답 4

\`\`\`python
df[df["region"] == "서울"]
\`\`\`

\`df["region"] == "서울"\`은 각 행이 서울인지 여부를 \`True\`, \`False\`로 반환합니다.

---

## 정답 5

\`\`\`python
df[(df["region"] == "서울") & (df["amount"] >= 60000)]
\`\`\`

여러 조건을 함께 사용할 때는 \`&\`를 사용하고, 각 조건을 괄호로 감싸야 합니다.

---

## 정답 6

\`\`\`python
df[df["region"].isin(["서울", "부산"])]
\`\`\`

\`isin()\`은 여러 값 중 하나에 해당하는지 확인할 때 사용합니다.

---

## 정답 7

\`\`\`python
df[df["email"].str.contains("gmail", na=False)]
\`\`\`

문자열 포함 여부는 \`.str.contains()\`로 확인할 수 있습니다. 결측치가 있을 가능성이 있으면 \`na=False\`를 넣는 것이 안전합니다.

---

## 정답 8

\`\`\`python
df[df["score"].between(70, 90)]
\`\`\`

또는 다음처럼 비교 연산자를 사용할 수 있습니다.

\`\`\`python
df[(df["score"] >= 70) & (df["score"] <= 90)]
\`\`\`

---

## 정답 9

\`\`\`python
df[df["phone"].isna()]
\`\`\`

결측치인 행을 찾을 때는 \`isna()\`를 사용합니다.

---

## 정답 10

\`\`\`python
condition = df["region"] == "서울"
columns = ["name", "amount"]

df.loc[condition, columns]
\`\`\`

조건에 맞는 행과 필요한 컬럼을 동시에 선택할 때는 \`loc[조건, 컬럼목록]\` 구조를 사용하면 명확합니다.

---

# 실습 과제

## 과제 1. 주문 데이터 필터링

예제 \`orders\` 데이터에서 다음 조건을 만족하는 행을 선택하세요.

- 주문 상태가 \`완료\`
- 총 주문 금액이 50,000원 이상

결과에는 다음 컬럼만 남기세요.

- \`customer_name\`
- \`product\`
- \`total_price\`

---

## 과제 2. 지역별 분석 대상 추출

예제 \`orders\` 데이터에서 지역이 \`서울\` 또는 \`부산\`인 주문만 선택하세요. 단, 주문 상태가 \`취소\`인 행은 제외하세요.

---

## 과제 3. 전화번호가 없는 고객 찾기

예제 \`orders\` 데이터에서 전화번호가 비어 있는 행을 찾으세요.

조건은 다음 두 가지를 모두 고려해야 합니다.

- \`None\`인 경우
- 빈 문자열 \`""\`인 경우

---

## 과제 4. 상품명 조건 필터링

예제 \`orders\` 데이터에서 상품명에 \`마\`가 포함된 주문을 선택하세요.

---

## 과제 5. 분석용 데이터셋 만들기

예제 \`orders\` 데이터에서 다음 조건을 만족하는 분석용 데이터셋 \`analysis_orders\`를 만드세요.

- 주문 상태가 \`완료\`
- 총 주문 금액이 30,000원 이상
- 전화번호가 비어 있지 않음

남길 컬럼은 다음과 같습니다.

- \`order_id\`
- \`customer_name\`
- \`region\`
- \`category\`
- \`product\`
- \`total_price\`

---

# 실습 과제 예시 정답

## 과제 1 예시 정답

\`\`\`python
condition = (orders["order_status"] == "완료") & (orders["total_price"] >= 50000)
columns = ["customer_name", "product", "total_price"]

orders.loc[condition, columns]
\`\`\`

---

## 과제 2 예시 정답

\`\`\`python
condition = orders["region"].isin(["서울", "부산"]) & (orders["order_status"] != "취소")

orders[condition]
\`\`\`

---

## 과제 3 예시 정답

\`\`\`python
condition = orders["phone"].isna() | (orders["phone"] == "")

orders[condition]
\`\`\`

---

## 과제 4 예시 정답

\`\`\`python
orders[orders["product"].str.contains("마", na=False)]
\`\`\`

---

## 과제 5 예시 정답

\`\`\`python
is_completed = orders["order_status"] == "완료"
is_enough_price = orders["total_price"] >= 30000
has_phone = orders["phone"].notna() & (orders["phone"] != "")

condition = is_completed & is_enough_price & has_phone
columns = ["order_id", "customer_name", "region", "category", "product", "total_price"]

analysis_orders = orders.loc[condition, columns]
analysis_orders
\`\`\`

---

# 참고 자료

- pandas 공식 문서: Indexing and selecting data  
  https://pandas.pydata.org/docs/user_guide/indexing.html
- pandas 공식 문서: DataFrame.loc  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html
- pandas 공식 문서: DataFrame.iloc  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.iloc.html
`;export{e as default};