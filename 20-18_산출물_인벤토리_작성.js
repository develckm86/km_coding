var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.18 산출물 인벤토리 작성

프로젝트에서 생성한 산출물을 정리합니다.

---

### 20.18.1 산출물 목록

\`\`\`python
output_inventory = pd.DataFrame([
    {
        "output_type": "raw_data",
        "file_name": "final_project_orders_raw.csv",
        "description": "원본 주문 데이터"
    },
    {
        "output_type": "raw_data",
        "file_name": "final_project_customers_raw.csv",
        "description": "원본 고객 데이터"
    },
    {
        "output_type": "raw_data",
        "file_name": "final_project_products_raw.csv",
        "description": "원본 상품 데이터"
    },
    {
        "output_type": "raw_data",
        "file_name": "final_project_events_raw.csv",
        "description": "원본 이벤트 로그 데이터"
    },
    {
        "output_type": "processed_data",
        "file_name": "final_project_data_mart.csv",
        "description": "분석용 데이터마트"
    },
    {
        "output_type": "processed_data",
        "file_name": "final_project_customer_features.csv",
        "description": "고객별 Feature Table"
    },
    {
        "output_type": "processed_data",
        "file_name": "final_project_rfm_segments.csv",
        "description": "RFM 고객 세그먼트"
    },
    {
        "output_type": "table",
        "file_name": "final_project_sales_summary.csv",
        "description": "매출 요약"
    },
    {
        "output_type": "table",
        "file_name": "final_project_cohort_retention.csv",
        "description": "코호트 리텐션 테이블"
    },
    {
        "output_type": "table",
        "file_name": "final_project_funnel_report.csv",
        "description": "퍼널 분석 리포트"
    },
    {
        "output_type": "chart",
        "file_name": "final_project_dashboard.png",
        "description": "종합 대시보드"
    },
    {
        "output_type": "report",
        "file_name": "final_project_executive_report.md",
        "description": "의사결정자용 최종 보고서"
    },
    {
        "output_type": "report",
        "file_name": "final_project_technical_report.md",
        "description": "분석가용 기술 보고서"
    },
    {
        "output_type": "query",
        "file_name": "final_project_analysis_queries.sql",
        "description": "SQL 검증 쿼리"
    }
])

output_inventory
\`\`\`

저장합니다.

\`\`\`python
output_inventory.to_csv(
    OUTPUT_TABLES / "final_project_output_inventory.csv",
    index=False
)
\`\`\`

---
`;export{e as default};