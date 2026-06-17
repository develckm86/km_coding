var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-6 -->

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
`;export{e as default};