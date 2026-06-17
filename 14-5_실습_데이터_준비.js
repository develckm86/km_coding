var e=`# 14장. RFM 고객 분석 실습

## 14.5 실습 데이터 준비

이번 장에서는 10장에서 만든 고객 주문 기준 데이터를 우선 사용합니다.

파일이 없다면 수업용 주문 데이터를 생성합니다.

---

### 14.5.1 주문 기준 데이터 불러오기

\`\`\`python
order_base_path = DATA_PROCESSED / "chapter_10_customer_order_base.csv"
mart_path = DATA_PROCESSED / "chapter_04_orders_mart.csv"

if order_base_path.exists():
    orders = pd.read_csv(order_base_path)
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
            1026, 1027, 1028, 1029, 1030
        ],
        "order_date": [
            "2026-01-01", "2026-01-02", "2026-01-05", "2026-01-08", "2026-01-10",
            "2026-01-15", "2026-01-20", "2026-01-25", "2026-02-01", "2026-02-05",
            "2026-02-10", "2026-02-14", "2026-02-20", "2026-03-01", "2026-03-05",
            "2026-03-10", "2026-03-15", "2026-03-20", "2026-03-25", "2026-03-30",
            "2026-04-01", "2026-04-05", "2026-04-10", "2026-04-15", "2026-04-18",
            "2026-04-20", "2026-04-22", "2026-04-25", "2026-04-27", "2026-04-29"
        ],
        "customer_id": [
            1, 2, 3, 1, 4,
            2, 5, 6, 7, 8,
            3, 5, 9, 10, 2,
            1, 4, 5, 8, 2,
            1, 5, 10, 11, 12,
            1, 2, 5, 13, 14
        ],
        "customer_name": [
            "김민수", "이지영", "박철수", "김민수", "최영희",
            "이지영", "정수진", "강현우", "오도윤", "한서연",
            "박철수", "정수진", "윤하준", "문유나", "이지영",
            "김민수", "최영희", "정수진", "한서연", "이지영",
            "김민수", "정수진", "문유나", "임서준", "권하은",
            "김민수", "이지영", "정수진", "장도현", "백지우"
        ],
        "region": [
            "서울", "부산", "서울", "서울", "대전",
            "부산", "부산", "서울", "대전", "서울",
            "서울", "부산", "대전", "서울", "부산",
            "서울", "대전", "부산", "서울", "부산",
            "서울", "부산", "서울", "대전", "부산",
            "서울", "부산", "부산", "대전", "서울"
        ],
        "category": [
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "전자기기",
            "도서", "전자기기", "생활용품", "전자기기", "도서",
            "전자기기", "생활용품", "도서", "전자기기", "생활용품",
            "전자기기", "도서", "전자기기", "도서", "생활용품"
        ],
        "net_amount": [
            300000, 30000, 50000, 290000, 35000,
            75000, 300000, 30000, 125000, 280000,
            35000, 50000, 20000, 45000, 290000,
            35000, 35000, 50000, 290000, 45000,
            310000, 60000, 50000, 420000, 70000,
            320000, 30000, 330000, 40000, 80000
        ],
        "coupon_amount": [
            0, 0, 5000, 10000, 0,
            0, 0, 0, 0, 20000,
            0, 0, 15000, 0, 10000,
            0, 0, 0, 20000, 0,
            0, 5000, 0, 10000, 0,
            0, 0, 15000, 0, 0
        ]
    })

orders.head()
\`\`\`

---

### 14.5.2 컬럼명 통일

주문일 컬럼 이름이 \`order_date_dt\`일 수도 있고 \`order_date\`일 수도 있습니다.

\`\`\`python
orders = orders.copy()

if "order_date_dt" in orders.columns:
    orders["order_date"] = pd.to_datetime(orders["order_date_dt"], errors="coerce")
else:
    orders["order_date"] = pd.to_datetime(orders["order_date"], errors="coerce")
\`\`\`

순매출 컬럼도 확인합니다.

\`\`\`python
if "net_amount" not in orders.columns and "net_amount_history" in orders.columns:
    orders["net_amount"] = orders["net_amount_history"]
\`\`\`

---

### 14.5.3 RFM 분석용 데이터 필터링

RFM 분석에는 고객 ID, 주문일, 구매 금액이 필요합니다.

\`\`\`python
rfm_base_orders = orders.dropna(
    subset=["customer_id", "order_date", "net_amount"]
).copy()

rfm_base_orders = rfm_base_orders[
    rfm_base_orders["net_amount"] >= 0
].copy()

rfm_base_orders.head()
\`\`\`

---

### 14.5.4 연월과 쿠폰 사용 여부 추가

\`\`\`python
rfm_base_orders["year_month"] = rfm_base_orders["order_date"].dt.to_period("M").astype(str)

if "coupon_amount" in rfm_base_orders.columns:
    rfm_base_orders["used_coupon"] = rfm_base_orders["coupon_amount"].fillna(0) > 0
else:
    rfm_base_orders["used_coupon"] = False
\`\`\`

---

### 14.5.5 저장하기

\`\`\`python
rfm_base_orders.to_csv(
    DATA_PROCESSED / "chapter_14_rfm_base_orders.csv",
    index=False
)
\`\`\`

---
`;export{e as default};