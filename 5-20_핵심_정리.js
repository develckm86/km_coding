var e=`# 5장. 데이터 재구조화 실습

## 5.20 핵심 정리

이번 장에서는 데이터 재구조화를 실습했습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
데이터 재구조화는 데이터의 값을 바꾸는 것이 아니라 모양을 바꾸는 작업이다.
wide format은 보고용 표에 적합하다.
long format은 분석과 시각화에 적합하다.
pivot은 중복 조합이 없을 때 사용할 수 있다.
pivot_table은 중복 조합이 있어도 집계 함수로 처리할 수 있다.
melt는 wide 데이터를 long 데이터로 변환한다.
stack과 unstack은 MultiIndex 데이터를 재구조화할 때 유용하다.
explode는 리스트형 컬럼을 여러 행으로 펼친다.
보고용 데이터와 시각화용 데이터는 목적이 다르므로 따로 저장하는 것이 좋다.
합계 행과 합계 열이 있는 표는 보고용으로만 사용하고, 재분석에는 주의해야 한다.
\`\`\`

이번 장의 결과물은 다음과 같습니다.

\`\`\`text
chapter_05_region_category_pivot.csv
chapter_05_monthly_category_pivot.csv
chapter_05_monthly_category_long.csv
chapter_05_customer_month_pivot.csv
chapter_05_wide_sales_sample.csv
chapter_05_long_sales_sample.csv
chapter_05_exploded_product_tags.csv
chapter_05_reshape_summary.csv
chapter_05_reshape_report.md
\`\`\`

이 결과물은 이후 고급 groupby 분석, 시계열 분석, 고급 시각화 리포트에서 계속 활용할 수 있습니다.

---
`;export{e as default};