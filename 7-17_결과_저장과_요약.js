var e=`# 7장. 누적 지표와 이동평균 분석

## 7.17 결과 저장과 요약

지금까지 만든 주요 결과를 저장합니다.

---

### 7.17.1 일별 매출 전체 결과 저장

\`\`\`python
daily_sales.to_csv(
    OUTPUT_TABLES / "chapter_07_daily_sales_with_rolling.csv",
    index=False
)
\`\`\`

---

### 7.17.2 결과물 요약표 만들기

\`\`\`python
window_summary = pd.DataFrame([
    {
        "output_name": "daily_sales",
        "file_name": "chapter_07_daily_sales.csv",
        "description": "일별 매출, 주문 수, 고유 고객 수"
    },
    {
        "output_name": "daily_sales_with_rolling",
        "file_name": "chapter_07_daily_sales_with_rolling.csv",
        "description": "누적 매출, 이동평균, 변화량이 포함된 일별 매출 데이터"
    },
    {
        "output_name": "monthly_cumulative_sales",
        "file_name": "chapter_07_monthly_cumulative_sales.csv",
        "description": "월별 매출, 누적 매출, 전월 대비 변화량"
    },
    {
        "output_name": "category_cumulative_sales",
        "file_name": "chapter_07_category_cumulative_sales.csv",
        "description": "카테고리별 일별 매출과 누적 매출"
    },
    {
        "output_name": "customer_cumulative_purchase",
        "file_name": "chapter_07_customer_cumulative_purchase.csv",
        "description": "고객별 구매 차수와 누적 구매액"
    },
    {
        "output_name": "sales_change_report",
        "file_name": "chapter_07_sales_change_report.csv",
        "description": "일별 매출 증감액과 증감률"
    }
])

window_summary
\`\`\`

저장합니다.

\`\`\`python
window_summary.to_csv(
    OUTPUT_TABLES / "chapter_07_window_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};