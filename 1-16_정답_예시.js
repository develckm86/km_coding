var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.16 정답 예시

아래 코드는 이번 장 실습 과제를 수행하는 하나의 예시입니다.

---

### 1.16.1 프로젝트 폴더 생성 정답 예시

\`\`\`python
from pathlib import Path

PROJECT_DIR = Path("advanced_data_analysis_project")

paths = {
    "data_raw": PROJECT_DIR / "data" / "raw",
    "data_processed": PROJECT_DIR / "data" / "processed",
    "notebooks": PROJECT_DIR / "notebooks",
    "output_tables": PROJECT_DIR / "outputs" / "tables",
    "output_charts": PROJECT_DIR / "outputs" / "charts",
    "output_reports": PROJECT_DIR / "outputs" / "reports",
    "src": PROJECT_DIR / "src",
}

for path in paths.values():
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

---

### 1.16.2 README 생성 정답 예시

\`\`\`python
readme_text = '''# 고급 데이터 분석 프로젝트

## 프로젝트 개요

이 프로젝트는 파이썬 데이터 분석 고급 활용 수업의 실습 프로젝트입니다.

## 분석 목적

쇼핑몰 데이터를 사용해 매출, 고객, 상품, 리텐션, 퍼널, 실험 분석을 수행합니다.

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

- 원본 데이터는 data/raw/에 저장합니다.
- 전처리 데이터는 data/processed/에 저장합니다.
- 분석 결과 표는 outputs/tables/에 저장합니다.
- 그래프는 outputs/charts/에 저장합니다.
- 보고서는 outputs/reports/에 저장합니다.

## 사용 도구

- Python
- pandas
- matplotlib
- seaborn

## 예상 결과물

- 분석용 데이터셋
- 요약 테이블
- 그래프
- 분석 보고서
'''

(PROJECT_DIR / "README.md").write_text(readme_text, encoding="utf-8")
\`\`\`

---

### 1.16.3 샘플 데이터 저장 정답 예시

\`\`\`python
import pandas as pd

orders_sample = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "customer_id": [1, 2, 3, 1, 4],
    "product_id": ["P001", "P002", "P003", "P001", "P004"],
    "quantity": [1, 3, 2, 1, 2],
    "coupon_amount": [0, 0, 5000, 10000, 0]
})

products_sample = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초"],
    "category": ["전자기기", "도서", "생활용품", "도서"],
    "unit_price": [300000, 15000, 25000, 17500]
})

customers_sample = pd.DataFrame({
    "customer_id": [1, 2, 3, 4],
    "customer_name": ["김민수", "이지영", "박철수", "최영희"],
    "region": ["서울", "부산", "서울", "대전"],
    "grade": ["VIP", "일반", "일반", "일반"]
})

orders_sample.to_csv(paths["data_raw"] / "orders_sample.csv", index=False)
products_sample.to_csv(paths["data_raw"] / "products_sample.csv", index=False)
customers_sample.to_csv(paths["data_raw"] / "customers_sample.csv", index=False)
\`\`\`

---

### 1.16.4 결과표 생성 정답 예시

\`\`\`python
orders = pd.read_csv(paths["data_raw"] / "orders_sample.csv")
products = pd.read_csv(paths["data_raw"] / "products_sample.csv")

orders_products = orders.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one"
)

orders_products["net_amount"] = (
    orders_products["quantity"] * orders_products["unit_price"]
    - orders_products["coupon_amount"]
)

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

category_summary.to_csv(
    paths["output_tables"] / "category_summary.csv",
    index=False
)
\`\`\`

---

### 1.16.5 그래프 저장 정답 예시

\`\`\`python
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 4))

plt.bar(category_summary["category"], category_summary["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.savefig(
    paths["output_charts"] / "category_sales.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 1.16.6 실습 보고서 생성 정답 예시

\`\`\`python
report_text = '''# 1장 실습 보고서

## 실습 목적

고급 데이터 분석 프로젝트의 기본 폴더 구조를 만들고,
샘플 데이터를 저장한 뒤 간단한 결과표와 그래프를 생성했다.

## 생성한 폴더 구조

- data/raw
- data/processed
- notebooks
- outputs/tables
- outputs/charts
- outputs/reports
- src

## 생성한 데이터

- orders_sample.csv
- products_sample.csv
- customers_sample.csv

## 생성한 결과물

- category_summary.csv
- category_sales.png

## 배운 점

원본 데이터와 결과물을 분리해 관리하는 것이 중요하다.
분석 프로젝트는 코드뿐 아니라 데이터, 표, 그래프, 보고서를 체계적으로 관리해야 한다.
'''

(paths["output_reports"] / "chapter_01_report.md").write_text(
    report_text,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};