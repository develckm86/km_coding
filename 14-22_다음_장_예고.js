var e=`# 14장. RFM 고객 분석 실습

## 14.22 다음 장 예고

다음 장에서는 **코호트와 리텐션 분석 실습**을 진행합니다.

이번 장의 RFM 분석은 고객의 현재 상태를 요약하는 데 유용했습니다.

\`\`\`text
최근 구매했는가?
자주 구매했는가?
많이 구매했는가?
\`\`\`

하지만 고객이 시간이 지나며 계속 남아 있는지는 RFM만으로 충분히 알기 어렵습니다.

다음 장에서는 코호트 분석을 통해 다음 질문에 답합니다.

\`\`\`text
가입 월별 고객은 시간이 지나도 계속 구매하는가?
첫 구매 월별 고객의 재구매율은 어떻게 변하는가?
몇 개월 뒤 고객 유지율이 급격히 떨어지는가?
어떤 코호트가 더 좋은 리텐션을 보이는가?
\`\`\`

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
코호트 개념
가입 월 기준 코호트
첫 구매 월 기준 코호트
구매 월 계산
코호트 인덱스 계산
코호트별 고객 수
리텐션 테이블
리텐션 히트맵
코호트 분석 보고서 작성
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
cohort_retention_table.csv
cohort_retention_heatmap.png
cohort_analysis_report.md
\`\`\`

RFM 분석이 고객을 현재 상태로 분류하는 방법이라면, 코호트 분석은 고객이 시간에 따라 얼마나 유지되는지를 보는 방법입니다.

---

## 참고 문서

- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: \`qcut\`
- pandas 공식 문서: Ranking
- pandas 공식 문서: Time series / date functionality
- matplotlib 공식 문서: Pyplot tutorial
`;export{e as default};