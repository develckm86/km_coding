var e=`# 10장. 고객별 Feature Table 만들기

## 10.10 고객별 쿠폰 사용 Feature 만들기

쿠폰 사용 패턴은 고객의 가격 민감도를 이해하는 데 도움이 될 수 있습니다.

---

### 10.10.1 고객별 쿠폰 사용 요약

\`\`\`python
customer_coupon_features = (
    customer_order_base
    .groupby("customer_id")
    .agg(
        coupon_order_count=("used_coupon", "sum"),
        total_order_count=("order_id", "count"),
        total_coupon_amount=("coupon_amount", "sum"),
        avg_coupon_amount=("coupon_amount", "mean")
    )
    .reset_index()
)

customer_coupon_features.head()
\`\`\`

\`used_coupon\`은 boolean이므로 \`sum()\`을 하면 True의 개수가 계산됩니다.

---

### 10.10.2 쿠폰 사용률 계산

\`\`\`python
customer_coupon_features["coupon_usage_rate"] = (
    customer_coupon_features["coupon_order_count"] /
    customer_coupon_features["total_order_count"] * 100
).round(1)
\`\`\`

---

### 10.10.3 쿠폰 사용자 여부

\`\`\`python
customer_coupon_features["is_coupon_user"] = (
    customer_coupon_features["coupon_order_count"] > 0
)
\`\`\`

---

### 10.10.4 평균 쿠폰 금액 반올림

\`\`\`python
customer_coupon_features["avg_coupon_amount"] = (
    customer_coupon_features["avg_coupon_amount"].round(0)
)
\`\`\`

---

### 10.10.5 저장하기

\`\`\`python
customer_coupon_features.to_csv(
    OUTPUT_TABLES / "chapter_10_customer_coupon_features.csv",
    index=False
)
\`\`\`

---

### 10.10.6 해석 예시

\`\`\`text
coupon_usage_rate는 고객이 주문 중 몇 %에서 쿠폰을 사용했는지 보여준다.
쿠폰 사용률이 높은 고객은 할인에 민감한 고객일 가능성이 있다.
다만 쿠폰을 사용했기 때문에 구매했는지, 원래 구매할 고객이 쿠폰을 사용했는지는 별도 실험 분석이 필요하다.
\`\`\`

---
`;export{e as default};