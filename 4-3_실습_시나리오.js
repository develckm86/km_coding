var e=`# 4장. 분석용 데이터마트 만들기

## 4.3 실습 시나리오

여러분은 쇼핑몰 운영팀의 분석가입니다.

운영팀은 다음 분석을 요청했습니다.

\`\`\`text
월별 매출 추이를 보고 싶습니다.
카테고리별 매출도 보고 싶습니다.
VIP 고객과 일반 고객의 구매 차이를 알고 싶습니다.
지역별 매출 차이도 확인하고 싶습니다.
쿠폰 사용 주문이 매출에 어떤 영향을 주는지도 궁금합니다.
\`\`\`

이 분석을 하기 위해서는 주문 데이터만으로는 부족합니다.

주문 데이터에는 다음 정보가 있습니다.

\`\`\`text
order_id
order_date
customer_id
product_id
quantity
coupon_amount
\`\`\`

고객 분석을 하려면 고객 데이터가 필요합니다.

\`\`\`text
customer_id
customer_name
region
grade
signup_date
visit_count
\`\`\`

상품 분석을 하려면 상품 데이터가 필요합니다.

\`\`\`text
product_id
product_name
category
unit_price
supplier
\`\`\`

따라서 우리는 주문 데이터에 고객 데이터와 상품 데이터를 결합해 분석용 데이터마트를 만들 것입니다.

---
`;export{e as default};