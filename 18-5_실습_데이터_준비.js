var e=`# 18장. SQL 기반 분석 실습

## 18.5 실습 데이터 준비

이번 장에서는 주문, 고객, 상품 데이터를 사용합니다. 가능하면 4장에서 만든 데이터마트를 사용합니다. 파일이 없으면 SQL 실습용 샘플 데이터를 생성합니다.

### 18.5.1 주문 데이터 준비

\`\`\`python
orders_mart_path = DATA_PROCESSED / "chapter_04_orders_mart.csv"

if orders_mart_path.exists():
    orders = pd.read_csv(orders_mart_path)
else:
    orders = pd.DataFrame({
        "order_id": [
            1001, 1002, 1003, 1004, 1005,
            1006, 1007, 1008, 1009, 1010,
            1011, 1012, 1013, 1014, 1015,
            1016, 1017, 1018, 1019, 1020
        ],
        "order_date": [
            "2026-01-03", "2026-01-05", "2026-01-10",
            "2026-02-02", "2026-02-14", "2026-03-01",
            "2026-03-15", "2026-03-20", "2026-03-22",
            "2026-04-01", "2026-04-05", "2026-04-08",
            "2026-04-15", "2026-04-20", "2026-04-25",
            "2026-05-01", "2026-05-05", "2026-05-10",
            "2026-06-01", "2026-06-10"
        ],
        "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5, 9, 10, 2, 1, 5, 8, 1, 2],
        "product_id": [
            "P001", "P002", "P003", "P001", "P004",
            "P003", "P001", "P002", "P003", "P001",
            "P002", "P003", "P005", "P002", "P001",
            "P004", "P005", "P001", "P003", "P002"
        ],
        "category": [
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "전자기기",
            "도서", "전자기기", "전자기기", "생활용품", "도서"
        ],
        "region": [
            "서울", "부산", "서울", "서울", "대전",
            "부산", "부산", "서울", "대전", "서울",
            "서울", "부산", "대전", "서울", "부산",
            "서울", "부산", "서울", "서울", "부산"
        ],
        "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2, 1, 2, 1, 2, 1, 1, 3, 2],
        "unit_price": [
            300000, 15000, 25000, 300000, 17500,
            25000, 300000, 15000, 25000, 300000,
            15000, 25000, 35000, 15000, 300000,
            17500, 35000, 300000, 25000, 15000
        ],
        "coupon_amount": [
            0, 0, 5000, 10000, 0,
            0, 0, 0, 0, 20000,
            0, 0, 15000, 0, 10000,
            0, 0, 20000, 0, 0
        ],
        "net_amount": [
            300000, 45000, 45000, 290000, 35000,
            100000, 300000, 30000, 125000, 280000,
            45000, 50000, 20000, 30000, 290000,
            35000, 35000, 280000, 75000, 30000
        ]
    })

orders.head()
\`\`\`

### 18.5.2 날짜와 연월 컬럼 정리

\`\`\`python
orders = orders.copy()

if "order_date_dt" in orders.columns:
    orders["order_date"] = pd.to_datetime(orders["order_date_dt"], errors="coerce")
else:
    orders["order_date"] = pd.to_datetime(orders["order_date"], errors="coerce")

orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
\`\`\`

### 18.5.3 고객 데이터 준비

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "customer_name": [
        "김민수", "이지영", "박철수", "최영희", "정수진",
        "강현우", "오도윤", "한서연", "윤하준", "문유나"
    ],
    "region": ["서울", "부산", "서울", "대전", "부산", "서울", "대전", "서울", "대전", "서울"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "signup_date": [
        "2025-12-01", "2026-01-01", "2026-01-08", "2026-02-01", "2026-02-15",
        "2026-03-01", "2026-03-10", "2026-03-20", "2026-04-01", "2026-04-05"
    ]
})

customers["signup_date"] = pd.to_datetime(customers["signup_date"])
customers.head()
\`\`\`

### 18.5.4 상품 데이터 준비

\`\`\`python
products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004", "P005"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초", "무선 마우스"],
    "category": ["전자기기", "도서", "생활용품", "도서", "전자기기"],
    "supplier": ["A사", "B사", "C사", "B사", "A사"],
    "default_unit_price": [300000, 15000, 25000, 17500, 35000]
})

products.head()
\`\`\`

### 18.5.5 SQL 실습용 CSV 저장

\`\`\`python
orders.to_csv(DATA_PROCESSED / "chapter_18_orders_sql_base.csv", index=False)
customers.to_csv(DATA_PROCESSED / "chapter_18_customers_sql_base.csv", index=False)
products.to_csv(DATA_PROCESSED / "chapter_18_products_sql_base.csv", index=False)
\`\`\`

---
`;export{e as default};