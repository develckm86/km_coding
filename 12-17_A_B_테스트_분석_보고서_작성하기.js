var e=`# 12장. A/B 테스트 분석 실습

## 12.17 A/B 테스트 분석 보고서 작성하기

이번 장의 결과를 Markdown 보고서로 정리합니다.

---

### 12.17.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 실험 개요
3. 데이터 검증
4. 그룹 규모와 Sample Ratio Check
5. 전환율 비교
6. 전환율 차이 통계 검정
7. 구매 금액 비교
8. 사용자당 매출 비교
9. 의사결정 요약
10. 주요 인사이트
11. 주의사항
12. 다음 단계
\`\`\`

---

### 12.17.2 보고서 작성 코드

\`\`\`python
ab_test_report = f'''# 12장 실습 보고서: A/B 테스트 분석 실습

## 1. 분석 목적

본 실습은 쿠폰 배너 노출 A/B 테스트 데이터를 분석하여 실험군이 대조군보다 구매 전환율을 개선했는지 확인하는 것을 목적으로 한다.
전환율뿐 아니라 구매 금액, 사용자당 매출, 통계적 유의성, 실무적 의미를 함께 검토한다.

## 2. 실험 개요

- 대조군: 기존 화면, 쿠폰 배너 미노출
- 실험군: 10% 쿠폰 배너 노출
- 실험 단위: 사용자
- 핵심 성공 지표: 구매 전환율
- 보조 지표: 구매자 평균 구매 금액, 사용자당 매출
- 기대 배정 비율: control 50%, treatment 50%

## 3. 데이터 검증

실험 데이터에서 유효하지 않은 그룹 값을 제외하고, 중복 user_id를 제거했다.
전환 여부는 0 또는 1로 정리했고, 구매 금액은 0 이상인지 확인했다.

정리된 데이터 파일:
- chapter_12_ab_test_clean.csv

## 4. 그룹 규모와 Sample Ratio Check

실험군과 대조군 사용자 수를 확인하고, 기대 배정 비율 50:50과 관측 비율이 크게 다른지 확인했다.

결과 파일:
- chapter_12_ab_test_group_summary.csv
- chapter_12_sample_ratio_check.csv

Sample Ratio Mismatch 여부:
- {sample_ratio_mismatch}

## 5. 전환율 비교

그룹별 전환율을 계산했다.

대조군 전환율:
- {round(p_control * 100, 2)}%

실험군 전환율:
- {round(p_treatment * 100, 2)}%

전환율 차이:
- {round(diff * 100, 2)}%p

상대 개선율:
- {round((diff / p_control) * 100, 2)}%

결과 파일:
- chapter_12_conversion_rate_comparison.csv

그래프:
- chapter_12_conversion_rate_chart.png

## 6. 전환율 차이 통계 검정

두 비율 z-test를 사용해 전환율 차이의 통계적 유의성을 확인했다.

z-statistic:
- {round(z_stat, 4)}

p-value:
- {round(p_value, 4)}

통계적 유의 여부:
- {conversion_significant}

95% 신뢰구간:
- {round(ci_lower_percent, 2)}%p ~ {round(ci_upper_percent, 2)}%p

결과 파일:
- chapter_12_conversion_statistical_result.csv

## 7. 구매 금액 비교

구매자만 대상으로 그룹별 평균 구매 금액과 중앙값을 비교했다.

결과 파일:
- chapter_12_purchase_amount_comparison.csv

그래프:
- chapter_12_purchase_amount_boxplot.png

주의:
구매 금액 비교는 구매자만 대상으로 하므로 전환율 분석과 함께 해석해야 한다.

## 8. 사용자당 매출 비교

구매하지 않은 사용자까지 포함해 사용자당 매출을 계산했다.

대조군 사용자당 매출:
- {round(control_rpu, 2)}

실험군 사용자당 매출:
- {round(treatment_rpu, 2)}

사용자당 매출 차이:
- {round(rpu_diff, 2)}

사용자당 매출 상대 변화:
- {round(rpu_lift_percent, 2)}%

결과 파일:
- chapter_12_revenue_per_user_comparison.csv

그래프:
- chapter_12_revenue_per_user_chart.png

## 9. 구매 금액 차이 부트스트랩

구매자 기준 평균 구매 금액 차이를 부트스트랩으로 확인했다.

관찰된 평균 차이:
- {round(purchase_diff_observed, 2)}

95% 신뢰구간:
- {round(purchase_ci_lower, 2)} ~ {round(purchase_ci_upper, 2)}

결과 파일:
- chapter_12_purchase_bootstrap_result.csv

그래프:
- chapter_12_bootstrap_purchase_diff.png

## 10. 의사결정 요약

사전 정의한 판단 기준에 따라 실험 결과를 요약했다.

최종 판단:
- {decision}

판단 기준:
- Sample Ratio Mismatch가 없어야 한다.
- 전환율 차이가 양수여야 한다.
- 전환율 차이가 통계적으로 유의해야 한다.
- 사용자당 매출이 악화되지 않아야 한다.

결과 파일:
- chapter_12_ab_test_decision_summary.csv

## 11. 주요 인사이트

- 실험군의 전환율이 대조군보다 높게 나타날 수 있다.
- 전환율 차이는 퍼센트포인트와 상대 개선율을 구분해서 해석해야 한다.
- 전환율이 개선되더라도 구매 금액이나 사용자당 매출이 하락하면 실무적 효과가 제한적일 수 있다.
- p-value는 통계적 유의성을 보여주지만, 실무적으로 충분한 개선인지 판단하려면 효과 크기와 비용을 함께 고려해야 한다.
- 실험 결과를 신뢰하려면 실험군과 대조군 배정 비율, 중복 사용자, 데이터 품질을 먼저 확인해야 한다.

## 12. 주의사항

- A/B 테스트는 실험 설계가 중요하다.
- Sample Ratio Mismatch가 있으면 결과 해석이 위험할 수 있다.
- 전환율 차이가 통계적으로 유의하더라도 실무적으로 의미 있는 차이인지 별도로 판단해야 한다.
- 구매 금액은 이상값의 영향을 받을 수 있으므로 평균과 중앙값을 함께 확인해야 한다.
- 여러 지표를 사후적으로 많이 비교하면 우연히 유의한 결과가 나올 수 있다.
- 실험 기간이 짧으면 결과가 불안정할 수 있다.
- 가드레일 지표가 악화되지 않았는지 확인해야 한다.

## 13. 다음 단계

다음 장에서는 회귀분석 실습을 진행한다.
방문 횟수, 고객 등급, 쿠폰 사용 여부 등 여러 변수가 주문 금액이나 구매 성과와 어떤 관계를 가지는지 회귀분석으로 확인한다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_12_ab_test_result_report.md").write_text(
    ab_test_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};