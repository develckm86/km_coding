var e=`<!-- 원본: python_data_analysis_basic_chapter_15_book.md / 세부 장: 15-3 -->

# 15.3 예제 데이터 준비

이번 장에서는 주문 데이터, 고객 데이터, 상품 데이터를 사용합니다.

\`\`\`python
import pandas as pd
\`\`\`

먼저 1월 주문 데이터와 2월 주문 데이터를 만들어보겠습니다.

\`\`\`python
orders_jan = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10"],
    "customer_id": [1, 2, 3],
    "product_id": ["P001", "P002", "P003"],
    "quantity": [1, 3, 2],
    "total_price": [300000, 45000, 50000]
})

orders_feb = pd.DataFrame({
    "order_id": [1004, 1005, 1006],
    "order_date": ["2026-02-02", "2026-02-14", "2026-02-20"],
    "customer_id": [1, 4, 2],
    "product_id": ["P001", "P004", "P003"],
    "quantity": [1, 2, 4],
    "total_price": [220000, 35000, 60000]
})
\`\`\`

고객 데이터입니다.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "customer_name": ["민수", "지영", "철수", "영희", "수진"],
    "region": ["서울", "부산", "서울", "대전", "부산"],
    "grade": ["VIP", "일반", "일반", "일반", "VIP"]
})
\`\`\`

상품 데이터입니다.

\`\`\`python
products = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 책", "머그컵", "SQL 책"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

각 데이터를 확인합니다.

\`\`\`python
orders_jan
orders_feb
customers
products
\`\`\`

이제 이 데이터들을 결합해 분석용 주문 데이터를 만들어보겠습니다.

---
`;export{e as default};