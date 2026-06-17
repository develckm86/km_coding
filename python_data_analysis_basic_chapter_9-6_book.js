var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-6 -->

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
`;export{e as default};