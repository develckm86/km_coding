var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.12 실습: 프로젝트 초기 환경 만들기

이제 이번 장의 전체 실습을 하나의 흐름으로 수행해보겠습니다.

---

### 1.12.1 Step 1. 프로젝트 폴더 만들기

\`\`\`python
from pathlib import Path

PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"
NOTEBOOKS = PROJECT_DIR / "notebooks"
OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_CHARTS = PROJECT_DIR / "outputs" / "charts"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"
SRC_DIR = PROJECT_DIR / "src"

folders = [
    DATA_RAW,
    DATA_PROCESSED,
    NOTEBOOKS,
    OUTPUT_TABLES,
    OUTPUT_CHARTS,
    OUTPUT_REPORTS,
    SRC_DIR
]

for folder in folders:
    folder.mkdir(parents=True, exist_ok=True)
\`\`\`

---

### 1.12.2 Step 2. README 만들기

\`\`\`python
readme_text = '''# 고급 데이터 분석 프로젝트

## 프로젝트 개요

이 프로젝트는 파이썬 데이터 분석 고급 활용 수업에서 사용하는 실습 프로젝트입니다.

## 폴더 구조

\`\`\`text
advanced_data_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    tables/
    charts/
    reports/
  src/
  README.md
\`\`\`

## 데이터 관리 규칙

- 원본 데이터는 data/raw/에 저장한다.
- 전처리 데이터는 data/processed/에 저장한다.
- 분석 결과 표는 outputs/tables/에 저장한다.
- 그래프는 outputs/charts/에 저장한다.
- 보고서는 outputs/reports/에 저장한다.

## 분석 주제

- 매출 분석
- 고객 분석
- 상품 분석
- RFM 분석
- 리텐션 분석
- A/B 테스트 분석
- 퍼널 분석
- 리포트 자동화
'''

(PROJECT_DIR / "README.md").write_text(readme_text, encoding="utf-8")
\`\`\`

---

### 1.12.3 Step 3. 샘플 데이터 만들기

\`\`\`python
import pandas as pd

orders_sample = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "order_date": ["2026-01-03", "2026-01-05", "2026-01-10", "2026-02-02", "2026-02-14"],
    "customer_id": [1, 2, 3, 1, 4],
    "product_id": ["P001", "P002", "P003", "P001", "P004"],
    "quantity": [1, 3, 2, 1, 2],
    "coupon_amount": [0, 0, 5000, 10000, None]
})

customers_sample = pd.DataFrame({
    "customer_id": [1, 2, 3, 4],
    "customer_name": [" 김민수", "이지영 ", "박철수", "최영희"],
    "region": ["서울특별시", "부산광역시", "서울시", "대전광역시"],
    "grade": ["VIP", "일반", "일반", "일반"],
    "signup_date": ["2025-12-01", "2026-01-01", "2026-01-08", "2026-02-01"],
    "visit_count": [12, 5, 7, 3]
})

products_sample = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})
\`\`\`

---

### 1.12.4 Step 4. 샘플 데이터 저장하기

\`\`\`python
orders_sample.to_csv(DATA_RAW / "orders_sample.csv", index=False)
customers_sample.to_csv(DATA_RAW / "customers_sample.csv", index=False)
products_sample.to_csv(DATA_RAW / "products_sample.csv", index=False)
\`\`\`

---

### 1.12.5 Step 5. 데이터 다시 불러오기

\`\`\`python
orders = pd.read_csv(DATA_RAW / "orders_sample.csv")
customers = pd.read_csv(DATA_RAW / "customers_sample.csv")
products = pd.read_csv(DATA_RAW / "products_sample.csv")
\`\`\`

---

### 1.12.6 Step 6. 데이터 구조 확인하기

\`\`\`python
print("orders:", orders.shape)
print("customers:", customers.shape)
print("products:", products.shape)
\`\`\`

\`\`\`python
orders.head()
\`\`\`

\`\`\`python
customers.head()
\`\`\`

\`\`\`python
products.head()
\`\`\`

---

### 1.12.7 Step 7. 간단한 분석 결과표 만들기

상품 정보를 주문 데이터에 붙이고 주문 금액을 계산해봅니다.

\`\`\`python
orders_products = orders.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one"
)

orders_products["coupon_amount"] = orders_products["coupon_amount"].fillna(0)

orders_products["net_amount"] = (
    orders_products["quantity"] * orders_products["unit_price"]
    - orders_products["coupon_amount"]
)

orders_products
\`\`\`

카테고리별 매출을 계산합니다.

\`\`\`python
category_summary = (
    orders_products
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_summary
\`\`\`

---

### 1.12.8 Step 8. 결과표 저장하기

\`\`\`python
category_summary.to_csv(
    OUTPUT_TABLES / "chapter_01_category_summary.csv",
    index=False
)
\`\`\`

---

### 1.12.9 Step 9. 그래프 저장하기

\`\`\`python
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 4))

plt.bar(category_summary["category"], category_summary["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.savefig(
    OUTPUT_CHARTS / "chapter_01_category_sales.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 1.12.10 Step 10. 실습 보고서 저장하기

\`\`\`python
report_text = '''# 1장 실습 보고서

## 1. 실습 목적

고급 데이터 분석 프로젝트를 위한 기본 폴더 구조를 만들고,
샘플 데이터를 저장한 뒤 간단한 분석 결과를 생성했다.

## 2. 생성한 폴더 구조

- data/raw
- data/processed
- notebooks
- outputs/tables
- outputs/charts
- outputs/reports
- src

## 3. 생성한 데이터

- orders_sample.csv
- customers_sample.csv
- products_sample.csv

## 4. 생성한 결과물

- chapter_01_category_summary.csv
- chapter_01_category_sales.png

## 5. 정리

원본 데이터와 결과물을 분리해 관리할 수 있는 프로젝트 구조를 준비했다.
앞으로 모든 장의 실습 결과는 이 구조를 기반으로 저장한다.
'''

(OUTPUT_REPORTS / "chapter_01_project_setup_report.md").write_text(
    report_text,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};