var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-11 -->

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
`;export{e as default};