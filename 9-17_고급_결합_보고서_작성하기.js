var e=`# 9장. 복잡한 데이터 결합 실습

## 9.17 고급 결합 보고서 작성하기

이제 이번 장의 결과를 Markdown 보고서로 정리합니다.

---

### 9.17.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. 결합 전 key 점검
4. 고객·상품 마스터 결합
5. many-to-many 결합 문제
6. 다중 key 결합
7. 상품 가격 이력 결합
8. 고객 등급 이력 결합
9. 매출·광고비 데이터 결합
10. 결합 결과 검증
11. 주요 인사이트
12. 주의사항
13. 다음 단계
\`\`\`

---

### 9.17.2 보고서 작성 코드

\`\`\`python
advanced_join_report = '''# 9장 실습 보고서: 복잡한 데이터 결합 실습

## 1. 분석 목적

본 실습은 주문 데이터에 고객, 상품, 지점별 가격, 상품 가격 이력, 고객 등급 이력, 광고비 데이터를 결합하고,
결합 결과를 검증하는 것을 목적으로 한다.

## 2. 사용 데이터

- 주문 데이터: orders
- 고객 마스터: customers
- 상품 마스터: products
- 지점별 상품 가격: store_product_prices
- 상품 가격 이력: price_history
- 고객 등급 이력: grade_history
- 광고비 데이터: ad_spend

## 3. 결합 전 key 점검

각 데이터의 주요 key 유일성을 확인했다.

결과 파일:
- chapter_09_join_key_check.csv

점검 항목:
- orders.order_id
- customers.customer_id
- products.product_id
- store_product_prices.store_id + product_id
- price_history.product_id + effective_date
- grade_history.customer_id + effective_date
- ad_spend.year_month + campaign_id

## 4. 고객·상품 마스터 결합

주문 데이터에 고객 마스터와 상품 마스터를 left join 방식으로 결합했다.
결합 시 validate 옵션을 사용해 결합 관계를 검증했다.

결과 파일:
- chapter_09_orders_joined_verified.csv
- chapter_09_join_validation_summary.csv

## 5. many-to-many 결합 문제

오른쪽 기준표의 key가 중복되어 있으면 결합 후 행 수가 늘어날 수 있다.
이를 예제로 확인하고, validate="many_to_one"을 사용해 문제를 방지하는 방법을 실습했다.

결과 파일:
- chapter_09_many_to_many_problem.csv

## 6. 다중 key 결합

지점별 상품 가격 데이터는 store_id와 product_id를 함께 사용해 결합했다.
단일 product_id만으로 결합하면 지점별 가격 차이를 반영할 수 없다.

결과 파일:
- chapter_09_multi_key_join_result.csv

## 7. 상품 가격 이력 결합

상품 가격은 시간에 따라 변할 수 있으므로 주문일 기준으로 가장 가까운 이전 가격을 붙였다.
이를 위해 merge_asof를 사용했다.

결과 파일:
- chapter_09_orders_with_price_history.csv
- chapter_09_price_history_join_check.csv

## 8. 고객 등급 이력 결합

고객 등급도 시간에 따라 변할 수 있으므로 주문일 기준 고객 등급 이력을 붙였다.
현재 등급이 아니라 주문 당시 등급을 분석하는 것이 중요하다.

결과 파일:
- chapter_09_orders_with_grade_history.csv
- chapter_09_grade_history_join_check.csv

## 9. 매출·광고비 데이터 결합

월별 캠페인 매출과 광고비 데이터를 year_month와 campaign_id 기준으로 결합하고 ROAS를 계산했다.

결과 파일:
- chapter_09_sales_ad_joined.csv
- chapter_09_ad_sales_join_summary.csv

## 10. 결합 결과 검증

결합 후 다음 항목을 검증했다.

- 결합 전후 행 수 유지 여부
- 매칭 실패 key 존재 여부
- 가격 이력 매칭 실패 여부
- 고객 등급 이력 매칭 실패 여부
- 광고비 매칭 실패 여부

결과 파일:
- chapter_09_advanced_join_summary.csv

## 11. 주요 인사이트

- 복잡한 결합에서는 key 유일성 확인이 필수다.
- 기준표 key가 중복되면 결합 후 행 수가 늘어나 매출이 중복 계산될 수 있다.
- 상품 가격과 고객 등급은 시간에 따라 바뀔 수 있으므로 이력 데이터를 사용해야 한다.
- 광고비와 매출을 결합하면 ROAS 같은 캠페인 성과 지표를 계산할 수 있다.
- 매칭 실패 데이터는 삭제하지 말고 별도 리포트로 관리해야 한다.

## 12. 주의사항

- validate 없이 merge를 수행하면 잘못된 결합을 놓칠 수 있다.
- indicator=True를 사용해 매칭 실패를 확인해야 한다.
- merge_asof를 사용할 때는 날짜 기준 정렬이 필요하다.
- 단순 전후 가격이나 현재 등급을 과거 주문에 적용하면 분석이 왜곡될 수 있다.
- ROAS는 광고비 대비 매출을 보여주지만 광고 효과의 인과관계를 증명하지 않는다.

## 13. 다음 단계

다음 장에서는 분석용 파생 변수와 Feature Table을 만든다.
고객별 총구매액, 구매 횟수, 평균 주문 금액, 최근 구매 후 경과일, 재구매 여부 등을 계산해 고객 분석용 테이블을 생성한다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_09_advanced_join_report.md").write_text(
    advanced_join_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};