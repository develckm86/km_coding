var e=`# 4장. 분석용 데이터마트 만들기

## 4.22 전처리 로그 작성하기

전처리 로그는 어떤 기준으로 데이터를 처리했는지 기록하는 문서입니다.

실무에서는 전처리 로그가 매우 중요합니다.

---

### 4.22.1 전처리 로그에 포함할 내용

전처리 로그에는 다음을 포함합니다.

\`\`\`text
전처리 목적
사용 데이터
중복 처리 기준
결측치 처리 기준
날짜 처리 기준
문자열 정리 기준
데이터 결합 기준
분석 제외 기준
최종 데이터마트 행 수
제외 데이터 행 수
주의사항
\`\`\`

---

### 4.22.2 전처리 로그 작성 코드

\`\`\`python
preprocessing_log = f'''# 4장 실습 보고서: 분석용 데이터마트 만들기

## 1. 전처리 목적

본 실습은 주문 데이터, 고객 데이터, 상품 데이터를 정리하고 결합하여
분석에 사용할 수 있는 주문 데이터마트를 만드는 것을 목적으로 한다.

## 2. 사용 데이터

- 주문 데이터: orders_raw
- 고객 데이터: customers_raw
- 상품 데이터: products_raw

## 3. 중복 처리 기준

- orders는 order_id 기준으로 중복을 확인하고 첫 번째 행만 유지했다.
- customers는 customer_id 기준으로 중복을 확인하고 첫 번째 행만 유지했다.
- products는 product_id 기준으로 중복을 확인하고 첫 번째 행만 유지했다.

## 4. 결측치 처리 기준

- coupon_amount 결측치는 쿠폰 미사용으로 보고 0으로 대체했다.
- 고객 정보가 없는 주문의 customer_name은 "고객정보없음"으로 처리했다.
- 고객 정보가 없는 주문의 region과 grade는 "미상"으로 처리했다.
- 상품 정보가 없어 unit_price를 확인할 수 없는 주문은 매출 분석에서 제외했다.

## 5. 날짜 처리 기준

- order_date는 pd.to_datetime(errors="coerce")로 날짜형 변환했다.
- 변환 실패 값은 NaT로 남겼다.
- year_month와 weekday는 order_date_dt에서 생성했다.
- 날짜가 필요한 분석에서는 order_date_dt가 유효한 주문만 사용한다.
- signup_date도 날짜형으로 변환했다.

## 6. 문자열 처리 기준

- customer_name은 앞뒤 공백을 제거했다.
- region은 서울, 부산, 대전으로 표준화했다.

## 7. 데이터 결합 기준

- 주문 데이터와 고객 데이터는 customer_id 기준으로 left join했다.
- 주문 데이터와 상품 데이터는 product_id 기준으로 left join했다.
- 결합 시 validate="many_to_one"을 사용했다.

## 8. 주문 금액 계산 기준

- gross_amount = quantity × unit_price
- net_amount = gross_amount - coupon_amount
- used_coupon = coupon_amount > 0

## 9. 분석 제외 기준

다음 조건에 해당하는 주문은 매출 분석용 데이터마트에서 제외했다.

- quantity <= 0
- coupon_amount < 0
- 상품 정보 없음
- net_amount 계산 불가

## 10. 처리 결과 요약

- 원본 주문 행 수: {len(orders_raw)}
- 중복 제거 후 주문 행 수: {len(orders)}
- 분석 제외 주문 수: {len(excluded_orders)}
- 최종 데이터마트 행 수: {len(orders_mart)}

## 11. 생성 결과물

- data/processed/chapter_04_orders_mart.csv
- data/processed/chapter_04_excluded_orders.csv
- data/processed/chapter_04_customers_clean.csv
- data/processed/chapter_04_products_clean.csv
- outputs/tables/chapter_04_preprocessing_summary.csv
- outputs/tables/chapter_04_mart_quality_check.csv

## 12. 주의사항

- 첫 번째 행을 유지하는 중복 제거 방식은 실습용 기준이다.
- 실무에서는 최신 수정일, 상태값, 원본 우선순위 등을 기준으로 중복 제거 기준을 정해야 한다.
- 상품 정보가 없는 주문은 매출 분석에서 제외했으므로, 제외된 주문 규모를 보고서에 명시해야 한다.
- 날짜 오류가 있는 주문은 날짜 기반 분석에서 제외될 수 있다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_04_preprocessing_log.md").write_text(
    preprocessing_log,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};