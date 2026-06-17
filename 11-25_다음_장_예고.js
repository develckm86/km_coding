var e=`# 11장. 통계적 비교 실습

## 11.25 다음 장 예고

다음 장에서는 **A/B 테스트 분석 실습**을 진행합니다.

이번 장에서는 관찰 데이터에서 집단 차이를 비교했습니다.

\`\`\`text
VIP vs 일반
쿠폰 사용자 vs 미사용자
재구매 고객 vs 1회 구매 고객
\`\`\`

하지만 이런 비교는 인과관계를 말하기 어렵습니다.

12장에서는 실험군과 대조군이 있는 A/B 테스트 데이터를 사용합니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
실험군과 대조군 이해
실험 데이터 구조 확인
그룹별 사용자 수 검증
전환율 계산
구매 금액 비교
전환율 차이
상대 개선율
비율 차이 검정 기초
실험 결과 해석
실험 분석 보고서 작성
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
ab_test_result_report.md
ab_test_group_summary.csv
conversion_rate_comparison.csv
purchase_amount_comparison.csv
ab_test_statistical_result.csv
\`\`\`

통계적 비교가 관찰된 집단 차이를 조심스럽게 해석하는 과정이었다면, A/B 테스트는 실험 설계를 바탕으로 특정 변화의 효과를 더 명확하게 평가하는 과정입니다.

---

## 참고 문서

- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: Descriptive statistics
- NumPy 공식 문서: Random sampling
- SciPy 공식 문서: \`scipy.stats.ttest_ind\`
- pandas 공식 문서: Visualization
`;export{e as default};