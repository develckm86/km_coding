var e=`# 7장. 누적 지표와 이동평균 분석

## 7.25 다음 장 예고

다음 장에서는 **시계열 매출 분석**을 더 깊게 다룹니다.

이번 장에서는 일별 데이터를 기준으로 누적 매출과 이동평균을 계산했습니다.  
다음 장에서는 pandas의 시계열 기능을 더 적극적으로 사용합니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
DatetimeIndex 설정
날짜 슬라이싱
resample()로 주별·월별 집계
전월 대비 성장률
전년 동월 대비 개념
이벤트 전후 비교
요일별 주문 패턴
월별 카테고리 매출 변화
성장률과 기여도 분석
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
monthly_sales_growth.csv
weekly_sales_report.csv
weekday_sales_report.csv
event_before_after_report.md
time_series_sales_report.md
\`\`\`

누적 지표와 이동평균이 시간 흐름의 기본 계산이라면, 시계열 분석은 날짜 인덱스와 기간 단위 집계를 활용해 더 깊은 시간 기반 분석을 수행하는 과정입니다.

---

## 참고 문서

- pandas 공식 문서: Windowing operations
- pandas 공식 문서: \`DataFrame.rolling\`
- pandas 공식 문서: \`DataFrame.expanding\`
- pandas 공식 문서: \`Series.cumsum\`
- pandas 공식 문서: \`Series.diff\`
- pandas 공식 문서: \`Series.pct_change\`
- pandas 공식 문서: Time series / date functionality
`;export{e as default};