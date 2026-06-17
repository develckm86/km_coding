var e=`# 19장. 대용량 데이터 처리 실습

## 19.4 실습용 대용량 데이터 생성

실제 수업 환경에서는 너무 큰 데이터를 만들면 시간이 오래 걸릴 수 있습니다.  
따라서 이번 장에서는 적당한 크기의 데이터를 생성하되, 구조는 대용량 데이터 처리 실습에 맞게 구성합니다.

기본 행 수는 300,000행으로 설정합니다.  
컴퓨터 성능이 낮다면 50,000 또는 100,000으로 줄여도 됩니다.

---

### 19.4.1 데이터 크기 설정

\`\`\`python
N_ROWS = 300_000
RANDOM_SEED = 42
\`\`\`

---

### 19.4.2 대용량 주문 데이터 생성

\`\`\`python
rng = np.random.default_rng(RANDOM_SEED)

order_ids = np.arange(1, N_ROWS + 1)

start_date = np.datetime64("2025-01-01")
end_date = np.datetime64("2026-06-30")
date_range_days = (end_date - start_date).astype(int)

order_dates = start_date + rng.integers(
    0,
    date_range_days,
    size=N_ROWS
).astype("timedelta64[D]")

customer_ids = rng.integers(1, 50_001, size=N_ROWS)
product_ids = rng.choice(
    ["P001", "P002", "P003", "P004", "P005", "P006", "P007", "P008"],
    size=N_ROWS,
    p=[0.22, 0.18, 0.15, 0.12, 0.10, 0.09, 0.08, 0.06]
)

category_map = {
    "P001": "전자기기",
    "P002": "도서",
    "P003": "생활용품",
    "P004": "도서",
    "P005": "전자기기",
    "P006": "식품",
    "P007": "패션",
    "P008": "생활용품"
}

unit_price_map = {
    "P001": 300000,
    "P002": 15000,
    "P003": 25000,
    "P004": 17500,
    "P005": 35000,
    "P006": 12000,
    "P007": 55000,
    "P008": 28000
}

categories = np.array([category_map[p] for p in product_ids])
unit_prices = np.array([unit_price_map[p] for p in product_ids])

regions = rng.choice(
    ["서울", "부산", "대전", "광주", "대구"],
    size=N_ROWS,
    p=[0.42, 0.22, 0.15, 0.11, 0.10]
)

channels = rng.choice(
    ["search", "sns", "email", "direct", "affiliate"],
    size=N_ROWS,
    p=[0.35, 0.25, 0.15, 0.15, 0.10]
)

devices = rng.choice(
    ["mobile", "desktop", "tablet"],
    size=N_ROWS,
    p=[0.68, 0.28, 0.04]
)

quantity = rng.integers(1, 5, size=N_ROWS)

coupon_amount = rng.choice(
    [0, 0, 0, 3000, 5000, 10000, 20000],
    size=N_ROWS,
    p=[0.45, 0.20, 0.10, 0.08, 0.07, 0.06, 0.04]
)

gross_amount = unit_prices * quantity
net_amount = np.maximum(gross_amount - coupon_amount, 0)

large_orders = pd.DataFrame({
    "order_id": order_ids,
    "order_date": pd.to_datetime(order_dates),
    "customer_id": customer_ids,
    "product_id": product_ids,
    "category": categories,
    "region": regions,
    "channel": channels,
    "device": devices,
    "quantity": quantity,
    "unit_price": unit_prices,
    "coupon_amount": coupon_amount,
    "gross_amount": gross_amount,
    "net_amount": net_amount
})

large_orders["year_month"] = large_orders["order_date"].dt.to_period("M").astype(str)

large_orders.head()
\`\`\`

---

### 19.4.3 CSV로 저장

\`\`\`python
large_csv_path = DATA_RAW / "chapter_19_large_orders.csv"

large_orders.to_csv(
    large_csv_path,
    index=False
)
\`\`\`

---

### 19.4.4 파일 크기 확인

\`\`\`python
file_size_mb = large_csv_path.stat().st_size / 1024 ** 2

file_size_mb
\`\`\`

---

### 19.4.5 샘플 저장

대용량 데이터를 다룰 때는 먼저 일부 샘플을 확인하는 것이 좋습니다.

\`\`\`python
large_orders.head(1000).to_csv(
    DATA_PROCESSED / "chapter_19_large_orders_sample.csv",
    index=False
)
\`\`\`

---
`;export{e as default};