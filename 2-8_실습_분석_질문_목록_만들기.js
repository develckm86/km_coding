var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.8 실습: 분석 질문 목록 만들기

이제 실습을 시작하겠습니다.

먼저 운영팀의 요청을 분석 질문으로 바꾸어 표로 정리합니다.

---

### 2.8.1 프로젝트 경로 설정

1장에서 만든 프로젝트 폴더를 사용합니다.

\`\`\`python
from pathlib import Path
import pandas as pd

PROJECT_DIR = Path("advanced_data_analysis_project")

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

OUTPUT_TABLES.mkdir(parents=True, exist_ok=True)
OUTPUT_REPORTS.mkdir(parents=True, exist_ok=True)
\`\`\`

---

### 2.8.2 분석 질문 DataFrame 만들기

\`\`\`python
analysis_questions = pd.DataFrame([
    {
        "business_question": "최근 매출이 변한 원인을 알고 싶다",
        "analysis_question": "월별 총매출, 주문 수, 평균 주문 금액은 어떻게 변했는가?",
        "analysis_type": "변화 분석",
        "required_metrics": "총매출, 주문 수, 평균 주문 금액",
        "comparison 기준": "전월 대비"
    },
    {
        "business_question": "최근 매출이 변한 원인을 알고 싶다",
        "analysis_question": "월별 카테고리별 매출 변화는 전체 매출 변화에 어떤 영향을 주었는가?",
        "analysis_type": "기여도 분석",
        "required_metrics": "카테고리별 매출, 매출 비중, 증감액",
        "comparison 기준": "월별 비교"
    },
    {
        "business_question": "VIP 고객이 중요한 고객인지 확인하고 싶다",
        "analysis_question": "VIP 고객의 총매출 기여도와 평균 주문 금액은 일반 고객보다 높은가?",
        "analysis_type": "집단 비교",
        "required_metrics": "VIP 매출 비중, 평균 주문 금액, 주문 수",
        "comparison 기준": "VIP vs 일반"
    },
    {
        "business_question": "전자기기 카테고리에 집중해야 하는지 보고 싶다",
        "analysis_question": "전자기기 카테고리의 매출 비중과 평균 주문 금액은 다른 카테고리보다 높은가?",
        "analysis_type": "카테고리 분석",
        "required_metrics": "카테고리별 매출, 매출 비중, 평균 주문 금액",
        "comparison 기준": "카테고리 간 비교"
    },
    {
        "business_question": "쿠폰이 실제로 효과가 있는지 궁금하다",
        "analysis_question": "쿠폰 사용 주문과 미사용 주문의 평균 주문 금액과 재구매율은 다른가?",
        "analysis_type": "효과 비교",
        "required_metrics": "쿠폰 사용률, 평균 주문 금액, 재구매율",
        "comparison 기준": "쿠폰 사용 vs 미사용"
    }
])

analysis_questions
\`\`\`

컬럼명에 공백이나 한글이 섞여 있어도 pandas에서는 사용할 수 있습니다.  
다만 실무 코드에서는 영문 snake_case 컬럼명을 사용하는 것이 좋습니다.

조금 더 코드 친화적인 컬럼명으로 다시 만들 수도 있습니다.

---

### 2.8.3 코드 친화적 컬럼명으로 만들기

\`\`\`python
analysis_questions = pd.DataFrame([
    {
        "business_question": "최근 매출이 변한 원인을 알고 싶다",
        "analysis_question": "월별 총매출, 주문 수, 평균 주문 금액은 어떻게 변했는가?",
        "analysis_type": "변화 분석",
        "required_metrics": "총매출, 주문 수, 평균 주문 금액",
        "comparison_standard": "전월 대비"
    },
    {
        "business_question": "최근 매출이 변한 원인을 알고 싶다",
        "analysis_question": "월별 카테고리별 매출 변화는 전체 매출 변화에 어떤 영향을 주었는가?",
        "analysis_type": "기여도 분석",
        "required_metrics": "카테고리별 매출, 매출 비중, 증감액",
        "comparison_standard": "월별 비교"
    },
    {
        "business_question": "VIP 고객이 중요한 고객인지 확인하고 싶다",
        "analysis_question": "VIP 고객의 총매출 기여도와 평균 주문 금액은 일반 고객보다 높은가?",
        "analysis_type": "집단 비교",
        "required_metrics": "VIP 매출 비중, 평균 주문 금액, 주문 수",
        "comparison_standard": "VIP vs 일반"
    },
    {
        "business_question": "전자기기 카테고리에 집중해야 하는지 보고 싶다",
        "analysis_question": "전자기기 카테고리의 매출 비중과 평균 주문 금액은 다른 카테고리보다 높은가?",
        "analysis_type": "카테고리 분석",
        "required_metrics": "카테고리별 매출, 매출 비중, 평균 주문 금액",
        "comparison_standard": "카테고리 간 비교"
    },
    {
        "business_question": "쿠폰이 실제로 효과가 있는지 궁금하다",
        "analysis_question": "쿠폰 사용 주문과 미사용 주문의 평균 주문 금액과 재구매율은 다른가?",
        "analysis_type": "효과 비교",
        "required_metrics": "쿠폰 사용률, 평균 주문 금액, 재구매율",
        "comparison_standard": "쿠폰 사용 vs 미사용"
    }
])

analysis_questions
\`\`\`

---

### 2.8.4 분석 질문 저장하기

\`\`\`python
analysis_questions.to_csv(
    OUTPUT_TABLES / "chapter_02_analysis_questions.csv",
    index=False
)
\`\`\`

이제 분석 질문 목록이 파일로 저장되었습니다.

---
`;export{e as default};