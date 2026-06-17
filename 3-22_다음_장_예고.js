var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.22 다음 장 예고

다음 장에서는 **분석용 데이터마트 만들기**를 실습합니다.

이번 장에서 발견한 품질 문제는 다음과 같습니다.

\`\`\`text
주문 ID 중복
고객 ID 중복
상품 ID 중복
쿠폰 금액 결측치
날짜 변환 실패
상품 마스터에 없는 product_id
고객 마스터에 없는 customer_id
수량 음수
쿠폰 금액 음수
지역명 표기 불일치
고객명 공백
\`\`\`

다음 장에서는 이 문제들을 처리해 분석 가능한 데이터셋을 만듭니다.

다음 장의 주요 실습은 다음과 같습니다.

\`\`\`text
원본 데이터 복사
중복 주문 제거
고객 마스터 중복 제거
상품 마스터 중복 제거
쿠폰 결측치 처리
잘못된 수치형 값 처리
날짜형 변환
고객명 공백 제거
지역명 표준화
주문 데이터와 고객 데이터 결합
주문 데이터와 상품 데이터 결합
순매출 계산
분석 제외 데이터 분리
최종 분석용 데이터마트 저장
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
orders_mart.csv
excluded_orders.csv
preprocessing_log.md
\`\`\`

데이터 품질 진단은 문제를 찾는 단계이고, 분석용 데이터마트 만들기는 그 문제를 처리해 분석 가능한 데이터를 만드는 단계입니다.

---

## 참고 문서

- pandas 공식 문서: Working with missing data
- pandas 공식 문서: Duplicate labels
- pandas 공식 문서: Merge, join, concatenate and compare
- pandas 공식 문서: Time series / date functionality
- pandas 공식 문서: Descriptive statistics
`;export{e as default};