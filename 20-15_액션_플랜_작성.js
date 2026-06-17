var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.15 액션 플랜 작성

분석 결과를 실행 가능한 액션으로 연결합니다.

---

### 20.15.1 액션 플랜 예시

\`\`\`python
top_category = category_sales.iloc[0]["product_category"]

highest_dropoff_step = (
    funnel_report
    .sort_values("dropoff_rate", ascending=False)
    .iloc[0]
)

action_plan = pd.DataFrame([
    {
        "area": "매출",
        "finding": f"{top_category} 카테고리가 매출을 주도",
        "recommended_action": "상위 카테고리의 주문 수, 평균 주문 금액, 재구매율을 추가 분석하고 프로모션 우선순위를 검토한다.",
        "priority": "High"
    },
    {
        "area": "고객",
        "finding": "RFM 기준 핵심 고객과 이탈 위험 고객이 구분됨",
        "recommended_action": "핵심 고객에는 유지 혜택을 제공하고, 이탈 위험 고객에는 복귀 캠페인을 설계한다.",
        "priority": "High"
    },
    {
        "area": "리텐션",
        "finding": "첫 구매 후 다음 달 리텐션 관리 필요",
        "recommended_action": "첫 구매 후 7일, 14일, 30일 시점의 재구매 유도 메시지를 테스트한다.",
        "priority": "Medium"
    },
    {
        "area": "퍼널",
        "finding": f"{highest_dropoff_step['step_name']} 단계 이탈률이 높음",
        "recommended_action": "해당 단계의 UX, 가격 정보, 배송비, 결제 오류 로그를 점검하고 개선안을 A/B 테스트한다.",
        "priority": "High"
    }
])

action_plan
\`\`\`

저장합니다.

\`\`\`python
action_plan.to_csv(
    OUTPUT_TABLES / "final_project_action_plan.csv",
    index=False
)
\`\`\`

---
`;export{e as default};