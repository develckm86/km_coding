var e=`# 4장. 분석용 데이터마트 만들기

## 4.20 전처리 요약표 만들기

전처리 과정에서 데이터가 어떻게 바뀌었는지 요약합니다.

---

### 4.20.1 전처리 단계별 요약

\`\`\`python
preprocessing_summary = pd.DataFrame([
    {
        "step": "원본 주문 데이터",
        "row_count": len(orders_raw),
        "description": "전처리 전 주문 데이터"
    },
    {
        "step": "주문 중복 제거 후",
        "row_count": len(orders),
        "description": "order_id 기준 중복 제거"
    },
    {
        "step": "고객 결합 후",
        "row_count": len(orders_customer),
        "description": "customer_id 기준 고객 정보 결합"
    },
    {
        "step": "상품 결합 후",
        "row_count": len(orders_full),
        "description": "product_id 기준 상품 정보 결합"
    },
    {
        "step": "분석 제외 데이터",
        "row_count": len(excluded_orders),
        "description": "수량 오류, 쿠폰 오류, 상품 정보 없음 등"
    },
    {
        "step": "최종 데이터마트",
        "row_count": len(orders_mart),
        "description": "매출 분석 가능 주문 데이터"
    }
])

preprocessing_summary
\`\`\`

저장합니다.

\`\`\`python
preprocessing_summary.to_csv(
    OUTPUT_TABLES / "chapter_04_preprocessing_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};