var e=`# 17장. 고급 시각화 리포트 만들기

## 17.4 실습 데이터 준비

이번 장에서는 앞 장들에서 만든 결과물을 최대한 재사용합니다.

사용 가능한 파일이 없으면 수업용 샘플 데이터를 생성합니다.

사용할 수 있는 입력 데이터는 다음과 같습니다.

\`\`\`text
chapter_04_orders_mart.csv
chapter_08_monthly_sales_growth.csv
chapter_14_rfm_customer_segments.csv
chapter_15_cohort_retention_table.csv
chapter_16_funnel_conversion_report.csv
chapter_12_conversion_rate_comparison.csv
chapter_13_prediction_sample.csv
\`\`\`

---

### 17.4.1 주문 데이터 불러오기

\`\`\`python
orders_path = DATA_PROCESSED / "chapter_04_orders_mart.csv"

if orders_path.exists():
    orders_mart = pd.read_csv(orders_path)
else:
    orders_mart = pd.DataFrame({
        "order_id": range(1001, 1041),
        "order_date": [
            "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05",
            "2026-01-08", "2026-01-10", "2026-01-13", "2026-01-17", "2026-01-22",
            "2026-02-01", "2026-02-02", "2026-02-05", "2026-02-08", "2026-02-11",
            "2026-02-15", "2026-02-18", "2026-02-20", "2026-02-24", "2026-02-28",
            "2026-03-01", "2026-03-03", "2026-03-05", "2026-03-08", "2026-03-10",
            "2026-03-14", "2026-03-17", "2026-03-21", "2026-03-25", "2026-03-30",
            "2026-04-01", "2026-04-03", "2026-04-05", "2026-04-08", "2026-04-10",
            "2026-04-14", "2026-04-18", "2026-04-21", "2026-04-25", "2026-04-29"
        ],
        "customer_id": [
            1, 2, 3, 1, 4, 2, 5, 6, 7, 8,
            3, 5, 9, 10, 2, 1, 4, 6, 7, 8,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ],
        "category": [
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "전자기기",
            "도서", "전자기기", "생활용품", "생활용품", "도서",
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기"
        ],
        "region": [
            "서울", "부산", "서울", "서울", "대전",
            "부산", "부산", "서울", "대전", "서울",
            "서울", "부산", "대전", "서울", "부산",
            "서울", "대전", "서울", "대전", "서울",
            "서울", "부산", "서울", "대전", "부산",
            "서울", "대전", "서울", "대전", "서울",
            "서울", "부산", "서울", "대전", "부산",
            "서울", "대전", "서울", "대전", "서울"
        ],
        "net_amount": [
            300000, 30000, 50000, 290000, 35000,
            75000, 300000, 30000, 125000, 280000,
            35000, 50000, 20000, 45000, 290000,
            35000, 35000, 100000, 75000, 30000,
            300000, 45000, 50000, 35000, 35000,
            100000, 300000, 30000, 125000, 280000,
            300000, 35000, 50000, 35000, 45000,
            100000, 300000, 35000, 100000, 290000
        ]
    })

orders_mart.head()
\`\`\`

---

### 17.4.2 날짜 컬럼 정리

\`\`\`python
if "order_date_dt" in orders_mart.columns:
    orders_mart["order_date"] = pd.to_datetime(orders_mart["order_date_dt"], errors="coerce")
else:
    orders_mart["order_date"] = pd.to_datetime(orders_mart["order_date"], errors="coerce")

orders_mart["year_month"] = orders_mart["order_date"].dt.to_period("M").astype(str)
\`\`\`

---

### 17.4.3 RFM 데이터 준비

\`\`\`python
rfm_path = DATA_PROCESSED / "chapter_14_rfm_customer_segments.csv"

if rfm_path.exists():
    rfm_segments = pd.read_csv(rfm_path)
else:
    rfm_segments = pd.DataFrame({
        "customer_id": range(1, 21),
        "rfm_segment": [
            "Champions", "Loyal Customers", "At Risk", "Hibernating", "Champions",
            "Need Attention", "New Customers", "Champions", "Hibernating", "Loyal Customers",
            "Potential Loyalists", "At Risk", "Big Spenders", "Others", "Need Attention",
            "Champions", "Hibernating", "Potential Loyalists", "At Risk", "Loyal Customers"
        ],
        "monetary": [
            900000, 600000, 450000, 80000, 850000,
            220000, 70000, 760000, 60000, 640000,
            250000, 410000, 520000, 130000, 210000,
            880000, 50000, 300000, 390000, 590000
        ],
        "recency": [5, 12, 90, 120, 7, 35, 3, 8, 140, 15, 10, 100, 40, 55, 42, 4, 150, 9, 110, 17],
        "frequency": [8, 6, 5, 1, 7, 3, 1, 6, 1, 5, 2, 4, 2, 2, 3, 8, 1, 2, 4, 5]
    })

rfm_segments.head()
\`\`\`

---

### 17.4.4 코호트 리텐션 데이터 준비

\`\`\`python
cohort_path = OUTPUT_TABLES / "chapter_15_cohort_retention_table.csv"

if cohort_path.exists():
    cohort_retention_table = pd.read_csv(cohort_path)

    if "cohort_month" in cohort_retention_table.columns:
        cohort_retention_table = cohort_retention_table.set_index("cohort_month")

    cohort_retention_table.columns = [
        int(col) if str(col).isdigit() else col
        for col in cohort_retention_table.columns
    ]
else:
    cohort_retention_table = pd.DataFrame({
        0: [100, 100, 100, 100],
        1: [35, 30, 28, np.nan],
        2: [22, 18, np.nan, np.nan],
        3: [15, np.nan, np.nan, np.nan]
    }, index=["2026-01", "2026-02", "2026-03", "2026-04"])

cohort_retention_table
\`\`\`

---

### 17.4.5 퍼널 데이터 준비

\`\`\`python
funnel_path = OUTPUT_TABLES / "chapter_16_funnel_conversion_report.csv"

if funnel_path.exists():
    funnel_report = pd.read_csv(funnel_path)
else:
    funnel_report = pd.DataFrame({
        "step_order": [1, 2, 3, 4, 5],
        "event_name": ["visit", "product_view", "add_to_cart", "checkout_start", "purchase"],
        "step_name": ["방문", "상품 조회", "장바구니", "결제 시작", "구매 완료"],
        "users": [800, 540, 230, 125, 92],
        "overall_conversion_rate": [100, 67.5, 28.8, 15.6, 11.5],
        "step_conversion_rate": [100, 67.5, 42.6, 54.3, 73.6],
        "dropoff_users": [0, 260, 310, 105, 33],
        "dropoff_rate": [0, 32.5, 57.4, 45.7, 26.4]
    })

funnel_report
\`\`\`

---

### 17.4.6 A/B 테스트 데이터 준비

\`\`\`python
ab_path = OUTPUT_TABLES / "chapter_12_conversion_rate_comparison.csv"

if ab_path.exists():
    ab_conversion = pd.read_csv(ab_path)
else:
    ab_conversion = pd.DataFrame({
        "experiment_group": ["control", "treatment"],
        "users": [500, 500],
        "conversions": [41, 53],
        "conversion_rate": [8.2, 10.6]
    })

ab_conversion
\`\`\`

---

### 17.4.7 회귀 예측 데이터 준비

\`\`\`python
prediction_path = OUTPUT_TABLES / "chapter_13_prediction_sample.csv"

if prediction_path.exists():
    prediction_sample = pd.read_csv(prediction_path)
else:
    rng = np.random.default_rng(42)
    actual = rng.normal(300000, 120000, 50).clip(30000, 900000)
    predicted = actual + rng.normal(0, 60000, 50)

    prediction_sample = pd.DataFrame({
        "customer_id": range(1, 51),
        "total_purchase": actual.round(0),
        "predicted_total_purchase": predicted.round(0),
        "residual": (actual - predicted).round(0)
    })

prediction_sample.head()
\`\`\`

---
`;export{e as default};