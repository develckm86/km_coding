var e=`# 11장. 통계적 비교 실습

## 11.22 11장 실습 과제

이번 장의 과제는 고객 Feature Table을 사용해 통계적 비교 리포트를 만드는 것입니다.

---

### 과제 1. 그룹별 표본 수 확인

다음 그룹 변수별 표본 수를 확인하세요.

\`\`\`text
customer_grade
is_coupon_user
is_repeat_customer
main_category
value_segment
\`\`\`

제출물:

\`\`\`text
group_size_summary.csv
\`\`\`

---

### 과제 2. 고객 등급별 구매액 비교

\`customer_grade\`별 \`total_purchase\`에 대해 다음 지표를 계산하세요.

\`\`\`text
customer_count
mean_value
median_value
std_value
min_value
q1_value
q3_value
max_value
\`\`\`

제출물:

\`\`\`text
grade_comparison_summary.csv
\`\`\`

---

### 과제 3. 쿠폰 사용 여부별 구매액 비교

\`is_coupon_user\`별 \`total_purchase\`를 비교하세요.

제출물:

\`\`\`text
coupon_user_comparison_summary.csv
\`\`\`

---

### 과제 4. 재구매 여부별 평균 주문 금액 비교

\`is_repeat_customer\`별 \`avg_order_amount\`를 비교하세요.

제출물:

\`\`\`text
repeat_customer_comparison_summary.csv
\`\`\`

---

### 과제 5. 주 구매 카테고리별 구매액 비교

\`main_category\`별 \`total_purchase\`를 비교하세요.

제출물:

\`\`\`text
main_category_comparison_summary.csv
\`\`\`

---

### 과제 6. 박스플롯 작성

다음 그래프를 작성하고 저장하세요.

\`\`\`text
고객 등급별 총구매액 박스플롯
쿠폰 사용 여부별 총구매액 박스플롯
재구매 여부별 평균 주문 금액 박스플롯
\`\`\`

---

### 과제 7. 부트스트랩 평균 차이

VIP 고객과 일반 고객의 \`total_purchase\` 평균 차이에 대해 부트스트랩을 수행하세요.

조건:

\`\`\`text
반복 횟수: 1000회
random_state: 42
\`\`\`

제출물:

\`\`\`text
bootstrap_mean_diff.csv
\`\`\`

---

### 과제 8. 신뢰구간 계산

부트스트랩 결과를 사용해 95% 신뢰구간을 계산하세요.

제출물:

\`\`\`text
confidence_interval_summary.csv
\`\`\`

---

### 과제 9. t-test 수행

VIP 고객과 일반 고객의 \`total_purchase\`에 대해 Welch t-test를 수행하세요.

제출물:

\`\`\`text
ttest_result.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 통계적 비교 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 비교 질문

## 4. 그룹별 표본 수

## 5. 고객 등급별 구매액 비교

## 6. 쿠폰 사용 여부별 구매액 비교

## 7. 재구매 여부별 평균 주문 금액 비교

## 8. 주 구매 카테고리별 구매액 비교

## 9. 부트스트랩 평균 차이와 신뢰구간

## 10. t-test 결과

## 11. 주요 인사이트

## 12. 주의사항

## 13. 다음 단계
\`\`\`

제출물:

\`\`\`text
statistical_comparison_report.md
\`\`\`

---
`;export{e as default};