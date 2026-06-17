var e=`# 15장 데이터베이스 기초

## 이 장에서 배울 내용

지금까지 우리는 파일, API, JSON Lines, CSV 같은 형태로 데이터를 다루었다. 이러한 방식은 작고 단순한 데이터에는 충분히 편리하다. 예를 들어 하루에 한 번 내려받은 CSV 파일을 읽고, 필요한 행만 골라 새 파일로 저장하는 작업은 파일만으로도 처리할 수 있다.

하지만 데이터가 계속 쌓이고, 여러 프로그램이 같은 데이터를 읽고 쓰고, 특정 조건의 데이터를 빠르게 찾아야 한다면 파일만으로는 점점 불편해진다. 파일은 기본적으로 “저장된 덩어리”에 가깝다. 반면 데이터베이스는 데이터를 구조화해서 저장하고, 필요한 데이터만 조건에 맞게 꺼낼 수 있도록 설계된 시스템이다.

데이터분석 과정으로 넘어가기 전에 데이터베이스를 배우는 이유도 여기에 있다. 실제 분석 업무에서 원천 데이터는 CSV 파일로만 제공되지 않는다. 사내 시스템의 주문 데이터, 회원 데이터, 로그 데이터, 결제 데이터, 재고 데이터는 데이터베이스에 저장되어 있는 경우가 많다. 분석가는 엑셀 파일을 기다리는 것이 아니라, 데이터베이스에서 필요한 데이터를 직접 조회해야 할 때가 많다.

이 장에서는 복잡한 데이터베이스 관리자가 되는 것을 목표로 하지 않는다. 목표는 파이썬 프로그램에서 데이터베이스를 안전하게 연결하고, SQL로 데이터를 저장·조회·수정·삭제하며, 이후 데이터분석 과정에서 필요한 데이터를 꺼낼 수 있는 기초 역량을 갖추는 것이다.

이 장에서는 다음 내용을 다룬다.

- 데이터베이스가 필요한 이유
- 파일 저장과 데이터베이스 저장의 차이
- SQLite의 특징
- 테이블, 행, 열, 스키마, 기본 키의 개념
- SQL의 기본 문법
- \`SELECT\`, \`WHERE\`, \`ORDER BY\`, \`LIMIT\`
- \`INSERT\`, \`UPDATE\`, \`DELETE\`
- 파이썬의 \`sqlite3\` 모듈 사용법
- 연결, 커서, 쿼리 실행, 결과 가져오기
- 안전한 파라미터 바인딩
- SQL Injection 기초
- 트랜잭션, \`commit\`, \`rollback\`
- API 또는 CSV 데이터를 SQLite에 저장하는 구조
- 분석용 데이터를 CSV로 내보내는 흐름

---

# 15.1 데이터베이스가 필요한 이유

## 파일만으로 데이터를 관리할 때의 한계

처음에는 파일 저장이 가장 쉽다. 텍스트 파일, CSV 파일, JSON 파일은 만들기도 쉽고 확인하기도 쉽다. 특히 CSV 파일은 엑셀에서도 열 수 있기 때문에 업무에서 자주 사용된다.

예를 들어 주문 데이터를 다음과 같은 CSV 파일로 저장할 수 있다.

\`\`\`csv
order_id,customer_name,amount,status
1,김민수,30000,paid
2,이지영,15000,canceled
3,박철수,45000,paid
\`\`\`

이 정도 규모라면 파일로 관리해도 문제가 크지 않다. 그러나 데이터가 많아지고 조건이 복잡해지면 다음 문제가 생긴다.

- 특정 고객의 주문만 빠르게 찾기 어렵다.
- 여러 파일에 나뉜 데이터를 합치기 번거롭다.
- 중복 데이터를 막기 어렵다.
- 여러 사람이 동시에 데이터를 수정하기 어렵다.
- 데이터 형식이 잘못 들어가도 즉시 막기 어렵다.
- 주문 데이터와 고객 데이터처럼 서로 관련된 데이터를 연결하기 어렵다.
- 분석할 때마다 매번 파일 전체를 읽어야 할 수 있다.

파일은 단순 저장에는 좋지만, 데이터가 커지고 관계가 생기고 조회 조건이 많아질수록 한계가 분명해진다.

## 데이터베이스는 데이터를 구조화해서 저장한다

데이터베이스는 데이터를 체계적으로 저장하고 관리하기 위한 시스템이다. 데이터베이스를 사용하면 데이터를 표 형태로 나누어 저장하고, 필요한 데이터만 조건에 맞게 조회할 수 있다.

예를 들어 주문 데이터와 고객 데이터를 각각 다른 테이블로 저장할 수 있다.

\`\`\`text
customers 테이블
+----+--------+-------------------+
| id | name   | email             |
+----+--------+-------------------+
| 1  | 김민수 | minsu@example.com |
| 2  | 이지영 | jiyoung@example.com |
+----+--------+-------------------+
\`\`\`

\`\`\`text
orders 테이블
+----+-------------+--------+--------+
| id | customer_id | amount | status |
+----+-------------+--------+--------+
| 1  | 1           | 30000  | paid   |
| 2  | 2           | 15000  | canceled |
+----+-------------+--------+--------+
\`\`\`

이렇게 나누어 저장하면 주문 데이터에 고객 이름과 이메일을 매번 중복해서 저장하지 않아도 된다. 주문에는 고객 번호만 저장하고, 고객 상세 정보는 고객 테이블에서 관리하면 된다.

이 방식은 처음에는 파일보다 복잡해 보일 수 있다. 하지만 데이터가 커질수록 훨씬 안정적이다.

## 데이터베이스가 잘하는 일

데이터베이스는 다음 작업에 강하다.

첫째, 필요한 데이터만 빠르게 찾을 수 있다.

\`\`\`sql
SELECT *
FROM orders
WHERE status = 'paid';
\`\`\`

위 SQL은 주문 중에서 상태가 \`paid\`인 데이터만 가져온다.

둘째, 데이터를 정렬할 수 있다.

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount DESC;
\`\`\`

위 SQL은 주문 데이터를 금액이 큰 순서로 정렬한다.

셋째, 데이터 개수를 제한할 수 있다.

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount DESC
LIMIT 10;
\`\`\`

위 SQL은 주문 금액이 큰 상위 10개만 가져온다.

넷째, 중복되면 안 되는 데이터를 제한할 수 있다.

예를 들어 고객 이메일이 중복되면 안 된다면, 데이터베이스에서 이메일 컬럼에 \`UNIQUE\` 제약을 걸 수 있다.

다섯째, 여러 작업을 하나의 단위로 처리할 수 있다.

주문을 저장하고, 재고를 차감하고, 결제 기록을 남기는 작업은 모두 함께 성공해야 한다. 중간에 하나라도 실패하면 앞의 작업도 되돌려야 한다. 이런 작업 단위를 트랜잭션이라고 한다.

## 데이터분석에서 데이터베이스가 중요한 이유

데이터분석을 할 때 자주 하는 질문은 다음과 같다.

- 지난 30일 동안의 주문은 몇 건인가?
- 결제 완료된 주문의 총 매출은 얼마인가?
- 고객별 주문 횟수는 몇 회인가?
- 특정 상품을 구매한 고객은 누구인가?
- 취소된 주문 비율은 얼마인가?

이런 질문은 대부분 데이터베이스에서 SQL로 먼저 조회할 수 있다. 물론 pandas로도 처리할 수 있지만, 원천 데이터가 데이터베이스에 있다면 필요한 데이터만 SQL로 먼저 가져오는 것이 더 효율적일 때가 많다.

데이터분석 수업에서 pandas를 배우더라도, 실무에서는 다음 흐름을 자주 사용한다.

\`\`\`text
데이터베이스에서 필요한 데이터 조회
        ↓
CSV 또는 DataFrame으로 가져오기
        ↓
pandas로 정리, 분석, 시각화
\`\`\`

따라서 데이터베이스 기초를 알고 있으면 이후 데이터분석 과정에서 훨씬 자연스럽게 데이터를 다룰 수 있다.

---

# 15.2 데이터베이스 기본 개념

## 데이터베이스

데이터베이스는 데이터를 저장하고 관리하는 공간이다. 하나의 데이터베이스 안에는 여러 테이블이 들어갈 수 있다.

예를 들어 쇼핑몰 데이터베이스에는 다음 테이블들이 있을 수 있다.

\`\`\`text
shop.db
├── customers
├── products
├── orders
└── payments
\`\`\`

각 테이블은 특정 주제의 데이터를 담는다.

- \`customers\`: 고객 정보
- \`products\`: 상품 정보
- \`orders\`: 주문 정보
- \`payments\`: 결제 정보

## 테이블

테이블은 행과 열로 이루어진 데이터 구조다. 엑셀 시트와 비슷하게 생각할 수 있다.

\`\`\`text
customers
+----+--------+-------------------+
| id | name   | email             |
+----+--------+-------------------+
| 1  | 김민수 | minsu@example.com |
| 2  | 이지영 | jiyoung@example.com |
+----+--------+-------------------+
\`\`\`

테이블은 같은 종류의 데이터를 모아둔다. 고객 테이블에는 고객 데이터만, 상품 테이블에는 상품 데이터만 넣는 것이 좋다.

## 행과 열

테이블에서 하나의 가로줄을 행이라고 한다. 행은 하나의 데이터 항목을 의미한다.

예를 들어 고객 테이블에서 한 행은 한 명의 고객을 의미한다.

\`\`\`text
1, 김민수, minsu@example.com
\`\`\`

세로 방향의 항목은 열이라고 한다. 열은 데이터의 속성을 의미한다.

\`\`\`text
id
name
email
\`\`\`

파이썬의 딕셔너리와 비교하면 다음과 비슷하다.

\`\`\`python
customer = {
    "id": 1,
    "name": "김민수",
    "email": "minsu@example.com",
}
\`\`\`

딕셔너리 하나가 테이블의 한 행에 가깝고, 딕셔너리의 key가 테이블의 열 이름에 가깝다.

## 스키마

스키마는 데이터베이스나 테이블의 구조를 의미한다. 어떤 테이블이 있고, 각 테이블에는 어떤 열이 있으며, 각 열에는 어떤 종류의 값이 들어가는지를 정한 것이 스키마다.

예를 들어 고객 테이블의 스키마는 다음처럼 설계할 수 있다.

\`\`\`text
customers
- id: 정수, 기본 키
- name: 문자열, 필수
- email: 문자열, 중복 불가
- created_at: 문자열 또는 날짜, 생성일
\`\`\`

SQL로는 다음처럼 작성할 수 있다.

\`\`\`sql
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TEXT
);
\`\`\`

스키마를 잘 설계하면 데이터가 아무렇게나 들어가는 것을 막을 수 있다.

## 기본 키

기본 키는 테이블의 각 행을 구분하는 고유한 값이다. 보통 \`id\`라는 이름을 사용한다.

\`\`\`text
customers
+----+--------+
| id | name   |
+----+--------+
| 1  | 김민수 |
| 2  | 김민수 |
+----+--------+
\`\`\`

이름이 같은 고객이 있을 수 있다. 하지만 \`id\`는 서로 달라야 한다. 그래서 특정 고객을 정확히 구분하려면 이름보다 \`id\`를 사용하는 것이 좋다.

기본 키는 다음 상황에서 중요하다.

- 특정 행을 정확히 찾을 때
- 다른 테이블에서 해당 데이터를 참조할 때
- 중복 저장을 막을 때
- 데이터 수정과 삭제 대상을 명확히 지정할 때

## 외래 키 맛보기

외래 키는 다른 테이블의 기본 키를 참조하는 값이다.

예를 들어 주문 테이블에는 고객 이름을 직접 저장하는 대신 \`customer_id\`를 저장할 수 있다.

\`\`\`text
customers
+----+--------+
| id | name   |
+----+--------+
| 1  | 김민수 |
| 2  | 이지영 |
+----+--------+
\`\`\`

\`\`\`text
orders
+----+-------------+--------+
| id | customer_id | amount |
+----+-------------+--------+
| 1  | 1           | 30000  |
| 2  | 2           | 15000  |
+----+-------------+--------+
\`\`\`

여기서 \`orders.customer_id\`는 \`customers.id\`를 참조한다. 이를 통해 주문이 어떤 고객의 주문인지 연결할 수 있다.

이번 장에서는 외래 키를 깊게 다루지는 않는다. 다만 데이터분석에서 여러 테이블을 연결할 때 이 개념이 중요하다는 점은 기억해야 한다.

---

# 15.3 SQLite

## SQLite란 무엇인가

SQLite는 가볍게 사용할 수 있는 파일 기반 데이터베이스다. 일반적인 데이터베이스 서버처럼 별도의 서버 프로그램을 실행하지 않아도 된다. 데이터베이스 전체가 하나의 파일로 저장된다.

예를 들어 다음 파일 하나가 데이터베이스가 될 수 있다.

\`\`\`text
shop.db
\`\`\`

이 파일 안에 \`customers\`, \`orders\`, \`products\` 같은 여러 테이블을 만들 수 있다.

파이썬에는 SQLite를 사용할 수 있는 \`sqlite3\` 모듈이 표준 라이브러리로 포함되어 있다. 그래서 별도의 외부 라이브러리를 설치하지 않고도 SQLite 데이터베이스를 다룰 수 있다.

## SQLite가 학습에 좋은 이유

SQLite는 파이썬으로 데이터베이스를 배우기에 좋다.

- 별도 서버 설치가 필요 없다.
- 데이터베이스가 파일 하나로 저장된다.
- 파이썬 표준 라이브러리 \`sqlite3\`로 사용할 수 있다.
- SQL 기초를 연습하기 좋다.
- 작은 자동화 프로그램이나 로컬 데이터 저장에 적합하다.
- 데이터분석 전 단계에서 원천 데이터를 임시로 저장하기 좋다.

## SQLite를 사용하기 좋은 상황

SQLite는 다음 상황에 잘 맞는다.

- 개인 프로젝트
- 학습용 데이터베이스
- 로컬 자동화 도구
- 작은 규모의 데이터 저장
- API 수집 결과 임시 저장
- CSV 처리 결과 저장
- 테스트용 데이터베이스

예를 들어 API에서 매일 주문 데이터를 가져와 SQLite에 저장한 뒤, 필요할 때 날짜 기준으로 조회할 수 있다.

\`\`\`text
API 데이터 수집
      ↓
SQLite에 저장
      ↓
필요한 기간만 조회
      ↓
CSV 또는 pandas로 분석
\`\`\`

## SQLite가 적합하지 않을 수 있는 상황

SQLite가 모든 상황에 적합한 것은 아니다. 다음과 같은 경우에는 PostgreSQL, MySQL 같은 서버형 데이터베이스가 더 적합할 수 있다.

- 여러 사용자가 동시에 많은 쓰기 작업을 하는 서비스
- 대규모 운영 시스템
- 복잡한 권한 관리가 필요한 시스템
- 네트워크를 통해 여러 서버가 동시에 접근해야 하는 환경
- 고가용성, 복제, 백업 정책이 중요한 서비스

이 장에서는 실무 서비스 운영용 데이터베이스가 아니라, 파이썬 학습과 데이터 처리 기반으로 SQLite를 사용한다.

---

# 15.4 SQL 기초

## SQL이란 무엇인가

SQL은 데이터베이스에 명령을 내리는 언어다. 파이썬이 컴퓨터에게 작업을 시키는 언어라면, SQL은 데이터베이스에게 작업을 시키는 언어라고 생각할 수 있다.

예를 들어 데이터베이스에게 다음과 같이 요청할 수 있다.

\`\`\`sql
SELECT *
FROM customers;
\`\`\`

이 SQL은 \`customers\` 테이블의 모든 데이터를 조회하라는 의미다.

SQL은 크게 다음 작업에 사용된다.

- 테이블 만들기
- 데이터 추가하기
- 데이터 조회하기
- 데이터 수정하기
- 데이터 삭제하기
- 조건에 맞는 데이터 찾기
- 데이터를 정렬하기
- 데이터를 집계하기

## SQL 키워드와 대소문자

SQL 키워드는 보통 대문자로 작성한다.

\`\`\`sql
SELECT * FROM customers;
\`\`\`

하지만 대부분의 경우 소문자로 써도 동작한다.

\`\`\`sql
select * from customers;
\`\`\`

실무에서는 SQL 키워드를 대문자로 쓰고, 테이블명과 컬럼명을 소문자로 쓰는 스타일을 자주 사용한다.

\`\`\`sql
SELECT name, email
FROM customers
WHERE grade = 'VIP';
\`\`\`

대문자로 쓰는 이유는 SQL 키워드와 이름을 구분하기 쉽게 하기 위해서다.

## SQL 문장은 세미콜론으로 끝낸다

SQL 문장은 보통 세미콜론으로 끝낸다.

\`\`\`sql
SELECT * FROM customers;
\`\`\`

파이썬의 \`sqlite3\`에서 한 문장씩 실행할 때는 세미콜론이 없어도 동작하는 경우가 많다. 하지만 SQL 학습과 문서 작성에서는 세미콜론을 붙이는 습관을 들이는 것이 좋다.

## 테이블 만들기: \`CREATE TABLE\`

테이블을 만들 때는 \`CREATE TABLE\`을 사용한다.

\`\`\`sql
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    grade TEXT
);
\`\`\`

위 SQL은 \`customers\`라는 테이블을 만든다. 테이블에는 네 개의 컬럼이 있다.

- \`id\`: 고객을 구분하는 정수 기본 키
- \`name\`: 고객 이름, 반드시 있어야 함
- \`email\`: 이메일, 중복되면 안 됨
- \`grade\`: 고객 등급

## SQLite의 주요 자료형

SQLite에서 자주 사용하는 자료형은 다음과 같다.

| 자료형 | 의미 | 예시 |
|---|---|---|
| \`INTEGER\` | 정수 | \`1\`, \`100\`, \`-5\` |
| \`REAL\` | 실수 | \`3.14\`, \`0.15\` |
| \`TEXT\` | 문자열 | \`'김민수'\`, \`'paid'\` |
| \`BLOB\` | 바이너리 데이터 | 이미지, 파일 조각 등 |
| \`NULL\` | 값 없음 | \`NULL\` |

파이썬의 자료형과 비교하면 다음과 비슷하게 생각할 수 있다.

| 파이썬 | SQLite |
|---|---|
| \`int\` | \`INTEGER\` |
| \`float\` | \`REAL\` |
| \`str\` | \`TEXT\` |
| \`bytes\` | \`BLOB\` |
| \`None\` | \`NULL\` |

## 제약 조건

제약 조건은 데이터가 잘못 들어가지 않도록 제한하는 규칙이다.

\`\`\`sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    sku TEXT UNIQUE
);
\`\`\`

여기에는 다음 제약 조건이 사용되었다.

- \`PRIMARY KEY\`: 각 행을 구분하는 기본 키
- \`NOT NULL\`: 값이 반드시 있어야 함
- \`UNIQUE\`: 중복되면 안 됨

제약 조건은 데이터 품질을 지키는 중요한 장치다.

---

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

# 15.6 데이터 추가, 수정, 삭제

## 데이터 추가: \`INSERT\`

테이블에 새 데이터를 추가할 때는 \`INSERT\`를 사용한다.

\`\`\`sql
INSERT INTO customers (name, email, grade)
VALUES ('김민수', 'minsu@example.com', 'VIP');
\`\`\`

\`id\` 컬럼은 \`INTEGER PRIMARY KEY\`로 만들면 SQLite가 자동으로 값을 증가시켜 넣어줄 수 있다. 그래서 \`INSERT\`할 때 \`id\`를 생략할 수 있다.

여러 행을 추가할 수도 있다.

\`\`\`sql
INSERT INTO customers (name, email, grade)
VALUES
    ('이지영', 'jiyoung@example.com', 'GOLD'),
    ('박철수', 'chulsoo@example.com', 'BASIC');
\`\`\`

## 데이터 수정: \`UPDATE\`

기존 데이터를 수정할 때는 \`UPDATE\`를 사용한다.

\`\`\`sql
UPDATE customers
SET grade = 'VIP'
WHERE email = 'jiyoung@example.com';
\`\`\`

위 SQL은 이메일이 \`jiyoung@example.com\`인 고객의 등급을 \`VIP\`로 변경한다.

## \`UPDATE\`에서 \`WHERE\`를 빼면 위험하다

다음 SQL은 매우 위험하다.

\`\`\`sql
UPDATE customers
SET grade = 'VIP';
\`\`\`

\`WHERE\` 조건이 없기 때문에 모든 고객의 등급이 \`VIP\`로 바뀐다. 실무에서는 \`UPDATE\`를 실행하기 전에 반드시 어떤 행이 대상인지 \`SELECT\`로 먼저 확인하는 습관이 필요하다.

\`\`\`sql
SELECT *
FROM customers
WHERE email = 'jiyoung@example.com';
\`\`\`

확인한 뒤 \`UPDATE\`를 실행하는 것이 안전하다.

## 데이터 삭제: \`DELETE\`

데이터를 삭제할 때는 \`DELETE\`를 사용한다.

\`\`\`sql
DELETE FROM customers
WHERE email = 'chulsoo@example.com';
\`\`\`

이 SQL은 해당 이메일을 가진 고객을 삭제한다.

## \`DELETE\`에서 \`WHERE\`를 빼면 위험하다

다음 SQL도 매우 위험하다.

\`\`\`sql
DELETE FROM customers;
\`\`\`

조건이 없기 때문에 테이블의 모든 데이터가 삭제된다.

실무에서 삭제 작업은 특히 조심해야 한다. 삭제 전에는 반드시 조회로 대상을 확인해야 한다.

\`\`\`sql
SELECT *
FROM customers
WHERE email = 'chulsoo@example.com';
\`\`\`

그리고 실제 삭제를 실행한다.

\`\`\`sql
DELETE FROM customers
WHERE email = 'chulsoo@example.com';
\`\`\`

## 실무에서 삭제 대신 상태값을 쓰는 경우

실무에서는 실제로 행을 삭제하지 않고 상태값을 바꾸는 경우도 많다.

\`\`\`sql
UPDATE customers
SET status = 'deleted'
WHERE id = 3;
\`\`\`

이런 방식을 소프트 삭제라고 부르기도 한다. 데이터를 완전히 지우는 대신, 삭제된 것처럼 상태만 표시한다. 나중에 복구하거나 이력을 확인해야 하는 시스템에서는 이런 방식이 더 안전할 수 있다.

---

# 15.7 파이썬에서 SQLite 사용하기

## \`sqlite3\` 모듈 가져오기

파이썬에서 SQLite를 사용하려면 \`sqlite3\` 모듈을 import한다.

\`\`\`python
import sqlite3
\`\`\`

\`sqlite3\`는 파이썬 표준 라이브러리에 포함되어 있으므로 별도로 설치하지 않아도 된다.

## 데이터베이스 연결하기

다음 코드는 \`shop.db\`라는 SQLite 데이터베이스 파일에 연결한다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
\`\`\`

파일이 이미 있으면 그 파일에 연결하고, 파일이 없으면 새로 만든다.

## 커서 만들기

데이터베이스에 SQL을 실행하려면 커서를 사용한다.

\`\`\`python
cursor = connection.cursor()
\`\`\`

커서는 데이터베이스에 명령을 보내고, 조회 결과를 가져오는 역할을 한다.

## 테이블 만들기

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    grade TEXT
)
""")

connection.commit()
connection.close()
\`\`\`

여기서 \`CREATE TABLE IF NOT EXISTS\`는 같은 이름의 테이블이 없을 때만 테이블을 만든다. 이미 테이블이 있으면 에러를 내지 않고 넘어간다.

## 데이터 추가하기

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("""
INSERT INTO customers (name, email, grade)
VALUES (?, ?, ?)
""", ("김민수", "minsu@example.com", "VIP"))

connection.commit()
connection.close()
\`\`\`

여기서 중요한 것은 SQL 문자열 안에 직접 값을 넣지 않고 \`?\`를 사용했다는 점이다.

\`\`\`python
VALUES (?, ?, ?)
\`\`\`

그리고 실제 값은 두 번째 인자로 전달했다.

\`\`\`python
("김민수", "minsu@example.com", "VIP")
\`\`\`

이 방식을 파라미터 바인딩이라고 한다. 뒤에서 더 자세히 다룬다.

## 여러 데이터 추가하기

여러 행을 추가할 때는 \`executemany()\`를 사용할 수 있다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

customers = [
    ("이지영", "jiyoung@example.com", "GOLD"),
    ("박철수", "chulsoo@example.com", "BASIC"),
    ("최영희", "younghee@example.com", "VIP"),
]

cursor.executemany("""
INSERT INTO customers (name, email, grade)
VALUES (?, ?, ?)
""", customers)

connection.commit()
connection.close()
\`\`\`

반복문으로 \`execute()\`를 여러 번 호출할 수도 있지만, 여러 데이터를 한 번에 넣을 때는 \`executemany()\`가 더 깔끔하다.

## 데이터 조회하기

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("SELECT id, name, email, grade FROM customers")
rows = cursor.fetchall()

for row in rows:
    print(row)

connection.close()
\`\`\`

\`fetchall()\`은 조회 결과를 모두 가져온다. 결과는 보통 튜플의 리스트 형태로 반환된다.

\`\`\`text
(1, '김민수', 'minsu@example.com', 'VIP')
(2, '이지영', 'jiyoung@example.com', 'GOLD')
\`\`\`

## 한 행만 가져오기

결과가 하나만 필요할 때는 \`fetchone()\`을 사용한다.

\`\`\`python
cursor.execute("""
SELECT id, name, email, grade
FROM customers
WHERE email = ?
""", ("minsu@example.com",))

row = cursor.fetchone()
print(row)
\`\`\`

주의할 점은 값이 하나인 튜플을 만들 때 쉼표가 필요하다는 것이다.

\`\`\`python
("minsu@example.com",)
\`\`\`

쉼표가 없으면 튜플이 아니라 문자열로 처리된다.

## 조회 결과를 딕셔너리처럼 다루기

기본적으로 \`sqlite3\`의 조회 결과는 튜플이다. 컬럼 이름으로 접근하고 싶다면 \`row_factory\`를 사용할 수 있다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

cursor.execute("SELECT id, name, email, grade FROM customers")
rows = cursor.fetchall()

for row in rows:
    print(row["name"], row["email"])

connection.close()
\`\`\`

이 방식은 분석 전처리 코드에서 가독성을 높이는 데 도움이 된다.

## \`with\` 문으로 연결 관리하기

SQLite 연결 객체는 컨텍스트 매니저로 사용할 수 있다. \`with\` 문을 사용하면 작업이 정상적으로 끝났을 때 커밋하고, 예외가 발생하면 롤백하는 흐름을 만들 수 있다.

\`\`\`python
import sqlite3

with sqlite3.connect("shop.db") as connection:
    cursor = connection.cursor()
    cursor.execute("""
    INSERT INTO customers (name, email, grade)
    VALUES (?, ?, ?)
    """, ("한서준", "seojun@example.com", "BASIC"))
\`\`\`

다만 \`with sqlite3.connect(...) as connection:\`을 사용해도 연결이 완전히 자동으로 닫히는 것까지 대신해주는 방식으로 이해하면 곤란하다. 실무에서는 명시적으로 \`close()\`를 호출하거나, 연결을 관리하는 함수를 따로 만드는 방식도 많이 사용한다.

간단한 학습 코드에서는 다음처럼 \`try-finally\`를 사용해도 좋다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
try:
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM customers")
    count = cursor.fetchone()[0]
    print(count)
finally:
    connection.close()
\`\`\`

---

# 15.8 안전한 쿼리 작성

## 문자열 포매팅으로 SQL을 만들면 위험하다

사용자 입력값을 SQL 문자열에 직접 넣으면 위험하다.

다음 코드는 좋지 않은 예다.

\`\`\`python
email = input("이메일: ")

sql = f"SELECT * FROM customers WHERE email = '{email}'"
cursor.execute(sql)
\`\`\`

겉으로 보기에는 편해 보인다. 하지만 사용자가 예상하지 못한 값을 입력하면 SQL 구조 자체가 바뀔 수 있다. 이것이 SQL Injection의 기본 원리다.

## SQL Injection이란?

SQL Injection은 사용자가 입력한 값이 SQL 명령의 일부로 해석되어 의도하지 않은 동작을 일으키는 공격 방식이다.

예를 들어 로그인 코드가 다음처럼 작성되어 있다고 가정하자.

\`\`\`python
email = input("이메일: ")
password = input("비밀번호: ")

sql = f"""
SELECT *
FROM users
WHERE email = '{email}'
  AND password = '{password}'
"""

cursor.execute(sql)
\`\`\`

사용자가 정상적인 이메일과 비밀번호를 입력한다면 큰 문제가 없어 보인다. 그러나 입력값이 SQL 구조를 깨뜨리도록 만들어지면 인증 조건이 우회될 수도 있다.

이 장에서 실제 공격 코드를 자세히 다루지는 않는다. 중요한 것은 “사용자 입력값을 SQL 문자열에 직접 붙이지 않는다”는 원칙이다.

## 파라미터 바인딩 사용하기

안전한 방식은 \`?\` 자리 표시자를 사용하고, 실제 값은 별도로 전달하는 것이다.

\`\`\`python
email = input("이메일: ")

cursor.execute("""
SELECT id, name, email
FROM customers
WHERE email = ?
""", (email,))
\`\`\`

이렇게 작성하면 입력값은 SQL 명령이 아니라 값으로 처리된다.

## 여러 파라미터 전달하기

\`\`\`python
grade = "VIP"
min_amount = 30000

cursor.execute("""
SELECT c.name, c.email, o.amount
FROM customers AS c
JOIN orders AS o ON c.id = o.customer_id
WHERE c.grade = ?
  AND o.amount >= ?
""", (grade, min_amount))
\`\`\`

\`?\`의 개수와 전달하는 값의 개수가 맞아야 한다.

## named parameter 사용하기

\`sqlite3\`에서는 이름 있는 파라미터도 사용할 수 있다.

\`\`\`python
cursor.execute("""
SELECT id, name, email
FROM customers
WHERE grade = :grade
""", {"grade": "VIP"})
\`\`\`

파라미터가 많아지면 이름 있는 방식이 더 읽기 쉬울 수 있다.

## 테이블명과 컬럼명은 파라미터로 바인딩할 수 없다

다음과 같은 코드는 기대대로 동작하지 않는다.

\`\`\`python
table_name = "customers"

cursor.execute("SELECT * FROM ?", (table_name,))
\`\`\`

파라미터 바인딩은 값에 사용한다. 테이블명이나 컬럼명 같은 SQL 구조에는 사용할 수 없다.

테이블명을 동적으로 바꿔야 한다면 허용된 이름인지 직접 검사해야 한다.

\`\`\`python
allowed_tables = {"customers", "orders"}
table_name = "customers"

if table_name not in allowed_tables:
    raise ValueError("허용되지 않은 테이블명입니다.")

sql = f"SELECT * FROM {table_name}"
cursor.execute(sql)
\`\`\`

이처럼 SQL 구조를 동적으로 만들 때는 반드시 허용 목록을 사용해야 한다.

---

# 15.9 트랜잭션

## 트랜잭션이란 무엇인가

트랜잭션은 여러 데이터베이스 작업을 하나의 단위로 묶는 개념이다. 하나의 트랜잭션 안에 있는 작업들은 모두 성공하거나, 하나라도 실패하면 모두 취소되어야 한다.

예를 들어 주문 처리를 생각해보자.

\`\`\`text
1. 주문 생성
2. 결제 기록 저장
3. 재고 차감
\`\`\`

이 세 작업은 함께 성공해야 한다. 주문은 생성되었는데 결제 기록 저장이 실패하거나, 재고 차감만 실패하면 데이터가 이상해진다.

트랜잭션은 이런 상황에서 데이터의 일관성을 지켜준다.

## \`commit\`

데이터 변경 작업을 실제로 저장하려면 \`commit()\`이 필요하다.

\`\`\`python
connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("""
INSERT INTO customers (name, email, grade)
VALUES (?, ?, ?)
""", ("정다은", "daeun@example.com", "BASIC"))

connection.commit()
connection.close()
\`\`\`

\`commit()\`을 하지 않으면 변경 내용이 데이터베이스 파일에 저장되지 않을 수 있다.

## \`rollback\`

작업 중 에러가 발생했을 때 변경 내용을 되돌리려면 \`rollback()\`을 사용한다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")

try:
    cursor = connection.cursor()

    cursor.execute("""
    INSERT INTO customers (name, email, grade)
    VALUES (?, ?, ?)
    """, ("오하늘", "haneul@example.com", "BASIC"))

    cursor.execute("""
    INSERT INTO orders (customer_id, amount, status)
    VALUES (?, ?, ?)
    """, (9999, 25000, "paid"))

    connection.commit()

except sqlite3.Error as error:
    connection.rollback()
    print("데이터베이스 작업 실패:", error)

finally:
    connection.close()
\`\`\`

이 코드는 중간에 실패하면 앞에서 실행한 변경도 취소한다.

## 트랜잭션을 사용할 때의 사고방식

트랜잭션을 사용할 때는 다음 질문을 생각해보면 좋다.

\`\`\`text
이 작업들은 따로 성공해도 되는가?
아니면 모두 함께 성공해야 하는가?
\`\`\`

모두 함께 성공해야 한다면 하나의 트랜잭션으로 묶어야 한다.

## 데이터분석 전처리에서 트랜잭션이 필요한 경우

분석용 데이터를 수집할 때도 트랜잭션이 필요할 수 있다.

예를 들어 API에서 1000건의 데이터를 가져와 데이터베이스에 저장한다고 하자. 중간에 700건까지 저장하고 701번째에서 실패하면 어떻게 해야 할까?

상황에 따라 선택이 다르다.

첫 번째 방식은 전체를 실패로 보고 모두 취소하는 것이다.

\`\`\`text
1000건 중 하나라도 실패하면 전체 저장 취소
\`\`\`

두 번째 방식은 성공한 행은 저장하고 실패한 행만 따로 기록하는 것이다.

\`\`\`text
성공한 행 저장
실패한 행은 errors 테이블 또는 로그 파일에 기록
\`\`\`

어떤 방식이 맞는지는 업무 요구사항에 따라 다르다. 중요한 것은 의도적으로 선택해야 한다는 점이다.

---

# 15.10 실습 데이터베이스 만들기

이번 절에서는 고객과 주문 데이터를 저장하는 작은 데이터베이스를 만든다. 이후 절에서 이 데이터를 조회하고 분석용으로 내보낸다.

## 전체 코드

아래 코드를 \`create_shop_db.py\`로 저장해 실행해보자.

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def create_tables(connection: sqlite3.Connection) -> None:
    cursor = connection.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        grade TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        status TEXT NOT NULL,
        ordered_at TEXT NOT NULL
    )
    """)


def insert_sample_data(connection: sqlite3.Connection) -> None:
    cursor = connection.cursor()

    customers = [
        (1, "김민수", "minsu@example.com", "VIP"),
        (2, "이지영", "jiyoung@example.com", "GOLD"),
        (3, "박철수", "chulsoo@example.com", "BASIC"),
        (4, "최영희", "younghee@example.com", "VIP"),
    ]

    orders = [
        (1, 1, 30000, "paid", "2026-06-01"),
        (2, 1, 45000, "paid", "2026-06-03"),
        (3, 2, 15000, "canceled", "2026-06-05"),
        (4, 3, 22000, "paid", "2026-06-07"),
        (5, 4, 80000, "paid", "2026-06-10"),
    ]

    cursor.executemany("""
    INSERT OR IGNORE INTO customers (id, name, email, grade)
    VALUES (?, ?, ?, ?)
    """, customers)

    cursor.executemany("""
    INSERT OR IGNORE INTO orders (id, customer_id, amount, status, ordered_at)
    VALUES (?, ?, ?, ?, ?)
    """, orders)


def main() -> None:
    with sqlite3.connect(DB_PATH) as connection:
        create_tables(connection)
        insert_sample_data(connection)

    print(f"데이터베이스 생성 완료: {DB_PATH}")


if __name__ == "__main__":
    main()
\`\`\`

## 코드 설명

이 코드는 \`shop.db\` 파일을 만든다. 그리고 두 개의 테이블을 생성한다.

- \`customers\`
- \`orders\`

\`customers\` 테이블은 고객 정보를 저장한다.

\`\`\`sql
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    grade TEXT NOT NULL
)
\`\`\`

\`orders\` 테이블은 주문 정보를 저장한다.

\`\`\`sql
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL,
    ordered_at TEXT NOT NULL
)
\`\`\`

그리고 \`executemany()\`를 사용해 샘플 데이터를 여러 건 추가한다.

\`\`\`python
cursor.executemany("""
INSERT OR IGNORE INTO customers (id, name, email, grade)
VALUES (?, ?, ?, ?)
""", customers)
\`\`\`

\`INSERT OR IGNORE\`는 같은 기본 키나 중복 이메일 때문에 삽입할 수 없는 행이 있으면 에러를 내지 않고 무시한다. 학습용 샘플 데이터를 여러 번 실행할 때 유용하다.

실무에서는 무조건 \`INSERT OR IGNORE\`를 쓰기보다, 중복 데이터를 어떻게 처리할지 명확히 정해야 한다.

---

# 15.11 파이썬으로 데이터 조회하기

## 전체 고객 조회

\`\`\`python
import sqlite3

with sqlite3.connect("shop.db") as connection:
    cursor = connection.cursor()

    cursor.execute("""
    SELECT id, name, email, grade
    FROM customers
    ORDER BY id
    """)

    rows = cursor.fetchall()

for row in rows:
    print(row)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
(1, '김민수', 'minsu@example.com', 'VIP')
(2, '이지영', 'jiyoung@example.com', 'GOLD')
(3, '박철수', 'chulsoo@example.com', 'BASIC')
(4, '최영희', 'younghee@example.com', 'VIP')
\`\`\`

## 조건에 맞는 주문 조회

\`\`\`python
import sqlite3

min_amount = 30000

with sqlite3.connect("shop.db") as connection:
    cursor = connection.cursor()

    cursor.execute("""
    SELECT id, customer_id, amount, status, ordered_at
    FROM orders
    WHERE amount >= ?
    ORDER BY amount DESC
    """, (min_amount,))

    rows = cursor.fetchall()

for row in rows:
    print(row)
\`\`\`

조회 조건에 들어가는 값은 파라미터 바인딩으로 전달했다.

\`\`\`python
(min_amount,)
\`\`\`

값이 하나여도 튜플로 전달해야 하므로 쉼표가 필요하다.

## 조회 결과를 함수로 만들기

반복해서 사용할 코드는 함수로 분리하는 것이 좋다.

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def get_paid_orders(min_amount: int) -> list[tuple]:
    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.cursor()
        cursor.execute("""
        SELECT id, customer_id, amount, status, ordered_at
        FROM orders
        WHERE status = ?
          AND amount >= ?
        ORDER BY amount DESC
        """, ("paid", min_amount))
        return cursor.fetchall()


orders = get_paid_orders(30000)

for order in orders:
    print(order)
\`\`\`

이 함수는 최소 주문 금액을 입력받아 결제 완료 주문 중 해당 금액 이상인 주문을 반환한다.

## 딕셔너리 형태로 조회하기

분석용 코드에서는 컬럼 이름으로 접근하는 방식이 더 읽기 쉽다.

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def get_customers() -> list[dict]:
    with sqlite3.connect(DB_PATH) as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()

        cursor.execute("""
        SELECT id, name, email, grade
        FROM customers
        ORDER BY id
        """)

        rows = cursor.fetchall()
        return [dict(row) for row in rows]


customers = get_customers()

for customer in customers:
    print(customer["name"], customer["email"])
\`\`\`

반환값은 다음과 같은 딕셔너리 리스트가 된다.

\`\`\`python
[
    {"id": 1, "name": "김민수", "email": "minsu@example.com", "grade": "VIP"},
    {"id": 2, "name": "이지영", "email": "jiyoung@example.com", "grade": "GOLD"},
]
\`\`\`

딕셔너리 형태는 JSON 저장이나 CSV 저장으로 이어지기 쉽다.

---

# 15.12 테이블 연결 맛보기

## 왜 테이블을 연결해야 할까?

주문 테이블에는 고객 이름이 아니라 \`customer_id\`가 들어 있다.

\`\`\`text
orders
+----+-------------+--------+
| id | customer_id | amount |
+----+-------------+--------+
| 1  | 1           | 30000  |
+----+-------------+--------+
\`\`\`

고객 이름은 \`customers\` 테이블에 있다.

\`\`\`text
customers
+----+--------+
| id | name   |
+----+--------+
| 1  | 김민수 |
+----+--------+
\`\`\`

분석할 때는 “주문 금액과 고객 이름을 함께 보고 싶다”는 요구가 생긴다. 이때 두 테이블을 연결해야 한다.

## \`JOIN\` 기초

두 테이블을 연결할 때는 \`JOIN\`을 사용한다.

\`\`\`sql
SELECT
    o.id AS order_id,
    c.name AS customer_name,
    c.grade,
    o.amount,
    o.status,
    o.ordered_at
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id;
\`\`\`

여기서 \`orders AS o\`는 \`orders\` 테이블을 \`o\`라는 짧은 이름으로 부르겠다는 뜻이다. \`customers AS c\`도 마찬가지다.

\`\`\`sql
JOIN customers AS c ON o.customer_id = c.id
\`\`\`

이 부분은 주문 테이블의 \`customer_id\`와 고객 테이블의 \`id\`가 같은 행끼리 연결하라는 의미다.

## 파이썬에서 JOIN 결과 조회하기

\`\`\`python
import sqlite3

with sqlite3.connect("shop.db") as connection:
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute("""
    SELECT
        o.id AS order_id,
        c.name AS customer_name,
        c.grade,
        o.amount,
        o.status,
        o.ordered_at
    FROM orders AS o
    JOIN customers AS c ON o.customer_id = c.id
    ORDER BY o.ordered_at
    """)

    rows = cursor.fetchall()

for row in rows:
    print(dict(row))
\`\`\`

결과는 다음과 비슷하다.

\`\`\`python
{
    "order_id": 1,
    "customer_name": "김민수",
    "grade": "VIP",
    "amount": 30000,
    "status": "paid",
    "ordered_at": "2026-06-01",
}
\`\`\`

## 데이터분석과 JOIN

데이터분석에서는 여러 테이블에 흩어진 정보를 합쳐야 하는 경우가 많다.

예를 들어 다음 질문을 생각해보자.

\`\`\`text
VIP 고객의 결제 완료 주문 총액은 얼마인가?
\`\`\`

이 질문에 답하려면 고객 등급이 들어 있는 \`customers\` 테이블과 주문 금액이 들어 있는 \`orders\` 테이블을 연결해야 한다.

\`\`\`sql
SELECT SUM(o.amount) AS total_amount
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
WHERE c.grade = 'VIP'
  AND o.status = 'paid';
\`\`\`

pandas에서도 여러 DataFrame을 합치는 \`merge()\`가 있다. SQL의 \`JOIN\`은 데이터베이스 단계에서 테이블을 합치는 방식이라고 이해하면 된다.

---

# 15.13 분석용 데이터 내보내기

## 데이터베이스에서 CSV로 저장하기

데이터분석 과정에서는 DB에서 조회한 데이터를 CSV로 저장한 뒤 pandas로 불러오는 흐름을 자주 사용한다.

\`\`\`text
SQLite 조회
    ↓
CSV 저장
    ↓
pandas로 분석
\`\`\`

다음 코드는 주문과 고객 정보를 연결한 결과를 CSV 파일로 저장한다.

\`\`\`python
import csv
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")
OUTPUT_PATH = Path("orders_for_analysis.csv")


def export_orders_to_csv() -> None:
    with sqlite3.connect(DB_PATH) as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()

        cursor.execute("""
        SELECT
            o.id AS order_id,
            c.name AS customer_name,
            c.grade AS customer_grade,
            o.amount,
            o.status,
            o.ordered_at
        FROM orders AS o
        JOIN customers AS c ON o.customer_id = c.id
        ORDER BY o.ordered_at
        """)

        rows = cursor.fetchall()

    fieldnames = [
        "order_id",
        "customer_name",
        "customer_grade",
        "amount",
        "status",
        "ordered_at",
    ]

    with OUTPUT_PATH.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows([dict(row) for row in rows])

    print(f"CSV 저장 완료: {OUTPUT_PATH}")


if __name__ == "__main__":
    export_orders_to_csv()
\`\`\`

## CSV로 내보낼 때 생각할 점

분석용 CSV를 만들 때는 다음을 확인해야 한다.

- 컬럼 이름이 명확한가?
- 날짜 형식이 일관적인가?
- 숫자 컬럼이 문자열로 저장되지 않았는가?
- 불필요한 컬럼이 너무 많지 않은가?
- 개인정보나 민감 정보가 포함되어 있지 않은가?
- 분석 기준에 맞는 행만 포함되어 있는가?

예를 들어 분석에 필요한 데이터가 결제 완료 주문뿐이라면 SQL에서 미리 필터링할 수 있다.

\`\`\`sql
SELECT
    o.id AS order_id,
    c.name AS customer_name,
    c.grade AS customer_grade,
    o.amount,
    o.ordered_at
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
WHERE o.status = 'paid'
ORDER BY o.ordered_at;
\`\`\`

데이터분석에서는 “무조건 전체 데이터를 가져온 뒤 pandas에서 처리”하는 방식만 있는 것이 아니다. 데이터베이스에서 미리 필요한 범위를 줄이고, pandas에서는 분석에 집중하는 방식도 중요하다.

---

# 15.14 API 데이터를 SQLite에 저장하기

## API 수집 결과를 파일로만 저장할 때의 문제

14장에서는 API 데이터를 JSON Lines나 CSV로 저장하는 방법을 배웠다. 파일 저장은 단순하고 좋지만, 같은 데이터를 반복해서 수집하다 보면 다음 문제가 생길 수 있다.

- 이미 수집한 데이터를 또 저장할 수 있다.
- 날짜별 파일이 많아져서 관리가 어려워진다.
- 특정 id의 데이터를 찾기 어렵다.
- 수집 성공과 실패 이력을 체계적으로 관리하기 어렵다.
- 분석 전에 여러 파일을 매번 합쳐야 한다.

SQLite를 사용하면 수집한 데이터를 테이블에 누적 저장하고, 필요한 조건으로 조회할 수 있다.

## API 응답 예시

다음과 같은 주문 API 응답이 있다고 가정하자.

\`\`\`python
orders = [
    {"id": 101, "customer_id": 1, "amount": 30000, "status": "paid", "ordered_at": "2026-06-11"},
    {"id": 102, "customer_id": 2, "amount": 18000, "status": "paid", "ordered_at": "2026-06-12"},
    {"id": 103, "customer_id": 1, "amount": 25000, "status": "canceled", "ordered_at": "2026-06-12"},
]
\`\`\`

이 데이터를 SQLite에 저장해보자.

## 저장 함수 만들기

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def save_orders(orders: list[dict]) -> None:
    rows = [
        (
            order["id"],
            order["customer_id"],
            order["amount"],
            order["status"],
            order["ordered_at"],
        )
        for order in orders
    ]

    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.cursor()
        cursor.executemany("""
        INSERT OR IGNORE INTO orders (id, customer_id, amount, status, ordered_at)
        VALUES (?, ?, ?, ?, ?)
        """, rows)
\`\`\`

이 함수는 API 응답 딕셔너리 리스트를 받아서 DB에 저장한다.

\`INSERT OR IGNORE\`를 사용했기 때문에 같은 \`id\`가 이미 있으면 무시된다. 데이터 수집 작업에서 중복 저장을 피할 때 유용하다.

## 저장 전 검증하기

API 응답을 그대로 저장하면 위험할 수 있다. 응답 구조가 바뀌거나, 값이 비어 있거나, 숫자여야 할 값이 문자열일 수도 있다.

간단한 검증 함수를 만들 수 있다.

\`\`\`python
def validate_order(order: dict) -> bool:
    required_keys = {"id", "customer_id", "amount", "status", "ordered_at"}

    if not required_keys.issubset(order):
        return False

    if not isinstance(order["id"], int):
        return False

    if not isinstance(order["customer_id"], int):
        return False

    if not isinstance(order["amount"], int):
        return False

    if order["status"] not in {"paid", "canceled", "pending"}:
        return False

    return True
\`\`\`

검증을 통과한 데이터만 저장한다.

\`\`\`python
valid_orders = [order for order in orders if validate_order(order)]
save_orders(valid_orders)
\`\`\`

이 구조는 데이터분석 전 단계에서 매우 중요하다. 잘못된 데이터를 DB에 넣기 전에 걸러야 분석 결과도 신뢰할 수 있다.

---

# 15.15 데이터베이스 코드 구조화

## 한 파일에 모든 코드를 쓰면 생기는 문제

처음에는 다음 코드처럼 한 파일에 모든 내용을 작성할 수 있다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()
cursor.execute("SELECT * FROM orders")
rows = cursor.fetchall()
print(rows)
connection.close()
\`\`\`

학습용으로는 괜찮다. 하지만 실무 코드에서는 다음 문제가 생긴다.

- 연결 코드가 반복된다.
- SQL이 여러 곳에 흩어진다.
- 예외 처리가 빠지기 쉽다.
- 테스트하기 어렵다.
- DB 파일 경로를 바꾸기 어렵다.
- 함수의 역할이 불분명해진다.

그래서 데이터베이스 관련 코드는 역할별로 분리하는 것이 좋다.

## 연결 함수 만들기

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def connect_db() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection
\`\`\`

이제 DB 연결이 필요할 때마다 \`connect_db()\`를 사용할 수 있다.

## Repository 클래스 만들기

Repository는 데이터베이스에 접근하는 코드를 모아두는 객체다.

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


class OrderRepository:
    def __init__(self, db_path: Path) -> None:
        self.db_path = db_path

    def get_paid_orders(self, min_amount: int = 0) -> list[dict]:
        with sqlite3.connect(self.db_path) as connection:
            connection.row_factory = sqlite3.Row
            cursor = connection.cursor()
            cursor.execute("""
            SELECT id, customer_id, amount, status, ordered_at
            FROM orders
            WHERE status = ?
              AND amount >= ?
            ORDER BY ordered_at
            """, ("paid", min_amount))
            return [dict(row) for row in cursor.fetchall()]

    def save_orders(self, orders: list[dict]) -> None:
        rows = [
            (
                order["id"],
                order["customer_id"],
                order["amount"],
                order["status"],
                order["ordered_at"],
            )
            for order in orders
        ]

        with sqlite3.connect(self.db_path) as connection:
            cursor = connection.cursor()
            cursor.executemany("""
            INSERT OR IGNORE INTO orders (id, customer_id, amount, status, ordered_at)
            VALUES (?, ?, ?, ?, ?)
            """, rows)
\`\`\`

사용 코드는 다음처럼 단순해진다.

\`\`\`python
repository = OrderRepository(Path("shop.db"))
orders = repository.get_paid_orders(min_amount=30000)

for order in orders:
    print(order)
\`\`\`

## 왜 구조화가 중요한가

데이터분석 전처리 코드는 처음에는 작게 시작하지만, 시간이 지나면 점점 커진다.

처음에는 CSV 하나를 읽는다. 그다음 API 데이터를 저장한다. 그다음 DB에서 조회한다. 그다음 실패한 데이터를 따로 기록한다. 그다음 날짜 기준으로 다시 수집한다. 이런 식으로 요구사항이 늘어난다.

처음부터 완벽한 구조를 만들 필요는 없다. 하지만 최소한 다음 정도는 분리하는 것이 좋다.

\`\`\`text
데이터 수집 코드
데이터 검증 코드
데이터 저장 코드
데이터 조회 코드
분석용 내보내기 코드
\`\`\`

이 구조가 있으면 이후 데이터분석 수업에서 pandas 분석 코드와 수집·저장 코드를 분리하기 쉬워진다.

---

# 15.16 실무 예제: CSV 데이터를 SQLite에 저장하고 조회하기

## 목표

이번 실무 예제에서는 다음 작업을 수행한다.

\`\`\`text
1. CSV 파일을 읽는다.
2. 주문 데이터를 검증한다.
3. SQLite 데이터베이스에 저장한다.
4. 결제 완료 주문만 조회한다.
5. 분석용 CSV 파일로 내보낸다.
\`\`\`

## 입력 CSV 예시

\`orders.csv\` 파일을 다음과 같이 만든다.

\`\`\`csv
id,customer_id,amount,status,ordered_at
201,1,30000,paid,2026-06-13
202,2,18000,paid,2026-06-13
203,1,25000,canceled,2026-06-14
204,3,50000,paid,2026-06-15
\`\`\`

## 전체 코드

\`\`\`python
import csv
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")
INPUT_CSV = Path("orders.csv")
OUTPUT_CSV = Path("paid_orders.csv")


class OrderDatabase:
    def __init__(self, db_path: Path) -> None:
        self.db_path = db_path

    def create_table(self) -> None:
        with sqlite3.connect(self.db_path) as connection:
            cursor = connection.cursor()
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                customer_id INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                status TEXT NOT NULL,
                ordered_at TEXT NOT NULL
            )
            """)

    def save_orders(self, orders: list[dict]) -> None:
        rows = [
            (
                int(order["id"]),
                int(order["customer_id"]),
                int(order["amount"]),
                order["status"],
                order["ordered_at"],
            )
            for order in orders
        ]

        with sqlite3.connect(self.db_path) as connection:
            cursor = connection.cursor()
            cursor.executemany("""
            INSERT OR IGNORE INTO orders (id, customer_id, amount, status, ordered_at)
            VALUES (?, ?, ?, ?, ?)
            """, rows)

    def get_paid_orders(self) -> list[dict]:
        with sqlite3.connect(self.db_path) as connection:
            connection.row_factory = sqlite3.Row
            cursor = connection.cursor()
            cursor.execute("""
            SELECT id, customer_id, amount, status, ordered_at
            FROM orders
            WHERE status = ?
            ORDER BY ordered_at
            """, ("paid",))
            return [dict(row) for row in cursor.fetchall()]


def read_orders_from_csv(path: Path) -> list[dict]:
    with path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        return list(reader)


def is_valid_order(order: dict) -> bool:
    required_keys = {"id", "customer_id", "amount", "status", "ordered_at"}

    if not required_keys.issubset(order):
        return False

    if not order["id"].isdigit():
        return False

    if not order["customer_id"].isdigit():
        return False

    if not order["amount"].isdigit():
        return False

    if order["status"] not in {"paid", "canceled", "pending"}:
        return False

    if not order["ordered_at"]:
        return False

    return True


def write_orders_to_csv(path: Path, orders: list[dict]) -> None:
    fieldnames = ["id", "customer_id", "amount", "status", "ordered_at"]

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(orders)


def main() -> None:
    database = OrderDatabase(DB_PATH)
    database.create_table()

    orders = read_orders_from_csv(INPUT_CSV)
    valid_orders = [order for order in orders if is_valid_order(order)]

    database.save_orders(valid_orders)

    paid_orders = database.get_paid_orders()
    write_orders_to_csv(OUTPUT_CSV, paid_orders)

    print(f"입력 데이터 수: {len(orders)}")
    print(f"저장 데이터 수: {len(valid_orders)}")
    print(f"결제 완료 주문 수: {len(paid_orders)}")
    print(f"저장 파일: {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
\`\`\`

## 코드의 흐름

이 코드는 다음 순서로 동작한다.

\`\`\`text
OrderDatabase 생성
      ↓
orders 테이블 생성
      ↓
CSV 파일 읽기
      ↓
주문 데이터 검증
      ↓
SQLite에 저장
      ↓
결제 완료 주문 조회
      ↓
CSV 파일로 내보내기
\`\`\`

## 이 예제가 중요한 이유

이 예제는 데이터분석 전 단계의 기본 구조를 보여준다.

분석은 보통 \`pandas.read_csv()\`로 시작하는 것처럼 보이지만, 그 전에 원천 데이터가 어떻게 수집되고 정리되고 저장되는지도 중요하다.

실무에서는 다음과 같은 질문을 먼저 해야 한다.

\`\`\`text
이 데이터는 어디에서 왔는가?
중복 저장되지는 않았는가?
필수 컬럼이 모두 있는가?
숫자 컬럼은 숫자로 변환 가능한가?
분석에 필요한 상태의 데이터만 추출했는가?
\`\`\`

이런 준비가 되어야 이후 분석 결과도 신뢰할 수 있다.

---

# 15.17 데이터베이스 사용 시 주의할 점

## 1. SQL 문자열에 값을 직접 붙이지 않는다

값은 반드시 파라미터 바인딩으로 전달한다.

좋지 않은 예:

\`\`\`python
sql = f"SELECT * FROM customers WHERE email = '{email}'"
\`\`\`

좋은 예:

\`\`\`python
cursor.execute(
    "SELECT * FROM customers WHERE email = ?",
    (email,),
)
\`\`\`

## 2. \`UPDATE\`, \`DELETE\` 전에는 먼저 \`SELECT\` 한다

수정과 삭제는 되돌리기 어려울 수 있다. 실행 전에는 대상 데이터를 먼저 확인한다.

\`\`\`sql
SELECT *
FROM orders
WHERE status = 'canceled';
\`\`\`

확인 후 수정한다.

\`\`\`sql
UPDATE orders
SET status = 'archived'
WHERE status = 'canceled';
\`\`\`

## 3. 트랜잭션 단위를 의식한다

여러 작업이 함께 성공해야 한다면 하나의 트랜잭션으로 묶는다. 중간에 실패하면 \`rollback()\`으로 되돌린다.

## 4. 데이터 타입을 믿지 않는다

CSV나 API에서 온 데이터는 숫자처럼 보여도 문자열일 수 있다. 저장 전 검증과 변환이 필요하다.

\`\`\`python
amount = int(row["amount"])
\`\`\`

변환할 수 없는 값이 있을 수 있으므로 예외 처리도 고려해야 한다.

## 5. 민감 정보 저장에 주의한다

개인정보, 비밀번호, API 키, 토큰 같은 값은 데이터베이스에 함부로 저장하면 안 된다. 저장해야 한다면 암호화, 접근 권한, 보관 기간 같은 정책을 고려해야 한다.

이 수업에서는 보안 시스템을 깊게 다루지 않지만, 데이터베이스가 “중요한 데이터가 쌓이는 장소”라는 점은 반드시 기억해야 한다.

## 6. 분석용 데이터와 운영 데이터를 구분한다

운영 데이터베이스에 직접 무거운 분석 쿼리를 실행하면 서비스에 영향을 줄 수 있다. 실제 회사에서는 분석용 복제 DB, 데이터 웨어하우스, 추출 파일 등을 따로 사용하는 경우가 많다.

이 수업에서는 SQLite 파일로 연습하지만, 실무에서는 데이터가 어디에 있고 어떤 용도로 사용해도 되는지 확인해야 한다.

---

# 15.18 데이터분석 과정과의 연결

이 장에서 배운 데이터베이스 기초는 이후 데이터분석 과정과 직접 연결된다.

## SQL과 pandas의 관계

SQL과 pandas는 서로 경쟁하는 도구라기보다, 함께 사용하는 도구에 가깝다.

SQL은 데이터베이스에서 필요한 데이터를 조회하는 데 강하다.

\`\`\`sql
SELECT customer_id, SUM(amount) AS total_amount
FROM orders
WHERE status = 'paid'
GROUP BY customer_id;
\`\`\`

pandas는 가져온 데이터를 더 세밀하게 정리하고 분석하는 데 강하다.

\`\`\`python
summary = df.groupby("customer_id")["amount"].sum()
\`\`\`

데이터가 데이터베이스에 있다면 SQL로 필요한 데이터만 가져오고, pandas에서는 분석과 시각화에 집중하는 흐름이 좋다.

## 데이터분석 기초 과정에서 이어질 내용

이후 데이터분석 기초 과정에서는 다음 내용을 다루게 된다.

- CSV 파일을 pandas로 읽기
- SQLite에서 조회한 데이터를 DataFrame으로 만들기
- 결측치 처리
- 중복 제거
- 조건 필터링
- 그룹화와 집계
- 시각화 기초

이 장에서는 pandas를 깊게 사용하지 않는다. 대신 데이터베이스에서 분석 가능한 형태로 데이터를 준비하는 방법을 배웠다.

## 데이터분석 전에 스스로 확인할 질문

분석을 시작하기 전에 다음 질문을 던져보자.

\`\`\`text
데이터는 어디에 저장되어 있는가?
필요한 테이블은 무엇인가?
필요한 컬럼은 무엇인가?
분석 대상 기간은 언제부터 언제까지인가?
제외해야 할 상태값은 없는가?
중복 데이터는 어떻게 처리할 것인가?
숫자와 날짜 형식은 올바른가?
결과를 어떤 형태로 저장할 것인가?
\`\`\`

이 질문에 답할 수 있으면 데이터분석 준비가 훨씬 탄탄해진다.

---

# 15장 핵심 정리

- 데이터베이스는 데이터를 구조화해서 저장하고 필요한 데이터만 조회할 수 있게 해준다.
- 파일은 단순 저장에는 좋지만, 데이터가 커지고 관계가 생기면 관리가 어려워진다.
- SQLite는 파일 기반 데이터베이스이며 파이썬 표준 라이브러리 \`sqlite3\`로 사용할 수 있다.
- 테이블은 행과 열로 이루어져 있으며, 스키마는 테이블 구조를 정의한다.
- 기본 키는 각 행을 구분하는 고유한 값이다.
- SQL은 데이터베이스에 명령을 내리는 언어다.
- \`SELECT\`는 데이터를 조회할 때 사용한다.
- \`WHERE\`는 조건에 맞는 데이터만 조회할 때 사용한다.
- \`ORDER BY\`는 정렬, \`LIMIT\`은 개수 제한에 사용한다.
- \`INSERT\`는 추가, \`UPDATE\`는 수정, \`DELETE\`는 삭제에 사용한다.
- \`UPDATE\`와 \`DELETE\`를 사용할 때는 \`WHERE\` 조건을 반드시 주의해야 한다.
- 파이썬에서 SQLite를 사용할 때는 \`connect()\`, \`cursor()\`, \`execute()\`, \`fetchone()\`, \`fetchall()\`, \`commit()\`, \`close()\` 흐름을 이해해야 한다.
- 사용자 입력값은 SQL 문자열에 직접 붙이지 말고 파라미터 바인딩으로 전달해야 한다.
- 트랜잭션은 여러 데이터베이스 작업을 하나의 단위로 묶어 모두 성공하거나 모두 취소되게 하는 개념이다.
- API나 CSV 데이터를 SQLite에 저장하면 중복 관리, 조건 조회, 분석용 데이터 추출이 쉬워진다.
- 데이터분석 과정에서는 SQL로 필요한 데이터를 가져오고 pandas로 분석하는 흐름을 자주 사용한다.

---

# 연습문제

## 문제 1. 개념 확인

다음 중 데이터베이스를 사용하는 이유로 가장 적절하지 않은 것은 무엇인가?

A. 조건에 맞는 데이터를 조회하기 위해  
B. 여러 테이블의 데이터를 연결하기 위해  
C. 중복 데이터를 더 많이 만들기 위해  
D. 데이터를 구조화해서 저장하기 위해  

## 문제 2. 용어 확인

다음 설명에 해당하는 용어를 쓰시오.

\`\`\`text
테이블에서 각 행을 고유하게 구분하는 값이다.
보통 id 컬럼으로 사용한다.
\`\`\`

## 문제 3. SQL 작성

\`orders\` 테이블에서 \`status\`가 \`paid\`인 주문만 조회하는 SQL을 작성하시오.

## 문제 4. SQL 작성

\`orders\` 테이블에서 주문 금액이 큰 순서대로 상위 5개만 조회하는 SQL을 작성하시오.

## 문제 5. 위험한 SQL 찾기

다음 SQL의 문제점을 설명하시오.

\`\`\`sql
UPDATE customers
SET grade = 'VIP';
\`\`\`

## 문제 6. 파이썬 코드 빈칸 채우기

다음 코드의 빈칸을 채우시오.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("SELECT name, email FROM customers")
rows = cursor.__________()

for row in rows:
    print(row)

connection.close()
\`\`\`

## 문제 7. 파라미터 바인딩

다음 코드는 문자열 포매팅으로 SQL을 만들고 있다. 안전한 파라미터 바인딩 방식으로 고치시오.

\`\`\`python
email = "minsu@example.com"
sql = f"SELECT * FROM customers WHERE email = '{email}'"
cursor.execute(sql)
\`\`\`

## 문제 8. 튜플 주의점

다음 코드가 잘못된 이유를 설명하시오.

\`\`\`python
email = "minsu@example.com"

cursor.execute("""
SELECT *
FROM customers
WHERE email = ?
""", (email))
\`\`\`

## 문제 9. 트랜잭션

다음 중 \`rollback()\`이 필요한 상황으로 가장 적절한 것은 무엇인가?

A. 조회 결과가 0건인 경우  
B. 여러 데이터 변경 작업 중 하나가 실패한 경우  
C. \`SELECT\` 결과를 출력한 경우  
D. 데이터베이스 연결을 처음 만든 경우  

## 문제 10. 코드 작성

\`orders\` 테이블에 주문 데이터를 저장하는 함수를 작성하시오. 함수 이름은 \`save_order\`로 하고, \`order_id\`, \`customer_id\`, \`amount\`, \`status\`, \`ordered_at\`을 매개변수로 받는다. 값은 파라미터 바인딩으로 전달해야 한다.

---

# 정답 및 해설

## 문제 1 정답

정답: C

데이터베이스는 중복을 더 많이 만들기 위한 도구가 아니다. 오히려 데이터를 구조화하고 중복을 줄이며, 필요한 데이터를 안정적으로 조회하기 위해 사용한다.

## 문제 2 정답

정답: 기본 키 또는 Primary Key

기본 키는 테이블의 각 행을 고유하게 구분하는 값이다.

## 문제 3 정답

\`\`\`sql
SELECT *
FROM orders
WHERE status = 'paid';
\`\`\`

필요한 컬럼이 정해져 있다면 \`*\` 대신 컬럼명을 명시하는 것이 좋다.

## 문제 4 정답

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount DESC
LIMIT 5;
\`\`\`

\`DESC\`는 내림차순이다. \`LIMIT 5\`는 결과를 5개로 제한한다.

## 문제 5 정답

\`WHERE\` 조건이 없기 때문에 모든 고객의 등급이 \`VIP\`로 바뀐다. 실무에서는 \`UPDATE\`를 실행하기 전에 \`SELECT\`로 수정 대상을 먼저 확인해야 한다.

## 문제 6 정답

\`\`\`python
rows = cursor.fetchall()
\`\`\`

\`fetchall()\`은 조회 결과 전체를 가져온다.

## 문제 7 정답

\`\`\`python
email = "minsu@example.com"

cursor.execute(
    "SELECT * FROM customers WHERE email = ?",
    (email,),
)
\`\`\`

사용자 입력값이나 외부 데이터는 SQL 문자열에 직접 붙이지 말고 파라미터로 전달해야 한다.

## 문제 8 정답

\`\`\`python
(email)
\`\`\`

위 코드는 튜플이 아니라 문자열이다. 값이 하나인 튜플을 만들려면 쉼표가 필요하다.

\`\`\`python
(email,)
\`\`\`

따라서 다음처럼 작성해야 한다.

\`\`\`python
cursor.execute("""
SELECT *
FROM customers
WHERE email = ?
""", (email,))
\`\`\`

## 문제 9 정답

정답: B

여러 데이터 변경 작업 중 하나가 실패하면 앞에서 실행한 변경 작업도 취소해야 할 수 있다. 이때 \`rollback()\`을 사용한다.

## 문제 10 정답 예시

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def save_order(
    order_id: int,
    customer_id: int,
    amount: int,
    status: str,
    ordered_at: str,
) -> None:
    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.cursor()
        cursor.execute("""
        INSERT INTO orders (id, customer_id, amount, status, ordered_at)
        VALUES (?, ?, ?, ?, ?)
        """, (order_id, customer_id, amount, status, ordered_at))
\`\`\`

\`with sqlite3.connect(...)\`를 사용하면 블록이 정상적으로 끝났을 때 변경 내용이 커밋된다. 다만 더 복잡한 프로그램에서는 연결 닫기와 예외 처리 정책을 명확히 설계하는 것이 좋다.

---

# 실습 과제

## 과제 1. 고객 테이블 만들기

\`customers\` 테이블을 생성하는 파이썬 코드를 작성하시오.

조건:

- 데이터베이스 파일 이름은 \`practice.db\`
- 테이블 이름은 \`customers\`
- 컬럼은 \`id\`, \`name\`, \`email\`, \`grade\`
- \`id\`는 기본 키
- \`name\`과 \`email\`은 필수값
- \`email\`은 중복 불가

## 과제 2. 고객 데이터 저장하기

아래 고객 데이터를 \`customers\` 테이블에 저장하시오.

\`\`\`python
customers = [
    (1, "김민수", "minsu@example.com", "VIP"),
    (2, "이지영", "jiyoung@example.com", "GOLD"),
    (3, "박철수", "chulsoo@example.com", "BASIC"),
]
\`\`\`

조건:

- \`executemany()\`를 사용할 것
- 파라미터 바인딩을 사용할 것
- 저장 후 \`commit()\`을 실행할 것

## 과제 3. VIP 고객 조회하기

\`customers\` 테이블에서 등급이 \`VIP\`인 고객의 이름과 이메일만 조회하시오.

## 과제 4. 주문 테이블 만들기

\`orders\` 테이블을 생성하시오.

컬럼:

- \`id\`
- \`customer_id\`
- \`amount\`
- \`status\`
- \`ordered_at\`

## 과제 5. 분석용 CSV 만들기

\`orders\` 테이블에서 \`status\`가 \`paid\`인 주문만 조회하여 \`paid_orders.csv\`로 저장하는 코드를 작성하시오.

---

# 참고 자료

- Python 공식 문서: \`sqlite3\` — DB-API 2.0 interface for SQLite databases  
  https://docs.python.org/3/library/sqlite3.html
- SQLite 공식 문서: SQL As Understood By SQLite  
  https://sqlite.org/lang.html
- SQLite 공식 문서: INSERT  
  https://sqlite.org/lang_insert.html
`;export{e as default};