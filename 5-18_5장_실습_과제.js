var e=`# 5장. 데이터 재구조화 실습

## 5.18 5장 실습 과제

이번 장의 과제는 데이터마트를 다양한 구조로 바꾸어 저장하는 것입니다.

---

### 과제 1. 지역별 카테고리 매출 피벗 테이블 만들기

다음 조건으로 피벗 테이블을 만드세요.

\`\`\`text
행: region
열: category
값: net_amount 합계
결측 조합: 0으로 채우기
합계 행과 합계 열 추가
\`\`\`

제출물:

\`\`\`text
region_category_pivot.csv
\`\`\`

---

### 과제 2. 월별 카테고리 매출 long 데이터 만들기

다음 컬럼을 가진 long format 데이터를 만드세요.

\`\`\`text
year_month
category
total_sales
order_count
\`\`\`

제출물:

\`\`\`text
monthly_category_long.csv
\`\`\`

---

### 과제 3. 월별 카테고리 매출 피벗 테이블 만들기

다음 조건으로 피벗 테이블을 만드세요.

\`\`\`text
행: year_month
열: category
값: net_amount 합계
결측 조합: 0으로 채우기
월별 합계 컬럼 추가
\`\`\`

제출물:

\`\`\`text
monthly_category_pivot.csv
\`\`\`

---

### 과제 4. 고객별 월별 구매 금액 테이블 만들기

다음 조건으로 피벗 테이블을 만드세요.

\`\`\`text
행: customer_id, customer_name
열: year_month
값: net_amount 합계
결측 조합: 0으로 채우기
총구매액 컬럼 추가
총구매액 기준 내림차순 정렬
\`\`\`

제출물:

\`\`\`text
customer_month_pivot.csv
\`\`\`

---

### 과제 5. wide 데이터를 long 데이터로 변환하기

다음 형태의 wide 데이터를 직접 만들고 melt로 변환하세요.

\`\`\`text
category
2026-01
2026-02
2026-03
2026-04
\`\`\`

변환 후 long 데이터는 다음 컬럼을 가져야 합니다.

\`\`\`text
category
year_month
total_sales
\`\`\`

제출물:

\`\`\`text
wide_sales_sample.csv
long_sales_sample.csv
\`\`\`

---

### 과제 6. 상품 태그 explode

상품별 태그 리스트를 가진 데이터를 만들고 \`explode()\`로 태그를 행으로 펼치세요.

제출물:

\`\`\`text
exploded_product_tags.csv
\`\`\`

---

### 과제 7. 재구조화 요약표 만들기

이번 장에서 생성한 모든 결과물을 다음 형식으로 요약하세요.

\`\`\`text
output_name
format
purpose
file_name
\`\`\`

제출물:

\`\`\`text
reshape_summary.csv
\`\`\`

---

### 과제 8. 재구조화 보고서 작성

다음 구조로 Markdown 보고서를 작성하세요.

\`\`\`markdown
# 데이터 재구조화 실습 보고서

## 1. 실습 목적

## 2. 사용 데이터

## 3. 생성한 wide format 데이터

## 4. 생성한 long format 데이터

## 5. 보고용 표와 시각화용 데이터 구분

## 6. 주요 결과물

## 7. 주의사항

## 8. 다음 단계
\`\`\`

제출물:

\`\`\`text
reshape_report.md
\`\`\`

---
`;export{e as default};