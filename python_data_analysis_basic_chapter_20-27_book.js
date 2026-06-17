var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-27 -->

# 20.27 정답 및 해설

### 문제 1 정답

정답: B

종합 분석 프로젝트는 보통 다음 흐름으로 진행합니다.

\`\`\`text
분석 목적 정의
데이터 준비
데이터 구조 확인
전처리
분석
시각화
보고서 작성
\`\`\`

---

### 문제 2 정답

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)
\`\`\`

쿠폰 금액 결측치를 쿠폰 미사용으로 해석할 수 있다면 0으로 채울 수 있습니다.

---

### 문제 3 정답

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

\`errors="coerce"\`를 사용하면 변환할 수 없는 날짜가 \`NaT\`로 처리됩니다.

---

### 문제 4 정답

\`\`\`python
customers["customer_name"] = customers["customer_name"].str.strip()
\`\`\`

\`str.strip()\`은 문자열 앞뒤 공백을 제거합니다.

---

### 문제 5 정답

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

orders_customer
\`\`\`

왼쪽 데이터인 주문 데이터는 모두 유지되고, 고객 정보가 없는 주문은 고객명이 결측치가 됩니다.

---

### 문제 6 정답

\`\`\`python
df["net_amount"] = (
    df["quantity"] * df["unit_price"] - df["coupon_amount"]
)

df
\`\`\`

최종 주문 금액은 수량과 단가를 곱한 뒤 쿠폰 금액을 뺀 값입니다.

---

### 문제 7 정답

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

category_report
\`\`\`

---

### 문제 8 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")

monthly_report = (
    orders
    .groupby("year_month")["net_amount"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_report
\`\`\`

---

### 문제 9 정답

예시 답안:

\`\`\`text
전자기기 카테고리는 총매출과 평균 주문 금액이 모두 높아 전체 매출에 크게 기여하는 핵심 카테고리로 볼 수 있다.
따라서 전자기기 상품군은 재고 관리, 가격 전략, 프로모션 성과 모니터링에서 우선적으로 관리할 필요가 있다.
\`\`\`

---

### 문제 10 정답

종합 분석 보고서에는 다음 항목을 포함할 수 있습니다.

\`\`\`text
분석 목적
데이터 개요
전처리 및 분석 기준
주요 결과 요약
상세 분석 결과
시각화
인사이트
분석 한계
다음 분석 방향
\`\`\`

---
`;export{e as default};