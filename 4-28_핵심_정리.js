var e=`# 4장. 분석용 데이터마트 만들기

## 4.28 핵심 정리

이번 장에서는 3장에서 진단한 데이터 품질 문제를 처리해 분석용 데이터마트를 만들었습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
원본 데이터는 직접 수정하지 않고 복사본을 사용한다.
중복 key는 결합 전에 처리해야 한다.
결측치는 컬럼의 의미에 따라 다르게 처리한다.
날짜는 pd.to_datetime(errors="coerce")로 변환하고 실패 값을 확인한다.
문자열은 공백 제거와 표준화가 필요하다.
고객 데이터와 상품 데이터는 기준표이므로 key 유일성이 중요하다.
주문 데이터는 고객, 상품 데이터와 left join으로 결합한다.
결합 후 행 수와 결측치를 반드시 확인한다.
순매출은 quantity × unit_price - coupon_amount로 계산한다.
분석 제외 데이터는 삭제하지 않고 별도 파일로 저장한다.
전처리 기준은 Markdown 로그로 남긴다.
\`\`\`

이번 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
chapter_04_orders_mart.csv
chapter_04_excluded_orders.csv
chapter_04_customers_clean.csv
chapter_04_products_clean.csv
chapter_04_preprocessing_summary.csv
chapter_04_mart_quality_check.csv
chapter_04_preprocessing_log.md
\`\`\`

이 중 가장 중요한 파일은 \`chapter_04_orders_mart.csv\`입니다.  
이 파일은 이후 장에서 계속 사용하는 분석용 데이터입니다.

---
`;export{e as default};