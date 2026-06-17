var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-3 -->

# 17.3 예제 데이터 준비

이번 장에서는 주문 데이터를 사용합니다.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울", "서울", "부산"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "VIP"],
    "category": ["전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품", "전자기기", "도서", "생활용품"],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14", "2026-03-01", "2026-03-15", "2026-03-20", "2026-03-22", "2026-04-01", "2026-04-05", "2026-04-08"],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000, 54000, 40000],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5, 3, 5]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date"].dt.day_name()

orders
\`\`\`

이 데이터에는 주문일, 지역, 등급, 카테고리, 주문 금액, 방문 횟수, 만족도 등이 포함되어 있습니다.

시각화 예제를 위해 월별 매출과 카테고리별 매출도 미리 만들어보겠습니다.

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_sales
\`\`\`

\`\`\`python
category_sales = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

---
`;export{e as default};