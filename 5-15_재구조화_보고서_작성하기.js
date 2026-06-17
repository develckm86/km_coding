var e=`# 5장. 데이터 재구조화 실습

## 5.15 재구조화 보고서 작성하기

재구조화 결과를 Markdown 보고서로 정리합니다.

---

### 5.15.1 보고서 구성

보고서에는 다음 내용을 포함합니다.

\`\`\`text
1. 실습 목적
2. 사용 데이터
3. 생성한 wide format 데이터
4. 생성한 long format 데이터
5. 보고용 표와 시각화용 데이터 구분
6. 주요 결과물
7. 주의사항
\`\`\`

---

### 5.15.2 보고서 작성 코드

\`\`\`python
reshape_report = '''# 5장 실습 보고서: 데이터 재구조화 실습

## 1. 실습 목적

본 실습은 주문 데이터마트를 사용해 분석 목적에 맞게 데이터를 재구조화하는 것을 목적으로 한다.
보고용 표와 시각화용 데이터를 구분하고, pivot_table, melt, stack, unstack, explode의 사용법을 익힌다.

## 2. 사용 데이터

- 입력 데이터: chapter_04_orders_mart.csv 또는 수업용 주문 데이터마트
- 주요 컬럼: order_id, year_month, region, customer_id, customer_name, category, net_amount

## 3. 생성한 보고용 wide format 데이터

- 지역별 카테고리 매출 피벗 테이블
- 월별 카테고리 매출 피벗 테이블
- 고객별 월별 구매 금액 피벗 테이블

wide format은 사람이 표로 비교하기 좋고, Excel 보고서에 적합하다.

## 4. 생성한 시각화용 long format 데이터

- 월별 카테고리 매출 long 데이터
- melt로 변환한 월별 매출 long 데이터
- explode로 펼친 상품 태그 데이터

long format은 groupby, seaborn 시각화, tidy data 분석에 적합하다.

## 5. 주요 결과물

- chapter_05_region_category_pivot.csv
- chapter_05_monthly_category_pivot.csv
- chapter_05_monthly_category_long.csv
- chapter_05_customer_month_pivot.csv
- chapter_05_wide_sales_sample.csv
- chapter_05_long_sales_sample.csv
- chapter_05_exploded_product_tags.csv
- chapter_05_reshape_summary.csv

## 6. 해석

지역별 카테고리 매출 피벗 테이블은 지역 내 카테고리 매출 구조를 비교하는 데 유용하다.
월별 카테고리 매출 long 데이터는 월별 추이 그래프나 카테고리별 line plot을 그릴 때 적합하다.
고객별 월별 구매 금액 피벗 테이블은 고객별 구매 패턴과 총구매액을 비교하는 데 유용하다.

## 7. 주의사항

- pivot은 중복 조합이 있으면 오류가 발생할 수 있다.
- 주문 데이터처럼 중복 조합이 있는 데이터는 pivot_table을 사용하는 것이 안전하다.
- melt는 wide 데이터를 long 데이터로 바꿀 때 사용한다.
- explode는 행 수를 늘리므로 이후 매출 집계 시 중복 계산에 주의해야 한다.
- 보고용 데이터와 시각화용 데이터는 목적이 다르므로 필요한 구조가 다를 수 있다.

## 8. 다음 단계

다음 장에서는 이번 장에서 만든 데이터를 바탕으로 고급 groupby 분석 리포트를 만든다.
transform, filter, 그룹 내 비율, 그룹 내 순위 등을 사용해 더 복잡한 요약 지표를 계산한다.
'''
\`\`\`

파일로 저장합니다.

\`\`\`python
(OUTPUT_REPORTS / "chapter_05_reshape_report.md").write_text(
    reshape_report,
    encoding="utf-8"
)
\`\`\`

---
`;export{e as default};