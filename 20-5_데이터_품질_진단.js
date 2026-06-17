var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.5 데이터 품질 진단

원본 데이터를 만들었으므로 품질을 점검합니다.

---

### 20.5.1 주문 데이터 품질 점검

\`\`\`python
orders_quality = pd.DataFrame([
    {
        "table_name": "orders_raw",
        "check_name": "row_count",
        "check_result": len(orders_raw),
        "issue_count": 0
    },
    {
        "table_name": "orders_raw",
        "check_name": "missing_customer_id",
        "check_result": int(orders_raw["customer_id"].isna().sum()),
        "issue_count": int(orders_raw["customer_id"].isna().sum())
    },
    {
        "table_name": "orders_raw",
        "check_name": "missing_order_date",
        "check_result": int(orders_raw["order_date"].isna().sum()),
        "issue_count": int(orders_raw["order_date"].isna().sum())
    },
    {
        "table_name": "orders_raw",
        "check_name": "negative_net_amount",
        "check_result": int((orders_raw["net_amount"] < 0).sum()),
        "issue_count": int((orders_raw["net_amount"] < 0).sum())
    },
    {
        "table_name": "orders_raw",
        "check_name": "duplicated_order_id",
        "check_result": int(orders_raw["order_id"].duplicated().sum()),
        "issue_count": int(orders_raw["order_id"].duplicated().sum())
    }
])

orders_quality
\`\`\`

---

### 20.5.2 상품 매칭 실패 점검

\`\`\`python
valid_product_ids = set(products_raw["product_id"])

unmatched_product_count = int(
    (~orders_raw["product_id"].isin(valid_product_ids)).sum()
)

product_match_quality = pd.DataFrame([
    {
        "table_name": "orders_raw",
        "check_name": "unmatched_product_id",
        "check_result": unmatched_product_count,
        "issue_count": unmatched_product_count
    }
])
\`\`\`

---

### 20.5.3 품질 진단 결과 저장

\`\`\`python
data_quality_report = pd.concat(
    [orders_quality, product_match_quality],
    ignore_index=True
)

data_quality_report.to_csv(
    OUTPUT_TABLES / "final_project_data_quality_report.csv",
    index=False
)

data_quality_report
\`\`\`

---

### 20.5.4 해석 예시

\`\`\`text
품질 진단 결과 주문일 결측, 고객 ID 결측, 음수 매출, 중복 주문 ID, 상품 매칭 실패가 발견되었다.
분석용 데이터마트를 만들기 전 이러한 문제를 제거하거나 별도로 표시해야 한다.
\`\`\`

---
`;export{e as default};