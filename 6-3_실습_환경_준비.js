var e=`# 6장. 고급 groupby 분석 리포트

## 6.3 실습 환경 준비

이번 장에서도 4장에서 만든 데이터마트를 사용합니다.

---

### 6.3.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
\`\`\`

---

### 6.3.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

---

### 6.3.3 데이터마트 불러오기

4장에서 만든 데이터마트가 있으면 불러옵니다.  
파일이 없으면 이번 장에서 사용할 샘플 데이터를 만듭니다.

\`\`\`python
mart_path = DATA_PROCESSED / "chapter_04_orders_mart.csv"

if mart_path.exists():
    orders_mart = pd.read_csv(mart_path)
else:
    orders_mart = pd.DataFrame({
        "order_id": [
            1001, 1002, 1003, 1004, 1005,
            1006, 1007, 1008, 1009, 1010,
            1011, 1012, 1013, 1014, 1015
        ],
        "order_date_dt": [
            "2026-01-03", "2026-01-05", "2026-01-10",
            "2026-02-02", "2026-02-14", "2026-03-01",
            "2026-03-15", "2026-03-20", "2026-03-22",
            "2026-04-01", "2026-04-05", "2026-04-08",
            "2026-04-15", "2026-04-20", "2026-04-25"
        ],
        "year_month": [
            "2026-01", "2026-01", "2026-01",
            "2026-02", "2026-02", "2026-03",
            "2026-03", "2026-03", "2026-03",
            "2026-04", "2026-04", "2026-04",
            "2026-04", "2026-04", "2026-04"
        ],
        "customer_id": [1, 2, 3, 1, 4, 2, 5, 6, 7, 8, 3, 5, 9, 10, 2],
        "customer_name": [
            "김민수", "이지영", "박철수", "김민수", "최영희",
            "이지영", "정수진", "강현우", "오도윤", "한서연",
            "박철수", "정수진", "윤하준", "문유나", "이지영"
        ],
        "region": [
            "서울", "부산", "서울", "서울", "대전",
            "부산", "부산", "서울", "대전", "서울",
            "서울", "부산", "대전", "서울", "부산"
        ],
        "grade": [
            "VIP", "일반", "일반", "VIP", "일반",
            "일반", "VIP", "일반", "일반", "VIP",
            "일반", "VIP", "일반", "VIP", "일반"
        ],
        "product_id": [
            "P001", "P002", "P003", "P001", "P004",
            "P003", "P001", "P002", "P003", "P001",
            "P002", "P003", "P005", "P002", "P001"
        ],
        "product_name": [
            "노트북", "파이썬 입문서", "머그컵", "노트북", "SQL 기초",
            "머그컵", "노트북", "파이썬 입문서", "머그컵", "노트북",
            "파이썬 입문서", "머그컵", "무선 마우스", "파이썬 입문서", "노트북"
        ],
        "category": [
            "전자기기", "도서", "생활용품", "전자기기", "도서",
            "생활용품", "전자기기", "도서", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "전자기기"
        ],
        "quantity": [1, 3, 2, 1, 2, 4, 1, 2, 5, 1, 3, 2, 1, 2, 1],
        "net_amount": [
            300000, 45000, 45000, 290000, 35000,
            100000, 300000, 30000, 125000, 280000,
            45000, 50000, 20000, 30000, 290000
        ],
        "used_coupon": [
            False, False, True, True, False,
            False, False, False, False, True,
            False, False, True, False, True
        ],
        "visit_count": [12, 5, 7, 12, 3, 5, 10, 4, 6, 15, 7, 10, 8, 11, 5]
    })

orders_mart.head()
\`\`\`

---

### 6.3.4 날짜형 변환

\`\`\`python
orders_mart["order_date_dt"] = pd.to_datetime(
    orders_mart["order_date_dt"],
    errors="coerce"
)

orders_mart["year_month"] = orders_mart["order_date_dt"].dt.to_period("M").astype(str)
\`\`\`

---

### 6.3.5 데이터 구조 확인

\`\`\`python
orders_mart.shape
\`\`\`

\`\`\`python
orders_mart.info()
\`\`\`

\`\`\`python
orders_mart.head()
\`\`\`

이번 장에서 주로 사용할 컬럼은 다음과 같습니다.

\`\`\`text
order_id
year_month
customer_id
customer_name
region
grade
product_id
product_name
category
quantity
net_amount
used_coupon
visit_count
\`\`\`

---
`;export{e as default};