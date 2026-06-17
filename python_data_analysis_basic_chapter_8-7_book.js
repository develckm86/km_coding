var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-7 -->

# 8.7 실무 미니 프로젝트: 주문 데이터 순위표 만들기

이번 장에서 배운 내용을 하나로 묶어 간단한 순위표를 만들어보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 주문 데이터를 만든다.
2. 주문일을 날짜형으로 변환한다.
3. 총 주문 금액 기준으로 순위를 만든다.
4. 주문 금액 상위 5건을 추출한다.
5. 리뷰 점수가 낮은 주문을 따로 확인한다.
6. 최종 결과를 보기 좋게 정렬한다.
\`\`\`

---

### 8.7.1 데이터 준비

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008],
    "customer": ["민수", "지영", "철수", "영희", "민수", "지영", "수진", "현우"],
    "category": ["전자기기", "도서", "전자기기", "생활용품", "도서", "전자기기", "생활용품", "도서"],
    "order_date": ["2026-01-03", "2026-01-01", "2026-01-05", "2026-01-02", "2026-01-04", "2026-01-06", "2026-01-07", "2026-01-03"],
    "quantity": [1, 3, 2, 5, 4, 1, 2, 10],
    "total_price": [300000, 45000, 160000, 50000, 60000, 300000, 40000, 150000],
    "review_score": [5, 4, 3, 4, 5, 2, 3, 5]
})

orders
\`\`\`

---

### 8.7.2 주문일을 날짜형으로 변환하기

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

날짜형으로 변환해두면 날짜 기준 정렬과 기간 필터링을 더 안전하게 할 수 있습니다.

---

### 8.7.3 주문 금액 기준 순위 만들기

\`\`\`python
orders["sales_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders
\`\`\`

\`method="dense"\`를 사용하면 같은 금액은 같은 순위를 받고, 다음 순위는 바로 다음 번호가 됩니다.

예를 들어 300000원이 공동 1위라면, 그다음 금액은 2위가 됩니다.

---

### 8.7.4 주문 금액 상위 5건 추출하기

\`\`\`python
top_orders = orders.sort_values(
    by=["sales_rank", "order_date"],
    ascending=[True, False]
).head(5)

top_orders
\`\`\`

이 코드는 다음 기준으로 정렬합니다.

1. \`sales_rank\`가 작은 순서, 즉 높은 순위부터 정렬
2. 같은 순위라면 주문일이 최근인 순서로 정렬
3. 상위 5개 행만 선택

---

### 8.7.5 리뷰 점수가 낮은 주문 확인하기

\`\`\`python
low_review_orders = orders.sort_values(
    by=["review_score", "total_price"],
    ascending=[True, False]
).head(3)

low_review_orders
\`\`\`

이 코드는 리뷰 점수가 낮은 주문을 먼저 보여줍니다.  
리뷰 점수가 같다면 주문 금액이 큰 주문을 먼저 보여줍니다.

리뷰 점수가 낮고 주문 금액이 큰 주문은 특히 주의해서 확인할 필요가 있습니다.  
고객 불만이 크거나 중요한 주문일 가능성이 있기 때문입니다.

---

### 8.7.6 보고용 컬럼만 선택하기

분석 결과를 보고서로 만들 때는 모든 컬럼을 보여줄 필요가 없습니다.  
필요한 컬럼만 선택해서 보기 좋게 정리할 수 있습니다.

\`\`\`python
report_columns = [
    "sales_rank",
    "order_id",
    "customer",
    "category",
    "order_date",
    "total_price",
    "review_score"
]

sales_report = orders[report_columns].sort_values(
    by=["sales_rank", "order_date"],
    ascending=[True, False]
).reset_index(drop=True)

sales_report
\`\`\`

최종 결과는 “주문 금액 순위표”로 사용할 수 있습니다.

---
`;export{e as default};