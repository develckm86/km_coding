var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-5 -->

# 15.5 데이터 조회: \`SELECT\`

## 모든 데이터 조회하기

데이터 조회에는 \`SELECT\`를 사용한다.

\`\`\`sql
SELECT *
FROM customers;
\`\`\`

\`*\`는 모든 컬럼을 의미한다. 따라서 위 SQL은 \`customers\` 테이블의 모든 컬럼과 모든 행을 조회한다.

학습할 때는 \`*\`를 자주 사용하지만, 실무에서는 필요한 컬럼만 명시하는 것이 좋다.

## 필요한 컬럼만 조회하기

\`\`\`sql
SELECT name, email
FROM customers;
\`\`\`

위 SQL은 고객 이름과 이메일만 조회한다.

필요한 컬럼만 조회하면 다음 장점이 있다.

- 결과를 읽기 쉽다.
- 불필요한 데이터 전송을 줄일 수 있다.
- 분석에 필요한 데이터 구조가 명확해진다.

## 조건으로 필터링하기: \`WHERE\`

특정 조건에 맞는 데이터만 조회하려면 \`WHERE\`를 사용한다.

\`\`\`sql
SELECT id, name, email
FROM customers
WHERE grade = 'VIP';
\`\`\`

위 SQL은 고객 등급이 \`VIP\`인 고객만 조회한다.

비교 연산자를 사용할 수도 있다.

\`\`\`sql
SELECT *
FROM orders
WHERE amount >= 30000;
\`\`\`

주문 금액이 30,000원 이상인 주문만 조회한다.

## 여러 조건 사용하기

여러 조건을 함께 사용할 때는 \`AND\`, \`OR\`를 사용한다.

\`\`\`sql
SELECT *
FROM orders
WHERE status = 'paid'
  AND amount >= 30000;
\`\`\`

위 SQL은 결제 완료 상태이면서 금액이 30,000원 이상인 주문만 조회한다.

\`\`\`sql
SELECT *
FROM customers
WHERE grade = 'VIP'
   OR grade = 'GOLD';
\`\`\`

위 SQL은 등급이 \`VIP\`이거나 \`GOLD\`인 고객을 조회한다.

## 포함 여부 조회하기: \`IN\`

여러 값 중 하나에 해당하는지 확인할 때는 \`IN\`을 사용할 수 있다.

\`\`\`sql
SELECT *
FROM customers
WHERE grade IN ('VIP', 'GOLD');
\`\`\`

이 SQL은 앞의 \`OR\` 조건을 더 간결하게 표현한 것이다.

## 문자열 패턴 검색: \`LIKE\`

문자열에 특정 패턴이 포함되는지 찾을 때는 \`LIKE\`를 사용할 수 있다.

\`\`\`sql
SELECT *
FROM customers
WHERE email LIKE '%example.com';
\`\`\`

\`%\`는 어떤 문자열이든 올 수 있다는 의미다. 위 SQL은 이메일이 \`example.com\`으로 끝나는 고객을 찾는다.

## 정렬하기: \`ORDER BY\`

조회 결과를 정렬하려면 \`ORDER BY\`를 사용한다.

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount DESC;
\`\`\`

\`DESC\`는 내림차순이다. 금액이 큰 주문부터 정렬한다.

오름차순은 \`ASC\`를 사용한다.

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount ASC;
\`\`\`

오름차순이 기본값이므로 \`ASC\`는 생략할 수 있다.

## 개수 제한하기: \`LIMIT\`

상위 몇 개만 보고 싶을 때는 \`LIMIT\`을 사용한다.

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount DESC
LIMIT 5;
\`\`\`

주문 금액이 큰 상위 5개 주문만 조회한다.

데이터분석 전 단계에서 전체 데이터를 보기 전에 일부만 확인할 때 유용하다.

\`\`\`sql
SELECT *
FROM orders
LIMIT 10;
\`\`\`

이 SQL은 주문 데이터 중 10개만 가져온다.

## 집계 함수 맛보기

데이터분석으로 이어지려면 SQL 집계 함수도 어느 정도 알아두면 좋다.

\`\`\`sql
SELECT COUNT(*)
FROM orders;
\`\`\`

전체 주문 수를 구한다.

\`\`\`sql
SELECT SUM(amount)
FROM orders
WHERE status = 'paid';
\`\`\`

결제 완료된 주문의 총액을 구한다.

\`\`\`sql
SELECT AVG(amount)
FROM orders
WHERE status = 'paid';
\`\`\`

결제 완료된 주문의 평균 금액을 구한다.

## 그룹화 맛보기: \`GROUP BY\`

그룹별 집계를 하려면 \`GROUP BY\`를 사용한다.

\`\`\`sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status;
\`\`\`

주문 상태별 주문 수를 구한다.

\`\`\`sql
SELECT customer_id, SUM(amount)
FROM orders
WHERE status = 'paid'
GROUP BY customer_id;
\`\`\`

고객별 결제 완료 주문 총액을 구한다.

\`GROUP BY\`는 데이터분석에서 매우 자주 사용된다. pandas의 \`groupby()\`와 비슷한 역할을 한다.

---
`;export{e as default};