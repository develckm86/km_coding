var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-2 -->

# 16.2 예제 데이터 준비

이번 장에서는 고객 주문 데이터를 사용합니다.

\`\`\`python
import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8],
    "region": ["서울", "부산", "서울", "서울", "대전", "부산", "부산", "서울", "대전", "서울"],
    "grade": ["VIP", "일반", "일반", "VIP", "일반", "일반", "VIP", "일반", "일반", "VIP"],
    "age": [34, 28, 41, 34, 25, 28, 39, 45, 31, 52],
    "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1],
    "total_price": [300000, 45000, 50000, 220000, 35000, 60000, 180000, 30000, 75000, 260000],
    "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15],
    "satisfaction": [5, 4, 3, 5, 4, 3, 5, 3, 4, 5]
})

orders
\`\`\`

이 데이터에는 다음 컬럼이 있습니다.

| 컬럼 | 의미 |
|---|---|
| \`order_id\` | 주문 ID |
| \`customer_id\` | 고객 ID |
| \`region\` | 지역 |
| \`grade\` | 고객 등급 |
| \`age\` | 고객 나이 |
| \`quantity\` | 주문 수량 |
| \`total_price\` | 주문 금액 |
| \`visit_count\` | 방문 횟수 |
| \`satisfaction\` | 만족도 점수 |

이번 장에서는 \`age\`, \`quantity\`, \`total_price\`, \`visit_count\`, \`satisfaction\` 같은 수치형 컬럼을 중심으로 통계값을 계산합니다.  
또한 \`region\`, \`grade\` 같은 범주형 컬럼의 빈도와 비율도 확인합니다.

---
`;export{e as default};