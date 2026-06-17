var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.4 원본 데이터 생성

실무에서는 원본 데이터를 전달받지만, 이번 실습에서는 재현 가능한 샘플 데이터를 생성합니다.

생성할 데이터는 네 가지입니다.

\`\`\`text
주문 데이터
고객 데이터
상품 데이터
이벤트 로그 데이터
\`\`\`

---

### 20.4.1 고객 데이터 생성

\`\`\`python
n_customers = 300

customers_raw = pd.DataFrame({
    "customer_id": range(1, n_customers + 1),
    "customer_name": [f"고객_{i:03d}" for i in range(1, n_customers + 1)],
    "region": rng.choice(
        ["서울", "부산", "대전", "광주", "대구"],
        size=n_customers,
        p=[0.42, 0.22, 0.15, 0.11, 0.10]
    ),
    "grade": rng.choice(
        ["일반", "VIP"],
        size=n_customers,
        p=[0.75, 0.25]
    ),
    "signup_date": pd.to_datetime("2025-10-01") + pd.to_timedelta(
        rng.integers(0, 240, size=n_customers),
        unit="D"
    )
})

customers_raw.head()
\`\`\`

저장합니다.

\`\`\`python
customers_raw.to_csv(
    DATA_RAW / "final_project_customers_raw.csv",
    index=False
)
\`\`\`

---

### 20.4.2 상품 데이터 생성

\`\`\`python
products_raw = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004", "P005", "P006", "P007", "P008"],
    "product_name": [
        "노트북",
        "파이썬 입문서",
        "머그컵",
        "SQL 실전서",
        "무선 마우스",
        "커피 원두",
        "후드티",
        "텀블러"
    ],
    "category": [
        "전자기기",
        "도서",
        "생활용품",
        "도서",
        "전자기기",
        "식품",
        "패션",
        "생활용품"
    ],
    "unit_price": [300000, 15000, 25000, 22000, 35000, 12000, 55000, 28000],
    "supplier": ["A사", "B사", "C사", "B사", "A사", "D사", "E사", "C사"]
})

products_raw.head()
\`\`\`

저장합니다.

\`\`\`python
products_raw.to_csv(
    DATA_RAW / "final_project_products_raw.csv",
    index=False
)
\`\`\`

---

### 20.4.3 주문 데이터 생성

\`\`\`python
n_orders = 2500

order_ids = range(100001, 100001 + n_orders)

order_dates = pd.to_datetime("2026-01-01") + pd.to_timedelta(
    rng.integers(0, 181, size=n_orders),
    unit="D"
)

customer_ids = rng.choice(customers_raw["customer_id"], size=n_orders)

product_ids = rng.choice(
    products_raw["product_id"],
    size=n_orders,
    p=[0.20, 0.16, 0.12, 0.14, 0.13, 0.10, 0.08, 0.07]
)

product_price_map = products_raw.set_index("product_id")["unit_price"].to_dict()
unit_prices = np.array([product_price_map[p] for p in product_ids])

quantities = rng.integers(1, 5, size=n_orders)

coupon_amounts = rng.choice(
    [0, 0, 0, 3000, 5000, 10000, 20000],
    size=n_orders,
    p=[0.45, 0.20, 0.10, 0.08, 0.07, 0.06, 0.04]
)

gross_amounts = unit_prices * quantities
net_amounts = np.maximum(gross_amounts - coupon_amounts, 0)

orders_raw = pd.DataFrame({
    "order_id": order_ids,
    "order_date": order_dates,
    "customer_id": customer_ids,
    "product_id": product_ids,
    "quantity": quantities,
    "unit_price": unit_prices,
    "coupon_amount": coupon_amounts,
    "gross_amount": gross_amounts,
    "net_amount": net_amounts
})

orders_raw.head()
\`\`\`

---

### 20.4.4 일부 데이터 품질 문제 추가

실무 원본 데이터에는 품질 문제가 있을 수 있습니다.  
실습을 위해 일부 문제를 추가합니다.

\`\`\`python
orders_raw.loc[0, "customer_id"] = np.nan
orders_raw.loc[1, "product_id"] = "P999"
orders_raw.loc[2, "net_amount"] = -1000
orders_raw.loc[3, "order_date"] = pd.NaT

duplicate_order = orders_raw.iloc[[10]].copy()
orders_raw = pd.concat([orders_raw, duplicate_order], ignore_index=True)
\`\`\`

저장합니다.

\`\`\`python
orders_raw.to_csv(
    DATA_RAW / "final_project_orders_raw.csv",
    index=False
)
\`\`\`

---

### 20.4.5 이벤트 로그 데이터 생성

퍼널 분석용 이벤트 로그를 생성합니다.

\`\`\`python
funnel_steps = [
    "visit",
    "product_view",
    "add_to_cart",
    "checkout_start",
    "purchase"
]

events = []

event_user_ids = rng.choice(
    customers_raw["customer_id"],
    size=1200,
    replace=True
)

for i, customer_id in enumerate(event_user_ids, start=1):
    session_id = f"S{i:05d}"
    start_time = pd.Timestamp("2026-06-01") + pd.to_timedelta(
        int(rng.integers(0, 60 * 24 * 25)),
        unit="m"
    )

    channel = rng.choice(["search", "sns", "email", "direct"], p=[0.35, 0.25, 0.20, 0.20])
    device = rng.choice(["mobile", "desktop"], p=[0.7, 0.3])

    current_time = start_time

    events.append({
        "session_id": session_id,
        "customer_id": customer_id,
        "event_time": current_time,
        "event_name": "visit",
        "channel": channel,
        "device": device
    })

    if rng.random() < 0.70:
        current_time += pd.Timedelta(seconds=int(rng.integers(20, 300)))
        events.append({
            "session_id": session_id,
            "customer_id": customer_id,
            "event_time": current_time,
            "event_name": "product_view",
            "channel": channel,
            "device": device
        })

        if rng.random() < 0.42:
            current_time += pd.Timedelta(seconds=int(rng.integers(20, 500)))
            events.append({
                "session_id": session_id,
                "customer_id": customer_id,
                "event_time": current_time,
                "event_name": "add_to_cart",
                "channel": channel,
                "device": device
            })

            if rng.random() < 0.55:
                current_time += pd.Timedelta(seconds=int(rng.integers(20, 500)))
                events.append({
                    "session_id": session_id,
                    "customer_id": customer_id,
                    "event_time": current_time,
                    "event_name": "checkout_start",
                    "channel": channel,
                    "device": device
                })

                if rng.random() < 0.72:
                    current_time += pd.Timedelta(seconds=int(rng.integers(20, 600)))
                    events.append({
                        "session_id": session_id,
                        "customer_id": customer_id,
                        "event_time": current_time,
                        "event_name": "purchase",
                        "channel": channel,
                        "device": device
                    })

events_raw = pd.DataFrame(events)

events_raw.head()
\`\`\`

저장합니다.

\`\`\`python
events_raw.to_csv(
    DATA_RAW / "final_project_events_raw.csv",
    index=False
)
\`\`\`

---
`;export{e as default};