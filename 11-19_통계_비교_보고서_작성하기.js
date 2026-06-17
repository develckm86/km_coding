var e=`# 11장. 통계적 비교 실습

## 11.19 통계 비교 보고서 작성하기

이번 장의 분석 결과를 Markdown 보고서로 정리합니다.

---

### 11.19.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. 비교 질문
4. 그룹별 표본 수
5. 고객 등급별 구매액 비교
6. 쿠폰 사용 여부별 구매액 비교
7. 재구매 여부별 평균 주문 금액 비교
8. 주 구매 카테고리별 구매액 비교
9. 부트스트랩 평균 차이와 신뢰구간
10. t-test 결과
11. 비율 비교
12. 주요 인사이트
13. 주의사항
14. 다음 단계
\`\`\`

---

### 11.19.2 보고서 작성 코드

\`\`\`python
statistical_comparison_report = f'''# 11장 실습 보고서: 통계적 비교 실습

## 1. 분석 목적

본 실습은 고객 Feature Table을 사용해 주요 고객 집단 간 구매 특성 차이를 비교하는 것을 목적으로 한다.
단순 평균 비교뿐 아니라 표본 수, 중앙값, 분포, 부트스트랩 신뢰구간, t-test 결과를 함께 확인한다.

## 2. 사용 데이터

- 입력 데이터: chapter_10_customer_feature_table.csv 또는 수업용 고객 Feature Table
- 분석 단위: 고객
- 주요 비교 변수: customer_grade, is_coupon_user, is_repeat_customer, main_category, value_segment
- 주요 결과 변수: total_purchase, avg_order_amount, order_count

## 3. 비교 질문

1. VIP 고객과 일반 고객의 총구매액은 다른가?
2. 쿠폰 사용 고객과 미사용 고객의 총구매액은 다른가?
3. 재구매 고객과 1회 구매 고객의 평균 주문 금액은 다른가?
4. 주 구매 카테고리별 총구매액은 다른가?
5. 고객 등급별 재구매율은 다른가?

## 4. 그룹별 표본 수

그룹별 표본 수를 먼저 확인했다.
표본 수가 적은 그룹은 평균과 비율 해석에 주의해야 한다.

결과 파일:
- chapter_11_group_size_summary.csv

## 5. 고객 등급별 구매액 비교

VIP 고객과 일반 고객의 total_purchase를 비교했다.
평균, 중앙값, 표준편차, 사분위수를 함께 확인했다.

결과 파일:
- chapter_11_grade_comparison_summary.csv

그래프:
- chapter_11_grade_boxplot.png

## 6. 쿠폰 사용 여부별 구매액 비교

쿠폰 사용자와 미사용자의 total_purchase를 비교했다.

결과 파일:
- chapter_11_coupon_user_comparison_summary.csv

그래프:
- chapter_11_coupon_user_boxplot.png

해석:
쿠폰 사용 고객의 구매액이 높게 나타나더라도 쿠폰이 구매액 증가의 원인이라고 단정할 수 없다.
쿠폰 효과를 확인하려면 A/B 테스트가 필요하다.

## 7. 재구매 여부별 평균 주문 금액 비교

재구매 고객과 1회 구매 고객의 avg_order_amount를 비교했다.

결과 파일:
- chapter_11_repeat_customer_comparison_summary.csv

그래프:
- chapter_11_repeat_customer_boxplot.png

## 8. 주 구매 카테고리별 구매액 비교

main_category별 total_purchase를 비교했다.

결과 파일:
- chapter_11_main_category_comparison_summary.csv

그래프:
- chapter_11_group_mean_bar.png

## 9. 부트스트랩 평균 차이와 신뢰구간

VIP 고객과 일반 고객의 total_purchase 평균 차이를 부트스트랩으로 확인했다.

관찰된 평균 차이:
- {round(observed_mean_diff, 1)}

95% 신뢰구간:
- {round(ci_lower, 1)} ~ {round(ci_upper, 1)}

결과 파일:
- chapter_11_bootstrap_mean_diff.csv
- chapter_11_confidence_interval_summary.csv

그래프:
- chapter_11_bootstrap_distribution.png

## 10. t-test 결과

VIP 고객과 일반 고객의 total_purchase 평균 차이에 대해 Welch t-test를 수행했다.

p-value:
- {round(ttest_result.pvalue, 4)}

통계적 유의 여부:
- {bool(ttest_result.pvalue < 0.05)}

결과 파일:
- chapter_11_ttest_result.csv

## 11. 비율 비교

고객 등급별 재구매율과 쿠폰 사용 여부별 재구매율을 비교했다.

결과 파일:
- chapter_11_ratio_comparison_summary.csv

## 12. 주요 인사이트

- VIP 고객의 평균 구매액이 일반 고객보다 높게 나타날 수 있다.
- 평균 차이는 분포와 표본 수를 함께 확인해야 한다.
- 쿠폰 사용자와 미사용자의 차이는 관찰된 차이일 뿐 인과 효과로 해석하면 안 된다.
- 재구매 고객은 1회 구매 고객과 다른 구매 특성을 가질 수 있다.
- 주 구매 카테고리별 구매액 비교는 고객 취향 기반 마케팅에 활용할 수 있다.

## 13. 주의사항

- 표본 수가 적은 그룹의 평균은 불안정할 수 있다.
- 평균은 이상값의 영향을 받을 수 있으므로 중앙값과 박스플롯을 함께 확인해야 한다.
- p-value는 실무적 중요도를 알려주지 않는다.
- 통계적으로 유의한 차이가 실무적으로 의미 있는 차이인지 별도로 판단해야 한다.
- 집단 간 차이는 인과관계를 의미하지 않는다.
- 분석 기간이 짧으면 재구매 여부와 구매액 비교가 왜곡될 수 있다.

## 14. 다음 단계

다음 장에서는 A/B 테스트 분석 실습을 진행한다.
실험군과 대조군의 전환율, 구매 금액, 상대 개선율을 계산하고 통계적으로 해석하는 방법을 배운다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_11_statistical_comparison_report.md").write_text(
    statistical_comparison_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};