var e=`# 8장. 시계열 매출 분석

## 8.21 핵심 정리

이번 장에서는 시계열 매출 분석을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
시계열 데이터는 시간 순서가 중요한 데이터다.
날짜 컬럼은 datetime 형식으로 변환해야 한다.
날짜 인덱스를 설정하면 날짜 슬라이싱과 resample을 편하게 사용할 수 있다.
resample("D")는 일별 집계, resample("W")는 주별 집계, resample("M")는 월별 집계에 사용한다.
월별 매출 성장률은 전월 대비 매출 변화의 방향과 크기를 보여준다.
매출 변화는 주문 수와 평균 주문 금액 변화로 나누어 해석하는 것이 좋다.
요일별 주문 패턴은 운영과 마케팅 일정에 참고할 수 있다.
이벤트 전후 비교는 변화 관찰이지 인과관계 증명이 아니다.
월별 카테고리 매출 분석은 매출 변화의 원인 후보를 찾는 데 유용하다.
카테고리별 성장 기여도는 전체 매출 증감에 어떤 카테고리가 영향을 주었는지 보여준다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_08_daily_sales_report.csv
chapter_08_weekly_sales_report.csv
chapter_08_monthly_sales_growth.csv
chapter_08_weekday_sales_report.csv
chapter_08_event_before_after_summary.csv
chapter_08_monthly_category_sales.csv
chapter_08_category_growth_contribution.csv
chapter_08_time_series_summary.csv
chapter_08_time_series_sales_report.md
\`\`\`

---
`;export{e as default};