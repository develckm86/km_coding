var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-4 -->

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
`;export{e as default};