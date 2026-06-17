var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-12 -->

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
`;export{e as default};