var e=`# 13장. 회귀분석 실습

## 13.15 실무 미니 프로젝트: 고객 구매액 회귀분석

이번 장에서 배운 내용을 하나의 실무 흐름으로 정리합니다.

---

### 13.15.1 프로젝트 목표

\`\`\`text
고객 Feature Table을 사용해 총구매액과 관련 있는 변수를 회귀분석으로 확인한다.
방문 횟수, 주문 횟수, 쿠폰 사용률, 최근 구매 후 경과일, 카테고리 수, 고객 등급, 주 구매 카테고리를 설명 변수로 사용한다.
\`\`\`

---

### 13.15.2 Step 1. 데이터 준비

\`\`\`python
regression_df = customer_features.copy()

regression_df["customer_grade"] = regression_df["customer_grade"].fillna("미상")
regression_df["main_category"] = regression_df["main_category"].fillna("미상")

regression_df = regression_df.dropna(subset=[
    "total_purchase",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count"
])
\`\`\`

---

### 13.15.3 Step 2. 산점도와 상관관계 확인

\`\`\`python
plt.scatter(regression_df["visit_count"], regression_df["total_purchase"])
plt.xlabel("방문 횟수")
plt.ylabel("총구매액")
plt.title("방문 횟수와 총구매액")
plt.show()

regression_df[[
    "total_purchase",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count"
]].corr()
\`\`\`

---

### 13.15.4 Step 3. 단순 회귀

\`\`\`python
simple_model = smf.ols(
    "total_purchase ~ visit_count",
    data=regression_df
).fit()
\`\`\`

---

### 13.15.5 Step 4. 다중 회귀

\`\`\`python
multiple_model = smf.ols(
    "total_purchase ~ visit_count + order_count + coupon_usage_rate + days_since_last_order + category_count",
    data=regression_df
).fit()
\`\`\`

---

### 13.15.6 Step 5. 범주형 변수 포함

\`\`\`python
categorical_model = smf.ols(
    "total_purchase ~ visit_count + order_count + coupon_usage_rate + days_since_last_order + category_count + C(customer_grade) + C(main_category)",
    data=regression_df
).fit()
\`\`\`

---

### 13.15.7 Step 6. 예측값과 잔차 확인

\`\`\`python
regression_df["predicted_total_purchase"] = categorical_model.predict(regression_df)
regression_df["residual"] = regression_df["total_purchase"] - regression_df["predicted_total_purchase"]
\`\`\`

---

### 13.15.8 Step 7. 보고서 해석

\`\`\`text
방문 횟수와 주문 횟수는 총구매액과 양의 관계를 보일 수 있다.
최근 구매 후 경과일은 총구매액과 음의 관계를 보일 수 있다.
VIP 고객 또는 전자기기 중심 고객은 다른 조건이 같을 때 총구매액이 높게 나타날 수 있다.
다만 회귀분석은 관계를 보여주는 도구이며, 인과관계를 증명하지 않는다.
\`\`\`

---
`;export{e as default};