var e=`# 10장. 고객별 Feature Table 만들기

## 10.5 실습 데이터 준비

이번 장에서는 9장에서 만든 검증된 결합 데이터를 우선 사용합니다.

파일이 없다면 4장의 데이터마트나 수업용 샘플 데이터를 사용합니다.

---

### 10.5.1 결합 데이터 불러오기

\`\`\`python
joined_path = DATA_PROCESSED / "chapter_09_orders_joined_verified.csv"
mart_path = DATA_PROCESSED / "chapter_04_orders_mart.csv"

if joined_path.exists():
    orders_base = pd.read_csv(joined_path)
elif mart_path.exists():
    orders_base = pd.read_csv(mart_path)
else:
    orders_base = pd.DataFrame({
        "order_id": [
            1001, 1002, 1003, 1004, 1005,
            1006, 1007, 1008, 1009, 1010,
            1011, 1012, 1013, 1014, 1015,
            1016, 1017, 1018, 1019, 1020
        ],
        "order_date": [
            "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05",
            "2026-01-08", "2026-01-10", "2026-01-13", "2026-01-17", "2026-01-22",
            "2026-02-01", "2026-02-02", "2026-02-05", "2026-02-08", "2026-02-11",
            "2026-03-01", "2026-03-05", "2026-03-15", "2026-04-01", "2026-04-10"
        ],
        "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5, 9, 10, 2, 1, 4, 5, 8, 2],
        "customer_name": [
            "김민수", "이지영", "박철수", "김민수", "최영희",
            "이지영", "정수진", "강현우", "오도윤", "한서연",
            "박철수", "정수진", "윤하준", "문유나", "이지영",
            "김민수", "최영희", "정수진", "한서연", "이지영"
        ],
        "region": [
            "서울", "부산", "서울", "서울", "대전",
            "부산", "부산", "서울", "대전", "서울",
            "서울", "부산", "대전", "서울", "부산",
            "서울", "대전", "부산", "서울", "부산"
        ],
        "grade_at_time": [
            "일반", "일반", "일반", "일반", "일반",
            "일반", "일반", "일반", "일반", "VIP",
            "일반", "일반", "일반", "VIP", "일반",
            "VIP", "일반", "VIP", "VIP", "VIP"
        ],
        "category": [
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "전자기기",
            "도서", "전자기기", "생활용품", "전자기기", "도서"
        ],
        "product_name": [
            "노트북", "파이썬 입문서", "머그컵", "노트북", "SQL 기초",
            "머그컵", "노트북", "파이썬 입문서", "머그컵", "노트북",
            "SQL 기초", "머그컵", "무선 마우스", "파이썬 입문서", "노트북",
            "SQL 기초", "무선 마우스", "머그컵", "노트북", "파이썬 입문서"
        ],
        "quantity": [1, 2, 2, 1, 2, 3, 1, 2, 5, 1, 2, 2, 1, 3, 1, 2, 1, 2, 1, 3],
        "coupon_amount": [0, 0, 5000, 10000, 0, 0, 0, 0, 0, 20000, 0, 0, 15000, 0, 10000, 0, 0, 0, 20000, 0],
        "net_amount": [
            300000, 30000, 45000, 290000, 35000,
            75000, 300000, 30000, 125000, 280000,
            35000, 50000, 20000, 45000, 290000,
            35000, 35000, 50000, 290000, 45000
        ],
        "signup_date": [
            "2025-12-01", "2026-01-01", "2026-01-08", "2025-12-01", "2026-02-01",
            "2026-01-01", "2026-02-15", "2026-03-01", "2026-03-10", "2026-03-20",
            "2026-01-08", "2026-02-15", "2026-04-01", "2026-04-05", "2026-01-01",
            "2025-12-01", "2026-02-01", "2026-02-15", "2026-03-20", "2026-01-01"
        ],
        "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10, 8, 11, 5, 12, 3, 10, 15, 5]
    })

orders_base.head()
\`\`\`

---

### 10.5.2 컬럼명 정리

9장에서 만든 데이터는 주문일 컬럼이 \`order_date\`일 수 있고, 4장에서 만든 데이터는 \`order_date_dt\`일 수 있습니다.  
분석을 편하게 하기 위해 날짜 컬럼을 통일합니다.

\`\`\`python
orders_base = orders_base.copy()

if "order_date_dt" in orders_base.columns:
    orders_base["order_date"] = pd.to_datetime(
        orders_base["order_date_dt"],
        errors="coerce"
    )
else:
    orders_base["order_date"] = pd.to_datetime(
        orders_base["order_date"],
        errors="coerce"
    )
\`\`\`

고객 등급 컬럼도 통일합니다.

\`\`\`python
if "grade_at_time" in orders_base.columns:
    orders_base["customer_grade"] = orders_base["grade_at_time"]
elif "grade" in orders_base.columns:
    orders_base["customer_grade"] = orders_base["grade"]
else:
    orders_base["customer_grade"] = "미상"
\`\`\`

순매출 컬럼도 확인합니다.

\`\`\`python
if "net_amount" not in orders_base.columns and "net_amount_history" in orders_base.columns:
    orders_base["net_amount"] = orders_base["net_amount_history"]
\`\`\`

---

### 10.5.3 Feature Table 생성용 주문 데이터 필터링

고객 Feature Table은 매출 분석이 가능한 주문을 기준으로 만듭니다.

\`\`\`python
customer_order_base = orders_base.dropna(
    subset=["customer_id", "order_date", "net_amount"]
).copy()

customer_order_base = customer_order_base.sort_values(
    ["customer_id", "order_date", "order_id"]
).reset_index(drop=True)

customer_order_base.head()
\`\`\`

---

### 10.5.4 기본 파생 컬럼 만들기

연월, 쿠폰 사용 여부, 고가 주문 여부를 만듭니다.

\`\`\`python
customer_order_base["year_month"] = (
    customer_order_base["order_date"]
    .dt.to_period("M")
    .astype(str)
)

customer_order_base["used_coupon"] = customer_order_base["coupon_amount"].fillna(0) > 0

customer_order_base["is_high_amount_order"] = customer_order_base["net_amount"] >= 200000
\`\`\`

---

### 10.5.5 주문 기준 데이터 저장

\`\`\`python
customer_order_base.to_csv(
    DATA_PROCESSED / "chapter_10_customer_order_base.csv",
    index=False
)
\`\`\`

이 데이터는 고객 Feature Table 생성의 입력 데이터입니다.

---
`;export{e as default};