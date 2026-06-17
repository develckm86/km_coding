var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.17 2장 실습 과제

이번 장의 과제는 실무 요청을 분석 문제와 KPI 정의서로 바꾸는 것입니다.

---

### 과제 1. 비즈니스 질문 분해하기

다음 요청을 읽고 핵심 주제를 3개 이상으로 분해하세요.

\`\`\`text
최근 매출이 떨어진 것 같습니다.
어떤 고객군에서 문제가 생겼는지 알고 싶고,
어떤 상품군이 매출 하락에 영향을 줬는지도 확인하고 싶습니다.
또 쿠폰을 더 많이 뿌려야 할지도 궁금합니다.
\`\`\`

제출물:

\`\`\`text
비즈니스 질문 분해표
\`\`\`

---

### 과제 2. 분석 질문 만들기

과제 1에서 분해한 주제를 분석 가능한 질문으로 바꾸세요.

최소 5개 이상 작성합니다.

예시:

\`\`\`text
월별 총매출은 전월 대비 어떻게 변했는가?
고객 등급별 매출 감소폭은 어떻게 다른가?
카테고리별 매출 증감률은 어떻게 다른가?
\`\`\`

제출물:

\`\`\`text
analysis_questions.csv
\`\`\`

---

### 과제 3. KPI 정의서 작성하기

다음 KPI 중 5개 이상을 선택해 지표 정의서를 작성하세요.

\`\`\`text
총매출
순매출
주문 수
평균 주문 금액
고유 고객 수
재구매율
카테고리별 매출 비중
전월 대비 매출 성장률
쿠폰 사용률
쿠폰 사용 주문 평균 금액
VIP 매출 비중
\`\`\`

필수 컬럼:

\`\`\`text
metric_name
purpose
formula
base_data
aggregation_unit
filter_condition
interpretation
caution
\`\`\`

제출물:

\`\`\`text
kpi_definition.csv
\`\`\`

---

### 과제 4. 데이터 요구사항 작성하기

각 분석 질문에 필요한 데이터와 컬럼을 정리하세요.

필수 컬럼:

\`\`\`text
analysis_question
required_data
required_columns
join_required
data_quality_checks
\`\`\`

제출물:

\`\`\`text
data_requirements.csv
\`\`\`

---

### 과제 5. 문제 정의 보고서 작성하기

다음 구조로 Markdown 보고서를 작성하세요.

\`\`\`markdown
# 분석 문제 정의 보고서

## 1. 분석 배경

## 2. 분석 목적

## 3. 원본 비즈니스 질문

## 4. 분석 질문

## 5. 핵심 KPI

## 6. 데이터 요구사항

## 7. 분석 범위

## 8. 제외 조건

## 9. 예상 결과물

## 10. 주의사항
\`\`\`

제출물:

\`\`\`text
problem_definition_report.md
\`\`\`

---
`;export{e as default};