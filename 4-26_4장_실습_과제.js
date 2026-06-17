var e=`# 4장. 분석용 데이터마트 만들기

## 4.26 4장 실습 과제

이번 장의 과제는 분석용 데이터마트를 직접 만드는 것입니다.

---

### 과제 1. 원본 데이터 복사

주문, 고객, 상품 원본 데이터를 복사해 전처리용 DataFrame을 만드세요.

\`\`\`python
orders = orders_raw.copy()
customers = customers_raw.copy()
products = products_raw.copy()
\`\`\`

---

### 과제 2. 중복값 처리

다음 기준으로 중복을 처리하세요.

\`\`\`text
orders: order_id 기준 첫 번째 행 유지
customers: customer_id 기준 첫 번째 행 유지
products: product_id 기준 첫 번째 행 유지
\`\`\`

처리 전후 행 수를 비교하는 표를 만드세요.

---

### 과제 3. 결측치와 날짜 처리

다음 처리를 수행하세요.

\`\`\`text
coupon_amount 결측치 0으로 대체
order_date 날짜형 변환
signup_date 날짜형 변환
year_month 생성
weekday 생성
\`\`\`

---

### 과제 4. 문자열 표준화

다음 처리를 수행하세요.

\`\`\`text
customer_name 앞뒤 공백 제거
region을 서울, 부산, 대전으로 표준화
\`\`\`

---

### 과제 5. 데이터 결합

다음 결합을 수행하세요.

\`\`\`text
orders + customers: customer_id 기준 left join
orders + products: product_id 기준 left join
\`\`\`

결합 전후 행 수를 확인하세요.

---

### 과제 6. 순매출 계산

다음 컬럼을 만드세요.

\`\`\`text
gross_amount = quantity × unit_price
net_amount = gross_amount - coupon_amount
used_coupon = coupon_amount > 0
\`\`\`

---

### 과제 7. 분석 제외 데이터 분리

다음 조건에 해당하는 주문을 제외 데이터로 분리하세요.

\`\`\`text
quantity <= 0
coupon_amount < 0
상품 정보 없음
net_amount 결측
\`\`\`

제출물:

\`\`\`text
excluded_orders.csv
\`\`\`

---

### 과제 8. 최종 데이터마트 저장

최종 분석용 데이터마트를 저장하세요.

제출물:

\`\`\`text
orders_mart.csv
\`\`\`

---

### 과제 9. 데이터마트 품질 확인

다음 항목을 확인하는 품질 체크표를 만드세요.

\`\`\`text
order_id 중복
net_amount 결측
category 결측
quantity 0 이하
coupon_amount 음수
\`\`\`

제출물:

\`\`\`text
mart_quality_check.csv
\`\`\`

---

### 과제 10. 전처리 로그 작성

다음 구조로 Markdown 전처리 로그를 작성하세요.

\`\`\`markdown
# 전처리 로그

## 1. 전처리 목적

## 2. 사용 데이터

## 3. 중복 처리 기준

## 4. 결측치 처리 기준

## 5. 날짜 처리 기준

## 6. 문자열 처리 기준

## 7. 데이터 결합 기준

## 8. 주문 금액 계산 기준

## 9. 분석 제외 기준

## 10. 처리 결과 요약
\`\`\`

제출물:

\`\`\`text
preprocessing_log.md
\`\`\`

---
`;export{e as default};