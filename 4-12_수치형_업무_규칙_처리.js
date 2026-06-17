var e=`# 4장. 분석용 데이터마트 만들기

## 4.12 수치형 업무 규칙 처리

수치형 컬럼에는 업무적으로 가능한 범위가 있습니다.

이번 실습에서는 다음 규칙을 사용합니다.

\`\`\`text
quantity는 0보다 커야 한다.
coupon_amount는 0 이상이어야 한다.
unit_price는 0보다 커야 한다.
\`\`\`

---

### 4.12.1 주문 수량 오류 표시

\`\`\`python
orders["invalid_quantity"] = orders["quantity"] <= 0
\`\`\`

확인합니다.

\`\`\`python
orders[orders["invalid_quantity"]]
\`\`\`

---

### 4.12.2 쿠폰 금액 오류 표시

\`\`\`python
orders["invalid_coupon_amount"] = orders["coupon_amount"] < 0
\`\`\`

확인합니다.

\`\`\`python
orders[orders["invalid_coupon_amount"]]
\`\`\`

---

### 4.12.3 상품 단가 오류 표시

\`\`\`python
products["invalid_unit_price"] = products["unit_price"] <= 0

products[products["invalid_unit_price"]]
\`\`\`

이번 실습 상품 데이터에는 단가 오류가 없을 수 있습니다.

---

### 4.12.4 분석 제외 플래그 만들기

주문 데이터에서 수량 오류나 쿠폰 오류가 있는 행은 매출 분석에서 제외합니다.

\`\`\`python
orders["exclude_by_order_rule"] = (
    orders["invalid_quantity"] |
    orders["invalid_coupon_amount"]
)
\`\`\`

확인합니다.

\`\`\`python
orders[orders["exclude_by_order_rule"]]
\`\`\`

---
`;export{e as default};