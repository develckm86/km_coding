var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-10 -->

# 20.10 5단계: 파생 변수 생성

분석에 필요한 컬럼을 추가합니다.

---

### 20.10.1 주문 금액 계산

주문 데이터에는 수량과 상품 단가가 있습니다.  
쿠폰 금액을 반영한 최종 주문 금액을 계산합니다.

\`\`\`python
orders_full["gross_amount"] = orders_full["quantity"] * orders_full["unit_price"]
orders_full["net_amount"] = orders_full["gross_amount"] - orders_full["coupon_amount"]

orders_full[["quantity", "unit_price", "coupon_amount", "gross_amount", "net_amount"]]
\`\`\`

\`unit_price\`가 결측치인 주문은 \`gross_amount\`와 \`net_amount\`도 결측치가 됩니다.

---

### 20.10.2 주문 금액 계산 가능 데이터 분리

매출 분석에는 상품 단가가 있는 주문만 사용합니다.

\`\`\`python
orders_analysis = orders_full.dropna(subset=["net_amount"]).copy()

orders_analysis
\`\`\`

분석에서 제외된 주문을 확인합니다.

\`\`\`python
excluded_orders = orders_full[orders_full["net_amount"].isna()]

excluded_orders
\`\`\`

제외 기준은 보고서에 기록해야 합니다.

\`\`\`text
상품 정보가 없어 단가를 확인할 수 없는 주문은 매출 분석에서 제외했다.
\`\`\`

---

### 20.10.3 고객 정보 결측치 처리

고객 정보가 없는 주문을 분석에서 무조건 제외할 필요는 없습니다.  
지역이나 등급별 분석에서는 제외되거나 \`미상\`으로 처리할 수 있습니다.

이번 실습에서는 고객 정보가 없는 경우 다음과 같이 처리합니다.

\`\`\`python
orders_analysis["customer_name"] = orders_analysis["customer_name"].fillna("고객정보없음")
orders_analysis["region_clean"] = orders_analysis["region_clean"].fillna("미상")
orders_analysis["grade"] = orders_analysis["grade"].fillna("미상")
\`\`\`

이렇게 하면 지역별, 등급별 분석에서 정보가 없는 주문도 별도 그룹으로 확인할 수 있습니다.

---

### 20.10.4 가격대 파생 변수 만들기

주문 금액 기준으로 가격대를 나눠봅니다.

\`\`\`python
orders_analysis["price_level"] = "저가"
orders_analysis.loc[orders_analysis["net_amount"] >= 50000, "price_level"] = "중가"
orders_analysis.loc[orders_analysis["net_amount"] >= 200000, "price_level"] = "고가"

orders_analysis[["net_amount", "price_level"]]
\`\`\`

기준은 분석 목적에 따라 달라질 수 있습니다.

이번 실습에서는 다음 기준을 사용합니다.

\`\`\`text
저가: 50,000원 미만
중가: 50,000원 이상 200,000원 미만
고가: 200,000원 이상
\`\`\`

---
`;export{e as default};