var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-12 -->

# 13.12 실무 예제 3: 배송 소요일 분석

배송일과 주문일을 이용해 배송 소요일을 계산해보겠습니다.

---

### 13.12.1 날짜형 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"], errors="coerce")
orders["ship_date_dt"] = pd.to_datetime(orders["ship_date"], errors="coerce")
\`\`\`

---

### 13.12.2 배송 소요일 계산

\`\`\`python
delivery_orders = orders.dropna(subset=["order_date_dt", "ship_date_dt"]).copy()

delivery_orders["delivery_days"] = (
    delivery_orders["ship_date_dt"] - delivery_orders["order_date_dt"]
).dt.days

delivery_orders[["order_id", "order_date_dt", "ship_date_dt", "delivery_days"]]
\`\`\`

---

### 13.12.3 배송 소요일 요약

\`\`\`python
delivery_orders["delivery_days"].describe()
\`\`\`

평균 배송 소요일을 계산합니다.

\`\`\`python
delivery_orders["delivery_days"].mean()
\`\`\`

배송이 3일 이상 걸린 주문을 찾을 수도 있습니다.

\`\`\`python
delayed_orders = delivery_orders[delivery_orders["delivery_days"] >= 3]

delayed_orders
\`\`\`

---
`;export{e as default};