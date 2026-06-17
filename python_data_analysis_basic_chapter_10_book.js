var e=`# 10장. 결측치 처리

## 10.0 들어가며

실제 데이터는 항상 완벽하지 않습니다.  
어떤 값은 입력되지 않았고, 어떤 값은 수집 과정에서 빠졌으며, 어떤 값은 시스템 오류나 사람의 실수로 비어 있을 수 있습니다.

예를 들어 고객 데이터에 전화번호가 없을 수 있습니다.  
주문 데이터에 배송 완료일이 없을 수 있습니다.  
상품 데이터에 원가 정보가 없을 수도 있습니다.  
설문 데이터에서는 일부 응답자가 특정 문항에 답하지 않았을 수 있습니다.

이렇게 비어 있거나 존재하지 않는 값을 **결측치**라고 합니다.

결측치를 제대로 처리하지 않으면 분석 결과가 왜곡될 수 있습니다.

예를 들어 평균 주문 금액을 계산하는데 일부 금액이 비어 있다면 평균 계산이 달라질 수 있습니다.  
지역별 고객 수를 분석하는데 지역 정보가 비어 있다면 일부 고객이 분석에서 빠질 수 있습니다.  
날짜 데이터가 비어 있으면 월별 추이 분석을 할 수 없는 행이 생깁니다.

이번 장에서는 pandas에서 결측치를 확인하고, 제거하고, 대체하는 기본 방법을 배웁니다.

결측치 처리는 데이터 분석에서 매우 중요한 전처리 단계입니다.  
단순히 빈 값을 지우거나 0으로 채우는 문제가 아니라, **왜 값이 비어 있는지 이해하고 분석 목적에 맞게 처리 기준을 정하는 작업**입니다.

---

## 10.1 결측치란?

결측치는 데이터에서 값이 비어 있거나 존재하지 않는 상태를 말합니다.

pandas에서는 결측치를 주로 다음과 같은 형태로 만납니다.

\`\`\`python
import pandas as pd
import numpy as np

data = pd.DataFrame({
    "name": ["민수", "지영", None],
    "age": [25, None, 31],
    "purchase": [100000, np.nan, 50000]
})

data
\`\`\`

이 데이터에는 여러 형태의 비어 있는 값이 있습니다.

- \`None\`
- \`np.nan\`
- pandas가 내부적으로 결측치로 인식하는 값

결측치는 화면에 \`NaN\`으로 보이는 경우가 많습니다.  
\`NaN\`은 Not a Number의 약자입니다.  
원래는 숫자가 아님을 나타내는 값이지만, pandas에서는 비어 있는 값을 표현하는 데 자주 사용됩니다.

---

### 10.1.1 결측치가 생기는 이유

결측치가 생기는 이유는 다양합니다.

대표적인 원인은 다음과 같습니다.

| 원인 | 예시 |
|---|---|
| 입력 누락 | 고객이 전화번호를 입력하지 않음 |
| 수집 실패 | API 응답에서 일부 값이 빠짐 |
| 시스템 오류 | 데이터 저장 중 일부 컬럼 누락 |
| 해당 없음 | 배송 전 주문에는 배송 완료일이 없음 |
| 의도적 미응답 | 설문에서 민감한 질문에 답하지 않음 |
| 병합 과정 문제 | 주문 데이터와 고객 데이터를 결합했는데 일부 고객 정보가 없음 |

결측치는 단순한 오류일 수도 있지만, 의미 있는 정보일 수도 있습니다.

예를 들어 배송 완료일이 비어 있는 주문은 아직 배송이 끝나지 않은 주문일 수 있습니다.  
이 경우 결측치를 무조건 삭제하면 현재 진행 중인 주문 정보가 사라질 수 있습니다.

따라서 결측치를 처리하기 전에 먼저 질문해야 합니다.

\`\`\`text
이 값은 왜 비어 있을까?
비어 있는 것이 오류일까, 아니면 의미가 있을까?
분석 목적상 이 행을 남겨야 할까, 제거해야 할까?
\`\`\`

---

### 10.1.2 결측치와 빈 문자열은 다르다

초보자가 자주 혼동하는 부분이 있습니다.  
\`NaN\`과 빈 문자열 \`""\`은 다릅니다.

다음 예를 보겠습니다.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "", None],
    "email": ["minsu@example.com", "", None]
})

df
\`\`\`

\`None\`은 pandas에서 결측치로 인식됩니다.  
하지만 빈 문자열 \`""\`은 값이 비어 보이더라도 문자열 데이터입니다.

결측치 여부를 확인해봅시다.

\`\`\`python
df.isna()
\`\`\`

결과를 보면 \`None\`은 \`True\`로 표시되지만, 빈 문자열은 \`False\`로 표시됩니다.

즉, pandas 입장에서 빈 문자열은 “없는 값”이 아니라 “길이가 0인 문자열 값”입니다.

실무 데이터에서는 빈 문자열, 공백 문자열, \`-\`, \`N/A\`, \`없음\`, \`미입력\` 같은 값이 결측치를 대신하는 경우도 많습니다.  
이런 값은 분석 전에 명시적으로 결측치로 바꾸거나 별도 범주로 처리해야 합니다.

\`\`\`python
df["name"] = df["name"].replace("", pd.NA)
\`\`\`

---

### 10.1.3 결측치가 분석에 미치는 영향

결측치는 분석 결과에 여러 방식으로 영향을 줍니다.

첫째, 계산에서 제외될 수 있습니다.  
pandas의 많은 집계 함수는 기본적으로 결측치를 제외하고 계산합니다.

\`\`\`python
sales = pd.Series([100, 200, None, 300])

sales.mean()
\`\`\`

평균은 결측치를 제외한 값으로 계산됩니다.

둘째, 필터링 결과가 예상과 다를 수 있습니다.  
결측치가 있는 행은 조건 비교에서 빠지거나 \`False\`처럼 처리되는 경우가 있습니다.

셋째, 시각화에서 일부 데이터가 빠질 수 있습니다.  
결측치가 많은 컬럼은 그래프가 제대로 그려지지 않거나 해석이 어려워질 수 있습니다.

넷째, 데이터 결합 후 결측치가 늘어날 수 있습니다.  
고객 정보와 주문 정보를 결합했는데 매칭되지 않는 고객이 있으면 고객명이나 지역 컬럼에 결측치가 생길 수 있습니다.

결측치 처리는 분석 전에 반드시 확인해야 하는 기본 점검 항목입니다.

---

## 10.2 예제 데이터 준비

이번 장에서는 고객 주문 데이터를 사용해 결측치 처리 방법을 연습하겠습니다.

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    "customer": ["민수", "지영", "철수", "영희", "수진", None, "현우"],
    "region": ["서울", "부산", None, "서울", "대전", "부산", ""],
    "category": ["전자기기", "도서", "전자기기", None, "생활용품", "도서", "전자기기"],
    "quantity": [1, 3, 2, 5, None, 1, 2],
    "unit_price": [300000, 15000, 80000, 10000, 20000, None, 120000],
    "order_date": ["2026-01-03", "2026-01-05", None, "2026-01-07", "2026-01-08", "2026-01-10", ""]
})

orders
\`\`\`

이 데이터에는 여러 종류의 문제가 섞여 있습니다.

- 고객명이 없는 행
- 지역이 없는 행
- 빈 문자열로 입력된 지역
- 카테고리가 없는 행
- 수량이 없는 행
- 단가가 없는 행
- 주문일이 없는 행
- 빈 문자열로 입력된 주문일

현실 데이터도 이와 비슷합니다.  
결측치가 한 가지 형태로만 존재하지 않고 여러 형태로 섞여 있는 경우가 많습니다.

---

## 10.3 결측치 확인하기

결측치 처리는 확인에서 시작합니다.  
어떤 컬럼에 결측치가 있는지, 얼마나 많은지, 어떤 행에 문제가 있는지 알아야 적절한 처리 기준을 세울 수 있습니다.

---

### 10.3.1 \`isna()\`

\`isna()\`는 값이 결측치인지 확인합니다.

\`\`\`python
orders.isna()
\`\`\`

결과는 원래 DataFrame과 같은 모양의 DataFrame입니다.  
값이 결측치이면 \`True\`, 결측치가 아니면 \`False\`로 표시됩니다.

\`\`\`text
True  → 결측치
False → 결측치 아님
\`\`\`

\`isnull()\`도 같은 역할을 합니다.

\`\`\`python
orders.isnull()
\`\`\`

pandas에서는 \`isna()\`와 \`isnull()\`을 모두 사용할 수 있습니다.  
이 책에서는 이름이 더 직관적인 \`isna()\`를 주로 사용하겠습니다.

---

### 10.3.2 \`notna()\`

\`notna()\`는 \`isna()\`의 반대입니다.  
값이 결측치가 아니면 \`True\`, 결측치이면 \`False\`를 반환합니다.

\`\`\`python
orders.notna()
\`\`\`

값이 있는 행만 선택할 때 유용합니다.

\`\`\`python
orders[orders["customer"].notna()]
\`\`\`

이 코드는 \`customer\` 컬럼에 값이 있는 행만 선택합니다.

---

### 10.3.3 컬럼별 결측치 개수 확인

실무에서는 전체 표를 \`isna()\`로 보는 것보다 컬럼별 결측치 개수를 보는 경우가 많습니다.

\`\`\`python
orders.isna().sum()
\`\`\`

\`isna()\`는 결측치 여부를 \`True\`와 \`False\`로 표시합니다.  
파이썬에서 \`True\`는 1, \`False\`는 0처럼 계산될 수 있습니다.  
따라서 \`sum()\`을 사용하면 컬럼별 결측치 개수를 계산할 수 있습니다.

예상 결과는 다음과 비슷합니다.

\`\`\`text
order_id      0
customer      1
region        1
category      1
quantity      1
unit_price    1
order_date    1
dtype: int64
\`\`\`

주의할 점은 빈 문자열 \`""\`은 아직 결측치로 인식되지 않았다는 것입니다.  
따라서 \`region\`과 \`order_date\`의 빈 문자열은 위 결과에 포함되지 않을 수 있습니다.

---

### 10.3.4 컬럼별 결측치 비율 확인

결측치 개수도 중요하지만, 전체 데이터에서 얼마나 차지하는지 비율로 보는 것도 중요합니다.

\`\`\`python
orders.isna().mean()
\`\`\`

결측치 비율을 백분율로 보고 싶으면 100을 곱합니다.

\`\`\`python
missing_ratio = orders.isna().mean() * 100

missing_ratio
\`\`\`

결측치 비율을 보기 좋게 정렬할 수도 있습니다.

\`\`\`python
missing_ratio.sort_values(ascending=False)
\`\`\`

결측치가 많은 컬럼부터 확인하면 우선적으로 처리해야 할 컬럼을 찾기 쉽습니다.

---

### 10.3.5 결측치가 있는 행 찾기

어떤 행에 결측치가 하나라도 있는지 확인하려면 \`any(axis=1)\`을 사용합니다.

\`\`\`python
orders[orders.isna().any(axis=1)]
\`\`\`

\`axis=1\`은 행 방향으로 검사하겠다는 의미입니다.  
즉, 각 행에서 결측치가 하나라도 있으면 \`True\`가 됩니다.

반대로 결측치가 전혀 없는 행만 선택하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders[orders.notna().all(axis=1)]
\`\`\`

\`all(axis=1)\`은 각 행에서 모든 값이 결측치가 아닌지 확인합니다.

---

### 10.3.6 행별 결측치 개수 확인

각 행에 결측치가 몇 개 있는지 알고 싶을 때는 다음처럼 작성합니다.

\`\`\`python
orders.isna().sum(axis=1)
\`\`\`

이 결과를 원본 데이터에 임시로 붙여서 볼 수도 있습니다.

\`\`\`python
orders_with_missing_count = orders.copy()
orders_with_missing_count["missing_count"] = orders_with_missing_count.isna().sum(axis=1)

orders_with_missing_count
\`\`\`

결측치가 많은 행은 데이터 품질이 낮을 가능성이 있습니다.  
특히 한 행에서 여러 핵심 컬럼이 동시에 비어 있다면 제거를 고려할 수 있습니다.

---

### 10.3.7 빈 문자열을 결측치로 바꾸기

예제 데이터에는 빈 문자열 \`""\`이 있습니다.  
pandas는 빈 문자열을 자동으로 결측치로 보지 않습니다.

\`\`\`python
orders.isna().sum()
\`\`\`

이 상태에서는 \`""\`이 결측치 개수에 포함되지 않습니다.

빈 문자열을 결측치로 처리하려면 \`replace()\`를 사용합니다.

\`\`\`python
orders_clean = orders.replace("", pd.NA)

orders_clean
\`\`\`

이제 다시 결측치 개수를 확인합니다.

\`\`\`python
orders_clean.isna().sum()
\`\`\`

실무에서는 다음과 같은 값들도 결측치처럼 처리해야 할 수 있습니다.

\`\`\`python
missing_values = ["", " ", "-", "N/A", "NA", "없음", "미입력"]

orders_clean = orders.replace(missing_values, pd.NA)
\`\`\`

다만 모든 값을 무조건 결측치로 바꾸면 안 됩니다.  
예를 들어 \`"-"\`가 실제 상품 코드일 수도 있습니다.  
데이터의 의미를 확인한 뒤 처리해야 합니다.

---

## 10.4 결측치 제거하기

결측치를 처리하는 가장 단순한 방법은 결측치가 있는 행이나 열을 제거하는 것입니다.  
pandas에서는 \`dropna()\`를 사용합니다.

하지만 제거는 신중해야 합니다.  
너무 많은 행을 제거하면 데이터가 줄어들고, 특정 집단이 과도하게 빠져 분석 결과가 왜곡될 수 있습니다.

---

### 10.4.1 결측치가 있는 행 제거

가장 기본적인 사용법은 다음과 같습니다.

\`\`\`python
orders_clean.dropna()
\`\`\`

이 코드는 결측치가 하나라도 있는 행을 제거합니다.

기본 설정은 다음과 같습니다.

\`\`\`python
orders_clean.dropna(axis=0, how="any")
\`\`\`

- \`axis=0\`: 행을 제거
- \`how="any"\`: 결측치가 하나라도 있으면 제거

이 방식은 간단하지만 매우 엄격합니다.  
컬럼 하나만 비어 있어도 행 전체가 사라집니다.

따라서 실무에서는 무조건 \`dropna()\`를 전체 데이터에 적용하기보다, 어떤 컬럼을 기준으로 제거할지 정하는 것이 좋습니다.

---

### 10.4.2 특정 컬럼 기준으로 행 제거

주문 분석에서 \`quantity\`와 \`unit_price\`가 없으면 주문 금액을 계산하기 어렵습니다.  
이 경우 두 컬럼 중 하나라도 비어 있으면 해당 행을 제거할 수 있습니다.

\`\`\`python
orders_clean.dropna(subset=["quantity", "unit_price"])
\`\`\`

\`subset\`은 결측치를 검사할 컬럼을 지정합니다.

이 코드는 \`quantity\` 또는 \`unit_price\`가 결측치인 행만 제거합니다.  
다른 컬럼에 결측치가 있어도 제거하지 않습니다.

실무에서는 보통 다음과 같이 핵심 컬럼을 기준으로 제거 여부를 결정합니다.

\`\`\`python
required_columns = ["order_id", "quantity", "unit_price"]

orders_required = orders_clean.dropna(subset=required_columns)
\`\`\`

핵심 컬럼이 비어 있으면 분석 자체가 어려운 경우가 많습니다.  
반대로 보조 컬럼이 비어 있다고 해서 행 전체를 제거할 필요는 없을 수 있습니다.

---

### 10.4.3 모든 값이 결측치인 행 제거

모든 값이 결측치인 행만 제거하고 싶을 때는 \`how="all"\`을 사용합니다.

\`\`\`python
orders_clean.dropna(how="all")
\`\`\`

이 코드는 행 전체가 비어 있는 경우에만 제거합니다.

\`how\`의 의미는 다음과 같습니다.

| 옵션 | 의미 |
|---|---|
| \`how="any"\` | 결측치가 하나라도 있으면 제거 |
| \`how="all"\` | 모든 값이 결측치이면 제거 |

\`how="all"\`은 빈 행을 제거할 때 유용합니다.  
예를 들어 엑셀 파일을 읽었는데 중간에 완전히 빈 행이 섞여 있는 경우 사용할 수 있습니다.

---

### 10.4.4 결측치가 많은 열 제거

특정 열에 결측치가 너무 많으면 분석에 사용하기 어려울 수 있습니다.  
열을 제거하려면 \`axis=1\`을 사용합니다.

\`\`\`python
orders_clean.dropna(axis=1)
\`\`\`

하지만 이 코드는 결측치가 하나라도 있는 열을 모두 제거하므로 매우 강한 처리입니다.

일반적으로는 결측치 비율을 확인한 뒤 제거 여부를 판단합니다.

\`\`\`python
missing_ratio = orders_clean.isna().mean() * 100
missing_ratio
\`\`\`

예를 들어 결측치가 80% 이상인 컬럼은 제거를 고려할 수 있습니다.

\`\`\`python
columns_to_drop = missing_ratio[missing_ratio >= 80].index

orders_clean.drop(columns=columns_to_drop)
\`\`\`

기초 과정에서는 결측치 비율을 보고 사람이 판단하는 방식으로 충분합니다.

---

### 10.4.5 최소한의 값이 있는 행만 유지하기

\`thresh\`는 결측치가 아닌 값이 최소 몇 개 이상 있어야 행을 유지할지 정하는 옵션입니다.

\`\`\`python
orders_clean.dropna(thresh=5)
\`\`\`

이 코드는 결측치가 아닌 값이 5개 이상인 행만 남깁니다.

예를 들어 컬럼이 7개인 데이터에서 5개 이상의 값이 채워진 행만 유지하고 싶을 때 사용할 수 있습니다.

\`thresh\`는 다음 상황에서 유용합니다.

- 설문 문항 중 너무 많은 답변이 비어 있는 응답 제거
- 고객 정보 중 대부분이 비어 있는 행 제거
- 데이터 품질이 매우 낮은 행 제외

---

## 10.5 결측치 대체하기

결측치를 제거하는 대신 다른 값으로 채울 수도 있습니다.  
pandas에서는 \`fillna()\`를 사용합니다.

\`\`\`python
orders_clean.fillna(0)
\`\`\`

하지만 모든 결측치를 0으로 채우는 것은 위험합니다.  
컬럼의 의미에 따라 적절한 값으로 채워야 합니다.

예를 들어 수량이 비어 있다고 해서 0으로 채우는 것이 항상 맞지는 않습니다.  
정말 주문 수량이 0인 것인지, 입력이 누락된 것인지 다르기 때문입니다.

---

### 10.5.1 고정값으로 채우기

문자열 컬럼에서는 결측치를 \`"미상"\` 또는 \`"미입력"\` 같은 값으로 채울 수 있습니다.

\`\`\`python
orders_filled = orders_clean.copy()

orders_filled["region"] = orders_filled["region"].fillna("미상")
orders_filled["category"] = orders_filled["category"].fillna("미분류")

orders_filled
\`\`\`

지역이나 카테고리처럼 범주형 데이터에서는 결측치를 별도 범주로 두는 방식이 자주 사용됩니다.

예를 들어 지역이 없는 고객을 삭제하지 않고 \`"미상"\` 지역으로 분류할 수 있습니다.

---

### 10.5.2 숫자 컬럼을 0으로 채우기

숫자 컬럼은 상황에 따라 0으로 채울 수 있습니다.

\`\`\`python
orders_filled["quantity"] = orders_filled["quantity"].fillna(0)
\`\`\`

하지만 0으로 채우기 전에 반드시 의미를 확인해야 합니다.

예를 들어 다음 두 상황은 다릅니다.

| 상황 | 0으로 채워도 되는가? |
|---|---|
| 쿠폰 사용 금액이 비어 있음 | 사용하지 않았다는 의미라면 0 가능 |
| 주문 수량이 비어 있음 | 입력 누락일 수 있으므로 신중해야 함 |
| 재고 수량이 비어 있음 | 재고가 0인지 알 수 없으므로 신중해야 함 |
| 배송비가 비어 있음 | 무료배송이면 0 가능, 누락이면 신중해야 함 |

숫자 결측치를 무조건 0으로 채우면 평균, 합계, 비율 계산이 왜곡될 수 있습니다.

---

### 10.5.3 평균으로 채우기

수치형 데이터에서 결측치를 평균으로 채우는 방법도 있습니다.

\`\`\`python
mean_price = orders_clean["unit_price"].mean()

orders_filled["unit_price"] = orders_filled["unit_price"].fillna(mean_price)
\`\`\`

평균으로 채우는 방식은 전체적인 평균 수준을 유지하려는 목적이 있습니다.  
하지만 이상값이 있는 데이터에서는 평균이 크게 흔들릴 수 있습니다.

예를 들어 대부분 상품 가격이 1만 원에서 5만 원 사이인데, 일부 상품이 300만 원이라면 평균이 실제 일반적인 가격보다 높아질 수 있습니다.

---

### 10.5.4 중앙값으로 채우기

중앙값은 데이터를 크기순으로 정렬했을 때 가운데에 있는 값입니다.  
이상값의 영향을 평균보다 덜 받습니다.

\`\`\`python
median_price = orders_clean["unit_price"].median()

orders_filled["unit_price"] = orders_filled["unit_price"].fillna(median_price)
\`\`\`

금액, 소득, 주문 수량처럼 한쪽으로 크게 치우칠 수 있는 데이터에서는 평균보다 중앙값이 더 적절할 때가 많습니다.

---

### 10.5.5 최빈값으로 채우기

범주형 데이터에서는 가장 많이 등장한 값, 즉 최빈값으로 결측치를 채울 수 있습니다.

\`\`\`python
most_common_region = orders_clean["region"].mode()[0]

orders_filled["region"] = orders_filled["region"].fillna(most_common_region)
\`\`\`

\`mode()\`는 최빈값을 Series 형태로 반환합니다.  
따라서 첫 번째 값을 사용하려면 \`[0]\`을 붙입니다.

하지만 최빈값으로 채우면 가장 많은 범주가 더 많아지는 효과가 생깁니다.  
결측치가 많다면 데이터 분포가 왜곡될 수 있으므로 주의해야 합니다.

---

### 10.5.6 컬럼별로 다른 값 채우기

여러 컬럼을 한 번에 다른 값으로 채울 수도 있습니다.

\`\`\`python
orders_filled = orders_clean.fillna({
    "customer": "이름없음",
    "region": "미상",
    "category": "미분류",
    "quantity": 0
})

orders_filled
\`\`\`

딕셔너리를 사용하면 컬럼별로 다른 대체값을 지정할 수 있습니다.

이 방식은 실무에서 자주 사용됩니다.  
왜냐하면 컬럼마다 결측치의 의미가 다르기 때문입니다.

---

## 10.6 앞뒤 값으로 채우기

시계열 데이터나 순서가 있는 데이터에서는 앞의 값 또는 뒤의 값으로 결측치를 채울 수 있습니다.

pandas에서는 다음 메서드를 사용할 수 있습니다.

- \`ffill()\`: 앞의 유효한 값으로 채우기
- \`bfill()\`: 뒤의 유효한 값으로 채우기

---

### 10.6.1 앞의 값으로 채우기: \`ffill()\`

다음과 같은 일별 재고 데이터가 있다고 가정해봅시다.

\`\`\`python
stock = pd.DataFrame({
    "date": pd.date_range("2026-01-01", periods=7),
    "stock_count": [100, None, None, 95, None, 90, None]
})

stock
\`\`\`

재고 수량이 매일 기록되지 않고, 변경된 날에만 기록되었다면 앞의 값을 유지하는 것이 적절할 수 있습니다.

\`\`\`python
stock["stock_count_filled"] = stock["stock_count"].ffill()

stock
\`\`\`

\`ffill()\`은 forward fill의 의미입니다.  
앞에 있는 유효한 값을 아래쪽으로 채웁니다.

---

### 10.6.2 뒤의 값으로 채우기: \`bfill()\`

뒤의 값으로 채우려면 \`bfill()\`을 사용합니다.

\`\`\`python
stock["stock_count_bfilled"] = stock["stock_count"].bfill()

stock
\`\`\`

\`bfill()\`은 backward fill의 의미입니다.  
뒤에 있는 유효한 값을 위쪽으로 채웁니다.

---

### 10.6.3 앞뒤 값 채우기 사용 시 주의점

앞뒤 값으로 채우는 방식은 편리하지만, 모든 데이터에 적합하지 않습니다.

적합한 경우는 다음과 같습니다.

- 날짜 순서가 있는 데이터
- 센서 데이터
- 재고 데이터
- 이전 상태가 유지된다고 볼 수 있는 데이터
- 시계열 데이터에서 일부 기록이 누락된 경우

부적합한 경우는 다음과 같습니다.

- 고객 이름
- 상품 가격
- 주문 금액
- 서로 독립적인 행
- 순서가 의미 없는 데이터

예를 들어 고객 데이터에서 앞 사람의 지역을 다음 사람의 비어 있는 지역에 채우면 잘못된 데이터가 됩니다.

\`\`\`python
orders_clean["region"].ffill()
\`\`\`

이 코드는 문법적으로 가능하지만, 의미적으로는 위험할 수 있습니다.  
각 행이 서로 독립적인 고객이라면 앞 행의 지역을 가져오는 것은 잘못된 처리입니다.

---

## 10.7 결측치 처리 기준 세우기

결측치 처리에서 가장 중요한 것은 메서드를 아는 것이 아니라 기준을 세우는 것입니다.

결측치를 처리할 때는 다음 질문을 순서대로 생각해보면 좋습니다.

\`\`\`text
1. 이 컬럼은 분석에 꼭 필요한가?
2. 결측치가 얼마나 많은가?
3. 결측치가 왜 생겼는가?
4. 결측치가 의미 있는 상태인가?
5. 제거하면 데이터가 너무 줄어들지 않는가?
6. 대체한다면 어떤 값이 가장 적절한가?
7. 처리 결과를 기록했는가?
\`\`\`

---

### 10.7.1 삭제할 것인가

다음과 같은 경우에는 결측치가 있는 행을 삭제할 수 있습니다.

- 핵심 분석 컬럼이 비어 있음
- 결측치가 있는 행이 매우 적음
- 해당 행을 살려도 분석에 사용할 수 없음
- 잘못 수집된 데이터로 판단됨

예를 들어 주문 금액 분석에서 수량과 단가가 모두 없으면 주문 금액을 계산할 수 없습니다.

\`\`\`python
orders_valid = orders_clean.dropna(subset=["quantity", "unit_price"])
\`\`\`

---

### 10.7.2 대체할 것인가

다음과 같은 경우에는 결측치를 대체할 수 있습니다.

- 결측치가 많아서 삭제하면 데이터 손실이 큼
- 적절한 대체 기준이 있음
- 결측치 자체가 특정 의미를 가짐
- 분석 목적상 대체가 더 합리적임

예를 들어 지역 정보가 없는 고객을 \`"미상"\`으로 분류할 수 있습니다.

\`\`\`python
orders_clean["region"] = orders_clean["region"].fillna("미상")
\`\`\`

---

### 10.7.3 별도 범주로 둘 것인가

범주형 데이터에서는 결측치를 별도 범주로 두는 방식이 유용할 수 있습니다.

\`\`\`python
orders_clean["category"] = orders_clean["category"].fillna("미분류")
\`\`\`

이 방식은 결측치를 없애면서도 “원래 값이 없었다”는 정보를 유지합니다.

특히 다음과 같은 컬럼에 적합할 수 있습니다.

- 지역
- 카테고리
- 고객 등급
- 유입 경로
- 응답 여부
- 회원 유형

---

### 10.7.4 처리하지 않고 남겨둘 것인가

때로는 결측치를 처리하지 않고 남겨두는 것이 더 나을 수 있습니다.

예를 들어 배송 완료일이 비어 있는 주문은 아직 배송이 완료되지 않은 주문일 수 있습니다.  
이 값을 억지로 채우면 오히려 잘못된 정보가 됩니다.

\`\`\`text
배송 완료일이 비어 있음 = 아직 배송 전 또는 배송 중
\`\`\`

이 경우 결측치를 제거하거나 임의 날짜로 채우는 것보다, 배송 상태 컬럼을 함께 확인하는 것이 더 좋습니다.

---

### 10.7.5 처리 기록 남기기

실무에서는 결측치를 어떻게 처리했는지 기록해야 합니다.

예를 들어 분석 보고서나 노트북에 다음과 같이 적을 수 있습니다.

\`\`\`text
결측치 처리 기준
- customer가 없는 행은 고객 분석에서 제외했다.
- region 결측치는 "미상"으로 대체했다.
- quantity 또는 unit_price가 없는 행은 주문 금액 계산에서 제외했다.
- order_date 결측치는 기간 분석에서 제외했다.
\`\`\`

처리 기록이 없으면 나중에 분석 결과를 설명하기 어렵습니다.  
특히 협업이나 보고서 작성에서는 결측치 처리 기준을 명확히 남기는 것이 중요합니다.

---

## 10.8 실무 처리 패턴

이번 절에서는 자주 만나는 결측치 처리 패턴을 정리합니다.

---

### 10.8.1 고객 데이터 결측치 처리

고객 데이터에서는 다음 컬럼들이 자주 등장합니다.

- 고객 ID
- 이름
- 이메일
- 전화번호
- 지역
- 가입일
- 고객 등급

예제 데이터를 만들어봅시다.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "name": ["민수", "지영", None, "영희", "현우"],
    "email": ["a@example.com", None, "c@example.com", "", "e@example.com"],
    "phone": ["010-1111-2222", None, "", "010-3333-4444", "010-5555-6666"],
    "region": ["서울", None, "부산", "", "대전"],
    "grade": ["VIP", "일반", None, "일반", "VIP"]
})

customers
\`\`\`

먼저 빈 문자열을 결측치로 바꿉니다.

\`\`\`python
customers = customers.replace(["", " "], pd.NA)
\`\`\`

결측치를 확인합니다.

\`\`\`python
customers.isna().sum()
\`\`\`

처리 기준을 세워봅시다.

\`\`\`text
- customer_id는 반드시 있어야 한다.
- name이 없으면 "이름없음"으로 대체한다.
- email이 없으면 이메일 발송 대상에서 제외할 수 있다.
- phone이 없으면 문자 발송 대상에서 제외할 수 있다.
- region이 없으면 "미상"으로 대체한다.
- grade가 없으면 "일반"으로 대체한다.
\`\`\`

코드로 작성하면 다음과 같습니다.

\`\`\`python
customers_clean = customers.copy()

customers_clean["name"] = customers_clean["name"].fillna("이름없음")
customers_clean["region"] = customers_clean["region"].fillna("미상")
customers_clean["grade"] = customers_clean["grade"].fillna("일반")

customers_clean
\`\`\`

이메일이 있는 고객만 선택할 수도 있습니다.

\`\`\`python
email_targets = customers_clean[customers_clean["email"].notna()]

email_targets
\`\`\`

---

### 10.8.2 상품 데이터 결측치 처리

상품 데이터에서는 가격, 재고, 카테고리 결측치가 중요합니다.

\`\`\`python
products = pd.DataFrame({
    "product_id": [101, 102, 103, 104, 105],
    "product_name": ["키보드", "마우스", "모니터", "노트북", "스피커"],
    "category": ["전자기기", "전자기기", None, "전자기기", ""],
    "price": [30000, 15000, 200000, None, 70000],
    "stock": [10, None, 7, 3, None]
})

products = products.replace("", pd.NA)

products
\`\`\`

결측치 확인:

\`\`\`python
products.isna().sum()
\`\`\`

처리 기준 예시:

\`\`\`text
- category가 없으면 "미분류"로 대체한다.
- price가 없으면 가격 분석에서는 제외한다.
- stock이 없으면 재고를 알 수 없으므로 0으로 채우지 않고 "재고 미확인" 상태로 본다.
\`\`\`

기초 분석에서는 다음과 같이 처리할 수 있습니다.

\`\`\`python
products_clean = products.copy()

products_clean["category"] = products_clean["category"].fillna("미분류")

products_for_price_analysis = products_clean.dropna(subset=["price"])

products_clean
\`\`\`

재고가 비어 있다고 해서 0으로 채우는 것은 조심해야 합니다.  
재고가 0이라는 것은 품절을 의미할 수 있지만, 결측치는 재고 정보를 모른다는 뜻일 수 있습니다.

필요하다면 재고 확인 여부 컬럼을 만들 수 있습니다.

\`\`\`python
products_clean["stock_unknown"] = products_clean["stock"].isna()

products_clean
\`\`\`

---

### 10.8.3 주문 데이터 결측치 처리

주문 데이터에서는 주문 금액 계산에 필요한 컬럼이 중요합니다.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "customer_id": [1, 2, 3, None, 5],
    "quantity": [2, 1, None, 4, 3],
    "unit_price": [10000, 30000, 20000, None, 15000],
    "coupon_amount": [1000, None, 0, 2000, None]
})

orders
\`\`\`

처리 기준을 생각해봅니다.

\`\`\`text
- order_id는 반드시 있어야 한다.
- customer_id가 없으면 고객별 분석에서는 제외할 수 있다.
- quantity 또는 unit_price가 없으면 주문 금액을 계산할 수 없다.
- coupon_amount가 비어 있으면 쿠폰을 사용하지 않은 것으로 보고 0으로 채울 수 있다.
\`\`\`

코드로 처리합니다.

\`\`\`python
orders_clean = orders.copy()

orders_clean["coupon_amount"] = orders_clean["coupon_amount"].fillna(0)

orders_amount = orders_clean.dropna(subset=["quantity", "unit_price"]).copy()

orders_amount["total_price"] = (
    orders_amount["quantity"] * orders_amount["unit_price"] - orders_amount["coupon_amount"]
)

orders_amount
\`\`\`

여기서 중요한 점은 컬럼마다 결측치 처리 방식이 다르다는 것입니다.

- 쿠폰 금액 결측치 → 0으로 대체 가능
- 수량 결측치 → 주문 금액 계산에서 제외
- 단가 결측치 → 주문 금액 계산에서 제외
- 고객 ID 결측치 → 고객별 분석에서는 제외하되 전체 매출 분석에는 남길 수 있음

---

## 10.9 실무 미니 프로젝트: 주문 데이터 결측치 처리하기

이번 장에서 배운 내용을 이용해 주문 데이터를 정리해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 빈 문자열을 결측치로 변환한다.
3. 컬럼별 결측치 개수와 비율을 확인한다.
4. 지역과 카테고리 결측치를 별도 값으로 대체한다.
5. 수량과 단가가 없는 행은 주문 금액 분석에서 제외한다.
6. 쿠폰 금액 결측치는 0으로 대체한다.
7. 최종 주문 금액을 계산한다.
8. 처리 결과를 요약한다.
\`\`\`

---

### 10.9.1 데이터 준비

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008],
    "customer": ["민수", "지영", "철수", None, "수진", "현우", "영희", "도윤"],
    "region": ["서울", "부산", "", "서울", None, "대전", "부산", " "],
    "category": ["전자기기", "도서", None, "생활용품", "전자기기", "", "도서", "생활용품"],
    "quantity": [1, 3, 2, None, 1, 4, 2, 5],
    "unit_price": [300000, 15000, None, 10000, 200000, 12000, 15000, None],
    "coupon_amount": [0, None, 5000, 1000, None, 0, 2000, None],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-06", "", "2026-01-08", "2026-01-09", None, "2026-01-10"]
})

orders
\`\`\`

---

### 10.9.2 빈 문자열을 결측치로 변환

\`\`\`python
orders_clean = orders.replace(["", " "], pd.NA)

orders_clean
\`\`\`

빈 문자열과 공백 문자열을 \`pd.NA\`로 변환했습니다.

---

### 10.9.3 결측치 개수와 비율 확인

\`\`\`python
missing_count = orders_clean.isna().sum()
missing_ratio = orders_clean.isna().mean() * 100

missing_summary = pd.DataFrame({
    "missing_count": missing_count,
    "missing_ratio": missing_ratio
})

missing_summary.sort_values(by="missing_count", ascending=False)
\`\`\`

이 표를 보면 어떤 컬럼에 결측치가 많은지 알 수 있습니다.

---

### 10.9.4 범주형 컬럼 결측치 대체

지역과 카테고리는 별도 범주로 처리합니다.

\`\`\`python
orders_clean["region"] = orders_clean["region"].fillna("미상")
orders_clean["category"] = orders_clean["category"].fillna("미분류")
\`\`\`

이렇게 하면 지역이나 카테고리가 없는 데이터를 분석에서 삭제하지 않고 별도로 확인할 수 있습니다.

---

### 10.9.5 쿠폰 금액 결측치 대체

쿠폰 금액이 비어 있는 경우, 쿠폰을 사용하지 않은 것으로 보고 0으로 채우겠습니다.

\`\`\`python
orders_clean["coupon_amount"] = orders_clean["coupon_amount"].fillna(0)
\`\`\`

이 기준은 데이터 의미에 따라 달라질 수 있습니다.  
만약 쿠폰 금액이 누락된 것인지 사용하지 않은 것인지 알 수 없다면 0으로 채우면 안 됩니다.

---

### 10.9.6 주문 금액 계산 가능한 행만 선택

주문 금액을 계산하려면 \`quantity\`와 \`unit_price\`가 필요합니다.  
둘 중 하나라도 없으면 계산할 수 없습니다.

\`\`\`python
orders_amount = orders_clean.dropna(subset=["quantity", "unit_price"]).copy()

orders_amount
\`\`\`

---

### 10.9.7 최종 주문 금액 계산

\`\`\`python
orders_amount["total_price"] = (
    orders_amount["quantity"] * orders_amount["unit_price"]
    - orders_amount["coupon_amount"]
)

orders_amount
\`\`\`

이제 주문 금액 분석에 사용할 수 있는 데이터가 준비되었습니다.

---

### 10.9.8 처리 결과 요약

결측치 처리 후 남은 데이터 개수를 확인합니다.

\`\`\`python
original_count = len(orders)
analysis_count = len(orders_amount)

print("원본 행 수:", original_count)
print("주문 금액 분석 가능 행 수:", analysis_count)
print("제외된 행 수:", original_count - analysis_count)
\`\`\`

컬럼별 결측치도 다시 확인합니다.

\`\`\`python
orders_amount.isna().sum()
\`\`\`

마지막으로 분석에 필요한 컬럼만 선택합니다.

\`\`\`python
result_columns = [
    "order_id",
    "customer",
    "region",
    "category",
    "quantity",
    "unit_price",
    "coupon_amount",
    "total_price",
    "order_date"
]

orders_result = orders_amount[result_columns].reset_index(drop=True)

orders_result
\`\`\`

---

### 10.9.9 처리 기준 문서화

데이터 정리 후에는 처리 기준을 남겨야 합니다.

\`\`\`text
결측치 처리 기준
- 빈 문자열과 공백 문자열은 결측치로 변환했다.
- region 결측치는 "미상"으로 대체했다.
- category 결측치는 "미분류"로 대체했다.
- coupon_amount 결측치는 쿠폰 미사용으로 보고 0으로 대체했다.
- quantity 또는 unit_price가 없는 행은 주문 금액 계산에서 제외했다.
- order_date 결측치는 이번 주문 금액 분석에서는 유지했지만, 날짜 분석에서는 제외가 필요하다.
\`\`\`

이런 기록은 보고서 작성, 코드 리뷰, 협업에서 매우 중요합니다.

---

## 10.10 결측치 처리 시 자주 하는 실수

결측치 처리는 간단한 문법보다 판단이 더 중요합니다.  
이번 절에서는 초보자가 자주 하는 실수를 정리합니다.

---

### 10.10.1 모든 결측치를 0으로 채우는 실수

다음 코드는 문법적으로 가능하지만 위험할 수 있습니다.

\`\`\`python
df = df.fillna(0)
\`\`\`

모든 결측치를 0으로 채우면 문자열 컬럼에도 0이 들어가고, 알 수 없는 값이 실제 0처럼 처리될 수 있습니다.

특히 다음 컬럼은 0으로 채우기 전에 신중해야 합니다.

- 나이
- 가격
- 수량
- 재고
- 매출
- 점수
- 날짜

0은 “값이 없음”이 아니라 실제 숫자 값입니다.  
따라서 결측치를 0으로 대체하면 데이터의 의미가 바뀔 수 있습니다.

---

### 10.10.2 결측치를 무조건 삭제하는 실수

다음 코드도 위험할 수 있습니다.

\`\`\`python
df = df.dropna()
\`\`\`

이 코드는 결측치가 하나라도 있는 행을 모두 제거합니다.  
결측치가 많은 데이터에서는 대부분의 행이 사라질 수 있습니다.

무조건 삭제하기 전에 다음을 확인해야 합니다.

\`\`\`python
df.isna().sum()
df.isna().mean() * 100
\`\`\`

그리고 핵심 컬럼 기준으로 삭제하는 것이 더 안전합니다.

\`\`\`python
df = df.dropna(subset=["quantity", "unit_price"])
\`\`\`

---

### 10.10.3 빈 문자열을 결측치로 확인하지 않는 실수

다음 데이터에서 빈 문자열은 \`isna()\`로 잡히지 않습니다.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "", None]
})

df.isna()
\`\`\`

빈 문자열도 결측치처럼 처리해야 한다면 먼저 바꿔야 합니다.

\`\`\`python
df = df.replace("", pd.NA)
\`\`\`

공백 문자열도 고려해야 합니다.

\`\`\`python
df = df.replace(["", " "], pd.NA)
\`\`\`

실무에서는 공백이 여러 개 들어간 값도 있을 수 있으므로 문자열 정리와 함께 처리하는 것이 좋습니다.

---

### 10.10.4 평균으로 채우면 항상 좋다고 생각하는 실수

평균 대체는 간단하지만 항상 좋은 방법은 아닙니다.

특히 데이터가 한쪽으로 치우쳐 있거나 이상값이 있으면 평균이 대표값으로 적절하지 않을 수 있습니다.

예를 들어 소득 데이터, 주문 금액 데이터, 상품 가격 데이터는 일부 큰 값 때문에 평균이 높아질 수 있습니다.  
이런 경우 중앙값이 더 적절할 수 있습니다.

\`\`\`python
df["price"] = df["price"].fillna(df["price"].median())
\`\`\`

---

### 10.10.5 결측치 처리 기준을 기록하지 않는 실수

결측치를 처리한 뒤 기록을 남기지 않으면 나중에 분석 결과를 설명하기 어렵습니다.

다음 내용을 최소한 기록하는 것이 좋습니다.

\`\`\`text
- 어떤 컬럼에 결측치가 있었는가?
- 결측치가 얼마나 있었는가?
- 어떤 기준으로 삭제했는가?
- 어떤 값으로 대체했는가?
- 왜 그렇게 처리했는가?
\`\`\`

데이터 분석은 결과뿐 아니라 과정도 중요합니다.

---

## 10.11 핵심 정리

이번 장에서는 pandas에서 결측치를 확인하고 처리하는 방법을 배웠습니다.

결측치는 데이터에서 값이 비어 있거나 존재하지 않는 상태입니다.  
pandas에서는 \`isna()\`와 \`notna()\`로 결측치를 확인할 수 있습니다.

컬럼별 결측치 개수는 다음과 같이 확인합니다.

\`\`\`python
df.isna().sum()
\`\`\`

컬럼별 결측치 비율은 다음과 같이 확인합니다.

\`\`\`python
df.isna().mean() * 100
\`\`\`

결측치가 있는 행을 제거하려면 \`dropna()\`를 사용합니다.

\`\`\`python
df.dropna()
df.dropna(subset=["quantity", "unit_price"])
\`\`\`

결측치를 다른 값으로 채우려면 \`fillna()\`를 사용합니다.

\`\`\`python
df["region"] = df["region"].fillna("미상")
df["coupon_amount"] = df["coupon_amount"].fillna(0)
\`\`\`

시계열 데이터처럼 순서가 의미 있는 데이터에서는 \`ffill()\`이나 \`bfill()\`을 사용할 수 있습니다.

\`\`\`python
df["value"] = df["value"].ffill()
\`\`\`

결측치 처리에서 가장 중요한 것은 문법보다 판단입니다.  
결측치를 삭제할지, 대체할지, 별도 범주로 둘지, 그대로 둘지는 데이터의 의미와 분석 목적에 따라 결정해야 합니다.

---

## 10.12 연습문제

### 문제 1. 개념 확인

결측치에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 항상 0을 의미한다.  
B. 값이 비어 있거나 존재하지 않는 상태를 말한다.  
C. 문자열 데이터에서만 발생한다.  
D. 정렬을 하면 자동으로 사라진다.

---

### 문제 2. 코드 작성

다음 DataFrame에서 컬럼별 결측치 개수를 확인하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", None, "철수"],
    "age": [20, 30, None]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 DataFrame에서 빈 문자열 \`""\`을 결측치로 변환하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", "", "철수"],
    "region": ["서울", "부산", ""]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 데이터에서 \`price\` 컬럼이 결측치인 행을 제거하는 코드를 작성하세요.

\`\`\`python
products = pd.DataFrame({
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, None, 200000]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 고객 데이터에서 \`region\` 결측치를 \`"미상"\`으로 채우는 코드를 작성하세요.

\`\`\`python
customers = pd.DataFrame({
    "name": ["민수", "지영", "철수"],
    "region": ["서울", None, "부산"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 주문 데이터에서 \`coupon_amount\` 결측치를 0으로 채우세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "coupon_amount": [1000, None, 0]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 \`score\` 결측치를 평균값으로 채우세요.

\`\`\`python
scores = pd.DataFrame({
    "name": ["A", "B", "C", "D"],
    "score": [80, None, 90, 70]
})
\`\`\`

---

### 문제 8. 개념 확인

\`dropna(subset=["quantity", "unit_price"])\`의 의미를 설명하세요.

---

### 문제 9. 코드 작성

다음 데이터에서 앞의 값으로 결측치를 채우는 코드를 작성하세요.

\`\`\`python
stock = pd.DataFrame({
    "date": pd.date_range("2026-01-01", periods=5),
    "stock_count": [100, None, None, 90, None]
})
\`\`\`

---

### 문제 10. 실무형 문제

다음 주문 데이터에서 결측치를 처리하고 \`total_price\`를 계산하세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- 빈 문자열은 결측치로 변환한다.
- region 결측치는 "미상"으로 채운다.
- coupon_amount 결측치는 0으로 채운다.
- quantity 또는 unit_price가 결측치인 행은 주문 금액 계산에서 제외한다.
- total_price = quantity * unit_price - coupon_amount
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "region": ["서울", "", None, "부산"],
    "quantity": [2, None, 1, 3],
    "unit_price": [10000, 20000, None, 15000],
    "coupon_amount": [1000, None, 0, None]
})
\`\`\`

---

## 10.13 정답 및 해설

### 문제 1 정답

정답: B

결측치는 값이 비어 있거나 존재하지 않는 상태를 말합니다.  
결측치가 항상 0을 의미하는 것은 아닙니다.

---

### 문제 2 정답

\`\`\`python
df.isna().sum()
\`\`\`

\`isna()\`로 결측치 여부를 확인하고, \`sum()\`으로 컬럼별 결측치 개수를 계산합니다.

---

### 문제 3 정답

\`\`\`python
df = df.replace("", pd.NA)
\`\`\`

빈 문자열은 pandas에서 자동으로 결측치로 인식되지 않습니다.  
따라서 \`replace()\`를 사용해 명시적으로 \`pd.NA\`로 변환합니다.

---

### 문제 4 정답

\`\`\`python
products_clean = products.dropna(subset=["price"])
\`\`\`

\`subset=["price"]\`를 지정했으므로 \`price\` 컬럼이 결측치인 행만 제거합니다.

---

### 문제 5 정답

\`\`\`python
customers["region"] = customers["region"].fillna("미상")
\`\`\`

범주형 데이터의 결측치는 \`"미상"\`처럼 별도 범주로 채울 수 있습니다.

---

### 문제 6 정답

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)
\`\`\`

쿠폰 금액이 비어 있는 것을 쿠폰 미사용으로 해석할 수 있다면 0으로 채울 수 있습니다.  
단, 실제 데이터에서는 이 기준이 맞는지 확인해야 합니다.

---

### 문제 7 정답

\`\`\`python
mean_score = scores["score"].mean()
scores["score"] = scores["score"].fillna(mean_score)
\`\`\`

평균값을 구한 뒤 \`fillna()\`로 결측치를 채웁니다.

---

### 문제 8 정답

\`\`\`python
dropna(subset=["quantity", "unit_price"])
\`\`\`

이 코드는 \`quantity\` 또는 \`unit_price\` 컬럼에 결측치가 있는 행을 제거합니다.  
다른 컬럼에 결측치가 있더라도 이 두 컬럼이 채워져 있으면 행은 유지됩니다.

---

### 문제 9 정답

\`\`\`python
stock["stock_count"] = stock["stock_count"].ffill()
\`\`\`

\`ffill()\`은 앞에 있는 유효한 값으로 결측치를 채웁니다.

예상 결과는 다음과 같습니다.

\`\`\`text
100
100
100
90
90
\`\`\`

---

### 문제 10 정답

\`\`\`python
orders_clean = orders.replace("", pd.NA)

orders_clean["region"] = orders_clean["region"].fillna("미상")
orders_clean["coupon_amount"] = orders_clean["coupon_amount"].fillna(0)

orders_amount = orders_clean.dropna(subset=["quantity", "unit_price"]).copy()

orders_amount["total_price"] = (
    orders_amount["quantity"] * orders_amount["unit_price"]
    - orders_amount["coupon_amount"]
)

orders_amount
\`\`\`

처리 순서는 다음과 같습니다.

1. 빈 문자열을 결측치로 바꿉니다.
2. \`region\` 결측치를 \`"미상"\`으로 채웁니다.
3. \`coupon_amount\` 결측치를 0으로 채웁니다.
4. \`quantity\` 또는 \`unit_price\`가 없는 행은 주문 금액 계산에서 제외합니다.
5. \`total_price\`를 계산합니다.

이 문제에서 중요한 점은 모든 컬럼을 같은 방식으로 처리하지 않는다는 것입니다.  
지역, 쿠폰 금액, 수량, 단가는 각각 의미가 다르므로 처리 방식도 달라야 합니다.

---

## 10.14 다음 장 예고

이번 장에서는 결측치를 확인하고, 제거하고, 대체하는 방법을 배웠습니다.

다음 장에서는 **중복값과 이상값 처리**를 배웁니다.

결측치가 “비어 있는 값”의 문제라면, 중복값은 “같은 데이터가 여러 번 들어간 문제”이고, 이상값은 “일반적인 범위를 벗어난 값”의 문제입니다.

다음 장에서는 다음 내용을 다룹니다.

- 중복값이란 무엇인가
- 중복값 확인하기
- 중복값 제거하기
- 이상값이란 무엇인가
- 최솟값과 최댓값으로 이상값 찾기
- 박스플롯으로 이상값 확인하기
- 이상값을 제거할지, 대체할지, 유지할지 판단하기

데이터 분석에서는 결측치, 중복값, 이상값을 함께 확인해야 합니다.  
이 세 가지를 제대로 점검해야 신뢰할 수 있는 분석 결과를 만들 수 있습니다.

---

## 참고 문서

- pandas 공식 문서: Working with missing data
- pandas 공식 문서: \`DataFrame.isna\`
- pandas 공식 문서: \`DataFrame.notna\`
- pandas 공식 문서: \`DataFrame.dropna\`
- pandas 공식 문서: \`DataFrame.fillna\`
- pandas 공식 문서: \`DataFrame.ffill\`
- pandas 공식 문서: \`DataFrame.bfill\`
`;export{e as default};