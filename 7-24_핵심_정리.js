var e=`# 7장. 누적 지표와 이동평균 분석

## 7.24 핵심 정리

이번 장에서는 누적 지표와 이동평균 분석을 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
누적 지표는 현재까지 쌓인 성과를 보여준다.
cumsum()은 누적 합계를 계산할 때 사용한다.
rolling()은 이동평균을 계산할 때 사용한다.
expanding()은 시작부터 현재까지 확장된 범위의 평균을 계산한다.
diff()는 이전 값과의 차이를 계산한다.
pct_change()는 이전 값 대비 변화율을 계산한다.
shift()는 이전 행 값을 가져올 때 사용한다.
날짜 정렬은 누적 계산과 이동평균 계산에서 매우 중요하다.
주문이 없는 날짜를 0으로 채울지 여부는 분석 목적에 따라 결정해야 한다.
일별 고유 고객 수를 단순 누적하면 고객이 중복 계산될 수 있다.
고객별 누적 구매액은 RFM 분석과 고객 가치 분석의 기초 데이터다.
카테고리별 누적 매출은 매출 기여도 흐름을 파악하는 데 유용하다.
\`\`\`

이번 장에서 생성한 주요 결과물은 다음과 같습니다.

\`\`\`text
chapter_07_daily_sales.csv
chapter_07_daily_sales_with_rolling.csv
chapter_07_monthly_cumulative_sales.csv
chapter_07_category_cumulative_sales.csv
chapter_07_customer_cumulative_purchase.csv
chapter_07_sales_change_report.csv
chapter_07_window_summary.csv
chapter_07_rolling_average_report.md
\`\`\`

---
`;export{e as default};