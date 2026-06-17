var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.17 코호트 분석 보고서 작성하기

이번 장의 분석 결과를 Markdown 보고서로 정리합니다.

---

### 15.17.1 보고서 구성

\`\`\`text
1. 분석 목적
2. 사용 데이터
3. 코호트 정의
4. 첫 구매 월 기준 코호트
5. 리텐션 테이블
6. 리텐션 히트맵
7. 가입 월 기준 코호트
8. 코호트별 매출 분석
9. 코호트별 평균 주문 금액 분석
10. 코호트 요약 결과
11. 품질 점검
12. 주요 인사이트
13. 주의사항
14. 다음 단계
\`\`\`

---

### 15.17.2 보고서 작성 코드

\`\`\`python
cohort_report = f'''# 15장 실습 보고서: 코호트와 리텐션 분석 실습

## 1. 분석 목적

본 실습은 주문 데이터를 사용해 첫 구매 월 기준 코호트를 만들고,
경과 월별 재구매 고객 수와 리텐션 비율을 계산하는 것을 목적으로 한다.
이를 통해 고객이 시간이 지나도 계속 구매하는지, 어느 시점에서 이탈이 커지는지 확인한다.

## 2. 사용 데이터

- 입력 데이터: chapter_10_customer_order_base.csv, chapter_14_rfm_base_orders.csv, chapter_04_orders_mart.csv 또는 수업용 주문 데이터
- 분석 단위: 고객과 구매 월
- 필수 컬럼: customer_id, order_id, order_date, net_amount
- 보조 컬럼: signup_date, customer_name, region, category

분석용 주문 데이터:
- chapter_15_cohort_base_orders.csv

## 3. 코호트 정의

이번 실습의 기본 코호트는 첫 구매 월 기준이다.

정의:
- cohort_month = 고객의 첫 구매 월
- order_month = 각 주문의 구매 월
- cohort_index = order_month - cohort_month

해석:
- cohort_index 0은 첫 구매 월
- cohort_index 1은 첫 구매 후 1개월 뒤
- cohort_index 2는 첫 구매 후 2개월 뒤

## 4. 첫 구매 월 기준 코호트

고객별 첫 구매일과 첫 구매 월을 계산했다.

결과 파일:
- chapter_15_first_purchase_cohort.csv
- chapter_15_customer_cohort_table.csv

## 5. 리텐션 테이블

코호트 월과 경과 월별 활성 고객 수를 계산하고,
0개월 고객 수를 기준으로 리텐션 비율을 계산했다.

결과 파일:
- chapter_15_cohort_count_table.csv
- chapter_15_cohort_retention_table.csv
- chapter_15_cohort_retention_long.csv

## 6. 리텐션 히트맵

첫 구매 월 기준 리텐션 테이블을 히트맵으로 시각화했다.

그래프 파일:
- chapter_15_cohort_retention_heatmap.png

해석:
리텐션 히트맵은 시간이 지나며 고객이 얼마나 유지되는지 보여준다.
0개월 이후 리텐션이 급격히 낮아지는 코호트는 첫 구매 후 재구매 유도 전략이 필요할 수 있다.

## 7. 가입 월 기준 코호트

가입 월을 기준으로 코호트를 만들고, 가입 후 경과 월별 구매 리텐션을 계산했다.

결과 파일:
- chapter_15_signup_cohort_retention_table.csv

그래프 파일:
- chapter_15_signup_cohort_heatmap.png

## 8. 코호트별 매출 분석

코호트 월과 경과 월별 총매출을 계산했다.

결과 파일:
- chapter_15_cohort_sales_table.csv

그래프 파일:
- chapter_15_cohort_sales_heatmap.png

해석:
고객 수 기준 리텐션이 낮아져도 남아 있는 고객의 구매 금액이 크다면 매출 기여는 유지될 수 있다.

## 9. 코호트별 평균 주문 금액 분석

코호트 월과 경과 월별 평균 주문 금액을 계산했다.

결과 파일:
- chapter_15_cohort_avg_order_table.csv

## 10. 코호트 요약 결과

코호트별 신규 구매 고객 수, 총매출, 1개월 후 리텐션, 2개월 후 리텐션, 고객당 평균 매출을 요약했다.

결과 파일:
- chapter_15_cohort_summary.csv

그래프 파일:
- chapter_15_cohort_size_chart.png
- chapter_15_month1_retention_chart.png

## 11. 품질 점검

코호트 분석 결과에 대해 다음 항목을 점검했다.

- customer_id 결측 여부
- order_date 결측 여부
- cohort_month 결측 여부
- cohort_index 음수 여부
- 0개월 리텐션이 100%인지 여부

결과 파일:
- chapter_15_cohort_quality_check.csv

## 12. 주요 인사이트

- 첫 구매 월 기준 코호트 분석은 신규 구매 고객의 재구매 흐름을 보여준다.
- 1개월 후 리텐션은 첫 구매 이후 두 번째 구매 유도 성과를 판단하는 핵심 지표다.
- 특정 코호트의 리텐션이 높다면 해당 월의 유입 채널, 프로모션, 상품 구성을 추가로 확인할 필요가 있다.
- 가입 월 기준 코호트는 회원가입 이후 구매 활성화 흐름을 확인하는 데 유용하다.
- 고객 수 리텐션과 매출 리텐션을 함께 보면 고객 유지와 매출 유지의 차이를 이해할 수 있다.

## 13. 주의사항

- 코호트 크기가 작으면 리텐션 비율이 크게 흔들릴 수 있다.
- 분석 기간이 짧으면 뒤쪽 경과 월의 데이터가 부족하다.
- 리텐션 정의는 비즈니스 목적에 따라 달라질 수 있다.
- 구매 리텐션은 구매 행동만 반영하며 방문, 장바구니, 앱 실행 같은 다른 활동은 반영하지 않는다.
- 가입 월 기준 리텐션은 가입 데이터의 품질에 영향을 받는다.
- 코호트 간 차이를 인과관계로 해석하면 안 된다.

## 14. 다음 단계

다음 장에서는 퍼널 분석 실습을 진행한다.
코호트 분석이 시간에 따른 고객 유지율을 보는 방법이라면,
퍼널 분석은 고객이 구매 과정의 단계별로 어디에서 이탈하는지 확인하는 방법이다.
'''
\`\`\`

저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_15_cohort_analysis_report.md").write_text(
    cohort_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};