var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-20 -->

# 15.20 실무 미니 프로젝트: 분석용 주문 데이터 만들기

이번 장에서 배운 내용을 하나로 묶어 분석용 주문 데이터를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 월별 주문 데이터를 위아래로 결합한다.
2. 고객 데이터와 상품 데이터를 준비한다.
3. 고객 ID, 상품 ID 중복을 확인한다.
4. 주문 데이터에 고객 정보를 붙인다.
5. 주문 데이터에 상품 정보를 붙인다.
6. 결합 전후 행 수와 매출 합계를 확인한다.
7. 결합 후 결측치를 확인한다.
8. 지역별, 카테고리별 매출 요약표를 만든다.
\`\`\`

---

### 15.20.1 월별 주문 데이터 준비

\`\`\`python
orders_jan = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10"],
    "customer_id": [1, 2, 3],
    "product_id": ["P001", "P002", "P003"],
    "quantity": [1, 3, 2],
    "total_price": [300000, 45000, 50000]
})

orders_feb = pd.DataFrame({
    "order_id": [1004, 1005, 1006],
    "order_date": ["2026-02-02", "2026-02-14", "2026-02-20"],
    "customer_id": [1, 4, 2],
    "product_id": ["P001", "P004", "P003"],
    "quantity": [1, 2, 4],
    "total_price": [220000, 35000, 60000]
})

orders_mar = pd.DataFrame({
    "order_id": [1007, 1008, 1009],
    "order_date": ["2026-03-01", "2026-03-15", "2026-03-20"],
    "customer_id": [5, 2, 6],
    "product_id": ["P002", "P003", "P999"],
    "quantity": [2, 1, 1],
    "total_price": [30000, 25000, 100000]
})
\`\`\`

3월 데이터에는 \`product_id\`가 \`P999\`인 주문이 있습니다.  
상품 데이터에 이 상품이 없으면 결합 후 결측치가 생길 것입니다.

---

### 15.20.2 월별 데이터 결합

\`\`\`python
orders_jan["source_month"] = "2026-01"
orders_feb["source_month"] = "2026-02"
orders_mar["source_month"] = "2026-03"

orders_all = pd.concat(
    [orders_jan, orders_feb, orders_mar],
    ignore_index=True
)

orders_all["order_date"] = pd.to_datetime(orders_all["order_date"])

orders_all
\`\`\`

---

### 15.20.3 고객 데이터와 상품 데이터 준비

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "customer_name": ["민수", "지영", "철수", "영희", "수진"],
    "region": ["서울", "부산", "서울", "대전", "부산"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP"]
})

products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 책", "머그컵", "SQL 책"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

---

### 15.20.4 key 중복 확인

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
orders_all.duplicated(subset=["order_id"]).sum()
\`\`\`

고객 ID와 상품 ID는 기준표에서 유일해야 합니다.  
주문 ID도 주문 데이터에서 유일한 것이 일반적입니다.

---

### 15.20.5 결합 전 상태 저장

결합 후 검증을 위해 결합 전 행 수와 매출 합계를 저장합니다.

\`\`\`python
before_rows = len(orders_all)
before_sales = orders_all["total_price"].sum()

before_rows, before_sales
\`\`\`

---

### 15.20.6 고객 정보 결합

\`\`\`python
orders_customer = orders_all.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer["_merge"].value_counts()
\`\`\`

매칭되지 않은 고객을 확인합니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

검증 후 \`_merge\`를 제거합니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

---

### 15.20.7 상품 정보 결합

\`\`\`python
orders_full = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_full["_merge"].value_counts()
\`\`\`

상품 정보가 없는 주문을 확인합니다.

\`\`\`python
orders_full[orders_full["_merge"] == "left_only"]
\`\`\`

\`P999\`가 상품 데이터에 없으므로 해당 주문은 상품명과 카테고리가 결측치가 됩니다.

검증 후 \`_merge\`를 제거합니다.

\`\`\`python
orders_full = orders_full.drop(columns=["_merge"])
\`\`\`

---

### 15.20.8 결합 후 검증

\`\`\`python
after_rows = len(orders_full)
after_sales = orders_full["total_price"].sum()

before_rows, after_rows, before_sales, after_sales
\`\`\`

\`left join\`을 사용했으므로 행 수와 매출 합계는 유지되어야 합니다.

결측치를 확인합니다.

\`\`\`python
orders_full.isna().sum()
\`\`\`

상품 정보가 없는 행을 확인합니다.

\`\`\`python
orders_full[orders_full["product_name"].isna()]
\`\`\`

고객 정보가 없는 행도 확인합니다.

\`\`\`python
orders_full[orders_full["customer_name"].isna()]
\`\`\`

---

### 15.20.9 분석용 컬럼 정리

\`\`\`python
analysis_columns = [
    "order_id",
    "order_date",
    "source_month",
    "customer_id",
    "customer_name",
    "region",
    "grade",
    "product_id",
    "product_name",
    "category",
    "quantity",
    "unit_price",
    "total_price"
]

orders_analysis = orders_full[analysis_columns].copy()

orders_analysis
\`\`\`

---

### 15.20.10 요약 분석

지역별 매출입니다.

\`\`\`python
region_sales = (
    orders_analysis
    .groupby("region", dropna=False)["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

region_sales
\`\`\`

카테고리별 매출입니다.

\`\`\`python
category_sales = (
    orders_analysis
    .groupby("category", dropna=False)["total_price"]
    .sum()
    .reset_index(name="total_sales")
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

\`dropna=False\`를 사용하면 결측치 그룹도 함께 표시할 수 있습니다.  
상품 정보가 없는 주문의 카테고리가 결측치로 남아 있다면 별도 그룹으로 확인할 수 있습니다.

---

### 15.20.11 처리 기준 문서화

분석 노트북이나 보고서에는 다음과 같이 결합 기준을 남길 수 있습니다.

\`\`\`text
데이터 결합 기준
- 1월, 2월, 3월 주문 데이터는 같은 컬럼 구조이므로 concat으로 행 방향 결합했다.
- 결합 시 ignore_index=True로 인덱스를 새로 부여했다.
- 주문 데이터는 customer_id 기준으로 고객 데이터와 left join했다.
- 주문 데이터는 product_id 기준으로 상품 데이터와 left join했다.
- customers.customer_id와 products.product_id는 결합 전 유일성을 확인했다.
- merge에는 validate="many_to_one"을 사용해 기준표 중복을 검증했다.
- 결합 전후 주문 행 수와 total_price 합계가 유지되는지 확인했다.
- product_id P999는 상품 데이터에 없어 product_name과 category가 결측치로 남았다.
\`\`\`

이런 기록은 데이터 분석 결과를 신뢰할 수 있게 만드는 중요한 근거가 됩니다.

---
`;export{e as default};