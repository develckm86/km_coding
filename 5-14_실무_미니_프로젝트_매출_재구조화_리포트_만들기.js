var e=`# 5장. 데이터 재구조화 실습

## 5.14 실무 미니 프로젝트: 매출 재구조화 리포트 만들기

이번 장에서 배운 내용을 하나로 묶어 매출 재구조화 리포트를 만들어보겠습니다.

---

### 5.14.1 프로젝트 목표

\`\`\`text
주문 데이터마트를 사용하여
지역별 카테고리 매출,
월별 카테고리 매출,
고객별 월별 구매 금액,
상품 태그 데이터를 재구조화하고
보고용 표와 시각화용 데이터를 구분해 저장한다.
\`\`\`

---

### 5.14.2 Step 1. 지역별 카테고리 피벗

\`\`\`python
region_category_pivot = pd.pivot_table(
    data=orders_mart,
    index="region",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="합계"
)

region_category_pivot_output = region_category_pivot.reset_index()

region_category_pivot_output.to_csv(
    OUTPUT_TABLES / "chapter_05_region_category_pivot.csv",
    index=False
)
\`\`\`

---

### 5.14.3 Step 2. 월별 카테고리 long 데이터

\`\`\`python
monthly_category_long = (
    orders_mart
    .groupby(["year_month", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(["year_month", "category"])
)

monthly_category_long.to_csv(
    OUTPUT_TABLES / "chapter_05_monthly_category_long.csv",
    index=False
)
\`\`\`

---

### 5.14.4 Step 3. 월별 카테고리 피벗

\`\`\`python
monthly_category_pivot = pd.pivot_table(
    data=orders_mart,
    index="year_month",
    columns="category",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

monthly_category_pivot["합계"] = monthly_category_pivot.sum(axis=1)
monthly_category_pivot.loc["합계"] = monthly_category_pivot.sum(axis=0)

monthly_category_pivot.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_05_monthly_category_pivot.csv",
    index=False
)
\`\`\`

---

### 5.14.5 Step 4. 고객별 월별 구매 피벗

\`\`\`python
customer_month_pivot = pd.pivot_table(
    data=orders_mart,
    index=["customer_id", "customer_name"],
    columns="year_month",
    values="net_amount",
    aggfunc="sum",
    fill_value=0
)

customer_month_pivot["총구매액"] = customer_month_pivot.sum(axis=1)

customer_month_pivot = customer_month_pivot.sort_values(
    by="총구매액",
    ascending=False
)

customer_month_pivot.reset_index().to_csv(
    OUTPUT_TABLES / "chapter_05_customer_month_pivot.csv",
    index=False
)
\`\`\`

---

### 5.14.6 Step 5. wide to long 변환

\`\`\`python
wide_sales = pd.DataFrame({
    "category": ["전자기기", "도서", "생활용품"],
    "2026-01": [300000, 45000, 45000],
    "2026-02": [290000, 35000, 0],
    "2026-03": [300000, 30000, 225000],
    "2026-04": [590000, 75000, 50000]
})

long_sales = pd.melt(
    wide_sales,
    id_vars=["category"],
    var_name="year_month",
    value_name="total_sales"
)

wide_sales.to_csv(
    OUTPUT_TABLES / "chapter_05_wide_sales_sample.csv",
    index=False
)

long_sales.to_csv(
    OUTPUT_TABLES / "chapter_05_long_sales_sample.csv",
    index=False
)
\`\`\`

---

### 5.14.7 Step 6. explode 실습

\`\`\`python
product_tags = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004", "P005"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초", "무선 마우스"],
    "tags": [
        ["전자기기", "고가", "업무용"],
        ["도서", "프로그래밍", "입문"],
        ["생활용품", "주방", "저가"],
        ["도서", "데이터", "SQL"],
        ["전자기기", "주변기기", "무선"]
    ]
})

product_tags_exploded = product_tags.explode("tags")

product_tags_exploded.to_csv(
    OUTPUT_TABLES / "chapter_05_exploded_product_tags.csv",
    index=False
)
\`\`\`

---

### 5.14.8 Step 7. 재구조화 결과 요약표

\`\`\`python
reshape_summary = pd.DataFrame([
    {
        "output_name": "region_category_pivot",
        "format": "wide",
        "purpose": "지역별 카테고리 매출 보고용 표",
        "file_name": "chapter_05_region_category_pivot.csv"
    },
    {
        "output_name": "monthly_category_long",
        "format": "long",
        "purpose": "월별 카테고리 매출 시각화용 데이터",
        "file_name": "chapter_05_monthly_category_long.csv"
    },
    {
        "output_name": "monthly_category_pivot",
        "format": "wide",
        "purpose": "월별 카테고리 매출 보고용 표",
        "file_name": "chapter_05_monthly_category_pivot.csv"
    },
    {
        "output_name": "customer_month_pivot",
        "format": "wide",
        "purpose": "고객별 월별 구매 금액 비교표",
        "file_name": "chapter_05_customer_month_pivot.csv"
    },
    {
        "output_name": "long_sales_sample",
        "format": "long",
        "purpose": "wide 데이터를 melt로 변환한 예제",
        "file_name": "chapter_05_long_sales_sample.csv"
    },
    {
        "output_name": "exploded_product_tags",
        "format": "long",
        "purpose": "상품 태그 분석용 데이터",
        "file_name": "chapter_05_exploded_product_tags.csv"
    }
])

reshape_summary
\`\`\`

저장합니다.

\`\`\`python
reshape_summary.to_csv(
    OUTPUT_TABLES / "chapter_05_reshape_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};