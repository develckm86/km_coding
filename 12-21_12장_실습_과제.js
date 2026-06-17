var e=`# 12장. A/B 테스트 분석 실습

## 12.21 12장 실습 과제

이번 장의 과제는 A/B 테스트 데이터를 분석하고 보고서를 작성하는 것입니다.

---

### 과제 1. 실험 데이터 검증

A/B 테스트 데이터에서 다음을 확인하세요.

\`\`\`text
그룹 값 분포
중복 user_id
결측치
converted 값이 0 또는 1인지
purchase_amount가 0 이상인지
\`\`\`

제출물:

\`\`\`text
데이터 검증 결과 요약
\`\`\`

---

### 과제 2. 분석용 데이터 정리

다음 기준으로 데이터를 정리하세요.

\`\`\`text
experiment_group이 control 또는 treatment인 행만 유지
user_id 중복 제거
converted를 정수형으로 변환
purchase_amount를 숫자형으로 변환
\`\`\`

제출물:

\`\`\`text
ab_test_clean.csv
\`\`\`

---

### 과제 3. 그룹 요약표 만들기

그룹별로 다음 지표를 계산하세요.

\`\`\`text
users
converted_users
total_revenue
conversion_rate
revenue_per_user
\`\`\`

제출물:

\`\`\`text
ab_test_group_summary.csv
\`\`\`

---

### 과제 4. Sample Ratio Check

기대 비율이 50:50이라고 가정하고 그룹별 관측 사용자 수와 기대 사용자 수를 비교하세요.

제출물:

\`\`\`text
sample_ratio_check.csv
\`\`\`

---

### 과제 5. 전환율 비교

다음 지표를 계산하세요.

\`\`\`text
control conversion rate
treatment conversion rate
conversion rate difference
relative lift
\`\`\`

제출물:

\`\`\`text
conversion_rate_comparison.csv
\`\`\`

---

### 과제 6. 전환율 차이 검정

두 비율 z-test를 수행하세요.

필수 결과:

\`\`\`text
z_statistic
p_value
95% confidence interval
is_statistically_significant
\`\`\`

제출물:

\`\`\`text
conversion_statistical_result.csv
\`\`\`

---

### 과제 7. 구매 금액 비교

구매자만 대상으로 그룹별 평균 구매 금액과 중앙값을 계산하세요.

제출물:

\`\`\`text
purchase_amount_comparison.csv
\`\`\`

---

### 과제 8. 사용자당 매출 비교

전체 사용자를 기준으로 그룹별 사용자당 매출을 계산하세요.

제출물:

\`\`\`text
revenue_per_user_comparison.csv
\`\`\`

---

### 과제 9. 의사결정 요약

다음 기준을 바탕으로 실험 결과를 요약하세요.

\`\`\`text
Sample Ratio Mismatch가 없는가?
전환율 차이가 양수인가?
전환율 차이가 통계적으로 유의한가?
사용자당 매출이 악화되지 않았는가?
\`\`\`

제출물:

\`\`\`text
ab_test_decision_summary.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# A/B 테스트 분석 보고서

## 1. 분석 목적

## 2. 실험 개요

## 3. 데이터 검증

## 4. 그룹 규모와 Sample Ratio Check

## 5. 전환율 비교

## 6. 전환율 차이 통계 검정

## 7. 구매 금액 비교

## 8. 사용자당 매출 비교

## 9. 의사결정 요약

## 10. 주요 인사이트

## 11. 주의사항

## 12. 다음 단계
\`\`\`

제출물:

\`\`\`text
ab_test_result_report.md
\`\`\`

---
`;export{e as default};