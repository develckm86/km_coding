var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-8 -->

# 20.8 3단계: 데이터 전처리

이제 분석에 사용할 데이터를 정리합니다.

원본 데이터는 그대로 두고, 복사본을 만들어 처리합니다.

---

### 20.8.1 주문 데이터 복사

\`\`\`python
orders = orders_raw.copy()
customers = customers_raw.copy()
products = products_raw.copy()
\`\`\`

원본을 직접 수정하지 않고 복사본을 사용하는 이유는 문제가 생겼을 때 원본을 다시 확인할 수 있기 때문입니다.

---

### 20.8.2 중복 주문 제거

\`\`\`python
orders = orders.drop_duplicates(
    subset=["order_id"],
    keep="first",
    ignore_index=True
)

orders
\`\`\`

중복 제거 후 다시 확인합니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

---

### 20.8.3 쿠폰 금액 결측치 처리

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)
\`\`\`

결측치가 처리되었는지 확인합니다.

\`\`\`python
orders["coupon_amount"].isna().sum()
\`\`\`

---

### 20.8.4 날짜형 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

변환 실패 행을 확인합니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

이번 실습에서는 날짜 분석에서는 날짜가 유효한 주문만 사용하고, 전체 매출 분석에서는 날짜가 없어도 주문 금액 계산이 가능하면 유지할 수 있습니다.

---

### 20.8.5 고객명 공백 제거

고객명 앞뒤 공백을 제거합니다.

\`\`\`python
customers["customer_name"] = customers["customer_name"].str.strip()
\`\`\`

---

### 20.8.6 지역명 표준화

지역명이 다음처럼 섞여 있습니다.

\`\`\`text
서울특별시
서울시
서울
부산광역시
부산시
대전광역시
\`\`\`

이를 서울, 부산, 대전으로 통일합니다.

\`\`\`python
region_map = {
    "서울특별시": "서울",
    "서울시": "서울",
    "서울": "서울",
    "부산광역시": "부산",
    "부산시": "부산",
    "부산": "부산",
    "대전광역시": "대전",
    "대전": "대전"
}

customers["region_clean"] = customers["region"].replace(region_map)

customers[["region", "region_clean"]]
\`\`\`

표준화 결과를 확인합니다.

\`\`\`python
customers["region_clean"].value_counts()
\`\`\`

---

### 20.8.7 날짜 파생 변수 만들기

날짜가 유효한 주문에 대해 연월과 요일을 만듭니다.

\`\`\`python
orders["year_month"] = orders["order_date_dt"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date_dt"].dt.day_name()
\`\`\`

날짜가 \`NaT\`인 행은 \`year_month\`, \`weekday\`도 결측치가 됩니다.

\`\`\`python
orders[["order_date", "order_date_dt", "year_month", "weekday"]]
\`\`\`

---
`;export{e as default};