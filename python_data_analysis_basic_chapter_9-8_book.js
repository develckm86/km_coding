var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-8 -->

# 9.8 실무 미니 프로젝트: 주문 데이터 분석용 컬럼 만들기

이번 장에서 배운 내용을 하나의 흐름으로 정리해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 준비한다.
2. 컬럼명을 분석하기 좋은 형태로 바꾼다.
3. 금액 컬럼을 숫자형으로 변환한다.
4. 날짜 컬럼을 날짜형으로 변환한다.
5. 지역명을 통일한다.
6. 주문 금액, 할인 금액, 최종 결제 금액을 만든다.
7. 무료배송 여부와 주문 등급을 만든다.
8. 보고용 컬럼만 선택한다.
\`\`\`

---

## 9.8.1 원본 데이터 준비

\`\`\`python
import pandas as pd
import numpy as np

raw_orders = pd.DataFrame({
    "Order ID": [1001, 1002, 1003, 1004, 1005, 1006],
    "Customer Name": ["민수", "지영", "철수", "영희", "민수", "수진"],
    "Category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "생활용품"],
    "Order Date": ["2026-01-03", "2026-01-05", "2026-01-07", "2026-01-10", "2026-01-12", "2026-01-15"],
    "Price": ["300000", "15000", "80000", "10000", "12000", "25000"],
    "Quantity": [1, 3, 2, 5, 4, 2],
    "Discount Rate": [0.10, 0.00, 0.05, 0.00, 0.10, 0.05],
    "Region": ["Seoul", "Busan", "Seoul", "Incheon", "busan", "SEOUL"]
})

raw_orders
\`\`\`

---

## 9.8.2 컬럼명 정리

\`\`\`python
orders = raw_orders.copy()

orders.columns = (
    orders.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

orders
\`\`\`

원본을 보존하기 위해 \`copy()\`를 사용했습니다.  
분석 과정에서 원본 데이터를 직접 수정하지 않으면 실수를 줄일 수 있습니다.

---

## 9.8.3 데이터 타입 변환

\`\`\`python
orders["price"] = pd.to_numeric(orders["price"], errors="coerce")
orders["order_date"] = pd.to_datetime(orders["order_date"])

orders.dtypes
\`\`\`

\`price\`는 숫자형으로, \`order_date\`는 날짜형으로 변환했습니다.

---

## 9.8.4 지역명 정리

\`\`\`python
orders["region"] = orders["region"].str.strip().str.title()

orders["region"].unique()
\`\`\`

대소문자가 섞인 지역명을 통일했습니다.

---

## 9.8.5 금액 관련 파생 변수 만들기

\`\`\`python
orders["order_amount"] = orders["price"] * orders["quantity"]
orders["discount_amount"] = orders["order_amount"] * orders["discount_rate"]
orders["final_amount"] = orders["order_amount"] - orders["discount_amount"]

orders
\`\`\`

이제 주문 금액, 할인 금액, 최종 결제 금액을 분석할 수 있습니다.

---

## 9.8.6 무료배송 여부 만들기

최종 결제 금액이 50000원 이상이면 무료배송이라고 가정합니다.

\`\`\`python
orders["free_shipping"] = orders["final_amount"] >= 50000

orders
\`\`\`

문자열 라벨이 필요하다면 다음처럼 만들 수 있습니다.

\`\`\`python
orders["shipping_label"] = np.where(
    orders["free_shipping"],
    "무료배송",
    "배송비 있음"
)

orders
\`\`\`

---

## 9.8.7 주문 등급 만들기

최종 결제 금액 기준으로 주문 등급을 만듭니다.

\`\`\`python
conditions = [
    orders["final_amount"] >= 200000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 50000
]

choices = ["VIP", "Gold", "Silver"]

orders["order_grade"] = np.select(
    conditions,
    choices,
    default="Basic"
)

orders
\`\`\`

---

## 9.8.8 주문 월 컬럼 만들기

날짜형으로 변환한 \`order_date\`에서 주문 월을 추출합니다.

\`\`\`python
orders["order_month"] = orders["order_date"].dt.month

orders
\`\`\`

이 컬럼은 이후 월별 매출 분석에서 사용할 수 있습니다.

---

## 9.8.9 보고용 데이터 만들기

분석 결과를 보기 좋게 정리합니다.

\`\`\`python
report_columns = [
    "order_id",
    "customer_name",
    "category",
    "region",
    "order_date",
    "order_month",
    "order_amount",
    "discount_amount",
    "final_amount",
    "free_shipping",
    "order_grade"
]

order_report = orders[report_columns].sort_values(
    by="final_amount",
    ascending=False
).reset_index(drop=True)

order_report
\`\`\`

이제 \`order_report\`는 분석과 보고에 사용하기 좋은 형태가 되었습니다.

---
`;export{e as default};