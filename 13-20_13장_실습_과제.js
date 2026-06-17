var e=`# 13장. 회귀분석 실습

## 13.20 13장 실습 과제

이번 장의 과제는 고객 Feature Table을 사용해 회귀분석 보고서를 만드는 것입니다.

---

### 과제 1. 회귀분석용 데이터셋 만들기

고객 Feature Table에서 다음 컬럼을 선택해 회귀분석용 데이터셋을 만드세요.

\`\`\`text
customer_id
total_purchase
visit_count
order_count
coupon_usage_rate
days_since_last_order
category_count
customer_grade
main_category
region
\`\`\`

결측치를 처리하고 저장하세요.

제출물:

\`\`\`text
regression_feature_dataset.csv
\`\`\`

---

### 과제 2. 산점도와 상관관계 확인

다음을 수행하세요.

\`\`\`text
visit_count와 total_purchase 산점도 작성
수치형 변수와 total_purchase의 상관관계 계산
\`\`\`

제출물:

\`\`\`text
scatter_visit_purchase.png
correlation_summary.csv
\`\`\`

---

### 과제 3. 단순 선형회귀

다음 모델을 적합하세요.

\`\`\`text
total_purchase ~ visit_count
\`\`\`

제출물:

\`\`\`text
simple_regression_result.csv
simple_regression_line.png
\`\`\`

---

### 과제 4. 다중 회귀분석

다음 모델을 적합하세요.

\`\`\`text
total_purchase ~ visit_count + order_count + coupon_usage_rate + days_since_last_order + category_count
\`\`\`

제출물:

\`\`\`text
multiple_regression_result.csv
\`\`\`

---

### 과제 5. 범주형 변수 포함 회귀분석

다음 모델을 적합하세요.

\`\`\`text
total_purchase ~ visit_count + order_count + coupon_usage_rate + days_since_last_order + category_count + C(customer_grade) + C(main_category)
\`\`\`

제출물:

\`\`\`text
categorical_regression_result.csv
\`\`\`

---

### 과제 6. 모델 비교표 만들기

단순 회귀, 다중 회귀, 범주형 포함 모델을 비교하세요.

필수 컬럼:

\`\`\`text
model_name
formula
r_squared
adj_r_squared
aic
bic
\`\`\`

제출물:

\`\`\`text
model_comparison_summary.csv
\`\`\`

---

### 과제 7. 예측값과 잔차 계산

최종 모델의 예측값과 잔차를 계산하세요.

필수 컬럼:

\`\`\`text
customer_id
total_purchase
predicted_total_purchase
residual
\`\`\`

제출물:

\`\`\`text
prediction_sample.csv
\`\`\`

---

### 과제 8. 잔차 진단

잔차의 평균, 중앙값, 표준편차, 최소값, 최대값, 평균 절대 오차를 계산하세요.

제출물:

\`\`\`text
residual_diagnostics.csv
\`\`\`

---

### 과제 9. 그래프 작성

다음 그래프를 작성하고 저장하세요.

\`\`\`text
방문 횟수와 총구매액 산점도
단순 회귀선 그래프
실제값과 예측값 비교 그래프
예측값과 잔차 그래프
회귀 계수 막대 그래프
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 회귀분석 실습 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 분석 질문

## 4. 산점도와 상관관계

## 5. 단순 선형회귀 결과

## 6. 다중 회귀분석 결과

## 7. 범주형 변수 포함 모델

## 8. 모델 비교

## 9. 예측값과 잔차

## 10. 주요 인사이트

## 11. 주의사항

## 12. 다음 단계
\`\`\`

제출물:

\`\`\`text
regression_analysis_report.md
\`\`\`

---
`;export{e as default};