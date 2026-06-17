var e=`# 4장. 분석용 데이터마트 만들기

## 4.29 다음 장 예고

다음 장에서는 **데이터 재구조화 실습**을 진행합니다.

이번 장에서 만든 데이터마트는 주문 단위 데이터입니다.

주문 단위 데이터는 다음처럼 생겼습니다.

\`\`\`text
order_id
order_date
customer_id
product_id
category
net_amount
\`\`\`

하지만 분석 목적에 따라 데이터 구조를 바꿔야 할 때가 있습니다.

예를 들어 다음과 같은 형태가 필요할 수 있습니다.

\`\`\`text
월별 카테고리 매출 피벗 테이블
지역별 카테고리 매출 피벗 테이블
고객별 월별 구매 금액 테이블
wide 데이터를 long 데이터로 변환한 시각화용 데이터
\`\`\`

다음 장에서는 다음 기능을 실습합니다.

\`\`\`text
pivot_table
pivot
melt
stack
unstack
explode
wide format
long format
보고용 표와 시각화용 데이터 구분
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
region_category_pivot.xlsx
monthly_category_long.csv
monthly_category_pivot.csv
\`\`\`

데이터마트를 만들었다면, 다음 단계는 분석 목적에 맞게 데이터 구조를 바꾸는 것입니다.

---

## 참고 문서

- pandas 공식 문서: Working with missing data
- pandas 공식 문서: Duplicate labels
- pandas 공식 문서: Merge, join, concatenate and compare
- pandas 공식 문서: Time series / date functionality
- pandas 공식 문서: Group by: split-apply-combine
`;export{e as default};