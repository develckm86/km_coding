var e=`# 10장. 고객별 Feature Table 만들기

## 10.3 고객 Feature 설계

고객별 Feature Table을 만들기 전에 어떤 변수를 만들지 설계해야 합니다.

---

### 10.3.1 고객 기본 정보 Feature

고객의 기본 속성입니다.

\`\`\`text
customer_id
customer_name
region
grade
signup_date
\`\`\`

이 변수들은 고객 마스터나 결합된 주문 데이터에서 가져옵니다.

고객 기본 정보는 고객 세그먼트별 분석에 사용됩니다.

\`\`\`text
지역별 고객 가치 비교
고객 등급별 구매 패턴
가입 시기별 리텐션
\`\`\`

---

### 10.3.2 구매 금액 Feature

고객의 구매 규모를 나타냅니다.

\`\`\`text
total_purchase
avg_order_amount
median_order_amount
max_order_amount
min_order_amount
\`\`\`

이 변수들은 고객 가치 분석에서 중요합니다.

예를 들어 총구매액이 높은 고객은 매출 기여도가 큰 고객입니다.  
평균 주문 금액이 높은 고객은 객단가가 높은 고객입니다.

---

### 10.3.3 구매 빈도 Feature

고객이 얼마나 자주 구매했는지 나타냅니다.

\`\`\`text
order_count
purchase_days
avg_orders_per_month
is_repeat_customer
\`\`\`

구매 횟수가 높고 재구매 여부가 참인 고객은 반복 구매 고객으로 볼 수 있습니다.

---

### 10.3.4 날짜 기반 Feature

고객의 구매 시점과 최근성을 나타냅니다.

\`\`\`text
first_order_date
last_order_date
days_since_first_order
days_since_last_order
active_period_days
signup_to_first_order_days
\`\`\`

이 변수들은 RFM 분석과 리텐션 분석에서 매우 중요합니다.

특히 \`days_since_last_order\`는 Recency 변수의 기초가 됩니다.

---

### 10.3.5 카테고리 기반 Feature

고객이 어떤 상품군을 구매했는지 나타냅니다.

\`\`\`text
category_count
main_category
electronics_sales
book_sales
lifestyle_sales
electronics_ratio
\`\`\`

이 변수는 고객 취향 분석과 추천 대상 분류에 활용할 수 있습니다.

예를 들어 전자기기 구매 비중이 높은 고객에게 전자기기 프로모션을 보낼 수 있습니다.

---

### 10.3.6 쿠폰 사용 Feature

고객의 할인 반응을 나타냅니다.

\`\`\`text
coupon_order_count
coupon_usage_rate
total_coupon_amount
avg_coupon_amount
coupon_user
\`\`\`

쿠폰 사용률이 높은 고객은 가격 민감 고객일 수 있습니다.  
다만 쿠폰 사용이 구매를 유도했다고 단정하려면 실험 분석이 필요합니다.

---

### 10.3.7 고객 가치 Segment Feature

고객을 간단히 등급화할 수 있습니다.

\`\`\`text
value_segment
is_high_value_customer
purchase_ratio_to_avg
\`\`\`

예를 들어 총구매액 기준으로 고객을 다음처럼 나눌 수 있습니다.

\`\`\`text
High Value
Middle Value
Low Value
\`\`\`

이것은 RFM 분석의 기초 단계로 볼 수 있습니다.  
본격적인 RFM 분석은 14장에서 다룹니다.

---
`;export{e as default};