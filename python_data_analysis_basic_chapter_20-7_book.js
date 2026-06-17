var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-7 -->

# 20.7 2단계: 데이터 품질 점검

데이터 구조를 확인한 뒤에는 품질을 점검합니다.

---

### 20.7.1 결측치 확인

\`\`\`python
orders_raw.isna().sum()
customers_raw.isna().sum()
products_raw.isna().sum()
\`\`\`

주문 데이터의 \`coupon_amount\`에는 결측치가 있습니다.

쿠폰 금액 결측치를 어떻게 처리할지 기준을 세워야 합니다.

이번 실습에서는 다음 기준을 사용합니다.

\`\`\`text
coupon_amount가 비어 있으면 쿠폰을 사용하지 않은 것으로 보고 0으로 대체한다.
\`\`\`

---

### 20.7.2 중복값 확인

주문 ID 기준 중복을 확인합니다.

\`\`\`python
orders_raw.duplicated(subset=["order_id"]).sum()
\`\`\`

중복된 주문을 확인합니다.

\`\`\`python
orders_raw[orders_raw.duplicated(subset=["order_id"], keep=False)]
\`\`\`

이번 실습에서는 \`order_id\`가 같은 행이 완전히 같은 중복이라고 가정하고 첫 번째 행만 남기겠습니다.

---

### 20.7.3 key 유일성 확인

고객 데이터의 \`customer_id\`가 유일한지 확인합니다.

\`\`\`python
customers_raw["customer_id"].is_unique
\`\`\`

상품 데이터의 \`product_id\`가 유일한지 확인합니다.

\`\`\`python
products_raw["product_id"].is_unique
\`\`\`

고객 정보와 상품 정보를 주문 데이터에 붙일 때, 고객 데이터와 상품 데이터는 기준표 역할을 합니다.  
따라서 key가 유일해야 합니다.

---

### 20.7.4 날짜 변환 가능 여부 확인

주문일을 날짜형으로 변환합니다.

\`\`\`python
pd.to_datetime(orders_raw["order_date"], errors="coerce")
\`\`\`

변환할 수 없는 값은 \`NaT\`가 됩니다.

이후 분석에서 날짜가 필요한 경우 \`NaT\`는 제외해야 합니다.

---
`;export{e as default};