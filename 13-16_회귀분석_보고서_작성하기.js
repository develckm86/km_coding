var e=`# 13장. 회귀분석 실습

## 13.16 회귀분석 보고서 작성하기

이번 장의 분석 결과를 Markdown 보고서로 정리합니다.

---

### 13.16.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. 분석 질문
4. 산점도와 상관관계
5. 단순 선형회귀 결과
6. 다중 회귀분석 결과
7. 범주형 변수 포함 모델
8. 모델 비교
9. 예측값과 잔차
10. 주요 인사이트
11. 주의사항
12. 다음 단계
\`\`\`

---

### 13.16.2 보고서 작성 코드

\`\`\`python
regression_report = f'''# 13장 실습 보고서: 회귀분석 실습

## 1. 분석 목적

본 실습은 고객 Feature Table을 사용해 고객 총구매액과 관련 있는 변수를 회귀분석으로 확인하는 것을 목적으로 한다.
방문 횟수, 주문 횟수, 쿠폰 사용률, 최근 구매 후 경과일, 구매 카테고리 수, 고객 등급, 주 구매 카테고리를 설명 변수로 사용했다.

## 2. 사용 데이터

- 입력 데이터: chapter_10_customer_feature_table.csv 또는 수업용 고객 Feature Table
- 분석 단위: 고객
- 결과 변수: total_purchase
- 주요 설명 변수: visit_count, order_count, coupon_usage_rate, days_since_last_order, category_count, customer_grade, main_category

분석용 데이터 파일:
- chapter_13_regression_feature_dataset.csv

## 3. 분석 질문

1. 방문 횟수가 많을수록 총구매액이 높은가?
2. 주문 횟수, 쿠폰 사용률, 최근 구매 후 경과일 등을 함께 고려해도 방문 횟수와 총구매액의 관계가 유지되는가?
3. 고객 등급과 주 구매 카테고리는 총구매액과 어떤 관계가 있는가?
4. 회귀 모델은 총구매액 변동을 어느 정도 설명하는가?
5. 모델이 잘 설명하지 못하는 고객은 누구인가?

## 4. 산점도와 상관관계

방문 횟수와 총구매액의 산점도를 확인하고, 주요 수치형 변수와 total_purchase의 상관관계를 계산했다.

결과 파일:
- chapter_13_correlation_summary.csv

그래프:
- chapter_13_scatter_visit_purchase.png

해석:
상관관계는 선형 관계의 방향과 강도를 보여주지만 인과관계를 의미하지 않는다.

## 5. 단순 선형회귀 결과

단순 회귀 모델은 total_purchase를 visit_count 하나로 설명했다.

모델식:
- total_purchase ~ visit_count

R-squared:
- {round(simple_model.rsquared, 4)}

결과 파일:
- chapter_13_simple_regression_result.csv

그래프:
- chapter_13_simple_regression_line.png

해석:
visit_count 계수가 양수라면 방문 횟수가 많은 고객일수록 총구매액이 높은 경향이 있다고 볼 수 있다.
다만 이 모델은 다른 변수를 통제하지 않는다.

## 6. 다중 회귀분석 결과

다중 회귀 모델은 여러 수치형 변수를 함께 사용했다.

모델식:
- {multiple_formula}

R-squared:
- {round(multiple_model.rsquared, 4)}

Adjusted R-squared:
- {round(multiple_model.rsquared_adj, 4)}

결과 파일:
- chapter_13_multiple_regression_result.csv

해석:
다중 회귀에서는 다른 변수가 일정하다고 가정할 때 각 변수와 total_purchase의 관계를 해석한다.

## 7. 범주형 변수 포함 모델

고객 등급과 주 구매 카테고리를 범주형 변수로 포함했다.

모델식:
- {categorical_formula}

R-squared:
- {round(categorical_model.rsquared, 4)}

Adjusted R-squared:
- {round(categorical_model.rsquared_adj, 4)}

결과 파일:
- chapter_13_categorical_regression_result.csv

해석:
C(customer_grade)[T.VIP] 같은 계수는 기준 등급과 비교한 VIP 고객의 평균 차이를 의미한다.
범주형 변수의 계수는 기준 범주와 비교해 해석해야 한다.

## 8. 모델 비교

단순 회귀, 다중 회귀, 범주형 변수를 포함한 회귀 모델을 비교했다.

결과 파일:
- chapter_13_model_comparison_summary.csv

해석:
모델을 비교할 때는 R-squared뿐 아니라 Adjusted R-squared, 해석 가능성, 변수 수, 분석 목적을 함께 고려해야 한다.

## 9. 예측값과 잔차

최종 모델을 사용해 예측값과 잔차를 계산했다.

결과 파일:
- chapter_13_prediction_sample.csv
- chapter_13_residual_diagnostics.csv

그래프:
- chapter_13_actual_vs_predicted.png
- chapter_13_residual_plot.png

해석:
잔차가 큰 고객은 모델이 잘 설명하지 못하는 고객이다.
이 고객들은 모델에 포함되지 않은 추가 요인의 영향을 받았을 수 있다.

## 10. 주요 인사이트

- 방문 횟수와 주문 횟수는 총구매액과 양의 관계를 보일 수 있다.
- 최근 구매 후 경과일은 총구매액과 음의 관계를 보일 수 있다.
- 고객 등급과 주 구매 카테고리는 총구매액 차이를 설명하는 데 도움이 될 수 있다.
- 여러 변수를 함께 고려하면 단순 상관관계와 다른 해석이 나올 수 있다.
- 회귀분석은 고객 구매액에 영향을 줄 수 있는 원인 후보를 탐색하는 데 유용하다.

## 11. 주의사항

- 회귀분석은 인과관계를 자동으로 증명하지 않는다.
- 계수는 선형 관계를 가정한 평균적 관계다.
- 이상값은 회귀 계수에 영향을 줄 수 있다.
- 변수 간 상관이 높으면 계수 해석이 불안정해질 수 있다.
- p-value는 실무적 중요도를 의미하지 않는다.
- 범주형 변수의 계수는 기준 범주와 비교해서 해석해야 한다.
- 모델에 포함되지 않은 중요한 변수가 있으면 결과 해석이 제한된다.

## 12. 다음 단계

다음 장에서는 RFM 고객 분석 실습을 진행한다.
이번 장에서 만든 고객 Feature Table과 날짜 기반 변수를 활용해 Recency, Frequency, Monetary를 계산하고 고객을 세그먼트로 나눈다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_13_regression_analysis_report.md").write_text(
    regression_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};