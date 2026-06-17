var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-8 -->

# 10.8 실무 처리 패턴

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
`;export{e as default};