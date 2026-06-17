var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.5 실습 데이터 준비

이번 장에서는 10장에서 만든 고객 주문 기준 데이터를 우선 사용합니다.  
파일이 없으면 수업용 주문 데이터를 생성합니다.

---

### 15.5.1 주문 데이터 불러오기

\`\`\`python
order_base_path = DATA_PROCESSED / "chapter_10_customer_order_base.csv"
rfm_order_path = DATA_PROCESSED / "chapter_14_rfm_base_orders.csv"
mart_path = DATA_PROCESSED / "chapter_04_orders_mart.csv"

if order_base_path.exists():
    orders = pd.read_csv(order_base_path)
elif rfm_order_path.exists():
    orders = pd.read_csv(rfm_order_path)
elif mart_path.exists():
    orders = pd.read_csv(mart_path)
else:
    orders = pd.DataFrame({
        "order_id": [
            1001, 1002, 1003, 1004, 1005,
            1006, 1007, 1008, 1009, 1010,
            1011, 1012, 1013, 1014, 1015,
            1016, 1017, 1018, 1019, 1020,
            1021, 1022, 1023, 1024, 1025,
            1026, 1027, 1028, 1029, 1030,
            1031, 1032, 1033, 1034, 1035,
            1036, 1037, 1038, 1039, 1040
        ],
        "order_date": [
            "2026-01-03", "2026-01-05", "2026-01-10", "2026-01-15", "2026-01-22",
            "2026-02-02", "2026-02-05", "2026-02-14", "2026-02-20", "2026-02-28",
            "2026-03-01", "2026-03-05", "2026-03-10", "2026-03-15", "2026-03-20",
            "2026-03-25", "2026-04-01", "2026-04-05", "2026-04-08", "2026-04-10",
            "2026-04-12", "2026-04-15", "2026-04-18", "2026-04-20", "2026-04-22",
            "2026-04-25", "2026-04-26", "2026-04-27", "2026-04-28", "2026-04-29",
            "2026-05-03", "2026-05-05", "2026-05-10", "2026-05-15", "2026-05-20",
            "2026-06-01", "2026-06-05", "2026-06-12", "2026-06-20", "2026-06-25"
        ],
        "customer_id": [
            1, 2, 3, 1, 4,
            2, 5, 6, 1, 7,
            3, 5, 8, 1, 9,
            10, 2, 5, 8, 1,
            11, 12, 5, 13, 14,
            1, 2, 8, 15, 16,
            1, 5, 2, 17, 18,
            1, 8, 5, 19, 2
        ],
        "customer_name": [
            "김민수", "이지영", "박철수", "김민수", "최영희",
            "이지영", "정수진", "강현우", "김민수", "오도윤",
            "박철수", "정수진", "한서연", "김민수", "윤하준",
            "문유나", "이지영", "정수진", "한서연", "김민수",
            "임서준", "권하은", "정수진", "장도현", "백지우",
            "김민수", "이지영", "한서연", "송민재", "홍서아",
            "김민수", "정수진", "이지영", "유지호", "안시우",
            "김민수", "한서연", "정수진", "전하린", "이지영"
        ],
        "region": [
            "서울", "부산", "서울", "서울", "대전",
            "부산", "부산", "서울", "서울", "대전",
            "서울", "부산", "서울", "서울", "대전",
            "서울", "부산", "부산", "서울", "서울",
            "부산", "서울", "부산", "대전", "부산",
            "서울", "부산", "서울", "서울", "대전",
            "서울", "부산", "부산", "서울", "대전",
            "서울", "서울", "부산", "대전", "부산"
        ],
        "category": [
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "전자기기", "생활용품",
            "도서", "전자기기", "생활용품", "도서", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "생활용품",
            "전자기기", "도서", "전자기기", "도서", "생활용품",
            "전자기기", "생활용품", "도서", "전자기기", "도서",
            "전자기기", "도서", "생활용품", "도서", "전자기기"
        ],
        "net_amount": [
            300000, 45000, 50000, 250000, 35000,
            60000, 300000, 30000, 40000, 280000,
            54000, 50000, 300000, 320000, 80000,
            45000, 290000, 60000, 30000, 310000,
            45000, 50000, 280000, 35000, 70000,
            330000, 55000, 300000, 40000, 65000,
            310000, 50000, 65000, 250000, 45000,
            300000, 35000, 70000, 60000, 290000
        ],
        "signup_date": [
            "2025-12-20", "2026-01-01", "2026-01-05", "2025-12-20", "2026-01-18",
            "2026-01-01", "2026-02-01", "2026-02-10", "2025-12-20", "2026-02-20",
            "2026-01-05", "2026-02-01", "2026-03-01", "2025-12-20", "2026-03-05",
            "2026-03-10", "2026-01-01", "2026-02-01", "2026-03-01", "2025-12-20",
            "2026-04-01", "2026-04-05", "2026-02-01", "2026-04-10", "2026-04-12",
            "2025-12-20", "2026-01-01", "2026-03-01", "2026-04-20", "2026-04-22",
            "2025-12-20", "2026-02-01", "2026-01-01", "2026-05-01", "2026-05-03",
            "2025-12-20", "2026-03-01", "2026-02-01", "2026-06-01", "2026-01-01"
        ]
    })

orders.head()
\`\`\`

---

### 15.5.2 컬럼명 통일

데이터 출처에 따라 날짜 컬럼명이 다를 수 있습니다.

\`\`\`python
orders = orders.copy()

if "order_date" not in orders.columns and "order_date_dt" in orders.columns:
    orders["order_date"] = orders["order_date_dt"]

orders["order_date"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

가입일이 없으면 임시로 고객별 첫 구매일보다 7일 빠른 날짜를 가입일로 설정합니다.

\`\`\`python
if "signup_date" not in orders.columns:
    first_order_temp = (
        orders
        .groupby("customer_id")["order_date"]
        .transform("min")
    )
    orders["signup_date"] = first_order_temp - pd.Timedelta(days=7)

orders["signup_date"] = pd.to_datetime(
    orders["signup_date"],
    errors="coerce"
)
\`\`\`

필수 컬럼이 없으면 기본값을 채웁니다.

\`\`\`python
if "customer_name" not in orders.columns:
    orders["customer_name"] = "고객명없음"

if "region" not in orders.columns:
    orders["region"] = "미상"

if "category" not in orders.columns:
    orders["category"] = "미상"
\`\`\`

---

### 15.5.3 코호트 분석용 데이터 필터링

\`\`\`python
cohort_base_orders = orders.dropna(
    subset=["customer_id", "order_id", "order_date", "net_amount"]
).copy()

cohort_base_orders = cohort_base_orders[
    cohort_base_orders["net_amount"] >= 0
].copy()

cohort_base_orders = cohort_base_orders.sort_values(
    ["customer_id", "order_date", "order_id"]
).reset_index(drop=True)

cohort_base_orders.head()
\`\`\`

---

### 15.5.4 월 단위 컬럼 만들기

\`\`\`python
cohort_base_orders["order_month"] = (
    cohort_base_orders["order_date"]
    .dt.to_period("M")
)

cohort_base_orders["signup_month"] = (
    cohort_base_orders["signup_date"]
    .dt.to_period("M")
)
\`\`\`

저장합니다.

\`\`\`python
cohort_base_orders.to_csv(
    DATA_PROCESSED / "chapter_15_cohort_base_orders.csv",
    index=False
)
\`\`\`

---
`;export{e as default};