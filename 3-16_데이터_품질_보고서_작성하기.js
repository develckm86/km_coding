var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.16 데이터 품질 보고서 작성하기

이제 지금까지 만든 결과를 Markdown 보고서로 정리합니다.

---

### 3.16.1 보고서 구성

데이터 품질 보고서는 다음 구조로 작성합니다.

\`\`\`text
1. 진단 목적
2. 진단 대상 데이터
3. 데이터 구조 요약
4. 결측치 진단 결과
5. 중복값 진단 결과
6. key 매칭 진단 결과
7. 날짜 오류 진단 결과
8. 이상값 후보 진단 결과
9. 주요 품질 이슈
10. 처리 우선순위
11. 다음 단계
\`\`\`

---

### 3.16.2 품질 보고서 작성 코드

\`\`\`python
report_text = f'''# 3장 실습 보고서: 데이터 품질 진단 리포트

## 1. 진단 목적

본 리포트는 쇼핑몰 주문 데이터, 고객 데이터, 상품 데이터를 분석하기 전에
데이터 품질 문제를 진단하고 처리 우선순위를 정리하는 것을 목적으로 한다.

## 2. 진단 대상 데이터

| 데이터 | 행 수 | 열 수 |
|---|---:|---:|
| orders | {len(orders)} | {orders.shape[1]} |
| customers | {len(customers)} | {customers.shape[1]} |
| products | {len(products)} | {products.shape[1]} |

## 3. 주요 진단 항목

- 컬럼별 결측치
- 주요 key 중복
- 주문 데이터와 기준표 간 key 매칭 실패
- 날짜 변환 실패
- 수치형 업무 규칙 위반
- IQR 기준 이상값 후보

## 4. 결측치 진단 결과

결측치 요약표는 \`outputs/tables/chapter_03_missing_summary.csv\`에 저장했다.

주요 결측치 이슈:
- orders.coupon_amount 컬럼에 결측치가 존재한다.
- coupon_amount 결측치는 쿠폰 미사용으로 판단 가능한 경우 0으로 대체할 수 있다.

## 5. 중복값 진단 결과

중복값 요약표는 \`outputs/tables/chapter_03_duplicate_summary.csv\`에 저장했다.

주요 중복 이슈:
- orders.order_id 중복이 발견되었다.
- customers.customer_id 중복이 발견되었다.
- products.product_id 중복이 발견되었다.

## 6. key 매칭 진단 결과

key 매칭 요약표는 \`outputs/tables/chapter_03_key_matching_summary.csv\`에 저장했다.

주요 key 이슈:
- 주문 데이터에는 있으나 고객 마스터에 없는 customer_id가 존재한다.
- 주문 데이터에는 있으나 상품 마스터에 없는 product_id가 존재한다.

## 7. 날짜 오류 진단 결과

날짜 오류 목록은 \`outputs/tables/chapter_03_invalid_dates.csv\`에 저장했다.

주요 날짜 이슈:
- orders.order_date에 날짜 변환 실패 값이 존재한다.
- customers.signup_date에 날짜 변환 실패 값이 존재한다.

## 8. 이상값 후보 진단 결과

이상값 후보 목록은 \`outputs/tables/chapter_03_outlier_candidates.csv\`에 저장했다.

주요 이상값 후보:
- quantity가 0 이하인 주문이 존재한다.
- coupon_amount가 음수인 주문이 존재한다.
- net_amount 기준 IQR 이상값 후보가 존재할 수 있다.

## 9. 처리 우선순위

High 우선순위:
- order_id 중복
- customer_id 중복
- product_id 중복
- 상품 마스터에 없는 product_id
- quantity와 coupon_amount의 업무 규칙 위반

Medium 우선순위:
- coupon_amount 결측치
- 고객 마스터에 없는 customer_id
- 날짜 변환 실패

## 10. 권장 처리 방향

- 중복 key는 결합 전에 제거 기준을 수립한다.
- 상품 마스터 누락은 원본 보완을 우선 검토한다.
- 상품 정보가 없어 단가를 확인할 수 없는 주문은 매출 분석에서 제외할 수 있다.
- 날짜 변환 실패 행은 날짜 기반 분석에서 제외하거나 원본을 수정한다.
- coupon_amount 결측치는 쿠폰 미사용으로 판단 가능한 경우 0으로 대체한다.
- 수량 음수와 쿠폰 음수는 원본 확인 후 수정 또는 제외한다.

## 11. 다음 단계

다음 장에서는 본 리포트의 진단 결과를 바탕으로
분석용 데이터마트를 만든다.
'''
\`\`\`

파일로 저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_03_data_quality_report.md").write_text(
    report_text,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};