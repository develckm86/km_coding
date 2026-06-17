var e=`# 8장. 시계열 매출 분석

## 8.22 다음 장 예고

다음 장에서는 **복잡한 데이터 결합 실습**을 진행합니다.

지금까지는 주문 데이터와 고객 데이터, 상품 데이터를 단순 key 기준으로 결합했습니다.

하지만 실무에서는 더 복잡한 결합이 필요합니다.

예를 들어 다음과 같은 상황이 있습니다.

\`\`\`text
상품 가격이 날짜별로 바뀐다.
고객 등급이 기간별로 바뀐다.
광고비 데이터는 날짜와 캠페인 기준으로 존재한다.
주문일 기준으로 당시 가격을 붙여야 한다.
주문일 기준으로 당시 고객 등급을 붙여야 한다.
날짜 기준으로 가장 가까운 이전 값을 붙여야 한다.
\`\`\`

다음 장에서는 다음 내용을 실습합니다.

\`\`\`text
다중 key 결합
결합 전후 행 수 검증
many-to-many join 문제
indicator로 매칭 상태 확인
validate로 결합 관계 검증
merge_asof 맛보기
고객 등급 이력 결합
상품 가격 이력 결합
광고비 데이터와 매출 데이터 결합
매칭 실패 리포트 작성
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
orders_joined_verified.csv
join_quality_report.xlsx
unmatched_keys_report.csv
advanced_join_report.md
\`\`\`

시계열 분석이 시간 흐름을 보는 방법이었다면, 다음 장의 복잡한 데이터 결합은 시간과 key를 함께 고려해 더 현실적인 분석용 데이터를 만드는 과정입니다.

---

## 참고 문서

- pandas 공식 문서: Time series / date functionality
- pandas 공식 문서: \`DataFrame.resample\`
- pandas 공식 문서: \`Series.pct_change\`
- pandas 공식 문서: \`Series.shift\`
- pandas 공식 문서: \`pivot_table\`
- pandas 공식 문서: Group by: split-apply-combine
`;export{e as default};