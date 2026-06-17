var e=`# 9장. 복잡한 데이터 결합 실습

## 9.13 결합 결과 통합 검증

복잡한 결합을 수행한 뒤에는 결과를 통합적으로 검증해야 합니다.

---

### 9.13.1 검증 항목

이번 장에서 검증할 항목은 다음과 같습니다.

\`\`\`text
결합 전후 행 수 유지 여부
매칭 실패 key 존재 여부
가격 이력 매칭 실패 여부
고객 등급 이력 매칭 실패 여부
매출 계산 가능 여부
광고비 매칭 실패 여부
\`\`\`

---

### 9.13.2 통합 검증표 만들기

\`\`\`python
advanced_join_summary = pd.DataFrame([
    {
        "check_name": "고객 마스터 결합 행 수 유지",
        "result": len(orders_customer) == len(orders),
        "detail": f"{len(orders)} -> {len(orders_customer)}"
    },
    {
        "check_name": "상품 마스터 결합 행 수 유지",
        "result": len(orders_product) == len(orders_customer),
        "detail": f"{len(orders_customer)} -> {len(orders_product)}"
    },
    {
        "check_name": "상품 마스터 매칭 실패 수",
        "result": int((orders_product['_merge'] == 'left_only').sum()) == 1,
        "detail": f"{int((orders_product['_merge'] == 'left_only').sum())}건"
    },
    {
        "check_name": "지점별 가격 결합 행 수 유지",
        "result": len(orders_store_price) == len(orders),
        "detail": f"{len(orders)} -> {len(orders_store_price)}"
    },
    {
        "check_name": "가격 이력 매칭 실패 수",
        "result": len(price_history_join_check) >= 0,
        "detail": f"{len(price_history_join_check)}건"
    },
    {
        "check_name": "고객 등급 이력 매칭 실패 수",
        "result": len(grade_history_join_check) >= 0,
        "detail": f"{len(grade_history_join_check)}건"
    },
    {
        "check_name": "광고비 결합 행 수",
        "result": len(sales_ad_joined) == len(campaign_monthly_sales),
        "detail": f"{len(campaign_monthly_sales)} -> {len(sales_ad_joined)}"
    }
])

advanced_join_summary
\`\`\`

---

### 9.13.3 저장하기

\`\`\`python
advanced_join_summary.to_csv(
    OUTPUT_TABLES / "chapter_09_advanced_join_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};