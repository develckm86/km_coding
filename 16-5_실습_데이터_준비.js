var e=`# 16장. 퍼널 분석 실습

## 16.5 실습 데이터 준비

이번 장에서는 이벤트 로그 데이터를 직접 생성해 실습합니다.

---

### 16.5.1 퍼널 단계 정의

먼저 퍼널 단계를 정의합니다.

\`\`\`python
funnel_steps = [
    "visit",
    "product_view",
    "add_to_cart",
    "checkout_start",
    "purchase"
]

funnel_step_names = {
    "visit": "방문",
    "product_view": "상품 조회",
    "add_to_cart": "장바구니",
    "checkout_start": "결제 시작",
    "purchase": "구매 완료"
}
\`\`\`

---

### 16.5.2 이벤트 로그 샘플 데이터 생성

다음 코드는 사용자별로 퍼널 단계를 어느 정도까지 진행했는지 랜덤하게 생성합니다.

\`\`\`python
rng = np.random.default_rng(42)

n_users = 800

user_ids = [f"U{i:04d}" for i in range(1, n_users + 1)]

channels = rng.choice(
    ["search", "sns", "email", "direct"],
    size=n_users,
    p=[0.35, 0.25, 0.20, 0.20]
)

devices = rng.choice(
    ["mobile", "desktop"],
    size=n_users,
    p=[0.68, 0.32]
)

customer_types = rng.choice(
    ["new", "returning"],
    size=n_users,
    p=[0.55, 0.45]
)

base_time = pd.Timestamp("2026-04-01 09:00:00")

event_records = []

for user_id, channel, device, customer_type in zip(user_ids, channels, devices, customer_types):
    start_time = base_time + pd.Timedelta(minutes=int(rng.integers(0, 60 * 24 * 14)))

    # 사용자 특성에 따라 단계 진행 확률을 조금 다르게 설정
    product_view_prob = 0.72 if customer_type == "returning" else 0.64
    add_to_cart_prob = 0.48 if device == "desktop" else 0.40
    checkout_prob = 0.62 if channel in ["email", "direct"] else 0.52
    purchase_prob = 0.78 if customer_type == "returning" else 0.68

    # 1단계 방문은 모든 사용자에게 발생
    event_records.append({
        "user_id": user_id,
        "event_time": start_time,
        "event_name": "visit",
        "channel": channel,
        "device": device,
        "customer_type": customer_type
    })

    current_time = start_time

    if rng.random() < product_view_prob:
        current_time = current_time + pd.Timedelta(seconds=int(rng.integers(30, 300)))
        event_records.append({
            "user_id": user_id,
            "event_time": current_time,
            "event_name": "product_view",
            "channel": channel,
            "device": device,
            "customer_type": customer_type
        })

        if rng.random() < add_to_cart_prob:
            current_time = current_time + pd.Timedelta(seconds=int(rng.integers(30, 600)))
            event_records.append({
                "user_id": user_id,
                "event_time": current_time,
                "event_name": "add_to_cart",
                "channel": channel,
                "device": device,
                "customer_type": customer_type
            })

            if rng.random() < checkout_prob:
                current_time = current_time + pd.Timedelta(seconds=int(rng.integers(30, 600)))
                event_records.append({
                    "user_id": user_id,
                    "event_time": current_time,
                    "event_name": "checkout_start",
                    "channel": channel,
                    "device": device,
                    "customer_type": customer_type
                })

                if rng.random() < purchase_prob:
                    current_time = current_time + pd.Timedelta(seconds=int(rng.integers(30, 900)))
                    event_records.append({
                        "user_id": user_id,
                        "event_time": current_time,
                        "event_name": "purchase",
                        "channel": channel,
                        "device": device,
                        "customer_type": customer_type
                    })

event_log_raw = pd.DataFrame(event_records)

event_log_raw.head()
\`\`\`

---

### 16.5.3 일부 품질 문제 추가

실습을 위해 잘못된 이벤트명과 중복 이벤트를 조금 추가합니다.

\`\`\`python
extra_rows = event_log_raw.sample(5, random_state=1).copy()
event_log_raw = pd.concat([event_log_raw, extra_rows], ignore_index=True)

invalid_event = pd.DataFrame([
    {
        "user_id": "U9999",
        "event_time": pd.Timestamp("2026-04-05 10:00:00"),
        "event_name": "unknown_event",
        "channel": "search",
        "device": "mobile",
        "customer_type": "new"
    }
])

event_log_raw = pd.concat([event_log_raw, invalid_event], ignore_index=True)

event_log_raw.tail()
\`\`\`

---

### 16.5.4 이벤트 로그 저장

\`\`\`python
event_log_raw.to_csv(
    DATA_PROCESSED / "chapter_16_event_log_raw.csv",
    index=False
)
\`\`\`

---
`;export{e as default};