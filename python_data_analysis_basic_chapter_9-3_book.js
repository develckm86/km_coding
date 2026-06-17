var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-3 -->

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
`;export{e as default};