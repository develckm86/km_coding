var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-10 -->

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
`;export{e as default};